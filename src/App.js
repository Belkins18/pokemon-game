import React from "react";

import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";

import bg1 from "./assets/images/bg1.jpg"
import bg3 from "./assets/images/bg3.jpg"


function App() {
  return (
    <React.Fragment>
      <Header/>
      <Layout urlBg={bg1}/>
      <Layout colorBg={"transparent"}/>
      <Layout urlBg={bg3}/>
      <Footer />
    </React.Fragment>
  );
}
export default App;
