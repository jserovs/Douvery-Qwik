import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import style from './card-comment-1.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
import { DouveryUser } from '~/components/icons/user';
import { UseDropdownReport } from '~/components/use/dropdownReport/dropdownReport';
export const CardComment1 = component$(
  ({ buyTime, name, rating, comment, timePublic, images }: any) => {
    useStylesScoped$(style);
    const showAllImg = useStore({ setShowAllImg: false });

    return (
      <div class="ctr-box-user">
        <div class="crtr-avatar">
          <DouveryUser size="35" color="#000000e8" />
        </div>
        <div class="crt-ifr-crt">
          {' '}
          <div class="ctr-title">
            {' '}
            <div class="ctr-name-time">
              <div class="name-time">
                {' '}
                <hs-sr1>{name}</hs-sr1>
                <ctr-opa>|</ctr-opa>
                <p-sr1>{timePublic}</p-sr1>
              </div>
              <div class="d-rep">
                {' '}
                <UseDropdownReport />
              </div>
            </div>
            <p-sr1>Producto comprando el {buyTime}</p-sr1>
            <div class="ctr-str">
              {' '}
              <p-sr1>Rating: </p-sr1>
              <hs-sr1>{rating.title}</hs-sr1>{' '}
              <Stars color="#008080" rating={rating.rating} />
            </div>
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
