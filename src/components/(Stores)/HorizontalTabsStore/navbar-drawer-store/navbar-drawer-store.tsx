import {
    $,
    component$,
    useOnWindow,
    useStore,
    useStylesScoped$,
} from '@builder.io/qwik';
import styles from './navbar-drawer-store.css?inline';

import { DouveryMenuHamb } from '~/components/icons/menu';
import { NavbarStore } from '../components/navbar-store/navbar-store';
export const NavBarDrawerStore = component$(({ state }: any) => {
    useStylesScoped$(styles);
    const store = useStore({
        isNavOpen: false,
        isOpen: false,
        windowWidth: 769,
    });

    useOnWindow(
        'load',
        $(() => {
            store.windowWidth = window.innerWidth;
        })
    );

    useOnWindow(
        'resize',
        $(() => {
            store.windowWidth = window.innerWidth;
            if (store.windowWidth > 768) {
                store.isNavOpen = false;
                store.isOpen = false;
                document.body.style.overflow = 'auto';
            }
        })
    );

    const handleToggle = $(() => {
        store.isNavOpen = !store.isNavOpen;
        store.isOpen = !store.isOpen;
        document.body.style.overflow = store.isOpen ? 'hidden' : 'auto';
    });

    return (
        <>
            <nav>
                {!store.isNavOpen && store.windowWidth <= 768 ? (
                    <div id="nav-container">
                        <button
                            class="nav-open"
                            aria-label="Open Menu"
                            onClick$={handleToggle}
                        >
                            <DouveryMenuHamb />

                        </button>

                    </div>
                ) : (
                    ''
                )}

                {store.isNavOpen && store.windowWidth <= 768 ? (
                    <div id="nav-container">
                        <button
                            class="nav-open"
                            aria-label="Open Menu"
                            onClick$={handleToggle}
                        >
                            <DouveryMenuHamb />

                        </button>

                    </div>
                ) : (
                    ''
                )}
            </nav>
            <div class={`sidebar ${store.isOpen ? 'open' : ''}`}>
                {store.isOpen && store.windowWidth <= 768 ? (
                    <>
                        <NavbarStore state={state} />
                    </>
                ) : (
                    ''
                )}
            </div>
            <ul class={store.windowWidth > 768 ? 'open' : ''}>
                {store.windowWidth > 768 ? (
                    <div class="container-no-navbar-page-laptop">
                        <NavbarStore state={state} />
                    </div>
                ) : (
                    ''
                )}
            </ul>
            <div
                class={`overlay ${store.isOpen ? 'open' : ''}`}
                onClick$={handleToggle}
            ></div>
        </>
    );
});
