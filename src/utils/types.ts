

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
	description: string;
	images: string[];
	variations: variant[];
	
};


export type variant = {
	id: string;
	variations:string;
	productVariation:Array<{
		dui: string;
	}>;
};

export type Seller = {
	
	name:string;
	
};