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
                <div class="nms-pr">
                  {' '}
                  <strong class="hs-sr1">{name}</strong>
                  <div class="hover-user-inf"></div>
                </div>
                <ctr-opa>|</ctr-opa>
                <p class="ps-sr1">{timePublic}</p>
              </div>

              <div class="d-rep">
                {' '}
                <UseDropdownReport />
              </div>
            </div>
            <p class="ps-sr1">Producto comprando el {buyTime}</p>
            <div class="ctr-str">
              {' '}
              <p class="ps-sr1">Rating: </p>
              <strong class="hs-sr1">{rating.title}</strong>{' '}
              <Stars color="#008080" rating={rating.rating} />
            </div>
          </div>
          <div class="ctr-comment">
            <strong class="hs-sr1">{comment}</strong>
          </div>
          <div class="grap-imgs">
            {images &&
              images
                ?.slice(0, showAllImg.setShowAllImg ? images.length : 4)
                .map((img: any) => (
                  <>
                    {' '}
                    <div class="ctr-img">
                      <img src={img} alt="" />
                    </div>
                  </>
                ))}
          </div>
          {images?.length > 4 ? (
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
                  <DouveryArrowDown size="15" /> Ver más ({images?.length - 4})
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
