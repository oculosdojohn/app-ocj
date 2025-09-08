import { TiposProcedimento } from './tipoProcedimento';

export const TiposProcedimentoDescricoes: Record<TiposProcedimento, string> = {
  [TiposProcedimento.EXAME_ADMISSIONAL]: 'Exame admissional',
  [TiposProcedimento.EXAME_DEMISSIONAL]: 'Exame demissional',
  [TiposProcedimento.EXAME_PERIODICO]: 'Exame periódico',
  [TiposProcedimento.CONSULTA_MEDICA]: 'Consulta médica',
  [TiposProcedimento.ACIDENTE_TRABALHO]: 'Acidente de trabalho',
  [TiposProcedimento.VACINA]: 'Vacina',
  [TiposProcedimento.ATESTADO_MEDICO]: 'Atestado médico',
  [TiposProcedimento.OUTROS]: 'Outros',
};
