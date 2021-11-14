import esbuild from "esbuild";
import path from "path";
import { esbuildServerPlugin } from "esbuild-server-plugin";
import glob from "tiny-glob";

const __dirname = path.resolve();

if (process.env.NODE_ENV === "development")
  await esbuild.build({
    entryPoints: ["./examples/example1/main.ts"],

    outdir: path.resolve(__dirname, "./examples/dist"),
    bundle: true,
    minify: true,

    watch: true,
    plugins: [
      esbuildServerPlugin({
        //   Custom data
        title: "document",

        // You must specify the template
        // The template is parsed using ejs: https://ejs.co/#install
        template: path.resolve(__dirname, "index.html"),

        // Parameters in the template
        js: ["/main.js"],
        css: ["/index.css"],

        // Start the development server
        server: {
          port: parseInt(process.env.PORT ?? "3000"),
          before() {},
          after() {},
        },
      }),
    ],
  });
else
  await esbuild.build({
    entryPoints: [...(await glob("./src/**/*.ts"))],
    bundle: false,
    minify: true,

    // Outdir must be set
    outdir: path.resolve(__dirname, "dist"),

    plugins: [],
  });
