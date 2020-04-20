import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenResponse {
    expiresIn: number;
    accessToken: string;

    constructor(data: { expiresIn: number; accessToken: string }) {
        this.expiresIn = data.expiresIn;
        this.accessToken = data.accessToken;
    }
}
