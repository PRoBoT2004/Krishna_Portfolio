import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFileProjects } from '../../hooks/useFileProjects';
import { Plus, Copy, Download, Upload, FolderOpen, Edit, Trash2, Save, X, Eye, ExternalLink, Github } from 'lucide-react';

const FileProjectManager = () => {
  const { projects } = useFileProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'uiux',
    year: new Date().getFullYear().toString(),
    liveUrl: '',
    githubUrl: '',
    // Case study fields
    hasDetailedStudy: false,
    logo: '',
    heroVideo: '',
    overview: '',
    problem: '',
    solution: '',
    figmaUrl: '',
    technologies: '',
    duration: '',
    role: '',
    galleryImages: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [generatedJSON, setGeneratedJSON] = useState('');

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'uiux',
      year: new Date().getFullYear().toString(),
      liveUrl: '',
      githubUrl: '',
      hasDetailedStudy: false,
      logo: '',
      heroVideo: '',
      overview: '',
      problem: '',
      solution: '',
      figmaUrl: '',
      technologies: '',
      duration: '',
      role: '',
      galleryImages: ''
    });
    setImageFile(null);
    setGeneratedJSON('');
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
      githubUrl: project.githubUrl || '',
      hasDetailedStudy: project.caseStudy?.hasDetailedStudy || false,
      logo: project.caseStudy?.logo || '',
      heroVideo: project.caseStudy?.heroVideo || '',
      overview: project.caseStudy?.overview || '',
      problem: project.caseStudy?.problem ? project.caseStudy.problem.join('\n') : '',
      solution: project.caseStudy?.solution ? project.caseStudy.solution.join('\n') : '',
      figmaUrl: project.caseStudy?.figmaUrl || '',
      technologies: project.caseStudy?.technologies ? project.caseStudy.technologies.join(', ') : '',
      duration: project.caseStudy?.duration || '',
      role: project.caseStudy?.role || '',
      galleryImages: project.caseStudy?.gallery ? project.caseStudy.gallery.join('\n') : ''
    });
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate project ID from title
    const projectId = formData.title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const newProject = {
      id: editingProject ? editingProject.id : projectId,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      year: formData.year,
      image: imageFile ? `/images/projects/${imageFile.name}` : (editingProject?.image || ''),
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      createdAt: editingProject ? editingProject.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      figmaUrl: formData.figmaUrl,
    };

    // Add case study data if enabled
    if (formData.hasDetailedStudy) {
      newProject.caseStudy = {
        hasDetailedStudy: true,
        logo: formData.logo,
        heroVideo: formData.heroVideo,
        overview: formData.overview,
        problem: formData.problem.split('\n').filter(p => p.trim()),
        solution: formData.solution.split('\n').filter(s => s.trim()),
        gallery: formData.galleryImages.split('\n').filter(img => img.trim()),
        
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
        duration: formData.duration,
        role: formData.role
      };
    }

    setGeneratedJSON(JSON.stringify(newProject, null, 2));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJSON);
    alert('Project JSON copied to clipboard!');
  };

  const downloadProjectsFile = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projects.json';
    link.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedProjects = JSON.parse(e.target.result);
          localStorage.setItem('portfolio-projects', JSON.stringify(importedProjects));
          alert('Projects imported successfully! Page will reload to show new data.');
          window.location.reload();
        } catch (error) {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const deleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      alert('To delete a project, remove it from src/data/projects.json file and redeploy.');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-black">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-400">Project Manager</h1>
            <p className="mt-1 text-sm text-gray-400">Manage your portfolio projects with case studies</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={downloadProjectsFile}
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
              className="flex items-center px-6 py-2 space-x-2 font-semibold text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              <Plus size={20} />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 mb-8 border rounded-lg bg-blue-500/20 border-blue-500/30">
          <h3 className="flex items-center mb-3 font-semibold text-blue-300">
            <FolderOpen className="mr-2" size={20} />
            How File-Based System Works:
          </h3>
          <div className="grid gap-4 text-sm text-blue-200 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium">📝 Adding Projects:</h4>
              <ol className="pl-4 space-y-1 list-decimal list-inside">
                <li>Fill out the form below</li>
                <li>Copy the generated JSON</li>
                <li>Add it to <code className="px-2 py-1 rounded bg-black/30">src/data/projects.json</code></li>
                <li>Save images to <code className="px-2 py-1 rounded bg-black/30">public/images/projects/</code></li>
              </ol>
            </div>
            <div>
              <h4 className="mb-2 font-medium">🚀 Deploying:</h4>
              <ol className="pl-4 space-y-1 list-decimal list-inside">
                <li>Commit changes to Git</li>
                <li>Push to GitHub</li>
                <li>Projects appear on live site!</li>
                <li>Use Export/Import for backups</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
          <div className="p-4 text-center border rounded-lg bg-gray-900/50 border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">{projects.length}</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
          <div className="p-4 text-center border rounded-lg bg-gray-900/50 border-orange-500/20">
            <div className="text-2xl font-bold text-blue-400">{projects.filter(p => p.category === 'uiux').length}</div>
            <div className="text-sm text-gray-400">UI/UX Projects</div>
          </div>
          <div className="p-4 text-center border rounded-lg bg-gray-900/50 border-orange-500/20">
            <div className="text-2xl font-bold text-green-400">{projects.filter(p => p.category === 'frontend').length}</div>
            <div className="text-sm text-gray-400">Frontend Projects</div>
          </div>
          <div className="p-4 text-center border rounded-lg bg-gray-900/50 border-orange-500/20">
            <div className="text-2xl font-bold text-purple-400">{projects.filter(p => p.caseStudy?.hasDetailedStudy).length}</div>
            <div className="text-sm text-gray-400">Case Studies</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.length === 0 ? (
            <div className="py-20 text-center col-span-full">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <div className="mb-4 text-lg text-gray-400">No projects yet</div>
              <p className="mb-6 text-gray-500">Click "Add Project" to create your first project</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 font-semibold text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                Create First Project
              </button>
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                className="overflow-hidden transition-all duration-300 border bg-gray-900/50 border-orange-500/20 rounded-xl hover:border-orange-500/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Image */}
                {project.image && (
                  <div className="relative overflow-hidden bg-gray-800 aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 text-xs font-medium text-black rounded-full bg-orange-500/90">
                        {project.year}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-xs text-orange-300 rounded-full bg-black/60">
                        {project.category === 'uiux' ? 'UI/UX' : 'Frontend'}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Project Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="flex-1 text-lg font-semibold text-orange-400">{project.title}</h3>
                    {project.caseStudy?.hasDetailedStudy && (
                      <span className="px-2 py-1 ml-2 text-xs text-purple-300 rounded-full bg-purple-500/20">
                        Case Study
                      </span>
                    )}
                  </div>
                  
                  <p className="mb-4 text-sm text-gray-300 line-clamp-2">{project.description}</p>
                  
                  {/* Technologies */}
                  {project.caseStudy?.technologies && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.caseStudy.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="px-2 py-1 text-xs text-gray-300 bg-gray-800 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.caseStudy.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded">
                          +{project.caseStudy.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <a
                                                    href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-green-400 transition-colors duration-300 rounded-lg hover:bg-green-400/20"
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-400 transition-colors duration-300 rounded-lg hover:bg-blue-400/20"
                          title="GitHub"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.caseStudy?.hasDetailedStudy && (
                        <a
                          href={`/case-study/${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-purple-400 transition-colors duration-300 rounded-lg hover:bg-purple-400/20"
                          title="Case Study"
                        >
                          <Eye size={16} />
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-blue-400 transition-colors duration-300 rounded-lg hover:bg-blue-400/20"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-red-400 transition-colors duration-300 rounded-lg hover:bg-red-400/20"
                        title="Delete"
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

        {/* Add/Edit Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <motion.div
              className="bg-gray-900 border border-orange-500/20 rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Form Header */}
              <div className="flex items-center justify-between p-6 border-b border-orange-500/20">
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

              <div className="flex h-[calc(95vh-120px)]">
                {/* Form Section */}
                <div className="w-1/2 p-6 overflow-y-auto">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Project Info */}
                    <div className="space-y-4">
                      <h3 className="pb-2 text-lg font-semibold text-orange-300 border-b border-orange-500/20">
                        Basic Information
                      </h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-orange-300">
                            Project Title *
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
                            Category *
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
                          Description *
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          required
                          rows="3"
                          className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg resize-none bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
                          placeholder="Brief project description"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-orange-300">
                            Year *
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
                            Live URL
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
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={formData.githubUrl}
                            onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                            className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
                            placeholder="https://github.com/user/repo"
                          />
                        </div>
                      </div>
<div>
                            <label className="block mb-2 text-sm font-medium text-purple-300">
                              Figma URL
                            </label>
                            <input
                              type="url"
                              value={formData.figmaUrl}
                              onChange={(e) => setFormData({...formData, figmaUrl: e.target.value})}
                              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                              placeholder="https://figma.com/design/..."
                            />
                          </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-orange-300">
                          Main Project Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files[0])}
                          className="w-full px-4 py-3 text-white transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-black hover:file:bg-orange-600"
                        />
                        <p className="mt-1 text-xs text-gray-500">Save to: public/images/projects/filename.jpg</p>
                      </div>
                    </div>

                    {/* Case Study Toggle */}
                    <div className="space-y-4">
                      <div className="flex items-center p-4 space-x-3 border rounded-lg bg-purple-500/10 border-purple-500/20">
                        <input
                          type="checkbox"
                          id="hasDetailedStudy"
                          checked={formData.hasDetailedStudy}
                          onChange={(e) => setFormData({...formData, hasDetailedStudy: e.target.checked})}
                          className="w-5 h-5 text-purple-500 bg-gray-800 border-purple-500 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="hasDetailedStudy" className="font-medium text-purple-300">
                          Create Detailed Case Study
                        </label>
                      </div>
                    </div>

                    {/* Case Study Fields */}
                    {formData.hasDetailedStudy && (
                      <div className="space-y-4">
                        <h3 className="pb-2 text-lg font-semibold text-purple-300 border-b border-purple-500/20">
                          Case Study Details
                        </h3>

                        <div>
                          <label className="block mb-2 text-sm font-medium text-purple-300">
                            Project Overview
                          </label>
                          <textarea
                            value={formData.overview}
                            onChange={(e) => setFormData({...formData, overview: e.target.value})}
                            rows="4"
                            className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg resize-none bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                            placeholder="Detailed project overview for case study page"
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-purple-300">
                              Problems (one per line)
                            </label>
                            <textarea
                              value={formData.problem}
                              onChange={(e) => setFormData({...formData, problem: e.target.value})}
                              rows="4"
                              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg resize-none bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                              placeholder="Outdated UI lacking consistency&#10;Poor navigation experience&#10;Limited user engagement"
                            />
                          </div>

                          <div>
                            <label className="block mb-2 text-sm font-medium text-purple-300">
                              Solutions (one per line)
                            </label>
                            <textarea
                              value={formData.solution}
                              onChange={(e) => setFormData({...formData, solution: e.target.value})}
                              rows="4"
                              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg resize-none bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                              placeholder="Modern cohesive interface&#10;Streamlined navigation flow&#10;Enhanced user interactions"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-purple-300">
                              Technologies (comma separated)
                            </label>
                            <input
                              type="text"
                              value={formData.technologies}
                              onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                              placeholder="Figma, React, JavaScript, Tailwind CSS"
                            />
                          </div>

                          <div>
                            <label className="block mb-2 text-sm font-medium text-purple-300">
                              Project Duration
                            </label>
                            <input
                              type="text"
                              value={formData.duration}
                              onChange={(e) => setFormData({...formData, duration: e.target.value})}
                              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                              placeholder="3 months"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-purple-300">
                              Your Role
                            </label>
                            <input
                              type="text"
                              value={formData.role}
                              onChange={(e) => setFormData({...formData, role: e.target.value})}
                              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                              placeholder="Lead UI/UX Designer"
                            />
                          </div>

                          
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                                                       <label className="block mb-2 text-sm font-medium text-purple-300">
                              Logo URL (optional)
                            </label>
                            <input
                              type="text"
                              value={formData.logo}
                              onChange={(e) => setFormData({...formData, logo: e.target.value})}
                              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                              placeholder="/images/projects/logo.png"
                            />
                          </div>

                          <div>
                            <label className="block mb-2 text-sm font-medium text-purple-300">
                              Hero Video URL (optional)
                            </label>
                            <input
                              type="text"
                              value={formData.heroVideo}
                              onChange={(e) => setFormData({...formData, heroVideo: e.target.value})}
                              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                              placeholder="/assets/bg-video.mp4"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-2 text-sm font-medium text-purple-300">
                            Gallery Images (one per line)
                          </label>
                          <textarea
                            value={formData.galleryImages}
                            onChange={(e) => setFormData({...formData, galleryImages: e.target.value})}
                            rows="4"
                            className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg resize-none bg-gray-800/50 border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                            placeholder="/assets/ss1.png&#10;/assets/ss2.png&#10;/assets/ss3.png&#10;/assets/ss4.png"
                          />
                          <p className="mt-1 text-xs text-gray-500">Save images to: public/assets/ or public/images/projects/</p>
                        </div>
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end pt-6 space-x-4 border-t border-gray-700">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-3 text-gray-400 transition-colors duration-300 border border-gray-600 rounded-lg hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center px-6 py-3 space-x-2 font-semibold text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600"
                      >
                        <Save size={20} />
                        <span>Generate JSON</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* JSON Output Section */}
                <div className="w-1/2 p-6 border-l border-gray-700 bg-gray-900/50">
                  <h3 className="mb-4 text-lg font-semibold text-orange-300">Generated Project JSON</h3>
                  
                  {generatedJSON ? (
                    <div className="space-y-4">
                      {/* JSON Display */}
                      <div className="p-4 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg h-96">
                        <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                          {generatedJSON}
                        </pre>
                      </div>
                      
                      {/* Copy Button */}
                      <div className="flex space-x-3">
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-300 bg-green-600 rounded-lg hover:bg-green-700"
                        >
                          <Copy size={16} />
                          <span>Copy JSON</span>
                        </button>
                      </div>

                      {/* Instructions */}
                      <div className="p-4 border rounded-lg bg-yellow-500/20 border-yellow-500/30">
                        <h4 className="flex items-center mb-3 font-semibold text-yellow-300">
                          <span className="mr-2">📋</span>
                          Next Steps:
                        </h4>
                        <ol className="space-y-2 text-sm text-yellow-200 list-decimal list-inside">
                          <li>Copy the JSON above</li>
                          <li>Open <code className="px-2 py-1 rounded bg-black/30">src/data/projects.json</code></li>
                          <li>Add the JSON to the array (don't forget the comma if not first!)</li>
                          {imageFile && (
                            <li>Save your main image as <code className="px-2 py-1 rounded bg-black/30">public/images/projects/{imageFile.name}</code></li>
                          )}
                          {formData.hasDetailedStudy && formData.galleryImages && (
                            <li>Save gallery images to the paths you specified</li>
                          )}
                          <li>Commit and push to GitHub</li>
                          <li>Your project will appear on the deployed site!</li>
                        </ol>
                      </div>

                      {/* File Structure Helper */}
                      <div className="p-4 border rounded-lg bg-blue-500/20 border-blue-500/30">
                        <h4 className="mb-2 font-semibold text-blue-300">📁 File Structure:</h4>
                        <pre className="font-mono text-xs text-blue-200">
{`src/data/projects.json          ← Add your JSON here
public/images/projects/         ← Main project images
public/assets/                  ← Case study gallery images
${imageFile ? `public/images/projects/${imageFile.name}` : 'public/images/projects/your-image.jpg'}
${formData.galleryImages ? formData.galleryImages.split('\n').map(img => img.trim()).filter(img => img).map(img => img).join('\n') : '/assets/gallery-image.png'}`}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-800 border border-gray-600 rounded-lg h-96">
                      <FolderOpen className="w-16 h-16 mb-4 text-gray-500" />
                      <p className="mb-2 text-gray-400">Fill out the form and click "Generate JSON"</p>
                      <p className="text-sm text-gray-500">Your project data will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileProjectManager;