import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './category-flex-1.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
export const Card_Category_Flex_1 = component$(
  ({ name, img1, img2, img3 }: any) => {
    useStylesScoped$(styles);
    const nav = useNavigate();
    const navigate = $((url: string) => {
      nav(url, true);
    });
    return (
      <div
        class="category-card"
        onClick$={() => navigate(`/s-categorie/Books/`)}
      >
        <div class="category-info">
          <h1>{name}</h1>
          <a href={`/s-categorie/Books/`}> Descubir mas</a>
        </div>

        <div class="category-img">
          <Image
            src={img1}
            layout="constrained"
            width={100}
            height={150}
            alt={'IMAGE-BANNER-LOGO-CATEGORIE-DOUVERY' + name}
            style={{ borderRadius: '5px' }}
          />{' '}
          <Image
            src={img2}
            layout="constrained"
            width={100}
            height={150}
            alt={'IMAGE-BANNER-LOGO-CATEGORIE-DOUVERY' + name}
            style={{ borderRadius: '5px' }}
          />{' '}
          <Image
            src={img3}
            layout="constrained"
            width={100}
            height={150}
            alt={'IMAGE-BANNER-LOGO-CATEGORIE-DOUVERY' + name}
            style={{ borderRadius: '5px' }}
          />
        </div>
      </div>
    );
  }
);
