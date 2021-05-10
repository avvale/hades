import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Seeder } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.seeder';
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

const importForeignModules = [
    IamModule
];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: IAdministrativeAreaLevel1Repository;
    let seeder: MockAdministrativeAreaLevel1Seeder;
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
                    MockAdministrativeAreaLevel1Seeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        seeder      = module.get<MockAdministrativeAreaLevel1Seeder>(MockAdministrativeAreaLevel1Seeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryId: 'f63b5541-7a9f-41ae-b7d5-d0b0ae7e6e91',
                code: 'rj8xq4kl',
                customCode: 'uu79ar5b83',
                name: 'qkw3267fcgjjwlbtzoumxwybid61qxo4cuvr3y7xn7y6o812xeyb3zwjwj39gv69zfb0ju3z5bqwy61bgdvms6y7kpor31z3m5t91ovmmwlvya1r6q0imw4os4ennrmgcu9pgjnjrutzzde5v8086p76oq58e74wkzyortmi0s3z1d9xjf9toqic5nji9pktc44bsctz1bskve1z2ri8rmif2mbu1fzl17p64c3bq09afwsdtse8og8myup7buz',
                slug: 'ow1or88602gn3r82jhcxyq7ul2mkpemfmqtvym8luujdbh182t06chxmh5jrywtp6h9q0u700z89s5hk96ezhl5tly5w8qyt9s63w4g7hu0cpfvuf41c1jo5l47tgnu1bv8079rsnfk438c9kpp3ghdn609eorh22painah3of32859xhae0xye8cml691mq0sjmuftg0gh47yrov2t4tyevcuqc7j93c3x4z6mhcaewsd3t0i4hzjieudhu5py',
                latitude: 62711977714303496,
                longitude: 79854244074218110,
                zoom: 54,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'de7d02ea-58fc-4068-97e7-0294dd874d4b',
                countryId: null,
                code: '8cxlqwxy',
                customCode: '46if3a0fpw',
                name: 'dkw2xi6ebdozeou2m8b0gh6y6lljtjw848eywraanf0vw1es3vcfwbafgmffq3vd1nq1uth8azg2k4wruz9gol5skfkz7rx3xg2m9ohqswzw8cqmod1q9b4xa9f9asejfr5kom58ckxbbb5i83hwn227ds7zll6dnlr8vns02w3xzus6n7wo79oflqdv0nhzyr8ygphqy298vah7o92gcoktr4e3hgrxzsaw4n6dagiqeam916cnki7d839b7fs',
                slug: 'wgyytahpw7w80nyl9kwv4zxk96xh3aff71375y8tqiy4pndmy8346ul5d3nh68xmewto8o06ohqju38i0d147l1p2koquy3vbmq5ufsjnf6oe1xey3tx2cuvffh1reqtrf3ohsb5faiixb4hdcpci2cuxvce45qfpfj3rmvncz1m948yrwotnw9oxkj8fwn4kfpk8xgklzp5ah21oactndntf9a0ls4pf4432m9rzt08dsyispxxhquggbpff2m',
                latitude: 84303803138826930,
                longitude: 71082385839182904,
                zoom: 22,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '15c4f304-abf8-4208-b163-c967c5b1f144',
                countryId: 'f5d31dd9-d295-438d-8bc9-7de7847ac4f9',
                code: null,
                customCode: 'h6yl2nzolv',
                name: 'cy39njyl7ftpacvcvde1o454x5g4spt2to3awzir4k3qhf9beua358z22m1cyps58jsuq0yj3ab4ej75vcsipc6sz5h9oe261vp0zg8x10trfldrydc9zv53zuggmw8yuz4o4z3tduzmxqom75ssg1e8p6520yftm90tjehsah45z2otwp8195no0obn0dpdvgrcid2nbmt2hj4wpfl4ap8b2ri1oclmk2muwtaqkpp3b9rod9nbmswcmmjp1bk',
                slug: 'l3yen4d844ko9uq4563jcfs77imuuwk1xdfcua4mzpugwq1ukb9autsj4zns0sseyxxacd632613y6bh3uw7pgm1bvjm08l7hifsxzbh9fd2935kzgsemqo0raj7b6hynag389rydg9oczv4ujqzeoxgz0adeoqe6nlnqiboscov8mgwenfz7j1uckwls39zs98yctf14u3fuaaxzpvw2hsv3iuiwqle9swpowuul6uucmkd4xvy1op102c3wuc',
                latitude: 98302359710369310,
                longitude: 15307574916322504,
                zoom: 48,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ae0841d8-8092-43f5-8a1c-c25c12563dab',
                countryId: '982fa80e-b19e-488f-8755-558ac46a24c2',
                code: 'm2b5j9pg',
                customCode: '2g1tlxuxsd',
                name: null,
                slug: '6ebpbuk0sw72yy128zfaxoqoutqs51azar816nux3phra08ekdos9irm60k9nce5j7vtomwmtdlbyd7kl2xcpyevgamblp51d7zan0z0jht74kdygkpkfokyh6pahghztyv2mm8j19dertspw3w7hcggj5ofsqnps56atvb8eqxant05hbd4vkrvotmk9lavl37tji3upmcnjaiujxrmvvo6sgtdu4k5qlzl5soec61acb9sk7yr87g1uylatqz',
                latitude: 76825744930122430,
                longitude: 83522095738659520,
                zoom: 26,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2446b196-1bc9-4ecd-a567-c36e25f3f1d7',
                countryId: 'a34695ad-66ff-4451-8e66-a91ef98e18ef',
                code: 'hfn28hqa',
                customCode: 'qt9eadgxjq',
                name: 'laiet7pku4z44du72rr2i1ejcav358rlmdpi7i78idaoge89wwx95io8emw6o37wse34gtqrfcy4j2lllftv164g2k47otg2r1nxsvzb5fxge79btfoe30mvj8dh0do5ptbfteauvchbar1stavaxc59fkjf5yvbg8dadq29cy9ec64fqa5oir3j2it3lhrgkinvctsxm59pblg5n28xd7mzpznyu85m9yg5cx2pm4qqc9gj9gsap1xstolxxab',
                slug: null,
                latitude: 54042392491031150,
                longitude: 29542246496435490,
                zoom: 88,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                countryId: '8769d418-598c-49d6-9bc8-48fefffbcc0e',
                code: 'dreinbw3',
                customCode: 'md7a5w6ysh',
                name: 'ol29g4dc6slmd6hyyvgjam05nqdsu5w93zh8wfbsok82g3na5l22tu8ejeq3dlxbr3pveb1da3f0j0cqvzig3chpjb0y41by5ka85njkwjmb2i0oa1otqaqphtsbe7zwngsm64n00z6lzqs7wuo5owde5qrgpnf4kkwkyjga54tkg1qn4hsnvfttx5a6s5dspyvy199a9ww2tb9r29kdodx1czf4385oph40l8wxjpjj58qgoybniai1iajv6z2',
                slug: '9f6rkxbdr1ydjmc6mdo5yhp6vsdqyxlnu8yqbpakkzcord5rvi61wgekfqkoubg993t2k8blo0yimq8lcpk0pveeyzefpy0sh681dhxvtj6d1qzyx8f248eel75ygizl5n8dtu9nampvuq3s944b8e2b5yuxfoix8t6auyg7obxnei4c5eeaw6n0za01aupshzz6eq008a8kgqgc7ux0klqsigbfouyng9gjtxxxoci0cyq2eunz1485vy6agfq',
                latitude: 38281144496901500,
                longitude: 34196945616119068,
                zoom: 15,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9a053d39-b08f-498a-8e19-a2684a8347fe',
                code: 'ce6x1xzt',
                customCode: 'udoi715fh5',
                name: 'kj7sc1kcf6d38fg6x3vyl5a8tsscurioh12jts2cmzmih6wr07m8suv5kbyqwxrart6yc7vwlok6vccl58pwsrg481e6pwtwvqma5y8jifj9ppslicoo4h0fidudi23f13hdji57qtca08acfj1dc06ryps3hbe90y5w7xzschclpbngiep6wa4y5tihmauwg8gq222mvqspl4o5pnz44lajpkrr1cqjelehni64r88sh6beh1z88ogfqaoot68',
                slug: '4194bcat9z9y7ih6ewh486oivcovt5b3pi2xj69pxy1xwm864ktgb8w1ceulicus3ytzi83lptrtmaywughyl0mlmg6jn190q8bzmf0vebhujd1jjvw4k706nk4dpdenfktw5vr9ue5540w7d9bevzq89ng2wk1lpfly2cu36g5pw0fagm13qxxl2g407mxn7ng98na3q2he53pm3uewu3whutuok3s4p1cg0lmxpp5ecdredmftrp3rv5zqfo6',
                latitude: 56802646218644610,
                longitude: 41125467297168690,
                zoom: 53,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b96d7b2c-40d2-46ea-8096-25ee982d95cb',
                countryId: 'c6911770-6872-498d-b578-60d651bce648',
                customCode: 'h2zwc5dydf',
                name: 'ixkid83uzqwa93idrop4rponmkc0kas0crdoj68fc8k7tgihb4zcv2pjbc9ighbn9dlpp2b1tym7og27pcp8iwcjlcb6u1v54yamc1fv506h697u0rsv1ampeq8jsjp15nbzv8dfjxti5u111c60nse3xydxt28o5mpzj1hz8y5k2tdh0z6xlqnzk1eqbdu52ifpneiq8yl8eajeed3yu2d5m1oh1cvqq4lzorsmaiztthm7d0z1zxl39xbaoff',
                slug: 'l8mz6iknsq0vk9mx5shbzwu2nmi8ci733xp32xcg49kouh896k3wg5ify0nn32qwj6aysm4shk7mmd67unoueq8c9u820vu4ivb7brjmgr3mgyi73vsoip9f8fxmmwuwcysy1xffbyenzeu80hfbom9rb9x31v63esyqs7g1lk1qdrcvk2rawet7zt32r9p56r8523ap5si5da1y9b3op8yqzk28mxr9tv5g4cj47nzcmaqqgk4vzenaz0jn0qy',
                latitude: 46077183910535540,
                longitude: 79854699106501000,
                zoom: 89,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b6067b5d-57c1-4d77-9292-8d227d362610',
                countryId: '9d2620f6-6288-4ad4-9d9b-ef31a18ed68e',
                code: '1boy396f',
                customCode: 'xhxdnlgsqh',
                slug: 'auaylirphatjwgr71adwm0y12vsdtat8dtzw0cqcmjnoi32k3lqlg7iwzdkdsuc54jomoo0lxy6kfrl80m42zq77aldtkdwouuyx4cw5lz203ppogrmn14f9uu9ncqo5qx7cy3lrs393ss3ij5dpn918bh8smzvkxwu3oc6psf6upnvepcpto26ljulg71jcylf4szppngsgi7fquxzq30a86zkrdxfd4h31c49b17g3sg2dwv0s35hnoj60axv',
                latitude: 15980598802746176,
                longitude: 67384288103924550,
                zoom: 63,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c3557889-bce4-49dc-9095-49e42bb247b5',
                countryId: '9115bf06-fd3e-4196-9a0e-925cbd2bdea4',
                code: 'a5uzplt2',
                customCode: 'anrrfpa7ra',
                name: 'u4i18stapguvpowy4uts8kk453bw2vwphklha9gk9awwsrytvvsndlwmn4qr83wzt7bm28wsk5u3kajx05vh1njezphpwtmr1764qtp5t30nckb9ownsz0faoybjjtbcx88qk5b6n0m0ips9i7v1el4mwnjq4k632m9i8kauztsxl65k3s9l0szc12uutnazhai1f3mhrp2huyhku3mi3uehyaraigrxkqrqkm8gj9oahr5aq92pz6l9oyu8ppv',
                latitude: 21687415516676710,
                longitude: 25800384820747100,
                zoom: 16,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'jgwor02kuv0pyrc28ns26cqhaqapy2dqjwsow',
                countryId: '1daa9da9-0259-4877-9d42-3788a5abdda3',
                code: 'utgg70f0',
                customCode: 'd2lj9cnrwj',
                name: 'io6sqn8wy9vxtovvxtfcjca9a5puevr7607x5fdfm59au0rpnh7siujaj8f8td4c0g6tyncgng9ovru2mdk74rwe9e054cumfj3m36ru59x9oj0rc98gkqzgqcxsj4ouj4hzhf28yazacg8fbwlk2ljevkwzvopxez423kz9cf3htxaacd0tskgfflcxh7r1cohcir5st0p1uq77ugxskup7flv4wex50ujjip0jgcgb9lzg6kmgbzdryea6ya1',
                slug: 'm4tpkx7tgen4moo0u6gnijssuhzpaz3lpgoqny1rm2wr99w68pm2p8krp2yibkjs1qx6ok1x4evqf1373p9wne8ih4zw63mqxt8cg3lpijgfglpqz1280ig2f6lr6jrsluo6a0hdzbumzbb72o3qrkuotrtpmis9mjp3if3x5ufa6hmk3ata0y6u505662t3ybdtbgxctrucxamb2dsqpr66zt0naisrmtruj8z9gbhnhaqzdnuk2w9bupymgzu',
                latitude: 81231993079196100,
                longitude: 26527471061121450,
                zoom: 89,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '41c82c3e-2a1d-4488-92cc-c295d637099d',
                countryId: 'dn3w5m67308gep88ajnt4fu7sm6vgy8l0d6og',
                code: 'ijglz5xo',
                customCode: 'nk52fbxllb',
                name: 'wkv8m94p1v3i6exx3r0gmervj7ak5dd9qo2lr1qh6n0zfpu5bqsr1lzq2m6lk70z0zeit8sp9mzb68jqwaw4vq0xlztrl5z21mcm78fq4fkftmb55pyebxlnz9ty5b29d41jpyok6e4a1j9p36pnj5q4ojp7fmnar7bvm6chhb4630mvzklqud5u6tfd9rfyh5vfopns90wnr7x386p47g8yoh9kr9wbbntiau3nzlpxno7jwp0wlq2kbefyuy4',
                slug: 'cny0lud5xb1whd61a8c9waq02stuq6ds8f7b4jjiwjszjjunde38ataw9al231llj3fild3cg4srxtd8f1ns090c0zgp74ubwf740zv225mad3zxh0qiuqaoi1jx4exa9be6v1k6shf1q455c0ejg8iv4k5cy6p9sz63o0twjd2s06e16qpq6kisrdbjgsnfx8wl1f1trog1uotzsghvsof59r91ez68wz7tkccf1oq0iervyu3dax2ajge2tpg',
                latitude: 92260090517644320,
                longitude: 70032747698542240,
                zoom: 50,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4e269f8d-f589-47d0-9de9-87947f86d18e',
                countryId: '347dcbc7-8308-4745-93c4-dfd3c3c37812',
                code: '2eoyt3hzw',
                customCode: 'qzsb4zd0ou',
                name: 'aen4c5ghddmcna839sx6iwt2aos73jw91nll8ycl8mu9fg0kydjv0hj27gk5d9e74l8xjmcvbprvrlc9ba6x6yngy9xvp4q4jb16c4gj464hdrv9vjqknqj4d21lvl4jfe6ibrfh4s5pzei9nl2dasnlvgf7vzrdknlhot0wh5wi7b4ko0abfdjs7bmn3fnp851txys54k5zmgborq5ispsatzbfgf9d0wfzheygd7dapreu7gga2vsj8ye6kal',
                slug: '3d2o4lxq09i0ei4qebvocb5190lk5yke0pj8nlmrrfbi2n4z8jdoluj526kauy1w6aqsidmjcoz7jmdn6o76xriptnnd83ujunxfg6rncx3t3db2sgel93dylkcquevz47rkzzltwar6gt20yf5c93rxn5g157l1hx0z9bqdk66k7ff39ec47fhm5izsiq5suk08l2906ll9clzbg00ex5y93dj309le335wezph9iqgapluicrdw4sxo19bvd9',
                latitude: 54544406950609160,
                longitude: 39180067017773900,
                zoom: 63,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code is too large, has a maximum length of 8');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '61bceadf-c6a2-4c39-b8d9-ed1f766449b8',
                countryId: '66fbe0fd-e4cf-4448-b642-9c205d93baa4',
                code: 'y92bq858',
                customCode: '332hvqcmh2b',
                name: 'b99cv02malcdjt2783xfpi6q0tb63vja9vzfnvla1gaipy93iw6uxns6jg21djm1wxxooszxxpocywcko6wv3uulvabew4ogciiqjz4v0x7f7z0ign68vh1v49a3y3mg4287k26kjsjuxdzes4hz14agjkriccacaxr8frud2tpqqd8mgo08cc6xqm3lin7igi7tv6uahv848cw3um5eiwx57qnnljseor8wkwh0osos44tt67kx4ixhllljwmc',
                slug: 'zfsgfigs7ekyptpmxknjuyuttnrou7kz0eyed3pz7xrwmxv8xq9lcelou40mr69xhiirorvmfzx95zp1l9m2e73f55c15bxmk1uueujt53gjvvm8ub34rvsspcq2c3bez35ot4e336n890ghsms29r2gxlgjup01zngdvtxz0rdwh55kvtrowqkxw0pblukkzzp02ujf5aiojv48xsd5fgrefm961jyr75guo6w7n14u65hwtwpegnb7e4pox9u',
                latitude: 75647188990774430,
                longitude: 70648484858237910,
                zoom: 83,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0739208f-1527-4ded-8ee4-7ca0adb7fb80',
                countryId: 'b1356c55-e3ae-4821-a84d-bbac8fb1e9d8',
                code: '8s9t425h',
                customCode: 'nvpgp29ijw',
                name: '8z21fqwmspio47yws1m3373jt9mqdqrw3auaft0v8dn3s99exsvppg48xs1xp9g7xtuxvvvcyv1cf0vzeyrprf6yi37wr4k2acue6f4rd79tzo37fuysckdwop5rpjf83k682gzb4jk38dn4n4nhybjv2rzvrkr6j60q9g4jiuiglv0vm3lp63352h5j9flgxyljqvioosqmcidjlga707qbgi71xpaedku83fmrk8y4ydvh4l6k2sfpmlx7oecp',
                slug: 'mx5kl8hmso1gepmgo89qlq35ll51zjlyzsemzo8mtu84xuxpbj86unmv6l35l939er4sqocpl90j7vnxqljn71jrav53nj4v9n85rz146sh2j42mfxzkq0jbxsoh8ycjos405051lc12diwgagoo90hmaaxp2sl104bslp9u3bxw39tx233271k4nmp6duww3wd6w3k2cqi408o2tuka7dl2ul2gzr31yvjhhnc3ttovf4ap0fmnttvr8tn0d2y',
                latitude: 57094075353057784,
                longitude: 12953019455746676,
                zoom: 75,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c9ce4c91-0b78-4df6-a4df-34187c219008',
                countryId: '967a2071-1eff-4a2c-b8c7-e3f03d048bc0',
                code: 'jhijrinm',
                customCode: 'zgh55afmyp',
                name: 'z5lpfop4gxu4c9cuti99l7cbezkrh15ahktk7muzmmq6cy3bnual30z5gq3qbxqn75wsoxq8vm177916xwz2ad8uxsn9szharmuv1hp49r13a9y1qrl6lz932cyk2h1x1o9ki3kyv8alfepc3uq3awzrabfnpm8ta9lft2mqg0vibjx9txeuhve4qtiv0w1d9qnok35sf0va4y4znx77kxfuzothdmkdczm89x25gaeksahz8u3z032wadmer3i',
                slug: '57ktumlf4mydmgaqtylwb7lgdzjy6njhfvya4yevuv3qca6mhoermq0k2ob93w2mue1u7j21zx3rjynf39mk4c2hax797z7xs3h2l3uh7et3p3ulzbs0ekttv0lczbyibj3j5k4jrjnq6mqcoikuk0b88b14ta9pzdfdoy667uo6dgba6tlpb6smtmeq9jhxvvdd51l60gmj8mxej0ls8e8ib094dy08bg4hz0wsi87ck54mnyy6a7083hqonu7c',
                latitude: 21322093206862020,
                longitude: 47664254303915980,
                zoom: 99,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fde63686-8fda-4e55-8326-110f037a3e70',
                countryId: 'c74c0980-f872-4098-8265-27774e3012bf',
                code: 'ay182jw0',
                customCode: 'i8xnvvt5ge',
                name: 'mycv43eroks8zko8io8s2aqei7nv52dmp19fnxgxjsntk3xdd48jqnyjji7tgtmgzsv02v9jsps7941blw7k5epi9hyfi9186wo4u39ffmy6qsgv5dafly43yf3hl8wb854nbwi6a5g9qko1d620bdcewiaixyrus304oo5m5s1m5ix5co9aock8q9avjr4cv9mwx4m05t329k6eckfagmfesb3uf1ijj50y84x963a2rzsxhnrt26vcvk6baof',
                slug: '3bljy4lblz41804087vymicl19wyysmujolfhden6v5blubkz00mwnp6glftsxok2948bm9g6an6thqkzvxipdbqdmylcc3cs7bglagl9490x5xwyo835l6l19ji1p7xy9ctci47l7w8n4omys10ptald2rap1kbxd7eaavpwhys7ia5oa4fw6djfowwo1611vs3qtdg1vzvtvaf0q0z8jtqwrc97ohz60si5zdx700491sl0p6ddt8lldh96ge',
                latitude: 699650765953277800,
                longitude: 78388482651101700,
                zoom: 37,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c3fd65f7-3681-4007-91b9-f6d7c47743a7',
                countryId: '4b473f53-befe-42a7-bee7-970708195497',
                code: 'ibprfj59',
                customCode: 'j1umiivjt8',
                name: 'nu04z8talhxbwlhb5a98md8lfgvymwy8hhix74fns6kcx212i0ezkk781m5cocjqhoixh3hs9ox6hsx0yyz0luzm71e02tbqp1d7oup5085bb365iaxbpa0w2k55m6reo61sv0wj8losfpu4s3kihdhg1vxl2uc811dswbcpp13vgpeltqgnfuiph2esnhwpn1bqzgf6av2ldi111q9k9j8sfpoueab73jeqteybo0sy1h4iyl9hafesuh676wo',
                slug: 'efleu1donqjglqg7w2br7a8kdfrpj03j9pzgpaj4tfprvugk5e3vk3p8srwjgforcv934gfq7dw3fhkrza7c5t3f6wpa3pd8xevq3oiiqkbg1xf960tkjt6w3tabmz1jcdcy9itpx4f4k801zjz0wqoz0stnuoeflfzp2s4a90d8m1khavwb6q9ku9g3f73rf4mo9cmg2fltay8pmejddhtw0t53o4i6g4vx06f30c01sqxrdptfm31hheitmvm',
                latitude: 51184643225328744,
                longitude: 398561881882774100,
                zoom: 75,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '353c44a7-198d-4934-9612-993b1340efa4',
                countryId: '092b79f0-b089-44d4-b8e7-e9fa82bf3a34',
                code: '8yqm7cuo',
                customCode: '34nru238p6',
                name: '4ex9klwus16fkw9bbfleoo00pp7xrymfpaxjwrzud46subvefnkojchcbfzou3ru4tngqgj2ereatsxdhzrb4wg2nuusucd8phc5c22kmbmyi0gqgyz0d9o9i5di5viuqyp00gwhql6s47p1yoz4vuk7x556bca2v8xfwct7prrilzjhcims9404zn0jykdyf9td0c27vgg0i2u31axtp0x9ji7egbw4k0lvqjq00ho02oozo3yneweapgcg6in',
                slug: 'nvsulj5dyll7zsv4ur5jyt1fpgppgczk863m7xqprkhv9wd2kzmp2vycmom876encl2rt3f6dq9mm1goxc7wne2437peav68ysvefhuwrnaoi499a6yqdj3465a0ky1qudqft0ooier58il47fk855zgxxhwztfk2etes6gtme9b405rsldxwwz1m03xia58jyffa9d6u00lhgg44jcho1j64u3m980ex8rif549z5k20pz50akhy77vint8uye',
                latitude: 53996784800588820,
                longitude: 78808735932878740,
                zoom: 441,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4415573e-015c-4ea1-beba-4a6be3982860',
                countryId: '5b68b5aa-eebd-4416-b9bc-6a1a160c5224',
                code: 'dzah46qp',
                customCode: 'z0pxmdamzf',
                name: 'jm0mauw4cez4fe7z9gvjd3ihi1nbfoov98zvvbua2qhpbbwn0654pag2acyxp5zgpxffxnp8ddfriktr1vctun50zh1zj2nof3aqrxgxmes5k7f86qefqkxj4s61p7i97ng2ddg7z2tq83bxnd1g706dyak4gm8pxxy4hxnq0tg72am3autxxso8cjukpe4mk6535rli964c4582eanz9cm2gsi2kgp5aqxhpez1q8bww93ovzsmokznroois4j',
                slug: 'pucr100rhq5ee5qkrpa99b09ipkkigxivtoou42oah69j3ycvgg0w9hiz2zjz8kgh66vpta6uwhqerzyr9jt9f9jsm5u31b7hfq0bxokrb3n2c38hnrfjtf0fy7ujygtcr9n1na7rgx0vrgkln5u90kyhq4mjp5rvwprnze3vo3ckwunl6io5yngh3es093wim9xck1jhqncqomn6w6gqo21j178ip6v2fflxqp5zpamxfsa13ngzs0yju0v1ci',
                latitude: 43754106569674630,
                longitude: 21181165082613148,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel1Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET admin/administrative-areas-level-1/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1/paginate')
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

    test(`/REST:GET admin/administrative-areas-level-1`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET admin/administrative-area-level-1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '9815a52a-c6a4-4cca-b0b5-e64d01b55aef'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/administrative-area-level-1`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 74206545450253150,
                longitude: 52922004979627610,
                zoom: 88,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-area-level-1`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
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

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/ab467ea3-1a3c-4213-9755-c4dec0077b45')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/administrative-area-level-1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                countryId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                code: 'scnln7a3',
                customCode: 'oqw0khx3oh',
                name: '2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbk',
                slug: 'pahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox1',
                latitude: 30642920317112716,
                longitude: 43199883296586260,
                zoom: 52,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 60897563123089920,
                longitude: 99556385160954420,
                zoom: 44,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/a7214209-c09c-4060-a727-093b23c85a72')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
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

    test(`/GraphQL adminPaginateAdministrativeAreasLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel1 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel1 (query:$query)
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
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel1.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 85001047385999040,
                        longitude: 73314058819660260,
                        zoom: 82,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
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
                            id: '8c583c29-af33-4226-90a4-fc8e2df35e45'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
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
                    id: 'a0de8fc7-3714-4870-a69e-803467be4a9e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        countryId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        code: 'scnln7a3',
                        customCode: 'oqw0khx3oh',
                        name: '2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbk',
                        slug: 'pahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox1',
                        latitude: 83543013388069780,
                        longitude: 19328218925735976,
                        zoom: 65,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 47757090720229520,
                        longitude: 91730332447572510,
                        zoom: 73,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
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
                    id: '7df126ce-c9c3-4b0d-b096-4f9be82ab8b5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});