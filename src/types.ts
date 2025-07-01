export type Category = {
  slug: string;
  name: string;
  url: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
};