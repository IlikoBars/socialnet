'use client';

export function VibeModal({ open, posts, onClose }: {
  open: boolean;
  posts: any[];
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#2a2a2a] rounded-lg p-6 max-w-md w-full">
        <button 
          onClick={onClose}
          className="float-right text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Посты района</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="border-b border-gray-700 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.nickname}
                  className="w-8 h-8 rounded-full"
                />
                <span>{post.author.nickname}</span>
              </div>
              <p className="text-gray-300">{post.preview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
