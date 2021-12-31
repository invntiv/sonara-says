import "./Simon.css";
import { useState, useEffect } from "react";
import timeout from "../../utils/timeout";
import Game from "../../interface/Game";
import ColorButton from "../ColorButton/ColorButton";


const colorList = ["green", "red", "yellow", "blue"]; // our list of button colors, we use this for instantiating button objects and picking random colors

const baseTimeoutLengthMs: number = 1000; // setting in milliseconds for time between flashes/turns
const initializeGame: Game = { // our game state "defaults" when initializing
    displayingColors: false,
    colors: [],
    score: 0,
    userTurn: false,
    userColors: [],
}; 

function Simon() {
    /********************************************************  
     *                      Game LOGIC 
     ********************************************************/

    // UseState
    const [isActive, setActive] = useState(false); // whether or not a game is currently being played
    const [gameData, setGameData] = useState(initializeGame); // our game's state object
    const [flashColor, setFlashColor] = useState(""); // the state value of the color currently being flashed
    const [highScore, setHighScore] = useState(0);

    function startGame() {
        setActive(true);
        // select a random color
        let newColor = colorList[Math.floor(Math.random() * 4)];
        setGameData({ ...initializeGame, displayingColors: true,  colors: [newColor]}) // spread operator destructures object and replaces any values that follow
    }

    // UseEffect
    useEffect(() => {
        // When the component reloads (after gameData is being set!)
        /// Function we'll use to display the colors each turn:
        async function playTurnColors() {
            const turnTimeoutLengthMs = Math.max( baseTimeoutLengthMs - gameData.colors.length *(100), 50);

            await timeout(baseTimeoutLengthMs);
            for (let i = 0; i < gameData.colors.length; i++) {
                setFlashColor(gameData.colors[i]);
                await timeout(turnTimeoutLengthMs);
                setFlashColor("");
                await timeout(turnTimeoutLengthMs);
                
                if (i == gameData.colors.length -1){
                    setGameData(gameData => ({
                        ...gameData,
                        displayingColors: false,
                        userTurn: true,
                        userColors: [...gameData.colors].reverse(),
                    }))
                }
            }
        }

        // If the game is active, and we're in the Computer's half of a turn, and we have colors to display then run our async function:
        if (isActive && gameData.displayingColors 
            && gameData.colors.length) {
            playTurnColors();
        }
    }, [isActive, gameData.displayingColors, gameData.colors])


    async function buttonClick(color: string) {
        //  if it's the user's turn to repeat the sequence...
        if(!gameData.displayingColors && gameData.userTurn) {
            // copy the array which is gameData.color in reverse
            const copyUserColors = [...gameData.userColors];
            const prevColor = copyUserColors.pop();
         
            if (color === prevColor){ // the user has guessed correctly
                // check if theres any left
                setGameData({ ...gameData, userColors: copyUserColors });
                if(copyUserColors.length === 0 || copyUserColors.length === undefined) {

                    // the user has repeated the whole sequence. switch back to the Computer
                    await timeout(baseTimeoutLengthMs);

                    // Select a random color
                    let newColor = colorList[Math.floor(Math.random() * 4)];
                    setGameData(gameData => ({
                        ...gameData,
                        displayingColors: true,
                        userTurn: false,
                        score: gameData.colors.length,
                        userColors: [],
                        colors: [...gameData.colors, newColor]
                    }));
                }
                
            } else {
                setGameData(gameData =>({...initializeGame, score: gameData.colors.length})); // the user has guessed incorrectly, set the final score and reinitialize
                if (gameData.score > highScore) {
                    setHighScore(gameData.score);
                }
            }
            // await timeout(timeoutLengthMs); // buffer time 
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

                        {/* use our list of colors and map() to instantiate our buttons */}                  
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

        {/* display this when the player loses: */}                  
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
        
        {/* display the start game button while the game is inactive */}
        {!isActive && !gameData.score && (
            <button onClick={startGame} className="start-end-button">Start</button>
        )}

        {isActive && !gameData.displayingColors && !gameData.userTurn && gameData.score && (
            <div>
                <button onClick={endGame} className="start-end-button">End</button>
                <div className="final-score">Final Score: {gameData.score - 1}</div>
                <div className="final-score">High Score: {highScore}</div>
            </div>
        )}

    </div>
    )
}
    
export default Simon;