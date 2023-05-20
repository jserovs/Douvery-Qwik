import { component$, useSignal, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { Card_Category_1 } from '../cards/category/category-1/category-1';
import styles from './carousel-all.css?inline';
import { Card_Category_Flex_1 } from '../cards/category/category-flex/category-flex-1';
import { SearchBooksDouvery } from '../navBar/components/search/searchBook/searchBook';
import { CardLastViewedProducts1 } from '../cards/lastViewProduct/last-viewed-products-1/last-viewed-products-1';

import ContainerVert from '../container-vert/container-vert';

export default component$(() => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });

  const isDown = useSignal(false);
  const startX = useSignal(0);
  const scrollLeft = useSignal(0);


  return (
    <>
      <div class="container-all">
        <div class="contai-fle" onMouseDown$={(e: any) => {
          if (!e.currentTarget) return;
          isDown.value = true;
          startX.value = e.pageX - e.currentTarget.offsetLeft;
          scrollLeft.value = e.currentTarget.scrollLeft;
        }}
          onMouseLeave$={() => { isDown.value = false }}
          onMouseUp$={() => {
            isDown.value = false;
          }
          }
          onMouseMove$={(e: any) => {
            if (!isDown || !e.currentTarget) return;
            e.preventDefault();
            const x = e.pageX - e.currentTarget.offsetLeft;
            const walk = (x - startX.value) * 3; //scroll-fast/douvery/image/upload/v1666979039/Mochila fila rojo buen material/AnyConv.com__Diseño_sin_título_behrk5.webp
            e.currentTarget.scrollLeft = scrollLeft.value - walk;
          }
          } >
          <div class="container-card-categories">
            <Card_Category_1
              name="Electrónica Y Accesorios"
              image="https://res.cloudinary.com/douvery/image/upload/v1684404810/kxy8mjnojlq1lh6sarh2.webp"
            />
          </div>

          <div class="container-card-books">
            <Card_Category_Flex_1
              name="Books & Audible"
              images={[
                'https://res.cloudinary.com/douvery/image/upload/v1671729503/Ask%20Again%20Yes/bb0uqik8etmjo46rzj3h.webp',

                'https://res.cloudinary.com/douvery/image/upload/v1671730656/What%20Every%20Body%20Is%20Saying/awvwhrvka2uioiljmecq.webp',
                'https://res.cloudinary.com/douvery/image/upload/v1671729811/Call%20an%20/wodasrjiw4g3mcs4qwvr.webp',
              ]}
            />
            <div class="card-searh-books">
              <SearchBooksDouvery is={isOpen} />
            </div>
          </div>
          <div class="container-card-last-view">
            <CardLastViewedProducts1 />

          </div>

          <div class="container-accouts">
            <div class="caja">
              <h2>Das la impresión de que estás preparado para disfrutar.</h2>
              <button class="button-signin">Iniciar Session</button>
            </div>
          </div>
          <ContainerVert />
        </div>
      </div>
    </>
  );
});
