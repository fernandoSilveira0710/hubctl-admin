import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Smartphone,
  Key,
  CreditCard,
  Webhook,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { canViewSettings } from '@/lib/utils/permissions';
import { Button } from '@/components/ui/button';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, requireAdmin: false },
  { path: '/usuarios', label: 'Usuários', icon: Users, requireAdmin: false },
  { path: '/tenants', label: 'Tenants', icon: Building2, requireAdmin: false },
  { path: '/dispositivos', label: 'Dispositivos', icon: Smartphone, requireAdmin: false },
  { path: '/licencas', label: 'Licenças', icon: Key, requireAdmin: false },
  { path: '/planos', label: 'Planos', icon: CreditCard, requireAdmin: false },
  { path: '/webhooks', label: 'Webhooks', icon: Webhook, requireAdmin: false },
  { path: '/logs', label: 'Logs', icon: FileText, requireAdmin: false },
  { path: '/configuracoes', label: 'Configurações', icon: Settings, requireAdmin: true },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const filteredItems = menuItems.filter(item => 
    !item.requireAdmin || (user && canViewSettings(user.role))
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-lg">H</span>
          </div>
          <span className="text-sidebar-foreground font-semibold text-lg">Hub Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${active 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-semibold text-sm">
              {user?.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-foreground font-medium text-sm truncate">{user?.nome}</p>
            <p className="text-sidebar-foreground/60 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </aside>
  );
};
