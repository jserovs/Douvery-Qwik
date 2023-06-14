import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-views-images-details.css?inline';

import { HorizontalViewProductIMG } from './layout/product/horizontal-views';
import { VarticalViewProductIMG } from './layout/product/vartical-views';
import { ThreeHorizontalViewProductIMG } from './layout/product/three-horizontal-views';
import { LibPermVerticalViewProductIMG } from './layout/product/books-perm-vertical-views';
import { ContainerBreadcrumbs } from './sessions/VIEW 1/components/Breadcrumbs/container-breadcrumbs';

export const ImageDetailContainer = component$(
  ({ props, img, isOpen }: any) => {
    useStylesScoped$(styles);

    function selectComponent() {
      const { productDetails } = props;
      const { styleImg = '' } = productDetails[0] || {};
      switch (styleImg) {
        case 'style3':
          return (
            <ThreeHorizontalViewProductIMG
              img={img}
              isOpen={isOpen}
              props={props}
            />
          );
        case 'style2':
          return (
            <HorizontalViewProductIMG img={img} isOpen={isOpen} props={props} />
          );
        case 'style1':
          return (
            <VarticalViewProductIMG img={img} isOpen={isOpen} props={props} />
          );
        case 'style-books':
          return (
            <LibPermVerticalViewProductIMG
              img={img}
              isOpen={isOpen}
              props={props}
            />
          );
        default:
          return (
            <VarticalViewProductIMG img={img} isOpen={isOpen} props={props} />
          );
      }
    }

    return (
      <>
        {selectComponent()} <ContainerBreadcrumbs product={props} />
      </>
    );
  }
);
