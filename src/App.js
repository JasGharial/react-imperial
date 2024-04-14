import Home from "./routes/home/home.component";
import Navigation from "./components/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
  return(
    <div>I'm at a Shop</div>
  )
}

function App() {
  return(
  <Routes>
    <Route path='/' element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path='/shop' element={<Shop />}/>
      <Route path='/auth' element={<Authentication />}/>
    </Route>
  </Routes>
  )
}

export default App;
