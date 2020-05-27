import { User } from 'types/user';
import { StaticAssets } from 'utils/constants';

export default [
  {
    _id: '0',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Chris Krogh',
    email: 'a@b.com',
    picture: StaticAssets.USER,
    banner: StaticAssets.BANNER
  },
  {
    _id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Jane Doe',
    email: 'a@b.com',
    picture: StaticAssets.USER,
    banner: StaticAssets.BANNER
  },
  {
    _id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'John Smith',
    email: 'a@b.com',
    picture: StaticAssets.USER,
    banner: StaticAssets.BANNER
  }
] as User[];