import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-[#0DBADE] to-[#18DCB7] text-white p-4 shadow">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-bold">ScrappyHappy Waste Analytics</h1>
          <p>Track and visualize waste collection data</p>
        </div>
      </header>

      <main>
        <Dashboard />
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-10">
        <div className="max-w-screen-xl mx-auto">
          <p>© 2025 ScrappyHappy Waste Analytics MVP</p>
        </div>
      </footer>
    </div>
  );
}

export default App;