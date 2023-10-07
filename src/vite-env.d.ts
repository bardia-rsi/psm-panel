/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEBSITE_DOMAIN: string
    readonly VITE_WEBSITE_URL: string
    readonly VITE_DASHBOARD_URL: string
    readonly VITE_API_API_URL: string
    readonly VITE_API_AUTH_URL: string
    readonly VITE_API_MEDIA_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}