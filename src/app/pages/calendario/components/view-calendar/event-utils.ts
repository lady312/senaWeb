import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
/*
  {
    id: createEventId(),
    title: 'hijueputa vidaaaaaaaaaaaaaaa',
    start: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    title: 'evento teatro',
    start: new Date(2023, 3, 28, 0, 0),
    end: new Date(2023, 3, 28, 23, 59)
  },
  {
    id: createEventId(),
    title: 'Prueba',
    date: new Date(2023, 3, 2, 13, 0),
    end: new Date(2023, 3, 25, 18, 0)
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  },
  {
    id: createEventId(),
    title: 'Hola',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
  */
];

export function createEventId() {
  return String(eventGuid++);
}

