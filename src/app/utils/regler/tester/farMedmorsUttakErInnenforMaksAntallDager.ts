import { RegelTestresultat, Regelgrunnlag, RegelTest, Regel, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';
import { Forelder } from '../../../types';

const farMedmorsUttakErInnenforMaksAntallDager: RegelTest = (
    key: RegelKey,
    grunnlag: Regelgrunnlag,
    forelderRegel: RegelKey
): RegelTestresultat => {
    const { forbruk, tilgjengeligeDager, navnFarMedmor, erDeltOmsorg } = grunnlag;
    if (forbruk === undefined || tilgjengeligeDager === undefined || forbruk.farMedmor === undefined) {
        return {
            key,
            passerer: true
        };
    }

    const maksDager = erDeltOmsorg === false ? tilgjengeligeDager.dagerForeldrepenger : tilgjengeligeDager.maksDagerFar;
    const dagerGjenstående = maksDager - forbruk.farMedmor.dagerTotalt;
    const passerer = dagerGjenstående >= 0;

    return {
        key,
        passerer,
        regelbrudd: passerer
            ? undefined
            : {
                  alvorlighet: RegelAlvorlighet.ULOVLIG,
                  key,
                  feilmelding: {
                      intlKey: `regel.feiler.${key}`,
                      values: {
                          navn: navnFarMedmor,
                          dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(maksDager, intl),
                          dagerRegistrert: (intl: InjectedIntl) =>
                              getVarighetString(Math.abs(forbruk.farMedmor!.dagerTotalt), intl)
                      }
                  },
                  forelderRegel
              }
    };
};

export const farMedmorsUttakErInnenforMaksAntallDagerRegel: Regel = {
    key: RegelKey.farMedmorsUttakErInnenforMaksAntallDager,
    test: farMedmorsUttakErInnenforMaksAntallDager,
    erRelevant: ({ erDeltOmsorg, aleneomsorgForelder }) =>
        (erDeltOmsorg === false && aleneomsorgForelder === Forelder.farMedmor) || erDeltOmsorg === true,
    forelderRegel: RegelKey.alleUttakErInnenforMaksAntallDager
};
