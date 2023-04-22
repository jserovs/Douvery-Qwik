import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './copy.css?inline';
export const UseCopy = component$(({ text }: any) => {
  useStylesScoped$(styles);
  const isCopied = useSignal(false);
  const handleCopyClick = $(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    isCopied.value = true;

    setTimeout(() => {
      isCopied.value = false;
    }, 3000);
  });
  return (
    <button class="copy-to-clipboard" onClick$={handleCopyClick}>
      {text}
      {isCopied.value && (
        <span class="copy-to-clipboard__message">Copiado</span>
      )}
    </button>
  );
});
