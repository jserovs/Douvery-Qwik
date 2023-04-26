import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './box-user.css?inline';

import { useGetCurrentUser } from '~/routes/layout';
import { formatDate } from '~/services/fuction';

export const BoxUser = component$(({ datePurchase }: any) => {
  useStylesScoped$(style);
  const user = useGetCurrentUser().value;

  const date = formatDate(datePurchase);
  return (
    <div class="ctr-box-user">
      <img
        src={
          user?.avatar
            ? user?.avatar
            : 'https://res.cloudinary.com/douvery/image/upload/v1676456401/LOGO/z7neu6qunez6ygx9xxho.webp'
        }
        class="crtr-avatar"
      />

      <div class="ctr-name-time">
        <div class="hea">
          <strong class="hs-sr1">
            {user?.name} {user?.lastname}
          </strong>
          <div class="container-last">
            <p> Last purchased</p> <div class="ctr-opa">|</div> <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
