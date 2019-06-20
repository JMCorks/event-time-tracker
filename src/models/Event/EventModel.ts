import { DbModel } from '../db/DbModel';

export class EventModel extends DbModel {
    public title: string;
    public date: string;
    public details: string;
    public organizerEmail: string;
    public contesters: number[];

    constructor(title: string = "", date: string = "", details: string = "", organizerEmail: string = "", contesters: number[] = [], _id?: number) {
        super(_id);
        this.title = title;
        this.date = date;
        this.details = details;
        this.organizerEmail = organizerEmail;
        this.contesters = contesters;
    }
}