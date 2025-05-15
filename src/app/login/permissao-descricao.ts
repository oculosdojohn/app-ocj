import { Permissao } from "./permissao";

export const PermissaoDescricoes: Record<Permissao, string> = {
    [Permissao.ROLE_ADMIN]: 'ROLE_ADMIN',
    [Permissao.RH]: 'RH',
    [Permissao.GERENTE_GERAL]: 'GERENTE_GERAL',
    [Permissao.GERENTE]: 'GERENTE',
    [Permissao.SUPERVISOR]: 'SUPERVISOR',
    [Permissao.VENDEDOR]: 'VENDEDOR',
    [Permissao.COLABORADOR]: 'COLABORADOR'
};