import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus, Search, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockDispositivos, mockTenants } from '@/lib/api/mock-data';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { canCreate } from '@/lib/utils/permissions';
import { EmptyState } from '@/components/common/EmptyState';
import { Smartphone } from 'lucide-react';
import { toast } from 'sonner';

export default function Dispositivos() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  const canAdd = user && canCreate(user.role);

  const filteredDevices = mockDispositivos.filter(d =>
    d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.apelido?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTenantName = (tenantId: string) => {
    const tenant = mockTenants.find(t => t.id === tenantId);
    return tenant?.nome || '—';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('ID copiado!');
  };

  return (
    <MainLayout>
      <PageHeader
        title="Dispositivos"
        description="Gerenciar dispositivos cadastrados"
        actions={
          canAdd ? (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Dispositivo
            </Button>
          ) : null
        }
      />

      <div className="bg-card rounded-lg border border-border">
        {/* Barra de busca */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID ou apelido..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Tabela */}
        {filteredDevices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Apelido</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Sync</TableHead>
                <TableHead>Vinculado a</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Criado em</TableHead>
                {canAdd && <TableHead className="text-right">Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[150px]">{device.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(device.id)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{device.apelido || '—'}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {getTenantName(device.tenantId)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={device.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {device.ultimaSync 
                      ? format(new Date(device.ultimaSync), "dd/MM/yyyy HH:mm", { locale: ptBR })
                      : '—'
                    }
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {device.vinculadoA || '—'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {device.tags && device.tags.length > 0 ? (
                        device.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(device.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  {canAdd && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={<Smartphone className="w-8 h-8" />}
            title="Nenhum dispositivo encontrado"
            description="Não há dispositivos cadastrados ou sua busca não retornou resultados."
            action={canAdd ? {
              label: 'Novo Dispositivo',
              onClick: () => {}
            } : undefined}
          />
        )}
      </div>
    </MainLayout>
  );
}
