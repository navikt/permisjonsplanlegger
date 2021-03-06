import { Periode } from '../../types';
import { getUttaksinfoForPeriode } from '../uttaksinfo';
import { deltUttakFødselForslag } from './deltUttak';
import { ikkeDeltUttakForslag } from './ikkeDeltUttak';
import { getAntallForeldreISituasjon } from 'shared/components/foreldrepar/foreldreparUtils';
import { ForeldreparSituasjon, TilgjengeligStønadskonto } from 'shared/types';

export const lagUttaksplan = (
    situasjon: ForeldreparSituasjon,
    førsteUttaksdag: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    fellesperiodedagerMor: number | undefined
): Periode[] => {
    const antallForelder = getAntallForeldreISituasjon(situasjon);
    let plan: Periode[] = [];
    plan =
        antallForelder === 2 && fellesperiodedagerMor !== undefined
            ? deltUttakFødselForslag(førsteUttaksdag, tilgjengeligeStønadskontoer, fellesperiodedagerMor)
            : ikkeDeltUttakForslag(førsteUttaksdag, tilgjengeligeStønadskontoer);

    return plan ? plan.map((p) => ({ ...p, uttaksinfo: getUttaksinfoForPeriode(p) })) : [];
};
