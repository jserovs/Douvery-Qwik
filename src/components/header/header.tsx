import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './header.css?inline';
import { DouveryLogo } from '../icons/logo';
import { DouveryUser } from '../icons/user';
import { DouveryCart } from '../icons/cart';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="container container-cajas-header ">
        <div class="cajas">
          <a href="/" class="logo" aria-label="Douvery">
            <DouveryLogo />
          </a>
        </div>
        <div class="cajas">
          <div class="search">
            <form class="searchTerm">
              <div class="select">
                <select>
                  <option value="1">All</option>
                  <option value="2">No JS</option>
                  <option value="3">Nice!</option>
                  <svg
                    fill="#000000"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                    <path d="M0-.75h24v24H0z" fill="none" />
                  </svg>
                </select>
              </div>
              <input
                type="text"
                class="searchTerm"
                placeholder="Busca tu aticulos ... "
              />

              <button
                aria-label="button-search"
                name="button-search"
                type="submit"
                id="button-search"
                class="searchButton"
              >
                <div class="">
                  {' '}
                  <svg
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                      fill="#9E9E9E"
                    />
                  </svg>
                </div>
              </button>
            </form>
          </div>
        </div>
        <div class="cajas">
          <div class="main">
            <a href="/cart" class="user">
              <DouveryCart />
              <div class="badget-circle">1</div>
            </a>
            <DouveryUser />
            <div class="cuenta_botom">
              <a class="title-desplg" href="/signin">
                <span class="wl-hi">¡Hola! </span>
                <h4 class="pointer">Registrate</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
