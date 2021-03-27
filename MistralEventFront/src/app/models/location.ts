import { Evenement } from "./evenement"
export interface Location {
    id?: number;
    name: string;
    adress: string;
    city: string;
    events?: Evenement[];
}
