import moment from 'moment';
import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../../../../shared/regler/types';
import { Forelder, ForeldreparSituasjon } from '../../../types';

export const harFarEllerMedmorUttakFørsteSeksUkerTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder, uttaksdatoer, navnFarMedmor, situasjon, navnMor } = grunnlag;
    const { førsteUttaksdagEtterSeksUker } = uttaksdatoer.etterFødsel;

    if (grunnlag.situasjon === ForeldreparSituasjon.farOgFar) {
        return {
            passerer: true
        };
    }
    const periode = perioder
        .filter(
            (p) =>
                p.forelder === Forelder.farMedmor &&
                moment.utc(p.tidsperiode.fom).isBefore(moment.utc(førsteUttaksdagEtterSeksUker), 'day')
        )
        .shift();

    return {
        passerer:
            periode === undefined ||
            (situasjon === ForeldreparSituasjon.bareFar || situasjon === ForeldreparSituasjon.aleneomsorg),
        info:
            periode === undefined
                ? undefined
                : {
                      values: {
                          navnFarMedmor,
                          navnMor
                      },
                      periodeId: periode.id
                  }
    };
};
