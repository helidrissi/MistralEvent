import { Location } from './location'
import { Group } from './group'
import { User } from './user'

export interface Evenement {
    id?: number,
    name: string,
    date: Date,
    description: string,
    type: string,
/*     user: User, */
    location?: Location,
    groups?: Group[]
}
