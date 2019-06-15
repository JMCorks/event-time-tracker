import { PersistenceService } from './PersistenceService';
import { EventModel } from '@/models/event/EventModel';

export class EventsService extends PersistenceService {
    dbPath = "events.db";

    public static insertEvent(doc: EventModel): Promise<EventModel> {
        return super.insertDoc<EventModel>(doc);
    }

    public static findEvents<EventModel>(where?: EventModel): Promise<Array<EventModel>> {
        return super.findDoc<EventModel>(where);
    }
}