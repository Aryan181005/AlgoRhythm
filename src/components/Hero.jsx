import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogo from "./SocialLogo";
import insta from "../assets/insta.svg";
import github from "../assets/github.svg";
import stack from "../assets/stack.svg";
import AppLogo from "./AppLogo";
import { motion } from "framer-motion";

const Hero = () => {
  const categories = [
    {
      title: "Sort",
      description:
        "Visualize sorting algorithms like Bubble, Merge, Quick and Heap Sort.",
      icon: "📊",
      path: "/sorting",
    },
    {
      title: "Search",
      description:
        "Explore searching techniques - Linear Search, Binary Search and more step-by-step.",
      icon: "🔍",
      path: "/searching",
    },
    {
      title: "Linked List",
      description:
        "Explore insertion, deletion, traversal and node operations.",
      icon: "🔗",
      path: "/linkedlist",
    },
    {
      title: "Stack",
      description: "Learn push, pop and stack-based problem solving visually.",
      icon: "📚",
      path: "/stack",
    },
    {
      title: "Queue",
      description: "Visualize enqueue, dequeue and circular queue operations.",
      icon: "🚦",
      path: "/queue",
    },
    {
      title: "Trees",
      description: "Traverse Binary Trees, BSTs and AVL Trees interactively.",
      icon: "🌳",
      path: "/trees",
    },
    {
      title: "Graphs",
      description: "Run Dijkstra, BFS, DFS and shortest path algorithms live.",
      icon: "🕸️",
      path: "/graphs",
    },
    {
      title: "DP",
      description:
        "Break down complex problems into smaller subproblems using Dynamic Programming.",
      icon: "⚡",
      path: "/dp",
    },
  ];

  // Category Search Function
  const [search, setSearch] = useState("");

  const filteredCards = categories.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  // Bar Loader
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 500);
  }, []);

  // Navigation Handler
  const navigate = useNavigate();

  return (
    <div className="text-white px-5 py-10 sm:px-6 lg:px-10 lg:py-20 min-h-screen relative">
      <motion.h1
        initial={{ opacity: 0, letterSpacing: "50px" }}
        animate={{ opacity: 1, letterSpacing: "20px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        className="text-center text-3xl lg:text-5xl font-black mb-15"
      >
        NEXALGO
      </motion.h1>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.8 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        {/* Search Bar */}
        <div className="mx-auto mb-15 flex flex-col lg:flex-row gap-5 justify-between items-center">
          <input
            type="text"
            placeholder="Search algorithms..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-4/5 lg:w-100 bg-slate-800/70 px-5 py-4 rounded-full text-lg outline-none border border-slate-700 focus:border-cyan-600 shadow-lg focus:w-full lg:focus:w-1/2 duration-300"
          />
          <div className="flex justify-evenly items-center gap-5 lg:gap-10 cursor-pointer">
            <SocialLogo title={github} link="https://github.com/Aryan181005" />
            <SocialLogo title={stack} link="https://github.com/Aryan181005" />
            <SocialLogo title={insta} link="https://github.com/Aryan181005" />
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredCards.map((category, idx) => (
            <button
              key={idx}
              onClick={() => navigate(category.path)}
              className="group text-left rounded-3xl p-10 cursor-pointer border border-slate-800 bg-zinc-800 hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2 duration-200"
            >
              <div className="flex gap-6 mb-5 justify-start items-center min-w-0">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <h2 className="group-hover:text-teal-500 text-3xl font-extrabold ease-in-out duration-200">
                  {category.title}
                </h2>
              </div>
              <p className="text-base mb-4">{category.description}</p>
              <div className="group-hover:text-blue-400 duration-200 relative">
                <span className="absolute opacity-0 group-hover:opacity-100">
                  Explore →{" "}
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
