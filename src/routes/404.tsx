import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
export default component$(() => {
    useStylesScoped$(styles);
    return <div class="error-container">
        <h1 class="error-code">404</h1>
        <p class="error-message">Lo sentimos, la página que estás buscando no existe</p>
        <a href="/" class="home-link">Volver a Inicio</a>
    </div>
});

