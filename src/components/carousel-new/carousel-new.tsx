import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel-new.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <div class="ct-crousel-new ">
        <div class="ct-ttl-new">
          <p>Nuevos productos de hoy</p>
          <a href="/"> Ver mas</a>
        </div>
        <></>
      </div>
    </>
  );
});
