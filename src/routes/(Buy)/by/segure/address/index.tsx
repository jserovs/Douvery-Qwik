import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { fetchAddressUser } from '~/services/user/address/address';
import { useGetCurrentUser } from '~/routes/layout';

interface IStateResult {
  results: string[];
}
export default component$(() => {
  useStylesScoped$(styles);
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
            {state.results.map((item, i) => {
              return (
                <label key={i} class="option">
                  <input
                    type="radio"
                    name="calle"
                    id={`calle${i}`}
                    value={item}
                  />
                  <span>{item}</span>
                </label>
              );
            })}
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
            <input type="text" id="direccion1" name="direccion1" required />

            <label for="direccion2">Dirección línea 2 (opcional):</label>
            <input type="text" id="direccion2" name="direccion2" required />

            <label for="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" name="ciudad" required />

            <label for="estado">Estado/Provincia:</label>
            <input type="text" id="estado" name="estado" required />

            <label for="codigo_postal">Código postal:</label>
            <input
              type="text"
              id="codigo_postal"
              name="codigo_postal"
              required
            />

            <label for="pais">País:</label>
            <select id="pais" name="pais" required>
              <option value="">Seleccionar país</option>
              <option value="es">España</option>
              <option value="mx">México</option>
              <option value="ar">Argentina</option>
            </select>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
});
