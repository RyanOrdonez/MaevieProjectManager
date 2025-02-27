import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  // In a real app, you would fetch this data from your API
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Modern Apartment Redesign',
      description: 'Complete interior redesign of a 2-bedroom apartment',
      status: 'IN_PROGRESS',
      createdAt: '2025-01-15T12:00:00Z',
      owner: { name: 'Jane Smith' },
      members: [{ name: 'John Smith' }],
    },
    {
      id: '2',
      name: 'Coastal Beach House',
      description: 'Interior and exterior design for a beach house property',
      status: 'NOT_STARTED',
      createdAt: '2025-02-01T12:00:00Z',
      owner: { name: 'Jane Smith' },
      members: [{ name: 'Sarah Johnson' }],
    },
    {
      id: '3',
      name: 'Office Renovation',
      description: 'Modern office space redesign for a tech company',
      status: 'IN_PROGRESS',
      createdAt: '2025-02-10T12:00:00Z',
      owner: { name: 'Jane Smith' },
      members: [{ name: 'Tech Innovations Inc.' }],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your API
    const project = {
      id: Date.now().toString(),
      ...newProject,
      status: 'NOT_STARTED',
      createdAt: new Date().toISOString(),
      owner: { name: 'Jane Smith' },
      members: [],
    };
    
    setProjects([...projects, project]);
    setNewProject({ name: '', description: '' });
    setIsModalOpen(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'ON_HOLD':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-lora font-bold text-gray-800">Projects</h1>
          <p className="text-gray-600">Manage your interior design projects</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          New Project
        </button>
      </header>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between mb-4">
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(project.status)}`}>
                {project.status.replace('_', ' ')}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(project.createdAt)}
              </span>
            </div>
            
            <h2 className="text-xl font-lora font-semibold text-gray-800 mb-2">
              {project.name}
            </h2>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {project.description}
            </p>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Owner:</span> {project.owner.name}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Client:</span> {project.members[0]?.name || 'None'}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-lora font-bold text-gray-800 mb-6">
              Create New Project
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProject.name}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newProject.description}
                  onChange={handleChange}
                  rows="4"
                  className="input"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
