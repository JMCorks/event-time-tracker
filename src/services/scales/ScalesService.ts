import { ScaleModel } from '@/models/scale/ScaleModel';
import { GenderEnum } from './GenderEnum';

export class ScalesService {
    public static getScales(): ScaleModel[] {
        return [{
            name: 'Cadetes',
            gender: GenderEnum.Male,
            fromAge: 0,
            toAge: 14
        }, {
            name: 'Juniores',
            gender: GenderEnum.Male,
            fromAge: 15,
            toAge: 18
        }, {
            name: 'Seniores',
            gender: GenderEnum.Male,
            fromAge: 19,
            toAge: 29
        }, {
            name: 'Veteranos A',
            gender: GenderEnum.Male,
            fromAge: 30,
            toAge: 39
        }, {
            name: 'Veteranos B',
            gender: GenderEnum.Male,
            fromAge: 40,
            toAge: 49
        }, {
            name: 'Veteranos C',
            gender: GenderEnum.Male,
            fromAge: 50,
            toAge: 59
        }, {
            name: 'Veteranos D',
            gender: GenderEnum.Male,
            fromAge: 60,
            toAge: 150
        }, {
            name: 'Feminino Sub 30',
            gender: GenderEnum.Female,
            fromAge: 0,
            toAge: 30
        }, {
            name: 'Feminino Masters',
            gender: GenderEnum.Female,
            fromAge: 31,
            toAge: 150
        }];
    }
}