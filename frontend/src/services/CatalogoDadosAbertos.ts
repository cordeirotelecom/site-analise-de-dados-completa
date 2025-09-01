// Catálogo Completo de Portais de Dados Abertos
export interface PortalDadosAbertos {
  id: string;
  nome: string;
  descricao: string;
  url: string;
  api?: string;
  categoria: 'municipal' | 'estadual' | 'federal' | 'internacional';
  regiao: string;
  status: 'ativo' | 'manutencao' | 'indisponivel';
  formatos: string[];
  temas: string[];
  ultimaAtualizacao: string;
  qualidade: 'alta' | 'media' | 'baixa';
  autenticacao: boolean;
  documentacao?: string;
  contato?: string;
  exemplos?: string[];
}

export interface APIEndpoint {
  id: string;
  portal: string;
  nome: string;
  descricao: string;
  url: string;
  metodo: 'GET' | 'POST';
  parametros: ParametroAPI[];
  headers?: Record<string, string>;
  exemplo: string;
  resposta_exemplo: any;
  filtros_disponiveis: string[];
  paginacao: boolean;
  limite_requisicoes?: string;
}

export interface ParametroAPI {
  nome: string;
  tipo: 'string' | 'number' | 'boolean' | 'date';
  obrigatorio: boolean;
  descricao: string;
  valores_possiveis?: string[];
  exemplo: string;
}

class CatalogoDadosAbertos {
  
  // =============== PORTAIS MUNICIPAIS - SANTA CATARINA ===============
  
  obterPortaisMunicipaisSC(): PortalDadosAbertos[] {
    return [
      {
        id: 'florianopolis_dados_abertos',
        nome: 'Dados Abertos Florianópolis',
        descricao: 'Portal oficial de transparência e dados abertos da Prefeitura de Florianópolis',
        url: 'https://dados.pmf.sc.gov.br/',
        api: 'https://dados.pmf.sc.gov.br/api/3/',
        categoria: 'municipal',
        regiao: 'Florianópolis/SC',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML', 'RDF'],
        temas: ['Saúde', 'Educação', 'Transporte', 'Meio Ambiente', 'Orçamento', 'Obras'],
        ultimaAtualizacao: '2024-08-15',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://dados.pmf.sc.gov.br/about',
        contato: 'dados@pmf.sc.gov.br'
      },
      {
        id: 'sao_jose_transparencia',
        nome: 'Transparência São José/SC',
        descricao: 'Portal de transparência da Prefeitura Municipal de São José',
        url: 'https://www.pmsj.sc.gov.br/transparencia/',
        categoria: 'municipal',
        regiao: 'São José/SC',
        status: 'ativo',
        formatos: ['PDF', 'XLS', 'CSV'],
        temas: ['Despesas', 'Receitas', 'Licitações', 'Contratos', 'Servidores'],
        ultimaAtualizacao: '2024-08-20',
        qualidade: 'media',
        autenticacao: false,
        contato: 'transparencia@pmsj.sc.gov.br'
      },
      {
        id: 'joinville_dados_abertos',
        nome: 'Dados Abertos Joinville',
        descricao: 'Portal de dados abertos da maior cidade de Santa Catarina',
        url: 'https://dadosabertos.joinville.sc.gov.br/',
        api: 'https://dadosabertos.joinville.sc.gov.br/api/3/',
        categoria: 'municipal',
        regiao: 'Joinville/SC',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML'],
        temas: ['Demografia', 'Economia', 'Infraestrutura', 'Serviços Públicos'],
        ultimaAtualizacao: '2024-07-30',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://dadosabertos.joinville.sc.gov.br/about'
      },
      {
        id: 'blumenau_transparencia',
        nome: 'Transparência Blumenau',
        descricao: 'Portal de transparência da Prefeitura de Blumenau',
        url: 'https://www.blumenau.sc.gov.br/transparencia',
        categoria: 'municipal',
        regiao: 'Blumenau/SC',
        status: 'ativo',
        formatos: ['PDF', 'CSV', 'XLS'],
        temas: ['Orçamento', 'Gastos Públicos', 'Pessoal', 'Obras'],
        ultimaAtualizacao: '2024-08-10',
        qualidade: 'media',
        autenticacao: false
      },
      {
        id: 'chapeco_dados',
        nome: 'Dados Abertos Chapecó',
        descricao: 'Portal de dados e transparência de Chapecó',
        url: 'https://www.chapeco.sc.gov.br/transparencia',
        categoria: 'municipal',
        regiao: 'Chapecó/SC',
        status: 'ativo',
        formatos: ['CSV', 'PDF', 'XLS'],
        temas: ['Saúde', 'Agricultura', 'Desenvolvimento Rural'],
        ultimaAtualizacao: '2024-07-15',
        qualidade: 'media',
        autenticacao: false
      }
    ];
  }

  // =============== PORTAIS ESTADUAIS ===============
  
  obterPortaisEstaduais(): PortalDadosAbertos[] {
    return [
      {
        id: 'santa_catarina_dados_abertos',
        nome: 'Dados Abertos Santa Catarina',
        descricao: 'Portal oficial de dados abertos do Governo do Estado de Santa Catarina',
        url: 'https://dados.sc.gov.br/',
        api: 'https://dados.sc.gov.br/api/3/',
        categoria: 'estadual',
        regiao: 'Santa Catarina',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML', 'RDF'],
        temas: ['Saúde', 'Educação', 'Segurança', 'Economia', 'Meio Ambiente', 'Transporte'],
        ultimaAtualizacao: '2024-08-25',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://dados.sc.gov.br/about',
        contato: 'dados@sc.gov.br'
      },
      {
        id: 'sao_paulo_dados_abertos',
        nome: 'Dados Abertos São Paulo',
        descricao: 'Portal de dados abertos do Governo do Estado de São Paulo',
        url: 'https://dados.sp.gov.br/',
        api: 'https://dados.sp.gov.br/api/3/',
        categoria: 'estadual',
        regiao: 'São Paulo',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML'],
        temas: ['Saúde', 'Educação', 'Segurança', 'Transporte', 'Habitação'],
        ultimaAtualizacao: '2024-08-28',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://dados.sp.gov.br/about'
      },
      {
        id: 'rio_janeiro_dados_abertos',
        nome: 'Dados Abertos Rio de Janeiro',
        descricao: 'Portal de transparência e dados abertos do Estado do Rio de Janeiro',
        url: 'https://dados.rj.gov.br/',
        categoria: 'estadual',
        regiao: 'Rio de Janeiro',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'PDF'],
        temas: ['Turismo', 'Cultura', 'Segurança', 'Meio Ambiente'],
        ultimaAtualizacao: '2024-08-20',
        qualidade: 'media',
        autenticacao: false
      },
      {
        id: 'minas_gerais_dados',
        nome: 'Dados Abertos Minas Gerais',
        descricao: 'Portal de dados abertos do Governo de Minas Gerais',
        url: 'https://dados.mg.gov.br/',
        api: 'https://dados.mg.gov.br/api/3/',
        categoria: 'estadual',
        regiao: 'Minas Gerais',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML'],
        temas: ['Mineração', 'Agropecuária', 'Indústria', 'Turismo'],
        ultimaAtualizacao: '2024-08-22',
        qualidade: 'alta',
        autenticacao: false
      },
      {
        id: 'rio_grande_sul_dados',
        nome: 'Dados Abertos Rio Grande do Sul',
        descricao: 'Portal de dados abertos do RS',
        url: 'https://dados.rs.gov.br/',
        categoria: 'estadual',
        regiao: 'Rio Grande do Sul',
        status: 'ativo',
        formatos: ['CSV', 'JSON', 'XML'],
        temas: ['Agricultura', 'Pecuária', 'Indústria', 'Porto'],
        ultimaAtualizacao: '2024-08-18',
        qualidade: 'media',
        autenticacao: false
      }
    ];
  }

  // =============== PORTAIS FEDERAIS ===============
  
  obterPortaisFederais(): PortalDadosAbertos[] {
    return [
      {
        id: 'dados_gov_br',
        nome: 'Dados.gov.br',
        descricao: 'Portal oficial de dados abertos do Governo Federal Brasileiro',
        url: 'https://dados.gov.br/',
        api: 'https://dados.gov.br/api/3/',
        categoria: 'federal',
        regiao: 'Brasil',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML', 'RDF', 'API'],
        temas: ['Saúde', 'Educação', 'Economia', 'Meio Ambiente', 'Justiça', 'Defesa'],
        ultimaAtualizacao: '2024-08-30',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://dados.gov.br/about',
        contato: 'dados@planejamento.gov.br',
        exemplos: ['https://dados.gov.br/dataset/covid-19-vacinacao', 'https://dados.gov.br/dataset/bolsa-familia-pagamentos']
      },
      {
        id: 'ibge_dados',
        nome: 'IBGE - Dados e Estatísticas',
        descricao: 'Instituto Brasileiro de Geografia e Estatística - fonte oficial de dados demográficos e geográficos',
        url: 'https://www.ibge.gov.br/estatisticas/',
        api: 'https://servicodados.ibge.gov.br/api/docs/',
        categoria: 'federal',
        regiao: 'Brasil',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'API'],
        temas: ['Demografia', 'Geografia', 'Economia', 'Censos', 'Pesquisas'],
        ultimaAtualizacao: '2024-08-30',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://servicodados.ibge.gov.br/api/docs/'
      },
      {
        id: 'portal_transparencia',
        nome: 'Portal da Transparência',
        descricao: 'Transparência dos gastos do Governo Federal',
        url: 'https://portaldatransparencia.gov.br/',
        api: 'http://www.portaltransparencia.gov.br/api-de-dados',
        categoria: 'federal',
        regiao: 'Brasil',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'API'],
        temas: ['Despesas', 'Receitas', 'Convênios', 'Cartões de Pagamento'],
        ultimaAtualizacao: '2024-08-30',
        qualidade: 'alta',
        autenticacao: true,
        documentacao: 'http://www.portaltransparencia.gov.br/api-de-dados'
      },
      {
        id: 'banco_central',
        nome: 'Banco Central - Dados Abertos',
        descricao: 'Dados econômicos e financeiros oficiais do Brasil',
        url: 'https://dadosabertos.bcb.gov.br/',
        api: 'https://api.bcb.gov.br/',
        categoria: 'federal',
        regiao: 'Brasil',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML'],
        temas: ['Economia', 'Finanças', 'Moeda', 'Câmbio', 'Inflação'],
        ultimaAtualizacao: '2024-08-30',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://dadosabertos.bcb.gov.br/'
      },
      {
        id: 'anvisa_dados',
        nome: 'ANVISA - Dados Abertos',
        descricao: 'Agência Nacional de Vigilância Sanitária - dados de medicamentos e alimentos',
        url: 'https://dados.anvisa.gov.br/',
        categoria: 'federal',
        regiao: 'Brasil',
        status: 'ativo',
        formatos: ['CSV', 'JSON', 'XML'],
        temas: ['Medicamentos', 'Alimentos', 'Cosméticos', 'Saneantes'],
        ultimaAtualizacao: '2024-08-25',
        qualidade: 'alta',
        autenticacao: false
      }
    ];
  }

  // =============== PORTAIS INTERNACIONAIS ===============
  
  obterPortaisInternacionais(): PortalDadosAbertos[] {
    return [
      {
        id: 'world_bank_data',
        nome: 'World Bank Open Data',
        descricao: 'Dados econômicos e sociais globais do Banco Mundial',
        url: 'https://data.worldbank.org/',
        api: 'https://datahelpdesk.worldbank.org/knowledgebase/articles/889392',
        categoria: 'internacional',
        regiao: 'Mundial',
        status: 'ativo',
        formatos: ['JSON', 'XML', 'CSV', 'API'],
        temas: ['Economia', 'Desenvolvimento', 'Pobreza', 'Educação', 'Saúde'],
        ultimaAtualizacao: '2024-08-30',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://datahelpdesk.worldbank.org/knowledgebase/articles/889392'
      },
      {
        id: 'united_nations_data',
        nome: 'UN Data',
        descricao: 'Base de dados estatísticos das Nações Unidas',
        url: 'https://data.un.org/',
        categoria: 'internacional',
        regiao: 'Mundial',
        status: 'ativo',
        formatos: ['CSV', 'JSON', 'API'],
        temas: ['Demografia', 'Desenvolvimento Sustentável', 'Meio Ambiente', 'Paz'],
        ultimaAtualizacao: '2024-08-28',
        qualidade: 'alta',
        autenticacao: false
      },
      {
        id: 'oecd_data',
        nome: 'OECD Data',
        descricao: 'Organização para Cooperação e Desenvolvimento Econômico',
        url: 'https://data.oecd.org/',
        api: 'https://data.oecd.org/api/',
        categoria: 'internacional',
        regiao: 'OECD',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML', 'API'],
        temas: ['Economia', 'Educação', 'Emprego', 'Meio Ambiente', 'Saúde'],
        ultimaAtualizacao: '2024-08-29',
        qualidade: 'alta',
        autenticacao: false,
        documentacao: 'https://data.oecd.org/api/'
      },
      {
        id: 'eurostat',
        nome: 'Eurostat',
        descricao: 'Instituto de Estatística da União Europeia',
        url: 'https://ec.europa.eu/eurostat/data/database',
        api: 'https://ec.europa.eu/eurostat/web/json-and-unicode-web-services',
        categoria: 'internacional',
        regiao: 'União Europeia',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'TSV', 'API'],
        temas: ['Demografia', 'Economia', 'Meio Ambiente', 'Sociedade'],
        ultimaAtualizacao: '2024-08-30',
        qualidade: 'alta',
        autenticacao: false
      },
      {
        id: 'data_gov_us',
        nome: 'Data.gov (EUA)',
        descricao: 'Portal oficial de dados abertos do governo americano',
        url: 'https://data.gov/',
        api: 'https://api.data.gov/',
        categoria: 'internacional',
        regiao: 'Estados Unidos',
        status: 'ativo',
        formatos: ['JSON', 'CSV', 'XML', 'API'],
        temas: ['Saúde', 'Economia', 'Clima', 'Educação', 'Energia'],
        ultimaAtualizacao: '2024-08-30',
        qualidade: 'alta',
        autenticacao: true,
        documentacao: 'https://api.data.gov/'
      },
      {
        id: 'data_gov_uk',
        nome: 'Data.gov.uk',
        descricao: 'Portal de dados abertos do Reino Unido',
        url: 'https://data.gov.uk/',
        categoria: 'internacional',
        regiao: 'Reino Unido',
        status: 'ativo',
        formatos: ['CSV', 'JSON', 'API'],
        temas: ['Governo', 'Economia', 'Transporte', 'Meio Ambiente'],
        ultimaAtualizacao: '2024-08-28',
        qualidade: 'alta',
        autenticacao: false
      }
    ];
  }

  // =============== APIs FUNCIONAIS ESTRUTURADAS ===============
  
  obterAPIsEstruturadas(): APIEndpoint[] {
    return [
      {
        id: 'florianopolis_educacao',
        portal: 'florianopolis_dados_abertos',
        nome: 'Escolas Municipais de Florianópolis',
        descricao: 'Lista de escolas municipais com informações detalhadas',
        url: 'https://dados.pmf.sc.gov.br/api/3/action/datastore_search',
        metodo: 'GET',
        parametros: [
          { nome: 'resource_id', tipo: 'string', obrigatorio: true, descricao: 'ID do recurso', exemplo: 'escolas-municipais' },
          { nome: 'limit', tipo: 'number', obrigatorio: false, descricao: 'Limite de registros', exemplo: '100' },
          { nome: 'offset', tipo: 'number', obrigatorio: false, descricao: 'Offset para paginação', exemplo: '0' }
        ],
        exemplo: 'https://dados.pmf.sc.gov.br/api/3/action/datastore_search?resource_id=escolas-municipais&limit=50',
        resposta_exemplo: {
          success: true,
          result: {
            records: [
              { nome: 'Escola Municipal João Silva', endereco: 'Rua das Flores, 123', bairro: 'Centro' }
            ]
          }
        },
        filtros_disponiveis: ['bairro', 'tipo_ensino', 'modalidade'],
        paginacao: true
      },
      {
        id: 'sc_saude_unidades',
        portal: 'santa_catarina_dados_abertos',
        nome: 'Unidades de Saúde SC',
        descricao: 'Unidades de saúde do estado de Santa Catarina',
        url: 'https://dados.sc.gov.br/api/3/action/datastore_search',
        metodo: 'GET',
        parametros: [
          { nome: 'resource_id', tipo: 'string', obrigatorio: true, descricao: 'ID do recurso', exemplo: 'unidades-saude' },
          { nome: 'q', tipo: 'string', obrigatorio: false, descricao: 'Termo de busca', exemplo: 'hospital' },
          { nome: 'filters', tipo: 'string', obrigatorio: false, descricao: 'Filtros JSON', exemplo: '{"municipio": "Florianópolis"}' }
        ],
        exemplo: 'https://dados.sc.gov.br/api/3/action/datastore_search?resource_id=unidades-saude&filters={"municipio":"Florianópolis"}',
        resposta_exemplo: {
          success: true,
          result: {
            records: [
              { nome: 'Hospital Universitário', municipio: 'Florianópolis', tipo: 'Hospital' }
            ]
          }
        },
        filtros_disponiveis: ['municipio', 'tipo', 'especialidade'],
        paginacao: true
      },
      {
        id: 'brasil_covid_vacinacao',
        portal: 'dados_gov_br',
        nome: 'Dados de Vacinação COVID-19',
        descricao: 'Dados nacionais de vacinação contra COVID-19',
        url: 'https://dados.gov.br/api/3/action/datastore_search',
        metodo: 'GET',
        parametros: [
          { nome: 'resource_id', tipo: 'string', obrigatorio: true, descricao: 'ID do recurso', exemplo: 'covid-vacinacao' },
          { nome: 'filters', tipo: 'string', obrigatorio: false, descricao: 'Filtros por estado/município', exemplo: '{"estado": "SC"}' }
        ],
        exemplo: 'https://dados.gov.br/api/3/action/datastore_search?resource_id=covid-vacinacao&filters={"estado":"SC"}',
        resposta_exemplo: {
          success: true,
          result: {
            records: [
              { estado: 'SC', municipio: 'Florianópolis', doses_aplicadas: 500000, data: '2024-08-30' }
            ]
          }
        },
        filtros_disponiveis: ['estado', 'municipio', 'data_inicio', 'data_fim'],
        paginacao: true
      }
    ];
  }

  // =============== MÉTODOS UTILITÁRIOS ===============
  
  obterTodosPortais(): PortalDadosAbertos[] {
    return [
      ...this.obterPortaisMunicipaisSC(),
      ...this.obterPortaisEstaduais(),
      ...this.obterPortaisFederais(),
      ...this.obterPortaisInternacionais()
    ];
  }

  buscarPortaisPorRegiao(regiao: string): PortalDadosAbertos[] {
    return this.obterTodosPortais().filter(portal => 
      portal.regiao.toLowerCase().includes(regiao.toLowerCase())
    );
  }

  buscarPortaisPorTema(tema: string): PortalDadosAbertos[] {
    return this.obterTodosPortais().filter(portal => 
      portal.temas.some(t => t.toLowerCase().includes(tema.toLowerCase()))
    );
  }

  obterPortaisComAPI(): PortalDadosAbertos[] {
    return this.obterTodosPortais().filter(portal => portal.api);
  }

  obterEstatisticas(): any {
    const portais = this.obterTodosPortais();
    return {
      total_portais: portais.length,
      por_categoria: {
        municipal: portais.filter(p => p.categoria === 'municipal').length,
        estadual: portais.filter(p => p.categoria === 'estadual').length,
        federal: portais.filter(p => p.categoria === 'federal').length,
        internacional: portais.filter(p => p.categoria === 'internacional').length
      },
      com_api: portais.filter(p => p.api).length,
      sem_autenticacao: portais.filter(p => !p.autenticacao).length,
      qualidade_alta: portais.filter(p => p.qualidade === 'alta').length,
      temas_populares: this.obterTemasPopulares(portais)
    };
  }

  private obterTemasPopulares(portais: PortalDadosAbertos[]): any {
    const temas: Record<string, number> = {};
    portais.forEach(portal => {
      portal.temas.forEach(tema => {
        temas[tema] = (temas[tema] || 0) + 1;
      });
    });
    
    return Object.entries(temas)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .reduce((obj, [tema, count]) => ({ ...obj, [tema]: count }), {});
  }
}

export const catalogoDadosAbertos = new CatalogoDadosAbertos();
