import { EventModel } from '@/models/event/EventModel';
import { DbHandler } from './DbHandler';

export class EventsService extends DbHandler {
    public insertEvent(doc: EventModel): Promise<EventModel> {
        return super.insertDoc<EventModel>(doc);
    }

    public findEvents<EventModel>(where?: EventModel): Promise<Array<EventModel>> {
        return super.findDoc<EventModel>(where);
    }
}