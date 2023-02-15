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
      rating: {
        title: 'Bueno',
        rating: 4,
      },

      name: 'Juan Garcia',
      buyTime: 'May 19,2022',
      images: [
        'https://d500.epimg.net/cincodias/imagenes/2022/05/09/gadgets/1652093465_328420_1652093764_noticia_normal_recorte1.jpg',
        'https://i.guim.co.uk/img/media/02133306ef973ec89cdbd4209ddf19c965aa8d82/714_651_4276_2565/master/4276.jpg?width=620&quality=85&dpr=1&s=none',
        'https://i.blogs.es/4c6406/airpods-pro-review-xataka-3/1366_2000.jpg',
        'https://www.infobae.com/new-resizer/FPA5NOOkfTg7Jf4JEhIvy2b0744=/992x558/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/2HCH5FW5JRAM3D4JZ4FAZOBJ5Y.jpg',
      ],
      comment:
        'El producto es muy bueno, llegó en perfectas condiciones y cumplió con mis expectativas.',
    },
    {
      timePublic: 'June 5,2022',
      rating: {
        title: 'Regular',
        rating: 3,
      },

      name: 'Perla Lopez',
      buyTime: 'June 3,2022',

      comment:
        'El producto es aceptable, pero no es exactamente lo que estaba buscando. El envío fue rápido y sin problemas.',
    },
    {
      timePublic: 'July 2,2022',
      rating: {
        title: 'Excelente',
        rating: 5,
      },

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
                images={q.images}
              />
            </>
          ))}
      </div>
      <div class="ctr-bts-sh">
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
