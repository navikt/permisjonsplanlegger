import { RegelTestresultat, RegelTest } from '../../../../shared/types';
import { IntlShape } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import { Regelgrunnlag } from '../types';

export const erMorsUttakErInnenforMaksAntallDagerTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk, tilgjengeligeDager, navnMor, erDeltOmsorg } = grunnlag;

    if (erDeltOmsorg === false || forbruk === undefined || tilgjengeligeDager === undefined) {
        return {
            passerer: true,
        };
    }

    const passerer = forbruk.mor.dagerForMye <= 0;
    const maksDager =
        tilgjengeligeDager.maksDagerMor +
        (forbruk.skalHaForeldrepengerFørFødsel ? forbruk.mor.dagerForeldrepengerFørFødsel : 0);

    return {
        passerer,
        info: passerer
            ? undefined
            : {
                  values: {
                      navn: navnMor,
                      dagerTilgjengelig: (intl: IntlShape) => getVarighetString(maksDager, intl),
                      dagerRegistrert: (intl: IntlShape) => getVarighetString(Math.abs(forbruk.mor.dagerTotalt), intl),
                  },
              },
    };
};
