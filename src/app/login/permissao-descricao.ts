import { Permissao } from "./permissao";

export const PermissaoDescricoes: Record<Permissao, string> = {
    [Permissao.ADMIN]: 'Administrador',
    [Permissao.RH]: 'Recursos Humanos',
    [Permissao.GERENTE_GERAL]: 'Gerente Geral',
    [Permissao.GERENTE]: 'Gerente',
    [Permissao.SUPERVISOR]: 'Supervisor',
    [Permissao.VENDEDOR]: 'Vendedor',
    [Permissao.COLABORADOR]: 'Colaborador',
    [Permissao.CONSULTOR_VENDAS]: 'Consultor de Vendas',
    [Permissao.FINANCEIRO]: 'Financeiro',
    [Permissao.COBRADOR]: 'Cobrador',
    [Permissao.ESTAGIARIO]: 'Estagiário',
};