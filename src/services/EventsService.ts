import { EventModel } from '@/models/event/EventModel';
import { DbHandler } from './DbHandler';

export class EventsService extends DbHandler<EventModel> {
    public findEvents(where?: EventModel): Promise<Array<EventModel>> {
        return super.findDocs(where);
    }

    public insertEvent(newEvent: EventModel): Promise<EventModel> {
        return super.insertDoc(newEvent);
    }

    public updateEvent(event: EventModel): Promise<EventModel> {
        return super.updateDoc(event);
    }
}