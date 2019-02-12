import { Språkkode } from '../../../intl/types';
import {
    Periode,
    SituasjonSkjemadata,
    TilgjengeligStønadskonto,
    Forbruk,
    TilgjengeligeDager,
    OmForeldre
} from '../../../types';
import { Dekningsgrad } from 'common/types';
import { History } from 'history';
import { CommonState } from '../../reducers/commonReducer';
import { UttaksplanRegelTestresultat } from '../../../utils/regler/types';

export enum CommonActionKeys {
    'SET_SPRÅK' = 'setSpråk',
    'SET_DEKNINGSGRAD' = 'setDekningsgrad',
    'SUBMIT_SKJEMADATA' = 'submitSkjemadata',
    'GET_STØNADSKONTOER' = 'getStonadskontoer',
    'SET_STØNADSKONTOER' = 'setStonadskontoer',
    'SET_PERIODER' = 'setPerioder',
    'ADD_PERIODE' = 'addPeriode',
    'UPDATE_PERIODE' = 'updatePeriode',
    'REMOVE_PERIODE' = 'removePeriode',
    'SLÅ_SAMMEN_PERIODER' = 'slåSammenPerioder',
    'MOVE_PERIODE' = 'movePeriode',
    'APPLY_STORAGE' = 'applyStorage',
    'UPDATE_FORBRUK' = 'updateForbruk',
    'UPDATE_TILGJENGELIGE_DAGER' = 'updateTilgjengeligeDager',
    'UPDATE_OM_FORELDRE' = 'updateOmForeldre',
    'RESET_APP' = 'resetApp',
    'SET_UTTAKSDAGER_FØR_TERMIN' = 'setUttaksdagerFørTermin',
    'SET_ØNSKET_FORDELING' = 'setØnsketFordeling',
    'NY_PERIODE_CHANGE' = 'nyPeriodeChange',
    'SET_UTTAKSPLAN_VALIDERING' = 'setUttaksplanValidering'
}

interface SetSpråkAction {
    type: CommonActionKeys.SET_SPRÅK;
    språkkode: Språkkode;
}

export interface SubmitSkjemadataAction {
    type: CommonActionKeys.SUBMIT_SKJEMADATA;
    data: SituasjonSkjemadata;
    history: History;
}

export interface GetStønadskontoerAction {
    type: CommonActionKeys.GET_STØNADSKONTOER;
    history: History;
}

export interface SetStønadskontoerKontoerPayload {
    dekning80: TilgjengeligStønadskonto[];
    dekning100: TilgjengeligStønadskonto[];
}

export interface SetStønadskontoerAction {
    type: CommonActionKeys.SET_STØNADSKONTOER;
    kontoer: SetStønadskontoerKontoerPayload;
}

export interface ApplyStorageAction {
    type: CommonActionKeys.APPLY_STORAGE;
    storage: CommonState;
}

export interface UpdateForbrukAction {
    type: CommonActionKeys.UPDATE_FORBRUK;
    forbruk: Forbruk | undefined;
}

export interface UpdateTilgjengeligeDagerAction {
    type: CommonActionKeys.UPDATE_TILGJENGELIGE_DAGER;
    tilgjengeligeDager: TilgjengeligeDager | undefined;
}

export interface UpdateOmForeldreAction {
    type: CommonActionKeys.UPDATE_OM_FORELDRE;
    omForeldre: OmForeldre;
}

export interface ResetAppAction {
    type: CommonActionKeys.RESET_APP;
}

export interface SetUttaksplanValideringAction {
    type: CommonActionKeys.SET_UTTAKSPLAN_VALIDERING;
    validering: UttaksplanRegelTestresultat;
}

interface SetDekningsgradAction {
    type: CommonActionKeys.SET_DEKNINGSGRAD;
    dekningsgrad: Dekningsgrad;
}

interface SetPerioderAction {
    type: CommonActionKeys.SET_PERIODER;
    perioder: Periode[];
}

interface AddPeriodeAction {
    type: CommonActionKeys.ADD_PERIODE;
    periode: Periode;
}

interface UpdatePeriodeAction {
    type: CommonActionKeys.UPDATE_PERIODE;
    periode: Periode;
}

interface RemovePeriodeAction {
    type: CommonActionKeys.REMOVE_PERIODE;
    periode: Periode;
}

interface SlåSammenPerioderAction {
    type: CommonActionKeys.SLÅ_SAMMEN_PERIODER;
    periode1: Periode;
    periode2: Periode;
}

interface MovePeriodeAction {
    type: CommonActionKeys.MOVE_PERIODE;
    periode: Periode;
    toIndex: number;
}

interface SetØnsketFordelingAction {
    type: CommonActionKeys.SET_ØNSKET_FORDELING;
    ukerMor: number;
}

interface NyPeriodeChangeAction {
    type: CommonActionKeys.NY_PERIODE_CHANGE;
    periode: Periode | undefined;
}

export type CommonActionTypes =
    | SetSpråkAction
    | SetPerioderAction
    | SetStønadskontoerAction
    | SetDekningsgradAction
    | AddPeriodeAction
    | UpdatePeriodeAction
    | RemovePeriodeAction
    | SlåSammenPerioderAction
    | MovePeriodeAction
    | SubmitSkjemadataAction
    | ApplyStorageAction
    | UpdateForbrukAction
    | UpdateTilgjengeligeDagerAction
    | UpdateOmForeldreAction
    | ResetAppAction
    | SetØnsketFordelingAction
    | NyPeriodeChangeAction
    | SetUttaksplanValideringAction;
