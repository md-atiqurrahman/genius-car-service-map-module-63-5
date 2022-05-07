import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data =>{
        console.log(data);
        const url = `https://sleepy-plains-85482.herokuapp.com/service`;
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result =>{
            console.log(result);
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please add a service</h2>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' required placeholder='Name'{...register("name", { required: true, maxLength: 20 })} />
                <textarea className='mb-2' required placeholder='Description'{...register("description")} />
                <input className='mb-2' required placeholder='Price' type="number" {...register("price")} />
                <input className='mb-2' required placeholder='Photo url' type="text" {...register("img")} />
                <input type="submit" value="Add service" />
            </form>
        </div>
    );
};

export default AddService;