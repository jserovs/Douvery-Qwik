import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-vert.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <div class=" c-vrt-usr">
        <img
          class="gif-user"
          src="https://res.cloudinary.com/douvery/image/upload/v1671981060/assets/uposh41ftnmctakggebx.gif"
          alt=""
        />
        <div class="box-user ">
          <p class="user-parece  ">
            Upps... parece que no has Iniciado Session
          </p>
        </div>
      </div>
    </>
  );
});
