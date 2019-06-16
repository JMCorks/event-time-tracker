import { DbHandler } from './DbHandler';
import { PersonModel } from '@/models/person/PersonModel';

export class PersonsService extends DbHandler<PersonModel> {
    public findPersons(where?: PersonModel): Promise<Array<PersonModel>> {
        return super.findDocs(where);
    }

    public insertPerson(newEvent: PersonModel): Promise<PersonModel> {
        return super.insertDoc(newEvent);
    }

    public updatePerson(event: PersonModel): Promise<PersonModel> {
        return super.updateDoc(event);
    }
}