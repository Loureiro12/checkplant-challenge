import { Realm } from '@realm/react';
import { type ObjectSchema } from 'realm';

interface GenerateProps {
  id: string;
  synced: string
  latitude: string;
  longitude: string;
  annotation: string;
  datetime: string;
}

export class Annotation extends Realm.Object<Annotation> {
  id!: string;

  synced!: string;

  latitude!: string;

  longitude!: string;

  annotation!: string;

  datetime!: string;

  static generate({
    id, synced, latitude, longitude, annotation, datetime,
  }: GenerateProps) {
    return {
      id, synced, latitude, longitude, annotation, datetime,
    };
  }

  static schema: ObjectSchema = {
    name: 'Annotation',
    primaryKey: 'id',

    properties: {
      id: 'string',
      synced: 'string',
      latitude: 'string',
      longitude: 'string',
      annotation: 'string',
      datetime: 'string',
    },
  };
}
