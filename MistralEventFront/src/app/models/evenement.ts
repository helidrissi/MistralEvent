import { Location } from './location'
import { Group } from './group'

export interface Evenement {
    id?: number,
    name: string,
    date: Date,
    description: string,
    type: string,
    location?: Location,
    groups?: Group[]
}
