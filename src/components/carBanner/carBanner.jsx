import {
  $,
  component$,
  useOnWindow,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './carBanner.css?inline';
import { DouveryLeft3 } from '../icons/arrow-left-3';
import { DouveryRight3 } from '../icons/arrow-right-3';

export const BannerCarouselHome = component$(() => {
  useStylesScoped$(styles);
  const currentIndex = useStore({ SetCurrentIndex: 0 });
  const store = useStore({ windowWidth: 0 });

  useOnWindow(
    'load',
    $(() => {
      store.windowWidth = window.innerWidth;
    })
  );

  const contents = [
    {
      type: 'image',
      desktopImageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1685304113/eqqjyggjmogzbfny0rgu.webp',
      mobileImageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1685361847/xuqgkyzgkzhtwe1cvzqt.webp',
      linkUrl: 'url-a-la-que-redirigir-1',
      alt: 'Hogar dulce hogar CAREGORIA DOouvery img-douvery ',
    },
    {
      type: 'image',
      desktopImageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1684406805/dd30bir4sqyimtnkbhb1.webp',
      mobileImageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1685361844/g5cmkukrjubj4wxpnnld.webp',
      linkUrl: 'url-a-la-que-redirigir-1',
      alt: 'Texto alternativo para la imagen 1',
    },
    {
      type: 'video',
      desktopVideoUrl:
        'https://res.cloudinary.com/douvery/video/upload/v1685469644/lj4zepeo4a3geadmqucw.mp4',
      mobileVideoUrl:
        'https://res.cloudinary.com/douvery/video/upload/v1685469644/lj4zepeo4a3geadmqucw.mp4',
      linkUrl: 'url-a-la-que-redirigir-1',
      alt: 'Texto alternativo para el video 1',
    },
    // agrega todos los objetos de imagen, URL y texto alternativo que necesites
  ];

  const nextContent = $(() => {
    if (currentIndex.SetCurrentIndex < contents.length - 1) {
      currentIndex.SetCurrentIndex = currentIndex.SetCurrentIndex + 1;
    }
  });

  const prevContent = $(() => {
    if (currentIndex.SetCurrentIndex > 0) {
      currentIndex.SetCurrentIndex = currentIndex.SetCurrentIndex - 1;
    }
  });

  const isMobile = store.windowWidth <= 800;
  isMobile;
  return (
    <>
      <div class="carousel">
        <div class="content">
          <button
            class="carousel__btn carousel__btn--prev"
            onClick$={prevContent}
            disabled={currentIndex.SetCurrentIndex === 0} // Desactivar si es el primer índice
          >
            {' '}
            <DouveryLeft3 size="30" />
          </button>

          <div class="carousel__image-container">
            {contents[currentIndex.SetCurrentIndex].type === 'image' ? (
              <img
                width={1800}
                height={280}
                class="carousel__image"
                src={contents[currentIndex.SetCurrentIndex].desktopImageUrl}
                alt="Imagen del carrusel"
              />
            ) : (
              <video
                width={1800}
                height={280}
                class="carousel__video"
                src={contents[currentIndex.SetCurrentIndex].desktopVideoUrl}
                autoPlay
              >
                Tu navegador no soporta el elemento de video.
              </video>
            )}
            <button class="carousel__button carousel__button--link"></button>
          </div>

          <button
            class="carousel__btn carousel__btn--next"
            onClick$={nextContent}
            disabled={currentIndex.SetCurrentIndex === contents.length - 1} // Desactivar si es el último índice
          >
            {' '}
            <DouveryRight3 size="30" />
          </button>
        </div>
      </div>
    </>
  );
});
