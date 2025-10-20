import { Permissao } from "./permissao";

export const PermissaoDescricoes: Record<Permissao, string> = {
    [Permissao.ADMIN]: 'Diretor Geral',
    [Permissao.DIRETOR]: 'Diretor',
    [Permissao.RH]: 'Recursos Humanos',
    [Permissao.GERENTE_GERAL]: 'Gerente Geral',
    [Permissao.GERENTE]: 'Gerente',
    [Permissao.SUPERVISOR]: 'Supervisor',
    [Permissao.VENDEDOR]: 'Vendedor',
    [Permissao.CONSULTOR_VENDAS]: 'Consultor de Vendas',
    [Permissao.FINANCEIRO]: 'Financeiro',
    [Permissao.COBRADOR]: 'Cobrador',
    [Permissao.ASSISTENTE_ADMINISTRATIVO]: 'Assistente Administrativo',
    [Permissao.AUXILIAR_ESCRITORIO]: 'Auxiliar de Escritório',
    [Permissao.MARKETING]: 'Marketing',
    [Permissao.SUPORTE_TI]: 'Suporte de TI',
    [Permissao.ESTAGIARIO]: 'Estagiário',
    [Permissao.MONTADOR]: 'Montador (a)',
    [Permissao.MOTORISTA]: 'Motorista'
};