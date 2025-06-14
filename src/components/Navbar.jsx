import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="sticky top-0 z-50 p-4 bg-black/30 backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-yellow-400 tracking-wider" style={{ textShadow: '0 0 5px #facc15' }}>
                    SWAPI Vlog
                </Link>
                <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="px-4 py-2 bg-discord-blurple/80 hover:bg-discord-blurple rounded-md text-white font-semibold transition-all duration-300 flex items-center gap-2">
                        Favorites 
                        <span className="bg-yellow-400 text-black rounded-full px-2 text-sm font-bold">
                            {store.favorites.length}
                        </span>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-discord-dark/90 backdrop-blur-xl rounded-box w-64 mt-2 border border-white/10">
                        {store.favorites.length > 0 ? (
                            store.favorites.map(fav => (
                                <li key={`${fav.type}-${fav.uid}`}>
                                    <div className="flex justify-between items-center w-full">
                                        <Link to={`/${fav.type}/${fav.uid}`}>{fav.name}</Link>
                                        <button onClick={() => actions.toggleFavorite(fav)} className="text-red-500 hover:text-red-400">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li><a>No favorites yet!</a></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};