import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOfferStore } from '../assets/store/offerstore';
import { Offer, OfferType } from '../assets/global/types';

const ViewOffers = () => {
    const { offers, setOffers, setOfferTypes } = useOfferStore();
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [loadingOffers, setLoadingOffers] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOfferTypes = async () => {
        try {
            const response = await fetch('/api/offertypes');
            if (!response.ok) {
                throw new Error('Failed to fetch offer types');
            }
            const data: OfferType[] = await response.json();
            console.log('Offer types from server:', data); 
            setOfferTypes(data);
        } catch (err) {
            setError('Failed to fetch offer types');
            console.error('Error fetching offer types:', err);
        } finally {
            setLoadingTypes(false);
        }
    };
                    
    const fetchOffersData = async () => {
        try {
            const response = await fetch('/api/offers');
            if (!response.ok) {
                throw new Error('Failed to fetch offers');
            }
            const data: Offer[] = await response.json();
            console.log('Offers from server:', data); 
            setOffers(data);
        } catch (err) {
            setError('Failed to fetch offers');
            console.error('Error fetching offers:', err);
        } finally {
            setLoadingOffers(false);
        }
    };

    useEffect(() => {
        fetchOfferTypes().then(() => {
            fetchOffersData(); 
        });
    }, [setOffers, setOfferTypes]);

    if (loadingTypes || loadingOffers) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-6">Available Offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer: Offer) => (
                    <Link to={`/offers/${offer.offerId}`} key={offer.offerId}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={offer.offerImageUrl} alt={offer.offerName} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{offer.offerName}</h2>
                                <p className="text-gray-700">{offer.offerDescription}</p>
                                <p className="text-gray-900 font-semibold">Price: ${offer.offerPrice?.toFixed(2)}</p>
                                <p className="text-gray-600">Duration: {offer.offerDuration} minutes</p>
                                <p className="text-gray-600">Type: {offer.offerType ? offer.offerType.offerTypeName : 'No type available'}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ViewOffers;
