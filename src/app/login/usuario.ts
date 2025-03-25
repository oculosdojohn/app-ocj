import { Permissao } from "./permissao"; 

export class Usuario {
  id!: string;
  fotoUrl!: any;
  username!: string;
  password!: string;
  confirmPassword!: string;
  email!: string;
  nome!: string;
  nomeDaEmpresa!: string;
  setorDaEmpresa!: string;
  permissao!: Permissao; 
}