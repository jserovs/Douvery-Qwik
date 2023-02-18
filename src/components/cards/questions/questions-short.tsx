import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './questions-short.css?inline';
export const QuestionsShort = component$(({ question, user, time }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="card-qtio">
      <div class="card-qtio-name-time">
        <div class="name">
          <p class="ps-sr1">{user}</p>
        </div>{' '}
        -
        <div class="time">
          <p class="ps-sr1">{time}</p>
        </div>
      </div>
      <div class="card-qtio-question">
        <h-sr1>{question}</h-sr1>
      </div>
    </div>
  );
});
