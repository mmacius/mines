import { useEffect, useState, useCallback } from 'react';

function App() {
    const initialBalance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 10000;
    const [balance, setBalance] = useState(initialBalance);

    const [minesAmount, setMinesAmount] = useState(1);
    const [mines, setMines] = useState([]);
    const [discoveredFields, setDiscoveredFields] = useState(Array(25).fill(false));
    const [clickedFields, setClickedFields] = useState([]);

    const [bet, setBet] = useState(100);

    const [started, setStarted] = useState(false);
    const [buttonText, setButtonText] = useState("Start Game");

    const [winAmount, setWinAmount] = useState(0);
    const [multiplier, setMultiplier] = useState(0);

    const createTab = useCallback((amount) => {
        const newMines = Array(25).fill(0);
        const bombIndices = new Set();
        while (bombIndices.size < amount) {
            const randomI = Math.floor(Math.random() * newMines.length);
            bombIndices.add(randomI);
        }

        bombIndices.forEach(i => {
            newMines[i] = 1;
        });

        setMines(newMines);
    }, []);

    const startGame = useCallback(() => {
        if (balance < bet) {
            Swal.fire({
                title: 'Error!',
                text: 'You don\'t have enough funds in your account',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            setBalance(prevBalance => prevBalance - bet);
            setStarted(true);
            setButtonText("End Game");
            console.log("Starting game with mines:", minesAmount);
            createTab(minesAmount);
            console.log(minesAmount)
            setDiscoveredFields(Array(25).fill(false));
            setMultiplier(0);
            setClickedFields([]);
        }
    }, [balance, bet, minesAmount, createTab]);

    const [startFunction, setStartFunction] = useState(() => startGame);


    const endGame = useCallback(() => {
        if (started) {
            setStarted(false);
            setStartFunction(() => startGame);
            setButtonText("Start Game");
            setBalance(prevBalance => prevBalance + winAmount);
            if (winAmount > 0) {
                Swal.fire({
                    title: 'Win!',
                    text: 'You won $' + winAmount,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
            setMultiplier(0);
            setWinAmount(0);
            setDiscoveredFields(Array(25).fill(true));
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }, [started, winAmount, multiplier]);

    const changeMines = useCallback((e) => {
        const newMinesAmount = parseInt(e.target.value);
        setMinesAmount(newMinesAmount);
        console.log("Updated mines amount:", newMinesAmount);
    }, []);

    const uncoverField = (index) => {
        if (!started) {
            return;
        } else if (clickedFields.includes(index)) {
            return;
        } else {
            setClickedFields(prev => [...prev, index]);
            setDiscoveredFields(prev => {
                const newDiscoveredFields = [...prev];
                newDiscoveredFields[index] = true;
                return newDiscoveredFields;
            });

            if (mines[index] === 1) {
                endGame();
                setDiscoveredFields(Array(25).fill(true));
                Swal.fire({
                    title: 'Game Over!',
                    text: 'You hit a mine.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            } else {
                if (mines[index] === 0) {
                    setMultiplier(prevMultiplier => {
                        const multiplierMines = minesAmount / 1.85;
                        const newMultiplier = prevMultiplier + multiplierMines;
                        return newMultiplier;
                    });
                }
            }
        }
    };

    const changeBet = (value) => {
        if (value === "+") {
            if (bet + 100 <= balance) {
                setBet(bet + 100);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'You don\'t have enough funds in your account',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } else if (value === "-") {
            if (bet > 100) {
                setBet(bet - 100);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'You can\'t bet less than 100$',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    };

    useEffect(() => {
        localStorage.setItem("balance", balance);
    }, [balance]);

    useEffect(() => {
        const newWinAmount = Math.floor(multiplier * bet);
        setWinAmount(newWinAmount);
    }, [multiplier, bet]);

    useEffect(() => {
        if (!started) {
            setStartFunction(() => startGame);
        } else {
            setStartFunction(() => endGame);
        }
    }, [started, startGame, endGame]);


    return (
        <>
            <main>
                <table>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, rowI) => (
                            <tr key={rowI}>
                                {Array.from({ length: 5 }).map((_, colI) => {
                                    const i = rowI * 5 + colI;
                                    return (
                                        <td
                                            key={i}
                                            onClick={() => uncoverField(i)}
                                            className={clickedFields.includes(i) ? 'clicked' : ''}
                                        >
                                            {discoveredFields[i] ? mines[i] == 1 ? <ion-icon name="skull-outline"></ion-icon> : <ion-icon name="diamond-outline"></ion-icon> : ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <section>
                    <section>
                        <section>
                            <h1>Mines Count <span>{minesAmount}</span></h1>
                            <input className={started ? "disable" : ""} type="range" min={1} max={24} value={minesAmount} onChange={changeMines}/>
                        </section>
                        <section>
                            <h1>Your Balance</h1>
                            <span>${balance}</span>
                        </section>
                    </section>
                    <section>
                        <h1 className={started ? 'enabled' : 'disabled'}>Current multiplier: {multiplier.toFixed(2)}</h1>
                        <section>
                            <h1>Bet Value</h1>
                            <section className={started ? "disable" : ""}>
                                <button onClick={() => changeBet("-")}><ion-icon name="remove"></ion-icon></button>
                                <button>{bet}</button>
                                <button onClick={() => changeBet("+")}><ion-icon name="add"></ion-icon></button>
                            </section>
                        </section>
                        <button onClick={startFunction}>{buttonText}</button>
                    </section>
                </section>
            </main>
        </>
    );
}

export default App;