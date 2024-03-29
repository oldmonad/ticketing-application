import { Provider } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { databaseConfig } from './config';

const NODE_ENV = process.env.NODE_ENV || 'development';

const DB_URL = process.env[databaseConfig[NODE_ENV].DB_URL]!;
const entities = process.env[databaseConfig[NODE_ENV].ENTITIES]!;

export const databaseProviders: Provider[] = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<any> => {
      return createConnection({
        entities: [entities],
        logging: true,
        synchronize: true,
        type: 'postgres',
        url: DB_URL,
      });
    },
  },
];
