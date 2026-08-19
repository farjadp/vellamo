import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Lives in apps/marketing/ as part of the monorepo, but builds to the repo
// root's dist/ so Vercel's default Vite output-directory detection keeps
// working without needing a Root Directory project-setting change.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
});
