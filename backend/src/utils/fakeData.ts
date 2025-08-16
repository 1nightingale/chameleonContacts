
import { faker } from '@faker-js/faker';

export function generateFakeContact(real: any) {
  // Pick gender for faker
  let gender: 'male' | 'female' = 'male';
  if (real.gender === 'female') gender = 'female';
  else if (real.gender === 'male') gender = 'male';
  else gender = faker.helpers.arrayElement(['male', 'female']);

  const first_name = faker.person.firstName(gender);
  const last_name = faker.person.lastName(gender);
  const email = faker.internet.email({ firstName: first_name, lastName: last_name });

  return {
    first_name,
    last_name,
    organisation: faker.company.name(),
    telephone: faker.phone.number(),
    email,
    address_street: faker.location.streetAddress(),
    address_city: faker.location.city(),
    // address_region, address_country, age_group, gender are real
    address_region: real.address_region,
    address_country: real.address_country,
    age_group: real.age_group,
    gender: real.gender,
  };
}
