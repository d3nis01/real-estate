export interface Listing {
  id: string;
  title: string;
  description: string;
  projectType: string;
  city: string;
  country: string;
  blueprint: string;
  image: string;
  budget: number;
  status: ListingStatus;
  constructionDeadline: Date;
  createdAt: Date;
  userId: string;
}

export enum ListingStatus {
  Open,
  Closed,
  InProgress,
}
