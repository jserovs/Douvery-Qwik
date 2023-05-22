import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './sub-tab.css?inline';

export const SubTab = component$(({ path, currentPath, label, key }: any) => {
  useStylesScoped$(styles);

  const isActive = currentPath === path || currentPath.startsWith(path);
  const className = `container-tab ${isActive ? 'active' : ''}`;

  return (
    <div class="container-sub-tab" key={key}>
      <a href={path}>
        <div class={className} >
          {' '}
          <span>{label}</span>
        </div>
      </a>
    </div>
  );
});
