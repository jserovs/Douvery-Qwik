

export type AppState = {
	collections: '';
	activeOrder: '';
	showCart: boolean;
	customer?: '';
};


export type Product = {
	dui: string;
	id: string;
	name: string;
	slug: string;
	price: number;
	discount: number;
	description: string;
	images: string[];
	category: string;
	variations: variant[];
	productDetails: productDetails[];	
	
};



export type variant = {
	id: string;
	variations:string;
	productVariation:variantDate;
};


export type productDetails = {
	basicFeatures: basicFeatures[];
}



export type basicFeatures ={
	dui:string;
	sizes: string;
}


export type variantDate = {
	name: string;
	dui:string;
	
};


export type Seller = {
	
	name:string;
	
};


export type CodePostalData = {
	name:string;
	county:string;
	postcode:string;
	state:string;
	
};