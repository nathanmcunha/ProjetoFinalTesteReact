import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICurso, defaultValue } from 'app/shared/model/curso.model';

export const ACTION_TYPES = {
  FETCH_CURSO_LIST: 'curso/FETCH_CURSO_LIST',
  FETCH_CURSO: 'curso/FETCH_CURSO',
  CREATE_CURSO: 'curso/CREATE_CURSO',
  UPDATE_CURSO: 'curso/UPDATE_CURSO',
  DELETE_CURSO: 'curso/DELETE_CURSO',
  RESET: 'curso/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICurso>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CursoState = Readonly<typeof initialState>;

// Reducer

export default (state: CursoState = initialState, action): CursoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CURSO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CURSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CURSO):
    case REQUEST(ACTION_TYPES.UPDATE_CURSO):
    case REQUEST(ACTION_TYPES.DELETE_CURSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CURSO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CURSO):
    case FAILURE(ACTION_TYPES.CREATE_CURSO):
    case FAILURE(ACTION_TYPES.UPDATE_CURSO):
    case FAILURE(ACTION_TYPES.DELETE_CURSO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CURSO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CURSO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CURSO):
    case SUCCESS(ACTION_TYPES.UPDATE_CURSO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CURSO):
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

const apiUrl = 'api/cursos';

// Actions

export const getEntities: ICrudGetAllAction<ICurso> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CURSO_LIST,
  payload: axios.get<ICurso>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICurso> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CURSO,
    payload: axios.get<ICurso>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICurso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CURSO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICurso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CURSO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICurso> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CURSO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
