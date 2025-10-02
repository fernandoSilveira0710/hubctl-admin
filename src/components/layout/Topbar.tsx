import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const Topbar = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar... (Ctrl+K)"
            className="pl-9 bg-background"
          />
        </div>
      </div>
    </header>
  );
};
