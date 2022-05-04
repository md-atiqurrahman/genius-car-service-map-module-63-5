import React from 'react';
import useServices from '../hooks/useServices';

const ManageServices = () => {
    const [services, setServices] = useServices();

    const handleDelete = id =>{

        const url = `http://localhost:5000/service/${id}`;

        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            const proceed = window.confirm('Are you sure?');
            if(proceed){
                const remaining = services.filter(service => service._id !== id);
                setServices(remaining);
            }
        })

    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='mb-3'>Manage your services: {services.length}</h2>
                {
                    services.map(service => <h5 key={service._id}>{service.name} <button onClick={ () => handleDelete(service._id)}>x</button></h5> )
                }
            
        </div>
    );
};

export default ManageServices;