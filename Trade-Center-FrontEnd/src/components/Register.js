import React from 'react';
import RegisterForm from './RegisterForm';

function Register({ userType, setUserType, setUser, setCurrentView }) {
    return (
        <div className="container">
            <div className="form-section">
                <div className="form-toggle">
                    <button 
                        className={userType === 'client' ? 'active' : ''} 
                        onClick={() => setUserType('client')}
                    >
                        Sou Cliente
                    </button>
                    <button 
                        className={userType === 'employee' ? 'active' : ''} 
                        onClick={() => setUserType('employee')}
                    >
                        Sou Funcionário
                    </button>
                </div>
                
                <h2 className="form-title">
                    {userType === 'client' ? 'Cadastro de Cliente' : 'Acesso de Funcionário'}
                </h2>
                
                <RegisterForm 
                    userType={userType} 
                    setUser={setUser} 
                    setCurrentView={setCurrentView} 
                />
            </div>
        </div>
    );
}

export default Register;