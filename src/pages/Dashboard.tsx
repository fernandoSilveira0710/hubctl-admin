import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, Smartphone, Key } from 'lucide-react';
import { mockStats, mockLogs, mockDeviceActivityData } from '@/lib/api/mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CardSkeleton } from '@/components/common/LoadingSkeleton';

const StatCard = ({ title, value, icon: Icon, description }: any) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <PageHeader
          title="Dashboard"
          description="Visão geral do sistema e métricas principais"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Visão geral do sistema e métricas principais"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total de Usuários"
          value={mockStats.totalUsuarios}
          icon={Users}
        />
        <StatCard
          title="Tenants Ativos"
          value={mockStats.tenantsAtivos}
          icon={Building2}
        />
        <StatCard
          title="Dispositivos"
          value={`${mockStats.dispositivosAtivos} / ${mockStats.dispositivosBloqueados}`}
          icon={Smartphone}
          description="Ativos / Bloqueados"
        />
        <StatCard
          title="Licenças"
          value={mockStats.licencasAtivas}
          icon={Key}
          description={`${mockStats.licencasExpirando} expirando em 30 dias`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dispositivos Ativos (Últimos 30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockDeviceActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="data" 
                  className="text-xs text-muted-foreground"
                />
                <YAxis className="text-xs text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ativos" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Logs Recentes */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Atividade Recente</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/logs'}>
              Ver todos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{log.resumo}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {log.usuario} • {format(new Date(log.timestamp), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
