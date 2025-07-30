import React from 'react';

const Loader: React.FC = () => (
  <div className="flex items-center justify-center py-6">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky"></div>
  </div>
);

export default Loader; 