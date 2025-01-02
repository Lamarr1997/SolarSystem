import React from 'react'

const About = () => {
  return (
    <div className="about-outer-container">
      <div className="about-container">
        <div className='About-title'>
          <h1>The Planetary System</h1>
        </div>
        <div className='About-info'>
          <h2>What inspired me to build this project</h2>
          <p>This project is for young children aged from 7 - 18 to allow them to get a clear understanding of how our solar system operates and give basic facts on all the planets that orbit the sun as well as facts about the sun itself. The 3d modelling would give the accurate orbits of the planets around the sun.</p>
        </div>
        <div className='About-author'>
          <h2>Author</h2>
          <img src="textures/lamarrpic.jpg" alt="picture of me" />
          <p>Im an full-stack web developer specialising in Ruby, JavaScript, CSS and HTML. I created this project for young people who are interested in coding and astronomy.</p>
        </div>
        <div className='About-contact'>
          <h2>Contact</h2>
          <p>Please email: Lamarr_paul97@outlook.com for any suggestion to improve this site.</p>
        </div>
      </div>
    </div>
  )
}

export default About;
