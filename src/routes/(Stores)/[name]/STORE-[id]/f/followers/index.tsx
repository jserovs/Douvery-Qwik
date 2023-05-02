import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { fetchStoreFollowers } from '~/services/store/store';
import type { UserACC } from '~/utils/types';
import styles from './index.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { DouveryIconVerifyBrand } from '~/components/icons/verify';
export default component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();

  const prodcureducer = useResource$<UserACC[]>(async ({ cleanup, track }) => {
    track(() => loc.params.id);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return fetchStoreFollowers(loc.params.id, controller);
  });

  return (
    <div class="container-all">
      {' '}
      <Resource
        value={prodcureducer}
        onPending={() => <div class="loader"></div>}
        onRejected={() => (
          <>
            Al parecer, hay un error en la solicitud. Por favor, actualiza la
            página para verificar nuevamente.
          </>
        )}
        onResolved={(data) => (
          <>
            {' '}
            {data.length === 0 ? (
              <p>No hay productos para mostrar.</p>
            ) : (
              <ul>
                <div class="container-title">
                  <h1>Followers of {loc.params.name}</h1>
                </div>
                {data.map((user: any) => (
                  <>
                    <li key={user.id}>
                      {user.private ? (
                        <div class="container-user">
                          <div class="container-user-img">
                            <img
                              src={
                                'https://res.cloudinary.com/douvery/image/upload/v1676455557/LOGO/pextqnkczqsjnetewywn.webp'
                              }
                              alt={'private user'}
                            />
                          </div>
                          <div class="container-user-info">
                            <h2>
                              <TextCL text={'Private user'} />
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <div class="container-user">
                          <div class="container-user-img">
                            <img
                              src={
                                user.avatar
                                  ? user.avatar
                                  : 'https://res.cloudinary.com/douvery/image/upload/v1676456401/LOGO/z7neu6qunez6ygx9xxho.webp'
                              }
                              alt={user.name}
                            />
                          </div>
                          <div class="container-user-info">
                            <h2>
                              <TextCL text={user.name} /> {user?.lastname}
                            </h2>
                            {user.itsDouvery && (
                              <>
                                <DouveryIconVerifyBrand size="18" />
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </li>
                  </>
                ))}
              </ul>
            )}
          </>
        )}
      />
    </div>
  );
});
