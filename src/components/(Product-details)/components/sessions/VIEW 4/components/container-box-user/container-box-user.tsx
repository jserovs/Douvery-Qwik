import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './container-box-user.css?inline';
export const ContainerBoxBser = component$(() => {
  useStylesScoped$(style);
  return (
    <div class="ctr-box-user">
      <div class="crtr-avatar">
        <img
          src="https://www.ecured.cu/images/a/a1/Ejemplo_de_Avatar.png"
          alt="avatar-user"
        />
      </div>
      <div class="ctr-name-time">
        <hs-sr1>Frederick Sansck</hs-sr1>
        <p-sr1>Producto comprando el 10 dic 2022</p-sr1>
      </div>
    </div>
  );
});
