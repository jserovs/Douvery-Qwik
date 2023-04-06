import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-basic-feature.css?inline';

export const ContainerBasicFeacture = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const renderFeatureBasic = (key: any, label: any) => {
    if (!product || !product.basicFeatures[key]) return null;
    return (
      <li>
        <strong>{label}:</strong> {product.basicFeatures[key]}
      </li>
    );
  };
  const renderFeatureUtil = (key: any, label: any) => {
    if (!product || !product.basicFeatures.util[key]) return null;
    return (
      <li>
        <strong>{label}:</strong> {product.basicFeatures.util[key]}
      </li>
    );
  };
  const renderFeatureScreen = (key: any, label: any) => {
    if (!product || !product.basicFeatures.screen[key]) return null;
    return (
      <li>
        <strong>{label}:</strong> {product.basicFeatures.screen[key]}
      </li>
    );
  };
  return (
    <div class="crtr-charac-bs">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Detalles basicos</hs-sr3>
        </div>

        <p class="ps-sr1">Lo esencial en pocas palabras</p>
      </div>
      <div>
        <ul>
          <li>
            <strong>Dui:</strong> {product.dui}
          </li>
          {product.basicFeatures === undefined ? (
            <></>
          ) : (
            <>
              {renderFeatureBasic('size', 'Medidas')}
              {renderFeatureBasic('weight', 'Peso')}

              {product.basicFeatures.util === undefined ? (
                <></>
              ) : (
                <>
                  {renderFeatureUtil('color', 'Color')}
                  {renderFeatureUtil('size', 'Talla')}
                  {renderFeatureUtil('materialSole', 'Material de la suela')}
                  {renderFeatureUtil('material', 'Material')}
                  {renderFeatureUtil('mgCafS', 'Mg de cafeína por porción')}
                </>
              )}
              {product.basicFeatures.screen === undefined ? (
                <></>
              ) : (
                <>
                  {renderFeatureScreen('resolution', 'Resolución')}
                  {renderFeatureScreen(
                    'refreshRate',
                    'Frecuencia de actualización'
                  )}
                  {renderFeatureScreen('responseTime', ' Tiempo de respuesta')}
                </>
              )}
            </>
          )}
          {product.booksAuthor == undefined ? (
            <></>
          ) : (
            <li>
              <strong>Author:</strong> {product.booksAuthor}
            </li>
          )}

          {product.booksGenres == undefined ? (
            ''
          ) : (
            <>
              {' '}
              <li>
                <strong>Generos:</strong> {product.booksGenres[0]} ,{' '}
                {product.booksGenres[1]} , {product.booksGenres[2]}
              </li>
            </>
          )}

          <li>
            <strong>Vendedor:</strong>{' '}
            <div>
              <a href="/" class="ps-sr1">
                {product.marca}
              </a>{' '}
              <p class="ps-sr1">
                {' '}
                , Seller en douvery desde 2021{' '}
                {product.sponsored === true ? (
                  <>
                    <a class="ps-sr1"> +50 Opiniones</a>
                  </>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
});
