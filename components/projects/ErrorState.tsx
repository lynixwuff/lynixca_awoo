interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-600/20 rounded-full flex items-center justify-center">
          <i className="fas fa-exclamation-triangle text-red-400 text-2xl"></i>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-4">
          Connection Error
        </h3>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          {error || "Failed to load projects data. Please check your connection and try again."}
        </p>
        
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <i className="fas fa-redo-alt"></i>
          Try Again
        </button>
      </div>
    </div>
  );
}
