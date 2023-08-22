import { Route, Routes } from 'react-router'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { About } from './pages/About'
import { ProjectIndex } from './pages/ProjectIndex'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ProjectDetails } from './pages/ProjectDetails'

export default function App() {
    return (
        <Provider store={store}>
            <section className="main-app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<ProjectIndex />} />
                        <Route
                            path="/details/:projectId"
                            element={<ProjectDetails />}
                        />
                    </Routes>
                </main>
                <AppFooter />
            </section>
        </Provider>
    )
}
