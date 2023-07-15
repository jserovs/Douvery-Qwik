import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './header_info_button.css?inline';
import { DouveryArrowLeft1 } from '~/components/icons/arrow-left-1';
export const Header_info_button = component$(({ title }: any) => {
  useStylesScoped$(style);
  const goBack = $(() => {
    window.history.back();
  });

  return (
    <div class="title_and_infos">
      <div class="title">
        <div class="content">
          <button
            onClick$={goBack}
            class="button_goback"
            aria-label="Volver"
            name="Volver"
            title="Volver a la página anterior"
          >
            <DouveryArrowLeft1 />
            Volver
          </button>
          -<div class="product_new__title"> {title}</div>{' '}
        </div>
        {/* Añade el botón aquí */}
      </div>
    </div>
  );
});
