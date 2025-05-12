import { PeriodoExperiencia } from './periodo-experiencia';

export const PeriodoExperienciaDescricoes: Record<PeriodoExperiencia, string> = {
    [PeriodoExperiencia.QUARENTA_CINCO_DIAS]: '45 Dias',
    [PeriodoExperiencia.MAIS_QUARENTA_CINCO]: '+ 45 Dias',
    [PeriodoExperiencia.NOVENTA_DIAS]: '90 Dias',
    [PeriodoExperiencia.NAO_SE_APLICA]: 'Não se aplica',
  };
