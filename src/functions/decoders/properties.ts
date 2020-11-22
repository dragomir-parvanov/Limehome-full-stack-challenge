import * as D from 'io-ts/Decoder';
import { Property } from '../../types/interfaces/property';
import { PositionDecoder } from './position';

export const PropertyDoceder: D.Decoder<unknown, Property> = D.type({
  distance: D.number,
  title: D.string,
  position: PositionDecoder,
});
