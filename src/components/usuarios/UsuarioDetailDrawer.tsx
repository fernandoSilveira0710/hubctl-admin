import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Usuario } from '@/lib/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockLogs } from '@/lib/api/mock-data';

interface UsuarioDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario: Usuario;
}

const roleBadges: Record<string, string> = {
  admin: 'Administrador',
  operador: 'Operador',
  leitor: 'Leitor',
};

export const UsuarioDetailDrawer = ({
  open,
  onOpenChange,
  usuario,
}: UsuarioDetailDrawerProps) => {
  // Mock: pegar últimos 5 logs do usuário
  const userLogs = mockLogs
    .filter((log) => log.usuario === usuario.email)
    .slice(0, 5);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detalhes do Usuário</SheetTitle>
          <SheetDescription>
            Informações completas e logs recentes
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Dados principais */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <p className="text-base text-foreground mt-1">{usuario.nome}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-base text-foreground mt-1">{usuario.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Papel</label>
                <p className="text-base text-foreground mt-1">{roleBadges[usuario.role]}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <StatusBadge status={usuario.status} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Criado em</label>
              <p className="text-base text-foreground mt-1">
                {format(new Date(usuario.criadoEm), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>

            {usuario.ultimoAcesso && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Último Acesso</label>
                <p className="text-base text-foreground mt-1">
                  {format(new Date(usuario.ultimoAcesso), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Logs recentes */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Atividade Recente</h3>
            {userLogs.length > 0 ? (
              <div className="space-y-3">
                {userLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{log.resumo}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {log.entidade}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma atividade registrada</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
