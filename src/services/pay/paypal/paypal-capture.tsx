export async function fetchCapturePaypal(token: string): Promise<any> {
  const response = await fetch(`http://localhost:9039/capture-paypal-order`, {
    method: 'POST',
    body: JSON.stringify({
      orderID: token,
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
