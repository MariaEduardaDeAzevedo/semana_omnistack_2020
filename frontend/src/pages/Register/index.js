import React, { useState } from 'react'
import { Link , useHistory} from 'react-router-dom'

import api from '../../services/api'

import './style.css'

import logo from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'

export default function Register() {

    const history = useHistory()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')

    async function handleRegister(e) {
        e.preventDefault()
        const dados = {
            nome,
            email,
            numero,
            cidade,
            uf,
        }

        try {
            const res = await api.post('ongs', dados) 
            window.alert(`Sua ONG foi cadastrada! 
ID de acesso: ${res.data.id}
Utilize-o para fazer Logon na sua conta`)
            history.push('/')
        } catch (err) {
            window.alert(`Ops! Ocorreu um erro... Tente novamente`)
        }

    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="logo"/>
                    <h1>Cadastro</h1>
                    <p>Faça o cadastro da sua ONG, engaje e movimente pessoas para contribuirem com o seu trabalho.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/> Voltar para o Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    
                    <input 
                    placeholder="Nome da sua ONG" 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />
                    
                    <input 
                    placeholder="E-mail para contato"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    
                    <input 
                    placeholder="Número de telefone/WhatsApp"
                    value={numero}
                    onChange={e => setNumero(e.target.value)}
                    />
                    
                    <div className="input-group">
                        
                        <input 
                        placeholder="Cidade de atuação/sede"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                        />

                        <input
                        placeholder="UF" style={{ width : 80 }}
                        value={uf}
                        onChange={e => setUF(e.target.value)}
                        /> 

                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}