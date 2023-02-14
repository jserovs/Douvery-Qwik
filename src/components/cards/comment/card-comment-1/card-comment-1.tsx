import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import style from './card-comment-1.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
export const CardComment1 = component$(
  ({ buyTime, name, rating, comment, timePublic, images }: any) => {
    useStylesScoped$(style);
    const showAllImg = useStore({ setShowAllImg: false });

    return (
      <div class="ctr-box-user">
        <div class="crtr-avatar">
          <img
            src="https://www.ecured.cu/images/a/a1/Ejemplo_de_Avatar.png"
            alt="avatar-user"
          />
        </div>
        <div class="crt-ifr-crt">
          {' '}
          <div class="ctr-title">
            {' '}
            <div class="ctr-name-time">
              <p-sr1>{name}</p-sr1>
              <div>|</div>
              <p-sr1>{timePublic}</p-sr1> <div>|</div>
              <Stars color="#008080" rating={rating} />
            </div>
            <p-sr1>Producto comprando el {buyTime}</p-sr1>
          </div>
          <div class="ctr-comment">
            <hs-sr1>{comment}</hs-sr1>
          </div>
          <div class="grap-imgs">
            {images &&
              images
                ?.slice(0, showAllImg.setShowAllImg ? images.length : 2)
                .map((img: any) => (
                  <>
                    {' '}
                    <div class="ctr-img">
                      <img src={img} alt="" />
                    </div>
                  </>
                ))}
          </div>
          {images?.length > 2 ? (
            <div
              class="ctrIMg"
              onClick$={() =>
                (showAllImg.setShowAllImg = !showAllImg.setShowAllImg)
              }
            >
              {showAllImg.setShowAllImg ? (
                <div class="ttle-sh">
                  <DouveryArrowUp size="15" /> Ver menos
                </div>
              ) : (
                <div class="ttle-sh">
                  <DouveryArrowDown size="15" /> Ver más ({images?.length - 2})
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
);
