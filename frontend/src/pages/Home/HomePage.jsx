import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'

// FIX: Pointing to the 'pages' folder instead of 'components'
import About from '../About/About' 

// Keep these if they are actually in src/components/
import Journey from '../../components/Journey/Journey'
import SignatureTextures from '../../components/SignatureTextures/SignatureTextures'
import Services from '../../components/Services/Services'
import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects'
import Testimonial from '../../components/Testimonials/Testimonial'
import CTAFooter from '../../components/CTAFooter/CTAFooter'

const HomePage = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <SignatureTextures />
      <Services />
      <FeaturedProjects />
      <Testimonial />
      <CTAFooter />
    </div>
  )
}

export default HomePage