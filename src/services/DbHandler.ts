import NeDB from "nedb";
import { DbModel } from '@/models/db/DbModel';

export abstract class DbHandler<T extends DbModel> {
    private db: NeDB;

    constructor(db: NeDB) {
        this.db = db;
    }

    protected findDocs(where?: T): Promise<Array<T>> {
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

    protected insertDoc(doc: T): Promise<T> {
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

    protected updateDoc(doc: T): Promise<T> {
        return new Promise((resolve, error) => {
            const docId = doc._id;
            delete doc._id;
            this.db.update({ _id: docId }, { $set: doc }, { returnUpdatedDocs: true }, (err: Error, numberOfUpdated: number, affectedDocuments: any, upsert: boolean) => {
                if (err) {
                    error(err);
                } else {
                    resolve(affectedDocuments);
                }
            });
        });
    }
}