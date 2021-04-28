import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
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

describe('administrative-area-level-3', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel3Repository;
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
            .overrideProvider(IAdministrativeAreaLevel3Repository)
            .useClass(MockAdministrativeAreaLevel3Repository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryCommonId: 'bb2d0385-070e-4079-9d8f-a29ef251c41c',
                administrativeAreaLevel1Id: '1bd4b016-1796-44aa-8bc9-71c66709dcbe',
                administrativeAreaLevel2Id: 'e8e75f9f-bcba-4810-936d-1832a39b4a37',
                code: 'r1g5r467',
                customCode: '5bsuzb14d1',
                name: 'dglpomtih78til8ffgeaglk294s21feyood8dwuy8jefamlplydh9eorte47u93xsg2y7ielew6deu1vpnn23jxu8qzp3wrhojz93tne49uwroeololfh1l155vrq4bp06rsdifsus1nd2ufqcwu3shvcdey7rp73al0nmn058vq33dalh5s88pg8ozhfd4dn4qy7vecv23qhjljznhexvwrlwrc02c75n3h06msoluci3sq11n09d7tupx7y7f',
                slug: '8aq1d33emsz9hpzvvqs35kzo1fjfltk8tlh3confojdi913ytzqveqsoo3m3iad0mxkfox9xbtrov8hwsnh46m85263zfru8fiebamr65xk21qkc75dw3sl9vztdgegqo6uva03q6rrt159swwr6z0epj5lg56v7jhiaknqgdpowrg4w01voem4jou2zl3b739bryqpy9ze8e9c2189k1v8l5yfxkrcisz0oxr7lbggw2smc0k1ky9ls97mve3q',
                latitude: 51442005856699896,
                longitude: 53803721820247290,
                zoom: 83,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '895b4ba7-a3e1-4fe8-ba37-2cea5fbde762',
                countryCommonId: null,
                administrativeAreaLevel1Id: '14635030-e0b1-40f4-a10b-ed00608e0ecc',
                administrativeAreaLevel2Id: '6d45987a-eab4-41ed-b9e6-ccd4820aaea9',
                code: '4zxlyp1s',
                customCode: 'nu0caabwid',
                name: '3dumqie0492a1tg71qiywp4m3dvr0tnzk4n18ur2biaoc35y830hco846u06ckhnaiiior0uubfq9mmcimoajrp361vt9jyxf8bhj6uy5b21nzud6d5vluxpefh7nvhyzsq5hrkuee05ku1wih1r70yynx3bbblyicxz0ws9ktzl29xuym107ux9572pbwwhbxdencvouqq8fdqp7ik9r30cghe0lki6gvhqwqzaatw76538zqj60wxfix3xiyf',
                slug: 'nsj46zcz0oyzm1jn4k1mcal4qpaqui8mgdqvevqfdm4jeki9yheq89xrjosph5wysuufv9g9028ttmj8fw80gevo03sm676gd0tiz07hy61maob2nabxvd7fjvy8kyf1o4gz1qmstwwn3zew2opjufuwxrk429awfred9jfy5dek23j2po2f2rlia9mk0ruen7lh153gkj8i7fydum7jkd7fevihvpl7tjtr1mjqvnp9jrqzts4p70f2b3orqgf',
                latitude: 87227990836746770,
                longitude: 34332327594375696,
                zoom: 94,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4c9dd7b0-756a-45b4-9371-1faf528e51cc',
                countryCommonId: 'a954b517-e632-473b-99a2-73992b070488',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: 'f4b674c5-cb9e-4635-8d50-c93083b13f59',
                code: 'tsvgabfa',
                customCode: 'voutqv6pwp',
                name: 'ws95a3cjwmnjjh6h6kszqup5tdudj1b88y711hw6x7pwm6eg3fuz5b5l6l76yu1vp3qcfp9yir3dtvorizz916fa92w4no77l6gueaywutgk5ka2u4o690xd5vglq2j90da2ndeh0vgwx47qcwzudkk99uzs4e9as0xaxcdwhsmg8qehb7u2n5nrtt6997535cbid3uuq5p3emiblq5oo25d4urx0av7wt3nusf9vked8huc31vh1dsfblb38rm',
                slug: '5ooc1p36mulpgcml0f4nhb5mv19k09eosmzd6nixah646s5fcn80x7k3019pw4jmzny3ax9beout2ohgjj6s21n17n1qjyezpv4xvyomk5ymogt2fdoqysxmxmeighwzeh1cksz842iktov9tlj52ue2a9e2tf1yay10dzl1vd8zhs4hj7f2guc5lf7rk2ik6umwho9l4ky4uwsy1kx59pyftl383c9hnaun959xlu1opquelij0z508hu2x85a',
                latitude: 26187288130371052,
                longitude: 59077358240199576,
                zoom: 70,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '17489e1c-f97d-4c17-ba6f-9bd3f29ccf34',
                countryCommonId: '4e6a61e1-dbb7-49cc-b46f-330a58f7adab',
                administrativeAreaLevel1Id: 'd0603d9e-4b37-4668-a0f2-822cee9ef01b',
                administrativeAreaLevel2Id: null,
                code: 'ygt6igvv',
                customCode: 'o2my0c4n1z',
                name: 'wrwh2eneue9jq6gstqcx8l6654nszk2coj5a3e419tz34tvngd1m045cxgskkg6m6hmwk6ohq6m0rapd9izjvjugp41i0ep9vq8nhj3hr9sj3cu2f32hyo9kicvjrr7bcy23datctgmgc1ifq3ntgo4fpoe3w9sbdw6pe31qb7kba9ymx2lxspb5fkuv53o8815gwd34nl5mtu8m9jwat8lfuwlb6vw9qyac24sg8whzs1rls6cvxu1dqz1vjbv',
                slug: 'cnjw3vckywnmm5blspyq7lahuemxtq59wyro33btr5i3pc46nrd3gl4yox5o9e19o1otzmimb3btlya6gc09vcid2j160jv54jflhl58chzwrnajr2kknhkgu6qc7siekjbq44p0p1liskwuk7s104qigf3hhfegddsgv3gnzsziynqwdqlbempb0j8pgi43b5bgrki7k56cf6cd0qzoichw61t3tm4rwknuf5cqvo81qxknx74amgcgb8ajyka',
                latitude: 17722768652464408,
                longitude: 98382791798396770,
                zoom: 48,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c6319079-0e65-4e7d-8ada-2b840faf61ee',
                countryCommonId: '6bbc481a-a867-420f-bd35-9fba10c52a87',
                administrativeAreaLevel1Id: '2ee00128-4a48-4196-a2bd-af1192d92a62',
                administrativeAreaLevel2Id: '678b6583-753c-4c5b-8b7e-892ba0bae28b',
                code: null,
                customCode: 'yjk28bdv1p',
                name: 'viixfigfgn4r573zmbhtu1a1dabufaxcgviirusekkzaaxp9p4q9b8f5eh6zj51gudwwwre0k0skd4mk1k20xgd3slwuqd976ht90eddgpwcnc9fgldf40zb2obwqukoyrrupfesql119zx6ri5z01ydjbv44tbt6ntrjgdoxilwenpsd5nr5zayel6hkodjf19c5am9anld5m9somq3ytzeuo3gwey2x35oomdtnp25kvg0fpqdjyybmrdnol1',
                slug: 'bme9wfrh2fqya36o4w7mh90r255eoisxldpgja1mjmdp1km59wpnpj1n9u44builgrhyfk4vncrr4o1p5763tagboklky9utzinbfarswvkapste7ld24ayy4ysqfop87lfon2fyilr3a4jan00ddl7yafy0wlc9zertkgtp6jxod7n9336etcbo8bxk3yrcy2drmngrni3kpcgz6hhgfrwilyiuh7zmqz12utto8ljtnjz4ca4f9503deisad4',
                latitude: 88034818901241860,
                longitude: 53056565700844060,
                zoom: 77,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'aa48ded5-4924-4857-b552-0c228ea58598',
                countryCommonId: '753f3301-f855-46bb-b72d-33e4ddd3ffc9',
                administrativeAreaLevel1Id: 'c27e4ecf-1add-42f3-b995-ffb94b85453a',
                administrativeAreaLevel2Id: '283b482f-4e1e-49a7-91d5-cfd43554b702',
                code: '1vmmcmt3',
                customCode: 'y8yns4bp9p',
                name: null,
                slug: 'wlzlis3pttikiibkwjspmu5bxd1tkbdcmpu4k06lrys7o1iumiq0zee5fj68gaxfx7ensj3uk6kj2nb0svs4l7zbfed1cj1bjtzke6dpj3zwp7nay0uzdifnx568svrr8mlw17yobn16uow57be270ekrxvljgxrptj8y6e6sstyirqj355a9tmomimx88ox7hsobvij0pgobk3kdc1j36bpneph6u372xaphci0t7zbxr37h87lrshqtpalgvp',
                latitude: 74003333387653460,
                longitude: 54862864409635944,
                zoom: 69,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a891306c-5f32-40d7-b523-f523120e20e7',
                countryCommonId: '11ded2cf-1b46-429e-9f24-af58c268efe9',
                administrativeAreaLevel1Id: 'bb23cdc2-0d3e-4e62-a1c8-25836985e648',
                administrativeAreaLevel2Id: '4267f131-e673-4a33-824b-e306b85c04ce',
                code: 'cz4ty3a6',
                customCode: '63dr3g0bkk',
                name: '9tlqsh0wgojasoyr7abs5suoglt7nh1ulab1sj3kw0haeo3fm928bdgu2lbvemcjazcfdraoqgd130gtcgcpn27wbs3lbcdhm1u0z5hbp1stra3u1oal374s5ox07ul5lyod1y2hblkhsyfz11br74nk4nii0kgwyyj56aug0dlgid22wgbgds02je9djfwnqmzu0ahpzn3mauf3l4qk8p4abk7nip0tso51olxt86z6an1ae18704qm95rv83e',
                slug: null,
                latitude: 69998628469548320,
                longitude: 23641941948846180,
                zoom: 71,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                countryCommonId: '23ad67bd-11c0-426d-92b2-3c35751780a7',
                administrativeAreaLevel1Id: '1400ef59-c6c6-4fc8-a66b-97823f114dc3',
                administrativeAreaLevel2Id: 'fb4f3590-9edc-4e00-87b7-618d18b57261',
                code: 'msczpaiq',
                customCode: 'cgmpe1onf5',
                name: 'y9ahg374hrn6ppx1dnapdnm6u42j80y0jqjc6dg4qhn6bctaoozh2xrl82c2oetzb7lq6lfs004zlw0insdn6xahf4v79tm9e3t3ndqfnx5546wti53ikyeyv6sgpvaj9n32e1h68crykvvdsukcmq7x3f44zbq0v5hg0fo695fewuhmszs1y1eohpudc9kshnct8f7mxnvx5kd7vyajc7u6zbyyv9somw145x18asc1ujnas0b64w365d5ocyv',
                slug: 'm0cxh2ocpeejeda4ccbh9gxtwbh5ma476upy3qt75eq0o0c1wesm5in5xd5x1bldw741q2nabtx0qgvncpsk4zg5n7x8gt7f9fuy8sg877suzdxtf63ehhupmkmmg2zzr44068z990zhmxtvealiemptw30r9c4sj7fcxtbhh7i4jx178bhzppc948a7y5mp0mm8clngsuyk34449oeynhstly3fhzr9slsmioyiq18e0a2cf6s1sp0ac6wio3p',
                latitude: 20473893013510010,
                longitude: 96867086166793700,
                zoom: 78,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2a0c5334-6b6c-4ef7-b794-6ed74aaa77c1',
                administrativeAreaLevel1Id: '42ee03f9-ea1a-4cee-b562-156053721451',
                administrativeAreaLevel2Id: 'b4cd3b48-2235-4e79-9454-9f1e877839b8',
                code: 'sz75n0st',
                customCode: 'm8qiw7l224',
                name: 'xsezca90uhj51ba60i7yc1ihx0gx3xnunntt2xqdddaqzj4s8fyxwgo9zwri3uw7959xdzpko90gx7rrrxfpzj3x0vfhr9zjnhte0ohi6q60tseyawc36auc1be9c0l8a6pxzuz9bsu050u8o6tx0ttgb9xn4xie4fhje3ld1hzgbgz6hrvex2k0ma6jwoy4sejnhmbjo46t49tg34tslhlcq5g06gwghudcveqz56cfspj33qadk7r4oec96w7',
                slug: 'zv7e3ctx1gp92pfuzghvt4cy3batp98t63ql4oklyxsh9lg1qa53tsg13e5gwefjdpv22cgdhsxone31y9xhvvwqlprw2wa93edc7b3kgdjgk64nwrlufda83cbpsekclhsg4gdk0k44kzfz6c81r651ydx2kfnjnecfk2nitfuq1khiqexh85ba1fq0zqsaujw8eziunxc1ho1eeauyv16s1zbilpp1ezg4g8j2oqs4pu3a7xual9sqglwjfrl',
                latitude: 93973289255719020,
                longitude: 69203654234191360,
                zoom: 77,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '35d69032-c917-49ee-9780-8bcbcb6ae5bb',
                countryCommonId: '98be673f-3e4b-4313-9610-1088f9e7e45f',
                administrativeAreaLevel2Id: 'dde81add-0e5d-4fcb-a5e5-01475cb96fb6',
                code: '14ny1juo',
                customCode: 'nexlvkuqxg',
                name: 'mu44tuxj7m4swgzbb93gt8olrxbafy2g5c8u3vmhtljqavqucnlc0tmugh252u5dreb1s1vykzuxbel1ompfepidih8n2v8d8f0y0l7oc2wpmi3qxumbx6cwisj9trtityuos93vk35n5aly9837etrky9ymx2kckb2mqkmgz7mru3f8u3lpn6r8xhckkmutskswedssmuk55x2gsgfn97iamcmm353vshnzmd2wa0t23qbu7tbpfzpzyso8ol6',
                slug: 'kvtzyq4qrrnh2tmzfdc4jsiu2r4ph8iuo9bp9ulnup5j4r5rkvhpkrf98u2rqh2rwoh0hyxsm3b5noy1969y73rf81dor5iki1umagwb9lp95exadqhi8413fqkvuhkn6453f2i84wntbj44cf39n51f18f2anr2ya1wedikoci1ljr63oul9ssbtf03hrom6m64c2u61ot1iwes00le5i9pid32kgcrfnl02o3h9cra6igmemrxmzu2eth28n1',
                latitude: 93530839297030530,
                longitude: 21499031417955050,
                zoom: 76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '80d095cc-2c6b-44d9-99b2-db1c3d050477',
                countryCommonId: 'e7850352-933c-40e6-bc46-108b43b7a58f',
                administrativeAreaLevel1Id: '2d604dcd-cdda-4af9-884e-5e19af012bf1',
                code: 'mjbfwtej',
                customCode: 'beu117lia0',
                name: 'tkeznt3z7gfk3ixj3lwzouo4hmo7cqwyopapjuoc3c4ndw0agt5m8kqzuswdznp4ykyug4bl3c3ym89npctyherq0lxvdpwwdjlysy5avmktwkofaa1r0cjyx5ppp1jcq7samfw7h0tnjxuzku2s108lc1im18vz0avclmuj7scc6ax8c9kkkehdks6wysxhxruffhwvka3tbhia5mawirzoprztk2fuk44k9xkybcmvw4pd4uqiue30ozkm67b',
                slug: 'qceg408cuqj24qo5lz7gfprooiukkri3oll2ndssppot3tna60cb2u57u1ef3o1mebha6kiocfk4shd2yi5rmvzvie6bnqb4o53kyg6hapy2tdk1ezqh8sdezgmufv73pp2o1ugzudzqujladftbwfm3jazeq2idnzo8xbvixzngrbipivbxycqo5wxfpyt6ok54u2lzhspdi0d89zaycj0uitawdtfjy5rncsftnjhfx6svr492dfrq0xo7b4p',
                latitude: 43437305571197780,
                longitude: 84235801651676480,
                zoom: 28,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7bbdba36-5c11-4947-9ea5-72713b805dc4',
                countryCommonId: 'f63cfd85-ff45-4f78-81e6-75f6966b310b',
                administrativeAreaLevel1Id: '0b9fc539-e132-458e-a2e8-e379b180c5bf',
                administrativeAreaLevel2Id: '5e9060fd-7a01-49c0-88b7-ff9fd77dac88',
                customCode: '7bdwru7op8',
                name: 'ldcbuy194i411uuvolhee244sy0l9z62u7pvnu33xtnzgouid6qq83huwofbavxse19uzyhsil20ao7umdipgmupne2ok11vbir48td6uctcdpa7co64klptmib8oeal8ejhvp7iq7aitse4du7w4lr9r7pjwa1d2z159qhj5xzgovih3hikmkq0hw2038jezdk223xtnge2tmz3nc1o2qhogm6qbvbi3j1pdpvwm3f6r90t1chn8xoor41rarf',
                slug: 'wbri7rcv418pbb7qt2lvk2i8ksd6c0ye48090433jt3offwjbsztg719mle51qqefvmzvc6qpx23ftqd751pc4r557lkya5wlo1d6ohe0rdayot0s5us40k8ddjctu4p7vwoa1frnbgydl10fd5q1z0o31p6zs83fzk6bbhyk23ome08wo8f327b2u1urssqoos12csbi6u2rgk7qsgqkg5h0h0rm02260ky98wsxtrrppt3yfd1tijyuqa75yj',
                latitude: 30051292006548944,
                longitude: 19702731177700416,
                zoom: 14,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f14b0328-7c70-4189-9f43-dd8edf0ec8f6',
                countryCommonId: '24e16a51-8caf-4ab4-849d-d851a1508b37',
                administrativeAreaLevel1Id: 'da41b592-705d-4217-ab9a-49d7ef1be3b8',
                administrativeAreaLevel2Id: 'e983c944-0356-4cc4-b9ce-2bee2fea9e99',
                code: 'ectr8hyo',
                customCode: 'zy8d8xurfq',
                slug: '78hcldr9smo3pj2155m2wewbs3e6s3a4t3vddazr8ei2jjx8ros75bbm9adf2gul4sz8djdjamabgvefgkbcwpq3j9ltbu7n80x9n3ggyekhdqbyhdjq27o3sgdcahft4qlckr15apqz6ulogpi7lrmim6dlrzf66ntufepcp63mmt2myqt1bvbrrpc4nu6xw4o81i877edd8befs0lmv9z14ks8q2ob2zmzusdjqku0jreb5gtf6alrrb6mdts',
                latitude: 12844387401336216,
                longitude: 23658496386200030,
                zoom: 99,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ade63c93-5a27-4bdc-b1c5-e0a3dba3c2a6',
                countryCommonId: 'af3278b8-e5fc-4aeb-bfb2-eb0c28672ab8',
                administrativeAreaLevel1Id: '327fc363-4d1f-4661-bffe-c85c6727aecb',
                administrativeAreaLevel2Id: 'f625bad1-b318-4f1b-b21f-fcb692d78fdd',
                code: '300vfkv0',
                customCode: 'uull6y413t',
                name: '4913181zrqt5r9mwmmfgge4rs3mfzqkyazaiaoxcmjadqpigb870rcc7ohu334sbs978ldpgrnrz876mq9qthilpn8kbq0b0wtmyyr7etjg44a2fspbyydhvoaoneimtqibcyitoqi8ygeu08hq844z7xuo3379ijpusg72rgqdx9pt0niu0a71dnoofymh6cfsbjeotrqw51mbkbjrgytw8wp3ipen72lv7tyofclvxpl2cg2hf2zdz0ujx6bt',
                latitude: 70348387980369420,
                longitude: 53841459052139640,
                zoom: 68,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'i2bzvmir4dp0x9wy6tvnonr8vvsme68efvmm3',
                countryCommonId: '81a1ea43-4a30-41cb-ba4b-b67ea2658686',
                administrativeAreaLevel1Id: 'c19d8f14-a38c-4300-af7f-a4c50c47083c',
                administrativeAreaLevel2Id: 'a5f64d31-62a5-4243-8701-305218ce35a9',
                code: '2avbajty',
                customCode: 'pjnja52el7',
                name: 'bg1q5cw45h4tu7az4mra2vi1z0607wrts8rx6uihgidzo1woavtogyrv0xtbzkq6gwsa0p90vttnuasg573fg2lxdpx1r5v5hvf1hp5i9jwe8v04vh7wcb6bjfc3kqlazvbs8pnkfareaezy047x5ccrgz10tbczl6y688eghi3xodxasl8hky2ky7i6obfo9iujmrmnptguma8b8vk01vyu605i9ndxml8yf4f105pc5kqlf2hyjyxzx9jj3cl',
                slug: 'qyl9h6si5s1w9uml8x4xf56mq6tf9fh95v3gv54xseu0fz4vmthsfj6xcasijok0ngsn8lzdm4ttvsalxs1u09dlf1tq2ubd4sgd67muzuleiqibw04h9kdhwxlkxcr0kmgz0d2xdm33hjd7mjaptfmp0vrcn6qb7uhsm53gz7ru7zegz86swkxvp1aj7y234ykvccc5c857wz0bivtyrphikgnw6y33fbxpiq0humxx3xcu0pld7ero2q19scg',
                latitude: 14595920471726946,
                longitude: 88035518160717230,
                zoom: 28,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '05c29543-edd0-44c3-8118-c84cbc61aa38',
                countryCommonId: 'pzlaw3f5xjcm0bt4e3ka2b42gja6i1zz8pwts',
                administrativeAreaLevel1Id: 'e5dd4cb0-fa19-4d92-abbd-9e38ba73367f',
                administrativeAreaLevel2Id: 'c3d7fe5d-6b53-4aaf-a037-c31e3f965776',
                code: 'shhompiz',
                customCode: '9ja25sbdpa',
                name: 'y46u7phsmmxvgyxfgd8oz9mttk5u5az7plf6w2duwifcg6zpfpdqvbuwdnmb5bihzwwi8312txbhzu9rguhvnrkmu9ulvfkfv9nw9zomc86z9yawjspy40ym4wjq1kunfgppfysszhac1qrxegjbpzhng4hrcujejrby1nkk6j6xm41wyqayw9vovbl8xw85pn9gswkdgstg76tbjbxh7il03rbxj2769y8zorfhjogknm682pis6qtegoa5hbc',
                slug: 'q5sspm109a7dppyasq90xlb6cjzvkzu4y5nkwq5ezp0me0wik31fqjgja5j6dv1zgbn1ee1hy7gfo46i1cgi9zcestjei42vbkxoyqvyvj1jli2t8h33oiypjy1qazn2yhngyqyjyxt80owc3os3vs6dpz8atnil9otl29un62dc9vqhkz75hfh9osci04ehtu4yznrk58d1c6dqr4kt9k0oj84tjwubpaw499vuvc0p00vc4id826d5no0dqr6',
                latitude: 47591701196452930,
                longitude: 56631060366249220,
                zoom: 96,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8bd2f262-775e-443e-bb80-2136f64a7195',
                countryCommonId: '71ff4386-5a3d-4440-8fef-9bfbba640e57',
                administrativeAreaLevel1Id: 'sge9ffrh4xut520tbp3qvhwf7ovqwvv3p81e2',
                administrativeAreaLevel2Id: 'c4be4243-6ced-4d48-b1b7-974faa88347c',
                code: 'e9bzad5k',
                customCode: 'iwguwjyt7v',
                name: 'nmc33zpx1gbmzxc6kagf8ah544j4f6oriuhuf2w318z9j8t3guy0jm4yqtqbpl9jatkc7si29wg9xcwjcdh8tnwjf8frldn9grguttyuoldvjsipgi74hwwfcr1dix4nq4ll9uw3vjjhbrki81r4ku0as6wdpmwcze3wv9ddjlu1c1pz331gbsd3sir4ii6u7dxdchu36hxk7l55sbrajdrt3ev1om3n74k9l7swzd4sx065h4u8x9yu0oov4fj',
                slug: 'y76e95drnkogdzklaki34hc25vknxzjqvmd2zvt5cpcdk9p0zmz0qop50e9tg2oh62fa3f120dp5nm27rra8usri3ntexkcduu6fx3sa5roi1sjtmsx48irstkuf4s9shd5mbgu5xst3an05oi3ild4r517rpee1jxmz9l4lx0rlzxacuy3yldi6004f9luap9qqqenmiymzuejw22mmhb2lm4jd65ut2jf51xjglo4b1qnoumq2khcfl9pe9km',
                latitude: 75213457533589440,
                longitude: 60519940577089960,
                zoom: 44,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1773c6d6-edb1-48b4-8f9b-160a109639e6',
                countryCommonId: '74068824-48fb-44c1-b860-e5cfa867039d',
                administrativeAreaLevel1Id: 'f6927657-465b-468d-88f0-b75a1d17b341',
                administrativeAreaLevel2Id: '6p03ndce63mtf25wx5ybkkogcwp96o5r329n0',
                code: '0juvwiiv',
                customCode: 'wg92nfsjhi',
                name: 'a0s4degt3ktqra2r6w500g0zvs3vlhqnxypheyfxu5nvjkziun8lhjvjinztnykp812fuyx9ka1mgrhmktp4ufeee747splbe04nc676b9msb3gbwgjsylquge8qotfawcxopqg7a4bktalusu72ipe3jynfqwo2o4ein5c239tcwzyoamuh4z8bk4nfp5teuplbb0fny39x4gi9rqz4eutrr2cu3wavffvgx9eoik4qogtkex5t93pe4gbsdus',
                slug: 'd7rozhykh83uat9dahk2mxifkjjrez3rb2uf16uzqcnfmohxhgy8inxbf2y7j3emqnt249dtkj59aakm9echj0p5xr5zxzr7ht32mg3a28p89ubis3o53z3te6ve57rvblgsup08160umb8mqhx4sw7na60kngfzrteztfvcbpns703gq0jg7jx1jt5voliz9y2a0maq6qb1bnc6qn7xzyxnk6y1y5iyc5g8qemcvax5yneiabu1dcmamwxu5ls',
                latitude: 75186340910686130,
                longitude: 48435579977271544,
                zoom: 33,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa440156-60fc-4c90-8711-52100c1ee45d',
                countryCommonId: '9854d976-fdfd-4129-a192-14a0c5dce508',
                administrativeAreaLevel1Id: 'cb4242f5-6cb7-49bb-9381-4f1ade31d2c9',
                administrativeAreaLevel2Id: 'c746d5c9-bb29-4daa-aa2c-b49107de4337',
                code: '4c62t1lrz',
                customCode: 'rp17ptbvrb',
                name: 'ba11799h4zd9tnf7i9ub4oqms72aoxp1jyvd9ldhgztaxlsq6imfixhsoj4k3g404af5p2n9e4le25m1xffl5nl1nu40x7tyfuisr8i4nzas9yn6to63g348imm2yjkjhfe6tockhk6oc7a5qmvbtdp0cs7xz6vki3n34pl0682pt1q6bu5q30jafrpwm4jcrkj1txrqoysmqcbz4a2fwf3uv1yku632n4hegqr7zegvxunzouylyhz4xjbywz7',
                slug: '0wh135qr9tyz6tp0vkf0t3cxilrvdp985rr0saek90zlw3o0qudb1mwkyx37fjjqq7tcc91e6f9yn3aywqi0vtirv6kytu254wvdo2g8p9s0c49bkeqm76nn6x524k9ozb3p2vnb622bglutz0ht3wqefuoym0fma3t1yd30i5afwq1j52wr8bjnbl3j2bm76t8uo8mbh06tvxpq4q3glv904u8x8oesh6z7v4a0307h9dmik67lx3v5e3hm8ez',
                latitude: 46421687067605544,
                longitude: 46992429141034250,
                zoom: 76,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd5e9b08d-578b-4856-810a-8960aaeb0301',
                countryCommonId: '52bc27ae-4bf8-4159-8434-37be41a3332b',
                administrativeAreaLevel1Id: 'be55ddc2-ce9a-4663-a35b-e8958ee63ed1',
                administrativeAreaLevel2Id: '1c2cc730-b4c4-4d56-b810-27bd03e3b76e',
                code: 'hcgsq3ks',
                customCode: 'xle1n9ly9uu',
                name: 'w7o7lkp9dzwl07qwo205rukmz194zy6qe3n5906sr20p39p0lodmtojjr72bvyek9ul85ah46rhcypq9qkjlfh9252khax9fhiphkmhobupfek662i0xy4aencwizdafyk2czjfzs3j3ohrd4b59rb9v5dy45pweyj9ujznoguidqwyfv88zxtlcrd2zx471uodbyv9sumiyltgnsocif3a7rxmqqq16br0vulsj7fgkt5u0kn0qz5jhjoinu8y',
                slug: 'y8cvw3mi02milkhcby28kl1me29gr3056m92g8xppjuz6t31f8bxkbx37qvregof2yrmkgg0zkp2z1wr5u9q2f56irm6dehunflb4aw2s61t088n3dyujtrbge34t7i66k313zed40kg8dktab3rqwm7lmuitd0zm5bp9q4p85cwq6pdqjbz1oa6t2ci5zi4y3qnoweexs8y41maaqh91t3tb5bfsrhtmx98r7lixhwu03t0r6fyfab4ykz1omh',
                latitude: 98890543518277310,
                longitude: 31553217654485864,
                zoom: 10,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '49f19baa-5334-4063-ac38-3a7c144c8f8e',
                countryCommonId: '3f224576-15b0-467a-ac84-a44ac8383c14',
                administrativeAreaLevel1Id: '3620fe11-87ee-4c8e-977d-cc1c65030d2b',
                administrativeAreaLevel2Id: '45daf901-2f87-4dbd-a754-65ba627d0364',
                code: 'lzrkct1j',
                customCode: '0icu6ez32y',
                name: 'nj87nxu42pa3iisdb9kfnp1vl2a3xilrxhlouci4q3ecuc3aaglc84ts9j63r3wh27342mzldh50x2m94pouq3rghxdz5x85wv67pcxpogl09ml9d0dmpaxbxje9c2u5mqvrspt1fu8eekuz3ifv8pbvbd4x0v7gnzch9gjg97xznpv2yclxcx8iv3rbg50b59bu6p1q5a3bxkdvvwlvy6qd9n2ws97gsy43jsbbfchnfngmesno86cudmjh1m7b',
                slug: 'wiz4sxiu8npgow42w6amfkcp7pvs94mw88rdla72nwiuo6v16dqiud6ovzdoxmzljrf22xyqjxg1ngth7hvzgjn4acqwpzf0mzd7jo84yzq2phfcm5bgld79led78gv8us9tstpfcmafdd12ar8tr5rrwx8fx32yflgv540kwftuz085511j3yqocmkjwx4z2jsvyryu96sow84er0f5gibb19kri1b6r6doay1whk0ow15ye75k61yk1t5f8zi',
                latitude: 33823782734274190,
                longitude: 29198849366050764,
                zoom: 98,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bf0c9988-bc91-4ba4-ab95-9ba58dfa2937',
                countryCommonId: 'b42dd9a9-0966-4661-ba11-c360f46ef1b0',
                administrativeAreaLevel1Id: '10ccd350-740d-423c-a166-d7cd6fbda149',
                administrativeAreaLevel2Id: '6b4e5ecc-902a-4b22-a79a-a45ba4b9dce0',
                code: 'fv0no5bu',
                customCode: 'q7brimomum',
                name: 'idel2icso81mxdd17ws1xvpxy79dov2t7ppe7umfkyz0xbyfk5j8cz9dvipokliz8i10obpvtlh7d7lq7rlmje4449jmm88nfnbup4gn692355vvcwmjz07ds3x3s0wpu1pucdkna2j0bdacyhfk48dtxd5zt0z1y5c4g8oz61z0q5eapmkonk3rp2fzhggw7f620buah59vbdzdbaybhhni9sjk42wpznvtjkb14dscp3bwbegu4gog3h4nobq',
                slug: 'k9f1wvrfac9x4k183yl7ki7h4krb7nit3rdo6esqwabhrxxq3ebo3v8ij2xzs0aww3lmdve3yxrmih03l1duktnoiru0wizhkkgfikcdzyhp7fpiu4q7sdkpl3khzqq7xrteqwuiibigz758a6i71jharcz7rm2rw4gkbjupdnz10b4zyz64qa9re3958lisbcjt631ds0ih3yq8pmrmjjs1t61t16crpcprjua7tt1bb47od16rp9kdzzk28qap',
                latitude: 12836444177515202,
                longitude: 23426042100171416,
                zoom: 18,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1c08f4f8-660a-4c05-971a-0ab18e40a79e',
                countryCommonId: 'dd9e052e-024a-411a-aeec-3a2d9b91efc7',
                administrativeAreaLevel1Id: 'ee49e9a6-5050-45d9-9d1f-967310f4a1ce',
                administrativeAreaLevel2Id: '1b4a8831-3576-4526-bc58-ec53bc66db1b',
                code: '9cvtigpa',
                customCode: 'w6r4rnauz5',
                name: '0ughtur3wp4y3utm3n1qd2gc29z86nnim8cyudck9ewbe22n65ya1yg8ri7f3vlaq3vmwf9q8wrb2l0xh2xabn5elou4i64p9morwgtq99v45un1l1s8wbcvzjkzkp4qnuebyc1pmvve6i5uvfr3upluh1hn0d4qkf7od7estxlm4p3w14vdp1pf54zshzndtdjypcbnjwr6r1bhvyb94yepa890tqwyu5wv7xhkuskpra9lv2k4d5999b9emw2',
                slug: '60dekgx1omez31l7sadzfjnrrahka4a9wygyh3m0rr01skwqodx8nnw8b90tzxl5lcs6e97g2bxm8bz9un3cx8lafengllu6swn0gx2zi6r41vh7ytk0wa0xpovq8vwlvuhzijokfxdoxcx3lla0pves6grrof574hf6lhvveoalhkpgdk02iotrxwk4hwb81uhatyrtejh0gett2ifgxt7jn8axpnl978w5lidefkbg04lgxbcs366uudy58pk',
                latitude: 556191685266579260,
                longitude: 61885327316642770,
                zoom: 52,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8c6865e3-fbfc-4d72-81bf-3c1e86141cf4',
                countryCommonId: 'fe9902d3-0fc5-4a17-817c-befb28568cc6',
                administrativeAreaLevel1Id: '0c659ef1-6a8c-4d8c-92a6-85e6eb880321',
                administrativeAreaLevel2Id: '59c7993f-d396-4b25-8ff6-b33dd6aab713',
                code: 'ntpdr70a',
                customCode: 'zg48d32jxr',
                name: '0u9n7rg7c4vmqsnsnxugya908qvfw2n4uqmxgt7rx608fp8oz8d3ispwa8ciiamudfdfyoha694nzm9h9z044lgqkxfqztkwrvrcseinyj6uoh65el5zc4hgji1hpov6ud5x2nedaeldm29j7xh5igl5515bzhovpj34oyugcf35qhls4fa9t806jvsmdqblr9z15616e5w91ks1sy8806kiq8izh2ud96om5h7oj6oev6cictyif06j2gzjgqf',
                slug: 'g37fa2mf3eisr3fpkqd3244wlphv4qn51th73udjftzh26oq4atvuq255v48868w733zk97p3vzo3m32shp4ppsotcm6gtpuztu2rffgb9s3juq5cgm5lj8j25qv3nmf8ylctexo0i9jm80rraa9r9ccrsku1glepgowk6l0h3nju0fzz60lnh7vfdx7ywdmmbesmz49687ldxp7hmx8u0zkk5eopy037s6kgyi6zpxfrjllwdn9gyhw09tswkd',
                latitude: 22117145257057290,
                longitude: 427033486220368800,
                zoom: 83,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ba4c3c05-5c09-46e6-8d12-058f8c1b250d',
                countryCommonId: '0ebf23c3-3890-4fc3-8f2b-93bb56d41a13',
                administrativeAreaLevel1Id: '8078f4fc-31c3-4710-92c5-9b9af1d94c49',
                administrativeAreaLevel2Id: '8e169200-cd99-447d-a6f1-73ef364eca83',
                code: 'epl1wf1s',
                customCode: 'dw2y8rnmfv',
                name: '1w3rsmx4339psbdmi7x3rm2sebabr9lx8kmp2yqmeib49tdtnykh0gj5yninxvq0s23witxtcb6ry0iv8edfhz4ckeoj2hntqlm4nrtc7jnz81nv3gbe8mpx1eykooe4y746f8ml8ohc49kji5kqe69haoue6o6lr18uqjz1p2ebr5ffbb5uww4xkuaxmn48zhb8q8ne83rbyvkvaek6x7h7sjehdtrur9s3v4k0wt95nwf900rwxtj1rkfc9sq',
                slug: 'don6sklrb3h7qqo9zuysv6y7ybqzxs2mtgdknr4bktizovp9x5bwikcms1ki93pyy8rsyyq3ezjpcbqvmbetzidpmqvfwekoabaicnh84yd6t62wclinq6lejveky6nvn3osmsos8gc59xgl7outb8x0sugs1p7eyi5kr3rlvlj20o9qx1a66dknmzjy0odtm79kjvx2r56gqo01mf9l7i44l6f7ljh4whomdonioxjdrjcz1tiy5etdy1c593w',
                latitude: 21423503233838496,
                longitude: 12038714409587770,
                zoom: 261,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c7c550b4-9381-44d0-86e9-9e7a511d367d',
                countryCommonId: 'd397c3c8-356e-4f11-aed2-1532f3435785',
                administrativeAreaLevel1Id: 'a30e9c32-c0d1-4263-ab5f-1fd7f708ea8c',
                administrativeAreaLevel2Id: '51439c1c-75e1-48a0-9d7f-100dcbf5545d',
                code: 'k8pz1yjd',
                customCode: 'g87ttznnpl',
                name: '5ketaloi35ism10qz6m6kv1ofd6if4of0jn2zxnnq11vdcqhm8gxihzk5hgdw6oppv8osu03rbkdw3kvpa1r6mnpnha5fn60i1f1i9rgibpuityhh5496bixbg809j7ji7vpgkag2xordokl4izad2ut3k0u9eq4bvnzjms86t4dw6xqebc0thp9qls5tylkct9rajw3w6epqflaz2wzpq2dfdo6x980b5xnkozokm8yge053zhqeukwa3gnvjl',
                slug: 'i3ajv338opbwwzwug5a8o2qr6ao94n6qf29i61z7htthafiv8g5k7neq1kp4jqvmgbqs3b6aww81r4b36m7bynobqsdxjskcv95z5cgqvbtzxc0bl1k20lyvw8v80icljq5wyrotx9zrbqxnpc81rina2vl5msk8bxz2vwvnycj4h5g4tovps3xmt0cxsauaaqg4769jhjqftocyaurb1gd0nsl51i6ldgg1zy442xhd9iks7iavgf63uwionzg',
                latitude: 99311453720051150,
                longitude: 54434383072179290,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryCommonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                administrativeAreaLevel1Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                administrativeAreaLevel2Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 76795289712341180,
                longitude: 66300000556337864,
                zoom: 88,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-3/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3/paginate')
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

    test(`/REST:GET admin/administrative-area-level-3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '3d56583d-9a1f-4510-8811-60b05255f2bf'
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
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/0419fb7e-32ca-4fc0-99c6-8eb33e115b18')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET admin/administrative-areas-level-3`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-3 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                countryCommonId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                administrativeAreaLevel1Id: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                administrativeAreaLevel2Id: '271bff23-a0a1-4612-9dda-9189c277fd22',
                code: 'obmmem5e',
                customCode: '8o2tbd0jcz',
                name: 'fzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0e',
                slug: 'mzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv32991',
                latitude: 68460996908390610,
                longitude: 90126323038344720,
                zoom: 65,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-3`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryCommonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                administrativeAreaLevel1Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                administrativeAreaLevel2Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 14257335634824724,
                longitude: 47881942702171230,
                zoom: 64,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/0d5b86bd-e3b2-4c9a-8f01-153e4e194bbe')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel3 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '2aedd2ac-9f1b-4ecb-b8e3-e9702ad72da0',
                        countryCommonId: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        administrativeAreaLevel1Id: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        administrativeAreaLevel2Id: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                        code: '4h3pxy47',
                        customCode: 'm0n2f35cvt',
                        name: 'ol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakra',
                        slug: 'j97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8',
                        latitude: 62750525996557440,
                        longitude: 56564012776819320,
                        zoom: 30,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel3).toHaveProperty('id', '2aedd2ac-9f1b-4ecb-b8e3-e9702ad72da0');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: 'ced6eb31-6d3e-4114-a1dc-b34e986b80ee'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '0589c3e4-2e1c-422b-bc69-b7f9845977f1'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3ById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel3`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        countryCommonId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        administrativeAreaLevel1Id: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                        administrativeAreaLevel2Id: '271bff23-a0a1-4612-9dda-9189c277fd22',
                        code: 'obmmem5e',
                        customCode: '8o2tbd0jcz',
                        name: 'fzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0e',
                        slug: 'mzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv32991',
                        latitude: 72342649118911340,
                        longitude: 13340299868987740,
                        zoom: 53,
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        countryCommonId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        administrativeAreaLevel1Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        administrativeAreaLevel2Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 86371919348842830,
                        longitude: 13734828414401618,
                        zoom: 89,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel3.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel3ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: 'e10df29d-a64a-4604-9dd3-1ab80cd591a9'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});