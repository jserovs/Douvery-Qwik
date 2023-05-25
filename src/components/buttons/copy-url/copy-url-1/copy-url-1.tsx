import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { DouveryCopyText } from '~/components/icons/copy';
import { copyToClipboard } from '~/services/copy-text/copy-text';
import styles from './copy-url-1.css?inline';
export const CopyUrl1 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const loc = useLocation();
  const copied = useStore({ setCopied: false });
  return (
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
  );
});
