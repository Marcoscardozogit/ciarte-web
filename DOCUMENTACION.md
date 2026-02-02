# Manual de Proyecto: CIArte – El Laberinto

Este documento sirve como guía Técnica y de contexto para cualquier desarrollador que desee continuar con el mantenimiento o expansión del sitio web de **CIArte – El Laberinto**.

## 1. Contexto del Proyecto
CIArte (Centro de Integración y Arte) es un espacio comunitario en General Güemes, Salta, que funciona en el Centro de Jubilados Los Olivos. El sitio web es una plataforma institucional para difundir talleres, actividades comunitarias y la trayectoria del grupo de teatro **El Laberinto**.

## 2. Stack Tecnológico
- **Framework**: [Astro 5.x](https://astro.build/) (Modo Estático).
- **UI**: [React 18](https://reactjs.org/) (para componentes interactivos específicos).
- **Estilos**: Vanilla CSS con un sistema de **Design Tokens** (ubicados en `src/styles/tokens.css`).
- **Contenido**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) (Markdown + JSON).
- **Despliegue**: Netlify (configurado mediante `netlify.toml`).

## 3. Estructura de Carpetas Clave
- `src/assets/images/`: Repositorio central de imágenes optimizadas.
- `src/components/`: Componentes UI reutilizables (Astro y React).
- `src/content/`:
  - `talleres/`: Archivos `.md` que definen los talleres ofrecidos.
  - `comunidad/`: Archivos `.md` para actividades, integrantes y trayectoria.
  - `settings/`: Configuración global (redes sociales, WhatsApp, etc.) en `site.json`.
- `src/layouts/`: Plantilla base (`Layout.astro`) que maneja el SEO y la estructura HTML.
- `src/pages/`: Rutas del sitio. Incluye generación dinámica de páginas para talleres y comunidad.
- `unused_assets/`: Carpeta externa (fuera de `src`) donde se resguardan imágenes no utilizadas actualmente.

## 4. Gestión de Contenido (Cómo ampliar el sitio)
El sitio utiliza **Content Collections**, lo que significa que el contenido está separado del código.

### Agregar un nuevo Taller:
1. Crea un archivo `.md` en `src/content/talleres/`.
2. Sigue el esquema definido en `src/content/config.ts`:
   ```markdown
   ---
   titulo: "Nombre del Taller"
   descripcion: "Breve resumen"
   imagen: "../../assets/images/foto.png"
   horarios: "Lunes 18hs"
   docente: "Nombre"
   activo: true
   orden: 1
   ---
   Contenido detallado aquí...
   ```

### Actualizar Información de Contacto:
Edita `src/content/settings/site.json` para cambiar el número de WhatsApp, emails o links a redes sociales. Esto actualizará automáticamente el Header, Footer y la sección de Contacto.

## 5. Sistema de Diseño (Estética Teatral)
El "Vibe" del sitio es dramático y elegante, inspirado en un teatro.
- **Paleta**: Rojos profundos (`--color-primary`), dorados de luz escénica (`--color-accent`) y fondos oscuros de escenario (`--color-neutral-900`).
- **Tokens**: Siempre utiliza variables de CSS de `tokens.css` (ej: `var(--color-accent-400)`) en lugar de colores hardcodeados.

## 6. Mantenimiento de Imágenes
Para mantener el rendimiento:
- Las imágenes deben estar en `src/assets/images/`.
- Astro las optimiza automáticamente al usar el componente `<Image />`.
- Existe un script técnico y manuales para mover imágenes no utilizadas a `unused_assets/` fuera de la carpeta `src` para no sobrecargar el build.

## 7. SEO y Metadatos
El SEO se gestiona globalmente en `src/layouts/Layout.astro`.
- La imagen por defecto para redes sociales es `src/assets/images/perfiluno.jpg`.
- Utiliza JSON-LD (Schema.org) para que Google reconozca el sitio como una "PerformingArtsGroup" y "LocalBusiness".

## 8. Comandos Útiles
- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:4321`.
- `npm run build`: Genera el sitio estático en la carpeta `dist/`.
- `npm run preview`: Previsualiza el build localmente.

---
*Manual generado por Antigravity para el equipo de CIArte – El Laberinto.*
