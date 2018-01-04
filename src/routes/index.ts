import commands from './commands';
import passports from './passports';
import { Express } from 'express';

export default function RouterModule(app: Express) {
  app.use('/cmd', commands);
  app.use('/passports', passports);
}
