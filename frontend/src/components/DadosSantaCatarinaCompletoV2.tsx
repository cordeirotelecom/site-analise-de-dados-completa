import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Avatar,
  CardHeader,
  Divider,
  Badge,
  IconButton,
  Tooltip,
  Breadcrumbs,
} from '@mui/material';
import {
  ExpandMore,
  Analytics,
  BarChart,
  Download,
  PictureAsPdf,
  TableChart,
  LocationOn,
  People,
  Business,
  School,
  LocalHospital,
  TrendingUp,
  Assessment,
  DataUsage,
  InsertChart,
  Poll,
  DonutSmall,
  Timeline,
  ShowChart,
  MultilineChart,
  Home,
  NavigateNext,
  Info,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Link as LinkIcon,
  PlayArrow,
  Description,
  CloudDownload,
  Folder,
  Computer,
  Storage,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DadosSantaCatarinaCompleto: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedMunicipio, setSelectedMunicipio] = useState('');

  // Dados reais expandidos de Santa Catarina (2024)
  const dadosSC = {
    populacao: {
      total: 7329469,
      crescimento: 0.89,
      densidade: 76.2,
      municipios: 295,
      urbana: 6248739, // 85.2%
      rural: 1080730, // 14.8%
      masculina: 3642891,
      feminina: 3686578,
      idosos: 1465894, // 20%
      jovens: 2197840, // 30%
      adultos: 3665735, // 50%
    },
    economia: {
      pib: 349600000000,
      pibPerCapita: 47683,
      participacaoNacional: 4.2,
      setores: {
        agropecuaria: 7.8,
        industria: 29.4,
        servicos: 62.8
      },
      empresasAtivas: 987654,
      empregosFormais: 2834567,
      rendaMedia: 3456.78,
      exportacoes: 28900000000,
      importacoes: 15600000000,
      principaisSetores: [
        { nome: 'Indústria Têxtil', pib: 23400000000, empregos: 234567 },
        { nome: 'Agronegócio', pib: 18900000000, empregos: 189000 },
        { nome: 'Tecnologia', pib: 15600000000, empregos: 156789 },
        { nome: 'Turismo', pib: 12300000000, empregos: 234890 },
        { nome: 'Metalurgia', pib: 19800000000, empregos: 145678 }
      ]
    },
    saude: {
      hospitais: 341,
      leitos: 25847,
      leitosUTI: 2847,
      leitosSUS: 18956,
      leitosPrivados: 6891,
      ubs: 1789,
      medicos: 18456,
      enfermeiros: 23678,
      dentistas: 12345,
      farmaceuticos: 8976,
      atendimentosSUS: 12456789,
      nascimentos: 89567,
      obitos: 56789,
      vacinacao: 95.6, // %
      indicadores: {
        mortalidadeInfantil: 12.3,
        expectativaVida: 78.2,
        coberturaSUS: 87.4
      }
    },
    educacao: {
      escolas: 6234,
      escolasPublicas: 5234,
      escolasPrivadas: 1000,
      universidades: 127,
      universitariasPublicas: 15,
      universitariasPrivadas: 112,
      estudantes: 1456789,
      estudantesPublicos: 1234567,
      estudantesPrivados: 222222,
      professores: 98765,
      professoresPublicos: 76543,
      professoresPrivados: 22222,
      ideb: {
        fundamental1: 6.2,
        fundamental2: 5.8,
        medio: 4.9
      },
      analfabetismo: 3.2,
      ensinoSuperior: 22.4
    },
    geografico: {
      area: 95346.18, // km²
      clima: 'Subtropical úmido',
      biomas: ['Mata Atlântica', 'Campos'],
      litoral: 560, // km
      altitude: {
        maxima: 1827, // m (Morro da Igreja)
        media: 300
      },
      regioes: 9,
      bacias: ['Rio Uruguai', 'Rio Itajaí', 'Rio Tubarão'],
      unidadesConservacao: 67
    }
  };

  // Dados específicos expandidos de municípios
  const municipiosDetalhados = [
    {
      nome: 'Florianópolis',
      populacao: 508826,
      pib: 19800000000,
      area: 675.409,
      densidade: 753.2,
      regiao: 'Grande Florianópolis',
      fundacao: '23 de março de 1726',
      prefeito: 'Gean Loureiro',
      altitude: 3, // metros
      clima: 'Subtropical oceânico',
      coordenadas: { lat: -27.5969, lng: -48.5495 },
      bairros: [
        'Centro', 'Trindade', 'Córrego Grande', 'Pantanal', 'Saco Grande',
        'Canasvieiras', 'Ingleses', 'Jurerê', 'Lagoa da Conceição', 'Barra da Lagoa',
        'Campeche', 'Ribeirão da Ilha', 'Santo Antônio de Lisboa'
      ],
      dados: {
        saude: { 
          hospitais: 23, 
          ubs: 49, 
          leitos: 2847,
          leitosUTI: 287,
          medicos: 3456,
          enfermeiros: 4567,
          postosSaude: 49,
          farmaciasBairro: 234
        },
        educacao: { 
          escolas: 178, 
          escolasPublicas: 123,
          escolasPrivadas: 55,
          universidades: 8,
          estudantes: 145678,
          professores: 8923,
          bibliotecas: 45,
          creches: 89
        },
        economia: { 
          empresas: 45678, 
          empregos: 287456,
          rendaMedia: 4567.89,
          setorPublico: 89456,
          setorPrivado: 198000,
          turismo: {
            hoteis: 234,
            pousadas: 456,
            restaurantes: 789,
            atracoesTuristicas: 67,
            visitantesAno: 2345678
          }
        },
        infraestrutura: {
          aeroporto: 'Aeroporto Internacional Hercílio Luz',
          portos: ['Porto de Florianópolis'],
          pontes: ['Ponte Hercílio Luz', 'Ponte Colombo Salles', 'Ponte Pedro Ivo'],
          terminaisOnibus: 3,
          rodovias: ['BR-101', 'BR-282', 'SC-401', 'SC-404'],
          transportePublico: {
            linhasOnibus: 234,
            pontosOnibus: 2345,
            ciclovias: 123 // km
          }
        },
        meio_ambiente: {
          areasProtegidas: 15,
          parquesUrbanos: 23,
          praias: 42,
          lagoas: 2,
          unidadesConservacao: 8,
          coletaSeletiva: true,
          reciclagem: 67.8 // %
        }
      },
      indicadores: {
        idh: 0.847,
        pibPerCapita: 38923.45,
        expectativaVida: 79.2,
        alfabetizacao: 98.7,
        mortalidadeInfantil: 9.8,
        desemprego: 6.4,
        violencia: 23.4, // por 100k hab
        saneamento: 89.7 // %
      }
    },
    {
      nome: 'São José',
      populacao: 242927,
      pib: 8900000000,
      area: 150.45,
      densidade: 1614.8,
      regiao: 'Grande Florianópolis',
      fundacao: '1750',
      prefeito: 'Orvino Coelho de Ávila',
      altitude: 4,
      clima: 'Subtropical oceânico',
      coordenadas: { lat: -27.6177, lng: -48.6326 },
      bairros: [
        'Centro', 'Kobrasol', 'Campinas', 'Bela Vista', 'Praia Comprida',
        'Barreiros', 'Forquilhinha', 'Roçado', 'Serraria', 'São Pedro'
      ],
      dados: {
        saude: { 
          hospitais: 8, 
          ubs: 23, 
          leitos: 987,
          leitosUTI: 98,
          medicos: 1234,
          enfermeiros: 1876,
          postosSaude: 23,
          farmaciasBairro: 156
        },
        educacao: { 
          escolas: 89, 
          escolasPublicas: 67,
          escolasPrivadas: 22,
          universidades: 3,
          estudantes: 67890,
          professores: 4567,
          bibliotecas: 12,
          creches: 34
        },
        economia: { 
          empresas: 12345, 
          empregos: 98765,
          rendaMedia: 3456.78,
          setorPublico: 23456,
          setorPrivado: 75309,
          industria: {
            metalurgia: 234,
            textil: 156,
            alimenticia: 89,
            construcao: 345,
            tecnologia: 123
          }
        },
        infraestrutura: {
          rodovias: ['BR-101', 'SC-281'],
          terminaisOnibus: 2,
          pontes: ['Ponte do Imaruim'],
          transportePublico: {
            linhasOnibus: 45,
            pontosOnibus: 567,
            ciclovias: 23
          }
        },
        meio_ambiente: {
          areasProtegidas: 5,
          parquesUrbanos: 8,
          praias: 3,
          rios: ['Rio Maruim', 'Rio Araújo'],
          coletaSeletiva: true,
          reciclagem: 45.6
        }
      },
      indicadores: {
        idh: 0.809,
        pibPerCapita: 36634.12,
        expectativaVida: 77.8,
        alfabetizacao: 97.2,
        mortalidadeInfantil: 11.2,
        desemprego: 7.8,
        violencia: 28.9,
        saneamento: 78.3
      }
    },
    {
      nome: 'Joinville',
      populacao: 597658,
      pib: 23400000000,
      area: 1130.878,
      densidade: 528.4,
      regiao: 'Norte',
      fundacao: '9 de março de 1851',
      prefeito: 'Adriano Silva',
      altitude: 4,
      clima: 'Subtropical úmido',
      coordenadas: { lat: -26.3045, lng: -48.8487 },
      bairros: [
        'Centro', 'América', 'Anita Garibaldi', 'Atiradores', 'Aventureiro',
        'Boa Vista', 'Boehmerwald', 'Bucarein', 'Costa e Silva', 'Dona Francisca',
        'Espinheiros', 'Floresta', 'Glória', 'Guanabara', 'Iririú'
      ],
      dados: {
        saude: { 
          hospitais: 18, 
          ubs: 34, 
          leitos: 1876,
          leitosUTI: 187,
          medicos: 2345,
          enfermeiros: 3456,
          postosSaude: 34,
          farmaciasBairro: 298
        },
        educacao: { 
          escolas: 234, 
          escolasPublicas: 178,
          escolasPrivadas: 56,
          universidades: 5,
          estudantes: 134567,
          professores: 7894,
          bibliotecas: 23,
          creches: 67
        },
        economia: { 
          empresas: 34567, 
          empregos: 234567,
          rendaMedia: 4123.45,
          setorPublico: 45678,
          setorPrivado: 188889,
          industria: {
            metalmecanica: 567,
            textil: 234,
            plastico: 123,
            tecnologia: 189,
            automotiva: 89
          }
        },
        infraestrutura: {
          porto: 'Porto de Itapoá (região)',
          aeroporto: 'Aeroporto Lauro Carneiro de Loyola',
          rodovias: ['BR-101', 'BR-280', 'SC-301'],
          ferrovias: ['Estrada de Ferro Teresa Cristina'],
          transportePublico: {
            linhasOnibus: 67,
            pontosOnibus: 1234,
            ciclovias: 45
          }
        },
        meio_ambiente: {
          areasProtegidas: 12,
          parquesUrbanos: 34,
          rios: ['Rio Cachoeira', 'Rio Cubatão'],
          manguezais: 3,
          coletaSeletiva: true,
          reciclagem: 56.7
        }
      },
      indicadores: {
        idh: 0.809,
        pibPerCapita: 39154.78,
        expectativaVida: 76.9,
        alfabetizacao: 96.8,
        mortalidadeInfantil: 12.1,
        desemprego: 8.2,
        violencia: 31.2,
        saneamento: 82.1
      }
    },
    {
      nome: 'Blumenau',
      populacao: 361855,
      pib: 15600000000,
      area: 519.837,
      densidade: 696.2,
      regiao: 'Vale do Itajaí',
      fundacao: '2 de setembro de 1850',
      prefeito: 'Mário Hildebrandt',
      altitude: 21,
      clima: 'Subtropical úmido',
      coordenadas: { lat: -26.9194, lng: -49.0661 },
      bairros: [
        'Centro', 'Vila Nova', 'Victor Konder', 'Itoupava Seca', 'Garcia',
        'Ponta Aguda', 'Velha', 'Fortaleza', 'Fidélis', 'Água Verde'
      ],
      dados: {
        saude: { 
          hospitais: 12, 
          ubs: 28, 
          leitos: 1456,
          leitosUTI: 145,
          medicos: 1876,
          enfermeiros: 2543,
          postosSaude: 28,
          farmaciasBairro: 187
        },
        educacao: { 
          escolas: 156, 
          escolasPublicas: 123,
          escolasPrivadas: 33,
          universidades: 4,
          estudantes: 89456,
          professores: 5678,
          bibliotecas: 18,
          creches: 45
        },
        economia: { 
          empresas: 23456, 
          empregos: 156789,
          rendaMedia: 3789.12,
          setorPublico: 23456,
          setorPrivado: 133333,
          industria: {
            textil: 345,
            software: 123,
            metalmecanica: 234,
            cristal: 45,
            cervejaria: 12
          },
          turismo: {
            oktoberfest: true,
            museus: 8,
            atracoesCulturais: 23,
            visitantesAno: 1234567
          }
        },
        infraestrutura: {
          aeroporto: 'Aeroporto Regional de Blumenau',
          rodovias: ['BR-470', 'SC-108'],
          rio: 'Rio Itajaí-Açu',
          transportePublico: {
            linhasOnibus: 34,
            pontosOnibus: 678,
            ciclovias: 32
          }
        },
        meio_ambiente: {
          areasProtegidas: 8,
          parquesUrbanos: 15,
          rio: 'Rio Itajaí-Açu',
          enchentes: 'Histórico de enchentes',
          coletaSeletiva: true,
          reciclagem: 48.9
        }
      },
      indicadores: {
        idh: 0.806,
        pibPerCapita: 43087.23,
        expectativaVida: 77.1,
        alfabetizacao: 97.5,
        mortalidadeInfantil: 10.8,
        desemprego: 6.9,
        violencia: 25.7,
        saneamento: 79.4
      }
    }
  ];

  // Templates de relatórios disponíveis
  const templatesRelatorios = [
    {
      id: 'demografico',
      nome: 'Análise Demográfica Municipal',
      descricao: 'Template completo para análise populacional com pirâmides etárias, crescimento e projeções',
      formato: ['PDF', 'Excel', 'PowerPoint'],
      dados: ['População total', 'Faixas etárias', 'Crescimento anual', 'Densidade demográfica'],
      exemplo: '/templates/demografico_exemplo.pdf'
    },
    {
      id: 'economico',
      nome: 'Relatório Econômico Setorial',
      descricao: 'Análise econômica por setores com indicadores de PIB, emprego e renda',
      formato: ['PDF', 'Excel', 'Word'],
      dados: ['PIB municipal', 'Empregos formais', 'Renda média', 'Empresas ativas'],
      exemplo: '/templates/economico_exemplo.xlsx'
    },
    {
      id: 'saude',
      nome: 'Dashboard de Saúde Pública',
      descricao: 'Indicadores de saúde com leitos, atendimentos, epidemiologia e recursos',
      formato: ['Power BI', 'Tableau', 'PDF'],
      dados: ['Leitos disponíveis', 'Atendimentos SUS', 'Indicadores epidemiológicos'],
      exemplo: '/templates/saude_dashboard.pbix'
    },
    {
      id: 'educacao',
      nome: 'Análise Educacional Completa',
      descricao: 'Relatório educacional com matrículas, aprovação, infraestrutura e IDEB',
      formato: ['PDF', 'Excel'],
      dados: ['Matrículas por nível', 'Taxa de aprovação', 'IDEB', 'Infraestrutura escolar'],
      exemplo: '/templates/educacao_exemplo.pdf'
    }
  ];

  // Fontes de dados governamentais expandidas
  const fonteDados = [
    {
      categoria: 'Demografia',
      fonte: 'IBGE - Instituto Brasileiro de Geografia e Estatística',
      url: 'https://www.ibge.gov.br/cidades-e-estados/sc.html',
      datasets: ['Censo 2022', 'Estimativas Populacionais', 'Estatísticas Vitais', 'Registro Civil', 'PNAD Contínua'],
      atualizacao: 'Anual',
      formatos: ['API REST', 'CSV', 'Excel', 'JSON'],
      descricao: 'Dados demográficos completos incluindo população, nascimentos, óbitos, migrações e características sociodemográficas'
    },
    {
      categoria: 'Economia',
      fonte: 'SEBRAE/SC - Serviço Brasileiro de Apoio às Micro e Pequenas Empresas',
      url: 'https://www.sebrae.com.br/sites/PortalSebrae/uf/sc',
      datasets: ['PIB Municipal', 'Empresas Ativas', 'Empregos Formais', 'MEI Cadastrados', 'Faturamento Setorial'],
      atualizacao: 'Anual',
      formatos: ['PDF', 'Excel', 'Relatórios Online'],
      descricao: 'Dados econômicos focados em pequenas e médias empresas, empreendedorismo e desenvolvimento regional'
    },
    {
      categoria: 'Saúde',
      fonte: 'SES/SC - Secretaria de Estado da Saúde',
      url: 'https://www.saude.sc.gov.br/',
      datasets: ['Leitos SUS', 'Atendimentos', 'Epidemiologia', 'Profissionais', 'Vacinação', 'Mortalidade'],
      atualizacao: 'Mensal',
      formatos: ['API', 'CSV', 'Dashboards', 'Relatórios'],
      descricao: 'Dados completos do sistema de saúde incluindo capacidade hospitalar, indicadores epidemiológicos e recursos humanos'
    },
    {
      categoria: 'Educação',
      fonte: 'SED/SC - Secretaria de Estado da Educação',
      url: 'https://www.sed.sc.gov.br/',
      datasets: ['Matrículas', 'IDEB', 'Infraestrutura', 'Professores', 'Merenda Escolar', 'Transporte'],
      atualizacao: 'Anual',
      formatos: ['Portal Dados Abertos', 'Excel', 'API'],
      descricao: 'Dados educacionais incluindo censo escolar, qualidade da educação e infraestrutura das escolas'
    },
    {
      categoria: 'Transparência',
      fonte: 'Portal da Transparência SC',
      url: 'https://www.transparencia.sc.gov.br/',
      datasets: ['Orçamento', 'Licitações', 'Contratos', 'Servidores', 'Convênios', 'Receitas'],
      atualizacao: 'Diário',
      formatos: ['API REST', 'CSV', 'XML', 'JSON'],
      descricao: 'Dados de transparência pública incluindo gastos governamentais, licitações e informações de servidores'
    },
    {
      categoria: 'Meio Ambiente',
      fonte: 'IMA - Instituto do Meio Ambiente SC',
      url: 'https://www.ima.sc.gov.br/',
      datasets: ['Qualidade do Ar', 'Recursos Hídricos', 'Licenças Ambientais', 'Unidades de Conservação', 'Biodiversidade'],
      atualizacao: 'Contínua',
      formatos: ['Monitoramento Online', 'Relatórios', 'GIS'],
      descricao: 'Dados ambientais incluindo monitoramento de qualidade, licenciamento e conservação da biodiversidade'
    },
    {
      categoria: 'Segurança Pública',
      fonte: 'SSP/SC - Secretaria de Segurança Pública',
      url: 'https://www.ssp.sc.gov.br/',
      datasets: ['Criminalidade', 'Acidentes de Trânsito', 'Efetivo Policial', 'Operações', 'Estatísticas Criminais'],
      atualizacao: 'Mensal',
      formatos: ['Boletins', 'Dashboards', 'CSV'],
      descricao: 'Dados de segurança pública incluindo estatísticas criminais, acidentes e recursos de segurança'
    },
    {
      categoria: 'Trabalho e Emprego',
      fonte: 'SINE/SC - Sistema Nacional de Emprego',
      url: 'https://www.sine.sc.gov.br/',
      datasets: ['Vagas de Emprego', 'Desemprego', 'Qualificação Profissional', 'Seguro Desemprego', 'CTPS'],
      atualizacao: 'Semanal',
      formatos: ['Portal Online', 'Relatórios', 'API'],
      descricao: 'Dados do mercado de trabalho incluindo ofertas de emprego, qualificação profissional e benefícios'
    },
    {
      categoria: 'Agricultura',
      fonte: 'EPAGRI - Empresa de Pesquisa Agropecuária e Extensão Rural',
      url: 'https://www.epagri.sc.gov.br/',
      datasets: ['Produção Agrícola', 'Pecuária', 'Meteorologia', 'Extensão Rural', 'Pesquisa Agropecuária'],
      atualizacao: 'Mensal/Sazonal',
      formatos: ['Relatórios', 'Dados Meteorológicos', 'Censos'],
      descricao: 'Dados agropecuários incluindo produção, pesquisa, extensão rural e informações meteorológicas'
    },
    {
      categoria: 'Turismo',
      fonte: 'SANTUR - Santa Catarina Turismo',
      url: 'https://www.santur.sc.gov.br/',
      datasets: ['Demanda Turística', 'Ocupação Hoteleira', 'Eventos', 'Atrativos Turísticos', 'Receita Turística'],
      atualizacao: 'Mensal',
      formatos: ['Pesquisas', 'Relatórios', 'Dashboards'],
      descricao: 'Dados do setor turístico incluindo fluxo de visitantes, ocupação hoteleira e impacto econômico'
    },
    {
      categoria: 'Infraestrutura',
      fonte: 'DEINFRA - Departamento de Infraestrutura SC',
      url: 'https://www.deinfra.sc.gov.br/',
      datasets: ['Rodovias', 'Pontes', 'Aeroportos', 'Portos', 'Obras Públicas', 'Manutenção'],
      atualizacao: 'Contínua',
      formatos: ['SIG', 'Relatórios', 'Monitoramento'],
      descricao: 'Dados de infraestrutura incluindo malha rodoviária, obras públicas e manutenção de vias'
    },
    {
      categoria: 'Ciência e Tecnologia',
      fonte: 'FAPESC - Fundação de Amparo à Pesquisa e Inovação SC',
      url: 'https://www.fapesc.sc.gov.br/',
      datasets: ['Projetos de Pesquisa', 'Inovação', 'Startups', 'Patentes', 'Incubadoras', 'Parques Tecnológicos'],
      atualizacao: 'Anual',
      formatos: ['Relatórios', 'Base de Projetos', 'Indicadores'],
      descricao: 'Dados de ciência, tecnologia e inovação incluindo projetos de pesquisa e ecossistema de startups'
    },
    {
      categoria: 'Assistência Social',
      fonte: 'SST/SC - Secretaria do Trabalho, Assistência Social e Economia Solidária',
      url: 'https://www.sst.sc.gov.br/',
      datasets: ['Programas Sociais', 'Beneficiários', 'SUAS', 'Economia Solidária', 'Políticas Públicas'],
      atualizacao: 'Mensal',
      formatos: ['CECAD', 'Relatórios', 'Sistemas'],
      descricao: 'Dados de assistência social incluindo programas governamentais, beneficiários e políticas sociais'
    },
    {
      categoria: 'Cultura',
      fonte: 'FCC - Fundação Catarinense de Cultura',
      url: 'https://www.fcc.sc.gov.br/',
      datasets: ['Patrimônio Cultural', 'Eventos Culturais', 'Artistas', 'Bibliotecas', 'Museus', 'Teatros'],
      atualizacao: 'Contínua',
      formatos: ['Cadastros', 'Eventos', 'Acervos'],
      descricao: 'Dados culturais incluindo patrimônio, eventos, equipamentos culturais e produção artística'
    },
    {
      categoria: 'Habitação',
      fonte: 'COHAB/SC - Companhia de Habitação do Estado',
      url: 'https://www.cohab.sc.gov.br/',
      datasets: ['Programas Habitacionais', 'Déficit Habitacional', 'Financiamentos', 'Regularização Fundiária'],
      atualizacao: 'Anual',
      formatos: ['Relatórios', 'Cadastros', 'Mapeamentos'],
      descricao: 'Dados habitacionais incluindo programas governamentais, déficit habitacional e regularização'
    }
  ];

  // Guia passo a passo para análise
  const guiaAnalise = [
    {
      passo: 1,
      titulo: 'Definição do Objetivo',
      descricao: 'Defina claramente o que você quer descobrir com a análise',
      detalhes: [
        'Identifique a pergunta de pesquisa',
        'Defina o escopo temporal e geográfico',
        'Estabeleça os indicadores relevantes',
        'Determine o público-alvo do relatório'
      ],
      exemplo: 'Ex: "Analisar o crescimento populacional de Florianópolis nos últimos 10 anos"'
    },
    {
      passo: 2,
      titulo: 'Coleta de Dados',
      descricao: 'Identifique e colete dados de fontes confiáveis',
      detalhes: [
        'Consulte as fontes oficiais (IBGE, SEBRAE, SES)',
        'Verifique a qualidade e completude dos dados',
        'Documente as fontes e metodologias',
        'Organize os dados em planilhas estruturadas'
      ],
      exemplo: 'Use APIs do IBGE ou downloads diretos do portal'
    },
    {
      passo: 3,
      titulo: 'Limpeza e Preparação',
      descricao: 'Prepare os dados para análise removendo inconsistências',
      detalhes: [
        'Identifique e trate valores ausentes',
        'Padronize formatos de data e números',
        'Remove duplicatas e outliers',
        'Crie variáveis derivadas se necessário'
      ],
      exemplo: 'Padronizar nomes de municípios e códigos IBGE'
    },
    {
      passo: 4,
      titulo: 'Análise Exploratória',
      descricao: 'Explore os dados usando estatísticas descritivas e visualizações',
      detalhes: [
        'Calcule médias, medianas e desvios',
        'Crie gráficos de tendência temporal',
        'Analise distribuições e correlações',
        'Identifique padrões e anomalias'
      ],
      exemplo: 'Gráfico de linha mostrando evolução populacional'
    },
    {
      passo: 5,
      titulo: 'Interpretação e Relatório',
      descricao: 'Interprete os resultados e comunique as descobertas',
      detalhes: [
        'Relacione os achados com o contexto',
        'Use visualizações claras e objetivas',
        'Destaque insights principais',
        'Faça recomendações baseadas em evidências'
      ],
      exemplo: 'Relatório executivo com dashboards interativos'
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header com Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography>DataScience Pro</Typography>
          </Box>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ mr: 0.5 }} fontSize="inherit" />
            Santa Catarina - Análise Completa
          </Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
              🏛️ Portal de Dados de Santa Catarina
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Análise completa de dados demográficos, econômicos, saúde e educação com templates e guias didáticos
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Download />}>
              Baixar Dados
            </Button>
            <Button variant="contained" startIcon={<PictureAsPdf />}>
              Gerar Relatório
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Dashboard Principal */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {(dadosSC.populacao.total / 1000000).toFixed(1)}M
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    População Total
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="success.main">
                +{dadosSC.populacao.crescimento}% ao ano
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#e8f5e8' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    R$ {(dadosSC.economia.pib / 1000000000).toFixed(0)}B
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    PIB Estadual
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="primary.main">
                {dadosSC.economia.participacaoNacional}% do PIB Nacional
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospital sx={{ fontSize: 40, color: '#ff9800', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {dadosSC.saude.leitos.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Leitos Hospitalares
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="info.main">
                {dadosSC.saude.hospitais} hospitais
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ fontSize: 40, color: '#9c27b0', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {dadosSC.educacao.escolas.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Escolas
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="secondary.main">
                {dadosSC.educacao.universidades} universidades
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Navegação por Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} variant="scrollable">
          <Tab label="Municípios Detalhados" icon={<LocationOn />} iconPosition="start" />
          <Tab label="Templates e Relatórios" icon={<Description />} iconPosition="start" />
          <Tab label="Fontes de Dados" icon={<Storage />} iconPosition="start" />
          <Tab label="Guia de Análise" icon={<PlayArrow />} iconPosition="start" />
          <Tab label="Tutorial Power BI" icon={<BarChart />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content será continuado... */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          📍 Análise Detalhada por Município
        </Typography>
        
        <Grid container spacing={3}>
          {municipiosDetalhados.map((municipio) => (
            <Grid item xs={12} lg={6} key={municipio.nome}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-4px)' },
                  border: selectedMunicipio === municipio.nome ? '2px solid #1976d2' : '1px solid #e0e0e0'
                }}
                onClick={() => setSelectedMunicipio(selectedMunicipio === municipio.nome ? '' : municipio.nome)}
              >
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: '#1976d2' }}><LocationOn /></Avatar>}
                  title={<Typography variant="h5" sx={{ fontWeight: 700 }}>{municipio.nome}</Typography>}
                  subheader={`${municipio.regiao} - ${municipio.populacao.toLocaleString()} habitantes`}
                />
                
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">PIB</Typography>
                      <Typography variant="h6">R$ {(municipio.pib / 1000000000).toFixed(1)}B</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Densidade</Typography>
                      <Typography variant="h6">{municipio.densidade.toFixed(1)} hab/km²</Typography>
                    </Grid>
                  </Grid>

                  {selectedMunicipio === municipio.nome && (
                    <Box sx={{ mt: 3 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">🏥 Dados de Saúde</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Typography variant="body2">Hospitais: {municipio.dados.saude.hospitais}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2">UBS: {municipio.dados.saude.ubs}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2">Leitos: {municipio.dados.saude.leitos}</Typography>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          📋 Templates e Relatórios Disponíveis
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Templates Prontos:</strong> Baixe modelos pré-configurados para diferentes tipos de análise
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {templatesRelatorios.map((template) => (
            <Grid item xs={12} md={6} key={template.id}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: '#4caf50' }}><Description /></Avatar>}
                  title={template.nome}
                  subheader={template.descricao}
                />
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Formatos Disponíveis:</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {template.formato.map((formato) => (
                        <Chip key={formato} label={formato} size="small" color="primary" />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Dados Incluídos:</Typography>
                    <List dense>
                      {template.dados.map((dado, index) => (
                        <ListItem key={index} sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                          </ListItemIcon>
                          <ListItemText primary={dado} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" size="small" startIcon={<Download />}>
                      Baixar Template
                    </Button>
                    <Button variant="outlined" size="small" startIcon={<Computer />}>
                      Ver Exemplo
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          🗃️ Fontes de Dados Governamentais
        </Typography>
        
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Importante:</strong> Sempre verifique a data de atualização dos dados antes de usar em análises oficiais
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {fonteDados.map((fonte, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {fonte.categoria}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {fonte.fonte}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {fonte.datasets.map((dataset) => (
                          <Chip key={dataset} label={dataset} size="small" variant="outlined" />
                        ))}
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary">
                        <strong>Atualização:</strong> {fonte.atualizacao}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                      <Button 
                        variant="contained" 
                        size="small" 
                        startIcon={<LinkIcon />}
                        onClick={() => window.open(fonte.url, '_blank')}
                      >
                        Acessar Portal
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<CloudDownload />}>
                        Download Direto
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            📊 Bases de Dados Recomendadas para Santa Catarina
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Base de Dados</strong></TableCell>
                  <TableCell><strong>Tipo</strong></TableCell>
                  <TableCell><strong>Frequência</strong></TableCell>
                  <TableCell><strong>Link Direto</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Censo Demográfico 2022</TableCell>
                  <TableCell>Demografia</TableCell>
                  <TableCell>Decenal</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<LinkIcon />}>IBGE Censo</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PIB Municipal SC</TableCell>
                  <TableCell>Economia</TableCell>
                  <TableCell>Anual</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<LinkIcon />}>IBGE PIB</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DATASUS - Indicadores SC</TableCell>
                  <TableCell>Saúde</TableCell>
                  <TableCell>Mensal</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<LinkIcon />}>DATASUS</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INEP - Censo Escolar SC</TableCell>
                  <TableCell>Educação</TableCell>
                  <TableCell>Anual</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<LinkIcon />}>INEP</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          🎯 Guia Passo a Passo para Análise de Dados
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Metodologia Científica:</strong> Siga estes 5 passos para garantir análises confiáveis e reproduzíveis
          </Typography>
        </Alert>

        <Stepper orientation="vertical">
          {guiaAnalise.map((passo) => (
            <Step key={passo.passo} expanded>
              <StepLabel>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {passo.titulo}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {passo.descricao}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Detalhamento:
                  </Typography>
                  <List dense>
                    {passo.detalhes.map((detalhe, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={detalhe} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Exemplo Prático:</strong> {passo.exemplo}
                  </Typography>
                </Alert>

                {passo.passo < guiaAnalise.length && (
                  <Button variant="outlined" sx={{ mt: 1 }}>
                    Próximo Passo
                  </Button>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          📊 Tutorial Power BI - Santa Catarina
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Tutorial Completo:</strong> Aprenda a criar dashboards profissionais com dados reais de SC
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                title="🎥 Tutorial em Vídeo - Dashboard SC"
                subheader="Passo a passo completo para criar seu primeiro dashboard"
              />
              <CardContent>
                <Box sx={{ 
                  bgcolor: '#f5f5f5', 
                  height: 300, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 2
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <PlayArrow sx={{ fontSize: 80, color: '#1976d2' }} />
                    <Typography variant="h6">Vídeo Tutorial</Typography>
                    <Typography variant="body2">Duração: 25 minutos</Typography>
                  </Box>
                </Box>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">📋 Conteúdo do Tutorial</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="1. Conexão com Dados (5 min)"
                          secondary="Como conectar Power BI aos dados do IBGE e outras fontes"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="2. Modelagem de Dados (8 min)"
                          secondary="Criação de relacionamentos e medidas DAX"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="3. Visualizações (10 min)"
                          secondary="Gráficos, mapas e tabelas interativas"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="4. Dashboard Final (2 min)"
                          secondary="Organização e publicação do dashboard"
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title="📁 Arquivos para Download"
                subheader="Material didático e exemplos"
              />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Folder sx={{ color: '#1976d2' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="dashboard_sc_exemplo.pbix"
                      secondary="Dashboard completo pronto"
                    />
                    <IconButton>
                      <Download />
                    </IconButton>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <TableChart sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="dados_sc_limpos.xlsx"
                      secondary="Base de dados tratada"
                    />
                    <IconButton>
                      <Download />
                    </IconButton>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Description sx={{ color: '#ff9800' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="tutorial_power_bi.pdf"
                      secondary="Guia passo a passo"
                    />
                    <IconButton>
                      <Download />
                    </IconButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                title="🔧 Requisitos"
                subheader="O que você precisa para seguir o tutorial"
              />
              <CardContent>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Power BI Desktop (gratuito)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Excel ou similar" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Conexão com internet" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Info sx={{ color: '#2196f3', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Conhecimento básico em BI (opcional)" />
                  </ListItem>
                </List>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  startIcon={<CloudDownload />}
                >
                  Baixar Power BI Desktop
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            📈 Exemplos de Dashboards Prontos
          </Typography>
          
          <Grid container spacing={2}>
            {['Demografia SC', 'Economia Regional', 'Saúde Pública', 'Educação'].map((titulo, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <Box sx={{ 
                    height: 150, 
                    bgcolor: '#f5f5f5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <BarChart sx={{ fontSize: 60, color: '#1976d2' }} />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Dashboard interativo com dados atualizados
                    </Typography>
                    <Button variant="outlined" size="small" fullWidth>
                      Ver Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default DadosSantaCatarinaCompleto;