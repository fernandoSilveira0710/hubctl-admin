import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { PermissionGuard } from '@/components/common/PermissionGuard';
import { Button } from '@/components/ui/button';
import { Plus, Search, Edit, Trash2, Key, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockUsuarios } from '@/lib/api/mock-data';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { canManageUsers, canUpdate, canDelete } from '@/lib/utils/permissions';
import { EmptyState } from '@/components/common/EmptyState';
import { TableSkeleton } from '@/components/common/LoadingSkeleton';
import { Users } from 'lucide-react';

export default function Usuarios() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const canManage = user && canManageUsers(user.role);

  useState(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  });

  const filteredUsers = mockUsuarios.filter(u =>
    u.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleBadges: Record<string, string> = {
    admin: 'Administrador',
    operador: 'Operador',
    leitor: 'Leitor'
  };

  return (
    <MainLayout>
      <PageHeader
        title="Usuários"
        description="Gerenciar usuários do sistema"
        actions={
          <PermissionGuard allowedRoles={['admin', 'operador']}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </PermissionGuard>
        }
      />

      <div className="bg-card rounded-lg border border-border">
        {loading ? (
          <TableSkeleton />
        ) : (
          <>
            {/* Barra de busca e filtros */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

        {/* Tabela */}
        {filteredUsers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead>Criado em</TableHead>
                {canManage && <TableHead className="text-right">Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell className="text-muted-foreground">{usuario.email}</TableCell>
                  <TableCell>
                    <span className="text-sm">{roleBadges[usuario.role]}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={usuario.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {usuario.ultimoAcesso 
                      ? format(new Date(usuario.ultimoAcesso), "dd/MM/yyyy HH:mm", { locale: ptBR })
                      : '—'
                    }
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(usuario.criadoEm), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  {canManage && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <PermissionGuard allowedRoles={['admin', 'operador']} showTooltip={false}>
                            <DropdownMenuItem disabled={!canUpdate(user?.role || 'leitor')}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={!canUpdate(user?.role || 'leitor')}>
                              <Key className="mr-2 h-4 w-4" />
                              Resetar Senha
                            </DropdownMenuItem>
                          </PermissionGuard>
                          <PermissionGuard allowedRoles={['admin']} showTooltip={false}>
                            <DropdownMenuItem disabled={!canDelete(user?.role || 'leitor')} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </PermissionGuard>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title="Nenhum usuário encontrado"
            description="Não há usuários cadastrados ou sua busca não retornou resultados."
            action={canManage ? {
              label: 'Novo Usuário',
              onClick: () => {}
            } : undefined}
          />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
