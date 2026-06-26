import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectProvider } from './context/ProjectContext';
import { BuildProvider } from './context/BuildContext';
import MainWindow from './components/MainWindow';
import './styles/darkMode.css';
import './styles/lightMode.css';

function App() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <BuildProvider>
          <MainWindow />
        </BuildProvider>
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;
