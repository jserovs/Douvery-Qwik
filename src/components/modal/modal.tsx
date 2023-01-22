import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './modal.css?inline';
import { DouveryGlobalSearch } from '../icons/global-search';
export const ModalButtonCou = component$(() => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  return (
    <div class="crt-button-modal-dr">
      <button
        onClick$={() => (isOpen.setIsOpen = true)}
        class="button-mds-view"
      >
        <DouveryGlobalSearch size="18" />
        Enviar a New York 10001
      </button>

      {isOpen.setIsOpen && (
        <>
          {' '}
          <div
            class="crtr-modal"
            onClick$={() => (isOpen.setIsOpen = false)}
          ></div>
          <div class={`modal ${!isOpen && 'modal-close'}`}>
            <button onClick$={() => (isOpen.setIsOpen = false)}>
              Cerrar modal
            </button>
            <p>Contenido del modal</p>
            <div class="loader"></div>
          </div>
        </>
      )}
    </div>
  );
});
