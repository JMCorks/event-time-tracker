import NeDB from "nedb";

export abstract class DbHandler {
    private db: NeDB;

    constructor(db: NeDB) {
        this.db = db;
    }

    protected insertDoc<T>(doc: T): Promise<T> {
        return new Promise((resolve, error) => {
            this.db.insert(doc, (err: Error, newDocument: T) => {
                if (err) {
                    error(err);
                } else {
                    resolve(newDocument);
                }
            });
        });
    }

    protected findDoc<T>(where?: T): Promise<Array<T>> {
        return new Promise((resolve, error) => {
            this.db.find(where, (err: Error, documents: T[]) => {
                if (err) {
                    error(err);
                } else {
                    resolve(documents);
                }
            });
        });
    }
}