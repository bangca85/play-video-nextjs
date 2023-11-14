export interface Subtitle {
    start: number;
    end: number;
    text: string;
}

export const parseSrt = (srtContent: string): Subtitle[] => {
    const subtitles: Subtitle[] = [];
    const lines = srtContent.split('\n');

    let subtitle: Partial<Subtitle> = {};
    lines.forEach(line => {
        if (!line.trim()) {
            if (subtitle.start !== undefined && subtitle.end !== undefined && subtitle.text) {
                subtitles.push(subtitle as Subtitle);
                subtitle = {};
            }
        } else if (!subtitle.start || !subtitle.end) {
            const times = line.split(' --> ');
            if (times.length === 2) {
                subtitle.start = timeToSeconds(times[0]);
                subtitle.end = timeToSeconds(times[1]);
            }
        } else {
            subtitle.text = (subtitle.text ? subtitle.text + ' ' : '') + line.trim();
        }
    });

    return subtitles;
};

const timeToSeconds = (timeStr: string): number => {
    const [hours, minutes, seconds] = timeStr.split(':');
    return (
        parseInt(hours) * 3600 +
        parseInt(minutes) * 60 +
        parseFloat(seconds.replace(',', '.'))
    );
};
