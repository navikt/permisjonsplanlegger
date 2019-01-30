import { Tidsperiode } from 'common/types';
import { Forelder, PeriodeUttaksinfo } from '.';

export enum Periodetype {
    'Uttak' = 'uttak',
    'GradertUttak' = 'gradertUttak',
    'Ferie' = 'ferie',
    'Arbeid' = 'arbeid',
    'UbetaltPermisjon' = 'ubetaltPermisjon'
}

export interface PeriodeBase {
    id: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
    forelder: Forelder;
    fixed?: boolean;
    uttaksinfo?: PeriodeUttaksinfo;
    gradering?: number;
}

export interface Uttaksperiode extends PeriodeBase {
    type: Periodetype.Uttak;
}

export interface GradertUttaksperiode extends PeriodeBase {
    type: Periodetype.GradertUttak;
}

export interface Ferieperiode extends PeriodeBase {
    type: Periodetype.Ferie;
}

export interface Arbeidsperiode extends PeriodeBase {
    type: Periodetype.Arbeid;
}

export interface UbetaltPermisjon extends PeriodeBase {
    type: Periodetype.UbetaltPermisjon;
}

export type Utsettelsesperiode = Ferieperiode | Arbeidsperiode;

export type Periode = Uttaksperiode | GradertUttaksperiode | Utsettelsesperiode | UbetaltPermisjon | Ferieperiode;

export function isUttak(periode: Periode): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak;
}

export function isGradertUttak(periode: Periode): periode is GradertUttaksperiode {
    return periode.type === Periodetype.GradertUttak;
}

export function isUtsettelse(periode: Periode): periode is Utsettelsesperiode {
    return periode.type === Periodetype.Ferie || periode.type === Periodetype.Arbeid;
}

export function isFerie(periode: Periode): periode is Ferieperiode {
    return periode.type === Periodetype.Ferie;
}

export function isArbeid(periode: Periode): periode is Arbeidsperiode {
    return periode.type === Periodetype.Arbeid;
}

export function isUbetaltPermisjon(periode: Periode): periode is UbetaltPermisjon {
    return periode.type === Periodetype.UbetaltPermisjon;
}
