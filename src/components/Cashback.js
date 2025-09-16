import React from 'react';

function Cashback() {
    return (
        <div className="container">
            <div className="page-content">
                <h2 className="section-title">Sistema de Cashback</h2>
                <p style={{textAlign: 'center'}}>No TRADE CENTER, quanto mais você compra, mais cashback você ganha!</p>
                
                <div className="cashback-system">
                    <h3>Como funciona nosso cashback:</h3>
                    
                    <div className="cashback-tier">
                        <div className="cashback-icon">
                            <i className="fas fa-coins"></i>
                        </div>
                        <div>
                            <h4>Nível Bronze (até R$ 500 em compras)</h4>
                            <p>Ganhe de 2% a 5% de cashback em suas compras</p>
                        </div>
                    </div>
                    
                    <div className="cashback-tier">
                        <div className="cashback-icon">
                            <i className="fas fa-medal"></i>
                        </div>
                        <div>
                            <h4>Nível Prata (R$ 500 a R$ 1500 em compras)</h4>
                            <p>Ganhe de 5% a 8% de cashback em suas compras</p>
                        </div>
                    </div>
                    
                    <div className="cashback-tier">
                        <div className="cashback-icon">
                            <i className="fas fa-crown"></i>
                        </div>
                        <div>
                            <h4>Nível Ouro (acima de R$ 1500 em compras)</h4>
                            <p>Ganhe de 8% a 12% de cashback em suas compras</p>
                        </div>
                    </div>
                    
                    <p>O cashback é creditado automaticamente em sua conta e pode ser usado como desconto em compras futuras!</p>
                </div>
            </div>
        </div>
    );
}

export default Cashback;