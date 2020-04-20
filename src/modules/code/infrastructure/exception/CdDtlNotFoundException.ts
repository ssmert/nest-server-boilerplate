import { NotFoundException } from "@nestjs/common";
import { IError } from "interfaces/IError";
import * as _ from "lodash";
/**
 * 코드상세 데이터 없음(`NOT_FOUND: 404`) 에러이다.
 */
export default class CdDtlNotFoundException extends NotFoundException {
    constructor(errData?: IError | string, ...msgArgs: string[]) {
        if (errData) {
            if (typeof errData === "string") {
                super(errData);
            }
            else {
                const iError = errData as IError;
                iError.msgArgs = msgArgs;
                super(iError);
            }
        }
    }
}
