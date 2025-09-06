// Datasets de exemplo para demonstração
export const sampleDatasets = {
  vendas_ecommerce: {
    name: "Vendas E-commerce 2024",
    description: "Dados completos de vendas de uma loja online com informações de produtos, clientes e transações",
    category: "Negócios",
    rows: 10000,
    columns: 15,
    size: "2.5 MB",
    format: "CSV",
    features: ["Análise temporal", "Segmentação de clientes", "Produtos mais vendidos", "Sazonalidade"],
    data: [
      {
        id_transacao: "T001",
        data_venda: "2024-01-15",
        cliente_id: "C1001",
        cliente_nome: "João Silva",
        cliente_idade: 35,
        cliente_cidade: "São Paulo",
        cliente_estado: "SP",
        produto_id: "P101",
        produto_nome: "Smartphone Galaxy S24",
        categoria: "Eletrônicos",
        quantidade: 1,
        preco_unitario: 2999.99,
        desconto: 150.00,
        valor_total: 2849.99,
        metodo_pagamento: "Cartão de Crédito"
      },
      {
        id_transacao: "T002",
        data_venda: "2024-01-15",
        cliente_id: "C1002",
        cliente_nome: "Maria Santos",
        cliente_idade: 28,
        cliente_cidade: "Rio de Janeiro",
        cliente_estado: "RJ",
        produto_id: "P102",
        produto_nome: "Notebook Dell Inspiron",
        categoria: "Eletrônicos",
        quantidade: 1,
        preco_unitario: 3499.99,
        desconto: 200.00,
        valor_total: 3299.99,
        metodo_pagamento: "PIX"
      },
      {
        id_transacao: "T003",
        data_venda: "2024-01-16",
        cliente_id: "C1003",
        cliente_nome: "Carlos Oliveira",
        cliente_idade: 42,
        cliente_cidade: "Belo Horizonte",
        cliente_estado: "MG",
        produto_id: "P103",
        produto_nome: "Tênis Nike Air Max",
        categoria: "Esportes",
        quantidade: 2,
        preco_unitario: 399.99,
        desconto: 40.00,
        valor_total: 759.98,
        metodo_pagamento: "Cartão de Débito"
      },
      {
        id_transacao: "T004",
        data_venda: "2024-01-16",
        cliente_id: "C1004",
        cliente_nome: "Ana Costa",
        cliente_idade: 31,
        cliente_cidade: "Florianópolis",
        cliente_estado: "SC",
        produto_id: "P104",
        produto_nome: "Livro - Ciência de Dados",
        categoria: "Livros",
        quantidade: 3,
        preco_unitario: 89.99,
        desconto: 15.00,
        valor_total: 254.97,
        metodo_pagamento: "PIX"
      },
      {
        id_transacao: "T005",
        data_venda: "2024-01-17",
        cliente_id: "C1005",
        cliente_nome: "Pedro Lima",
        cliente_idade: 26,
        cliente_cidade: "Salvador",
        cliente_estado: "BA",
        produto_id: "P105",
        produto_nome: "Headphone JBL",
        categoria: "Eletrônicos",
        quantidade: 1,
        preco_unitario: 299.99,
        desconto: 30.00,
        valor_total: 269.99,
        metodo_pagamento: "Cartão de Crédito"
      }
    ],
    analysis_suggestions: [
      "Análise de vendas por região geográfica",
      "Segmentação de clientes por idade e comportamento",
      "Produtos mais rentáveis por categoria",
      "Padrões sazonais de vendas",
      "Eficácia de métodos de pagamento",
      "Análise de descontos e margem de lucro"
    ],
    business_insights: [
      "Eletrônicos representam 60% das vendas",
      "Clientes da região Sudeste têm ticket médio maior",
      "PIX está crescendo como método de pagamento",
      "Descontos acima de 10% impactam significativamente a margem"
    ]
  },

  pacientes_hospital: {
    name: "Dados Hospitalares - Emergência",
    description: "Registro de atendimentos em pronto-socorro com informações médicas e demográficas",
    category: "Saúde",
    rows: 5000,
    columns: 18,
    size: "1.8 MB",
    format: "Excel",
    features: ["Análise epidemiológica", "Tempo de atendimento", "Diagnósticos frequentes", "Recursos hospitalares"],
    data: [
      {
        id_atendimento: "A001",
        data_entrada: "2024-01-15 08:30:00",
        data_saida: "2024-01-15 12:45:00",
        paciente_id: "P1001",
        idade: 45,
        sexo: "M",
        estado_civil: "Casado",
        escolaridade: "Superior",
        cidade: "São Paulo",
        classificacao_risco: "Amarelo",
        queixa_principal: "Dor no peito",
        diagnostico: "Angina estável",
        especialidade: "Cardiologia",
        medico_id: "M001",
        tempo_espera_min: 45,
        tempo_atendimento_min: 255,
        procedimentos: "ECG, Exame de sangue",
        medicamentos: "AAS, Atorvastatina",
        alta_tipo: "Ambulatorial"
      },
      {
        id_atendimento: "A002",
        data_entrada: "2024-01-15 09:15:00",
        data_saida: "2024-01-15 10:30:00",
        paciente_id: "P1002",
        idade: 8,
        sexo: "F",
        estado_civil: "Solteiro",
        escolaridade: "Fundamental",
        cidade: "Campinas",
        classificacao_risco: "Verde",
        queixa_principal: "Febre e tosse",
        diagnostico: "Infecção respiratória viral",
        especialidade: "Pediatria",
        medico_id: "M002",
        tempo_espera_min: 30,
        tempo_atendimento_min: 75,
        procedimentos: "Exame físico, Raio-X tórax",
        medicamentos: "Paracetamol, Xarope",
        alta_tipo: "Ambulatorial"
      },
      {
        id_atendimento: "A003",
        data_entrada: "2024-01-15 14:20:00",
        data_saida: "2024-01-16 08:00:00",
        paciente_id: "P1003",
        idade: 72,
        sexo: "F",
        estado_civil: "Viúva",
        escolaridade: "Fundamental",
        cidade: "São Paulo",
        classificacao_risco: "Vermelho",
        queixa_principal: "Falta de ar e edema",
        diagnostico: "Insuficiência cardíaca descompensada",
        especialidade: "Cardiologia",
        medico_id: "M003",
        tempo_espera_min: 10,
        tempo_atendimento_min: 1080,
        procedimentos: "ECG, Ecocardiograma, Internação",
        medicamentos: "Furosemida, Captopril",
        alta_tipo: "Transferência UTI"
      }
    ],
    analysis_suggestions: [
      "Análise de tempos de espera por classificação de risco",
      "Distribuição de diagnósticos por faixa etária",
      "Eficiência por especialidade médica",
      "Padrões de sazonalidade em atendimentos",
      "Correlação entre idade e tempo de internação",
      "Análise de procedimentos mais solicitados"
    ],
    health_insights: [
      "Classificação vermelha tem tempo de espera 75% menor",
      "Pediatria tem maior rotatividade de pacientes",
      "Cardiologia concentra casos mais complexos",
      "Fins de semana aumentam casos de emergência"
    ]
  },

  estudantes_desempenho: {
    name: "Desempenho Acadêmico - Ensino Superior",
    description: "Notas e informações acadêmicas de estudantes universitários",
    category: "Educação",
    rows: 2500,
    columns: 12,
    size: "950 KB",
    format: "CSV",
    features: ["Análise de notas", "Correlações acadêmicas", "Predição de evasão", "Fatores de sucesso"],
    data: [
      {
        id_estudante: "E001",
        nome: "Lucas Ferreira",
        curso: "Engenharia de Software",
        semestre: 6,
        idade: 22,
        sexo: "M",
        trabalha: "Sim",
        horas_estudo_semana: 20,
        nota_matematica: 8.5,
        nota_programacao: 9.2,
        nota_estatistica: 7.8,
        frequencia_percent: 92.5,
        status: "Ativo"
      },
      {
        id_estudante: "E002",
        nome: "Marina Silva",
        curso: "Análise de Dados",
        semestre: 4,
        idade: 20,
        sexo: "F",
        trabalha: "Não",
        horas_estudo_semana: 25,
        nota_matematica: 9.1,
        nota_programacao: 8.8,
        nota_estatistica: 9.5,
        frequencia_percent: 96.8,
        status: "Ativo"
      },
      {
        id_estudante: "E003",
        nome: "Carlos Santos",
        curso: "Administração",
        semestre: 2,
        idade: 19,
        sexo: "M",
        trabalha: "Não",
        horas_estudo_semana: 15,
        nota_matematica: 6.2,
        nota_programacao: 5.8,
        nota_estatistica: 6.5,
        frequencia_percent: 78.3,
        status: "Risco de Evasão"
      }
    ],
    analysis_suggestions: [
      "Correlação entre horas de estudo e desempenho",
      "Impacto do trabalho no rendimento acadêmico",
      "Análise de evasão por curso e semestre",
      "Identificação de alunos em risco",
      "Distribuição de notas por disciplina",
      "Fatores preditivos de sucesso acadêmico"
    ],
    education_insights: [
      "Estudantes que trabalham têm 15% menos tempo de estudo",
      "Frequência acima de 85% correlaciona com melhores notas",
      "Cursos técnicos têm menor taxa de evasão",
      "Matemática é a disciplina com maior variação de notas"
    ]
  },

  sensores_iot: {
    name: "Sensores IoT - Smart City",
    description: "Dados de sensores urbanos coletando informações ambientais e de tráfego",
    category: "IoT/Tecnologia",
    rows: 50000,
    columns: 10,
    size: "15.2 MB",
    format: "JSON",
    features: ["Séries temporais", "Anomalias ambientais", "Padrões urbanos", "Predição climática"],
    data: [
      {
        sensor_id: "S001",
        timestamp: "2024-01-15T08:00:00Z",
        localizacao: "Av. Paulista, 1000",
        latitude: -23.5611,
        longitude: -46.6563,
        temperatura: 23.5,
        umidade: 65.2,
        qualidade_ar: 85,
        ruido_db: 72.3,
        trafego_veiculos: 450
      },
      {
        sensor_id: "S001",
        timestamp: "2024-01-15T09:00:00Z",
        localizacao: "Av. Paulista, 1000",
        latitude: -23.5611,
        longitude: -46.6563,
        temperatura: 25.1,
        umidade: 62.8,
        qualidade_ar: 78,
        ruido_db: 75.1,
        trafego_veiculos: 680
      },
      {
        sensor_id: "S002",
        timestamp: "2024-01-15T08:00:00Z",
        localizacao: "Parque Ibirapuera",
        latitude: -23.5873,
        longitude: -46.6574,
        temperatura: 22.8,
        umidade: 72.5,
        qualidade_ar: 92,
        ruido_db: 58.2,
        trafego_veiculos: 120
      }
    ],
    analysis_suggestions: [
      "Correlação entre tráfego e qualidade do ar",
      "Padrões de temperatura ao longo do dia",
      "Identificação de pontos críticos de poluição",
      "Análise de ruído urbano por região",
      "Predição de condições climáticas",
      "Otimização de semáforos baseada em tráfego"
    ],
    iot_insights: [
      "Qualidade do ar diminui 20% em horários de pico",
      "Parques têm temperatura 3°C menor que avenidas",
      "Ruído correlaciona diretamente com tráfego",
      "Umidade varia inversamente com temperatura"
    ]
  },

  financas_pessoais: {
    name: "Finanças Pessoais - Controle de Gastos",
    description: "Dados de gastos e receitas pessoais para análise financeira",
    category: "Finanças",
    rows: 1200,
    columns: 8,
    size: "380 KB",
    format: "Excel",
    features: ["Fluxo de caixa", "Categorização de gastos", "Orçamento", "Metas financeiras"],
    data: [
      {
        data: "2024-01-15",
        tipo: "Despesa",
        categoria: "Alimentação",
        subcategoria: "Restaurante",
        descricao: "Almoço no trabalho",
        valor: -35.50,
        forma_pagamento: "Cartão de Débito",
        conta: "Conta Corrente"
      },
      {
        data: "2024-01-15",
        tipo: "Receita",
        categoria: "Salário",
        subcategoria: "Salário Principal",
        descricao: "Salário Janeiro 2024",
        valor: 5500.00,
        forma_pagamento: "Transferência",
        conta: "Conta Corrente"
      },
      {
        data: "2024-01-16",
        tipo: "Despesa",
        categoria: "Transporte",
        subcategoria: "Combustível",
        descricao: "Gasolina posto Shell",
        valor: -180.00,
        forma_pagamento: "PIX",
        conta: "Conta Corrente"
      }
    ],
    analysis_suggestions: [
      "Análise de gastos por categoria",
      "Tendências de consumo mensal",
      "Comparação receita vs despesas",
      "Identificação de gastos supérfluos",
      "Planejamento de orçamento",
      "Metas de economia por categoria"
    ],
    finance_insights: [
      "Alimentação representa 25% dos gastos",
      "Fins de semana têm 40% mais gastos",
      "PIX é o método de pagamento preferido",
      "Janeiro tem maiores gastos com cartão"
    ]
  }
};

export const dataTypes = {
  numeric: {
    name: "Numérico",
    description: "Valores quantitativos (inteiros ou decimais)",
    examples: ["Idade", "Preço", "Temperatura", "Quantidade"],
    validations: ["Range válido", "Valores negativos permitidos", "Precisão decimal"],
    preprocessing: ["Normalização", "Padronização", "Tratamento de outliers"],
    visualizations: ["Histograma", "Box Plot", "Scatter Plot", "Linha"]
  },
  categorical: {
    name: "Categórico",
    description: "Valores qualitativos com categorias definidas",
    examples: ["Gênero", "Estado Civil", "Categoria do Produto", "Status"],
    validations: ["Categorias válidas", "Consistência de nomenclatura"],
    preprocessing: ["One-Hot Encoding", "Label Encoding", "Agrupamento de categorias raras"],
    visualizations: ["Bar Chart", "Pie Chart", "Count Plot", "Heatmap"]
  },
  datetime: {
    name: "Data/Hora",
    description: "Valores temporais com data e/ou hora",
    examples: ["Data de Nascimento", "Timestamp", "Data da Compra", "Horário de Atendimento"],
    validations: ["Formato de data", "Range temporal", "Consistência de timezone"],
    preprocessing: ["Extração de componentes", "Cálculo de intervalos", "Agrupamento temporal"],
    visualizations: ["Time Series", "Calendar Heatmap", "Seasonal Plot", "Trend Analysis"]
  },
  text: {
    name: "Texto",
    description: "Dados textuais livres ou estruturados",
    examples: ["Descrição", "Comentários", "Nome", "Endereço"],
    validations: ["Comprimento do texto", "Caracteres especiais", "Encoding"],
    preprocessing: ["Limpeza", "Normalização", "Tokenização", "Vetorização"],
    visualizations: ["Word Cloud", "Text Length Distribution", "Sentiment Analysis", "N-grams"]
  },
  boolean: {
    name: "Booleano",
    description: "Valores binários (Verdadeiro/Falso)",
    examples: ["Ativo/Inativo", "Sim/Não", "Aprovado/Reprovado", "Cliente Premium"],
    validations: ["Valores válidos", "Codificação consistente"],
    preprocessing: ["Conversão para 0/1", "Tratamento de valores nulos"],
    visualizations: ["Bar Chart", "Pie Chart", "Stacked Bar", "Cross-tabulation"]
  },
  geospatial: {
    name: "Geoespacial",
    description: "Dados de localização geográfica",
    examples: ["Latitude/Longitude", "CEP", "Endereço", "Código IBGE"],
    validations: ["Coordenadas válidas", "Consistência geográfica"],
    preprocessing: ["Geocodificação", "Cálculo de distâncias", "Agregação espacial"],
    visualizations: ["Map Plot", "Choropleth", "Heat Map", "Cluster Map"]
  }
};

export default { sampleDatasets, dataTypes };
