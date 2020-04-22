import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

//Importando estilo
import './style.css'

//Importando mídia
import heroes from  '../../assets/heroes.png'
import logo from  '../../assets/logo.svg'
import {FiLogIn} from 'react-icons/fi'

export default function Logon() {
    const [id, setID] = useState('')
    const history = useHistory()

    async function handleLogon(e) {
        e.preventDefault()
        try {
            const res = await api.post('session', { id })
            localStorage.setItem('ong_id', id)
            localStorage.setItem('nome', res.data.nome)
            history.push('/profile')
        } catch (error) {
            window.alert("Ops... algo deu errado ao fazer logon. Confira seus dados e tente novamente")
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="logo"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça Seu Logon</h1>
                    <input 
                    type='text' 
                    placeholder="Sua ID"
                    value = {id}
                    onChange = {e => setID(e.target.value)}
                    />
                    <button type='submit' className="button">Logon</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/> Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroes} alt="heros"/>
        </div>
    )
}
