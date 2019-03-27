import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import ForelderMeny from './parts/ForelderMeny';
import PeriodetypeMeny from './parts/PeriodetypeMeny';
import { changePeriodeType } from '../../utils/typeUtils';
import { PeriodelisteElementProps } from './types';
import GraderingMeny from './parts/GraderingMeny';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import { OmForeldre, Forelder, Periodetype, Periode } from '../../types';
import { Tidsperioden, isValidTidsperiode } from '../../utils/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import PeriodelisteElement from './periodelisteElement/PeriodelisteElement';
import PeriodeBlokk from '../periodeBlokk/PeriodeBlokk';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import VarighetMeny from '../periodeskjema/varighet/VarighetMeny';
import { VarighetChangeEvent } from '../periodeskjema/varighet/VarighetSkjema';

type Props = PeriodelisteElementProps & InjectedIntlProps;

const bem = BEMHelper('periodeElement');

const getForelderNavn = (forelder: Forelder | undefined, omForeldre: OmForeldre): string | undefined => {
    if (forelder === undefined || omForeldre === undefined) {
        return;
    }
    if (forelder === Forelder.mor) {
        return omForeldre.mor.navn;
    } else {
        return omForeldre.farMedmor ? omForeldre.farMedmor.navn : undefined;
    }
};

class PeriodeElement extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleChangeVarighet = this.handleChangeVarighet.bind(this);
    }

    handleChangeVarighet(evt: VarighetChangeEvent) {
        const { periode } = this.props;
        const { tidsperiode } = periode;
        const { ingenVarighet, dager } = evt;

        if (periode.type === Periodetype.UttakFørTermin) {
            const oppdatertPeriode = {
                ...periode,
                tidsperiode: dager ? Tidsperioden(tidsperiode).setUttaksdager(dager) : tidsperiode,
                skalIkkeHaUttakFørTermin: ingenVarighet
            };
            this.props.onUpdate(oppdatertPeriode as Periode);
        } else if (dager !== undefined) {
            this.props.onUpdate({
                ...periode,
                tidsperiode: Tidsperioden(tidsperiode || {}).setUttaksdager(dager) as Tidsperiode
            });
        }
    }
    render() {
        const {
            typeErLåst,
            forelderErLåst,
            omForeldre,
            onUpdate,
            onRemove,
            uttaksdatoer,
            regelAvvik,
            perioder,
            kanSlettes = true,
            intl
        } = this.props;

        const { uttaksinfo } = this.props.periode;
        const periode = this.props.periode;

        const { antallUttaksdagerBrukt, antallUttaksdager } = uttaksinfo || {
            antallUttaksdagerBrukt: 0,
            antallUttaksdager: 0
        };

        const foreldernavn = getForelderNavn(periode.forelder, omForeldre);
        const { fom, tom } = periode.tidsperiode;
        return (
            <PeriodeBlokk farge={getPeriodetypeFarge(periode.type, periode.forelder)}>
                <PeriodelisteElement
                    menyer={[
                        {
                            id: 'periodetype',
                            className: bem.element('periode'),
                            render: () => (
                                <PeriodetypeMeny
                                    type={periode.type}
                                    forelder={periode.forelder}
                                    foreldernavn={foreldernavn}
                                    erLåst={typeErLåst}
                                    gradering={periode.gradering}
                                    brukteUttaksdager={antallUttaksdagerBrukt}
                                    uttaksdager={antallUttaksdager}
                                    onChange={(periodetype) => onUpdate(changePeriodeType(periode, periodetype))}
                                />
                            )
                        },
                        {
                            id: 'gradering',
                            className: bem.element('gradering'),
                            render: () => (
                                <GraderingMeny
                                    foreldernavn={omForeldre.erDeltOmsorg ? foreldernavn : getMessage(intl, 'du')}
                                    gradering={periode.gradering}
                                    onChange={(gradering) => onUpdate({ ...periode, gradering })}
                                    uttaksdagerBrukt={antallUttaksdagerBrukt}
                                />
                            ),
                            isVisibleCheck: () => periode.type === Periodetype.GradertUttak
                        },
                        {
                            id: 'forelder',
                            className: bem.element('foreldre'),
                            render: () => (
                                <ForelderMeny
                                    forelder={periode.forelder}
                                    mor={omForeldre.mor}
                                    farMedmor={omForeldre.farMedmor!}
                                    erLåst={forelderErLåst}
                                    onChange={(forelder) =>
                                        onUpdate({
                                            ...periode,
                                            forelder
                                        })
                                    }
                                />
                            ),
                            isVisibleCheck: () => omForeldre.erDeltOmsorg
                        },
                        {
                            id: 'varighet',
                            className: bem.element('varighet'),
                            render: () => (
                                <VarighetMeny
                                    skjemaProps={{
                                        perioder,
                                        erNyPeriode: false,
                                        periodetype: periode.type,
                                        gradering: periode.gradering,
                                        antallUttaksdager,
                                        antallUttaksdagerBrukt,
                                        minDato:
                                            periode.type === Periodetype.UttakFørTermin
                                                ? uttaksdatoer.førFødsel.førsteMuligeUttaksdag
                                                : uttaksdatoer.førsteUttaksdag,
                                        maksDato:
                                            periode.type === Periodetype.UttakFørTermin
                                                ? uttaksdatoer.førFødsel.sisteUttaksdagFørFødsel
                                                : uttaksdatoer.etterFødsel.sisteMuligeUttaksdag,
                                        tidsperiode: {
                                            fom,
                                            tom
                                        },
                                        onTidsperiodeChange: (tidsperiode) =>
                                            isValidTidsperiode(tidsperiode)
                                                ? onUpdate({
                                                      ...periode,
                                                      tidsperiode
                                                  })
                                                : null,
                                        onVarighetChange: this.handleChangeVarighet,
                                        ingenVarighet:
                                            periode.type === Periodetype.UttakFørTermin
                                                ? periode.skalIkkeHaUttakFørTermin
                                                : undefined
                                    }}
                                    dropdownStyle="filled"
                                />
                            )
                        }
                    ]}
                    slett={
                        kanSlettes
                            ? {
                                  ariaLabel: getMessage(intl, 'periodeliste.ariatekst.slettPeriode'),
                                  onRemove: () => onRemove(periode)
                              }
                            : undefined
                    }
                    info={
                        periode.type === Periodetype.Ferie && antallUttaksdagerBrukt > 0
                            ? [
                                  getMessage(intl, 'uttaksplan.ferie.inneholderHelligdager', {
                                      dager: antallUttaksdagerBrukt,
                                      navn: foreldernavn
                                  })
                              ]
                            : undefined
                    }
                    regelAvvik={regelAvvik}
                />
            </PeriodeBlokk>
        );
    }
}

export default injectIntl(PeriodeElement);
