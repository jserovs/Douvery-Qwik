import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import style from './container-box-comments.css?inline';
import { CardComment1 } from '~/components/cards/comment/card-comment-1/card-comment-1';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
export const ContainerBoxComments = component$(() => {
  useStylesScoped$(style);
  const showAllQuestions = useStore({ setShowAllQuestions: false });

  const comment = [
    {
      timePublic: 'May 21,2022',
      rating: 4.5,
      name: 'Juan Garcia',
      buyTime: 'May 19,2022',
      comment:
        'El producto es muy bueno, llegó en perfectas condiciones y cumplió con mis expectativas.',
    },
    {
      timePublic: 'June 5,2022',
      rating: 3.2,
      name: 'Perla Lopez',
      buyTime: 'June 3,2022',
      comment:
        'El producto es aceptable, pero no es exactamente lo que estaba buscando. El envío fue rápido y sin problemas.',
    },
    {
      timePublic: 'July 2,2022',
      rating: 5.0,
      name: 'Francisco Quintero',
      buyTime: 'June 28,2022',
      comment:
        'Estoy muy contento con mi compra. El producto es de alta calidad y la entrega fue rápida. Lo recomendaría sin dudarlo.',
    },
  ];

  return (
    <div class="ctr-comment">
      <hs-sr3>Opiniones de compradores</hs-sr3>
      <div class="ctr-comment-box">
        {' '}
        {comment
          .slice(0, showAllQuestions.setShowAllQuestions ? comment.length : 2)
          .map((q) => (
            <>
              <CardComment1
                timePublic={q.timePublic}
                buyTime={q.buyTime}
                name={q.name}
                rating={q.rating}
                comment={q.comment}
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
  );
});
