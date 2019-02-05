import { Periodetype, Periode, PeriodeBase } from '../types';

const getBasePeriode = (periode: Periode): PeriodeBase => {
    if (periode.type === Periodetype.UttakFørTermin) {
        const { skalIkkeHaUttakFørTermin, ...rest } = periode;
        return rest;
    }
    return periode;
};

export const isPeriodeFixed = (periodetype: Periodetype): boolean => {
    return periodetype === Periodetype.Arbeid || periodetype === Periodetype.Ferie;
};

export const changePeriodeType = (periode: Periode, type: Periodetype): Periode => {
    if (type === periode.type) {
        return periode;
    }
    const basePeriode = getBasePeriode(periode);
    switch (type) {
        case Periodetype.Ferie:
            return {
                ...basePeriode,
                type: Periodetype.Ferie,
                gradering: undefined,
                fixed: true
            };
        case Periodetype.Arbeid:
            return {
                ...basePeriode,
                type: Periodetype.Arbeid,
                gradering: undefined,
                fixed: true
            };
        case Periodetype.Uttak:
            return {
                ...basePeriode,
                type: Periodetype.Uttak,
                gradering: undefined,
                fixed: false
            };
        case Periodetype.UttakFørTermin:
            return {
                ...basePeriode,
                type: Periodetype.UttakFørTermin,
                gradering: undefined,
                fixed: false
            };
        case Periodetype.GradertUttak:
            return {
                ...basePeriode,
                type: Periodetype.GradertUttak,
                gradering: 50,
                fixed: false
            };
        case Periodetype.UbetaltPermisjon:
            return {
                ...basePeriode,
                type: Periodetype.UbetaltPermisjon,
                gradering: undefined,
                fixed: false
            };
    }
};
