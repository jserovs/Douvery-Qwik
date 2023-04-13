

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
	quantity:number;
	images: string[];
	category: string;
	productDetails: productDetails[];	
	variations: variant[];
	ratings:ratings[];
	
	
};

export type ZipCode = {
	info: string;
	
};

export type ratings = {
	userId: string;
	userName:string;
	userImages:string;
	userComment:string;
};

export type rating = {
	title: string;
	rating:string
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



export type UserACC = {
	name: string ;
	id:string;
	token:string;
	avatar:string;
};

export type decodedUserInfos = {
	name: string;
	
};


export type Search = {
	totalProduct: number;
	product: Product[];
	
};

export type Address = {
	addressLine1: string;
	addressLine2: string;
	street: string;
	city: string;
	state: string;
	zip : string;
	country: string;
	isPrimary: boolean;
	locationType: string;

};

export type Order = {
	orderId: string;
	orderIsPaid: boolean;
	ordertotalItems: string;
	orderPaymentMethod:{
		method: string;
	}
	orderTotalAmout: number;
	userCalification:{
		userQualifyExperiencePurchase: string;
	}

};