import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Grid,
  Divider,
  Badge,
} from '@mui/material';
import {
  TableChart,
  Download,
  Visibility,
  FilterList,
  Sort,
  Search,
  Info,
  Warning,
  CheckCircle,
  Error,
  ContentCopy,
  Print,
  Share,
  ExpandMore,
  ViewColumn,
  Fullscreen,
  Numbers,
  TextFields,
  CalendarToday,
  Category,
  Psychology,
  Analytics,
  Speed,
  DataUsage,
} from '@mui/icons-material';
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Column {
  name: string;
  type: string;
  visible: boolean;
}

interface DataTableAdvancedProps {
  data: any[];
  columns: Column[];
  title?: string;
  subtitle?: string;
  showStats?: boolean;
  showColumnTypes?: boolean;
  onRowClick?: (row: any, index: number) => void;
  onExport?: (format: string) => void;
  maxHeight?: number;
}

const DataTableAdvanced: React.FC<DataTableAdvancedProps> = ({
  data,
  columns,
  title = 'Dados da Tabela',
  subtitle,
  showStats = true,
  showColumnTypes = true,
  onRowClick,
  onExport,
  maxHeight = 600
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<{ [key: string]: boolean }>(
    columns.reduce((acc, col) => ({ ...acc, [col.name]: col.visible }), {})
  );
  const [highlightNulls, setHighlightNulls] = useState(true);
  const [highlightDuplicates, setHighlightDuplicates] = useState(false);
  const [showRowNumbers, setShowRowNumbers] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Colunas visíveis
  const visibleColumns = useMemo(() => 
    columns.filter(col => columnVisibility[col.name]), 
    [columns, columnVisibility]
  );

  // Dados filtrados
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    const searchLower = searchTerm.toLowerCase();
    return data.filter(row =>
      Object.values(row).some(value => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchLower);
      })
    );
  }, [data, searchTerm]);

  // Dados da página atual
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, page, rowsPerPage]);

  // Estatísticas da tabela
  const tableStats = useMemo(() => {
    if (!showStats) return null;

    const stats = {
      totalRows: data.length,
      filteredRows: filteredData.length,
      totalColumns: columns.length,
      visibleColumns: visibleColumns.length,
      nullCount: 0,
      duplicateRows: 0,
      completenessPercentage: 0
    };

    // Contar valores nulos
    data.forEach(row => {
      Object.values(row).forEach(value => {
        if (value === null || value === undefined || value === '') {
          stats.nullCount++;
        }
      });
    });

    // Detectar linhas duplicadas
    const seen = new Set();
    data.forEach(row => {
      const rowStr = JSON.stringify(row);
      if (seen.has(rowStr)) {
        stats.duplicateRows++;
      } else {
        seen.add(rowStr);
      }
    });

    // Calcular completude
    const totalCells = data.length * columns.length;
    stats.completenessPercentage = totalCells > 0 ? 
      ((totalCells - stats.nullCount) / totalCells) * 100 : 100;

    return stats;
  }, [data, columns, filteredData, visibleColumns, showStats]);

  // Detectar valores duplicados por coluna
  const getColumnDuplicates = (columnName: string): Set<any> => {
    const values = data.map(row => row[columnName]);
    const seen = new Set();
    const duplicates = new Set();
    
    values.forEach(value => {
      if (seen.has(value)) {
        duplicates.add(value);
      } else {
        seen.add(value);
      }
    });
    
    return duplicates;
  };

  // Formatar valor da célula
  const formatCellValue = (value: any, column: Column): string => {
    if (value === null || value === undefined) return '';
    
    switch (column.type) {
      case 'date':
      case 'datetime':
        try {
          const date = typeof value === 'string' ? parseISO(value) : new Date(value);
          return isValid(date) ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : String(value);
        } catch {
          return String(value);
        }
      
      case 'number':
      case 'integer':
      case 'float':
        const num = Number(value);
        return isNaN(num) ? String(value) : num.toLocaleString('pt-BR');
      
      case 'boolean':
        return value ? 'Sim' : 'Não';
      
      default:
        return String(value);
    }
  };

  // Obter cor da célula baseada no valor
  const getCellColor = (value: any, column: Column): string | undefined => {
    if (highlightNulls && (value === null || value === undefined || value === '')) {
      return '#ffebee'; // Vermelho claro para valores nulos
    }
    
    if (highlightDuplicates) {
      const duplicates = getColumnDuplicates(column.name);
      if (duplicates.has(value)) {
        return '#fff3e0'; // Laranja claro para duplicatas
      }
    }
    
    return undefined;
  };

  // Ícone do tipo de coluna
  const getColumnTypeIcon = (type: string) => {
    switch (type) {
      case 'number':
      case 'integer':
      case 'float':
        return <Numbers fontSize="small" color="primary" />;
      case 'text':
      case 'string':
        return <TextFields fontSize="small" color="secondary" />;
      case 'date':
      case 'datetime':
        return <CalendarToday fontSize="small" color="success" />;
      case 'boolean':
        return <CheckCircle fontSize="small" color="info" />;
      case 'categorical':
        return <Category fontSize="small" color="warning" />;
      default:
        return <DataUsage fontSize="small" color="disabled" />;
    }
  };

  // Exportar dados
  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format);
      return;
    }

    // Implementação básica de exportação
    const exportData = filteredData.map(row => {
      const filteredRow: any = {};
      visibleColumns.forEach(col => {
        filteredRow[col.name] = formatCellValue(row[col.name], col);
      });
      return filteredRow;
    });

    if (format === 'csv') {
      const csv = [
        visibleColumns.map(col => col.name).join(','),
        ...exportData.map(row => 
          visibleColumns.map(col => `"${row[col.name] || ''}"`).join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const json = JSON.stringify(exportData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Copiar dados para clipboard
  const copyToClipboard = () => {
    const text = paginatedData.map(row => 
      visibleColumns.map(col => formatCellValue(row[col.name], col)).join('\t')
    ).join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      // Adicionar feedback visual aqui se necessário
    });
  };

  return (
    <Card>
      <CardContent>
        {/* Cabeçalho */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TableChart color="primary" />
            {title}
            {tableStats && (
              <Chip 
                label={`${tableStats.filteredRows.toLocaleString()} registros`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Typography>
          
          {subtitle && (
            <Typography variant="body2" color="text.secondary" paragraph>
              {subtitle}
            </Typography>
          )}

          {/* Estatísticas Rápidas */}
          {tableStats && (
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
                  <Typography variant="h6">{tableStats.totalRows.toLocaleString()}</Typography>
                  <Typography variant="caption">Total de Linhas</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'secondary.main', color: 'white', borderRadius: 1 }}>
                  <Typography variant="h6">{tableStats.visibleColumns}</Typography>
                  <Typography variant="caption">Colunas Visíveis</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'success.main', color: 'white', borderRadius: 1 }}>
                  <Typography variant="h6">{tableStats.completenessPercentage.toFixed(1)}%</Typography>
                  <Typography variant="caption">Completude</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'warning.main', color: 'white', borderRadius: 1 }}>
                  <Typography variant="h6">{tableStats.duplicateRows}</Typography>
                  <Typography variant="caption">Duplicatas</Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Controles */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar em todos os campos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Tooltip title="Copiar dados visíveis">
                  <IconButton size="small" onClick={copyToClipboard}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Button
                  size="small"
                  startIcon={<Download />}
                  onClick={() => handleExport('csv')}
                >
                  CSV
                </Button>
                <Button
                  size="small"
                  startIcon={<Download />}
                  onClick={() => handleExport('json')}
                >
                  JSON
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Configurações Avançadas */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ViewColumn />
              Configurações de Visualização
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Opções de Destaque
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={highlightNulls}
                      onChange={(e) => setHighlightNulls(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Destacar valores nulos"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={highlightDuplicates}
                      onChange={(e) => setHighlightDuplicates(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Destacar duplicatas"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={showRowNumbers}
                      onChange={(e) => setShowRowNumbers(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Mostrar números das linhas"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={compactView}
                      onChange={(e) => setCompactView(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Visualização compacta"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Colunas Visíveis
                </Typography>
                <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {columns.map((column) => (
                    <FormControlLabel
                      key={column.name}
                      control={
                        <Switch
                          checked={columnVisibility[column.name] || false}
                          onChange={(e) => setColumnVisibility(prev => ({
                            ...prev,
                            [column.name]: e.target.checked
                          }))}
                          size="small"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {showColumnTypes && getColumnTypeIcon(column.type)}
                          {column.name}
                          <Chip label={column.type} size="small" variant="outlined" />
                        </Box>
                      }
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Alertas */}
        {filteredData.length === 0 && searchTerm && (
          <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
            Nenhum resultado encontrado para "{searchTerm}". Tente uma busca diferente.
          </Alert>
        )}

        {tableStats && tableStats.nullCount > 0 && (
          <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2">
              ⚠️ {tableStats.nullCount} valores nulos detectados ({((tableStats.nullCount / (data.length * columns.length)) * 100).toFixed(1)}% dos dados)
            </Typography>
          </Alert>
        )}

        {/* Tabela */}
        <TableContainer 
          component={Paper} 
          sx={{ 
            maxHeight, 
            mt: 2,
            border: 1,
            borderColor: 'divider'
          }}
        >
          <Table 
            stickyHeader 
            size={compactView ? 'small' : 'medium'}
            sx={{ minWidth: 650 }}
          >
            <TableHead>
              <TableRow>
                {showRowNumbers && (
                  <TableCell 
                    sx={{ 
                      bgcolor: 'grey.100', 
                      fontWeight: 'bold',
                      width: 60,
                      textAlign: 'center'
                    }}
                  >
                    #
                  </TableCell>
                )}
                {visibleColumns.map((column) => (
                  <TableCell 
                    key={column.name}
                    sx={{ 
                      bgcolor: 'grey.100', 
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {showColumnTypes && getColumnTypeIcon(column.type)}
                      {column.name}
                      <Tooltip title={`Tipo: ${column.type}`}>
                        <Info fontSize="small" color="disabled" />
                      </Tooltip>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => {
                const actualIndex = page * rowsPerPage + index;
                return (
                  <TableRow 
                    key={actualIndex}
                    hover
                    onClick={() => onRowClick?.(row, actualIndex)}
                    sx={{ 
                      cursor: onRowClick ? 'pointer' : 'default',
                      '&:nth-of-type(odd)': { bgcolor: 'action.hover' }
                    }}
                  >
                    {showRowNumbers && (
                      <TableCell 
                        sx={{ 
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'text.secondary'
                        }}
                      >
                        {actualIndex + 1}
                      </TableCell>
                    )}
                    {visibleColumns.map((column) => {
                      const value = row[column.name];
                      const cellColor = getCellColor(value, column);
                      
                      return (
                        <TableCell 
                          key={column.name}
                          sx={{ 
                            bgcolor: cellColor,
                            maxWidth: 200,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {value === null || value === undefined ? (
                            <Chip 
                              label="NULL" 
                              size="small" 
                              color="error" 
                              variant="outlined"
                            />
                          ) : (
                            <Tooltip title={formatCellValue(value, column)}>
                              <span>{formatCellValue(value, column)}</span>
                            </Tooltip>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginação */}
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 25, 50, 100, 500]}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
          sx={{ mt: 2 }}
        />

        {/* Resumo da Página */}
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Mostrando {paginatedData.length} de {filteredData.length} registros
            {filteredData.length !== data.length && 
              ` (filtrados de ${data.length} total)`
            }
            • {visibleColumns.length} de {columns.length} colunas visíveis
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DataTableAdvanced;
