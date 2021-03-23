import { Location } from './location'

export interface Evenement {
    id?: number,
    name: string,
    date: Date,
    description: string,
    type: string,
    location?: Location
}
