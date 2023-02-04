import { component$ } from '@builder.io/qwik';
import { ContainerViewsIMGDetails } from '../../container-views-images-details';
import { ContainerButtonExtr } from '../../container-hrs-butros';

export const View1 = component$(({ props }: any) => {
  return (
    <div>
      <ContainerViewsIMGDetails props={props} />
      <ContainerButtonExtr props={props} />
    </div>
  );
});
