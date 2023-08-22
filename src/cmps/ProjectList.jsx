import { ProjectPreview } from './ProjectPreview'

export function ProjectList({ projects }) {
    return (
        <div className="project-list card-grid">
            {projects.map((project) => (
                <ProjectPreview key={project._id} project={project} />
            ))}
        </div>
    )
}
