import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../../../../shared/regler/types';
import { ForeldreparSituasjon } from 'app/types';

export const bareFarHarRettFlerbarnsukerAktivitetskravMorTest: RegelTest = (
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { situasjon, antallBarn } = grunnlag;
    return {
        passerer: (situasjon === ForeldreparSituasjon.bareFar && antallBarn > 1) === false
    };
};
