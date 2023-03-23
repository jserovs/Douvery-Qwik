import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './dropdown.css?inline';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { copyToClipboard } from '~/services/copy-text/copy-text';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { DouveryCopyText } from '~/components/icons/copy';
import { deleteDataFuturePurchasesProduct } from '~/services/cart/future-purchases';
import { useGetCurrentUser } from '~/routes/layout';
import { urlServerLocal } from '~/services/fechProduct';


export const DropdownOptionsFuturePurchases = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const copied = useStore({ setCopied: false });
  const showDatePicker = useStore({ setShowDatePicker: false });
   const dateSelected = useStore({ setDateSelected: false });
 const reminderDate=useStore({ setReminderDate: 0 });
  const loc = useLocation();
  const user = useGetCurrentUser().value;

const isOpen = useStore({
  setIsOpen:false
})
const isLoader = useStore({
  setIsLoader:false
})
const nav= useNavigate();
  return (
    <div>
      <details class="dropdown" open={isOpen.setIsOpen}>
        <summary role="button">
          <a class="button">Modificar</a>
        </summary>

       {
         isLoader.setIsLoader == false ? 
        <> {showDatePicker.setShowDatePicker == false ?

          <ul >
          <li>
            <strong>Opciones de {product.dui}</strong>
          </li>
          <li class="ns-a">
            <button onClick$={()=> showDatePicker.setShowDatePicker = !showDatePicker.setShowDatePicker}>Cambiar fecha</button>
          </li>
          <li>
            <button onClick$={()=> {
              deleteDataFuturePurchasesProduct(
                `${user?.id}`, product.dui
              ).then(() => {
                isLoader.setIsLoader = true;
                window.location.reload();
              }).catch((error) => {
                console.error("Error removing product", error);
              });
                 
            }}>Eliminar</button>
          </li>
          <li>
           

            <button> Compra automatica</button>
          </li>
          <li>
           

            <button>Desactivar alerta</button>
          </li>
          <li>
            {copied.setCopied ? (
              <div class="green-fill">
                {' '}
                <DouveryCheckMark size="15px" />
              </div>
            ) : (
              <DouveryCopyText size="15px" />
            )}
            <input
              type="text"
              class="input-url-copy"
              placeholder={loc.url.origin + '/v/' + product.dui}
              disabled
              onClick$={() => {
                copyToClipboard(loc.url.origin + '/v/' + product.dui);
                copied.setCopied = true;
                setTimeout(() => {
                  copied.setCopied = false;
                }, 2000);
              }}
            />
            <button
              onClick$={() => {
                copyToClipboard(loc.url.origin + '/v/' + product.dui);
                copied.setCopied = true;
                setTimeout(() => {
                  copied.setCopied = false;
                }, 2000);
              }}
            >
              <div class={copied.setCopied ? 'green text-copy' : 'text-copy'}>
                {copied.setCopied ? 'Url copiada' : 'Copiar url'}
              </div>
            </button>
          </li>
        </ul> :<>
        <ul>
           <li>
            <strong>Cambiar fecha de {product.dui}</strong>
          </li>
          
           <div class="card">
  <label for="reminder-date" class="form-label">Seleccionar fecha para recordatorio:</label>
  <input required type="date" id="reminder-date" name="reminder-date" onChange$={(e) => {
    reminderDate.setReminderDate = new Date(e.target.value).getTime();
    dateSelected.setDateSelected = true;
  }} class="form-input"/>
</div>
<li>
  <div class="ctr-button-modal">
    <button class='button-agg' onClick$={async () => {
      if (!dateSelected.setDateSelected) {
        return;
      }

      try {
        const response = await fetch(
          `${urlServerLocal}/api/update-future-purchase`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId:'62ab8396cc6a45ab9c1b3a69',
              dui: product.dui,
              newReminderDate: reminderDate.setReminderDate,                  
            }),
          }
        );

        if (response.status === 400) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.msg);
        }
        showDatePicker.setShowDatePicker= false;
        isOpen.setIsOpen=true;
        nav('/v/cart')
      } catch (error: any) {
        console.error(error);
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Error: ' + error.message;
      }
    }}>
      Cambiar
    </button>
  </div>

</li>
</ul></>
         } </>: 
        <ul>
            <li>
            <strong>Un momento...</strong>
          </li>
            <li>
           <div class="loader">
        </div>
          </li></ul>
       } 
      </details>
    </div>
  );
});
