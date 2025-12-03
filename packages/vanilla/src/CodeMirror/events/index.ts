import mitt from 'mitt'
import type { Emitter, EmitterEvents } from '../types'

export const emitter: Emitter<EmitterEvents> = mitt()
