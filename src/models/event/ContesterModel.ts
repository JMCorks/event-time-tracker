export class ContesterModel {
    public _id: number;
    public identifier: string;

    constructor(identifier: string = "", _id?: number) {
        this.identifier = identifier;
        if (_id) {
            this._id = _id;
        }
    }
}