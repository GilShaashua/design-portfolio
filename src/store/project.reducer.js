import { entityService } from '../services/entity.service'

export const SET_PROJECTS = 'SET_PROJECTS'
export const REMOVE_PROJECT = 'REMOVE_PROJECT'
export const ADD_PROJECT = 'ADD_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const FILTER_BY = 'FILTER_BY'

const initialState = {
    projects: [],
    filterBy: entityService.getDefaultFilter(),
}

export function projectReducer(state = initialState, action) {
    let newState = state
    let projects

    switch (action.type) {
        case SET_PROJECTS:
            newState = { ...state, projects: action.projects }
            break
        case REMOVE_PROJECT:
            const lastRemovedProject = state.projects.find(
                (project) => project._id === action.projectId
            )
            projects = state.projects.filter(
                (project) => project._id !== action.projectId
            )
            newState = {
                ...state,
                projects: projects,
                lastRemovedProject: lastRemovedProject,
            }
            break
        case ADD_PROJECT:
            newState = {
                ...state,
                projects: [...state.projects, action.project],
            }
            break
        case UPDATE_PROJECT:
            projects = state.projects.map((project) =>
                project._id === action.project._id ? action.project : project
            )
            newState = { ...state, projects: projects }
            break
        case FILTER_BY:
            newState = { ...state, filterBy: action.filterToEdit }
            break

        default:
            break
    }

    return newState
}
