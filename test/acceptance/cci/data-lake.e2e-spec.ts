import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IDataLakeRepository } from '@hades/cci/data-lake/domain/data-lake.repository';
import { MockDataLakeSeeder } from '@hades/cci/data-lake/infrastructure/mock/mock-data-lake.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('data-lake', () =>
{
    let app: INestApplication;
    let repository: IDataLakeRepository;
    let seeder: MockDataLakeSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
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
                    MockDataLakeSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IDataLakeRepository>(IDataLakeRepository);
        seeder      = module.get<MockDataLakeSeeder>(MockDataLakeSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: 'c2b9a43e-140b-4dbe-8e59-a84691a309a9',
                executionId: '4c191c8c-8148-4261-9310-27ef9d9d27a4',
                tenantCode: 'uok7hy1txq6uqxrvq3t0l6or1gcwvqkevz6zuhp4ymy0spnflb',
                payload: {"foo":13699,"bar":27984,"bike":49813,"a":40652,"b":"WW:3YKSx^q","name":72746,"prop":"G$fM,1roUV"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '479bb2b5-c3b7-44eb-85ef-9a9680c2d427',
                tenantId: null,
                executionId: 'b14e05b4-9e5f-4488-b07a-75bdc87693f5',
                tenantCode: '6gj2986p18ztifmo6wxerniasahq6n8yt5oy4ungji73sfmfap',
                payload: {"foo":61208,"bar":66936,"bike":31046,"a":"qli<TaPC;Y","b":236,"name":"b=5&V[OMFR","prop":98171},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeExecutionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0be4871f-a973-4d0d-992f-7d51ad9097ad',
                tenantId: '13931e20-3cf3-4937-a926-e32fa15f85e1',
                executionId: null,
                tenantCode: '06tmzv135opc4r9363zyteuulm4p5a5s14kqezd21h98fiahrb',
                payload: {"foo":"2gE3^&H4?\\","bar":57057,"bike":":O\"ZwN^{(m","a":59098,"b":"bLk0r5Sl/s","name":41469,"prop":71123},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '80ab4253-e4c8-4049-a0f2-8d7ff80c9466',
                tenantId: 'e95afb05-77cb-4bca-b5fc-02bff476ec06',
                executionId: '118bbbad-1fd2-4981-8188-7f6bac62d150',
                tenantCode: null,
                payload: {"foo":33924,"bar":"xLlHV]vKjT","bike":66562,"a":"Zf;sZIM]CE","b":"(pJ{+KO/)b","name":20642,"prop":"IukYAbayO/"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakePayload property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '95f366f2-c506-4419-9546-1058bfdd29ef',
                tenantId: 'b5bbd65b-3140-4a68-8dfb-e1e59f4327f9',
                executionId: 'bb573cb9-cf5a-4f81-993c-86206a21ad4b',
                tenantCode: 'relgo9qkzhz7dwma4vsagjrhqojt8d6uaz4t9wg8fylwll71me',
                payload: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakePayload must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: '51314e6e-a2dc-4dc4-acb6-f3c046c3b636',
                executionId: '89cd4bb9-f2cd-4bb8-b5b0-1b776188c3ef',
                tenantCode: '9slh8bn46vw52zbpfen6he99s06zq7j5d1xvw2t3dizhsv3bih',
                payload: {"foo":"n@Gb;a?L|#","bar":"Ec\\?7mDo[>","bike":64576,"a":"ZjpSdkN1Q\"","b":17035,"name":"QdCyrt+[2U","prop":97141},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8e0cf3f2-7984-4488-b2a8-5708963ad9f9',
                executionId: '487261e9-cd25-45ee-8d0b-302cff171f5d',
                tenantCode: 'b2dup2uu88yigoglffarlg3yzn7wgk0catmnbhj1u5cxudaam9',
                payload: {"foo":46911,"bar":"U'PE`-TD]D","bike":89059,"a":"fj3{e=8Q<Z","b":"/]h{;psI&4","name":65386,"prop":"O%DX?E]!%r"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeExecutionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '06791f8a-7d8c-46e3-b1e2-4dd7c916dbec',
                tenantId: 'f6b011c9-5d5c-426e-b375-d7d55c6f63d6',
                tenantCode: 'dvbapqy55b4m84xcoieh5wscla27q8yvizlm9l7jaco7amm4s2',
                payload: {"foo":"4bP0n#UdjJ","bar":"`*=I=l7.!#","bike":29908,"a":"cvsl%2d(-q","b":72214,"name":"VE%[dB2XYU","prop":44999},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e07c4beb-0e5a-4249-bde8-d39a3c685ee3',
                tenantId: '91b35971-9fbd-41d8-a8c2-7cb364c83472',
                executionId: '28c13e61-cb83-4755-aede-546eaf215bca',
                payload: {"foo":63124,"bar":1847,"bike":29523,"a":"q*Q`M`edds","b":"E6)+0oW[=8","name":94388,"prop":"<:5tYbrT%R"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakePayload property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '094961fd-09dd-422e-9ebb-53972d3c4d07',
                tenantId: '7a786a1f-4291-4fa9-a421-49d3485cb8a8',
                executionId: '4c779ad6-17d3-474e-9bca-2c3df1d05440',
                tenantCode: 'jowh39xfbsjsxdjlf4de090ge315bra8s0gtdukmzoym2a3dy2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakePayload must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'xj0r86xl52939044agd7ple2s6hnm5a9xz37g',
                tenantId: 'd58d11d1-d133-47a6-8324-577d3edec947',
                executionId: 'ec9311c2-9648-4426-a47a-d7a701747e6b',
                tenantCode: 'xhwwa955rqwgqrhdgbpwqqm0o0jbwhqz9zj0cs06tgt71za83w',
                payload: {"foo":29018,"bar":"Ovc]y):VRf","bike":"fwpyr#?mnw","a":",7>QP$}Z^q","b":54968,"name":67231,"prop":"DMRU@)`(o:"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8e2668b4-b147-488a-8698-80aaf78b78c1',
                tenantId: 't3irs6ryznmu5u02q1axsnyfaymmirryty1y7',
                executionId: '07246393-ecc5-4349-959e-a7e81d19ae2a',
                tenantCode: 'kyaigu2egn102tulcnvm49tvllaw03c2ubf5ytwzp7hwynaovw',
                payload: {"foo":63742,"bar":4942,"bike":"3'Kx|$'Wk<","a":"e?)5q6P]]C","b":41998,"name":80581,"prop":"&)09%LFm^p"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeExecutionId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd37e5412-54ba-4acc-9f0e-c997e3085c06',
                tenantId: '99532d8e-450f-47c3-92b5-117a29dfca49',
                executionId: '8hzxm7vj7tliea2xpjwscoq6mutcjvj7lufdy',
                tenantCode: 'p8gtdnh3zxl96p4fgxt9n0028o7rsjjasf483p1rdehd6j6dmt',
                payload: {"foo":"z!3/)|t#fg","bar":"\"7>(DDJ]}#","bike":24174,"a":14087,"b":48870,"name":88420,"prop":81065},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeExecutionId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/data-lake - Got 400 Conflict, DataLakeTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '10ca31ad-1ca9-40c0-b08d-5787e13f5b86',
                tenantId: 'ed773fbb-2e49-49fd-bf42-da52073b08a0',
                executionId: '5cb6384a-a524-4a70-a8d1-13b0e235086f',
                tenantCode: 'b76g809trzdrlnlgsi57a0y8fm8e2dp3i5g68u82lfd11nntyry',
                payload: {"foo":14642,"bar":"L:/m%uM5Pp","bike":"k\"!G5pQal@","a":"<9m2d*s'x(","b":84000,"name":79711,"prop":"]+pWv@/2BV"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for DataLakeTenantCode is too large, has a maximum length of 50');
            });
    });


    test(`/REST:POST cci/data-lake - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/data-lakes/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/data-lakes/paginate')
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/data-lakes`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/data-lakes')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/data-lake - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '2b8f2e66-14c2-415c-900a-2db4f200e01a'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/data-lake`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                payload: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
    });

    test(`/REST:GET cci/data-lake`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET cci/data-lake/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/d744fb2c-440a-498a-98d5-044045bda3d7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/data-lake/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/data-lake/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/data-lake - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                executionId: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                tenantCode: '4h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczf',
                payload: {"foo":"sCXU(8%{cl","bar":"%WGf#G45[z","bike":"&8&}X#FBl8","a":18791,"b":11323,"name":"a7s,:Sa$Y0","prop":12024},
            })
            .expect(404);
    });

    test(`/REST:PUT cci/data-lake`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/data-lake')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                payload: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/data-lake/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/bc5507eb-5104-464f-b71a-2a580deae303')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/data-lake/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/data-lake/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateDataLake - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateDataLakeInput!)
                    {
                        cciCreateDataLake (payload:$payload)
                        {
                            id
                            tenantCode
                            payload
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciPaginateDataLakes`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateDataLakes (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateDataLakes.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateDataLakes.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateDataLakes.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetDataLakes`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetDataLakes (query:$query)
                        {
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetDataLakes.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateDataLake`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateDataLakeInput!)
                    {
                        cciCreateDataLake (payload:$payload)
                        {
                            id
                            tenantCode
                            payload
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        payload: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateDataLake).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindDataLake - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindDataLake (query:$query)
                        {
                            id
                            tenantCode
                            payload
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
                            id: '53a45570-61d1-45cb-bbf6-3ecf17e4c54a'
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

    test(`/GraphQL cciFindDataLake`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindDataLake (query:$query)
                        {
                            id
                            tenantCode
                            payload
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLake.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindDataLakeById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindDataLakeById (id:$id)
                        {
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7cc4adae-fcc9-41c7-a9bd-0a626a25979b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindDataLakeById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindDataLakeById (id:$id)
                        {
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindDataLakeById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateDataLake - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateDataLakeInput!)
                    {
                        cciUpdateDataLake (payload:$payload)
                        {
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        executionId: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                        tenantCode: '4h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczf',
                        payload: {"foo":"sCXU(8%{cl","bar":"%WGf#G45[z","bike":"&8&}X#FBl8","a":18791,"b":11323,"name":"a7s,:Sa$Y0","prop":12024},
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

    test(`/GraphQL cciUpdateDataLake`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateDataLakeInput!)
                    {
                        cciUpdateDataLake (payload:$payload)
                        {
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        payload: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateDataLake.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteDataLakeById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteDataLakeById (id:$id)
                        {
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f3c04be4-1f75-4160-bcd1-a0e4c9177b97'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteDataLakeById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteDataLakeById (id:$id)
                        {
                            id
                            tenantCode
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteDataLakeById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});