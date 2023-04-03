import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { TextCL } from '~/components/use/textCL/textCL';
import styles from './address-chosen-one.css?inline';
import { Link } from '@builder.io/qwik-city';
export const AddressChosenOne = component$(({ state }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div>
        <div class="container-title">
          <p>Dirección seleccionada</p>
        </div>
        <TextCL text={state.address.state} /> , {state.address.city} ,
        {state.address.zip} , <TextCL text={state.address.country} />{' '}
      </div>
      <div class="container-edit-address">
        {' '}
        <Link href="/by/segure/address/">Editar</Link>
      </div>
    </div>
  );
});
