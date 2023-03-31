import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './view-address-existing.css?inline'
export const ViewAddressExisting = component$(({state}:any) => {
    useStylesScoped$(styles)
  return <div>   <form>
  <div class="options">
    {state.results[0] !== '' ? (
      state.results.map((item:any, i:any) => {
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
      })
    ) : (
      <p>
        No hay <strong>Direcciones existentes</strong> disponibles
      </p>
    )}
  </div>
  <button type="submit">Enviar</button>
</form></div>
});