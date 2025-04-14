import { Genero } from './genero';

export const GeneroDescricoes: Record<Genero, string> = {
  [Genero.MASCULINO]: 'Masculino',
  [Genero.FEMININO]: 'Feminino',
  [Genero.OUTRO]: 'Outro',
  [Genero.NAO_INFORMAR]: 'Prefiro não Informar',
};
