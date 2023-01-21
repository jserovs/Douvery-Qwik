export async function fetchSeller(
  id: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    https://server-douvery.vercel.app/se/seller-data/${id}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Seller');
  }
  const results = await response.json();

  return results;
}

// export const apiServiceFetchSeller = async (id?: string) => {
//   const baseAPI = `
//     https://server-douvery.vercel.app/se/seller-data`;
//   const endPoint = id ? `${baseAPI}/${id}` : baseAPI;

//   try {
//     const data = await fetch(endPoint, {
//       method: 'GET',
//     });
//     return data.json();
//   } catch (error) {
//     console.log(error);
//   }
// };
