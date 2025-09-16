import React, { useState } from 'react';

function CheckoutModal({ total, onClose, onComplete }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        paymentMethod: 'credit'
    });
    
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleNextStep = () => setStep(step + 1);
    const handlePrevStep = () => setStep(step - 1);
    
    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div>
                        <h3>Informações Pessoais</h3>
                        <div className="form-group">
                            <label>Nome completo</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <button className="btn" onClick={handleNextStep}>Próximo</button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3>Endereço de Entrega</h3>
                        <div className="form-group">
                            <label>Endereço</label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button className="btn" onClick={handlePrevStep}>Voltar</button>
                            <button className="btn" onClick={handleNextStep}>Próximo</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3>Método de Pagamento</h3>
                        <div className="form-group">
                            <label>Forma de pagamento</label>
                            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                                <option value="credit">Cartão de Crédito</option>
                                <option value="debit">Cartão de Débito</option>
                                <option value="pix">PIX</option>
                                <option value="boleto">Boleto Bancário</option>
                            </select>
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button className="btn" onClick={handlePrevStep}>Voltar</button>
                            <button className="btn" onClick={handleNextStep}>Próximo</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h3>Confirmação</h3>
                        <p>Revise seus dados antes de finalizar a compra:</p>
                        <div className="summary-row"><strong>Nome:</strong> <span>{formData.name}</span></div>
                        <div className="summary-row"><strong>E-mail:</strong> <span>{formData.email}</span></div>
                        <div className="summary-row"><strong>Endereço:</strong> <span>{formData.address}</span></div>
                        <div className="summary-row"><strong>Cidade:</strong> <span>{formData.city}</span></div>
                        <div className="summary-row"><strong>Pagamento:</strong> <span>
                            {formData.paymentMethod === 'credit' && 'Cartão de Crédito'}
                            {formData.paymentMethod === 'debit' && 'Cartão de Débito'}
                            {formData.paymentMethod === 'pix' && 'PIX'}
                            {formData.paymentMethod === 'boleto' && 'Boleto Bancário'}
                        </span></div>
                        <div className="summary-total"><strong>Total:</strong> <span>R$ {total}</span></div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button className="btn" onClick={handlePrevStep}>Voltar</button>
                            <button className="checkout-btn" onClick={onComplete}>Confirmar Compra</button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">Finalizar Compra</h2>
                    <button className="close-modal" onClick={onClose}>&times;</button>
                </div>
                <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: step >= 1 ? 'bold' : 'normal', color: step >= 1 ? '#ff9900' : '#999'}}>1. Dados</span>
                    <span style={{fontWeight: step >= 2 ? 'bold' : 'normal', color: step >= 2 ? '#ff9900' : '#999'}}>2. Endereço</span>
                    <span style={{fontWeight: step >= 3 ? 'bold' : 'normal', color: step >= 3 ? '#ff9900' : '#999'}}>3. Pagamento</span>
                    <span style={{fontWeight: step >= 4 ? 'bold' : 'normal', color: step >= 4 ? '#ff9900' : '#999'}}>4. Confirmação</span>
                </div>
                {renderStep()}
            </div>
        </div>
    );
}

export default CheckoutModal;