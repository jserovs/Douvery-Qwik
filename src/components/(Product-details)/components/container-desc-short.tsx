import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-desc-short.css?inline';
export const ContainerDescriptionShort = component$(({ props }: any) => {
  useStylesScoped$(sryles);

  return (
    <div class="crtr-sbr-art">
      <div class="drtr-arte-ores">
        {props.vinetas === undefined ? (
          <> </>
        ) : (
          <>
            <div class="srte-prdsr-isrndfotms">
              <h5>Sobre este artículo:</h5>
              <ul class="detailed-list">
                {props.vinetas.map((val: any) => (
                  <>
                    {' '}
                    <li>{val}</li>{' '}
                  </>
                ))}{' '}
              </ul>
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
                <li>Regular Fit.</li>
                <li>Full sleeves.</li>
                <li>70% cotton, 30% polyester.</li>
                <li>Easy to wear and versatile as Casual.</li>
                <li>Machine wash, tumble dry..</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
});
