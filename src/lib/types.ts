export type Role = 'admin' | 'operador' | 'leitor';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: Role;
  status: 'ativo' | 'inativo';
  criadoEm: string;
  ultimoAcesso?: string;
  tenantId?: string;
}

export interface Tenant {
  id: string;
  nome: string;
  slug: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  status: 'ativo' | 'inativo';
  planoId?: string;
  criadoEm: string;
}

export interface Dispositivo {
  id: string;
  tenantId: string;
  apelido?: string;
  status: 'ativo' | 'bloqueado' | 'pendente';
  ultimaSync?: string;
  vinculadoA?: string;
  createdAt: string;
  tags?: string[];
}

export interface Licenca {
  id: string;
  tenantId: string;
  chave: string;
  tipo: 'trial' | 'mensal' | 'anual' | 'vitalicia';
  status: 'ativa' | 'expirada' | 'revogada' | 'pendente';
  ativacoesMax: number;
  ativacoesUsadas: number;
  validaAte?: string;
  criadaEm: string;
  notas?: string;
}

export interface Plano {
  id: string;
  nome: string;
  periodicidade: 'mensal' | 'anual' | 'vitalicio';
  preco: number;
  dispositivosMax?: number;
  licencasIncluidas?: number;
  status: 'ativo' | 'inativo';
  criadoEm: string;
}

export interface Webhook {
  id: string;
  tenantId?: string;
  url: string;
  eventos: string[];
  segredo?: string;
  status: 'ativo' | 'inativo';
  ultimoEnvio?: string;
  criadoEm: string;
}

export interface Log {
  id: string;
  timestamp: string;
  usuario?: string;
  tenantId?: string;
  entidade: 'usuario' | 'tenant' | 'dispositivo' | 'licenca' | 'plano' | 'webhook' | 'sistema';
  acao: 'create' | 'read' | 'update' | 'delete' | 'login' | 'status_change';
  resumo: string;
  diff?: Record<string, any>;
  ip?: string;
}

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
  role: Role;
}

export interface DashboardStats {
  totalUsuarios: number;
  tenantsAtivos: number;
  dispositivosAtivos: number;
  dispositivosBloqueados: number;
  licencasAtivas: number;
  licencasExpirando: number;
  licencasExpiradas: number;
}
