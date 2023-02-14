import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './questions-short.css?inline';
export const QuestionsShort = component$(({ question, user, time }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="card-qtio">
      <div class="card-qtio-name-time">
        <div class="name">
          <p-sr1>{user}</p-sr1>
        </div>{' '}
        -
        <div class="time">
          <p-sr1>{time}</p-sr1>
        </div>
      </div>
      <div class="card-qtio-question">
        <h-sr1>{question}</h-sr1>
      </div>
    </div>
  );
});
