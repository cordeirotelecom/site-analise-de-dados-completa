import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DadosSantaCatarinaCompleto: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
        Portal de Dados de Santa Catarina
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
        Plataforma completa de análise de dados oficiais do Estado de Santa Catarina
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tab label="Economia" />
        <Tab label="Demografia" />
        <Tab label="Saúde" />
        <Tab label="Educação" />
        <Tab label="Meio Ambiente" />
        <Tab label="BigData SC" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="h6">
                ECONOMIA DE SANTA CATARINA
              </Typography>
              <Typography variant="body2">
                Dados econômicos oficiais do estado com maior PIB per capita da região Sul.
              </Typography>
            </Alert>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>PIB Estadual</Typography>
                <Typography variant="h5">R$ 349,9 bilhões</Typography>
                <Typography variant="body2">6º maior PIB do Brasil (2023)</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>PIB per capita</Typography>
                <Typography variant="h5">R$ 46.567</Typography>
                <Typography variant="body2">4º maior do Brasil</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Exportações</Typography>
                <Typography variant="h5">US$ 11,2 bi</Typography>
                <Typography variant="body2">5º maior exportador</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="h6">
                DEMOGRAFIA DE SANTA CATARINA
              </Typography>
              <Typography variant="body2">
                Análise populacional e demográfica baseada no Censo 2022 do IBGE.
              </Typography>
            </Alert>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>População Total</Typography>
                <Typography variant="h5">7.609.601</Typography>
                <Typography variant="body2">Crescimento de 0,8% ao ano</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="h6">
                SISTEMA DE SAÚDE
              </Typography>
              <Typography variant="body2">
                Dados oficiais do DATASUS e Secretaria de Estado da Saúde.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="h6">
                EDUCAÇÃO EM SC
              </Typography>
              <Typography variant="body2">
                Indicadores educacionais oficiais da Secretaria de Educação.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="h6">
                MEIO AMBIENTE
              </Typography>
              <Typography variant="body2">
                Dados ambientais do IMA e órgãos oficiais.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="success">
              <Typography variant="h6">
                BIGDATA EM SANTA CATARINA
              </Typography>
              <Typography variant="body2">
                Empresas e iniciativas de BigData no estado.
              </Typography>
            </Alert>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Principais Empresas de BigData em SC
                </Typography>
                <Typography variant="body1" paragraph>
                  • <strong>WEG</strong> - Jaraguá do Sul: IoT e análise preditiva em motores industriais
                </Typography>
                <Typography variant="body1" paragraph>
                  • <strong>Embraco</strong> - Joinville: BigData para otimização de compressores
                </Typography>
                <Typography variant="body1" paragraph>
                  • <strong>TOTVS</strong> - Joinville: Soluções de ERP com analytics
                </Typography>
                <Typography variant="body1" paragraph>
                  • <strong>Softplan</strong> - Florianópolis: Analytics para setor jurídico
                </Typography>
                <Typography variant="body1" paragraph>
                  • <strong>ACATE</strong> - Florianópolis: Hub de tecnologia e inovação
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default DadosSantaCatarinaCompleto;
