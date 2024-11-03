import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Component/Header/Header';
import HomeBan from './Component/LandingPage/HomeBan';
import Login from './Component/login/Login';
import Banner from './Component/main/Banner';
import List from './Component/MovieList/List';
import categories from './Component/request'




function App() {
  
  return (
    <Router>
      <div>
        <Routes>
        <Route  path='/' element={<> <Header />< HomeBan/> </>}/> 
        <Route  path='/login' element={<Login page={true}/>}/>
        <Route  path='/register' element={<Login page={false}/>}/>
        <Route  path='/main/Banner' element={<><Banner/>
        <List title='Netflix Original' fetchUrl={categories.fetchNetflixOrignal}/>
        <List title='Top Rated' fetchUrl={categories.fetchTopRated}/>
        <List title='Trending' fetchUrl={categories.fetchTrending}/>
        <List title='Animation' fetchUrl={categories.fetchAnimation}/>
        <List title='ActionMovie' fetchUrl={categories.fetchActionMovie}/>
        <List title='ComedyMovie' fetchUrl={categories.fetchComedyMovie}/>
        <List title='HorrorMovie' fetchUrl={categories.fetchHorrorMovie}/>
        <List title='RomanceMovie' fetchUrl={categories.fetchRomanceMovie}/>
        <List title='Documentries' fetchUrl={categories.fetchDocumentries}/></>}/>  
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;

