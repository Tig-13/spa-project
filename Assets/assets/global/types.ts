export interface User {
    id: number;
    username: string;
    role: string;
}

export interface Offer {
    offerId: number;
    offerName: string;
    offerDescription: string;
    offerPrice: number | null; 
    offerDuration: number;  
    offerImageUrl: string;  
    offerTypeId: number;  
    offerType: OfferType;  
}


export interface OfferType {
    offerTypeId: number;
    offerTypeName: string;
}
