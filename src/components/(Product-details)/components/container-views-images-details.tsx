import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './css/container-views-images-details.css?inline';
import ContainerVariantionsDetails from './container-variantions-details';
import { ContainerHeaderNameBrandProduct } from './container-header-name-brands-product';
import { ContainerButtonDetails } from './container-button-details';
import { ContainerDescriptionShort } from './container-desc-short';

import { HorizontalViewProductIMG } from './layout/product/horizontal-views';
import { VarticalViewProductIMG } from './layout/product/vartical-views';
import { ThreeHorizontalViewProductIMG } from './layout/product/three-horizontal-views';
import { LibPermVerticalViewProductIMG } from './layout/product/books-perm-vertical-views';



import { ContainerDescriptionGPT } from './crtr-description-gpt';
import { CardDouveryExtend1 } from '~/components/cards/douveryExtend/card-douveryExtend-1/douveryExtend1';
import { ContainerBreadcrumbs } from './sessions/VIEW 1/components/Breadcrumbs/container-breadcrumbs';
import { ContainerSponsoreProductVert1 } from './sessions/VIEW 2/components/container-sponsore-vert';

export const ContainerViewsIMGDetails = component$(({ props }: any) => {
  useStylesScoped$(styles);

  const img = useStore({ setImage: props.images[0] });

  useTask$(async ({ track }) => {
    track(() => props.images[0]);

    img.setImage = props.images[0];
  });
  const isOpen = useStore({ setIsOpen: false });

  function selectComponent() {
    const { productDetails } = props;
    const { styleImg = '' } = productDetails[0] || {};
    switch (styleImg) {
      case 'style3':
        return (
          <ThreeHorizontalViewProductIMG
            img={img}
            isOpen={isOpen}
            props={props}
          />
        );
      case 'style2':
        return (
          <HorizontalViewProductIMG img={img} isOpen={isOpen} props={props} />
        );
      case 'style1':
        return (
          <VarticalViewProductIMG img={img} isOpen={isOpen} props={props} />
        );
      case 'style-books':
        return (
          <LibPermVerticalViewProductIMG
            img={img}
            isOpen={isOpen}
            props={props}
          />
        );
      default:
        return (
          <VarticalViewProductIMG img={img} isOpen={isOpen} props={props} />
        );
    }
  }

  const quantityCart = useStore({ setQuantityCart: '1' });

  return (
    <div class="container-view-product">
      <div class="vert-left">
        {selectComponent()} <ContainerBreadcrumbs product={props} />
      </div>

      <div class="center">
        <div class="crtr-div-ifrms-aetr">
          <size-w class="size-w-10" />
          <ContainerHeaderNameBrandProduct props={props} />
          {props.variations == 0 ? (
            <> </>
          ) : (
            <div class="crt-variations">
              <ContainerVariantionsDetails
                imgS={img}
                imgP={props.images[0]}
                props={props}
              />
            </div>
          )}
          <div class="buttons-mobiles">
            <div class="brt-irft">
              <div class="slect-qty-prt">
                <p>Cantidad : </p>
                <size-w class="size-w-10" />
                <select
                  value={quantityCart.setQuantityCart}
                  onChange$={(event) =>
                    (quantityCart.setQuantityCart = event.target.value)
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <ContainerButtonDetails
              product={props}
              quantity={quantityCart.setQuantityCart}
            />
          </div>

          {props.category == 'Books' ? (
            <>
              <ContainerDescriptionGPT props={props} />{' '}
            </>
          ) : (
            <div class="crtr-desrt">
              {' '}
              <ContainerDescriptionShort props={props} />
            </div>
          )}
        </div>
      </div>

      <div class="vert-right">
        
        <div class="ctr-extend-d">
          {' '}
          <CardDouveryExtend1 />
          <div class="separator-border"/> 
<div class="title-subtitle">
     <p class="ps-sr1">Mejora tus recomendaciones</p>
</div>
 
          <div class="review-product">

            <button
              class={`button-helpful 
              }`}
             
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
                />
              </svg>
              <p> Me gusta</p>
            </button>

            <button
              class={`button-helpful 
              } `}
             
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"
                />
              </svg>

              <p>No me gusta</p>
            </button>
          </div><div class="separator-border"/> 
         <ContainerSponsoreProductVert1 product={props} />
        </div>
      </div>
    </div>
  );
});
