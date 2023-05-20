import { component$ , useStylesScoped$ } from "@builder.io/qwik";
import  styles from "./carBanner.css?inline";

export default component$(()=> {
     useStylesScoped$(styles);
    return (
        <>
        <div class="cl-banner-pr">
    <img width={1800} height={280} src="https://res.cloudinary.com/douvery/image/upload/v1684406805/dd30bir4sqyimtnkbhb1.webp" alt="BANNER ESCUCHA-TU-MUSICA-COMO-NUNCA-ANTES DOUVERY DOUVEYR-IMG PRODUCTS" />
        </div>
        </>
    )});