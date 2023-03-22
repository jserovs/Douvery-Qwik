import { urlServerNode } from "../fechProduct";



  export async function getDataFuturePurchasesProduct(
    id: string,
    controller?: AbortController
  ): Promise<any> {
    console.log(id)
    const response = await fetch(
      
        `${urlServerNode}/api/user-products-dui/json`,
      {
        method: 'POST',
        body: JSON.stringify({
            userId: id, // En lugar de enviar un objeto, envía la cadena 'id' directamente
          }),
        headers: {
           'Content-Type': 'application/json',
        },
      });
     
   console.log(response)
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const results = await response.json();
  
    return results;
  }