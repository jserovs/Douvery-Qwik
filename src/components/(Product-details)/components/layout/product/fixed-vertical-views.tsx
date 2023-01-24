import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/fixed-vertical-views.css?inline';
import { ModalD } from '../modal/modal-de';
export const FixedVerticalViewProductIMG = component$(
  ({ props, img, isOpen }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="crtr-firx-prd-prodct ">
        <div class="crtr-img-fixr">
          {props.images.map((image: any, i: any) => (
            <div
              class={
                img.setImage == image
                  ? 'ig-firx-img active-prev-view'
                  : 'ig-firx-img'
              }
              key={i}
            >
              <button
                onClick$={() => {
                  return (img.setImage = image);
                }}
              >
                <img
                  onClick$={() => (isOpen.setIsOpen = true)}
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
      </div>
    );
  }
);
