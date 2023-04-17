import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import { fetchAddressUser } from '~/services/user/address/address';
import { useNavigate } from '@builder.io/qwik-city';
import { TextCL } from '~/components/use/textCL/textCL';
interface IStateResult {
  results: string[];
}
export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;
  const state = useStore<IStateResult>({
    results: [],
  });

  useTask$(async ({ track }) => {
    track(() => '');

    const controller = new AbortController();
    state.results = await fetchAddressUser(`${userACC?.id}`, controller);

    return () => {
      controller.abort();
    };
  });

  const selectIndex = useSignal(undefined);
  const nav = useNavigate();
  const send = $(() => {
    nav('/by/segure/pay/' + selectIndex.value, true);
  });
  return (
    <div class="container-all">
      {' '}
      <div class="container-title">
        <p>Change your address</p>
        <h6>Personal Information</h6>
      </div>
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
                            selectIndex.value = i.toString();
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
            disabled={selectIndex.value == undefined ? true : false}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
});
