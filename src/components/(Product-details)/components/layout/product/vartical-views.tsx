import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/vartical-views.css?inline';
import { ModalD } from '../modal/modal-de';
export const VarticalViewProductIMG = component$(
  ({
    props,
    img,
    isOpen,
    handleMouseOver,
    handleMouseMove,
    handleMouseOut,
    showZoom,
    position,
  }: any) => {
    useStylesScoped$(styles);

    return (
      <div class="ctr-gen-img-br">
        <div class="ctr-vrt-img ">
          {' '}
          <div class="preview_img-vert">
            {props.images.map((image: any, i: any) => (
              <div
                class={
                  img.setImage == image
                    ? 'img_wrap active-prev-view'
                    : 'img_wrap'
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
                    loading="lazy"
                    lang="en"
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
          <size-w class="size-w-10" />
          <div class="img-vertical-mobiles-prev">
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
          <div class="crtr-dirjfs">
            <div class="container-img-product">
              <img
                width={400}
                height={400}
                loading="lazy"
                lang="en"
                onClick$={() => (isOpen.setIsOpen = true)}
                onMouseOver$={handleMouseOver}
                onMouseMove$={handleMouseMove}
                onMouseOut$={handleMouseOut}
                src={img.setImage}
                alt={props.slug}
                class="img-product-llg"
                title="Aumentar tamaño de imagen"
              />
              {showZoom.value && (
                <>
                  {' '}
                  <div
                    class="mouse-follower"
                    style={{
                      left: `${position.setPosition.x - 50}px`,
                      top: `${position.setPosition.y - 40}px`,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
