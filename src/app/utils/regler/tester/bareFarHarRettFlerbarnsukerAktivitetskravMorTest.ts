import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../../../../shared/regler/types';
import { Situasjon } from '../../../types';

export const bareFarHarRettFlerbarnsukerAktivitetskravMorTest: RegelTest = (
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { situasjon, antallBarn } = grunnlag;
    return {
        passerer: (situasjon === Situasjon.bareFar && antallBarn > 1) === false
    };
};
