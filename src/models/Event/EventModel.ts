export class EventModel {
    public title: string;
    public date: string;
    public details: string;
    public organizerEmail: string;

    constructor(title: string, date: string, organizerEmail: string, details: string) {
        this.title = title;
        this.date = date;
        this.details = details;
        this.organizerEmail = organizerEmail;
    }
}