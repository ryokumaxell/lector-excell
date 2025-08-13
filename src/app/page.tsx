"use client"

import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploader } from "@/components/file-uploader"
import { DataTable } from "@/components/data-table"
import { ApiConfig } from "@/components/api-config"
import { Upload, Database, Settings } from "lucide-react"
import { useAppStore } from "@/store/app-store"

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

export default function Home() {
  const { fileData, loadConfigFromStorage } = useAppStore()

  useEffect(() => {
    // Load API config from localStorage on mount
    loadConfigFromStorage()
  }, [loadConfigFromStorage])

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Lector Avanzado de Archivos</h1>
        <p className="text-muted-foreground text-center">
          Analiza archivos XLSX y CSV con inteligencia artificial
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Cargar Archivo
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Datos Procesados
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuración IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cargar Archivo XLSX o CSV</CardTitle>
              <CardDescription>
                Selecciona un archivo para analizar. El sistema identificará automáticamente nombres, fechas y horas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos Procesados</CardTitle>
              <CardDescription>
                Vista tabular de los datos analizados con nombres, fechas y horas identificados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fileData ? (
                <DataTable />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No hay datos cargados. Por favor, carga un archivo primero.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de APIs de IA</CardTitle>
              <CardDescription>
                Configura las claves de API para los servicios de inteligencia artificial.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiConfig />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}