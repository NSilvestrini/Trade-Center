import React from 'react';

function Footer({ setCurrentView }) {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>TRADE CENTER</h3>
                        <p>Seu supermercado online com as melhores ofertas e cashback!</p>
                    </div>
                    
                    <div className="footer-column">
                        <h3>Institucional</h3>
                        <ul>
                            <li><a href="/">Sobre nós</a></li>
                            <li><a href="/">Nossas lojas</a></li>
                            <li><a href="/">Trabalhe conosco</a></li>
                            <li><a href="/">Termos e condições</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-column">
                        <h3>Atendimento</h3>
                        <ul>
                            <li><a onClick={() => setCurrentView('support')}>Central de ajuda</a></li>
                            <li><a href="/">Prazos de entrega</a></li>
                            <li><a href="/">Política de trocas</a></li>
                            <li><a href="/">Formas de pagamento</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-column">
                        <h3>Fale conosco</h3>
                        <p>contato@tradecenter.com.br</p>
                        <p>(11) 3456-7890</p>
                        <div className="social-links">
                            <a href="/"><i className="fab fa-facebook"></i></a>
                            <a href="/"><i className="fab fa-instagram"></i></a>
                            <a href="/"><i className="fab fa-twitter"></i></a>
                            <a href="/"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2025 TRADE CENTER - Todos os direitos reservados</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;