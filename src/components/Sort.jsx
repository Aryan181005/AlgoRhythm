import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Slider from "@mui/joy/Slider";
import SwitchButton from "./SwitchButton";
import { IoCodeSlashSharp } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { algoData } from "../data/algoData";
import AlgoInfo from "./AlgoInfo";

const Sort = ({ algo, setAlgo }) => {
  // State Definitions
  const [array, setArray] = useState([
    { id: 1, value: 10 },
    { id: 2, value: 4 },
    { id: 3, value: 5 },
    { id: 4, value: 3 },
    { id: 5, value: 8 },
    { id: 6, value: 6 },
    { id: 7, value: 2 },
    { id: 8, value: 9 },
  ]); // Initial Array defined ----> updated after each step for visualisation
  const [pIndex, setPIndex] = useState(null); // Update Pivot Element - it's marked RED
  const [active, setActive] = useState([]); // Index Values - Update color to show ongoing comparisons - YELLOW
  const [sorted, setSorted] = useState([]); // Index Values - Update color to show which elements are sorted - GREEN
  const [speed, setSpeed] = useState(400); // Pause Animation before and after changes for given time
  const [isSorting, setIsSorting] = useState(false); // State to prevent another sorting when one is ongoing
  const algoNames = {
    quick: "QuickSort",
    merge: "MergeSort",
    heap: "HeapSort",
    bubble: "BubbleSort",
  };
  const data = algoData[algo];
  const [lang, setLang] = useState("java");
  const [dispCode, setDispCode] = useState(false);
  const [dispInfo, setDispInfo] = useState(false);
  const infoCodeRef = useRef(null);
  useEffect(() => {
    if (dispCode || dispInfo) {
      infoCodeRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [dispCode, dispInfo]);

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

  // Bubble Sort
  const bubbleSort = async (arr, n) => {
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - isSorting; j++) {
        if (arr[j].value > arr[j + 1].value) {
          setActive([j, j + 1]);
          await sleep(speed);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
      setActive([]);
    }
  };

  // HeapSort
  const heapify = async (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    setActive([i, left < n ? left : -1, right < n ? right : -1]);
    await sleep(speed);

    if (left < n && arr[left].value > arr[largest].value) {
      largest = left;
    }
    if (right < n && arr[right].value > arr[largest].value) {
      largest = right;
    }

    if (i !== largest) {
      setActive([i, largest]);
      await sleep(speed);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);

      await sleep(speed);
      await heapify(arr, n, largest);
    }
  };
  const heapSort = async (arr) => {
    let n = arr.length;

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract All Elements
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      setPIndex(0);
      setActive([0, i]);
      await sleep(speed);

      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setPIndex(null);
      setActive([]);

      setSorted((prev) => [...prev, i]);
      await sleep(speed);

      //Heapify reduced Heap  --  root element is now sorted -- reduce heap size by 1
      await heapify(arr, i, 0);
    }

    setSorted((prev) => [...prev, 0]);
    return arr;
  };

  // Start Sorting
  const startSorting = async () => {
    if (isSorting) return;
    setIsSorting(true);

    let newArr = [...array]; // Avoid mutating states directly, clone the array

    if (algo === "quick") {
      await quickSort(newArr, 0, newArr.length - 1);
      setSorted([...Array(array.length).keys()]);
    } else if (algo === "merge") {
      await mergeSort(newArr, 0, newArr.length - 1);
    } else if (algo === "bubble") {
      await bubbleSort(newArr, newArr.length - 1);
    } else if (algo === "heap") {
      await heapSort(newArr);
    }

    for (let i = 0; i < array.length; i++) {
      setSorted((prev) => [...prev, i]);
      await sleep(200);
    }

    setIsSorting(false);
  };

  const handleAlgoChange = (newAlgo) => {
    setAlgo(newAlgo);
    generateArray();
  };


  return (
    <div className="min-h-screen w-full flex flex-col bg-zinc-900 text-white items-center justify-center px-4 py-10 lg:p-20 overflow-x-hidden">
      {/* Sort Switch Buttons */}
      <div className="mb-4 lg:hidden mt-6 px-5 py-3 bg-zinc-800 rounded-full flex items-center justify-between">
        <select
          value={algo}
          className="appearance-none outline-none w-full"
          onChange={(e) => handleAlgoChange(e.target.value)}
        >
          <option value="quick">QuickSort</option>
          <option value="merge">MergeSort</option>
          <option value="bubble">BubbleSort</option>
          <option value="heap">HeapSort</option>
        </select>
        <span className="inset-y-0 flex items-center pointer-events-none">
          <IoIosArrowDown />
        </span>
      </div>
      <div className="hidden lg:flex flex-wrap gap-3 sm:gap-4 lg:gap-10 justify-center items-center mb-8 lg:mb-20 mt-10 lg:mt-0">
        <SwitchButton
          title="QuickSort"
          algo={algo}
          setAlgo={setAlgo}
          algoName="quick"
          onAlgoChange={handleAlgoChange}
        />
        <SwitchButton
          title="MergeSort"
          algo={algo}
          setAlgo={setAlgo}
          algoName="merge"
          onAlgoChange={handleAlgoChange}
        />
        <SwitchButton
          title="BubbleSort"
          algo={algo}
          setAlgo={setAlgo}
          algoName="bubble"
          onAlgoChange={handleAlgoChange}
        />
        <SwitchButton
          title="HeapSort"
          algo={algo}
          setAlgo={setAlgo}
          algoName="heap"
          onAlgoChange={handleAlgoChange}
        />
      </div>

      {/* Visualizer */}
      <div className="flex flex-col items-center gap-5 lg:gap-15 w-full lg:w-auto">
        <div className="flex flex-col justify-center items-center">
          {/* Bars Container */}
          <div className="bg-zinc-800 rounded-2xl mb-10 w-full max-w-full overflow-x-auto">
            {/* Code & Info Buttons */}
            <div className="flex justify-end w-full p-8 gap-5">
              <button
                className="bg-zinc-900 p-3 rounded-full cursor-pointer duration-200 active:scale-75"
                onClick={() => setDispCode(!dispCode)}
              >
                <IoCodeSlashSharp />
              </button>
              <button
                className="bg-zinc-900 p-3 rounded-full cursor-pointer duration-200 active:scale-75"
                onClick={() => setDispInfo(!dispInfo)}
              >
                <IoInformationCircleOutline />
              </button>
            </div>
            {/* Array Bars */}
            <div className="flex items-end gap-2 sm:gap-4 lg:gap-5 w-max min-w-full px-4 sm:px-30 min-h-75 overflow-hidden">
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
                    className={`${color} w-8 lg:w-10 rounded-t-xl flex items-end justify-center`}
                    style={{ height: `${item.value * 30}px` }}
                  >
                    <span className="text-zinc-900 mb-2 text-sm">
                      {item.value}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* Sorting Name Heading */}
          <h1 className="text-xl lg:text-3xl font-bold text-center px-4">
            Here's how <span className="text-teal-500">{algoNames[algo]}</span>{" "}
            works
          </h1>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-10 justify-center items-center w-full">
          {/* Slider */}
          <div className="flex flex-col items-center justify-center cursor-pointer w-50 lg:w-100">
            <Slider
              color="primary"
              min={100}
              max={1500}
              step={100}
              defaultValue={400}
              orientation="horizontal"
              size="md"
              valueLabelDisplay="auto"
              onChange={(e, newSpeed) => setSpeed(newSpeed)}
              value={speed}
              valueLabelFormat={(val) => `${val} ms`}
              sx={{
                color: "#ffffff", // main track color
                "& .MuiSlider-thumb": {
                  backgroundColor: "#ffffff",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#009688",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#ffdede",
                },
              }}
              slotProps={{
                valueLabel: {
                  sx: {
                    borderRadius: "5px",
                  },
                },
              }}
            />
            <p className="text-sm text-center">Animation Speed</p>
          </div>
          {/* Buttons */}
          <div className="flex gap-3 lg:gap-6">
            <button
              className="px-6 lg:px-10 py-4 lg:py-6 rounded-full bg-zinc-800 cursor-pointer hover:bg-teal-500 hover:text-zinc-900 duration-100 active:scale-80 text-sm lg:text-base"
              onClick={generateArray}
            >
              Generate Array
            </button>

            <button
              className="px-6 lg:px-10 py-4 lg:py-6 rounded-full bg-zinc-800 cursor-pointer hover:bg-teal-500 hover:text-zinc-900 duration-100 active:scale-80 text-sm lg:text-base"
              onClick={startSorting}
            >
              Start Sorting
            </button>
          </div>
        </div>
      </div>

      {/* Info & Code Display */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-10 w-full justify-center items-start">
        {dispInfo && (
          <div>
            <div
              ref={infoCodeRef}
              className="bg-zinc-800 p-6 lg:p-10 rounded-4xl w-full max-w-lg"
            >
              <AlgoInfo data={data} />
            </div>
          </div>
        )}

        {dispCode && (
          <AnimatePresence mode="wait">
            <motion.pre
              key={lang}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg"
            >
              <div
                ref={infoCodeRef}
                className="bg-zinc-800 p-6 lg:p-10 rounded-4xl w-full max-w-full overflow-x-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-white">Code</h3>
                  <select
                    name="language"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="outline-none bg-zinc-700 px-3 py-2 rounded-lg text-sm"
                  >
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cplus">C++</option>
                  </select>
                </div>
                <pre>
                  <code className="text-green-400 text-xs lg:text-sm">
                    {data.code[lang]}
                  </code>
                </pre>
              </div>
            </motion.pre>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Sort;
