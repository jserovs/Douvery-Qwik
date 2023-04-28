



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
	lastname: string;
	id:string;
	token:string;
	avatar:string;
	email:string;
	address:Address[];
	phones:	string[];
	notification: boolean;
	sessionVerification: boolean;
	veriToolVerification: boolean;
	twoStepVerification: boolean;
	accountVerificationCode:boolean;

};

export type notification = {
		status: boolean;
}
export type sessionVerification = {
		status: boolean;
}
export type veriToolVerification = {
	status: boolean;
};
export type twoStepVerification = {
	status: boolean;
};


export type decodedUserInfos = {
	name: string;
};


export type Search = {
	totalProduct: number;
	product: Product[];
	
};

export type Address = {
	name: string;
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
  orderTotalAmout: string;
  orderPaymentMethod: {
    method: string;
    idMethod: string;
  };
  orderPaymentResult: any; 
  orderShippingAddress: {
    addressLine1: string;
    addressLine2: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isPrimary: boolean;
    locationType: string;
  };
  orderUserNotificationEmail: boolean;
  orderItems: orderItems[];
  paidAt: string;
  createdAt: string;
  updatedAt: string;
};
export type orderItems = {
  name: string;
  dui: string;
  price: number;
  discount: number;
  quantity: number;
  _id: string;
  image: string;
};

export type UserOrders = {
	orderId: string;
	totalAmount: string;
	itemCount: string;
	paymentMethod: string;
	uniqueProductImages: string[];
	status: number;
	orderedAt: string;
	notificationEmail: boolean;
};

export type reviewsProduct = {
  productDui: string;
  buyerId: string;
  date: Date;
  rating: number;
  title: string;
  review?: string;
  helpful: number;
  notHelpful: number;
  photos: string[];
  comments: ReviewComment[];
  
};

export type ReviewComment = {
  authorId: string;
  date: Date;
  content: string;
  helpful: number;
  notHelpful: number;
};



export type CheckComment = {
  canComment: boolean;
  lastPurchaseDate: number | null;
}