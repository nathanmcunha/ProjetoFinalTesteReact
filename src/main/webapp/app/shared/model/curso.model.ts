import { IDisciplina } from 'app/shared/model/disciplina.model';
import { IProfessor } from 'app/shared/model/professor.model';

export interface ICurso {
  id?: number;
  nome?: string;
  disciplinas?: IDisciplina[];
  professors?: IProfessor[];
}

export const defaultValue: Readonly<ICurso> = {};
