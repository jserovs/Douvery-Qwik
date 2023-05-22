import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import { DocumentHead } from '@builder.io/qwik-city';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div class="container-box">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 17.91C23.02 18.66 22.82 19.37 22.46 19.98C22.26 20.34 21.99 20.6701 21.69 20.9401C21 21.5801 20.09 21.9701 19.08 22.0001C17.62 22.0301 16.33 21.2801 15.62 20.1301C15.24 19.5401 15.01 18.8301 15 18.0801C14.97 16.8201 15.53 15.6801 16.43 14.9301C17.11 14.3701 17.97 14.0201 18.91 14.0001C21.12 13.9501 22.95 15.7 23 17.91Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.44 18.03L18.45 18.99L20.54 16.97"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.17004 7.43994L12 12.5499L20.77 7.46991"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 21.6099V12.5399"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.61 9.17V14.83C21.61 14.88 21.61 14.92 21.6 14.97C20.9 14.36 20 14 19 14C18.06 14 17.19 14.33 16.5 14.88C15.58 15.61 15 16.74 15 18C15 18.75 15.21 19.46 15.58 20.06C15.67 20.22 15.78 20.37 15.9 20.51L14.07 21.52C12.93 22.16 11.07 22.16 9.92999 21.52L4.59 18.56C3.38 17.89 2.39001 16.21 2.39001 14.83V9.17C2.39001 7.79 3.38 6.1502 4.59 5.44002L9.92999 2.48C11.07 1.84 12.93 1.84 14.07 2.48L19.41 5.44002C20.62 6.1502 21.61 7.79 21.61 9.17Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="box-title">Mis ordenes</div>
      </div>
      <div class="container-box">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 10H22"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.5483 20.4998H6.43829C2.88829 20.4998 1.98828 19.6198 1.98828 16.1098V7.88977C1.98828 4.70977 2.72831 3.68977 5.51831 3.52977C5.79831 3.51977 6.10829 3.50977 6.43829 3.50977H17.5483C21.0983 3.50977 21.9983 4.38977 21.9983 7.89977V12.3098"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 16H10"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 18C22 18.75 21.79 19.46 21.42 20.06C20.73 21.22 19.46 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 15.79 15.79 14 18 14C20.21 14 22 15.79 22 18Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.4414 17.9995L17.4314 18.9895L19.5614 17.0195"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="box-title">Compras</div>
      </div>{' '}
      <div class="container-box">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.1399 2.58991L15.5099 6.21991C15.3699 6.35991 15.2299 6.62991 15.2099 6.82991L15.0099 8.21991C14.9399 8.71991 15.2899 9.06991 15.7899 8.99991L17.1799 8.79991C17.3699 8.76991 17.6499 8.63991 17.7899 8.49991L21.4199 4.86991C22.0499 4.23991 22.3399 3.51991 21.4199 2.59991C20.4899 1.65991 19.7699 1.95991 19.1399 2.58991Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.6201 3.11011C18.9301 4.21011 19.7901 5.07011 20.8901 5.38011"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.66992 18.9501L7.59992 15.6401C8.38992 15.1101 9.52992 15.1701 10.2399 15.7801L10.5699 16.0701C11.3499 16.7401 12.6099 16.7401 13.3899 16.0701L17.5499 12.5001C18.3299 11.8301 19.5899 11.8301 20.3699 12.5001L21.9999 13.9001"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="box-title">Cambiar foto de perfil</div>
      </div>{' '}
      <div class="container-box">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V11.5"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.21 14.77L15.6701 18.31C15.5301 18.45 15.4 18.71 15.37 18.9L15.18 20.25C15.11 20.74 15.45 21.0801 15.94 21.0101L17.29 20.82C17.48 20.79 17.75 20.66 17.88 20.52L21.4201 16.9801C22.0301 16.3701 22.3201 15.6601 21.4201 14.7601C20.5301 13.8701 19.82 14.16 19.21 14.77Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.7001 15.28C19.0001 16.36 19.8401 17.2 20.9201 17.5"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="box-title">Cambiar correo</div>
      </div>{' '}
      <div class="container-box">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.0501 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.98 6.79001V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.60001 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.0501 6.04004 6.04001C6.27004 3.35001 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.60001 21.98 6.79001Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.4955 13.25H13.5045"
            stroke="#0d47a1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.9955 13.25H10.0045"
            stroke="#0d47a1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.4955 13.25H6.5045"
            stroke="#0d47a1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="box-title">Servicio al cliente</div>
      </div>{' '}
      <div class="container-box">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="box-title">Mi Perfil</div>
      </div>{' '}
      <div class="container-box">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.49 2.23006L5.50003 4.1506C4.35003 4.54006 3.4503 5.90006 3.4503 7.12006V14.5501C3.4503 15.7301 4.19003 17.2801 5.14003 17.9901L9.44003 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.9901C19.83 17.2801 20.61 15.7301 20.61 14.5501V7.12006C20.61 5.89006 19.67 4.53006 18.52 4.5006L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.05005 11.8701L10.66 13.4801L14.96 9.18005"
            stroke="#0d47a1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="box-title">Servicios</div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Configuración de Cuenta - Douvery',
  meta: [
    {
      name: 'description',
      content: 'Administra tu cuenta en Douvery. Configura tus preferencias, actualiza tu información y gestiona tus compras de manera segura y confiable.',
    },
  ],
};