import { ISala } from 'app/shared/model/sala.model';

export interface IPredio {
  id?: number;
  numero?: string;
  salas?: ISala[];
}

export const defaultValue: Readonly<IPredio> = {};
