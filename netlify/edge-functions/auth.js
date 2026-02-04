export default async (request, context) => {
    // Credenciales configuradas por el usuario
    const USER = "ciarteadmin";
    const PASS = "ciarte123";

    const auth = request.headers.get("Authorization");
    const expectedAuth = "Basic " + btoa(`${USER}:${PASS}`);

    if (auth !== expectedAuth) {
        return new Response("Acceso Restringido - CIArte", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="CIArte - Ingresa credenciales"',
            },
        });
    }

    // Si es correcto, continuar a la página
    return await context.next();
};

// Configurar para que afecte a todas las rutas
export const config = {
    path: "/*",
    excludedPath: ["/.netlify/*", "/favicon.ico"]
};
