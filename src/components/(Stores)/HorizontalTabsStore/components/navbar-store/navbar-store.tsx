import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

import { replaceSpacesWithPlus } from '~/services/fuction';
import styles from './navbar-store.css?inline';
import { LogoNameStore } from '../logo-name-store/logo-name-store';
export const NavbarStore = component$(({ state }: any) => {
    useStylesScoped$(styles);
    const loc = useLocation();
    return <nav class="navbar">
        <LogoNameStore state={state} />
        <ul class="nav-links">
            {state.store.topSubCategories?.map((categories: string | number | null | undefined, i: string | number | null | undefined) => (
                <li
                    key={i}
                    class={`tabs-nav ${replaceSpacesWithPlus(loc.url.pathname) ===
                        '/' +
                        loc.params.name +
                        '/' +
                        'STORE-' +
                        loc.params.id +
                        '/c' +
                        '/' +
                        categories +
                        '/'
                        ? 'tabs-nav-active'
                        : ''
                        }`}
                >
                    <Link
                        href={
                            '/' +
                            loc.params.name +
                            '/' +
                            'STORE-' +
                            loc.params.id +
                            '/c' +
                            '/' +
                            categories
                        }
                    >
                        {categories}
                    </Link>
                </li>
            ))}
        </ul>


        <div class="nav-search-cart-login">
            <input
                disabled
                type="text"
                placeholder="Búsqueda"
                class="nav-search"
            />
        </div>
    </nav>
});