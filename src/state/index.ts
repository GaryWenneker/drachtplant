import actions, { IState } from "./actions";

import React from "react";
import ReactHookz from "../services/ReactHookz";
import useSupabaseService from '../services/useSupabaseService';

const initialState: IState = {
	data: [],
	showSearchModal: false,
  }

export const months: { [key: number]: string } = {
	1: 'januari',
	2: 'februari',
	3: 'maart',
	4: 'april',
	5: 'mei',
	6: 'juni',
	7: 'juli',
	8: 'augustus',
	9: 'september',
	10: 'oktober',
	11: 'november',
	12: 'december'
};
export const days: { [key: number]: string } = {
	1: 'ma',
	2: 'di',
	3: 'wo',
	4: 'do',
	5: 'vr',
	6: 'za',
	7: 'zo'
};


export const useReactHookz = ReactHookz(React, initialState, actions);
