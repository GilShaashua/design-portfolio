import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import gProjects from '../data/project.json'

const STORAGE_KEY = 'projectDB'

export const projectService = {
    query,
    getById,
    save,
    remove,
}

window.cs = projectService
;(() => {
    let projects = utilService.loadFromStorage(STORAGE_KEY) || []
    if (!projects.length) {
        projects = gProjects
        utilService.saveToStorage(STORAGE_KEY, projects)
    }
})()

function query(filterBy) {
    return _filteredProjects(filterBy)
}

async function _filteredProjects(filterBy = {}) {
    let projects = await storageService.query(STORAGE_KEY)

    if (filterBy.location) {
        const regex = new RegExp(filterBy.location, 'i')
        projects = projects.filter(
            (project) =>
                regex.test(project.loc.country) || regex.test(project.loc.city)
        )
    }

    if (filterBy.adults || filterBy.children) {
        const capacity = filterBy.adults + filterBy.children
        projects = projects.filter((entity) => entity.capacity >= capacity)
    }

    if (filterBy.label) {
        projects = projects.filter((entity) =>
            entity.labels.some((label) => label === filterBy.label)
        )
    }

    return projects
}

async function getById(projectId) {
    // return _aggregate(entityId)
    return await storageService.get(STORAGE_KEY, projectId)
}

async function remove(projectId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, projectId)
}

async function save(project) {
    let savedProject

    if (project._id) {
        savedProject = await storageService.put(STORAGE_KEY, project)
    } else {
        savedProject = await storageService.post(STORAGE_KEY, project)
    }

    return savedProject
}
