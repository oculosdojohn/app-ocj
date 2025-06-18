export class Produto {
  id!: string;
  dataCadastro!: string;
  foto!: { documentoUrl: string; id: number; name: string } | null;
  nome!: string;
  qtdMoedas!: number;
  qtdEstoque!: number;
  colaboradores?: {
    username: string;
    foto: { documentoUrl: string; id: number; name: string };
    dataResgateProduto?: string;
  }[];

  toJson?(): string {
    return JSON.stringify({
      id: this.id,
      dataCadastro: this.dataCadastro,
      foto: this.foto,
      nome: this.nome,
      qtdMoedas: this.qtdMoedas,
      qtdEstoque: this.qtdEstoque,
    });
  }
}
