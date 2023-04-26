import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-terms-comments.css?inline';
export const ContainerTermsComments = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container">
      <h1>Douvery's Code of Conduct for User Comments.</h1>
      <ol>
        <li>
          When leaving reviews on products or services, focus on your experience
          and avoid personal remarks. Provide specific and constructive details,
          using respectful and friendly language. Be honest when expressing
          dissatisfaction, but without personal attacks or aggression. Lastly,
          comply with the platform's policies to maintain a safe and respectful
          environment.
        </li>
      </ol>
    </div>
  );
});
