

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
  address: string;
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
}