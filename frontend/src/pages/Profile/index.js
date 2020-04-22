import React, { useState, useEffect } from 'react'
import { Link , useHistory } from 'react-router-dom'

import logo from "../../assets/logo.svg"
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './style.css'

export default function Profile() {

    const history = useHistory()
    const [casos, setCasos] = useState([])
    const nome = localStorage.getItem('nome')
    const ongID = localStorage.getItem('ong_id')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Auth: ongID,
            }
        }).then(response => {
            setCasos(response.data)
            console.log(response.data)
        })
    }, [ongID])

    async function handleDelete(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers : {
                    Auth : ongID,
                }
            })
            setCasos(casos.filter(caso => caso.id !==  id))
        } catch (error) {
            window.alert('Algo deu errado ao deletar este caso... Tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="logo"/>
                <span>Bem vinda, {nome}</span>
                <Link to="casos/novo" className="button">Novo Caso</Link>
                <button onClick={handleLogout} title="Logout"><FiPower size={25} color="#E02041"/></button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {casos.map(caso => {
                    return (
                        <li key={caso.id}>
                            <strong>Caso: {caso.titulo}</strong>
                            <p>{caso.descricao}</p>
                            <strong>Valor: R${Intl.NumberFormat('pt-BR', { style : 'currency', currency: 'BRL' }).format(caso.valor)}</strong>
                            <button type="button" onClick={() => handleDelete(caso.id)}><FiTrash2 size={20} color="#E02041"></FiTrash2></button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}