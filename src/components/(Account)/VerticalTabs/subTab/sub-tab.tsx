import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './sub-tab.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
export const SubTab = component$(({ path, currentPath, label, key }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  const isActive = currentPath === path || currentPath.startsWith(path);
  const className = `container-tab ${isActive ? 'active' : ''}`;
  const onClick = $(() => {
    nav(path, true);
  });
  return (
    <div class="container-sub-tab" key={key}>
      <div class={className} onClick$={onClick}>
        {' '}
        <button>{label}</button>
      </div>
    </div>
  );
});
