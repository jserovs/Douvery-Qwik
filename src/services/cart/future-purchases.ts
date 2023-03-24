import {  urlServerNode } from "../fechProduct";



  export async function getDataFuturePurchasesProduct(
    id: string,
  ): Promise<any> {
   
    const response = await fetch(
      
        `${urlServerNode}/api/user-products-dui/json`,
      {
        method: 'POST',
        body: JSON.stringify({
            userId:   id, 
          }),
        headers: {
           'Content-Type': 'application/json',
        },
      });
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const results = await response.json();
    console.log(results);
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
   
    return results;
  }
  
    export async function updatePayAutomaticDataFuturePurchasesProduct(
    id: string,
    dui: string,
    payAuto:boolean
  ): Promise<any> {
    
    const response = await fetch(
      
        `${urlServerNode}/api/update-pay-automatic-future-purchase`,
      {
        method: 'PUT',
        body: JSON.stringify({
            userId: id, 
            dui:dui,
            payAutomatic:payAuto
          }),
        headers: {
           'Content-Type': 'application/json',
        },
      });
     
 
    if (!response.ok) {
      throw new Error('Failed to change list');
    }
    const results = await response.json();
   
    return results;
  }
  