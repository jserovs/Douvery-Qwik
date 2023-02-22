import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  const activeIndex = useStore({ setActiveIndex: 0 });

  const items = [
    {
      label: 'Item 1',
      src: 'img/slide1.jpg',
      text: 'Slide 1 Text',
    },
    {
      label: 'Item 2',
      src: 'img/slide2.jpg',
      text: 'Slide 2 Text',
    },
    {
      label: 'Item 3',
      src: 'img/slide3.jpg',
      text: 'Slide 3 Text',
    },
  ];

  const item = items[activeIndex.setActiveIndex];
  return (
    <>
      <div class="carousel">
        <div>
          <div>
            <img src={item.src} alt={item.label} />

            <div class="carousel__controls">
              {activeIndex.setActiveIndex > 0 && (
                <button onClick$={() => (activeIndex.setActiveIndex = -1)}>
                  Prev
                </button>
              )}
              {activeIndex.setActiveIndex < items.length - 1 && (
                <button onClick$={() => (activeIndex.setActiveIndex = +1)}>
                  Next
                </button>
              )}
            </div>
          </div>
          <div class="carousel__text">{item.text}</div>
        </div>
      </div>
    </>
  );
});
