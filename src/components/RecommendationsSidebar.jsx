// src/components/RecommendationsSidebar.jsx
import { Link } from 'react-router-dom';

const RecommendationsSidebar = () => {
  // Mock data - in a real app, we'd fetch this from the CEE API
  const topArticles = [
    {
      _id: '7',
      title: 'How to Build a Highly Effective Development Team',
      author: { _id: 'author7', name: 'David Walker' }
    },
    {
      _id: '8',
      title: 'The Complete Guide to Web3 Development',
      author: { _id: 'author8', name: 'Sarah Brown' }
    },
    {
      _id: '9',
      title: 'Future-Proofing Your Tech Career: Skills to Learn in 2025',
      author: { _id: 'author9', name: 'James Wilson' }
    }
  ];

  return (
    <div className="bg-medium-gray p-4 rounded-lg">
      <h2 className="font-bold text-lg mb-4">Recommended for you</h2>
      <div className="space-y-4">
        {topArticles.map((article) => (
          <div key={article._id} className="space-y-1">
            <Link 
              to={`/article/${article._id}`}
              className="font-medium hover:underline block"
              aria-label={`Read article: ${article.title}`}
            >
              {article.title}
            </Link>
            <p className="text-sm text-gray-600">
              <Link 
                to={`/profile/${article.author._id}`}
                className="hover:underline"
              >
                {article.author.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-300">
        <Link 
          to="/recommendations"
          className="text-medium-green hover:underline text-sm font-medium"
        >
          See all recommendations
        </Link>
      </div>
    </div>
  );
};

export default RecommendationsSidebar;
