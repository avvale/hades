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
                countryId: '58c2307a-1a8f-4ee8-aa20-ee59f4f5b3bc',
                code: 'rroo8v11',
                customCode: '9ei2yj969z',
                name: 'zc8hddf32g11bcb56kbby9geczzp7t2yngdaygfs665oql5xiz7ha573fnpg997fbuceczgp2jvzy2xnsbpwm1absedvmo3jlv16kbnjokfx6d3zl9q5jv8h13nbytrd9m1w4ky7xp13i6w8iicncfm5x3gqiuidts7a45iaoyz0puyw2roqs5un626z7jvsnpv2p2kk3ck1xkrcomcbk4b1ienvec6r6azr40kkui4ym6dyem2ujx32wuoxff0',
                slug: 'blztf9iz2zsrbbx0hjrfhehtekrjf6iqfvn0xdqgvopv97mhigu82bndyxkcsy4lei2caipn0n7ss16r2xu13zhrh0jhh2szh2h8mdk4qjkzh5qo7ct7sxjeqsctwdjviwwv2wr2rd4gec03fj069sb87grzr4nz4ko5bpfibuscxtda0xs7gmtww6n3h0n20uj6xbw2mld195p8baihtzoj54qftkmub72no0ra8v0lkh67xm3aize64p16xff',
                latitude: 72927433324906400,
                longitude: 67604616496678010,
                zoom: 48,
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
                id: '3d6b0bac-b4c1-4d92-a46c-3387a71383fc',
                countryId: null,
                code: '2uok71i9',
                customCode: 'xn0p6xj3cj',
                name: 'um6ielsnwef57skvxh7qs7a4f8efhud9lzrbh285b4km9l2s7qxtzvo4szulkzn839g4mh0ndcxfsmw6enwvj4jnhr163ptxouyednok3khh2sc58xkaohz2fnp1klg372dqzx81rs3sus5gnbvipoq2r5qdbnusgkspdebc6441smh6o7oqdewus80tzfhwc5swf3cc4zxc6brh9yudn03a59v2p403vgmfpgcjy4bgte94m58pmgubdutwedy',
                slug: 'crjvukfbqcttdmd29rpevvcuqq642nezlugnhq11hte0byr9cuk7n3il74afbkaa11vgwvoa7v8yhlqsvgka2613pmdhavawlvuigeygb81zvnjmj2qz4xtqjs78z9dm4ac8wuadfmkif7rsegqlmwdc0kjj233bvyh059z8r4v7e47fxgrbysmpdathpd3wowhqe4udsyadp9puahi754ys3wzb03tuv7uaf25zgkybkdt9z2ku714etdibx7u',
                latitude: 87575440052113820,
                longitude: 75908720968755170,
                zoom: 64,
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
                id: '67924fc7-885d-4b6c-885a-21e9acd88b1b',
                countryId: '73649557-bf52-4b9a-b633-69d1151265f3',
                code: null,
                customCode: 'ruu6ymnt9t',
                name: 'uuhpq9sdn0dhxr6vu6fo1zebgnelhlzl90dz1bq0m1h6s2q85khu3twty0uvmdogwsc92a86ex21dm7o0j2aq2r55w7withbdslno1yczzw2m4fxvtz7g8r1v6wpobg1a0qkjof8oqbaofipy538wumr7uo494pdrhgyrahk02dqf4mv0lqf5uz4jkicgqw6x04fjrvqfdznmzx8k5x9f8qmsr0nq8zy8r40r5vc8hx7oxms9qjwx2l9s5bzxlj',
                slug: 'lvqxy17kelvlg76m877lcou66pmfv11o6hyryxeemm6coqqrshvw23p7eio8jxb5mk8fgbpxdho1p0ibcaaxz09o9wlo1za8fbgw56kogc54jl3kdy9e2oyyiph7okcln85uk4lm78lionr7445hqgorcp67eaj4xl7p76b67a8ahfgf818soh2mzn9yb2cm7h8tb7nbszt2cxw9y3c8da2xyjk3cqttry124l4cr0vc0axjqbbslphpmcs99cj',
                latitude: 42468413556029310,
                longitude: 79068663256583470,
                zoom: 32,
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
                id: '9326c1fc-4c0b-4b6b-b671-214d5b520e51',
                countryId: '94a4a21f-13aa-4632-a786-bb60b88089c3',
                code: 'j93t0opn',
                customCode: '2fnkx7frik',
                name: null,
                slug: 'f4zy53p57v8nwtp2edb39l4jxdqxk67l0g52zrvt4megs3swnggb3ivfrs70rcqi7t9k8wnlnnnigaxik307jchm5yr22d21tjee8lp0nrx9qo5aoznkszzapneh6p1yd7pybbso75k0s1sdzw1sctez8o9t8ne3paltaaqtwvduc59jjw65919qxukxqr65j005dcgbugtmdrzfuuxfv2ru1fhtv0v5yttcgva2l3cebq994917dnht1ex0ga1',
                latitude: 32514384856546984,
                longitude: 98456088132663440,
                zoom: 76,
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
                id: '27050875-2814-4d60-bf9e-2429f00df38b',
                countryId: '73fa10c9-cb5b-4663-9637-1f5d97c85bc5',
                code: 'tcv9d7g2',
                customCode: '8jqvdezwzo',
                name: 'q0yqla1dtiyuo1m1w0s0pr23aym65u54vg03130zfrnz588556h0arcjg4ziv058lstdb6mn6gh71oiwdorn5l88kz5fu59hogggtp0jq03yeuiq0fq93lm1gqj7maehggkko6eczz05sks9x3na82zxh1rdeobooq2gvd26q3fd7hq7md8bqbcd497p9wzn4aybjw9wzgp6gzljp0bi033go8s3gpx9r20va1p1vhonaygtoxtcggqfjd3wffb',
                slug: null,
                latitude: 20389100440256970,
                longitude: 25905602009618196,
                zoom: 47,
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
                countryId: 'dc3c2a1e-0e5f-4c3f-8459-118caca96a00',
                code: 'nnzugy8h',
                customCode: 'uusbi26qt7',
                name: 'xloli5n4kgabn9eoj6y4rwxjsufzu86in0abj8py04yqqoe9h6w94vyci4kpvz1szypja93uq1hedyz53ry7y1w0yc3fjcg7jpk9fronlkjtg5iqr0967445g73mvsx1h6oagesc4ngka60kp7xldb417hgc3wznzxw458d1dvuuc6uf1y25z0zy7ax3txclhl870lthjo07ui1odv9mk2ptom54cbva3av60as4xnmx2bewnr90onnsf96w4om',
                slug: 'qo4c8ttqhggclw1fsdumoia2zg7kd3m25rqg47psd1mt9vhhyw8ot9dr1dmsp0fcro1k2hnofm4ywyyam843r6hudjjpmxivaxp2cm19bbn7je22r55y8ol7xxj6ov6w7c4rlr20njdyqcpewhy6kxaxjk5pkoevpysy4v5rxiar6z2kqjw6jrnlutbzs9n4q17b2i3esfurst06mp501evh8ccvaf30ekk42d54ih63fg69a3kdxk0ll3q5fe4',
                latitude: 82492358425878320,
                longitude: 88710641047815500,
                zoom: 58,
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
                id: '7cdd81ec-10af-48f8-861c-7d66f39bf4af',
                code: 'lbkaxeln',
                customCode: 't6af27k56h',
                name: 'qd726iqv4whfj5dbvxfltejxg8k69204w36nox5ntpw1pfa52c522xwh7pzjzff0o8pdhhhsmnfe3p0zefy7ecm8xwd4kk2jxie1fsbunsqspgit728670m1fcqo0j19t5rtquyd5nur48a6aon6zd8gidktsgxb7crlnmud79ua0glr6dslxjrmvkglzugwbujxng69b08csv8dwv72xkmjwj5ftykdam2dt7b4yegymcbfialbgdg61xglgi2',
                slug: 'uqnbp8fz1pjd2lfimuivfmk5tib3vafw96r6oufb2wiwg9uy2lbaa5gqjxsko2tumfren7vbul7jiu8m2m45ku9r7e8d8ykna5ubuzbcbuyn1qdrar19i41ocbrsef8z691czrdvbnuqllefvwguw89v32navm9hno7ihz6tpm0zupzwcg6aaxauu34nb3owm5jl1ajz3ydp8hna10nlzllukojwqyj2hhvnln14cpmiwzwwn7587ls8uqpdgpe',
                latitude: 75958565851222300,
                longitude: 30605642019752156,
                zoom: 96,
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
                id: '47325eb9-8f66-42f4-b0a7-209d06df920d',
                countryId: '1359e36d-2b04-4c19-825e-efa179156ee4',
                customCode: 'r6dpvokem1',
                name: '8spyuc5pjtxbroewp3bfxw1otpqw5ga1v53ib58110pc38hbtpo2v7z74ouygmqxv5ydikhr0n5uqze99nq5zaepn34ofe6cn21z6gsapefodjr96ttixkti3fuforb5wl7ykk7vgp0tzx82h0jj5tbpl79162agv5tt6zoij4ubwr6wjsvz1zlpacqm02yr1hkgpq0dxlfynvdqbakn11cxv0hacddzq8vpptuqrrh5ji531pv2uye5z156giu',
                slug: 'h96eclzr6zf25f5erqd0xsl3d2mp1amdbrmx1g19ouyls0lxpcci0qwn10ibpf6n20a7vg0qnfi1t6kmzjj57zl4od5cbk0y6u9sumzrjimaamwu1j7aqngoly543bm0vkitcmylv2thj0wnem2x8v8k1kjdu6ofs7rulc9x2zc5chrbwt889n1zqgpprcy19tuyml4zyo0lez48zz5f8ogwiitma089ctz33njg77y2gpmisrph1fjyl7ppc1s',
                latitude: 74321834194876750,
                longitude: 56372998799435816,
                zoom: 99,
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
                id: 'c4224bdd-83cc-42d6-b8f0-552d1d8a17d8',
                countryId: 'e4fdf631-cffb-46b5-8d02-8069b18eb0d9',
                code: '2bcc7jxa',
                customCode: '9lwr5ie6vi',
                slug: '5mditn9jpdnpmfaorwqrkw6w1jnnjpzh1lp3yxyq1aj5hue4kypopzep7hiz9c9wy18qoutxzjp6auwm3zdy4gtxxlrnse0s83schllb9ss6eofzzny5ra4kzmdu16ey98dh2lszvjxgl8rdlvcexob96x4kx1judqbgbciredjktdf1rqkkyy2rp890o9yglfedloehlmfl8x1civwomxayrhzlmu5ynhpmqjxmslojntbhn5kzyygytrwioin',
                latitude: 95388526920949540,
                longitude: 51241607968165064,
                zoom: 29,
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
                id: 'a6a46c0d-c47a-4ae5-a1e5-e493918d74b6',
                countryId: '665a4aaf-42d8-4a68-aa34-9c5d85ce1dc9',
                code: 'nu2icckx',
                customCode: 'bxq8wibc3g',
                name: '1p0lwbg4cfp3sqm9553758k40ho8kvk730t5c5hdg6ehxdu6v7ycm5c3076oh6li3v57v1gnf4ib2m32npqgnmyf22z5a2ns0ykgm0gmobyel5xgndzyghn52wrsy9hjjj3ojqzgg25sm4jtmxgxvadx76tzyly8byw6l5hnxttl47ic7fz3f2f5qldexqm9k9wmpr4o43lxz9dn5o2kj1724wx83vpe2et5e4jfr4nuk0qo74656bscc83daq6',
                latitude: 13509351798580692,
                longitude: 13327711769803190,
                zoom: 19,
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
                id: 'enbao2yp7mn9ox3dgeg6f1jlsevxlu0nuexbc',
                countryId: '7523f76f-7120-4baa-bdb7-ca041c9ad41b',
                code: 'bcq799o2',
                customCode: 'f67t5dqdd5',
                name: 'f4z3qdmp4gsss0d6obc1st53jripyu5fzqnj95yb02sb4fzucz15im5io95gjlz7vh5eyg7u6agm5qyyxdxa51163q9zfse68oiqpfsg5zyc37fkohmztjkjpo77b0sqioax0fp8c4spvqodz9ynqo3x1332ezrbdluamwt303ddboaicsk5vy2lhi5vnhmao6f5ni0yboakzhb5t2s1s4ze9qxiobnzd0ruq5ay9sch2tat9wg6r4plf7k67ut',
                slug: 'yl2gmixnxfadzssuc3apwbqyg3adklxzn9oh10rizov3oy1szbxrgos8tkcfufjgz9mimouw1kfsvfyoq2kk0v5p061qobbqfazegoezydtvc1a8pqa3b1l3l84wqx0z38v3hoty9vstsksovjtkgoy7qjisq7bcc5ozgdyoeiw6y8t72puxa2el3ra10tcia17wbkr58nzkc2jh2d4bq9ntfumbldfakndcfc1fgxef6ufdc77yqgx4u1bd7pw',
                latitude: 40529549575517576,
                longitude: 71893625041374910,
                zoom: 33,
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
                id: '77ae89d2-f13d-4073-b7c2-f146179f75a7',
                countryId: 'dvisskfc6o4ijibdixiytvlv2r941y16wvw5p',
                code: 'wgfnvxh7',
                customCode: 'pohu7lqy33',
                name: 'dx6vk3n90a74hhxq34vhdhyexkoavd4sgvihacdt949cvk013v5vm600ra4qwyh0xvt7ffycy15r0twds3fe9mlg162u4wnbj03av4z2l8n86hdeevyn9b168i58in4ur6rkpva876ypt77rxq1j4hytpl625x8bvl3gf75j4mn40z3v3julb5kqato6uu8tissfodhjwdt9y8bw4f6its8gx7ywmr35tv7jdts0lmwu3dq7g3dwsc4hf1e0dly',
                slug: 'bd018t9spsjodjonhbcn4u5uw4ve23ht07puwn5qsegjq5xk6vn6ryfp1yzbukyfnqbrdteriq6qp4tg40mh2hp6fj7d48082fb5jdx01zqxqh0s3opsihh7gxjutgookhh5kju0ieohjoqxijjspjnej9eryg9unmzra1mox76wry3xe62w8o5jfwj4y5zvcalomald14hglem4jvtupr4vsu2bifi3u84wb1fws2ikp36c94jexuf3r6p7z95',
                latitude: 37934163386956660,
                longitude: 51829494665854330,
                zoom: 81,
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
                id: 'd0266620-bb09-4c54-a668-c25ecde57f62',
                countryId: 'de051716-d1ad-439e-907a-cce5c99656c1',
                code: 'qpmx6ngf4',
                customCode: 'l0m6u8lntm',
                name: 'u1qf4l9z9y96l1prg2ya7b38w9c6h1ombqv2v524592k55vg2cvxxw6p4v51ysnnmhfcm0k963vgbspjkt85srkzn9evwbgs0tc4gf6sdtuzm176wfijtafp8gvmbusik4c3wwb4t5630q61r9fv76ehuz0cudozilyeos6pg6zievtr22199s60zv8f4j63pqhmiwje8kkhw8e81mhitmbh56i5sagrs2vqttnvjj3n9cvfva7ibpfoud5fuw4',
                slug: 'gd93xn1t10ii8vel8784yevmxu52672fojga91zg96mx2umbsny9ryhgtrfy9am8lursyr6174zns94h1mzmnptlv1beurqhduqh1ofz8va2zao9fitpz9b45fzv56fvpfc8sdjudbrmasl0bbdyw73jchjr3q07dbp5ouwlg6q61ded3oyh8y1da90q8oz57io87c3ek100xfw8gusj3v01i2pe7jai7fj8anb9gpvmivarmhp5cvzvlhb1d9c',
                latitude: 24131299453718950,
                longitude: 40266064713535950,
                zoom: 39,
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
                id: '1648e69e-43af-4660-b3bf-49d4fd7594e0',
                countryId: 'e12624b7-2d5b-4c5b-b298-082bdb979891',
                code: 'wsre6axo',
                customCode: 'f7suhoq208p',
                name: 'k6hd575l9nu8wkgq4wo9kvjj1hstquhefhdurv2ssjpae0jf6g76ti5jgq6k48nygzlqt8au1xpnge2kcpyyy3q3zsge3btx4oz8eglgwfhba26oqb4kk84mp9vrcndfojx9gxoiy9hmtjvnosygscgf4qhk9gtb2g8ctcnty3et3bpjnuj4fyf7tqzh942ll8rtszyn9l7iuzourfr3fuwrh1n6z7nklnfyy3xlb7cpn29ucjfcnp9t7rlbeqh',
                slug: 'gdc84pxv32hh94rjiyjk7bjvw83avn47m2zu5c1eq0hbxngiyh6r4vochmdzyjdjb1et2upbqj2j060ioas1lktqy9xx0hh6gba58hqs2d98aainspzkigy8br5w3obtwz5sqf38apwznirjkd965c2zbqgry0wn0g0fcgvn8nisu6qetfmvky02326d0ejf8lmzh1dm88vl4p02tvd0cyxiuo78nnv2diahy9pq45w4c6y40ylct8k2bpkudtg',
                latitude: 93524127499350430,
                longitude: 61323352374993280,
                zoom: 33,
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
                id: '782d0ada-e945-4a5b-a2d8-9afc45b5de9a',
                countryId: '23fb4699-5e60-4352-b4c7-8e3a1dc8cae9',
                code: '7pz20ttz',
                customCode: 'swlo6bmsbv',
                name: 'pl03c1zh1dwa26xsc9enferh87pjebr4o7lr80r3vjtjowqksdpl6vkqyp0hfip5ca4y2dl3i41gl00c09vosne3o42l0pnxzgrtvivzng7u8tcsjbrdsu6pq09yuoxtq8nxdzidf7knm2szq0k9b8kt3q3c1de8h3w1k07iqigwlyzg1xdzulp2to8zqp3q6l85w7pegs2q55511o57qkqa1nqytfp4jqarrpqv4ysr8zrctzmwdatjgjd5qvzy',
                slug: 'wn01hmle6hp7h2o0tefbct7gryxray9pps53zya0ovu9t9o3pmlq94yrsn7jm0avosfjer3miy59mnux1a2zx27ag1iwmvs8v0jlvqcp0yu75uaank6ifu1d9mb5y8r5avcepp3wt5otsv2ikklmkbwjaaixodlhm2rdhuzxi0xuuf7waondfxy4t4t08ujcfr3irt5ji32bbir4yivu1wojcw20ng8jpm2yvb78f8i3ukyvdbd956xj6073dtx',
                latitude: 13519260407047758,
                longitude: 36658893911415940,
                zoom: 21,
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
                id: '4cc25e49-a6a5-4418-aaa3-9a63b163f564',
                countryId: '84432900-93a9-408f-8df4-8969bab195b3',
                code: 'js14ma6m',
                customCode: 'fq84splmng',
                name: 'hha0aeejvvtnvu7j9esbwm2fmkmavwm7ouk8rwgyy29fusxrvabzign0x417i3pe19ntp2vvvcf93xb84s5zqq01dimiignrqx5cqb1u45bvqb39rwwo9b82kire6da8mi09kb88yimcw0t5nd33gepw5k160i72u0r72lf2quwstij04jn1533mmeo0ip3c5bvc550pwb59hj55rknpiwydbxl4u1y1aw0m29jxoj20yq3u55p62y1ux801z26',
                slug: '5p0vm5f7gvm1892gb0ccsioopx0b7vv63dwktkxhng5tci0sozsjli0o0gprlv73sxx5wq5xw7gh71wzgl1xujw0axqrzywbn71r9e3tyuxp5i2n77onhx5nvbtramgv4gmm4dxkdzrvcfvp0pwac8jkcu7au2udjljg3e61ypizkkysu1opup2lj3jrn9ry70fyr5y7vn3mvsopm6zhqo07a54sozm4qx4kpjhhk4w2s3b6v18fgq6m7n12nb9v',
                latitude: 29524114468873810,
                longitude: 83112338359459170,
                zoom: 33,
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
                id: '2b63a862-1aad-49dd-afcf-a900f6d0e673',
                countryId: '84aca1ce-6116-4c62-b54a-10e978160490',
                code: 'awbtic98',
                customCode: 'fsrrplco0s',
                name: '3k1es35hvo48kw1ku2bxavc33tava1625w37m5lto1iyecnvadlnvml18z27m7p77ldpe0o4f9wvjca30x0914rnbij56y7ptqmhqr7ua3dphiyrqgwwfxdok6upazog4wcltaf7fqtomqb828cckf34f5q2rr5cc6jw0mtvn2d574bi3c1z7uxf2sohe1vc7v7ut7lb9g0zrwilpna94cc8g1wicj5pgd8ialjb1oh8rpacw8obs2vfplxpnf6',
                slug: '4kq0ensb2me6r6hctaor0kkmct7nkqzc5iso7plm0dzhvlllvyjmxydgdv8ewnvt45x7x6ijeyk8fpmskrr778mgr0w3ot0wlzkwmcjcpczn5e53p3atpuzetva9us86uvj1rv7lap6mkbzt8oawcj7zr5c6kszb3id7pwfe2vrmo36m3blv3487a2po0wa8wzzswsuhli05o1hu9d1ojmm37wzuwluh4nb391a1poi24asgv0fyys65ebl8rbu',
                latitude: 284328454716982820,
                longitude: 90434143781000850,
                zoom: 50,
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
                id: '747c7ab1-e893-470b-a6cf-776b7cb99f25',
                countryId: '658c0743-e2ce-4033-9025-7f00018b1e5d',
                code: 'ea23owa3',
                customCode: 'lic2hn91c8',
                name: 'z15bav2fs0x3ngggwbulfqlfmez0r7fv7kqoas4j4phi8775ip5l5520q7en7bkb19gx0tlf5y8dl3bks2pspoatsvncwkkw8z0zdc3bpizfjgcjm6lvtahysys7t6eboggjvgdigpxmntnqw3je5ywqym8ohd6w3qrcr5emc1eoe4qpsjj70pj0agty07919ew9s0k83bonipugw8zei4m1cxydxgvox62u19b03lhs12p8r1jlbuetfpiq0us',
                slug: '98f2f6tq08kl8gmpo4b2x234j490y1p81cwb7l1t7k2lxg9z3eg80dm335li0hmtljlzgj6w4uhjz80o2ww8jl842yilcjo3tsx4ceghxipoay7nb7mdskqv4bi28jzm4r8lj1dq3voxx4kz8ny2jaez1lzvqwl97zo112fe3at26qpqyp3vp2rwcm5y751mdcug3y0seq86kzd30j9jgxsxehtq6jnlqah69x12trfnfzu3aibz6ufzfjy7ms2',
                latitude: 51581265809953770,
                longitude: 773764116737057700,
                zoom: 35,
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
                id: 'b24c75f7-810b-405a-ae24-81c15c44ed40',
                countryId: '8074583e-2a22-4212-85a2-5ac136a9618e',
                code: 'fl1t4h64',
                customCode: 'g39585xseu',
                name: 'mhixk8tuyx13rmwz68mddamhv9v6cvhbfwqmx3a5zs04zn900v3mmoeqzjckj5kdnkp2qi1uri1g7xqfx21wbcm03vbagi79h37zpsdhugupzk94oe18w3c0dqshzr7mze5ooyv3uyj2ipdfvkz8b8in54tg3f6mjrcusykuu5vym7s1wvoshgaq8i1jvd39gn6d7ajsa7ui0oqb6s0x6rghj0g6p9sjbln9tcltbeiagtfvz4yme775xcs01pz',
                slug: 'xwepwim94ahiylbfybx3tzjnefa9af3y36vo9gmcdfuu74k60oh1sn6r3pgxqkoar6kfunlyxu4bz9gwjd1blzowfrdetf97khbg8zzqt44qoyw58uvdxmm1iirhj630imvuakfhypnskx0c6tjeruom6o3wh4h2h7rbx848c2uw7yiloqig04vcwuwk0b2ngl07axlh1f7961j40e7emgsvjxft6r68lqragl8h4um1lfdw6xqfnzy8t79w8y4',
                latitude: 17484467027426600,
                longitude: 67166553682713784,
                zoom: 466,
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
                id: 'e78206c1-230c-4599-a9dc-a5ce7c9d2aef',
                countryId: '995946c8-cbf8-40ca-8208-68130b28b862',
                code: 'w8a1bcvi',
                customCode: 'qfzmxy0f5x',
                name: 'paqlly0swssx8ql6q9vzqohrzi1s9mo39qipaa12lskqoqufoil277l05fei7a7ggvvlzsinjo92xqyagx5g6dpx8u8spp7g1axdkfr9daurwwo50fgwty59vtbryx1n27x7j08uduujfya9arp2p2da4jl21hs879w8483qmhcccxm3v9w1b9xujee832erucvevtei5qa5qxnzus3ltyvwqpnyi4whsxc1394gc8zxog2cwvz95vyx2r5htyp',
                slug: 'um1e3m52ml9tpf9valotxcqrjr2bmohhr42q0l1aackgy1mm46srzcb7lvrlme7zac0umzfailv7l1oqb780hogglzejqir783mpnm235k6g3jx3w4q1vyyy34ejmrrqsqo8u7qxeg6gvo8ghmvs4eg6a8226k78qjr0l0nt1zwl384juqq2l56io6q2ebcref8iiivm31wzyckj5fbtrayuivniha53zddysnkh9wtfprh9v80vnsbrljcn7lo',
                latitude: 40895224245254140,
                longitude: 43633327931694870,
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
                        id: 'd405cf6e-fcd7-4cc0-9c1f-4bb18de099fb'
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
                latitude: 62384117281201440,
                longitude: 34223228696350390,
                zoom: 61,
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
            .get('/admin/administrative-area-level-1/3a45495c-c3ba-4fa9-9c2c-d1423b976069')
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
                latitude: 40094819807012220,
                longitude: 63570135769978830,
                zoom: 33,
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
                latitude: 37158423788457290,
                longitude: 84672997925006600,
                zoom: 27,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/dde3c54e-6fb7-4b1b-b94d-c1ad52d5d232')
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
                        latitude: 34572195693098190,
                        longitude: 31286582546054596,
                        zoom: 80,
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
                            id: 'b1bd08a6-274b-4f82-9f9c-5457dee04699'
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
                    id: 'e1cf93ba-7d0d-4ec6-822b-c0091006f334'
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
                        latitude: 45110540798097440,
                        longitude: 41913458703692210,
                        zoom: 16,
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
                        latitude: 92722658772268910,
                        longitude: 90914672698612900,
                        zoom: 46,
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
                    id: '6870f538-6267-4977-9a7a-c4974be0b1a6'
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