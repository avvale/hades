import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountrySeeder } from '@hades/admin/country/infrastructure/mock/mock-country.seeder';
import { ILangRepository } from '@hades/admin/lang';
import { MockLangSeeder } from '@hades/admin/lang/infrastructure/mock/mock-lang.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
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
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1';
import { MockAdministrativeAreaLevel1Seeder } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.seeder';

const importForeignModules = [
    IamModule
];

describe('country', () =>
{
    let app: INestApplication;
    let repository: ICountryRepository;
    let seeder: MockCountrySeeder;
    let langRepository: ILangRepository;
    let langSeeder: MockLangSeeder;
    let repositoryAA1: IAdministrativeAreaLevel1Repository;
    let seederAA1: MockAdministrativeAreaLevel1Seeder;
    let testJwt: string;

    beforeAll(async () =>
    {

        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'mysql',
                        host: 'localhost',
                        port: 33006,
                        username: 'root',
                        password: '123456',
                        database: 'quasar_testing',
                        synchronize: true,
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                    /* SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        //storage: 'database.sqlite',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }), */
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    MockCountrySeeder,
                    MockLangSeeder,
                    MockAdministrativeAreaLevel1Seeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<ICountryRepository>(ICountryRepository);
        seeder          = module.get<MockCountrySeeder>(MockCountrySeeder);
        langRepository  = module.get<ILangRepository>(ILangRepository);
        langSeeder      = module.get<MockLangSeeder>(MockLangSeeder);
        repositoryAA1  = module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        seederAA1       = module.get<MockAdministrativeAreaLevel1Seeder>(MockAdministrativeAreaLevel1Seeder);
        testJwt         = module.get(TestingJwtService).getJwt();

        
        // seed mock data in memory database
        await langRepository.insert(langSeeder.collectionSource);
        await repository.insert(seeder.collectionSource);
        await repositoryAA1.insert(seederAA1.collectionSource);

        await app.init();
        
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                commonId: 'bc251e6b-a4f1-4e9c-91ef-595cd523ecfb',
                langId: '98f17bcc-f102-486f-8969-8cf2d5517bb2',
                iso3166Alpha2: 'v9',
                iso3166Alpha3: 'cuz',
                iso3166Numeric: 'hwm',
                customCode: '5xumasssuw',
                prefix: 'u0h45',
                name: 'fc2edw4wsk1dhbfsprcebgwitadd33c89shes5kwqi3dp8hcb02uope8or2fo0k8bv87nw0uvkdhsf8vqjbi6zx8qac0rksauwoqzyjktvyajocygp6i8dum5cgre8x2o4bf4ujt2inxqhlrpr0nbddvqqep6qxsyp4je8fshev4tkjlj04h2yk2civov9g1cg1ccu69e7gjj0zapr9lxfqqwrphkhdmbe0o0e2hkw89k99sk1ts17r7af8k408',
                slug: '8egmik9ou188who7w05rqjzogwv2stc4jmlzy9k3q0ov9g55r10382834bhmd7ps5obzhbcn7pky3s212e3a4y7jnleg5mc3ktgtj3plk5ufeclxpz5ual21i2ocrm7y1z50mmie8k6gxehts35qs90vjdyv02a32d0nfsvcvqonfw88vu1yolq53p9l8xekpumw204n9fbdk52rvhch6evyx90mtc85628ne7vpmii3d282r1jui3k23m6rdtehp0gl53deg8ka9rehjdzgkogz6xztilqn8kjlug877ij9cgdauebihcj1bt3p679rbnz4604a6w80oxbmecxn2zdeb8jk7x17flucxfm7l4zp0647boslbioaofj1dfjn9jew7j7u5s7tj1hozdl17ne7mody2q0x1s820rd8u6i2m6vl9xxk12lihn8bhosrhxs8xzpcvrtqg2bj6glnn5mq2ot13npdd86rnkkqt3pw5y9ki8yu104lzitwek9y3pnu9uhh8h6l98ll36bcrryqfe1d76drxbx7k0jzbuw3rbi5jtstqop9ethqftycnb85kzhxyt9ccl1hwu4y37mswy0tinfdfjr8w6g4axcj4nwq4ljjvhhlrzipjv33ir83j3ry4jrxmx80656sy2kamrt46vbazzjqfy60a0wtemcs2fdwe9a3ineepv1shqn4m1fkx0trp3jd0enffr340x2636hz4u475ja0bvjbw69hr7txbxrprptdflgdvav7r3b9o6f6a9exwwf3jiebi7hsgiwqmztvdhlpdvoja95lnyqho3o5xxc8eglf0w4xyw59zxf7b8baa1u41kmmbcxe3y0ksdw01ea71r6kjc8tdq6lrjjhumnha2i4al3wcnv1rumjpzou4crkcn2axl43u26mbczhdeyjk9kwzv2ylaf6sw1vfxegignrgu2v7dj1kua74tv4gb0japt7f7jjyt2xa8oh3xw89pta8ucpn9sl28em2n3bny8p',
                image: '0p31nm6c1aiyiv45z3swkgix6foj5pqlvaf19ma0ii6cp95ejyntjtvnxgvaeskkjezu8av0yhxy0z6cao3n7f1v6ml8s5x69zph7ib9iljpo0tvw06tnjgidzq8fuitj6sb8dp92rmk97zs6b7e5iwx3ytzbkg2dhoon5vbxnelzb3d5xufkbgyiwcblq2xdvttbg11seqdpr6k9ho5jd6ho4md9cos9pmd7mfuxz2ih08ct1xax3eyin8npsv4tzy5g18kn5riany52mpfni2juljz7qod1tivrmn4m4r7b125o7d5ipi785ijx7lozndzj085sqcrxnp11o3agoiwe8hdeo64dn15dg81z8rch5vgr6d66gs9ingm7mt2vddbudzqyb3qfirwxey1264hr99zb9ayml7oogyvw8wcg4xammixgdkae69orvjy6l7odah9457p1q8oo1hp8mm8u7i0d5xqjh04ex9rcn60x1dnfdj7dc0ngl4dblm22uq5j7jpq4kf19jardhxksmebdzuomgexofeligojj1swgnxmbmfnt99am6ylub30mzvhk0esrrug6o4tlrj3j34x2vxvrhz2x7t9cq8t5ngemiahxqr9qtq43lls1qmufaz4tgs4aaj5i7ivbrbbbn2pk092gqogozlf1b3xeyho5wljqiwhcpdt4xvjw5rt7dat4x0k9zuuvex92rb0anx4avcj8fwq8oo5iesa6iyiphtwnz05soqkx65v4ee74hvk7t37v09grwl3af2bnuxutojg8fqnmo0zh1o94yd43lsmewxcxd1lne8jy5tmg5srxauxb04gzorl1zlr6jyrvmi07hctazau4dl7q8cyms05vuxf2vnaysxg222ke3fq5czwwg32fxcmw1fk85dmdvrtz7ozaanuppsmr06te5r6xii1twppts7p2riwr3t7chfs4am73w2292yk5yptfrurdy35127ojrl0qea8xl62mmygjgr4kupn4c8',
                sort: 1,
                administrativeAreaLevel1: '9m13vo75f399l2yhqosnt38lx3121upqru46kqrwtxpjou973n',
                administrativeAreaLevel2: 'yvg9v20o90pyo41jp7scfxbzkrpn2jhh0o86fcqhz9ff872ytf',
                administrativeAreaLevel3: 'w6m1qc1tnc7v3ajn3k8cb1rc5t8d3vu90sodiodtsv4c6wzvri',
                administrativeAreas: {"foo":43392,"bar":39208,"bike":"cJU\\\"8Ry(b","a":"2Sio}x!\\#H","b":"(4*3LQ&/c5","name":"hPf\"{+i7}b","prop":";:*bsJkhBf"},
                latitude: 14,
                longitude: 10,
                zoom: 11,
                dataLang: {"foo":4728,"bar":"h5b7|n;4XN","bike":"2Fk_\"R-W)E","a":"t6iY4/%fL\\","b":89224,"name":"x06q6c-Ej4","prop":"v!xwy5[,Cf"},
            })
            .then(res => {
                //console.log(res)
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });


    afterAll(async () =>
    {
        await app.close();
    });
});