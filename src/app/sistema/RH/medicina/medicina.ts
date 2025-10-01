export class Medicina {
  id!: string;
  loja!: { id: string; nome: string; endereco: { cidade: string } } | null;
  lojaId!: string;
  usuarioId!: string;
  colaborador!: {
    id: string;
    username: string;
    foto: { documentoUrl: string; id: number; name: string };
    status: string;
  } | null;
  data!: string;
  tipo!: string;
  descricao!: string;
  crmDoMedico!: string;
  nomeDoMedico!: string;
  cid10!: string;
  avaliacao!: string;
  finalizado!: string;
  apto!: string;
  dataProximoExame!: string;
  numDiasAfastado!: string;
  documentos?: { documentoUrl: string; id: number; name: string }[];

  toJson(): string {
    return JSON.stringify({
      id: this.id,
      lojaId: this.lojaId,
      usuarioId: this.usuarioId,
      data: this.data,
      tipo: this.tipo,
      descricao: this.descricao,
      crmDoMedico: this.crmDoMedico,
      nomeDoMedico: this.nomeDoMedico,
      cid10: this.cid10,
      avaliacao: this.avaliacao,
      finalizado: this.finalizado,
      apto: this.apto,
      dataProximoExame: this.dataProximoExame,
      numDiasAfastado: this.numDiasAfastado,
    });
  }
}
