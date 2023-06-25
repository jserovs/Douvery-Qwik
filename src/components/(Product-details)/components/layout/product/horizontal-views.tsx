import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/horizontal-views.css?inline';
import { ModalD } from '../modal/modal-de';
export const HorizontalViewProductIMG = component$(
  ({ props, img, isOpen }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="crtr-img-hr-prs">
        <div class="preview_img-hrt-lft">
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
                  width={60}
                  height={60}
                  src={image}
                  onMouseOver$={() => (img.setImage = image)}
                  onMouseOut$={() => (img.setImage = image)}
                  alt={props.slug}
                />
              </button>
            </div>
          ))}
        </div>
        <ModalD
          props={props}
          isOpen={isOpen}
          img={img}
          setIsOpen={isOpen.setIsOpen}
        />

        <div class="crtr-dirjfs">
          <div class="container-img-product">
            <img
              width={400}
              height={400}
              onClick$={() => (isOpen.setIsOpen = true)}
              src={img.setImage}
              alt={props.slug}
              class="img-product-llg"
              title="Aumentar tamaño de imagen"
            />
          </div>
        </div>
      </div>
    );
  }
);
