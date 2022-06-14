export const formatTimeElapsed = (seconds: number) => {
    let min = Math.floor(seconds / 60);
    seconds -= (min * 60);

    let secString = `${seconds < 10 ? '0' + seconds : seconds}`
    let minString = `${min < 10 ? '0' + min : min}`

    return `${minString}:${secString}`;

}