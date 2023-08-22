import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { projectService } from '../services/project.service.local'

export function ProjectDetails() {
    const { projectId } = useParams()
    const [project, setProject] = useState(null)

    useEffect(() => {
        if (projectId) loadProject(projectId)
    }, [])

    async function loadProject(projectId) {
        try {
            const project = await projectService.getById(projectId)
            setProject(project)
        } catch (err) {
            console.log('Cannot load project')
        }
    }

    if (!project) return
    return (
        <section className="project-details-container">
            <div className="project-details-inner-container flex column">
                {project.imgUrls.map((imgUrl, idx) => {
                    {
                        if (imgUrl.includes('mp4'))
                            return (
                                <iframe
                                    key={idx}
                                    title={`iframe-${idx}`}
                                    src="https://res.cloudinary.com/dpbcaizq9/video/upload/v1692721243/%D7%94%D7%A7%D7%9C%D7%98%D7%94_2023-08-22_192001_ffozlw.mp4"
                                ></iframe>
                            )
                    }
                    return (
                        <img
                            key={idx}
                            src={imgUrl}
                            alt={`${project.name}-img`}
                        />
                    )
                })}
            </div>
        </section>
    )
}
