import { $, component$ , useSignal, useStylesScoped$, } from "@builder.io/qwik";
import  styles from "./carBanner.css?inline";
import { DouveryLeft3 } from "../icons/arrow-left-3";
import { DouveryRight3 } from "../icons/arrow-right-3";

export const BannerCarouselHome = component$(()=> {
     useStylesScoped$(styles);
     const currentIndex = useSignal(0);
     const images = [
         { 
    imageUrl: 'https://res.cloudinary.com/douvery/image/upload/v1685304113/eqqjyggjmogzbfny0rgu.webp', 
    linkUrl: 'url-a-la-que-redirigir-1', 
    alt: 'Hogar dulce hogar CAREGORIA DOouvery img-douvery ' 
  },
  { 
    imageUrl: 'https://res.cloudinary.com/douvery/image/upload/v1684406805/dd30bir4sqyimtnkbhb1.webp', 
    linkUrl: 'url-a-la-que-redirigir-1', 
    alt: 'Texto alternativo para la imagen 1' 
  },
 
  // agrega todos los objetos de imagen, URL y texto alternativo que necesites
];

  const nextImage = $(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  
  });
  const prevImage = $(() => {
   currentIndex.value = (currentIndex.value - 1) % images.length;
    });
   
 

    return (
        <>
    
         <div class='carousel'>
              <button   class="carousel__btn carousel__btn--prev" onClick$={()=>  {prevImage}}>  <DouveryLeft3 size="30" /></button>
    
      <div class='carousel__image-container'>
       <img
       width={1800}
       height={280}
          class="carousel__image"
          src={images[currentIndex.value].imageUrl}
          alt="Imagen del carrusel"
        />   <button class='carousel__button carousel__button--link' ></button>
      </div>
       <button  class="carousel__btn carousel__btn--next" onClick$={nextImage}>  <DouveryRight3 size="30" /></button>
  
    </div>
        </>
    )});