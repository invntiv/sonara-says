import "./Simon.css";
import { useState, useEffect } from "react";
import timeout from "../../utils/timeout";
import Game from "../../interface/Game";
import ColorButton from "../ColorButton/ColorButton";


const colorList = ["green", "red", "yellow", "blue"];

const timeoutLengthMs: number = 750;

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

    // UseState
    const [isActive, setActive] = useState(false);
    const [gameData, setGameData] = useState(initializeGame);
    const [flashColor, setFlashColor] = useState("");

    function startGame() {
        setActive(true);
        setGameData({ ...initializeGame, displayingColors: true})
    }

    // UseEffect
    useEffect(() => {
        // When the component reloads (after gameData is being set!)
        /// Function we'll use to display the colors:
        async function playTurnColors() {

            await timeout(1000);
            for (let i = 0; i < gameData.colors.length; i++) {
                setFlashColor(gameData.colors[i]);
                await timeout(timeoutLengthMs);
                setFlashColor("");
                await timeout(timeoutLengthMs);
    
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

        // If the game is active, and we're displaying the color sequence, and we have colors to display then run:
        if (isActive && gameData.displayingColors && gameData.colors.length) {
            playTurnColors();
        }
    }, [isActive, gameData.displayingColors, gameData.colors])

    useEffect(() => {
        // Only runs during gameplay and when were displaying the color sequence
        if (isActive && gameData.displayingColors) {
            // Select a random color
            let newColor = colorList[Math.floor(Math.random() * 4)];
            setGameData((gameData) => ({
                ...gameData,
                colors: [...gameData.colors, newColor]
            }));
        }
      }, [gameData.displayingColors, isActive]);


    async function buttonClick(color: string) {
        //  if it's the user's turn to repeat the sequence...
        if(!gameData.displayingColors && gameData.userTurn) {
            // copy the array which is gameData.color in reverse
            const copyUserColors = [...gameData.userColors];
            const prevColor = copyUserColors.pop();
            setFlashColor(color);
            // at this point we've popped the top item off the copy, and flashed the one we've clicked

            // Check if the color matches. if it DOESNT, the game ends.
            // If it does match, the user has selected correctly and we can update userColors.
            // We also need to check for when the sequence is over and the turn passes and update the score
            
            if (color === prevColor){ // the user has guessed correctly
                // check if theres any left
                setGameData({ ...gameData, userColors: copyUserColors });
                if(copyUserColors.length === 0 || copyUserColors.length === undefined) {
                    // the user has repeated the whole sequence
                    timeout(timeoutLengthMs);
                    setGameData(gameData => ({
                        ...gameData,
                        displayingColors: true,
                        userTurn: false,
                        score: gameData.colors.length,
                        userColors: [],
                    }));
                }
            } else {
                setGameData(gameData =>({...initializeGame, score: gameData.colors.length}));
            }
            await timeout(timeoutLengthMs);
            setFlashColor("");
        } 
    }   

    function endGame() {
        setActive(false);
        setGameData(initializeGame);
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
                
                    <div className="cutout">
                        {isActive && (gameData.displayingColors || gameData.userTurn) && (
                            <div>{gameData.score}</div>
                        )}
                    </div>

        {isActive && !gameData.displayingColors && !gameData.userTurn && gameData.score && (
            <div className="simon-outer">
                <div className="blackout">
                    <div className="crying-face">😢 </div>
                </div>
                <button onClick={endGame} className="start-end-button">End</button>
                <div className="final-score">Final Score: {gameData.score - 1}</div>
            </div>
        )}
                </div>
            </div>
        </div>

        {!isActive && !gameData.score && (
            <button onClick={startGame} className="start-end-button">Start</button>
        )}

        {isActive && !gameData.displayingColors && !gameData.userTurn && gameData.score && (
            <div>
                <button onClick={endGame} className="start-end-button">End</button>
                <div className="final-score">Final Score: {gameData.score - 1}</div>
            </div>
        )}

    </div>
    )
}
    
export default Simon;