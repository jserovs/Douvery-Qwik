import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-box-questions-answered.css?inline';
import { QuestionsShort } from '~/components/cards/questions/questions-short';
import { QuestionResponseSeller1 } from '~/components/cards/questions/questions-response/seller/question-response-seller-1/question-response-seller-1';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
export const ContainerBoxQuestionsAnswered = component$(() => {
  useStylesScoped$(styles);
  const showAllQuestions = useStore({ setShowAllQuestions: false });

  const questions = [
    {
      user: 'Juana Gonzalez',
      time: 'April 13,2021',
      question: '¿Cómo controlo la reproducción de audio con mis AirPods?',
      response: {
        res: 'Usa los controles táctiles en los AirPods para reproducir, pausar, avanzar o retroceder una pista de audio.',
        sellerResponse: 'Apple',
        time: 'April 15,2021',
      },
    },
    {
      user: 'Germys Garcia',
      time: 'February 22,2023',
      question: '¿Puedo usar un solo AirPod a la vez?',
      response: {
        res: 'Sí, puedes usar un solo AirPod si lo deseas y el otro se cargará en el estuche.',
        sellerResponse: 'Apple',
        time: 'February 23,2023',
      },
    },
    {
      user: 'Juancho',
      time: 'January 20,2022',
      question: '¿Cuánto tiempo durará la batería de mis AirPods?',
      response: {
        res: 'Los AirPods ofrecen hasta 5 horas de reproducción de audio y hasta 3 horas de conversación con una sola carga. El estuche de carga puede proporcionar hasta 24 horas de duración de la batería.',
        sellerResponse: 'Apple',
        time: 'January 21,2022',
      },
    },
  ];
  return (
    <div class="crtr-box">
      <hs-sr2>Preguntas mas comunes ya respondidas por el vendedor</hs-sr2>
      <div class="crtr-qtio">
        <div class="crtr-qtion-res">
          {questions
            .slice(
              0,
              showAllQuestions.setShowAllQuestions ? questions.length : 1
            )
            .map((q) => (
              <>
                <QuestionsShort
                  question={q.question}
                  user={q.user}
                  time={q.time}
                />
                <QuestionResponseSeller1
                  res={q.response.res}
                  sellerResponse={q.response.sellerResponse}
                  time={q.response.time}
                />
              </>
            ))}
        </div>
        <button
          onClick$={() =>
            (showAllQuestions.setShowAllQuestions =
              !showAllQuestions.setShowAllQuestions)
          }
        >
          {showAllQuestions.setShowAllQuestions ? (
            <srw-sr1>
              <DouveryArrowUp size="15" /> Ver menos
            </srw-sr1>
          ) : (
            <srw-sr1>
              <DouveryArrowDown size="15" /> Ver más
            </srw-sr1>
          )}
        </button>
      </div>
    </div>
  );
});
