import NeDB from "nedb";

import { EventsService } from './EventsService';
import { PersonsService } from './PersonsService';

interface Dictionary<T> {
    [key: string]: T;
}

export class PersistenceService {
    private static db: Dictionary<NeDB> = {};
    public static eventService: EventsService;
    public static personsService: PersonsService;

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
                case 'persons.db':
                    this.personsService = new PersonsService(this.db[dbPath]);
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