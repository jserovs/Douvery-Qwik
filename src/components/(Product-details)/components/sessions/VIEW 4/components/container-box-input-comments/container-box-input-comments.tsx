import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './container-box-input-comments.css?inline';
import { ContainerBoxBser } from '../container-box-user/container-box-user';
export const ContainerBoxInputComments = component$(({ datePurchase }: any) => {
  useStylesScoped$(style);
  return (
    <div class="comments-box">
      <div>
        <label for="comentario">Comentario:</label>
        <ContainerBoxBser datePurchase={datePurchase} />

        <textarea
          id="comentario"
          name="comentario"
          aria-label="Comentario"
          placeholder="Escribe un comentario..."
          rows={3}
          cols={60}
        />
        <br></br>
        <div class="ctr-butr">
          <p class="ps-sr1">Al comentar, acepto los términos de comentarios.</p>
          <button>Enviar</button>
        </div>
      </div>
    </div>
  );
});
