import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const PublicationPage = () => {
  const { id } = useParams();
  const { currentUser } = useUser();
  const [pub, setPub] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/publications/${id}`)
      .then(res => setPub(res.data))
      .catch(err => console.log('pub fetch error:', err));

    axios.get(`http://localhost:3001/api/articles?publication=${id}`)
      .then(res => setArticles(res.data))
      .catch(err => console.log('articles fetch error:', err));
  }, [id]);

  if (!pub) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="py-5">
      <div className="max-w-2xl mx-auto text-center">
        {pub.bannerImage && (
          <img src={pub.bannerImage} alt={pub.name} className="w-full h-40 object-cover mb-3" />
        )}
        <h1 className="text-xl font-bold font-charter">{pub.name}</h1>
        <p className="text-gray-600 mt-1">{pub.description || 'No description.'}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-base font-bold max-w-2xl mx-auto mb-3">Articles</h2>
        {articles.length === 0 ? (
          <p className="text-gray-600 text-center">No articles yet.</p>
        ) : (
          articles.map(article => (
            <div key={article._id} className="article-card">
              <img src={article.image || 'https://via.placeholder.com/300'} alt={article.title} />
              <h2>{article.title}</h2>
              <p className="author">{article.author.username}</p>
              <p className="excerpt">{article.excerpt || article.content.slice(0, 80) + '...'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PublicationPage;
