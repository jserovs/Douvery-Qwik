import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-desc-short.css?inline';
import { ContainerDescription } from './crtr-description';
export const ContainerDescriptionShort = component$(({ props }: any) => {
  useStylesScoped$(sryles);

  return (
    <div class="crtr-sbr-art">
      {props.vinetas === undefined ? (
        <>
          {' '}
          <ContainerDescription props={props} />{' '}
          {props.highlights === undefined ? (
            <> </>
          ) : (
            <>
              <div class="crets-chrlsr-hrslrs-artes">
                {' '}
                <h5>Highlights:</h5>
                <ul class="detailed-list">
                  {props.highlights.map((val: any) => (
                    <li>{val}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div class="drtr-arte-ores">
            {props.vinetas === undefined ? (
              <> </>
            ) : (
              <>
                <div class="srte-prdsr-isrndfotms">
                  <h5>Sobre este artículo:</h5>
                  <div class="detailed-list">
                    {props.vinetas.map((val: any) => (
                      <>
                        {' '}
                        <div class="crte-crot-sart">
                          {' '}
                          <div class="cirle-bg"></div>{' '}
                          <div class="list">
                            <div>{val}</div>
                          </div>{' '}
                        </div>
                      </>
                    ))}{' '}
                  </div>
                </div>
              </>
            )}
            {props.highlights === undefined ? (
              <> </>
            ) : (
              <>
                <div class="crets-chrlsr-hrslrs-artes">
                  {' '}
                  <h5>Highlights:</h5>
                  <ul class="detailed-list">
                    {props.highlights.map((val: any) => (
                      <li>{val}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
});
