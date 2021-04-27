import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('administrative-area-level-3', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel3Repository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAdministrativeAreaLevel3Repository)
            .useClass(MockAdministrativeAreaLevel3Repository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'w',
                customCode: 'w',
                name: 'a',
                slug: '6',
                latitude: 43546.2,
                longitude: 84714.35,
                zoom: 3,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: null,
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: '6',
                customCode: 'r',
                name: 'h',
                slug: '5',
                latitude: 24136.78,
                longitude: 57387.09,
                zoom: 5,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'y',
                customCode: 'a',
                name: 'l',
                slug: 's',
                latitude: 58579.1,
                longitude: 83935.36,
                zoom: 7,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: null,
                code: 'i',
                customCode: 'k',
                name: '6',
                slug: '4',
                latitude: 51008.9,
                longitude: 54504.13,
                zoom: 6,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: null,
                customCode: 'y',
                name: 'v',
                slug: 'm',
                latitude: 60421.24,
                longitude: 34317.43,
                zoom: 8,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'b',
                customCode: 'z',
                name: null,
                slug: '4',
                latitude: 9576.77,
                longitude: 58574.78,
                zoom: 8,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: '8',
                customCode: 'l',
                name: 'c',
                slug: null,
                latitude: 69861.01,
                longitude: 51179.56,
                zoom: 5,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'o',
                customCode: '3',
                name: 'c',
                slug: 'e',
                latitude: 52760.42,
                longitude: 77178.8,
                zoom: 4,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'm',
                customCode: 'u',
                name: 'd',
                slug: 'r',
                latitude: 80236.88,
                longitude: 39734.86,
                zoom: 9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'c',
                customCode: 'x',
                name: 'u',
                slug: 'y',
                latitude: 61007.72,
                longitude: 17651.39,
                zoom: 1,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                code: '8',
                customCode: 's',
                name: 'c',
                slug: 'y',
                latitude: 47918.63,
                longitude: 15421.69,
                zoom: 2,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                customCode: 'h',
                name: 'k',
                slug: 'p',
                latitude: 55219.12,
                longitude: 17314.85,
                zoom: 8,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 's',
                customCode: 'f',
                slug: 'z',
                latitude: 84838.42,
                longitude: 32209.24,
                zoom: 1,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'b',
                customCode: 'e',
                name: 'e',
                latitude: 86101.02,
                longitude: 18484.37,
                zoom: 3,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27v1sex7lewsl7le0erynkrlbp4382xhn4bg2',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: '8',
                customCode: 'g',
                name: 'e',
                slug: 'v',
                latitude: 92315.27,
                longitude: 52966.78,
                zoom: 9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: 'c0hdjq1gdkvq36e5owej8jwnu4h5nrdfxt1hj',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'n',
                customCode: 'h',
                name: 'n',
                slug: 'i',
                latitude: 37064.79,
                longitude: 98516.91,
                zoom: 6,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: '3zas7oyisygvmwaqnoo2fn4cnab5ltlyzpris',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'g',
                customCode: 'e',
                name: 'h',
                slug: 'r',
                latitude: 25354.28,
                longitude: 76430.79,
                zoom: 9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: 'p1gy0xgfn2sswn17npgssbafn16n8sxv82w80',
                code: 'd',
                customCode: '9',
                name: 'y',
                slug: 'h',
                latitude: 32885.01,
                longitude: 83328.44,
                zoom: 3,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code is too large, has a maximum length of 8`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'nhwe13eu3',
                customCode: 'v',
                name: 'r',
                slug: 'w',
                latitude: 43717.24,
                longitude: 70017.9,
                zoom: 7,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code is too large, has a maximum length of 8');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'f',
                customCode: 'g1f2k6y0rsh',
                name: 'h',
                slug: 't',
                latitude: 82675.18,
                longitude: 75456.44,
                zoom: 1,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'o',
                customCode: 'm',
                name: '9fp4do65tks18lj7woek72t4k4k5pm881opqtpdvlx96j7ossswg67i609xd16bpmeibzgdrw7j4wkbg9ombraxw5kth1jkzj96sevnk5vk8lx3796gc0jact5mdxs4847u57eqmql3x7okivh6sv3biw4cm5txr28kvz2njoeo8m68oy1pr7llkphz7n29f90fmvbicwn2sk0h9nszrnctfx9hgedx3mcrm67igb9oikfcv24uo4o4dcs1h0xl2',
                slug: '2',
                latitude: 9399.83,
                longitude: 43311.23,
                zoom: 9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'z',
                customCode: '4',
                name: 'l',
                slug: 'nge88gpdciwu0y9j64drbl7no9rbntyfm00majk95tur90j0gxv9vao5qetlht636o7an8r7ukiwa8f8n1zvt8boaxemj281xntzit9hh2pn10nupzhzyzsao5bf62xz95l5qtxnmrgk7gyneqh3dn5k3a2fac3wlcp43if29j4o40jlncpc523gya23g1ni12dhdx2md8xx1pc1vtpmfl6fg306mtgg7kg2aaq5aliajuvn9fay3xdg7v1vh08x',
                latitude: 70188.96,
                longitude: 94140.54,
                zoom: 7,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Latitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'y',
                customCode: 'h',
                name: '8',
                slug: 's',
                latitude: 956907613748452500,
                longitude: 84409.9,
                zoom: 7,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Latitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Longitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'm',
                customCode: 'f',
                name: 't',
                slug: 'l',
                latitude: 51545.04,
                longitude: 897516401653010700,
                zoom: 5,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Longitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 'i',
                customCode: 'k',
                name: 's',
                slug: 'l',
                latitude: 48058.93,
                longitude: 39308.13,
                zoom: 701,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Zoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: '2',
                customCode: 's',
                name: 'p',
                slug: 'l',
                latitude: 94690.31,
                longitude: 72477.97,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel3Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: 's',
                customCode: '9',
                name: 's',
                slug: 'r',
                latitude: 48341.81,
                longitude: 17674.42,
                zoom: 6,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-3/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : repository.collectionResponse.length,
                count   : repository.collectionResponse.length,
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/administrative-area-level-3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '7c522d17-80d4-4d19-bf5c-9b5418aff757'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cc28558f-9968-4ffe-b9fa-dc51a861e473'));
    });

    test(`/REST:GET admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/2d4f63e5-c385-4064-b764-62b20d2e6711')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/cc28558f-9968-4ffe-b9fa-dc51a861e473')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cc28558f-9968-4ffe-b9fa-dc51a861e473'));
    });

    test(`/REST:GET admin/administrative-areas-level-3`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'afdbfa6f-4d02-43df-9793-5a8a31d1b694',
                countryCommonId: '89174e9d-5927-4b19-b041-f35e4988f514',
                administrativeAreaLevel1Id: '7207272d-2875-4ff8-ac62-ffe14d76df68',
                administrativeAreaLevel2Id: 'c11379c4-a440-486c-8a33-b9ba4e5010de',
                code: 'w',
                customCode: 'i',
                name: 'j',
                slug: 'f',
                latitude: 88312.82,
                longitude: 89309.93,
                zoom: 7,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-3`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                code: '8',
                customCode: '1',
                name: 'n',
                slug: '3',
                latitude: 62779.2,
                longitude: 57742.06,
                zoom: 8,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cc28558f-9968-4ffe-b9fa-dc51a861e473'));
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/90cd62c2-5d0d-4c2f-b163-e9c0eff75cc3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/cc28558f-9968-4ffe-b9fa-dc51a861e473')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel3 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel3Input!)
                    {
                        adminCreateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel3Input!)
                    {
                        adminCreateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '383d60d3-f678-4d26-b3a8-72b9bdc12abf',
                        countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                        administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                        administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                        code: 'u',
                        customCode: 'q',
                        name: '5',
                        slug: 'w',
                        latitude: 87039.15,
                        longitude: 60932.05,
                        zoom: 2,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel3).toHaveProperty('id', '383d60d3-f678-4d26-b3a8-72b9bdc12abf');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel3 (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '87b29a69-a00c-4600-8fce-2818e95a9884'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3.id).toStrictEqual('cc28558f-9968-4ffe-b9fa-dc51a861e473');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2908b428-dc4b-4c80-af3b-b2d8284907d0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3ById.id).toStrictEqual('cc28558f-9968-4ffe-b9fa-dc51a861e473');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel3.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel3Input!)
                    {
                        adminUpdateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4ed05a38-37d3-48fd-b035-2dedc29402bf',
                        countryCommonId: 'd98a0eac-9ddd-4a0f-91c5-d4add77be9e3',
                        administrativeAreaLevel1Id: 'e0a74b3f-3246-4a3b-a42b-83515f29907f',
                        administrativeAreaLevel2Id: 'b3858780-2fed-4b46-9c29-0d56e7e38beb',
                        code: 'w',
                        customCode: 'x',
                        name: 'e',
                        slug: 'b',
                        latitude: 5042.31,
                        longitude: 77709.55,
                        zoom: 6,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel3Input!)
                    {
                        adminUpdateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473',
                        countryCommonId: '7a86bbbe-f43d-426c-9fb0-eefbc8afc3ba',
                        administrativeAreaLevel1Id: 'd96fc349-62e8-4500-81b2-44db612c962a',
                        administrativeAreaLevel2Id: '68de858a-54b2-40b9-b7c8-59696d4b1640',
                        code: '2',
                        customCode: 'e',
                        name: 'x',
                        slug: '0',
                        latitude: 75212.74,
                        longitude: 90286.66,
                        zoom: 8,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel3.id).toStrictEqual('cc28558f-9968-4ffe-b9fa-dc51a861e473');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel3ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c806fa3a-865d-4cf5-88a2-09dd7c3557bb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel3ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cc28558f-9968-4ffe-b9fa-dc51a861e473'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('cc28558f-9968-4ffe-b9fa-dc51a861e473');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});