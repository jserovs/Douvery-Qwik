import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './profile-dropdown.css?inline';

export const ProfileDropdown = component$(({ user }: any) => {
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
          <p class="ttle-draw">
            <strong class="lite-text">Hello, </strong>{' '}
            <strong> {user.name}!</strong>
          </p>{' '}
        </button>
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <a class="dropdown-item" href="#">
              Configuración
            </a>
            <a class="dropdown-item" href="#">
              Mis pedidos
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/a/logout">
              Cerrar sesión
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
});
