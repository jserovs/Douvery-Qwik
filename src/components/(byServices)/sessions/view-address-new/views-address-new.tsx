import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ConsentLocation } from '../../components/ConsentLocation/consent-location';
import styles from './view-address-new.css?inline'
export const ViewAddressNew = component$(({addressLine1,addressLine2,city,states,postalCode,country}:any) => {
    useStylesScoped$(styles)
  return <div>
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
      <button type="submit" class="button-address-new">Enviar</button>
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
</form></div>
});