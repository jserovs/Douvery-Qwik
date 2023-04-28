import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './sub-comments-box-user.css?inline';

import { formatDate } from '~/services/fuction';
import { DouveryIconVerifyBrand } from '~/components/icons/verify';

export const SubCommentsBoxUser = component$(
  ({ name_lastname, avatar, purchase, time }: any) => {
    useStylesScoped$(style);

    const date = formatDate(time);

    const currentTime = new Date();
    const createdTime = new Date(time);
    const timeInterval =
      (currentTime.getTime() - createdTime.getTime()) / 1000 / 60;

    return (
      <div class="ctr-box-user">
        <div class="conten">
          <img
            src={
              avatar
                ? avatar
                : 'https://res.cloudinary.com/douvery/image/upload/v1676456401/LOGO/z7neu6qunez6ygx9xxho.webp'
            }
            class="crtr-avatar"
          />

          <div class="ctr-name-time">
            <div class="hea">
              <div class="container-name">
                <strong class="hs-sr1">
                  {name_lastname === 'Douvery ' ? (
                    <div class="verify">
                      {' '}
                      {name_lastname}{' '}
                      <DouveryIconVerifyBrand size="18" color="#0071FF" />
                    </div>
                  ) : (
                    name_lastname
                  )}
                </strong>
                <div class="date">
                  <p>{date}</p>
                  {timeInterval < 6 && <p class="recent">(Recent)</p>}
                </div>
              </div>

              <div class="container-last">
                <p> Last purchased</p> <div class="ctr-opa">|</div>{' '}
                <p>{purchase ? 'Compra confirmada' : 'Compra no confirmada'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
