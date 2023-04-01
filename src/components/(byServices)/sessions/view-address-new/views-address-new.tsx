import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ConsentLocation } from '../../components/ConsentLocation/consent-location';
import styles from './view-address-new.css?inline';
import { globalAction$, z, zod$ } from '@builder.io/qwik-city';
import { urlServerNode } from '~/services/fechProduct';

export const useRegister = globalAction$(
  async (
    { name, lastName, email, password },
    { fail, headers, cookie, url }
  ) => {
    const data = await fetch(`${urlServerNode}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        receiveGmail: false,
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
    name: z
      .string({
        required_error: 'Full name is required',
      })
      .min(4, {
        message: 'Upps! Your name is too short',
      })
      .max(15, {
        message: 'upps! Your name is too long',
      }),
    lastName: z
      .string({
        required_error: 'Full name is required',
      })
      .min(5, {
        message: 'Upps! Your name is too short',
      })
      .max(25, {
        message: 'upps! Your name is too long',
      }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Please enter a valid email',
      }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, {
        message: 'Password must be at least 6 characters',
      })
      .max(25, {
        message: 'Password must be less than 25 characters',
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message:
          'Password must contain at least six characters, including at least 1 letter and 1 number',
      }),
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
    return (
      <div>
        <form class="form-address-new">
          <div class="container-content">
            <label for="nombre">Nombre & Apellido</label>
            <input type="text" id="nombre" name="nombre" required />

            <label for="direccion1">Dirección línea 1:</label>
            <input
              value={addressLine1.setAddressLine1}
              type="text"
              id="direccion1"
              name="direccion1"
              required
            />

            <label for="direccion2">Dirección línea 2 (opcional):</label>
            <input
              value={addressLine2.setAddressLine2}
              type="text"
              id="direccion2"
              name="direccion2"
              required
            />
            <label for="street">Calle:</label>
            <input
              value={street.setStreet}
              type="text"
              id="street"
              name="street"
              required
            />

            <label for="ciudad">Ciudad:</label>
            <input
              value={city.setCity}
              type="text"
              id="ciudad"
              name="ciudad"
              required
            />

            <label for="estado">Estado/Provincia:</label>
            <input
              value={states.setState}
              type="text"
              id="estado"
              name="estado"
              required
            />

            <label for="codigo_postal">Código postal:</label>
            <input
              value={postalCode.setPostalCode}
              type="text"
              id="codigo_postal"
              name="codigo_postal"
              required
            />
            <label for="pais">País:</label>
            <select
              value={locationType.setLocationType}
              id="locationType"
              name="locationType"
              required
            >
              <option value="">Seleccionar país</option>
              <option value="es">España</option>
              <option value="mx">México</option>
              <option value="ar">Argentina</option>
              <option value="Dominican Republic">Republica Dominicana</option>
            </select>

            <label for="pais">País:</label>
            <select value={country.setCountry} id="pais" name="pais" required>
              <option value="">Seleccionar país</option>
              <option value="es">España</option>
              <option value="mx">México</option>
              <option value="ar">Argentina</option>
              <option value="Dominican Republic">Republica Dominicana</option>
            </select>

            <div class="container-button-send">
              <p>FInalizar: </p>
              <button type="submit" class="button-address-new">
                Enviar
              </button>
            </div>
          </div>

          <ConsentLocation
            country={country}
            states={states}
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            city={city}
            postalCode={postalCode}
          />
        </form>
      </div>
    );
  }
);
