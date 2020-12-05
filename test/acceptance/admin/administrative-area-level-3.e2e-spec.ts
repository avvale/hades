import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('administrative-area-level-3', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAdministrativeAreaLevel3Repository)
            .useClass(MockAdministrativeAreaLevel3Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: '4xd1ahgw',
                customCode: 'x8lwh1wrwb',
                name: '275g5uqy3yxlvuv31bkcb5dz3zvcb13ddk0x5pvw92ucipwkpmiq6vkc920rha41r7x5z8y8iarfyfrdeui504wwgaz31qb2gvux071wcklyqc807093l6thcrhbf9i97bl3lzemdqq8q3sbq9oc6yfpmyfh7ai5zg6s3ud8ue5pp8g026h4ywvhuab84w6rj6aurb5etbowprd5pnrcy9rkp22nhd3vvxm6b0ohhtaf9cj3dcph2ori59pcfk4',
                slug: 'szc6nmq940cz2znsilpoeybzvuel2zaw9a1b2uuc7tmm7fylqn2paknkjjwl1wa8gidz80qyi5y585i5sjh0s2cfufuti534bt9vxllgwdgv5jdkc4x1xyr9rq6rwmyrm9wbn7ro7lo8m9z7491phqtxi0c7fn2z624dqnbzg6nuipv7fo6nsqs5z7cvxsof0hbwt98e7tj2lpq9055b0mkyfqfb4al8fyssgjz0jmx7ynlqm39vdovv9qvdrv2',
                latitude: 173.66,
                longitude: 558.79,
                zoom: 17,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'drhbos7w',
                customCode: 'nze03920m3',
                name: 'qevrhj57avcwr0hh6ptryuo1jikgia57nb220emiqh313zpxwqiv5xeiji0firdb3v31gtjc6gu7zdeybi2wfxkfhx7pj4bdtix7xqyoyyqhii6c26ute9boook3uckahpbuhljjkos8jp0txk15ua8wrrjo4kx5ijiou44k89sixlo79w6r93qbwhlz530yq7fmi691fojedxnn6d6igkghrxdkz19xxy1mcpiraoi47mo2rvalggv0wwpc6rd',
                slug: 'fsjeiqi4ukxpkgobegdt4uz3mz4c76tl3qnvsczis5zvzt5dkgiwjjrf7vs2kmm4m54tqtz4xjbgblz1dxuguywluec449lwircwh8ihfb20edltkq4u1xfpydf5raozxheoylfoseyrye8ng0yo2qtzrjcezby14uyaevnx50zxt9kzvgv7mprvcn9ab81uvvfn405jcl0b5frz9vbd67s5q2wik0ubagr7l3llp8zjakasp7rarxfq6oqbbbc',
                latitude: 309.38,
                longitude: 498.59,
                zoom: 41,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: null,
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'wpmzzsrg',
                customCode: '9atx8cezvz',
                name: 'iqwstiumvfmqo7k41oj3tks2npr0a9547cpmd1p677gslq7fwzqtf79icp8cac7a3va1a7722l50p9cydkoft8xcnyjgg5o97bdyjvnmzsthmi4towano2f0a8na3t8wn8vbty2zudlt30lff6pnnbi03csgrv5okm69y8x5feauom6t5rhga0ewmcakpnq7xwcc0xgvoymgu882jlaywwk9cqhoe6ohyt2v0v731d67y500xe860vzvza8pmtn',
                slug: 'i7cd2hyeabpitc7q5a7byb9s9y3vsgdmsj2xx5m0za547z4mhlb4tu0x4emv5uf0pm43t897cclwtqkz4kq6iioilzut78kgs69086n6osmc1q6hiwq66gbeykw38xaq5p89knfx6gpdziaf0tbky7n6zjucwy1z9pwm8v1oqzprj7tsla04cet4w2ksf0qzlgs9vlnzhrv3wf0xkglex74u8wgnh30icfcizk5m04s4y0drn1fq9dg0q7lsjka',
                latitude: 730.53,
                longitude: 817.51,
                zoom: 32,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'v6jasveu',
                customCode: '89rn90gayr',
                name: 'yj3um4umv9lyct0yek398z9al6mkh0a0p3iq9l0uc3i4lp29m5i206zthtujlg2ygtvz8x0u3gf59xhpou3428s2oh3l0fyuw99skryryf4jzz40d8flawteppkmhmmjxw471kwa6p5gg6weyij1g199b8x3hpd2vabgnr7kwd2ya9wzdlmt43xnkd0x6fi0kg20fhxm8uoe8j6thcqtjvkau3fx82v0zuwilnbnltowo79y0ldzz8377snkk5e',
                slug: 'ph8q03qug4a96tekfj9clqrhrw0t57yut2avx1xyjwb5lw94tgw64dj9zx47j8vfkx89wsmwtul3bcjkb4yyqfntr297d30u1vn6j6fuffbxd0n2dncfrq0w2ol2jsveq2zpatixlppdrewp6tbfzqfizyspqtynrennz68bdqmph0rixg24km5ryrptovmcqr9smz9md543xkshkuzb0ne9akls57sgbty79lg1s664lwpx4ppb42ym9g86z9e',
                latitude: 778.54,
                longitude: 999.03,
                zoom: 59,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'm11y4sbg',
                customCode: 'nop10fikba',
                name: 'iygn0vfbt7kakxmk0fbrdjog6xags2b3gmcuzcbqxonapzr7257gwxcnxr8ukho6ut7amebhdv4jhwwbqha6hqispe13qwvzq0zzwvmfgkwfaqt7idth23d5i7ahqokmssp82veic4abbripw6te6zd3l67t1jfri69ry4x3h1oadgqzvmgxi0qorvf4fcm7aj6pmor1pa9jhodxcdgnbqjarosiw7ompd01crca9ywmeauhkjv19m2eie3s2om',
                slug: '78zv79mkrrhikgrkzc7j75fqr384ovzluiwjkm3l5n4aqdh6zumccno1s8nqk678czn85dxs5r0u4rds7xlrkzfwh6hkkfxm2f57flp4srzwhp582nw6wql2ssz05qpjh40lcqtgkawf07w92o797wqrihfhoq9bk293ghf29x83mtj99jdfw8z3bjrbk16sou6bblutuz6o6qwnjvgs0iqye9qwvm6oxu2meqnkp6g8mtthdcz6sqmwtfoqotv',
                latitude: 269.80,
                longitude: 472.97,
                zoom: 23,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'z2hb9psa',
                customCode: 't0vxkf1zpp',
                name: 'r9b6gw3kwmo8v896cfarqs2bjb1ucxqijebj5bmvqgizeu7y58qx0wdpo4m8pgc8p8kxtjcg4frpedxqiqe8um2lcblhlvffpweqprovuq9rgfy2u63g7poao7fj73kcsjlrtv1c3yy7gpqzzlyt5qtz8evjg2ynj16vdvt7rwsm4f77lckg64lxp3avs3xouo21j24o1iyt5cmr24js8x89jhvywpl13m7yuugfhk2uh2ibkie91c51s81wcu4',
                slug: '7se77han8l3rphqccx5ahasnob5gz2yw7qklt26hwvdjwwnaizd6hout7wttr9vwp70929pv494wpad2cjjq8lob2zdhctehcj5zvph3fg19wzp3tolu1q2kvb0832l1ezrinels241q6kquhcp99cvfqw4olmwepx7exhyfpj47b92c9wuwu9ew3ttwlkdom01c1qozxedmd2689cy84xeerjivth7f12wu2btfj4bz4qos2mm6il56t825pvi',
                latitude: 461.79,
                longitude: 83.10,
                zoom: 34,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: null,
                code: '9rywtbxx',
                customCode: 'y432bo7wx1',
                name: 'lnk65103byya6d1t9toygsyhsrru3xe494dm09ck853j40g89ryzx9nhl9cmnoyutuc70g3x12stj6kvgmhuwey32j4zbw1a1ydghjswt4pn96ef17fupidk15mj5uncsakdw4grlgtrprcxw2g5w0ubq753zp4lr7sjv322vnuhfmgsao5xdgancmd97qrxgisld3ibgc4f09sav15zu9vts943iur4wwfdpubr78n7y12s8kpzuy8zen77ybq',
                slug: 'yrf0720bbdiapeufkwhwkgpzlgtdsc10nuha63dsxg0tbtn0lbxd3p9pmqf6xzcic8w4ihz04wzsecss1s8z2jm69fdbx6e8m7u15zzu3r8i4ib7hqc96d64208fg786pmsu12m5o1gx0xu50xuupugzetm9vdbc71gn0gf9fodtewfuzj5ez9z01ow87ezy71oplhobui34mk46hdb9sotrvna1twk211w3yxr5l99ck8fh1xj1w3kvj73alqb',
                latitude: 321.56,
                longitude: 427.20,
                zoom: 82,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                
                code: '40iontce',
                customCode: 'nc5bae16e3',
                name: '1h46mro2u58xx3ha2q02rm3plcjdxg1efp8qb0yuh4fuqiorktfhhllsgyc1n46z8upup4rhsbxzdmcgh2vv710so4tr683pwpmopqmy1afrwqmbas8lie7mscmx9wzb1ntgxgbclvd55bp5wwjesr1jjn93n0ks25stmqngxjbebmqucxkvyxvalrbfudswmxvazacl0nxng2kk8nll7urzrce2p1jjahsp0te1y9cybp3e4z4jhs8liyy8f67',
                slug: 'hlctxohjjv6pogp1opzoix46catb3m5sd244iqlf6nrqvql416k3g1kxcljhzalob2osqviu07ywtxvuvvndf3koedibkogvkp0q4h55bvaw5no7d304bovlacddlfm5jddn73rhhj0l19m9pg8jngg5ycxtuy19cfypjvl9jg9cap1nhkl1jx0u28zi7cqnnqhbkx076n97nobp65r0n3c4vomtr2dcea0om0a4tvv4bmqulnhvope255sgdz8',
                latitude: 76.06,
                longitude: 103.93,
                zoom: 11,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: null,
                customCode: 'xdwj3rfw1o',
                name: 'qhovxki406jk8ljf0ucn2gyz2hia8z7xuoe1f8hcrnw1dc8bqpy665x7lwirgse9c8awxm1biebqigqcn5yijlnrkwsaotxx6y7s4pc1y9sgfukpd4mmozj4gqmi6tpt7fnyhgk88d7d9c29baie5pma3hdazsqhr67m85ilib6aa5c974fr3zgy7flpis1oxjicwz26a89i7jyec0nq27aiwek6pjuggwl2m22wx06sqlppdo9ch8m9u63r5jo',
                slug: '740v2ls3e7kjngroj1j38v71n5gqtfod7ywh4rs8p5m9l7e11qiv4e1yhyfaqo5jj8xwtax72tzqcfcw0r2h3459p6ntbr64ddb7qhd2lh39nthtnw4rc4601ysfg5hrftgtwk61ewt6znaob5oc6m36tcect8citpfuokb9tk72i60jh157qj1uv7ijj0s8d76sje45gmb57c02jj9b5q996vbg5elyy3b3ql72fs6dr8utd0mqwckz2h908vp',
                latitude: 984.08,
                longitude: 561.74,
                zoom: 18,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                
                customCode: '0ffgvlonu0',
                name: 'hzo72e939h1pt0f4nyuub3knpp0t04xede4i3q6pxfa8y6tk7eob9bdmj5fsqir4pa2ds0shimuwkprgut6dfz0p741nm2te7hhz37em0r8d9b07c574caozdl2uwm0v6zi5yy2mf7rl03osrn0tpm5admaxb91bajphvq6mpq7t8y8g0cer5mlmmihdoiyn6cepu8ncuakn61xrkz9vlpklx26u0fhd2sgj1tceupy5h5x1imai4bmw888j8fv',
                slug: 'shywbke1o2lgnw7w5bbe7id85iym6nj20urzlgtn2iq2pbbjmycwqglvy5dw2a31i7j6kdc4x5ak6oxlcbpnhavhvasqeg5yf9xavg3uvn7j5yzvly5moun9gfkoy8ng6t8akzgh59atqc3mmroxlh2u5qy0pdy21l05rmyl61ygshq0zbt5945wq6m3xzyzv6qu6uhttbpvdftsclvox948d77iyufrgr3zcvzl0wc9pdooh7n5o76x3yi3tc2',
                latitude: 562.68,
                longitude: 834.14,
                zoom: 62,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'ei17pmt2',
                customCode: 'r8se6ph2m6',
                name: null,
                slug: 'oqqkmm935gucrajebfjkmlk57m7jnb8ogijk2b6tbbl8qg8zx0m74v94mp2tjlrc9dftb4d2c3wq0tzqir5vfgqg9kphseb07kmdfe2jkxtmt22s51krgo40mlk7r028eci0a3pb5erc7eqnogwltnwjlk0t2w0k4soxxm5tpfd9eq4arfusc82uhv4kbp1m47uk666vaqk0ss88098dcefisd7ev56rbsmvryrkzt58hfcj3kozvxc1vbgaufh',
                latitude: 336.64,
                longitude: 275.91,
                zoom: 99,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: '6fd39onu',
                customCode: 'vv9krkda5s',
                
                slug: '0skj5bqltkzo1uh9vyj8n3pbttne2u0rfq9zear2udeadl29iobu5aw65vhodgg8kjkgcpsw7vwwd38m2w0bvcbo0th6qysh97qnff44ws3kns7zn2yk95wxz0u2z10g3nxb62s8b1ckg42bonjxakxclhb92h6e2n27uohqbjl87sjvktjmjs08pat1n7xn104k315jd339v03uxvnmtnslrzwy534m8xzvdm87zufhdanv6erw0rdlh8b63bi',
                latitude: 242.00,
                longitude: 759.49,
                zoom: 76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'y5ojvjvn',
                customCode: 'o0v13l9dxn',
                name: 'bz1yr0fwv6sloo2v0n0o8h7eljpzw3sczvvylqn0q68rscx0g8m9cfrtkdgu3o9cigaea1ych19kkkhridnlrf8szzvzmwkm7sjvpbgkgqynewiwjhkky48m5bvh2y7merec9bh9illjdb8guu7nss9d6gijjniqrr1sgkkgeeze8djdpc4nq6u728q0szw48owq9kmr2757v0j2hzs16kxs2v8tkbs9l0fzrtff5fphpxmd44e1tmsdix3pa1k',
                slug: null,
                latitude: 462.83,
                longitude: 148.50,
                zoom: 61,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'li4ypgf6',
                customCode: 'n6c5m1m0vd',
                name: 'w81fomm2npvll7s3cofxp24a4odedszc4ptqjoayoyyi857dbvro369kfzp2o6iipdgkwqk9wgus6lzptx040tw6zctpccvb4zljod0yjrc7fzz5dfhthi3x5vhic2rd70qkx7okpd6azisvim1jnlui77fpx4brtv4n6ov3uqhhfdcm0pqyjujw4nuir3ounc8yisj08g5vvkxv5b98q9k7jkuglc02o8prw0ywbnd1lo6up7fhcls33eomnc0',
                
                latitude: 251.80,
                longitude: 919.13,
                zoom: 99,
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
            .send({
                id: '4xy5bv5qxg7mt7z04na0021rup7jo68ti78qz',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'tp18x7of',
                customCode: 'b2m2uict6v',
                name: 'gmntuhnstebq61nwo4py5t0rky4w6n3lhjrwnvkwk9jye5peujcmp0ziddz3vnvou6owvl5za4v2b7fh31nbhy3q8o516yz5u02riv9p71jlv5n9u1y2d13c48s2aso5ut8e1vld5f9yibkswv29am97qcake4ld36hizamji15xal07do9243jsl8catm5ga2roauwmnggrwd0ikufqaieuuk9utm3u3w3z1d4f0iu6z8xut2jc10xayx44dol',
                slug: 'mmgafyu7d3143a0vbolyon8vs74268adon8merzhkwmsx3896nbvxcm5enxhi54nvsfikdykl8r1phjte1uq8s9ooh21l6h5fpqwbg55oypnm3kh02xouhjekug9gv416erhj38e649nx6k23j80av788ug19vqcexehfiwiugmlv8ocfm1wfgu9squ6tv8482drjuilyl01jffg6574flsw3nxw9cleby3npaau8u726gu7pf5bxgxe3cvb8x3',
                latitude: 827.25,
                longitude: 877.47,
                zoom: 17,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'pd2ja603mcxwdx24rbm5qxrnoebs69zzo7pjz',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'bqyem2a0',
                customCode: '0o4jmg7n1s',
                name: 'pcp5ox522o5yba5t1kqsq4xpvrz6s9hkylze8vc3patq1p06o6fw20bt78a04yptz3nxpxypbgypw77mh5yyspbqh7tsancet70wgdre4f52dwdooqll6w99gobdtoctxpgv4a4triqa95kfbgizw6sba2zc9tjcaub5ug1p58vf3agn7y401xbabq9ankh33v1s1zt2vxkn6f722wnexuutyjpudkl99x5o52bhm0peuzrcqf8haebucakr3nm',
                slug: '8t34m43kyusy7t8ptw4rr75j7j56ryejq80tjldn7f1mu4k235mlsw85kqq453slsd49vyeaocvy91pv3jo7q6n1gptbg24xf417c25hqnkt1nk8fj9ogqyse8kcfqqf1myx9lgqcr1yq4v1hrvpm0ufy3z5gqeu3v20da0o3pfnwvr6wz9wavaal7mehwiubr6dywv8li7b87imcwuyeyk9sh8qu90l3f3pxweews6lslk7f6iltjxc7itqpp0',
                latitude: 826.93,
                longitude: 795.18,
                zoom: 75,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'yv19xfl0er7gtyeocqfx4sa5pgkz6j27mt76x',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'x0vzay6b',
                customCode: '95n43ijvms',
                name: 'vro52pjzx9je8xb1tnz9erx5i89n9948a83xtiqykvibv6qh5gjngzqh7yocby3vta642go9m2elr7i6sym30waj9v3wk1uad40o153y9yh3i5htnzm7fhqlimwbzxajvpbhtyqqg7oiqj3o86d6hht14b08uwd71z5zkwrshyq5uc23bwpg3mra58cg54adh15ahdwq0nly0kitj802lkr5tt0gyzpu2fpzuf1sflk4hvmat6rcdcypusewzvx',
                slug: 'z8xxozksz09pb6kh4hlgumrunlnvoz2puelsdari7mven8t6c3rihq2w8kgb119yjgocnqrc0ajujqd08c5o9c1puypxax9ervq6cv5ptjscfrl98xpmly11tryq9roq2rnbnj61sgm6i3riu365j19h9hienvq0ccfb2f7dr9ewe49he0t6g4jlwq3mpmnbuc7apy1s6x9bkotuijkh90joudrygo6vqc8e1113onp5ok5k48hqsis67hiel72',
                latitude: 431.95,
                longitude: 935.06,
                zoom: 20,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: 'f28gyp4vxkqskd5cfx003bxxu9m8vayoc8d2l',
                code: 'latgz1pr',
                customCode: '52kys7wdos',
                name: 'zn0d89qe2sp6t90iiqegq1qxkulv5ft0qiwrfsddhpsw21no30c3yciesyfgafm6brpcul9xwhttsjs93stxd22yehao473cm9aotiw3waty6vkoq8buzc7y6ovrznmmdrpbc8hvjp7n2pvy1fyapwyqsbc5eifg4spacir76z48huqx9kxp5qchu2mb83kgrarkq6qm0ozy76w4mhxwvdc74e7urt83l6cvat0qdqe10ojuhi0pjlukuf1d0q1',
                slug: 'mi8l1bmaffdblscpzc1uxt8ebb69sfgl3nb388hu4gv3xjbsucleqpf5ws495mrfn5u22ul9x1h0nmvm4l894nyxyu3rrhfzbw242cu3dgiz3a16q0q7zlsinnxucr3ypmwhxinal3r5tteftnnnw3m9n7308nevfe8nha5v0ic3w36e3j3z7iw344l2jotzec1rdpu3je1heeozofv0bgxq650ect8sqa2wxzzc93rnzh97nget77jfjw4tvvy',
                latitude: 536.51,
                longitude: 918.02,
                zoom: 68,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 't4oirt4dv',
                customCode: '03xzxp59nb',
                name: 'l5h5h5ue4qav503bn9v8hajzp8rv4nnhj08xeasfgfzdgzmolo6thwx96zay5ajk01s2jrv1doarhyl2v1akm4rike0y2ql0jm6fl8xtn45fwlub3x2jf8kuj0czyi13lo9nmpw1adt9iai1noqgl8js24u7r7hg88aqiffnk2ds4lm5rljt7qzqz3e7j9y6a6byym3kf2lae86abmf2tevq52vwadp2hat1tet2n87c3m90nccykmgv71el9ev',
                slug: 'filbd95fintoibkg4cvw992pi63idpdj72e7ibuio0fwyt5vcntgk9he7iiimlwq319nlxjfnqtl88wdno3z15fpwp60ywgp5zxopujfindt99f6d1ov61w07win1f9gug57r4d0aqd4uzjx80owvouqckeprc4lmzss9v19uzvbepgmgukp2ozkflisdpdnvmr4da3sis3dmhw6euf1vm01jwga1uajm5fsgv3k97p13id91nvxzo0i2riw6wq',
                latitude: 892.85,
                longitude: 202.07,
                zoom: 40,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'wy5dw7t2',
                customCode: '9lg7daxw30o',
                name: 'lb2rtjuhh3gn3wuox10jnrfjq0r08c0tnsegvoaguqcnqbp3vtkci67hk8waygrp9x9q0piq1v54gxgx6ntmn0iju9zq9ftzn1h5djem479qrkg5u1j6w5mbxtxhujmaihx50iylsum1kk2ex7afsapf2i0ourp90tsf947f9cisw9fv7afgvheixt220yg0xvs0326h2n12km06xpfr3il6rk5xvoxsp3197pqcqnyv4du62y9zt2cq1fzc616',
                slug: 'jgean6dje205umdphq7idr8thvudyuxe01n9jmib3m7uupkggpnhqk2tvv16gj1a7pf8qkx30meyob8hu5v2qjz4rt3lnan1ywp66xuzm7t3o77dma1udohqlx4wxfv3sqvroxrqsufyy9lgrhszr95174yqpd5g1oqr7lj1kxw6w6jmwy1w1nggr138h61euqyg2zvko7ecc75j66wkeabl5rapc180d124l1z4172nrwh1r6dmn41yftz99ys',
                latitude: 651.63,
                longitude: 64.57,
                zoom: 58,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: '99fxff5z',
                customCode: 'jazaa0ft1o',
                name: 'itmuo2kshscva03qn95wztzdinkfpe3tlcxf76jh7yafz2a1dyik038wf08j3fjm1cfzhy12bj5g09dbcufjtaxyvptcx2ulmzv1fp0b6mwlm1gcl53lyulmtb9j6z657zbvo2zm6dp3zb3jhzukwn1er5riawcyqz74te144u051zaywyvxpt3rjds4gpf7ek9k9zpff5jdd8ucw54b3x6q5tqtsebkv6kschr6y4lrjlkzifxlcyegppmzbmxx',
                slug: 'ul0chau9s1t8rp01sq5omglva74lyotmc8vpqzio7ia2d5o34nwoqa5lvaa4gf892qaulr8jfhbd4eemuf66irouiybcqm6uf5puyw5q3uetb6s7ggzg4f0oouqzlaafemw2zb0nw2ih7ig6pqs202j8kt6y0h6hbtuu35mn8fuix5a65zclddwsd3i7h106spi06drw561ikaeovvdz0fv8di9p71zvt62eln6wzwmkyovevpyvymi7s6j85i8',
                latitude: 982.06,
                longitude: 264.25,
                zoom: 97,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: '8p3sldow',
                customCode: 'z4uesf1kat',
                name: '3mzc7eac8iwddj9epewcr9y66c2ks8eignexm9g9p8opx68jurg1vqat0u208hzhs8vr6xr91rja0wzs0k8hr8ot4jtp6vcbplvfcri2nnscyb5rs41yid4o3ottacdecop9bsbmkijbr2oo4mdvw7i452bo7rt9fokpltgci95cp57xumjzic55rgypw8c41aucvg5p1w5aco7u827c25p0hpsijv3e5ljrvwmgog9wzc8y9evbvkxgzmd9py9',
                slug: '2gjul5720sualk2cmoecyuy52zx56y6ho1o1nartkdc9vbmmrr5ymn6o894eofqfqb81ednes688ilfwwbpqen4b30gcrv3niijeyiipbg62chiyhy9th79mt3k112mi6y2rkw4t9a3te59lwpviy4h5em5mw02m29ykr0muylgphplvp39wl4by3tzlinmbwri2l1rmto1b3f595b4bbi8li90rlmm80qly5fd6fdgzs6elszp1h38lcax9s09l',
                latitude: 173.05,
                longitude: 819.90,
                zoom: 22,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: '0ns6uxt7',
                customCode: 'zxxou93yxq',
                name: '6rnronpvz3008j19s8eybtre9juxpvwkkl619rjaj9expdy429r3iy0gp1286g1haivod2z1ha5cobe72sa358os6vw2013a1yko6rm8iue5nvcnclu5zuc8mkjbp9wkdzlnfd4z39svs6c405ckrpy4s77b191c3k5jwrowy11b5dqs9v7qct1imipfew65x8v30ru22spsvuhprs5gm0dx9z2s2gny16rxe38cu3yiw3m5kjeiwx3oyw4ymn5',
                slug: 'yp3glsdap3l7megjd5u22u6fkbge1q0vmppvueje3a5bilck2ambureuw2i2zrq5bps2ignvd5179sq33ptyhbhpzfau12n4blw8fnuovsw24crauyq877iyo33h26ne1ja45mely2t9hogfp9oc5o03gnea7m9jzuepdshkxjv8rw1cqieytspqxcp5rcojttk04s2wpmi4vgrwzkb115dtwolfgz2xz7nzdb7ysz0bu4wv5uz6g08e8kyxks3',
                latitude: 399.04,
                longitude: 348.64,
                zoom: 56,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'rd1ji7xp',
                customCode: '8nbjyrkldh',
                name: '119hnm9spdi2fpui24ijzhnz6qqn4j60bg7eegeagg6djepcbsj5cz2dyehrma948che48wlrjn9wimscjftzq7jekkzsnoylgmaa99oej46dpwitelug0atkobx1z966qzvkcrcm4k9nho88iw6cn6wjc3bzgnialmu52dzbwi530y8fqgbwtfbcpgmk4ka2fvk8o38ms656lurwd9yjj2zu2w8cxltlrxpfg0a0lud21n5a1xqdpgjbpa8f4u',
                slug: '04pgratfltdob7nqj8ogqfk9zrolucmohjeffr0d2sstvdg9uc4dhefmzyjitu9vqo5aowxb6drs22eoa0tqgltmuwqcld0blao5r138tt2iolcs6j91nh3czjzu07axu59eyua0wwomfcdme0w16vcyxuyvk6t0r2kl0glxmdexb446zc3juame311o8l6mebyspokj8w365r0vx73tok2r8864w6kyq4bk7k2f8j9c554jpv2nmwp8y4q1go4',
                latitude: 264.69,
                longitude: 196.89,
                zoom: 49,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'qpkzs3nc',
                customCode: 'jt9hr1gkbp',
                name: 'cjvnb3jsjab68riameqvoopkmwe62oj72jgjllgal0jo09gp5nc43th3x33u974cfer2sntspe8cx4rhrptnvf4y8dhfoerga7y5yt9hn40olcwesup203qtdjw8waps5uefei88mmx5qdy2botbv43xl38va90kpu3j6o67q33gwjt0vtalj01p5otxorzuogh6hxmyovcmon08u7wufbebf1kxahvzi7sqj4na9l46ibam9kaq6f2tigfn70x',
                slug: '6kr05i0xp566j0bm2rt2qyterdrbc2cjaoe6f3fjb9z13so9msc5rh99a4svpo1p7qhi28vv42n4qys78zz8gc4df6qviw5kiy43hrfge0lytty9annct4kkpu95ht0vqa8c2su8sa1doebixbg8nsvckvrknj8e60kohehaz7ocgaiy3vh5new0xam8petk2elpuqqdxwdmvhubvm46e71tkrn14puz4yvt3ye7ndqetwi7g1s48uw5bfywh3u',
                latitude: 112.43,
                longitude: 464.04,
                zoom: 967,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'zal01tsw',
                customCode: 'lzp71u461f',
                name: 'o666ntx8ebmkzhdh0vx2vh68qlji2k1mniauza1xv1ycjfqkmgw8fe6m5lucfwz54vx26j94ygeiv8e9g29vs6wapano9mpwumgxbrmq7fa04txf2wv4jk5qyuldtalitaotpjeedi18sotqpqe9d9o42pzfmutgk1egegax6yeuc8btenz0wt3tdtmd0jicc07fiebvl9bvd9qij4rlanmrvyvwzhdomt91poedid6met337flhyq9np15upyp',
                slug: 'lc2vl0qir3z62nfx5a3i99wshfv4399iorpbrk4x2nafhfd439t1glhtxvf6acrx14lnsni7h1u2hqf2rkg3wa7we8t32brl8b4tjhvjxlnav0sonzle3p7uwqisp2in7u14jpzg3yj66hkw8av95ac83q1aaoh6fxqjelkr45bp9fd7rxybw3e23yix3rd8vdh8mwl9nkinyn1roqopfs3tnk5g25iwmzkzaowufd3vc87mk33foafos5dfnzr',
                latitude: 171.46,
                longitude: 363.08,
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
            .send({
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'nyzhwgk6',
                customCode: '339hvb158d',
                name: '2j244xnd5rp2ae5lxmtii92rijgsb3rnp589roceojiikcbwmi5la3yh6iq4beo1vo9zosixwruzbirban1uhxjtcapz4cma3f3vknfg8klyfgpssw1pwicz2w1egbvlnjqum9r4ebhuflkag0xreclu86uaezd92igyi6oe6060idg5dom778w1izyuih69vwsgem01zt4rrix8jepv9hsgjwxry6j291pgjd49u9m070gtpbvjdj19vo4fdd9',
                slug: 'i2wlcnyek3gbfpgzg89c86r5nqho4t1uaadecgeqaudu5nfbeviwctv8apobjue469i4ojulasdno9lz7hifpnxompxl5k2aqaly3kvhih2vwv7obqusncrj56gtofuvm7gt2pfc8egr4ilsu1iigfjkdl44rw974u7xk74irsxem9h2ivnpmlwd9ut6jyzw3kzasxgk0c8ee7m572odge54j3vyeb0chwkbu9mcbdt4p9gfsnjqb0cjwqvb8ea',
                latitude: 833.21,
                longitude: 378.53,
                zoom: 38,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-3/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3/paginate')
            .set('Accept', 'application/json')
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd668f991-3910-4650-80b1-40390ac6bf4f'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'db6eabdf-b857-4197-a255-7291f07eda76'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'db6eabdf-b857-4197-a255-7291f07eda76'));
    });

    test(`/REST:GET admin/administrative-area-level-3/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/6246bd9b-8b2d-4a57-8062-7aa4430f8551')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/db6eabdf-b857-4197-a255-7291f07eda76')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db6eabdf-b857-4197-a255-7291f07eda76'));
    });

    test(`/REST:GET admin/administrative-areas-level-3`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-3 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                
                id: '963f9cb8-84af-49d9-b386-0ec5a30a7945',
                countryCommonId: '4d9da707-71f8-465c-bbed-c5ded1b94d0f',
                administrativeAreaLevel1Id: '5d53aeca-0fb0-483d-a8d1-594eaef64df7',
                administrativeAreaLevel2Id: '091d0625-272c-4476-900c-0d87e4c09d66',
                code: 'c8zf9qtm',
                customCode: 'o1bedtpp58',
                name: 'npyle3nmcse1azc0s93p5ih7sbzgj11zm6dwrxp989hr14idhuoh97ud2yzqjoqlvbq3qn8undprjmprntgq1p4r9j0lsinju09pz7t04nrrsz4eei072wb0lsea3qxn3d3w3463cofh6qiwa9twg22x73jt2lh3maictcg4yxogbrv0xk0w4s5vmke7zsdeyutjqhdatjyfx1twqo46b81dsa9wak37th80tq4qm1z1bip1bqpnalow20ipj8d',
                slug: 'neraqc1yukk6ouri33ueceybl9gyby823ch0jorn9bpdto0zy964ejegud1vbsihmu61e7femgybt3pg8vj93pr036v0vedjldphd07zwzq6odulpkjwky9jdspvoy1apdkl47aiisxtuos7smeihmhi7mxdq4cpfi0c7awpgrgo9jka8cqlkyteanxev5nobbmv7o0azwhbteitk0eckngr586o99lj3tp1aofijnnyx3tdao67mg3baaihjo5',
                latitude: 306.34,
                longitude: 800.92,
                zoom: 12,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-3`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                
                id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                code: 'bqd2zqnl',
                customCode: 'gyglvvub1g',
                name: 'noy35d8bwk6nws9bld277wvceu9nnw6kl4z4kwtxfv5be7e8xg1e5b33xp4n8t2le76x4v4akwr3wvh7j9q1diygdnjlws6o2c1tsqglrxbbfzpkc4452nlwestaudthub0xbbl37yag277li4ql6jqigc9kquxhxjr5tajbt992fr73s1xlh5ty7dsk2m9w5vltk2v28j576ihuld557ck3ufcaaot7k4wvxt33q8wx7kwnrf7acrprptndmz2',
                slug: 'd8rxukbc24c4ljkhaejuetc2s5xxegr0cbiauiadbr2jixc6xt8u1fbhd43hbvgaf4fjq4xz9qqxaex34xcye8fd5ey3udnl4qtdrfdv2wr5w3hr1qf5lt6a1e1drlsiqufz64yh4l6hq0x7uf7dasos797f2avzdav4ae1tefgldlpionuy1ttgthj0oxhnofaib6b8lj4nd8ortlieixxy4le8zpc1rk9blg181du5rj2f97qr9lu9l0cthkk',
                latitude: 996.37,
                longitude: 412.81,
                zoom: 61,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db6eabdf-b857-4197-a255-7291f07eda76'));
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/33530f59-8e94-4835-92e5-5e45d2f57687')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/db6eabdf-b857-4197-a255-7291f07eda76')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel3 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '83daf31e-e78a-46c0-ad06-b5f496395694',
                        countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                        administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                        administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                        code: 'bshdm0eh',
                        customCode: 'zgocxfelje',
                        name: 'hp3xb5744m5y7roddwvsu4gwkvhpnuias3hxw56070ihafrt2830bk0nvb9nqd0my8771bcy9433q31jx324hs6fba4b6zg3gi6t0x9kr0k5b5e8xu7trgne6dfynliz0zfzo8v8jujk9th59o8usx6bzrbypvdo3mre2y8xu6y3lpcx438xk3e88zm03jy9mlx03o12xrgmia5fs34wfsnr4ilysj9ulr05vcm4au73z6mb5wbaz54ln0u88g4',
                        slug: '3jda9nkl0gx7c9z44jlzxgh2uajz2c7v60b3je9xsv5zv5xw12r1qpr5pbcycfeqxku3mroy8cu9opszt7g3w0edbkwa1pi7jiw4yv16eqekf4qhg4it1955jlf84ppbm7wibdkunn8erjr5ikr0qizse66bdlaw8r8mql626tf5mfglt0xhleq9tp1ajkaly92fx5wlu72fg9ep3kwu8uppjzxob8uce9ivefas5f8yf5tn61pwekkuz1ym5mv',
                        latitude: 52.22,
                        longitude: 948.58,
                        zoom: 84,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel3).toHaveProperty('id', '83daf31e-e78a-46c0-ad06-b5f496395694');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel3`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '638ce80c-8b4e-49b6-8aa3-9d8b9eef7ce6'
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
                            id: 'db6eabdf-b857-4197-a255-7291f07eda76'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3.id).toStrictEqual('db6eabdf-b857-4197-a255-7291f07eda76');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'cb508fd3-8beb-4fc6-bf63-3ab781bc851d'
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
                    id: 'db6eabdf-b857-4197-a255-7291f07eda76'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3ById.id).toStrictEqual('db6eabdf-b857-4197-a255-7291f07eda76');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel3`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '038a4e51-30ef-4fcc-8733-156d91c045c5',
                        countryCommonId: '7109949c-14f5-4102-b316-b1bbaf16e136',
                        administrativeAreaLevel1Id: '94a3d567-6ef5-4902-8098-8433844ad496',
                        administrativeAreaLevel2Id: 'f21bd16e-a1fd-4740-be99-e410af4861ab',
                        code: 'mdgb8nu7',
                        customCode: 'vucbc1tvd2',
                        name: 'gltfigl642fudoala8347bfdnrpecib36cffn7ssbh4pcn18lfue1iwerye73eoa5iwbofv8b7nfyvumzo8gts5c69v4p94ib226alntm2ht2yi245skg3hpfaned2lrkt73iylb0ktllyqzhtvmj52b78kstxbflyhb0as7z9kgggp0pfkx6ge0lw1hb2s4h8esuhl52r4syp1v6hbsm5nggt7jmoblnnaspgarnezi8obliepu51c2o2elf6q',
                        slug: '18fs39asdynztie6kvzxcmyx5wpfygs8sqldkhyluouy8fw9cf38qmjwdcwr1upvv3nql57toro3peyl32eo6ciyxivtcdoym6t2pnrhjky0pgwtxwrgcf6j9pxwenlctoq5a916cjhyq2zqfw45p4x047xeql8ts8l45xvis2vu5049c2k8zqlpizta1hdbdiw6mvhw56bmbp9nt1mk6u8yii8swbyuu15ekfdmcfl84zgz6gepm124f3ics2t',
                        latitude: 641.53,
                        longitude: 494.75,
                        zoom: 68,
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
                        
                        id: 'db6eabdf-b857-4197-a255-7291f07eda76',
                        countryCommonId: 'ef977582-dd4f-4327-9173-92f69b65cf8e',
                        administrativeAreaLevel1Id: 'f1227150-5ab2-4417-8dfc-8d02ce296fa1',
                        administrativeAreaLevel2Id: '41e64522-debe-41d0-9f8a-db9e3b433c06',
                        code: 'se3o5yy9',
                        customCode: 'fko8406tmj',
                        name: 'tt8t6ge666j0v1k2uso5da30357brpa6xu6k262ipjmiu8q7bplg0w0n3hj8oecpg2ru7qeulyqky0z42qwrewkntxc4yw92gr5ky5tr67zzzccpyvv5eabx0n53urjzknfjkgcjeui4xpc1unrrywlx0h8h4nrj5k9vmsl14zizsdi4ygwqegl3r9q8dot174nvl98ke0wdijmyhcs9en522oom5fzk9g8iesws43o111y0tk59khnnzie15ub',
                        slug: 're1fn7gwzl9drljgtwaxanb8zwi5ol3xv1df1qq0e3xlxtigfwf14r2x6axtjny3aln77up6dlo44wi4i7ml2jldadroumqr2acn8mvcvthjq5qx13v3zm9x59s911xh9gic4kvysgd0xeq6rhdqzziv1iiz81ws8g03a2jkvj717s7gnzq9frj348k0wesvuqfjtbyex7v6znxqlrweetaes3fht540axovjjkuq26sybr08xn6jucmsrtp6ou',
                        latitude: 834.95,
                        longitude: 111.59,
                        zoom: 29,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel3.id).toStrictEqual('db6eabdf-b857-4197-a255-7291f07eda76');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel3ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '15414c6c-776c-4cdf-90db-7445220bec8a'
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
                    id: 'db6eabdf-b857-4197-a255-7291f07eda76'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('db6eabdf-b857-4197-a255-7291f07eda76');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});