import { component$ , useStylesScoped$ } from "@builder.io/qwik";
import  styles from "./carBanner.css?inline";

export default component$(()=> {
     useStylesScoped$(styles);
    return (
        <>
        <div class="cl-banner-pr">
    <img src="https://res.cloudinary.com/douvery/image/upload/v1684406805/dd30bir4sqyimtnkbhb1.webp" alt="" />
        </div>
        </>
    )});