import React, { useState } from 'react';

function RegisterForm({ userType, setUser, setCurrentView }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        employeeCode: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulando cadastro bem-sucedido
        if (setUser) {
            setUser({
                name: formData.name,
                email: formData.email,
                type: userType
            });
        }
        setCurrentView('home');
        alert(userType === 'client' ? 'Cadastro realizado com sucesso!' : 'Acesso concedido!');
    };
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            {userType === 'employee' && (
                <div className="form-group">
                    <label htmlFor="employeeCode">Código do Funcionário</label>
                    <input 
                        type="text" 
                        id="employeeCode" 
                        name="employeeCode" 
                        value={formData.employeeCode} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
            )}
            
            <button type="submit" className="btn" style={{width: '100%'}}>
                {userType === 'client' ? 'Criar conta' : 'Acessar sistema'}
            </button>
        </form>
    );
}

export default RegisterForm;