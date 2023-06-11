import {
  component$,
  useStore,
  useStylesScoped$,

} from '@builder.io/qwik';

import styles from './douveryExtend1.css?inline';
import { UsePrice } from '~/components/use/price/price';
export const CardDouveryExtend1 = component$(() => {
  useStylesScoped$(styles);

  const showLoader = useStore({ setShowLoader: false });

 
  return (
    <div class="container-all">
      {showLoader.setShowLoader ? (
        <>
          {' '}
          <div class="loader"></div>
        </>
      ) : (
        <>
          <br />
          <div class="container-interes">
            <p class="ps-sr1">Extiende la garantía</p>
          </div>
          <div class="card-douveryextend">
            <img
            width={300}
            height={300}
              src="https://res.cloudinary.com/douvery/image/upload/v1684492886/buwaumgmxfc1uz43jcux.png"
              alt=""
            />

            <div class="btt-prc">
              {' '}
              <UsePrice price={3.99} />
              /mo <button>Agregar</button>
            </div>
          </div>
          <div class="show-more">
            <a href="https://help.douvery.com/help/Servicios/douvery-extend">
              Saber mas
            </a>
          </div>
        </>
      )}
    </div>
  );
});
