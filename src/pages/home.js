import React from 'react';
import Hero from '../components/hero/hero';
import Newseason from '../components/newseason/newseason';
import VideoPlayer from '../components/homevideo/homeVideo';
import Homeblock from '../components/homeblock/homeblock';

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Newseason />
      <VideoPlayer />
      <Homeblock/>
    </div>
  );
}

export default Home;
