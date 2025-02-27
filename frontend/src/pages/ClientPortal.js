import React, { useState } from 'react';

const ClientPortal = () => {
  // Mock data - in a real app this would come from your API
  const [client] = useState({
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    project: {
      id: '1',
      name: 'Modern Apartment Redesign',
      description: 'Complete interior redesign of a 2-bedroom apartment',
      status: 'IN_PROGRESS',
      designer: 'Jane Smith',
    },
  });

  const [activeTab, setActiveTab] = useState('boards');

  // Mock data for different tabs
  const boardsData = [
    { id: '1', name: 'Concept Board', imageUrl: 'https://via.placeholder.com/300x200', description: 'Initial concept for living room' },
    { id: '2', name: 'Color Scheme', imageUrl: 'https://via.placeholder.com/300x200', description: 'Proposed color palette' },
    { id: '3', name: 'Materials Board', imageUrl: 'https://via.placeholder.com/300x200', description: 'Selected materials and textures' },
  ];

  const contractsData = [
    { id: '1', title: 'Design Services Agreement', date: '2025-01-20', status: 'SIGNED' },
  ];

  const questionnairesData = [
    { id: '1', title: 'Initial Client Questionnaire', date: '2025-01-15', status: 'COMPLETED' },
    { id: '2', title: 'Style Preferences', date: '2025-01-18', status: 'COMPLETED' },
  ];

  const invoicesData = [
    { id: '1', title: 'Initial Consultation', amount: '$250.00', date: '2025-01-22', status: 'PAID' },
    { id: '2', title: 'Design Retainer', amount: '$1,500.00', date: '2025-02-01', status: 'PAID' },
  ];

  const messagesData = [
    { id: '1', from: 'Jane Smith', content: "Hi John, I've uploaded the initial concept boards. Please take a look and let me know your thoughts!", date: '2025-02-15', time: '10:30 AM' },
    { id: '2', from: 'John Smith', content: "Thanks Jane! I'll review them today and get back to you.", date: '2025-02-15', time: '2:45 PM' },
  ];

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'boards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardsData.map((board) => (
              <div key={board.id} className="card">
                <img 
                  src={board.imageUrl} 
                  alt={board.name} 
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-lora font-semibold">{board.name}</h3>
                  <p className="text-gray-600 mt-1">{board.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'contracts':
        return (
          <div className="space-y-4">
            {contractsData.map((contract) => (
              <div key={contract.id} className="card flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{contract.title}</h3>
                  <p className="text-sm text-gray-600">Date: {contract.date}</p>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-4">
                    {contract.status}
                  </span>
                  <button className="btn-secondary text-sm">Download</button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'questionnaires':
        return (
          <div className="space-y-4">
            {questionnairesData.map((questionnaire) => (
              <div key={questionnaire.id} className="card flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{questionnaire.title}</h3>
                  <p className="text-sm text-gray-600">Completed on: {questionnaire.date}</p>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-4">
                    {questionnaire.status}
                  </span>
                  <button className="btn-secondary text-sm">View</button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'invoices':
        return (
          <div className="space-y-4">
            {invoicesData.map((invoice) => (
              <div key={invoice.id} className="card flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{invoice.title}</h3>
                  <p className="text-sm text-gray-600">Date: {invoice.date}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-4">{invoice.amount}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-4">
                    {invoice.status}
                  </span>
                  <button className="btn-secondary text-sm">Download</button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'messages':
        return (
          <div className="card p-0 overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <h3 className="font-medium">Messages with {client.project.designer}</h3>
            </div>
            
            <div className="p-4 h-96 overflow-y-auto space-y-4">
              {messagesData.map((message) => (
                <div 
                  key={message.id}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.from === client.name 
                      ? 'bg-blush bg-opacity-20 ml-auto' 
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{message.from}</span>
                    <span>{message.date} {message.time}</span>
                  </div>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="input flex-grow"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn-primary">Send</button>
              </form>
            </div>
          </div>
        );
      
      case 'files':
        return (
          <div className="card">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-xl font-medium mb-2">Upload Files</h3>
              <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
              <button className="btn-primary">Upload Files</button>
            </div>
          </div>
        );
      
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-lora font-bold text-gray-800">Client Portal</h1>
        <p className="text-gray-600">Welcome back, {client.name}</p>
      </header>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-lora font-semibold mb-2">{client.project.name}</h2>
          <p className="text-gray-600 mb-4">{client.project.description}</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <span className="text-sm text-gray-500">Status</span>
              <p className="font-medium">{client.project.status.replace('_', ' ')}</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <span className="text-sm text-gray-500">Designer</span>
              <p className="font-medium">{client.project.designer}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            {['boards', 'contracts', 'questionnaires', 'invoices', 'messages', 'files'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? 'border-blush text-blush'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
