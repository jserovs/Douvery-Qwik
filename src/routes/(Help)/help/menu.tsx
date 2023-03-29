import { component$,  } from '@builder.io/qwik';
import {  useLocation } from '@builder.io/qwik-city';

export default component$(() => {
 
  const { url } = useLocation();
  const menuData = [
    {
      text: 'Inicio',
      href: '/'
    },
    {
      text: 'Servicios',
      items: [
        {
          text: 'Diseño Web',
          href: '/servicios/diseño-web'
        },
        {
          text: 'Marketing Digital',
          href: '/servicios/marketing-digital'
        },
        {
          text: 'Desarrollo de Aplicaciones',
          href: '/servicios/desarrollo-aplicaciones'
        }
      ]
    },
    {
      text: 'Acerca de',
      href: '/acerca-de'
    },
    {
      text: 'Contacto',
      href: '/contacto'
    }
  ];
  
  return (
    <div class="menu">
        
      {menuData
        ? menuData.map((item) => (
            <div key={item.text}>
              <h5>{item.text}</h5>
              {item.items && (
                <ul>
                  {item.items.map((subitem) => (
                    <li key={subitem.text}>
                      <a
                        href={subitem.href}
                        class={{
                          'is-active': url.pathname === subitem.href,
                        }}
                      >
                        {subitem.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        : null}
    </div>
  ) });