import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { Card_Category_1 } from '../cards/category/category-1/category-1';
import styles from './container-catogorie-init.css?inline';
import { Card_Category_Flex_1 } from '../cards/category/category-flex/category-flex-1';
import { SearchBooksDouvery } from '../navBar/components/search/searchBook/searchBook';
import { CardLastViewedProducts1 } from '../cards/lastViewProduct/last-viewed-products-1/last-viewed-products-1';

import ContainerVert from '../container-vert/container-vert';
import { useGetCurrentUser } from '~/routes/layout';

export default component$(({ ref }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  const userAcc = useGetCurrentUser().value;
  return (
    <>
      <div class="container-all">
        <div class="contai-fle">
          <div class="container-card-categories">
            <Card_Category_1
              name="Electrónica Y Accesorios"
              image="https://res.cloudinary.com/douvery/image/upload/v1684675125/eqmaf2xmgiubgonxx24x.webp"
            />
          </div>

          <div class="container-card-books">
            <Card_Category_Flex_1
              name="Books & Audible"
              img1="https://res.cloudinary.com/douvery/image/upload/v1671729503/Ask%20Again%20Yes/bb0uqik8etmjo46rzj3h.webp"
              img2="https://res.cloudinary.com/douvery/image/upload/v1671730656/What%20Every%20Body%20Is%20Saying/awvwhrvka2uioiljmecq.webp"
              img3="https://res.cloudinary.com/douvery/image/upload/v1671729811/Call%20an%20/wodasrjiw4g3mcs4qwvr.webp"
            />
            <div class="card-searh-books">
              <SearchBooksDouvery is={isOpen} />
            </div>
          </div>
          <div class="container-card-last-view">
            <CardLastViewedProducts1 ref={ref} />
          </div>

          <div class="container-accouts">
            <div class="caja">
              {userAcc ? (
                <>
                  <h2>Welcome to Douvery, {userAcc.name}!</h2>
                  <a
                    href={'/a/user/profile/' + userAcc.name}
                    class="button-signin"
                  >
                    Ver mi perfil
                  </a>
                </>
              ) : (
                <>
                  <h2>
                    Das la impresión de que estás preparado para disfrutar.
                  </h2>
                  <a href="/a/login/?rr=/" class="button-signin">
                    Iniciar Sesión
                  </a>
                </>
              )}
            </div>
          </div>
          <div class="container-vert-box">
            {' '}
            <ContainerVert
              title="Ofertas a tiempo limitado"
              image="https://res.cloudinary.com/douvery/image/upload/v1684678322/xize217nmf1lmum2dkyp.webp"
            />
          </div>
        </div>
      </div>
    </>
  );
});
