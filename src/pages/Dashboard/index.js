import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../servicies/api';

export default function Dashboard() {

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem("user");
            const response = await api.get("/dashboard", {
                headers: { user_id }
            });
            console.log(response.data);
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/spot">
                <button className="btn">Cadastrar novo Spot</button>
            </Link>
        </>
    );
}