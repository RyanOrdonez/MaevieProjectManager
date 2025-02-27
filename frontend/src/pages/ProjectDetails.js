import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Placeholder data for development - replace with actual API calls
  const mockProject = {
    id,
    name: 'Modern Loft Renovation',
    client: 'John Smith',
    status: 'In Progress',
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    budget: '$75,000',
    description: 'Complete renovation of an industrial loft space into a modern living area with open floor plan.',
    team: [
      { id: 1, name: 'Jane Doe', role: 'Lead Designer' },
      { id: 2, name: 'Mike Johnson', role: 'Project Manager' },
      { id: 3, name: 'Sarah Williams', role: 'Interior Designer' }
    ],
    tasks: [
      { id: 1, name: 'Initial Client Consultation', status: 'Completed', dueDate: '2025-01-20' },
      { id: 2, name: 'Concept Development', status: 'Completed', dueDate: '2025-02-10' },
      { id: 3, name: 'Material Selection', status: 'In Progress', dueDate: '2025-03-15' },
      { id: 4, name: 'Construction Phase', status: 'Pending', dueDate: '2025-04-01' },
      { id: 5, name: 'Final Styling', status: 'Pending', dueDate: '2025-05-15' }
    ],
    files: [
      { id: 1, name: 'Concept Board.pdf', uploadDate: '2025-02-05', size: '2.4 MB' },
      { id: 2, name: 'Floor Plan.dwg', uploadDate: '2025-02-08', size: '4.1 MB' },
      { id: 3, name: 'Material Samples.jpg', uploadDate: '2025-02-15', size: '3.7 MB' }
    ],
    messages: [
      { id: 1, from: 'Jane Doe', content: "I've added the latest concept boards to the files section.", date: '2025-02-15', time: '10:30 AM' },
      { id: 2, from: 'John Smith', content: "Thanks Jane! I love the direction we're going.", date: '2025-02-15', time: '2:45 PM' }
    ]
  };

  useEffect(() => {
    // Simulating API fetch - replace with actual API call
    const fetchProjectDetails = async () => {
      try {
        // Comment this out and uncomment the axios call when API is ready
        setTimeout(() => {
          setProject(mockProject);
          setLoading(false);
        }, 500);
        
        /* 
        // Actual API call - uncomment when ready
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setProject(res.data);
        setLoading(false);
        */
      } catch (err) {
        setError('Failed to load project details');
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id, mockProject]);

  const handleDeleteProject = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        // Comment this out and uncomment the axios call when API is ready
        alert('Project deleted successfully');
        navigate('/projects');
        
        /*
        // Actual API call - uncomment when ready
        await axios.delete(`http://localhost:5000/api/projects/${id}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        navigate('/projects');
        */
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate(`/projects/edit/${id}`)}
            className="px-4 py-2 bg-pink-300 text-white rounded hover:bg-pink-400 transition"
          >
            Edit Project
          </button>
          <button 
            onClick={handleDeleteProject}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete Project
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-4 py-3 ${activeTab === 'overview' ? 'border-b-2 border-pink-300 text-pink-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-3 ${activeTab === 'tasks' ? 'border-b-2 border-pink-300 text-pink-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
            <button
              className={`px-4 py-3 ${activeTab === 'files' ? 'border-b-2 border-pink-300 text-pink-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('files')}
            >
              Files
            </button>
            <button
              className={`px-4 py-3 ${activeTab === 'team' ? 'border-b-2 border-pink-300 text-pink-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('team')}
            >
              Team
            </button>
            <button
              className={`px-4 py-3 ${activeTab === 'messages' ? 'border-b-2 border-pink-300 text-pink-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('messages')}
            >
              Messages
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <span className="font-medium w-32">Client:</span>
                    <span>{project.client}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-32">Status:</span>
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                      {project.status}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-32">Start Date:</span>
                    <span>{project.startDate}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-32">End Date:</span>
                    <span>{project.endDate}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-32">Budget:</span>
                    <span>{project.budget}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Project Description</h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
                <button className="px-3 py-1 bg-pink-300 text-white rounded hover:bg-pink-400 transition text-sm">
                  Add Task
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {project.tasks.map(task => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{task.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded ${
                            task.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : task.status === 'In Progress' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{task.dueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-pink-400 hover:text-pink-600 mr-3">Edit</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'files' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Files</h3>
                <button className="px-3 py-1 bg-pink-300 text-white rounded hover:bg-pink-400 transition text-sm">
                  Upload File
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {project.files.map(file => (
                      <tr key={file.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{file.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{file.uploadDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{file.size}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-500 hover:text-blue-700 mr-3">Download</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Project Team</h3>
                <button className="px-3 py-1 bg-pink-300 text-white rounded hover:bg-pink-400 transition text-sm">
                  Add Member
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.team.map(member => (
                  <div key={member.id} className="bg-gray-50 p-4 rounded">
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                    <div className="mt-3 flex">
                      <button className="text-pink-400 hover:text-pink-600 text-sm mr-3">Edit</button>
                      <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div>
              <div className="space-y-4 mb-6">
                {project.messages.map(message => (
                  <div key={message.id} className="bg-gray-50 p-4 rounded">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-gray-900">{message.from}</div>
                      <div className="text-xs text-gray-500">{message.date} at {message.time}</div>
                    </div>
                    <div className="mt-2 text-gray-700">{message.content}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  New Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  className="shadow-sm focus:ring-pink-300 focus:border-pink-300 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Type your message here..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button className="px-4 py-2 bg-pink-300 text-white rounded hover:bg-pink-400 transition">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
