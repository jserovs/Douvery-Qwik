import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './dropdown.css?inline';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { copyToClipboard } from '~/services/copy-text/copy-text';
import { useLocation } from '@builder.io/qwik-city';
import { DouveryCopyText } from '~/components/icons/copy';
export const DropdownOptionsFuturePurchases = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const copied = useStore({ setCopied: false });
  const loc = useLocation();

  return (
    <div>
      <details class="dropdown">
        <summary role="button">
          <a class="button">Opciones</a>
        </summary>

        <ul>
          <li>
            <strong>Opciones de {product.dui}</strong>
          </li>
          <li class="ns-a">
          

            <button>Cambiar fecha</button>
          </li>
          <li>
           

            <button>Eliminar</button>
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
