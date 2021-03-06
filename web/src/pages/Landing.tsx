import React from 'react'
import { FiArrowRight} from 'react-icons/fi'
import { Link } from 'react-router-dom'
 
import '../styles/pages/landing.css'
import logo from '../imagens/logo.svg'

function Landing(){
    return (
        <div id="page-landing">
            <div className="content-wrapper">
            <img src={logo} alt="Happy"/>

            <main>
                <h1>Leve felicidade para o mundo</h1>
                <p>Visite orfanatos e mude o dia de muitas criaças</p>
            </main>
            <div className="location">
                <strong>Rio de Janeiro</strong>
                <span>Rio de Janeiro</span>
            </div>

            <Link to="/app" className="enter-app">
                <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
            </Link>

        </div> 

        </div>
    )
}

export default Landing