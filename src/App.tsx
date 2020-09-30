import React from 'react'
import './App.css'
import { WoodCuttingPage } from './pages/WoodCuttingPage'
import { BankPage } from './pages/BankPage'
import { PageRoute, GATHER_SKILLS } from './config/skillConfig'
import { GameBar } from './components/navigation/NavBar'

import { FishingPage } from './pages/FishingPage'
import { MiningPage } from './pages/MiningPage'
import { FarmingPage } from './pages/FarmingPage'


interface State {
    currentPage: PageRoute
}

export class App extends React.Component<{}, State> {
    public state: State = {
        currentPage: PageRoute.FARMING,
    }

    private getBigForSkill = () => {

        if(this.state.currentPage === PageRoute.BANK) {
        }

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
                    backgroundColor: 'goldenrod'
                }}
            >
                <GameBar onClickRoute={(route: PageRoute) => this.setState({ currentPage: route })} />
                {this.state.currentPage === PageRoute.WOODCUTTING && <WoodCuttingPage />}
                {this.state.currentPage === PageRoute.FISHING && <FishingPage />}
                {this.state.currentPage === PageRoute.MINING && <MiningPage />}
                {this.state.currentPage === PageRoute.FARMING && <FarmingPage />}
                {this.state.currentPage === PageRoute.BANK && <BankPage />}
            </div>
        )
    }
}

export default App

