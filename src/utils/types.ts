

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
	productDetails: productDetails[];	
	variations: variant[];
};



export type variant = {
	name: string;
	variant:variantDate;
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