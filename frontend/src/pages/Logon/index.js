import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'

import {FiLogIn} from 'react-icons/fi'
import './styles.css';

import LogoImage from '../../assets/logo.svg'
import HeroesImage from '../../assets/heroes.png';

import api from '../../services/api'

export default function Logon() {
    const history = useHistory();

    const [id, setId] = useState('');

    async function handleLogon(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert("Falha no login, tente novamente");
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={LogoImage} alt="Heroes"/>

                <form onSubmit = {handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder = "Sua ID" 
                        value = {id}
                        onChange = {e=>{setId(e.target.value)}}
                    />
                    <button className="button" type="submit" >Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form> 

            </section>

            <img src={HeroesImage} alt="Heroes"/>
            
        </div>
    );
}