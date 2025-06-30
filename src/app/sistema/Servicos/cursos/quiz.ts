import { Modulos } from './enums/modulos';

interface Alternativas {
  alternativa: string;
  respostaCerta: boolean;
  descricao: string;
}

interface Resposta {
  letraAlternativa: string;
  quizzId: number;
}

export interface RespostasQuizDTO {
  respostas: Resposta[];
}

export class Quiz {
  id!: string;
  dataCadastro?: string;
  modulo!: Modulos;
  valorMoedas!: number;
  enunciado!: string;
  alternativas!: Alternativas[];
  respostas?: Resposta[];
}
