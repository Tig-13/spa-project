import { create } from 'zustand';
import { Offer, OfferType } from '../global/types';

interface OfferStoreType {
    offers: Offer[];
    setOffers: (offers: Offer[]) => void;
    addOffer: (offer: Offer) => void;
    getOfferById: (id: number) => Offer | undefined;
    updateOffer: (updatedOffer: Offer) => void; 
    deleteOffer: (id: number) => void; 
    offerTypes: OfferType[]; 
    setOfferTypes: (types: OfferType[]) => void; 
}

export const useOfferStore = create<OfferStoreType>((set, get) => ({
    offers: [],
    offerTypes: [],
    setOffers: (offers) => set({ offers }),
    setOfferTypes: (types) => set({ offerTypes: types }),
    addOffer: (offer) => set((state) => ({ offers: [...state.offers, offer] })),
    getOfferById: (id: number) => {
        const state = get();
        return state.offers.find((offer) => offer.offerId === id);
    },
    updateOffer: (updatedOffer: Offer) => set((state) => ({
        offers: state.offers.map((offer) =>
            offer.offerId === updatedOffer.offerId ? updatedOffer : offer
        ),
    })),
    deleteOffer: (id: number) => set((state) => ({
        offers: state.offers.filter((offer) => offer.offerId !== id),
    })),
}));
