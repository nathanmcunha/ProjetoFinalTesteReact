import { ICurso } from 'app/shared/model/curso.model';

export interface IProfessor {
  id?: number;
  nome?: string;
  cursos?: ICurso[];
}

export const defaultValue: Readonly<IProfessor> = {};
