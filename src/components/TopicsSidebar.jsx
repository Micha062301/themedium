import { Link } from 'react-router-dom';

const TopicsSidebar = () => {
  // Mock data - in a real app, these would be fetched from an API
  const topics = [
    { id: 'programming', name: 'Programming', count: 1240 },
    { id: 'data-science', name: 'Data Science', count: 856 },
    { id: 'technology', name: 'Technology', count: 1432 },
    { id: 'machine-learning', name: 'Machine Learning', count: 723 },
    { id: 'productivity', name: 'Productivity', count: 532 }
  ];

  const recommendedAuthors = [
    { id: 'author10', name: 'Olivia Johnson', description: 'AI Researcher' },
    { id: 'author11', name: 'Nathan Chen', description: 'Software Architect' },
    { id: 'author12', name: 'Maria Garcia', description: 'Tech Writer' }
  ];

  return (
    <div className="space-y-6">
      {/* Topics section */}
      <div>
        <h2 className="font-bold text-lg mb-3">Discover topics</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/tag/${topic.id}`}
              className="text-sm bg-medium-gray px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label={`Explore ${topic.name} topic with ${topic.count} articles`}
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended authors */}
      <div>
        <h2 className="font-bold text-lg mb-3">Who to follow</h2>
        <div className="space-y-4">
          {recommendedAuthors.map((author) => (
            <div key={author.id} className="flex items-center space-x-3">
              <img
                src={`/api/placeholder/40/40`}
                alt={author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <Link 
                  to={`/profile/${author.id}`}
                  className="font-medium hover:underline block"
                >
                  {author.name}
                </Link>
                <span className="text-sm text-gray-600">{author.description}</span>
              </div>
              <button className="ml-auto text-medium-green text-sm font-medium hover:text-opacity-80 transition-colors duration-200">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="text-sm text-gray-500">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
          <Link to="/help" className="hover:text-gray-700">Help</Link>
          <span>·</span>
          <Link to="/status" className="hover:text-gray-700">Status</Link>
          <span>·</span>
          <Link to="/writers" className="hover:text-gray-700">Writers</Link>
          <span>·</span>
          <Link to="/blog" className="hover:text-gray-700">Blog</Link>
          <span>·</span>
          <Link to="/careers" className="hover:text-gray-700">Careers</Link>
          <span>·</span>
          <Link to="/privacy" className="hover:text-gray-700">Privacy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-gray-700">Terms</Link>
          <span>·</span>
          <Link to="/about" className="hover:text-gray-700">About</Link>
        </div>
        <p>© 2025 Medium-CEE</p>
      </div>
    </div>
  );
};

export default TopicsSidebar;
