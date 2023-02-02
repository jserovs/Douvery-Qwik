import { component$ } from '@builder.io/qwik';

export default component$(({ suggestions, onSelect }: any) => {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      {suggestions.map((suggestion: any) => (
        <li
          key={suggestion}
          style={{ padding: 10, cursor: 'pointer' }}
          onClick$={() => onSelect == suggestion}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
});
