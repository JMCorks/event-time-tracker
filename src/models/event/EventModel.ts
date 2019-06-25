import { DbModel } from '../db/DbModel';
import { ContesterModel } from './ContesterModel';

export class EventModel extends DbModel {
    public title: string;
    public date: string;
    public details: string;
    public organizerEmail: string;
    public contesters: ContesterModel[];

    constructor(title: string = "", date: string = "", details: string = "", organizerEmail: string = "", contesters: ContesterModel[] = [], _id?: string) {
        super(_id);
        this.title = title;
        this.date = date;
        this.details = details;
        this.organizerEmail = organizerEmail;
        this.contesters = contesters;
    }
}