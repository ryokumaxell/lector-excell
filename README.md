# Lector de Archivos Excel/CSV con Análisis de IA

Un proyecto avanzado para leer archivos XLSX y CSV que identifica automáticamente nombres, fechas y horas en columnas y filas, con integración de múltiples APIs de inteligencia artificial para análisis avanzado.

## Características

### 📁 Procesamiento de Archivos
- **Soporte para XLSX y CSV**: Carga y procesamiento de archivos Excel y CSV
- **Drag & Drop**: Interfaz intuitiva para arrastrar y soltar archivos
- **Identificación Automática**: Detección inteligente de nombres, fechas y horas
- **Vista Previa**: Visualización de datos antes del procesamiento

### 📊 Visualización de Datos
- **Tablas Organizadas**: Muestra datos en formato tabular claro
- **Columnas Identificadas**: Separación automática de nombres, fechas y horas
- **Navegación Fácil**: Scroll y paginación para grandes conjuntos de datos
- **Exportación**: Posibilidad de exportar datos procesados

### 🤖 Integración con IA
- **Múltiples APIs**: Soporte para Z.AI, Google Gemini y DeepSeek
- **Análisis Avanzado**: Procesamiento inteligente de datos
- **Configuración Flexible**: Interfaz para gestionar APIs y claves
- **Procesamiento por Lotes**: Análisis de múltiples filas/columnas

### 🎨 Interfaz de Usuario
- **Diseño Moderno**: Construido con Tailwind CSS y shadcn/ui
- **Responsive**: Funciona en desktop y móviles
- **Pestañas Organizadas**: Navegación intuitiva entre secciones
- **Gestión de Estado**: Persistencia de datos entre sesiones

## Tecnologías Utilizadas

- **Frontend**: Next.js 15, TypeScript, React
- **Estilos**: Tailwind CSS, shadcn/ui
- **Procesamiento de Archivos**: XLSX.js, PapaParse
- **Gestión de Estado**: Zustand
- **IA**: Z.AI SDK, Google Gemini API, DeepSeek API
- **Base de Datos**: Prisma ORM con SQLite

## Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/ryokumaxell/lector-excell.git
cd lector-excell
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

4. **Configurar APIs de IA**
Edita el archivo `.env.local` con tus claves de API:
```env
ZAI_API_KEY=tu_clave_zai
GEMINI_API_KEY=tu_clave_gemini
DEEPSEEK_API_KEY=tu_clave_deepseek
```

5. **Iniciar la base de datos**
```bash
npm run db:push
```

6. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

## Uso

### 1. Cargar Archivos
- Arrastra y suelta archivos XLSX o CSV en la zona designada
- O haz clic para seleccionar archivos manualmente
- El sistema procesará automáticamente el archivo

### 2. Visualizar Datos
- En la pestaña "Datos Procesados" verás los datos organizados
- Las columnas se identifican automáticamente como:
  - Nombres
  - Fechas
  - Horas
  - Otros datos

### 3. Configurar IA
- Ve a la pestaña "Configuración IA"
- Añade tus claves de API para los servicios que deseas usar
- Selecciona qué API usar para el análisis

### 4. Analizar con IA
- Una vez configuradas las APIs, puedes enviar datos para análisis
- El sistema procesará la información y mostrará resultados

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx              # Página principal
│   └── layout.tsx            # Layout de la aplicación
├── components/
│   ├── ui/                   # Componentes shadcn/ui
│   ├── file-uploader.tsx     # Componente de carga de archivos
│   ├── data-table.tsx        # Componente de tabla de datos
│   └── api-config.tsx        # Componente de configuración de APIs
├── store/
│   └── app-store.ts          # Store global Zustand
├── lib/
│   ├── db.ts                 # Configuración de base de datos
│   └── utils.ts              # Utilidades varias
└── types/
    └── index.ts              # Definiciones de TypeScript
```

## APIs de IA Soportadas

### Z.AI
- Análisis de texto avanzado
- Procesamiento de lenguaje natural
- Generación de insights

### Google Gemini
- Análisis de datos estructurados
- Reconocimiento de patrones
- Clasificación automática

### DeepSeek
- Procesamiento de grandes volúmenes de datos
- Análisis predictivo
- Extracción de entidades

## Contribuir

1. Fork del repositorio
2. Crear una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Hacer commit de los cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Autor

Creado por ryokumaxell

## Soporte

Si tienes problemas o sugerencias, por favor abre un issue en el repositorio.