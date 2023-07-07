import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './modal-d.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
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
            <div class="header_modal">
              <div class="conten_price__brand">
                <h4>
                  <TextCL text={props.name} />
                </h4>
                <div class="brand__product">
                  <a
                    href={
                      '/' +
                      props.storeName +
                      '/' +
                      'STORE-' +
                      props.storeOspayne +
                      '/h/'
                    }
                    aria-label={props.marca}
                  >
                    Explore the {props.storeName} store
                  </a>
                </div>
              </div>
              <div class="modal-close-btn">
                <TextCL text="Volver" />
                <button
                  onClick$={() => (isOpen.setIsOpen = false)}
                  class="btn-close-modal"
                >
                  X
                </button>
              </div>
            </div>
            <div class="content-modal">
              <div class="content-imgprimary">
                <img
                  width={400}
                  height={800}
                  class="img-viws-modal-lllg"
                  src={img.setImage}
                  alt=""
                />
              </div>
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
                        width={50}
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
            </div>
          </div>
        </>
      )}
    </>
  );
});
