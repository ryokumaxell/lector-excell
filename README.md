# Lector Avanzado de Archivos XLSX/CSV con IA

## 📋 Descripción
Aplicación web avanzada para analizar archivos XLSX y CSV utilizando inteligencia artificial. Identifica automáticamente nombres, fechas y horas, y proporciona insights mediante APIs de IA como Z.AI, Google Gemini y DeepSeek.

## 🚀 Características
- Carga de archivos XLSX y CSV con arrastrar y soltar
- Identificación automática de nombres, fechas y horas
- Análisis de datos con múltiples APIs de IA
- Interfaz responsive con pestañas organizadas
- Persistencia de datos entre navegación
- Configuración centralizada de APIs

## 🛠️ Tecnologías Utilizadas
- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS, shadcn/ui
- **Estado**: Zustand
- **Procesamiento**: XLSX, PapaParse
- **IA**: Z.AI SDK, integración con múltiples APIs

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd nombre-del-proyecto
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (opcional)**
   ```bash
   cp .env.example .env.local
   ```
   Edita el archivo `.env.local` con tus claves de API si es necesario.

4. **Ejecutar la aplicación**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # API endpoint para análisis de IA
│   │   └── health/route.ts     # Health check
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página principal
│   └── globals.css             # Estilos globales
├── components/
│   ├── ui/                     # Componentes shadcn/ui
│   ├── api-config.tsx          # Configuración de APIs
│   ├── data-table.tsx          # Tabla de datos
│   └── file-uploader.tsx       # Cargador de archivos
├── store/
│   └── app-store.ts            # Zustand store
└── hooks/
    └── use-toast.ts            # Hook para notificaciones
```

## 🔧 Configuración de APIs

La aplicación soporta múltiples proveedores de IA:

### Z.AI
1. Ve a la pestaña "Configuración IA"
2. Selecciona "Z.AI"
3. Ingresa tu API key de Z.AI
4. Selecciona el modelo (GLM-4.5, GLM-4-32B, etc.)
5. Prueba la conexión

### Google Gemini
1. Ve a la pestaña "Configuración IA"
2. Selecciona "Google Gemini"
3. Ingresa tu API key de Gemini
4. Selecciona el modelo deseado
5. Prueba la conexión

### DeepSeek
1. Ve a la pestaña "Configuración IA"
2. Selecciona "DeepSeek"
3. Ingresa tu API key de DeepSeek
4. Selecciona el modelo deseado
5. Prueba la conexión

## 📖 Uso de la Aplicación

### 1. Cargar Archivos
- Arrastra y suelta un archivo XLSX o CSV en el área designada
- O haz clic para seleccionar un archivo manualmente
- El sistema procesará automáticamente el archivo

### 2. Ver Datos Procesados
- Navega a la pestaña "Datos Procesados"
- Visualiza los nombres, fechas y horas identificados
- Revisa los datos crudos del archivo original

### 3. Análisis con IA
- Después de cargar un archivo, usa el botón "Analizar con IA"
- Selecciona el proveedor de IA que deseas usar
- Espera el análisis y revisa los insights generados

### 4. Configurar APIs
- Ve a la pestaña "Configuración IA"
- Configura tus claves de API para diferentes proveedores
- Prueba las conexiones y guarda la configuración

## 🔄 Flujo de Trabajo

1. **Cargar archivo** → Procesamiento automático
2. **Revisar datos identificados** → Ver nombres, fechas, horas
3. **Analizar con IA** → Obtener insights avanzados
4. **Configurar APIs** → Personalizar proveedores de IA

## 🐛 Solución de Problemas

### Problemas Comunes

**El archivo no se procesa**
- Verifica que el formato sea XLSX, XLS o CSV
- Asegúrate de que el archivo no esté corrupto
- Revisa la consola del navegador para errores

**El análisis de IA falla**
- Verifica tu conexión a internet
- Confirma que tu API key sea válida
- Asegúrate de tener créditos en el servicio de IA

**Los datos no persisten entre pestañas**
- La aplicación usa Zustand para gestión de estado
- Los datos deberían mantenerse automáticamente
- Recarga la página si persisten los problemas

## 📝 Notas de Desarrollo

### Arquitectura
- **Gestión de estado**: Zustand para estado global
- **Componentes**: React con TypeScript
- **Estilos**: Tailwind CSS con componentes shadcn/ui
- **APIs**: Endpoints en Next.js API routes

### Variables de Entorno
```env
# Opcional: Configuración por defecto para APIs
NEXT_PUBLIC_DEFAULT_AI_PROVIDER=zai
NEXT_PUBLIC_ZAI_BASE_URL=https://open.bigmodel.cn/api/paas/v4
```

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Zustand](https://zustand.docs.pmnd.rs/) - Gestión de estado
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Z.AI](https://open.bigmodel.cn/) - API de IA

## 📞 Soporte

Si tienes problemas o preguntas, por favor abre un issue en el repositorio.