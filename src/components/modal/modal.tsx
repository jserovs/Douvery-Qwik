import {
  // Resource,
  component$,
  // useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './modal.css?inline';
import { DouveryGlobalSearch } from '../icons/global-search';
// import { fetchCodePostal } from '~/services/fechProduct';
// import type { CodePostalData } from '~/utils/types';
// import { cleanUpParamsCodePostal } from '~/utils/cleurs';

export const ModalButtonCou = component$(() => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });

  // const state = useStore<{
  //   code: CodePostalData;
  // }>(
  //   {
  //     code: {} as CodePostalData,
  //   },
  //   { recursive: true }
  // );

  // const codeResource = useResource$<void>(async () => {
  //   const { codepostal } = cleanUpParamsCodePostal({
  //     code: '10001',
  //   });

  //   const code = await fetchCodePostal(codepostal);

  //   state.code = code;
  // });

  return (
    <div class="crt-button-modal-dr">
      <button
        onClick$={() => (isOpen.setIsOpen = true)}
        class="button-mds-view"
      >
        <DouveryGlobalSearch size="18" />
        Enviar a New York 10001
      </button>

      {isOpen.setIsOpen && (
        <>
          {' '}
          <div
            class="crtr-modal"
            onClick$={() => (isOpen.setIsOpen = false)}
          ></div>
          <div class={`modal ${!isOpen && 'modal-close'}`}>
            <button onClick$={() => (isOpen.setIsOpen = false)}>
              Cerrar modal
            </button>
            <p>Contenido del modal</p>
            {/* <div class="apleada">
              {' '}
              <h1>Enter your postcode, and I'll guess your age!</h1>
              <Resource
                value={codeResource}
                onPending={() => <div>Loading...</div>}
                onRejected={() => <div>Failed to person data</div>}
                onResolved={() => {
                  return <div></div>;
                }}
              />
            </div> */}
          </div>
        </>
      )}
    </div>
  );
});
