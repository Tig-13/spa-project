import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Offer } from "../assets/global/types";
import { useOfferStore } from '../assets/store/offerstore';

const OfferDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { getOfferById } = useOfferStore();
    const [offer, setOffer] = useState<Offer | undefined>(undefined);

    useEffect(() => {
        const fetchedOffer = getOfferById(Number(id));
        if (fetchedOffer) {
            setOffer(fetchedOffer);
        }
    }, [id, getOfferById]);

    if (!offer) return <p>Offer not found</p>;

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-6">{offer.offerName}</h1>
            <img src={offer.offerImageUrl} alt={offer.offerName} className="w-full h-64 object-cover mb-4" />
            <p>{offer.offerDescription}</p>
            <p className="text-gray-900 font-semibold">Price: ${offer.offerPrice?.toFixed(2)}</p>
            <p className="text-gray-600">Duration: {offer.offerDuration} minutes</p>
            <p className="text-gray-600">Type: {offer.offerType ? offer.offerType.offerTypeName : 'No type available'}</p> {/* Добавлена проверка */}
        </div>
    );
};

export default OfferDetails;
