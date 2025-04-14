import { EstadoCivil } from './estado-civil';

export const EstadoCivilDescricoes: Record<EstadoCivil, string> = {
  [EstadoCivil.SOLTEIRO]: 'Solteiro',
  [EstadoCivil.CASADO]: 'Casado',
  [EstadoCivil.DIVORCIADO]: 'Divorciado',
  [EstadoCivil.VIUVO]: 'Viúvo',
  [EstadoCivil.UNIAO_ESTAVEL]: 'União Estável',
};
