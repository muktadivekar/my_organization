export interface Employee {
  id: number;
  parentId: number | null;
  name: string;
  designation: string;
  email: string;
  phone: string;
  managerName?: string;
}

export enum Designation {
  ENGINEERING_MANAGER = 'Engineering Manager',
  ENGINEERING_LEAD = 'Engineering Lead',
  DIRECTOR = 'Director',
  VP = 'VP',
  PROJECT_MANAGER = 'Project Manager',
  SOFTWARE_ENGINEER = 'Software Engineer',
}
/*
const array = [
  {
    id: 1,
    parentId: 5,
    name: 'Sarah Lee',
    designation: 'Engineering Manager',
    email: 'sarah.lee@company.com',
    phone: '1234567890',
  },
  {
    id: 2,
    parentId: 5,
    name: 'James Doe',
    designation: 'Engineering Lead',
    email: 'james.doe@company.com',
    phone: '1234561110',
  },
  {
    id: 3,
    parentId: 1,
    name: 'John Davis',
    designation: 'Software Engineer',
    email: 'john.davis@company.com',
    phone: '12345671110',
  },
  {
    id: 4,
    parentId: 1,
    name: 'Karen Brown',
    designation: 'Software Engineer',
    email: 'karen.brown@company.com',
    phone: '1234561110',
  },
  {
    id: 5,
    parentId: 6,
    name: 'Brook Lee',
    designation: 'Director',
    email: 'brook.lee@company.com',
    phone: '1234562340',
  },
  {
    id: 6,
    parentId: null,
    name: 'Jason Carter',
    designation: 'VP',
    email: 'jason.carter@company.com',
    phone: '1234562340',
  },
];
*/
