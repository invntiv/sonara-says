import "./Simon.css";
import {useState, useEffect} from "react";
import timeout from "../../utils/timeout";
import Game from "../../interface/Game";
import ColorButton from "../ColorButton/ColorButton";

const initializeGame: Game = {
    displayingColors: false,
    colors: [],
    score: 0,
    userTurn: false,
    userColors: []
};

function Simon() {
    /********************************************************  
     *                      Game LOGIC 
     ********************************************************/
    const colorList = ["green", "red", "yellow", "blue"];


    // UseState
    const [isActive, setActive] = useState(false);
    const [gameData, setGameData] = useState(initializeGame);
    const [flashColor, setFlashColor] = useState("");

    function startGame() {
        setActive(true);
    }

    async function playTurnColors() {
        await timeout(1000);
        for (let i= 0; i < gameData.colors.length; i++) {
            setFlashColor(gameData.colors[i]);
            await timeout(1000);
            setFlashColor("");
            await timeout(1000);

            if (i === gameData.colors.length -1){

                setGameData(gameData => ({
                    ...gameData,
                    displayingColors: false,
                    userTurn: true,
                    userColors: [...gameData.colors].reverse(),
                }))
            }
        }
    }

    // UseEffect
    useEffect(() => {
        if (isActive) {
            setGameData({ ...initializeGame, displayingColors: true})
        } else {
            setGameData(initializeGame);
        }
    },[isActive, initializeGame])

    useEffect(() => {
        if (isActive && gameData.displayingColors) {
            // Select a random color
            let newColor = colorList[Math.floor(Math.random() * 4)];
            
            // Make a copy of the game's turn colors
            const copyColors = [...gameData.colors];

            // Add a new color to the copy, then replace turn data
            copyColors.push(newColor);
            setGameData(gameData =>({...gameData, colors: copyColors}));
        }
    
    }, [ gameData.displayingColors, colorList, gameData, isActive ]);

    useEffect(() => {
        if (isActive && gameData.displayingColors && gameData.colors.length) {
            playTurnColors();
        }
    }, [isActive, gameData.displayingColors, gameData.colors.length, playTurnColors])



    async function buttonClick(color: string) {
        // Make sure the player can't initiate click function during replay
        if(!gameData.displayingColors && gameData.userTurn){
            const copyUserColors = [...gameData.userColors];
            const prevColor = copyUserColors.pop(); //take last
            setFlashColor(color);

            if (color === prevColor){
                setGameData({ ...gameData, userColors: copyUserColors });
            } else {
                await timeout(1000);
                setGameData(gameData => ({
                    ...gameData,
                    displayingColors: true,
                    userTurn: false,
                    score: gameData.colors.length,
                    userColors: [],
                }));
            }
        } else {
            await timeout(1000);
            setGameData(gameData =>({...initializeGame, score: gameData.colors.length}));
        }
        await timeout(1000);
        setFlashColor("");
    }   

    function endGame() {
        setActive(false);
    }

    /********************************************************  
     *                      Game UI 
     ********************************************************/
    return (
    <div className="container"> 
        <div className="simon">
            <div className="simon-outer">
                    <div className="simon-inner">
                        {colorList && 
                        colorList.map((v, i) => (
                        <ColorButton 
                            onClick={() => {
                                buttonClick(v);
                            }}
                            flashing={flashColor === v}
                            color={v}
                            key={colorList[i]}
                        ></ColorButton>
                        ))}
                        {isActive && !gameData.displayingColors && !gameData.userTurn && gameData.score && (
                            <div className="lost">
                                <div> Final Score: {gameData.score}</div>
                                <button onClick={endGame}>End</button>
                            </div>
                        )}
                
                    <div className="cutout">
                        {isActive && (gameData.displayingColors || gameData.userTurn) && (
                        <div>{gameData.score}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {!isActive && !gameData.score && (
        <button onClick={startGame} className="start-button">Start</button>
        )}
    </div>
    )
}
    
export default Simon;