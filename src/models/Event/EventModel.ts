import { DbModel } from '../db/DbModel';

export class EventModel extends DbModel {
    public title: string = "";
    public date: string = "";
    public details: string = "";
    public organizerEmail: string = "";
}