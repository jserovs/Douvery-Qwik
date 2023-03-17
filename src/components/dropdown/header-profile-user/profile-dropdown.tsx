import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './profile-dropdown.css?inline';
import { useLocation } from '@builder.io/qwik-city';
import { TextCL } from '~/components/use/textCL/textCL';

export const ProfileDropdown = component$(({ user }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  const loc = useLocation();
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
        <div class="ctr-session-none">
          {' '}
          <button
            class="trl-drs"
            onClick$={() => (isOpen.setIsOpen = !isOpen.setIsOpen)}
          >
            <p class="ttle-draw">
              <strong class="text-hello"> Hello,</strong>{' '}
              <strong> <TextCL text={user.name}/></strong>
            </p>{' '}
          </button>
        </div>{' '}
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <a class="dropdown-item" href="#">
              Configuración
            </a>
            <a class="dropdown-item" href="#">
              Mis pedidos
            </a>
            <div class="dropdown-divider"></div>
            <a
              class="dropdown-item"
              href={'/a/logout?rr=' + loc.url.pathname + loc.url.search}
            >
              Cerrar sesión
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
});
