import React from 'react'
import Nav from '../components/Home/Nav'
import Footer from '../components/Home/Footer'
import Slider from '../components/Home/Slider'
import ContactUS from '../components/Home/ContactUS'
import AboutUs from '../components/Home/AboutUs'
import Services from '../components/Home/Services'

function Home() {
  return (
<div className="">
    <Nav/>
    <Slider/>
    <Services/>
    <AboutUs/>
    <ContactUS/>
    <Footer/>
</div>
  )
}

export default Home