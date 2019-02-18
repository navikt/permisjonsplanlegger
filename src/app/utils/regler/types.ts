import { Dictionary } from 'lodash';
import { Periode, Situasjon, Uttaksdatoer, UttakFørTerminPeriode, Forbruk, TilgjengeligeDager } from '../../types';
import { RegelKey } from './regelKeys';
import { InjectedIntl } from 'react-intl';

export interface Regelgrunnlag {
    perioder: Periode[];
    periodeFørTermin: UttakFørTerminPeriode | undefined;
    familiehendelsesdato: Date;
    situasjon: Situasjon;
    erMor: boolean;
    uttaksdatoer: Uttaksdatoer;
    navnMor: string;
    navnFarMedmor?: string;
    forbruk?: Forbruk;
    tilgjengeligeDager?: TilgjengeligeDager;
}

export type RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface Regel {
    key: RegelKey;
    test: (key: RegelKey, grunnlag: Regelgrunnlag) => RegelTestresultat;
}

export enum RegelAlvorlighet {
    'ULOVLIG' = 'ulovlig',
    'INFO' = 'info'
}

export interface RegelTestresultat {
    key: RegelKey;
    passerer: boolean;
    regelbrudd?: Regelbrudd;
}

type FeilIntlMessage = (intl: InjectedIntl) => string;

export interface RegelbruddFeilmeldingValues {
    [key: string]: RegelbruddFeilmeldingValue;
}
export type RegelbruddFeilmeldingValue = string | number | Date | FeilIntlMessage | undefined;

export interface Regelbrudd {
    periodeId?: string;
    key: RegelKey;
    feilmelding: RegelbruddFeil;
    alvorlighet: RegelAlvorlighet;
}

export interface RegelbruddFeil {
    intlKey: string;
    values?: RegelbruddFeilmeldingValues;
}

export type PeriodeRegelTestresultat = Dictionary<RegelTestresultat[]>;

export interface UttaksplanRegelTestresultat {
    resultat: RegelTestresultat[];
    resultatPerPeriode: PeriodeRegelTestresultat;
    regelbrudd: Regelbrudd[];
}