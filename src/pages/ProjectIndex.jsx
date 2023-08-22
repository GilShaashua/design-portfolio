import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadProjects } from '../store/project.actions'
import { ProjectList } from '../cmps/ProjectList'

export function ProjectIndex() {
    const projects = useSelector(
        (storeState) => storeState.projectModule.projects
    )

    useEffect(() => {
        loadProjects()
    }, [])

    return (
        <section className="project-container">
            <ProjectList projects={projects} />
        </section>
    )
}
