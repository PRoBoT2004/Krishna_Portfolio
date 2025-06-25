import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

export const useFileProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load projects from JSON file
  useEffect(() => {
    setProjects(projectsData);
    setLoading(false);
  }, []);

  // Get projects by category
  const fetchProjects = async (category = null) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
    
    if (category) {
      const filtered = projectsData.filter(p => p.category === category);
      setProjects(filtered);
    } else {
      setProjects(projectsData);
    }
    setLoading(false);
  };

  // For development: Add project to local storage temporarily
  // Then you manually add it to projects.json file
  const addProjectToFile = (projectData, imageFile) => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      image: imageFile ? `/images/projects/${imageFile.name}` : '',
      createdAt: new Date().toISOString()
    };

    // Show the JSON to copy-paste into projects.json
    console.log('Add this to src/data/projects.json:');
    console.log(JSON.stringify(newProject, null, 2));
    
    // Also save to localStorage for immediate preview
    const currentProjects = JSON.parse(localStorage.getItem('temp-projects') || '[]');
    const updatedProjects = [...currentProjects, newProject];
    localStorage.setItem('temp-projects', JSON.stringify(updatedProjects));
    
    alert('Project data logged to console. Copy it to projects.json file!');
    return newProject.id;
  };

  return {
    projects,
    loading,
    fetchProjects,
    addProjectToFile
  };
};