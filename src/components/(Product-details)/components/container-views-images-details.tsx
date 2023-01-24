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

import { VarticalViewProductIMG } from './layout/product/vartical-views';

export const ContainerViewsIMGDetails = component$(({ props }: any) => {
  useStylesScoped$(styles);

  const img = useStore({ setImage: props.images[0] });

  useTask$(async ({ track }) => {
    track(() => props.images[0]);

    img.setImage = props.images[0];
  });
  const isOpen = useStore({ setIsOpen: false });
  return (
    <div class="container-view-product">
      <div class="vert-left">
        <VarticalViewProductIMG img={img} isOpen={isOpen} props={props} />
      </div>

      <div class="right">
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
          <ContainerButtonDetails props={props} />
        </div>

        <ContainerDescriptionShort props={props} />
      </div>
    </div>
  );
});
