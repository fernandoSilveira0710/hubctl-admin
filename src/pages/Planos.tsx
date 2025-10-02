import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';

export default function Planos() {
  return (
    <MainLayout>
      <PageHeader
        title="Planos"
        description="Gerenciar planos do sistema"
      />
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Tela de Planos em desenvolvimento</p>
      </div>
    </MainLayout>
  );
}
