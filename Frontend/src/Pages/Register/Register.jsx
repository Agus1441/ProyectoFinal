import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RegisterModal from '../../Components/Register/Modal';


const RegisterPage = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (location.state?.openModal) {
            setIsModalOpen(true);
        }
    }, [location.state]);

    return (
        <div>
            <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};
 
export default RegisterPage;
