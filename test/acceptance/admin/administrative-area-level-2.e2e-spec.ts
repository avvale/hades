import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
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

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel2Repository;
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
            .overrideProvider(IAdministrativeAreaLevel2Repository)
            .useClass(MockAdministrativeAreaLevel2Repository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'f',
                customCode: 'k',
                name: 'b',
                slug: '6',
                latitude: 17932.47,
                longitude: 43714.84,
                zoom: 9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: null,
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'x',
                customCode: '0',
                name: '2',
                slug: 'n',
                latitude: 4790.21,
                longitude: 32108.1,
                zoom: 4,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: null,
                code: 'o',
                customCode: 'c',
                name: 'e',
                slug: 'q',
                latitude: 27506.77,
                longitude: 8294.14,
                zoom: 3,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: null,
                customCode: 'i',
                name: '6',
                slug: 'c',
                latitude: 8141.4,
                longitude: 27980.25,
                zoom: 5,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 's',
                customCode: 'f',
                name: null,
                slug: '9',
                latitude: 68049.11,
                longitude: 28269.3,
                zoom: 4,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'n',
                customCode: 'y',
                name: 'k',
                slug: null,
                latitude: 78758.3,
                longitude: 87030.91,
                zoom: 1,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'p',
                customCode: 'v',
                name: 'c',
                slug: 'f',
                latitude: 33481.18,
                longitude: 84429.72,
                zoom: 6,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'g',
                customCode: 'g',
                name: 'j',
                slug: 'w',
                latitude: 36510.06,
                longitude: 78379.21,
                zoom: 4,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                code: '2',
                customCode: 'z',
                name: 'k',
                slug: 's',
                latitude: 52640.73,
                longitude: 98642.08,
                zoom: 6,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                customCode: 'p',
                name: 'p',
                slug: 't',
                latitude: 92468.31,
                longitude: 68846.77,
                zoom: 9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: '4',
                customCode: '3',
                slug: 'e',
                latitude: 76181.08,
                longitude: 18346.03,
                zoom: 5,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'r',
                customCode: '7',
                name: 'w',
                latitude: 61375.35,
                longitude: 42294.27,
                zoom: 9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dm3bhyzgwnpunwzacjr32r05st2cokb5tti2i',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'd',
                customCode: 'm',
                name: 'b',
                slug: 'w',
                latitude: 67144.92,
                longitude: 76526.69,
                zoom: 2,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: 'fcpqdsweax4cqc0bbfkij0aygi28nszxyjau6',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: '2',
                customCode: 'y',
                name: 'f',
                slug: 'g',
                latitude: 31595.06,
                longitude: 27827.25,
                zoom: 7,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: '039epngv98yh4ywkkn5p3hqr2zl79tkg345kk',
                code: 'm',
                customCode: 'u',
                name: '2',
                slug: 'v',
                latitude: 30905.32,
                longitude: 99337.43,
                zoom: 6,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code is too large, has a maximum length of 8`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'bxp9hsh9d',
                customCode: '5',
                name: 't',
                slug: 'q',
                latitude: 99441.61,
                longitude: 1734.12,
                zoom: 1,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code is too large, has a maximum length of 8');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'n',
                customCode: 'e9ecam6le5a',
                name: 'h',
                slug: 'x',
                latitude: 46458.71,
                longitude: 69069.71,
                zoom: 6,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'w',
                customCode: 's',
                name: 'l1i0nidlaw8ujdzmpomyh18u6sewztq8x6uqnqife8qwjfeng1b3jkynpbbpmm0hoiyss35j50s0gk6anjepurxsef0yyhcbdtc017udt68q71egt0vivhandadrhtqabgdz8g3l861kg0em2fw58dtpcraufu6rcrdrs3q6j0dn0d6wg9kojc10gj33i951buetkyhm6a32nx448e1k83cx8mycy3sdtsu7v10z0pch1ddpnmxwrydbu92hayvr',
                slug: 'y',
                latitude: 89724.49,
                longitude: 29753.77,
                zoom: 7,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'w',
                customCode: '4',
                name: 'i',
                slug: '4qskwyk4nklyo5nf9bm45ltfplab6nm7q9fx096ui4z3ejh1keahw90cbgupwuf9ag9612nr2nlkafl4oouedtynhu8ijrwf67sdk3jnrzi9en6ksai6nsu3soof3uxavntrmjs8ujut19zbpt1efrrcwfrwsm5qj8wvkz8uax5zfu9xu2uk3gyw5prg321i6un3qa3wwdcfcbg4dn6nmr5gbaueltc6uf9muavy8ppae8y6kwwemrzpl7otp6w2',
                latitude: 70830.52,
                longitude: 52998.5,
                zoom: 6,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'k',
                customCode: '0',
                name: '6',
                slug: 'j',
                latitude: 923780283880098600,
                longitude: 70719.63,
                zoom: 7,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'g',
                customCode: 'm',
                name: 'l',
                slug: 'j',
                latitude: 41350.69,
                longitude: 200767734535921760,
                zoom: 1,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'y',
                customCode: 't',
                name: '0',
                slug: 'p',
                latitude: 64536.82,
                longitude: 58455.04,
                zoom: 185,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'f',
                customCode: 'u',
                name: 'i',
                slug: 'p',
                latitude: 31427.74,
                longitude: 56330.33,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel2Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'j',
                customCode: 'b',
                name: 'f',
                slug: '4',
                latitude: 65220.83,
                longitude: 79867.96,
                zoom: 3,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-2/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2/paginate')
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

    test(`/REST:GET admin/administrative-area-level-2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'f1373a2d-89f6-4f79-a129-d4a2e02ba755'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ffd3efb8-2859-4d39-9f46-9938b018ccc3'));
    });

    test(`/REST:GET admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/d6b33292-cdd2-4a9a-9282-c4b5a6a4372d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/ffd3efb8-2859-4d39-9f46-9938b018ccc3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ffd3efb8-2859-4d39-9f46-9938b018ccc3'));
    });

    test(`/REST:GET admin/administrative-areas-level-2`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd444d4b2-bbd1-44d4-aa0e-b5aaa090c854',
                countryCommonId: '27981afb-4a1a-4771-8e6f-f6ea59c1c5e2',
                administrativeAreaLevel1Id: '4d0ee356-258b-4108-9763-415f11e7d80f',
                code: '4',
                customCode: 'q',
                name: 'e',
                slug: '2',
                latitude: 23654.74,
                longitude: 53290.83,
                zoom: 1,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                code: 'i',
                customCode: 'p',
                name: '0',
                slug: '7',
                latitude: 55044.79,
                longitude: 85605.05,
                zoom: 9,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ffd3efb8-2859-4d39-9f46-9938b018ccc3'));
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/6a72851a-b082-4576-8baf-0a698ff3f55c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/ffd3efb8-2859-4d39-9f46-9938b018ccc3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel2 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel2Input!)
                    {
                        adminCreateAdministrativeAreaLevel2 (payload:$payload)
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel2Input!)
                    {
                        adminCreateAdministrativeAreaLevel2 (payload:$payload)
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
                        id: '4c7aa9bf-4d3b-42a7-9364-b4d3f806d850',
                        countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                        administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                        code: '4',
                        customCode: 'i',
                        name: '5',
                        slug: 'd',
                        latitude: 39898.75,
                        longitude: 35266.59,
                        zoom: 3,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel2).toHaveProperty('id', '4c7aa9bf-4d3b-42a7-9364-b4d3f806d850');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel2 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel2 (query:$query)
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
                            id: '2877393c-5f29-4827-b7a5-433b78a043fa'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel2 (query:$query)
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
                            id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2.id).toStrictEqual('ffd3efb8-2859-4d39-9f46-9938b018ccc3');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel2ById (id:$id)
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
                    id: '7bf25ea7-a9de-4730-ace0-51e5c373f391'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel2ById (id:$id)
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
                    id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2ById.id).toStrictEqual('ffd3efb8-2859-4d39-9f46-9938b018ccc3');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel2 (query:$query)
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
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel2.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel2Input!)
                    {
                        adminUpdateAdministrativeAreaLevel2 (payload:$payload)
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
                        id: 'd0ab8a4a-f287-4a3c-ac41-8b0dbb71e8fc',
                        countryCommonId: 'a5370732-f561-496b-9c67-78639c46b8b1',
                        administrativeAreaLevel1Id: 'a72fe730-9fc0-4753-8306-148fd71da943',
                        code: 'c',
                        customCode: 'u',
                        name: '3',
                        slug: '8',
                        latitude: 90951.81,
                        longitude: 64130.05,
                        zoom: 9,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel2Input!)
                    {
                        adminUpdateAdministrativeAreaLevel2 (payload:$payload)
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
                        id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3',
                        countryCommonId: '95a162b9-f9f6-48f8-be6b-cdc2c9802461',
                        administrativeAreaLevel1Id: 'd336b064-7d8c-452b-b2de-149cf7fa3435',
                        code: '6',
                        customCode: 'm',
                        name: 'l',
                        slug: '6',
                        latitude: 8042.38,
                        longitude: 25596.66,
                        zoom: 5,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel2.id).toStrictEqual('ffd3efb8-2859-4d39-9f46-9938b018ccc3');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel2ById (id:$id)
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
                    id: '86430a20-3b8a-4f1e-b74d-110928c20c22'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel2ById (id:$id)
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
                    id: 'ffd3efb8-2859-4d39-9f46-9938b018ccc3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('ffd3efb8-2859-4d39-9f46-9938b018ccc3');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});