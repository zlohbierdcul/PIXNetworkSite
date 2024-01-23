import './App.css';
import AppButton from './components/AppButton/AppButton';
import AppCategory from './components/AppCategory/AppCategory';

function App() {
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

            <AppCategory title='Hello'>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
                <AppButton url='https://figma.com'></AppButton>
            </AppCategory>
        </div>
    );
}

export default App;
