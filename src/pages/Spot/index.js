import React, { useState, useMemo } from 'react';
import api from '../../servicies/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function Spot({ history }) {

    const [company, setCompany] = useState('');
    const [tech, setTech] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem("user");

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('technology', tech);
        data.append('price', price);

        await api.post("/spots", data, {
            headers: { user_id }
        });

        history.push("/dashboard");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}>
                <input
                    type="file"
                    onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Selecione uma imagem" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input
                type="text"
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)} />

            <label htmlFor="technology">Tecnologias * <span>Separadas por vírgulas</span></label>
            <input
                type="text"
                id="technology"
                placeholder="Quais tecnologis usam?"
                value={tech}
                onChange={event => setTech(event.target.value)} />

            <label htmlFor="price">Valor da diária * <span>Em branco para Gratuíto</span></label>
            <input
                type="number"
                id="price"
                placeholder="Quais tecnologis usam?"
                value={price}
                onChange={event => setPrice(event.target.value)} />

            <button className="btn">Cadastrar</button>
        </form>
    );
}