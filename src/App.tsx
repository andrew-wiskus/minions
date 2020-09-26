import React from 'react'
import './App.css'
import { WoodCuttingPage } from './pages/WoodCuttingPage'
import { BankPage } from './pages/BankPage'
import { PageRoute, GATHER_SKILLS } from './config/skillConfig'
import { GameBar } from './components/navigation/NavBar'

interface State {
    currentPage: PageRoute
}
export class App extends React.Component<{}, State> {
    public state: State = {
        currentPage: PageRoute.WOODCUTTING,
    }

    private getBigForSkill = () => {
        let currentSkill = GATHER_SKILLS.find((x) => x.onClickRoute == this.state.currentPage)
        if (currentSkill == undefined) {
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
                    width: '500px',
                    backgroundImage: `url(${this.getBigForSkill()})`,
                }}
            >
                <GameBar onClickRoute={(route: PageRoute) => this.setState({ currentPage: route })} />
                {this.state.currentPage === PageRoute.WOODCUTTING && <WoodCuttingPage />}
                {this.state.currentPage === PageRoute.BANK && <BankPage />}
            </div>
        )
    }
}

export default App
