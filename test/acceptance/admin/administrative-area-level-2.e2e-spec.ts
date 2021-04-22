import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel2Repository;

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
            .overrideProvider(IAdministrativeAreaLevel2Repository)
            .useClass(MockAdministrativeAreaLevel2Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'b5tmf4xc',
                customCode: 'vvc7a8chq5',
                name: 'moas6r5tanseqlb3em8ym3nmn1sx5sjcrzzxqr90ju0byr42drpp7z37jcdpqfb0xdaqx3awbgn7ub0xa5xl3dq44op3iawgii96afm3nq2jlonnwqt2gx19kbzyum88mcsyqxkw57173vrw512ziv1cosuog8o790flxkppcomyhropynpwpyc31yfwcfevww9sui65etttkoyqg6d6dul5itie0zufjnh0ienq0t6ytfhx2s5s7ei79n1fdnp',
                slug: 'lcol59f3r37o74npqge2es4mkgwd3u0zjouvbf6qslredqoaeexv1jzl0ud67f9b2riio9w3lnsdw2amlo7tmpzqsxj0tdr3cs8sjju13j77cst766ex1gq5pfoqttgj7nzzyyx5k8fn4s764cmvpxa37h74qjcjiy83lpdpy328t0pk45vup4hpo9rtb0nycnfwj25wcmf20j355c0f24s9nu0ahqy7lwrnjqzyvhwg1ogtg77cr2zy1ury808',
                latitude: 841.87,
                longitude: 234.82,
                zoom: 88,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'ddf0draj',
                customCode: 'r7b21693lh',
                name: 'bf1crqdpr7qz3qw8x62zviz3ga44m1fcnxrpy8u4tu5kgm1q01oqzc5j1cr0yheg3tfm6lfav866dkha2nu5qapfivhcsyazkenrh42jqli1u2yl8wwqozegsaxxykt1u6l1iid1p2q6kh4sx9rs8kj6h5czfqb0a0bwqq1jf6sfr19dwezb1pfnu6yqrpasq6eklb04mu1uwvgldsdy8fi5hlwp72yaiy4dtbovb8p2avmz7lhe7zxhj75yb0p',
                slug: '2ibs63whiia49v9kar9y9wqmr2p24lr9k15xtqizsbcdajtioo8ax9h3x489ielo4uxr1znatqeym5x8b53n0f2g2ldblr7pi3spd3wt3vk9te7oetphrx9dbujusn74wyvdr6olw249y4zljtjprl1mcyb47pq8kdhskndok96hi61amxdo9g89eb03cwndx4q18wjv302m9vmr9s62zp81vxc9cyind37ttrlfgoydtraboo2xggrg5ube59u',
                latitude: 640.77,
                longitude: 72.44,
                zoom: 83,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: null,
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'ftw43ly2',
                customCode: 'c1lqgdnxzu',
                name: '6ntn6yu6byz92me2ad5wu9elvgzz4echx8aga5dfdlhvon1yj24tsfcnfgz8dm67ydewgpf8bimq8ef7ofvpn8vahnmbxywwy23fg40hne3097j29asynvvadsaj3uewa9nzu4p7s757xt40i3y3e47imp8qmdjkgcqjjp2di8m9uerf5q6m1iskd2ejg2p49vsbtrq6i575wbiud5asewtods7i5ugi5nuh0bqdfxfn5adp9ovizp9675shj47',
                slug: '339yicfq26jbi1q5rpmy0hn5nykm5kvfuk0xfr2c3jigd4iad4z49v0saiht916rbarcculj2tfx0wfuo9pf48k3g73w7irlpmmx04mw606nm18o004bv8eceqh17xiift3gi0b7xe2fxcpehij6wolkz7wzf6ksh8k4q8gfxkfwf75dkh74wrsg4ajplz728xc84juxa5sdb5nazqkwzmtjoez68o2sehwbnm47uw4ts7emiurmbyoro0hv54v',
                latitude: 123.00,
                longitude: 791.09,
                zoom: 37,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 's0j0mgf9',
                customCode: 'zpa1fwdmos',
                name: 'arlpzpyzz0mcpqpcnxt1jhfh4dddb8b5fvbyj516qv7mpj0ewztozdk2xhlrrarojhl7qmsuw1arj5qnvmbp3f0j70rmgynh381x1ikxbackgg7rrow56yplp7n6mijay6p75voqczkqutk4igre9j15t3at39wq0r7ehejht3q0es70az5xtq23g5hbhxchn8cdlwl8guwnxd3eoseit8wc4dl14eeb7ogm1iey7amwnlo9d8j1qcof98becw2',
                slug: '341wgof3fcbwmp50jks0mrgsf1oacn3l1s0q07ltdky4sz1jan44i802lwjxspiidj219qptbf2o1y6n1oezuqhxd568x0gicneg950n9jkn2azh83h20q26ijtki4wt68tkbli5hll7i6h0ndx4merujtxtmtkxtt5jqsd3ksbukyxxusg30nan3m4k41vrh7gbcyq7oordwrkrn1cq76fcixioycoz30cj64oyb3rh4mk7z2kbp0t11uaw3m2',
                latitude: 954.86,
                longitude: 137.81,
                zoom: 67,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: null,
                code: '8np6t5h5',
                customCode: '950qhw2a9i',
                name: '4kb84iu80fisb8voc6x0z4pajkgybk8fpjdrf6r7i29uk94j84ovopcl9h3m0c7a02cobag4tib4hihvlnyunx0m9g1wh6vg0wyt9skru7g0h3vb3fq6hjf6t5gj4uorz4vojwz76rl3hn557ajspeeyxdeghd346vel0u38bu7vr7neqf4d9bs5hivavnzx0wcrww7xlmfk3zvf0b3xzasyyq4mb8ludn1pqoamktuaoozju3nkt4aa8dbx7j0',
                slug: '1la27nwpp7n6y8h2jxklol0keuxqbwdcm1ccuuvkvbjoht4apn9d96o3vrnsbk3c56mr9dzujsq6etgdal2ce85whp6nwsq6h4dlrfm8al08x9br9ij36w93ubdn70ierr5baruwunmelfo9ljed7g681p31fjcc87p98hj1f95eujenaton0l2snkxefmk6g0l6e3a6ufzhz058q2x7oubdclligo30d48k283iuxf5vwkp6sstyxs97rjcir9',
                latitude: 563.93,
                longitude: 490.78,
                zoom: 32,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                
                code: 'vo9hw6fv',
                customCode: 'phhqd6usso',
                name: 'dhdphwho6sy862mwh97t72xoqdc7pfo4f2mmcfacrmebyu64a03rg3wc5rck9zpqoedb9n62glvg7xt3gz4r95xw99wi7zihsnxcz0xvmd3jco28gzgq4xu2g7nmvef5ospt8b0fppd3szuiagw3ij0hqwo4rgywhpytt3omycpucotjm7bye6n4xndnmedmmxj5d3yh9yb533f4y53l0ook99480azly3xpsw7ynwb2hs8u3zy2szqjni843kf',
                slug: 'j1v8x6vt0kvrs6yi90q93un7rwb20ncyi5coyvwbrxxxtcfbzvs4a78v6knsb4lzvv8apm4q75k9vx6ev4axtt4wb4s8zrhdo3d6q9sjvdx3j9zcsqmldu8mbivp2belpwgwd2xyyhjotiv4ib68rpnzbqif2luxy9g9zw6j6a3ps90kus2kglp6yff2135dbelftvxfidxi0r1ownrwn13sh3mzx4i7r821yjwgzshv0bpzn5qhyrq37yak673',
                latitude: 710.54,
                longitude: 877.55,
                zoom: 21,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: null,
                customCode: 'czs0uo154k',
                name: '084zme12qqi4vjsbbspgedl0pgsxav0w7jw2thdpfd10k0i09r4jchn89tdkeqo7yicgl7i46hgg2ndy8mgbwlcddjw8hzqzbtf9mqis5vn0savkn30az66wz21nt45k5n5h1jbi86v3f9rufro7hbgk9022ihex60v660qwbppevkr0hs2lfk5ch49wuwsh2ksn3w971w0to25m7qnruz31oz5o5985ukp1mir5b5c4mj7jh49l10mm67gkppe',
                slug: '44aelbqa59r70n88j5gdj0ojr13w3lyhrn49r99b60jnbm6fkere9kbwe5q3p9l8yrm7ikymhroelrgfvnt88isa7qoiefyfsd3c0rcpqfldd2dypv2z2d9ywafnxb6gk58wovbmyyv1bffodiyf54tml4zmo0sayozf5f03d93x5sv19dv4c9wa7s2g4ah82yhpk56wmyadldw5mk3aiz3qbxp4sdrus9xm2it7clk6qn5eb1tydjm6ctszo85',
                latitude: 101.70,
                longitude: 379.01,
                zoom: 63,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                
                customCode: '3oy8kqmaki',
                name: 'qyp03ucpdt1v39xv8m3q0sa1a2vxaqbqjy45bt9bra0mtgkb6joxpx9ththjjcuh1c056nzoungrhvfu32hg0iumomrvjod2w594gzl8sca2ye7vxa81co2ou0nalp80wxvaen99i2bzw1k4y987sgesfw5ae1dsr8d8pdevwsecfljhbl9wjckc695j1v1er3rizhwxru40y5pzhppyjflx3zq796owqhk9c430beg0hpydcyuxnfrobkpbkjz',
                slug: 'am06oh00qzx2s3sx3i4j4mq3uvyw7c12716tmzm4ntcr3mjvv5sbnu4xnklhu4on2ia47v3rew0b88vt8yaoywj3bpqpyxhlw1wwqdclng789c72ir49bnwldillx04afajjoir0hazah08jk0w5fl4r5iljp315iuh289atxtzu9yjrqth34zhp5hhz59xwfhhbtlch753c6yu2sjvdbwr87x40gxxo05q0i2iqf3qdrgaaft4hnpnjww1xw06',
                latitude: 811.61,
                longitude: 720.44,
                zoom: 19,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: '36g0plb4',
                customCode: 'ydgijt91dz',
                name: null,
                slug: 'akqqilabdemu5ya0v8157zxptn36npv9tqhssnfg5pgypubhfmxwxqn870jz2fpw3t26u75mze92vf4j1he1h9fd30x6dux9832vn7cryzahdf1855jwoepewdl8awl8vqo8n1fog5jzrr223insm9ktlrs5v5c5gjbb21yfsq6xpd15ttu1jxf03q0xkrsebow63vxoa8xmdhjvcyk83d1hx0kt8ra1n0z4hx5tnnls319wtb5g5uxwhxxsetf',
                latitude: 837.95,
                longitude: 100.82,
                zoom: 16,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'hmjocaii',
                customCode: 'j721tfrpqk',
                
                slug: '3wtjce2rbrspgn9oou86xfvnar4fp1d4qdw4towcao601nc1jjpo5mpzjywe7uj289xnr20zuqzb3lkyqz3fjtjsnjg34lzafv6a6vzafdi7z2dxb3bxd0nex2jgk5qlphggsoqapsokc2jg50gqb2pf2kpjktwohtx6jxyahm0fmv6jmh6laljmap3gse3fxfk1bnlq3p0cg4b85t5k61m9gcg3cphmcbzfmgafz5vl7jm9tjbuh3nxapnnycs',
                latitude: 159.68,
                longitude: 95.63,
                zoom: 18,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'ba16t6lm',
                customCode: 'xbia4j2y1v',
                name: '8dgc4lm3ngbymfumhrqkp0xvfdwrndguqkah5ngm6l9qx1004225p88a2v6nh265hy5lcwypp1jlz69sa50z6phh3r837k9u9mo8hu067j5p1ukxwtchsafgm8ymwsp0pklz7euv47rfazvbdpza92oc2rtr5rs2d7jvk7gr42vsc7tbgwdv2hvzsdksych3yynh5uhzq0m9e92ddb2oa519ce10rk77ofy7k9mor3sacac6ot93q4iouubn1rz',
                slug: null,
                latitude: 517.92,
                longitude: 553.08,
                zoom: 29,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: '3zvn7hxk',
                customCode: '4gbi17q8pz',
                name: 'k9ddxce584s2dk1czigcwjp7eaejv0zq15xno450r1blpnzf9l6c8mu6nd39vvkahsa9ni070gma4liga8uznywehyfr1ry21fto1x90nj4rau8zekle2mdzk1yrxslgxsymtdov108f8e0mzkqk6updi6jmf241am9g2xzds8topcsf5gsnv42xhcwj9b848gc06nzzmu1xl1h9v8a546in82ip1rk5i0v2iqtv9rvu3b9xpnqp5sm7zhyfqez',
                
                latitude: 253.50,
                longitude: 27.04,
                zoom: 47,
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
            .send({
                id: '4nq4w6bdfs5c7rzak13mrzvrp98rnub6nlyab',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'qkho4don',
                customCode: 'ayfjvu8ddq',
                name: 'dex82fg6eubzdb7911fs9jo6sv6bpk5rkww8xckozbmr6lxo2schw0xxeof95h5lu0rdf808wckmi1bule40qppt7i2pqjdpj9r1xe54xaedrosrjz7jn1nfzn73ra0gyeievc6i8xihhq2sykgx5qdu74wuz4vbpsy1tshzq6ibqdcx87n70wahl3wthuns28caxzh2xfcz7trtcnbgelq2pf5h4w2bt4zrdkw96yjvvnflfp1d2a3sqqacw3h',
                slug: 'qpaelws1bt7kc2zy0gmqsq7zwuyib6p5kbawil2mtk7uph148yczplr6dsmvop8579n76ggwchz1b1be97uic187q9lzld85yidxsmtyg9zl0a6l06ps9q0kuu0v9jamd9ec5b0k9vkv6e1lx5ogodmxrlke20mw5slc9hrpchdatfz67w4sz8z61ogf9en90jsrgqby6j7kjs9w49hqp4rajefgj0tjhu02ew85duwt1flmxzwsogbsziaofpi',
                latitude: 909.73,
                longitude: 849.20,
                zoom: 12,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: '3ixgmhhueiondny71i9erq8p04x3rdxryle0y',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'g2s0cjme',
                customCode: 'znra4n1jwj',
                name: '65hi030rwyrlu3drws21m59h24xjpi5guj9nhd0bpfte4dh5zzj9x292kp64su3xgg92m7f3uh2jg3savfcc5ymr8i4r2impd36mqmge2uyv8t3e3avqs0m1yjerjfk6r7j7rq2o3wo0ro32w1l1zyi6kkp6kopq3ulyhmnpvqx41vitwykl1k3hz8x3w4unf8f1yrs1h3y021vukpfn9vpfxydmln3mpuz19dmhbzztcu4xs9jw057hga3mvs3',
                slug: 'rhbjrk1r26nfyz7amjyspr48wmiggruxdqkptr85jh1qc4d9wasg8ca3j204csceipxrmm0j6tuaikzo1bbggl9wkqc94azqiw2s7glsr37ez6sttd0a3iprslrl6gmeqs2bsd9xwyv3r9uqplb0xyoocl5un67w6i0nnk2c3z0v5yk3aza0vkj176eqj4oym6e1dds3kk25hrgzbni10xx5ygsqofmfukos40wyouz9pwshgcss1tx38tdyzxl',
                latitude: 428.34,
                longitude: 533.99,
                zoom: 66,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: 'hw75lx5w40wsh3acgv9m9661w5mz2ngalwjvb',
                code: 'c377188e',
                customCode: '0u3dc4n0mp',
                name: 'j6j4do6ys42jaxsx2kc1mziueiazgqq2bbmajp9v3eb3h0jlr8yxnp0fr6nrd6cvm7gevihsdqi0l3ygvhbp51b8w0tf49e2d26td39mvnrdaxmrm4k3a8a4vvgbldq8lgh4l7jx57ceaudrr31qezw5xjh4tgfzpontqki10g2enzitcukud10m85eypeujcut00cakd55a6qtdegzh5uh8as4h9u7lbopf6eo8czmravcmygtuefgqdrkx38u',
                slug: 'w60bpd9b7u53ln9030lfg4vmskzsgsuk48qkob8kvd9n6y7x9ypjp87ysjwdawkhpbrtlxo7931lk4bnhnjwwydzxwye0e823mddf56yxnokelln7qh42y624q5psjsna8j3cufecmnek54frtkakjymrajl4588ly7fcsdxwbyo9f6iiq2bco6vxmsvdtg5m48dnkrc8jgoq3z76yb80z2iv5h3zixt3m948hmnc45befzyt0kddh3gyvrvfv2',
                latitude: 191.99,
                longitude: 820.29,
                zoom: 42,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 's3q7k3t4j',
                customCode: 'iyq01dlsat',
                name: '5vv6kd3xdkkxs5tpi775i1a9l1t2zirctlpruj3u5ttfpegs45z68z3zpnkl49gvlq62ciyy4jrzzliyg13mqgnn4x04kwpyd9lpd6josdrlwr9g56lzldigwfejbxm04tbzp24bwde42rnudb8mtqbb2ndip93l0z9rhkki0hmtibvwk9htnveuft3qg8d1mhpwkfg9lol44gbrldx93sp0k0h3j2dt5stwt6hsx4dj3t0aagrbnf20sjmxxsx',
                slug: 'u10w1inm1y1tr8447ynhb22n398uzkcxxbzdybqkiyov7h6rfa0r5rqyl90xx3nmcuemmmglwbnbok5d1j11me3j5tkvxfwi5bmgx03kik56wmbywcm7qkiropys9g9xq8wep85pd47mo9e055d6n3kgw9zvmt19l0pnyjxyfuu7jghz7d2ogulumoqvgxqet65y6wao361ms0tcvl9hz51k7od3ph1fnyp15cn14yx859yflfw7dlawzo7la34',
                latitude: 238.30,
                longitude: 450.47,
                zoom: 46,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: '43rq6v8n',
                customCode: 'cyfuyq3rapr',
                name: 'm63iyoj0ynnwczlfep85conq8t1dl0eedof4zljp1cle123gtd7utp5vxoyzlqeh78iyo1x9k1lvjqgv8b994hjqayuojukknbkekco8j8cnsabow89vfv6ai3faagz4zbcqsffstnrvua4cgxjb4fru7l35g0egrw27xsi38ghvzd9czqz34hbir8gv0m5tbgjs91iewiv1kop1ond9cfh1h8jd9sx19v30g97dgao51ta6iu5q76cq4xu5gzc',
                slug: 'qyzw9q0m1ew8hjite1bsbnc01sul5fgnpxkbq7ztagcovqhk0mf4gi9cjsqppbkx954acqseop2t999ngh8vgpsa5yi2vutftg8bda83o7hkbnjmhgcr95aothel8labt2kax1afyc6tz62n107u3p4u04l46qlk35wgs7rtvi3z9jy63v44l3jh8k1dgihwuctrbs37rp16pm6ovkzlmqs237a7j5zj6wdpce6ylbwl4i5wqj3670172vyhx1o',
                latitude: 168.42,
                longitude: 251.49,
                zoom: 13,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: '256wrzj1',
                customCode: '0u21lw2dwq',
                name: 'vm59nfp02c8mw9dv1f01h03gleifh36yjmugyuh5cyje709b5h5ol1u0ew5bppz66n0mimdd3gvdv4e1j0hnb9y4gpypaba4kg5ine1sp4jaywcvlr9uxzdehcx10n4t0b7ytxoqm5pnxibzxee729jekaw8aqje8s1huyfflrkkoj2q4qvwvyscv1uphzfcir1n6xhqkuxfozkeme8zo5997xobjpf7w8pcrg61kfpyv8zcmy5hc55hswhybcdg',
                slug: 'yubcpfm9js4j27fajcdp2e38fgwwaxbsvb44tcdrza7g3hdfndm7s3n6v4y8glyao3khsb5epe6ohbzluxxrl55v02okem20tom588b925druhuwmvlef02o4voycc7tk3ihk2oj053yjey2iywkaq82aflu6586hvst7t9au4dz7jgtkmx90pk8c6aobum28cejf1zgtnl6sbz9dce1jo3yu6y7dzw4n9is376cbq671jk5hseq39zhw76cs56',
                latitude: 755.56,
                longitude: 579.09,
                zoom: 70,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'mtp62l6u',
                customCode: '1s6ic058nw',
                name: '3ejkec3b2zgoyh1a5l89mjs84ylv9w9mzixfwyw1w8fervqj4n5oqinoyev7vpxqi1fkcjc62xs8u6auqqrpebteoa02dfj62fla4ztp0ltq50dwpuvvxj1msci2j9cmazqjwmfusf6vi83a1oxux5veu0htt6vzuusabzdi534czrk30di7h053pve878ksfiq15th4y8lbvu22xvheoo4dbjz0ajtv0acq9hupkd0g92lsfyvyg8kehus4qr2',
                slug: 'qi1a1ujq3o3w2uyxf83zzl0tr2dh4qdxfzbj5jro98jq5zf2mzrd9ivssmn0w04kv5hdk08pwru3nvg8aod9f1v7mfho7t6wvwsmtgm7uqm47qzj7cilr50u6qzw6xrsb59mscehz64mo96mks8evhbww94hjoz21oz46sjd4gta4kzk2rvbl7veiii9vnozw0h5vnjgmlct9rhpxiqb32ssjcg8y3yzjarq9dcvsiqnu3r7g3tchqm72o91w8nz',
                latitude: 668.18,
                longitude: 822.51,
                zoom: 24,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'v3s2jdm7',
                customCode: '7tvpyapjkv',
                name: 'v4gz29cxaqdepq0zmtosl1jk7mqz5svztqa7r3oqk1q202u0c9yul07frs9f4ovveo5zgow446by0qjhc2hobw4y5atq9blo8n2vcxiww5v1b7ftdfv58laoiuaj1esvwsmoj9kzhm7cd9bn1ibd2wcslonboox3ugfdvidyt9baegr98q9990cp95msub6ymwslf3q37t8a8n52bgme7382sixywh6b11d74idbyp6erjtimqfzzf4ky1nwptq',
                slug: '3iua8hwu7ygcu1b7b32udboi19xa92ehsd6cua0b0zbrxuraf1nnykvbaufi8djx74hxhid6ipxktr2pjp74lq2daueb3u7ja8floatcmu9q2hawz3x5lqgkapvbsy7rc977ejj6f6kyp3yzk0jmisre9c5sn3156ri6wheuqx2638m553cwubuv99nrybtxj1w7k9mxzsh97dgm7ydf124w3r2bpyw76tijtqaq7ohroyzoby0qi4w2nqfbdjk',
                latitude: 797.62,
                longitude: 327.65,
                zoom: 78,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: '4dym7mm5',
                customCode: 'gcud0jxood',
                name: 'nouhsr95tc9jn3ftg84k8qm59mrucnx63om652mq9gbqi3gyqxyiw6l0svydi2wwu5psv3pqv8tg8c2rt5bbakp4et25dovb1ku4lc8z3xmwusfnd3ormby8s33oqnjpgjffnl482csdtkd9zdbdkac24tx55ivy8hc7unpns9d89zzdp98wwkdpsxn7kpsil8oogf46lwptz3w6wbvt84tvwi48c5h0xoh3rgf9v6as8l5xfoc40ddryk409xy',
                slug: 'esgxnql2oxou1mqeyisik1y29qcsrsj7soflztkjwzs422toanwkmd3sax9wtmeinwnazivt2x54ighkeeje88lm0wed79v6e6wnjorltbxcsdjm87p7gkd1yzkj101w0vyrf8q3wd6eezio7ewyoleyaz8zcaq2t718s0rwbp02p1h1jzq70rcorut8fv1w58hri2loouguatis4wwcsr56uyyg1yzo4ut8356gg69mw5y0540m96fjk56s3mi',
                latitude: 482.81,
                longitude: 986.04,
                zoom: 45,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: '16nphkan',
                customCode: 'oyocu81tdn',
                name: 'k6t08co43d34ul2ifrfmk6nyy75kblf2wwnld449msk9fnyl6f53b7l89htnjoyrg0rfq9dzl7h3zitzx5qwe42hmrvoylvfrbx0ogsgmyr7xplzq775n0grbhtie9nhezipupxu34hpuwte7qfmspqq08q4djlerkbkwp9z1klamyle7ql1os5y3cmqajytfnstl0q6oahn8lp9vrnpx8runqxsocdhklaubzcf0mq9fvcaigfytisudeyawv6',
                slug: 'rx5zb6jqbvcoujqe5imk4rg33ezy9e33qzt9zrxvm27thh585q3vpiul6kdtdpi3xos9uglkdlpidafbzbh5d6wk1i0lz2uvddjctx7cid70ebcqd6qyb8z19uui8wkxgsyfgzb1dxd6ix60x7duo99shyhfu8mg68atz8y6k7t2ppagykxdpqerqx3ue2f23m50p6aot4z11gxbi4drvrrk577n6h3h53y3b4hsjd61halsox7t98h3aw70ta2',
                latitude: 575.99,
                longitude: 796.81,
                zoom: 582,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'pa34boaf',
                customCode: 'imrcpambk7',
                name: 'u4eucc0etrc826alh6xlegcpki2s80fakvijdci96iqke37ygt609orzp3w011ghak0me6gze3gy5zm382mr896exjc4iy3aqbkzm6mfc6udxnxvu78vi0iqx5ocgwquvy8e8gwp9m8tm38oyrntc8yx64mcgpk0eeea6xd6zot5jct7f84h1nwqp1v08yf1srhuxel5g3ybzbk3coflx0wufna31tbgl403d2c3ihd6pk1y1j9ukpdg4ay5js0',
                slug: 'o8jf9rzenpkpi86cmasyb2tm6nk69aibwz624pji8eh0sodkzrpqiwyyiu7omhuv70mruu5fv1ky3higmkvcsrk85fmkmis5bjrvpss262ezfr52aujeh66llouzk01hbvrj5xwj8tt3gxre502wi1g6v4lxca01huouuvspecj8f4s58x2ipvjugid8y6d4jgyrucjmuu8ff0plf600ekp2cjxok3sly0dv90638fqsosetgmlx53j86rwvnce',
                latitude: 204.92,
                longitude: 475.11,
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
            .send({
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'flaa7qdo',
                customCode: 'zgc4bsqlec',
                name: 'tyz44enuc3g6qab1ml0z5wdoleha7cv01nqenxncze9dijc64u6dzei9vhq4oxrr16wmp9hoihafjuzue1dlhozp569l4u7p11ye0lnrp4mt7y8npfajze7izttnlva23w6f6qukqstin8aqfpf4c15ms89g1k5v06nmmaqwa9ptk1o1lxzl7xtojifse71nofvvklcf516d6sfny78ptflbi95sqjajtvc49vkstvyhovmk406oyk4ed76osf0',
                slug: '3a6c2wchdjzy82837oi6cxj27ackwb06fkpb9a0nof1zbyeq69vgqhn9k174ppyz7n1iqcsn8dfzc3j36ivz01bqp64mtnaqyh6f0aes5zzssx3isa2f4gss9g735lkfjatr9wv9ngpwt66ntmjmppbw30ppis8rmtu42h256hnl384wm3eo39d5xn4wm6dmbmsmu9is49fixdr5moyl8huzu3qq4un3p6xlvpbsbtp5aouy4xvsh6cvv6y7unm',
                latitude: 335.20,
                longitude: 212.98,
                zoom: 67,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-2/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2/paginate')
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

    test(`/REST:GET admin/administrative-area-level-2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8031cc6d-3d43-4d5d-bfa4-9f54e19e1500'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f272250f-f40d-4fbb-b44b-10ab1e5428bf'));
    });

    test(`/REST:GET admin/administrative-area-level-2/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/85404f7b-f148-41c8-a6a5-c0620206a38c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/f272250f-f40d-4fbb-b44b-10ab1e5428bf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f272250f-f40d-4fbb-b44b-10ab1e5428bf'));
    });

    test(`/REST:GET admin/administrative-areas-level-2`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cfafe7d9-2538-424c-9089-24ddcbca6461',
                countryCommonId: '744186fb-e577-4ab5-a2b4-dcfee9ca01bc',
                administrativeAreaLevel1Id: '512138fd-b225-47f2-8002-34fb465874b6',
                code: 'xpv7rfdm',
                customCode: '5b3bffwk1z',
                name: 'trppmygyjw2h8skdvrw2dv1o3xnfrefb9ay82e5ybup1d0c6bl69dp5sij3ntl5str42qf7pehu2yen1hvtymws7akuy9b0y3u7rfbb2fm5tzjetpj13qtikkqj30w6lob21h1boxogoaz2oy9lflse3jtu11kvb6jlnds233hplpfu401c8fvsph4t0xc0mga4awi7xzfi9qupkxg7priatmoa92bk7clwmg2lezv21ddxpv7cpsik6mnwjm4p',
                slug: 'ombk44hjemh13z2ibp6hyratv5f0gu7h36gvn4rvteari4hh8jdhd7xepadznvxpvm0tp5gbsl4ooqm4y8j9pc36f4ebzgoxhsgjyoytev0a1c0605b13v23522r4k3l475bnx31uhsmjgqmftpz82kdt6zcgkgnuxx40ufgdj5ly7b98s9znhr86agwjuqpnpjt5ubxlmkn7mgvts7f9d6amxg67550h4b84m61ihxnkmnyksg0hpb68tuvlho',
                latitude: 360.23,
                longitude: 789.62,
                zoom: 12,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-2`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                code: 'p4em976z',
                customCode: 'lc8ysavfgj',
                name: 'tmow3la2uvdh7ubiqnv3v8zb14fo6f40kf09u4drmdsnwdc1anf2ixw3tvwn21z1skzqnh1f7htk8zkiluw3ga4eaw5enapikjcwey60tjrvp6vipr71xnkhghgdhmrcj8k8kxqzdvvwdyjtd4blywcyks0yckdsp3b9252u41eiwl4n01j3tfqr25x6y8vf3gs1bf3pirtybnmfcylg0o18uqfd9xvdecap9ntz3o51u5orhxegiui45qvm8e0',
                slug: 'jnevs3pajxi2fil1aze0dfp5pepjhjqfu92ymf0yjc2463e8as4y6cxjeiddrszjij8ot8p1e86aychvgwuwfmfyuj7qonznclbx0hq2kgmyubh7m6ybs4jn8bn3df4civw288z4xvbweynw9jcnvj6pp5gs4k9jxeihlg2qdgjkmdijnlixsxpk1pgna2cg8ir13ew3p560wyomc2pp0wskykxbtld48f47ihvg41ya5qk1vltzriqe4a5kgnh',
                latitude: 966.46,
                longitude: 691.18,
                zoom: 82,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f272250f-f40d-4fbb-b44b-10ab1e5428bf'));
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/6e459f30-c519-439b-8dba-a3aa2b2a57e8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/f272250f-f40d-4fbb-b44b-10ab1e5428bf')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel2 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a2b2e007-e170-45f7-a60f-b48546457c4c',
                        countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                        administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                        code: 'pa4wdui5',
                        customCode: 'liuqibodsa',
                        name: 'v6c85jd8t4pa9jh6t8aamyyi1lpc510jm9b6bnb5ejnfvv241y0l7imseplc5xeqw85bsjt6whv285we7jcdxt9u28izj8x6eiuu3ez1jt21k7f522ti0gbk54e5xozi8mcouazaocqw0h4qxdk79nc26pbyiqf6pe0p7foxavmxrsfhrxszwqebqsaz15r211mob85l674lyou3av7utz0tb0d75iufgrnffot1i5j9oy8f0whu3sdn6oex1x1',
                        slug: 'afzmxb9bh6tbjj794lnnx2uj44hogrv4osk7jmfcx94xp6qf13nll2vs6usga09qikdeyi3whlark8m7kmt1z1f7nfbl4r40oegt4d2rt7kr3ttc2nnttm2lm5yn27yx7lv6g9osqoxob7h9jkw7zgkacrj8ynt546v6q25xu556j6bg7e4ympnvzb2wzxporssjf01pylsd1e4pcwgjzqpenv745rnk2fi6uswvgo5xgdedyx2cx83yz7xi8l7',
                        latitude: 455.15,
                        longitude: 986.67,
                        zoom: 16,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel2).toHaveProperty('id', 'a2b2e007-e170-45f7-a60f-b48546457c4c');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '1340eb71-609d-46c3-a782-60206ce86ae0'
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
                            id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2.id).toStrictEqual('f272250f-f40d-4fbb-b44b-10ab1e5428bf');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '525da4bf-d813-4906-9f27-6738b01dfb65'
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
                    id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2ById.id).toStrictEqual('f272250f-f40d-4fbb-b44b-10ab1e5428bf');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: 'eb3e8186-c77d-43fb-b00c-12f60ce0b145',
                        countryCommonId: '8d9ad1be-2412-46b7-aef0-020940213156',
                        administrativeAreaLevel1Id: '9e0219a7-e7e5-4508-9fe6-b7730edd6095',
                        code: 'kcx5c0k4',
                        customCode: '0cu28ozo0m',
                        name: 'j9vefv96vz9ogr93mbjs645zf0byijc4y1t9ha37y8ghfq2e4gxu2zi74az6tojjf0amhb45uwni7adl3koizt774jtmexm7t5sp82c7xjnoiu5b34c2nnvm1ds741cwmbur0y298m5o041hqor13egj15b3tm8qs9wrxp5yrqx4uusbbsjzo4jtc56puhyxu0wqj8s7jyyeaenqtzx42xwkxk8b3vzmlzux2lbby1yrguwabile5bkpqe4w4es',
                        slug: '98wmtazph2sm6o6e5kvox6cb0jkx4j51rh14vhsr21n9zjd0voy3d8zjknqi8w98jfissr60knu4d9jedzclbfee0khb7ii0n4bfcbqo1c7ms2q0k4dxwafeb9lhafbcjoa3u1l2clqczxf0sk1eowrmhyozevpwz18o59d27se7hkftuokyswd77bu8d1nquluvmkgvvd8zxyfdbx684sxyyqyaewzfch6tzbbjjxywdbz4m3vsedboy9127sv',
                        latitude: 771.12,
                        longitude: 971.75,
                        zoom: 86,
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
                        
                        id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf',
                        countryCommonId: 'a6ed324c-ab69-47fe-909d-20cb35ea9f86',
                        administrativeAreaLevel1Id: '2e044bb5-76de-4b3f-a695-f13ebada60b4',
                        code: '9gxih28l',
                        customCode: 's6orhjfhj5',
                        name: 'jvq0q5mif6hrddzhioq3vi30634lgm0xk5ydp66gqltzrujx4ernfi5wc5ip5wzeqdogd88jtj91eh712pkmslpsk4ve7npom3dx6o7wverlnpolm0chgydq9rp4hpg9teszl99lqovj1610jhdc86y146xdh424xv0mbu1ad310pfu00g6mo7a1u401yb6fxpc6dwa99mfmd4o1z35w35gclz1px9lsykb5jnn4j3vkrrgl3lwsriezpi72cxb',
                        slug: 'zrvrl3u98u6rpghmxpbr6nohvkdmxmxeptyrfcb8e42htke3vpcq97qi8iuwa75c1gpnupkaiqe678z8sqllmax4il3mg38d19wil5rh4ki8t6lgmj10deomtu1rtzv5p5he5ohbk6wjsbpl2lsczukjf9t6xzse674a583j3k8j3ncbbvb4z4b0w98vset65uyqiam5stwubvduu19x0m8uxksvwnmifkv9udxn6is3jp7y0gj3ar7li8txoth',
                        latitude: 584.49,
                        longitude: 212.83,
                        zoom: 61,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel2.id).toStrictEqual('f272250f-f40d-4fbb-b44b-10ab1e5428bf');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '8e08a296-5a24-4c3b-be3a-eaaea88763ae'
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
                    id: 'f272250f-f40d-4fbb-b44b-10ab1e5428bf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('f272250f-f40d-4fbb-b44b-10ab1e5428bf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});