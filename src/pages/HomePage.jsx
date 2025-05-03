import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import ArticlePreview from '../components/ArticlePreview';
import RecommendationsSidebar from '../components/RecommendationsSidebar';
import TopicsSidebar from '../components/TopicsSidebar';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('for-you');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // In a real app, we'd fetch from the backend based on the filter
        // For now, we'll use mock data
        const response = await axios.get('/api/articles', {
          params: { filter, userId: user?._id }
        });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        
        // Fallback to mock data
        const mockArticles = [
          {
            _id: '1',
            title: 'Building AI-Powered Apps: A Developer\'s Guide',
            excerpt: 'Learn how to leverage AI to create personalized user experiences and boost engagement',
            readTime: 5,
            date: '2025-04-29T10:00:00Z',
            author: {
              _id: 'author1',
              name: 'Alex Chen',
              profileImage: '/placeholder-avatar.png'
            },
            coverImage: '/api/placeholder/800/400',
            tags: ['Programming', 'AI', 'Web Development'],
            claps: 142
          },
          {
            _id: '2',
            title: 'The Future of Remote Work: Trends to Watch in 2025',
            excerpt: 'Remote work is evolving rapidly. Here\'s what to expect in the coming year',
            readTime: 8,
            date: '2025-04-28T14:30:00Z',
            author: {
              _id: 'author2',
              name: 'Sophia Williams',
              profileImage: '/placeholder-avatar-2.png'
            },
            coverImage: '/api/placeholder/800/400',
            tags: ['Remote Work', 'Future of Work', 'Productivity'],
            claps: 287
          },
          {
            _id: '3',
            title: 'Mastering React in 2025: Best Practices and New Features',
            excerpt: 'React continues to evolve. Here\'s what you need to know to stay ahead of the curve',
            readTime: 12,
            date: '2025-04-27T09:15:00Z',
            author: {
              _id: 'author3',
              name: 'Michael Johnson',
              profileImage: '/placeholder-avatar-3.png'
            },
            coverImage: '/api/placeholder/800/400',
            tags: ['React', 'JavaScript', 'Frontend Development'],
            claps: 356
          },
          {
            _id: '4',
            title: 'How Machine Learning is Transforming Healthcare',
            excerpt: 'AI and ML technologies are revolutionizing patient care and medical research',
            readTime: 7,
            date: '2025-04-26T11:45:00Z',
            author: {
              _id: 'author4',
              name: 'Dr. Emily Martinez',
              profileImage: '/placeholder-avatar-4.png'
            },
            coverImage: '/api/placeholder/800/400',
            tags: ['Healthcare', 'Machine Learning', 'AI'],
            claps: 198
          },
          {
            _id: '5',
            title: 'Sustainable Tech: Building Eco-Friendly Digital Products',
            excerpt: 'How developers and designers can minimize environmental impact in tech',
            readTime: 9,
            date: '2025-04-25T16:20:00Z',
            author: {
              _id: 'author5',
              name: 'Ryan Park',
              profileImage: '/placeholder-avatar-5.png'
            },
            coverImage: '/api/placeholder/800/400',
            tags: ['Sustainability', 'Green Tech', 'Product Development'],
            claps: 231
          }
        ];
        
        setArticles(mockArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filter, user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main content */}
        <div className="lg:col-span-8">
          {/* Filters */}
          <div className="border-b border-medium-border mb-8">
            <div className="flex overflow-x-auto space-x-6 pb-2">
              <button
                onClick={() => setFilter('for-you')}
                className={`pb-2 ${
                  filter === 'for-you' 
                    ? 'border-b-2 border-medium-black font-bold' 
                    : 'text-gray-500'
                } transition-colors duration-200`}
                aria-pressed={filter === 'for-you'}
              >
                For you
              </button>
              <button
                onClick={() => setFilter('following')}
                className={`pb-2 ${
                  filter === 'following' 
                    ? 'border-b-2 border-medium-black font-bold' 
                    : 'text-gray-500'
                } transition-colors duration-200`}
                aria-pressed={filter === 'following'}
              >
                Following
              </button>
              <button
                onClick={() => setFilter('trending')}
                className={`pb-2 ${
                  filter === 'trending' 
                    ? 'border-b-2 border-medium-black font-bold' 
                    : 'text-gray-500'
                } transition-colors duration-200`}
                aria-pressed={filter === 'trending'}
              >
                Trending
              </button>
              <button
                onClick={() => setFilter('technology')}
                className={`pb-2 ${
                  filter === 'technology' 
                    ? 'border-b-2 border-medium-black font-bold' 
                    : 'text-gray-500'
                } transition-colors duration-200`}
                aria-pressed={filter === 'technology'}
              >
                Technology
              </button>
              <button
                onClick={() => setFilter('design')}
                className={`pb-2 ${
                  filter === 'design' 
                    ? 'border-b-2 border-medium-black font-bold' 
                    : 'text-gray-500'
                } transition-colors duration-200`}
                aria-pressed={filter === 'design'}
              >
                Design
              </button>
              <button
                onClick={() => setFilter('data-science')}
                className={`pb-2 ${
                  filter === 'data-science' 
                    ? 'border-b-2 border-medium-black font-bold' 
                    : 'text-gray-500'
                } transition-colors duration-200`}
                aria-pressed={filter === 'data-science'}
              >
                Data Science
              </button>
            </div>
          </div>

          {/* Articles */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medium-green"></div>
            </div>
          ) : (
            <div className="space-y-10">
              {articles.map((article) => (
                <ArticlePreview key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            <RecommendationsSidebar />
            <TopicsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
