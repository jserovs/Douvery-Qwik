import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import { useNavigate } from '@builder.io/qwik-city';
import { fetchPhonesUser } from '~/services/user/phones/phones';
interface IStateResult {
  results: string[];
}
export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;
  const state = useStore<IStateResult>({
    results: [],
  });

  const reduceAddress = useResource$(async () => {
    const data = await fetchPhonesUser(`${userACC?.id}`, `${userACC?.token}`);
    state.results = data;
  });

  const selectIndex = useSignal(undefined);
  const nav = useNavigate();
  const send = $(() => {
    nav(
      '/a/user/verified-segure/changes/my-phone/edit/' + selectIndex.value,
      true
    );
  });
  const sendNew = $(() => {
    nav('/a/user/verified-segure/changes/my-phone/new');
  });
  return (
    <div class="container-all">
      {' '}
      <div class="container-title">
        <p>Change your phones</p>
        <h6>Personal Information</h6>
      </div>
      <div>
        {' '}
        <div class="separator">
          <hr class="line" />
          <p>Your existing phones</p>
          <hr class="line" />
        </div>
        <div class="container-address-existing">
          <div class="options">
            <h6>
              Select an existing phones and then continue to be able to modify
              it-.
            </h6>

            <Resource
              value={reduceAddress}
              onPending={() => <div class="loader"></div>}
              onRejected={(error) => <>Error: {error.message}</>}
              onResolved={() => (
                <>
                  {state.results.length === 0 ? (
                    <>
                      {' '}
                      <p>
                        No hay <strong>Phones existentes</strong> disponibles
                      </p>
                    </>
                  ) : (
                    <>
                      {state.results[0] !== '' ? (
                        state.results.map((item: any, i: any) => {
                          return (
                            <>
                              {' '}
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
                                <span> {item}</span>
                              </label>
                            </>
                          );
                        })
                      ) : (
                        <p>
                          No hay <strong>Direcciones existentes</strong>{' '}
                          disponibles
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            />
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
      <div class="separator">
        <hr class="line" />
        <p>Create new addresses</p>
        <hr class="line" />
      </div>
      <div class="container-new-addresses">
        <p>New shipping address?</p>
        <button onClick$={sendNew}>Crear</button>
      </div>
    </div>
  );
});
