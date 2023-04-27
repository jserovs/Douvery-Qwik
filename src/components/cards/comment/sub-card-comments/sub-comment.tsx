import styles from './sub-comment.css?inline';

import { component$, useStylesScoped$ } from '@builder.io/qwik';

import { SubCommentsBoxUser } from './box-user/sub-comments-box-user';

export const CardSubComment = component$(
  ({ name_lastname, avatar, comment, purchase, time }: any) => {
    useStylesScoped$(styles);

    return (
      <div class="comments-box">
        <SubCommentsBoxUser
          name_lastname={name_lastname}
          avatar={avatar}
          purchase={purchase}
          time={time}
        />

        <p>{comment}</p>
        <br />
      </div>
    );
  }
);
