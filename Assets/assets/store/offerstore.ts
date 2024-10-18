import { create } from 'zustand';
import { Offer } from '../global/types';

interface OfferStoreType {
    offers: Offer[];
    setOffers: (offers: Offer[]) => void;
    addOffer: (offer: Offer) => void;
    getOfferById: (id: number) => Offer | undefined;
    updateOffer: (updatedOffer: Offer) => void; 
    deleteOffer: (id: number) => void; 
}

export const useOfferStore = create<OfferStoreType>((set, get) => ({
    offers: [],
    setOffers: (offers) => set({ offers }),
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
