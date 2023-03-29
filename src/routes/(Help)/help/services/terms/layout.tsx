import { component$, Slot } from '@builder.io/qwik';
import Nav from '~/components/nav/nav';
import Menu from '../../menu';


export default component$(() => {
  return (
    
    <main>
   
    <article>
            <Slot />
          </article>
     
    </main>
  );
});