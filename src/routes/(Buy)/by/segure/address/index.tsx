import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
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
            <label for="calle1" class="option">
              <input type="radio" name="direccion" id="calle1" value="calle1" />
              <span>Calle Los Almendros, 237, 4ºB 28045 Madrid, España</span>
            </label>
            <label for="calle2" class="option">
              <input type="radio" name="direccion" id="calle2" value="calle2" />
              <span>
                Avenida de las Flores, 568, Casa 12 03410 San José, Costa Rica
              </span>
            </label>
            <label for="calle3" class="option">
              <input type="radio" name="direccion" id="calle3" value="calle3" />
              <span>
                Rua dos Girassóis, 179, Apt. 301 04567-010 São Paulo, Brasil
              </span>
            </label>
            <label for="calle4" class="option">
              <input type="radio" name="direccion" id="calle4" value="calle4" />
              <span>
                Camino del Mar, 3840, Torre B, Piso 7, Depto. 2 1102 Buenos
                Aires, Argentina
              </span>
            </label>
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
