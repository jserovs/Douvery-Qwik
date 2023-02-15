import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './container-box-user.css?inline';
import { DouveryUser } from '~/components/icons/user';
export const ContainerBoxBser = component$(() => {
  useStylesScoped$(style);
  return (
    <div class="ctr-box-user">
      <div class="crtr-avatar">
        <DouveryUser size="35" color="#424242" />
      </div>
      <div class="ctr-name-time">
        <hs-sr1>Frederick Sansck</hs-sr1>
        <p-sr1>Producto comprando el 10 dic 2022</p-sr1>
      </div>
    </div>
  );
});
