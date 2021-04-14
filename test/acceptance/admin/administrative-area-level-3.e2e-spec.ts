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
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'a44x6qqf',
                customCode: '5eyw5zunat',
                name: 'rt0j9y8fuq4tt55b6fkhnizxsmduvoqqc54u27cq9dxubqqjoadoke6fnvg9qf6ctfbpragntziq3ph64orelgw85qb6or0y02cn1ppzr4z0icngs847c6zcb5sfkhf2rcluzx754joawmp7dfv3uhjm3jl6w0oith4u8duvn82noo5f43dkup2yw894kr1hzk1q9s63ll46aptomzvx88qvn2nyrmmk6y5deem6ek3v42caarn6rsb70lr5v18',
                slug: 'sena2puqq4exfsfgbqzgkeye00jotajkvud77yd7gxwbqlszol7tgo0c5kyqlwvb11ksb1qzlwff1cnpg8odvr9bgm662csnznl8dmrci7yab38xwrfo8ww26ur7io7ph66w2b20svfr66qst6w3zf5f7w434ngm7cm3el0r4ya3ckryqx2tgpo5ox6lbh8kihzxk7gimp69yomkhalfyzw5wi370as9ytvt0pfpmbbdom0gb1thyu7oa4pq1qt',
                latitude: 512.35,
                longitude: 802.11,
                zoom: 98,
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
                
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'tbwu5a6h',
                customCode: 'la9u8fb653',
                name: 'ws6mwjyvyxgsq71f0x9qfe5j3o6cjvu5w22r4s56q3e6zylxfq9x5rrb5qkus1w7znju8bibthvpkx19dgbg97vv1pu2rwqs3daxsew5bqeq56jax1yst4083yxu2z7gv6bcc7b7nv9mvpatu9s52xrfdbtdz10h6qr8x14zmcqzhzo5ngu47mafn3ks258g6ub2ntwei73fpoqdemlhzp1xhu1pqzelsh1l3zpdbl05jexvkvnngnbhvxj8yzw',
                slug: 'u88m994ai6un8wl0gp5v8wsim2y8o1dqvq93psdnrjzsv5x8y4tacqesi9mjccls7yjhlklgy96yskp5x6z3h4nq4a4q4jndirbtgk92980thx2nltofbw4xo1ps73h3zbiaib02lrlfv2opu0sjv3h1znn2awthgka8sfkjv7n0av259ami851jy0wa7mha7gde2sev1h7nkaoavro22sxr1dnpcg2wbra9myyqo4r4a6uce9imaimzhq81pnw',
                latitude: 892.71,
                longitude: 282.75,
                zoom: 47,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: null,
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: '3y2x85rb',
                customCode: '73c1kjqbpx',
                name: 'k82yuy1kfjt0u7lm9es4jvqgqz7zq6jv35ktmjoue37jmao1tpts8x81lhyu2x50mav1qry4qn5yql20xd1ijkqq3qdj0e203sn2ajo8lgw0av86a4as93daln7u0a5d3nxlnkm2vycr3a0926bceet94yuec239lxlq7ovfptf9rke33pg136wg7n8qz75ad3g7lxa2d5kahm2xjfs76dlpkma4b1uc3lc1oytkuu9kc8epnzbf143nmy2j8n0',
                slug: 'wypmfoqpq74i3r3zkbyk3bg5yimpmsx40bjugj7ysq5axe41hjq5rek5wenhwtm41y3gyzfottrvu2fyyhuwwyya3p00mq8p3gv3u5ibpsyoi3m6fb835ogujljdpiwfgg9ogt2ntkb4bmtm3ywq8fymsy2jclxc54s9kx5agp3gegfnuno59dckyrzrr25b7vs7tu7fdjwf1nbrzb345c17i3z4ymzyvdef464p4z2293kcek6ket5zpu8p4b3',
                latitude: 533.04,
                longitude: 238.36,
                zoom: 22,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'igk5uli8',
                customCode: 'c29jtdfk3f',
                name: '62jjln29kr263u9ubl46plync2dqwztzgqz5lnkro0n1l7w50b372l49mw6c1gxwbhpmk1q2kbqihetq5cw8f3r5eacay9372tdn2lus7mfvl6r4s548atswq56akui2ngqoln3jino4k37yn2bo5dk5wgtrygeoyfpdy6tqrjzebofjh6pfz8p9h74w2grgton213nnd59xe26qvl5rf1iq5u7l11hynzlade5ebmn6166mazj0ys42wvn5opr',
                slug: 'd3yvqowf8jy4y3nnup6pagasdjngmnh0ktws65qe2ei650enzfj622k2unfig3v0wmxwoeoicz04b8gcae5b35zqwj4vp20sx1p5xyx1897xucz9hwufwousa5gdd2rnxdxnqno87ba76qx3vasi743l7kuwajbksbalhveibrzto2lfp22rrfuzd7jr9oko7xmu2sv7ut9auwozlo2845mpxqve4r2093y27m906nl34k4kt4ra16m6qvurca4',
                latitude: 991.42,
                longitude: 642.18,
                zoom: 83,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'e4g0nnw2',
                customCode: 'v2nclgq57k',
                name: 'h1ouovjmbamv1w6y8zyrxckesqxvz94v815id7qxovguo7e064d62g65jj7ly9gxs8htacmwq42vm5432leqlr7xmyuyf1h5gkao1dvyz5kqvj92pi606aya3ldu31uesg5gzgtj5l8l0qh9m4xz5vz6t8rge676z65ms5abxlxy75xg5goe66ogx33fahatfh7ola614dve7u09eqchhw3ui7p84dfss4g68zo7572blkt5mdei04o46m9vu0c',
                slug: 'afczej6udsnf2wsj1h8dogdlf4gjykfzq3vzih065r6j276ac4w2wn5ai3s3yi5hcjmf4v6sc6v76kgkj54fc1xt94xu4ddw42u85cxs41pi0xlrnv1gy8juww0ci4ytc0sgef5azmqitrsim20hcwp78097xyuyjkr0fbi8p11pu2z41mq0z18ymfs5lg1snfkjfjrzxg86jdubzoiz1s5hmkvkp8pxnbut1bd08z0ua227oa89rrko9x1t9ja',
                latitude: 800.16,
                longitude: 112.46,
                zoom: 40,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'lgvno39d',
                customCode: 'plvnxb18r8',
                name: '85cr7a8xuedu8b5zhqdmlt0ze2wqqfhjt4niel1taj4lvj4bu63wudsaxegnb5vo0pvqo608p5dycklw5djwslwbsrpu58uzdrjy036a6vky1zc089jompws3t2xk96bkybqd1jpz08bf2urxsd7i5u9tmpjqh5pzg245rccpop3z1q4zryp9656bvwvjgwoyj6u4ih69aaa54obbhbegoxeykt5y1kiscf8515wvc9xcp8f1r6nb2mv3gt0c77',
                slug: '9a94va3afnh44as4ea55qc7h3qiiji0orx8t5ub4gxb0eeim6dk7vfb25283ybcnsk595tw871y32hmgujjab8lzgttqldhbarko3jd1x07c4w8irkkgpzf7tg3vy8k4o8bs2omwh3xi4jxqvws8q8p2zrs9sdbue75jbsgziu74tkwujwhga20xr9cfsnc1hl3d7eiqlkth11trx1310xz5hi4fpyer4o8gmbsgddquewk9xpujrur8swmi58h',
                latitude: 639.03,
                longitude: 961.70,
                zoom: 45,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: null,
                code: 'ncuipka2',
                customCode: '7zk8lbpzre',
                name: 'stb0fjn9utl579rgvvxf6mfn3njukrxvduydcobw0korlxp1ca7toe3smsho3139jel3m6dl8131zdy8j5j68z9b6d2mpzjfvzgfywhgpkpxgfw8xml1wtygtj6ami6m0fvwbs2emvnv60l7eeffjdbhxmwy0ikc9d4d8ujzghnxyit2hlnwzy51hxwwrq8zbnezgbsiu4mh68c8fq8yvfc0hf2v0cmr720dgltbljd5sk6m8i4zplgk9tqi01j',
                slug: 'douhfllienm4aq2cfxatz70puhsugyje68dqxrw0y9e08o623kbppdt8m4vn0fxebnx7p89b4j0ugxc2lig86mpvf2y44sgbv01jje7fiugabo8dzj3ence5s7b9pe7hfp21s311efpoa6wcb9kufvqudf7z7k4lqb7thbaks0t9n7sud12v6lz5pkxo9y3ofkxblg8ul3z64w1umrpql999pcod6p6yjd3vokq0cj7eh42lzga237iobgfk1b5',
                latitude: 167.43,
                longitude: 144.26,
                zoom: 60,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                
                code: 'b0mythqe',
                customCode: 'v0ymes719d',
                name: '9uhw9gzn0as6zh65znxioga5exh63nsnqw9bklhas4y2hv3yr72t3m9f7btoqs8jk2jvgqbnhk15lz06lx881w1ty05s1tn3wdggxama4c0el9pk3ln05ijymf33unbxc4a06ejzhhwrzfvh9iflytbpafh948rvwiqopr4ryzqr9so7omj7cc9awyiycyxkf1we6gyfgg92j9e9do8dt9ssj1z0h5naa7nxlaj35f9s27bknoi5nakngl3auo7',
                slug: 'ociepeo45pysw6xbnd8p8cggjrqyjtezo632roxwmeo3lwxrwiy8dwveo0aeabs228sq81yg4ix2jpqaj00faea3wo9jynr20u501h087gcori7eouqz5n4crbsxpymkk9omliowyyn4rlanc99lbh75hurrxpt5lf0kjg8zxxl72za71s79ltdpl0g43ircod1ii2yv8o5ao61gm7s0yrmvrst4asibx27yqgpc688upu2vwgx6xjpv8a1zceh',
                latitude: 703.95,
                longitude: 449.58,
                zoom: 84,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: null,
                customCode: 'f9tky2q9wi',
                name: '5y2vxp5ysppr1p7wvfid3nx67gmi2frqyrxcgmiuw4oqmlhtnjx5s9x0lwlzzu7uckm5p97gds572y38lrpiwfdg7uuhllp6iul5ha9oyatdun444i7bpcpa8m4tn4100dzi8vlfph0h38d66iiitpkv3n9gioyh6pvmx9qj1zx3pc3yc71al8luk1v9ujk0ihmlbw73w687ejq3iurvtuzgjbx5v7s310qz6xk9pkhwagzt3phrhh2lot4cx1t',
                slug: '33q211lit38eevjdjvmqtb5f1oywqi9rf0aq977xx4fyo8kmkbnb8d1tma5hlygluthk4h19wjs0wtv8428zzycbbnyqydgvmt934a89shuz8rar42rap4i3b4fpvywhg5i9bqfyml4q14i76d8ih7d7oq3pf8tv34172tgwrxr8q94vsiigboq44ynvxyf2owdvvnkinqs0qp2dcmilgdellr25vobkvwmuoshkwv7krewubzxqng6udkw2925',
                latitude: 79.41,
                longitude: 23.14,
                zoom: 51,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                
                customCode: 'fvp340zkye',
                name: 'ajiub6oe84454peajcditmtyp57cpdedjb5du4iqslo2koxm64swu7w2ieqtsexss66wowzeu0lf1k7fzi788itmv2pyh325cgje4k3o09f8t1yp9ukhl1lnbc1vxcmjgyr2fgx6cuf0eqx0alrb5309n5ol26v2pdejmv2shov5m1w2c6y7vctwsuqphtv528nhzei7gt0lgxrsapzvr5s8fm9ytvpa0ibhw70edeg7ju5dl9yue0gohww1203',
                slug: 'i40fpq1kvod36aq7jhjuuni55432grwq34zunqe0s6qk5fvpqx5bo8zoabngaqwwqtkjct76prnvrla0vb66kn5nd25onl4eaap4uxbdpzff3dp87su487eydx85d7inixs1uuaagi7lv9u8qbweztqq4t9irkq9f5n5qhx52jf3kn55a9b1fpx2nbgv404fney10j152i2ofn22z4il81dpdqfccpi7w04sd6g2r0fw1zwcme3bmb2kgyb76h6',
                latitude: 566.34,
                longitude: 989.82,
                zoom: 53,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'ms3xsyg9',
                customCode: '6xii1899e3',
                name: null,
                slug: 'kgcmmgqpa5063nlmvmscc46i5ath15eh79b80gyyyw0sdo2hwo2ffcknptb2zsnvam3ehu63zsdcac2cydee1y5jtqkklfooyvdrot71cac22c93cbsk382ur6sy0bjezacglb6heanya5rurrdlk9cf0n0f11ryz5gxqi6ki2sueo71k7xd9yseawwvkiv5bcttot9x6e80hftcvuwf7onfyvjj894eh5jv9u54dhh5l7j6su8wjskp0j6pfkj',
                latitude: 461.37,
                longitude: 827.25,
                zoom: 78,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'pcoyfke3',
                customCode: 'l86i2guh1k',
                
                slug: 'x2uzgq5qjpgg690icg84i7x4x0wdn7ezqvwblohnl56reih0ps5iuh44bhv5tco105xkxdb0een3uc6ujh7rn67mzv0yt9zstko8vyu63t7iuupjoajhr6y6kkdjtfdgza97dgcxw4mutki0ucgd7z9b7eto523i6dfhqx0mxqqyodjt9u31v7mvd8lef978iar8onlp13vh78jlbtypbey33oqfykljvynzoejutilq9fjvqx4cxq9da2kpquh',
                latitude: 310.98,
                longitude: 426.46,
                zoom: 65,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'lg09ben1',
                customCode: 'tdmgy73gwz',
                name: 'fap6jkg5amc1bf18ze7mntebdet08zll8sjn190scj6wyg24qn5a9agx6t8i8sun9ohwampiytdgfn2j1znmz7t3ztzvmjvyyi7noda5zp77ufj1qlnfqlf3ml2d0dnuag4rfdqrq9vjtzafh6szsi1edboxutnoc2ujp2t33229tkohh7e99rfw5mjlwc8mxb3jmlaaa3dmx07lg7ggg9vh9y1ht3r4wdraqq2ufn5qipfxw2w1ozuwsocn1a0',
                slug: null,
                latitude: 933.89,
                longitude: 389.56,
                zoom: 60,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'l7p6e2pw',
                customCode: '529agestii',
                name: 'k4zf5tjrvl6blzqqcgtgnfcrscwdqjxool686h1jm7cmls0p5awvtgpg4amrb2nlkp72x7rejx1xgzuju9c3j8q69jjkjsom8ck6t666a7gbpvdlkdrx3lvhy3y9gvk0lfngbj5lo2sfk46kxgqriopcfn07vgwpqpwseuu3dupaut2wa2o489mo8s27nxifzjygq4djnoj50fvod6ey4bx3cqd9rku7g7f24bwqgf1b5dn0mp44d881xzic0sl',
                
                latitude: 784.57,
                longitude: 634.76,
                zoom: 70,
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
                id: 'pg3jrydsnnezyepn5rxr3ld775x63czryxxeb',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'p1q8xblt',
                customCode: '48kbexw79f',
                name: 'k5exg78e2cd1rlaascahjv11yvqxmweitsfcrv9lnlzyw9z17fnfn7msgzzravv1eq9ab6jjcb5klgh0398xuismy6v1yg2j1g45c4kira7kj4byealnc8dxdna8rcv4f4mt5wgc0avtbcp0aec5xoe76xot8udddruo9i4mkivujo42adhptaq5bfuzlo5fbpc1g3w9v13wfkkg73r1783zu4as60y02kz3ebjs9tihvnpi4mru761fbzzapfb',
                slug: 'ateykoneumu6ir1ugf3k4s2y8h6kgwf1fcyfqguzpk87aoj3h6ztqan8kptwuksw1ojvh8n4hh2qhq0qmlwur366nigsyhpfb3kc9q1hxtbo58az9jpszeai430kt9870mkd59rr4536p2n7fxvzw3mhvj7rc7hpvajiabnj73llqaszuq1qwmen09zqrhz6sk84p7gs2ql97oqwp0skr8s650ph1d453rb8lqmri2za60weyybu0ukj3iksrpu',
                latitude: 587.46,
                longitude: 820.14,
                zoom: 47,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '91znn841muy0qecuufvbbgfv8e8cxo3iml5ku',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'ylaul5xu',
                customCode: '5osqp2asfq',
                name: 'lxujalbfutzebvlcepqdka4ry1m4pqqnew9o3dhhn3glc9uanq7cev5i97smv07lco3wd7dsk68g4jdx54d0tgaeigq5jkz5exkl15hrfs2i2eybodkillhrhl1qgbn21b99k8swfl5l0wvkule3usakka6ptfge4a7q7nsf2l9ed8uaw4vatrr55rm7rzoim0q1mkdci7ocynf3qf8huesgvrylz0ho7rh8l3r1p0udqyuz3tefc3xyre2idkv',
                slug: '50n1ucunb5q5yy4t98wkfi2km9ofi2slb73cdewf7q9l8y5er6yzlm46q8b6tzfng4rwwcliqa92bwz1zmytsnbs9paa3pxa6ruge9scpj3qbrb9isqms0q96wohcnzkv6jdj7kruo25h6kw1tywmd8l81d67syn5qpptgpf1r8ktub9g9igsebkegrjx8lltw8wbiu1c6txfpmbc66r7zg2mp8hqejtlaurs4zkdg6xo1np0w38v95lqa5m3u1',
                latitude: 955.57,
                longitude: 678.30,
                zoom: 49,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: 'c9v8ofp1edeg1ug69zeq6xdbsbcgq343fgnz5',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: '50ssleoz',
                customCode: 'ho02jd65e6',
                name: 'm459gd3hvn4y5sihvzym8usjaaczxeyd40dbvud7jhs476rn20oa5gsttdo2sgru1fvqbmvk3uj9j372ejs04rduf3bhzupo3dvaqxhn2x125z3ohti2c4u5g4jqvs4wqvy9k6816iahv4ofykuce6i9rspdon7qhlotemld934bfydmszl3zm759wdk7npck7m4652o8pa6khycpayppdwuzroxys8ilk8j35z6rzfwc2b3kk0pdhwmbcrygqc',
                slug: '17yp5tusirsg1loxw3bu0hjka3aitq9rcdnswr9chp4yu51pu0uyz1ov9i6etudndrvnvhi9jxptib3p7u4zeygfaipmml1bntspr0n17khhx9q8a8s7b3ocmeqfj7phynujwnqr2cgmdrevbnzkh0v73ixyq597xhkmktvaj2tozt7kzv5x6yoalw32ftdwyr07f4u1i1wc203trm9n4mi5zhkfu8dm7nya5693gsttnl1s6meuxb16uhqqiur',
                latitude: 977.48,
                longitude: 838.36,
                zoom: 18,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: 'tymtd9p0mnlubf04sx1hwlm7akt6g7jnvkgwy',
                code: 'a5nt8exg',
                customCode: 'jtsqdfvedn',
                name: 'n16ku0h39yba12a85ej1fguczbrjr6rmtpagp0sxitpua9tiweznhoaoszcp57izauuwslh1x52ynj33qga8m2782cosbhmrjgf7nra7zikibgrnnhs7sdu1bgp1bb796c1hc505jl8tix7ontnzwy1gzcfov46qcuct8zf3atgtldk08c4f87vhf83hjbrn8xop0o5qyf3uk92uwzlw3sh4fxmtprth6yzqnuy4w27ghu4elm9exz6tnz3qft5',
                slug: 'u0nbu9l3jrk68zxj6os0ak9aml2vu7oaqidydnf6vxmfe1n8g2yxdwla7ceud5b6uewmnaeiipit8xdaiwjazc9wqo234zmpsrzss1d1bcybcffdbhc2iq4s6f75yvchozz4mdwr5d6uytc6prtxzow9l0p19cyn9msortmbjd1sacaek5vbz4ry2ydcqnpw9uzq9yojqqkrds68f6lh69amm6kjp3uq28l2h52xgsrukqcuzomkpubzh16dux8',
                latitude: 537.96,
                longitude: 990.47,
                zoom: 21,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'i6q0ut227',
                customCode: 'rxyz3hskiy',
                name: 'iqe5yczd36u1dufqgogaf8iq9f286ay4w5cpl4v9v7xzdkleo57cslpc9aho09uat9eir71es4mhdv3kkd3ntutekykt0ru82k03yyuba32p04o8zki4yfaspet8j70twbtblm0scj2ncjw54qxwgcnt63w8mnjtvbhhpo6ciznzaj9hobu0a6i0mintsurms3vhgghu8pc42u83m55j5xx5qurdexore5sqghwslmlufbyhhece7de8himryz2',
                slug: 'fkkezsepokwjt4sld6lg0xw7xxfj8gwe4i6z6oann4bcgaha79r7j86l9sxxo664fxhhcycge8c0sq1alijc7oqdyvfketvg05snjtgvwowk1uibt3tesftluwuecretr8oql80rm67u8840l6bi3hjqziulveggw4hibgex9t31beh34ubyrx21r5vnqzsxa0d7tphyxmnequm2e254vu2selwjwlrg86prmyu8jtsd9gfhvnhz9fxxwww58g8',
                latitude: 799.91,
                longitude: 486.38,
                zoom: 59,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'ufwgegdg',
                customCode: '7dzo1g8xoji',
                name: 'vmdtr5gy3o9u88yfubx2v1byaxki66hony9hzyxgzrm0ole45b5efda87bz9miojqa8hfcy2a1k2at1x7ijl1cey1ejr9eb43nsdye4is8r7yoadbrnt8e0y2izik9p9rx8j8j1rqfdub86fhm60ehr1pm27no9pfc2aiyc92kv4wbwakz7orx5digx24vkelk8ayc6y7q2rfv48dsznysppb0zi72gb4snebm4rmg4ouf2aixkrdcozk0i1pnr',
                slug: 'ftpytdmyg5vp3f0oa0nofw2s5pf3lr2dsft4a3xg9n46sqykheb5y7hsdd83tl5uu9spg2n8nt7usuwb50pvzvj2lvxsghkniawjm8i6pmcldrznpyqqhzsyleubhzrc7sekbftky6u2rbq3hsf7w409uevjaudytlkehy1mxxz8cbx63q2rto7d67uom9gpmn37dbno60mm81a151u2vhtho4mdgzch4w5lguvxyiapxejn4xhl8ots082qr99',
                latitude: 753.09,
                longitude: 425.87,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'b824giqk',
                customCode: '0mhe4hlx9x',
                name: 'kyhuzu7tjfshml3tmb9bl7judw66a2ay23e9rkn2mcc4anp4txhumte7a6apqv73rm90pz6wmn6gz7xpuk0mq1txvvh8mle1qjmzu464pyqa7jn143nyottb3mvfree8dwn7xg52japyaqy4b4eh6cndht5m13kd5572gr2zizoj6eo8fdga2fes5onf50xct83137qg67axge40jzmq3eoh1r2f35ye61g7ly9uecd8nm4b7jfym0smqi47hru1',
                slug: 'm3k1cz1qa26hxdwb3jrmv06t7lanz9548j2guuvvsjw6t6q45srrydq2mxwlu678hjxs6jnt6nvkc7t9idox0ljm7hwt3hxgr2xraczqdcesmfmpuxg6ju9ur3lml0vxg1ksr0svreyqef14u5w4umizhmavmxp38vqhrohxut40e06ztwtza0fvghnupeji45ouptoatw3mq44s87ho7u7iu5gyrbpvdoi697mo16mo6bole4dy6e6636aanxm',
                latitude: 955.39,
                longitude: 889.57,
                zoom: 69,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: '0ngv65up',
                customCode: '0vnzzsi10t',
                name: 'v2f8pne6wuwt95ffmlxsgenqgbtecobc8amh2pv37shzi5rwrvxx8rd4tjk1kpjyavdgclithf65cr5lqdubxjk8mnbke0i1xzd5uwiyr75mijydpb0rwgwpbp5zuum0ihf3bc46cyej5aw67lvsifzhpf1yiajrp6uo06ivihfrvma1s0dri0w09cxq9kn152osw6wtjtyd44qltqeyoyj3u6zbg5qpy6v2cmjlxjhyihw33k70b0u8cm9xgyg',
                slug: 'xo3bqpusx0wuje3vdk2sgc4bql0uvj8rlbtp5ksdleamlzton1gdgpeti3csg4ritxyrrdjdryt4qk86tswss42lm5s9ei711ejrj1rm3bs8fmhp5twq69ipxpueu5ldqxw2um3fm4rprb4gnj71gzkz3kb104cy9og7pt5ip379q49vbgy8zavvklpfwrqvz19aixcghzgi7lhqexnkg2eds9p6cuj1roedeiqmzx8n71dfzwpokbeizb0licdj',
                latitude: 392.09,
                longitude: 489.88,
                zoom: 82,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'kzedplks',
                customCode: 'opfie3yemi',
                name: 'fadgpd2favs5gneu23ady0bklpeer3vb7wq542crwuywdrczy83lv6zpmwkjmugguui3blto94h0wau90uplxfs4vw1ezct4pwju3zl6l3g6fu97tl4nrgnj8fsa68pzff3vn7k73l6cqe2kfjo72xb51xsz7h69fryauhr0ogzf0e8pv7ss7ktvidurdx6mt56skr1gygr7r6fx1y4vkskclk960rl8scrin2jg4sbqwnjdn83ixrm6v9407at',
                slug: 'yfjkrjr87sivvt1hcs6ts8icu8zpjpm21stsasd1djti2ewxvqg87veaieomvmbhydjd7q20pc4o3l1vc2ni9ymguq3tjnz1qt8zk7wbsy790tmpyzhbtwsa3pmg0rtuit9c215bsg2oku0gofb4m57b00n378h3oc6xrxd5vwx115aooajdwyqeamrf3ijaw8q796pbdqcwovb2x2girnc1iarwanaokwh97gfb1jhbdd0xpizjoxbw0mh90bt',
                latitude: 995.76,
                longitude: 888.02,
                zoom: 37,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'iiwxcljc',
                customCode: '3o2bqtzmjl',
                name: 'r5gipvzuglkjur3f68xav0is8z7b4p9vda446w43vbtidiv5klw6rguesq23tm8gkg3zz4oap783xzn539756y8fl9kleymb1u9iwtwrakb6qeglk0qj5pmmifb0abjowzkua3z2dqh2vjb0tthyyv5pm71gvbx11h97dkqo9ook11ebnvmbjktwbuwqjcrf42mvqdkmznzrjjblaxggeqskj9z9mkyyujj5xydpy1d0cif6o97w64aqz240soy',
                slug: '9av8rplrwpufkixl4u7ms6j1k110kwe17ihafy2iepncg9s9u27wzpogu43mh59350fsmc4kspwjk2baqrxsim5hfbus9cfvdfrj7yl5b67v17gmcipti61bsegzhcqcjsdrcflwrv459hhbzczzn0espkddaqxin7q67qlhbry5bsup791mbnb4p7w9qcdj6650gdyosupzqi1cxhhy06a3oqluu8zhs8llnqia967oblh5iy1qvkuq78hwmg7',
                latitude: 330.84,
                longitude: 255.21,
                zoom: 89,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'nj1x8euy',
                customCode: '67yljr7ipv',
                name: '4tdg1slpycxby8h7anf2378t3by6b8oqdi6oftpkodsf3lpebpqpxj1ltv1jx6g5pri0v2ntq36g6q7wjscj1kvj3lz7v9p4ac0oywsfcmhlc5kkvarzb925i5jubxqe1m3y85edjwiwtktho5fahaz18mzudlrghj97veohgihh0un55djw0x4mewre8td9lh0vz1lv4ck76rac52wbi9he3my6a7wgypmr5q3sim1wxl9ejfzuu36x80pr7ff',
                slug: 'kok2pn17w45xa83mm6uhpj2txcmiocqs4m3x6tqdasm5sd6jsxd9iy9uoiky3k0d45misom2rrsc7rtyru4nki2oq6l29c07662bczhp78gu199m7bfno7q4tatzeonqplx1xmf3drdmkxa8nu57vuuetkmm13li92mothom84frbi90tgb3mspjkvgmn7wqd9jjiz4c5lzs7rt02uo6c6nbrhgb2ap45g15uzvhr437te0vrybwbwjyi743o75',
                latitude: 119.02,
                longitude: 503.47,
                zoom: 418,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'h9rfi1sf',
                customCode: '1g07qubscl',
                name: '35ts4ibjegujnwgmjetty46nkvon6pf7a12xn4hh3vhei8j2p0nqx8xjfxg6zene28or7eki8f7hg17s9mw41rm0hv54yu0d3oggr42ih1kdpe44b2lhyhkxhmlz1slakpcszrq6l87bbq0i2py4tpowyjff4h2gqe9lx3s1sizoyy0ag8zqjuhmp6i3zup5lg2vqn6fdtmk1zybfaxy53lj37oefgfs32oiw6e3anzerltbxs2t6al94upet53',
                slug: '1enyvngd4a0gpn6ou6zwrqroaozmqlrfyzikwxq5xbl9o8ykylx32l6b7x661x88oplctoddfmzewrw0g9o7mw4qu9btglo68e3xdup88hj4b633kjw49h7yxy8vq1r8do18h82syo0m41vp9snfizvveun6gw337dg3jj4uwc9kxfva8oc5xffd2y1yhrj8g5ec7p1wagmtyclcpnroqq0f9decylpo5duhva6gugdqt5zgh81q4lncaj3e3kg',
                latitude: 606.81,
                longitude: 668.77,
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
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: 'ptlb826j',
                customCode: '8tggwbjxyt',
                name: 'j3n5dn7btyfzhnhrsb8cld0hr0mklh7qyb1o16zu2547oeumckfei167inwdv1a8ht7xaz3m1v08if6c5v7u0b4jfhim5ea7apn2br9a8ve3g3yqat2lp9hlhsxnqc1vwpg483a18siq9fejwc5kdc6su77c4uxl7omyxgfxmd3fn8mri4su3xi44757uotr7jvclfqvxiwuv28d01svw94r9rz8argp5bh888xqirx52z4q5d98njcgar45tpa',
                slug: 'qmkiuhzn58qp3ni8vtyiaq5j4oc4fn7ju6whubhgo5c4s9fj26cuvfbyq1w0dl030oossc2rdqo558b32xeew1jxret836zry5iycelm8cpmx0jmnadj5v2l4bch623ya9fe521uw3mt17efg2l7gjbkohr7hexm7y6096drw71nc26qe9wgnwdnyns0gdstyq4ojvb5ic9r0l17tz9iose63sai0lj259cfaout3hzwtpk99j2e3znxr566ga5',
                latitude: 418.74,
                longitude: 194.54,
                zoom: 16,
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
                        id: 'fd5ae93e-a671-4956-af4f-d3a762d570b6'
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
                        id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '411bfbb4-cc8e-45c8-b579-c45bd8bafc31'));
    });

    test(`/REST:GET admin/administrative-area-level-3/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/c44bc27c-1561-4471-abe1-9939d1a6575a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/411bfbb4-cc8e-45c8-b579-c45bd8bafc31')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '411bfbb4-cc8e-45c8-b579-c45bd8bafc31'));
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
                
                id: '8d051619-27f4-40bc-a6ac-407128545cc2',
                countryCommonId: '78e2e525-6c2d-48e0-a0a4-d6a8e964e4bc',
                administrativeAreaLevel1Id: 'f605055e-e5db-4f40-b9a5-7e3f5f58ed58',
                administrativeAreaLevel2Id: '1449e0f2-f7a0-42aa-823a-2a1c59c0573f',
                code: 'ak4t3i8u',
                customCode: 'be901dqno4',
                name: '59f2lf0te6p70rq8znhipd0udatd2kdw74xaeswrwwbz3zgyyng50pu0yvbivp9s3f08pe6kg8yqim3bmxf86rougbku18dnmaxmapz3luyx9ka3qlwb0y5h0oppgsg37b7grvshhs30jdhyrufawzmulovoliqqdxrzlayoiu5v2pvx7krp5yedshae58zu4lf34wfh898qwv7zhy2a8l1twc1z12tqdtqi1jdu5mw0me8vjvtkw9h9x6t4ohz',
                slug: 'jj4n4au4li0p0t1hm2ikuf90dr50rbwpk7vigx9x2gavmpf7b7scwt1fw1t2a8q736uxeu6v2wpz57frvus0usqhozcgmn36htx8xe85j9j8sp7kec9b39k8v50dn2b8e8bxb4tfqns6ugnoes1oaivsb73zcnivvjltvk51ntqxk8iaq4kskf59jdss7ltxokld9xsxuufosb0vvrp54s26wasafbg8n07ymhtuwah3aurnwpis2utv4l31n13',
                latitude: 214.87,
                longitude: 787.76,
                zoom: 69,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-3`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                
                id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                code: '1hxs5m3a',
                customCode: 'mlefd92br5',
                name: 'c60wd0rbzetnr6ihw7q1vhowlpclzbscix32g6lz93korjjt3a1q3kq6a38f2g6y85tsvikezwlgp4yu8vpohlels701avkdk2d66nib4uysrz5hyi3o333h808og79j5rakjjv7pru0rreiwfjkvbwovc07kojr7jdktw5rxzbihb0h1h3us6nlaca18p33xdiiafjthcaxcs448ph69fgi340zbt1f165ciqqv9ajk44cdxb32b3ybf8c2gvp',
                slug: 'ec4pkuzbcp61njpi6qkzyc2fc32jzwlcl609hhaf9b1ei87em9j83futjj8se73joxpi80m5w709wmbu8ukdg7ns0b7r88mrr778bi4vjjv3sengseyxzciqxoyctqchrz9glvp7beucjnss8s50p215mpxa463wnc936rr7hdaugsf5c0puw1w71otkxrciff9hs2lch2fp0ebouch9mg2s2yzrvefkeddb4nz7v8661enq7vqknez26a1rjk2',
                latitude: 976.10,
                longitude: 325.07,
                zoom: 41,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '411bfbb4-cc8e-45c8-b579-c45bd8bafc31'));
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/6ae910f0-4254-40ad-a6b2-fb27af06781d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/411bfbb4-cc8e-45c8-b579-c45bd8bafc31')
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
                        id: 'a6186ac3-e148-4196-9579-2bb8fffb3ac9',
                        countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                        administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                        administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                        code: 'x9b9vq5j',
                        customCode: 'z1ll9qihlv',
                        name: 'atdztln5krc9j1do6wz78fwcgq4fxqib5eq1qgavh61gmwxzzon9fsqweop7pc869pnzvx42e0cv13cygw0nsj749ddkjdbfz4pf5rtgluf06ipraqphq2b96n7r5vxgxypdqt5z97m0yjv3kf21cpgeyf4x0g3ce3d1vkuinx9it2vfzynxfx7bcr6a138xbrt5l427af39omq272jwn40jbuqwo4vtwquknxsd3kay8ydvskcirfmjq2wzt17',
                        slug: '1xjrbzto1ei93rehhc51sx1sikhad42as0dqss8q35zr0v8v2znda2runeb2clczdtd2lofjaikp2vnic0a0q41o8e2nj0z5aro50tz4a97puxpgw67kp963mknx2rpfjsq6h8chrbbjwdqp3r9yz2a0ux3nskir5ecvqm1thflyat11c81bgn1leo5ywp6s6dcif3kxg8yj87clwcbsc6lo7mz0cfhbtfpvpwxsuelr1daamco0b0nmy8snhj3',
                        latitude: 141.97,
                        longitude: 294.34,
                        zoom: 76,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel3).toHaveProperty('id', 'a6186ac3-e148-4196-9579-2bb8fffb3ac9');
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
                            id: 'c673d13c-7faa-4254-b0a7-7cb5f2c839c1'
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
                            id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3.id).toStrictEqual('411bfbb4-cc8e-45c8-b579-c45bd8bafc31');
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
                    id: 'f140e836-9821-4677-8e7a-e539b99f37b0'
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
                    id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3ById.id).toStrictEqual('411bfbb4-cc8e-45c8-b579-c45bd8bafc31');
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
                        
                        id: '3b5f16be-4403-4dda-a2cd-13e1c1ab4d36',
                        countryCommonId: '6efb9bde-ec9f-438f-8a5d-13a60be82871',
                        administrativeAreaLevel1Id: 'aa74edef-8af6-4729-9d92-0ab1e3627a5f',
                        administrativeAreaLevel2Id: '7707a7ab-d033-4462-9df2-983ad5ea7584',
                        code: 'o392zi8t',
                        customCode: 'uyfjlrwxqh',
                        name: 'lacts1aqpgb2qre5oq7ejodoesa8pxtjq1oa5zabb799vrxx0rxa7j7up5b6gvh10xh8wzxssjey1iud0sgcdpy8vuhjsvkk35vwmsuzny5l4new01613ga4k9bwe7b0b8darvpp16auhthr3iyk2o0gqodzkbcc0bb8e82dwkpex6x31yz11uwocthskgaw708b9fmfk0htqd6v784wqq4phx73729neiqnssvhqqjjaz6mwj92humchb9wpd1',
                        slug: '6fvsd91boeb4y1zoeuxqmws5miu7yq2g3wo68n8l30pnubgkscchijafwjd83p3n2gl7utzfpe3xl5my4kj39xi81a4ggmced9vguzesfocbufmmne7dxgd3uz3evscyi6rou74e2hfpuzb2ig1p3b3md8ljxc4n4cg425m2w6ncp23hkicovnqwt2r65pozmcrik9c5fhncfm5cgr5d4fs2ctipbdxrcnovvm7vb7q1klsk1i7yjy5nex37sil',
                        latitude: 444.00,
                        longitude: 930.19,
                        zoom: 47,
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
                        
                        id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31',
                        countryCommonId: '9a5b2646-d0ba-4236-86eb-3f5183001e61',
                        administrativeAreaLevel1Id: '928ae2c9-47af-4efd-895b-29813fdf5648',
                        administrativeAreaLevel2Id: '909c5277-ccde-4bf4-a97d-5f621e1c33b9',
                        code: 'urrxxi4t',
                        customCode: 'p92lozumrs',
                        name: '4l7zd5qsab3yi8zu1m2xq552ftuhjwc9nj6zm7bufhgkks903nppwuzodc0tx50iuqq1auzrlf4nb7ky0cqgmfn9qpekzk9zsyynkkjl8s7zvrfi9bjjwfchxy6exa2zs4cpssbjnhe5v05jjhkpgqgwwvpr6tvtwm2cdcjsgp9k0h7u63vn1njb3r9q8fqajanhosa7si1uwfw71qpc0hv4kp1uyo4ro2ssnglptymx05cyugs4bk14yza6u3s',
                        slug: '13vtjo544p5h70bq18gjlr3dt0jys2hjdzocsufv3fn4pseuhns54xroqpz343fshwx18pu9f2paegavw1u38s97ssilmfzhjan4e198jf3j349n2o9za2p96mzfwjhyckz7y62er98o1b2quri0a0wdej4sec8mhc3j11fna1r1s29b9ur5hczxped3bbemf1a5cjbhc3qcfc63m4xxy3ahgn6x78uapf7xwvuusdf1k6fghisb9h2fvkknznz',
                        latitude: 669.51,
                        longitude: 889.11,
                        zoom: 25,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel3.id).toStrictEqual('411bfbb4-cc8e-45c8-b579-c45bd8bafc31');
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
                    id: '53cc7047-8ad8-43f5-9962-9d4885eacb38'
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
                    id: '411bfbb4-cc8e-45c8-b579-c45bd8bafc31'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('411bfbb4-cc8e-45c8-b579-c45bd8bafc31');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});