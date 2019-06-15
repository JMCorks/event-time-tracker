import NeDB from "nedb";

interface Dictionary<T> {
    [key: string]: T;
}

export class PersistenceService {
    private static db: Dictionary<NeDB>;
    protected static dbPath: string;

    public static initDB() {
        return new Promise((resolve, error) => {
            this.db[this.dbPath] = new NeDB({
                filename: this.dbPath,
                timestampData: true
            });

            this.db[this.dbPath].loadDatabase((err: Error) => {
                if (err) {
                    error(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    protected static insertDoc<T>(doc: T): Promise<T> {
        debugger;
        return new Promise((resolve, error) => {
            this.db[this.dbPath].insert(doc, (err: Error, newDocument: T) => {
                if (err) {
                    error(err);
                } else {
                    resolve(newDocument);
                }
            });
        });
    }

    protected static findDoc<T>(where?: T): Promise<Array<T>> {
        debugger;
        return new Promise((resolve, error) => {
            this.db[this.dbPath].find(where, (err: Error, documents: T[]) => {
                if (err) {
                    error(err);
                } else {
                    resolve(documents);
                }
            });
        });
    }
}