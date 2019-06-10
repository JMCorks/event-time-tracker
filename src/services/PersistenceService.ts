import NeDB from "nedb";

export class PersistenceService<T> {
    private static db: NeDB;

    public static initDB(dbPath: string) {
        return new Promise((resolve, error) => {
            this.db = new NeDB({
                filename: dbPath,
                timestampData: true
            });

            this.db.loadDatabase((err: Error) => {
                if (err) {
                    error(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public static insertDoc<T>(doc: T): Promise<T> {
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

    public static findDoc<T>(where?: T): Promise<Array<T>> {
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