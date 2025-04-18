import { Cargo } from './cargo';

export const CargoDescricoes: Record<Cargo, string> = {
  [Cargo.ADMIN]: 'Administrador',
  [Cargo.RH]: 'Recursos Humanos',
  [Cargo.GERENTE_GERAL]: 'Gerente Geral',
  [Cargo.GERENTE]: 'Gerente',
  [Cargo.SUPERVISOR]: 'Supervisor',
  [Cargo.VENDEDOR]: 'Vendedor',
  [Cargo.COLABORADOR]: 'Colaborador',
};
