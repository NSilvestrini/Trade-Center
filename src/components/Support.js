import React from 'react';

function Support() {
    return (
        <div className="container">
            <div className="page-content">
                <h2 className="section-title">Central de Atendimento</h2>
                <p style={{textAlign: 'center'}}>Estamos aqui para ajudar você!</p>
                
                <div className="support-options">
                    <div className="support-card">
                        <div className="support-icon">
                            <i className="fas fa-phone"></i>
                        </div>
                        <h3>Telefone</h3>
                        <p>(11) 3456-7890</p>
                        <p>Seg a Sex: 8h às 22h</p>
                        <p>Sáb e Dom: 9h às 18h</p>
                    </div>
                    
                    <div className="support-card">
                        <div className="support-icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <h3>E-mail</h3>
                        <p>contato@tradecenter.com.br</p>
                        <p>Respondemos em até 24h</p>
                    </div>
                    
                    <div className="support-card">
                        <div className="support-icon">
                            <i className="fas fa-comments"></i>
                        </div>
                        <h3>Chat Online</h3>
                        <p>Atendimento instantâneo</p>
                        <p>Disponível 24/7</p>
                    </div>
                    
                    <div className="support-card">
                        <div className="support-icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <h3>Lojas Físicas</h3>
                        <p>Encontre a loja mais próxima</p>
                        <p>Mais de 50 lojas em todo o Brasil</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support;