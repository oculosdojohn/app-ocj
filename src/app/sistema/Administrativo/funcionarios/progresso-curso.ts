import { Modulos } from "../../Servicos/cursos/enums/modulos";

export class ProgressoCurso {
  quantidadeAulasAssistidas!: number;
  totalModuloFinalizados!: number;
  totalMoedas!: number;
  desempenhoPorModulo!: {
    modulo: Modulos;
    quantidadeAulasAssistidas: number;
    totalAulasNoModulo: number;
  }[];
}
