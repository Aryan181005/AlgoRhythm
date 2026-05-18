import React from 'react'

const SocialLogo = (props) => {
  return (
    <div className='w-8 lg:w-12 cursor-pointer hover:scale-115 duration-200'>
        <a href={props.link} target="_blank">
            <img src={props.title} alt="" />
        </a>
    </div>
  )
}

export default SocialLogo