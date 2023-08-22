import { NavLink, useNavigate } from 'react-router-dom'

export function AppHeader() {
    const navigate = useNavigate()

    return (
        <header className="app-header full main-layout">
            <div className="app-header-inner-container flex align-center space-between">
                <div className="logo" onClick={() => navigate('/')}>
                    <h1> Gil Shaashua </h1>
                </div>
                <nav>
                    <NavLink to={'/'}> Projects </NavLink>
                </nav>
            </div>
        </header>
    )
}
