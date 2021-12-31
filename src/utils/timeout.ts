// // Simple timeout that resolves a promise after x milliseconds. we don't have a reject portion, only a resolve
export default function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
