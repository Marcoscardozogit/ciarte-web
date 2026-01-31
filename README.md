# CIArte – El Laberinto Website

Sitio web institucional para el espacio cultural comunitario **CIArte – El Laberinto** en General Güemes, Salta.

## Stack Tecnológico

- **Astro**: Framework principal (SSG)
- **React**: Componentes interactivos
- **Decap CMS**: Gestión de contenido
- **Netlify**: Plataforma de despliegue sugerida

## Desarrollo Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir `http://localhost:4321` en el navegador.

## Gestión de Contenido (CMS)

Para probar el CMS localmente:

1. Ejecutar el proxy de Decap CMS:
   ```bash
   npx decap-server
   ```

2. Ir a `http://localhost:4321/admin`

## Estructura del Proyecto

- `src/components`: Componentes UI reutilizables
- `src/content`: Colecciones de contenido (talleres, comunidad)
- `src/layouts`: Plantillas de página
- `src/pages`: Rutas y páginas
- `src/styles`: Tokens de diseño y estilos globales
- `public/admin`: Configuración del CMS

## Deploy

El proyecto está configurado para desplegarse fácilmente en Netlify.

1. Conectar repositorio a Netlify.
2. Habilitar **Netlify Identity** en la configuración del sitio.
3. Habilitar **Git Gateway** en Settings > Identity > Services.
