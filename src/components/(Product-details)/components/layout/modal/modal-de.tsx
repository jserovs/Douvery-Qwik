import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './modal-d.css?inline';
export const ModalD = component$(({ props, img, isOpen }: any) => {
  useStylesScoped$(sryles);

  return (
    <>
      {isOpen.setIsOpen && (
        <>
          {' '}
          <div
            class="shad-modal"
            onClick$={() => (isOpen.setIsOpen = false)}
          ></div>
          <div class={`modal ${!isOpen && 'modal-close'}`}>
            <img class="img-viws-modal-lllg" src={img.setImage} alt="" />
            <div class="modal-prev-img">
              {props.images.map((image: any, i: any) => (
                <div
                  class={
                    img.setImage == image
                      ? 'modal-img_wrap active-prev-view'
                      : 'modal-img_wrap'
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
          </div>
        </>
      )}
    </>
  );
});
