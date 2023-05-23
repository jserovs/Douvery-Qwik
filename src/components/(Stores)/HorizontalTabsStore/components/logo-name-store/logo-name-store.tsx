import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { DouveryIconVerifyBrand } from '~/components/icons/verify';
import styles from './logo-name-store.css?inline';
export const LogoNameStore = component$(({ state }: any) => {
    useStylesScoped$(styles);
    const loc = useLocation();
    return <div class="logo">
        <img src={state.store.design.logo} alt="" />
        <a
            href={
                '/' +
                loc.params.name +
                '/' +
                'state-' +
                loc.params.id +
                '/h'
            }
        >
            Douvery
        </a>
        <DouveryIconVerifyBrand size="20" />
    </div>
});