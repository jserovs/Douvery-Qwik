import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/three-horizontal-views.css?inline';
import { ModalD } from '../modal/modal-de';
export const ThreeHorizontalViewProductIMG = component$(
  ({ props, img, isOpen }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="crtr--prd-prodct">
        <div class="crtr-img-tree">
          {props.images.map((image: any, i: any) => (
            <div
              class={
                img.setImage == image
                  ? 'ig-grid-img active-prev-view'
                  : 'ig-grid-img'
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
