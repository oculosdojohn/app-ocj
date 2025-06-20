import { Modulos } from './enums/modulos';

interface Alternativas {
  alternativa: string;
  respostaCerta: boolean;
  descricao: string;
}

export class Quiz {
  id!: string;
  dataCadastro?: string;
  modulo!: Modulos;
  valorMoedas!: number;
  enunciado!: string;
  alternativas!: Alternativas[];
}
