import { $, component$, useOnWindow, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './navBar-drawer.css?inline';
import { NavBarVertical } from '../navBar-vertical/navBar-vertical';
export const NavBarDrawer = component$(() => {
    useStylesScoped$(styles);
    const store = useStore({
        isNavOpen: false,
        isOpen: false,
        windowWidth: 0,
    });

    useOnWindow(
        "load",
        $(() => {
            store.windowWidth = window.innerWidth;
        })
    );

    useOnWindow(
        "resize",
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
                {/* Open Button */}
                {!store.isNavOpen && store.windowWidth <= 768 ? (
                    <button
                        class="nav-open"
                        aria-label="Open Menu"
                        onClick$={handleToggle}
                    >
                        abrir
                    </button>
                ) : (
                    ""
                )}
                {/* Close Button */}
                {store.isNavOpen && store.windowWidth <= 768 ? (
                    <button
                        class="nav-close"
                        aria-label="Close Menu"
                        onClick$={handleToggle}
                    >
                        cerrar
                    </button>
                ) : (
                    ""
                )}
            </nav>
            <div class={`sidebar ${store.isOpen ? 'open' : ''}`}>
                {store.isOpen && store.windowWidth <= 768 ? (
                    <>
                        {/* Menu */}
                        <NavBarVertical />
                    </>
                ) : (
                    ""
                )}
            </div>
            <ul class={store.windowWidth > 768 ? "open" : ""}>
                {store.windowWidth > 768 ? (
                    <>
                        <NavBarVertical />

                    </>
                ) : (
                    ""
                )}
            </ul>
            <div class={`overlay ${store.isOpen ? 'open' : ''}`} onClick$={handleToggle}></div>


        </>
    )
});