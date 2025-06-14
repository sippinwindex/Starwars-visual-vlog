import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../fetch.js";
import Spinner from "../components/Spinner.jsx";

const Single = () => {
    const { resource, uid } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- STATE MANAGEMENT FIX ---
    const placeholderUrl = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    const initialImageUrl = `https://starwars-visualguide.com/assets/img/${
        resource === 'people' ? 'characters' : resource
    }/${uid}.jpg`;
    
    const [imgSrc, setImgSrc] = useState(initialImageUrl);

    useEffect(() => {
        setImgSrc(initialImageUrl);
    }, [initialImageUrl]);

    const handleImageError = () => {
        setImgSrc(placeholderUrl);
    };
    // --- END OF FIX ---

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getDetails(resource, uid);
                setDetails(data); 
            } catch (err) {
                console.error("Failed to fetch details:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [resource, uid]);

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Spinner /></div>;
    if (error) return <div className="min-h-[60vh] flex items-center justify-center text-red-500 text-2xl">{error}</div>;
    if (!details || !details.properties) return <div className="min-h-[60vh] flex items-center justify-center text-xl">Details not found.</div>;
    
    const renderDetails = () => {
        const props = details.properties;
        // ... (renderDetails logic is unchanged)
    };

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8 bg-discord-dark/50 backdrop-blur-xl border border-white/10 rounded-lg p-8 shadow-2xl">
                <div className="lg:w-1/3">
                    <img 
                        src={imgSrc} // Use state variable
                        alt={details.properties.name} 
                        onError={handleImageError} // Use state-updating handler
                        className="w-full h-auto object-cover rounded-lg shadow-lg" 
                    />
                </div>
                <div className="lg:w-2/3 text-lg">
                    {/* ... (rest of the JSX is unchanged) ... */}
                </div>
            </div>
        </div>
    );
};

export default Single;