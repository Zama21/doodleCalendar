import ModalsLayer from 'modules/modals/ui/Components/ModalsLayer/ModalsLayer.jsx';
import { AppRouter } from '../components/AppRouter/AppRouter.jsx';
import GlobalFooter from '../components/GlobalFooter/GlobalFooter.jsx';
import { GlobalHeader } from '../components/GlobalHeader/GlobalHeader.jsx';
import { withProviders } from './withProviders.jsx';

export const App = withProviders(() => {
    return (
        <>
            <GlobalHeader />
            <div className='mainContent'>
                <AppRouter />
            </div>
            <GlobalFooter />
            <ModalsLayer />
        </>
    );
});
