import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ContainerCombinedBySeller } from './components/container-combined-by-seller';
import styles from './view2.css?inline';
import { ContainerSponsoreProduct } from './components/container-sponsore';
import { ContainerBasicFeacture } from './components/container-basic-feature';
import { ContainerShoppingFeacture } from './components/container-shopping-feature';
export const View2 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const data = [
    {
      images: ['https://via.placeholder.com/150x150'],
      price: '19',
    },
    {
      images: ['https://via.placeholder.com/150x150'],
      price: '19',
    },
    {
      images: ['https://via.placeholder.com/150x150'],
      price: '19',
    },
  ];

  const dataSponsore = [
    {
      name: 'Under Armour Charged Pursuit 3 - Tenis de correr para hombre',
      images: [
        'https://res.cloudinary.com/douvery/image/upload/v1666290931/Under%20Armour%20Charged%20Pursuit%203%20-%20Tenis%20de%20correr%20para%20hombre/f5hvekoyhofm1f2o4j3u.webp',
      ],
      price: '19',
      discount: 10,
      shippingFree: false,
    },
    {
      name: 'Under Armour Charged Pursuit 3 - Tenis de correr para hombre',
      images: [
        'https://res.cloudinary.com/douvery/image/upload/v1666290931/Under%20Armour%20Charged%20Pursuit%203%20-%20Tenis%20de%20correr%20para%20hombre/f5hvekoyhofm1f2o4j3u.webp',
      ],
      price: '19',
      discount: 80,

      shippingFree: true,
    },
  ];
  return (
    <div class="crtr-views2">
      <div class="viewleft">
        <div class="combined">
          {' '}
          <ContainerCombinedBySeller SRTproduct={product} data={data} />
          <div class="crtr-characte">
            {' '}
            <ContainerBasicFeacture product={product} />
            <ContainerShoppingFeacture />
          </div>
        </div>
      </div>
      <div class="viewrigth">
        <ContainerSponsoreProduct product={dataSponsore} />
      </div>
    </div>
  );
});
