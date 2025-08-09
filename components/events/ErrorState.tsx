interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-red-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-exclamation-triangle text-red-400 text-2xl"></i>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Connection Error</h3>
        <p className="text-gray-400 mb-6">
          {error}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <i className="fas fa-redo"></i>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
