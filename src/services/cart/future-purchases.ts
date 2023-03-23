import { urlServerLocal, urlServerNode } from "../fechProduct";



  export async function getDataFuturePurchasesProduct(
    id: string,
  ): Promise<any> {
    console.log(id)
    const response = await fetch(
      
        `${urlServerNode}/api/user-products-dui/json`,
      {
        method: 'POST',
        body: JSON.stringify({
            userId: "62ab8396cc6a45ab9c1b3a69", 
          }),
        headers: {
           'Content-Type': 'application/json',
        },
      });
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const results = await response.json();
  
    return results;
  }
  export async function deleteDataFuturePurchasesProduct(
    id: string,
    dui: string,
  ): Promise<any> {
    
    const response = await fetch(
      
        `${urlServerNode}/api/remove-future-purchase`,
      {
        method: 'DELETE',
        body: JSON.stringify({
            userId: id, 
            dui:dui,
          }),
        headers: {
           'Content-Type': 'application/json',
        },
      });
     
 
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const results = await response.json();
   console.log(results)
    return results;
  }
  

  export async function updateNotificationDataFuturePurchasesProduct(
    id: string,
    dui: string,
    notification:boolean
  ): Promise<any> {
    
    const response = await fetch(
      
        `${urlServerNode}/api/update-notification-status-future-purchase`,
      {
        method: 'PUT',
        body: JSON.stringify({
            userId: id, 
            dui:dui,
            notification:notification
          }),
        headers: {
           'Content-Type': 'application/json',
        },
      });
     
 
    if (!response.ok) {
      throw new Error('Failed to change list');
    }
    const results = await response.json();
   console.log(results)
    return results;
  }
  