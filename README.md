# NestJS Boilerplate

![NEST.JS](https://img.shields.io/badge/nestjs-7.0.7-red.svg) ![Node](https://img.shields.io/badge/Node-12.7.12-blue.svg) ![express](https://img.shields.io/badge/Angular/CLI-4.17.1-yellowgreen.svg) ![TS](https://img.shields.io/badge/Typescript-3.8.3-brightgreen.svg) ![RxJS](https://img.shields.io/badge/bootstrap-6.5.5-blueviolet.svg)

# 작업순서

1. 노드 설치

```
brew install node or 직접설치
```

2. 의존성 설치

```
yarn add . or yarn
```

3. 시작

```
yarn start:dev
yarn watch:dev
```

4. 빌드

```
yarn build
```

# 기술스택

- Nestjs : 7.0.7
- Node : 12.7.12
- express : 4.17.1
- TypeScript : 3.8.3
- rxjs : 6.5.5
- 외 package.json참고

# 디렉토리 구조

```script
nest-server-boilerplate/                      # root
├── src/                                      #
│   ├── common/                               # 공통
│   ├── decorators/                           # 데코레이터
│   ├── filters/                              # 필터
│   ├── guard/                                # 가드
│   ├── interceptors/                         # 인터셉터
│   ├── interfaces/                           # 인터페이스
│   ├── middlewares/                          # 미들웨어
│   ├── modules/                              # 비즈니스
│   │   ├── auth                              # 인증
│   │   ├── code                              # 코드
│   │   ├── role                              # 역할
│   │   ├── user                              # 사용자
│   │   │   ├── api/                          #  - api
│   │   │   ├── entity/                       #  - 엔티티
│   │   │   ├── infrastructure/               #  - 인프라구조
│   │   │   │   ├── constant/                 #  - 상수
│   │   │   │   ├── exception/                #  - 에러처리
│   │   │   ├── repository/                   #  - 레파지토리
│   │   │   │   ├── UserRepository.ts         #
│   │   │   ├── service/                      #  - 서비스
│   │   │   │   ├── UserChangeService.ts      #  - 변경서비스
│   │   │   │   ├── UserRetireveService.ts    #  - 조회서비스
│   │   │   ├── UserModule.ts                 #  - 사용자 모듈
│   ├── providers/                            # css
│   ├── shared/                               # css
│   ├── AppModule.ts                          # entry point
│   ├── swagger.ts                            # 스웨거
│   └── ...                                   #
├── nest-cli.json                             #
├── ...                                       #
├── package.json                              #
└── ...                                       #
```

# swagger

- http://localhost:8000/documentation/

# 참고

- [NEST](https://docs.nestjs.com/)
- [typeorm](https://typeorm.io/#/)

---

# 개발표준 정의

## 1. 개요

프로젝트의 개발 시 개발생산성 향상 및 운영의 효율화를 위해 반드시 준수되어야 하는 준수사항을 정의함

- 제시된 표준은 철저히 준수한다.
- 모든 화면은 최대 응답속도 5초 이내를 목표로 Design 되어야 한다.
- 본 표준안은 최소한의 필수사항을 지키도록 유도하고 해서는 안되는 것들을 지적하는 내용이며, 개개인의 다양한 능력과 개념들로 본 표준을 확장시켜 시스템에 적용시키도록 한다.

## 2. 명명규칙 표준

작성중

## 3. Resource 명명규칙

작성중...

## 4. 주석처리

- 각 Method 앞에 Method의 Parameter, Return Value의 의미와 Method의 간략한 설명을 기술한다.
- 해당 프로그램의 핵심적인 중요Logic에 대해서는 반드시 그에 따른 주석을 추가한다.
- 사용하지 않는 로직이라면 지우고 사용예정이라 주석처리를 했다면 반드시 TODO로 작성한다.
- JsDoc을 이용하여 프로그램 사양서를 작성할 수 있도록 한다.
- JsDoc의 표준을 준수한다.

예 )

```script
  /**
   * 지정된 스텝으로 이동한다.
   * @param step 다음스텝 지시자
   * @param routePath 화면전이경로
   * @param name 단계 이름
   * @param crudType CRUD형식
   */
  route(step: number, routePath: string, name?: string, crudType?: any): void {
    //다음 스텝화면에 전달할 파라메터 셋팅
    this.sharedData.storage.setState(step, routePath, name, crudType);
    this.router.navigate([this.sharedData.storage.state.routePath]);
  }
```
