import { component$, useStylesScoped$ } from '@builder.io/qwik';

export const BottonDisable = component$(() => {
  useStylesScoped$(`
   button {
     background-color: #fff;
    border: 1px solid #d5d9d9;
    border-radius: 8px;
    box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
    box-sizing: border-box;
    color: #0f1111;
    display: inline-block;
      
    font-size: 13px;
    line-height: 35px;
    padding: 0 10px 0 11px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    width: 100%;
    cursor: not-allowed;
    opacity: .5;
     }

   
  `);
  return (
    <>
      <button disabled={true}>NO DISPONIBLE</button>
    </>
  );
});
