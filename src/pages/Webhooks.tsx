import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';

export default function Webhooks() {
  return (
    <MainLayout>
      <PageHeader
        title="Webhooks"
        description="Gerenciar webhooks do sistema"
      />
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Tela de Webhooks em desenvolvimento</p>
      </div>
    </MainLayout>
  );
}
