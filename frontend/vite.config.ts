/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react(), stubNextAssetImport()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        css: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            public: path.resolve(__dirname, 'public'),
        },
    },
})

function stubNextAssetImport() {
    return {
        name: 'stub-next-asset-import',
        transform(_code: string, id: string) {
            if (/(jpg|jpeg|png|webp|gif|svg)$/.test(id)) {
                const imgSrc = path.relative(process.cwd(), id)
                return {
                    code: `export default { src: '${imgSrc}', height: 1, width: 1 }`,
                }
            }
        },
    }
}
