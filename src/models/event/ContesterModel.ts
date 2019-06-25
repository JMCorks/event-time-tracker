export class ContesterModel {
    public _id: string;
    public identifier: string;

    constructor(identifier: string = "", _id?: string) {
        this.identifier = identifier;
        if (_id) {
            this._id = _id;
        }
    }
}