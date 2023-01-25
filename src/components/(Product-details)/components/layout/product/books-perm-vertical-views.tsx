import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/books-perm-vertical-views.css?inline';
import { ModalD } from '../modal/modal-de';
export const LibPermVerticalViewProductIMG = component$(
  ({ props, img, isOpen }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="crtr-firx-prd-prodct">
        <div class="book-perm-top">
          <h5>Autor:</h5>
          <p> Joe Navarro</p>
          <h5>Genero:</h5>

          <p>No-Ficción / Autoayuda / Psicología</p>
        </div>
        <div class="crtr-books-aresdt">
          <div class="books-art-crtr">
            <img
              onClick$={() => (isOpen.setIsOpen = true)}
              src={img.setImage}
              alt={props.slug}
              class="img-product-llg"
              title="Haz click para ver la imagen en un tamaño mayor"
            />
          </div>
          <div class="prvd-books-arts-drs">
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
