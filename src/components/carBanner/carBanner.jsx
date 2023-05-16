import { component$ , useStylesScoped$ } from "@builder.io/qwik";
import  styles from "./carBanner.css?inline";

export default component$(()=> {
     useStylesScoped$(styles);
    return (
        <>
        <div class="cl-banner-pr">
    <img src="https://res.cloudinary.com/douvery/image/upload/v1684235006/bbl6wvi58i16ncc9nhfo.png" alt="" />
        </div>
        </>
    )});