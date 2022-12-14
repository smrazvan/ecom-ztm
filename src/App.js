import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./routes/home/home.route";
import Navigation from "./routes/navigation/navigation.route";
import Shop from "./routes/shop/shop.route";
import Authentication from "./routes/authentication/authentication.route";
import Checkout from "./routes/checkout/checkout.route";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="sign-in" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
