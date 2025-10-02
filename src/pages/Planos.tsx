import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { PermissionGuard } from '@/components/common/PermissionGuard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Planos() {
  return (
    <MainLayout>
      <PageHeader
        title="Planos"
        description="Gerenciar planos do sistema"
        actions={
          <PermissionGuard allowedRoles={['admin']}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Plano
            </Button>
          </PermissionGuard>
        }
      />
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Tela de Planos em desenvolvimento</p>
      </div>
    </MainLayout>
  );
}
