import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './dropdown.css?inline';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { copyToClipboard } from '~/services/copy-text/copy-text';
import { RequestHandler, useLocation, useNavigate } from '@builder.io/qwik-city';
import { DouveryCopyText } from '~/components/icons/copy';
import { deleteDataFuturePurchasesProduct } from '~/services/cart/future-purchases';
import { useGetCurrentUser } from '~/routes/layout';


export const DropdownOptionsFuturePurchases = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const copied = useStore({ setCopied: false });
  const loc = useLocation();
  const user = useGetCurrentUser().value;
const nav = useNavigate();
const isOpen = useStore({
  setIsOpen:false
})
  return (
    <div>
      <details class="dropdown" open={isOpen.setIsOpen}>
        <summary role="button">
          <a class="button">Modificar</a>
        </summary>

        <ul>
          <li>
            <strong>Opciones de {product.dui}</strong>
          </li>
          <li class="ns-a">
          

            <button>Cambiar fecha</button>
          </li>
          <li>
           

            <button onClick$={()=> {
              deleteDataFuturePurchasesProduct(
                `${user?.id}` ,product.dui
                   );
                 
                 
            }}>Eliminar</button>
          </li>
          <li>
           

            <button> Compra automatica</button>
          </li>
          <li>
           

            <button>Desactivar alerta</button>
          </li>
          <li>
            {copied.setCopied ? (
              <div class="green-fill">
                {' '}
                <DouveryCheckMark size="15px" />
              </div>
            ) : (
              <DouveryCopyText size="15px" />
            )}
            <input
              type="text"
              class="input-url-copy"
              placeholder={loc.url.origin + '/v/' + product.dui}
              disabled
              onClick$={() => {
                copyToClipboard(loc.url.origin + '/v/' + product.dui);
                copied.setCopied = true;
                setTimeout(() => {
                  copied.setCopied = false;
                }, 2000);
              }}
            />
            <button
              onClick$={() => {
                copyToClipboard(loc.url.origin + '/v/' + product.dui);
                copied.setCopied = true;
                setTimeout(() => {
                  copied.setCopied = false;
                }, 2000);
              }}
            >
              <div class={copied.setCopied ? 'green text-copy' : 'text-copy'}>
                {copied.setCopied ? 'Url copiada' : 'Copiar url'}
              </div>
            </button>
          </li>
        </ul>
      </details>
    </div>
  );
});
