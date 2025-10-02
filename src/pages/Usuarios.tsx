import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { PermissionGuard } from '@/components/common/PermissionGuard';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Key, MoreHorizontal, Eye, Users } from 'lucide-react';
import { mockUsuarios, mockTenants } from '@/lib/api/mock-data';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { canManageUsers, canUpdate, canDelete } from '@/lib/utils/permissions';
import { DataTable, DataTableColumn } from '@/components/common/DataTable';
import { UsuarioFormDrawer } from '@/components/usuarios/UsuarioFormDrawer';
import { UsuarioDetailDrawer } from '@/components/usuarios/UsuarioDetailDrawer';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { Usuario, Role } from '@/lib/types';
import { DateRange } from 'react-day-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const roleBadges: Record<string, string> = {
  admin: 'Administrador',
  operador: 'Operador',
  leitor: 'Leitor'
};

export default function Usuarios() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'ativo' | 'inativo' | 'all'>('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [tenantFilter, setTenantFilter] = useState<string>('all');

  // Modals
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | undefined>();
  
  const canManage = user && canManageUsers(user.role);

  useState(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  });

  // Aplicar filtros
  const filteredUsers = usuarios.filter(u => {
    const matchesSearch = u.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchesTenant = tenantFilter === 'all' || u.tenantId === tenantFilter;
    
    let matchesDate = true;
    if (dateRange?.from) {
      const createdDate = new Date(u.criadoEm);
      matchesDate = createdDate >= dateRange.from;
      if (dateRange.to) {
        matchesDate = matchesDate && createdDate <= dateRange.to;
      }
    }

    return matchesSearch && matchesRole && matchesStatus && matchesTenant && matchesDate;
  });

  const handleCreate = () => {
    setSelectedUsuario(undefined);
    setFormOpen(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setFormOpen(true);
  };

  const handleView = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setDetailOpen(true);
  };

  const handleDelete = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUsuario) {
      setUsuarios(usuarios.filter(u => u.id !== selectedUsuario.id));
      toast({
        title: 'Usuário excluído',
        description: `${selectedUsuario.nome} foi removido com sucesso.`,
      });
    }
    setDeleteDialogOpen(false);
    setSelectedUsuario(undefined);
  };

  const handleSave = (data: any) => {
    if (selectedUsuario) {
      // Editar
      setUsuarios(usuarios.map(u => 
        u.id === selectedUsuario.id 
          ? { ...u, ...data }
          : u
      ));
    } else {
      // Criar
      const newUsuario: Usuario = {
        id: String(usuarios.length + 1),
        ...data,
        criadoEm: new Date().toISOString(),
      };
      setUsuarios([...usuarios, newUsuario]);
    }
  };

  const handleBulkActivate = () => {
    setUsuarios(usuarios.map(u => 
      selectedIds.includes(u.id) ? { ...u, status: 'ativo' as const } : u
    ));
    toast({
      title: 'Usuários ativados',
      description: `${selectedIds.length} usuário(s) ativado(s) com sucesso.`,
    });
    setSelectedIds([]);
  };

  const handleBulkDeactivate = () => {
    setUsuarios(usuarios.map(u => 
      selectedIds.includes(u.id) ? { ...u, status: 'inativo' as const } : u
    ));
    toast({
      title: 'Usuários desativados',
      description: `${selectedIds.length} usuário(s) desativado(s) com sucesso.`,
    });
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setUsuarios(usuarios.filter(u => !selectedIds.includes(u.id)));
    toast({
      title: 'Usuários excluídos',
      description: `${selectedIds.length} usuário(s) removido(s) com sucesso.`,
    });
    setSelectedIds([]);
  };

  const columns: DataTableColumn<Usuario>[] = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true,
      render: (usuario) => (
        <button
          onClick={() => handleView(usuario)}
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          {usuario.nome}
        </button>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      className: 'text-muted-foreground',
    },
    {
      key: 'role',
      label: 'Papel',
      render: (usuario) => <span className="text-sm">{roleBadges[usuario.role]}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (usuario) => <StatusBadge status={usuario.status} />,
    },
    {
      key: 'ultimoAcesso',
      label: 'Último Acesso',
      className: 'text-muted-foreground',
      render: (usuario) =>
        usuario.ultimoAcesso
          ? format(new Date(usuario.ultimoAcesso), 'dd/MM/yyyy HH:mm', { locale: ptBR })
          : '—',
    },
    {
      key: 'criadoEm',
      label: 'Criado em',
      sortable: true,
      className: 'text-muted-foreground',
      render: (usuario) => format(new Date(usuario.criadoEm), 'dd/MM/yyyy', { locale: ptBR }),
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Usuários"
        description="Gerenciar usuários do sistema"
        actions={
          <PermissionGuard allowedRoles={['admin']}>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </PermissionGuard>
        }
      />

      <div className="bg-card rounded-lg border border-border p-4">
        {/* Filtros Avançados */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os papéis</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="operador">Operador</SelectItem>
              <SelectItem value="leitor">Leitor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tenantFilter} onValueChange={setTenantFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tenant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tenants</SelectItem>
              {mockTenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  {tenant.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="Filtrar por data de criação"
          />
        </div>

        {/* Ações em massa */}
        {selectedIds.length > 0 && canManage && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-md">
            <span className="text-sm text-muted-foreground">
              {selectedIds.length} selecionado(s)
            </span>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={handleBulkActivate}>
                Ativar
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkDeactivate}>
                Desativar
              </Button>
              <PermissionGuard allowedRoles={['admin']} showTooltip={false}>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  Excluir
                </Button>
              </PermissionGuard>
            </div>
          </div>
        )}

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={filteredUsers}
          loading={loading}
          searchPlaceholder="Buscar por nome ou email..."
          onSearch={setSearchQuery}
          selectable={canManage}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          emptyState={{
            icon: <Users className="w-8 h-8" />,
            title: 'Nenhum usuário encontrado',
            description: 'Não há usuários cadastrados ou sua busca não retornou resultados.',
            action: canManage ? {
              label: 'Novo Usuário',
              onClick: handleCreate,
            } : undefined,
          }}
          rowActions={(usuario) =>
            canManage ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleView(usuario)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </DropdownMenuItem>
                  <PermissionGuard allowedRoles={['admin']} showTooltip={false}>
                    <DropdownMenuItem 
                      onClick={() => handleEdit(usuario)}
                      disabled={!canUpdate(user?.role || 'leitor')}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={!canUpdate(user?.role || 'leitor')}>
                      <Key className="mr-2 h-4 w-4" />
                      Resetar Senha
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(usuario)}
                      disabled={!canDelete(user?.role || 'leitor')}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </PermissionGuard>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null
          }
        />
      </div>

      {/* Modals */}
      <UsuarioFormDrawer
        open={formOpen}
        onOpenChange={setFormOpen}
        usuario={selectedUsuario}
        onSave={handleSave}
      />

      {selectedUsuario && (
        <UsuarioDetailDrawer
          open={detailOpen}
          onOpenChange={setDetailOpen}
          usuario={selectedUsuario}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Excluir Usuário"
        description={`Tem certeza que deseja excluir ${selectedUsuario?.nome}? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        variant="destructive"
      />
    </MainLayout>
  );
}
