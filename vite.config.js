import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // নেটওয়ার্ক এক্সপোজ করার জন্য
    port: 5173, // ডিফল্ট পোর্ট
    open: true, // ডেভ সার্ভার শুরু হলে ব্রাউজার খুলবে
  },
});
