import { useParams, Link } from 'react-router-dom';
import { useOfferStore } from '../assets/store/offerstore';
import { useEffect, useState } from 'react';

const OfferDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { getOfferById } = useOfferStore();
    const [offer, setOffer] = useState(getOfferById(Number(id)));

    useEffect(() => {
        if (!offer) {
            const fetchOffer = async () => {
                try {
                    const response = await fetch(`/api/offers/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch offer');
                    }
                    const data = await response.json();
                    setOffer(data);
                } catch (error) {
                    console.error('Error fetching offer:', error);
                }
            };

            fetchOffer();
        }
    }, [id, offer]);

    if (!offer) {
        return <p className="text-center mt-8">Loading offer details...</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">{offer.offerName}</h1>
            <img
                src={offer.offerImageUrl}
                alt={offer.offerName}
                className="w-full h-96 object-cover mb-6"
            />
            <p className="text-gray-700 mb-4">{offer.offerDescription}</p>
            <p className="text-gray-900 font-semibold mb-2">
                Price: {offer.offerPrice !== null ? `$${offer.offerPrice.toFixed(2)}` : 'N/A'}
            </p>
            <p className="text-gray-600">Duration: {offer.offerDuration} minutes</p>

            <div className="mt-6">
                <Link to="/offers" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Back to Offers
                </Link>
            </div>
        </div>
    );
};

export default OfferDetails;
