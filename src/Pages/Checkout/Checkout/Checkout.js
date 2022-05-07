import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../hooks/useServiceDetail';

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
   
    // const [user, setUser] = useState({
    //     name: 'Akbar the great',
    //     email: 'akbar@momo.taj',
    //     address: 'Tajmohol road Agra',
    //     phone: '0172222222'
    // })

    // const handleChange = event =>{
    //     console.log(event.target.value);
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     console.log(newUser);
    //     setUser(newUser)
    // }

    const handlePlaceOrder = event =>{
        event.preventDefault();
        const order = {
            name: event.target.name.value,
            email: event.target.email.value,
            service: event.target.service.value,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        // fetch('https://sleepy-plains-85482.herokuapp.com/order',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(order)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
        axios.post('https://sleepy-plains-85482.herokuapp.com/order',order)
        .then(response => {
            const {data} = response;
            if(data.insertedId){
                toast('Your order is taken by us successfully')
            }
        })
    }

    return (
        <div className='w-50 mx-auto' >
            <h2>Please book: {service.name}</h2>
            <form onSubmit={handlePlaceOrder} >
                <input className='mb-2 w-100' type="text" name="name" placeholder='Name' defaultValue={user.displayName} disabled required id="" />
                <br />
                <input className='mb-2 w-100' type="text" name="email" placeholder='email' defaultValue={user.email} disabled required id="" />
                <br />
                <input className='mb-2 w-100' type="text" name="service" placeholder='service' defaultValue={service.name} disabled required id="" />
                <br />
                <input className='mb-2 w-100' type="text" name="address" placeholder='address' autoComplete='off' required id="" />
                <br />
                <input className='mb-2 w-100' type="text" name="phone" placeholder='phone' required id="" />
                <br />
                <input className='btn btn-primary' type="submit" value="Place order" />
            </form>
        </div>
    );
};

export default Checkout;