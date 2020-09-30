import activity from './activity.model';
import { Education } from './education';
import { Language } from './language';

export default class User {
  id?: number;
  email: string;
  name: string;
  password: string;
  isAdmin: false;
  activitiesEnrolled: activity[];
  surname: string;
  dob: string;
  telephone: number;
  natianality: string;
  NIF: number;
  description: string;
  education: Education[];
  languages: Language[];
}
