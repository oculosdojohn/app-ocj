export class Noticia {
  id!: string;
  titulo!: string;
  conteudo!: string;
  lojasIds!: string[];
  lojas!: { id: string; nome: string; endereco: { cidade: string } }[];
  autor!: { id: string; username: string };
  publicadaEm!: number;

  toJson?(): string {
    return JSON.stringify({
      conteudo: this.conteudo,
      lojasIds: this.lojasIds,
    });
  }
}
