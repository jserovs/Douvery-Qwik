import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/popupSHARE.css?inline';
import { DouveryExportShared } from '~/components/icons/export-shared';

export const ContainerPoput = component$(({ title }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });

  return (
    <div>
      {' '}
      {isOpen.setIsOpen && (
        <div
          class="shad-modal"
          onClick$={() => (isOpen.setIsOpen = false)}
        ></div>
      )}
      <div>
        <button
          class="trl-drs"
          onClick$={() => (isOpen.setIsOpen = !isOpen.setIsOpen)}
        >
          <DouveryExportShared />
          <p class="ttle-draw"> {title}</p>{' '}
        </button>
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <div class="list-container">
              <ul>
                <li class="list-item">
                  <div class="item-title">Instagram</div>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
});
