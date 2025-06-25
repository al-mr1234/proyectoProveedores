import React from 'react';

export default function BotonPrimario({ texto, onClick }) {
    return(
        <button 
            className="bg-rose-600 hover:bg-rose-700 text-white rounded font-semibold hover:bg-rose-700 shadow-lg transition duration-300 easy-in-out transform hover:scale-105 py-2 px-6"
            onClick={onClick}
        >
            {texto}
        </button>
    )
}

    