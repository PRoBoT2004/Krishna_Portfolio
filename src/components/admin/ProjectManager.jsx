import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocalProjects } from '../../hooks/useLocalProjects';
import { Plus, Edit, Trash2, Save, X, Download, Upload } from 'lucide-react';

const ProjectManager = () => {
  const { projects, loading, addProject, updateProject, deleteProject } = useLocalProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'uiux',
    year: new Date().getFullYear().toString(),
    liveUrl: '',
    githubUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'uiux',
      year: new Date().getFullYear().toString(),
      liveUrl: '',
      githubUrl: ''
    });
    setImageFile(null);
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      category: project.category || 'uiux',
      year: project.year || new Date().getFullYear().toString(),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || ''
    });
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData, imageFile);
      } else {
        await addProject(formData, imageFile);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  // Export data function
  const exportData = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-projects-backup.json';
    link.click();
  };

  // Import data function
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedProjects = JSON.parse(e.target.result);
          localStorage.setItem('portfolio-projects', JSON.stringify(importedProjects));
          window.location.reload(); // Refresh to load new data
        } catch (error) {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-xl text-orange-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-orange-400">Project Manager</h1>
          <div className="flex space-x-4">
            {/* Export/Import buttons */}
            <button
              onClick={exportData}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            
            <label className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-300 bg-green-600 rounded-lg cursor-pointer hover:bg-green-700">
              <Upload size={16} />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-6 py-3 space-x-2 text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              <Plus size={20} />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-4 mb-8 border rounded-lg bg-blue-500/20 border-blue-500/30">
          <p className="text-sm text-blue-300">
            💡 <strong>Free Local Storage:</strong> Your projects are saved in your browser. 
            Use Export/Import to backup or transfer your data between devices.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.length === 0 ? (
            <div className="py-20 text-center col-span-full">
              <div className="mb-4 text-lg text-gray-400">No projects yet</div>
              <p className="text-gray-500">Click "Add Project" to create your first project</p>
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                className="overflow-hidden border bg-gray-900/50 border-orange-500/20 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-48"
                  />
                )}
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-orange-400">{project.title}</h3>
                    <span className="px-2 py-1 text-xs text-orange-300 rounded bg-orange-500/20">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="mb-4 text-sm text-gray-300 line-clamp-3">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{project.year}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-blue-400 transition-colors duration-300 rounded-lg hover:bg-blue-400/20"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-red-400 transition-colors duration-300 rounded-lg hover:bg-red-400/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Form Modal - Same as before but with local storage */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <motion.div
              className="bg-gray-900 border border-orange-500/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-orange-400">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-400 transition-colors duration-300 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-orange-300">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
                      placeholder="Enter project title"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-orange-300">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 text-white transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
                    >
                      <option value="uiux">UI/UX Design</option>
                      <option value="frontend">Frontend Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-orange-300">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows="4"
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg resize-none bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
                    placeholder="Enter project description"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-orange-300">
                      Year
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      required
                      className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
                      placeholder="2024"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-orange-300">
                      Project Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full px-4 py-3 text-white transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-black hover:file:bg-orange-600"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-orange-300">
                      Live URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                      className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-orange-300">
                      GitHub URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                      className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 text-gray-400 transition-colors duration-300 border border-gray-600 rounded-lg hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center px-6 py-3 space-x-2 text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    <span>{submitting ? 'Saving...' : 'Save Project'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;