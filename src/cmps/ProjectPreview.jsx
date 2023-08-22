import { useNavigate } from 'react-router'

export function ProjectPreview({ project }) {
    const navigate = useNavigate()

    return (
        <article
            className="project-preview"
            onClick={() => navigate(`/details/${project._id}`)}
        >
            <img src={project.imgUrls[0]} alt="project" />
        </article>
    )
}
