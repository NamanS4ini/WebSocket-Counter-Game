"use client";
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import ResetButton from './ResetButton';

interface Data {
    _id: string;
    count: number;
    allTimeHigh: number;
    resetCount: number;
    regretCount: number;
}

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [firstLoad, setFirstLoad] = useState<boolean | null>(null);
    const [data, setData] = useState<null | Data>(null);
    const [id, setId] = useState('');

    //* Function to handle incrementing the counter
    //* It sends a PUT request to the server with the updated count
    const handleIncrement = async () => {
        const res = await fetch('/api/counter', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, firstLoad }),
        });
        const data = await res.json();
        setCounter(data.count);
        if (firstLoad) {
            localStorage.setItem('firstLoad', 'false');
            setFirstLoad(false);
        }
        setData(data);
    };



    useEffect(() => {

        //* Fetch the counter data from the server
        const fetchData = async () => {
            const response = await fetch('/api/counter', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            data && setData(data);
            data && setId(data._id);
            data && setCounter(data.count);

            //* If no data is found, create a new counter with count 0
            if (data == null) {
                const response = await fetch('/api/counter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                fetchData();
            }
        };
        fetchData();
        if (localStorage.getItem('firstLoad') === null) {
            localStorage.setItem('firstLoad', 'true');
            setFirstLoad(true);
        }
        else {
            setFirstLoad(localStorage.getItem('firstLoad') === 'true');
        }
    }, []);


    return (
        <div className='flex flex-col items-center gap-4 justify-around max-h-96 h-screen'>
            <div>
                <h1 className='text-3xl font-bold'>All time high: {<span className=' text-green-500'>{data?.allTimeHigh || 0}</span>}</h1>

            </div>
            <div className='text-5xl font-bold'>
                {counter}
            </div>
            <div className='flex flex-col items-center gap-4'>

                <div className='flex'>
                    <Button className='h-12 w-48 text-2xl' variant="contained" color="success" onClick={handleIncrement}>
                        Increment
                    </Button>
                </div>
                <div>
                    <ResetButton counter={counter} setCounter={setCounter} counterData={data} setCounterData={setData} />
                </div>
            </div>
        </div>
    )
}

export default Counter