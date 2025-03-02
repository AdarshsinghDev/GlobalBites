import React from 'react'
import Hero from "../components/Hero/Hero";
import Discover from "../components/Discover/Discover";
import SuggestRecipe from '../components/SuggestRecipe/SuggestRecipe';

const Home = () => {
  return (
    <>
        <Hero />
        <SuggestRecipe />
        <Discover />
    </>
  )
}

export default Home