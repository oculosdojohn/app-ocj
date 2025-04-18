export class Departamento {
    id!: string;
    nome!: string;
    descricao!: string;
    responsaveis!: {id: string; username: string; foto: { id: string; documentoUrl: string; nome: string } | null}[] | null;
    orcamento!: number;
    quantidadeFuncionarios!: string;
    telefone!: string;
    email!: string;
    localizacao!: string;
}