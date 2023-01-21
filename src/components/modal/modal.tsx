import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './modal.css?inline';
export const Modal = component$(({ open, onClose }: any) => {
  useStylesScoped$(styles);
  if (!open) return null;
  return (
    <div onClick$={onClose} class="overlay">
      <div
        onClick$={(e) => {
          e.stopPropagation();
        }}
        class="modalContainer"
      >
        <div class="modalRight">
          <p class="closeBtn" onClick$={onClose}>
            X
          </p>
          <div class="content">
            <p>Do you want a</p>
            <h1>$20 CREDIT</h1>
            <p>for your first tade?</p>
          </div>
          <div class="btnContainer">
            <button class="btnPrimary">
              <span class="bold">YES</span>, I love NFT's
            </button>
            <button class="btnOutline">
              <span class="bold">NO</span>, thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
