import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './view-address-existing.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { useNavigate } from '@builder.io/qwik-city';
export const ViewAddressExisting = component$(({ state }: any) => {
  useStylesScoped$(styles);
  const selectIndex = useStore({ index: undefined });
  const nav = useNavigate();
  const send = $(() => {
    nav('/by/segure/pay/' + selectIndex.index, true);
  });

  return (
    <div>
      {' '}
      <div class="container-address-existing">
        <div class="options">
          {state.results.length === 0 ? (
            <>
              {' '}
              <p>
                No hay <strong>Direcciones existentes</strong> disponibles
              </p>
            </>
          ) : (
            <>
              {state.results[0] !== '' ? (
                state.results.map((item: any, i: any) => {
                  return (
                    <label key={i} class="option">
                      <input
                        type="radio"
                        name="calle"
                        id={`calle${i}`}
                        value={item}
                        onChange$={() => {
                          selectIndex.index = i;
                        }}
                      />
                      <span>
                        {item.addressLine1} , {item.state} , {item.zip},{' '}
                        <TextCL text={item.country} />
                      </span>
                    </label>
                  );
                })
              ) : (
                <p>
                  No hay <strong>Direcciones existentes</strong> disponibles
                </p>
              )}
            </>
          )}
        </div>
        <button
          type="submit"
          onClick$={send}
          disabled={selectIndex.index == undefined ? true : false}
        >
          Continue
        </button>
      </div>
    </div>
  );
});
