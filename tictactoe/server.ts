import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";  // Import `join` to handle paths

const PORT = 8000;
console.log(`Server running on http://localhost:${PORT}`);

Deno.serve({ port: PORT }, async (req) => {
    const url = new URL(req.url);

    console.log(`Requested path: ${url.pathname}`);

    if (url.pathname === "/") {
        const file = await Deno.readFile(join(Deno.cwd(), "public", "index.html"));
        return new Response(file, {
            status: 200,
            headers: {
                "content-type": "text/html", // Set correct content type for HTML
            },
        });
    }

    if (url.pathname === "/style.css") {
        const file = await Deno.readFile(join(Deno.cwd(), "public", "style.css"));
        return new Response(file, {
            status: 200,
            headers: {
                "content-type": "text/css",  // Serve as CSS
            },
        });
    }

    if (url.pathname === "/script.js") {
        const file = await Deno.readFile(join(Deno.cwd(), "public", "script.js"));
        return new Response(file, {
            status: 200,
            headers: {
            "content-type": "application/javascript",  // Serve as JavaScript
            },
        });
    }

    return serveDir(req, {
    fsRoot: join(Deno.cwd(), "public"),
    urlRoot: "/",
    showDirListing: false,
    enableCors: true,
    });
});