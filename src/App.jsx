import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Posts from './pages/Posts';
import Add from './pages/Add';
import Preview from './pages/Preview';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/article/' element={<Add />} />
        <Route path='/article/:id' element={<Add />} />
        <Route path='/preview/' element={<Preview />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
