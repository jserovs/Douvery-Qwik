import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { fetchAddressUser } from '~/services/user/address/address';
import { useGetCurrentUser } from '~/routes/layout';
import { ConsentLocation } from '~/components/(byServices)/components/ConsentLocation/consent-location';

interface IStateResult {
  results: string[];
}
export default component$(() => {
  useStylesScoped$(styles);
  const country = useStore({ setCountry: '' });
  const states = useStore({ setState: '' });
  const addressLine1 = useStore({ setAddressLine1: '' });
  const addressLine2 = useStore({ setAddressLine2: '' });
  const city = useStore({ setCity: '' });
  const postalCode = useStore({ setPostalCode: '' });
  const userACC = useGetCurrentUser().value;
  const state = useStore<IStateResult>({
    results: [],
  });

  useTask$(async ({ track }) => {
    track(() => '');

    const controller = new AbortController();
    state.results = await fetchAddressUser(`${userACC?.id}`, controller);

    return () => {
      controller.abort();
    };
  });
  return (
    <div class="container-all">
      <div class="container-address">
        <div class="container-header">
          <p>
            Selecciona o agrega una dirección de envío para continuar con tu
            pedido.
          </p>
          <p></p>
        </div>

        <div class="container-addresses-existing">
          <p>Direcciones existentes:</p>
          <p></p>
        </div>
        <form>
          <div class="options">
            {state.results[0] !== '' ? (
              state.results.map((item, i) => {
                return (
                  <label key={i} class="option">
                    {i}
                    <input
                      type="radio"
                      name="calle"
                      id={`calle${i}`}
                      value={item}
                    />
                    <span>{item}</span>
                  </label>
                );
              })
            ) : (
              <p>
                No hay <strong>Direcciones existentes</strong> disponibles
              </p>
            )}
          </div>
          <button type="submit">Enviar</button>
        </form>

        <div class="titulo-centrado">
          <div class="linea"></div>
          <p>Crear nueva direccion</p>
          <div class="linea"></div>
        </div>
        <form>
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
            <select value={country.setCountry} id="pais" name="pais" required>
              <option value="">Seleccionar país</option>
              <option value="es">España</option>
              <option value="mx">México</option>
              <option value="ar">Argentina</option>
              <option value="Dominican Republic">Republica Dominicana</option>
            </select>
            <div class="container-button-send">
              <p>FInalizar: </p>
              <button type="submit">Enviar</button>
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
    </div>
  );
});
