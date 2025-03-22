import { Routes, Route } from 'react-router-dom';
import routers from './router/Router'; 
function App() {
    return (
        <div className={'app '+`light-mode`}>
            <Routes>
                {
                    routers.map((router, index) => {
                        return (
                            <Route
                                key = {index}
                                path = {router.path}
                                element = {
                                    <router.layout>
                                        <router.component></router.component>
                                    </router.layout>
                                }
                                exact
                            />
                        )
                    })
                } 
            </Routes>
        </div>
    );
}
export default App;