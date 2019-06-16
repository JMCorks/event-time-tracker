import { DbModel } from '../db/DbModel';

export class PersonModel extends DbModel {
    public name: string;
    public birth: string;
    public idCard: string;
    public email?: string;
}