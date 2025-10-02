import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';

export default function Tenants() {
  return (
    <MainLayout>
      <PageHeader
        title="Tenants"
        description="Gerenciar tenants do sistema"
      />
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Tela de Tenants em desenvolvimento</p>
      </div>
    </MainLayout>
  );
}
