import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.repository';
import { MockChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel-detail', () => 
{
    let app: INestApplication;
    let repository: MockChannelDetailRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IChannelDetailRepository)
            .useClass(MockChannelDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'bqtx6mbhf7op0j8xk5zt9zgqrhrymv9nf4df4bffi3q2asuyjq',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'lyn006m5o0r7cygtjtje',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:17:37',
                executionMonitoringStartAt: '2020-07-29 10:24:45',
                executionMonitoringEndAt: '2020-07-29 20:25:22',
                status: 'UNKNOWN',
                channelHash: 'nytkfxdis5zwpphtph21dt0ps3v7uov04u89ilyb',
                channelSapId: 'yc0ik4zlzoczbb6gw47iuo01c7gipnp7601rd1spo0vzlumpql',
                channelParty: '4g9xord1llzit184t89o8h20zab0cqb02bhqnm5kl57d25cbu5z2cfvuvu4fl1b8ywuinsu8fa1jfwyb6bvx1glqeybqvnexiudk7ybqpwgtd1ajxy58t2mpxbdi62a5q04nf384h4lnl8vpmy06a37xdxqkuzfs',
                channelComponent: '8neicl8kju0c4ifbi07safacwddaz6ptlbyi16z34jfhg1zs4psvm6mwxkddjysj45waplfb57x3wevvi6y6rb19djux7d97cio4y4l2a9hhz8zapke8lfkm58kdpulwffi2qweqhpzr975vjgv9ckoevffp5gyq',
                channelName: 'ivwqhdyku6kdr8rof3b5vm2u81yo5a2h7l53fr8lb42zj0b6z0gpuzgkhb91l3hiwp3odujw37z9trxvv2i64c6m48mk2r5eaawquux7vz20a0bn9sy9ay0k8pf49zsey73pgojaezjzir05p2ww6ysz372uwg06',
                detail: 'Ad molestias corporis aut nihil. Sequi facilis in molestiae corrupti. Vel dolores accusamus itaque fugit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'af1n0rxdi6ot0y2swyrpkjed1fstpnrdtfkwg0e9q7itt5i2h8',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'reqf5cvyyxemgzklhsfc',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:40:01',
                executionMonitoringStartAt: '2020-07-29 04:15:15',
                executionMonitoringEndAt: '2020-07-29 11:04:53',
                status: 'ERROR',
                channelHash: '9859abfl523gi7cxot2ocnu75d8qncfmhk5m19hh',
                channelSapId: '2d8yh2lrtb4s5vgvysqq5socvk065q31abnekjfy9pu5m0bu2q',
                channelParty: '5gthim1e27qsejudluplrw92sp6usxh7xfa61ph3gc703q5uejjvs78gbfmzcaqi26op4po0vbbfriv5nadpoatbyg21zs4r21i1y4skx0zn51lu9m7roohtmv0r2oqqfbjshsyylhjysirgz769ne2naoe7oivh',
                channelComponent: 'jumrp1nwljkep8idv00stvx0evcjaw3hqrql1b7pz2elawzaqq1tpjzvf3p2nznjpp1t1cilikcegho910icihxzm16tna5ryfpw6uvtg30dpn1y2cr2qgcret76hl0c9okejqh2tp3vsla46amzbtw5ge8cf2p4',
                channelName: 'ab9ifc4389ytofrkiejr8zy1kzodwp74ts4nwtp2ct0kq756faw8dbvgbvm3jgbvfacre9fpuq5hc9bp9hi6g8oh9k221bszvu99vvg5frao161venewfupt654urlzikkmubewlknknujarytbwmx9nc05qtzo7',
                detail: 'Est facere sunt itaque quo pariatur. Sint expedita eius doloribus officia similique sunt exercitationem cumque. Tempore sit et sed quia. Voluptas laboriosam sit corrupti omnis. Qui laudantium ducimus ex doloribus aliquid quis et expedita et. Excepturi quia atque cupiditate aut perspiciatis dolores id voluptatum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: null,
                tenantCode: 'o38w030n7pnhaz2389o2b9dbvvomh54vqj7bin0cdhsvu21iyj',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '52rber42pe93mc2a5sxs',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:03:14',
                executionMonitoringStartAt: '2020-07-30 02:08:05',
                executionMonitoringEndAt: '2020-07-29 21:37:25',
                status: 'ERROR',
                channelHash: '7x4z9zmjkdnbhkvx4elmt9zjg7gs1dqmnmj6e0gg',
                channelSapId: 'n7xizmxp37di8q7vv0j3c3r45hlhwig47bsxonv3h7sqjrurto',
                channelParty: '74y4u2h1yahwh1vzvjp8hqz63u6besjh1epc8jyie60ql1y0zf4ue71yo78m6g0f5esxwj4bmn6jetgx2dgaon2xqeyxlcsto8css5ojz6ej50yushi96oa6fseihpyka40eu01wu0ew2xzg1yurloim470teovw',
                channelComponent: '72n3ncu4awjnc0bwwx3eqnhu6d8n1b7q2hpneey3ep4j5sv51c9yg89g3rqwdzacwzazoiato7vp1e14eu6y5almyc6z8hloycdsig2sg5gnvm33culkhgoc33tl0dpetju8ru4hho7bqme5tff5tu2fny90gpyx',
                channelName: 'hw7e69mv5df7xir4lt7mrif39zar4lqq4e6f4xwt5582zrc1uwdzqaq2ws5pkshq08b2c7kyc68fcsdam2yts4uv0x4zfj2iytp7eso9qdtmh4zxmp8r01gi0owjdov4dwooacs04bzbphnfnp1xidju8acrhde7',
                detail: 'Vitae optio qui quia ipsa perspiciatis illum. Qui suscipit error. Laborum et voluptates distinctio ipsum et rerum. Molestiae optio saepe sint. Consequuntur consequuntur eveniet officiis culpa accusamus explicabo est.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                
                tenantCode: '78ny5y301blumkfkexfb8xxh1b1jmk4oezw1940tjeee12cgyi',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'fphmuvz5f8c11kg0qu8z',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:07:57',
                executionMonitoringStartAt: '2020-07-29 22:07:16',
                executionMonitoringEndAt: '2020-07-29 20:42:42',
                status: 'STOPPED',
                channelHash: 'p3c7d123rtlmn7ttsehbidxw985cbscben9gzc7b',
                channelSapId: 'scng71vukvagjbwkxozbu7szg1du2lu9u8rxki81fpzw5ib4k7',
                channelParty: 'a1cpacmx9fvwgeqegxnq84nkc7eknijw6i264ag1vxccn2u1uvxl53jpt3o5nkf3kvp9xm64em0gqhhb05tkr0slynynee82auzreehs4w4h6algd61sxe28rjyfsxodcbfot0mdugqq8y27421dyf5gcaw142ht',
                channelComponent: 'r4par9lbcfajey5tydnqm0va928c14fj5iyxhszzrsog7mf64923q20ztdksevdwa9meak371w25ddmbwn7etecoczj2y1wv26701ke4p7iv5mt7sejw7w82vj20e4s6k8y7qarm50qq3ga01osf9y31msd1ogtj',
                channelName: 'w8r814o3bmmz7srel3tdg6ya0w9qomyhsefr73w8qrqxrnnnw6qf3t46hvbkcee4u311fw88970em0h7uo7poiiw7y83dvx9h5cdwpy78uub9l08mgye9ae2i9gayp38uxmhf36dja4it2xx7f2jjvpdlpzocnvu',
                detail: 'Qui tenetur quod rem. Error et dolore odit ut accusamus eos ut facilis. Ad inventore velit consequatur delectus quis impedit laudantium accusamus. Illo velit aut. Quaerat beatae quas aliquam ea possimus voluptates dolor nihil ut. Expedita laborum accusantium nesciunt laudantium saepe accusamus eum maiores.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: null,
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '94e7jtd8crjea1ss5h5q',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:32:09',
                executionMonitoringStartAt: '2020-07-29 06:12:44',
                executionMonitoringEndAt: '2020-07-29 03:12:08',
                status: 'INACTIVE',
                channelHash: 'dxpymmyj4xjhb0s5s7xeg57yvhb8nifrtv7bk0wf',
                channelSapId: 'ni95l9rtr7gdy5cxj0b745jewh6jec6sk48cssgljs8qpxk9ot',
                channelParty: '897s8rw7upbko765lqfr0lok55i43s92qpaexngkm19te1bfr901a15ndmx3rbd4xxl4ym9q1feupnc3vadiektrccptk8rt5zpq5l2i7plef3ugeenjqbgt27dvqh7vcdc43b6oswqq7541iqn751umw9bdkwzs',
                channelComponent: 't16klcubn1pqgbv6dlrqibklmxy4zc4jm62gtz6jgoeaf1mqiebak0xv358atb73hf7gwu1a4thstclkn0zccld60ivuqedniyw8tx69pn9m30chpdgjxorocmzgmjop09qoysguraf5m2kbjx5ke44cru1evvux',
                channelName: 'o7jolmr7j6cvw62q5mkq9pv0u5y5toeznm0vcy7sp2wexrczm0jsz0gr2hca9uses61u9yrakb6twb1f8e2k37inu586hqqteryj9se9shyemhn5orxa5sn1wf8heydliwt6rplk9d4yklu7nkswl3hgit041mhw',
                detail: 'Quam reprehenderit molestias quae. Quia et omnis. Est est exercitationem laborum recusandae consequatur et harum. Repellat id et omnis. Accusantium enim saepe quia in quo repellendus eius modi. Dicta ut ipsam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'lk9usdjr89chtf8g59u0',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:39:15',
                executionMonitoringStartAt: '2020-07-29 11:53:42',
                executionMonitoringEndAt: '2020-07-29 02:35:09',
                status: 'UNKNOWN',
                channelHash: '98g3l0wy72as4weq2zhrakg4aetmadq4ytxvz7n1',
                channelSapId: 'v9q2knuc07wb370mv9z2spjckxbi8z01sks8t3gthbjhe2049b',
                channelParty: '7xp2i7nv84g5wo7qrs7oboxyeav6pikqz3mqvahybtk95upj6lulqbnib6gs5jwh0qw67hz503zo9hp9sfsafku9lfd6ef2dvuhrhkusr3lzjb0nkq5j1dh5f9afksef8fneywzhhzhbmimz19fxm6rd6reo707c',
                channelComponent: '96kxzwm68jfh0a7vmqbzlygh2faw4oldq12lplgf3k9og4y9xtv1guunz3k9x2i5bm3hvxoe0ueoj8rwcru2k0lbd99jzdmczo4z3prss3kftk0ackdwcxn5hua8ssbo49tqrg9gvtr1zsecfimw37j7oa0s5cre',
                channelName: 'mf0bud1oews3bjfm1oqomtn6xild7ck0ovnnp29ctkazwmcudjyjlnzzjwfksxy774fj9834wc2t3fejsw6w7h9y8v3y2rnd8bztfifpw69jij4ydgxae1f3z030dgidv96hotwzh1waf22ww8f4a4jm09ttyp6w',
                detail: 'Iste corporis ea. Rerum quo qui molestiae tenetur sed dolorem. Dicta ab velit debitis. Rerum expedita aut voluptatem sunt perspiciatis sed quia. Et sequi libero voluptates.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'm29mpy37lrpvii26sj3bwe7mad7puqsras32qu7t038pb1gsi3',
                systemId: null,
                systemName: '6i92s3fehxen7d58rwi9',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:44:29',
                executionMonitoringStartAt: '2020-07-29 22:13:03',
                executionMonitoringEndAt: '2020-07-29 15:51:17',
                status: 'UNREGISTERED',
                channelHash: 'pqkc1keuoik314zf84cjgcj7pz7c7nagkviy9fks',
                channelSapId: 'pmsn5q4nd0qd03cl48wd96tvbv40108h9pgk5a86gxlufmlqii',
                channelParty: '2cf0qegqlbmq5j8jd33zzvur6ldslbaj8b090m8emaae74n8ln0fdkapszzcaadspzmmltlwjqmh2q1tzv41cscuoxw46596gf9tdmzihjzcdmlc2ciki07wglh00c3jq2fofu0dt2e0iot63nv8f3mshcbnexmo',
                channelComponent: 'dbltnes347gtk780a8kppfb81nn2sxh13dpl26pnriaklquhc56ka4rxp0e8p5uzba0bp12l3kvoekoiz2onu232ppvnx5f83yflah5okrcq4wditbbr85447c3zjmhjygfzimdw9h99q6u28y2l27tz66nzs3cm',
                channelName: 'rwn1g4bp4wc2qyriea69n6fr6d81omj2zdqzqejvl0agjcnv1hy93g7zqxqv69whh69r7x37s9ip55wat6p8hz5hrdiuwdf9dttjlbix3dccudflxkqr2gdb2yi5ehpywcemmdl24n51ddqm0e1ae2ksiwu8lulk',
                detail: 'Ut dolorum excepturi earum. Expedita quia explicabo voluptatem quo sequi at molestias. Recusandae eos reprehenderit perspiciatis nemo dolore. At exercitationem similique soluta. Sed et quia facilis et et quae similique qui. Aut omnis magnam dolor incidunt dicta aut dolor et odit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'xgrp101kjcnz9sx694xpxe8y7s3fuig3fwogh2apd5dv4qa522',
                
                systemName: 'ow9jb9lp9po8ass9dxe6',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:38:18',
                executionMonitoringStartAt: '2020-07-29 18:35:36',
                executionMonitoringEndAt: '2020-07-29 08:54:16',
                status: 'STOPPED',
                channelHash: 'qhmp7scvtdc64m0a4vm592bk1bjtt5b4yw6or1px',
                channelSapId: 'nsfj3rffyyp4oo97bglcl873suroz73a0pdux6amoqkbnsum04',
                channelParty: 'iv8j520unv11aqysndk93csia8ds7d8188695wi7bttepf5vn1fnlk2g92ij4xccvx4lr0ltc5n58z96hpk0otb5hia1oi6r4fdbftua8p2bxc8565qxvpaa5aajg0evqbb3464ezmquikumv3qfv08zxsjk6vzk',
                channelComponent: '2fdufsp3a6n2tw49urhstlcf1z2twhi6upvubg065osbf7ue2aquahckgugt24y82g81k1ogl9equbfu74rl59uv67ymckgthdepml7g7lwgt2pyhfsbjvpkdma6h6tvzh1mq6e046b4ock71gs27eyhe0bw9pxs',
                channelName: 'p0nlek17zgknv5ccme4srpwu1vyvfs4dv0j905y34nvuwcctwxob88oepe9ch1jt83s6u08cjqfl39vgmwphmotp9tdnm663gi7vp8itntm0d3n5rskxrneyg5fmk57thvj4fjwr1agirpl9uut0gvohucasg44c',
                detail: 'Dolor vel ipsam quaerat. Sit sit ratione ex voluptatem laboriosam distinctio sunt. Autem voluptatem voluptatem quam optio laborum. Eligendi delectus delectus sed et dignissimos cupiditate ea.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'olk6dnmwxsueji31b3i0opuly8d2o1b8r5r25hql8cas7u6fbd',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: null,
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:10:48',
                executionMonitoringStartAt: '2020-07-29 21:30:24',
                executionMonitoringEndAt: '2020-07-29 04:11:01',
                status: 'INACTIVE',
                channelHash: '66w7cal9agkfsn8tqtq9lnwo3jdbkaojqatq1ayj',
                channelSapId: '8dkumqzjengm00jnox01l5fnzi1s4mp4ve7gw4vech9dybbssb',
                channelParty: 'qzkfo8pau9eq7f54nb8q6qwm8fkp2uqv4eertke052cg3ixaw8m1h29nv5jg4lg7u96jf48tegmbh4qbdjljojzvwm565gau6nxqor8wu203u4x83b2mge596pqzaf3qwx5bcs5tjtumzuvgaah1hjdurp657urf',
                channelComponent: 'cjpr9ooat2kx5nvc96m3sowtx5xpo8yfc9isz5x1fj1u82dgq5ms46n1o5ods4ykc3icd8fwk24octodv03mvfiibbfixt8pulszkij7pm0ghorxil8shl261qwe9r7cwtnnj2ygd28ayoxc08u8wkbt6a8jt5bh',
                channelName: 'm13rlt5vt08ol1lj5t2rcrkaqpdfdwtzz6w6tirwx0bdyfmdth6t1upmqjin5wjzp0m94g8lxrt97of5fpdu89dn144oe385awvo17kmh36uyk6wdsy41yo9ff50v83ph7lxk0hmc9ohgyqutemug4u95d82dasr',
                detail: 'Asperiores quasi ipsa et necessitatibus. Similique ab neque qui magni provident ratione omnis. Cupiditate porro nobis maxime animi sit nihil optio. Voluptas esse cupiditate occaecati ut. Libero voluptas quia magni corporis est.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'e42lulaimz7po41tx2mu21naohec1al3keihh9ziro50pqywg6',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:16:39',
                executionMonitoringStartAt: '2020-07-29 12:45:00',
                executionMonitoringEndAt: '2020-07-29 20:45:29',
                status: 'ERROR',
                channelHash: 'lqu7wtd1487mz9xzt6wu44ozb6yweau9afs85506',
                channelSapId: 'tcgajviyad2nupr2983hiofutdt2z2g6cj504xw4oivqkpdtq3',
                channelParty: '6slwctplud8bpli6egtsk0eii5togfkfau6owkuqhf0alxfp8f4pilwjxo9ppn6zcd99a4ftop1c9addx7zkbnrq9kexhuc9vryi4uq4jye3knj2pxmqcid34dlaqxnkm0v90wzcrf0a7v8m4xp5u4988vl2rsnq',
                channelComponent: 'q1m2qafupdduduysgl6yh91sg886n33zbix7hj8e8tdhq2rk7kpqdfnbbaytr6kp633xhfukvy6k92ewpxlg5fjvbra7aw6rhl2tnrgycfoot4yf9cy18296pe7xmdrz5cxona1ans5dk0yvrwi12g8srvohivf7',
                channelName: 'p8kv756ekryimxie7sbsoaq2c03p3ykvh4wwdkk289ht2jyhwfcxcm62f6ha1o9v5h7m9wc6xvo4t59w05jxixx3fkja693y6lj124wade8eccv0qqkguob0cvk0tr0clmzjqbbdhi9qfzvd9j4ei1ahqfopa9yp',
                detail: 'Ipsum labore autem vel quia. At quo velit. Aut atque illo unde nobis est placeat cupiditate voluptatum. Enim autem officiis aut repellendus quia consequatur saepe beatae. Corrupti quis sapiente minima accusantium labore animi incidunt et unde.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'g0g83rxe8gfhdm0irnoropgivi0zi4dhzlyh1m4aldrsowj0yu',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'myn9s3scy4axsyan9ct0',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:22:56',
                executionMonitoringStartAt: '2020-07-30 00:27:28',
                executionMonitoringEndAt: '2020-07-29 08:37:30',
                status: 'UNKNOWN',
                channelHash: 'nyp1f4hd7mj9yr6el44r7ue63b6eols9j3yics09',
                channelSapId: 'tbynxvkwi49askvhfctsdv415dzv04b7yewujeprvenh9ijzmh',
                channelParty: 'd4ly1bsn5aod1vf0ld7yl8f7gdlh8uvgn7fm6hnef77mwcwumlp4uc4yf2f74ixfdxkdvl61q8u34btx5kmu22f12mkbz8ahrc50ie9fwx3k8mmz2f20y2e7yi99pyk8e31nnjel9gx0eqlbluvbim3l8pvlp4tb',
                channelComponent: 'tdyfmbgtacj067u7n6ovo0uhjpz5f20d32125jbkf8tz0f3zekjfzano74va2dthf74flo7wchta2s98vthz9bbs7uofm6vlwi05j5fd5u9rgc1u9ok6h4ofid90kl2175it2s6gfk8elk33jjwuwlwxoo6acgin',
                channelName: 'wich07d2f56t9sn3b9pa7uqr4ao3zsm3leectkogndq60w9uq7b8owapphkxrml2soiy3z2rfa2cd1blitfk55kn3hvlizasfun956mkvnb1l8jfhvd79iqnsdqh2i51v2jbe49v8cwhdctmp0qyvx3r10jnm8vs',
                detail: 'Quia maiores et sed voluptatibus error. Perferendis voluptatem quibusdam ullam voluptas. Qui libero deleniti nam est adipisci dicta incidunt sed. Neque ipsum id voluptatem praesentium dolor earum molestias.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'ccu410iyam5fjcbo7lei0vujevkh1d8dqzjkco6vmh53olstlq',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'ekxvzkbpnp7gu79lw6ih',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:50:20',
                executionMonitoringStartAt: '2020-07-30 00:35:52',
                executionMonitoringEndAt: '2020-07-29 18:40:49',
                status: 'STOPPED',
                channelHash: '91cybxg7duy3z4ule1vprj9yy56hk7z87ekcwnbs',
                channelSapId: 'pt3n8uzi9j8wzp6jve3fp16azjww8dkrsczkk3oy8ewt7fu1i6',
                channelParty: 'kp3ehckkkf0gq52ofbwxcyoy11q335kfc5p141au912qh63j4mt93sok87kvj3zjt2ke60b5ghjy9lytxujnnjum37zub420xvfrij0s9g5tiz4vuyjbng0vesvoqh1quiw48xlglly8igsp60sg9xyo0pvn3r1n',
                channelComponent: 'gv5y14xn58df1ta6p47r1hzq5c9xkmb4bsw4eey8tojx52mnr1y271ans58g82a0qa037jpbnjezi1g0ps7duaq56iya47d81goqyytsq5zsrok1itjj5ph2ul23b5i68eht0ufok1qyi9iki3z3x44r776rp1uk',
                channelName: '8wlkh5fpfqzkcb1m49lweywvu52klsbnhcpzmzsaogkn08bevppzbz0r3qccldaoyumd2pjcw9uqkveyaqmq8icupqz4smj3g6wqmyg7wex0djlml8pf7ctviel93lc5t29y5n3khs3im49khkop5nkdmaa8xnbw',
                detail: 'Enim laboriosam consectetur nihil adipisci. Occaecati ducimus et et qui maxime nulla occaecati voluptate. Consequatur consequatur exercitationem minus iste commodi et molestias enim minus. Sunt asperiores nemo maiores assumenda. Pariatur autem ut quas quis ea qui nobis qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'odj08g8jhhg0zjbiy8n04fv8h3ij3095806nz2gb7lg9el63do',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'acds79uxg7mixpom87zc',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: null,
                executionExecutedAt: '2020-07-29 12:09:52',
                executionMonitoringStartAt: '2020-07-29 09:45:47',
                executionMonitoringEndAt: '2020-07-30 01:58:33',
                status: 'SUCCESSFUL',
                channelHash: 'pyy3ycolzb7zby3bzwfdb5b4li8mmieguoyh3m4p',
                channelSapId: 'y90byd7lz8spnrraasecnmhh9isnfgy9redmkojunrjuxt37f0',
                channelParty: 'nvvhy1tcqpf8khwz8xvvxafttfd0nbdea2x5qad0nijapxtpi4zb8repoxu5wms3a7vsdya5qqger98aorj8paydjdnzca1dsbggm338746nurn076w9l9rpd2djbp4klxcmmyrd4sfiutkosb2ucc29vi123a17',
                channelComponent: 'dlyk0uswur3d2yglwv1e3zy5oxd2hk3zgya00z28chlpx5yulqymnvb85o6glqxyati0uf4ai9ta0obamy2jnh8fmgiw3323vxakam2fnqird6uslb0opvoiowrvvbp4xgr1j7njvte22r55klk0uihqo8ux2jzr',
                channelName: 'p6b44djximfuguxda2kpj27d07ai03xnjvvn5bqf1b75avrix0ujtruose22auz38d6q3vgp56tf0kkwe2rdirgdfz59hmkn1tcvlzaw96g6eff8k5qlay6j70fzjw6mty8sjchot1bsvutlpub2un410dzx9v0r',
                detail: 'Ut sit praesentium est aperiam repudiandae reiciendis amet. Nulla error occaecati. Eum reiciendis exercitationem qui quasi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '78th2i5pn8dmqy7296c9fxk20su0sd2w0i1ptyj3lfm9903zcm',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'yl9c6unts0fy080wqnzh',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                
                executionExecutedAt: '2020-07-29 22:16:04',
                executionMonitoringStartAt: '2020-07-29 03:29:59',
                executionMonitoringEndAt: '2020-07-29 04:15:50',
                status: 'STOPPED',
                channelHash: 'c1aes1giygvc9kjfm2ufiafw22aw1duy85yt06o5',
                channelSapId: 't1yt1yh16bcxwco8b7jr9y2uhnuyr7q880xgoe7xhznctud2as',
                channelParty: '6c07y6ou7sema07mm7xvh4bc69sr6dvevluo58ggjnl2n3ybyot3eollyd50xiixe7on41veh1i8hwjr4ljxxwjmp1ob1kllwf91a5vvreyu6dp1kdypa5zis5whwcu5ekj24vlxz9id07hcg5bhjqmg3piutbqd',
                channelComponent: 'rddj125mbt0cgp8uwi0x91ktzmn0v435fveller5fribnnkinl8w09vexap7ljtxtamcx4m25v2saafris1913axpxc5tid4pnx6ozu8f5urbmyuhhgrxzqjnabged8gwyfs3g8jvatjcpmhse0jkxu7snofs9o4',
                channelName: 'aoiay0w71mzdtneie99k3i5cenw8h6n5mgf8rhiwthguwimf71shy87ucvzo7oqvme3tf029he6v2hdc4mr0hc96s7tfvg3xzrur8p6i2zqwf74uylxuh62omt8xwbsz05wmi8jr5zpa2yx2wi0hcr9tgxriurkt',
                detail: 'Et rem ducimus et consequuntur. Eligendi porro omnis aut est voluptatem consectetur molestiae tenetur. Totam quia enim qui cum dolore voluptatum vero. Repudiandae quidem dolorem aut quos et. Qui vero ut facere.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'amkozezjpzr2vszi88w02ahm5zodva0762l1a86kihj5hspd0m',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'ybakm1jwxejqfrqcimc0',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 12:18:55',
                executionMonitoringEndAt: '2020-07-29 05:10:27',
                status: 'ERROR',
                channelHash: 's7iqd9yq4tro4nlicv68vfr9j9r4x6zzmq07jeny',
                channelSapId: 'bu0rwmc4mmsn8d4ie53l1cfqj3pt2bpuyq9jkaju2cdwx712uq',
                channelParty: 'wwwdfn5lghmkxibley3ixgm3c83oeg7nax14h1z4vjp17jzau2inv7p5pmv4pbnephrkpnfbtikhyagcxbusdrf8lkm535t6wqkwn4mzlnha7d3tbgkmyf3805t6mcgx31nrspqfrmo5f4mgxwjuq8z6234cjf5m',
                channelComponent: '8i7dmfbhcy65d8zwh5mis2xiq4wo1cz59tzc4bxkjshrn6gqbh5paxm228h7zi9kqv92lg93l540k89n6ojhwwul0z7823yvu1l9pmvozgu7hyflgeu72mkthnx12awwacibyr5cay8llqx4c14oqms5bd6b4efi',
                channelName: 'dkjh1ld3y9e12oyuezyd5qwswrx449w78hl6kjhnh9b3cl7jjwx2eb2k1wlq3eumt0hcfn0wiopu2tvz4oxotd3pcs7jeq6l1p7clydk1uvzj9ya6ylo6fvmowomv24b14fgklzan57vux9g1id9wmy9gfz0zguc',
                detail: 'Et quod pariatur dolorum excepturi perspiciatis deserunt reprehenderit id porro. Neque voluptatem placeat corrupti eos alias corporis. Iusto consequatur sequi atque ducimus tenetur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'r5s4qglxheyfqweodt1o5i4gfrjp7z3txs0zuuoeud6cm81gp0',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'tttxxeosah4lt2udg4ko',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 19:11:34',
                executionMonitoringEndAt: '2020-07-29 22:53:10',
                status: 'SUCCESSFUL',
                channelHash: 'wu7atrcb02xvpsxstff2gtovq632qzwjjmu57h5l',
                channelSapId: '5bdcfj7hy5ys6w7ygjij0zezm07zmom5pw9gbzz5egw02ravqc',
                channelParty: '6vhsbu8fctkuh5pfy3cu95l414wlg123nblz2g7fsc9hjq98m0kbzo6v5utfode08yhn7edi54mjsifqy7kv2vp7d87d5bbs64ixgi7wl8ldz3p3nttbjptx881dkh478krbdwsre96y4zzacx0bib0ljdnf038q',
                channelComponent: '0gyercyy3qaj3einbkfkin8o5e2hj1rfyqdxqijhoa8xoymdy995lchmnxxwc82wxv4kttem09q402qnz6ph256km2ry0q239zm7kcttsqsvzsbfhamof69mobiblnk0w70s81cp1nebfzl1oup9hetfp2411i5b',
                channelName: 'v66t2voi9qtp77egotpvk00xtyyczg7kou0h1a23t9qhopdogqyw2mdwoo5ompnzu6ptges4qnpxa7ehdzppreu6tfrfbusweorinmlst5vzvbx1cxb7xmuesq1o44ghrruw25on1eg5xsorxgj8mo7c8z32vhm0',
                detail: 'Nesciunt voluptas aut sed sed. Voluptas rerum porro dolore aut qui doloremque soluta. Et libero illum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'cjvvnjs2knsuv2tkyi0x19y1fs1hozydy56dibdswy2vhcgg0c',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'tcrqovbma7m697m65hxw',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:47:15',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 16:14:42',
                status: 'INACTIVE',
                channelHash: 'hmyib3r4f04dhbfrfs5y5llokqv0jpy9fnjjf9cz',
                channelSapId: '2657n29ij0trbj6zonn3wbv38ycuj1j8699ge69xl4sa5uyc4c',
                channelParty: 'q5kjtkdeey8qw2gcbguqzy4fvldxo4hzh89838fkehqoeko8ivi1sswd8hwg1a5aas0x0fg6xx1mj4v850vlqhkbdm64kadmk9ux5uoi5k563ch63hhlsgnlba46jfm1qphownmittyqw4ic5bs1zd9y9cqw7jck',
                channelComponent: '0p2dlfxtjzbrwec3itf7qo59sk4ca98allenjqw9ciqhjz75m5obuylpk0xtfqt4a05577zr80hjdfknp7dj4xoggprnm5rzh39tbsm8y78chosle8fid7h58sdz38j1m6jj59xx61zbhedy1kj38wci76s0b16j',
                channelName: 'kygvtwk2so0ek0gmr3mcnoc14kt9vo167gyk8rnzk1lkogntgj4hamjwhhwny1g6w5r5rm87xe8mjc7ditdyzecr9smxn0186054b5cpw1rxtr5uizsgeaqncmxwt1flbm4gh1uwdy4owjcnu16ua98il3akpbdv',
                detail: 'Et exercitationem repellendus veniam fugit doloribus. Et sit harum nihil. Hic voluptas repellat nesciunt consectetur. Rerum non voluptatum ab harum aut dolore. Corporis non reiciendis non porro officiis. Nulla amet laboriosam sunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '58yf63qln6sgdr6e3eqm6fea13ekjplrhhhbgery3yoe7l819g',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '3dnpj2ix9qke6f6cvs8k',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:40:36',
                
                executionMonitoringEndAt: '2020-07-29 23:39:01',
                status: 'STOPPED',
                channelHash: 'mv71ie47tg92hww73jnly2ehz2qbmrw34zv7faoj',
                channelSapId: '8ulnw3zigsr7y47qo7spsn6bse7bm7xh11ayjl6hzew8dw6n9f',
                channelParty: '6wrjtstaszr82okfc35sedlnbagnzaf6drs333hwij20yqlm7vvomuox2jx27r02b3hmw5n376r37bp35ou351dis9k7vpi225p7lnf2izerrfp00y7zr4ur5dcy1gqhgdw3xtkracsbrkr07c8qcuirmuq7y91k',
                channelComponent: 'fbto74xbp3w1hk4f5opyvpk6pr93t7zcqr828k44ph533rp3rg50nras6t00a4ywytjbipo3w251tan4kn0kw654hranvr8te2v18i8am7jphcgs917q4q9o3u3szfd39hlw4y9z13bri58lgbknx46cskdtzews',
                channelName: 'yxnvvvza2prifkzmj0xv62cr45qhen2rrj5yxj07vv7qya1m9n86y59yq41y42jxowxlueci2npobtn0kilcbwsszc0xg22pcfui2mzhzy7pvsos60w3pifibcxu37tenfhdknz2wkuct96c5d9zvdq2gfle4xcy',
                detail: 'Recusandae voluptatem vel maxime nisi quis fugit. Eius officiis eligendi modi quis ad perspiciatis aliquid officia. Impedit explicabo ea eaque cum cum qui ipsa quia. Magnam aut illo. Natus quo placeat. Minima sint excepturi est quos.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '97e3nk07hhsbyiafyt4ugsp07xyb7bvc3upctev2vv43gy816m',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'zmglokju98w4qz63xbv2',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:20:27',
                executionMonitoringStartAt: '2020-07-29 14:51:31',
                executionMonitoringEndAt: null,
                status: 'UNKNOWN',
                channelHash: '70n62ox0a732rqym9n3a1vtji3wbontkysl0xq54',
                channelSapId: 'ei2kn11w5it8yfhu7ek1gvhymkc6crgz0wuy1ytzlcwzci62x4',
                channelParty: 'd01edrowaqo5znxfsvwsd46e986rb4uugctd56zoe7w4h0cogihieiid1pwfyzexm4licl402i53hgk80uotst3k8yv9cwvx86qoajhdpsmp13kzuxull652mz7xyrfnranwbp91is5fg884ztppiudri21lr6lo',
                channelComponent: 'zygg3rtrgar8jie3t2wlbp78ddjdt8vbn6qhld50lx8ptbdmmnzv845j908h90iuf6lu1o2u4vvdvj3zwxcwp2v1thlvbc7wps6bn4bgdg8gakaoi2h3mxdxv5cps57923pc9aes83wy7thbebe9pkduhpz3ytk5',
                channelName: 'gxzfb08k84hwk5mco8n75nk0yz106m5yy09ubf8ai8svzszvcj6q51zg1tcgwtvfs8w8ly82v91o7b3a30o7x2i88jwh7jqt0n8hbgyymtzme43c5hjeli9ra0n594hdteptie27tfi2jk5x6t5hr6su1736d1e9',
                detail: 'Aut a quibusdam at laborum. A at voluptate veniam est ducimus perferendis. Voluptatem corrupti natus. Iure laudantium laboriosam inventore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '85mhartiia976m52e3xf62fj1whpibyyzj93c8ul9ojt45ps01',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'xycbkm7w9nu0bd4opz1j',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:06:04',
                executionMonitoringStartAt: '2020-07-29 19:40:04',
                
                status: 'SUCCESSFUL',
                channelHash: 'nx15yxetp87255gnukbe3jb381pfsbhzxu7rysux',
                channelSapId: '0uv1lzpicp8zbinnd8ibuul21021cro87rtkewjg97737skaja',
                channelParty: '379vgkasapmxfcbhjylmdorhrsrilgrheklqni19e3ecyyv5sojn90f2r40x6w790pordsai61tryqmi3gnlzn17obzq8eg8xe9vm0bljlgeo4l755sjqomu02mh52pcvzh0ldibkhf3sl2sc9lmiby42q7tkix7',
                channelComponent: 'rqjqe1h2yc9te05jysort576m4sj9c8ghewox8ynzx9imamq8aqblr589el9q7fpts7c03z38r8qu0hsdz66glmxg8lg7lu5z0yh3ofx9jdjpycqfa15el163wvdwurh003d1mmg9q387614ti46rrmfp97q60z5',
                channelName: 'kpockg7mrm9s8fedie5xd9x7m3a3n29491fnevhc1p8p2dwf3at7vdlh9cjz0np9h3we5511300ucjwtt8blga5vqu6ide1ir5mq7kasfv0tnipsffyqpclajdp6l35i560rlcu34xue70iwzkz2bfupzkisgzzy',
                detail: 'Veniam est dignissimos sit soluta. Illo aut aperiam et ut. Omnis voluptatem animi id minima non a quasi molestiae rerum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'oph1xnqbjzjxogp0gsik0uc7sibtmuke6vi11j821rbp3tc6fe',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '5muubpnajqcufijfqkpq',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:30:45',
                executionMonitoringStartAt: '2020-07-29 05:49:01',
                executionMonitoringEndAt: '2020-07-29 11:59:14',
                status: null,
                channelHash: 'obo1kjvvq2efniae55y98ltn6bqzo3zcztnrp1yx',
                channelSapId: 'p8zx581a42ll932xmo0h368hymuevvdex44ffq71ak71j99zyi',
                channelParty: '50tsj2fqk3vw69jzs0uulbw1egvrc56qztqkd2vm3w7nxb1kh1picxllo16dv86q027g3hcebpx118f4ngez1f9ksvbiyvc566hbxr7y8ijhzb9q89kgej6qlwl6ze1rikn3lovz4sq4omq21y7v3v2yopgx5e8k',
                channelComponent: '1dxc58c8v8sw9bkrdpm8jko2m76fvnsjz2fluqz7zejgt0lui4z2gp7ahwfhy8ybboycz444hc52qguluqlhnl6pdiv0mnv5x5zjqazj3xlvq3yfzvmeac4opo0mtuamsedtodkesiltze992l6330t6p2zgafbv',
                channelName: '0oij3s4iew12oxqg52crhazxblhwwijr8gdt7izrdjy5su0ap83m0f1jr7jfe0zr0u29d4zpkljg7xb524orw8uxwypqqnkk89bwkn1p67a10r9k04x6dk8pc9cuc5yb74028bp4obrsd6sw7d4qrubaolsixgd6',
                detail: 'Pariatur fuga quia ad deserunt delectus blanditiis rerum est consequatur. Quia amet error. Quae dolores rerum velit voluptas non temporibus debitis ut. Nihil est quaerat vitae deleniti unde molestiae. Exercitationem nostrum molestiae qui qui cumque sed eveniet. Ullam odio incidunt sed sapiente.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'g9ozmedt9bxr6pwfqm7vczd2h9euree46opyarz9wgf55vtymh',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'qmhero01scq9iqdm476h',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 01:38:17',
                executionMonitoringStartAt: '2020-07-29 15:48:52',
                executionMonitoringEndAt: '2020-07-29 07:03:24',
                
                channelHash: 'g24p1ptg5xeuku1dwwjtmfre7iwm2oddkf4mrqrm',
                channelSapId: '7h0v8ua9mtop2a9fp8ag329dy62hh09ayx092d7x1n5rgphnok',
                channelParty: '4ckkm6qb46mfhb807kn5qvby2iypnkbkjmki59ee1tmx8ib1ap174fgf75si9snayg52czsvstvhwneztenr8ocrhfsz4fg7gpk1bkwxuhhdow87o1maf58folgr6hxe1h6cdk02me3x4ew0wmouu6jgyykx4pm4',
                channelComponent: 'jh4knif14wx6flt2iybuve1qkovulmtlqgg7ajbkpcrn9t7aabhc4gzafi86ndoks51vkm7gvcsp1myurjkugpfzm0xxhg4bb7ox9fkegac12gzfl7yaw892nocg8qoutvz3k6tdfmcgbef8lku94d7vhohw9cua',
                channelName: 'gjt943gz4sb948b9gn75e8xqfltwzgsuay57s9dgxh3483f3xnwryhonv48lrwzc6hzgs9yoq53m1lgtml42rccxilj93nf0a1yfx20vrwaz5yauqn6ykscg5v4agt95o8mr64aiow8sdd4qcwglf6g0lcm9wshm',
                detail: 'Distinctio nihil sed non. Consequatur sed vel error doloribus numquam excepturi non. Itaque et nam sint deleniti ex quod deleniti. Non expedita eligendi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'zejoe4yduczh0nsng0umh8iapko2ojvo0xknx63kirovndj5gp',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'ylaa0n0u7z4zg3rbjt04',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:52:20',
                executionMonitoringStartAt: '2020-07-30 00:47:14',
                executionMonitoringEndAt: '2020-07-29 21:40:39',
                status: 'STOPPED',
                channelHash: null,
                channelSapId: 'dkryee5h90tzztbxskcsf101pn4e0bdvnuskwnypmubae6iac3',
                channelParty: '7rmiq6axc240ypml8pe6eajdlcd3y109yegl1r06un4l4qli0486fjtg927xupdcoab47ze6aaqyc9g0tmtxuycpsndqj83tvz38bfjnoft762h4xcxqsi7wgkywe7oss85u6milo8v59qbi27vgsbsj02oioova',
                channelComponent: 'nzfiecg7cpd5ovwweu7jrqjpvv104t6e85r30otikz0rwp7kovg7g5zc77lq7samknqehyixx6ehnv0p1uwbpq81pge62xffrrsf8p5lado399gm8rd7yai9j9c4xb92pis0th5bc3jsj0vzmk749casathlsfw9',
                channelName: 's95pgyifbvgl5gxexyuji9wok5zhhlay0hlrpmatfxgv4yt5gd3xx1w9jd78ygmw206xzxxcv9dsecrnvbgddqhywq9f6vuzs6w5j5dnq4sjhqrfh3dmllr53uat8zr4gm55svlo5lgd5se9zd1i1kbni9h21vmk',
                detail: 'Aut et sed. Enim adipisci aut aperiam voluptatum est fugit tempore enim. Et magnam in.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '9k3z2u55ahg4yyiufhn2tsbgyc73bemyvk72sx8fav9wwlq1ak',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '28flvlo9q9rd95ntufjn',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:30:25',
                executionMonitoringStartAt: '2020-07-29 10:53:58',
                executionMonitoringEndAt: '2020-07-29 22:33:41',
                status: 'SUCCESSFUL',
                
                channelSapId: 'deebdc99ble4gi31rwc4igmnql0vg1ctvwthdox0j6m19hn8c2',
                channelParty: 'auydlr9673xfbanjr3mdi87ytoyf3lqnzv1wuzzck5wera1gfaux30mzwswbxaesx6bbrsd0xvagl1r7k6vm7zw556gpjnyasddjlybf9q18dt27d4r9g46nyixia3irzjimntvcg7mywk4wc5lf2nmi8fhd87y9',
                channelComponent: '2o3in3uvpsqeibpcvdrzr4p86iiz8xj26zid6mi2585h29xdkzc16zrwusi5kjnvh9w7e55qkb4j5aw8ednvmprpqve5q0uvzf9jagi7amv52v3x7lr3kxkv1cutrosx0uki22bzlphjo205mwnar9ata8sicary',
                channelName: 'qbjkbitl9lonqsk3vx95l0gixzrlrczm81lyxohegjezf7h4wofqm59ad3p4ov4i5qwdbqvltafhwtudcv5rk3hqbbcu1d1gtuy0vzg51ov237ucy7tlueu802qi3rt2tiiwzt19lmtnblc33pfnjni0v5may446',
                detail: 'Non doloribus veritatis quaerat velit et. Necessitatibus voluptatum neque pariatur eveniet. Non veritatis doloremque placeat quia iure distinctio et voluptatum. Atque nam alias dolore vel quia consectetur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'fb8pl419k7l5t8tkw5nl3bjs83d7rce8gvaymgqdxhhiergmmh',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'zyk34kq1slf5816xu5no',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:48:11',
                executionMonitoringStartAt: '2020-07-29 09:29:56',
                executionMonitoringEndAt: '2020-07-29 18:21:17',
                status: 'INACTIVE',
                channelHash: '9lh9fhqdiadl8l478wfzfa9a2wmb6p4msx1fd598',
                channelSapId: null,
                channelParty: 'wcho40is1nuz1cwym98qtk7ptbib378taovkbwobhuhdwj32z833xg3kmj992toeqs9wvy9ooe81r5jrg76bkai2eq1xycs9ihm8cqviep36bhg0fi44ng12kjfxum6eihlkncbuj6ybe54thk8sxawkxp8l47lo',
                channelComponent: 'iuipot9q9ri42jyakakpe55hqchpbx2i47rvm5pnoem278d2e26ofbuegug2qir88r76k6g009nbekk80wbjrayx4qizxlpis3ww3n3quawe2vdr7363w67ic5w8m7oxfayx70cge94n3t1pqqg7bbxpkennzdqp',
                channelName: 'fyw12nw7ji1trjhxxstt90cpr2verzhx64qiaay9q87kngs2vgm5cp5nukc5v683iasjc50l19518igqx1hdokxl8mhs15rh6zleqpp9n9l7tyiyoms2efg1gs54rs0ag7oe3uat388yb5qms3rmdf2z6395wyc1',
                detail: 'Velit sapiente tenetur sunt. In temporibus debitis ratione. Debitis officia sed. Quas dolore culpa.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'uz24o3acdd32dzy97ndjh9araa643z6eehpcz71837je4lxpvs',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'p78qj04rj1dj83l9lbqb',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:30:54',
                executionMonitoringStartAt: '2020-07-30 01:08:32',
                executionMonitoringEndAt: '2020-07-29 22:39:36',
                status: 'UNREGISTERED',
                channelHash: 'udwjrax1mfrzj36mmqonw9mx5e2hcs15ipem4dh5',
                
                channelParty: '3ux0slm45sha3y6n0lo6ixfhu4ovxhoujh18wkui58u6b47g8liqw5gi55txuz73v6qbhn4nf3ihefm3stmtd5jbyms7o7npgzzybt0sm4f1z94li2winufqrdkmtvmsyu31uxj1sdz9fs4v2c4dag9gly75auww',
                channelComponent: 'mja8aragl4bo17cq1oxb1io5m87v88e2v6ru51bxud5tmzvils773bz9o75wo15qxvzoar3jimh4mpvcxdd9d3o27ib5ee52qudhhne2rxtq6qx351bhl8u1k2rl5usdzyyxovlizjdbtaub86p7n6kuyg7t7m5g',
                channelName: '5clnsgsukjoft46f8i9j0y2r58wdtt3igy6oxmx3vwdal47ig6dsubz9g50d40rgjh0mc1h2dlpa6oufvw5dhhursoya4fx9pyr5mm4go1gf9gy80wg19b31bvj168uilg53dlood980y7atje9n631l2bkw6whk',
                detail: 'Inventore deserunt dolor ducimus dolorem voluptate sed quam. Sint est quia. Maiores quibusdam minima.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'n20k1daa51zcwciz7fpldfnoru1ffcg16k079nae15iv0warr1',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'xzmbee69ziz34t44sh0e',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:34:48',
                executionMonitoringStartAt: '2020-07-29 21:34:49',
                executionMonitoringEndAt: '2020-07-29 12:32:33',
                status: 'STOPPED',
                channelHash: '5qkrqpkc9sm58nzy3jampuqav6mbkqmf4mf7t7k5',
                channelSapId: 'udyl8fwa1hfxhab7ryjra7cufw0elk0z0sgoujb4wgitr6g8oy',
                channelParty: 'ub797fma59fpsiml8olkzr8dvvi2dbn9zz12qutadqlhevez6qj037pudj2lg6auzocahounkuvcx8wgl7kemq515w0j73qai6abouw3g6bsw1e73wuqhcw0cf8mdqefrx09wxgydrob7z462cs74d6ncn1tm6us',
                channelComponent: null,
                channelName: '463xfwlxyrkyycil1wenojcy9pghh48uvjr0bmweqcqrrcunwd1ma8xlmgd1dvmfxm22mx572a3lsqelvw1s8n9yworosewzt4bqsis0u6a0p85v81if74rdklzl1ycvu2vff6txojm2b0byqvwhm1lk607z8sxf',
                detail: 'Aut ullam expedita quam reiciendis culpa omnis. Expedita omnis amet qui rerum corrupti sed aut. Sit inventore voluptas. Enim quae natus maiores sint aspernatur ullam aut id maxime.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'julsjh1qmnck92osmijl4q1do1rzqo80asvlk00xdn1a62voyw',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'h3un9xr5xs07vcvgl9yq',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:46:32',
                executionMonitoringStartAt: '2020-07-29 08:31:55',
                executionMonitoringEndAt: '2020-07-29 17:43:38',
                status: 'UNKNOWN',
                channelHash: 's9akidgarquptvx7bxziyghlqf15u9isrpxu46dt',
                channelSapId: '7mw9d11u1tjq5sh2auvv39q3e9d642vastnawjufd7tmbj92q2',
                channelParty: '3it8qm9fak4kklnw1b2dgwq1nwwte2pjjbw5llqfncqdf9yncqov2dpht2ocdpxjva2we009o96dwx3v5av0vsnvv1c2ywh7bfzm0cxuyju0nj1t335ajn5mtfnpbgywg3dabywhci2lhl78u650jx9xjwv7h4py',
                
                channelName: 'yai7uzegedliqdpo4zi4uurekr9ujsqwsp83ix2fuhr35pywly4708x233i8036r8tcf1lt61zu99zc64y1vtnvijnl2twjd9e6th1hl4eo7qku8di8950hte3vve8kiiffmk5vxt74y6faigwu543usz4d48u2p',
                detail: 'Iure enim autem qui beatae. Et rem consequatur iusto aut beatae. Aut aliquam itaque in quae laborum optio optio molestias enim. Et quaerat ea et. Aperiam molestiae culpa quo est qui et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'ueqi6tn0w5k6s9zxrgllos0wx5kdkqv3yi14jbl013nm2k97wb',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'h4paihump7spgsbr4h72',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 01:41:12',
                executionMonitoringStartAt: '2020-07-29 03:56:48',
                executionMonitoringEndAt: '2020-07-29 05:45:43',
                status: 'STOPPED',
                channelHash: 'm18wd2pw15ajeavtq809qsphtqu6pmh8ysynopaz',
                channelSapId: '6vitld2jlz91746olxu3wll37zg2iwbz3a4rcalc3a3ghuhdlh',
                channelParty: '10zgkzux5bxadfivlqk9z16d8e1znfn6ug5gei0ds8xxaurf0g5e8599bhe9ezb74eym5aw3ssgf565tbarwyi6xk5c7lszyxu8cguf66wnuq3t67j9zbci930fwtoo9h0unci4ijxvgq8k3ytorf6juc89fm5x3',
                channelComponent: 'trphobhpfiw2b0wxhdn8rgo8l5x9tgoeyejmj92713eu24dmuw8mwfrnx23u67ac6ydwjcdkx3hjx5xmc3sqhwnbhawexrwwf1o6cgnjlut4xeadqain04ju7uytjewqhdg9zhwh2ww4zgqij0ozu4kbsyn4g1uo',
                channelName: null,
                detail: 'Repellat doloremque dignissimos iure asperiores et maxime. Sint ipsum omnis qui voluptatibus quaerat beatae id atque. Ut quo quia.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'dnq9vkdtmuotfhcwl9gv9chentamr7vx7vwvw37wisjh5btx5d',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '27ngree1qk7kzgum4bc5',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:53:14',
                executionMonitoringStartAt: '2020-07-29 14:33:55',
                executionMonitoringEndAt: '2020-07-29 21:58:22',
                status: 'UNREGISTERED',
                channelHash: 'uvx0bi5bx0rm8oxereq83s9h7oagjbgvitc297nf',
                channelSapId: '4ssohx9h3xo0e148ekiy62vyzh6uzry2a69vru6y2hxwxsxjxa',
                channelParty: 'gq9g52c2fogv7mawyln96h3d4sj6mu8ov1bi4qjqwo11rpjbziis6lp5qzzfdu5unaps0l7s09hhzbzm00sx7cnzfwzp7a5austrkg8fv4itovnch67pjwjxe04zezu3oez2kydgg0kthpvc9ss282zlbrskel1i',
                channelComponent: 'qd6jk4h31pavjzalw1naefgvdopuldu9yjsnga10epwrwqtift4o1bz51txxb9cr4oiurd3x9tf4ha7j27qoiiaclex6uilyhcmfjvzfxrvl6hmaaf56hsvgycwhfkq0lv0qnit84xhadth94ud7yi0w9r1k3kkz',
                
                detail: 'Ab voluptates officia consequatur exercitationem necessitatibus ipsam velit. Est omnis natus omnis delectus. Provident rerum ducimus occaecati ex aut necessitatibus animi. Ducimus quasi ut et magni dicta facilis quia et. Nihil numquam aut earum voluptas et est quisquam voluptatibus aut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'xgslgwy6mr6nyuf135jykn2vjx3e4zszi7ilr',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'sc6m5yvzsyugu8m9it3d8s1425jdwltxoogvnsfu23se9jqpum',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'h8ibexzxxk7draoh1odl',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:52:19',
                executionMonitoringStartAt: '2020-07-29 11:41:57',
                executionMonitoringEndAt: '2020-07-29 06:15:08',
                status: 'UNREGISTERED',
                channelHash: 'r03enn0rb3pre3bd6af2rjzte98mdxlfie03sckk',
                channelSapId: 'tv4uox5eenh1jsla1r0rbtuqjnfmq2ajughg748mubb1r45jiq',
                channelParty: 'dz152mjho0l0hy15uz915b1g6k0imkwn5bc6grkx7tjihg5k2kdzxmbn7wnc86awvqox4clpsgw5j80zwhh5d4j91nyel8xpumg5y42gl1iwg0mqholq9k0lc7mffmd686f05uybefbblc55en4gm9uic0ppyhy6',
                channelComponent: 'l2i1hzvcuovhyb966ty8mucukqzyo43yh5mwt0qdqrruxsegl2pp4rmimc2dqrf51sxb8fs8i4xfgkajke7afp6jv61c52246ggdgrlf383x1axpifymqkz9furnl4pqb0bgbyu9t0nyb3knvq5sivced8atolr2',
                channelName: 'dug26ujisag1j64dtdyyssmj4w2uwn1hszc82ok378ow90hlid5w6kfmyu2txmn90s3q8qqtsl77f81gq3zxz4xez1q9wg9u73ujoknpo0216wyedn7tevwa049oc1dnj5aotz83hsaw8i7mdnpy449o8vpjlm4k',
                detail: 'Odit a ea assumenda amet sint. Ut assumenda nisi aut. Aut est eius debitis magnam atque dolorem et. Sunt modi magnam non ipsam dolorum. Repellendus voluptas quis ad adipisci eius doloribus quibusdam. Quis exercitationem est.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '6dhjaenx3f05ejowwqjyoprttcel20hj0pmol',
                tenantCode: 'jcorx8vnqpdeiuqodxjpf5g0y6jfrfv0ob29spyngozzo1w2of',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '5smrgydg5cxfn6iazzp8',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:06:34',
                executionMonitoringStartAt: '2020-07-29 05:20:12',
                executionMonitoringEndAt: '2020-07-29 09:24:29',
                status: 'SUCCESSFUL',
                channelHash: 'wm22u1m82s8pai6jji9quoxoynmv3kxdtzm1474q',
                channelSapId: '6itk38p23epgyj4776zn7mfpnt2miy0outd1i3qh53zig7xad4',
                channelParty: 'mkiv67gwyd8ki77gsfdogwcay5igagk21ycd1t50mhg4vz3jblf30ef6sby1jlzba9w57g8hqsjez3awpo3nbe7loyy1gtfkp4gcd0mqjkvwvddywjigci3eekvr36tqj3b82tifqqrtpq064vhi76noukhq88qz',
                channelComponent: 'fijiyhq45szlfjwqzjsbukg8jne6i9j5z9vypbksoduffm1ryqyqjwk5w5wprm1hxj1q6oucrd82hq36ixfi5798c4o5f1dcbwyeos9tu8gru99phnyljg9pjb9nkwas1ibtjv0nhc544gbrl7yd2esmz5j2b07y',
                channelName: 'h7gpcq82nvqhrxkqqo0iawoc1tk0gjdg1oslkxewasydque8us1qv7vuwlt1u0mmmml43e6i8ot74jstm4kzm9rbjpdpsn37wlgt1c0q65qymypu7cre4vapyicfo9k5b39nmtq9cgidhcholv2t5g3pmirsd8cb',
                detail: 'Ducimus qui dolores fugit debitis ut est sapiente. Exercitationem omnis libero aut impedit nemo. Eum mollitia nesciunt nisi similique. Magnam porro dolorem odit omnis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'kc6cvv83cipa05i54ve2q62keumstzbzbqsf3hestujmca1uir',
                systemId: '7nqssnkh1w0xzain3qrztmwf9y66v1ouoiutx',
                systemName: 'mjjujpdvtt6dr53sbmre',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:45:47',
                executionMonitoringStartAt: '2020-07-29 07:52:17',
                executionMonitoringEndAt: '2020-07-29 05:49:15',
                status: 'UNREGISTERED',
                channelHash: '43uz0boszgx48rrenhhgva1m4mpes4i2wyv9r2cd',
                channelSapId: '9ubrvixi0wjbffj1voif0nj1ssdzwpuzwmscdv4u3skc1s7hlc',
                channelParty: 'qfzr2zl2s50180fsxk8ny5py6maqu7pbtf3ovx1denmbveod0xptwboobl2ob188bpxkyfax5psa6tbpcddgnvrjkwio6mcvoxyjf6w02fwies0z86yz4cfbwi9w56uwz16bf99gn9esydh78x3nrdiorqlv1zm8',
                channelComponent: '8oip7vdhk7rudcg3e0xa5hukzqzz21qcdahuqod63pwhr1vy7eb1i577wc77i9312u7x5ql8snce6h7m5zeit8rot3z6vojmeapj8qa7xasrzy0zob7trlgfj8wrtbi3eqgzw2mulados6fkqr9uux4rg77t5jvb',
                channelName: 'z5iyn0uyrb5q6pvucvpyl0auvd7u7qcozy8ynx6jhb5oluq8oue388rvtshy9psgdtydh0aok4l391bhfesghb1ca4ifwv9brc5jz3lhu73mwuux9y421ig6ygu2b2n395p3xgm4f7kjkf0brr84inryhtdqd4gn',
                detail: 'Quasi adipisci voluptatum architecto. Minus nostrum dolorem occaecati sed aut dolorem illum suscipit quasi. Reprehenderit expedita mollitia. Provident quas quis inventore aut qui ex aliquid eaque. Provident autem quis doloremque sit et odio incidunt sed voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 's1y3nctqeg7db0zbgu9sr77v1kwp6blpizmkhgj35jyczgbpuh',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '3ukffdu77e0wtegsex7r',
                executionId: '3x4py6cmbgzrzhi4728xv75vk7ecmo2u9sy54',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:39:57',
                executionMonitoringStartAt: '2020-07-29 06:28:48',
                executionMonitoringEndAt: '2020-07-29 11:31:24',
                status: 'UNKNOWN',
                channelHash: '5xtko6o788obfb35p5cr0xjrn1gxf7byzaf2lbsd',
                channelSapId: '1nhhqnm1489evso5htjta4bu3jyb31puphcsboxvom2x5dikr3',
                channelParty: '5sl79odb4y4rtxw05zwkza1qcfksz9qyx1l4iqi41vzt3axp036cbqxapwxoo9it5aohgu35j2hl0ewd0eyzf127ad2x5uy3f1ekfv1ya40cklrukbtqzahmadazc5o1va3py4bf6atr0o9xaka59g0mokgl9wqd',
                channelComponent: 'odzarls082wbgveocbu6rs5mjhommaw4roj64lzviyawcfpkjyu447r57e6ttsi7jc97vnym1jhpxi957d099h0xgaj4gte5lqjsj1gk55j1sr9ineb28k5so5y31gt1mi3cxkdoof82s3p42jhfsu62xn9ywn42',
                channelName: 'wuocwwukgjkol5n2raqy2qx4scd1e1mprmp1a60xoi1y5fyo654hga62yx58l4kiiancscx4oe973nqg77dok1adpxlakdhukqkkbqw2vv545ggnjwrklzii6lly66jsv1ps9d9td04rmp6n5cxtysgtbsilakpw',
                detail: 'Explicabo facilis in magni qui recusandae sit. Et eligendi qui fugit porro et sed consequatur ut. Fugiat similique iure aliquid ex animi vero.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'x49t923c8320fi8cj01tn2m51kury9ue7jl4znhq8wxddqmfus',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'h8mcxfbbd9ay9kqmiowt',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:14:00',
                executionMonitoringStartAt: '2020-07-29 17:23:20',
                executionMonitoringEndAt: '2020-07-29 08:54:10',
                status: 'UNREGISTERED',
                channelHash: 'za7roi2gvsdki01ogjno6n4it8bfepbkqsmei5y1g',
                channelSapId: '1oa5cx5r0tv62tcmyobzim8rqf44hbbnazg0cdjknufxafoqs0',
                channelParty: 'b2sihf2axtz9r21psmeswguwd1tw9op8vg0d5rnnygqvve2d1frc7ve1ew5e146kr9jofkikuc5zluinkdr3l61jd4t24qzdxtx6l9ntuvcoail1vv1idyq9atc2owvsk77iig43byg3w6gmrkevjxjk233qhbr8',
                channelComponent: 'liwqt4o1ke5v29b51tsnyjqc3kn9oeg1lwfkd5pj48u13qejyvx8s0lvkpavrvc0bue02ovgft5wcqegfigirvryu35ol3r16ubknxyapjkir07uu9p6cwu806dgugfmcqe0o4dim4e4hoi6woll9vtgsk8cg4k4',
                channelName: 'iz0j6a3je4w575sy9khnidozfifo52j5wa9nywe944qvymogt1g6d6whni6qw2oi7yep3g5auo27gd2tkd4pfvfcq464yegfefvtgi93iqokzfd02voclo0bumb94kz24o6a7s7s1u19zxi7znkm7hq2wewn2pla',
                detail: 'Deserunt eum iure minus provident. Fuga iure nostrum eius nobis aspernatur rerum quibusdam doloremque nulla. Suscipit pariatur quasi similique autem et quo. Dolor veritatis voluptate hic consequatur soluta ut suscipit. Similique pariatur vero.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'q3ptzvomvt51lgvaog68daoxfznsyj2z2d6ndrnwr29ogvf9ova',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'fyo3xzbsne34jw805gxr',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:50:32',
                executionMonitoringStartAt: '2020-07-29 21:11:18',
                executionMonitoringEndAt: '2020-07-29 11:33:17',
                status: 'UNREGISTERED',
                channelHash: 'njgika3qawzwaupg6u8ltb134zrm1503320i26y2',
                channelSapId: 'lsehkmd5i1rzz3c6w633942y0jkhcw3k60y0ofke7y68g5eg6y',
                channelParty: 'uvr00n716gk6fh010yw5bikbvh9reyhhui91u1b3rsh6zfvu5xbvol5ybh7qu4oa5k00ekrn5r4ssayeoq0a4fat46yr2mtmwpvlzg5foiyffdltijlyiqea6z283sb35953sebw22hivrs3aj9lufecoj4zsha6',
                channelComponent: 'bvaybr7e3ysjx5zhihgcez8fjxogk756ki7bzl9ib3vasti8g3b3ezm0ngikfmubq210cqjvtcv64ghlsbotxqubh3n67xnbjllh37wyq0y28408ksmgi4t6jfavmisbpcf33d2gg3bbcs2ib2ip2q7jazowko1g',
                channelName: '7f8gj2e7dei6pvaduzkho3g4g4tu2tnmuj4o8pn58v08lt0yheiv0r5r49bh4gvhe5nezulonbq8vejrrz4ukb83ibs8f44si78zr720axg1wjcxkx0vya4i5g7wzbpux47cka5gmr8v3qki5wynjtrt7eevwouu',
                detail: 'Vel reiciendis perspiciatis quia. Blanditiis molestiae est deleniti laudantium nobis. Ut voluptatibus deserunt aut nisi in quos aperiam voluptatem temporibus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'v1gnxlenpqud9ebbresktv8lsj4kw0jhdc6gxfh60youi1ce6k',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '9iervf7m1q9dy64q5qr5d',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:55:34',
                executionMonitoringStartAt: '2020-07-30 01:52:26',
                executionMonitoringEndAt: '2020-07-29 23:34:54',
                status: 'UNREGISTERED',
                channelHash: 'l90ycb6j1xhoevig3l0ppqjrviiqeum3228eg9fo',
                channelSapId: '4ve2zwvbblvbmobvf4asfsyh7u354eip3k7ctxwll5nn9zwhhp',
                channelParty: 'mrdoppe0wa3wxep4sxv9dnpbuyz01g42n8pspq8wunozdc5521jezit7qcrr744n5w4gx74x7qsezri7t2y88qiden1nbrq0xeznrlg2qd5hbz1devt1gdvcg4jucag1hrbh0b0z65edha3gkxoz1mi7scx2tb02',
                channelComponent: 'ko6gwb4bv4ci7tljud36g9z7dxg0fpea29lnbqiuy4w2kpvxeg75dexsuqthj7qfncrrusovogeumhg0tmd3ims8gbdxc6teqr5l20wtgf5984tkekmje0ddeipxnm9puixopphtf98vyxvsylayw5u08st4v4zq',
                channelName: 'tnqjsn1q0m7vpvnmmlv9c1vk0otubkh7qjyxqh5frsl9j5hac2lxu5hvk2dmky7wplzzphhw2i6h6lmaotncdszjyn1of5xtwngrddknl2687nwic0arf6r16ixmysukcyidpjwsn07iwxnzhkzt6fokio8b5ve2',
                detail: 'Labore molestiae facere eum aperiam similique cupiditate et natus. Vel sint iste. Libero dolorum aliquid totam blanditiis eum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '7wc5fz7c4u8bhaafubpqeyyzszb95r6kfy7ptp7c6hyfl1toi4',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '90tfei0xnp8awgj2o58w',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:17:24',
                executionMonitoringStartAt: '2020-07-29 22:56:03',
                executionMonitoringEndAt: '2020-07-29 17:35:19',
                status: 'SUCCESSFUL',
                channelHash: 'laf3ka52pwrkg97p28a6aoxhcdlidxz7vy59hsst',
                channelSapId: 'js1tsqrvshyp5bncc79g0vwgk0xizc2kf9qtrzrajddm5k80qdo',
                channelParty: 'tgcx7weh9554he4w8u10qj8vycjbrf06hc0qi36rt7aivx3ctlpcpl8yuobpa9zwpqfi6bxiig1s1fl3dyumuwgorjouoh6cer9j3d010jxpp0oq2gaio283cajovzh08heejj1kw45b61r2aulvxhtug0t0aksk',
                channelComponent: 'bvrouovflzy11kmm519atwu19o4neq6pa3ptwofils8nhzbcjcmlzneeu7skncwuc8qex5qn6p6lm3usf9uueqkjxsu945m8a4gvmi4vwz3tm4j6tffic95mumx2gj85jdp9mtffjj3b104jp3o2tbuohus8auwm',
                channelName: '6ojjuobax8546mxl1sh99ksxtz8ms4lfk45o56hommbyp4isv4sglud2ujhh1z0y5idaq6t2mmug7okq1kccoi2gtzn10hr6w77u9279im10qofkleiu7j6t9huzu3cky7ry3nnjshyydilb19x91aern8ozr4cn',
                detail: 'Omnis ut velit iure occaecati ipsum unde quo voluptatem natus. Repellendus accusamus eaque nesciunt non cumque. Laborum est et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'r2mir3h7lts7iibk90mbushnwanqzkbows5nq9kuuo5qaj9ry0',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'udrmw2x8sujw5i8v7520',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:29:18',
                executionMonitoringStartAt: '2020-07-29 19:54:17',
                executionMonitoringEndAt: '2020-07-29 05:21:15',
                status: 'SUCCESSFUL',
                channelHash: 'ueb9jz1i0rtbu3qwn39dsbxmgs3l0tf69g092cpb',
                channelSapId: '6e5g94ufw7efzbjhabp9dkyz2ifdhel0zemfyitd98bs9li8o2',
                channelParty: 'cv9mua91ob9rutlzxzi7fs1gxfkoiw3ngpc767mrvndz6vjfgi1pwrqqxb387xgep8imhxp5cmu0a7sc7dlz1a8gfklhgxq7mi93tx25eku9202m7u3grlb6ape2dw01xokslz7f6oiahe10ypb0xpu1uuncyqq2l',
                channelComponent: 'sol75aw9xs4q1tmq3uodibcvlxdx1r8kal67vfe9s4suqp63nzfrkwng6m5sijz6952qwsugo6p57y1pyhz25wdfu7hg12ictdbomr14cgb89pyxyujbr7qofor48v9fxos96dqo1m0n0vidbvthwp93ueq328q3',
                channelName: '6vcj7v779fetugkovyflseccirp9k7uukp52kc2ezdnnpk7qsltk8pwi28vfi2tze74abfrwnyb5us2kuuls6wdwxhqephnt7ozwu0ax7h79ym6j2z2nf6nvt55chn7ejytrnp0phkqqniw8f5y062q73dycxhy7',
                detail: 'Voluptatibus aut eos totam necessitatibus quaerat cupiditate in. Cupiditate autem delectus occaecati minus ut molestiae esse. Sint excepturi est sed. Animi laudantium ex quis natus fuga commodi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '0sbtne5zfkz7kx6t0y2h0uys3whm72y36iry5fern0fr28tudl',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'eqxkelog8ki480o82wbi',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:49:32',
                executionMonitoringStartAt: '2020-07-29 13:59:09',
                executionMonitoringEndAt: '2020-07-29 03:14:45',
                status: 'UNREGISTERED',
                channelHash: '1t6cwxhdumg2hfzvwukhnddc2rrtnsz5tqos8ycy',
                channelSapId: 'umfdzlqnfrojna1wac32woov5qoydq0lz19p8i8x6o2g6y7v8z',
                channelParty: '7rdmeh5kuof4cys0zjjceo5gmsn55a5tab8mvfi38clb9f9ctm3t2xj3xzpfuga9olllix8frqxh45whaa134dd86ap3s8389pfi1aonffuz4ql8i0as1dviao65n6z9m8u6ekuo3m1hp6t3snkk1v07bj1rk4x1',
                channelComponent: '0zkzvsm374pem4z3lh12zl1n0h980b1puur4qwx4qum9s808qdmf9ffs1vyof4uf6fa54nrxqzibvj5hfc84uumsdk05fvm4mqm4n4cm1cigr5tsqz3560l9i49o7dfu5kso8ka1u5ejwfnuq7rldmpza58meedjy',
                channelName: 'odnz2lxy0y158nfscjv071rmzbg3jgn1nlvulr6qmjclvc8wpt94pdie1obv9675cr9m3eg9j3dn5k6no0auudsgg9rcr50uwmw7e3fax9gpo3nstjjbtqnmddknzc2qbus333s6ecexups6js2thzzuuja39fkb',
                detail: 'Fuga officiis expedita est animi et officia. Sunt fugiat dolorem. Aut blanditiis aut facere ut quo molestiae ex recusandae. Expedita vero ut repellendus sapiente et nulla. Voluptas eos voluptates omnis minima.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'mvkr2ojn3fzquekao2pp4jpgqyn25p00m1gid9bs4a1xtz5jqm',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'rakd9ujlnhoacz87upgp',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:13:37',
                executionMonitoringStartAt: '2020-07-29 12:03:55',
                executionMonitoringEndAt: '2020-07-30 00:10:38',
                status: 'UNREGISTERED',
                channelHash: '4oaw7ska36dzpwki4omit86bct3aklh09j5nhrkp',
                channelSapId: 'n54l5a8127sje647uabbd4aaaq4u23n6fqhq306ox0xha47mjr',
                channelParty: 'gdrp0jwmxil238i7mcwn7i4krvhw3gj3y6crt4ppurryg7ls3zkmlro67mqk4y8pysyx9m0l5zlmamn62ge5ocl392jm9fb5tz6mps6wbvtovpe97i1qfhxs15n2752asi8s1e4k5ogor5azjkj7rozm0mq1qshl',
                channelComponent: 'kl0vlev340oxm0x47k2cjzu08gvj7c00hvj8gcsbw4mkvozn3op8hgm3y7v2ip11kl24kkywvzp2prm07vwzs2qxc7e286cgc5nt20kgkvawlbxa5o73uei13nxf6clne7pq1v0wkbuh7v6hvd1brrcdxn7k8jip',
                channelName: '9shwh8mdryp13adomv9rkresj380sjwmitfn3x7zk3b59rqmsvpx9imwnimavacs6gtrlz5kbmyagd0kx6rde3cpp5r5mruq4vui9htnjt78qmhdemg7tv6qty3lzfa0fkcg9jsfrymy8utp13z0ddmauciybo72d',
                detail: 'Numquam voluptatem nesciunt et culpa dignissimos quia iure ex fugit. Unde quia labore blanditiis eum voluptatibus. Consequatur qui dignissimos blanditiis reiciendis. Ipsam culpa est cumque eligendi quam veritatis perspiciatis placeat deserunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'cwfkf3tm26h3z8g40jdk02vdqt8e3ocvx7316p5k546j6qjxnm',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '1v8dcx0w38vm3x6ogs4u',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 16:45:54',
                executionMonitoringStartAt: '2020-07-29 17:59:45',
                executionMonitoringEndAt: '2020-07-29 14:06:29',
                status: 'SUCCESSFUL',
                channelHash: 'i9o4ft8xbvulcg6v7ll7982r9u6dfie8vfbtndjo',
                channelSapId: '5dpspkkvea40rsc8hteerqrxxewl4xsowqd1mxz7blz5on9e3p',
                channelParty: '8yczmjh844d3i9d7rkunsrlyq9i8ai2jgge2ywh38u2r1cypdf27t3pkauugflh7dskxmtod9xlovdjpwce87wz3o1c0v0cjp23mykxdo69xucgoj4h10fys6njlufamq3iekdu45b0cz2xkkbojydn07raay4mq',
                channelComponent: 'vx6blo4nv91xnvz9mvxasrufzahf3mcyzecom3ksuleloc9xgj5wax911do40jln928ph87996vd31p10ubzsnde97f7t3gexkugid74ja1kmhxqt95fr9q9d70p9r7e1h5uy5w32g6boh9ezudx0gm1tyjims2i',
                channelName: 'zmpxw9rnfa8dhjp3ecq688k4s2iau43v3kiehqmcbwsq72rs0iozneryaoqxec72fru8yp7vg9mpsqwe1qw2prksqgxciz33lq0p7cdz3r36ftdso8ae03cdh149qemxdkkprkf5fm2tqt8y0u3bt02omwegirfm',
                detail: 'Nobis esse sed nihil accusamus. Et ut quaerat rerum unde dolor recusandae. Minus aut sit perspiciatis praesentium.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'w6thoz3xpefaqkdj12jyas0sv43cme6tan47rnqjyialvq42ho',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'rvasy4l7pdkb0y7t2th6',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:33:26',
                executionMonitoringStartAt: '2020-07-29 03:17:21',
                executionMonitoringEndAt: '2020-07-29 12:21:59',
                status: 'XXXX',
                channelHash: 'd10pro9bj7mptw57607z3ytpdax5fkfocr293o7j',
                channelSapId: '88l7i21gfjozh034qkb6cpv4q10mdvvhfqelr8o0enhyvgn11s',
                channelParty: '1e89je1qsclaxm3brt0e34s37s4q3zaergprvvoyc294y5jgeo6y72rp6jk305pp50ige3v0s0wup0gwxoft0a375t81jq6m4w6i5zjsbqf10x4nqmmfk2iw510ruegrkor0jgvmfpnny9zr8qub2aggqh4fx71c',
                channelComponent: 'r0dvxp9u5pthyptzctkekc324o2vhg4oqjbvfaq6rj84qxwl2bo7n8m8uzw0u0gf91rq8niddwm0tvf0c0yppgjta7vjva5hvgzoln0smucz736xvdinv33sqgr98jvi8h0nonmdf37v2am09zou8ks0ag6xkjzx',
                channelName: 'jhpw4d6qlm8az3zch39iixq9c2e6zqujntxg5s345zacsmtiur74yjef6cmfxgdlu1nhowcrnj7xm7i7zxh5edt4nwasewzffkb7hmg5nchoo486bskeb5vgn1k9vyzlaz1wp4veiiiseszvfh2qdw8cr8z6c6t1',
                detail: 'Facilis rerum dolorem reiciendis. Distinctio et necessitatibus error itaque perferendis. Officiis magni aut pariatur. Odit explicabo perspiciatis totam beatae blanditiis quae quaerat.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '5nrbmfoi1m44oyr3obizl2uirl9073t4x2sqvjde6iqnpmu48y',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'cyfad4cm0rugwtb6ishu',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 06:56:39',
                executionMonitoringEndAt: '2020-07-29 04:05:46',
                status: 'UNKNOWN',
                channelHash: 'ksnsfw76410965c2pi6a02ejs98ffbm72ygwe4h9',
                channelSapId: 'e87kst7onopo8l1edxrmqogp0gde51edsq9w5dqrnaiq8k82yk',
                channelParty: '83ucnulii44614h37ncqs6jr88uy1crxcrblmd2p0umvt0j912zafr1cesjmf1fh01t3solyyakfmpesrwlm43aiplwfhv9kxe53tc7r25owo3zcmjfxslkewbwc36688hxn1ap93g5etntecq67fsssweulylpx',
                channelComponent: 'w11vvdo4injzx1e3dmma6n76u7vu2wpyeu08fhn3bl7xj6efydlacd8vcduljkl57hyhps62vthjgr9uqnfj09a1gd9qgj1k18b9tl4aet7v5dkynbcfwvopszxejttjjm5tq17nit1dd7s5031vqgy4v2axfxg7',
                channelName: 'dg5q75f5506wgd27nk3v6b7bcn53dd2hejlfmvrjanoqv440gi2y68gzi1iw5yywxvrbbxufs5pa6m4i0telgobb5kt3f1tf8tbpir3nr8u5dpdct45gw2af67zjbaj64b290mivltwugxu64cn0ormlhxy9wtn0',
                detail: 'Rerum rerum et sapiente ipsa aut et necessitatibus. Omnis ducimus facere et eos quaerat ullam doloremque aliquid commodi. Labore labore qui dolor quis consequuntur nemo adipisci minima maiores. Nihil consequuntur et. Doloremque ab sit vero vel ducimus inventore assumenda. Incidunt modi est consequuntur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '90ofcn2f3yugm2iqqf04r1lt6uh9ggjatbvtkdzyoskwm6o1nk',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'pkxe814dp9o293g2fq3x',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:56:31',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 19:22:57',
                status: 'ERROR',
                channelHash: 'qj2vb9dev4pktjd6ut7uzxktv7pwynmptqmfuc0s',
                channelSapId: '9t6nb5urxo263dtliq0kjbs07mw1ne0gwl4k5c7ifxos9szgf5',
                channelParty: 'pu3bk9opw5w1rpo7vqyt44ld04zqhf3jgzjetdd9kfo8lzadptlm1404wswe8mikpat4kko21v4fqtbezzslv1drpm057rv56c51uszr28ponep82pd545fsb13dhrm6uh6iqqbvykta4oej5mglb2sqvmcqiysd',
                channelComponent: 'c4xhks9289mmdjbsi8zc2m8r5ruxt0akcu06e9d9w6dxevc46jmufj0skrs2nr13jnoa9bxyyh5csaxjxtzkb7g09f2k1dbd6vptarxwpu0i7wr1iaux7ov36ojwtkcdvmcugscs5y36rohrkobgoep714gfbb04',
                channelName: 'tlad3j7m12cia88zyt4fqhvm873z29k14w46fkysdehsbfm66dwzs81lud7woyajl9oal1f4nz9mp3mf5oiw08jq3brvbptczkib8resaeqkpqbg6r3jum57mqilpb6axkq6jr4fx96w0nijkth4kwgksjc06cs3',
                detail: 'Omnis et enim. Velit corporis est rerum eius molestiae sint repudiandae nemo ut. Temporibus laboriosam et autem consequatur et eaque itaque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'a0imjdx3tmyo2wvj8rfk9xjf3ysj7lkwqh6psqo2kufefensc6',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: '09j6gmkitk00y33i7jgz',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:25:34',
                executionMonitoringStartAt: '2020-07-29 03:31:25',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'SUCCESSFUL',
                channelHash: 'xtztwkoe8nyp872xhv64oginwbmmjn3afn9j732j',
                channelSapId: 'd64flmod6eyka7ui4dpuc10cpza267aws322pz3aq1ur6sz1l5',
                channelParty: 'ybugoptt6zqmzh016ciq6acg2y0l5t19qftlxjy22qcf53aao51jbc3q2rlw1iv0cqrtjlxnju3lkwiu62x98q635k50yfhhjkjekezqwzbjygy2bjl27a87y8ry80aa1zswr9hhwkixga8btyf9s0epqrdgshsf',
                channelComponent: 'mv8hcfo2zh96pjsykqejjhegggs2jj26qfkhg5f6rxq34vs6xlx3nxtb9iqzt7vs3avwdl0v9twavz3efd7qbbazp7i7329mv6ntbtqpzxfeowp9juyqqprq3k0kuhfnn3vsipbhv0iz9xexqv40en3uy5mdfekc',
                channelName: 'oe11dnxi0egcy42xnypic7bosig957xxwzd0cqgsiu308ja02aalzy6ic6fb8xewg4joo2kg3oo1m1m11a0l5fyutlehg0qpsj6dimt86k2o2pzh67t9qo6co3v11u2mt6mxjn0vxnz9t0a7y5ff478vk5qa0eqo',
                detail: 'Debitis hic consequuntur nostrum. Et hic quia dignissimos accusamus et earum. Facilis qui explicabo provident aut alias quos repellendus. Facere sequi eos rem omnis vitae. Animi perferendis voluptate quisquam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: 'v79ey333gwh8mkc9um2sc4zc7v5ilm98tmas4qy94cc7rgqnuz',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 's5z6sjmntfygddokl18z',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:17:27',
                executionMonitoringStartAt: '2020-07-29 17:15:05',
                executionMonitoringEndAt: '2020-07-30 01:03:42',
                status: 'SUCCESSFUL',
                channelHash: '7cvwzz06yd06joillidhbh7aj9vmyfs0ohw6nddm',
                channelSapId: 'wh5rxxh0ve9dyi3vygsplpfi8y1uechmef4yjqel3mpza3tegw',
                channelParty: 'cz9n4smcev9pn9b3mljle8ykolx8d6nyu5cg2z37xibzqrd9fi7mdn1m7yyjjwd1e6k58697kne9uesxtfvnl07j8285e9qyypi1mhfhzjnkkmm6pg3imzngd5tmqslqk9k0iwd7vxm0l57i5gpuk93d4gcw4ad0',
                channelComponent: 'j7thhxtawq3t84yk7395cyszfc7pan6bra7idtmraiqzuizrya9neipj7ulhgbg48ies3zleaf62qred3gvl13kjz3e2j8nvj98u89lztyb6yyrzii0lynd9mx3q8d4z49lv49k5psia9b07jjx4jymi2sppoy65',
                channelName: 'vum7q02vyefg88mvtwsqi981zomnmv394urk6s3tcie3rg6crdz9pcr17qkkt45h3z9xhwra87lun7iq9y0kmg7rr5rmw3a747fkndognmmhb8gl76dwfj8rkmmav9a0k3mpssjb84m7x2fjuwr8cp6rxhw992ru',
                detail: 'Veniam et molestiae ea. Nulla in corporis aliquid. Rerum molestias aliquam. Sit quia cupiditate. Aliquid qui autem nobis et sed architecto possimus.',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'fd548622-6943-4779-93e8-44cb48fe2ee5'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '502a5f46-8674-49ff-9c7c-9c608bc06786'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '502a5f46-8674-49ff-9c7c-9c608bc06786'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/2a5578bd-1ed0-4f24-8079-87ba462a97cd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/502a5f46-8674-49ff-9c7c-9c608bc06786')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '502a5f46-8674-49ff-9c7c-9c608bc06786'));
    });

    test(`/REST:GET bplus-it-sappi/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '23ed33ca-fc87-47a1-9440-eb77b045abd5',
                tenantId: 'af450d5c-bb75-46a2-9c3c-9ab856b38ea1',
                tenantCode: 'xswpvakniuk9gxurmz91n59z0y7nz1p30vjgfq5uj6d75irki6',
                systemId: 'f643e39e-ab22-4984-89a5-327fe9921657',
                systemName: '8wbkailm43q6k6fnek82',
                executionId: '25738177-726d-4b79-b1df-8373cd690b3d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:04:55',
                executionMonitoringStartAt: '2020-07-29 03:33:26',
                executionMonitoringEndAt: '2020-07-29 09:24:33',
                status: 'ERROR',
                channelHash: 'snvyljhdco05l7q0j3pwh84o7z08tessezylybe3',
                channelSapId: 'x6z2hzkohxhgww6aj5alrq2mid62ug37hbw8a5hcngh0rmylwi',
                channelParty: 'xehc2wjajeyapb428fnk2gtr81f6ip1qk3fgaa9rx3rs42j2hqsejrigqj4sldg8zxqhpj464sg9jb362jrpqcphjsh07zl80pg328gqqof2xn5al6i5s8yion6y2atlf3i3vdked8vvladdtwr8dw2ne1f925q2',
                channelComponent: 'f8gb38j1dyh6zeou9c36s0pxbjb04la1bgh23fhleyw6f3rokxsy5spp3w9s5d218u7d9qt5z7m7mt9cvym1ezc1uxbeqarukx66u7jkk950xh7txx4gp1d08v9nyfr2efkthrbc3t7t8qjbskbncr3u3il8k0uo',
                channelName: 'bwhg2ro9i90e2d1e7m65k38z0ynv1dxsvxyocht7qgvy4eczzsgd335mbl7vpch1bz73qx9qmqgsz2w8jlolpyvcl1t1lotyqul10sp2fvfp2wz4e8h35hclz8jvbzyyiqawgh5i877fiz4puz4kjw4k9x3wmc5l',
                detail: 'Aut quo illum atque vero architecto quia et consequatur ad. Nihil eum dicta ad tenetur sit et voluptas. Accusamus velit facere et est.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                tenantCode: '5yhmhdzi9iuu382gkdedxyt59kgeosyo4bm9tzrs9luq8g2ga1',
                systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                systemName: 'hmilgyjwfotk0iqq1y4s',
                executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:21:10',
                executionMonitoringStartAt: '2020-07-30 00:44:55',
                executionMonitoringEndAt: '2020-07-29 06:29:22',
                status: 'INACTIVE',
                channelHash: 'ouc86qhll50p9pzu7yrhxajwplsawgzrb0olvqsz',
                channelSapId: 'jo0oyn5r143gao30dnyhgtm9fckvqr45ryi8oz3cqqjcl80hdk',
                channelParty: 'nujgubnzndlv16kf3m0kk4rzl49l1i1xqcdt77dbcl2o9vj127dbk8wv6xq5v4i0a6a943tiyzlqu8w9lnbi97ub9hd74fm6rxk4uwb5aph94rf4b05m77thx2t7tjtmvv6yoaqrvtkenh0esrhm9xgti079azn1',
                channelComponent: 'j1drn1f1fj8e1w722gi5g1blyqo77eon22pzb07uogibbf1arvelkgkxgwom3zojicq46kz143j86ova9urzjc0b1p54t4msgi3fn8ncnqi8vlkrnso3k2dynqf5oja1dmet90j1tfg4lc9l1u9cc630ur73qldj',
                channelName: 'm95mmhtygiiwhn7lbfe3na3sfnweehxgw0wrlmdwofx8c4m534b7mh6bf53dcjxwhyrh0a81ee9uz347f7z3cfodjy9vmd1fo24wuubq93ujnyjzdpoaw6w0l2xlz7pz3cqk63k7zmxrvzjyrhcs3yxgl3yhkr2l',
                detail: 'Quo occaecati qui id natus nam aut ipsa. Id perferendis nobis dolores. Omnis culpa quaerat nostrum.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '502a5f46-8674-49ff-9c7c-9c608bc06786'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/4fa91887-375d-4ca6-9547-4120670bed3e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/502a5f46-8674-49ff-9c7c-9c608bc06786')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelDetailInput!)
                    {
                        bplusItSappiCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    test(`/GraphQL bplusItSappiCreateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelDetailInput!)
                    {
                        bplusItSappiCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '30406cdf-89ba-4792-a014-409683dec22f',
                        tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                        tenantCode: '8i3suau67e5sr0iswlit7bq8rpn967tv29af7wxtqok01alx8x',
                        systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                        systemName: '581p5ps317hmhurkw4dc',
                        executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 04:15:32',
                        executionMonitoringStartAt: '2020-07-29 12:20:07',
                        executionMonitoringEndAt: '2020-07-30 00:58:30',
                        status: 'ERROR',
                        channelHash: 'khgmgllcmghgp71t0y77n2r9hygyoxwc8r2pt4up',
                        channelSapId: 'ecteipjxe03tnhqzik82xt9tw49tfzfchxioily66sj48aco1w',
                        channelParty: 'la03v0f3i1mf0tnuia7gffremrhkjvtkhylvgzr2st8vvycwugmu7fioofq26peq9qdyeqpjyaahlgydj6aghm5ih8u3c2jim2gfhp9dnuxhtzoibdpvxhdcrwimqiozqfhflf8wi32lhmqf6nqdci69cuho2qmw',
                        channelComponent: 'rebduuvz54oy0oba3v619anwfx1ljozgkhgcaxj2qs8hakqyq0lhng1sa7emqkvyinlotp2ogl69udqkmn3wsvme1qi09uye7ehxajkjdaob9k9pg5rh24s57zc9yy655x1tammx90sa8ulb93utxrns1fqtiv98',
                        channelName: '4yz2qsom6q7gqhtw8rz223qpf9bruh116rivhsyh7i1z6tiddtxy5s2i9u1ndrmhpc3pa81aqpv5umewgbc5m92ayo2snqqgm19j3bmrjb8862cdt6effh98p27jwpl2pwnsb1uxg2bdvqp5j0fkfaufuf7hlu02',
                        detail: 'Quo distinctio nam dolorem voluptatem vel ipsam. Atque at debitis voluptatibus. Provident molestiae dolores sequi. Fugit sapiente voluptatibus ex ullam doloremque eum reiciendis non officia. Et et quo.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '30406cdf-89ba-4792-a014-409683dec22f');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannelsDetail (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '46cc6711-050c-4cba-b0be-b2e7380f38f2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '502a5f46-8674-49ff-9c7c-9c608bc06786'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('502a5f46-8674-49ff-9c7c-9c608bc06786');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '097091ae-dc28-447f-8787-b24cd18f489d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '502a5f46-8674-49ff-9c7c-9c608bc06786'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('502a5f46-8674-49ff-9c7c-9c608bc06786');
            });
    });

    test(`/GraphQL bplusItSappiGetChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannelsDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannelsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelDetailInput!)
                    {
                        bplusItSappiUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bfa3e0ea-50cb-4700-a142-c472a1d7b218',
                        tenantId: 'aaaf67ff-53ef-4d31-8520-0c706b55b863',
                        tenantCode: 'l3o9dorlfg3tukm3ubskwkkngr1syqo5546gyo577jjgn439un',
                        systemId: '48f48bd6-b98b-4dd4-9e45-7664005c870a',
                        systemName: 'qmg5wxyy7trsy7vqy1d6',
                        executionId: 'ae69ff31-df7f-4e67-bf81-d9ef6f37982a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 07:21:12',
                        executionMonitoringStartAt: '2020-07-29 09:21:49',
                        executionMonitoringEndAt: '2020-07-29 08:39:39',
                        status: 'UNKNOWN',
                        channelHash: 'z4rlwm0w625rsgadfpdvji0tf13ofm43946wpjdv',
                        channelSapId: 'u0n5tlnse4nxi68ea1zfmriz7nvx3bo65ti8aioyph0jgtk5j5',
                        channelParty: 'nabvjoh38jpl6caul9itvgfm3bqq2vvp85pbxrn7infwcep6km5zcmhkzqpzggmctr9g1fqdrb7qxdlwryd9nqw9bo40mtwkfdct672ionkh3uo0aae03srgzi347bvxga46jmap60ilo47vx082dasnq6bshedb',
                        channelComponent: '0f463rf1xdy8gwqa5p5yrxp8vuaa6nus1yaimu81oi0d4fhuv8jgkejqzz6sts6l9pr9yt5q3anni8avksgg031pl1gy5tkmzakj2r0h2j3ifrsd5vcqdyoq8s52rj225jcu8o8n9ackpqblai3tiaf5jk18r8hz',
                        channelName: 'e2tfvtonsaojgowqgge4oefezt9mmo7n27tk3useolxsfhbzyc77t7c18hmi54ywgfb360dvhsixwfv3pusfhetxqff23pqk24cgpmg9r4qyuewvph0kytjan12s347f94lqb8xkzea2gyqnoel14mk8tbswxzeg',
                        detail: 'Voluptatem voluptates iste dolores error sit voluptatibus dolorem quo. Nesciunt tempore voluptas sit quia iste. Deserunt at ea sed eos saepe. Consequatur perspiciatis voluptatem ullam ducimus sint est quia reprehenderit odit. Suscipit doloribus dolores dignissimos tempora dolorum nobis. Porro culpa at voluptas odit rerum aperiam qui.',
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

    test(`/GraphQL bplusItSappiUpdateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelDetailInput!)
                    {
                        bplusItSappiUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '502a5f46-8674-49ff-9c7c-9c608bc06786',
                        tenantId: '33b3b361-a914-4658-bc9e-d141522a506b',
                        tenantCode: 'nvg5dlop5nhw1gap6ryn7drvdu4mqi0k0qsc22rry49ialkj64',
                        systemId: 'de86c386-6677-4382-b18f-7bedb33a7b09',
                        systemName: 'bu09b5nyulhl9f5gl706',
                        executionId: '97409111-8a55-4be9-a414-e586b1b3b3c0',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 15:24:53',
                        executionMonitoringStartAt: '2020-07-29 09:35:07',
                        executionMonitoringEndAt: '2020-07-29 11:42:47',
                        status: 'UNKNOWN',
                        channelHash: 'q4h7ofpd55woboklfrozue1flkmfgyyhqppy09oc',
                        channelSapId: 'h6ldz5lvoeu4dd44144gke88i9ksqiensvrfs9sfy1brt7v3td',
                        channelParty: '8cg5rgknodxmap8xguazhzt2th1ep2bmqy3enbrks5oqsd5p3a8fgprchuj3dlezc5tra5otuz1wd6ebdytnc5qjm3o8gf9nt64n3yzkmepbameo67owrrryjwyxns1v8h45fa52t4q71ebep538wqmkv2zi36mx',
                        channelComponent: 'g691iw74u1d2uy4ycrt1qyxzutvdeb79mif1pffxhlfk26iuw0ow6zkcju9z0jy7msjtqkb3xe6unflzzxqy13auxkr4ridy71hz2j2bcuw2ks639cxmybhn8yyq6xd29zzz5y70cyj06bfbja9bdnef7x6wze1b',
                        channelName: '3qba79dhzov0d9byohjx6j9jm5zg9h5vcamt1erg5bp4czesxsjo27vbt6lje6q0b47gz9zsh615gfttc8amvcqm77ymansy75xf4ma2toht3h1a2a49it6kc4ahzkn4op3gynrz3lyfjkjtjnf2ggwo072qsy6a',
                        detail: 'Placeat nemo reprehenderit laboriosam hic porro ipsum dolores. Adipisci odit ut rerum velit eveniet optio eos est et. Soluta in quas iste.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('502a5f46-8674-49ff-9c7c-9c608bc06786');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1b171009-f44d-470c-9bb6-39cd1c111021'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '502a5f46-8674-49ff-9c7c-9c608bc06786'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('502a5f46-8674-49ff-9c7c-9c608bc06786');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});