const modes = ['dark', 'light'] as const;

export type Mode = typeof modes[number];

export default modes;
