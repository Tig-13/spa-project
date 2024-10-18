import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOfferStore } from '../assets/store/offerstore';

const ViewOffers = () => {
    const { offers, setOffers } = useOfferStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOffersData = async () => {
        try {
            const response = await fetch('/api/offers');
            if (!response.ok) {
                throw new Error('Failed to fetch offers');
            }
            const data = await response.json();

            console.log('Offers from server:', data);

            setOffers(data);
        } catch (error) {
            setError('Failed to load offers. Please try again later.');
            console.error('Error fetching offers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffersData();
    }, []);

    if (loading) {
        return <p className="text-center mt-8">Loading offers...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    console.log('Rendering offers:', offers);
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-6">Available Offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.length > 0 ? (
                    offers.map((offer) => (
                        <Link to={`/offers/${offer.offerId}`} key={offer.offerId}>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={offer.offerImageUrl}
                                    alt={offer.offerName}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold">{offer.offerName}</h2>
                                    <p className="text-gray-700">{offer.offerDescription}</p>
                                    <p className="mt-2 text-gray-900 font-semibold">
                                        Price: {offer.offerPrice !== null && offer.offerPrice !== undefined ? `$${offer.offerPrice.toFixed(2)}` : 'N/A'}
                                    </p>
                                    <p className="mt-1 text-gray-600">
                                        Duration: {offer.offerDuration} minutes
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center mt-8">No offers available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default ViewOffers;
