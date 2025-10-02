import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApiErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ApiError = ({ 
  title = 'Erro ao carregar dados', 
  message, 
  onRetry 
}: ApiErrorProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="mt-3"
          >
            Tentar Novamente
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};
