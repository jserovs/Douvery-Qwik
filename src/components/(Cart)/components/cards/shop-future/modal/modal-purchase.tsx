import {
  // Resource,
  component$,
  // useResource$,
  useStore,
  useStylesScoped$,

} from '@builder.io/qwik';
import styles from './modal-purchase.css?inline';

import {

   
  globalAction$,



  useNavigate,

  z,
  zod$,
} from '@builder.io/qwik-city';
import { urlServerNode } from '~/services/fechProduct';
import { useGetCurrentUser } from '~/routes/layout';
import { Card2SCART } from '~/components/cards/cart/card-2-s/card-2-s';



// import { fetchCodePostal } from '~/services/fechProduct';
// import type { CodePostalData } from '~/utils/types';
// import { cleanUpParamsCodePostal } from '~/utils/cleurs';


export const useActionFuturePurchase = globalAction$(
  async ({ id,dui}, { fail, headers, url }) => {
    const data = await fetch(`${urlServerNode}/api/add-future-purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userId: id,
        dui:dui,
        alert: false,
      }),
    });

    const dataAccess = await data.json();

    if (!data.ok || !dataAccess) {
      const errorMessage = 'Something went wrong. Please try again later.';
      console.error('Error:', errorMessage); // log the error to the console for debugging
      return fail(400, {
        message: errorMessage,
      });
    }

    

    const query = url.searchParams.get('rr') || '';
    headers.set('location', query);
   
  },
  zod$({
    id: z
      .string({
        required_error: 'Full name is required',
      })
     ,
      dui: z
      .string({
        required_error: 'Full name is required',
      })
     ,
  
  })
);


export const useAddFuturePurchase = globalAction$((id ,dui ) => { 
  const data =  fetch(`${urlServerNode}/api/add-future-purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      userId: id,
      dui:dui,
      alert: false,
    }),
  });
  return {
    success: true,
    data
  };
});


export const ModalFuturePurchase = component$(({product}:any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  const reminderDate=useStore({ setReminderDate: '' });
  const notification=useStore({ setNotification: false });
 

  const nav = useNavigate();
  const user = useGetCurrentUser().value;

  return (
    <div class="crt-button-modal-dr">
      <button
        onClick$={() => (isOpen.setIsOpen = true)}
        class="button-mds-view"
      >
      Añadir a lista de compras futuras
      </button>

      {isOpen.setIsOpen && (
        <>
          {' '}
          <div
            class="crtr-modal"
            onClick$={() => (isOpen.setIsOpen = false)}
          ></div>
          <div class="crtr-modal-content">
            <div class={`modal ${!isOpen && 'modal-close'}`}>
              <div class="ctr-title-modal">
                <p>AGG en Lista de compras futuras</p>
              </div>{' '}
             
              <div class="card">
              <Card2SCART product={product}/> 
              
             
            
            </div>
            <div class="card"><label  for="reminder-date" class="form-label">Seleccionar fecha para recordatorio:</label>

<input type="date" id="reminder-date" name="reminder-date" onChange$={(e) => reminderDate.setReminderDate=e.target.value} class="form-input"/>

</div><div class="card-notification">
<label for="notification" class="form-label">Recibir notificación:</label>
<input type="checkbox" id="notification" name="notification" value="true" onChange$={(e) => notification.setNotification = e.target.checked} class="form-checkbox"/>

</div>
            <div class="ctr-button-modal"><button class='button-agg'
        onClick$={async () => {
          try {
            const response = await fetch(
              `${urlServerNode}/api/add-future-purchase`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: user?.id,
                  dui:product.dui,
                  reminderDate: reminderDate.setReminderDate,
                notification: notification.setNotification
                }),
              }
            );

            if (response.status === 400) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.msg);
            }
          nav('/v/cart')
          isOpen.setIsOpen = false;
          } catch (error: any) {
            console.error(error);
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Error: ' + error.message;

          }
        }}
      >
       Agregar   
      </button>
      </div>  
          </div>
         
          </div>
          
        </>
      )}
    </div>
  );
});
