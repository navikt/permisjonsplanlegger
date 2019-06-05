import {
    UttaksplanRegelTestresultat,
    RegelAvvik,
    Regel,
    RegelTestresultatInfo,
    RegelStatus,
    RegelTestresultatInfoObject,
    RegelAvvikInfo,
    RegelAlvorlighet
} from './types';
import uttaksplanRegler from '../../app/utils/regler';
import { InjectedIntl } from 'react-intl';
import { isArray } from 'util';
import { flatten, uniqBy } from 'lodash';
import { guid } from 'nav-frontend-js-utils';
import { Regelgrunnlag } from 'app/utils/regler/types';

const getRegelIntlKey = (regel: Regel): string => `regel.${regel.alvorlighet}.${regel.key}`;

const alvorlighetSortOrder = {
    [RegelAlvorlighet.FEIL]: 0,
    [RegelAlvorlighet.ADVARSEL]: 1,
    [RegelAlvorlighet.INFO]: 2
};

const sorterAvvik = (a1: RegelAvvik, a2: RegelAvvik): number => {
    if (a1.regel.alvorlighet === a2.regel.alvorlighet) {
        return 0;
    }
    return alvorlighetSortOrder[a1.regel.alvorlighet] < alvorlighetSortOrder[a2.regel.alvorlighet] ? -1 : 1;
};

const ensureRegelAvvikIntlKey = (regel: Regel, info?: Partial<RegelTestresultatInfo>): RegelAvvikInfo => ({
    ...info,
    intlKey: info ? info.intlKey || getRegelIntlKey(regel) : getRegelIntlKey(regel)
});

const overstyresAvFilter = (avvik: RegelAvvik, idx: number, alleAvvik: RegelAvvik[]): boolean => {
    return (
        avvik.regel.overstyresAvRegel === undefined &&
        alleAvvik.some((b2) => b2.regel.key === avvik.regel.overstyresAvRegel) === false
    );
};

const overstyrerAndreFilter = (avvik: RegelAvvik, idx: number, alleAvvik: RegelAvvik[]): boolean => {
    const overstyresAvAndre = alleAvvik.some((rb) =>
        rb.regel.overstyrerRegler
            ? rb.regel.overstyrerRegler.some((rbo) => {
                  return rbo === avvik.regel.key;
              })
            : false
    );
    return overstyresAvAndre === false;
};

const regelHarAvvik = (regel: Regel, info?: RegelTestresultatInfoObject, periodeId?: string): RegelStatus => {
    const mapInfoToRegelAvvik = (i?: Partial<RegelTestresultatInfo>): RegelAvvik => ({
        id: guid(),
        regel,
        info: ensureRegelAvvikIntlKey(regel, i),
        periodeId: i ? i.periodeId : periodeId
    });
    const regelAvvik: RegelAvvik[] = [];
    if (isArray(info)) {
        info.forEach((i) => regelAvvik.push(mapInfoToRegelAvvik(i)));
    } else {
        regelAvvik.push(mapInfoToRegelAvvik(info));
    }
    return {
        key: regel.key,
        passerer: false,
        regelAvvik
    };
};

const regelPasserer = (regel: Regel): RegelStatus => ({
    key: regel.key,
    passerer: true
});

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: Regelgrunnlag): RegelStatus[] => {
    return uttaksplanRegler.map((regel) => {
        const resultat = regel.test(regelgrunnlag);
        return resultat.passerer ? regelPasserer(regel) : regelHarAvvik(regel, resultat.info, resultat.periodeId);
    });
};

export const getRegelAvvikForPeriode = (resultat: UttaksplanRegelTestresultat, periodeId: string): RegelAvvik[] => {
    return resultat && resultat.avvikPerPeriode[periodeId] ? resultat.avvikPerPeriode[periodeId] : [];
};

export const getRegelAvvik = (resultat: RegelStatus[]): RegelAvvik[] => {
    if (resultat) {
        return flatten(
            resultat.filter((r) => r.passerer === false && r.regelAvvik !== undefined).map((r) => r.regelAvvik!)
        ).sort(sorterAvvik);
    }
    return [];
};

export const isRegelFeil = (regelAvvik: RegelAvvik): boolean => regelAvvik.regel.alvorlighet === RegelAlvorlighet.FEIL;
export const isRegelAdvarsel = (regelAvvik: RegelAvvik): boolean =>
    regelAvvik.regel.alvorlighet === RegelAlvorlighet.ADVARSEL;
export const isRegelInfo = (regelAvvik: RegelAvvik): boolean => regelAvvik.regel.alvorlighet === RegelAlvorlighet.INFO;
export const hasRegelFeil = (avvik: RegelAvvik[] = []) => avvik.some((a) => isRegelFeil(a));
export const hasRegelAdvarsler = (avvik: RegelAvvik[] = []) => avvik.some((a) => isRegelAdvarsel(a));
export const hasRegelInfo = (avvik: RegelAvvik[] = []) => avvik.some((a) => isRegelInfo(a));
export const hasRegelAvvikFeil = (avvik: RegelAvvik[] = []) => avvik.some((a) => isRegelFeil(a));

export const trimRelaterteRegelAvvik = (avvik: RegelAvvik[]): RegelAvvik[] => {
    return uniqBy(avvik.filter(overstyresAvFilter).filter(overstyrerAndreFilter), (a) => {
        return a.regel.slåsSammenVedOppsummering ? a.regel.key : guid();
    });
};

export const getRegelIntlValues = (
    intl: InjectedIntl,
    info: RegelTestresultatInfo
): { [key: string]: string } | undefined => {
    const { values } = info;
    if (values === undefined) {
        return undefined;
    }
    const newValues: { [key: string]: string } = {};
    Object.keys(values).forEach((key) => {
        const valueOrFunc = values[key];
        if (valueOrFunc) {
            newValues[key] = typeof valueOrFunc === 'function' ? valueOrFunc(intl) : `${valueOrFunc}`;
        }
    });
    return newValues;
};
