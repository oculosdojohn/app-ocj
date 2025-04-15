import { Escolaridade } from './escolaridade';

export const EscolaridadeDescricoes: Record<Escolaridade, string> = {
  [Escolaridade.FUNDAMENTAL_INCOMPLETO]: 'Fundamental Incompleto',
  [Escolaridade.FUNDAMENTAL_COMPLETO]: 'Fundamental Completo',
  [Escolaridade.MEDIO_INCOMPLETO]: 'Médio Incompleto',
  [Escolaridade.MEDIO_COMPLETO]: 'Médio Completo',
  [Escolaridade.SUPERIOR_INCOMPLETO]: 'Superior Incompleto',
  [Escolaridade.SUPERIOR_COMPLETO]: 'Superior Completo',
  [Escolaridade.POS_GRADUACAO]: 'Pós-Graduação',
  [Escolaridade.MESTRADO]: 'Mestrado',
  [Escolaridade.DOUTORADO]: 'Doutorado',
};
