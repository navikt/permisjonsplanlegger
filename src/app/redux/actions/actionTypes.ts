import { Dekningsgrad } from 'app/types';

export enum PlanleggerActionTypeKeys {
	'SET_NAVN_FORELDER1',
	'SET_NAVN_FORELDER2',
	'SET_TERMINDATO',
	'SET_UKER_FORELDER1',
	'SET_UKER_FORELDER2',
	'SETT_DEKNINGSGRAD',
	'UTSETTELSE_VIS_DIALOG',
	'UTSETTELSE_LUKK_DIALOG'
}

export type PlanleggerActionTypes =
	| SetNavnForelder1
	| SetNavnForelder2
	| SetTermindato
	| SetUkerForelder2
	| SetUkerForelder1
	| SetDekningsgrad
	| UtsettelseVisDialog
	| UtsettelseLukkDialog;

export interface SetNavnForelder1 {
	type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER1;
	navn: string;
}

export interface SetNavnForelder2 {
	type: PlanleggerActionTypeKeys.SET_NAVN_FORELDER2;
	navn: string;
}

export interface SetTermindato {
	type: PlanleggerActionTypeKeys.SET_TERMINDATO;
	termindato: Date;
}

export interface SetUkerForelder1 {
	type: PlanleggerActionTypeKeys.SET_UKER_FORELDER1;
	uker: number;
}

export interface SetUkerForelder2 {
	type: PlanleggerActionTypeKeys.SET_UKER_FORELDER2;
	uker: number;
}

export interface SetDekningsgrad {
	type: PlanleggerActionTypeKeys.SETT_DEKNINGSGRAD;
	dekningsgrad: Dekningsgrad | undefined;
}

export interface UtsettelseVisDialog {
	type: PlanleggerActionTypeKeys.UTSETTELSE_VIS_DIALOG;
}

export interface UtsettelseLukkDialog {
	type: PlanleggerActionTypeKeys.UTSETTELSE_LUKK_DIALOG;
}
