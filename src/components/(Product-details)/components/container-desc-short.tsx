import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-desc-short.css?inline';
import { ContainerDescription } from './crtr-description';
export const ContainerDescriptionShort = component$(({ props }: any) => {
  useStylesScoped$(sryles);
  const renderTbProtein = (key: any, label: any) => {
    if (!props || !props.tbProtein[key]) return null;
    return (
      <>
        {' '}
        <tr>
          {' '}
          <td>{label}</td>
          <td class="td-scs">{props.tbProtein[key]}</td>
        </tr>
      </>
    );
  };
  return (
    <div class="crtr-sbr-art">
      <ContainerDescription props={props} />
      {props.vinetas && (
        <div class="drtr-arte-ores">
          <div class="srte-prdsr-isrndfotms">
            {props.vinetas && (
              <>
                <strong class="hs-sr1">Sobre este artículo:</strong>
                <div class="detailed-list">
                  {props.vinetas.map((val: any, i: number) => (
                    <div class="crte-crot-sart" key={i}>
                      <div class="cirle-bg"></div>
                      <div class="list">
                        <p class="ps-sr1">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {props.highlights && (
              <div class="crets-chrlsr-hrslrs-artes">
                <strong class="hs-sr1">Highlights:</strong>
                <ul class="detailed-list">
                  {props.highlights.map((val: any, i: number) => (
                    <li key={i}>
                      <p class="ps-sr1">{val}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {props.tbProtein && (
        <div class="drtr-arte-ores">
          <strong class="hs-sr1">Datos de nutrición de :</strong>
          <p class="ps-sr1"> {props.name}</p>
          <div class="srte-prdsr-isrndfotms">
            <table>
              <tbody>
                <th>Nutriente</th>
                <th>Cantidad por porción (30g)</th>
                {renderTbProtein('calories', 'Calories')}
                {renderTbProtein('carbohydrates', 'Carbohidratos')}{' '}
                {renderTbProtein('cholesteol', 'Colesterol')}
                {renderTbProtein('dietaryFiber', 'Fibra dietética')}{' '}
                {renderTbProtein('fat', 'Grasas')}{' '}
                {renderTbProtein('protein', 'Proteina')}
                {renderTbProtein('saturatedFat', 'Grasas saturada')}
                {renderTbProtein('sodium', 'Sodio')}
                {renderTbProtein('sugars', 'Azúcares')}
              </tbody>
            </table>

            <p>
              ** Valores diarios basados en una dieta de 2,000 calorías. Valores
              diarios pueden ser mayores o menores según tus necesidades
              calóricas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
