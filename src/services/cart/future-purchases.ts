import { urlServerNode } from "../fechProduct";



  export async function getDataFuturePurchasesProduct(
    id: string,
   
  ): Promise<any> {
    console.log(id)
    const response = await fetch(
      
        `${urlServerNode}/api/user-products-dui/json`,
      {
        method: 'POST',
        body: JSON.stringify({
            userId: id, 
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