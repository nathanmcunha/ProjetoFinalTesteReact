import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDisciplina, defaultValue } from 'app/shared/model/disciplina.model';

export const ACTION_TYPES = {
  FETCH_DISCIPLINA_LIST: 'disciplina/FETCH_DISCIPLINA_LIST',
  FETCH_DISCIPLINA: 'disciplina/FETCH_DISCIPLINA',
  CREATE_DISCIPLINA: 'disciplina/CREATE_DISCIPLINA',
  UPDATE_DISCIPLINA: 'disciplina/UPDATE_DISCIPLINA',
  DELETE_DISCIPLINA: 'disciplina/DELETE_DISCIPLINA',
  RESET: 'disciplina/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDisciplina>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DisciplinaState = Readonly<typeof initialState>;

// Reducer

export default (state: DisciplinaState = initialState, action): DisciplinaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DISCIPLINA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DISCIPLINA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DISCIPLINA):
    case REQUEST(ACTION_TYPES.UPDATE_DISCIPLINA):
    case REQUEST(ACTION_TYPES.DELETE_DISCIPLINA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DISCIPLINA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DISCIPLINA):
    case FAILURE(ACTION_TYPES.CREATE_DISCIPLINA):
    case FAILURE(ACTION_TYPES.UPDATE_DISCIPLINA):
    case FAILURE(ACTION_TYPES.DELETE_DISCIPLINA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISCIPLINA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DISCIPLINA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DISCIPLINA):
    case SUCCESS(ACTION_TYPES.UPDATE_DISCIPLINA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DISCIPLINA):
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

const apiUrl = 'api/disciplinas';

// Actions

export const getEntities: ICrudGetAllAction<IDisciplina> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DISCIPLINA_LIST,
  payload: axios.get<IDisciplina>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDisciplina> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DISCIPLINA,
    payload: axios.get<IDisciplina>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDisciplina> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DISCIPLINA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDisciplina> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DISCIPLINA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDisciplina> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DISCIPLINA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
