/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.json' {
    const value: any;
    export default value;
}

declare module 'crypto-js';