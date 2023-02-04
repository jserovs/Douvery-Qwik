import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/topEtiqProduct.css?inline';

export const ContainerEtiqTopProduct = component$(({ title, Bcolors }: any) => {
  useStylesScoped$(styles);

  return <div style={`background:${Bcolors}`}>{title}</div>;
});
