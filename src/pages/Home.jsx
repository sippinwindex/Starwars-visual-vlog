import React, { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/useGlobalReducer";
import Card from "../components/Card.jsx";
import Spinner from "../components/Spinner.jsx";
import SearchBar from "../components/SearchBar.jsx";

const Home = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Load data only if it's not already loaded
        if (store.people.length === 0 && store.planets.length === 0 && store.vehicles.length === 0) {
            actions.loadData();
        }
    }, []);

    const filterItems = (items) => {
        if (!searchTerm) return items;
        return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const renderCarousel = (title, items, resource) => (
        <div className="mb-12">
            <h1 className="text-3xl font-bold text-yellow-400 mb-4 pl-4" style={{ textShadow: '0 0 8px #facc15' }}>{title}</h1>
            <div className="flex overflow-x-auto p-4 space-x-4 scrollbar-thin scrollbar-thumb-discord-blurple/80 scrollbar-track-discord-dark/50">
                {items.length > 0 ? (
                    filterItems(items).map(item => <Card key={item.uid} item={item} resource={resource} />)
                ) : (
                    <p className="text-gray-400">No {title.toLowerCase()} found.</p>
                )}
            </div>
        </div>
    );

    if (store.loading) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {renderCarousel("Characters", store.people, "people")}
            {renderCarousel("Planets", store.planets, "planets")}
            {renderCarousel("Vehicles", store.vehicles, "vehicles")}
        </div>
    );
};

export default Home;