export function getTimeDifference(unixTimestamp: number): string {

    const currentTime = Math.floor(Date.now() / 1000);

    const differenceInSeconds = currentTime - unixTimestamp;

    const absDifference = Math.abs(differenceInSeconds);

    const days = Math.floor(absDifference / (24 * 3600));
    const hours = Math.floor((absDifference % (24 * 3600)) / 3600);
    const minutes = Math.floor((absDifference % 3600) / 60);
    const seconds = absDifference % 60;

    let result = '';
    if (days > 0) result += `${days} day${days > 1 ? 's' : ''}, `;
    if (hours > 0 || days > 0) result += `${hours} hour${hours > 1 ? 's' : ''}, `;
    if (minutes > 0 || hours > 0 || days > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}, `;
    result += `${seconds} second${seconds > 1 ? 's' : ''}`;

    return differenceInSeconds < 0 ? `In ${result}` : `${result} ago`;
}
