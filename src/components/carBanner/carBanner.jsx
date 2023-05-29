import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './carBanner.css?inline';
import { DouveryLeft3 } from '../icons/arrow-left-3';
import { DouveryRight3 } from '../icons/arrow-right-3';

export const BannerCarouselHome = component$(() => {
  useStylesScoped$(styles);
  const currentIndex = useSignal(0);
  const store = useStore({ windowWidth: 0 });

  useOnWindow(
    'load',
    $(() => {
      store.windowWidth = window.innerWidth;
    })
  );

  const images = [
    {
      desktopImageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1685304113/eqqjyggjmogzbfny0rgu.webp',
      mobileImageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1685361847/xuqgkyzgkzhtwe1cvzqt.webp',
      linkUrl: 'url-a-la-que-redirigir-1',
      alt: 'Hogar dulce hogar CAREGORIA DOouvery img-douvery ',
    },
    {
      desktopImageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1684406805/dd30bir4sqyimtnkbhb1.webp',
      mobileImageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1685361844/g5cmkukrjubj4wxpnnld.webp',
      linkUrl: 'url-a-la-que-redirigir-1',
      alt: 'Texto alternativo para la imagen 1',
    },

    // agrega todos los objetos de imagen, URL y texto alternativo que necesites
  ];

  const nextImage = $(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  });
  const prevImage = $(() => {
    currentIndex.value = (currentIndex.value - 1) % images.length;
  });

  const isMobile = store.windowWidth <= 800;
  return (
    <>
      <div class="carousel">
        <div class="content">
          <button
            class="carousel__btn carousel__btn--prev"
            onClick$={prevImage}
          >
            {' '}
            <DouveryLeft3 size="30" />
          </button>

          <div class="carousel__image-container">
            <img
              width={1800}
              height={280}
              class="carousel__image"
              src={
                isMobile
                  ? images[currentIndex.value].mobileImageUrl
                  : images[currentIndex.value].desktopImageUrl
              }
              alt="Imagen del carrusel"
            />{' '}
            <button class="carousel__button carousel__button--link"></button>
          </div>
          <button
            class="carousel__btn carousel__btn--next"
            onClick$={nextImage}
          >
            {' '}
            <DouveryRight3 size="30" />
          </button>
        </div>
      </div>
    </>
  );
});
