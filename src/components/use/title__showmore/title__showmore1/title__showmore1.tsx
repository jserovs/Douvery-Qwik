import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './title__showmore1.css?inline';
export const Title__showmore1 = component$(
  ({ title, titleLink, link }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="title-show">
        <h2>{title} </h2>
        <div class="show-more">
          {' '}
          <a href={link}> {titleLink ? titleLink : 'Ver mas'} </a>
        </div>
      </div>
    );
  }
);
