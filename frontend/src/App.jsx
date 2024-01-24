import './App.css';
import AppButton from './components/AppButton/AppButton';
import AppCategory from './components/AppCategory/AppCategory';
import { fetchAppData, updateAppData } from './controller/API';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

function App() {
    const [loading, setLoading] = useState(true);
    const [appData, setAppData] = useState(null);

    useEffect(() => {
        fetchAppData(setAppData, setLoading);
    }, []);

    const handleAddApp = (name, url, color, category) => {
        const tempAppData = structuredClone(appData)
        const app = {
            url: url,
            faviconURL: '',
            color: color,
        };

        tempAppData[category][name] = app;
        setAppData(tempAppData)
        updateAppData(tempAppData)
    };

    useEffect(() => {
        console.log(appData)
    }, [appData])

    return (
        <div className='app'>
            <div className='title'>
                <span>Pix</span>
                <span>Network</span>
            </div>
            <div className='title-dots'>
                <span>PI</span>
                <span>X</span>
                <span>N</span>
                <span>et</span>
                <span>w</span>
                <span>o</span>
                <span>rk</span>
            </div>
            <div className='category-container'>
                {loading ? (
                    <>
                        <Skeleton
                            sx={{ bgcolor: '#232323' }}
                            variant='rounded'
                            height={200}
                            className='category-skeleton'
                        ></Skeleton>
                        <Skeleton
                            sx={{ bgcolor: '#232323' }}
                            variant='rounded'
                            height={250}
                            className='category-skeleton'
                        ></Skeleton>
                        <Skeleton
                            sx={{ bgcolor: '#232323' }}
                            variant='rounded'
                            height={200}
                            className='category-skeleton'
                        ></Skeleton>
                    </>
                ) : (
                    appData &&
                    Object.entries(appData).map((category, title) => {
                        return (
                            <AppCategory
                                title={category[0]}
                                handleAdd={handleAddApp}
                                key={category.toString()}
                            >
                                {Object.entries(appData[category[0]]).map(
                                    (info) => {
                                        return (
                                            <AppButton
                                                key={info.toString()}
                                                url={info[1].url}
                                                iconURL={info[1].faviconURL}
                                                color={info[1].color}
                                            >
                                                {info[0]}
                                            </AppButton>
                                        );
                                    }
                                )}
                            </AppCategory>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default App;
