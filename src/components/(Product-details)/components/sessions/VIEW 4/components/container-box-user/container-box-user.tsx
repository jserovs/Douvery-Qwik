import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import style from './container-box-user.css?inline';
import { DouveryUser } from '~/components/icons/user';

export const ContainerBoxBser = component$(() => {
  useStylesScoped$(style);

  const rating = useStore({ setRating: 0 });

  const stars = [...Array(5)].map((_, index) => (
    <span
      key={index}
      onClick$={() => (rating.setRating = index + 1)}
      style={{
        fill: index < rating.setRating ? '#ff0000' : '#292D32',
        cursor: 'pointer',
        transition: 'none',
      }}
    >
      <svg
        width={'35'}
        height={'35'}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.73937 16C5.84937 15.51 5.64937 14.81 5.29937 14.46L2.86937 12.03C2.10937 11.27 1.80937 10.46 2.02937 9.76C2.25937 9.06 2.96937 8.58 4.02937 8.4L7.14937 7.88C7.59937 7.8 8.14937 7.4 8.35937 6.99L10.0794 3.54C10.5794 2.55 11.2594 2 11.9994 2C12.7394 2 13.4194 2.55 13.9194 3.54L15.6394 6.99C15.7694 7.25 16.0394 7.5 16.3294 7.67L5.55937 18.44C5.41937 18.58 5.17937 18.45 5.21937 18.25L5.73937 16Z"
          fill={index < rating.setRating ? '#008080' : '#292D32A1'}
        />
        <path
          d="M18.7008 14.4619C18.3408 14.8219 18.1408 15.5119 18.2608 16.0019L18.9508 19.0119C19.2408 20.2619 19.0608 21.2019 18.4408 21.6519C18.1908 21.8319 17.8908 21.9219 17.5408 21.9219C17.0308 21.9219 16.4308 21.7319 15.7708 21.3419L12.8408 19.6019C12.3808 19.3319 11.6208 19.3319 11.1608 19.6019L8.23078 21.3419C7.12078 21.9919 6.17078 22.1019 5.56078 21.6519C5.33078 21.4819 5.16078 21.2519 5.05078 20.9519L17.2108 8.79185C17.6708 8.33185 18.3208 8.12185 18.9508 8.23185L19.9608 8.40185C21.0208 8.58185 21.7308 9.06185 21.9608 9.76185C22.1808 10.4619 21.8808 11.2719 21.1208 12.0319L18.7008 14.4619Z"
          fill={index < rating.setRating ? '#008080' : '#292D32A1'}
        />
      </svg>
    </span>
  ));

  let ratingText;
  switch (rating.setRating) {
    case 1:
      ratingText = 'Muy Malo';
      break;
    case 2:
      ratingText = 'Malo';
      break;
    case 3:
      ratingText = 'Regular';
      break;
    case 4:
      ratingText = 'Bueno';
      break;
    case 5:
      ratingText = 'Excelente';
      break;
    default:
      ratingText = 'Sin Valorar';
  }

  return (
    <div class="ctr-box-user">
      <div class="crtr-avatar">
        <DouveryUser size="35" color="#424242" />
      </div>
      <div class="ctr-name-time">
        <div class="hea">
          <strong class="hs-sr1">Frederick Sansck</strong>
          <p class="ps-sr1">Producto comprando el 10 dic 2022</p>
        </div>
        <div class="ctr-star">
          <div class="hea-ratgi">
            {' '}
            <p class="ps-sr1">Rating: </p>
            <strong class="hs-sr1">{ratingText}</strong>
          </div>
          <div class="stra">{stars}</div>
        </div>
      </div>
    </div>
  );
});
