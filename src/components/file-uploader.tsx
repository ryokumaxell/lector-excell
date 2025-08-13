"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Upload, FileText, CheckCircle, AlertCircle, Brain, Sparkles } from "lucide-react"
import * as XLSX from "xlsx"
import Papa from "papaparse"

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

interface FileUploaderProps {
  onDataProcessed: (data: FileData) => void
}

export function FileUploader({ onDataProcessed }: FileUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [fileName, setFileName] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [selectedProvider, setSelectedProvider] = useState<string>("zai")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentData, setCurrentData] = useState<any[][]>([])

  const identifyNames = (data: any[][]): string[] => {
    const names: string[] = []
    
    // Simple name identification logic
    data.forEach(row => {
      row.forEach(cell => {
        if (typeof cell === 'string') {
          // Check if it looks like a name (capitalized words, 2-3 words)
          const words = cell.trim().split(/\s+/)
          if (words.length >= 2 && words.length <= 3 && 
              words.every(word => /^[A-Z][a-z]+$/.test(word))) {
            names.push(cell.trim())
          }
        }
      })
    })
    
    return [...new Set(names)].slice(0, 10) // Limit to first 10 unique names
  }

  const identifyDates = (data: any[][]): string[] => {
    const dates: string[] = []
    const dateRegex = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/
    
    data.forEach(row => {
      row.forEach(cell => {
        if (typeof cell === 'string' && dateRegex.test(cell)) {
          dates.push(cell.trim())
        }
      })
    })
    
    return [...new Set(dates)].slice(0, 10) // Limit to first 10 unique dates
  }

  const identifyTimes = (data: any[][]): string[] => {
    const times: string[] = []
    const timeRegex = /\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?/i
    
    data.forEach(row => {
      row.forEach(cell => {
        if (typeof cell === 'string' && timeRegex.test(cell)) {
          times.push(cell.trim())
        }
      })
    })
    
    return [...new Set(times)].slice(0, 10) // Limit to first 10 unique times
  }

  const processFile = async (file: File) => {
    setIsProcessing(true)
    setProgress(0)
    setStatus("processing")
    setFileName(file.name)
    setError("")

    try {
      setProgress(20)
      
      let data: any[][] = []
      
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        // Process Excel file
        const buffer = await file.arrayBuffer()
        const workbook = XLSX.read(buffer, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      } else if (file.name.endsWith('.csv')) {
        // Process CSV file
        const text = await file.text()
        const result = Papa.parse(text, { header: false })
        data = result.data as any[][]
      } else {
        throw new Error("Formato de archivo no soportado. Por favor use XLSX o CSV.")
      }

      setProgress(60)

      // Identify names, dates, and times
      const names = identifyNames(data)
      const dates = identifyDates(data)
      const times = identifyTimes(data)

      setProgress(90)

      // Create processed data structure
      const processedData: FileData = {
        names,
        dates,
        times,
        rawData: data
      }

      setCurrentData(data)
      setProgress(100)
      setStatus("success")
      onDataProcessed(processedData)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el archivo")
      setStatus("error")
    } finally {
      setIsProcessing(false)
    }
  }

  const analyzeWithAI = async () => {
    if (currentData.length === 0) {
      setError("No hay datos para analizar. Por favor, carga un archivo primero.")
      return
    }

    setIsAnalyzing(true)
    setError("")

    try {
      // Get API config from localStorage
      const savedConfig = localStorage.getItem('apiConfig')
      if (!savedConfig) {
        throw new Error("No hay configuración de API guardada. Por favor, configura las APIs primero.")
      }

      const config = JSON.parse(savedConfig)
      const providerConfig = config[selectedProvider]

      if (!providerConfig.enabled || !providerConfig.apiKey) {
        throw new Error(`La API de ${selectedProvider} no está configurada correctamente.`)
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: currentData,
          provider: selectedProvider,
          apiKey: providerConfig.apiKey,
          model: providerConfig.model,
          baseUrl: providerConfig.baseUrl
        })
      })

      if (!response.ok) {
        throw new Error('Error en el análisis de IA')
      }

      const analysisResult = await response.json()

      // Update the processed data with AI analysis
      const enhancedData: FileData = {
        names: identifyNames(currentData),
        dates: identifyDates(currentData),
        times: identifyTimes(currentData),
        rawData: currentData,
        aiAnalysis: {
          insights: analysisResult.insights || [],
          summary: analysisResult.summary || '',
          provider: selectedProvider
        }
      }

      onDataProcessed(enhancedData)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el análisis de IA")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      processFile(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    multiple: false
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-lg">Suelta el archivo aquí...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-medium">
              Arrastra y suelta un archivo aquí, o haz clic para seleccionar
            </p>
            <p className="text-sm text-muted-foreground">
              Formatos soportados: XLSX, XLS, CSV
            </p>
          </div>
        )}
      </div>

      {isProcessing && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Procesando: {fileName}</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground">
                Analizando datos e identificando nombres, fechas y horas...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "success" && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Archivo procesado exitosamente: {fileName}. Ve a la pestaña "Datos Procesados" para ver los resultados.
          </AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {status === "success" && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Análisis con IA</h3>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="provider">Proveedor:</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zai">Z.AI</SelectItem>
                      <SelectItem value="gemini">Google Gemini</SelectItem>
                      <SelectItem value="deepseek">DeepSeek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={analyzeWithAI}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Analizar con IA
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Usa inteligencia artificial para obtener insights más precisos sobre los datos.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}