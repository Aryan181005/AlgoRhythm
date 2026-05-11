import React, { useState } from 'react'

const SwitchButton = (props) => {

    const [algo, setAlgo] = useState("quick");
    console.log(algo);

  return (
    <button 
        className={`px-5 py-3 rounded-lg cursor-pointer hover: active:scale-80 duration-200 text-white
        ${algo === "" ? "bg-teal-500 text-zinc-900" : "bg-zinc-800"}`}
        onClick={() => {
            setAlgo("merge");
        }}
    >
        {props.title}
    </button>
  )
}

export default SwitchButton