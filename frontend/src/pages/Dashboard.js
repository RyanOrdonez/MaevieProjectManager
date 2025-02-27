import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data - in a real app this would come from your API
  const recentProjects = [
    { id: 1, name: 'Modern Apartment Redesign', client: 'John Smith', status: 'In Progress' },
    { id: 2, name: 'Coastal Beach House', client: 'Sarah Johnson', status: 'Not Started' },
    { id: 3, name: 'Office Renovation', client: 'Tech Innovations Inc.', status: 'In Progress' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Client Meeting', date: '2025-03-05', time: '10:00 AM' },
    { id: 2, title: 'Vendor Consultation', date: '2025-03-10', time: '2:00 PM' },
    { id: 3, title: 'Project Deadline', date: '2025-03-15', time: 'All Day' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-lora font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back to Maevie</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="card bg-white rounded-xl shadow flex items-center">
          <div className="p-4 rounded-full bg-blush bg-opacity-20 mr-4">
            <span className="text-xl">📁</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
        </div>
        
        <div className="card bg-white rounded-xl shadow flex items-center">
          <div className="p-4 rounded-full bg-blush bg-opacity-20 mr-4">
            <span className="text-xl">👥</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Clients</h3>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
        </div>
        
        <div className="card bg-white rounded-xl shadow flex items-center">
          <div className="p-4 rounded-full bg-blush bg-opacity-20 mr-4">
            <span className="text-xl">💰</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Invoices</h3>
            <p className="text-2xl font-bold text-gray-900">5</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Recent Projects */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-lora font-semibold text-gray-800">Recent Projects</h2>
            <Link to="/projects" className="text-sm text-blush hover:text-light-gold">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-600">Client: {project.client}</p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    project.status === 'In Progress' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-lora font-semibold text-gray-800">Upcoming Events</h2>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
