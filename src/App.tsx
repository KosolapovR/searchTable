import React from "react";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/Layout";

export default function App() {
  return (
      <Router>
        <Layout />
      </Router>
  );
}
