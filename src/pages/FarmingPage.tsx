import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import {
    POTATO_SEED,
    ONION_SEED,
    CABBAGE_SEED,
    TOMATO_SEED,
    CORN_SEED,
    STRAWBERRY_SEED,
    WATERMELON_SEED,
    RED_BERRY_SEED,
    CADAVA_BERRY_SEED,
    DWELL_BERRY_SEED,
    JANGER_BERRY_SEED,
    WHITE_BERRY_SEED,
    BAR_BERRY_SEED,
    AVACADO_SEED,
    MANGO_SEED,
    LYCHEE_SEED,
    GUAM_SEED,
    MARRENTILL_SEED,
    TARROMIN_SEED,
    HARRALANDER_SEED,
    RANARR_SEED,
    TOADFLAX_SEED,
    IRIT_SEED,
    WERGALI_SEED,
    AVANTOE_SEED,
    KWUARM_SEED,
    BLOODWEED_SEED,
    SNAPDRAGON_SEED,
    CADANTINE_SEED,
    LANTADYME_SEED,
    ARBUCK_SEED,
    DWARF_WEED_SEED,
    TORSTOL_SEED,
    FELLSTALK_SEED,
} from '../config/itemConfig';
import { INNER_COLOR, LEVEL_GREEN, OUTER_COLOR } from '../constants';
import { ApplicationStore } from '../data/applicationStore';
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
    POTATO_SEED: {
        resource_id: POTATO_SEED,
        name: 'POTATO',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    ONION_SEED: {
        resource_id: ONION_SEED,
        name: 'ONION',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    CABBAGE_SEED: {
        resource_id: CABBAGE_SEED,
        name: 'CABBAGE',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    TOMATO_SEED: {
        resource_id: TOMATO_SEED,
        name: 'TOMATO',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    CORN_SEED: {
        resource_id: CORN_SEED,
        name: 'CORN',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    STRAWBERRY_SEED: {
        resource_id: STRAWBERRY_SEED,
        name: 'STRAWBERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    WATERMELON_SEED: {
        resource_id: WATERMELON_SEED,
        name: 'WATERMELON',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    RED_BERRY_SEED: {
        resource_id: RED_BERRY_SEED,
        name: 'RED BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    CADAVA_BERRY_SEED: {
        resource_id: CADAVA_BERRY_SEED,
        name: 'CADAVA BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    DWELL_BERRY_SEED: {
        resource_id: DWELL_BERRY_SEED,
        name: 'DWELL BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    JANGER_BERRY_SEED: {
        resource_id: JANGER_BERRY_SEED,
        name: 'JANGER BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    WHITE_BERRY_SEED: {
        resource_id: WHITE_BERRY_SEED,
        name: 'WHITE BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    BAR_BERRY_SEED: {
        resource_id: BAR_BERRY_SEED,
        name: 'BAR BERRY',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    AVACADO_SEED: {
        resource_id: AVACADO_SEED,
        name: 'AVACADO',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    MANGO_SEED: {
        resource_id: MANGO_SEED,
        name: 'MANGO',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    LYCHEE_SEED: {
        resource_id: LYCHEE_SEED,
        name: 'LYCHEE',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    // herbs

    GUAM_SEED: {
        resource_id: GUAM_SEED,
        name: 'GUAM',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    MARRENTILL_SEED: {
        resource_id: MARRENTILL_SEED,
        name: 'MARRENTILL',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    TARROMIN_SEED: {
        resource_id: TARROMIN_SEED,
        name: 'TARROMIN',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    HARRALANDER_SEED: {
        resource_id: HARRALANDER_SEED,
        name: 'HARRALANDER',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    RANARR_SEED: {
        resource_id: RANARR_SEED,
        name: 'RANARR',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    TOADFLAX_SEED: {
        resource_id: TOADFLAX_SEED,
        name: 'TOADFLAX',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    IRIT_SEED: {
        resource_id: IRIT_SEED,
        name: 'IRIT',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    WERGALI_SEED: {
        resource_id: WERGALI_SEED,
        name: 'WERGALI',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    AVANTOE_SEED: {
        resource_id: AVANTOE_SEED,
        name: 'AVANTOE',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    KWUARM_SEED: {
        resource_id: KWUARM_SEED,
        name: 'KWUARM',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    BLOODWEED_SEED: {
        resource_id: BLOODWEED_SEED,
        name: 'BLOODWEED',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    SNAPDRAGON_SEED: {
        resource_id: SNAPDRAGON_SEED,
        name: 'SNAPDRAGON',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    CADANTINE_SEED: {
        resource_id: CADANTINE_SEED,
        name: 'CADANTINE',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    LANTADYME_SEED: {
        resource_id: LANTADYME_SEED,
        name: 'LANTADYME',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    ARBUCK_SEED: {
        resource_id: ARBUCK_SEED,
        name: 'ARBUCK',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    DWARF_WEED_SEED: {
        resource_id: DWARF_WEED_SEED,
        name: 'DWARF WEED',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    TORSTOL_SEED: {
        resource_id: TORSTOL_SEED,
        name: 'TORSTOL',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },
    FELLSTALK_SEED: {
        resource_id: FELLSTALK_SEED,
        name: 'FELLSTALK',
        growTime: Math.floor(Math.random() * 1000) * 1000,
        yieldMin: Math.floor(Math.random() * 10) * 1,
        yieldMax: Math.floor(Math.random() * 10) * 1 + 10,
    },

    // trees
};

@inject('applicationStore')
@observer
export class FarmingPage extends React.Component<{ applicationStore?: ApplicationStore }> {
    public render() {
        let foodSeeds = this.props.applicationStore.bankStore.allFoodSeeds.map((x) => {
            return new Seed(seedConfig[x.id], x.count);
        });

        let herbSeeds = this.props.applicationStore.bankStore.allHerbSeeds.map((x) => {
            return new Seed(seedConfig[x.id], x.count);
        });

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
                    <SeedList seeds={foodSeeds} />
                    <p style={{ color: 'white', paddingLeft: 20, paddingTop: 15 }}>herbs</p>
                    <SeedList seeds={herbSeeds} />
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
                            key={x.name}
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
            {props.weather.map((x, i) => {
                return (
                    <img
                        alt='todo'
                        key={i}
                        src={x.icon}
                        style={{ width: 47, height: 47, borderRadius: 25, backgroundColor: 'grey' }}
                    />
                );
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
