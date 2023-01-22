import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './modal.css?inline';
import { DouveryGlobalSearch } from '../icons/global-search';
export const ModalButtonCou = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="crt-button-modal-dr">
      <button class="button-mds-view">
        <DouveryGlobalSearch size="18" />
        Enviar a New York 10001
      </button>
    </div>
  );
});
