import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

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
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '69exb2cs',
                customCode: '5k6ryuh5pg',
                name: '4s159yin5kshg2vh7bozp2uxxkcg1ycu8i15w8vdsusp7zvod649le8jmde2bjz1wc4fgvzrv6cmes7ms2tbeocnhz4czqmenl931cct5uxza74fpmrma2pxr2o9g2a7c0vtxbol016oq2buot35c6s8szy0r4d8k51fsdt2vwg5v0a0bove7dsbr8kk9zqlmjlmwjrxnn1m8e1jg4lnxd5vld1vy5q3pqbc8oscy5lxmqjbdc3262teyndhlpz',
                slug: '23p21dhl4vss1ysc06d47rasyylqcatgecziskkee3fnug1c4466o2l8td43349miebqbyzot1qij9mjbbkfpbzrbnmf709mc47b7yc6boeiuwt5jk50n5mc2upclspo1adynhsu19t95mwvzmhmiokc38fyfnwvekfb0x9tzcinfq7g6mz972v3mq4sf6iq8rwdp29yk83w8niwbpba9xt7z3an7mxzyxb96c5ldz5dx1astz8y3v3ycsv9grs',
                latitude: 204.57,
                longitude: 57.64,
                zoom: 50,
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
                
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'eqi0zmlu',
                customCode: 'y5yezfqazu',
                name: 'wofrd8xm7v1llye7qdwetdfht2az4z9mytiip59bnok0kkrz2auoz9375qpefer46i8azfuwlffltnstyn3bpkj8qkdnu1315yi581v4y97cv0eecth0ntyboltzqpj55xy90ker1h1kec5zb28ogm9kyf6gp9vw7sva9k4kpbf08b2fgq9z8p0lq49bsshfakk4n7ja4u1vzuzqfzqfr6cx0v3vxm3691digovkxsurvnhjownhy2mkqpbaozc',
                slug: 'st7sovxoklch7dbk1cmc7lygw0ko1w33h9d388fnqgz6zc5a1ro7y7l9hs1efmgn3r8tz4dk4i152l06eaceunapobf73dpiog3x8vsgoyk3nwmwdtdail9r5gzn5ndbqo2i6bp2w44irvv9ayv8bfp5dtmk9gt2i4nmju6qqatylophj8zpu8bspowkgl8f6gs2u7mb40vcecqy6fsw0q8ohwyu6ibvw0emajkdkduridmsrq9c7n4onplrmq4',
                latitude: 855.88,
                longitude: 101.08,
                zoom: 26,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: null,
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'r96hi8kc',
                customCode: '24n3ezqfc7',
                name: '11wxill6nslphhpcrle3aijbijz0l2iiwcu4y6a3r76vi21e60u8d6w7g27bi9iovmya1y3amues3czpe4vg7zclp5nz44s71hb6w53k0npod8rewkiuru4r6wuufg787a9c390y8sp2140n5hfacrffz6glh7bbrd3xqsmbwcujsryy1np19th1djdcr8tlppith8h1kepgg6w7478940dr1za35xcjgszs802tfcd4rksd9lnsjp388ugup97',
                slug: '3q88hfmjbrxqt567lkkmqup23hytayiik57j8gl04el6g782z8j02v044bim8awt8tv7db712wd2v4c8zai1aurg5vgdja6tydwr4gmg7arw52y5voiutgn5suzscyady4tqzm7gduticuapicco9jpiqlkpd7qd6q7bla61dz5uc61lu97i0tzm7smee8mvmp5s1xa2w479qat5d5gei5cnwnh8k3pdrpaqr04zdainqfo19brxs24nzc90obl',
                latitude: 237.55,
                longitude: 613.94,
                zoom: 31,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'bvsn4h7k',
                customCode: 'zvorug5ndv',
                name: 't4hlmld0qd3tupm1p3pstm7sspzmpkd035rer878bvsj13xjwjtrjtstxdinrbtzx4swvqhsg5uw0gpkfat77qu9zw7em1edjmubndurwkq6otwuoifzukgt138420oec2g88d8l24fdyygmyjip9jq1kmnlts3q9t7uuqbyxsf9h0dv2ba1p24phprsgqqeupcd5c7oc0sbb4fdhekilavodroyia5a2ypwep8tky9likcst71ippzqfrlatab',
                slug: 'twjc9a1d9odk4gziqkjj8t4uqpdffoiep1mg8fjgbnrp14cpuzcl3rg6wr2visaj7qi7ggm11igqa9ptzbovpswmcyhkzcfq260erdzk2aub8eh0krzr4k36jc1l14svaflqr52g7uj5vq79o2hue9z6ioknocaokykp5v9pevh6om3i60zl5ouukjgu3bwed8ubyyhqrojrtqfsykrrka6az1nkgrc7ycv1of8noyn1bklong50t2gc90dulq1',
                latitude: 590.91,
                longitude: 532.33,
                zoom: 96,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'a2wrb9ni',
                customCode: '57477sz187',
                name: 'xupuiobq5fudqz3dtsr624l4m7pginwz2fwvl5manrrdbka19tiu1ek36wgp07npqq0nr5aashy9282m2qi45x2q9c65qqhjlj7yvt8xlpng3i1o9exstxp5l10ph259rzeb9ykskwzeacvx1k3ls1pgtw245jayyslulrkbueppmgo00zvrq88jybd89pkcsitq7rqc8e6a9kbjddk795r18nn4ifx6zzz57djv1oim7cjj1fryk4x8h1f62pw',
                slug: 'mw3ah3pgscpgdx9jy4mqjuvi3yybyymlx3t1n0y4qo0tub9th5dsn6iyh6l3hl9fq8izh9a18mt0dh0qvi5gpxk3fy6wlgo9m8illun1tgswp2y4wftffoetxkajnf9g2cwam2qxwf7v6pfmecqqi85qeeca0xh13iah6xj73aefrodcil2du2t83a73c318xr3x0sih7pl8kopw1v2vgkql7xkbs3z4f3ra92j4obky61cz6orzc6ix2o4zf2s',
                latitude: 810.75,
                longitude: 732.15,
                zoom: 64,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '7auqd7wh',
                customCode: 'dfgerh3h4y',
                name: 'fob4gg17tqi9stv3p0w4st99nxt6bm0wztjjtds89umm5ueklx8oycmdy7jndxgxmxuvzintogoh380gyb6cafmj68mj4ua9c9clvzdize3jgcsp2zlqi8y340fxxhv9ldumebjst64dqvr8a4i2k2x28q58qm5y2m09uj85avxoivqoh93jqrfto88vzfmxi852esjqt0vm5o1k7e7g68f7hoclokptz3r8p3ykgyj3qe0124oucq7eqs5xb3v',
                slug: 'ldgxeuunlat24aznrf1lj9uuw95k5x9di4l1b5r6vfcwvh8bhn37z6jxjkgeu4nm6mioxrqvsmtr7uucx4j1u4chjski4uyulbd6alyfcyya2vg76vrlbq9q38hbxzfdura91hsei577vrj3la4jm588k8mhxgopb64drr46j11cqxg2gb35coiwvpf1cz6ekbt9ft3ogp02zphe7xh8i4d4vlreqdqbujt72ogapt9jhhi8wms65e3anwtlkzg',
                latitude: 41.54,
                longitude: 782.18,
                zoom: 35,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: null,
                code: '9tbl6ppp',
                customCode: 'r3y1lvvsl7',
                name: 'najw0fnh4sxlg1l87j7omqb0f35j95qbb32j2rind7a7yp42d3kptolmsa0lcss3ca2lkke53kfmgzfazsvasgmoh104ytip06luhgpncbyekdklnt2nl3cx2hbajex4dymgb93egnkq6h8ouj6n4e48ayhf81qga01o934obh4633pda68quhq0yyoyfqkalrn7w7qzj1azttr1zst6wyg7ik0poy2i9km9cqj59zidzpohjnwgdz4ay9d8muo',
                slug: 'b0bcmjh7nrwtopxy1rbuwlccssrmlwciwerb9ksgpg86wlw1xasfnxq1m3bdncg1eftgdpq9k4u6avhort9c1z6chn5sysse4o00qzfp8yq22dwkqguaeikofuy6yq8gvp4mxtmxgnpzqrxdnnemiuda52hqk2ssdzzfoz2he657tde17fgj2uavlkshgfpd7ytt05tf462idez10hgnfez9hjzfb3rcefda7lxr7svw959u96383h35i8lbaal',
                latitude: 629.15,
                longitude: 283.18,
                zoom: 68,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                
                code: 'jscdj17c',
                customCode: 'e28xezbbxw',
                name: 'mv9n9talapl9ma1k8qcpsjivrmrguby5sh0ve08rbpav0oxbbvbl97r846h0gomhdab1juwj34rvpi5azfrqmthi2bkuctu4e2qadvwvpt3t0491y5behw0z68u6ao4a51z55x9z57ci68asu4mcxlaf9bmq4rszm190diq8x5mvq4pygk92sgrmiktc8msjp7x3cyz2v75c50po7hrh6x3k2d9q1vp5ykbc0j87gz3nc99gzhysk2ci54tb9xf',
                slug: 'rve4lmbotrx6ii9mpllyv01lb154lwjuiaig83g3zwc2zg5avlq9r8l2iljyzml60lgnqs4tij5zk7hqwohpbv8pzn14tbxid3l8vd6znoeob0b2yqgw1htjgur0kydywc7uzyh6rpphumw7lwkkjbvao5cvoxvx9bxr3pt0xmrrr15oiehq0xtss67ctdknay9sqai8nehk462vyzx2r1s2uuh92uewam1iqd2h6r7vpi4o06ffwvwfl91tp1v',
                latitude: 162.06,
                longitude: 494.76,
                zoom: 27,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: null,
                customCode: '8osgrq2usd',
                name: 'e2ycpwt2z9nd8nqhj69v62pmxtnu3ymn5hnhje9hhgsg25m85xiu1j0h12388j9qpr5b15xdnbe9d4vc3fvqc5qf2mi9yffmaqovrgxcwg42lw21g0fnrmyi8nwj82t898rostfvqizo0sjv3w7nc70bvike7wjm6vb1mdmcl2prp8p57vqxdg9wetgpfg7uql3p9qveuetxhqm8hq0fhe39yhdrgqrwlgw8shez5ct5lgiwcrljxkpe60x19bu',
                slug: 'tk08pbm25jzc5zyn2n8eip0giygtpuyp103u2idxdpu0be4z3fnrng8h7q10c0yg1ihr8ynquqouu2rhlbkniiqf1rf292yxat2infj3ml34bvb52gr6r230go0uzttfdz3tl5r1ug6ikzy7wddzrpk7gtlszagm0gjwf82dyxmeon8luuembycl6sq1ha1aeozphsbnp0d9wiejx9a68g8u7imr6eihxi7m10j54u1lwa08f467oh0ml7rx6f5',
                latitude: 412.19,
                longitude: 662.14,
                zoom: 93,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                
                customCode: 'g5adjea8ta',
                name: 'i1t7gwbzwb00ey3qyu7lpk5bqn7jjf1bz2v7ev3o9i642n9x7q6qywwtzirk3601gk4x0sp8ewtdp05hs3ydehnris88dnegyf7z9iioigc8vk5ojjy5kultwftjj22tx1xuenu15oehkbgb1zkr4gv3jh9gnha2m45nlkzccf1udwx495acrhe5w6tjn7x41v80z760qyrhbizysxlhiowlh16rdzredo2lqyhtr9cduhtls24s6h2lkz5tavc',
                slug: 'l9yxqs1ki5sb1lcw0gbsk76ykijmc7ty8ubda52jfck59duhj06lqvl57b8gl6rgzv4b72ualwjtf6i0j005doaqouedzpx8dx8qx46jkgvezwgdc6luyykypz21ebqn4kr5ntbkrceejh3spcy1qmo6ec6pd1p9cjhbaba3atqdwljawhev1fay532zy4s8etu377q57j3kolop107cj9c82rbfvzyg7igjn7nhps301zcsbxb9qzm3kr39zmp',
                latitude: 667.25,
                longitude: 437.01,
                zoom: 23,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '59ar0lwr',
                customCode: 'wf2l0xo1du',
                name: null,
                slug: 'q6sjr2zgpr78d9svfu2p5zhedt36qlsa5qcl9qtjhafoi47z2rspoj28n64u7gbxz4845yilhbvyui04dfawjgd4wyphsosfkeobnwz6w7tc10tkymex5xr7pqg5qjnctugf48jnu1vgh779svud7tnturf91cvjidm1tyw3rfhdfmqbft6z44exsee1rxj314aii63a44camkd9f67edd44wx0z4vqmfv60beyi3ziryn3mm8yuzltg4rg5w4c',
                latitude: 231.02,
                longitude: 192.90,
                zoom: 53,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'glvoq1b1',
                customCode: '8cy84mqb1k',
                
                slug: 'txdotq0spqe5x7wrkcva5pze4lhm0yxhd1zlfa4obtpj30e9kvfsnupaob21xm3snq4a5k6hrlkymzg74tfk1b4fakhy3g5e11yn4doh67cvgas5t0v2bclec5jbncgmnbt0w5nr0skq3gl1mi31hijkmtxwyurorave0y4uf9tsbi7xsh4jih2yntzw9dk6fbw84ikleaphczcqshcmjt0z8370sqrwzogi0o7naoykqgsuo63brmgwa3vvdbu',
                latitude: 169.28,
                longitude: 540.95,
                zoom: 12,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '1t8sfupg',
                customCode: '69zzle3qbq',
                name: 'g4y29alixxpkvdmqumgk1ywnnc190z50zoaz60c9j4bm90zlidetrr5leiaz1gb8vpm9e5m5gig5wnqrxzyolevw5vps0a6hn39xi8rlqgcfsfz64f5i83go6oi0fcnzk4o9cwoo136bxeip1fxyhn8wupwleuluca0n0oeniaj6ifh528oghihh99qfhekpbji9vvx65twaa28bd0w0vr1qtqrvmk9198lagyjudhyz7oh20okik4yj3s5o5yo',
                slug: null,
                latitude: 531.92,
                longitude: 908.48,
                zoom: 31,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '8uddy47s',
                customCode: 'omh3n56gfg',
                name: '1uj1m05d875ue58wtgha2mn9pwfqg4lgr1ssafd79l1m7edbxtlbpo8hzlmhbb55dnc3hb8q7kw2zr7tgu73w3klbiydxhnd6d6730i3r6dqpsnnoy2c8g7ff746c3jzq07aqzc5x9mcxksm97rqyfqllxgeuhdk28hhab27my2fcyinn459ubtx0yrnt8bcxu3e36n603a8v96gxzxcds5farhjn15b7xigpnhpu7fxbezl905ffdy8xdbcah6',
                
                latitude: 40.09,
                longitude: 585.56,
                zoom: 69,
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
                id: 'tewbukc7t0smutgo38jh5r5uvh950mjydu647',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'klcur0jq',
                customCode: 'qg4abbxsjj',
                name: 'tw3f4zm9dhrofy123bz4mcurgfql24jqy9ems196dd3v1hkze9jewjxa0fv1mt44e0gm03foz3c8p95xpjevleb020nee44fhuhp2jnsyhp179inttz151tqtgttjr9sdp57b4a1uognndy6hvqfnwpq698xuycs2vwwnc9q6pw3go9dhpsz52o1ayxgji25xqdig1aldeibaymvzy8m24wi8uh24lrid82wp4imji7li3jo5ofomr8a4q5f2fp',
                slug: '74uma3h76tw9yhqzckectwm2yn45yhmq8wftu90mm5tsrl1abprorvi6p8iv8uye4ww3ktxc8hh26ltwtcaoeppj9fa40fo4ukm4eyh1vqtv6c65zyug84941pnzlp86vufyk8ujerpb73lac9izryb5rcxgxk8mnfvuyvkc1342ig6vkskbmodzk8031zks4pbai4zka7yjom5lbbpzkqe6r8xx72xegct5hsupudpk8h9c7mqo9uaffbqwqu0',
                latitude: 172.13,
                longitude: 386.01,
                zoom: 13,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '82b3r66ikyfvxg1tz9fcrfepmvvtitpyyzclx',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'n3veuvuq',
                customCode: '6hdmsqpa14',
                name: 'ui4f9kwthdkuclb8yivp79o5wfdo5ctxcaasdjnp0ncjhml0xt1m4l8guaoshwndl6s78r8zqgy1vy7lx83o46kcxp2zbxwu3o415kb8lo168no72h5ht8hy8r2us8ipy91zh8456mrcxa2ayna66pjq0oc4p3puolh3mmzl1ot5frwcjsb5lmbtr6f9mskf1e27h81c5t3f2c8yrdntrrwwendszrqc2aeiwrehufri0it3u450w32dptmoe2y',
                slug: '0xz54tfywpknrmmb8xcx74oi2mrdq0jxp1t94sbve6ube3n34xx4uvyafurj68irg4byx2chslcueo9s6x3f7g1y6c5a6fmqi2k4blz52gkrb85g1h00qmjbhvk13lraa459w5035rpratfaiwbskmbyt978rt5ysko5o89o6nhqzgd3qa4j24v8es3z5neka3fajdt1c3yrsgwfjz5ecqbwtbeoceuwrugw4kj65ur7q03u7xkjnwb1afveoyy',
                latitude: 286.35,
                longitude: 988.62,
                zoom: 62,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'b5whcqt2p7t7mie1g3wbm6zc1smycsr1jm1s5',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '3u0iucd1',
                customCode: 'x5znglglu4',
                name: 'p83jij1djb9vjycxanzkpstuuvc4e86rafo0ir513fobqaooczxm41g8ahfo3yrtg80194rqp5nu3zwu8dc6mr2alspq45jpjddo84klxfbi41xoimmn56nv42exn7ff2mhpvxdbjgxwbijsvudddldqwn09haipoo7wqfcix9yp718orzrscs0mlwpcepg05s82lwf5fvfjihdc9d8se2wl43ytmm81dd4tze3lyd8cgol3h2s9il9w1714ncn',
                slug: 'tbur758l3p1k98mxcmftp5inhsj80e8gqea0oa8zkh2pobcj6dacpkr1qrloo3zq0r444xlxapufflf45ju5xch87c14uevh1pmkjnca95m7ddcdy8mn6ajtcta9oy1mjrk7jcw6xrvi03344iu1nzh5nncosgix9p6cc7q0hvsqjvmec1d9l184sqr7zbdekul7tsjzlpy3s85r7hqmwel7vn26b1012sw681o86bigdahx81d7s3b1udwieo0',
                latitude: 137.12,
                longitude: 535.22,
                zoom: 91,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'rfqm5jjz3jqunkjt0fg4146inctrm0imlln26',
                code: 't20c70mo',
                customCode: 'w5q2dyz89o',
                name: 'bwaf2lti9ddebytiecu858wpv5086wey34k321x3ui5bjyxbpu9ipzilya7lgt6h7coga0orwjrl9185zi0k4s1cmkfnlnoqtbjuimrhddsi3nviyiuthn9fbuuru1z7lafrl2zk3e7nw1m40b7cud61uwl604l6mpma9mewkit2xc0njdrjwh1s3th5of5n1uth2dqzs1nes9eox72jkbh3sb9hwwfv32coir028x5jhbsfy691b70xztvcvh6',
                slug: 'ji5sw2qdh4rp8yk118tzs5ixzlxcrylnnbptezchfawo03qp8d75s3khxa8wqd42j58yxp6ce7vixiq42u28h0gnzybx2lbiemwhutwlahmq30msku925i2zmf0usmx7quq93oq8gpmp5jgszd25487xvuy03n1ew3p9amwk1pi1mgvcwy5q85gptcdy7lwbr8n86ne9hyben4a1l4ev5nbpnuedq3913afzmoxyhrnr6wp449s8e28g3pk9iuq',
                latitude: 477.43,
                longitude: 157.59,
                zoom: 74,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'bxq6fn8p8',
                customCode: 't3od6dsxx9',
                name: 'sgdfm9ke69f724bhsfagyo9364gpqshwuonpu7hp9uzdtvxhcd2ffg9wbhj1859dva6voo9qin6gln9goxsuyecy01qxksct7e2ob0irsr82xbp8fnyrh4h6pr59mu7o0qk0pmhs4sjld01seogm58jr7akd1mptueovafkvxg1muhr630ltf24y41tf4bqiezzhigboxb8e949dkdm90etia37z73bgk1mykf68eibez0osifodrimshxlya5g',
                slug: '6ngmb7r7cyfo1mbbudm5bsek4r88jmxori709q624cidqcw0xdx9mgwt8cnu2u568ehqjgwnl2dabnhtpujhe0q2rug3opifna4x7rof5e86927qgtd8r12xwrmkqc21pu6xjzbu1wqa57xnwvci4vcyiznujdx64llilc2yblwavmsto4a9z6l0z7nfpvqits2rx52v91vgfzyqabuko1dv4r36pa8w3mgfdpvip182mmi009f8q039a09k3g9',
                latitude: 632.69,
                longitude: 367.44,
                zoom: 41,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 't5wk2mx1',
                customCode: 'r9veno82156',
                name: '7lqc13du4zvph23rhbw2qgo644o3rqe1giu0pqz73b1te3g250ddf405mb99ej5k3drx71uy7ie4rylybo96h6aguzdr8rp86cbvyl4utcxe95c6vfexrez28ump4rmhplt0x013l4139b13663mk6u7j903a9n9zgiu568m515yknv3b7qb9jhtdt73vkgb8dd96re2pgdb5ue33pgn3mk8ai6rk2osgqu4jyn6cfsk815o15vqzfglqrwbuq6',
                slug: 'ikerozzqvtncmj8pu0rgsm8cw1nxqz4y51e6gpe5g4h4u92p1e0bj6751ipts88qhwep2axitbdb0peae7gbhqx7crby6amufpskoexidns75eoxrf12jctimjapmxmzl0oqeq09vay8rn2ros3sq7m4r2ymw8rfbty08ph41b2vzyzvrjmf7mg62ziyhqx8rrsnk0qtdk43zqpz8pgmrg1zgesn9wdfarvkwf6y9pe1ds0m3f40f2ugsm8ym80',
                latitude: 526.05,
                longitude: 427.10,
                zoom: 19,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'ib6fk5e2',
                customCode: '87v1kqi394',
                name: 'ithdtvn1wtbiynuuw4oxno23sk49natah823xg19frai9kil84krxl1h541v4i0xemr0xumev3bwhcxr9z1l825rhg2fjthtnpcxf9fdw4x3po6jrwbtrq1se90nxvqn0rnq5exz4ztmuvdrdo7svxr6ek40ozcb1b28c3vor87myzxtdn1wintu49qgd8uu9f5u07b32zlx76bp8jcbixcq3dgfyl9pnpnizwtor4q5aapdu06c3djbwscetzsq',
                slug: 'o9ju1e4e3jr7em80k9zl7kdah0lemyzikoegp0gbgpre5hysvo4v7lqzvxmjh8rkv45su8qe0b17h2nfyzzdf3bifbl0hgn6zebhfiae2kt383xs54hg0wqs6hzgzqhxslqirskt3v447nww6fxbfke6rx5gf6x2uwtnlv52x4y6pso8xmnvjnha0dxq1u8pa1bxbsz3ovjydpitduix3jgt7s1wifxpoqf4dwz7p64vrl57s67gvljurfurtew',
                latitude: 604.47,
                longitude: 273.53,
                zoom: 79,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'cbp7mnh4',
                customCode: '6zg5pe77us',
                name: 'nouji4i0rnaxn91abjcyw2eo8z28w0vd2thgcitbr1axge6clsq8s4p8mfcxu0oof5o9iwqfpa8a6b4jrvt7l72hsfyngz6dw6v07bq654xy0cdm86ee1jw2h8bjdt26ukuaqoqek7snjg73dqbpdvnvydmopxsq1rhmoxoy7ocn0wn4axz8d0599jcqvp0ttvcsqtoa3hxx1ozb7yc0msks5b6r4pccx5cl36ulc76myzymad3hnmlab7ofaap',
                slug: 'kaceo8eqxvf4u2jgfzufw8xqtqpi4c2xeyhs1pr0mwl54ovhdy3td0i8utfbpp2sarsdnzv8cero8qkvd3c5syfpfbiohhgqj2ig37tn0i6d9tdqpcg8c1dvez41iw6otl2ywsknhnbffq219l7ugbfrg1gzvsskgsetmp4bjyheokbunztael84spyh1yohatmdws5wlujqz7o6avbfcf40b1ac9x25l7afiuf7ko8cgd4eaoqzwc6yyig0aciw',
                latitude: 349.40,
                longitude: 786.77,
                zoom: 58,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'ufs790yr',
                customCode: 'oymsect5yj',
                name: 'sdp9yqssw7hkap87i84oe8pds35644pkyvv0gva5ioo0dtxvmk4qpd1fn7q7nmm80xpw0zm73u1dxwuyr1r4r8s3hei89t74pam4whvnxzjg2lxjpkf49vxeelcaae63nw6ihmg3nvr9oe39m5lpng5np1awlp7f9f8ryb2igxfshcemeq29imr4dkb145mc44x70o6gty16uw34gfgt7dqjpyfgjttrn6kkqh8kj1g4uzgru1wmxa7ezjknp4j',
                slug: 'mnlbuz60ipjipktvtb8lsuo6bhowfae286jkfag24wiwl325gj002gleh8ufnkw6szb55bwze2jjm8x8ye5aq5iigltu58jm60wpc868snm0261guirh1srbm2bpedim2u6y8n8zbh2kcnc45ikrn8c3ber59sr6cyorbi9tiz8l9sosja4urvqbkpq3fckt8ti0tqsvxadtk27vm6cweguzk7pmckaez7235tmqbjufrinbfkd7x1dbfwy2mq0',
                latitude: 870.80,
                longitude: 785.50,
                zoom: 67,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 's6kpcj0v',
                customCode: 'jplppmu8ey',
                name: '5l3gyweynzz3ozpyl0azs0w8oxm9m1nheuzl6588wb5y0pc8ndb3d8e5215ij0anige6kul3brtpskcea2hy8hwhsjo3cc9lw2f2utkl3qjinuey5xv6jgb57uea8yisex412bgl3iyibnvq9doo7jiho29pntcm0c9afrgra4dygizyarlqlooptw5p80dpj6li1t65rjfj2a14jkp2wrq3oobt69qwb4sb9i8ysfpwx8t8g46pqzpomrgx7ov',
                slug: 'cm3yjy7gqhahgtepn8tm2xfyxqed6qlj3mhrpn55b2ahfwdvtt144frqri84o9gqr8bljkoji8ylw821fn3xkja1oix5b0gs832r27kw7x13zt1mmdone1e6u72t9oxm6ocn1obyvvft8kk03wng6j0ce7cufjmprwkr3oac8elczcgpkbysilansgf30dtm05m9rj6f9zasvwd99zrrdxztpoz04gpkzmtic4w0v0o46rjgf37s7wek8l3lk85',
                latitude: 375.65,
                longitude: 607.76,
                zoom: 68,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '005901f8',
                customCode: 'jbjhyw1q1t',
                name: '9yz4we32upqnqpuc85fir2o6bav2h5mcb9bhzvuememmulkxl09vctd61aftdamzf4kbqgxtx0q0yodjkt6zo25nl22l9icux118dt8h05d6846zvchmsrynzfeoxnd93umgpjrajuo1zmzjmbtqzyaellrhdtw8rdyj69ubj0o0v65bcmrhgx7o26yfk292izq50tj3iijzniw8g5s04nrhrcw3ztr21xoszlqwvxq54udi0t1w0fq3gg6irlg',
                slug: 'fr4fokhytopfmeghqgkwwxv92gqcxq47cr96htag4nvhbomdr5utmiozlv4x3i3ypgh1goesqeefnx5xpdwc632880cep3o3q4y0a5cdmfg82xfx5pg0y0we0a9ik6iit027aykyx8tq932j2r0ar509y1rlahv1skpiz4vmldalix1qja6iw61bda61h545xun1s99goa5yeswb1a55yi1xt2gua7gu8a10xb4x45j44pi9yvps8g4u9m9psw7',
                latitude: 250.28,
                longitude: 124.34,
                zoom: 540,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '9rpz68pi',
                customCode: 'eta4acpgpu',
                name: 'y47gn9vdasus56lb3ikzoj19lsjciqyi7agwnybtheyxong4vnsz21ezbaag13d7zty0wvz76sgt4kdpppbowm199083h3mtcg864lbyhs40zfjuo968jtsy6jzytlumcugc8hmag07yczw6cw0mk5uw4nkphq1f5aghm1adqpvxt9la0lt67rujeo2dtvvd9sxd2pkxw5t3p3lqgs4igw2rqszef3ks558g6qyc6uf08mb0psrcwtpvh3kvzwp',
                slug: 'ee4kkrj3j97c7mekr1jdxhlrxaiiwh9t9idfpi1a4onbdkanqsihtrf19bktcp2hz974890u0csqpvgtd3v8mcz9jkodpgdk4773vbqkioxfbcpsxlc9np38gmci307q2n5ymtt4tvlxv7q9faexqelam5emuzahi3bkbf365xy5a3ogrr88ny3w9ctjrwoblrxbkmepon4gomajimy9ln6ykg943hv2344ml44q70d3v4l785siujjwejw28a9',
                latitude: 94.83,
                longitude: 155.53,
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
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: '5xbmlm8q',
                customCode: 'zn3npg4x7g',
                name: 'shsyo07e20np02vbfua3n816oswj2o0fyihzugwlfr8ewk2qhj1myranlmihpze10ap5g2fzku2ypu979x7ulars19anui6cb3dqa2pdrstcaghc1k4z8vw8wqgpuvqfj68938xqfgxjdsoi9rsq148hv7i1cvtbyw0qcetvdl5ht7ocqy1flmxuad13cibpp0e8blfur7w5d4aylzqmwn0thglg542rhci5n5cwpiiosewc5yoyakyu9j0elqc',
                slug: '8exime4wf0dw8ff3h4s5q48uyguuc8xt30dko0dczdfhykyvkuf947dvxwn0x3qf1bhq4qfesnoid738autv8xdvwyykmywks27h6q15oqrttmgfml2tboqzusdng4zviis536i5vwjwt7l9dpe2k8aop9kes4sqtfvej4x610p2ddaqjd5or30sl37ixb6wmggb9434qg09mhzuo79nk71sdn7ew4wbgo8w5rp1g3wwdim89bonbrzk0qbkxlp',
                latitude: 948.16,
                longitude: 378.94,
                zoom: 50,
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
                        id: '9a7ab8e3-92e8-46ad-b49a-2e780105153e'
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
                        id: '9d1e8149-18e8-43a0-afa4-fe2840752a42'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9d1e8149-18e8-43a0-afa4-fe2840752a42'));
    });

    test(`/REST:GET admin/administrative-area-level-3/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/e5d77052-f792-4340-81d7-65510fc84bbd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/9d1e8149-18e8-43a0-afa4-fe2840752a42')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d1e8149-18e8-43a0-afa4-fe2840752a42'));
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
                
                id: '8392f089-cacb-4cc8-90ab-bffcdf29177b',
                countryCommonId: '9cb2e4e0-8383-43c2-8563-9926e7967592',
                administrativeAreaLevel1Id: '1b981b35-9599-454d-b8c7-5186aa23faec',
                administrativeAreaLevel2Id: '2983b0c3-eae9-423d-bde6-7288cf21481a',
                code: 'tzgowtjj',
                customCode: 'xiyiyyl91y',
                name: '0tq8yka9w0ffpyh2dogo4fi4ngtempxwdulpnyamwgqdoze35p24kdfdmhdeu8oiy6brywdyf7oj9p0brgtsmenu5e0v22tbz7r3fbjcjq5mp0xoymrdikrx21q7s4af74bk7cc861solcohw4n3pkqlvp68mjf0zdnegwopozzqc6sj65o0bpeuteyepkx06xjwavmde89f3jji3s0iinf91hl02tnfhe41lj0a5zs6evxt7jabf160eonvwkk',
                slug: '69lalwk963p1in15ji9zv8xczwa7gb8euhs07sf9r1hp9r9al83q49ezhq8ca65i68edhkcko8f0e9fks8z0qjbadiwe592h6ymw2ynyhzje8mjnchhox2z6mcmi7j8t677kce70qd6kq8jll9svv1jjv6rnhsnno77hpa9o7k1s3dfr55j5b8jjlcrj5x7r6y0qw8kb9z1wce6kjf2po6nkgc1lp802m0h0onr974wda85jkjyr1atxmh9rudo',
                latitude: 973.53,
                longitude: 587.73,
                zoom: 52,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-3`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                
                id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                code: 'sd9qnc8c',
                customCode: 'dxbhr77pth',
                name: 't12bxuemf8xfsz0cf98p9i27n92zktsjbneyg608n94j5e944s7uqgd5vp347hb92vjtxokt0xv75todq6by5ytnaoneg2sxy9jxe23qw5gidwf3dpexgnohjpccpnfhf8940zbcwyc8nxesao1lmk3g0jfq5yizvr5ib5vdotesslvgwzs94uidvuqjt596gzaueir8i99ohya38nnj6ci2slnrrcjw64eu9x85lr23o6n0p2gl6wgslwxcrc6',
                slug: 'j3jw36x2ft0pv1o2xp6jyryfpiki6xalmhkqhm2lgbzvcap7c14yw4lgm9q8n6yxt9tos4b0x3hb4u8ptjgqtxe69kyb9x9sppxfwyjr1yodb3u90rhh68mxfplt1awedsneczidvgpcw1m45hofw31yxcuorq6clsxghvm7nbnwqjqsru595npmn03dlmkydc5g0f5ftyjw3r1e6358a6m5bvvfzookfw8ajdd9kdjzspcjcm235dev8jyyllf',
                latitude: 101.82,
                longitude: 3.15,
                zoom: 59,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d1e8149-18e8-43a0-afa4-fe2840752a42'));
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/0db3cdfa-77e3-4747-82ae-ea7d5b22a0bb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/9d1e8149-18e8-43a0-afa4-fe2840752a42')
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
                        id: '599892c8-bdf9-4454-a847-390a87bc6322',
                        countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                        administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                        administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                        code: 'z4gzxras',
                        customCode: '06baptavs4',
                        name: 'vgl0m1b9u017f8qztffkaxkr3siwgzkqjqslsk8zqk05r263k8mso4m06vxnyqg5h1e8xntqttm5fqsn82b74svogv5shzewyzyxlyesciwz2s717e7xpi1abkxgyuexgov7eoen110ikexpsr5jcugcjojpbhwcv6p9c6r84gaa2obo2m3o3rkbl0iqkd36n0gnkbo9qspfq8u75guo3q0ji375suny3tr8gp6twooetkqe24tnxp1si32t17b',
                        slug: 'r99hany4ujjf0tij96mwq3e8c6mvz2myy4zafusb6cjjfek109uednwu3lv4eqjod9mockvm6z7gxfja0c0lrt10huemoosgousshtry1proph8vpot2po2vumjw4kak5hgoquo7e2s0vcxv4v1kx68p3926xvae2bdxrs6ui9ulhl622pjm0nyxao2fflzy51qw36gw1a2tfqbxo2598td96l626byelzm6zy02owen5wjt2ob6c3bgnn39dg2',
                        latitude: 472.84,
                        longitude: 945.26,
                        zoom: 33,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel3).toHaveProperty('id', '599892c8-bdf9-4454-a847-390a87bc6322');
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
                            id: '14ccdde6-8468-4bba-b92b-11e28ad51147'
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
                            id: '9d1e8149-18e8-43a0-afa4-fe2840752a42'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3.id).toStrictEqual('9d1e8149-18e8-43a0-afa4-fe2840752a42');
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
                    id: 'ee0b44f6-6b72-4580-a6c5-bccaec37d54b'
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
                    id: '9d1e8149-18e8-43a0-afa4-fe2840752a42'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3ById.id).toStrictEqual('9d1e8149-18e8-43a0-afa4-fe2840752a42');
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
                        
                        id: 'c4b3cfc5-290c-48d4-a904-02274ca8217a',
                        countryCommonId: '65ac2a9d-b719-42a6-925f-1304eba7dc9a',
                        administrativeAreaLevel1Id: 'd4d444f5-e0a8-465d-b179-c8742e5769b0',
                        administrativeAreaLevel2Id: '8b5e6ee5-085a-41f8-b53c-0a2864311f84',
                        code: 'tyb3w6ju',
                        customCode: '6061jcdd7y',
                        name: '2uvr54wm3zft1c8q1j8sbwh091qyac4lxxhp3pettl3k67elilffu02x3jxjrfi6b1py7kmohpuybmw5ewg28myazxig4c5xu57vcushf1iiu9xr3g7conau0qh0bkiccx9lxpwgyrq47l2gw24bvxdqk1ezfql10nziqlrqmc0irw69x05yrkpmie1jofabj6dzcma1g74lolh9nzy4744pqnlwz8r6bxz4pat0d3be1wat92rlzq0inq1lt5a',
                        slug: '50q685l65hltg6zuit58hsje7o6sl6uxq1feyksmfay1p4r4xdp8wes4xvfid7looyu111iaujem9jtm1om16zb6u6qhd1dlj50neiv2pkw294970nfqmfkmssb030wt8ogdqx55e4se5w2sc8y4fr0gxa9iqv7dcudje8mui1gc579cll7cfhgfwpvtige9a3hoo6jqrf5zc9sn7rzruxmwik7cqzqrnotvjt0t4kq47t0w6ctclc17vv2t09d',
                        latitude: 327.13,
                        longitude: 825.29,
                        zoom: 12,
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
                        
                        id: '9d1e8149-18e8-43a0-afa4-fe2840752a42',
                        countryCommonId: '36c41b8d-7b25-46fa-8acf-bd2b867d08a9',
                        administrativeAreaLevel1Id: 'de063925-f817-4b63-9db4-a836f3c3be21',
                        administrativeAreaLevel2Id: 'ea7fc283-b9db-4c3e-9685-0ab82144a4bf',
                        code: 'doukkly7',
                        customCode: 'orjmlgpqla',
                        name: 'ymn6fb6en4llnaftciuo7anmf96dh6xeuc07b2vb7sqkh3pawuthh9pzyjh20885dl4qa52pybvpwe4xg72dh8tsomtdn9gsdzqb2671w1b02kishc2x5e2kt85nxuujc4sz4majzhmklt34p60xghulh2r97pk1mmp7208glq0owntk5pm92l24qgivcklvnwbju2k2nmr2ds7vzu8i5uwj0jm1jsbffkyfzg5r7p0y8t7eej6qln44boyf65p',
                        slug: 'gmz12qg6d2nnrt27ri9z5v1t5fxuemojrh4tz0qx726qcxct7rdwxa6am3qw82pnljmre1mf3btgtpfhheph867yw7ceb2b72j1jtn80facnwvh56lecp92dnch7tw4d9w8xaykt15qi835ecmda85i8dhzngecev6mo420cg5l57gvhzzwrwv992kqax0n7itooslxkj62qtajxma63pr323lw01gtindqikwobysv3q509u3011ajcyzw63oh',
                        latitude: 106.43,
                        longitude: 179.70,
                        zoom: 54,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel3.id).toStrictEqual('9d1e8149-18e8-43a0-afa4-fe2840752a42');
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
                    id: '184090fc-ba3f-414e-ae7d-a3f143d7ad1a'
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
                    id: '9d1e8149-18e8-43a0-afa4-fe2840752a42'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('9d1e8149-18e8-43a0-afa4-fe2840752a42');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});