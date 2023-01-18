import { component$, useStore } from '@builder.io/qwik';

export const Card = component$(({ prop }) => {
    const editable= useStore({setEditable:false});
  const handleClick = () => {
    Card.setEditable(!editable);
  };
  return <div
      class="
        flex
        justify-center
        text-3xl md:text-7xl 
        p-6 w-50 h-50 bg-slate-300 md:p-10 md:w-60 md:h-60 md:bg-green-300
        items-center
        drop-shadow-md	
        rounded-md"
    >
      <div onClick={handleClick} class="flex">
        <div class={editable ? 'opacity-0' : 'opacity-800'}>{prop}</div>
        <div class="text-sm cursor-pointer text-gray-500">{editable ? 'close | update' : 'edit'}</div>

        <input class="text-sm w-15 bg-slate-100" type={!editable && "hidden"} value={prop} />
      </div>
    </div>
});