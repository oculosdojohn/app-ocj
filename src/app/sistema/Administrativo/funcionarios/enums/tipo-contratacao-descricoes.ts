import { TipoContratacao } from './tipo-contratacao';

export const TipoContratacaoDescricoes: Record<TipoContratacao, string> = {
  [TipoContratacao.CLT]: 'CLT',
  [TipoContratacao.CLT_COMISSAO]: 'CLT + Comissão',
  [TipoContratacao.PJ]: 'PJ',
  [TipoContratacao.TEMPORARIO]: 'Temporário',
  [TipoContratacao.ESTAGIO]: 'Estágio',
  [TipoContratacao.APRENDIZ]: 'Aprendiz',
};
