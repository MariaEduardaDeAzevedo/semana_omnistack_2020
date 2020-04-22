import React, { useState } from 'react'
import { Link , useHistory } from 'react-router-dom'

import logo from "../../assets/logo.svg"
import { FiArrowLeft } from 'react-icons/fi'

import './style.css'

import api from '../../services/api'

export default function NovoCaso() {
    const history = useHistory()
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [ong_id, setOngID] = useState('')
    const ongID = localStorage.getItem('ong_id')

    async function handleNovoCaso(e) {
        e.preventDefault()

        setOngID(ongID)

        const dados = {
            titulo,
            descricao,
            valor,
            ong_id,
        }

        try {
            await api.post('casos', dados, {
                headers: {
                    Auth: ongID,
                }
            })  

            history.push('/profile')
        } catch (error) {
            window.alert("Ops... algo deu errado ao adicionar um novo caso, tente novamente")
        }
    }
    
    return(
        <div className="novocaso-container">
            <div className="content">
                <section>
                    <img src={logo} alt="logo"/>
                    <h1>Novo Caso</h1>
                    <p>Descreva o caso e engaje pessoas a ajudarem em sua resolução.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/> Voltar para o seu perfil
                    </Link>
                </section>
                <form onSubmit={handleNovoCaso}>
                    <input 
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        placeholder="Título do Caso"/>
                    <textarea 
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        placeholder="Descrição"/>
                    <input 
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        placeholder="Valor total a arrecadar"/>
                    <button className="button" type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    )
}