// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export const getFakeData = (numOfItems) => {
  const list = [];

  for (let i = 0; i < numOfItems; i += 1) {
    list.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthYear: faker.date.past(),
      birthCity: faker.address.city(),
      salary: faker.finance.amount(),
    });
  }

  return list;
};

/**
 * COLUMN DEFINITION TO BE PASSED TO THE TABLE
 */
export const columnsDef = [
  { title: 'Name', field: 'firstName' },
  { title: 'Surname', field: 'lastName' },
  {
    title: 'Birth Year',
    field: 'birthYear',
    type: 'date',
    customSort: (a, b) => {
      if ((a.birthYear).getTime() < (b.birthYear).getTime()) {
        return -1;
      }
      if ((a.birthYear).getTime() > (b.birthYear).getTime()) {
        return 1;
      }
      return 0;
    },
  },
  { title: 'Birth Place', field: 'birthCity' },
  { title: 'Salary', field: 'salary' },
];

export const getId = (salt) => {
  const idKey = uuidv4();
  return salt ? `${salt}-${idKey}` : idKey;
};

export const getFormattedDate = (dateInput) => {
  const mm = dateInput.getMonth() + 1; // getMonth() is zero-based
  const dd = dateInput.getDate();
  const yyyy = dateInput.getFullYear();

  // default MM/DD/YYYY
  return [
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
    yyyy,
  ].join('/');
};
