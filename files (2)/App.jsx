import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import FeaturedProjects from './components/FeaturedProjects/FeaturedProjects'
import Testimonial from './components/Testimonial/Testimonial'
import CTAFooter from './components/CTAFooter/CTAFooter'
import './styles/global.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <Testimonial />
      <CTAFooter />
    </div>
  )
}

export default App
