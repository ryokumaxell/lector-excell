import { create } from 'zustand'

interface FileData {
  names: string[]
  dates: string[]
  times: string[]
  rawData: any[][]
  aiAnalysis?: {
    insights: string[]
    summary: string
    provider: string
  }
}

interface ApiConfig {
  gemini: {
    enabled: boolean
    apiKey: string
    model: string
    baseUrl?: string
  }
  deepseek: {
    enabled: boolean
    apiKey: string
    model: string
    baseUrl?: string
  }
  zai: {
    enabled: boolean
    apiKey: string
    model: string
    baseUrl?: string
  }
}

interface AppState {
  // File data
  fileData: FileData | null
  currentRawData: any[][]
  isProcessing: boolean
  isAnalyzing: boolean
  progress: number
  status: 'idle' | 'processing' | 'success' | 'error'
  fileName: string
  error: string
  selectedProvider: string
  
  // API config
  apiConfig: ApiConfig
  
  // Actions
  setFileData: (data: FileData | null) => void
  setCurrentRawData: (data: any[][]) => void
  setProcessing: (isProcessing: boolean) => void
  setAnalyzing: (isAnalyzing: boolean) => void
  setProgress: (progress: number) => void
  setStatus: (status: 'idle' | 'processing' | 'success' | 'error') => void
  setFileName: (fileName: string) => void
  setError: (error: string) => void
  setSelectedProvider: (provider: string) => void
  setApiConfig: (config: ApiConfig) => void
  updateApiConfig: (provider: keyof ApiConfig, field: string, value: any) => void
  resetFileData: () => void
  loadConfigFromStorage: () => void
  saveConfigToStorage: () => void
}

const defaultApiConfig: ApiConfig = {
  gemini: {
    enabled: false,
    apiKey: '',
    model: 'gemini-pro',
    baseUrl: ''
  },
  deepseek: {
    enabled: false,
    apiKey: '',
    model: 'deepseek-chat',
    baseUrl: ''
  },
  zai: {
    enabled: false,
    apiKey: '',
    model: 'glm-4.5',
    baseUrl: ''
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  fileData: null,
  currentRawData: [],
  isProcessing: false,
  isAnalyzing: false,
  progress: 0,
  status: 'idle',
  fileName: '',
  error: '',
  selectedProvider: 'zai',
  apiConfig: defaultApiConfig,

  // Actions
  setFileData: (data) => set({ fileData: data }),
  
  setCurrentRawData: (data) => set({ currentRawData: data }),
  
  setProcessing: (isProcessing) => set({ isProcessing }),
  
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  
  setProgress: (progress) => set({ progress }),
  
  setStatus: (status) => set({ status }),
  
  setFileName: (fileName) => set({ fileName }),
  
  setError: (error) => set({ error }),
  
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  
  setApiConfig: (config) => set({ apiConfig: config }),
  
  updateApiConfig: (provider, field, value) => set((state) => ({
    apiConfig: {
      ...state.apiConfig,
      [provider]: {
        ...state.apiConfig[provider],
        [field]: value
      }
    }
  })),
  
  resetFileData: () => set({
    fileData: null,
    currentRawData: [],
    isProcessing: false,
    isAnalyzing: false,
    progress: 0,
    status: 'idle',
    fileName: '',
    error: ''
  }),
  
  loadConfigFromStorage: () => {
    try {
      const saved = localStorage.getItem('apiConfig')
      if (saved) {
        const config = JSON.parse(saved)
        set({ apiConfig: { ...defaultApiConfig, ...config } })
      }
    } catch (error) {
      console.error('Error loading config from storage:', error)
    }
  },
  
  saveConfigToStorage: () => {
    try {
      const { apiConfig } = get()
      localStorage.setItem('apiConfig', JSON.stringify(apiConfig))
    } catch (error) {
      console.error('Error saving config to storage:', error)
    }
  }
}))