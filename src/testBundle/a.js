import _ from 'lodash';
import users from './users';

const adam = _.find(users, { firstName: 'Adam' });

console.log('adam', adam)