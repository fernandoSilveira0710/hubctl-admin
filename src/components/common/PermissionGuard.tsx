import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PermissionGuardProps {
  children: ReactNode;
  allowedRoles?: Role[];
  fallback?: ReactNode;
  showTooltip?: boolean;
}

export const PermissionGuard = ({
  children,
  allowedRoles,
  fallback = null,
  showTooltip = true,
}: PermissionGuardProps) => {
  const { user } = useAuth();

  if (!user) return fallback;

  const hasPermission = !allowedRoles || allowedRoles.includes(user.role);

  if (!hasPermission) {
    if (showTooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-block cursor-not-allowed opacity-50">
                {children}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Permissão insuficiente</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return fallback;
  }

  return <>{children}</>;
};
