import {emitter} from '../plugins/emitter'
import sdk from './sdk'

export default {
  install: (app) => {
    app.provide('sdk', sdk)
    app.provide('emitter', emitter)
  },
}
