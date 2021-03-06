import { ForeldreparSituasjon } from 'shared/types';
import { Forelder } from 'common/types';

export * from './periodetyper';

export interface Uttaksinfo {
    antallUttaksdager: number;
    antallFridager: number;
    antallUttaksdagerBrukt: number;
}

export interface SituasjonSkjemadata {
    situasjon: ForeldreparSituasjon;
    navnMor: string;
    navnFarMedmor?: string;
    antallBarn: number;
    familiehendelsesdato: Date;
    forelderVedAleneomsorg?: Forelder;
}

export interface Uttaksdatoer {
    førsteUttaksdag: Date;
    førFødsel: {
        førsteMuligeUttaksdag: Date;
        førsteUttaksdagForeldrepengerFørFødsel: Date;
        sisteUttaksdagFørFødsel: Date;
    };
    etterFødsel: {
        sisteUttaksdagInnenforSeksUker: Date;
        førsteUttaksdagEtterSeksUker: Date;
        sisteMuligeUttaksdag: Date;
    };
}

export interface SvgIkonProps {
    title: string;
    width?: number;
    height?: number;
}
