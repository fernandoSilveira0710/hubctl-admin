import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { CopyButton } from './CopyButton';

interface KeyViewerProps {
  value: string;
  label?: string;
  className?: string;
}

export const KeyViewer = ({ value, label, className }: KeyViewerProps) => {
  const [visible, setVisible] = useState(false);
  
  const maskedValue = value.slice(0, 8) + '•'.repeat(Math.max(value.length - 8, 8));

  return (
    <div className={className}>
      {label && <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>}
      <div className="flex items-center gap-2">
        <div className="flex-1 px-3 py-2 bg-muted rounded-md font-mono text-sm text-foreground break-all">
          {visible ? value : maskedValue}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVisible(!visible)}
          title={visible ? 'Ocultar' : 'Revelar'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <CopyButton text={value} />
      </div>
    </div>
  );
};
