import React, { useState } from 'react'
import Sort from './components/Sort'
import Hero from './components/Hero'
import Search from './components/Search';
import LinkedList from './components/LinkedList';
import Stack from './components/Stack';
import Queue from './components/Queue';
import Tree from './components/Tree';
import Graph from './components/Graph';
import DP from './components/DP';
import { FiChevronsLeft } from "react-icons/fi";
import SwitchButton from './components/SwitchButton';
import { Switch } from 'react-aria-components';



const App = () => {

  const [algo,setAlgo] = useState("quick");
  const [category,setCategory] = useState("");

  const componentMap = {
    Sorting : <Sort algo={algo} setAlgo={setAlgo}/>,
    Searching : <Search />,
    "Linked List" : <LinkedList />,
    Stack : <Stack />,
    Queue : <Queue />,
    Trees : <Tree />,
    Graphs : <Graph />,
    DP : <DP />,

  }

  return (
    <>

      {
        category !== "" && (
          <button
          className='fixed top-5 left-5 bg-zinc-800 text-white px-4 py-2 rounded-xl cursor-pointer flex gap-2 items-center justify-center'
          onClick={() => setCategory("")}
          >
            <FiChevronsLeft />
            <p>Back</p>
          </button>
        )
      }

      {
        category === ""
        ? <Hero setCategory={setCategory} />
        : componentMap[category]
      }
    </>
  )
}

export default App