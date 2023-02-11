import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './css/crtr-description.css?inline';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
export const ContainerDescription = component$(({ props }: any) => {
  useStylesScoped$(styles);
  const showText = useStore({ setShowText: false });

  useTask$(async ({ track }) => {
    track(() => props.description);

    showText.setShowText = false;
  });

  const text = props.description;
  const limit = 350;

  return (
    <div class="crrtr-srtrt">
      <hs-sr1>Descripcion</hs-sr1>
      <div class="descr">
        <p-sr1>
          {showText.setShowText
            ? text
            : text.slice(0, limit) + (text.length > limit ? '...' : '')}
        </p-sr1>

        {text.length > limit && (
          <button
            onClick$={() => (showText.setShowText = !showText.setShowText)}
          >
            {showText.setShowText ? (
              <srw-sr1>
                <DouveryArrowUp size="15" /> Ver menos
              </srw-sr1>
            ) : (
              <srw-sr1>
                <DouveryArrowDown size="15" /> Ver más
              </srw-sr1>
            )}
          </button>
        )}

        <srw></srw>
      </div>
    </div>
  );
});
