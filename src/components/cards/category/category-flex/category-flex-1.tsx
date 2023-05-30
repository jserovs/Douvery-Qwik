import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './category-flex-1.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
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
          <img src={img1} alt={'IMAGE-BANNER-LOGO-CATEGORIE-DOUVERY' + name} />{' '}
          <img src={img2} alt={'IMAGE-BANNER-LOGO-CATEGORIE-DOUVERY' + name} />
          <img src={img3} alt={'IMAGE-BANNER-LOGO-CATEGORIE-DOUVERY' + name} />
        </div>
      </div>
    );
  }
);
