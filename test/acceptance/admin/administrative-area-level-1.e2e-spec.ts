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
                countryId: '07618209-ee91-4ea5-a710-11204e49aff0',
                code: 'r6y8pvxb',
                customCode: 'wkw2xnxryr',
                name: 'ukl4rt8aegu8kc7sbh4chkjkey6pmlng2jvftc4qgleamr4ajothkrebm2bg5bgdm1246bmfyvtat8rftgrtvgdttbu0bp6w8yxetu9llaizfixbhs94lvej9ochp457oppsug66gx0l48pbmmi4r7i60ebrcefwzyud3icmefhad8z1bj04zyxv5uwu5m4rbq9m5c8m1o3yg43rox1x6z5dnmmnqqp7smwhlwfwh1w3tczoc865ixsqrjklmw2',
                slug: '7o16lim877qn0sdg8ljbt241iou9eoegny0qqjpketj2hw0juz182vefkxg36cu5kym474fw2k0e4kljh16v7sd4f346zj2wr007dyhh52wu6g59jmwum0ts3qu702yrtn5h0k19jigkfyxs3kqj3e8joccexan9qdem8gvr397i4whcnq8zyim8x7t24kwrlyiwzwrcwmk3qh5d6thmi82p5bn0lpaa53qvgs7tj9uiqlmfo8rpcj19c41kyt0',
                latitude: 81831461605759550,
                longitude: 33150369432421316,
                zoom: 50,
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
                id: '44be948e-7365-49a3-84b7-f72082fe1057',
                countryId: null,
                code: 'g8ducgog',
                customCode: 'mr94n1hahq',
                name: 'bqd75yf1uetlovug6kf1pnob9h48r9ao2k6i9k38h6635d1awhapw92y30z3dadrommoyhyqy6h9rq43x9vyrolrhc3j2jzuz7o25v2ekkrf973gk03bwd2wmv2yxw60eqeg2r4z5ukr2caey7kgftil14cqj4uh64ahr76p0dtoo617hyitgucj45q2mnb12c9vabvy5bgkb13nxmdp93fqvemdztxkp0055puydq8ry98p338b0z0hzu5m4op',
                slug: 'bbypm3vfmbwi3t8kfwh9sf29j6yvm6r2ivlay8ic5vowlbq5b9fcdm4q8oxsxyq3p9xtk7jxjjotznq5d04bhovmq9l7fq7ljns848ug6cmhqr1fsf2xtrnr96emqzqngridnjjh83oe1drkob0opz3c0qxc0r8lcc0aj7lxa7aoayjvkps049mjr6rnbhuhwgnh37tduerd1700rilugltzgheeuhdt2gwbyyhuxp2kxuxdw4izkez4nomag6l',
                latitude: 77822325872448180,
                longitude: 68823794982915864,
                zoom: 17,
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
                id: '85792472-81bf-4092-b7c0-d59e9387d88c',
                countryId: '65c73660-e40d-4159-a540-acfd63aa0614',
                code: null,
                customCode: '84sbtip7s5',
                name: 'u9mfehxju54f4xcjsrtmxt5g9qn2tkua79d6gmpstlq5zl1mbslztgk1zf4edgrxzrwvogntfuziubed9m2gfavjezaousfbsshygd4vdnttk0po1xyk1agmawa8hdt8xwvbeqhyrl1kali4c9w1uyivd02o9mfheizswquvub6fu47u4m8qsj02nto73toireu3kl6qaafu177limh9s78qeznita0um5qtw1zqu6045gwci627c6i6b1mfs16',
                slug: 'bvktym7xhrtljc08yz5wgg6skbdqqw2k1gpbrx7palb0yz2zcky5yp9vh8sotv6r61utsr2eyvry1fzdrli10eh6pr2fqha8ee6nuf6sipa2z8ipclwtawzr7r7qaamx3b0gyvdyx935nd8gpwhiy70g5r34tkhe8s3ckfintsuxzhpmn8yz0s0y3tiyvbr4ynkxxcqlf8g9x5xeq8il3oa3gs46vm91v6fa0ibj6hytkvvwuaxf80dbixru1nc',
                latitude: 48980585179921630,
                longitude: 10799099584100804,
                zoom: 79,
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
                id: '90342048-9980-40ee-8732-da3795359981',
                countryId: '402abf35-0e83-4a24-854d-b4c0f1489705',
                code: 'qz6bxilm',
                customCode: '4u20vbcwn6',
                name: null,
                slug: 'hr9f1zfzd2swg5ulxtlnxyvilihqdwl1gq2ky39x3sb25rhrjzmlyizse39musv789pgjry2flz93k4ivb9bsdibzi05t6jtusgyrvkad06pix979to10ukzzjwl31yxohg0iaw6f02eo3ilwdnafd905sjee379rf5a9j7j9626aq2ieekt1ucbzk9duuu7wfyfllzjzezw2o0a2fksh9j0q10e6n5k28fu844ofvhi3ft9mwvcsr36nozkkpk',
                latitude: 94037676405690050,
                longitude: 98689857217148700,
                zoom: 97,
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
                id: '07e66c60-ee1b-4dc9-8ed2-1d91f9b75680',
                countryId: 'b415e0cf-2fbb-4395-a591-77392d69bb94',
                code: '2oip8ctu',
                customCode: '0gwqe51r8i',
                name: 'x0rtd91c8n38epzc9r2y3vskdobkssfkl4bmaqq6sjwzojr1edtqombbsp1zetfgcq3mnm3nzje7laiwy7bcof3vvfsflcjz60nbkocoh889jmekndw4ru4326kql9mac05aj00qvto3d6an2y1luuopy9z7gvmcgnd53tk9dxfpovri6u0yzu4vp60dxes45kskogzxwkpm4ik1d0ifemly0vjqqnischhh4nkx265ikamu0axspzud2ce8b15',
                slug: null,
                latitude: 96353579131015120,
                longitude: 29781250791004136,
                zoom: 23,
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
                countryId: '36c08c70-7ba6-4765-83f5-c34dd15109a8',
                code: '9q1988bu',
                customCode: 'xx0e8kecf0',
                name: 'i2co5nnp8mba5uhpsn4dgqia5jn4vrgrqxp8su05gs280vxdy9yxexf89kfufxd2d51nfjn5wf2eniaol0veeouy88mgo5gvqorqhvpsncsc99btm47ofierm9gg9bv5rmuz4501fzwpd2if62f89ohk9vcus4ao4oqaojjfsp71s9j7kccntut6grcjv9h6meigebs14lisfq6y798weakq1mv1rlboc1qsc330otcl5kaphj2tshs4g1d6dom',
                slug: 'lwcaldsmqg4i520ijctwqgprwg6zofvk8vgqfxea0d4cqdgbud37lgsz14lzg2938q7oixkmzmh2r8s3drb4sm11ubm71a4d8ah4md4nawtyopxxm7k8wfnrpx44wr1fdw73izqwb0juctikx2r8qw7y0dkk3rxdjrkgkomfexqlw8phemnt31vv2lirwgi28410byvav6w66zqmonurf8pjzkbwi3q80skomef0ucsozvsjsb2ajq331951ex5',
                latitude: 65745696497879896,
                longitude: 88582301858534350,
                zoom: 52,
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
                id: '65f6bc0e-cdb3-484d-90f8-d7f09a1ae98e',
                code: '3xy2s5qw',
                customCode: 'f0tw7pixgn',
                name: 'yikv4wdw5pym9eewang2op345u5fyf61wgcuyg7sd50gxshmz9sti3evxf70k4rgtbv8bi5v76lzhcma7rw2ba0sdbfrzrxmdb9yel9b5m2lpd9fjq71ecfrxtjd22h3pj8dn5ivj4700g3cqbdfsgef2zc4ro2jimc5l6616m9omoyw9edmtkadmy7ac8iduz975sd5vaxklw9raz3dnkrlrlcioeyy9sthzq537kx8j5p1tohbr9p1xxe9l6n',
                slug: 'hmwkcqks0mku1eijdg1oipw8ajmgoo11ta8a3i70c196xbqycgncronx3yhqdjo9zt03xk4pqfzvq6qlcu42ih2owxvq9gzuir6164jumy2pru25uaxefgakzyzblo3gbofl0daom1e2tdh73ozd19l2sawhpfd5v2r7v1xfm7txol4bjys877dwdb57aty86pib9nhwwz4gv1v9cibg3f202dvhl6kcw9fxrxn4nvk8ag4gvw6owr5sfld2mxw',
                latitude: 41757236553954430,
                longitude: 44757987615049440,
                zoom: 79,
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
                id: 'a01a997b-a7c8-467d-849f-5fbd6db025a7',
                countryId: '1abc102e-b82d-478a-b1e1-e06a208c72e3',
                customCode: 'efmyeosq9o',
                name: 'tbpvu5p6jzg9vpp7qncbveohmtmmeyuinwxdlwoovup36hw4sl74a3cvpvfm36a0nvj9u26l792lo5v7rrh6vcwpbwoffg4slh1lrp8g2inl29wsi9u62yoj0s3urxi56i1uncbca2pig52inkwxukfrkrx84sb71mbmw3qut8cv1truf88hk34j175rwk755v89091x7fut7cg48yte9cvsbnd8juojpot49wpquu8n4fcrng13vzgofhpt1ow',
                slug: 'iwvzd0k57ixh2a4b6f34pu8c1n68ox01y2e5axd2lw2sai5yncke4x6k7i822nxpz5rdpmx1si9iup7x1vhtok917g5n95yqjqz9w005scruvhsb6mlzxsk4yexxx91weifnvugfwbcximtvejqfuao6ppvc483onhvckjkph4pcdr6fn7298zk827l9mkj8iwe5fwzh5j8zkhlyyzg85jg9e6qh76zy1ui01jfhvutacvz2vhgd2kc69nbsyqw',
                latitude: 54355678087260750,
                longitude: 65234141815934950,
                zoom: 65,
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
                id: 'a17d348a-bf00-42cd-802a-1b9a5ebc2866',
                countryId: '993299a7-6e0f-4c18-a920-71047d2f552f',
                code: 'yqbjinv9',
                customCode: 'g1vdztxq31',
                slug: 'mvgzyhrbwkbiwtwyc08uvughne0untgxkdxvmgxrbjtiugbfdcaararx35on3grkrw989ooqte8m8kkncppgs0txjso7tkmk3rka3onaswj2x31879hsj06p7bp2xtm51j2rjgtulj48a5bgn4cwpe26q07tmkfouyquukeqpy4gtt3ctf0poc4hpcouqzw75m86hqo4jggkh2pjdmks95btlhvrfbbrt3w0uyvsb9vz4cxit3xzbv1uabhgq1d',
                latitude: 83023996642103580,
                longitude: 52281186013178660,
                zoom: 31,
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
                id: '7e75e9ef-a7dd-4634-af8a-3dfb97e8d6b5',
                countryId: '5a669a74-09d5-4c53-8dbf-ec6ef5f3698a',
                code: 'jybbkzi4',
                customCode: 'ao507kmhay',
                name: 'f3oiv76wlfhvmqsaud1iox8bpavcplum2mzsny6bhymnac7d8dya7n9q3j9y2mg79t3jg8h0eotyn1wscn56460b40cpm46wri2op6o3yo2yx43znl8lppbcovuvnn8ta3g749vitl5ne02r815sow1ajf5ujyr1bmedxc84t205fistdyb26jt5yhnpkmjh1ax4gsr8ha1nmdf1k56dsj7kykre4xn7d6hg693nqv3vwr3qrlef51v0iucswbv',
                latitude: 44628392918052510,
                longitude: 57888630107532264,
                zoom: 81,
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
                id: 'wxu79hvmwhda2ldc61jsam5vhi6tp4tlslluc',
                countryId: 'a75d0005-1a1a-44c0-9741-f107c80219e0',
                code: '11fdfgds',
                customCode: '755x68jcje',
                name: 'r64qnaqek1w30xmtr75vg733xi1x4hhb67dlkifxgixnkjjcadrqgks1r3f549ospr69saz9gd9yryftljjgwla82wsnpv7yrg5al4wmb34qglejkxfa8xismbr1qywvtqskezgzwxn4xsipjfsm4a4khq8qb97t6s1jtoy06u9l2kkj1d4sp2gk1yz24vctk4j9m7381p84zi8tap35hc123aki7qri7dzb2md0xow0fjvu1r4tbydkjlheu8a',
                slug: 'w5qwjzg3g8982t8shtxr69swbp1h7t1pqa5ajlejx5mbi9pl62s9yuhq8v8mp0ir7gdcwscqfgpfcn0czqy0dh9ydgzcy36y75utork7rdbjazap7txn0mqzodex9gnp5yfvf1hv3qxuas43qyowde1cl9n9csqto60n68p11kdlunopjq7mquj6zqc0yubol4tsonhmuiqs1rgqql2zxycj7ldlioj0tzebq1y6exrzk3rf3e2s5xgv9lndcfh',
                latitude: 16240742214033764,
                longitude: 93933360331740160,
                zoom: 48,
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
                id: 'b5a50c84-fd86-453a-8a2e-1494ee6faf3d',
                countryId: '2k9k303tsh2wnhbzha7eyxnwvwvs8o611jgjd',
                code: '8v0w3sez',
                customCode: 'k25de6v1gu',
                name: '0vsbw71eiaqddr25nj11aap3msc60wwqtkh3kqyndy0dzza9dexqfzk3y3b28rpxxx59xdw2fpmkhyyragnh4u2bvvnqrfufxe6del5vl81bseas2qp0kiqf9xhefi3e5foh4zzk4n7ldhgiphkpt00wy1wq4zighc6eln29owxkc4fgj18m8h3o8is4vthxnadcluok6fro3wzngzuxinvz5hx1l4xgjv7dqo3n6zefkmlql4vreyijt67w53x',
                slug: '5ft86rbuxuhdjhpsir6rlwf6xq57767ptfh14lqh3e283q8joode7fahp7yyc6f8b8ahrpdii9hdhanuszdgb20rnz255663scsvkybeiqi0s5ypt5twt8fh5hpqe7hh78voe9j5fi5bfv3rlb3e2ppi9o6j0cuzxefmiurwgu6kx1xxh21goj2uybx3yp6xtr9nxlrycu334b6i7pvdggghc9evwbhyve17iqbb7e3fbsqda1hcdepneh016xg',
                latitude: 48179066649815784,
                longitude: 82117871298162670,
                zoom: 69,
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
                id: '1091a96b-183b-4e64-84f9-668eafcd2fbf',
                countryId: 'ba1a20fa-d150-4510-b50c-7e61ceb7512a',
                code: 'un3rmivgz',
                customCode: 'zz7r2ftq5z',
                name: 'sxj387jnnlqm79v182kta8eaoev9ezqiqcwwxk6ici7x2dj480fitl48o66hw51ztpdlea80qu5vlymygjt81wuc204yufu2bkyspmki7atoxjvwutdwgieqa3d8id65yjc9df28dd07wqrio1qhqvb2uccu3gmx9imiyoglo8a9eonx68k0jqmmky1ljv9yainngzsp3f2kmwyw7i9xqbwxtfgle2tbon953kfgpozgd8ebojoo04kdeq5etc0',
                slug: 'yb91z81zf59wi6xdt63azxehe2yqc4mr59mh7cy34j1konx1mjykz8zver6esck74gk42by4dwlpgtbmhp91it2boynaslbkrrjhu598pdl86knkw9licdsc6e1fshlq7eyreaag486maieefmlt7uuxs9ua3xjlhucfs88ydx62rhibjb5cok5k3w9l97d01lsw2jsevbs1q7a6xsicoaj2x0571etmg2t2tryypza5nzz07yme7xz88q62bxd',
                latitude: 10885766329807794,
                longitude: 55410272531218620,
                zoom: 80,
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
                id: '8b70a12c-a93c-4f6e-a776-c8e920da67e9',
                countryId: 'acf2f576-79f5-4624-85fa-f36c7708adeb',
                code: '8k7hfr4h',
                customCode: '3l6qwfc1lws',
                name: '1j7y0lrva4at5elxkpbnncpvh2vh76wb89td5iv6ckqgwr47asrtzq75z3kvnv7e16a34ia6w31k7guzatbmdx2gl3c0aazymuk5bo9ukyz8qc0bacgur8qtpackm7jojhhfpf00psgah6x4btbrilutuooqbpd9ybvlvobkawrs0uv4ihr7w2od0qfop4hs6z0snhw3wpop8hc7mfyny203axwxpd4r2hcp95g3q2ag8l43e4gpiia2fabapv4',
                slug: '6t4tr3tlp1x924dpylihjxe5uttcdtg5828y0u9fy5rmzg0w9ip2rqfwwici1h766jcjwok42i86oy04bk07tcuxz7af7a9axsq7stss029cgwehvnen7qc8yek3xuqg0nsi7if5d492iz8kw1920gruzzo6ut1omv9udtz6zlb9s0etmihi33c9cdiyjsdj9u4qpk0nag7ahbq7wr3zuad9n0hofbpg4ew2avqjddoypws09fnjkov4d308o35',
                latitude: 70313309847161384,
                longitude: 90001224348362750,
                zoom: 37,
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
                id: 'e6e23e3f-9d81-4e77-b163-20632fa5dfa0',
                countryId: 'a50eabf7-1bbb-4af2-8910-ac0c4af4bd16',
                code: 'bvwr68x1',
                customCode: 'phgsm9h96p',
                name: 'fha53suuupi52p91n0rfs9n0yen384sw4wkydchofemjwa6lpfi4c1x7ciw9hpx40p3mx0lrq8pxhenvydu8q6j31nnc5gzwvhy1wum2jyt0envjqvuv73jvzvn1rv1e8m6c5o166ybzw4aok0mnad4yv03ia48y310eveh2adrrm7k0evv2urgwdgjgssujoofdli49roi1ai7pst2vx0h4mqon3lhnsa3dwke18hrx1zqithb11505bdluj3d9',
                slug: 'eeh1eeftoi3db3l66dg3s4iurrdyl6vkr1bae1lisnc7s6tucm76i2atpk5gbwje1nd8ril8iau2p0yldyx8qnuyew8wyogunyzsucdkafomnc98lzzw3gwk2m8b36a0jc0k2ob49m0zgm0tpkdjxkelzncnmkljy058ahnd7go2qvqyz1n3au5xdcurmp3pgqsgc1eu9lr2wy55v5fq0xsosvm3p4mvydgtqtq60pka0zl3rjcsbghc2laqlio',
                latitude: 13981252684504960,
                longitude: 94500438471693780,
                zoom: 72,
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
                id: '22bab0ad-0165-4bef-b3c6-9cc8fbb43f59',
                countryId: '6f056e7d-f484-4b39-af5b-e79c3ea41c12',
                code: 'unljsufr',
                customCode: 'hz113s05fv',
                name: 'h1eak8dk4cgkuy13g2xazw4s5317q69uc51a0wsycit8pwp93y6hsvq3iysolg4ul5ncx2uvonlhm57yr1ae9c0gn6wuyd2e0nctbxf34qwe3fceed76eaivqhzpryxkyyt81k31u7da71ui7tbc0iplydwe84xipw2am10duv5hul6uetdlni40fg8v1283lcu30bo7b6gackw9bnhmusf1ort4qk0tq9nikj09nudk1uno60nj4scl21ubl1e',
                slug: 'k0eg00tjuxiosdrjf6cktv466ewwelyvbr39wdcl9glrqqy6vvxh4k5423skx2nkgdkfmf1lf7pl0gey80gie8ckriw0s9d683hdx4n83aplstk8y32o9tcyyw8q126yn4m6wtdzdtktcb7g500v4l5ya314yxlvmtjaa1sxwzsrok4146824uoabw64kq2mngw58hxbipqvwhaymo0kf9lhd27tigesh5v8ws29sqz6sg4ne2ku16g3liag3wf6',
                latitude: 20039040205320190,
                longitude: 72574585674608420,
                zoom: 30,
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
                id: '21e41a8b-29df-42fd-b491-98bd8a35ecf5',
                countryId: '99e3a79d-4369-4a1c-8a69-158d1e5f07b8',
                code: '0i2pqwhq',
                customCode: 'hy7w2gbgxm',
                name: 'hgt91m6r0ahiv7m0op1cowtz28ipqx1ytg0iuoid665n4gk8mr0ctrwsj088sdv7mfyrpmfnlz495rzv41jbb68y9zd6u59pd0e626izngdr6hqz4ls0ut6djnnaa4vjwlwqahuk07iystv4a8bee5qlvb41n166ot6ytmlfgicwdujnxhrckwpcdefi7ozlrj19bevfl1xbi7ob37evvpyir0ieon9fub5fu40ns6m6d1t09bukcuf2pxlfu0c',
                slug: 'lwccq4rg0zeq35qpgat7ticwl9a9undm4ylwr1eq3qy7wj6vargsil8ctmxh0gp6ca83knnyf26pzqm5053cok8x9ty0drq7oizxsetpq5knlql8p5zjea20ezlylyogyaw39dyti7ycd5k5pston71bm2lx12c4gbfgdu7qqz6468hx1zb5wxt0d8dhb8a9kvy1tpj42x6aklxxj2z2s8jhrggjdw18vho3vzyk2v6tm4e45di85it53tx705f',
                latitude: 197457268017250560,
                longitude: 21449288215996296,
                zoom: 80,
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
                id: '53b441d4-a47c-44fa-88fa-7ddf93a8d136',
                countryId: 'db86b2a6-de38-4c99-b317-1aec69fd1b11',
                code: 'i8w49t7x',
                customCode: 'gfsy763f9w',
                name: 'lyhfesy2d9hsnocurpsfizaltynkg4iec60g31tn12dcq5tbsewa342blwiluy4ye88tdn2n0uv12krk3kl9t0gq546fbfv1fsma0kvlk9biv4lt07re5obcyc3pp408wcjpubrt5cdt333bwjaejxky1zbx4dcpwvzi1p4149ll1584md7cnw7bay6hkcmevurt0darslnywshhttjf7pqe9s6edp7auj4rdlhob30x1c8d0loezvs2p22ezrc',
                slug: 'ou19x7k3ojc00wnf54xrhlsvoxk032i8z8xmiofhm883oog2g4kuohtd8f80k4hzlr53pk3ps0bqolbv3z29wqi07vav7e7rt6fapidq8i74d2uh4ipirdm914vzazd5tk15oabrgnwr0u09ocgrwq458030unb18yfgt2sfmeyiba8x32awc9li13ro1blrgw40xtslhpr5u8m0f20b193q4d19qaoy1huoz7e5nw6kosq16t21lswr07x9xrv',
                latitude: 30168761415080836,
                longitude: 775400098473163000,
                zoom: 30,
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
                id: '16f90b3d-1b03-443f-8426-1ff5941443a4',
                countryId: 'cb0daa00-6e0c-4d92-9938-e9df85ec5adb',
                code: 'j9ee464u',
                customCode: 'tlnc905iv7',
                name: 'pykmfj59qp3n7ub6dyiiwvm268s6tbmbyeve137k5z5b1mh2noczetrtqsh84e7k119qh8h3g6g34tzdfoncouut79yidp3dmgm66qxj0eivytd99nbkkcasrwyows7oq4jnsx8up4r78qefdjqoniwndt05rvdri7d8fa5eoqezgkvsjmock4hmuy7vrhbvqsot0y3r267qafmol1cwlsn6235s18egvql9uziis22zmmylyozt2622ekl42a2',
                slug: 'd9wbr81wycnfiqj5onwian2bdkno6tbfxj03pxf3s8blbhpelbx0rmkbdabe8e6mt03sp46unatwqtq6lbay2t35jymy32vbs805wpu9fdpt1c1roivhhtkgar4ecgt39jdho0z72t6vgqktvkpiuofk6d8vls5k2jaqbkz25c1z6ned98kxln04cuh7ylh7oy9zvlrwxnan5av9uvshnkijaafp51a7r4cxqimjefhc93x0yi4y2oy825746nm',
                latitude: 71754776281049110,
                longitude: 40257482246054270,
                zoom: 560,
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
                id: '3e651899-c146-4dfc-ad6a-2ebcec73d33d',
                countryId: '51c15962-b4e1-4021-80c4-518810b3f693',
                code: 'cjl21ef9',
                customCode: '4h17u8th8z',
                name: 'qek8sp88z1co0ddl2me3y5vjnlvp903uf4l26ottgpglqq07jrc8x7a4y7sorwqh6hv2eo6srkvm03d2n51la0rqjisk9tr85z8tb02e1md9895bx0j3qyteux1mqejncp9bz0p0frya06vp3gqx8gdpyx4e0dvt7zqio8o39rw1q16jbjibhki0m4nkjgvtli6j5d49oo98maf2y98kae1pno7x598vd4gl2ozjpumii9ztqgjli3yvs3f8k62',
                slug: 'zaueyd9xl8j1h42r5qrhq9zy72cmo4sx1t6efpspmk0ar1iwef5m2cr60szlhkjyd8u2p93foqori0gx9afsg1qsd14p2h6lc2aj66aa5wyndzq3t2azk5qtmf8i6lmjjgxninvddzh9tf2vr9nlabsdh6qvwzsrkp0s9mkt3g1nmn3mreh13stcu36yb5hqgbr1f77f9lqmczi84ywbbkp357ni3xonkuzd9v8setnd2h4rnrtsqjsv29k2xyd',
                latitude: 71579597416880650,
                longitude: 27333530192130440,
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
                        id: '49533bf4-bd88-48ce-a0d6-0867a89516cf'
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
                latitude: 75885719421715520,
                longitude: 22998571571649830,
                zoom: 76,
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
            .get('/admin/administrative-area-level-1/b43795c6-56cd-47ef-a37e-e203e62862b7')
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
                latitude: 33910915640140332,
                longitude: 38479195454014696,
                zoom: 59,
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
                latitude: 74707137969540260,
                longitude: 48424031866954480,
                zoom: 58,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/2fa856b1-763f-4e96-9103-074b87908b24')
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
                        latitude: 17542070744190774,
                        longitude: 33770067518903016,
                        zoom: 39,
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
                            id: 'a8e30b73-632f-4014-a7de-513ffef5dfb0'
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
                    id: 'b36cc160-c9bf-4a12-8eef-a7621be6cad4'
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
                        latitude: 63139276240672120,
                        longitude: 94791581483256880,
                        zoom: 70,
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
                        latitude: 14622061037548500,
                        longitude: 70605596869595260,
                        zoom: 67,
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
                    id: '27d91d3b-5b5a-40f3-bf86-4cb822bf33c9'
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