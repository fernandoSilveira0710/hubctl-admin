import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, ArrowUpDown } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { TableSkeleton } from './LoadingSkeleton';
import { ApiError } from './ApiError';

export interface DataTableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  emptyState?: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  getRowId?: (item: T) => string;
  actions?: React.ReactNode;
  rowActions?: (item: T) => React.ReactNode;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizes?: number[];
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  error,
  onRetry,
  emptyState,
  searchable = true,
  searchPlaceholder = 'Buscar...',
  onSearch,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  getRowId = (item) => item.id,
  actions,
  rowActions,
  pageSize = 10,
  onPageSizeChange,
  pageSizes = [10, 25, 50, 100],
  sortKey,
  sortDirection = 'asc',
  onSort,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [localPageSize, setLocalPageSize] = useState(pageSize);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    onSearch?.(query);
  };

  const handleSort = (key: string) => {
    if (!onSort) return;
    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, newDirection);
  };

  const handlePageSizeChange = (size: string) => {
    const newSize = parseInt(size);
    setLocalPageSize(newSize);
    setCurrentPage(1);
    onPageSizeChange?.(newSize);
  };

  const isAllSelected = selectable && data.length > 0 && selectedIds.length === data.length;
  const isSomeSelected = selectable && selectedIds.length > 0 && selectedIds.length < data.length;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map(getRowId));
    }
  };

  const handleSelectRow = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const totalPages = Math.ceil(data.length / localPageSize);
  const startIndex = (currentPage - 1) * localPageSize;
  const endIndex = Math.min(startIndex + localPageSize, data.length);
  const paginatedData = data.slice(startIndex, endIndex);

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ApiError message={error} onRetry={onRetry} />;
  }

  return (
    <div className="space-y-4">
      {/* Header with search and actions */}
      {(searchable || actions) && (
        <div className="flex items-center justify-between gap-4">
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Table */}
      {paginatedData.length === 0 && emptyState ? (
        <EmptyState {...emptyState} />
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {selectable && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={isAllSelected || isSomeSelected}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                  )}
                  {columns.map((column) => (
                    <TableHead key={column.key} className={column.className}>
                      {column.sortable ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="-ml-3 h-8 data-[state=open]:bg-accent"
                          onClick={() => handleSort(column.key)}
                        >
                          {column.label}
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        column.label
                      )}
                    </TableHead>
                  ))}
                  {rowActions && <TableHead className="text-right">Ações</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => {
                  const rowId = getRowId(item);
                  const isSelected = selectedIds.includes(rowId);

                  return (
                    <TableRow key={rowId} data-state={isSelected ? 'selected' : undefined}>
                      {selectable && (
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleSelectRow(rowId)}
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => (
                        <TableCell key={column.key} className={column.className}>
                          {column.render ? column.render(item) : item[column.key]}
                        </TableCell>
                      ))}
                      {rowActions && (
                        <TableCell className="text-right">{rowActions(item)}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1} a {endIndex} de {data.length} registros
              </p>
              <Select value={localPageSize.toString()} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizes.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} por página
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
