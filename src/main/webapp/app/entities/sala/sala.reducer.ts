import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISala, defaultValue } from 'app/shared/model/sala.model';

export const ACTION_TYPES = {
  FETCH_SALA_LIST: 'sala/FETCH_SALA_LIST',
  FETCH_SALA: 'sala/FETCH_SALA',
  CREATE_SALA: 'sala/CREATE_SALA',
  UPDATE_SALA: 'sala/UPDATE_SALA',
  DELETE_SALA: 'sala/DELETE_SALA',
  RESET: 'sala/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISala>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SalaState = Readonly<typeof initialState>;

// Reducer

export default (state: SalaState = initialState, action): SalaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SALA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SALA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SALA):
    case REQUEST(ACTION_TYPES.UPDATE_SALA):
    case REQUEST(ACTION_TYPES.DELETE_SALA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SALA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SALA):
    case FAILURE(ACTION_TYPES.CREATE_SALA):
    case FAILURE(ACTION_TYPES.UPDATE_SALA):
    case FAILURE(ACTION_TYPES.DELETE_SALA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SALA):
    case SUCCESS(ACTION_TYPES.UPDATE_SALA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SALA):
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

const apiUrl = 'api/salas';

// Actions

export const getEntities: ICrudGetAllAction<ISala> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SALA_LIST,
  payload: axios.get<ISala>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISala> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SALA,
    payload: axios.get<ISala>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISala> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SALA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISala> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SALA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISala> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SALA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
