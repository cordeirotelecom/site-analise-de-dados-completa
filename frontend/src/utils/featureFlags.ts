/**
 * Configurações de Feature Flags para Deploy Gradual
 * Permite ativar funcionalidades progressivamente sem quebrar o sistema
 */

export interface FeatureFlags {
  // Funcionalidades básicas
  basicUpload: boolean;
  simpleAnalysis: boolean;
  
  // Funcionalidades avançadas
  advancedAnalysis: boolean;
  santaCatarinaData: boolean;
  multiFileUpload: boolean;
  
  // Funcionalidades experimentais
  aiPredictions: boolean;
  realTimeData: boolean;
  advancedVisualizations: boolean;
  
  // Sistema e infraestrutura
  backendIntegration: boolean;
  errorReporting: boolean;
  performanceMonitoring: boolean;
}

// Configuração padrão para produção (conservadora)
export const PRODUCTION_FLAGS: FeatureFlags = {
  // Básicas - Sempre ativas
  basicUpload: true,
  simpleAnalysis: true,
  
  // Avançadas - Ativar gradualmente
  advancedAnalysis: false, // Ativar após confirmar que básico funciona
  santaCatarinaData: false, // Ativar quando backend estiver estável
  multiFileUpload: false, // Ativar após testes
  
  // Experimentais - Manter desabilitadas inicialmente
  aiPredictions: false,
  realTimeData: false,
  advancedVisualizations: false,
  
  // Sistema - Ativar para monitoramento
  backendIntegration: true,
  errorReporting: true,
  performanceMonitoring: true,
};

// Configuração para desenvolvimento (todas ativas)
export const DEVELOPMENT_FLAGS: FeatureFlags = {
  basicUpload: true,
  simpleAnalysis: true,
  advancedAnalysis: true,
  santaCatarinaData: true,
  multiFileUpload: true,
  aiPredictions: true,
  realTimeData: true,
  advancedVisualizations: true,
  backendIntegration: true,
  errorReporting: true,
  performanceMonitoring: true,
};

// Configuração para testes (features específicas)
export const TESTING_FLAGS: FeatureFlags = {
  basicUpload: true,
  simpleAnalysis: true,
  advancedAnalysis: true,
  santaCatarinaData: false,
  multiFileUpload: true,
  aiPredictions: false,
  realTimeData: false,
  advancedVisualizations: true,
  backendIntegration: false, // Usar mock data
  errorReporting: false,
  performanceMonitoring: true,
};

/**
 * Obtém as feature flags baseado no ambiente
 */
export function getFeatureFlags(): FeatureFlags {
  const isProduction = window.location.hostname.includes('netlify.app') || 
                      window.location.hostname.includes('vercel.app') ||
                      window.location.hostname === 'datasciencepro.com';
  
  const isDevelopment = window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1';
  
  if (isProduction) {
    return PRODUCTION_FLAGS;
  } else if (isDevelopment) {
    return DEVELOPMENT_FLAGS;
  } else {
    return TESTING_FLAGS;
  }
}

/**
 * Hook para usar feature flags em componentes React
 */
export function useFeatureFlags(): FeatureFlags {
  return getFeatureFlags();
}

/**
 * Utilitário para verificar se uma feature está ativa
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[feature];
}

/**
 * Plano de ativação gradual de features
 */
export const ROLLOUT_PLAN = {
  // Fase 1: Deploy básico (CONCLUÍDO)
  phase1: {
    features: ['basicUpload', 'simpleAnalysis'],
    description: 'Interface básica funcionando',
    status: 'completed',
    date: '2025-09-06'
  },
  
  // Fase 2: Análises avançadas (PRÓXIMO)
  phase2: {
    features: ['advancedAnalysis', 'multiFileUpload'],
    description: 'Análises estatísticas completas',
    status: 'planned',
    estimatedDate: '2025-09-07'
  },
  
  // Fase 3: Integração com backend (DEPOIS)
  phase3: {
    features: ['backendIntegration', 'santaCatarinaData'],
    description: 'API completa e dados específicos de SC',
    status: 'planned',
    estimatedDate: '2025-09-08'
  },
  
  // Fase 4: Features avançadas (FUTURO)
  phase4: {
    features: ['advancedVisualizations', 'realTimeData'],
    description: 'Visualizações avançadas e dados em tempo real',
    status: 'planned',
    estimatedDate: '2025-09-10'
  },
  
  // Fase 5: IA e Machine Learning (FUTURO)
  phase5: {
    features: ['aiPredictions'],
    description: 'Predições com IA e ML',
    status: 'planned',
    estimatedDate: '2025-09-15'
  }
};

export default {
  getFeatureFlags,
  useFeatureFlags,
  isFeatureEnabled,
  PRODUCTION_FLAGS,
  DEVELOPMENT_FLAGS,
  TESTING_FLAGS,
  ROLLOUT_PLAN
};
