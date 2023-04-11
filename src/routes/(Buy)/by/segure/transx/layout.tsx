import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';

export default component$(() => {
  useStylesScoped$(`
   main {
      background-color: var(--color-background-white);
    padding:3rem;
    margin-top: 0.5px;
   
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(35, 85, 161, 0.027) 0px 0px 0px 1px;
  
 
    }
   
  `);
  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
