import {
  // Resource,
  component$,
  // useResource$,
  useStore,
  useStylesScoped$,

} from '@builder.io/qwik';
import styles from './modal-purchase.css?inline';

import {

    Form,
  globalAction$,

  z,
  zod$,
} from '@builder.io/qwik-city';
import { urlServerNode } from '~/services/fechProduct';



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

export const ModalFuturePurchase = component$(() => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  

 const action = useActionFuturePurchase()
 
  return (
    <div class="crt-button-modal-dr">
      <button
        onClick$={() => (isOpen.setIsOpen = true)}
        class="button-mds-view"
      >
       Abrir modal
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
                <div class="card-title">Información de envio</div>
                <Form
                                action={action}
                                class="suggestions-zip-code"
                              >
                                  
                                {' '}
                                <li class="lis-sgrs">
                                  <div class="suge">
                                
                                    
                                  </div>

                                  {action.value?.fieldErrors?.id && (
                                    <span class="error">
                                      {action.value?.fieldErrors?.id}
                                    </span>
                                  )}
                                </li>
                                <button class={'-button'}>
                                  <span class="button-text">Agregar</span>
                                </button>
                              </Form>
              </div>
              
            
            </div>
           
          </div>
          
        </>
      )}
    </div>
  );
});
