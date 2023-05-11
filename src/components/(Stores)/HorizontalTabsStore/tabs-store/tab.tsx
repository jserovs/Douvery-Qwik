import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './tab.css?inline';
import { useNavigate } from '@builder.io/qwik-city';

export const TabStores = component$(({ path, currentPath, label }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  const isActive = currentPath === path || currentPath.startsWith(path);
  const className = `container-tab ${isActive ? 'active' : ''}`;
  const onClick = $(() => {
    nav(path, true);
  });
  return (
    <div>
      <div class="container-tab-primary">
        <div class={className} onClick$={onClick}>
          <button>{label}</button>
        </div>
      </div>
    </div>
  );
});
