import { CID10 } from "./CID10";

export const CID10Descricoes: Record<CID10, string> = {
  // Doenças infecciosas
  [CID10.A00]: 'A00 - Cólera',
  [CID10.A09]: 'A09 - Diarreia e gastroenterite de origem infecciosa presumível',
  [CID10.B20]:
    'B20 - Doença pelo HIV resultando em doenças infecciosas e parasitárias',

  // Neoplasias
  [CID10.C50]: 'C50 - Neoplasia maligna da mama',

  // Endócrinas / metabólicas
  [CID10.E11]: 'E11 - Diabetes mellitus tipo 2',
  [CID10.E66]: 'E66 - Obesidade',

  // Psiquiátricas
  [CID10.F32]: 'F32 - Episódio depressivo',
  [CID10.F41]: 'F41 - Transtornos de ansiedade',

  // Neurológicas
  [CID10.G40]: 'G40 - Epilepsia',
  [CID10.G43]: 'G43 - Enxaqueca',

  // Circulatórias
  [CID10.I10]: 'I10 - Hipertensão essencial (primária)',
  [CID10.I20]: 'I20 - Angina pectoris',

  // Respiratórias
  [CID10.J06]: 'J06 - Infecções agudas de vias aéreas superiores',
  [CID10.J45]: 'J45 - Asma',

  // Digestivas
  [CID10.K29]: 'K29 - Gastrite e duodenite',
  [CID10.K35]: 'K35 - Apendicite aguda',

  // Osteomusculares
  [CID10.M54]: 'M54 - Dorsalgia (dor nas costas)',
  [CID10.M75]: 'M75 - Lesões do ombro (ex.: síndrome do manguito rotador)',

  // Geniturinárias
  [CID10.N18]: 'N18 - Doença renal crônica',

  // Gerais / Z codes
  [CID10.Z00]:
    'Z00 - Exame geral e investigação de pessoas sem queixas ou diagnóstico relatado',
  [CID10.Z01]: 'Z01 - Outros exames especiais',
  [CID10.Z02]: 'Z02 - Exame para fins administrativos',
};
