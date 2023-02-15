import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './dropdownReport.css?inline';

import { DouveryReport } from '~/components/icons/report';

export const UseDropdownReport = component$(({ ref, a }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  const options = [
    { name: 'Option 1', subtitle: 'Subtitle 1', time: '5min' },
    { name: 'Option 2', subtitle: 'Subtitle 2', time: '10min' },
    { name: 'Option 3', subtitle: 'Subtitle 3', time: '15min' },
  ];
  ref;
  a;
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
          <DouveryReport />
        </button>
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <div class="list-container">
              <div class="tolst-tip"></div>
              <h3 class="list-title">
                <DouveryReport />
              </h3>
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
