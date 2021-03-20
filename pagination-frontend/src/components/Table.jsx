import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const url = 'http://localhost:3000/data?'

const useStyles = makeStyles({
    root: {
        border: '1px solid black'
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: "38px",
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    subGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

const DefaultTable = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [currPage, setCurrPage] = useState(1)
    const [count, setCount] = useState(0)
    const [buttons, setButtons] = useState({
        firstButton: false,
        nextButton: false,
        prevButton: false,
        lastButton: false
    })

    const styles = useStyles();

    const resetButtonStatus = (buttons) => {
        buttons.nextButton = false;
        buttons.firstButton = false;
        buttons.prevButton = false;
        buttons.lastButton = false;
    }

    const setButtonStatus = () => {
        let newState = { ...buttons }
        if (count === 1) {
            setButtons({
                nextButton: true,
                firstButton: true,
                prevButton: true,
                lastButton: true
            })
            return;
        }
        resetButtonStatus(newState);
        if (page === 1) {
            resetButtonStatus(buttons)
            newState.firstButton = true;
            newState.prevButton = true;
        }
        if (page === count) {
            resetButtonStatus(buttons)
            newState.lastButton = true;
            newState.nextButton = true;
        }

        setButtons(newState);
    }

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`${url}page=${page}&size=${10}`)
            console.log(result.data.page)
            setData(result.data.users);
            console.log(result.data.count)
            setCount(Math.round(result.data.count / 10))
            setButtonStatus()
            console.log(count)
        }
        getData()

    }, [])

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`${url}page=${page}&size=${10}`)
            setData(result.data.users)
            console.log(result.data.page)
            setButtonStatus()
        }
        getData()
    }, [page])

    return (
        <Grid container>
            <Grid item xs={3}></Grid>
            <Grid container item xs={6} spacing={3}>
                <TableContainer>
                    <Table className={styles.root}>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Ip Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(data.length === 0 ? <></> : data.map(ele => {
                                return (
                                    <TableRow>
                                        <TableCell>{ele.first_name}</TableCell>
                                        <TableCell>{ele.last_name}</TableCell>
                                        <TableCell>{ele.email}</TableCell>
                                        <TableCell>{ele.gender}</TableCell>
                                        <TableCell>{ele.ip_address}</TableCell>
                                    </TableRow>
                                )
                            }))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid item xs={3} className={styles.subGrid}>
                    <Button className={styles.button} onClick={(e) => setPage(1)}
                        disabled={buttons.firstButton}>first</Button>
                </Grid>
                <Grid item xs={3} className={styles.subGrid}>
                    <Button className={styles.button} onClick={(e) => setPage((prevState) => prevState - 1)}
                        disabled={buttons.prevButton}>prev</Button>
                </Grid>
                <Grid item xs={3} className={styles.subGrid}>
                    <Button className={styles.button} onClick={(e) => setPage((prevState) => prevState + 1)}
                        disabled={buttons.nextButton}>next</Button>
                </Grid>
                <Grid item xs={3} className={styles.subGrid}>
                    <Button className={styles.button} onClick={(e) => setPage(count)}
                        disabled={buttons.lastButton}>last</Button>
                </Grid>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    )
}

export default DefaultTable