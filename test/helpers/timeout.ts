export function setTimeoutAsync(timeout: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve()}, timeout);
    });
};