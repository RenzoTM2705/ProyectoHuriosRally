// src/custom.d.ts
// Archivo de declaraciones para que TypeScript no marque errores
// al importar archivos estáticos (css, imágenes) y paquetes CSS de swiper.
//
// Colócalo en src/ para que TypeScript lo cargue automáticamente.
// Reinicia el servidor de Vite / reinicia TS server si es necesario.

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.gif";
declare module "*.svg";

declare module "swiper";
declare module "swiper/react";
declare module "swiper/css";
declare module "swiper/css/free-mode";
declare module "swiper/css/effect-fade";
