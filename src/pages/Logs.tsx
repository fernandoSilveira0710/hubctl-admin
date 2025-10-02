import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';

export default function Logs() {
  return (
    <MainLayout>
      <PageHeader
        title="Logs"
        description="Visualizar logs do sistema"
      />
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Tela de Logs em desenvolvimento</p>
      </div>
    </MainLayout>
  );
}
