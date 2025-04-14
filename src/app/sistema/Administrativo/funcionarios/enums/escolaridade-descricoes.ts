import { Escolaridade } from './escolaridade';

export const EscolaridadeDescricoes: Record<Escolaridade, string> = {
  [Escolaridade.ENSINO_FUNDAMENTAL_INCOMPLETO]: 'Ensino Fundamental Incompleto',
  [Escolaridade.ENSINO_FUNDAMENTAL_COMPLETO]: 'Ensino Fundamental Completo',
  [Escolaridade.ENSINO_MEDIO_INCOMPLETO]: 'Ensino Médio Incompleto',
  [Escolaridade.ENSINO_MEDIO_COMPLETO]: 'Ensino Médio Completo',
  [Escolaridade.ENSINO_SUPERIOR_INCOMPLETO]: 'Ensino Superior Incompleto',
  [Escolaridade.ENSINO_SUPERIOR_COMPLETO]: 'Ensino Superior Completo',
  [Escolaridade.POS_GRADUACAO]: 'Pós-Graduação',
  [Escolaridade.MESTRADO]: 'Mestrado',
  [Escolaridade.DOUTORADO]: 'Doutorado',
};
