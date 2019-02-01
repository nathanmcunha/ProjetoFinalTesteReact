import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPredio, defaultValue } from 'app/shared/model/predio.model';

export const ACTION_TYPES = {
  FETCH_PREDIO_LIST: 'predio/FETCH_PREDIO_LIST',
  FETCH_PREDIO: 'predio/FETCH_PREDIO',
  CREATE_PREDIO: 'predio/CREATE_PREDIO',
  UPDATE_PREDIO: 'predio/UPDATE_PREDIO',
  DELETE_PREDIO: 'predio/DELETE_PREDIO',
  RESET: 'predio/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPredio>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PredioState = Readonly<typeof initialState>;

// Reducer

export default (state: PredioState = initialState, action): PredioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PREDIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PREDIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PREDIO):
    case REQUEST(ACTION_TYPES.UPDATE_PREDIO):
    case REQUEST(ACTION_TYPES.DELETE_PREDIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PREDIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PREDIO):
    case FAILURE(ACTION_TYPES.CREATE_PREDIO):
    case FAILURE(ACTION_TYPES.UPDATE_PREDIO):
    case FAILURE(ACTION_TYPES.DELETE_PREDIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREDIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PREDIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PREDIO):
    case SUCCESS(ACTION_TYPES.UPDATE_PREDIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PREDIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/predios';

// Actions

export const getEntities: ICrudGetAllAction<IPredio> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PREDIO_LIST,
  payload: axios.get<IPredio>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPredio> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PREDIO,
    payload: axios.get<IPredio>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPredio> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PREDIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPredio> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PREDIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPredio> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PREDIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
