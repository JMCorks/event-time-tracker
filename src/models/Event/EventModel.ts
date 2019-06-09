export class EventModel {
    private _title: string;
    private _date: string;
    private _details: string;

    constructor(title: string = "", date: string = "", details = "") {
        this._title = title;
        this._date = date;
        this._details = details;
    }

    get title(): string {
        return this._title;
    }
    set title(title: string) {
        this._title = title;
    }

    get date(): string {
        return this._date;
    }
    set date(date: string) {
        this._date = date;
    }

    get details(): string {
        return this._details;
    }
    set details(details: string) {
        this._details = details;
    }
}