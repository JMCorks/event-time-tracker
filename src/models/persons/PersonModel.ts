import { DbModel } from '../db/DbModel';

export class PersonModel extends DbModel {
    public name: string;
    public dateOfBirth: number;
    public idCard: string;
    public email?: string;
}