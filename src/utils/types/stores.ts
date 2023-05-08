

export type Design= {
  logo: string;
  banners: string[];
  cover: string;
  primaryColor: string;
  secondaryColor: string;
}

export type ContactInfo= {
  email: string;
  phone: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    timezone: string;
    isPrimary: boolean;
    locationType: string;
  };
}

export type SocialLinks= {
  facebook: string;
  twitter: string;
  instagram: string;
}

export type Update= {
  updatedAt: Date;
  updatedBy: string;
  description: string;
}

export type Store = {
  ospayne: string;
  name: string;
  description: string;
  design: Design;
  owner: string;
  products: string[];
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  updates: Update[];
  createdAt: Date;
  updatedAt: Date;
  averageProductRating: number;
  totalRatingsCount: number;
  followersCount: number;
  topSubCategories: string[];
}
