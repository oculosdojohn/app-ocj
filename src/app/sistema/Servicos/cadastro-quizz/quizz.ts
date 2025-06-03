import { Modulos } from '../cursos/enums/modulos';

export class Quizz {
  id!: string;
  dataCadastro!: string;
  modulo!: Modulos;
  enunciado!: string;
  qtdMoedas!: string;
}
