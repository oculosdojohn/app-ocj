export class Produto {
  id!: string;
  dataCadastro!: string;
  foto!: { documentoUrl: string; id: number; name: string } | null;
  nome!: string;
  valor!: number;
  qtdEstoque!: number;
  usuario?: {
    id: string;
    username: string;
    foto: { documentoUrl: string; id: number; name: string };
    dataResgate?: string;
    dataEntrega?: string;
    entrege?: boolean;
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
