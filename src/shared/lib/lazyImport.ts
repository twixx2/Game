import { lazy } from 'react';

export function lazyLoad<T extends Record<string, any>>(factory: () => Promise<T>, name: keyof T) { return lazy(() => factory().then(module => ({ default: module[name] }))); }