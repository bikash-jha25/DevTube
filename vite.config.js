import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/suggestions": {
        target: "http://suggestqueries.google.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/suggestions/, "/complete/search"),
      },
    },
  },
});

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });

