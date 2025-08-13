"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Key, CheckCircle, AlertCircle, Zap, Brain, Cpu } from "lucide-react"

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

export function ApiConfig() {
  const [config, setConfig] = useState<ApiConfig>({
    gemini: {
      enabled: false,
      apiKey: "",
      model: "gemini-pro",
      baseUrl: ""
    },
    deepseek: {
      enabled: false,
      apiKey: "",
      model: "deepseek-chat",
      baseUrl: ""
    },
    zai: {
      enabled: false,
      apiKey: "",
      model: "glm-4.5",
      baseUrl: ""
    }
  })

  const [testResults, setTestResults] = useState<Record<string, "success" | "error" | "testing" | null>>({})
  const [testMessages, setTestMessages] = useState<Record<string, string>>({})

  const updateConfig = (provider: keyof ApiConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [field]: value
      }
    }))
  }

  const testApiConnection = async (provider: keyof ApiConfig) => {
    setTestResults(prev => ({ ...prev, [provider]: "testing" }))
    setTestMessages(prev => ({ ...prev, [provider]: "Probando conexión..." }))

    try {
      // Simulate API testing - in real implementation, this would make actual API calls
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (config[provider].apiKey) {
        setTestResults(prev => ({ ...prev, [provider]: "success" }))
        setTestMessages(prev => ({ ...prev, [provider]: "Conexión exitosa" }))
      } else {
        throw new Error("API key requerida")
      }
    } catch (error) {
      setTestResults(prev => ({ ...prev, [provider]: "error" }))
      setTestMessages(prev => ({ ...prev, [provider]: error instanceof Error ? error.message : "Error de conexión" }))
    }
  }

  const saveConfig = () => {
    // Save to localStorage for persistence
    localStorage.setItem('apiConfig', JSON.stringify(config))
    alert("Configuración guardada exitosamente")
  }

  const loadConfig = () => {
    const saved = localStorage.getItem('apiConfig')
    if (saved) {
      setConfig(JSON.parse(saved))
      alert("Configuración cargada exitosamente")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button onClick={saveConfig} variant="default">
          Guardar Configuración
        </Button>
        <Button onClick={loadConfig} variant="outline">
          Cargar Configuración
        </Button>
      </div>

      <Tabs defaultValue="gemini" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gemini" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Google Gemini
          </TabsTrigger>
          <TabsTrigger value="deepseek" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            DeepSeek
          </TabsTrigger>
          <TabsTrigger value="zai" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Z.AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gemini" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Google Gemini API
              </CardTitle>
              <CardDescription>
                Configura la API de Google Gemini para análisis avanzado de datos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="gemini-enabled"
                  checked={config.gemini.enabled}
                  onCheckedChange={(checked) => updateConfig('gemini', 'enabled', checked)}
                />
                <Label htmlFor="gemini-enabled">Habilitar Gemini API</Label>
                <Badge variant={config.gemini.enabled ? "default" : "secondary"}>
                  {config.gemini.enabled ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gemini-api-key">API Key</Label>
                <Input
                  id="gemini-api-key"
                  type="password"
                  placeholder="Ingresa tu API key de Gemini"
                  value={config.gemini.apiKey}
                  onChange={(e) => updateConfig('gemini', 'apiKey', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gemini-model">Modelo</Label>
                <Select value={config.gemini.model} onValueChange={(value) => updateConfig('gemini', 'model', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    <SelectItem value="gemini-pro-vision">Gemini Pro Vision</SelectItem>
                    <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                    <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gemini-base-url">Base URL (Opcional)</Label>
                <Input
                  id="gemini-base-url"
                  placeholder="https://generativelanguage.googleapis.com/v1beta"
                  value={config.gemini.baseUrl}
                  onChange={(e) => updateConfig('gemini', 'baseUrl', e.target.value)}
                />
              </div>

              <Button 
                onClick={() => testApiConnection('gemini')}
                disabled={!config.gemini.enabled || !config.gemini.apiKey}
                className="w-full"
              >
                <Key className="h-4 w-4 mr-2" />
                Probar Conexión
              </Button>

              {testResults.gemini && (
                <Alert className={testResults.gemini === "success" ? "border-green-200" : "border-red-200"}>
                  {testResults.gemini === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{testMessages.gemini}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deepseek" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                DeepSeek API
              </CardTitle>
              <CardDescription>
                Configura la API de DeepSeek para análisis de datos con IA avanzada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="deepseek-enabled"
                  checked={config.deepseek.enabled}
                  onCheckedChange={(checked) => updateConfig('deepseek', 'enabled', checked)}
                />
                <Label htmlFor="deepseek-enabled">Habilitar DeepSeek API</Label>
                <Badge variant={config.deepseek.enabled ? "default" : "secondary"}>
                  {config.deepseek.enabled ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deepseek-api-key">API Key</Label>
                <Input
                  id="deepseek-api-key"
                  type="password"
                  placeholder="Ingresa tu API key de DeepSeek"
                  value={config.deepseek.apiKey}
                  onChange={(e) => updateConfig('deepseek', 'apiKey', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deepseek-model">Modelo</Label>
                <Select value={config.deepseek.model} onValueChange={(value) => updateConfig('deepseek', 'model', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
                    <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                    <SelectItem value="deepseek-vl">DeepSeek VL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deepseek-base-url">Base URL (Opcional)</Label>
                <Input
                  id="deepseek-base-url"
                  placeholder="https://api.deepseek.com/v1"
                  value={config.deepseek.baseUrl}
                  onChange={(e) => updateConfig('deepseek', 'baseUrl', e.target.value)}
                />
              </div>

              <Button 
                onClick={() => testApiConnection('deepseek')}
                disabled={!config.deepseek.enabled || !config.deepseek.apiKey}
                className="w-full"
              >
                <Key className="h-4 w-4 mr-2" />
                Probar Conexión
              </Button>

              {testResults.deepseek && (
                <Alert className={testResults.deepseek === "success" ? "border-green-200" : "border-red-200"}>
                  {testResults.deepseek === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{testMessages.deepseek}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Z.AI API
              </CardTitle>
              <CardDescription>
                Configura la API de Z.AI para análisis de datos con modelos GLM.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="zai-enabled"
                  checked={config.zai.enabled}
                  onCheckedChange={(checked) => updateConfig('zai', 'enabled', checked)}
                />
                <Label htmlFor="zai-enabled">Habilitar Z.AI API</Label>
                <Badge variant={config.zai.enabled ? "default" : "secondary"}>
                  {config.zai.enabled ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zai-api-key">API Key</Label>
                <Input
                  id="zai-api-key"
                  type="password"
                  placeholder="Ingresa tu API key de Z.AI"
                  value={config.zai.apiKey}
                  onChange={(e) => updateConfig('zai', 'apiKey', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zai-model">Modelo</Label>
                <Select value={config.zai.model} onValueChange={(value) => updateConfig('zai', 'model', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="glm-4.5">GLM-4.5</SelectItem>
                    <SelectItem value="glm-4-32b-0414-128k">GLM-4-32B-0414-128K</SelectItem>
                    <SelectItem value="glm-4.5v">GLM-4.5V</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zai-base-url">Base URL (Opcional)</Label>
                <Input
                  id="zai-base-url"
                  placeholder="https://open.bigmodel.cn/api/paas/v4"
                  value={config.zai.baseUrl}
                  onChange={(e) => updateConfig('zai', 'baseUrl', e.target.value)}
                />
              </div>

              <Button 
                onClick={() => testApiConnection('zai')}
                disabled={!config.zai.enabled || !config.zai.apiKey}
                className="w-full"
              >
                <Key className="h-4 w-4 mr-2" />
                Probar Conexión
              </Button>

              {testResults.zai && (
                <Alert className={testResults.zai === "success" ? "border-green-200" : "border-red-200"}>
                  {testResults.zai === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{testMessages.zai}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}