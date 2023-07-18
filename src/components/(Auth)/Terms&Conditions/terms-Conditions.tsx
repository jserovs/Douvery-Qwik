import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './terms-Conditions.css?inline';
export const TermsConditions = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="terms-and-conditions">
      {' '}
      <p>
        Al continuar, aceptas nuestros{' '}
        <a href="https://help.douvery.com/help/Pol%C3%ADticas/privacy-policy">
          Términos y condiciones
        </a>
        .
      </p>
    </div>
  );
});
