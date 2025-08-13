"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, Clock, FileSpreadsheet, Brain, Lightbulb } from "lucide-react"
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

export function DataTable() {
  const { fileData } = useAppStore()
  const [activeTab, setActiveTab] = useState("identified")

  if (!fileData) {
    return null
  }

  const maxRows = 100 // Limit display to first 100 rows for performance

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nombres Identificados</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fileData.names.length}</div>
            <p className="text-xs text-muted-foreground">
              {fileData.names.length > 0 ? `Primeros: ${fileData.names.slice(0, 3).join(", ")}` : "No se encontraron nombres"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fechas Identificadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fileData.dates.length}</div>
            <p className="text-xs text-muted-foreground">
              {fileData.dates.length > 0 ? `Primeras: ${fileData.dates.slice(0, 3).join(", ")}` : "No se encontraron fechas"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Identificadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fileData.times.length}</div>
            <p className="text-xs text-muted-foreground">
              {fileData.times.length > 0 ? `Primeras: ${fileData.times.slice(0, 3).join(", ")}` : "No se encontraron horas"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${fileData.aiAnalysis ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <TabsTrigger value="identified">Datos Identificados</TabsTrigger>
          <TabsTrigger value="raw">Datos Crudos</TabsTrigger>
          {fileData.aiAnalysis && (
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Análisis IA
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="identified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Resumen de Datos Identificados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Valores Identificados</TableHead>
                      <TableHead>Cantidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Nombres
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {fileData.names.map((name, index) => (
                            <Badge key={index} variant="secondary">
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{fileData.names.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Fechas
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {fileData.dates.map((date, index) => (
                            <Badge key={index} variant="outline">
                              {date}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{fileData.dates.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Horas
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {fileData.times.map((time, index) => (
                            <Badge key={index} variant="default">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{fileData.times.length}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="raw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Datos Crudos del Archivo
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Mostrando primeros {Math.min(fileData.rawData.length, maxRows)} filas de {fileData.rawData.length} totales
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {fileData.rawData[0]?.map((_, index) => (
                        <TableHead key={index}>Columna {index + 1}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fileData.rawData.slice(0, maxRows).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>
                            {cell !== null && cell !== undefined ? String(cell) : ""}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              {fileData.rawData.length > maxRows && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  ... y {fileData.rawData.length - maxRows} filas más
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {fileData.aiAnalysis && (
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Análisis con Inteligencia Artificial
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Análisis realizado con {fileData.aiAnalysis.provider}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Resumen General
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{fileData.aiAnalysis.summary}</p>
                  </div>
                </div>

                {/* Insights */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Insights y Patrones
                  </h4>
                  <div className="space-y-2">
                    {fileData.aiAnalysis.insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Data Display */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Datos Mejorados por IA</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2 text-green-700">Nombres Confirmados</h5>
                      <div className="flex flex-wrap gap-1">
                        {fileData.names.map((name, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2 text-blue-700">Fechas Validadas</h5>
                      <div className="flex flex-wrap gap-1">
                        {fileData.dates.map((date, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {date}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2 text-purple-700">Horas Detectadas</h5>
                      <div className="flex flex-wrap gap-1">
                        {fileData.times.map((time, index) => (
                          <Badge key={index} variant="default" className="text-xs">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}