import {IEvent} from '../../helpers/IEvent'
export class UserAuthenticate implements IEvent{
    id: number;
    name: string
    description: string;
    role: string;
    company: string;
    token:string;
}