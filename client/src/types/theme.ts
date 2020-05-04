import { Theme } from "@material-ui/core/styles";

export type TextColor = 'primary' | 'secondary';

export type NamedTheme = Theme & {
    name: string;
}
