import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/crtr-description-gpt.css?inline';
export const ContainerDescriptionGPT = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="crrtr-srtrt">
      <h5>Descripcion minima</h5>
      <p>
        {' '}
        What Every Body Is Saying es un libro escrito por un ex agente del FBI,
        Joe Navarro, que ofrece una guía para descifrar los lenguajes corporales
        y la comunicación no verbal. El libro explora cómo las personas
        transmiten sus pensamientos y emociones a través de sus gestos, posturas
        y expresiones faciales, y ofrece estrategias para leer y interpretar
        estos mensajes inconscientes. La intención es mejorar la capacidad de
        observación y comprensión de los demás, tanto en situaciones
        profesionales como personales.
      </p>
    </div>
  );
});
