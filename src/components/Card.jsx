import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";
// --- NEW: Import FontAwesomeIcon and specific icons ---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const Card = ({ item, resource }) => {
    const { store, actions } = useContext(Context);

    // --- STATE MANAGEMENT FIX ---
    const placeholderUrl = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    const initialImageUrl = `https://starwars-visualguide.com/assets/img/${
        resource === 'people' ? 'characters' : resource
    }/${item.uid}.jpg`;

    const [imgSrc, setImgSrc] = useState(initialImageUrl);

    // This ensures if the component re-uses (e.g. in a list), the image source resets correctly.
    useEffect(() => {
        setImgSrc(initialImageUrl);
    }, [initialImageUrl]);

    const handleImageError = () => {
        // If an error occurs, we update the state to the placeholder URL.
        // This triggers a single, safe re-render and breaks the loop.
        setImgSrc(placeholderUrl);
    };
    // --- END OF FIX ---

    if (!item || !item.uid) {
        return null;
    }

    const itemWithResourceType = { ...item, type: resource };
    const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === resource);

    return (
        <div className="card w-72 bg-discord-dark/50 backdrop-blur-md shadow-xl border border-white/10 m-2 flex-shrink-0 transition-all duration-300 hover:scale-105 hover:border-discord-blurple">
            <figure>
                <img 
                    src={imgSrc}  // Use the state variable here
                    alt={item.name} 
                    onError={handleImageError} // The error handler now updates state
                    className="h-48 w-full object-cover"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold text-white">{item.name}</h2>
                <div className="card-actions justify-between items-center mt-4">
                    <Link to={`/${resource}/${item.uid}`} className="px-3 py-1 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-md font-semibold transition-all duration-300">
                        Learn More
                    </Link>
                <button onClick={() => actions.toggleFavorite(itemWithResourceType)} className="text-2xl">
                    <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} className={isFavorite ? "text-red-500" : "text-gray-400"} />
                </button>
                </div>
            </div>
        </div>
    );
};

export default Card;