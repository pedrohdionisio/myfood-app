import { setupServer } from 'msw/native';
import { defaultHandlers } from './handlers';

export const server = setupServer(...defaultHandlers);
