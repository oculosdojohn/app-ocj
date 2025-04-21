import { Permissao } from "./permissao"; 

export class Usuario {
  id!: string;
  foto!: { documentoUrl: string; id: number; name: string } | null;
  username!: string;
  password!: string;
  confirmPassword!: string;
  emailPessoal!: string;
  permissao!: Permissao;
  cargo!: string; 
}