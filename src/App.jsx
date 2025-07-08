
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Details from './Components/Details/Details'
import Sell from './Components/Modal/Sell'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import MyAds from './Components/MyAds/MyAds'
import EditAd from './Components/EditAd/EditAd'

function App() {
 return(
   <>
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path= '/details' element={<Details/>}/>
      <Route path ='/sell' element = {<PrivateRoute><Sell/></PrivateRoute>}/> 
      <Route path ='/my-ads' element = {<PrivateRoute><MyAds/></PrivateRoute>}/> 
      <Route path="/edit" element={<PrivateRoute><EditAd /></PrivateRoute>} />
   </Routes>
   </>
 )
}

export default App
