import { createSelector } from 'reselect';
import { AppState } from '../reducers/rootReducer';
import { Forbruk, TilgjengeligeDager, Periode } from '../../types';
import { getForbruk } from '../../utils/forbrukUtils';
import { getTilgjengeligeDager } from '../../utils/kontoUtils';

const getState = (state: AppState): AppState => state;

export const selectPerioder = createSelector(
    [getState],
    (state): Periode[] => state.common.perioder
);

export const selectPeriodeFørTermin = createSelector(
    [getState],
    (state): Periode => state.common.periodeFørTermin
);

export const selectTilgjengeligeDager = createSelector(
    [getState],
    (state): TilgjengeligeDager | undefined =>
        getTilgjengeligeDager(
            state.common.dekningsgrad === '100'
                ? state.common.stønadskontoer100.kontoer
                : state.common.stønadskontoer80.kontoer
        )
);

export const selectForbruk = createSelector(
    [selectPeriodeFørTermin, selectPerioder, selectTilgjengeligeDager],
    (periodeFørTermin, perioder, tilgjengeligeDager): Forbruk | undefined => {
        if (periodeFørTermin && perioder && tilgjengeligeDager) {
            return getForbruk([periodeFørTermin, ...perioder], tilgjengeligeDager.dagerTotalt);
        }
        return undefined;
    }
);
