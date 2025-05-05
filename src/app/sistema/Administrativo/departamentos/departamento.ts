export class Departamento {
  id!: string;
  nome!: string;
  descricao!: string;
  responsaveis!:
    | {
        id: string;
        username: string;
        foto: { id: string; documentoUrl: string; nome: string } | null;
      }[]
    | null;
  orcamentoMensal!: number;
  quantidadeFuncionarios!: string;
  telefone!: string;
  email!: string;
  localizacao!: string;
  colaboradores!:
    | {
        id: string;
        username: string;
        cargo: string;
        loja: { nome: string; endereco: { cidade: string } };
        foto: { id: string; documentoUrl: string; nome: string } | null;
      }[]
    | null;
}
