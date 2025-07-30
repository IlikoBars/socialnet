'use client';

interface Post {
  id: string;
  type: 'text' | 'image' | 'audio' | 'video';
  content: string;
  author: {
    nickname: string;
    avatar: string;
  };
}

interface Props {
  post: Post;
  onClose: () => void;
}

export default function OpenPostModal({ post, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-gray-900 text-white rounded-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>

        <div className="flex items-center mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.nickname}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="font-semibold">{post.author.nickname}</span>
        </div>

        {post.type === 'text' && (
          <p className="text-gray-300 whitespace-pre-wrap">{post.content}</p>
        )}

        {post.type === 'image' && (
          <img src={post.content} alt="пост" className="w-full rounded" />
        )}

        {post.type === 'audio' && (
          <audio controls className="w-full mt-2">
            <source src={post.content} type="audio/mpeg" />
            Ваш браузер не поддерживает аудио.
          </audio>
        )}

        {post.type === 'video' && (
          <video controls className="w-full mt-2 rounded">
            <source src={post.content} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        )}
      </div>
    </div>
  );
}
