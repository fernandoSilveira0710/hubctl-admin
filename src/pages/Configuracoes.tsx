import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';

export default function Configuracoes() {
  return (
    <MainLayout>
      <PageHeader
        title="Configurações"
        description="Configurações gerais do sistema"
      />
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Tela de Configurações em desenvolvimento</p>
      </div>
    </MainLayout>
  );
}
