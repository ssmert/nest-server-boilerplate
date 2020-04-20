import { ValueTransformer } from 'typeorm';

import { UtilsService } from '../../providers/utilsService';

export class PasswordTransformer implements ValueTransformer {
    to(value) {
        return UtilsService.generateHash(value);
    }
    from(value) {
        return value;
    }
}
