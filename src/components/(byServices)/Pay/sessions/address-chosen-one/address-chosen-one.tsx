import { component$ } from '@builder.io/qwik';

export const AddressChosenOne = component$(({ stateAddress }: any) => {
  return <div>{stateAddress.results.address.addressLine1}</div>;
});
