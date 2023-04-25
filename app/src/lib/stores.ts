import { writable, type Writable } from 'svelte/store';
import type { IdentifiedPlayer } from '@poker-quiz/lib';
import type { Socket } from 'socket.io-client';

export const players: Writable<IdentifiedPlayer[]> = writable([]);
export const socket: Writable<Socket | null> = writable(null);
