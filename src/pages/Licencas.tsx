import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';

export default function Licencas() {
  return (
    <MainLayout>
      <PageHeader
        title="Licenças"
        description="Gerenciar licenças do sistema"
      />
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Tela de Licenças em desenvolvimento</p>
      </div>
    </MainLayout>
  );
}
