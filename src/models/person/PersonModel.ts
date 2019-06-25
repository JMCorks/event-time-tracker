import { DbModel } from '../db/DbModel';

export class PersonModel extends DbModel {
    public name: string;
    public birth: string;
    public idCard: string;
    public email: string;
    public gender: string;

    constructor(name = "", birth = "", idCard = "", email = "", gender = "male", _id?: string) {
        super(_id);
        this.name = name;
        this.birth = birth;
        this.idCard = idCard;
        this.email = email;
        this.gender = gender;
    }
}