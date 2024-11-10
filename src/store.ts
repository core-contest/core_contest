import { atom } from 'jotai';

export const userPointsAtom = atom<{ x: number; y: number }[]>([]);
export const accuracyAtom = atom<number | null>(null);
export const messageAtom = atom<string | null>(null);
export const timeLeftAtom = atom<number | null>(3);
export const userDataAtom = atom<any>(null);
