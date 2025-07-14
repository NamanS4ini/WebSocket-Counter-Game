"use client";
import React, { useState } from 'react'
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import socket from '../lib/socketClient';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
    },
});

const ResetButton = ({ counter, counterData }: { counter: number, counterData: any }) => {
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [regretDialog, setRegretDialog] = useState(false);
    const [confirmAgain, setConfirmAgain] = useState(false);
    console.log(counterData);

    


    //* Function to handle resetting the counter
    //* It sends a PUT request to the server with the updated count set to 0
    const handleReset = async () => {
        console.log(counterData);
        socket.emit("reset", counterData._id);
    }



    //* Function to handle regret action
    //* It sends a PUT request to the server to increment the regret count
    const handleRegret = async () => {

        setConfirmAgain(false);
        socket.emit("regret", counterData._id);
        setRegretDialog(false);
        setConfirmDialog(false);

    }


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div>
                <Button className='h-12 w-48 text-2xl' variant="contained" color="error" onClick={() => setConfirmDialog(true)}>
                    Reset
                </Button>

                <Dialog
                    open={confirmDialog}
                    slots={{ transition: Transition }}
                    aria-describedby="alert-dialog-slide-description"
                    onClose={() => setConfirmDialog(false)}
                    slotProps={{
                        paper: {
                            sx: {
                                backgroundColor: '#000',
                                color: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(100, 100, 100, 0.1)',
                            },
                        },
                    }}
                >
                    <DialogTitle>Confirm Reset</DialogTitle>
                    <DialogContent className='flex flex-col items-center gap-4 p-4'>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to reset the counter?
                        </DialogContentText>
                    </DialogContent>
                    <div className='flex justify-center gap-4'>
                        <DialogActions>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setConfirmAgain(true);
                                    setConfirmDialog(false);
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => setConfirmDialog(false)}
                            >
                                No
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
                <Dialog
                    open={confirmAgain}
                    slots={{ transition: Transition }}
                    aria-describedby="alert-dialog-slide-description"
                    onClose={() => setConfirmAgain(false)}
                    slotProps={{
                        paper: {
                            sx: {
                                backgroundColor: '#000',
                                color: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(100, 100, 100, 0.1)',
                            },
                        },
                    }}
                >
                    <DialogTitle>Are you sure sure?</DialogTitle>
                    <DialogContent className='flex flex-col items-center gap-4 p-4'>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span className='font-bold text-red-500'>{(counterData?.playerCount || 0)}</span> people tried their best to make the counter reach <span className='font-bold text-green-500'>{counter}</span>
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span className='font-bold text-red-500'>{((counterData?.regretCount / counterData?.resetCount * 100) || 0).toFixed(2)}%</span> of the people who reset the counter, regretted it.
                        </DialogContentText>
                    </DialogContent>
                    <div className='flex justify-center gap-4'>
                        <DialogActions>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setConfirmAgain(false);
                                    setRegretDialog(true);
                                    handleReset();
                                    setConfirmDialog(false);
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => setConfirmAgain(false)}
                            >
                                No
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
                <Dialog
                    open={regretDialog}
                    slots={{ transition: Transition }}
                    aria-describedby="alert-dialog-slide-description"
                    onClose={() => setRegretDialog(false)}
                    slotProps={{
                        paper: {
                            sx: {
                                backgroundColor: '#000',
                                color: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(100, 100, 100, 0.1)',
                            },
                        },
                    }}
                >
                    <DialogTitle>People will hate you for this</DialogTitle>
                    <DialogContent className='flex flex-col items-center gap-4 p-4'>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span className='font-bold text-red-500'>Are you Happy now, you monster.</span>
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span className='font-bold text-green-500'>Do you regret your action.</span>
                        </DialogContentText>

                    </DialogContent>
                    <div className='flex justify-center gap-4'>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleRegret}
                            >
                                Yes
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => { setRegretDialog(false); }}
                            >
                                No
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        </ThemeProvider>
    )
}

export default ResetButton