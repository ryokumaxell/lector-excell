import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

interface AnalysisRequest {
  data: any[][]
  provider: 'gemini' | 'deepseek' | 'zai'
  apiKey: string
  model: string
  baseUrl?: string
}

interface AnalysisResult {
  names: string[]
  dates: string[]
  times: string[]
  insights: string[]
  summary: string
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json()
    const { data, provider, apiKey, model, baseUrl } = body

    if (!data || !provider || !apiKey || !model) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Prepare data for AI analysis
    const dataSample = data.slice(0, 10).map(row => 
      row.map(cell => cell !== null && cell !== undefined ? String(cell) : '')
    )
    
    const dataString = dataSample.map(row => row.join(' | ')).join('\n')

    const prompt = `Analiza los siguientes datos extraídos de un archivo y proporciona:

1. Lista de nombres identificados (solo nombres completos válidos)
2. Lista de fechas identificadas (en formato original)
3. Lista de horas identificadas (en formato original)
4. Insights sobre los datos (patrones, anomalías, tendencias)
5. Un resumen general de los datos

Datos:
${dataString}

Responde en formato JSON con la siguiente estructura:
{
  "names": ["nombre1", "nombre2", ...],
  "dates": ["fecha1", "fecha2", ...],
  "times": ["hora1", "hora2", ...],
  "insights": ["insight1", "insight2", ...],
  "summary": "resumen general"
}`

    let result: AnalysisResult

    if (provider === 'zai') {
      // Use Z.AI SDK
      const zai = await ZAI.create()
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Eres un experto en análisis de datos. Responde siempre en formato JSON válido.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: model
      })

      try {
        const content = completion.choices[0]?.message?.content || ''
        result = JSON.parse(content)
      } catch (parseError) {
        // If JSON parsing fails, create a basic result
        result = {
          names: [],
          dates: [],
          times: [],
          insights: ['No se pudo parsear la respuesta de la IA'],
          summary: completion.choices[0]?.message?.content || 'No se obtuvo respuesta'
        }
      }
    } else {
      // For other providers (Gemini, DeepSeek), we would implement similar logic
      // For now, return a mock result
      result = {
        names: [],
        dates: [],
        times: [],
        insights: [`Análisis con ${provider} no implementado aún`],
        summary: `Integración con ${provider} está en desarrollo`
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}