import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Seeder } from '@hades/admin/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.seeder';
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

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let repository: IAdministrativeAreaLevel2Repository;
    let seeder: MockAdministrativeAreaLevel2Seeder;
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
                    MockAdministrativeAreaLevel2Seeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        seeder      = module.get<MockAdministrativeAreaLevel2Seeder>(MockAdministrativeAreaLevel2Seeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                countryId: '354f1385-85ed-4a34-b028-65aafe11484c',
                administrativeAreaLevel1Id: '8aff0a09-8e66-4f54-b0d7-06dc023d48d2',
                code: 'qmrpfv5u',
                customCode: '112ynwtebm',
                name: 'j3mwwfpnennunyyfnsn1jlux5ps2c46j1vi8xh8i1xt7kwtlh3ml0y8xxddfptbdinjin61y3g0utd3b8g56lyl1lkbtvjcxtg0h43o9ln3gxqmfsaq03u0e2meppydqx8lna3l9ybn55l5uxfauhnyruhzvatdtjnoeshdzzlj7bqvfki71vc9fefmd00cs1nkvfr9kg3ih1lcye91905e6ofaropspmw1qgl6xnxv56slvaes80i5ze3rky7k',
                slug: 'h9kt7zxgohww9o2r2lm1rlerfzxwmixlrl469ukydam6l75ux4i4hehstjevroodk2e8ffjl7ey0ydva7c6vesunaobh85c1xnkaas5d3akst02myrv1j5wvsymzbzrzmvgq3n5v1zlcix8g4an946ozo1ugoo36ea32gdjzpz1eyzlx4qox1ca5cxcbh3n73ufz40154x780jw861jl2uic1yiolrxwasfdhyc7pm534it9vwk1jtxlsmvfe7z',
                latitude: 85219652316712050,
                longitude: 10523744628538318,
                zoom: 72,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '170093fa-2655-4f80-9fc9-1b7da8ef46f6',
                countryId: null,
                administrativeAreaLevel1Id: '7af50f22-c902-406a-897a-d44eb3025b65',
                code: 'levau4lp',
                customCode: 'h43x9cftff',
                name: 'rebs87hb7eiqrz29l2a9e0pwyb1d94le4vvtzswomehoa2xzz9zwi3zb5is5r5c33jbxq5s4ta1q0z1cpjgumzrmnat3q9884y124m14zqumqpgeg34imdag57m0fvb1fvopw0corzezybbyn0y0low08jdy8y33ls1exbfco3xxfub0uvv625x65a005xg822fh5oieoxzfvqlx9s00eg2t1tznurnkv618anl9a69mpvbomsbdaf2gxl74rw2',
                slug: '3png502rar9sd55g519gpjkpqe0ty8wq0srvxvid7jvk82li7jh1c8e2dlzvfen8ryd74230hnaj2id5mhfbq4k4msdp37v8du5chb3ef6b636bhaoverzbgb1enkp65g8t64ax6u13r2o1qdpgeqtx1uad02z2sds6cyes67wpbo5diliorqmfm8oylkik10m7kjygr3yiqgg4iydgfmo5is42395g6j529hg90gap6a0ro3mlz0zixyzfdmiz',
                latitude: 19269281662842880,
                longitude: 33143353780161580,
                zoom: 46,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2fbf8128-a0bf-4fc6-a672-86de6fdd97d2',
                countryId: 'ddeef713-2626-4ca6-b558-e20bf708ebf1',
                administrativeAreaLevel1Id: null,
                code: 'dxdd11zo',
                customCode: 'axf4oz4qyv',
                name: 'fk3wmn1y1sll9z7cm2empnqn3j1lhmeek2xt5c7gguybmkb0tbbrzw92xz9w0ch3dfky8kln21z8gzbllly54466w7ysxbb6j2szs8t9hqimt6jb0wjlqtzm3jzvl9byjtz1efm7kn1xxitseo2qfzdlr5pahgndhsj7miywx3ftng42gndyl2h5rotjqzsajnavajvgxavaq0pfotvdzclmeglwnear6su25gpbsr64u4vs7gtkbcqg4jwoui6',
                slug: 'm7vm6652iyedygknvijn9ug2vwc95hu1loub9707zahqxmo6l2jpjm31mwoxtz0s6iuv6m33fyufac9ufu2zquyrlc468e63mmtsi03auiipn4ixxnaxrrepiq3m38o14xrkp5xzk747kcz0jtpef7egxahp1hr1nkq2k0k8i97iqc7d7175rkwquvoyuqnqsd8imjs5joj3sio8gl1kbt429l46lqvibla3fazqe5k5r17ybx2w42asbhntc4u',
                latitude: 71833238286121620,
                longitude: 17380149888154636,
                zoom: 48,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a88dcee8-3a27-4063-aa28-e0e5fbef7d94',
                countryId: '076a804f-a828-403e-92a5-d9172aa3eed7',
                administrativeAreaLevel1Id: '8b7426e1-31c1-4cff-89e5-50f23f2f8d23',
                code: null,
                customCode: 'u7np7zhv4m',
                name: 'fmdkj6btujqlkupybnqq6u08jc1h1x0hl3ujzm5kxz5d2sa3t4qt9p02f3gkdamojqrlh2rfeh1kuspvwjxgbymzpsonj41l8ft3i66m6kpam8hr1g5r4675bsuzb14d1dglpomtih78til8ffgeaglk294s21feyood8dwuy8jefamlplydh9eorte47u93xsg2y7ielew6deu1vpnn23jxu8qzp3wrhojz93tne49uwroeololfh1l155vrq4',
                slug: 'bp06rsdifsus1nd2ufqcwu3shvcdey7rp73al0nmn058vq33dalh5s88pg8ozhfd4dn4qy7vecv23qhjljznhexvwrlwrc02c75n3h06msoluci3sq11n09d7tupx7y7f8aq1d33emsz9hpzvvqs35kzo1fjfltk8tlh3confojdi913ytzqveqsoo3m3iad0mxkfox9xbtrov8hwsnh46m85263zfru8fiebamr65xk21qkc75dw3sl9vztdge',
                latitude: 26624699881255444,
                longitude: 82292276688812820,
                zoom: 59,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7ba2de40-1b2c-4cd0-a4ce-ec3f06b82972',
                countryId: '2e387849-ab75-4bae-872e-00da6a18ad0f',
                administrativeAreaLevel1Id: '9153145c-fbbf-44f6-b645-003490d392f6',
                code: 'xkrcisz0',
                customCode: 'oxr7lbggw2',
                name: null,
                slug: 'smc0k1ky9ls97mve3qilcpapngm6v3zxi8o6h4sxoczqtxfe449f8c272v0q40yav41pxv10e0iw0vsrdu9dmigownp93vthlwftsvaj50onvok4zxlyp1snu0caabwid3dumqie0492a1tg71qiywp4m3dvr0tnzk4n18ur2biaoc35y830hco846u06ckhnaiiior0uubfq9mmcimoajrp361vt9jyxf8bhj6uy5b21nzud6d5vluxpefh7nv',
                latitude: 39580335332478940,
                longitude: 80679298161894820,
                zoom: 33,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7ffcb27c-9d66-4029-90e8-70c30ffae145',
                countryId: '49f85ef0-ec49-4df9-94ed-f9003de4231b',
                administrativeAreaLevel1Id: '5ee75e66-a5da-4dbb-b66b-b3894c105776',
                code: '0lki6gvh',
                customCode: 'qwqzaatw76',
                name: '538zqj60wxfix3xiyfnsj46zcz0oyzm1jn4k1mcal4qpaqui8mgdqvevqfdm4jeki9yheq89xrjosph5wysuufv9g9028ttmj8fw80gevo03sm676gd0tiz07hy61maob2nabxvd7fjvy8kyf1o4gz1qmstwwn3zew2opjufuwxrk429awfred9jfy5dek23j2po2f2rlia9mk0ruen7lh153gkj8i7fydum7jkd7fevihvpl7tjtr1mjqvnp9j',
                slug: null,
                latitude: 61703903636017360,
                longitude: 22271427455973572,
                zoom: 71,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                countryId: 'cbfdc1b3-0614-41ac-b774-c9dd7b0756a5',
                administrativeAreaLevel1Id: 'b493711f-af52-48e5-9cca-954b517e6327',
                code: '8qulo5g6',
                customCode: 'll5q2g0aki',
                name: 'zaofhasdsplvd8d1uc0rk81k7q27zcltsvgabfavoutqv6pwpws95a3cjwmnjjh6h6kszqup5tdudj1b88y711hw6x7pwm6eg3fuz5b5l6l76yu1vp3qcfp9yir3dtvorizz916fa92w4no77l6gueaywutgk5ka2u4o690xd5vglq2j90da2ndeh0vgwx47qcwzudkk99uzs4e9as0xaxcdwhsmg8qehb7u2n5nrtt6997535cbid3uuq5p3em',
                slug: 'iblq5oo25d4urx0av7wt3nusf9vked8huc31vh1dsfblb38rm5ooc1p36mulpgcml0f4nhb5mv19k09eosmzd6nixah646s5fcn80x7k3019pw4jmzny3ax9beout2ohgjj6s21n17n1qjyezpv4xvyomk5ymogt2fdoqysxmxmeighwzeh1cksz842iktov9tlj52ue2a9e2tf1yay10dzl1vd8zhs4hj7f2guc5lf7rk2ik6umwho9l4ky4uw',
                latitude: 47366796883642960,
                longitude: 55387045645219180,
                zoom: 62,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cf09e24b-f6d9-4131-947a-4da424f9d0ab',
                administrativeAreaLevel1Id: 'bd69880f-2037-4d0e-b241-7489e1cf97dc',
                code: '3hxmfylp',
                customCode: 't6x6lsry89',
                name: 'aveod4w4tqpgkrtp9fy761ocizhnunpu1d18vlxap8gefi50y6k56rwvlwz04pygt6igvvo2my0c4n1zwrwh2eneue9jq6gstqcx8l6654nszk2coj5a3e419tz34tvngd1m045cxgskkg6m6hmwk6ohq6m0rapd9izjvjugp41i0ep9vq8nhj3hr9sj3cu2f32hyo9kicvjrr7bcy23datctgmgc1ifq3ntgo4fpoe3w9sbdw6pe31qb7kba9y',
                slug: 'mx2lxspb5fkuv53o8815gwd34nl5mtu8m9jwat8lfuwlb6vw9qyac24sg8whzs1rls6cvxu1dqz1vjbvcnjw3vckywnmm5blspyq7lahuemxtq59wyro33btr5i3pc46nrd3gl4yox5o9e19o1otzmimb3btlya6gc09vcid2j160jv54jflhl58chzwrnajr2kknhkgu6qc7siekjbq44p0p1liskwuk7s104qigf3hhfegddsgv3gnzsziynq',
                latitude: 95472676868663400,
                longitude: 61766654959881430,
                zoom: 52,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e5b956ab-4083-4b78-a142-47c883922562',
                countryId: '550bfb85-7e20-4c1d-92ce-8ad625bea30b',
                code: 'xknx74am',
                customCode: 'gcgb8ajyka',
                name: 're84m0fl0webvgvimto4pka2zoxe4wxfopsaj3omkfg60zyt7cmzqm40sc5ojh5wx0024jan9j4kfm6qtmy23k5uk4ne6fhiqeci8hc8tsbq0qfwjk5qn1qov5iqyjk28bdv1pviixfigfgn4r573zmbhtu1a1dabufaxcgviirusekkzaaxp9p4q9b8f5eh6zj51gudwwwre0k0skd4mk1k20xgd3slwuqd976ht90eddgpwcnc9fgldf40zb2',
                slug: 'obwqukoyrrupfesql119zx6ri5z01ydjbv44tbt6ntrjgdoxilwenpsd5nr5zayel6hkodjf19c5am9anld5m9somq3ytzeuo3gwey2x35oomdtnp25kvg0fpqdjyybmrdnol1bme9wfrh2fqya36o4w7mh90r255eoisxldpgja1mjmdp1km59wpnpj1n9u44builgrhyfk4vncrr4o1p5763tagboklky9utzinbfarswvkapste7ld24ayy4',
                latitude: 44159997597109020,
                longitude: 52803714775730660,
                zoom: 47,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fcb6ab33-96aa-416f-89c1-4184a006693f',
                countryId: '46f0e954-f6cd-497d-b38e-b53a41126c55',
                administrativeAreaLevel1Id: 'b34e81fc-5f15-4caa-bca8-19b57f27776c',
                customCode: 'wilyiuh7zm',
                name: 'qz12utto8ljtnjz4ca4f9503deisad4nmajuxudal5bibgzcb60r44jwnbkbmifc7y7703xjbbdqoyf5u78wbvtv7yzrmr5gw9xrz2otu5y8zmmcyxol9oic9c8o5i6qai5zaw3vmof33ubsyua7db9qh251vmmcmt3y8yns4bp9pwlzlis3pttikiibkwjspmu5bxd1tkbdcmpu4k06lrys7o1iumiq0zee5fj68gaxfx7ensj3uk6kj2nb0sv',
                slug: 's4l7zbfed1cj1bjtzke6dpj3zwp7nay0uzdifnx568svrr8mlw17yobn16uow57be270ekrxvljgxrptj8y6e6sstyirqj355a9tmomimx88ox7hsobvij0pgobk3kdc1j36bpneph6u372xaphci0t7zbxr37h87lrshqtpalgvpmik272frby761vg7b56zb58360x41wf33uvt5rz3p9f5lxdy4anzcis6fiwzvlpq68sur60t8vxe6x2rk5',
                latitude: 11272515734177844,
                longitude: 63335490160289850,
                zoom: 60,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5836985e-6484-4267-b131-e673a33024be',
                countryId: '306b85c0-4ce5-4f2d-b142-216c1705994c',
                administrativeAreaLevel1Id: '9bc70e7a-84ca-4fc3-85c2-cda79d3a70d9',
                code: 'ab1sj3kw',
                customCode: '0haeo3fm92',
                slug: '8bdgu2lbvemcjazcfdraoqgd130gtcgcpn27wbs3lbcdhm1u0z5hbp1stra3u1oal374s5ox07ul5lyod1y2hblkhsyfz11br74nk4nii0kgwyyj56aug0dlgid22wgbgds02je9djfwnqmzu0ahpzn3mauf3l4qk8p4abk7nip0tso51olxt86z6an1ae18704qm95rv83e48otfhqt22r04fub5p58r7chb3hj2ng3900xxcltesdysivfdql',
                latitude: 65043987876076150,
                longitude: 11905013096398136,
                zoom: 44,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7823f114-dc3f-4b4f-b590-9edce00c7b76',
                countryId: '18d18b57-261a-4c5f-b48b-57ab60aa62f4',
                administrativeAreaLevel1Id: '4771327c-a3bb-4e06-a4b5-aa3d21830f08',
                code: 'qjc6dg4q',
                customCode: 'hn6bctaooz',
                name: 'h2xrl82c2oetzb7lq6lfs004zlw0insdn6xahf4v79tm9e3t3ndqfnx5546wti53ikyeyv6sgpvaj9n32e1h68crykvvdsukcmq7x3f44zbq0v5hg0fo695fewuhmszs1y1eohpudc9kshnct8f7mxnvx5kd7vyajc7u6zbyyv9somw145x18asc1ujnas0b64w365d5ocyvm0cxh2ocpeejeda4ccbh9gxtwbh5ma476upy3qt75eq0o0c1wes',
                latitude: 94812023982438180,
                longitude: 19059982155690132,
                zoom: 51,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'm5in5xd5x1bldw741q2nabtx0qgvncpsk4zg5',
                countryId: 'a3f37d36-46df-43c7-b33c-df6ec621677d',
                administrativeAreaLevel1Id: 'ba9aa70f-fc21-4033-b440-f79ede649869',
                code: 'ptw30r9c',
                customCode: '4sj7fcxtbh',
                name: 'h7i4jx178bhzppc948a7y5mp0mm8clngsuyk34449oeynhstly3fhzr9slsmioyiq18e0a2cf6s1sp0ac6wio3p4m1rc879doeswyg7hkafwvgbnnnghr395vw27ymwo3nrwxzbf62cf1b8g62ad3o9tu8qbi668cwgkkad9lx3wiggj8mpjsz75n0stm8qiw7l224xsezca90uhj51ba60i7yc1ihx0gx3xnunntt2xqdddaqzj4s8fyxwgo9z',
                slug: 'wri3uw7959xdzpko90gx7rrrxfpzj3x0vfhr9zjnhte0ohi6q60tseyawc36auc1be9c0l8a6pxzuz9bsu050u8o6tx0ttgb9xn4xie4fhje3ld1hzgbgz6hrvex2k0ma6jwoy4sejnhmbjo46t49tg34tslhlcq5g06gwghudcveqz56cfspj33qadk7r4oec96w7zv7e3ctx1gp92pfuzghvt4cy3batp98t63ql4oklyxsh9lg1qa53tsg13',
                latitude: 50112082980516790,
                longitude: 95814476582642620,
                zoom: 76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '627e6686-bd11-4576-bcea-a610f4e7eeeb',
                countryId: 'lprw2wa93edc7b3kgdjgk64nwrlufda83cbps',
                administrativeAreaLevel1Id: '69597c71-7690-4811-9f6f-2530c220f5e0',
                code: 'kfnjnecf',
                customCode: 'k2nitfuq1k',
                name: 'hiqexh85ba1fq0zqsaujw8eziunxc1ho1eeauyv16s1zbilpp1ezg4g8j2oqs4pu3a7xual9sqglwjfrl8dtek084sk2hlxxchj0ipsospfnwcqqkiqvdg8x7x9p728uf3021jizlwhwabyvtvj2out1wdtzsqvcwc129gcsqlezpe14ny1juonexlvkuqxgmu44tuxj7m4swgzbb93gt8olrxbafy2g5c8u3vmhtljqavqucnlc0tmugh252u5',
                slug: 'dreb1s1vykzuxbel1ompfepidih8n2v8d8f0y0l7oc2wpmi3qxumbx6cwisj9trtityuos93vk35n5aly9837etrky9ymx2kckb2mqkmgz7mru3f8u3lpn6r8xhckkmutskswedssmuk55x2gsgfn97iamcmm353vshnzmd2wa0t23qbu7tbpfzpzyso8ol6kvtzyq4qrrnh2tmzfdc4jsiu2r4ph8iuo9bp9ulnup5j4r5rkvhpkrf98u2rqh2',
                latitude: 94344268909648370,
                longitude: 64308185697974220,
                zoom: 92,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cea707ff-c915-42aa-b042-4f31c6305ac2',
                countryId: '8980da47-e549-4b42-ae46-b7832017b9dd',
                administrativeAreaLevel1Id: 'hkn6453f2i84wntbj44cf39n51f18f2anr2ya',
                code: '1wedikoc',
                customCode: 'i1ljr63oul',
                name: '9ssbtf03hrom6m64c2u61ot1iwes00le5i9pid32kgcrfnl02o3h9cra6igmemrxmzu2eth28n1i0v1kbrs5rfp9tl3kp4uo2r8u0d19ghwfib27b5l88s0wfzs9f32jpb7qfociz6uf19trvsuuomzl0iawbx2lmz145qz4mjbfwtejbeu117lia0tkeznt3z7gfk3ixj3lwzouo4hmo7cqwyopapjuoc3c4ndw0agt5m8kqzuswdznp4ykyug',
                slug: '4bl3c3ym89npctyherq0lxvdpwwdjlysy5avmktwkofaa1r0cjyx5ppp1jcq7samfw7h0tnjxuzku2s108lc1im18vz0avclmuj7scc6ax8c9kkkehdks6wysxhxruffhwvka3tbhia5mawirzoprztk2fuk44k9xkybcmvw4pd4uqiue30ozkm67bqceg408cuqj24qo5lz7gfprooiukkri3oll2ndssppot3tna60cb2u57u1ef3o1mebha6',
                latitude: 48386693060742770,
                longitude: 93894620767191760,
                zoom: 21,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '98a5792c-760f-482c-9dfd-8625ab51a219',
                countryId: 'f7274bf1-d690-46fb-b3c5-6f79d7e31bb0',
                administrativeAreaLevel1Id: 'a0d7fd5f-bd89-4466-95e6-9184f6b085af',
                code: 'o8xbvixzn',
                customCode: 'grbipivbxy',
                name: 'cqo5wxfpyt6ok54u2lzhspdi0d89zaycj0uitawdtfjy5rncsftnjhfx6svr492dfrq0xo7b4phqqtqn8fdr22lagcwodf4h47oi0ctsaze7rzvjcyyaczhi12wfgbzdleep731q0pkysc8kx285cjwx5xjv7glp3i0scpybwk1f1xvgn13kt1jjphzzkyuhfunrij7bdwru7op8ldcbuy194i411uuvolhee244sy0l9z62u7pvnu33xtnzgou',
                slug: 'id6qq83huwofbavxse19uzyhsil20ao7umdipgmupne2ok11vbir48td6uctcdpa7co64klptmib8oeal8ejhvp7iq7aitse4du7w4lr9r7pjwa1d2z159qhj5xzgovih3hikmkq0hw2038jezdk223xtnge2tmz3nc1o2qhogm6qbvbi3j1pdpvwm3f6r90t1chn8xoor41rarfwbri7rcv418pbb7qt2lvk2i8ksd6c0ye48090433jt3offw',
                latitude: 94710386043531740,
                longitude: 23692676639633696,
                zoom: 97,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '85cfc730-4996-420b-b67e-afd52bbe017d',
                countryId: 'b6320b51-c223-499f-82e9-b062a760c54f',
                administrativeAreaLevel1Id: 'ad0c2dc1-0936-4585-8d1b-3eeb406ca57f',
                code: 'dl10fd5q',
                customCode: '1z0o31p6zs8',
                name: '3fzk6bbhyk23ome08wo8f327b2u1urssqoos12csbi6u2rgk7qsgqkg5h0h0rm02260ky98wsxtrrppt3yfd1tijyuqa75yjz2bo075jgrf02jm3ya8uvjxty1vrizf5ax2enc2iroymp999mvuib2o2d2jp8gtn94qcl4g0ct63fmpkm9lthvy2qw8qixkj7sma917bers97krw6qxw6zxolwllectr8hyozy8d8xurfq78hcldr9smo3pj215',
                slug: '5m2wewbs3e6s3a4t3vddazr8ei2jjx8ros75bbm9adf2gul4sz8djdjamabgvefgkbcwpq3j9ltbu7n80x9n3ggyekhdqbyhdjq27o3sgdcahft4qlckr15apqz6ulogpi7lrmim6dlrzf66ntufepcp63mmt2myqt1bvbrrpc4nu6xw4o81i877edd8befs0lmv9z14ks8q2ob2zmzusdjqku0jreb5gtf6alrrb6mdtsouwe7sk7dm6gputy3',
                latitude: 61647590014694480,
                longitude: 49957448202208744,
                zoom: 16,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c5e0a3db-a3c2-4a6a-b327-8b8e5fcaeb7f',
                countryId: 'b2eb0c28-672a-4b83-a7fc-3634d1f6617f',
                administrativeAreaLevel1Id: 'fec85c67-27ae-4cbf-a25b-ad1b318f1b32',
                code: '3yxrqdk4',
                customCode: 'vgjyuu300v',
                name: 'fkv0uull6y413t4913181zrqt5r9mwmmfgge4rs3mfzqkyazaiaoxcmjadqpigb870rcc7ohu334sbs978ldpgrnrz876mq9qthilpn8kbq0b0wtmyyr7etjg44a2fspbyydhvoaoneimtqibcyitoqi8ygeu08hq844z7xuo3379ijpusg72rgqdx9pt0niu0a71dnoofymh6cfsbjeotrqw51mbkbjrgytw8wp3ipen72lv7tyofclvxpl2cg2',
                slug: 'hf2zdz0ujx6bti2bzvmir4dp0x9wy6tvnonr8vvsme68efvmm3i3n4wna7am612sponaqqdgwo6fcidkfs4lujz39o7js700oyhzn9td1t9g0j8robxdau83d4ob5a6ig1371c64jrx8cnl2avbajtypjnja52el7bg1q5cw45h4tu7az4mra2vi1z0607wrts8rx6uihgidzo1woavtogyrv0xtbzkq6gwsa0p90vttnuasg573fg2lxdpx1r5',
                latitude: 83243445366739420,
                longitude: 37179516587033470,
                zoom: 73,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e27e707b-2848-4e63-902e-73e552587519',
                countryId: 'b94fd5c3-ba86-44c6-86ff-023e255c7f00',
                administrativeAreaLevel1Id: 'd55f92f3-3367-4781-aa6e-4c9378f09f38',
                code: '6obfo9iu',
                customCode: 'jmrmnptgum',
                name: 'a8b8vk01vyu605i9ndxml8yf4f105pc5kqlf2hyjyxzx9jj3clqyl9h6si5s1w9uml8x4xf56mq6tf9fh95v3gv54xseu0fz4vmthsfj6xcasijok0ngsn8lzdm4ttvsalxs1u09dlf1tq2ubd4sgd67muzuleiqibw04h9kdhwxlkxcr0kmgz0d2xdm33hjd7mjaptfmp0vrcn6qb7uhsm53gz7ru7zegz86swkxvp1aj7y234ykvccc5c857w',
                slug: 'z0bivtyrphikgnw6y33fbxpiq0humxx3xcu0pld7ero2q19scg1br5mc97wut1at7r32irj9spsd4mo7ipzlaw3f5xjcm0bt4e3ka2b42gja6i1zz8pwtsvcvt9sq0zo3mtl5nopvmx7kpng77fgzs7uhxvbueob7nny526fr82w7xkddhfeshhompiz9ja25sbdpay46u7phsmmxvgyxfgd8oz9mttk5u5az7plf6w2duwifcg6zpfpdqvbuwdn',
                latitude: 93930236801027330,
                longitude: 10546155273831772,
                zoom: 33,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '942587fe-e831-400d-a57f-d4c7d7eac99d',
                countryId: '4d9e686e-4ae4-4fba-932f-4f4e8cbf20fa',
                administrativeAreaLevel1Id: '2e8b08da-67bb-46fc-8f74-50bce6784bf7',
                code: 'ng4hrcuj',
                customCode: 'ejrby1nkk6',
                name: 'j6xm41wyqayw9vovbl8xw85pn9gswkdgstg76tbjbxh7il03rbxj2769y8zorfhjogknm682pis6qtegoa5hbcq5sspm109a7dppyasq90xlb6cjzvkzu4y5nkwq5ezp0me0wik31fqjgja5j6dv1zgbn1ee1hy7gfo46i1cgi9zcestjei42vbkxoyqvyvj1jli2t8h33oiypjy1qazn2yhngyqyjyxt80owc3os3vs6dpz8atnil9otl29un6',
                slug: '2dc9vqhkz75hfh9osci04ehtu4yznrk58d1c6dqr4kt9k0oj84tjwubpaw499vuvc0p00vc4id826d5no0dqr6iqu4z5e4hgdwb7wgqi0438dzf9og3mdh2yya8jdbn8va90axxzkqyqonf92xdgsge9ffrh4xut520tbp3qvhwf7ovqwvv3p81e2saqwa598etxtt9j73phlhaynnji7ahte9bzad5kiwguwjyt7vnmc33zpx1gbmzxc6kagf8',
                latitude: 561927971415688500,
                longitude: 29591648175135452,
                zoom: 41,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '47212817-2ac8-4d7d-a1e1-03f483c17df0',
                countryId: '8a2fbdb5-b948-44d9-93c8-14e74e5e8567',
                administrativeAreaLevel1Id: '3dae8636-c96a-447c-bddd-fda96d8c8b78',
                code: '74hwwfcr',
                customCode: '1dix4nq4ll',
                name: '9uw3vjjhbrki81r4ku0as6wdpmwcze3wv9ddjlu1c1pz331gbsd3sir4ii6u7dxdchu36hxk7l55sbrajdrt3ev1om3n74k9l7swzd4sx065h4u8x9yu0oov4fjy76e95drnkogdzklaki34hc25vknxzjqvmd2zvt5cpcdk9p0zmz0qop50e9tg2oh62fa3f120dp5nm27rra8usri3ntexkcduu6fx3sa5roi1sjtmsx48irstkuf4s9shd5m',
                slug: 'bgu5xst3an05oi3ild4r517rpee1jxmz9l4lx0rlzxacuy3yldi6004f9luap9qqqenmiymzuejw22mmhb2lm4jd65ut2jf51xjglo4b1qnoumq2khcfl9pe9km3gh6seufwup2koa2ylp3e1o42le8mvef91fii6baizqas2pie1wdrznieg08lvyfm4gfcfaebqdkv9jz0pgcn4u3hp7936p03ndce63mtf25wx5ybkkogcwp96o5r329n00j',
                latitude: 58282775915342100,
                longitude: 877228647696099800,
                zoom: 58,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dee88ee7-41a7-4c87-840c-1567d19dbc41',
                countryId: 'c2e20070-fec1-4d97-baef-b76f6ed2ad89',
                administrativeAreaLevel1Id: 'f8da3978-d88a-4fca-b9b3-006dfe4940a7',
                code: 'rhmktp4u',
                customCode: 'feee747spl',
                name: 'be04nc676b9msb3gbwgjsylquge8qotfawcxopqg7a4bktalusu72ipe3jynfqwo2o4ein5c239tcwzyoamuh4z8bk4nfp5teuplbb0fny39x4gi9rqz4eutrr2cu3wavffvgx9eoik4qogtkex5t93pe4gbsdusd7rozhykh83uat9dahk2mxifkjjrez3rb2uf16uzqcnfmohxhgy8inxbf2y7j3emqnt249dtkj59aakm9echj0p5xr5zxzr',
                slug: '7ht32mg3a28p89ubis3o53z3te6ve57rvblgsup08160umb8mqhx4sw7na60kngfzrteztfvcbpns703gq0jg7jx1jt5voliz9y2a0maq6qb1bnc6qn7xzyxnk6y1y5iyc5g8qemcvax5yneiabu1dcmamwxu5lszn9903cdd0yrrl29f23b5321s3vxactkibbulheztzv45mo4m62ao1rcurvb1jsqa694ycesqhkqpc7j4az3ouw73u6rlsg',
                latitude: 65978407909091384,
                longitude: 71014726754825990,
                zoom: 899,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '46d5c9bb-29da-4a2a-acb4-9107de433715',
                countryId: '31c09cfc-b03b-4c4d-8454-0034471f64da',
                administrativeAreaLevel1Id: '6384d51a-b9c3-414b-ab08-fe549677fd4f',
                code: 'lsq6imfi',
                customCode: 'xhsoj4k3g4',
                name: '04af5p2n9e4le25m1xffl5nl1nu40x7tyfuisr8i4nzas9yn6to63g348imm2yjkjhfe6tockhk6oc7a5qmvbtdp0cs7xz6vki3n34pl0682pt1q6bu5q30jafrpwm4jcrkj1txrqoysmqcbz4a2fwf3uv1yku632n4hegqr7zegvxunzouylyhz4xjbywz70wh135qr9tyz6tp0vkf0t3cxilrvdp985rr0saek90zlw3o0qudb1mwkyx37fjj',
                slug: 'qq7tcc91e6f9yn3aywqi0vtirv6kytu254wvdo2g8p9s0c49bkeqm76nn6x524k9ozb3p2vnb622bglutz0ht3wqefuoym0fma3t1yd30i5afwq1j52wr8bjnbl3j2bm76t8uo8mbh06tvxpq4q3glv904u8x8oesh6z7v4a0307h9dmik67lx3v5e3hm8eztcxlq0iubhjqjce020oike1mnwq2714b5pr5hnwbpzk3cmjb8a6fpwa4o7874qp',
                latitude: 42472056936176980,
                longitude: 56097519535531430,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel2Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET admin/administrative-areas-level-2/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2/paginate')
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

    test(`/REST:GET admin/administrative-areas-level-2`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET admin/administrative-area-level-2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '7d72ed46-0fab-43a1-8d8a-00c620131619'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                administrativeAreaLevel1Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 37710572621150560,
                longitude: 10102050573334628,
                zoom: 70,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
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

    test(`/REST:GET admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/bf9de975-4d5f-4c14-81cf-a4a0d6ccd208')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/administrative-area-level-2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                countryId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                administrativeAreaLevel1Id: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                code: '4h3pxy47',
                customCode: 'm0n2f35cvt',
                name: 'ol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakra',
                slug: 'j97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8',
                latitude: 43019430274102536,
                longitude: 75655769988982240,
                zoom: 99,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-2`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                administrativeAreaLevel1Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                code: '4iyw9pws',
                customCode: '4iyw9pwsdx',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                latitude: 49226729186098290,
                longitude: 75845604473129730,
                zoom: 52,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/6dd32a3d-4d74-4339-bb35-5b5bfbf33c01')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel2 - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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

    test(`/GraphQL adminPaginateAdministrativeAreasLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel2`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        administrativeAreaLevel1Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 87979488503909950,
                        longitude: 72604733468628500,
                        zoom: 16,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel2).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '1efbbcb8-5a70-41b6-9bb0-af844567a808'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: 'ec1f2e71-228d-4ea8-a18c-962245b5378a'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2ById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2 - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        countryId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        administrativeAreaLevel1Id: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                        code: '4h3pxy47',
                        customCode: 'm0n2f35cvt',
                        name: 'ol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakra',
                        slug: 'j97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8',
                        latitude: 75202892883576640,
                        longitude: 49638788380047370,
                        zoom: 50,
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        countryId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        administrativeAreaLevel1Id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        code: '4iyw9pws',
                        customCode: '4iyw9pwsdx',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        slug: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        latitude: 42991668375248500,
                        longitude: 42228591617033600,
                        zoom: 66,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel2.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '2550c708-4c10-47c5-95fd-885a3d5dab4d'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});