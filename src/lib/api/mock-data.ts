import { Usuario, Dispositivo, Tenant, Log, DashboardStats } from '@/lib/types';

export const mockUsuarios: Usuario[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    role: 'admin',
    status: 'ativo',
    criadoEm: '2024-01-15T10:00:00Z',
    ultimoAcesso: '2024-10-02T08:30:00Z',
    tenantId: '1'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria.santos@example.com',
    role: 'operador',
    status: 'ativo',
    criadoEm: '2024-02-20T14:30:00Z',
    ultimoAcesso: '2024-10-01T16:45:00Z',
    tenantId: '1'
  },
  {
    id: '3',
    nome: 'Carlos Oliveira',
    email: 'carlos.oliveira@example.com',
    role: 'leitor',
    status: 'ativo',
    criadoEm: '2024-03-10T09:15:00Z',
    ultimoAcesso: '2024-09-30T11:20:00Z',
    tenantId: '2'
  },
  {
    id: '4',
    nome: 'Ana Paula',
    email: 'ana.paula@example.com',
    role: 'operador',
    status: 'inativo',
    criadoEm: '2024-04-05T13:00:00Z',
    tenantId: '2'
  }
];

export const mockTenants: Tenant[] = [
  {
    id: '1',
    nome: 'Empresa Alpha',
    slug: 'empresa-alpha',
    cnpj: '12.345.678/0001-90',
    email: 'contato@alpha.com',
    telefone: '(11) 98765-4321',
    status: 'ativo',
    planoId: '1',
    criadoEm: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    nome: 'Beta Solutions',
    slug: 'beta-solutions',
    cnpj: '98.765.432/0001-10',
    email: 'contato@beta.com',
    telefone: '(21) 91234-5678',
    status: 'ativo',
    planoId: '2',
    criadoEm: '2024-02-15T14:30:00Z'
  }
];

export const mockDispositivos: Dispositivo[] = [
  {
    id: 'DEV-001-ABC123',
    tenantId: '1',
    apelido: 'Dispositivo Principal',
    status: 'ativo',
    ultimaSync: '2024-10-02T09:15:00Z',
    vinculadoA: 'João Silva',
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['producao', 'principal']
  },
  {
    id: 'DEV-002-XYZ789',
    tenantId: '1',
    apelido: 'Backup Server',
    status: 'ativo',
    ultimaSync: '2024-10-02T08:45:00Z',
    createdAt: '2024-02-01T11:30:00Z',
    tags: ['backup']
  },
  {
    id: 'DEV-003-QWE456',
    tenantId: '2',
    apelido: 'Dev Machine',
    status: 'pendente',
    createdAt: '2024-09-28T15:20:00Z',
    tags: ['desenvolvimento']
  },
  {
    id: 'DEV-004-RTY789',
    tenantId: '2',
    status: 'bloqueado',
    ultimaSync: '2024-09-15T12:00:00Z',
    createdAt: '2024-03-10T09:00:00Z',
    tags: []
  }
];

export const mockLogs: Log[] = [
  {
    id: '1',
    timestamp: '2024-10-02T09:30:00Z',
    usuario: 'joao.silva@example.com',
    tenantId: '1',
    entidade: 'dispositivo',
    acao: 'update',
    resumo: 'Status alterado para ativo',
    ip: '192.168.1.100'
  },
  {
    id: '2',
    timestamp: '2024-10-02T08:15:00Z',
    usuario: 'maria.santos@example.com',
    tenantId: '1',
    entidade: 'usuario',
    acao: 'create',
    resumo: 'Novo usuário criado: Carlos Oliveira',
    ip: '192.168.1.101'
  },
  {
    id: '3',
    timestamp: '2024-10-01T16:45:00Z',
    usuario: 'joao.silva@example.com',
    entidade: 'sistema',
    acao: 'login',
    resumo: 'Login realizado com sucesso',
    ip: '192.168.1.100'
  },
  {
    id: '4',
    timestamp: '2024-10-01T14:20:00Z',
    usuario: 'maria.santos@example.com',
    tenantId: '2',
    entidade: 'dispositivo',
    acao: 'status_change',
    resumo: 'Dispositivo DEV-004-RTY789 bloqueado',
    ip: '192.168.1.105'
  },
  {
    id: '5',
    timestamp: '2024-10-01T11:30:00Z',
    usuario: 'carlos.oliveira@example.com',
    tenantId: '2',
    entidade: 'licenca',
    acao: 'read',
    resumo: 'Visualização de licenças',
    ip: '192.168.1.102'
  }
];

export const mockStats: DashboardStats = {
  totalUsuarios: 4,
  tenantsAtivos: 2,
  dispositivosAtivos: 2,
  dispositivosBloqueados: 1,
  licencasAtivas: 3,
  licencasExpirando: 1,
  licencasExpiradas: 2
};

// Dados para gráfico de dispositivos ativos (últimos 30 dias)
export const mockDeviceActivityData = Array.from({ length: 30 }, (_, i) => ({
  data: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
  ativos: Math.floor(Math.random() * 20) + 10,
}));
