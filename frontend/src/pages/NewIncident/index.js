import React, {useState} from 'react';

import {Link, useHistory} from 'react-router-dom';

import LogoImage from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'

import './styles.css';

export default function NewIncident(){
    const [tittle, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            tittle,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId
                }
            });

            history.push('/profile');
        } catch (error) {
            alert("Erro ao cadastrar caso, tente novamente");
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={LogoImage} alt="Be the hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit = {handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value = {tittle}
                        onChange = {e => {setTittle(e.target.value)}}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value = {description}
                        onChange = {e => {setDescription(e.target.value)}}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value = {value}
                        onChange = {e => {setValue(e.target.value)}}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}