import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({  redirect, params }) => {
    const dui = params.copy;
  throw redirect(302, '/v/'+ '-/' + dui );
};
