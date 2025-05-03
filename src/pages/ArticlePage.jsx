import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import CEESidebar from '../components/CEESidebar';
import CommentSection from '../components/CommentSection';
import { formatDistanceToNow } from 'date-fns';

const ArticlePage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCEE, setShowCEE] = useState(false);
  const [clapCount, setClapCount] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // In a real app, fetch from API
        // const response = await axios.get(`/api/articles/${id}`);
        // setArticle(response.data);
        
        // Mock data
        const mockArticle = {
          _id: id,
          title: 'Building AI-Powered Apps: A Developer\'s Guide',
          content: `
            <h2>Introduction</h2>
            <p>The world of AI is rapidly evolving, and developers now have access to powerful tools and APIs that make implementing AI features easier than ever before. In this guide, we'll explore how to leverage AI to create personalized user experiences and boost engagement.</p>
            
            <h2>Understanding the AI Landscape</h2>
            <p>Before diving into implementation, it's important to understand the different types of AI technologies available:</p>
            <ul>
              <li><strong>Natural Language Processing (NLP):</strong> For understanding and generating human language</li>
              <li><strong>Computer Vision:</strong> For image and video analysis</li>
              <li><strong>Recommendation Systems:</strong> For personalized content curation</li>
              <li><strong>Predictive Analytics:</strong> For forecasting user behavior and trends</li>
            </ul>
            
            <h2>Getting Started with AI APIs</h2>
            <p>The easiest way to add AI capabilities to your application is through pre-built APIs. Services like OpenAI, Hugging Face, and Google Cloud AI provide accessible interfaces to powerful models.</p>
            
            <h2>Building Personalized Recommendations</h2>
            <p>Recommendation systems are a great way to boost engagement. By analyzing user behavior and preferences, you can curate content that resonates with each individual user.</p>
            
            <h2>Implementing Real-time AI Features</h2>
            <p>Real-time AI features, such as content generation and analysis, can significantly enhance user experience. Technologies like WebSocket combined with AI backends enable interactive experiences.</p>
            
            <h2>Ethical Considerations</h2>
            <p>When implementing AI, it's crucial to consider ethical implications. Ensure transparency, fairness, and user privacy in all AI features.</p>
            
            <h2>Conclusion</h2>
            <p>AI-powered features can transform ordinary applications into personalized, engaging experiences. By leveraging the right tools and approaches, developers can create applications that truly understand and adapt to their users.</p>
          `,
          author: {
            _id: 'author1',
            name: 'Alex Chen',
            profileImage: '/api/placeholder/40/40',
            bio: 'AI Developer & Technical Writer'
          },
          date: '2025-04-29T10:00:00Z',
          readTime: 5,
          claps: 142,
          tags: ['Programming', 'AI', 'Web Development']
        };
        
        setArticle(mockArticle);
        setClapCount(mockArticle.claps);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();

    // Listen for real-time updates (claps, comments)
    if (socket) {
      socket.on('article-update', (updatedArticle) => {
        if (updatedArticle._id === id) {
          setArticle(updatedArticle);
          setClapCount(updatedArticle.claps);
        }
      });

      return () => {
        socket.off('article-update');
      };
    }
  }, [id, socket]);

  const handleClap = () => {
    if (hasClapped) return;
    
    setClapCount(prevCount => prevCount + 1);
    setHasClapped(true);
    
    // In a real app, send to API
    // axios.post(`/api/articles/${id}/clap`);
    
    // Emit real-time update
    if (socket) {
      socket.emit('clap-article', { articleId: id, userId: user?._id });
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    
    if (text && text.length > 10) {
      setSelectedText(text);
      setShowCEE(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medium-green"></div>
      </div>
    );
  }

  if (!article) {
    return <div className="max-w-2xl mx-auto px-4 py-8">Article not found</div>;
  }

  const formattedDate = formatDistanceToNow(new Date(article.date), { addSuffix: true });

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto px-4 py-8" onMouseUp={handleTextSelection}>
        {/* Article header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4" aria-label={`Article title: ${article.title}`}>
          {article.title}
        </h1>
        
        {/* Author info */}
        <div className="flex items-center mb-6">
          <Link to={`/profile/${article.author._id}`} className="flex items-center group">
            <img
              src={article.author.profileImage}
              alt={article.author.name}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="font-medium group-hover:underline">{article.author.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{formattedDate}</span>
                <span className="mx-1">·</span>
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Article content */}
        <div 
          className="prose max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
          aria-label="Article content"
        />
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag
