export interface NoticiaResponse {
  id?: number;
  titulo: string;
  conteudo: string;
  lojas: { id: string; nome: string; endereco: { cidade: string } }[];
  autor?: string;
  publicadaEm?: number;
}

export class Noticia {
  titulo!: string;
  conteudo!: string;
  lojasIds!: string[];

  toJson?(): string {
    return JSON.stringify({
      content: this.conteudo,
      lojasIds: this.lojasIds,
    });
  }
}
