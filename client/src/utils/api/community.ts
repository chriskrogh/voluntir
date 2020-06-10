import communities from 'data/communities';

export const getCommunityLogo = (id: string) => {
  return communities[parseInt(id)].logo;
}
