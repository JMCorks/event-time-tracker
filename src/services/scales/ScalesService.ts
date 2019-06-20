import { ScaleModel } from '@/models/scale/ScaleModel';
import { GenderEnum } from './GenderEnum';

export class ScalesService {
    private static scales: ScaleModel[] = [{
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
    }];;

    public static getPersonAge(birth: string) {
        let currentYear: number = new Date().getFullYear();
        let birthYear: number = new Date(birth).getFullYear();
        return currentYear - birthYear;
    }

    public static getPersonScale(age: number, gender: string) {
        const scale = this.scales.find(
            s => s.fromAge <= age && age <= s.toAge && s.gender === gender
        );
        return scale!.name;
    }

    public static getScales(): ScaleModel[] {
        return this.scales;
    }
}