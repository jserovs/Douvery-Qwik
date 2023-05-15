import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './dropdown.css?inline';
import { DouveryArrowDown } from '../icons/arrow-down';
import { DouveryArrowUp } from '../icons/arrow-up';
export const Dropdown = component$(({ title }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  const options = [
    { name: 'No disponible', subtitle: 'No disponible', time: 'No disponible' },
  ];
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
          {title}{' '}
          {isOpen.setIsOpen ? (
            <DouveryArrowUp size="14" />
          ) : (
            <DouveryArrowDown size="14" />
          )}
        </button>
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <div class="list-container">
              <div class="tolst-tip"></div>
              <h3 class="list-title">{title}</h3>
              <ul>
                {options.map((option) => (
                  <li key={option.name} class="list-item">
                    <div class="item-title">{option.name}</div>
                    <div class="item-subtitle">{option.subtitle}</div>
                    <div class="item-time">{option.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
});
