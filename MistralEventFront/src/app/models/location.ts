import { File } from './file';

export interface Location {
    id?: number;
    name: string;
    adress: string;
    city: string;
    images: File[];
}
