import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export const getFakeData = (numOfItems) => {
    const list = [];

    for (let i = 0; i < numOfItems; i ++) {
        list.push({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            birthYear: faker.date.past(),
            birthCity: faker.address.city(),
            salary: faker.finance.amount()
        });
    }

    return list;
};

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
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd,
        yyyy
    ].join('/');
};