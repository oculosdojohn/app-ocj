export class Produto {
  id!: string;
  dataCadastro!: string;
  foto!: { documentoUrl: string; id: number; name: string } | null;
  nome!: string;
  valor!: number;
  qtdEstoque!: number;
  colaboradores?: {
    username: string;
    foto: { documentoUrl: string; id: number; name: string };
    dataResgateProduto?: string;
  }[];

  toJson?(): string {
    return JSON.stringify({
      foto: this.foto,
      nome: this.nome,
      valor: this.valor,
      qtdEstoque: this.qtdEstoque,
    });
  }
}
