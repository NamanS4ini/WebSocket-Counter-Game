"use client";
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import ResetButton from './ResetButton';
import socket from '../lib/socketClient';

interface Data {
    _id: string;
    count: number;
    allTimeHigh: number;
    playerCount: number;
    resetCount: number;
    regretCount: number;
}

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [data, setData] = useState<null | Data>(null);
    const [id, setId] = useState('');

    //* Function to handle incrementing the counter
    //* It sends a PUT request to the server with the updated count
    const handleIncrement = async () => {
        if (!id) return; // Ensure id is set before emitting
        //* Emit the increment event to the WebSocket server
        socket.emit("increment", id);
        if (firstLoad) {
            setFirstLoad(false);
            socket.emit("firstLoad", id);
        }
    };


    useEffect(() => {
        //* Set up a WebSocket connection to listen for counter updates
        socket.on("connect", () => {
            console.log("Connected to WebSocket server");
        });
        socket.on("counterUpdated", (data) => {
            if(data.resetCount) {
                setFirstLoad(true);
            }

            setCounter(data.count);

            setData((prevData) =>
                prevData
                    ? { ...prevData, allTimeHigh: data.allTimeHigh ? data.allTimeHigh : prevData.allTimeHigh,
                        playerCount: data.playerCount ? data.playerCount : prevData.playerCount,
                        resetCount: data.resetCount ? data.resetCount : prevData.resetCount,
                        regretCount: data.regretCount ? data.regretCount : prevData.regretCount }
                    : null
            );
        });
        return () => {
            socket.off("connect");
            socket.off("counterUpdated");
        }
    }, []);



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
                    <ResetButton counter={counter} counterData={data} />
                </div>
            </div>
        </div>
    )
}

export default Counter