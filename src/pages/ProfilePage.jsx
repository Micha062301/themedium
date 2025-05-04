import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
  const { id } = useParams();
  const { currentUser } = useUser();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios.get(`http://localhost:3001/api/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.log('Error fetching user:', err));

    // Fetch user's articles
    axios.get(`http://localhost:3001/api/articles?author=${id}`)
      .then(res => setArticles(res.data))
      .catch(err => console.log('Error fetching articles:', err));
  }, [id]);

  if (!user) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="py-6">
      <div className="max-w-2xl mx-auto text-center">
        <img
          src={user.profilePic || 'https://via.placeholder.com/100'}
          alt={user.username}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold font-charter">{user.username}</h1>
        <p className="text-gray-600 mt-2">{user.bio || 'No bio yet.'}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold max-w-2xl mx-auto mb-4">Articles</h2>
        {articles.length === 0 ? (
          <p className="text-gray-600 text-center">No articles yet.</p>
        ) : (
          articles.map(article => (
            <div key={article._id} className="article-card">
              <img src={article.image || 'https://via.placeholder.com/300'} alt={article.title} />
              <h2>{article.title}</h2>
              <p className="author">{user.username}</p>
              <p className="excerpt">{article.excerpt || article.content.slice(0, 100) + '...'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
