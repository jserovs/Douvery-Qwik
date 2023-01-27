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
import { ContainerInputCartPay } from './container-input-cart-pay';

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
  return (
    <div class="container-view-product">
      <div class="vert-left">{selectComponent()}</div>

      <div class="center">
        <div class="crtr-div-ifrms-aetr">
          <size-w class="size-w-10" />
          <ContainerHeaderNameBrandProduct props={props} />
          {props.variations === undefined ? (
            ''
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
            <div class="div-input-sertts">
              <ContainerInputCartPay quantity={1} />
            </div>
            <ContainerButtonDetails props={props} />
          </div>

          <ContainerDescriptionShort props={props} />
        </div>
      </div>

      <div class="vert-right">
        <div class="vert-arr-prodsrsdt"></div>
      </div>
    </div>
  );
});
