import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { useGetCurrentUser } from '~/routes/layout';

import styles from './index.css?inline';
import { fetchSearchOrder } from '~/services/user/order/order';
import type { Order } from '~/utils/types';
import { CardOrdersC1 } from '~/components/cards/orders/orders-1/orders-1';
import { useNavigate } from '@builder.io/qwik-city';
interface IState {
  searchInput: string;
  searchResults: Order[];
  selectedValue: string;
}
export default component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;

  const state = useStore<IState>({
    searchInput: '',
    searchResults: {} as Order[],
    selectedValue: '',
  });
  const isLoading = useSignal(false);
  const showTooltip = useSignal(false);
  useTask$(async ({ track }) => {
    const searchInput = track(() => state.searchInput);

    if (!searchInput) {
      state.searchResults = [];
      return;
    }
    isLoading.value = true;

    const controller = new AbortController();

    try {
      state.searchResults = await fetchSearchOrder(
        `${user?.token}`,
        state.searchInput,
        `${user?.id}`,
        controller
      );
      isLoading.value = false;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
    return () => {
      controller.abort();
    };
  });

  const nav = useNavigate();
  const navViewOrder = $((orderId: any) => {
    nav('/a/user/my/orders/view/' + orderId, true);
  });

  const pasteFromClipboard = $(async () => {
    try {
      const text = await navigator.clipboard.readText();
      state.searchInput = text;
    } catch (err) {
      console.error('Error al pegar desde el portapapeles:', err);
    }
  });
  const handleMouseEnter = $(() => {
    showTooltip.value = true;
  });

  const handleMouseLeave = $(() => {
    showTooltip.value = false;
  });
  return (
    <div class="container-all">
      <div class="container-title">
        <p>Search you orders</p>
      </div>
      <div class="container">
        {user ? <> </> : <> </>}
        <div class="apleada">
          <div class="search-container">
            <input
              type="text"
              class="search-input"
              placeholder="Find your order through the order Id"
              value={state.searchInput || ''}
              onKeyUp$={(ev) =>
                (state.searchInput = (ev.target as HTMLInputElement).value)
              }
            />
            <button
              onMouseEnter$={handleMouseEnter}
              onMouseLeave$={handleMouseLeave}
              class="paste-button"
              onClick$={pasteFromClipboard}
            >
              Pegar
              {showTooltip.value && (
                <>
                  <span class="tooltip-text">
                    By pressing this button, you can quickly search for the
                    order you desire, as long as you have the order ID copied.
                  </span>
                </>
              )}
            </button>
          </div>
          <>
            <div class="suggestions">
              {isLoading.value == true ? (
                <div class="loader"></div>
              ) : state.searchInput == '' ? (
                <div class="no-query-message">Please enter a search term.</div>
              ) : state.searchResults.length > 0 ? (
                <ul>
                  {state.searchResults.map((order: any) => {
                    return (
                      <>
                        <li class="container-order" key={order.orderId}>
                          <CardOrdersC1 order={order} />
                          <button onClick$={() => navViewOrder(order.orderId)}>
                            View order
                          </button>
                        </li>
                      </>
                    );
                  })}
                </ul>
              ) : (
                <div class="no-results-message">No orders found.</div>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
});
