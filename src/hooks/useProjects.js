import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects
  const fetchProjects = async (category = null) => {
    try {
      setLoading(true);
      const projectsRef = collection(db, 'projects');
      let q = query(projectsRef, orderBy('createdAt', 'desc'));
      
      if (category) {
        q = query(projectsRef, where('category', '==', category), orderBy('createdAt', 'desc'));
      }
      
      const snapshot = await getDocs(q);
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add project
  const addProject = async (projectData, imageFile) => {
    try {
      let imageUrl = '';
      
      // Upload image if provided
      if (imageFile) {
        const imageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        image: imageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  // Update project
  const updateProject = async (projectId, projectData, imageFile) => {
    try {
      let updateData = { ...projectData, updatedAt: new Date() };
      
      // Upload new image if provided
      if (imageFile) {
        const imageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(snapshot.ref);
        updateData.image = imageUrl;
      }
      
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, updateData);
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject
  };
};