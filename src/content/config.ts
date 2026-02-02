/**
 * Configuración de Content Collections para CIArte
 * Colecciones: talleres, comunidad, agenda
 */
import { z, defineCollection } from 'astro:content';

// Colección de Talleres
const talleresCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        titulo: z.string(),
        descripcion: z.string(),
        imagen: image(), // Horizontal
        flyer: image(), // Vertical
        horarios: z.string(),
        edadNivel: z.string(),

        // Info Docente
        info_docente: z.object({
            nombre: z.string(),
            bio: z.string(),
            foto: image().optional()
        }).optional(),

        // Contacto Específico
        whatsapp_custom: z.string().optional(),

        activo: z.boolean().default(true),
        orden: z.number().default(0),
        galeria: z.array(z.object({
            image: image(),
            alt: z.string().optional()
        })).optional().or(z.array(image()).optional()), // Support both object list (CMS) and simple image list (Legacy)
    }),
});

// Colección de Actividades Comunitarias
const comunidadCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        titulo: z.string(),
        descripcion: z.string(),
        imagen: image().optional(),
        fecha: z.coerce.date().optional(),
        tipo: z.enum(['encuentro', 'jornada', 'mural', 'celebracion', 'obra', 'integrantes', 'trayectoria', 'otro']).default('otro'),
        destacado: z.boolean().default(false),
        orden: z.number().default(99),
        galeria: z.array(z.object({
            image: image(),
            alt: z.string().optional()
        })).optional().or(z.array(image()).optional()),
    }),
});

// Colección de Agenda Cultural
const agendaCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        titulo: z.string(),
        fecha: z.coerce.date(),
        imagen: image(),
        descripcion: z.string(),
        whatsapp_ventas: z.string().optional(),
        texto_boton: z.string().default('Comprar Entrada Ya'),
    }),
});

// Colección Home (Contenido estático)
const homeCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        about: z.object({
            image: image().optional(),
        }),
        home_gallery: z.array(z.object({
            image: image(),
            alt: z.string()
        })),
    }),
});

// Colección Settings (Configuración global)
const settingsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        nombre: z.string(),
        whatsapp: z.string(),
        direccion: z.string(),
        maps_link: z.string().optional(),
        email: z.string(),
        facebook: z.string().optional(),
        facebook2: z.string().optional(),
        instagram: z.string().optional(),
    }),
});

export const collections = {
    talleres: talleresCollection,
    comunidad: comunidadCollection,
    agenda: agendaCollection,
    home: homeCollection,
    settings: settingsCollection,
};
