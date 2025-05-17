import { Endereco } from './endereco';

export class Loja {
  id!: string;
  nome!: string;
  endereco!: Endereco;
  supervisor!: {
    foto?: { documentoUrl: string; id: number; name: string }; 
    username: string;
    cargo: string;
    telefoneUm?: string;
  };
  id_supervisor!: string;
  quantidadeFuncionarios!: string;
  colaboradores!: {
    username: string;
    cargo: string;
    departamento?: { nome: string };
    telefoneUm?: string;
  }[];
}
