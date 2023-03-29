import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div class="container">
        <p>
          Selecciona o agrega una dirección de envío para continuar con tu
          pedido.
        </p>
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
