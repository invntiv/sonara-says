// Object that will contain game state
export default interface Game {
    displayingColors: boolean,
    colors: string[],
    score: number,
    userTurn: boolean,
    userColors: string[],
}