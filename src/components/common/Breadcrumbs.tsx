import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  usuarios: 'Usuários',
  tenants: 'Tenants',
  dispositivos: 'Dispositivos',
  licencas: 'Licenças',
  planos: 'Planos',
  webhooks: 'Webhooks',
  logs: 'Logs',
  configuracoes: 'Configurações',
  perfil: 'Meu Perfil'
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/dashboard' }
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: routeLabels[segment] || segment,
      path: currentPath
    });
  });

  if (breadcrumbs.length === 1) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link to="/dashboard" className="hover:text-foreground transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {breadcrumbs.slice(1).map((item, index) => (
        <div key={item.path} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {index === breadcrumbs.length - 2 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <Link 
              to={item.path || '#'} 
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
