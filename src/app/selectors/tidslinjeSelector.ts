import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { addWeeks, addDays } from 'date-fns';
import { Utsettelsesperiode, Periode, Periodetype } from 'app/types';
import {
	getStartdatoUtFraTermindato,
	getForsteUttaksdagEtterDato,
	getForsteUttaksdagPaEllerEtterDato,
	getPerioderUtenUtsettelser,
	justerPerioderMedUtsettelser
} from 'app/utils/periodeUtils';
import { grunnfordeling } from 'app/data/grunnfordeling';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Henter ut alle perioder gitt formState
 */
export const periodeSelector = createSelector(formSelector, (form: FormState): Periode[] => {
	if (!form.termindato || !form.dekningsgrad) {
		return [];
	}
	const perioder = getPerioderUtenUtsettelser(
		form.termindato || new Date(),
		form.dekningsgrad || '100%',
		form.grunnfordeling,
		form.ukerForelder1 || 0,
		form.ukerForelder2 || 0
	);
	return perioder;
});

/**
 * Oppretter tidslinjeInnslag ut fra perioder, utsettelser
 */
export const tidslinjeFraPerioder = createSelector(
	periodeSelector,
	utsettelseSelector,
	formSelector,
	(perioder, utsettelser, form): TidslinjeInnslag[] => {
		const { dekningsgrad, termindato } = form;
		if (!termindato || !dekningsgrad) {
			return [];
		}
		const alleInnslag: TidslinjeInnslag[] = [];

		const justertePerioder: Periode[] = justerPerioderMedUtsettelser(
			perioder.concat(utsettelser).sort(sorterPeriodeEtterStartdato)
		);

		// Lag tidslinjeinnslag ut fra perioder
		justertePerioder.forEach((periode) => {
			const i = periodeTilTidslinjeinnslag(periode);
			if (i) {
				alleInnslag.push(i);
			}
		});

		// Legg til punkt for termindato
		alleInnslag.push({
			dato: termindato,
			forelder: 'forelder1',
			type: 'termin',
			tittel: 'Termindato'
		});

		// Legg til punkt for permisjonsslutt
		const sistePeriode = justertePerioder[justertePerioder.length - 1];
		alleInnslag.push({
			dato: sistePeriode.tidsperiode.sluttdato,
			forelder: sistePeriode.forelder,
			type: 'siste',
			tittel: 'Siste permisjonsdag'
		});

		alleInnslag.sort(sorterTidslinjeinnslagEtterStartdato);

		return alleInnslag;
	}
);

const sorterTidslinjeinnslagEtterStartdato = (innslag1: TidslinjeInnslag, innslag2: TidslinjeInnslag) =>
	innslag1.dato >= innslag2.dato ? 1 : -1;

const sorterPeriodeEtterStartdato = (p1: Periode, p2: Periode) =>
	p1.tidsperiode.startdato >= p2.tidsperiode.startdato ? 1 : -1;

export const periodeTilTidslinjeinnslag = (periode: Periode): TidslinjeInnslag | undefined => {
	switch (periode.type) {
		case Periodetype.Stonadsperiode:
			return {
				dato: periode.tidsperiode.startdato,
				type: 'uttak',
				tittel: `Søknadsperiode (${periode.konto})`,
				forelder: periode.forelder,
				fastPeriode: periode.fastPeriode
			};
		case Periodetype.Utsettelse:
			return {
				dato: periode.tidsperiode.startdato,
				type: 'utsettelse',
				tittel: `Utsettelse (${periode.arsak})`,
				forelder: periode.forelder
			};
		default:
			return undefined;
	}
};

export const tidslinjeSelector = createSelector(
	formSelector,
	utsettelseSelector,
	(form: FormState, utsettelser: Utsettelsesperiode[]): TidslinjeInnslag[] => {
		const { navnForelder1, navnForelder2, ukerForelder1, ukerForelder2, termindato /*, dekningsgrad*/ } = form;
		if (!termindato) {
			return [];
		}
		const startDato = getStartdatoUtFraTermindato(termindato, grunnfordeling.antallUkerForelder1ForFodsel);
		const forsteDagEtterTermin = getForsteUttaksdagEtterDato(termindato);
		const sluttModrekvote = addWeeks(forsteDagEtterTermin, 6 + (ukerForelder1 ? ukerForelder1 : 1));
		const startFedrekvote = getForsteUttaksdagPaEllerEtterDato(addDays(sluttModrekvote, 1));
		const sluttFedrekvote = addWeeks(sluttModrekvote, ukerForelder2 ? ukerForelder2 : 0);

		const innslag: TidslinjeInnslag[] = [
			{
				dato: startDato,
				tittel: `${navnForelder1 || 'Mor'} starter sin permisjon`,
				forelder: 'forelder1',
				type: 'uttak'
			},
			{
				dato: termindato,
				tittel: 'Termindato',
				forelder: 'forelder1',
				type: 'termin'
			},
			{
				dato: sluttModrekvote,
				tittel: `${navnForelder1 || 'Mor'} avslutter sin permisjon`,
				forelder: 'forelder1',
				type: 'slutt'
			},
			{
				dato: startFedrekvote,
				tittel: `${navnForelder2 || 'Medforelder'} starter sin permisjon`,
				forelder: 'forelder2',
				type: 'uttak'
			},
			{
				dato: sluttFedrekvote,
				tittel: `${navnForelder2 || 'Medforelder'} slutter sin permisjon`,
				forelder: 'forelder2',
				type: 'siste'
			}
		];
		return innslag;
	}
);
