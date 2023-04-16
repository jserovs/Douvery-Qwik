import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { ConsentLocation } from '../../components/ConsentLocation/consent-location';
import styles from './view-address-new.css?inline';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { urlServerNode } from '~/services/fechProduct';

export const useAggAddress = globalAction$(
  async (
    {
      name,
      addressLine1,
      addressLine2,
      street,
      city,
      states,
      postalCode,
      locationType,
      country,
      isPrimary,
    },
    { fail, headers, cookie }
  ) => {
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const data = await fetch(`${urlServerNode}/api/save-user-address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },

      body: JSON.stringify({
        userId: user.id,
        address: {
          name: name,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          street: street,
          city: city,
          state: states,
          zip: postalCode,
          locationType: locationType,
          country: country,
          isPrimary: isPrimary == 'true' ? true : false,
        },
      }),
    });

    const dataAccess = await data.json();

    if (!data.ok || !dataAccess) {
      const errorMessage = 'Something went wrong. Please try again later.';
      console.error('Error:', errorMessage); // log the error to the console for debugging
      return fail(400, {
        message:
          errorMessage || 'Something went wrong. Please try again later.',
      });
    }

    headers.set('location', '/by/segure/pay/' + dataAccess.index + '/');
  },
  zod$({
    name: z
      .string()
      .min(4, 'Upps! Your name is too short')
      .max(15, 'upps! Your name is too long')
      .nonempty('Full name is required'),
    addressLine1: z.string().nonempty('Address line 1 is required'),
    addressLine2: z.string(),
    city: z.string().nonempty('City is required'),
    street: z.string().nonempty('Street is required'),
    states: z.string().nonempty('State/Province is required'),
    postalCode: z.string().nonempty('Postal code is required'),
    locationType: z.string().nonempty('Location type is required'),
    country: z.string().nonempty('Country is required'),
    isPrimary: z.string().default('false'),
  })
);

export const ViewAddressNew = component$(
  ({
    addressLine1,
    addressLine2,
    city,
    states,
    postalCode,
    country,
    street,
    locationType,
  }: any) => {
    useStylesScoped$(styles);
    const action = useAggAddress();
    const isPrimary = useStore({ setIsPrimary: false });

    return (
      <div>
        <Form action={action} class="form-address-new">
          <div class="container-content">
            <label for="name">Nombre & Apellido</label>
            <input type="text" id="name" name="name" required />
            {action.value?.fieldErrors?.name && (
              <span class="error">{action.value?.fieldErrors?.name}</span>
            )}
            <label for="addressLine1">Dirección línea 1:</label>
            <input
              value={addressLine1.setAddressLine1}
              type="text"
              id="addressLine1"
              name="addressLine1"
              required
            />
            {action.value?.fieldErrors?.addressLine1 && (
              <span class="error">
                {action.value?.fieldErrors?.addressLine1}
              </span>
            )}
            <label for="addressLine2">Dirección línea 2 (opcional):</label>
            <input
              value={addressLine2.setAddressLine2}
              type="text"
              id="addressLine2"
              name="addressLine2"
            />
            <label for="street">Calle:</label>
            <input
              value={street.setStreet}
              type="text"
              id="street"
              name="street"
              required
            />
            {action.value?.fieldErrors?.street && (
              <span class="error">{action.value?.fieldErrors?.street}</span>
            )}
            <label for="city">Ciudad:</label>
            <input
              value={city.setCity}
              type="text"
              id="city"
              name="city"
              required
            />

            <label for="states">Estado/Provincia:</label>
            <input
              value={states.setState}
              type="text"
              id="states"
              name="states"
              required
            />
            {action.value?.fieldErrors?.states && (
              <span class="error">{action.value?.fieldErrors?.states}</span>
            )}
            <label for="postalCode">Código postal:</label>
            <input
              value={postalCode.setPostalCode}
              type="text"
              id="postalCode"
              name="postalCode"
              required
            />
            {action.value?.fieldErrors?.postalCode && (
              <span class="error">{action.value?.fieldErrors?.postalCode}</span>
            )}
            <label for="locationType">Tipo de lugar:</label>
            <select
              value={locationType.setLocationType}
              id="locationType"
              name="locationType"
              required
            >
              <option value="">Tipo de location</option>
              <option value="Residential">Residential</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
            {action.value?.fieldErrors?.locationType && (
              <span class="error">
                {action.value?.fieldErrors?.locationType}
              </span>
            )}
            <label for="country">País:</label>
            <select
              value={country.setCountry}
              id="country"
              name="country"
              required
            >
              <option value="">Seleccionar país</option>
              <option value="us">Estados Unidos</option>
              <option value="es">España</option>
              <option value="mx">México</option>
              <option value="ar">Argentina</option>
              <option value="do">Republica Dominicana</option>
            </select>
            {action.value?.fieldErrors?.country && (
              <span class="error">{action.value?.fieldErrors?.country}</span>
            )}
            <div class="checkbox-wrapper-42">
              <input
                type="checkbox"
                id="isPrimary"
                name="isPrimary"
                value={isPrimary.setIsPrimary ? 'true' : 'false'}
                onClick$={() =>
                  (isPrimary.setIsPrimary = !isPrimary.setIsPrimary)
                }
              />
              <label class="cbx" for="isPrimary"></label>
              <label class="lbl" for="isPrimary">
                Seleccionar como dirección principal.{' '}
              </label>
            </div>

            <div class="container-button-send">
              <p>FInalizar: </p>
              <button type="submit" class="button-address-new">
                {action.isRunning
                  ? 'Loading...'
                  : action.value?.message
                  ? 'Error'
                  : 'Create address'}
              </button>
            </div>
            {action.value?.message && (
              <div>
                {' '}
                <br />
                {action.isRunning ? (
                  <span class="loa-s">Verifying...</span>
                ) : (
                  <span class="error ">{action.value?.message}</span>
                )}
                <div class="form-group need-account">
                  ¿Crees que presenta un error al crear?
                  <a href="/a/" class="forgot-new-account-link">
                    Reportar
                  </a>
                </div>{' '}
                <br />
              </div>
            )}
            {action.isRunning && (
              <span class="error">{action.value?.fieldErrors?.country}</span>
            )}
          </div>

          <ConsentLocation
            country={country}
            states={states}
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            city={city}
            postalCode={postalCode}
          />
        </Form>
      </div>
    );
  }
);
