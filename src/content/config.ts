/**
 * Configuración de Content Collections para CIArte
 * Colecciones: talleres, comunidad
 */
import { z, defineCollection } from 'astro:content';

// Colección de Talleres
const talleresCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        titulo: z.string(),
        descripcion: z.string(),
        imagen: image().optional(),
        flyer: image().optional(),
        horarios: z.string(),
        edadNivel: z.string(),
        docente: z.string().optional(),
        activo: z.boolean().default(true),
        orden: z.number().default(0),
        galeria: z.array(image()).optional(),
        bioDocente: z.string().optional(),
        fotoDocente: image().optional(),
    }),
});

// Colección de Actividades Comunitarias
const comunidadCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        titulo: z.string(),
        descripcion: z.string(),
        imagen: image().optional(),
        fecha: z.date().optional(),
        tipo: z.enum(['encuentro', 'jornada', 'mural', 'celebracion', 'obra', 'integrantes', 'trayectoria', 'otro']).default('otro'),
        destacado: z.boolean().default(false),
        orden: z.number().default(99),
        galeria: z.array(image()).optional(),
    }),
});

export const collections = {
    talleres: talleresCollection,
    comunidad: comunidadCollection,
};
