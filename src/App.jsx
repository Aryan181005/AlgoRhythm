import { motion } from "framer-motion";
import React, { useState } from "react";

const App = () => {


  const [array,setArray] = useState([
    { id: 1, value: 10 },
    { id: 2, value: 4 },
    { id: 3, value: 5 },
    { id: 4, value: 3 },
    { id: 5, value: 8 },
    { id: 6, value: 6 },
    { id: 7, value: 2 },
    { id: 8, value: 9 },
  ]);  // Update Array after every step for visualisation
  const [pIndex,setPIndex] = useState(null);        // Update Pivot Element - it's marked RED
  const [active,setActive] = useState([]);          // Index Values - Update color to show ongoing comparisons - YELLOW
  const [sorted,setSorted] = useState([]);          // Index Values - Update color to show which elements are sorted - GREEN
  const [speed,setSpeed] = useState(400);           // Pause Animation before and after changes for given time
  const [isSorting,setIsSorting] = useState(false); // State to prevent another sorting when one is ongoing


  const sleep = (ms) => new Promise((res) => setTimeout(res,ms));

  const generateArray = () => {
    if(isSorting) return;

    let idCounter = 0;
    const newArr = Array.from({length: 8},() => (
      {
        id: idCounter++,
        value: Math.floor(Math.random() * 10) + 1
      }
    ))
    setArray(newArr);
    setSorted([]);
  }

  const quickSort = async (arr, left, right) => {
    if (left < right) {
      let pIndex = await partition(arr, left, right);
      await quickSort(arr, left, pIndex - 1);
      await quickSort(arr, pIndex + 1, right);
    }else if(left === right){
      setSorted((prev) => [...prev,left]);
    }
  };

  const partition = async (arr, left, right) => {
    let pivot = arr[right];
    setPIndex(right);
    let i = left - 1;

    for (var j = left; j < right; j++) {
      setActive([j]);
      await sleep(speed);

      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setActive([i,j]);
        await sleep(speed);
      }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];

    setArray([...arr])
    await sleep(speed)
    setSorted((prev) => [...prev,i+1])
    setPIndex(null);
    setActive([]);

    return i + 1;
  };

  const startSorting = async () => {
    if(isSorting) return;
    setIsSorting(true);

    let newArr = [...array];                        // Avoid mutating states directly, clone the array
    await quickSort(newArr,0,newArr.length-1);      // Sorting begins

    setSorted([...Array(array.length).keys()]);     // Mark all elements to GREEN
    setIsSorting(false);
  }



  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-20">QuickSort Algortithm Visualiser</h1>

      {/* Array Bars */}
      <div className="flex items-end gap-3 bg-zinc-800 px-50 pt-10 mb-10 rounded-2xl min-h-[400px]">
        {array.map((item,idx) => {
          let color = "bg-teal-500";

          if(sorted.includes(idx)) color = "bg-green-500";
          else if(active.includes(idx)) color = "bg-yellow-500";
          else if(pIndex === idx) color = "bg-red-500";

          return(
            <motion.div 
              key={item.id}
              layout
              transition={{duration:0.4}}
              className={`${color} w-10 rounded-t-xl flex items-end justify-center`}
              style={{height : `${item.value*30}px`}}
            >
              <span className="text-zinc-900 mb-2 text-sm">{item.value}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-5">

        <button 
          className="px-10 py-4 rounded-xl bg-zinc-800 cursor-pointer hover:bg-teal-500 hover:text-zinc-900 duration-100 active:scale-80"
          onClick={generateArray}>
            Generate Array
        </button>

        <div className="px-7 py-3 bg-zinc-800 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer">
          <div
          className="flex items-center justify-center gap-3"
          >
          <input 
            className="appearance-none w-full h-2 rounded-full cursor-pointer bg-zinc-700"
            type="range"
            min="100"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span className="w-12 text-sm">{(speed/1000).toFixed(1)}s</span>
          </div>
          <p className="text-xs">Animation Speed</p>
        </div>

        <button 
        className="px-10 py-4 rounded-xl bg-zinc-800 cursor-pointer hover:bg-teal-500 hover:text-zinc-900 duration-100 active:scale-80"
        onClick={startSorting}>
            Start Sorting
        </button>
        
      </div>

    </div>
  );
};

export default App;
