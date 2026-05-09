import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = ({setCategory}) => {
  const categories = [
    {
      title: "Sorting",
      description:
        "Visualize sorting algorithms like Bubble, Merge, Quick and Heap Sort.",
      icon: "📊",
    },
    {
      title: "Searching",
      description:
        "Understand Linear Search, Binary Search and more step-by-step.",
      icon: "🔍",
    },
    {
      title: "Linked List",
      description:
        "Explore insertion, deletion, traversal and node operations.",
      icon: "🔗",
    },
    {
      title: "Stack",
      description: "Learn push, pop and stack-based problem solving visually.",
      icon: "📚",
    },
    {
      title: "Queue",
      description: "Visualize enqueue, dequeue and circular queue operations.",
      icon: "🚦",
    },
    {
      title: "Trees",
      description: "Traverse Binary Trees, BSTs and AVL Trees interactively.",
      icon: "🌳",
    },
    {
      title: "Graphs",
      description: "Run Dijkstra, BFS, DFS and shortest path algorithms live.",
      icon: "🕸️",
    },
    {
      title: "DP",
      description: "Break down complex problems into smaller subproblems.",
      icon: "⚡",
    },
  ];

  const [search, setSearch] = useState("");
  
  const filteredCards = categories.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white px-6 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5">
            Algo Visualizer
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mx-auto max-w-3xl">
            Learn algorithms and data structures interactively with beautiful
            animations and real-time visualizations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-15">
          <input 
            type="text"
            placeholder="Search algorithms..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800/70 px-5 py-4 rounded-2xl text-lg outline-none border border-slate-700 focus:border-cyan-600 shadow-lg"
          />
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredCards.map((category,idx) => (
            <button key={idx}
            onClick={() => setCategory(category.title)}
            className="group text-left rounded-3xl p-10 cursor-pointer border border-slate-800 bg-slate-900/70 hover:border-cyan-600 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 duration-200"
            >
              <div className="flex gap-6 mb-5 justify-start items-center">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <h2 className="group-hover:text-cyan-500 text-3xl font-extrabold ease-in-out duration-200">
                  {category.title}
                </h2>
              </div>
              <p className="text-lg mb-4">
                {category.description}
              </p>
              <div>
                Explore
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;
