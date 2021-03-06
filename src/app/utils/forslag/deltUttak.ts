import { Periode, Periodetype } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode } from '../Tidsperioden';
import { Uttaksdagen } from '../Uttaksdagen';
import { TilgjengeligStønadskonto, StønadskontoType } from 'shared/types';
import { Forelder } from 'common/types';

export const deltUttakFødselForslag = (
    førsteUttaksdag: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    fellesperiodedagerMor: number
): Periode[] => {
    const perioder: Periode[] = [];
    const fellesKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Fellesperiode
    );
    const flerbarnsKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Flerbarnsdager
    );
    const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Mødrekvote
    );
    const fkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Fedrekvote
    );

    const fellesperiodedagerTotalt =
        (fellesKonto ? fellesKonto.dager : 0) + (flerbarnsKonto ? flerbarnsKonto.dager : 0);

    let currentTomDate: Date = førsteUttaksdag;

    if (mkKonto !== undefined) {
        const dagerTilMor = fellesperiodedagerMor + mkKonto.dager;
        const periodeMor: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            tidsperiode: getTidsperiode(currentTomDate, dagerTilMor)
        };
        currentTomDate = Uttaksdagen(periodeMor.tidsperiode.tom).neste();
        perioder.push(periodeMor);
    }
    if (fkKonto !== undefined) {
        const dagerTilFar = fellesperiodedagerTotalt - fellesperiodedagerMor + fkKonto.dager;
        const periodeFar: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            tidsperiode: getTidsperiode(currentTomDate, dagerTilFar)
        };
        currentTomDate = Uttaksdagen(periodeFar.tidsperiode.tom).neste();
        perioder.push(periodeFar);
    }

    return perioder;
};
