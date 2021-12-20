// // Simple timeout that resolves a promise after x milliseconds
export default function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
