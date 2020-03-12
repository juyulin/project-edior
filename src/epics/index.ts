import { combineEpics, } from 'redux-observable';
import componentTypes from './componentTypes';
import project from './project'
import { createProjectFileEpic } from './projectFile'


export const rootEpic = combineEpics(componentTypes, project, createProjectFileEpic);