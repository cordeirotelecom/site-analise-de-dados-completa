import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Slider,
  RadioGroup,
  Radio,
  Checkbox,
  FormGroup,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Stack,
} from '@mui/material';
import {
  ExpandMore,
  FilterList,
  Clear,
  Search,
  Add,
  Delete,
  DateRange,
  Numbers,
  TextFields,
  Category,
  Functions,
  CalendarToday,
  Sort,
  ViewList,
  Tune,
  SavedSearch,
  History,
  Code,
  Psychology,
  School,
  LightbulbOutlined,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

interface Filter {
  id: string;
  column: string;
  operator: string;
  value: any;
  type: 'text' | 'number' | 'date' | 'boolean' | 'categorical';
  active: boolean;
}

interface AdvancedDataFilterProps {
  data: any[];
  columns: any[];
  onFilteredDataChange: (filteredData: any[]) => void;
  onFiltersChange?: (filters: Filter[]) => void;
}

const AdvancedDataFilter: React.FC<AdvancedDataFilterProps> = ({
  data,
  columns,
  onFilteredDataChange,
  onFiltersChange
}) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterLogic, setFilterLogic] = useState<'AND' | 'OR'>('AND');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [savedFilters, setSavedFilters] = useState<any[]>([]);
  const [filterName, setFilterName] = useState('');

  // Operadores por tipo de dados
  const operators = {
    text: [
      { value: 'contains', label: 'Contém' },
      { value: 'equals', label: 'Igual a' },
      { value: 'startsWith', label: 'Começa com' },
      { value: 'endsWith', label: 'Termina com' },
      { value: 'notContains', label: 'Não contém' },
      { value: 'isEmpty', label: 'Está vazio' },
      { value: 'isNotEmpty', label: 'Não está vazio' },
      { value: 'regex', label: 'Expressão Regular' }
    ],
    number: [
      { value: 'equals', label: 'Igual a' },
      { value: 'notEquals', label: 'Diferente de' },
      { value: 'greaterThan', label: 'Maior que' },
      { value: 'greaterThanOrEqual', label: 'Maior ou igual a' },
      { value: 'lessThan', label: 'Menor que' },
      { value: 'lessThanOrEqual', label: 'Menor ou igual a' },
      { value: 'between', label: 'Entre' },
      { value: 'isNull', label: 'É nulo' },
      { value: 'isNotNull', label: 'Não é nulo' }
    ],
    date: [
      { value: 'equals', label: 'Igual a' },
      { value: 'after', label: 'Depois de' },
      { value: 'before', label: 'Antes de' },
      { value: 'between', label: 'Entre' },
      { value: 'lastDays', label: 'Últimos X dias' },
      { value: 'thisMonth', label: 'Este mês' },
      { value: 'lastMonth', label: 'Mês passado' },
      { value: 'thisYear', label: 'Este ano' }
    ],
    categorical: [
      { value: 'equals', label: 'Igual a' },
      { value: 'in', label: 'Está em' },
      { value: 'notIn', label: 'Não está em' }
    ],
    boolean: [
      { value: 'equals', label: 'Igual a' }
    ]
  };

  // Aplicar filtros aos dados
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Aplicar busca global
    if (searchText.trim()) {
      const searchLower = caseSensitive ? searchText : searchText.toLowerCase();
      result = result.filter(row =>
        Object.values(row).some(value => {
          if (value === null || value === undefined) return false;
          const stringValue = caseSensitive ? String(value) : String(value).toLowerCase();
          return stringValue.includes(searchLower);
        })
      );
    }

    // Aplicar filtros específicos
    const activeFilters = filters.filter(f => f.active);
    if (activeFilters.length > 0) {
      result = result.filter(row => {
        const results = activeFilters.map(filter => applyFilter(row, filter));
        return filterLogic === 'AND' ? results.every(r => r) : results.some(r => r);
      });
    }

    // Aplicar ordenação
    if (sortColumn) {
      result.sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];

        // Tratar valores nulos
        if (aVal === null || aVal === undefined) aVal = '';
        if (bVal === null || bVal === undefined) bVal = '';

        // Detectar tipo de dados para ordenação apropriada
        const column = columns.find(col => col.name === sortColumn);
        if (column?.type === 'number' || column?.type === 'integer') {
          aVal = Number(aVal) || 0;
          bVal = Number(bVal) || 0;
        } else if (column?.type === 'date' || column?.type === 'datetime') {
          aVal = new Date(aVal).getTime() || 0;
          bVal = new Date(bVal).getTime() || 0;
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filters, searchText, sortColumn, sortDirection, filterLogic, caseSensitive, columns]);

  // Aplicar um filtro específico
  const applyFilter = (row: any, filter: Filter): boolean => {
    const value = row[filter.column];
    const filterValue = filter.value;

    try {
      switch (filter.operator) {
        case 'contains':
          if (value === null || value === undefined) return false;
          const stringValue = caseSensitive ? String(value) : String(value).toLowerCase();
          const searchValue = caseSensitive ? String(filterValue) : String(filterValue).toLowerCase();
          return stringValue.includes(searchValue);

        case 'equals':
          return value === filterValue;

        case 'notEquals':
          return value !== filterValue;

        case 'startsWith':
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());

        case 'endsWith':
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());

        case 'notContains':
          if (value === null || value === undefined) return true;
          return !String(value).toLowerCase().includes(String(filterValue).toLowerCase());

        case 'isEmpty':
          return value === null || value === undefined || String(value).trim() === '';

        case 'isNotEmpty':
          return value !== null && value !== undefined && String(value).trim() !== '';

        case 'greaterThan':
          return Number(value) > Number(filterValue);

        case 'greaterThanOrEqual':
          return Number(value) >= Number(filterValue);

        case 'lessThan':
          return Number(value) < Number(filterValue);

        case 'lessThanOrEqual':
          return Number(value) <= Number(filterValue);

        case 'between':
          const num = Number(value);
          return num >= Number(filterValue.min) && num <= Number(filterValue.max);

        case 'isNull':
          return value === null || value === undefined;

        case 'isNotNull':
          return value !== null && value !== undefined;

        case 'in':
          return Array.isArray(filterValue) && filterValue.includes(value);

        case 'notIn':
          return !Array.isArray(filterValue) || !filterValue.includes(value);

        case 'regex':
          try {
            const regex = new RegExp(filterValue, caseSensitive ? 'g' : 'gi');
            return regex.test(String(value));
          } catch {
            return false;
          }

        case 'after':
          return new Date(value) > new Date(filterValue);

        case 'before':
          return new Date(value) < new Date(filterValue);

        case 'lastDays':
          const days = Number(filterValue);
          const dateValue = new Date(value);
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - days);
          return dateValue >= cutoffDate;

        case 'thisMonth':
          const thisMonth = new Date();
          const valueDate = new Date(value);
          return valueDate.getMonth() === thisMonth.getMonth() && 
                 valueDate.getFullYear() === thisMonth.getFullYear();

        case 'lastMonth':
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          const valueDate2 = new Date(value);
          return valueDate2.getMonth() === lastMonth.getMonth() && 
                 valueDate2.getFullYear() === lastMonth.getFullYear();

        case 'thisYear':
          const thisYear = new Date().getFullYear();
          return new Date(value).getFullYear() === thisYear;

        default:
          return true;
      }
    } catch (error) {
      console.warn('Erro ao aplicar filtro:', error);
      return false;
    }
  };

  // Adicionar novo filtro
  const addFilter = () => {
    const newFilter: Filter = {
      id: `filter_${Date.now()}`,
      column: columns[0]?.name || '',
      operator: 'contains',
      value: '',
      type: getColumnType(columns[0]?.name || ''),
      active: true
    };
    setFilters(prev => [...prev, newFilter]);
  };

  // Obter tipo da coluna
  const getColumnType = (columnName: string): Filter['type'] => {
    const column = columns.find(col => col.name === columnName);
    if (!column) return 'text';

    switch (column.type) {
      case 'numeric':
      case 'integer':
      case 'float':
        return 'number';
      case 'date':
      case 'datetime':
        return 'date';
      case 'boolean':
        return 'boolean';
      case 'categorical':
        return 'categorical';
      default:
        return 'text';
    }
  };

  // Atualizar filtro
  const updateFilter = (id: string, updates: Partial<Filter>) => {
    setFilters(prev => prev.map(filter => 
      filter.id === id ? { ...filter, ...updates } : filter
    ));
  };

  // Remover filtro
  const removeFilter = (id: string) => {
    setFilters(prev => prev.filter(filter => filter.id !== id));
  };

  // Limpar todos os filtros
  const clearAllFilters = () => {
    setFilters([]);
    setSearchText('');
    setSortColumn('');
  };

  // Salvar configuração de filtros
  const saveFilterConfig = () => {
    if (!filterName.trim()) return;

    const config = {
      id: Date.now(),
      name: filterName,
      filters: filters,
      searchText,
      sortColumn,
      sortDirection,
      filterLogic,
      caseSensitive,
      createdAt: new Date().toISOString()
    };

    setSavedFilters(prev => [...prev, config]);
    setFilterName('');
  };

  // Carregar configuração de filtros
  const loadFilterConfig = (config: any) => {
    setFilters(config.filters);
    setSearchText(config.searchText);
    setSortColumn(config.sortColumn);
    setSortDirection(config.sortDirection);
    setFilterLogic(config.filterLogic);
    setCaseSensitive(config.caseSensitive);
  };

  // Obter valores únicos de uma coluna para filtros categóricos
  const getUniqueValues = (columnName: string): string[] => {
    const values = data.map(row => row[columnName])
      .filter(value => value !== null && value !== undefined)
      .map(value => String(value));
    return [...new Set(values)].slice(0, 100); // Limitar a 100 valores únicos
  };

  // Renderizar campo de valor do filtro
  const renderFilterValue = (filter: Filter) => {
    const handleValueChange = (value: any) => {
      updateFilter(filter.id, { value });
    };

    if (filter.operator === 'isEmpty' || filter.operator === 'isNotEmpty' || 
        filter.operator === 'isNull' || filter.operator === 'isNotNull' ||
        filter.operator === 'thisMonth' || filter.operator === 'lastMonth' || 
        filter.operator === 'thisYear') {
      return null; // Esses operadores não precisam de valor
    }

    switch (filter.type) {
      case 'number':
        if (filter.operator === 'between') {
          return (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                type="number"
                placeholder="Min"
                size="small"
                value={filter.value?.min || ''}
                onChange={(e) => handleValueChange({ 
                  ...filter.value, 
                  min: e.target.value 
                })}
                sx={{ width: 80 }}
              />
              <Typography variant="caption">até</Typography>
              <TextField
                type="number"
                placeholder="Max"
                size="small"
                value={filter.value?.max || ''}
                onChange={(e) => handleValueChange({ 
                  ...filter.value, 
                  max: e.target.value 
                })}
                sx={{ width: 80 }}
              />
            </Box>
          );
        }
        return (
          <TextField
            type="number"
            placeholder="Valor"
            size="small"
            value={filter.value || ''}
            onChange={(e) => handleValueChange(e.target.value)}
            sx={{ width: 120 }}
          />
        );

      case 'date':
        if (filter.operator === 'lastDays') {
          return (
            <TextField
              type="number"
              placeholder="Dias"
              size="small"
              value={filter.value || ''}
              onChange={(e) => handleValueChange(e.target.value)}
              sx={{ width: 80 }}
            />
          );
        }
        if (filter.operator === 'between') {
          return (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <DatePicker
                  label="De"
                  value={filter.value?.start ? new Date(filter.value.start) : null}
                  onChange={(date) => handleValueChange({ 
                    ...filter.value, 
                    start: date?.toISOString() 
                  })}
                  slotProps={{ textField: { size: 'small', sx: { width: 130 } } }}
                />
                <DatePicker
                  label="Até"
                  value={filter.value?.end ? new Date(filter.value.end) : null}
                  onChange={(date) => handleValueChange({ 
                    ...filter.value, 
                    end: date?.toISOString() 
                  })}
                  slotProps={{ textField: { size: 'small', sx: { width: 130 } } }}
                />
              </Box>
            </LocalizationProvider>
          );
        }
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data"
              value={filter.value ? new Date(filter.value) : null}
              onChange={(date) => handleValueChange(date?.toISOString())}
              slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
            />
          </LocalizationProvider>
        );

      case 'categorical':
        const uniqueValues = getUniqueValues(filter.column);
        if (filter.operator === 'in' || filter.operator === 'notIn') {
          return (
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Valores</InputLabel>
              <Select
                multiple
                value={filter.value || []}
                onChange={(e) => handleValueChange(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {uniqueValues.map((value) => (
                  <MenuItem key={value} value={value}>
                    <Checkbox checked={(filter.value || []).includes(value)} />
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }
        return (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Valor</InputLabel>
            <Select
              value={filter.value || ''}
              onChange={(e) => handleValueChange(e.target.value)}
            >
              {uniqueValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'boolean':
        return (
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Valor</InputLabel>
            <Select
              value={filter.value ?? ''}
              onChange={(e) => handleValueChange(e.target.value === 'true')}
            >
              <MenuItem value="true">Verdadeiro</MenuItem>
              <MenuItem value="false">Falso</MenuItem>
            </Select>
          </FormControl>
        );

      default:
        return (
          <TextField
            placeholder="Valor"
            size="small"
            value={filter.value || ''}
            onChange={(e) => handleValueChange(e.target.value)}
            sx={{ width: 150 }}
          />
        );
    }
  };

  // Efeito para notificar mudanças
  React.useEffect(() => {
    onFilteredDataChange(filteredAndSortedData);
    onFiltersChange?.(filters);
  }, [filteredAndSortedData, filters, onFilteredDataChange, onFiltersChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList color="primary" />
            Sistema Avançado de Filtros
            <Badge badgeContent={filters.filter(f => f.active).length} color="primary">
              <Chip size="small" />
            </Badge>
          </Typography>

          {/* Busca Global */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Busca global em todos os campos..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                    endAdornment: searchText && (
                      <IconButton size="small" onClick={() => setSearchText('')}>
                        <Clear />
                      </IconButton>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Ordenar por</InputLabel>
                  <Select
                    value={sortColumn}
                    onChange={(e) => setSortColumn(e.target.value)}
                    startAdornment={<Sort sx={{ mr: 1 }} />}
                  >
                    <MenuItem value="">Sem ordenação</MenuItem>
                    {columns.map((col) => (
                      <MenuItem key={col.name} value={col.name}>
                        {col.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
                  >
                    <FormControlLabel value="asc" control={<Radio size="small" />} label="⬆️ Asc" />
                    <FormControlLabel value="desc" control={<Radio size="small" />} label="⬇️ Desc" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Configurações Avançadas */}
          <Accordion expanded={showAdvanced} onChange={(_, expanded) => setShowAdvanced(expanded)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tune />
                Configurações Avançadas
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl component="fieldset">
                    <Typography variant="subtitle2" gutterBottom>
                      Lógica dos Filtros
                    </Typography>
                    <RadioGroup
                      value={filterLogic}
                      onChange={(e) => setFilterLogic(e.target.value as 'AND' | 'OR')}
                    >
                      <FormControlLabel 
                        value="AND" 
                        control={<Radio size="small" />} 
                        label="E (todos devem ser verdadeiros)" 
                      />
                      <FormControlLabel 
                        value="OR" 
                        control={<Radio size="small" />} 
                        label="OU (pelo menos um verdadeiro)" 
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={caseSensitive}
                        onChange={(e) => setCaseSensitive(e.target.checked)}
                      />
                    }
                    label="Diferenciar maiúsculas/minúsculas"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Salvar Filtros
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        size="small"
                        placeholder="Nome do filtro"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<SavedSearch />}
                        onClick={saveFilterConfig}
                        disabled={!filterName.trim()}
                      >
                        Salvar
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Filtros Salvos */}
          {savedFilters.length > 0 && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <History />
                Filtros Salvos
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {savedFilters.map((config) => (
                  <Chip
                    key={config.id}
                    label={config.name}
                    variant="outlined"
                    onClick={() => loadFilterConfig(config)}
                    onDelete={() => setSavedFilters(prev => prev.filter(c => c.id !== config.id))}
                    clickable
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Lista de Filtros */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tune />
                Filtros Específicos ({filters.length})
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Add />}
                  onClick={addFilter}
                  disabled={columns.length === 0}
                >
                  Adicionar Filtro
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Clear />}
                  onClick={clearAllFilters}
                  disabled={filters.length === 0 && !searchText && !sortColumn}
                >
                  Limpar Tudo
                </Button>
              </Stack>
            </Box>

            {filters.map((filter) => (
              <Paper key={filter.id} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Coluna</InputLabel>
                      <Select
                        value={filter.column}
                        onChange={(e) => {
                          const newType = getColumnType(e.target.value);
                          updateFilter(filter.id, { 
                            column: e.target.value,
                            type: newType,
                            operator: operators[newType][0].value,
                            value: ''
                          });
                        }}
                      >
                        {columns.map((col) => (
                          <MenuItem key={col.name} value={col.name}>
                            {col.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Operador</InputLabel>
                      <Select
                        value={filter.operator}
                        onChange={(e) => updateFilter(filter.id, { 
                          operator: e.target.value,
                          value: ''
                        })}
                      >
                        {operators[filter.type].map((op) => (
                          <MenuItem key={op.value} value={op.value}>
                            {op.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    {renderFilterValue(filter)}
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={filter.active}
                          onChange={(e) => updateFilter(filter.id, { active: e.target.checked })}
                          size="small"
                        />
                      }
                      label="Ativo"
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Remover filtro">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeFilter(filter.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>

          {/* Resumo dos Resultados */}
          <Alert 
            severity={filteredAndSortedData.length === data.length ? 'info' : 'success'}
            sx={{ mt: 2 }}
          >
            <Typography variant="body2">
              <strong>Resultados:</strong> {filteredAndSortedData.length.toLocaleString()} de {data.length.toLocaleString()} registros
              {filteredAndSortedData.length < data.length && (
                <span> ({((filteredAndSortedData.length / data.length) * 100).toFixed(1)}% dos dados)</span>
              )}
            </Typography>
          </Alert>

          {/* Dicas de Uso */}
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <School />
                Dicas de Uso dos Filtros
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    🔍 Busca Global
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Procura em todas as colunas simultaneamente<br/>
                    • Não diferencia maiúsculas/minúsculas por padrão<br/>
                    • Use para encontrar rapidamente registros específicos
                  </Typography>

                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    🎯 Filtros Específicos
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Combine múltiplos filtros com AND/OR<br/>
                    • Use "Entre" para intervalos numéricos<br/>
                    • "Regex" permite padrões complexos
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    📊 Filtros por Tipo
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • <strong>Números:</strong> maior que, menor que, entre<br/>
                    • <strong>Texto:</strong> contém, começa com, regex<br/>
                    • <strong>Datas:</strong> antes, depois, últimos X dias<br/>
                    • <strong>Categóricos:</strong> está em, não está em
                  </Typography>

                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    💾 Salvando Filtros
                  </Typography>
                  <Typography variant="body2">
                    • Salve combinações complexas de filtros<br/>
                    • Reutilize configurações frequentes<br/>
                    • Compartilhe filtros com a equipe
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default AdvancedDataFilter;
