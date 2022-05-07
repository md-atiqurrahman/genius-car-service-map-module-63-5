import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const email = user.email;
        const getOrders = async () => {
            const url = `https://sleepy-plains-85482.herokuapp.com/order?email=${email}`
            const { data } = await axios.get(url);
            setOrders(data);
        }
        getOrders();
    }, [user])

    return (
        <div>
            <h2>your order is here: {orders.length}</h2>
        </div>
    );
};

export default Orders;