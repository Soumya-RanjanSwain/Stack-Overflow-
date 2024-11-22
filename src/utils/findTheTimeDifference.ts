export function getTimeDifference(unixTimestamp: number): string {
    const currentTime = Math.floor(Date.now() / 1000);
    const differenceInSeconds = currentTime - unixTimestamp;
    const absDifference = Math.abs(differenceInSeconds);

    const years = Math.floor(absDifference / (365 * 24 * 3600));
    const months = Math.floor(absDifference / (30 * 24 * 3600)) % 12;
    const days = Math.floor((absDifference % (30 * 24 * 3600)) / (24 * 3600));
    const hours = Math.floor((absDifference % (24 * 3600)) / 3600);
    const minutes = Math.floor((absDifference % 3600) / 60);
    const seconds = absDifference % 60;

    let result = '';

    if (years > 0) {
        result = `${years} year${years > 1 ? 's' : ''}`;
        if (months > 0) result += `, ${months} month${months > 1 ? 's' : ''}`;
    } else if (months > 0) {
        result = `${months} month${months > 1 ? 's' : ''}`;
        if (days > 0) result += `, ${days} day${days > 1 ? 's' : ''}`;
    } else if (days > 0) {
        result = `${days} day${days > 1 ? 's' : ''}`;
        if (hours > 0) result += `, ${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        result = `${hours} hour${hours > 1 ? 's' : ''}`;
        if (minutes > 0) result += `, ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        result = `${minutes} minute${minutes > 1 ? 's' : ''}`;
        if (seconds > 0) result += `, ${seconds} second${seconds > 1 ? 's' : ''}`;
    } else {
        result = `${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    return differenceInSeconds < 0 ? `In ${result}` : `${result} ago`;
}
