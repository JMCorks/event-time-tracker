import NeDB from "nedb";
import { EventsService } from './EventsService';

interface Dictionary<T> {
    [key: string]: T;
}

export class PersistenceService {
    private static db: Dictionary<NeDB> = {};
    public static eventService: EventsService;

    public static initDB(dbPath: string) {
        return new Promise((resolve, error) => {
            this.db[dbPath] = new NeDB({
                filename: dbPath,
                timestampData: true
            });

            switch (dbPath) {
                case 'events.db':
                    this.eventService = new EventsService(this.db[dbPath]);
                    break;
                default:
                    throw "Db handler not implemented";
            }

            this.db[dbPath].loadDatabase((err: Error) => {
                if (err) {
                    error(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}