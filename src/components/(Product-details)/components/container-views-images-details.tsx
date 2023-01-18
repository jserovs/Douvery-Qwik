import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-views-images-details.css?inline';
import ContainerVariantionsDetails from './container-variantions-details';
import { ContainerHeaderNameBrandProduct } from './container-header-name-brands-product';
export const ContainerViewsIMGDetails = component$(({ props }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="container-view-product">
      <div class="vert-left">
        <div class="preview_img-vert">
          {props.images.map((image: any, i: any) => (
            <div
              class={i === 0 ? 'img_wrap active-prev-view' : 'img_wrap'}
              key={i}
            >
              <img src={image} alt={props.slug} />
            </div>
          ))}
        </div>
        <size-w class="size-w-10" />
        <div class="img-vertical-mobiles-prev">
          <img src={props.images[0]} alt={props.slug} />
        </div>

        <div class="container-img-product">
          <img src={props.images[0]} alt="" />
        </div>
      </div>
      <div class="right">
        <ContainerHeaderNameBrandProduct props={props} />
        {props.variations === undefined ? (
          ''
        ) : (
          <ContainerVariantionsDetails props={props} />
        )}
      </div>
    </div>
  );
});
