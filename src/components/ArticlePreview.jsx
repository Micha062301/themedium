import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ArticlePreview = ({ article }) => {
  const {
    _id,
    title,
    excerpt,
    author,
    date,
    readTime,
    coverImage,
    tags,
    claps
  } = article;

  // Format the date
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <article className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-medium-border">
      <div className="md:col-span-2 space-y-2">
        {/* Author info */}
        <div className="flex items-center space-x-2">
          <Link to={`/profile/${author._id}`} aria-label={`Go to ${author.name}'s profile`}>
            <img
              src={author.profileImage || '/default-avatar.png'}
              alt={author.name}
              className="w-6 h-6 rounded-full"
            />
          </Link>
          <Link 
            to={`/profile/${author._id}`} 
            className="text-sm font-medium hover:underline"
            aria-label={`Go to ${author.name}'s profile`}
          >
            {author.name}
          </Link>
          <span className="text-sm text-gray-500">·</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold">
          <Link 
            to={`/article/${_id}`} 
            className="hover:underline"
            aria-label={`Read article: ${title}`}
          >
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-700 line-clamp-2">{excerpt}</p>

        {/* Bottom row: read time, tags, save, etc. */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{readTime} min read</span>
            {tags && tags.length > 0 && (
              <Link 
                to={`/tag/${tags[0].toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm bg-medium-gray px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                {tags[0]}
              </Link>
            )}
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 0C5.1 0 0 5.1 0 11.4c0 4.9 3.1 9.1 7.5 10.7v1.9h7.9v-1.9c4.4-1.6 7.5-5.8 7.5-10.7 0-6.3-5.1-11.4-11.5-11.4zm4.1 19.3c-.5 0-1-.4-1-1 0-.5.4-1 1-1 .5 0 1 .4 1 1s-.5 1-1 1zm1.5-4.7c-.2.2-.3.4-.3.7 0 .5-.4 1-1 1-.5 0-1-.4-1-1 0-.8.3-1.5.8-2 .6-.6 1-1.3 1-2.2 0-1.7-1.4-3.1-3.1-3.1-1.7 0-3.1 1.4-3.1 3.1 0 .5-.4 1-1 1-.5 0-1-.4-1-1 0-2.8 2.3-5 5-5 2.8 0 5 2.3 5 5.1.1 1.3-.5 2.5-1.3 3.4z" />
              </svg>
              <span>{claps}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button 
              className="p-1 rounded-full hover:bg-medium-gray transition-colors duration-200"
              aria-label="Save article"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button 
              className="p-1 rounded-full hover:bg-medium-gray transition-colors duration-200"
              aria-label="More options"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="md:col-span-1">
        <Link to={`/article/${_id}`} aria-label={`Read article: ${title}`}>
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-32 md:h-28 object-cover rounded"
          />
        </Link>
      </div>
    </article>
  );
};

export default ArticlePreview;
