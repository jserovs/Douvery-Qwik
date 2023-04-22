import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './tab.css?inline';

import { SubTab } from '../subTab/sub-tab';
export const Tab = component$(({ currentPath, subTabs }: any) => {
  useStylesScoped$(styles);

  return (
    <div>
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
