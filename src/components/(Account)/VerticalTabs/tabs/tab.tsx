import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './tab.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
import { SubTab } from '../subTab/sub-tab';
export const Tab = component$(({ path, currentPath, label, subTabs }: any) => {
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

      <div>
        <div class="container-subtabs">
          {subTabs.map((subTab: any, i: number) => (
            <div class="subtabs" key={i}>
              <SubTab
                key={subTab.path}
                path={subTab.path}
                currentPath={currentPath}
                label={subTab.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
