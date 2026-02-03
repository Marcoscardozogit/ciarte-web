const fs = require('fs');
const path = require('path');

const talleresDir = path.join(__dirname, 'src/content/talleres');
const docentesDir = path.join(__dirname, 'src/content/docentes');

if (!fs.existsSync(docentesDir)) {
    fs.mkdirSync(docentesDir, { recursive: true });
}

const files = fs.readdirSync(talleresDir);
const teachers = new Map();

function slugify(text) {
    return text.toString().toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

console.log("Iniciando migración de docentes...");

files.forEach(file => {
    if (!file.endsWith('.md')) return;
    const filePath = path.join(talleresDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse frontmatter manually to be safe
    const frontmatterRegex = /---\r?\n([\s\S]*?)\r?\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        console.log(`Skipping ${file} - no frontmatter found`);
        return;
    }

    const frontmatter = match[1];

    // Extract fields using regex
    const nameMatch = frontmatter.match(/^docente_nombre:\s*(.*)$/m);
    const bioMatch = frontmatter.match(/^docente_bio:\s*(.*)$/m);
    const fotoMatch = frontmatter.match(/^docente_foto:\s*(.*)$/m);

    if (nameMatch) {
        let name = nameMatch[1].trim().replace(/^["'](.*)["']$/, '$1');
        // Clean up quotes if regex caught them inside

        let bio = bioMatch ? bioMatch[1].trim().replace(/^["'](.*)["']$/, '$1') : "";
        let foto = fotoMatch ? fotoMatch[1].trim().replace(/^["'](.*)["']$/, '$1') : "";

        const slug = slugify(name);

        console.log(`Found teacher: ${name} (${slug}) in ${file}`);

        if (!teachers.has(slug)) {
            teachers.set(slug, { name, bio, foto });
        }

        // Add logic to avoid duplicate/empty entries for "Staff CIArte" if vary slightly

        // Update workshop file
        if (!frontmatter.includes(`docente: ${slug}`)) {
            // Insert 'docente: slug' before docente_nombre
            // We use replace to inject it
            const newFrontmatter = frontmatter.replace(
                /^docente_nombre:/m,
                `docente: ${slug}\ndocente_nombre:`
            );

            const newContent = content.replace(match[1], newFrontmatter);
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated ${file} with reference to ${slug}`);
        }
    }
});

// Create teacher files
teachers.forEach((data, slug) => {
    const teacherPath = path.join(docentesDir, `${slug}.md`);
    if (!fs.existsSync(teacherPath)) {
        const fileContent = `---
nombre: "${data.name}"
bio: "${data.bio}"
foto: ${data.foto ? `"${data.foto}"` : '""'}
---`;
        fs.writeFileSync(teacherPath, fileContent);
        console.log(`Created teacher file: ${slug}.md`);
    } else {
        console.log(`Teacher file ${slug}.md already exists, skipping.`);
    }
});

console.log("Migración completada.");
