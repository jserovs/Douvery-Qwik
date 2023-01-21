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
export const ContainerViewsIMGDetails = component$(({ props }: any) => {
  useStylesScoped$(styles);

  const img = useStore({ setImage: props.images[0] });

  useTask$(async ({ track }) => {
    track(() => props.images[0]);

    img.setImage = props.images[0];
  });

  return (
    <div class="container-view-product">
      <div class="vert-left">
        <div class="preview_img-vert">
          {props.images.map((image: any, i: any) => (
            <div
              class={
                img.setImage == image ? 'img_wrap active-prev-view' : 'img_wrap'
              }
              key={i}
            >
              <button
                onClick$={() => {
                  return (img.setImage = image);
                }}
              >
                <img
                  src={image}
                  onMouseOver$={() => (img.setImage = image)}
                  onMouseOut$={() => (img.setImage = image)}
                  alt={props.slug}
                />
              </button>
            </div>
          ))}
        </div>

        <size-w class="size-w-10" />
        <div class="img-vertical-mobiles-prev">
          <img src={img.setImage} alt={props.slug} />
        </div>
        <div class="container-img-product">
          <img src={img.setImage} alt="" />
        </div>
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
      </div>
    </div>
  );
});
