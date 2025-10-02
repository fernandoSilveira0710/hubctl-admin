import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'secondary';
}

const statusVariants: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
  ativo: 'success',
  inativo: 'secondary',
  pendente: 'warning',
  bloqueado: 'destructive',
  ativa: 'success',
  expirada: 'destructive',
  revogada: 'destructive',
  expirando: 'warning'
};

export const StatusBadge = ({ status, variant }: StatusBadgeProps) => {
  const badgeVariant = variant || statusVariants[status.toLowerCase()] || 'default';
  
  return (
    <Badge variant={badgeVariant} className="capitalize">
      {status}
    </Badge>
  );
};
