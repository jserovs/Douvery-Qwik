
export const getProductQuery = (variables: { dui: string }) => ({
	variables,
	query: `
  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
    }
  }
  fragment DetailedProduct on Product {
    id
    name
    description
    
`,
});