/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],  // Aktifkan dark mode (dari CSS Anda)
    content: [
        "./index.html",
        "./src/App.tsx",  // Spesifik root App
        "./src/main.tsx",  // Entry point
        "./src/components/**/*.{js,ts,jsx,tsx}",  // Jika ada components/ (Shadcn/Figma)
        "./src/pages/**/*.{js,ts,jsx,tsx}",  // Jika ada pages/ (opsional, tambah jika ada)
        "./src/lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Extend dari CSS root variables Anda
            colors: {
                primary: {
                    DEFAULT: "#ffc107",  // Kuning Swaragama
                    foreground: "#1a1a1a",
                },
                background: "#fff",
                foreground: "#1a1a1a",
                card: "#fff",
                cardForeground: "#1a1a1a",
                popover: "#fff",
                popoverForeground: "#1a1a1a",
                secondary: "#f8f9fa",
                secondaryForeground: "#1a1a1a",
                muted: "#f8f9fa",
                mutedForeground: "#495057",
                accent: "#fff8e1",
                accentForeground: "#1a1a1a",
                destructive: "#dc3545",
                destructiveForeground: "#fff",
                border: "#e9ecef",
                input: "transparent",
                ring: "#ffc107",
                // Custom Swaragama
                swaragama: {
                    yellow: "#ffc107",
                    black: "#1a1a1a",
                    white: "#fff",
                    gray: "#495057",
                    light: "#f8f9fa",
                },
            },
            fontFamily: {
                sans: ["ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji"],
                mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas"],
            },
            // Tambah spacing, radius jika perlu (dari CSS)
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [],  // Tambah plugins nanti jika perlu (e.g., tailwindcss-animate)
};