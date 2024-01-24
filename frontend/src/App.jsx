import './App.css';
import AppButton from './components/AppButton/AppButton';
import AppCategory from './components/AppCategory/AppCategory';
import { fetchAppData, updateAppData } from './controller/API';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import DialButton from './components/DialButton/DialButton';
import AddCategoryModal from './components/AddCategoryModal/AddCategoryModal';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { renameKey } from './utils/jsonParser';
import EditAppModal from './components/EditAppModal/EditAppModal';

function App() {
    const [loading, setLoading] = useState(true);
    const [appData, setAppData] = useState(null);
    const [appInfo, setAppInfo] = useState({});
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [showEditApp, setShowEditApp] = useState(false);

    useEffect(() => {
        fetchAppData(setAppData, setLoading);
    }, []);

    const handleAppAdd = (name, url, color, category) => {
        const tempAppData = structuredClone(appData);
        const app = {
            url: url,
            faviconURL: '',
            color: color,
        };

        tempAppData[category][name] = app;
        setAppData(tempAppData);
        updateAppData(tempAppData);
    };

    const handleCategoryAdd = (name) => {
        const tempAppData = structuredClone(appData);
        tempAppData[name] = {};
        setAppData(tempAppData);
        updateAppData(tempAppData);
    };

    const handleCategoryDelete = (category) => {
        const tempAppData = structuredClone(appData);
        delete tempAppData[category];
        setAppData(tempAppData);
        updateAppData(tempAppData);
    };

    const handleCategoryEdit = (oldTitle, newTitle) => {
        const tempAppData = structuredClone(appData);
        renameKey(tempAppData, oldTitle, newTitle);
        setAppData(tempAppData);
        updateAppData(tempAppData);
    };

    const handleDialAdd = () => {
        setShowAddCategory(true);
    };

    const handleDialEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleAppDelete = (category, title) => {
        const tempAppData = structuredClone(appData);
        delete tempAppData[category][title];
        setAppData(tempAppData);
        updateAppData(tempAppData);
    };

    const handleAppEdit = (category, title, url, iconURL, color, oldTitle) => {
        console.log(oldTitle)
        console.log(title)
        const tempAppData = structuredClone(appData);
        if (oldTitle) renameKey(tempAppData[category], oldTitle, title);
        console.log(tempAppData[category])
        tempAppData[category][title]['url'] = url;
        tempAppData[category][title]['faviconURL'] = iconURL;
        tempAppData[category][title]['color'] = color;
        setAppData(tempAppData);
        updateAppData(tempAppData);
    };

    return (
        <>
            <DialButton
                handleAdd={handleDialAdd}
                handleEdit={handleDialEdit}
                isEdit={isEdit}
                blink={appData ? Object.entries(appData).length === 0 : false}
            ></DialButton>

            <div className='app'>
                <AddCategoryModal
                    show={showAddCategory}
                    setShow={setShowAddCategory}
                    addHandler={handleCategoryAdd}
                ></AddCategoryModal>
                <EditAppModal
                    show={showEditApp}
                    setShow={setShowEditApp}
                    appInfo={appInfo}
                    editHandler={handleAppEdit}
                />
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
                        Object.entries(appData).map((category) => {
                            return (
                                <AppCategory
                                    title={category[0]}
                                    handleAdd={handleAppAdd}
                                    key={category.toString()}
                                    isEdit={isEdit}
                                    handleDelete={handleCategoryDelete}
                                    handleEdit={handleCategoryEdit}
                                >
                                    {Object.entries(appData[category[0]]).map(
                                        (info) => {
                                            return (
                                                <AppButton
                                                    key={info.toString()}
                                                    title={info[0]}
                                                    url={info[1].url}
                                                    category={category[0]}
                                                    iconURL={info[1].faviconURL}
                                                    handleDelete={() => {
                                                        handleAppDelete(
                                                            category[0],
                                                            info[0]
                                                        );
                                                    }}
                                                    setShowEdit={setShowEditApp}
                                                    setAppInfo={setAppInfo}
                                                    color={info[1].color}
                                                    isEdit={isEdit}
                                                />
                                            );
                                        }
                                    )}
                                </AppCategory>
                            );
                        })
                    )}

                    {appData && Object.entries(appData).length === 0 ? (
                        <div className='wait-container'>
                            <AutoModeIcon
                                color='secondary'
                                className='wait-icon'
                            ></AutoModeIcon>
                            <h4 className='wait-text'>
                                No services or categories added yet.
                            </h4>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default App;
