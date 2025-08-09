import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  strId: string;
  name: string;
  description?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
