import { takeEvery, all, put, select, call } from 'redux-saga/effects';
import api from '../../api';
import { GetStønadskontoerDTO, GetTilgjengeligeStønadskontoerParams, FPKontoServiceDTO } from '../../api/types';
import { getStønadskontoSortOrder } from '../../utils/kontoUtils';
import { updateApi } from '../actions/api/apiActionCreators';
import {
    CommonActionKeys,
    SubmitSkjemadataAction,
    GetStønadskontoerAction
} from '../actions/common/commonActionDefinitions';
import { setStønadskontoer } from '../actions/common/commonActionCreators';
import { SituasjonSkjemadata, TilgjengeligStønadskonto, StønadskontoType } from '../../types';
import { AppState } from '../reducers/rootReducer';
import situasjonsregler from '../../utils/situasjonsregler';
import { Pages } from '../../routes';
import { Dekningsgrad } from 'common/types';

const getStønadskontoerRequestParams = (
    familiehendelsesdato: Date,
    data: SituasjonSkjemadata,
    dekningsgrad: Dekningsgrad
): GetTilgjengeligeStønadskontoerParams => {
    return {
        antallBarn: data.antallBarn,
        erFødsel: true,
        familiehendelsesdato,
        farHarAleneomsorg: situasjonsregler.harFarAleneomsorg(data.situasjon),
        farHarRett: situasjonsregler.harFarRett(data.situasjon),
        morHarAleneomsorg: situasjonsregler.harMorAleneomsorg(data.situasjon),
        morHarRett: situasjonsregler.harMorRett(data.situasjon),
        startdatoUttak: new Date(),
        dekningsgrad
    };
};

const mockToForeldre: GetStønadskontoerDTO[] = [
    {
        kontoer: {
            FEDREKVOTE: { d80: 95, d100: 75 },
            MØDREKVOTE: { d80: 95, d100: 75 },
            FELLESPERIODE: { d80: 90, d100: 80 },
            FORELDREPENGER_FØR_FØDSEL: { d80: 15, d100: 15 }
        }
    },
    {
        kontoer: {
            MØDREKVOTE: { d80: 75, d100: 75 },
            FEDREKVOTE: { d80: 75, d100: 75 },
            FELLESPERIODE: { d80: 130, d100: 80 },
            FORELDREPENGER_FØR_FØDSEL: { d80: 15, d100: 15 },
            FLERBARNSDAGER: { d80: 10, d100: 10 }
        }
    }
];
const mockAleneomsorg: GetStønadskontoerDTO[] = [
    {
        kontoer: {
            FORELDREPENGER: { d80: 280, d100: 230 },
            FORELDREPENGER_FØR_FØDSEL: { d80: 15, d100: 15 }
        }
    },
    {
        kontoer: {
            FORELDREPENGER: { d80: 280, d100: 230 },
            FORELDREPENGER_FØR_FØDSEL: { d80: 15, d100: 15 },
            FLERBARNSDAGER: { d80: 10, d100: 10 }
        }
    }
];

const stateSelector = (state: AppState) => state;

const sortStønadskonto = (a: TilgjengeligStønadskonto, b: TilgjengeligStønadskonto) =>
    getStønadskontoSortOrder(a.stønadskontoType) > getStønadskontoSortOrder(b.stønadskontoType) ? 1 : -1;

const getKontoerFromDTO = (
    stønadskontoer: GetStønadskontoerDTO
): { dekning80: TilgjengeligStønadskonto[]; dekning100: TilgjengeligStønadskonto[] } => {
    const dekning80: TilgjengeligStønadskonto[] = [];
    const dekning100: TilgjengeligStønadskonto[] = [];
    Object.keys(stønadskontoer.kontoer).forEach((konto) => {
        dekning80.push({
            dager: stønadskontoer.kontoer[konto].d80,
            stønadskontoType: konto as StønadskontoType
        });
        dekning100.push({
            dager: stønadskontoer.kontoer[konto].d100,
            stønadskontoType: konto as StønadskontoType
        });
    });
    dekning80.sort(sortStønadskonto);
    dekning100.sort(sortStønadskonto);
    return {
        dekning100,
        dekning80
    };
};

const trekkFlerbarnsdagerFraFellesperiode = (kontoerDTO: FPKontoServiceDTO): FPKontoServiceDTO => {
    const flerbarnsdager = kontoerDTO.kontoer[StønadskontoType.Flerbarnsdager];
    const fellesperiode = kontoerDTO.kontoer[StønadskontoType.Fellesperiode];
    if (flerbarnsdager && fellesperiode) {
        return {
            ...kontoerDTO,
            kontoer: {
                ...kontoerDTO.kontoer,
                [`${StønadskontoType.Fellesperiode}`]: fellesperiode - flerbarnsdager
            }
        };
    }
    return kontoerDTO;
};

const getKontoerFromForeldrepengerDTO = (
    kontoer80: FPKontoServiceDTO,
    kontoer100: FPKontoServiceDTO
): { dekning80: TilgjengeligStønadskonto[]; dekning100: TilgjengeligStønadskonto[] } => {
    const dekning80: TilgjengeligStønadskonto[] = [];
    const dekning100: TilgjengeligStønadskonto[] = [];

    const justerteKontoer80 = trekkFlerbarnsdagerFraFellesperiode(kontoer80);
    const justerteKontoer100 = trekkFlerbarnsdagerFraFellesperiode(kontoer100);

    Object.keys(justerteKontoer80.kontoer).forEach((konto) => {
        dekning80.push({
            dager: justerteKontoer80.kontoer[konto],
            stønadskontoType: konto as StønadskontoType
        });
        dekning100.push({
            dager: justerteKontoer100.kontoer[konto],
            stønadskontoType: konto as StønadskontoType
        });
    });
    dekning80.sort(sortStønadskonto);
    dekning100.sort(sortStønadskonto);
    return {
        dekning100,
        dekning80
    };
};

function* getStønadskontoer(skjemadata: SituasjonSkjemadata, familiehendelsesdato: Date) {
    const params80 = getStønadskontoerRequestParams(familiehendelsesdato, skjemadata, '80');
    const params100 = getStønadskontoerRequestParams(familiehendelsesdato, skjemadata, '100');
    try {
        yield put(updateApi({ stønadskontoer: { pending: true, error: undefined, result: undefined } }));
        const response80 = yield call(api.getUttakskontoer, params80);
        const response100 = yield call(api.getUttakskontoer, params100);
        const { dekning100, dekning80 } = getKontoerFromForeldrepengerDTO(response80.data, response100.data);
        yield put(setStønadskontoer({ dekning80, dekning100 }));
        yield put(
            updateApi({
                stønadskontoer: {
                    loaded: true,
                    pending: false
                }
            })
        );
    } catch (error) {
        const mock: GetStønadskontoerDTO =
            params80.farHarAleneomsorg || params80.morHarAleneomsorg
                ? mockAleneomsorg[params80.antallBarn - 1]
                : mockToForeldre[params80.antallBarn - 1];

        const { dekning100, dekning80 } = getKontoerFromDTO(mock);

        yield put(setStønadskontoer({ dekning80, dekning100 }));
        yield put(
            updateApi({
                stønadskontoer: { pending: false, result: undefined, error, loaded: true }
            })
        );
    }
}

function* getStønadskontoerSaga(action: SubmitSkjemadataAction | GetStønadskontoerAction) {
    const appState: AppState = yield select(stateSelector);
    const { skjemadata, familiehendelsesdato } = appState.common;

    if (skjemadata) {
        try {
            yield call(getStønadskontoer, skjemadata, familiehendelsesdato);
            if (action.type === CommonActionKeys.SUBMIT_SKJEMADATA) {
                action.history.push(Pages.planPage);
            }
        } catch (error) {
            action.history.replace(Pages.startPage);
        }
    } else {
        action.history.replace(Pages.startPage);
    }
}

function* stønadskontoerSaga() {
    yield all([
        takeEvery(CommonActionKeys.GET_STØNADSKONTOER, getStønadskontoerSaga),
        takeEvery(CommonActionKeys.SUBMIT_SKJEMADATA, getStønadskontoerSaga)
    ]);
}

export default stønadskontoerSaga;
