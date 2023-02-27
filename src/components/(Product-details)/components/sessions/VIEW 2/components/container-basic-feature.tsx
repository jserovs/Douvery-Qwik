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
