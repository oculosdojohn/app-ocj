import { Endereco } from './endereco';

export class Loja {
    id!: string;
    nome!: string;
    endereco!: Endereco;
    supervisor!: string;
    quantidadeFuncionarios!: string;
}