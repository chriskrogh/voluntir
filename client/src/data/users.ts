import { User } from "types/user";

export default [
  {
    _id: '0',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Chris Krogh',
    email: 'a@b.com',
    picture: '/assets/default-user.png'
  },
  {
    _id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Jane Doe',
    email: 'a@b.com',
    picture: '/assets/default-user.png'
  },
  {
    _id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'John Smith',
    email: 'a@b.com',
    picture: '/assets/default-user.png'
  }
] as User[];