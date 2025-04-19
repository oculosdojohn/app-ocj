import { Permissao } from "./permissao"; 

export class Usuario {
  id!: string;
  fotoUrl!: any;
  username!: string;
  password!: string;
  confirmPassword!: string;
  emailPessoal!: string;
  permissao!: Permissao;
  cargo!: string; 
}