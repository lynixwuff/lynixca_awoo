interface Project {
  id: string;
  strId: string;
  name: string;
  description?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleProjectClick = () => {
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:bg-gray-800/70 hover:border-gray-600/50 hover:shadow-xl hover:shadow-cyan-500/10 ${
        project.url ? 'cursor-pointer' : ''
      }`}
      onClick={project.url ? handleProjectClick : undefined}
    >
      {/* Project Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <i className="fas fa-calendar-alt"></i>
              <span>Created {formatDate(project.createdAt)}</span>
            </div>
          </div>
          
          {project.url && (
            <div className="ml-4 flex-shrink-0">
              <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-external-link-alt text-cyan-400"></i>
              </div>
            </div>
          )}
        </div>

        {/* Project Description */}
        {project.description && (
          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
        )}

        {/* Project Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Active Project</span>
          </div>
          
          <div className="text-xs text-gray-500">
            ID: {project.strId}
          </div>
        </div>

        {/* Hover Effect for External Links */}
        {project.url && (
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-cyan-400 text-sm">
              <i className="fas fa-mouse-pointer"></i>
              <span>Click to view project</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
