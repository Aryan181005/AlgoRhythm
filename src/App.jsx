import React, { useState } from "react";
import Sort from "./components/Sort";
import Hero from "./components/Hero";
import Search from "./components/Search";
import LinkedList from "./components/LinkedList";
import Stack from "./components/Stack";
import Queue from "./components/Queue";
import Trees from "./components/Trees";
import Graphs from "./components/Graphs";
import DP from "./components/DP";
import { FiChevronsLeft } from "react-icons/fi";
import SwitchButton from "./components/SwitchButton";
import { Switch } from "react-aria-components";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const [algo, setAlgo] = useState("quick");

  const location = useLocation();

  return (
    <>
    // Animated Routing
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Hero />
              </PageWrapper>
            }
          />
          <Route
            path="/sorting"
            element={
              <PageWrapper>
                <Sort algo={algo} setAlgo={setAlgo} />
              </PageWrapper>
            }
          />
          <Route
            path="/searching"
            element={
              <PageWrapper>
                <Search />
              </PageWrapper>
            }
          />
          <Route
            path="/linkedlist"
            element={
              <PageWrapper>
                <LinkedList />
              </PageWrapper>
            }
          />
          <Route
            path="/stack"
            element={
              <PageWrapper>
                <Stack />
              </PageWrapper>
            }
          />
          <Route
            path="queue"
            element={
              <PageWrapper>
                <Queue />
              </PageWrapper>
            }
          />
          <Route
            path="/trees"
            element={
              <PageWrapper>
                <Trees />
              </PageWrapper>
            }
          />
          <Route
            path="/graphs"
            element={
              <PageWrapper>
                <Graphs />
              </PageWrapper>
            }
          />
          <Route
            path="/dp"
            element={
              <PageWrapper>
                <DP />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
