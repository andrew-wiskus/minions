import React, { CSSProperties } from 'react'
import './App.css'
import { WoodCuttingPage } from './pages/WoodCuttingPage'
import { BankPage } from './pages/BankPage'
import { PageRoute, GATHER_SKILLS } from './config/skillConfig'
import { GameBar } from './components/navigation/NavBar'
import { INNER_COLOR, OUTER_COLOR } from './constants'
import { MinionCounter } from './components/woodcutting/ResourcePanel'
import { ALL_FISHING_SPOTS } from './config/fishingConfig'
import { FishingSpot } from './models/FishingSpot'
import { SHRIMP_NORMAL } from './config/itemConfig'
import { SHRIMP_NORMAL_ICON } from './images/itemImages'
import { FishingPage } from './pages/FishingPage'



interface State {
    currentPage: PageRoute
}

export class App extends React.Component<{}, State> {
    public state: State = {
        currentPage: PageRoute.FISHING,
    }

    private getBigForSkill = () => {
        let currentSkill = GATHER_SKILLS.find((x) => x.onClickRoute === this.state.currentPage)
        if (currentSkill === undefined) {
            return null
        }
        return currentSkill.background
    }

    public render() {
        return (
            <div
                style={{
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    height: '100vh',
                    width: '518px',
                    backgroundImage: `url(${this.getBigForSkill()})`,
                    boxSizing: "content-box"
                }}
            >
                <GameBar onClickRoute={(route: PageRoute) => this.setState({ currentPage: route })} />
                {this.state.currentPage === PageRoute.WOODCUTTING && <WoodCuttingPage />}
                {this.state.currentPage === PageRoute.FISHING && <FishingPage />}
                {this.state.currentPage === PageRoute.BANK && <BankPage />}
            </div>
        )
    }
}

export default App

