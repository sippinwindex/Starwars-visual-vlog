import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="mb-8 w-full max-w-lg mx-auto">
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-discord-dark/70 backdrop-blur-sm border-2 border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-discord-blurple transition-all duration-300"
            />
        </div>
    );
};

export default SearchBar;