import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { projectService } from '../services/project.service.local.js'
import {
    ADD_PROJECT,
    REMOVE_PROJECT,
    SET_PROJECTS,
    UPDATE_PROJECT,
} from './project.reducer.js'

// Action Creators:
export function getActionRemoveProject(projectId) {
    return {
        type: REMOVE_PROJECT,
        entityId: projectId,
    }
}
export function getActionAddProject(project) {
    return {
        type: ADD_PROJECT,
        entity: project,
    }
}
export function getActionUpdateProject(project) {
    return {
        type: UPDATE_PROJECT,
        entity: project,
    }
}

export async function loadProjects(filterBy) {
    try {
        const projects = await projectService.query(filterBy)
        store.dispatch({
            type: SET_PROJECTS,
            projects: projects,
        })
    } catch (err) {
        console.log('Cannot load projects', err)
        throw err
    }
}

export async function removeProject(projectId) {
    try {
        await projectService.remove(projectId)
        store.dispatch(getActionRemoveProject(projectId))
    } catch (err) {
        console.log('Cannot remove project', err)
        throw err
    }
}

export async function addProject(project) {
    try {
        const savedProject = await projectService.save(project)
        console.log('Added Project', savedProject)
        store.dispatch(getActionAddProject(savedProject))
        return savedProject
    } catch (err) {
        console.log('Cannot add project', err)
        throw err
    }
}

export function updateProject(project) {
    return projectService
        .save(project)
        .then((savedProject) => {
            console.log('Updated Project:', savedProject)
            store.dispatch(getActionUpdateProject(savedProject))
            return savedProject
        })
        .catch((err) => {
            console.log('Cannot save project', err)
            throw err
        })
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveEntityOptimistic(entityId) {
    store.dispatch({
        type: REMOVE_ENTITY,
        entityId,
    })
    showSuccessMsg('Entity removed')

    entityService
        .remove(entityId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully')
        })
        .catch((err) => {
            showErrorMsg('Cannot remove entity')
            console.log('Cannot load entitys', err)
        })
}
