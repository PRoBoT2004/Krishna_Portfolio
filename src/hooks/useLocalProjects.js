import { useState, useEffect } from 'react';

export const useLocalProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load projects from localStorage on mount
  useEffect(() => {
    const loadProjects = () => {
      try {
        const savedProjects = localStorage.getItem('portfolio-projects');
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Save projects to localStorage
  const saveToStorage = (projectsData) => {
    try {
      localStorage.setItem('portfolio-projects', JSON.stringify(projectsData));
      setProjects(projectsData);
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  };

  // Add new project
  const addProject = async (projectData, imageFile) => {
    try {
      let imageUrl = '';
      
      // Convert image to base64 if provided
      if (imageFile) {
        imageUrl = await convertToBase64(imageFile);
      }

      const newProject = {
        id: Date.now().toString(),
        ...projectData,
        image: imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedProjects = [...projects, newProject];
      saveToStorage(updatedProjects);
      return newProject.id;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  // Update existing project
  const updateProject = async (projectId, projectData, imageFile) => {
    try {
      let updateData = { ...projectData, updatedAt: new Date().toISOString() };
      
      // Convert new image to base64 if provided
      if (imageFile) {
        updateData.image = await convertToBase64(imageFile);
      }

      const updatedProjects = projects.map(project => 
        project.id === projectId 
          ? { ...project, ...updateData }
          : project
      );

      saveToStorage(updatedProjects);
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      saveToStorage(updatedProjects);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  // Fetch projects by category
  const fetchProjects = async (category = null) => {
    setLoading(true);
    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (category) {
        const filteredProjects = projects.filter(p => p.category === category);
        return filteredProjects;
      }
      return projects;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject
  };
};

// Helper function to convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};