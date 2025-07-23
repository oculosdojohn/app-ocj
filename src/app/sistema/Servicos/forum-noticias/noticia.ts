export class Noticia {
  id!: string;
  titulo!: string;
  conteudo!: string;
  lojasIds!: string[];
  lojas!: { id: string; nome: string; endereco: { cidade: string } }[];
  autor!: string;
  publicadaEm!: number;

  toJson?(): string {
    return JSON.stringify({
      conteudo: this.conteudo,
      lojasIds: this.lojasIds,
    });
  }
}
