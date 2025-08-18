import { TipoDemissao } from './tipo-demissao';

export const TipoDemissaoDescricoes: Record<TipoDemissao, string> = {
  [TipoDemissao.SEM_JUSTA_CAUSA]: 'Sem Justa Causa',
  [TipoDemissao.POR_JUSTA_CAUSA]: 'Por Justa Causa',
  [TipoDemissao.QUEBRA_DE_CONTRATO_EMPREGADO]: 'Quebra de Contrato (Empregado)',
  [TipoDemissao.QUEBRA_DE_CONTRATO_EMPREGADOR]: 'Quebra de Contrato (Empregador)',
  [TipoDemissao.PEDIDO_DE_DEMISSAO]: 'Pedido de Demissão',
};
