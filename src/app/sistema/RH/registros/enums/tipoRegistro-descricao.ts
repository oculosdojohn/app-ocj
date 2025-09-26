import { TipoRegistro } from './tipoRegistro';

export const tipoRegistroDescricao: { [key in TipoRegistro]: string } = {
  [TipoRegistro.FALTA_AUSENCIA]: 'Falta/Ausência',
  [TipoRegistro.ATRASO]: 'Atraso',
  [TipoRegistro.PROMOCAO]: 'Promoção',
  [TipoRegistro.FALHA_ERRO]: 'Falha/Erro',
  [TipoRegistro.IDEIA_CONTRIBUICAO]: 'Ideia/Contribuição',
  [TipoRegistro.RECONTRATACAO]: 'Recontratação',
  [TipoRegistro.OUTROS]: 'Outros',
  [TipoRegistro.ADVERTENCIA]: 'Advertência',
  [TipoRegistro.SUSPENSAO]: 'Suspensão',
  [TipoRegistro.SUBPERFORMANCE]: 'Subperformance',
  [TipoRegistro.FOLGA]: 'Folga',
};
