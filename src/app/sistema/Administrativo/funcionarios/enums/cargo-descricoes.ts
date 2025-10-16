import { Cargo } from './cargo';

export const CargoDescricoes: Record<Cargo, string> = {
  [Cargo.ADMIN]: 'Diretor Geral (Admin)',
  [Cargo.DIRETOR]: 'Diretor',
  [Cargo.RH]: 'Recursos Humanos',
  [Cargo.GERENTE_GERAL]: 'Gerente Geral',
  [Cargo.GERENTE]: 'Gerente',
  [Cargo.SUPERVISOR]: 'Supervisor',
  [Cargo.VENDEDOR]: 'Vendedor',
  [Cargo.CONSULTOR_VENDAS]: 'Consultor de Vendas',
  [Cargo.FINANCEIRO]: 'Financeiro',
  [Cargo.COBRADOR]: 'Cobrador',
  [Cargo.ASSISTENTE_ADMINISTRATIVO]: 'Assistente Administrativo',
  [Cargo.AUXILIAR_ESCRITORIO]: 'Auxiliar de Escritório',
  [Cargo.MARKETING]: 'Marketing',
  [Cargo.SUPORTE_TI]: 'Suporte de TI',
  [Cargo.ESTAGIARIO]: 'Estagiário',
};
