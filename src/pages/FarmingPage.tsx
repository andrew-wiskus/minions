import React, { CSSProperties } from 'react';
import { INNER_COLOR, LEVEL_GREEN, OUTER_COLOR } from '../constants';
import { WEATHER_CLOUD_ICON, WEATHER_RAIN_ICON, WEATHER_STORM_ICON, WEATHER_SUN_ICON } from '../images/itemImages';

interface IWeather {
    icon: string;
}

let weatherConfig = {
    SUN: { icon: WEATHER_SUN_ICON },
    RAIN: { icon: WEATHER_RAIN_ICON },
    CLOUD: { icon: WEATHER_CLOUD_ICON },
    STORM: { icon: WEATHER_STORM_ICON },
};

class Weather {
    public icon;

    constructor(data: IWeather) {
        this.icon = data.icon;
    }
}

let weather = [
    new Weather(weatherConfig.SUN),
    new Weather(weatherConfig.CLOUD),
    new Weather(weatherConfig.STORM),
    new Weather(weatherConfig.RAIN),
    new Weather(weatherConfig.RAIN),
    new Weather(weatherConfig.SUN),
    new Weather(weatherConfig.SUN),
];

interface ISeed {
    name: string;
    growTime: number;
    yieldMin: number;
    yieldMax: number;
}

class Seed {
    public name: string;
    public growTime: number;
    public yieldMin: number;
    public yieldMax: number;
    public count: number;

    public get growTimeString() {
        return this.growTime / 1000 + 's';
    }

    public get yieldString() {
        return `${this.yieldMin} - ${this.yieldMax}`;
    }

    constructor(seed: ISeed, count: number) {
        this.name = seed.name;
        this.growTime = seed.growTime;
        this.yieldMin = seed.yieldMin;
        this.yieldMax = seed.yieldMax;
        this.count = count;
    }
}

let seedConfig = {
    POTATO: {
        name: 'potato',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    ONION: {
        name: 'onion',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    CABBAGE: {
        name: 'cabbage',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    TOMATO: {
        name: 'tomato',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    CORN: {
        name: 'corn',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    STRAWBERRY: {
        name: 'strawberry',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    WATERMELON: {
        name: 'watermelon',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    RED_BERRY: {
        name: 'RED BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    CADAVA_BERRY: {
        name: 'CADAVA BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    DWELL_BERRY: {
        name: 'DWELL BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    JANGER_BERRY: {
        name: 'JANGER BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    WHITE_BERRY: {
        name: 'WHITE BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    BAR_BERRY: {
        name: 'BAR BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    AVACADO: {
        name: 'AVACADO',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    MANGO: {
        name: 'MANGO',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    LYCHEE: {
        name: 'LYCHEE',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    // herbs

    GUAM: {
        name: 'GUAM',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    MARRENTILL: {
        name: 'MARRENTILL',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    TARROMIN: {
        name: 'TARROMIN',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    HARRALANDER: {
        name: 'HARRALANDER',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    RANARR: {
        name: 'RANARR',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    TOADFLAX: {
        name: 'TOADFLAX',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    IRIT: {
        name: 'IRIT',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    WERGALI: {
        name: 'WERGALI',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    AVANTOE: {
        name: 'AVANTOE',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    KWUARM: {
        name: 'KWUARM',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    BLOODWEED: {
        name: 'BLOODWEED',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    SNAPDRAGON: {
        name: 'SNAPDRAGON',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    CADANTINE: {
        name: 'CADANTINE',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    LANTADYME: {
        name: 'LANTADYME',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    ARBUCK: {
        name: 'ARBUCK',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    DWARF_WEED: {
        name: 'DWARF WEED',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    TORSTOL: {
        name: 'TORSTOL',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    FELLSTALK: {
        name: 'FELLSTALK',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    // trees
};

let ALL_FOOD_SEEDS = [
    new Seed(seedConfig.POTATO, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.ONION, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.CABBAGE, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.TOMATO, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.CORN, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.STRAWBERRY, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.WATERMELON, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.RED_BERRY, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.CADAVA_BERRY, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.DWELL_BERRY, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.JANGER_BERRY, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.WHITE_BERRY, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.BAR_BERRY, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.AVACADO, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.MANGO, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.LYCHEE, Math.floor(Math.random() * 1000)),
];

let ALL_HERB_SEEDS = [
    new Seed(seedConfig.GUAM, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.MARRENTILL, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.TARROMIN, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.HARRALANDER, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.RANARR, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.TOADFLAX, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.IRIT, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.WERGALI, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.AVANTOE, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.KWUARM, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.BLOODWEED, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.SNAPDRAGON, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.CADANTINE, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.LANTADYME, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.ARBUCK, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.DWARF_WEED, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.TORSTOL, Math.floor(Math.random() * 1000)),
    new Seed(seedConfig.FELLSTALK, Math.floor(Math.random() * 1000)),
];

export class FarmingPage extends React.Component {
    public render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: `100%`, paddingTop: 20 }}>
                <div
                    style={{
                        width: 460,
                        paddingBottom: 25,
                        borderRadius: 12,
                        backgroundColor: OUTER_COLOR,
                        position: 'relative',
                    }}
                >
                    <p style={{ color: 'white', marginLeft: 15, fontSize: 22 }}>farming</p>
                    <FarmingLevelBar percent={30} currentXP={211} nextXP={360} />
                    <FarmingInfoPanel />
                    <FarmingWeatherInfo weather={weather} />

                    <p style={{ color: 'white', paddingLeft: 20, paddingTop: 15 }}>fruits / vegtables</p>
                    <SeedList seeds={ALL_FOOD_SEEDS} />
                    <p style={{ color: 'white', paddingLeft: 20, paddingTop: 15 }}>herbs</p>
                    <SeedList seeds={ALL_HERB_SEEDS} />
                </div>
            </div>
        );
    }
}

export class SeedList extends React.Component<{ seeds: Seed[] }> {
    public render() {
        return (
            <div
                style={{
                    width: 420,
                    marginLeft: 20,
                    backgroundColor: INNER_COLOR,
                    borderRadius: 8,
                    // height: 210,
                }}
            >
                <div
                    style={{
                        borderBottom: '1px solid #FFFFFFCC',
                        height: 25,
                        width: `100%`,
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <div style={styles.seedHeader}>
                        <p>seed</p>
                    </div>
                    <div style={styles.growTimeHeader}>
                        <p>grow time</p>
                    </div>
                    <div style={styles.yieldHeader}>
                        <p>yield</p>
                    </div>
                    <div style={{ width: 74, height: `100%`, backgroundColor: '#FFFFFF55' }}></div>
                </div>

                {this.props.seeds.map((x) => {
                    return (
                        <div
                            style={{
                                borderBottom: '1px solid #FFFFFFCC',
                                height: 25,
                                width: `100%`,
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <div style={styles.seedHeader}>
                                <p>
                                    {x.name.toLowerCase()}({x.count})
                                </p>
                            </div>
                            <div style={styles.growTimeHeader}>
                                <p>{x.growTimeString}</p>
                            </div>
                            <div style={styles.yieldHeader}>
                                <p>{x.yieldString}</p>
                            </div>
                            <div style={{ width: 74, height: `100%`, backgroundColor: '#FFFFFF55', cursor: 'pointer' }}>
                                <p
                                    style={{
                                        color: 'white',
                                        margin: 0,
                                        fontSize: 12,
                                        width: `100%`,
                                        textAlign: 'center',
                                        marginTop: 6,
                                    }}
                                >
                                    plant
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
const styles = {
    seedHeader: {
        height: 25,
        display: 'flex',
        fontSize: 11,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '2px solid #FFFFFF44',
        width: 140,
    } as CSSProperties,
    growTimeHeader: {
        height: 25,
        display: 'flex',
        fontSize: 11,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '2px solid #FFFFFF44',
        width: 100,
    } as CSSProperties,
    yieldHeader: {
        height: 25,
        display: 'flex',
        fontSize: 11,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '2px solid #FFFFFF44',
        width: 100,
    } as CSSProperties,
};
export const FarmingWeatherInfo = (props: { weather: Weather[] }) => {
    return (
        <div
            style={{
                width: 380,
                height: 50,
                marginLeft: 40,
                marginTop: 20,
                marginBottom: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            {props.weather.map((x) => {
                return <img src={x.icon} style={{ width: 47, height: 47, borderRadius: 25, backgroundColor: 'grey' }} />;
            })}
        </div>
    );
};

export const FarmingInfoPanel = (props: {}) => {
    return (
        <div
            style={{
                width: 420,
                borderRadius: 8,
                height: 70,
                overflow: 'hidden',
                backgroundColor: INNER_COLOR,
                marginLeft: 20,
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: `100%`,
                    width: `50%`,
                    backgroundColor: INNER_COLOR,
                }}
            >
                <p style={{ marginTop: 5, color: 'white', fontSize: 13, fontWeight: 'lighter', paddingLeft: 10 }}>
                    patches used: 4/12 <br />
                    speed bonus: 22% <br />
                    yield bonus: 18% <br />
                    minions: 34/50 <br />
                </p>
            </div>

            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: `100%`,
                    width: `50%`,
                    backgroundColor: INNER_COLOR,
                }}
            >
                <p style={{ marginTop: 5, color: 'white', fontSize: 13, fontWeight: 'lighter', paddingLeft: 30 }}>
                    weather: cloudy <br />
                    weather change: 3hr <br />
                    season: summer <br />
                    season change: 2 day <br />
                </p>
            </div>
        </div>
    );
};
export const FarmingLevelBar = (props: { percent: number; currentXP: number; nextXP: number }) => {
    return (
        <div
            style={{
                position: 'absolute',
                right: 20,
                top: 18,
                width: 300,
                backgroundColor: INNER_COLOR,
                borderRadius: 5,
                overflow: 'hidden',
                height: 30,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: props.percent + '%',
                    backgroundColor: LEVEL_GREEN,
                }}
            ></div>
            <p style={{ position: 'absolute', top: -8, left: 0, right: 0, bottom: 0, textAlign: 'center', color: 'white' }}>
                {props.currentXP} / {props.nextXP}
            </p>
        </div>
    );
};
