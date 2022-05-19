import {ORM} from 'redux-orm';
import Job from './Job';

const orm = new ORM({
  stateSelector: (state: any) => state.orm,
});

orm.register(Job);

export default orm;
