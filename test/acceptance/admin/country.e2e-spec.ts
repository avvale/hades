import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
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

describe('country', () =>
{
    let app: INestApplication;
    let repository: MockCountryRepository;
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
            .overrideProvider(ICountryRepository)
            .useClass(MockCountryRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: '9',
                iso3166Alpha3: '8',
                iso3166Numeric: 'c',
                customCode: '6',
                prefix: '6',
                name: 'f',
                slug: 'r',
                image: 'g',
                sort: 1,
                administrativeAreaLevel1: 'y',
                administrativeAreaLevel2: 'e',
                administrativeAreaLevel3: 'o',
                administrativeAreas: { "foo" : "bar" },
                latitude: 1401.81,
                longitude: 2249.66,
                zoom: 8,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: null,
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'a',
                iso3166Alpha3: 's',
                iso3166Numeric: 'm',
                customCode: 'v',
                prefix: '3',
                name: 'a',
                slug: 'b',
                image: 'g',
                sort: 7,
                administrativeAreaLevel1: 'd',
                administrativeAreaLevel2: 'l',
                administrativeAreaLevel3: '1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 94102.66,
                longitude: 43709.91,
                zoom: 6,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: null,
                iso3166Alpha2: 'b',
                iso3166Alpha3: '5',
                iso3166Numeric: '5',
                customCode: '2',
                prefix: 'q',
                name: 't',
                slug: 'x',
                image: 'j',
                sort: 4,
                administrativeAreaLevel1: 'v',
                administrativeAreaLevel2: 'n',
                administrativeAreaLevel3: 't',
                administrativeAreas: { "foo" : "bar" },
                latitude: 99792.8,
                longitude: 30038.76,
                zoom: 2,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: null,
                iso3166Alpha3: '2',
                iso3166Numeric: '9',
                customCode: 'h',
                prefix: 'q',
                name: 'q',
                slug: 'c',
                image: 'n',
                sort: 5,
                administrativeAreaLevel1: 'e',
                administrativeAreaLevel2: 'q',
                administrativeAreaLevel3: '0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 39126.15,
                longitude: 34095.95,
                zoom: 1,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 't',
                iso3166Alpha3: null,
                iso3166Numeric: 'y',
                customCode: '5',
                prefix: 'n',
                name: 'f',
                slug: 'o',
                image: '3',
                sort: 9,
                administrativeAreaLevel1: 'z',
                administrativeAreaLevel2: 'o',
                administrativeAreaLevel3: 'm',
                administrativeAreas: { "foo" : "bar" },
                latitude: 44826.13,
                longitude: 70526.24,
                zoom: 8,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'c',
                iso3166Alpha3: '0',
                iso3166Numeric: null,
                customCode: 'p',
                prefix: 'g',
                name: 'j',
                slug: 'b',
                image: '3',
                sort: 5,
                administrativeAreaLevel1: 't',
                administrativeAreaLevel2: 'h',
                administrativeAreaLevel3: 's',
                administrativeAreas: { "foo" : "bar" },
                latitude: 7126.65,
                longitude: 66606.88,
                zoom: 8,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'm',
                iso3166Alpha3: 'a',
                iso3166Numeric: '0',
                customCode: 'f',
                prefix: '5',
                name: null,
                slug: '3',
                image: 'b',
                sort: 1,
                administrativeAreaLevel1: 'o',
                administrativeAreaLevel2: 'c',
                administrativeAreaLevel3: '9',
                administrativeAreas: { "foo" : "bar" },
                latitude: 53524.94,
                longitude: 57395.25,
                zoom: 1,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'f',
                iso3166Alpha3: '2',
                iso3166Numeric: 'l',
                customCode: 'w',
                prefix: 'x',
                name: 'l',
                slug: null,
                image: 'b',
                sort: 8,
                administrativeAreaLevel1: 'g',
                administrativeAreaLevel2: 'h',
                administrativeAreaLevel3: 'x',
                administrativeAreas: { "foo" : "bar" },
                latitude: 38209.99,
                longitude: 28131.3,
                zoom: 6,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'e',
                iso3166Alpha3: '0',
                iso3166Numeric: 'v',
                customCode: 'w',
                prefix: 'k',
                name: 'h',
                slug: '6',
                image: '4',
                sort: 8,
                administrativeAreaLevel1: 'q',
                administrativeAreaLevel2: '5',
                administrativeAreaLevel3: 'p',
                administrativeAreas: { "foo" : "bar" },
                latitude: 18155.4,
                longitude: 47393.14,
                zoom: 8,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: '3',
                iso3166Alpha3: 'n',
                iso3166Numeric: 'a',
                customCode: 'b',
                prefix: '1',
                name: 'd',
                slug: 'n',
                image: 'd',
                sort: 4,
                administrativeAreaLevel1: '2',
                administrativeAreaLevel2: 'w',
                administrativeAreaLevel3: 'g',
                administrativeAreas: { "foo" : "bar" },
                latitude: 16592,
                longitude: 57428.49,
                zoom: 8,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                iso3166Alpha2: '9',
                iso3166Alpha3: 'f',
                iso3166Numeric: 'c',
                customCode: 'y',
                prefix: 'n',
                name: 'x',
                slug: 'd',
                image: 'v',
                sort: 5,
                administrativeAreaLevel1: '2',
                administrativeAreaLevel2: '1',
                administrativeAreaLevel3: '9',
                administrativeAreas: { "foo" : "bar" },
                latitude: 53043.98,
                longitude: 76259.12,
                zoom: 2,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha3: 's',
                iso3166Numeric: 'l',
                customCode: '8',
                prefix: 'k',
                name: '9',
                slug: 'm',
                image: 'e',
                sort: 1,
                administrativeAreaLevel1: 'r',
                administrativeAreaLevel2: 'v',
                administrativeAreaLevel3: 'n',
                administrativeAreas: { "foo" : "bar" },
                latitude: 65049.02,
                longitude: 23203.21,
                zoom: 3,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: '4',
                iso3166Numeric: 't',
                customCode: 'l',
                prefix: 'i',
                name: 'w',
                slug: '1',
                image: 'm',
                sort: 4,
                administrativeAreaLevel1: 'u',
                administrativeAreaLevel2: '2',
                administrativeAreaLevel3: 'f',
                administrativeAreas: { "foo" : "bar" },
                latitude: 84774.41,
                longitude: 56947.9,
                zoom: 9,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'v',
                iso3166Alpha3: '2',
                customCode: 'm',
                prefix: 'a',
                name: 'x',
                slug: '8',
                image: 'h',
                sort: 5,
                administrativeAreaLevel1: '5',
                administrativeAreaLevel2: '5',
                administrativeAreaLevel3: 'w',
                administrativeAreas: { "foo" : "bar" },
                latitude: 46896.95,
                longitude: 43996.29,
                zoom: 7,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'x',
                iso3166Alpha3: 'a',
                iso3166Numeric: '2',
                customCode: 'm',
                prefix: 't',
                slug: 'x',
                image: '3',
                sort: 9,
                administrativeAreaLevel1: 'e',
                administrativeAreaLevel2: 'i',
                administrativeAreaLevel3: 'n',
                administrativeAreas: { "foo" : "bar" },
                latitude: 14465.71,
                longitude: 47255.88,
                zoom: 5,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'j',
                iso3166Alpha3: 'v',
                iso3166Numeric: '1',
                customCode: '9',
                prefix: '7',
                name: 'u',
                image: 'm',
                sort: 3,
                administrativeAreaLevel1: 'u',
                administrativeAreaLevel2: 'l',
                administrativeAreaLevel3: '0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 64307.8,
                longitude: 22903.98,
                zoom: 3,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0kx3fzab04tspginys7u1wt3xir9ouvvrzx96',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'n',
                iso3166Alpha3: 'm',
                iso3166Numeric: 'f',
                customCode: 'm',
                prefix: 'p',
                name: 'b',
                slug: 'h',
                image: 'z',
                sort: 8,
                administrativeAreaLevel1: 'd',
                administrativeAreaLevel2: '8',
                administrativeAreaLevel3: '4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 8456.77,
                longitude: 43176.71,
                zoom: 1,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: '8r680kof5ht3e7xber0itiawndv0mgbfspo43',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'v',
                iso3166Alpha3: 'e',
                iso3166Numeric: 'j',
                customCode: '0',
                prefix: 'z',
                name: 'c',
                slug: '3',
                image: 't',
                sort: 2,
                administrativeAreaLevel1: 'n',
                administrativeAreaLevel2: '4',
                administrativeAreaLevel3: '0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 93400.31,
                longitude: 46967.29,
                zoom: 5,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: 'wph6y1llthbevfqwrfaa39xxjuo31676qam0m',
                iso3166Alpha2: 'u',
                iso3166Alpha3: 's',
                iso3166Numeric: 'z',
                customCode: 'n',
                prefix: 'v',
                name: 'w',
                slug: 'u',
                image: 'z',
                sort: 4,
                administrativeAreaLevel1: 'm',
                administrativeAreaLevel2: 'e',
                administrativeAreaLevel3: '0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 27726.16,
                longitude: 66777.48,
                zoom: 7,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'nl0',
                iso3166Alpha3: 'l',
                iso3166Numeric: '7',
                customCode: '5',
                prefix: '2',
                name: 'l',
                slug: 'p',
                image: 'u',
                sort: 9,
                administrativeAreaLevel1: 'o',
                administrativeAreaLevel2: '6',
                administrativeAreaLevel3: 'q',
                administrativeAreas: { "foo" : "bar" },
                latitude: 6932.48,
                longitude: 65507.48,
                zoom: 6,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'o',
                iso3166Alpha3: 'zocl',
                iso3166Numeric: 'k',
                customCode: '2',
                prefix: 'i',
                name: 'y',
                slug: '8',
                image: '3',
                sort: 6,
                administrativeAreaLevel1: 't',
                administrativeAreaLevel2: '3',
                administrativeAreaLevel3: '4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 21358.84,
                longitude: 73345.98,
                zoom: 1,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: '1',
                iso3166Alpha3: '2',
                iso3166Numeric: 'gx39',
                customCode: 't',
                prefix: 'c',
                name: 'r',
                slug: 'd',
                image: '6',
                sort: 3,
                administrativeAreaLevel1: '0',
                administrativeAreaLevel2: 'm',
                administrativeAreaLevel3: '0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 56610.2,
                longitude: 24311.18,
                zoom: 4,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'n',
                iso3166Alpha3: '4',
                iso3166Numeric: 'y',
                customCode: 't16btp3q6w1',
                prefix: 'h',
                name: 'w',
                slug: '3',
                image: 'k',
                sort: 1,
                administrativeAreaLevel1: 'q',
                administrativeAreaLevel2: 't',
                administrativeAreaLevel3: '8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 11982.88,
                longitude: 38990.92,
                zoom: 1,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: '5',
                iso3166Alpha3: 'a',
                iso3166Numeric: 'j',
                customCode: 't',
                prefix: 'ne41go',
                name: '8',
                slug: 'k',
                image: 'w',
                sort: 9,
                administrativeAreaLevel1: 'p',
                administrativeAreaLevel2: 'z',
                administrativeAreaLevel3: 'u',
                administrativeAreas: { "foo" : "bar" },
                latitude: 21565.82,
                longitude: 1164.95,
                zoom: 4,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'l',
                iso3166Alpha3: 'n',
                iso3166Numeric: 'u',
                customCode: 'o',
                prefix: 'z',
                name: '3v6j5faxiqxgdr8u79rrrnjqhqebc4vgd94qsy20nmgf5r3dlxzwjp618xgm1sb6dmltjfea1cltpriz1w8covcwi2pwkz7c5679qkspt095bd4u4o66w2ef4ku5k9tts9dx1z53mdeao2x43swtzfpk22vsxfdo62chevzbwdkcp59ke5g3o9jl38z9r9c41qrilnmie9f3cvrxlug09zzeno3k9ie5n2yigycmfaei20t3njrr2eqgorqrk3sl',
                slug: 't',
                image: '8',
                sort: 8,
                administrativeAreaLevel1: 'x',
                administrativeAreaLevel2: '8',
                administrativeAreaLevel3: '2',
                administrativeAreas: { "foo" : "bar" },
                latitude: 28491.53,
                longitude: 99101.69,
                zoom: 6,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'r',
                iso3166Alpha3: 'c',
                iso3166Numeric: '4',
                customCode: '9',
                prefix: 'e',
                name: '2',
                slug: '12t90ujq5yz6t2ja1a2d76ffagnef5vzcv580n42ndxi3j1nnk9ciwyqi1h3k5kcy0crxcyujcl53oj4xcnkpwng2l4u25b3aekd1fgvezhqbptdob6b9f7ivzawd7poicruuix0zl600hnboqj5l5an7475zy9lkakbpzuh6mdiu8mt6jorlf8qsx5hgepyt12rql1nuc3le0kuv1rqg9lo9hq2kzrsmmg85pfs9ht4z64ta1iedrbut0hkfffelgxmbh5rmn8b2hnbwonhowzlx05l7d026mxqx554k4khjdnf473z9ykgzf9fy6rj2bfxha2rnrh84jiubxjmecxenofwjp228un02yaibue3959l302c5fm380vz7cxyxvrl44jt6pjsyj1lfggw8zg4i8ffdtoi4kxxnvxgwd06bz6o0k0ngx4mkdzy5v3p69qpuivnjtp679fts1xchqo2schip9xuyfyn3ge3ww3zrqvy7qpd8i4ncttfghh80i7wivfdehs1jejt85lmhacff0zs0z8b6mmpt3zv8rha28l2v5j5qbam7zqfk741z3t62s6510me3qgxknvzb7kyn5ou940b3ayq0tb0vq24t6qyq73n34yz8v6ixpuumxk9xuysgjrh9evsxuzst9yagsktxjq247iz2rd6jsb3p6d5h9g50kv1ogh5m7r91a1xzqx2zlw5pbyrmegcfner7bbdjj84cmxifc0zvc0aug0ez55vvy210i0ug16rlozd8pbxh8f6rjdm0i15vtveum9tu6lbf7gaawjoj6ks3noqa51xs2r7uc8niklkkmn570zoz7uju8n205tqfktprk8vwohxz5g9h6afq2l2xdhoq8mlw6m57pie661brxzcgrouys0icu5e6dfe2zqhls00xx4elzihtbs8wcnrzmf611wlpdis9nn8cz7r1hz66bvp8wu5s4vedpigi1e4uwpwff9alposgp0szsisxs4qp61q0e3s29sfkvn12',
                image: '5',
                sort: 2,
                administrativeAreaLevel1: '2',
                administrativeAreaLevel2: '8',
                administrativeAreaLevel3: 'y',
                administrativeAreas: { "foo" : "bar" },
                latitude: 40491.58,
                longitude: 61780.53,
                zoom: 4,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'd',
                iso3166Alpha3: 'd',
                iso3166Numeric: 'd',
                customCode: 'f',
                prefix: 'u',
                name: '1',
                slug: 'i',
                image: '546iz3vtj0xbgcpn7wedf8k104yo9jxuro6zekr6ds76wobazbp9t3y5j89572cupso93r44wioazbxezh3frwhlp0j1f8qtdysng688ovnys72eh8gav1u5rwpdtdbfgesyw95okrzka10voxwin6s0bxl1zpbc76ceb3zrhpmyrrj3fyot0uqrotf2fu9c2itue761uti04n8uavk5373wr44c71rvehdjedehf5z0z724rcl3v9zq62rjqcv1jzawnx2wpboqd3qc7j8j42775qwsh87y7gh9hsesg0azlkx2pzjujckcse6y97lvdrrl6oprkay77otc2i3xdpp16vbbni1qykv4x2q5ff85pfk2ormlc4ow49f7zcj06gx3f2pjwhjg3n24ugpl9eccif1r4xvkjvo1d1cuq2ebvbihwq34a7h4dkp6w806j8zykx8ry0du5jw9kzwer291w5cpz0y9dhl9600c2qq6j9nx07q3dp7ys8vqwwdvjreaeehxnzwjfuscfkjl48zjwx4ov1r53ahjb3rp4s9dhpe96txhpciq1860klzbwc3nt6c2jyjbb8d5rnav87mkv05trdd6bhp7ayt61xwzlqkk2jd4kg3ymujr9z978psku27q1yy9dye5tmd2kapu2sr9l2n11iryv45rexbaxkfs3mlyi4d5lb3dhr1v3310wfbjcswxoy0h22rjnwtgjikl1p78hz1o65isq76e51qfdo4e9b9jgl7lu8ph4nvbym1ce5oxd3q2q4ro5n7h8hsi584heopmtaweespb7m6s4vv3vj13cyk91f11fgpfsiymn9cyyf74f1davpx7y4rx8xz53u8ua7x8fxv6j6eb87ugbnn5oqxmao7jvj7grx8cdnpgg7rnn5f8n0f8v9gwfefzzik6k0ccfg4sarpk3p7fw1zgx3pzgxf6e9vvpxw9a9j7m6764ev0m1l0c8vd906n3j4k5h1dtsryu1c390jv3sl2ysl4khfe0',
                sort: 9,
                administrativeAreaLevel1: '9',
                administrativeAreaLevel2: 'a',
                administrativeAreaLevel3: 'w',
                administrativeAreas: { "foo" : "bar" },
                latitude: 38546.93,
                longitude: 43443.6,
                zoom: 4,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'f',
                iso3166Alpha3: 'r',
                iso3166Numeric: '4',
                customCode: '7',
                prefix: 'b',
                name: '2',
                slug: 'u',
                image: 'b',
                sort: 6637848,
                administrativeAreaLevel1: 'l',
                administrativeAreaLevel2: '4',
                administrativeAreaLevel3: 'v',
                administrativeAreas: { "foo" : "bar" },
                latitude: 89439.29,
                longitude: 52147.39,
                zoom: 3,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'c',
                iso3166Alpha3: '2',
                iso3166Numeric: '7',
                customCode: 'j',
                prefix: 'l',
                name: '5',
                slug: 'd',
                image: 'u',
                sort: 9,
                administrativeAreaLevel1: 'bxsikisfhklmojo0w4jzjxnk1r7eefdwibo50t99l5fofn4ienf',
                administrativeAreaLevel2: '3',
                administrativeAreaLevel3: 'n',
                administrativeAreas: { "foo" : "bar" },
                latitude: 32924.12,
                longitude: 18722.23,
                zoom: 8,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'e',
                iso3166Alpha3: '7',
                iso3166Numeric: '2',
                customCode: 'a',
                prefix: 'u',
                name: 'f',
                slug: 'm',
                image: '7',
                sort: 6,
                administrativeAreaLevel1: 'f',
                administrativeAreaLevel2: '0o0k8pb5udl7asrfsezgq1yzuaq5iyy2ug5lsxp609syqzlx3ss',
                administrativeAreaLevel3: 'g',
                administrativeAreas: { "foo" : "bar" },
                latitude: 22043.08,
                longitude: 78504.22,
                zoom: 7,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'v',
                iso3166Alpha3: '3',
                iso3166Numeric: 'i',
                customCode: '2',
                prefix: '4',
                name: 'r',
                slug: '9',
                image: 'm',
                sort: 2,
                administrativeAreaLevel1: 'p',
                administrativeAreaLevel2: '0',
                administrativeAreaLevel3: 'zwr8gqy795lvrmzw5grtdcppzop76unz85lhstfvmo2f6hvswim',
                administrativeAreas: { "foo" : "bar" },
                latitude: 26950.97,
                longitude: 14568.03,
                zoom: 8,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'o',
                iso3166Alpha3: 'i',
                iso3166Numeric: 'v',
                customCode: 'z',
                prefix: 'k',
                name: 'i',
                slug: '7',
                image: 'j',
                sort: 1,
                administrativeAreaLevel1: '6',
                administrativeAreaLevel2: '8',
                administrativeAreaLevel3: 's',
                administrativeAreas: { "foo" : "bar" },
                latitude: 270185726131450000,
                longitude: 22139.94,
                zoom: 5,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'm',
                iso3166Alpha3: 'p',
                iso3166Numeric: '8',
                customCode: '8',
                prefix: 'a',
                name: 'f',
                slug: 'n',
                image: '9',
                sort: 5,
                administrativeAreaLevel1: '5',
                administrativeAreaLevel2: 'o',
                administrativeAreaLevel3: '2',
                administrativeAreas: { "foo" : "bar" },
                latitude: 12163.23,
                longitude: 757274754476999800,
                zoom: 9,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'k',
                iso3166Alpha3: 'g',
                iso3166Numeric: 'y',
                customCode: 'd',
                prefix: '0',
                name: '0',
                slug: 'f',
                image: '0',
                sort: 8,
                administrativeAreaLevel1: 'y',
                administrativeAreaLevel2: 'c',
                administrativeAreaLevel3: 'q',
                administrativeAreas: { "foo" : "bar" },
                latitude: 68868.54,
                longitude: 48663.5,
                zoom: 167,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'g',
                iso3166Alpha3: '9',
                iso3166Numeric: 'k',
                customCode: 'm',
                prefix: 'z',
                name: 'j',
                slug: 'g',
                image: 'm',
                sort: 5,
                administrativeAreaLevel1: 'n',
                administrativeAreaLevel2: 'b',
                administrativeAreaLevel3: 'c',
                administrativeAreas: { "foo" : "bar" },
                latitude: 58583.17,
                longitude: 2321.28,
                zoom: -9,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/country`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 's',
                iso3166Alpha3: 'o',
                iso3166Numeric: '4',
                customCode: 'x',
                prefix: 'p',
                name: 'c',
                slug: 'g',
                image: 'l',
                sort: 1,
                administrativeAreaLevel1: 's',
                administrativeAreaLevel2: 'n',
                administrativeAreaLevel3: '5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 48782.14,
                longitude: 12556.6,
                zoom: 5,
                dataLang: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/countries/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/countries/paginate')
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

    test(`/REST:GET admin/country - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '04ef9d5e-65d3-4737-8493-1dd88c5fcb5f'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/country`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '302f5707-e395-4903-8fab-ac224a4fc435'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '302f5707-e395-4903-8fab-ac224a4fc435'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/9baca149-300b-4274-98d9-dcca577f382b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/302f5707-e395-4903-8fab-ac224a4fc435')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '302f5707-e395-4903-8fab-ac224a4fc435'));
    });

    test(`/REST:GET admin/countries`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '67fe1c4c-99a1-45d7-81dc-c697723d43a5',
                commonId: '2d6fa5ac-afdb-44b7-8a22-2da7951b260c',
                langId: 'a0041d3a-eefd-40dd-be03-77d8146d96dc',
                iso3166Alpha2: 'b',
                iso3166Alpha3: '0',
                iso3166Numeric: 'm',
                customCode: 'x',
                prefix: 'v',
                name: 'z',
                slug: 'l',
                image: '2',
                sort: 3,
                administrativeAreaLevel1: 'h',
                administrativeAreaLevel2: 'y',
                administrativeAreaLevel3: '3',
                administrativeAreas: { "foo" : "bar" },
                latitude: 62664.33,
                longitude: 75269.03,
                zoom: 8,
                dataLang: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/country`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '302f5707-e395-4903-8fab-ac224a4fc435',
                commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                iso3166Alpha2: 'l',
                iso3166Alpha3: 't',
                iso3166Numeric: 'f',
                customCode: 'k',
                prefix: 't',
                name: 'g',
                slug: '9',
                image: '9',
                sort: 3,
                administrativeAreaLevel1: 'u',
                administrativeAreaLevel2: 'k',
                administrativeAreaLevel3: 'i',
                administrativeAreas: { "foo" : "bar" },
                latitude: 61994.82,
                longitude: 80659.74,
                zoom: 6,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '302f5707-e395-4903-8fab-ac224a4fc435'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/678d3d36-ae14-4f6f-99b7-b754e12ccdd9')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/302f5707-e395-4903-8fab-ac224a4fc435')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateCountry - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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

    test(`/GraphQL adminCreateCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '21819020-b72c-4b2f-be23-14086a64e8ea',
                        commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                        langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                        iso3166Alpha2: '1',
                        iso3166Alpha3: 'k',
                        iso3166Numeric: 'l',
                        customCode: '2',
                        prefix: 'w',
                        name: '8',
                        slug: 'u',
                        image: 'l',
                        sort: 9,
                        administrativeAreaLevel1: 'o',
                        administrativeAreaLevel2: '2',
                        administrativeAreaLevel3: 'k',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 90496.91,
                        longitude: 10211.9,
                        zoom: 5,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', '21819020-b72c-4b2f-be23-14086a64e8ea');
            });
    });

    test(`/GraphQL adminPaginateCountries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateCountries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateCountries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindCountry - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: 'c8c6c64b-3870-4189-95df-138356de1619'
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

    test(`/GraphQL adminFindCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: '302f5707-e395-4903-8fab-ac224a4fc435'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('302f5707-e395-4903-8fab-ac224a4fc435');
            });
    });

    test(`/GraphQL adminFindCountryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8cc76d57-f232-4fb7-8629-d58126c8d561'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindCountryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '302f5707-e395-4903-8fab-ac224a4fc435'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('302f5707-e395-4903-8fab-ac224a4fc435');
            });
    });

    test(`/GraphQL adminGetCountries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetCountries (query:$query)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetCountries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateCountry - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7a093620-9c02-4884-948a-12ea56a970aa',
                        commonId: '94e9f295-8a57-45d4-a5fc-f28a70057160',
                        langId: 'c70b610a-e273-4e17-93a0-3e41c1783fcc',
                        iso3166Alpha2: 'g',
                        iso3166Alpha3: '7',
                        iso3166Numeric: 'g',
                        customCode: 'o',
                        prefix: '8',
                        name: '1',
                        slug: 'e',
                        image: 'k',
                        sort: 9,
                        administrativeAreaLevel1: 'g',
                        administrativeAreaLevel2: '2',
                        administrativeAreaLevel3: 'j',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 18900.46,
                        longitude: 31684.69,
                        zoom: 9,
                        dataLang: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '302f5707-e395-4903-8fab-ac224a4fc435',
                        commonId: 'e88c544a-b6fe-411e-aa16-424e3f54357d',
                        langId: '9b36de97-8bb0-4324-8475-9548106c3b91',
                        iso3166Alpha2: 'o',
                        iso3166Alpha3: 'x',
                        iso3166Numeric: 'o',
                        customCode: 't',
                        prefix: '3',
                        name: 'n',
                        slug: 'q',
                        image: 's',
                        sort: 5,
                        administrativeAreaLevel1: '5',
                        administrativeAreaLevel2: '9',
                        administrativeAreaLevel3: 's',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 46913.25,
                        longitude: 45712.83,
                        zoom: 3,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('302f5707-e395-4903-8fab-ac224a4fc435');
            });
    });

    test(`/GraphQL adminDeleteCountryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd3bf7b9a-e380-44e3-b80b-2a53efdaa3c7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteCountryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '302f5707-e395-4903-8fab-ac224a4fc435'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('302f5707-e395-4903-8fab-ac224a4fc435');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});