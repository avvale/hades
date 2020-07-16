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

describe('channel-detail', () => 
{
    let app: INestApplication;
    let repository: MockChannelDetailRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'e4plstx6hpjhep3j7sf0',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 20:38:13',
                executionMonitoringStartAt: '2020-07-15 23:01:28',
                executionMonitoringEndAt: '2020-07-15 15:50:12',
                status: 'UNKNOWN',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '92e8dzhgww7z5dd6bjflea58d1rbfsq774daq4ejaxs4ash2681oukyn3aypz0ll28t1vvx3ogjelmw4ix0katn5dd161al2q22kxso12jpoaukzevi9masdjv43lnvmg1s7zk9drpzgyvolffqz0wgu4thj3ope',
                channelComponent: 'mlgflt1dfu57fmi01bvj25k2dfisdm18313m854tbdsc48h0jo1q1qseifm2oaotcq23sp8kd9g3btel7e17tvkdw6tru808wuzoqdawewj9pv0kbfu9ig60yysvptsig7uuks2fsrzpuro8f828cv6kdc6p0ojl',
                channelName: 'ecock9t4c6luvvpog93cl4hhs5t138dx22ag33p85lkzynegam579ew7j5vti8nxp8rjwb1z7t21hzm9ejat9b9v9m2cv7s45m77dhpawpdp688ecjwrg2i2xrfeov8vrmzckc61p0qxbjht4vhj4euhgw1xlq1y',
                detail: 'Aperiam nisi ea dolore sequi cupiditate. Sit eum velit et. Animi tempore consequuntur amet id quisquam nobis iusto dolores. Laboriosam natus placeat sed. Optio corporis cum minima et est ipsam expedita est voluptatibus. Pariatur a qui rerum totam ut rerum quae.',
                example: 'hmersboeeyaghwi4evjlvcxpqtx1rh7iwur3a5z5w1qdb90uxausp53oxepsku4ioega541tlc4wtb6jirvhjiwjk2ra5ftp0f0cwdsuwomchknhxkldes2s5wnfl9523o96hgce0d0sd31syd6wu4eawyunqslj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '1paok5cog2gcojzsn1u5',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 00:13:27',
                executionMonitoringStartAt: '2020-07-16 00:10:54',
                executionMonitoringEndAt: '2020-07-16 00:07:05',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'v0jyv22rv1tbgnkyzbbb72swjdwwemsdmzu6vgfcgzzy9itea5eankn05a6ntmxm4g5ydggplowttg5xdgohe95zxn6w11d4wfrelh4ycs6erz4onr9bqnqqt5htv9mji1dq20eeznprpsamiz89opirlqc7goq2',
                channelComponent: '6hkcqupz3id9a8kto65ns94og93drvcq50rk8xh6bix92f6vh86hb4dkxg3qie1fdaclnv32wnxpun7s33ollui179k738spgby7k8tj5vuxvsedju5q28t7ttud6bxs611t61tsm9ip092jyjbsbfyvz3fbe35u',
                channelName: '183tfl92wxvi8nkpu9abn6d28j1bw6o73bkh0vvc9khqa1a8kakk7nuz891hho6d6mz01age3n9n6z11aghbu92n5mohp9glr47zcingmj02py676npmte368ju2rw9mck2zmqu1uzv1lpc58alf4m3t6mhq47lz',
                detail: 'Magni consequuntur qui illum. Sed ullam tenetur. Doloribus commodi amet dolor sint voluptate tempora aut maxime ipsa. Distinctio alias nostrum qui soluta excepturi.',
                example: '0s17n2ui8cmhw1xydqtvzfdz17f24ybju6287d6lagw3nnicvfo5an7aohjv5fiewxahsm9xp7dthubufa0kjs02pk1375ufy1tm0facwm47klyes1hic8rtiiy1rbgj9311ldt4xigfmyozu5a0vq4gvcazhkd7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: null,
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '7vtw008yra5un49uwivu',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 20:48:52',
                executionMonitoringStartAt: '2020-07-15 15:27:17',
                executionMonitoringEndAt: '2020-07-16 03:29:38',
                status: 'UNKNOWN',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'z0vzsd6bzk16uaq6zospdo71qf50u63bwse59g2j4n37yqzk0wrkpwzwy0wpw86ewk6tg1dozatnf8e5sx199s1600htpwetssfai531u9ijurarxzludw74aqfmy4223qvws1mbqnbj7hahmg8wg8q92ejvkm9l',
                channelComponent: '59iwm6u9or7yna9a9a981oinzqiskuw8zdfx888h1zklfmzip8x5312ow5mi68q9s76tni03r9zsmzgxlb3toe6pi4hshpoaulmwez6ctn04pe7xve2q7tvom9hb8yr8myq6lj0t719tszbethevknpoagg9lk21',
                channelName: 'ctkltypfdklhdv8c71a0mjsy1gaglxfxhhm3filii4cvdag856h8qcbdps6mykhjon3i4t9n1v02vbjapph7x1pge0c9mdf8u37j0lzuj95kwb6x6sffwdj4y9236v3dqalcm81w7y083ofrz13g7umyt8wa09vw',
                detail: 'Error dolore nam aut voluptatibus quam aliquam incidunt ut. Adipisci dolore tenetur. Minus iusto nihil necessitatibus ipsa aperiam.',
                example: 'ouplzz45f277xdi3g2wi9phy26zuggq0a73odyalodl0855ohdzapn9hg4x7miswcxyhfm6ygveziv4icihjg837q6j6oonnoih1h0y3u69zdq9mu8wzf0h8bqcuu4cvrg3yxpop9pajxxq7q054k54soua988zu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'hrbhr6rtkn2u32sztvi0',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 14:45:02',
                executionMonitoringStartAt: '2020-07-15 20:03:21',
                executionMonitoringEndAt: '2020-07-15 19:19:06',
                status: 'INACTIVE',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'xh88g03pord4tupanl3ntxbb4v9j4l2h3dni9lksf6jlkilj1shwqldci5gbrhc87i5fzcie11tzdjg73xhfjjryscpkwnbfkobgfdd5jinf4voe9hdnw4kojqd4utoexhi0pig39hnvq5wup32jetyj54lnsybo',
                channelComponent: 'x1c2tremznpye3s0r6si0abwdev8ery3yhw6doh0sdvbjnfmxe7bgjozduiaoo4t1dgyf7bwwqvkgwp9u3d26kb72huwtl8ho9nlt2btietx3eo6bokzokn47o9htkdeezdysre8p1927pj3y1x479xnygik57mo',
                channelName: 'v2g4smuk45oq8bavkbpxn77om3o638ejn0qyxizv00y3irrbn3q4j6brb20xzjek8g3ngca3m0khe4ysos5qopo83ldi0yfcpbf3j38fcljnhxsns0xijneuwhb7jwnrwgnp3xhqmkyp70gce46tvill8rtuerme',
                detail: 'Quia non doloribus et distinctio similique neque repudiandae. Asperiores debitis ea voluptas perspiciatis et atque aliquam molestias doloribus. Facere nulla sint ut aliquid.',
                example: '2n2r3g4u51rsrclz0xwhcib9cc0im8ovjpqrcuytjj4rt38am4abzrjfggq3cdq9pj3kbsf6a85jkqxtlky3dyq9s2ops16swb973axz2cxcygmd5flqatmcttso9bdoxwihay2x9giv1fveheckn1iponey1xqn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: null,
                systemName: 'v6rn0568tk92f81anhop',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 07:42:00',
                executionMonitoringStartAt: '2020-07-16 00:34:58',
                executionMonitoringEndAt: '2020-07-16 08:04:33',
                status: 'INACTIVE',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'rtk6fqig2ob3yap1rxaqgu42eo2spgr7zbb8v36kpusyxy77zr57wryxbqyms6vrb0kvmdwgdbugt0c02n8e3bf9zo6nxuv0nu01wjwotev2y65xm9368ovs8ygtudnbb11q3r4thjsirvcjpgffx21pggrvds4f',
                channelComponent: '3sa1kdejljvbfu6bqq5g4zpn8ykndy7mqmwpefzt7c27y72dm603u5vtiq4nqt9sfhnj4j2zepcuuxi8is23ck55pt2xii9296d1hojhg19r0n9my5uvjfge8a7cnhgvh4fg2aohhurwawups6lqnhgkg8lb7wn0',
                channelName: 'pmpe0gh0ox5yeoz0vdn5a17yc8utpv0gzjdaed5q9uu5qgn4kzjwpgbc3rs6u81tyc8dxfloidzqxa3mvd5q3o8rc2vog9xqojrgdg42knfow1u4nfoim24q8tuqztja2jzp037qasn0fl92dcqnac6ur70163tk',
                detail: 'Enim nesciunt eos rerum recusandae ipsa eos ex illum. Nesciunt incidunt quae odit qui autem maxime alias illo facilis. Quia non ut suscipit sed nesciunt. Et et nemo non non repudiandae omnis. Consectetur exercitationem voluptas et fuga temporibus optio qui placeat voluptates.',
                example: 'jlf25t8sugyn7ifdkhf8ywum5weww1amcgsfviblt31ea2rafd5mm95nj9gaejqadg78f2o8omrly2b81e1uvqptgepnyc9mos1sneass3b615zvqx7oc44e3k9nssxs5snhm7393lxq5pxhu5c9fupwqiwkj6v1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                
                systemName: 'z3tfrrf6q1qbb00chfzs',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 14:30:13',
                executionMonitoringStartAt: '2020-07-15 19:03:42',
                executionMonitoringEndAt: '2020-07-16 04:12:06',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'xmgz1u42fatjqofjtfaf2hebjtp8um69v5ycavuugrcho5eh0nfvsr6rwdp0d1xwa1u4u54g0aijwnjk65o8mc92bjjmhunjit0sh4g3n43hxsbsclz7fgu5cyu9cltnpdobxiba6yns7xe30rdz6h03vs57oup4',
                channelComponent: 'd55p8529q3hn1q8ma6p2f68532ktedur2hymhvas6va6izwmx280v6u3b39zh79uubvemdpthtjk8vn3m73k5jzjv310ordej1ck1o0zecccb1gumn5906zmwko1yfvtniv52coc3ot5bn23njt7qujvjm611u7j',
                channelName: 'j3ytgujv96mgypg1wdraqh63yvxpifajnzwu5bl8omyinor8d9tko68nwgvcxj23uhpebya0vq0iu2lad69e1079xx8ewqho73bu6sqfmcshkkha0k08dxztqjrpntcum7rz2wtt42cwpfqz1ik7cbx5rho3rcab',
                detail: 'Odit quibusdam provident vitae. Distinctio qui earum nihil aspernatur maiores. Et aut voluptatem suscipit facere numquam. Qui quia facere. Fugit totam eos voluptatem ipsa perspiciatis amet sit quo unde.',
                example: 'aamtnf0oyn8r8u95vodgoo13nepugu72v0rbic57ui1ztpmtl9bpw280fb9xljrcoxt12hqnkv3x9lrms0008wq2vcgnt76m5dbsbcy24qw8pen6uc0sacp6lrelg3lubhxs2lmzvrknoa88amq0sacn8jgqj3av',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: null,
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 20:04:10',
                executionMonitoringStartAt: '2020-07-16 06:44:13',
                executionMonitoringEndAt: '2020-07-16 01:24:27',
                status: 'INACTIVE',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '6q3n5egbfa8we4sjuk1zqedln4co5zve9s2d9w0b2020i77upmb3034yp3xkv8tmetr0pucgyj4q606g7idbyw8rkzqbc8khj7nqgdwrrol4hfg07yco3a86xv9imgrqrakvp9sfeefuhkrxqp1urjibpjrdoq8d',
                channelComponent: 'k1civadx8rs4o00ydyzvxsp7fnvg7z2pzkxsuz9ns481wriumm4wcbqdma86e6v8ggpddifuas4sf336868f1sh8fc73xqni64ny2obst9f1128tr8m4y5eghij69pw003jpavdrowgcvcfmret2d2ik4aa74gp5',
                channelName: 'wsmmfqdoj7lxvjrotub36z03tt34linnjo71rbgt4jsq4z3602s2qjdbkgjjcgo1h6v93dew3od5y7y9oym64pifrs0dz07zpur8fmsfj8urqed0jqr98go86g5jzu3h2f0bpc1dqastj7begi7i7deglegdj65b',
                detail: 'Tempora molestias veritatis quos. A modi ut. Est accusantium qui modi laborum.',
                example: '8616zl3k5sk3ndo0v8y5kmbnt68jrhe521ahftfleg1woizuz0in1a8bcnerz91qawg1nn4y97z533zpb7lkm88refackovya9voxyjuq4odoj3idk94asjg3w70hno3cu161bsjadsahtdudyxi3ww0od4f73v9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:24:49',
                executionMonitoringStartAt: '2020-07-16 09:56:23',
                executionMonitoringEndAt: '2020-07-16 08:57:34',
                status: 'ERROR',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '0ou7ngmncfwstkwb8cdds0nzpblfx1xn5hmdryb6zj8pbgro7j09nxecjwidd6zxe5os3p2oaqx67mp7en29929un55zqvwrytozb719qg2svkow5ijqpuzfl6f59gslge0cbylc4l1m4n9ljeqnmrxivguzkbai',
                channelComponent: 'vgfvts8eefpppe8g5aku4ar4rtoq4m8yzgs4lf6z0vnfieadf4mklxqgeqf6ox2cb4f1kj1gww77xgmgr70ji4de1pey1j5o4hy4wy0fzf2eppkzrb6supzkn56n01ze1mlumgou7vcm3m7rq8in9zcphswwvigk',
                channelName: '9dxdfnd2gsdxvx4pq02vgmoo42sdi7s387gbau0xhyt8s6izbpkbbsuh8mra6z64mlzfk5wymzplq4e9qi39d1fzjlj17q9psu5fzfat4tqzx16b163u896ly6c32hcww2fby46dt70sm19lo5hlw4ob4s2lluey',
                detail: 'Sit consequatur autem nulla sit libero. Vero tempore sunt quibusdam eius. Sunt eaque dolorem rem. Non quaerat laudantium soluta.',
                example: 'a6173mnh1fkx0jiaopibsh0cklgc24mhzs75mtptnhmgg13zx9sqsml6zjmztqr7jcfuyv1ea4cadd3ll05cf7qc2e57jbnuxw7sefxxb2goxrtpeouljagawewkbug5r5g3h0b79jrjgxp6uqyfftgzok560hc9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'idkcjsqy06dn7q9czjgw',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:44:32',
                executionMonitoringStartAt: '2020-07-16 07:30:33',
                executionMonitoringEndAt: '2020-07-15 23:54:25',
                status: 'UNKNOWN',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'ljtn96s72l0lo3lxi0q4ea46v3i6nfmke79265y2rmih71iidei0bi0o8jxhz11kudef4eygmjt9gts1yl9vf3za8ay4r65zvi4mmfpw4mgv6sv0dg97hbkkwlmcfystouakg70h62io3yvekakadhihar94ff8y',
                channelComponent: 'isadlbr3rxmaw8fz5bxl2krbes7hrmvwcvs5j86xvrpcas8xlb57ggibibizmabpw948kfkmor9e6i332xr888cuxrvzpdxmo3d27mt4118mlj9qxh4gwial13cpxjec3cx87rhawwb8ky5rdj00p3qb2wyf6vp8',
                channelName: 'jf7syiu0w7bjjzzuytk39p2t80r5bytqdsx5c88kkyl5mjmid25esats2mdgmzzjy02zy0thbl6b6ak0im2llaa2b7ne9kv1k3m7y0ma3qhtwktcjyhmaw9b79uhwt18t5vbywamj2qpjpuphck2c1jcvt22ddiu',
                detail: 'Laborum ut eaque. Possimus non doloremque placeat omnis. Natus voluptatum corrupti repellendus corporis libero harum quas. Illo qui veniam porro voluptatibus ut tempora sed neque.',
                example: 'klv3ruicpklrcckkba3ukgvr0rm4g58cx1e8i1ne5ntsgrwoq3q3b7c59dftbgg36pyyq1vpm5rtr3obvzsj3va5am1yjh9wmxemm74e2eyqefznts3k0dorxxtkom283ynbw6otbvhivuztxa1mzhuaj5c444c9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '30zzckeurzk19rntvf4l',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:56:45',
                executionMonitoringStartAt: '2020-07-15 13:52:57',
                executionMonitoringEndAt: '2020-07-15 15:20:37',
                status: 'SUCCESSFUL',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '734tv2gfch97kwwjo94mbiiwitp6do56zowo13xjjckr998kwhgmd4jo2gm17oegpmrhcl4z01ykmw5q4ik2xag4pxltd0ieng0cmveobqcz6m96kqoobjpfiittt7hf1hnf1netkyt50z1r7j7dito94pmitxyn',
                channelComponent: 'k080gltt0uj08rlvl37cl88vzn2fx64v687ieaq73p0sdph9llu07l18jk8a2g2efhrgf0kstykzypuxl1dei1lp5ehh99waustlonkr5cn08x3f7lb90pnpfjdsb7zsbivza7go0prec74co38dklsj62oxyxng',
                channelName: 'zdbunnvkdwh15r6jopxzuduf9w2tt3hyb2g5p6tjmp95xf2wf6sz577w0zsrc08paaxz7cenkuhnsznekseup4ccrohmjfm71jum9ziuh3pbn8e15bcovy636a0hm9o6b0tloouwayqz83o7b0qxfv60wv51nu2t',
                detail: 'Nulla aut ipsa aut itaque animi. Eum tenetur mollitia autem ex necessitatibus dolor accusantium quo deserunt. Eius ducimus est ut.',
                example: '3blhgkkp0we8gjwogv2dzqzrrqyu7xgunm3exivh97fjtwcxaeh481xv2rmyysr4pvyzi50ro2yrzkow5lc4fxv8sb2heh3qwd7fvxkd3l5ja51n4uv4t7ib69g4nvneqy0bf4u5hvyjwmhya6lkv4mz0fd2uoyp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'n2nychuhzuia3hll3jiz',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: null,
                executionExecutedAt: '2020-07-15 13:36:36',
                executionMonitoringStartAt: '2020-07-16 03:52:38',
                executionMonitoringEndAt: '2020-07-16 09:14:46',
                status: 'UNKNOWN',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'q1326tpypj1futkx3trwjrwt27dliektrxzheebm2kbgaga149v9rkhb1j5qana1ozvmyxpg9rsmxyhqyah04e5hpis0ey44brs1lvrztvhnw5ea8dqcf5bx6f5n4a3wde5c8br0kxj46m1pyl6z01pfynpinyjo',
                channelComponent: '1rm2k4xq7gpmizfvpthan89n0su60n1lqwj666iq6cq627b2ihjo3jp6pvn95o1o6sj43j2ujhz6b2uyambpnknzdkjnz82j4wl5nbpqk3t2t3p36v3th19bt3u3dr4h6dnfwqgpd4dalu1arz41y1opzfasqmm6',
                channelName: 'zgbd81xwuvhhfdar4eg5hx7ox7x5qmcifexmyigoikshfkul2mibjgluy1716y5ngt4mrphp5pahfwywh2ety0kupdlk39tmvjvfp4l2z89i8cloz8s5zr0f5awhxvfadol4sdh6q60tyrqjg02u6gf52oi7gtwf',
                detail: 'Amet voluptas laboriosam temporibus architecto. Ut nobis provident nemo est veritatis. Illo eum dolore nisi culpa consectetur. Esse suscipit accusamus officiis ea excepturi omnis. Tenetur delectus eaque excepturi officia quod et dignissimos ut excepturi.',
                example: 'iucn8l8yc54sf3akpyiuhpiiz7np83uegdfulmj8d4tvugnqmtzl58jcnfozly15jn7m2902y2z4um9kp0kgxuftta096twu4i0qubj4xnlsx5ykisvxlheotrwjlspl7k2rr2pygfq7a6ma3xcklukn6ovbzs6v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'gv73etbpegfkou7ec4jj',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                
                executionExecutedAt: '2020-07-16 01:08:38',
                executionMonitoringStartAt: '2020-07-16 05:04:01',
                executionMonitoringEndAt: '2020-07-16 04:44:59',
                status: 'ERROR',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'j51qo2iw6kkysbo4atvnn75spd9pa7pedcr9z79308efk6dpqxooavnl1y4o2rlez7za6qitejqgdiv9w40hn55y0t9urtgal4k5b8uaun1choorxnjsafkugldo2lnf0n9yjfodkttn9oxe6qtklmnqos3fsqiv',
                channelComponent: '1758l2135d60c2kojmu0z4nk2f38m86jyh9j7rpfz3deal3z2cxqtp2b7d3hgx4qkwl1ad1s0v3v40cmde2jkhkocngziwnmzpk1pw2qropfy3q7jgy4fytx09umd53pj9tkd7avigw6tk8g0lhahgmaw8tnzkwn',
                channelName: '88391x3fii1yly0tj4thmsuj1atifdf0wuw8tw6588ogg6hpllm4ulvgll8rnpyyomho4zd1020qsrlsdcy9wj3q9ymb16dt64o4erypk1bp4wbo4jgi1g3djtwi5nxinu00ji2f3psg2dt6ck7y4oy7umynv06u',
                detail: 'Officiis nesciunt harum qui dicta esse ut. Laudantium autem labore voluptas quia voluptatem totam dolores magni. Minima consequatur eum accusamus impedit odit aliquam. Ea nisi a laudantium quisquam quas non impedit. Est molestiae enim dignissimos ut quos.',
                example: '5jjj78g8go4ahuq5k08kjeppzg7j9lozyhbimlccx5eulaqhqk5n8it5c6jbt7hke0ud2mlx4mnfn3tryun6le4tqftfza2jn2j34amszx5y57beoelhxzb4steceqrdkx8rzogtt5o16cgy1dk46qmgef053x3y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'l106ltspgyaaz2yad6bp',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-15 13:26:23',
                executionMonitoringEndAt: '2020-07-15 19:32:32',
                status: 'STOPPED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'izmra33dzvm5rhzt8n5ptdklpnqkuao1bti41sevu9ovlij9eyda78m0l9nrdgpvg2yczbrgna2mof3uow0p4txjp0ckij5snq7esrkpd9jk8zbyuuorj4cpgepd40are5qxcwk7n6pzoybd1m0ycik0fjbwx8sb',
                channelComponent: 'lynmmmho0scp1mj2hm3xt9eehyutw0li45iuttctddi3a68zumk5xyd44oghoakg9t9x1d537mctl8al528dmhpio1hvigiixc2ks7byv3p495z1mp7mmnjoufikbn8k26rhqyn0hxnn9vawbty2tpg377x3eaa3',
                channelName: '3gijp8g9wtocjsmcf99uk2ur6o53c7cej3v519kkzzdm9h70mjv9smzl1ms9ok7jh20d7f68psk7xolic2jq2rgv1mbefcoiqnl1rvjyom3ti6xw8xq59lsjfo7hhuy7wqd9ik2xyv09qhai449ghbxdnxvbi0wf',
                detail: 'Quia porro eaque enim odio delectus. Quos rerum quasi incidunt et minus magnam commodi. Voluptas ut quidem consequatur possimus qui dolores.',
                example: '296dg91pv69934v0qj298bfz3j07n5inmfo1mvs54ngj1mj0xronb0br34i4vbfhrjw8vura42kmos5vzdqqdgdmzhfw97stbvlrkcki0iyn2hsggbcpt3e9407ilplalvll8tjavrfi93i4su9r6xy21lp1hfxg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'y7k2koqd17ntrrab8af4',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-16 01:16:20',
                executionMonitoringEndAt: '2020-07-15 20:26:45',
                status: 'SUCCESSFUL',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'qqznx8spbrz8phvoa1ut95ocn037wxxgyat71k4ylqo7s6201bz1nbdoq1m59kcqyjzzyen3snbun2gsv8kg8bvigophj0lka6p1xzq3znijrv940q8fegtqpvcpoim6svnofauhva4kw8hsciifqxbraokkbgig',
                channelComponent: 'gi96ifzyem34olmu4tp2l0b2ut4rrshbn8g0g93ihctdv581r7tqzcb59j4oyzama31vpwid4t46g90r40iylu2o43l0l7l9u5ch0qlgwmpopqncnwwhng0h0kqu3v0gz7pea1dxbwzprxtqehgsafyd27sleo2d',
                channelName: 'c4m3mklzlkr4erh2x757e5tlxkv4mfcz3obhjd6y0tqyk4bq03j58fq5r9n2f4sx11vp11s249yts6mcvzeaoiofi4w9ljr31qv6d4ty1ovwefvvr889afd3euowfl7v0ql3ldniummskkjk4dr557gvneygeqr8',
                detail: 'Occaecati architecto pariatur non laboriosam dolor. Rerum accusamus dolorum quod numquam excepturi. Sit totam et et ullam. Et eveniet minus mollitia. Molestiae facere numquam itaque asperiores tempore alias. Non natus explicabo ducimus ea rerum.',
                example: 'iwrbn7bs9jn2aaqknmr0q66zmubztyw85pht5xllujgty0td8663viugqwrlaits22bdmmlcw24fh9h6aioz4cm4mqso2qzdkzvw7t4fzh26d479hkbij3o5djs6teeex3klld13z5ra7msw7g8ygsi1b6ehusgb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'vxz6afj9y4g6ey0uikc7',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:25:40',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-15 12:48:59',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'hsuz5fpb06z66tadg5uhsr6v44dytt86to6s3ldwjrdm419li0qqeeawwxghidftx7apuk8auyqgdrjym5x4m9quxw3u0h1j35a435xw5nmwn0774ef7com8cd3bidq9xeoecedp5kn3mp63ef8f8f5jh26b0dv0',
                channelComponent: '9j55174x89nyaig1i3efvge74njsxpuyg8mykgdg0f14n590tjo3i1xkvn8dagr3atjoumo76vszybdt6ukuz3vsypyruzvegh4g3i8khtenagt9y1mz0o1i7z7316yscv3d516db1vyzxmw6rbzfmezlbqtvxyn',
                channelName: 'naztn10002bvdve3emublkh1es8n7amlub9gi9vbnurt813ty1iib83nvn1h0393id4owhhu60zw4m26hru71y3u7lqswiz43fkljln07mbznto0vbo8b46ihgqqszuuk1prhzmbqwov4quo2110xqta4ibqwlij',
                detail: 'Beatae ratione et voluptatibus quae. Tenetur qui in dicta ut totam. Quam voluptatum eos quia atque ea beatae.',
                example: '4dwy70z8tybjiiuqcbdcdtz1yqfcyfbc743ewpqmsay6ab4c13hq4e54tb0z5ouqzttcwzd54wm9ry8pho3wyvpmgq29v69f5jcbj05dp48b63d1gapp7o4f1myo4ux1z5vlo1k4tbwn0weg8waow6wihajoaxzf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'aq8b7azmj6a2v55cw73e',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:36:21',
                
                executionMonitoringEndAt: '2020-07-16 02:33:55',
                status: 'STOPPED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'xxvr2c8vvxibkh2i4tbou61udi8yvv7u6v5ntongxsrwqbgbmwc58dvjoyts4lhobmtyld3cli9hnrewycd0knw8ticywfzp6on3ui0ugs3qs15il1k03k6h3f7qwn06w2o4uab0jy3bj9levzdq7ye5l9n6gnyj',
                channelComponent: 'k3t7pe1i8xs43ok38zjby8zrd6boxqmf6lpdfkhdxlstpx45t0ebi20uvd9161kf65ieaiywbmvk7qo4wvizgl1fgy83ywk6cihz1oxvlf6p2a5m8lp1vuk2u42boln24arv7t3qtsxno4ra88drmt12gjnh4768',
                channelName: '2jdxkdcgs4oiyq11u7m4bmicif174man9mmp089rp50d3ml7dd8cegg81ml2woipw3m3xe0bnkmyuvtqhwno12deohqrjkvuf8hi4d7jded6o3r8a0ycj8fdemmxhnlwohr6fo7o43wlawrqt1h0gusqtae17es7',
                detail: 'Saepe sed sed voluptas distinctio similique voluptatum. Enim id suscipit perspiciatis eligendi inventore. Consequatur eius quia similique quisquam laborum reprehenderit non. Eos itaque consequatur et.',
                example: '0n6bz2zz8l8e7i7f0snh7vsz26hjr19fhkqt1mmb8cdvmy3lod2nyn8r9utsa6urodo5034hb7385g4u5ydstnwfkn60r0g0dxw22ty1xt5mrfs235vexwj28x88ngvfadtdbhjexbqwcmf7z7boznhr85ejbsz7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'rdn21jznkt46bt62nz1n',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 05:50:14',
                executionMonitoringStartAt: '2020-07-16 07:55:26',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'vwmgaan5qnb8jdwvuw840p7hdx0xs36dsasns4uvdba0l51kamihja4ww10jgzl49k0wwuo8m4nogxylbwuatr441ph3aqhopn7io8oxdh1dlzvbuawnhrr1v4lm34m7q5l7rig8pkr954wx3ezkvmgy6mh1d509',
                channelComponent: 'b6k9fj1g221rierdncfh5mbjl35seslccs9oz72ccyu6oxpprjyu9i4my2l1itpktu2h8zy3zynl9ze1iv5go37xl9dfsdi606s2flz1v8c6xiv63viem4lxsz2dbwa1zq1m88s1ale2jgga0q6r01b0r2r62snq',
                channelName: '3bdggbygow6v1k5f5h8a4thbi02gljlw899gqkl1896eais285idt02syzmoygrb4gcf8gjvtdkt85q32vnayrdo6np51611ts949sp2jl2bpjy5selt3i7u0k7etikgifzo5wy06uqv05lnim297zt8fjgw2idr',
                detail: 'Omnis incidunt adipisci exercitationem perferendis. Cumque cum iure necessitatibus voluptate omnis. Dolore sunt saepe aut consequatur ea voluptas incidunt. Quia non rem quidem sint.',
                example: 'ml9p7x6qxm1pts31n9taykg0dg13x5qaj492g2m0r1tjqp1zmfelj7do7xkvpkkv0e3fyog6d5t8ejunuum0ojiitsnyjbkyx74tm33z5gpy35p0ctdipsrrvxdv5dacxlwbuvu2rjd3mwn3li2w146d6wpd73xm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'age93wabsf5246lq4lig',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 08:49:13',
                executionMonitoringStartAt: '2020-07-15 12:35:14',
                
                status: 'UNKNOWN',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'x33w9v5pxmbzgpmb31h9zuna8e6kks9nu7p5nrr818mojpxl6pq8623a22zpwevelb5pqm7r29m4kl0uapuek76qqo9hf5orchx4vmj2t7powgr3544i1ap7xzghzk5sdnyzp98ffohjgxko464o0b0hjm5flutg',
                channelComponent: 'yup9n7elcfg9efvpalenucf9myrvycyatkioh93hhwdef7b9zwjeep0dz1cvw7akvkycjyqfjddkbqchw38f464ycryjf9dj6d8lqvafghymcjlpbzldlmux9exvxuyw4rwb2c66mmab2a6o5c590al0stdy2ws7',
                channelName: 'kju3vox02u7f051quuyljf8stk43k5mrvbj0qkwo8zazsrivg3oeytkbsuu9y9kwk6uqp8riv4ksingmwpnu80qncba87qc42q2urhtgsf7ggl0vgckt50yumsy3tv1saa74qc3vhxjb8p0dupiigmwlaxvz3122',
                detail: 'Officiis perspiciatis accusamus qui aliquid quam eos mollitia. Eius ut ut ipsa iusto sunt officia assumenda explicabo ea. Tempora ad quisquam debitis ut consequatur itaque ut. Omnis suscipit fugiat vero ipsam neque. Totam in velit. Voluptatibus id aut.',
                example: 'xhmgql4u6c3vttniwrf3btyi9ir2pgpk8imhni1cjeiacs4rfbql80g9oqhrau0z7k3m14lsr7b7nu7om1ri7id34u4u7ysgzohsvtf874by9f10z0xetnvxyd2b471ktqb54cjcxal6s9bhavkexmbavp25dllp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'q27xq0s4a50jzmowym3g',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 16:56:49',
                executionMonitoringStartAt: '2020-07-16 08:43:22',
                executionMonitoringEndAt: '2020-07-16 09:56:00',
                status: null,
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '76z5k2j8bxfez8v68j41ic0kezm4vfwvx0rxhhm340sechwuem5xa6aupl5uhmflz3s3l3239pzv6r0yxdcpepzbuza7t3zo34ac5h4ccdk24s6ftmrvjjwxdz4m2q17dpyl3gclvqv4neh9ekeqger1d3spcawb',
                channelComponent: '3p9ox55ueekuzn9jqmikgdjix1lb0do6ef0w9y2owb7hrelmfj8ppfyaswqs23g0roy5dx5dujs560zgv0r3ehi9hnp871ogvacs8l5gtdlgidlt5674pdr5js911l4r9hlk51lzcemzovjsq5sw974dk08vnj10',
                channelName: 'jjdxtr5pk1acmztac0vvr9ui8p55zfhtn8j1hfh3hkbaay2j7tbvg5b0nb1h15778drq5ck9oe519s35dg4ki5m8dhdqbu7eohh062c5qaezcoth8tw8zvrxxyk1xon8jxr20n5qp41n23ax6898cp0hxy3wd39v',
                detail: 'Ut delectus earum sapiente. Autem unde eaque sed recusandae consequatur dolorem culpa occaecati voluptatem. Et dolor qui enim quaerat corrupti.',
                example: '7ajr66vtw3p0iaurm4e46c3u55ipbvi8ymdjp48yd4pibrmypv48kfj9f2abngdkkbr3qyv69re18pkv975ozp46l3ai91gr2uvbsek5v3vrg9cjdmvc6hbbcuh97anmbj5l6qlkx8ek8xfn76znqxrk29wezpeg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'uzxv75hwbxsxtc71ur9p',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 16:28:05',
                executionMonitoringStartAt: '2020-07-16 05:42:22',
                executionMonitoringEndAt: '2020-07-16 12:07:37',
                
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '7clsr40rcvsi52h2q5q0c3ofy00n8m98edva4rpxxr9wrxz5mg0m2joaaocad2ln38wlzw521tjrl67wio9zrxo1lfwiw6eif5o45ogf0ylbk94kh18nhbc7v7g5xyihd0msn12bbj8kjvxpzgw26vx1yzdbgu7e',
                channelComponent: 'nwnv18a76mzize885jwx9fovev7824mwtkfa0f91d5hv9w8ksh7durv0tp4nd3f755drh0onfokvdove19vfw95ux707lpc2v7h4tcrt44f6lv7oztraqyoom65ky85lkjibqzm69zm8hlrrrppqud7vh1o0va3f',
                channelName: 'ao1t8oehdabmumhfcrodex24lhlqy5lbvirufjfacwapeme04gluvmxvdtowigswav8qxgu7g1qbssee6uwqqojpy5au58x3ly2mltsefadn89vkw7b31ksnc24vdyqjdripmx8otsok9lktzqljvrpff3st1g7r',
                detail: 'Deserunt soluta debitis. A laudantium blanditiis rerum. Vel corporis exercitationem recusandae dolorem quae officiis ipsam. Fugiat totam ut dolores aut natus ipsam amet ut. Qui voluptate facere eum praesentium qui nisi aut voluptas. Consectetur dolorem ad quo.',
                example: 'quwstj7md8rk20u40z9gn97ti88wjm6yyj72h9nw6f7q0mxv08ras0cmz8xflqvgkzhqo2bzg2vidl0fkeg6r7t8td0hcb2j1ji5kmq4g6gah98dzj6c3a6m56ub16ppm0u3xn9p6dlocf5rlh6ijtab4vrjswld',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'jrgnhjlt75qmnglttwvz',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 05:02:41',
                executionMonitoringStartAt: '2020-07-15 13:03:44',
                executionMonitoringEndAt: '2020-07-15 14:27:34',
                status: 'UNREGISTERED',
                channelId: null,
                channelParty: 'iqm0hvzekee2negpr63kxlpgycxsprcan7pr28co73hk7ngxptbsfe1wwqrvxdl91qur5uu7dw4rcl0lqmy1gmlfdvx8m8im4blud32bke7aimwnzpostqru5ryqtv79jnw6ahmwx1blvzmm33hoqwo3s3898i56',
                channelComponent: '34fou1od6e69uv2yqjhm1vb4pdy92sw7h6ivkvgcyvel94ejotj6lb25lmyiqbomhjzui9nmi9q133s7n9wm5gx1m1stel5igbq9bdy9ai6mpkntwqnnl9liwzakogpu218drjg35k62sdzg36bg4nktgcxebbp7',
                channelName: 'nzpz5i3wa77kybyczexjcfxsdg759td8mmjttmezzbex261hvz4nrrgikxebcr0pmaroz0kxlszp7ysje5h2zryeohc2fng1skstsv7ytwd98odpwcv0cht8rkvqcoikwe3e1yp9d5xwr2dv9docblqhb8u9len5',
                detail: 'Minima illo odio enim fuga. Totam repellat repellendus eius iure. Maxime velit iusto. Veniam sapiente delectus veritatis aut veniam.',
                example: 'cspb1iq1l8okv48e4cov3fmnqimt2dyx6ayimtbqhd2s9wjly96uzzah9ox6vdk5nj3qz6glrkpc540vzgyeo5pxxrcl29rbgvnu24jf5f0vy1qrwe1kwj786nv2bm54n9ssx4cpjlrnzjgh7rww9oe69rf90438',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '69wlyzdfhen78xqida32',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:41:19',
                executionMonitoringStartAt: '2020-07-16 02:54:19',
                executionMonitoringEndAt: '2020-07-15 13:42:35',
                status: 'INACTIVE',
                
                channelParty: 'nfogtpck9amzfn2j29uyy3te87d9xgg41mtby03tsistbs9eqi0z43amxrq5vlyjkzajj9is6wf1l9dc63kkjmql9ffq0gv4tr37r19nulhrjh9ll45swwq5x6999jymhow27xfif5av0m0x686r4psr2sod1kb1',
                channelComponent: '94k5dhdftqsnidec431mmgog8314zdmbn0wziq9vw2nivwsirnv26h452r0da229mmfpovtqa4h7u3zggx6p6xrevxvovmo1ffj696fxaguafz2z597uk376uzk9dz6wao7hflgljc0on556n8lfho2fr6f45rmm',
                channelName: 'xpl9qt0xchy7nere8sle1so9b6po8u8kp1910782dbdf2tobcliqgr97jei6hudyqo8iv4e211osol0po84qi66ztdm9yb9sch5u1t3vg4gj5bk1ep65r7u0v4bsfhb4p3rh3lvprhfb9lxlv4nb5kexwr07jef1',
                detail: 'Nihil qui qui culpa modi qui non asperiores alias. Perspiciatis saepe et sed cupiditate excepturi non ut. Culpa dolor vero quisquam. Ut et est deleniti eligendi.',
                example: 'zmi7vnt42tbjsgykj9xxfmo77ayebc0gy7c589i63ubme32xpro8qfp2yj2lr4p5t43zgxgrqtda1fns46a9kh2kw4m8hbgh8kf4wep5bd7h30xw4yayxc48zyiw226zzn1f2rtvd2stoolfd3ms70bm9h9ptm63',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'jeg3rv0r2nhea3hpwf8x',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 19:06:41',
                executionMonitoringStartAt: '2020-07-15 16:04:13',
                executionMonitoringEndAt: '2020-07-15 20:05:34',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'vn7qdqj60r7kockqxdut0cilqypcqrslvlla6o9h1cpn4i5wrlu066t56w151bsx369ygmhtky3o04wyasyp0kvk0ahr4ofs57bqx94s24ir8cshz5xiibbkmf6snmvn4x6tyrx6yt6dpurlpjzkykjzm6vsxfx3',
                channelComponent: null,
                channelName: 'kqqoah36lkpqqbdrwmrkv2jwg94tiod0qb8805n2eusx4ai4e4fsg9pyyl921gcl09prmbdt94kj97c3w9ych2s1h845ebvhxfi5sviqm7g9d46aekse11hp7jah48mdjt26z5tqvu613gm6sha1jybrdruvkvqh',
                detail: 'Saepe sed consequuntur provident cumque velit eos minima. Occaecati magni eum. Sequi dolore reiciendis cumque neque quibusdam sunt architecto dolorum.',
                example: 'fxp3z4p7balgplvc2i8c4grqbtut2o6pjd0fp8ks4dng4renxmbia5dub47kk4sisy9yp6xmit1b3io3qj493qjxe2uq7489g3gn3ob2gy40ftngm1yygrqqwvz9h7hrkj2h91b934gmnvmthcnb78jddnd65orv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'rxhhwmg20six9gbrzspk',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 20:35:52',
                executionMonitoringStartAt: '2020-07-15 15:32:57',
                executionMonitoringEndAt: '2020-07-16 06:35:06',
                status: 'STOPPED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '5jztrrle946kxv2zzacpk27yil79mirgfqfemqy9xjvqx1ld8eg0q3ytx3jexslwrplwxpiqcosztu2023wu5909igi523qwqqnojtl6ie2fv9eafmh3dp1euacnr1q9zf6gu7fmn4thgvudmxfmscgbcrht6y0p',
                
                channelName: 'msed4l0j4jsi4s4h0pfypdyl5pjvopvfavxt5bzzf062we90ywlklqps1xgp56gdfez0ydxhfwvlpeqqxhp31bbjubx92b4jdivv37cb2u8udaiqhzwwioafqehou47j6wv6edwfitkvz0nvpoixnfj62jc6lp46',
                detail: 'Et et vel aliquid quia autem numquam harum. Est et deserunt sit. Enim quia delectus et id odit rerum. Repudiandae consequatur ipsum doloremque nihil quo debitis labore error. Expedita quia minima corporis autem voluptatem aspernatur eos adipisci. Labore nobis error.',
                example: 'iqoxj7i6sdmetaqffpu5tua2xeo2o7dcp8h2vqjd67gnjlvv71da58sgnp0r5nbupx9ck4v2pq5g3bry7mzrth1kzy49qtur3gr6azbmwwckan7jqkwh7c8rtrbt6z3cznq5fnp7t2tyb51p0zy50dyencvej43u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '8cqy1betefg8f6v7ctfu',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 20:31:56',
                executionMonitoringStartAt: '2020-07-16 11:56:53',
                executionMonitoringEndAt: '2020-07-16 10:54:56',
                status: 'UNKNOWN',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '0xbwknlw1b66tgd0vlqkqamtifdvh3l1d4go78iuvle8h4d922kj5l18k5k1at58tp6bdj28vxx2e6j78rwc4oweso9bi0vrpmh3clezzom4cgd3v9ppatuaz49zd8ygjs8n50gcqqytv4cbn8q44b6f62tjb6vl',
                channelComponent: 'zmmt8oyhb0jol8sr3thpcnv3dphcubi7py4r2s57aey6onpzo8t4za43k3x88re75ins7tryl1b33qdaef9vvo3o6ozalmoim4l2ol2ypdxw9leeiwmm49i0fh9hjme9of8iq3ikb6g6ym5jz6imvptjkc5ulq1q',
                channelName: null,
                detail: 'Nam omnis velit et necessitatibus et. Hic ut architecto ut consequuntur quidem sit totam qui nihil. Velit quibusdam odio beatae voluptatum ea. Autem saepe sed necessitatibus consequatur. Sunt sit quis expedita explicabo commodi aperiam autem tenetur ipsa.',
                example: '92ynbil7ftsp5c5r39qvsz34gsbqqgn73fsuzbdv0dmjf72xsbn3t0nvyhtv54cakvuucspmxz2opkumgvdz4ese7y2u3a9ho7mzs5k8p7ojl5yliot6hs57sowohbjanhhxk1jnkb1djpe6v90slivap2j603g5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '9b4t0h827c35zw2144an',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:43:17',
                executionMonitoringStartAt: '2020-07-15 20:17:27',
                executionMonitoringEndAt: '2020-07-15 16:21:18',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '8dfz5yihmhv23mra061646hnfldf711aeapffpsna5r5eq5ezxxctdx0daflgg6j56jqntqllteduu3v1ukmvpoffohf0i1782wj6o4rsszaae7j6wcsh5nbs14rox6iiocw13xty7jia9fnnpvq6feonj7oirqb',
                channelComponent: 'oof5souq8707j4zddw7fixdpksgxbqhki12u4v0bpk9rwjqpah17236ytmvfkw8c174udskfvp1yd3of0mvk2w4l5dxylsqam5q68eas695133pbvinju4n7s60dazubrpyvaox80sue3wp3xy9qorsw4ue6drn0',
                
                detail: 'Beatae optio porro eveniet rem dolor consequatur. Repellat sapiente blanditiis voluptatem tenetur repellat. Explicabo nihil quisquam saepe nobis. Non architecto atque ea earum blanditiis.',
                example: '7lxbfomevxehsnuami4lk6imf1nuzr2hqr31y9f5ay0hu4dcojhnfqlbg6puzb450qbyoismoogq5ksbvppkp7ypodwqic4af23mqugh53jocvln7hrd7dg0h6xsh78jl01cuc6hv9je8uran5c7w7asfii8anjh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'quf4hhpjj7h4jtz3f68gqamn3h3gqqwfgj68a',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'oiczib9830e49gepx0t5',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 13:36:11',
                executionMonitoringStartAt: '2020-07-16 04:52:48',
                executionMonitoringEndAt: '2020-07-15 23:34:16',
                status: 'ERROR',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '98ggba2bpk5pg6feontg2kusf8v3mlt64bmkn8yocd4lfpc4d72ycqvtes6wy5s2ty2x1ug153pt2dh84944gw4q1heoubj1mujl89ttjjkvu12l1zfze3lrynmfydtbn1a79nmrfgz85dd6ave3lbq83jsr7964',
                channelComponent: 'ijk43z4j4j9w79isffo680krmbwc5rgbo2js6x7q2z3adp0i7leys7eeseee5k9osm3ekty732bv0oawvt3elv2furuzw3oybghk6mxdqbtu21yuoi6s90ip3q1083l40ee7wzkifhvb3uomnb6leceeu4utpo02',
                channelName: '8ekw0xsogpeoqqi2mm74g4ok8zp1bz8botagqoi0l2wnbm9sh0zh7hp3v4ygsq6krx2qt37fku6np9r3wo7ghvtwtajx541d81budz13luj2vepxtvoaab4hcdv0roj2l6ufyuz8ihu2w4hidzzpubjy5wxtmfuq',
                detail: 'Officiis nisi nesciunt voluptates aspernatur saepe. Expedita veniam animi optio. Non occaecati necessitatibus mollitia cumque ducimus quasi cupiditate eaque est. Iste accusantium ipsa. Ut quisquam sit numquam sit debitis qui nisi autem accusamus. Similique ipsum beatae quos eum neque omnis.',
                example: 'lyyep7ja80qkq5iclj3o5sqbn8zgber9iwxxmso7t7dn8vxngobvylc0899lgt1bupyoeuhk6ck2dfoi46nuyic1krmszxfnc49mo11g06btplkyeqefczur6ymggfx8tsxbp1i2f9h6cwx28u400y8th3l5yg6e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: 'ot9z8q10ga6ys1c8uhey6asfr8koyqadvpkzm',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'q2xx2qso77evs9yiskzb',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 13:48:06',
                executionMonitoringStartAt: '2020-07-15 21:57:45',
                executionMonitoringEndAt: '2020-07-16 02:11:21',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '2xopdhv4dr0r8si6sgilt5q5ib4qvd3m3jm1ss34vf8n0jusansritxs1lkt7sspzwkm9yask0icpnp6who0alytq75p2us1eyagddr086759b9zfbgl9oxcnov7a1nxrxvj3aegqcj6rdtet2se02qginssf6ff',
                channelComponent: 's1rmgh923f6wswkg24uqyj2bqgqf21v9rpygrkb2bkf0tko15yt0y86ok6byf8ts4cog9s3a5sfqt15oqqctlscak3mstefm93s5gm1m4uycwx4uoozhc93gtrdotuhnbxue9auh1qsx9vrq3ms9n17h3vf9tmg5',
                channelName: 'q94v0isliwiboryeflfaikpsmo7vbch7uv88ye23sw243iqcukadrjhh90w5tx2qpf0axsi5vdypq2z50mfik46lcbg5dexb92474tc27onhx99v3cp4o5m4r40ndcctijuw4vaq6tkl5m42kqh3ft0sb00la82k',
                detail: 'Et at fugit assumenda itaque. Rem vero minima non error aut. Aut excepturi consectetur maiores consequatur repellendus qui et quasi numquam.',
                example: 'x8mryhkrklzwqcoo9rv1gd0xc3reirij8p22pd460q09fx9sm986q6n6lza468n045wyta75g194ghim6rx2l1uihqwnbhi8xhvdr6f8lmsul0egw7eekt40892yvv5hpb2d9ddxrk4m46wbp673qcihxj5saz0e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: 'h58ydbwgr7xqmqm0pm0hq9k82rhfgmj1ea618',
                systemName: 'vxfvmsbpfi4tmn0uxb7r',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:15:48',
                executionMonitoringStartAt: '2020-07-15 18:10:40',
                executionMonitoringEndAt: '2020-07-16 11:37:30',
                status: 'ERROR',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'hy0r3qp5e5wn58beelsfxbx43s2uhq5fwsrarln0gle2r8i7vljje0x6f6tsonmqsgw55wxbjppa913xncwvnt9t50uxoiclxc0mropyurb3owystaed18ncija8njmbejml54zot6bwnvnk040pa1bjgfi64cxd',
                channelComponent: 'w2yxgzh2ticgq8jqzs8dbis92o4044r88eio37wc5x0dikt1ig5wu2t0437r4wyrzqpu68nl6itrs8zz5pugo2szt7hb9aklvwr4i0stwcuoo2nlt17k1ael3cpc9go16sgf5xg331q8e6cwryxde69g93fa6hql',
                channelName: 's871vs9qkgmx2sktrwi7j0y52nhxpvegkbd8nwh0kzdhviy4yfmprr3f0fs7vko3vmmot8c2f35afj6x1cms2mdtm2yxv43lwbgszg10douuadk1bxm1wlhftkmrhsgtbcg4sc9bttx1aly8d6muxi72rq3h1o4x',
                detail: 'Exercitationem aut doloremque non. Laudantium eveniet praesentium quibusdam consequatur quas voluptatem. Expedita amet dolor voluptate optio quam et veniam sunt.',
                example: 'v03egt61rzkpfqx9kxt5gl0n5dewerflpptohs75cflst8hcmxjb60ecdoodofmczuws239wnkkkvfkol08gxvfnv5oqygxbcupew982guz2u6jfrj1kcig7qlhdcg66nq4utrzih21i50fcepk29xx0rocm050z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '0k5m7vybj841uoh65mhm',
                executionId: 'kqalug0g36ncksslk70yejhk0rz8mmphrjgkp',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 17:35:51',
                executionMonitoringStartAt: '2020-07-15 13:26:02',
                executionMonitoringEndAt: '2020-07-15 14:48:21',
                status: 'ERROR',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'jtdksynn579odokeahalivqo6w2dbdo60lgjamgojj28saiqq0ailmt0yyb1py7rn9mjpzub9eccf1h4c4lz5odl660bs6kx4w2v8m4g2vhazonpophd7c8a4fbd5x2i7rlmn4sji2lbk2rgk6d5suc3xx0sydeq',
                channelComponent: 'cx9gevql4kt5iwvbzwtgsedqdkbx9llazm23q4pt7mpbsis7bgc7sllomx5bycvjzelluhs4xaxmcafe0no6e1xzye307erf3xy5d3yqlj1fiboj9fq2daqta7h2aoyizvkrtm1z4l320d0dis9wvccignztg09r',
                channelName: 'cj6episcnehrg90wsnfad8ignmrz28ikcv9s81n1vyq478da4juvs0ugcrp45sw3167ds5vjjxq6cc4vcv28fn9vamdfel9u4bow5upa885gzmv18fglyxrt9bnqjne5sr83qg6glh5m3hbpl5gv6ihpmd2ozmgh',
                detail: 'Sed molestiae deserunt asperiores et dignissimos. Laborum quia numquam. Quis explicabo sed ut veritatis nesciunt dolores soluta est laboriosam. Aut ex nihil qui eos sed.',
                example: 'ke2z49pp4mq19yply1no10draotlyoc97xtgx1r2egplww0rlods3pf0ou89yshc3roy4ari3tb3k6sypg2y4twu0yvg6sjrw18rms2cc90teydojpyhtout1a2iy6x6kzrgb1vfrkxd83sfo207yg3z5ycgkama',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'otw6yep6kxvv1d2mbwsm',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:34:23',
                executionMonitoringStartAt: '2020-07-15 21:22:07',
                executionMonitoringEndAt: '2020-07-16 06:19:01',
                status: 'SUCCESSFUL',
                channelId: '7v77480o3q94uv1nsz4dhxu10qxrl1hxuvv64',
                channelParty: 'jdjeryclwm4dzzh9ev7enfq2qkon23kcgh85q8pkxewvf9je5u5476738fp98vsd0t9ddfgo0v7zp8lr0uf6r5ye4idpafcb3hv3bz5fco33oi8w102ii4qr4naum3dyfk4sbtb4f9r4y0g8wwpzdl00zj2hokm7',
                channelComponent: '5kvcjyptpa7t83g7156qpqqy2pyn23uvwgqhc1pww6wm4061thpmfjfp2qylfcmmtur0yde84kw2zy5vx36sbe4e36p9ztyvoscc9yfs4mtgl5k045yvczv31kedgkoj7p90mhy8x1pp7bh61azjxqx0o4lmfmsi',
                channelName: 'vgl4rsoz5kn6rll0eqzt36zg832w4q0aos1eiqodvr5q81ay83run4sqaa7171hphr2475lrw4lxyfhc9ox1t93295g64g5zqpi8zo59c8wae7t305shdy6ydgfto9zm69x9ngorfg1cyqyt23v4s5q045eizlsw',
                detail: 'Dolor tempore nobis est veritatis et harum. Quia dolores magnam dolorem eum ea iure ex. Repudiandae voluptatem nesciunt nobis. Ad quam ex quia dolorum et pariatur dicta officia ipsam. Similique earum qui quas esse ipsa ab nihil sunt.',
                example: 'eagjigtkqtxe2t6rq9zjqvs6qscdfqzgiamhbrednmqcgdob30q6yxnypoobzytyov4c1brw7skw8mix9trg8ugsezp4qff1booqe8jm6g8ljwagskxukcr5c94xehy5hyzej2wwirw3gmseicebzhp1d7kcmnm3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'frdpfniwky607q8exvnhe',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:17:08',
                executionMonitoringStartAt: '2020-07-16 08:54:50',
                executionMonitoringEndAt: '2020-07-16 02:24:50',
                status: 'INACTIVE',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'qv45y2g57c54cdvc6sgv9tqr5bjez6tsg2rb21f8g6kbg7zd1lst7lj1n1yc17p4wsdi36qmi8y7m271a13vwbj1mon2fl2k8fq8494ujhkotwly8gajx4dv56mbytx1oefmljw54mtcxx51l2sydlw445vda2ox',
                channelComponent: '663unl8j77bb4ipycr5k1yvh0vz4q4do1kd70197azylkx84p0m4drt63p6yvtm719t5mx0qichfg46tnlmkbkdhbf831549yzb48xj0qk82hupsae9p3keozbp6kzaqtz1f5x8m8xef7fv0r03ocu4cp7vjxx7h',
                channelName: '351x38tcad318a7cmlbcmijvkfdurk3bzipb7q97ip19myrwk9hvgptdbvewho7j5mc8m8ccjkivi9p2k12la51le7dmj1cf7kyx5w3776o6ynout29a0ysmg420wurt8wvqs2cpt213y4o3icaxxi3g16s65ilm',
                detail: 'Necessitatibus natus fuga blanditiis consequatur. Rem ipsa commodi maxime id porro quam voluptatem officia cumque. Repudiandae illum qui.',
                example: 'crwjxde69swyqo7mif2ca9mjnklvnwgkfrryi9409w5k6xyaat0qxbnm3y3p98sbhonzfw0yrsesnwg2qpuv11e5yqr528kukdbavg7eookk9mquc9sovwuh4zfl3sg4qd4rq23lo4u6qey5grgyp0ysgd8i64fu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '1hgak74pgjdvfgqcowsm',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:37:28',
                executionMonitoringStartAt: '2020-07-15 20:40:54',
                executionMonitoringEndAt: '2020-07-16 08:01:58',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'psmlss1g0q72aq4e2pm6straprzpu8nfef1ikfnjmaxwwzkk9p79uf7013kozgyaho0asnuia0itciux20qi7hg2v890yuvnzfprodz9zamkem09y9bbtv88ro56vu8yfsshu04c33a7rcef7gj3h7h84p3hjsoif',
                channelComponent: 'lo59ylbzlsvncoym97mbcril3k1ka8ce2oschs4o609lct7pw7jpz46kmvlxqfypfd04hlfcf8bpm0v5kra1qy5h0nqym08clpobccreskd04f88u4mpp25b8o3wc0pj9vqj5bdr1craf9wrvj3fvhmk3cm4jtyb',
                channelName: 'pd0p8y7kx92o6sxv91x616chjz834u68lvqw80bheoltndgrftvc1jbg1a5baff5q7d57o5lroge3mc8unbivvg7x7cexum84pd4475qnf7ss3e3zllra8gwnfuzsxvcovbcwfna6dwwff5pt8m9tfu9koqo0fr7',
                detail: 'In et nam sed. Culpa aliquam iste. Repellendus magni sed officiis reprehenderit illo.',
                example: 'wk0bh01u0xdxz85gysaxi0x698klopndxivw785s2rwtu8u3e4ixq8li65fyouazvkbg2pd69e8xp658pj5m81akzv8x25usvsomgpq4aqmfdy0t7z31hn5xzg9mfj0w0l49eifz96f88bhiwvrivjwtvnv2ij0e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'wsqqwunvcxd41wrzlxx8',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:07:14',
                executionMonitoringStartAt: '2020-07-15 18:04:37',
                executionMonitoringEndAt: '2020-07-16 03:54:27',
                status: 'STOPPED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '4dcvnzuxyza2of9g8lukf6mmtlx87ya2ronklft3f4zhzogam1ge5ko2v87eio1u87f6f6rkk8texxo7vuhxj8bn5qcl8ng7gcglyu8x0exepute07x6xgzev7biunxzeyftrh84xtv5g54tgj47a8qdbnqxok4y',
                channelComponent: 'dgajzp6lfff3vhh6tis2v267idhqd0bx7zyzpqk7v49yrnurbzcx5b8ngvo9lo8a6exfoag1ahsbgfubiu263eu4e93z0dpdmrxmnk2wuctiboumznupxsd3fec6vgm63o68mr11a60dr5qmxxkscq7f8qdclr2oz',
                channelName: 'wb5eh0vpzd1i7ap5wn5jpjerd29vz6uh0uiuo7crxcpq3bbwd1qb81otermftfk7wj0e0thoiyf80h4dk7t1iad9bcf1r70x9j1rn2vzruh5ceo5lntwap09fpsczd2joirnlhbsl190n8j3iffbewnuzk0y0dzn',
                detail: 'Est ea vitae velit. A iusto sint libero adipisci iusto eaque culpa molestiae minus. Accusantium saepe nostrum et. Eos vel ducimus aspernatur illo in consequuntur dolorem unde quo. Consequatur vel totam.',
                example: '3y0vlefr5drsmamysdgrj4m4lkp33hf6gulfjp5psis7whk6efhu747hv5enawniwnndgcojqugk9wzx45yr0h0k1wn59rrcj0zxzrbcvqit08lflgeykaeocyflelwxazh7ealainfjjjspa3fd78ivrkq2jxcn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'optw85y1de3ro5060v4y',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:01:36',
                executionMonitoringStartAt: '2020-07-16 08:36:01',
                executionMonitoringEndAt: '2020-07-15 21:22:00',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'u4r3uquo5va386f72hrm8ky5x5g243gvpjf7o8m2a8lrzsleghk3lypiv3hfq6np83jq4983qrpa2s1fos925a4pcney7cj5nmv4s4kyr9kqq13sqpkk05czphovzp7azypiidfbu1zal4nfx7xhfkswd5b3gh0u',
                channelComponent: 'mjd8hescfirtjno060zv2wf9gsutgetgxyccudx6kq3pkh79r4drblmwzlxptiiw37dh2u4ve8nfim0w2o9dbh902vgl154yfal4pscjvzh8knrmzolzle9l3dible9si3dt5u66rd2grb2k36xitwi8p8r8zmjp',
                channelName: '12a7zny43qb7wd42fhl2lus7zf1aur93gza7eadbdzg84nattxyivl47yxetbxelrulktxqjwqjirweu2c3mw20b4y7bfobnnxwbve3zpvfz55fzmwjtikipjtmhg0j9qpay7fdk3g54qm7sfr0qv7bnb65ztkkof',
                detail: 'Rerum eveniet consequatur dicta aliquam saepe non quos quae qui. Hic voluptatum aut deserunt esse molestiae distinctio. Hic veritatis amet deserunt ut vitae beatae sit. Repudiandae quis eveniet sint sed. Nostrum temporibus cupiditate eos est id ex iste iste. Dolorem sed est dolores sapiente error ullam.',
                example: 'g8s8joitb4lpoos0ihpuwnt6tl77a48fdwy0hs5cunrz14c2kn7iykfdkg0u017mynlzogp7subf9k0xvhmebe802av6piiykvt1jmn6057m7ofp5kb1u8exi4glcce1sakeyb93jfbavtjjv47egk4zlfrsbcol',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'spj24bbb2gx78g0ksgy6',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 14:39:55',
                executionMonitoringStartAt: '2020-07-15 17:27:48',
                executionMonitoringEndAt: '2020-07-16 02:00:29',
                status: 'ERROR',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'eysxclpqn2k5mkbtx02fz8pjc02x02dipyvrw080ilp33zvpmwi9cs5lz6rbklsyuxqze2fjfis4d7dbzehsfpmc68aei8mvmqy4ohp3v1w43d17hi7xch1t90hsje6k8s5nsa1ydfrhb721f77nentmccml8ex9',
                channelComponent: '0hrk2ut0v1d2na82xdss4yj27brzsx627d6168u76b5li2d9o9zmr2z8cexp1qxet76my5m3yo74a16f4obqboxfv8atk72u7fbzktss60alr1ou4xl18fzqtr6uikqu2otp04z0it0mgdbprxpp61ood7fujlik',
                channelName: 'sweqrijulmyif7qwjb95vthtzcav970qk2hrms38zyqr6bmrhvh0b0i780ulkr85xq5lnoortpokm155wdop8h6t2r91yrejgfa0j4e8f5f63optuo5wjkwlx1os0z78ehnszha6t5yyges45c80j59m0p0hgeqy',
                detail: 'Porro a veritatis. Qui quis optio voluptas ex. Est et modi modi praesentium est optio distinctio blanditiis illo. Laborum in quo voluptate voluptates possimus non. In et harum cumque veniam quo animi itaque.',
                example: 'e05ewudxpei0yuo9dmr1r6no33bx3wfhb2gtpl0rqfedrwbz82s4vcwt5uxn3mlj2xf8lhanq6cuytr40a794wjauear66lpnc6wof3ns56145f5mctsmx0qsot3731e7hvu10dkg3dgymiq6l80crlflvz6bsa9d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExample is too large, has a maximum length of 160');
            });
    });
    

    

    

    

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '2tl47jupsrwtgioh2omw',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-16 05:46:05',
                executionMonitoringStartAt: '2020-07-16 07:19:52',
                executionMonitoringEndAt: '2020-07-16 00:54:23',
                status: 'SUCCESSFUL',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'kfy11vgajkvbzc7vxpyr7dtv6w5t409bjm13h7gnlsvwe571lkgl6an2waj4uw22ungr4t5wpsgvux1sisdpxjht0ipe94d7ouyglukyiijlfd09e68b616vzf82pxqsuqin5yw535mpz2r3h31g6bigb53yzfr9',
                channelComponent: '5nbz14vfcnyg7zz3fy9oid5v20byksvaqu8djm5i29665p9nry025yjcefe4t2wgr7s0euu8o6ayjv7gakbxc54pa1sm244uhevv5v3yiecf6ls26p976w7nsb0djnbmt6p290eh5yx52pasaps3oyia68hr38w8',
                channelName: 'rtaciw0ye7keuvtrdh5r21aiw4jdv99blfkrziiiaahyduybtrgz2eniy27mjmfoet3imk8ue0u8774myue5g5tqbh6r2vebnfodf5uvneh4zrt0ptsjy7drq3rbb0ehynd8tzul24w5xctbsos90anknucik0rm',
                detail: 'Recusandae exercitationem iure in fuga. Perferendis consequatur repudiandae repellat possimus beatae alias culpa adipisci sint. Vero voluptate qui quia laboriosam. Fugiat eligendi dolore temporibus in et itaque distinctio sit. Quo dolorem voluptatibus sint molestiae saepe quam facilis. Eveniet sed distinctio excepturi.',
                example: '7tdw5nqi9bjo5et7hl8yhc4si32wkzqnpfun07ah3bex87gbhnsy1yveyzdm2bhopp1ac8f4oeko11rimaih53yf5zet035058rg1h1r15h6jtxgb758ib117kaeoxrposqns51mi7o4k3sk7hum8w3o51ge39xl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'jhqt6difkq37vqircaxg',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 05:13:22',
                executionMonitoringStartAt: '2020-07-15 12:23:27',
                executionMonitoringEndAt: '2020-07-16 04:12:16',
                status: 'XXXX',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'ybex00o2wizlciocvv07hevbu374gskwy0562xeqh5hqcxldqaps1lep58e2g2h146o6xwr66cj3lkgfkpb6r8vy081kzm90nem8sg68s1i96i801nwpz1piu4kahiddyj4u3xda0aivp9ixb0jlsccfj3cg4ee4',
                channelComponent: 'rrbyvz51ivtz5bg54usob9kxh1lqikiqyzqyblyuoh8rje99dw9yw3ecixotoxtzu3yuk7z4epsfz7dwhehqqq4l013iumy0d05ymmy30zfraui5pyq3tx6xx0ms85tgsr2ojgbx15ze8tjl3d3lh40mggv0dg3v',
                channelName: '9imin2dh2ywfqjby3txsp3jx9xf5pau1dcvk33hw8rqwnd66wc4pbfn1y8pdi6a1qu8h9fwp0786ovoyidungan01szub7bg4wx5ocvc4q013yqiuvf87y9r64s05m5vp9y6y3ips2mz0gfn9p4br0e3kpuvxb3m',
                detail: 'Nihil deleniti fuga impedit. Ea iste assumenda consequuntur ducimus neque quasi. Omnis et eveniet incidunt officia ut soluta et.',
                example: 'gj0da7l3x0sj5czkny7tucu6q9a2rr6vcxnvpcf6dc1kx8anz6omr1p52qgo1eboaxzlymx4gdzjaw9xtudr3l6hp6a9akvagqlv68zxcwb7zb3yzdlzc98i8uur70f13ho7uyeievrkckgpu9p2jyff429cvnnq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'k0o0jwzh1z9zqq0sbylf',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 07:51:42',
                executionMonitoringEndAt: '2020-07-16 04:44:02',
                status: 'SUCCESSFUL',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'jhzqilvgibyxpzvtea2p0sdjy2rbi1ybknfxrkhvahdy81ajtpmcnni2dvc2zowxzj31lze49r1qx2m5i2f1zjtm398lfcew6rd7i3s5xs8f4k55uccbfa033yrodt64rlo3s2he5cvngg7jcahs31vcd6c0nbqr',
                channelComponent: '17j520s477k2mbzzvi18k84ce467l8qxj9c402p9qgnf649jj589ld1dxlxw4m83xzhoykfwhap6ged098uet1px5kzdvv5ylc3qh1m7mp7sr76dckr9ttrsglrwloeimante3zomnxw27vltr5auwdkshp4vcg3',
                channelName: 'catq5y49xr31qr0aqo8k25etebdmyxgtk5fs96cing37aosy3do04239u9kl56o57wg4icaf4txy68lkocn0q2w9pgzenfi4zvdlerr5dg4830mrum7qifxi7b44jew0dfpcluf6sr7n6qkpf9yq08o9l1isz4q7',
                detail: 'Aut dolorum et et alias consequatur. Tenetur quidem alias voluptas et corrupti nihil animi. Praesentium eligendi molestias.',
                example: 'cwq0h25wfs2ypo3vkgqlrgnl65cslw89pg3e2pr895e2bbgej9ehjlcnwiabdm9vwc386c5cszfj5py7bwaseq2csef04cpxk0rp7oy1nkova5ryxk7e5rqr0tdl8on2v0y1v2h9zb3j6tcvhbu6oaakj9gx3rrg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'x8hvpawiv8yckcza9vbi',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:53:06',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-15 16:08:05',
                status: 'INACTIVE',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '5ba1oygsya5nedlnnfhsgkewjhh8jy6adbfz6i8wk0g7lcz7vs9iwweln6l2heso1oftugitwykuy4o62whceonlonxwg2zo361lf0yidsui3x7rl3ab1oktpp9dmozurvhneozsl293qdkmenof31w1od69ek2l',
                channelComponent: 'fgxy7fmy80clwetl51kwb1qq4mqxnn5ws48ayql7azrbvgw0vydzcj7elfv0up283zp1aqz5z6g07r9vmsgtb83p4j7covvjvg6l72rjrvxoet2zc4lgedkeuncni943uglk8v7h18e2359t3jyxbtadev33tzc2',
                channelName: 'j1hi0nwccrryka6jiakw92c5odpfqxwtnf8237olpt9ojclwjgm7gkx031oyrc7k1601vwne7alu90px722lq8q1zvpqz3aix4fpua7pokzdyzm0ixmnhi1s56wiy246hidqo5plyualugetl48bzku4k7t3ku6u',
                detail: 'Est dolor vitae eius et possimus. Et consequatur aliquam nostrum ea minus quo esse. Omnis fugit voluptas dolor et recusandae porro aliquid. Debitis quas ratione facere et voluptatem saepe excepturi officia.',
                example: 'pdjlyrmxlbe03xeoxe7lgrcjzp9vv5xmbqpsdb6en7fkrbgpkdhxmtcmqg90r3vagdhtey90fkkg3we8cau51zq7o4qr7u1nkgrx2cmbv68a5zjuojrz1s0j6hl97rlbdm3wk2b5156xc71ukb1adwhqohol5979',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: '8jx8bx616r0k2jzo4dtr',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 14:59:19',
                executionMonitoringStartAt: '2020-07-15 22:06:00',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'UNREGISTERED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'cloppr5jx959fwogljvt94zyr3qzrz5l5p9sa9tn3jvvnkmh459vnob7o3gau9gzo6wjq1vfj37wo39x80xnv7g45bclhd9psw74ojxlg4yfrhjgzrwybobj70usfg10wlp0b27pmwj3msumx409tw2e91ino95n',
                channelComponent: 'm0q4drnxc7qlp7fjvxgekj2bwrjglpw2jou49abw95gye4up29znf9r6aj98jx8rqo2fx618u7s2ptarm21n8f7e816h5ikvojjmqtis0lc69zcqvyzd5wa8vvyrxaqzh5l6y6serw6kok3wvkzi2sbnoo7vguc1',
                channelName: 'jqoflk4gdbmt7s3qlczi0ihdrpww03xv307wvin9jocr71zbawltjslkwwg0ywnrny1pf5xzfyr31xvtug20qr0eyk30ory4xyqt0xyxtqpa0rp7ka6mxmr5wzznligeyeqdjid6rr03y6tbmgxtbjgnirvuekg4',
                detail: 'Velit sunt ipsa nostrum amet et at rerum voluptatum. Sed odit modi est omnis explicabo doloribus non quod. Deleniti similique earum tenetur nulla. Voluptas officiis ut sit natus id.',
                example: 'v7v1rlrtc37nvmreg4rps1lmvnaycxvrviau7r61wotdrxxjuxl0kf6c5b6vgcer2rkcnciibeggkafpkv399rytj4drt8q1e9sejfx2gkdotwt7igq8sz6i0thfd1wydx359pcz1a6vee0tk6epwg96595caf76',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'eg99yc3e5ou7pbmsrgid',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:55:43',
                executionMonitoringStartAt: '2020-07-16 10:31:58',
                executionMonitoringEndAt: '2020-07-16 08:29:59',
                status: 'STOPPED',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: 'sj93vna2lj87utx2b79vleb6v90qfur40zvfcxo5zmlbe9j78vtzj28xb3yt74cck13t2333l1em6yi9p1eth87xkxyw536qkbce204kmacfe82rhipyc88lnlqse8nr0p3z25h2agn7s0sb3uwt1omldyv0sdai',
                channelComponent: 'yq982vok3nqieck06c8pkaawp2etcy1z4stj75aulzmec7f1tlmrtf9c3ic8p87e8u28u9fdn6w4w5yqzqt6cvrv1804xv87y5geviv8pbj9zayuish50jkt6f6s54gnrj3mlzghov3sc0w2kwq4ix9rvpyhl0z1',
                channelName: '5jxiiohmocgca15plc1138m8kik658wlryy376g7v84o0xi7x0ahlout94544k3uy0iholwlvtmvjgc6vabbl0sas9mbgkq0iuj4cmcr0ud1vf3wgb43b65fgxcb59npzt0h2zypkwr4bvlw89hf3gcwht5r4tda',
                detail: 'Aliquid rerum molestiae ipsam non eaque non quisquam. Natus cum sint. Est et sapiente corrupti perferendis non. Aspernatur quibusdam et voluptatem voluptatum maiores quis provident quas.',
                example: '2cen3t6s11i2a71mylxmq4ecbgjwz7fsyu5a5jqj63bp01p8esz42ueqh3g8zrsrz9b9x203xtwdnnn7imj9w9eun8x0px3fprl66nnz8ykx6o4yxlcy1a5stvdiq3hvosiymskgdkgphiewm28ntqhmncs6s79p',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels-detail/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
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
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel-detail`, () => 
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
                        value   : '25af91c4-50f8-48d4-bf6e-b0a0891621c2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '25af91c4-50f8-48d4-bf6e-b0a0891621c2'));
    });

    it(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/25af91c4-50f8-48d4-bf6e-b0a0891621c2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '25af91c4-50f8-48d4-bf6e-b0a0891621c2'));
    });

    it(`/REST:GET bplus-it-sappi/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '335eef05-9c99-48c9-a1c1-16413cdbcf0e',
                tenantId: '4d8a9a22-e1b2-4eb8-b2fa-9c302e9b116b',
                systemId: '685aab87-c4eb-489f-a0c8-0a0da95f93e5',
                systemName: 'l5nd7msbzajs0ure8bm0',
                executionId: '9f9beef0-008c-4f87-ba0c-8b0660ea45b9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 00:03:55',
                executionMonitoringStartAt: '2020-07-15 14:31:18',
                executionMonitoringEndAt: '2020-07-15 21:44:18',
                status: 'INACTIVE',
                channelId: 'b34e8fff-8ef1-4983-a65c-c6803f229363',
                channelParty: 'sk2pp1am0lhm85b5zkcvm3g6jf56meftbkysm3d0kanqiumnowxwb539mcjok0hdkdaagoxplii6nbkzxbkkwnq8iuytpwwyusth87zvco258n8vr03plaa08u5p4gn4v0bja00vmr2q0707hy5slg0h9b0bj4iu',
                channelComponent: 'm1wbwdi6zg48bofscbpkzu0r15s0wom00vsia1ts9mvmbp3dpf62pgzl6oteafdxteanxd78ue3we2v4r4x1mn9ow6nb55dd9tyazf49aqoaj91p46q2ns0986r4qijtfbvmn5cxjo2jog37qgikopjtjzd2kd4e',
                channelName: '2w259luxgupyd289kt6rym6x06vqyi4x2b3h8kl7nmcx1xclyxl97de3thi46dmae1z9atbnor09ks6mkwwjlaj86jcexprz1ev6s0h6krwu1tfwi2e7sy7p2xxacz45xg9vpimqd972fyah569l279bdezjcgvg',
                detail: 'Similique iste accusantium non nemo. Autem veritatis culpa nobis corrupti deleniti. Debitis aliquam officiis ut iste ad natus alias praesentium magnam.',
                example: '99kbow0g2tmazq3vwnagz6sp4rdiau08aynsrvp6mn8f3x3rsh8jza0ert1tazmnqqvut64sso88sqh37rx3pxts7hyso904gb171g3fosdm3uw36gog0bcczhsj08dh1s9txpvous10ur19yqhad6uzgdxy6hii',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                systemId: '17971793-54ef-411c-9a94-ef474043952e',
                systemName: 'tvmpdiysgu66tkrp1tbg',
                executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 18:41:50',
                executionMonitoringStartAt: '2020-07-15 21:43:14',
                executionMonitoringEndAt: '2020-07-15 19:20:50',
                status: 'INACTIVE',
                channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                channelParty: '5a0rn1q1qat52o5i13dijohgcdjxchdy20a0flwqmje9e0xscaiit40li11tak5xxxylxbjmixlr0qdvuhcks5wjs9wcx66awjovlieea2hkotjcvmdzob30njvttf4wb2fwor8wlhnlorki5gjcnv49utjgp6aj',
                channelComponent: 'ccjm4cnoj7pc9cxe7whxpp2bq8tudlg8tpagsns9o9py7jhrwx8stv94ybgoneovgq8l14no0ehwibb2fpm61613344droc25ovotn7syc12nan6s4uljo0b49l8emiglnan3rkc5qqu2fltugsm6zbz346tvn5r',
                channelName: 'azpd7xqcgqjs6zjzqfx3xu8lfedaplmthueic48oq5gpipyynkjc3yiogpwo46uh54cgslyfqv5spu6yx6ohq9n1blncyxvzo3fg0qmqf81qorgzw1mf4h7n2szdzo6wo2zt81iqqghuwgwfwdxpv108voif0q6g',
                detail: 'Qui et facere quia. Perferendis quas accusantium consequuntur. Architecto ducimus autem quo. Veniam et saepe. Ut alias reprehenderit quia deleniti quia praesentium sequi.',
                example: 'r79misqd9mgwc4aasmwjkvdui2qt0qq6p1ongjh50jnq6lalp6zoe2d3dpooex1adx7r67xa66y03jhqpd0pdnqmxtd72155c3lrl6nvek02dzqplhgmdjk666s4frsd0m8k8jxa4mrt814t09mlkr0c96z67teq',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '25af91c4-50f8-48d4-bf6e-b0a0891621c2'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/25af91c4-50f8-48d4-bf6e-b0a0891621c2')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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

    it(`/GraphQL bplusItSappiCreateChannelDetail`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '57530f16-9f39-4d55-a20e-d76b4104b9e5',
                        tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                        systemId: '17971793-54ef-411c-9a94-ef474043952e',
                        systemName: '8ffz66ux78dyedx7lo7t',
                        executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 07:09:04',
                        executionMonitoringStartAt: '2020-07-16 02:37:26',
                        executionMonitoringEndAt: '2020-07-16 04:12:43',
                        status: 'UNKNOWN',
                        channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                        channelParty: 'azx8vz8hsf78msf3bvyfg91ok5tqyjdyt8159ypqefxi7me6oecidgtyjauk1fqjwvxkugbiv461a1gqner48qp4qnkbx1dzwd028ufdkiyqdcs3rzen4lwly99bmqmppa81k69obof25yz3tu9uu5etcc2umamt',
                        channelComponent: 'jsmy2vr5q4bj7ouk93s2bqi9xyk9psh9ighh4x1q2s16u5072bh7pi9t58sw2iejken7zegh70ke8abeco8rju6pb9g8oom8dw02ydlff9bzq12z3xpjizholnqed5614lqmlrkv4yytt6rd8hoeubfuhvbnq6u5',
                        channelName: 'sr65wojgh2r65s4qoi8ijqwaypn1tesngtio9a3y6fba7h1eky9tt2t2vos4y2wkupkcbvealah9wgw9k65iiwazdftg7tc0l301uajfi58snm0ayd2wnmxt64anf8ep6t8m9jxcmbclqhjaek1zhcu2s1ihlqee',
                        detail: 'Ipsam aliquid magni velit et consequatur quia. Ipsam sit veritatis vitae. Cupiditate ea inventore odio unde.',
                        example: 'rxk8hs77k8bvfmq6b2k2akj95l9yvo30o7u4uhcotxf7f2w0h2jkl122dfzxch8q56if0ksof3m121iyq6apthuiw0lmot4czrro6gkiy9b67swx9dr3kye7a4xjl3w4epa9iyklxxtf26kzymgjxot7ozomxt0n',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '57530f16-9f39-4d55-a20e-d76b4104b9e5');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannelsDetail`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelDetail - Got 404 Not Found`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            value   : '00000000-0000-0000-0000-000000000000'
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

    it(`/GraphQL bplusItSappiFindChannelDetail`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            value   : '25af91c4-50f8-48d4-bf6e-b0a0891621c2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('25af91c4-50f8-48d4-bf6e-b0a0891621c2');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelDetailById - Got 404 Not Found`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelDetailById`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('25af91c4-50f8-48d4-bf6e-b0a0891621c2');
            });
    });

    it(`/GraphQL bplusItSappiGetChannelsDetail`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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

    it(`/GraphQL bplusItSappiUpdateChannelDetail - Got 404 Not Found`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '19e00ba4-20a1-42b2-96c3-0ebfc6bab6b1',
                        tenantId: '51d9d33d-5a6c-47fa-94fb-da3745aaec31',
                        systemId: 'eed443a4-cb14-4851-a434-3845ec0623f1',
                        systemName: 'q9rf91nm9dbem255dntw',
                        executionId: '31a39187-f144-4696-b215-ad420b5f43a3',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-15 18:23:50',
                        executionMonitoringStartAt: '2020-07-16 05:30:36',
                        executionMonitoringEndAt: '2020-07-15 18:52:09',
                        status: 'UNKNOWN',
                        channelId: '19e9ca61-51e5-40ef-aa8a-e153df8b0dfd',
                        channelParty: 'cogkg0h65jd8x8p7ifoysmcvr9we7pwq73iq0xfu6op0n6k4n0a3qus4jx2tiehrkzzm27qvvaarje51uvmemg8kb5icwfrm5x41x0ze63nvo94gb9pb5kl8w1uatypypctd1039jf8gpmyjky378g68ctob5hx4',
                        channelComponent: 'rpqr73wza2iec6it8ryi378ip63xzxpanuwnb1gv6tv3kxog3egv4flnfihqe3d80ivrbx72ez5mvk6myrq4r9l4lv82jbkt2394rb7l94au37ssrnh8rox97o32kpd1d96eage5r0vx056wsmfettmvhdz2tlrk',
                        channelName: 'bw2d5p4jigqyyxbhkb07rgtymdzqdgnoo52tm6r3takqq7gied2pg35477hg6qrck8tfxxwooe8lc8cky2jyisbar0g25d43qyvxnvv79hrnf2y8nyktr4cytl8mjfly6x45lpm1r58i7l77139do8pbiuo2upyp',
                        detail: 'Quod nihil repudiandae aut repellat itaque nulla. Eaque eum amet laborum deleniti eum quia qui. Modi sunt molestiae ea ut. Enim quo et libero rerum. Fuga aut expedita et consequuntur ea. Enim totam provident consequatur eos minus mollitia.',
                        example: '7hth7s0cspfy2y8eridmxxdhg57stt5d9zge41n4k05qrlqptho9jgx409f1hoxewvj1imov3gsu3zz01hjnswwnah4lt4dgf95cq7pgklg4czp1n2yq70dfngz566wzjjfs83o7l4jhqekicyg30ylnyculkytu',
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

    it(`/GraphQL bplusItSappiUpdateChannelDetail`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2',
                        tenantId: '36009db1-fe5c-4eb8-b25d-c7e7862e635d',
                        systemId: '17971793-54ef-411c-9a94-ef474043952e',
                        systemName: 'p82d5u77n5khp06zstv4',
                        executionId: 'd3f70293-9927-4ec6-bc04-43ec87a7ced3',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-15 15:04:06',
                        executionMonitoringStartAt: '2020-07-16 04:23:16',
                        executionMonitoringEndAt: '2020-07-16 07:38:56',
                        status: 'UNREGISTERED',
                        channelId: 'aec3ea9a-6d49-4aa4-9432-aa2d2770d405',
                        channelParty: '4k09nv4gtjf6mmt5tp800axo3m50uucw2rirgv23olg408exqxl55alu3u7a1f3r9cqvbwf9kns90ul3yphzh3k20719dsq8kpj8hv5zm83d8223vsrzt13osq7konulg8hbku1yjqmwuali56x3900lilojgi0p',
                        channelComponent: 'z4idd5pd1v3g6u70joahgqm0y7nnjg7pc2hc9guulzyfjd3e0a7sissat5y1i6wvknd2e8ommualfb8lkhjuowgo964a6xjoktthfxtgv1aehf6dsc86jubvo1pocvleclmfs9ovwjthewgqjiknoza8l4bkgs81',
                        channelName: 'vu26828chtsm8h23fn050863ko75t6z2etazhyerje5zqn54e48a3tfuf68iafnm4x2xks7zkocebwna6y8v3xnm1y2jn5jqw41ndtpadyjtglxlggv1eeipxzr1xg4fgzvy9rwm7bwtyjkcexftfrt5l936nzyi',
                        detail: 'Eveniet consequatur minus alias molestias quo natus nihil quisquam. Iure numquam dignissimos necessitatibus in voluptas impedit. Et vitae qui illo nihil maiores voluptatem repellendus sit esse.',
                        example: 'z7payhgzc7ffqmkkg1otild0523e9mf34xr8nohxc7i8r7jsf186fvyvwuac49jeq3d5utdc4egoh6j9uwqoyjpdkszge69xsqns79ah7mhh903qcl01rtqg0nc8l1ss5sk02we8rweufpvoblj9gz63ut5cctfm',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('25af91c4-50f8-48d4-bf6e-b0a0891621c2');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelDetailById - Got 404 Not Found`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelDetailById`, () => 
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '25af91c4-50f8-48d4-bf6e-b0a0891621c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('25af91c4-50f8-48d4-bf6e-b0a0891621c2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});