/**
 * Configuración de Content Collections para CIArte
 * Colecciones: talleres, comunidad, agenda
 */
import { z, defineCollection, reference } from 'astro:content';

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
        categorias: z.array(z.enum(['Música', 'Danza', 'Teatro', 'Artes Visuales', 'Bienestar'])).default(['Música']),
        // Info Docente (Opcionales para compatibilidad durante migración)
        docente_nombre: z.string().optional(),
        docente_bio: z.string().optional(),
        docente_foto: image().optional().or(z.literal("").transform(() => undefined)),

        // Contacto Específico
        whatsapp_custom: z.string().optional(),

        // Relación con Docentes
        docente: reference('docentes').optional(),

        activo: z.boolean().default(true),
        orden: z.number().default(0),
        galeria: z.array(z.object({
            image: image(),
            alt: z.string().optional()
        })).optional().or(z.array(image()).optional()), // Support both object list (CMS) and simple image list (Legacy)
    }),
});

// Colección de Docentes
const docentesCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        nombre: z.string(),
        bio: z.string(),
        foto: image().optional(),
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
        lugar: z.string().default('CIArte - El Laberinto'),
        precio: z.string().optional(),
        estado: z.enum(['Próximamente', 'En Curso', 'Finalizado', 'Suspendido']).default('Próximamente'),
        whatsapp_ventas: z.string().optional(),
        texto_boton: z.string().default('Comprar Entrada Ya'),
    }),
});

// Colección Home (Contenido estático)
const homeCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        hero_image: image().optional(),
        about: z.object({
            title: z.string(),
            lead: z.string(),
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
    docentes: docentesCollection,
    comunidad: comunidadCollection,
    agenda: agendaCollection,
    home: homeCollection,
    settings: settingsCollection,
};
