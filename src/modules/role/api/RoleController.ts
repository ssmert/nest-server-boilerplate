import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRole } from "common/constants/AuthRole";
import { Roles } from "decorators/RolesDecorator";
import { Response } from "express";
import { JwtAuthGuard } from "guards/JwtAuthGuard";
import { RolesGuard } from "guards/RolesGuard";
import { AuthUserInterceptor } from "interceptors/AuthUserInterceptor";
import RoleChangeService from "../service/RoleChangeService";
import RoleRetireveService from "../service/RoleRetireveService";
import RoleRequest from "./dto/RoleRequest";
import RoleResponse from "./dto/RoleResponse";

/**
 * 역할 컨트롤러이다.
 */
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags('roles')
@Controller('roles')
export default class RoleController {

    /**
     * 생성자
     * 
     * @param roleRetireveService 역할 조회 서비스
     * @param roleChangeService 역할 변경 서비스
     */
    constructor(
        private roleRetireveService: RoleRetireveService,
        private roleChangeService: RoleChangeService) { }

    /**
     * 전제 역할 목록을 조회한다.
     * 
     * @param roleId 역할식별자
     * @param roleNm 역할명
     * @param res 응답 데이터
     */
    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: RoleResponse })
    @Roles(AuthRole.ROLE_SPR, AuthRole.ROLE_MNG, AuthRole.ROLE_USR)
    public async getList(@Res() res: Response) {
        const roleResponses: RoleResponse[] = await this.roleRetireveService.getList();

        res.status(HttpStatus.OK).send({ data: { roleResponses } });
    }

    /**
     * 특정 역할을 조회한다.
     * 
     * @param roleId 역할식별자
     * @param res 응답 데이터
     */
    @Get(':roleId')
    @ApiResponse({ status: HttpStatus.OK, type: RoleResponse })
    @Roles(AuthRole.ROLE_SPR, AuthRole.ROLE_MNG, AuthRole.ROLE_USR)
    public async get(@Param('roleId') roleId: string, @Res() res: Response) {
        const roleResponse: RoleResponse = await this.roleRetireveService.get(roleId);

        res.status(HttpStatus.OK).send({ data: { roleResponse } });
    }

    /**
     * 신규 역할을 등록한다.
     * 
     * @param roleRequest 요청 데이터
     * @param res 응답 데이터
     */
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SPR, AuthRole.ROLE_MNG, AuthRole.ROLE_USR)
    public async create(@Body() roleRequest: RoleRequest, @Res() res: Response) {
        await this.roleChangeService.createRole(roleRequest);

        res.status(HttpStatus.CREATED).send();
    }

    /**
     * 특정 역할을 변경한다.
     * 
     * @param roleId 역할식별자
     * @param roleRequest 요청 데이터
     * @param res 응답 데이터
     */
    @Put(':roleId')
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SPR, AuthRole.ROLE_MNG, AuthRole.ROLE_USR)
    public async update(@Param('roleId') roleId: string, @Body() roleRequest: RoleRequest, @Res() res: Response) {
        await this.roleChangeService.updateRole(roleId, roleRequest);

        res.status(HttpStatus.CREATED).send();
    }

    /**
     * 특정 역할을 삭제한다.
     * 
     * @param roleId 역할식별자
     * @param res 응답 데이터
     */
    @Delete(':roleId')
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SPR, AuthRole.ROLE_MNG, AuthRole.ROLE_USR)
    public async delete(@Param('roleId') roleId: string, @Res() res: Response) {
        await this.roleChangeService.deleteRole(roleId);

        res.status(HttpStatus.CREATED).send();
    }
}