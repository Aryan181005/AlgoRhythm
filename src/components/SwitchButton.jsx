import React, { useState } from 'react'

const SwitchButton = ({title, algo, setAlgo, algoName, onAlgoChange}) => {
  return (
    <button 
        className={`px-4 sm:px-5 lg:px-10 py-2 sm:py-3 lg:py-5 text-sm sm:text-base rounded-full cursor-pointer hover: active:scale-80 duration-200 text-white
        ${algo === algoName ? "bg-teal-500 text-zinc-900" : "bg-zinc-800"}`}
        onClick={() => onAlgoChange(algoName)}
    >
        {title}
    </button>
  )
}

export default SwitchButton