import { motion } from "framer-motion";
import React, { useState } from "react";

const App = () => {
  const [array, setArray] = useState([
    { id: 1, value: 10 },
    { id: 2, value: 4 },
    { id: 3, value: 5 },
    { id: 4, value: 3 },
    { id: 5, value: 8 },
    { id: 6, value: 6 },
    { id: 7, value: 2 },
    { id: 8, value: 9 },
  ]); // Update Array after every step for visualisation
  const [pIndex, setPIndex] = useState(null); // Update Pivot Element - it's marked RED
  const [active, setActive] = useState([]); // Index Values - Update color to show ongoing comparisons - YELLOW
  const [sorted, setSorted] = useState([]); // Index Values - Update color to show which elements are sorted - GREEN
  const [speed, setSpeed] = useState(400); // Pause Animation before and after changes for given time
  const [isSorting, setIsSorting] = useState(false); // State to prevent another sorting when one is ongoing
  const [algo, setAlgo] = useState("quick"); // This stores which algo will be used
  const algoNames = {
    quick: "QuickSort",
    merge: "MergeSort",
    heap: "HeapSort",
    bubble: "BubbleSort",
  };

  // Waiting time ( will resolve after 'ms' time )
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  // Generate random array { Elements: 1-10, length: 8 }
  const generateArray = () => {
    if (isSorting) return;
    if (!isSorting) {
      let idCounter = 0;
      const newArr = Array.from({ length: 8 }, () => ({
        id: idCounter++,
        value: Math.floor(Math.random() * 10) + 1,
      }));
      setArray(newArr);
      setSorted([]);
    }
  };

  // QuickSort
  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pIndex = await partition(arr, low, high);
      await quickSort(arr, low, pIndex - 1);
      await quickSort(arr, pIndex + 1, high);
    } else if (low === high) {
      setSorted((prev) => [...prev, low]);
    }
  };
  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    setPIndex(high);
    let i = low - 1;

    for (var j = low; j < high; j++) {
      setActive([j]);
      await sleep(speed);

      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setActive([i, j]);
        await sleep(speed);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    setArray([...arr]);
    await sleep(speed);
    setSorted((prev) => [...prev, i + 1]);
    setPIndex(null);
    setActive([]);

    return i + 1;
  };

  // MergeSort
  const merge = async (arr, low, mid, high) => {
    let n1 = mid - low + 1;
    let n2 = high - mid;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) {
      L[i] = arr[low + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = low;

    while (i < n1 && j < n2) {
      setActive([low + i, mid + 1 + j]);
      await sleep(speed);

      if (L[i].value <= R[j].value) {
        setActive([low + i, mid + 1 + j]);
        arr[k++] = L[i++];
      } else {
        arr[k++] = R[j++];
      }
    }

    while (i < n1) {
      arr[k++] = L[i++];
      setArray([...arr]);
      await sleep(speed);
    }
    while (j < n2) {
      arr[k++] = R[j++];
      setArray([...arr]);
      await sleep(speed);
    }
    setActive([]);
    setPIndex(null);
  };
  const mergeSort = async (arr, low, high) => {
    if (low < high) {
      let mid = Math.floor(low + (high - low) / 2);
      setPIndex(mid);
      await sleep(speed);

      await mergeSort(arr, low, mid);
      await mergeSort(arr, mid + 1, high);

      await merge(arr, low, mid, high);
    }
  };

  // Start Sorting
  const startSorting = async () => {
    if (isSorting) return;
    setIsSorting(true);

    let newArr = [...array];                        // Avoid mutating states directly, clone the array

    if (algo === "quick") {
      await quickSort(newArr, 0, newArr.length - 1);
      setSorted([...Array(array.length).keys()]);
    }
    if (algo === "merge") {
      await mergeSort(newArr, 0, newArr.length - 1);
    }
    
    for (let i = 0; i < array.length; i++) {
      setSorted((prev) => [...prev, i]);
      await sleep(100);
    }

    setIsSorting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white items-center justify-center p-6">
      <div className="flex gap-10 justify-center items-center mb-30">
        <button
          disabled={isSorting}
          className={`px-5 py-3 rounded-lg cursor-pointer hover: active:scale-80 duration-200 
          ${algo === "quick" ? "bg-teal-500 text-zinc-900" : "bg-zinc-800"}`}
          onClick={() => {
            setAlgo("quick");
            generateArray();
          }}
        >
          QuickSort
        </button>

        <button
          disabled={isSorting}
          className={`px-5 py-3 rounded-lg cursor-pointer hover: active:scale-80 duration-200 
          ${algo === "merge" ? "bg-teal-500 text-zinc-900" : "bg-zinc-800"}`}
          onClick={() => {
            setAlgo("merge");
            generateArray();
          }}
        >
          MergeSort
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-20">{algoNames[algo]} Visualiser</h1>

      {/* Array Bars */}
      <div className="flex items-end gap-3 bg-zinc-800 px-30 pt-10 mb-10 rounded-2xl min-h-[400px]">
        {array.map((item, idx) => {
          let color = "bg-teal-500";

          if (sorted.includes(idx)) color = "bg-green-500";
          else if (pIndex === idx) color = "bg-red-500";
          else if (active.includes(idx)) color = "bg-yellow-500";

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ duration: 0.4 }}
              className={`${color} w-10 rounded-t-xl flex items-end justify-center`}
              style={{ height: `${item.value * 30}px` }}
            >
              <span className="text-zinc-900 mb-2 text-sm">{item.value}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-5">
        <button
          className="px-10 py-4 rounded-xl bg-zinc-800 cursor-pointer hover:bg-teal-500 hover:text-zinc-900 duration-100 active:scale-80"
          onClick={generateArray}
        >
          Generate Array
        </button>

        <div className="px-7 py-3 bg-zinc-800 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer">
          <div className="flex items-center justify-center gap-3">
            <input
              className="appearance-none w-full h-2 rounded-full cursor-pointer bg-zinc-700"
              type="range"
              min="100"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <span className="w-12 text-sm">{(speed / 1000).toFixed(1)}s</span>
          </div>
          <p className="text-xs">Animation Speed</p>
        </div>

        <button
          className="px-10 py-4 rounded-xl bg-zinc-800 cursor-pointer hover:bg-teal-500 hover:text-zinc-900 duration-100 active:scale-80"
          onClick={startSorting}
        >
          Start Sorting
        </button>
      </div>
    </div>
  );
};

export default App;
