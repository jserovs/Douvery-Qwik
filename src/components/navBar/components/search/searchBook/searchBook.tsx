import { component$, useStylesScoped$ } from '@builder.io/qwik';

import { IconsSearch } from '~/components/icons/search';

import styles from './searchBook.css?inline';

export const SearchBooksDouvery = component$(({ is }: any) => {
  useStylesScoped$(styles);

  return (
    <>
      <form class="search" action={'/s/'}>
        <div class="searchTerm">
          <div class="select ">
            <select value={'Books'} name="or-c">
              <option value="Books">Books</option>
            </select>
          </div>

          <input
            name="q"
            type="text"
            class="searchTerm"
            placeholder="Busca tu libros favorito"
            onClick$={() => (is.setIsOpen = true)}
          />

          <button aria-label="button-search" type="submit" class="searchButton">
            <div class="searc">
              {' '}
              <IconsSearch />
            </div>
          </button>
        </div>
      </form>
    </>
  );
});
