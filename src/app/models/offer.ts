export enum OfferStatus {
  Accepted,
  Rejected,
  Pending,
}

export interface IOffer {
  id: string;
  price: number;
  description: string;
  offerDocument: string;
  createdAt: Date;
  deadline: Date;
  status: OfferStatus;
  listingId: string;
  companyId: string;
}
