import { ValueTransformer } from 'typeorm';

import { UtilsProvider } from '../../providers/UtilsService';

export class PasswordTransformer implements ValueTransformer {
    to(value) {
        return UtilsProvider.generateHash(value);
    }
    from(value) {
        return value;
    }
}
