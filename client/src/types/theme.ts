import { Theme } from '@material-ui/core/styles';

export type TextAlign = 'center' | 'left' | 'right';

export type NamedTheme = Theme & {
  name: string;
}

export enum ScreenSize {
  XL = 'xl',
  LG = 'lg',
  MD = 'md',
  SM = 'sm',
  XS = 'xs'
}
