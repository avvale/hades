import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelDetailRepository } from '@hades/cci/channel-detail/domain/channel-detail.repository';
import { MockChannelDetailRepository } from '@hades/cci/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'u5lryf3agfk4tixml3i40d9s44sujexetdbqwu6afrpl1h4woi',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'v66l1g5ltrskw747w4aq',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 23:55:30',
                executionMonitoringStartAt: '2020-11-06 03:27:27',
                executionMonitoringEndAt: '2020-11-06 04:32:35',
                status: 'UNREGISTERED',
                channelHash: 'r8yhomefpip7kosog8c5t05lwhspf6bowrom72x6',
                channelSapId: 'uqc3e1jni1qkky4n8xnxlr2yu8om27pgjzso4056e7vkjwddn3',
                channelParty: 'ooqgs7pnjw7sn4j3ucv4wg95u6jebe190yvwapnlwlxbciwyktyvtolxj2yn3hseal9h6gvdh1hws5t49qb3uokstqg0i13crz3rj78jj7pt65e82dxq0v0dqdcu9z1oxgtmlyjuez69m5v6k0v81o9fphd860x4',
                channelComponent: '3ta6zo9gptccjgwmsgtmdhk5p4pxzg8byog86ezu2u35zu6cgvzndn8adns5v9qnm69mpcepjuk89wdxi2j60v0xwje8msxa3wkf2796lqmkyxu8awrm90a712kptjgqltuae6p0cykld7crsx83tfhychknacwb',
                channelName: 'iegt6cdhzxzveypjr5f9oqurgsve72u6qucnexvy5yf7qudio22yea7dt3nhz94fgx0iari1wlqtwutbfbdh1x3mdnfom7ehv7xgf23xg9unw9vt5ycajo1oiqexxzotkmqu6t1xi3s5vs3442rxjf5paogrlri1',
                detail: 'Eaque quidem dolores aut dolor. Delectus itaque error dolores aspernatur incidunt dolores suscipit. Quae deleniti itaque hic assumenda laudantium rerum deserunt nihil qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 't0kct83bf8bi8varvlm12xyxkvrs2f8v301dlc26dnx6nglhhw',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: '39qgjo62n1z8kh0w5o9t',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 08:24:39',
                executionMonitoringStartAt: '2020-11-05 20:37:06',
                executionMonitoringEndAt: '2020-11-06 06:29:14',
                status: 'UNREGISTERED',
                channelHash: '05sr4qb77m3t6sepau4s10y9f0aplx0i0h9rdekt',
                channelSapId: 'ys38j0i601x4v8p7h4ppqtzci1yqctlau2tlsnqveaw2ew8kdz',
                channelParty: 'tjb0aikkpydfvxy0awbp5iwy5kg1cxs5nb3cwwfqv6yq1iv7t8d0gy3oip34a6hzm9eafuqy2dpkaqri8zshqrcce0lsm3xlioztwxjnjeb2r4cmz7aoagqvdgpsyi3qkkr5fm8af4rdpjnnp0y4vzjquvizx6tc',
                channelComponent: 'lmg3yodfx5fl2uda08yjkn3pzb1819wvlh5rbrk5iraekupidfi0yix0ysk08ns6h9sgu29hdriatetgjw0tflh4bhg6a321p7q606piqn5mpu6euwalljwh8ncq7oubuncq1g5rcra34sik6g8j1z2865eedx2n',
                channelName: '1x7cmkdna81h1v9sp1r811glyeav97aabk597tr5elq65xcget48ep42yhf6ylw8oe8ipd782wpd8bspb0wm9ke1av7nx0xbjgl3zq2oztpii235j5nmlaw0okqc9amymdg49d4932wyi5hogq5h1h8b5j2k21xm',
                detail: 'Ipsa corporis aut. Minima velit optio aut. Perferendis nam neque et aut quibusdam eos ut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: null,
                tenantCode: '919so487aja76zd1s32yhybvyzmjbp4m58vrtzz44fufyqgfho',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'vkd78klx432y9qi4jcb1',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 03:07:15',
                executionMonitoringStartAt: '2020-11-06 07:24:38',
                executionMonitoringEndAt: '2020-11-05 19:58:13',
                status: 'INACTIVE',
                channelHash: 'btg5oid02ngfli39bhin3zn45mvzugvv8aqspbhx',
                channelSapId: 'i8qc1vjgmpf0z97vse5wiop4ah8fnkp81iss6ijtj6if08z4pu',
                channelParty: '5fw2v5fdvunbdl6vipn67bsf1iag5lqobls3yygisy45iybg31n7dqg52iybsa6s9mqtkgrzlwsv5qkso6pfbid17zdhtiojnnc160y8m3nfr4ia46r9km3ee0qig3eloj10pp3ucvijm8f425mndofqmqtjvp49',
                channelComponent: 'lbjqmnr4fzjqarpaxjzacatq97nuy1tuj01i4x38wbf6w3om5gt61flwzpdzznvabjijlpzc71t7j0yv7dlrect9nhejai097pjdvt825ojxy1vnzauknb9n618gy3ll1qb8hn7tndvyjn3ln3s358vf2edctqvw',
                channelName: 'wls8bfief3lw01uvdcl529plwi9e9xe42jyj7ib3g8qif6e3l42uplhuu6dym9nj2qkyxh6ocfry59r7v5hjyx24ipt1fprlmdhosqaiyymmfbatpfivk57tqs9lp54bjivthkq0lboxt1xunl7tq9zn06hbyx9c',
                detail: 'Autem non error sapiente. Nam ex quam. Fugit voluptas qui blanditiis temporibus qui optio ut at saepe. Ut deserunt dolorem cumque magni eius itaque nostrum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                
                tenantCode: '0df474tsur6s1b7myh35mxnz3jce1jumdcyoifxh4qsrwu6ko5',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'eez3pd58qtljifsj8ph6',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 00:49:48',
                executionMonitoringStartAt: '2020-11-05 13:34:28',
                executionMonitoringEndAt: '2020-11-06 08:47:13',
                status: 'UNREGISTERED',
                channelHash: 'e0rc9l1pmd4qxsg5w4vf3f8n629r3abpkylm7ptz',
                channelSapId: 'hgldlw5x12bm7i8v8h0wgcerhwzs7e929o2kfxin0n2emfjoqq',
                channelParty: 'vrrgp9qnehwbrgxrqdq1ejfzg7zp0wk5tnab0zc4i30v6ez3l72ax10fa4bctnhidr9apoicujx9z3wtrp7j4ibqu6gzoj6u5l8trawa7qs4vru2wsmk0imu298c255g6xc9ptcn97d81pqx0qokpw411clq8kfi',
                channelComponent: 'c27whhicov8oew5624blkfky2p6gi3vvhwb6n68pcctlvc4ht8d69mctgv6hmithamjp00032igl4kz61fo0icr4akf9wnt8eyw2x2krbfkxhqu3gypoqde4x9xy3b1veystbjempr0o5md86aip1003l1m7thgg',
                channelName: 'jis8tne909a14481tyedi37rv8se5i2aufbp2dcop45ckwv97h9n34dahdsgwhz6927f615kwr9hhmok9xj295f3sp5ygvv3g9l42y69u41s5t7eem2yp566ewd663uuauxgcc5qiniy0oecd94ph8zpynx5jb70',
                detail: 'Ut nesciunt dolores et corporis. Illum laudantium non illo qui eaque ut. Reprehenderit sed magni eius consequatur facilis quas dolore fuga.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: null,
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: '4yl1p6tgcsch8zkq1u5v',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 19:18:38',
                executionMonitoringStartAt: '2020-11-06 01:56:38',
                executionMonitoringEndAt: '2020-11-05 20:33:39',
                status: 'UNREGISTERED',
                channelHash: 'lyk97yxkbkah3hc4fopd8y282kchq985kxfgxoq7',
                channelSapId: 'wzrju3oqzy0tt4r1z2sjekgssyv58oygl802q5ri17rmav3zcp',
                channelParty: 'ispm1qaosv5fgqq9wgor8ufjzyazjuldd64w65425pdarre0537b0w5ybj55tj2foi1w6wdbo0g5n0sa0badvnkbkaxpnaps4vkjc34xmoknyoyonqdpdq0ddwnr99s12sd08u6tqi2dxetamnx7oc11l7ghbpv3',
                channelComponent: 'hqebewdb1nekobecgybp5uzvps5hgfylo8btel8s7pbma3xm9iaqdz0i1in8vig6t5dy5fn35s7yd50uptpdmm2c30csyipbjgowc1nmtdi3ycr053utbssajkkv0674rc7vniocplqfik1ud464j1ka0cehkomh',
                channelName: 'lb6n0ptiv0h9pxm9tgpvt3snm5z77rybh0d8sumvdt5nixgcwk7duokikm8fx4rq5bhj8idm3k9u1enuo5yus5ozin7p2iapfwv3dsaa9e74b6bd6pasrjxa5gnl0qi7p789kj3ohb547h864b8kxdt3vyb8prla',
                detail: 'Voluptatem accusantium amet debitis eligendi nemo consequatur dolorum illo. Molestiae ut sed. Culpa qui doloribus sapiente et ut sequi velit aut maiores. Et quia veritatis aut adipisci autem possimus nemo id.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: '9tkvwvh96tojrf6pj2hm',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 19:29:22',
                executionMonitoringStartAt: '2020-11-05 12:34:05',
                executionMonitoringEndAt: '2020-11-05 18:17:20',
                status: 'UNKNOWN',
                channelHash: '9sl07qfkpqju16njxdg8exubxrp4yf0wgqfcmwjf',
                channelSapId: 'fmh1fbu6gwfkla0mxk9kmz00n6m45s3mh7wowizp6phu6dnn53',
                channelParty: '227fkkjfn35fig612cfpdxujrpifhkkiecmvgfofndae9hc7e6pei633fqc1wb5efnpzsbxz7ygixxqcadeil6azyipoqv15940gna2wko8n1evm4uq4sv498jlgwa8qqghk65803njlu9q1rlri1a24g3r1o39t',
                channelComponent: '38czidvfcvo0tzvel61ynkmablhpfaidlbwgwcv9kucuj36xd0z7dtcrprt9087xgemzol98wcb3dy5gwu1x2b4anp51fg7322gt247p8cyxuvpvflbz4ssd4j61m4f70dpviqjxr3b0oyrn0qoyagd6ylxuqz6p',
                channelName: 'pt0rfbniqw9vwt8s9n6cizyy60kev9m29bqvjabpv87uv8xvb609k7d3hnu80xd7c22uxse60qn2do9a01glpiph3da87l6i498x7qcfe8qezsnt372o3noo0m074xyl614ce33zb3fr5dyep66d8c542erd0da7',
                detail: 'Quia debitis perferendis et delectus laborum et impedit. Rerum amet commodi dolor eius mollitia provident consequatur sit numquam. Quod repellat doloribus. Ipsum adipisci fugiat iusto nam ullam in. Et odit dolorem quia id commodi tempore iste.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '50hgfzsn4lhyv66aywgt8o2uo1xuums192aqx5mn0uqxosx99r',
                systemId: null,
                systemName: 'dtyih4x5xpd8efncznn0',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 13:54:18',
                executionMonitoringStartAt: '2020-11-05 23:25:31',
                executionMonitoringEndAt: '2020-11-06 05:31:08',
                status: 'SUCCESSFUL',
                channelHash: 'nlzaymvqcy3i21wjq6mkofbtkr6ld9z9dq64uqls',
                channelSapId: 'fl2m3zmqbx5cdk6aua3lvyxea2lobkvdnlp65z1wgy0sgou3jf',
                channelParty: '8fyp2oa6dtkji6be184t1j40900t4rzfu0gfla5nj05esrfddu4ng1z6aj5kz3a666akkig6vdp2532f9wt7wxtnv56w5u63dyfsu49wr7cxbi58vp7gh8i1mjwewd9la7726bvkav05oxbi2pw3cw2zgwz4ng9m',
                channelComponent: 'opy6z0r5earmi5nljkwuqmufr6o9u1ysiq2a9dfcm7ntsjze4n27x0vwiprs9vqx869yv9bvqkfddkfndiv3czz807mr54f98vq5nhmhmjhh7bmuj02z7xcryjdfpgqad39gfg2t7royw0oxa3820krzsnuelex9',
                channelName: 'dmwihvuycieima7bmir9jrmzobzw7lge9ki9r8awvp93v4i8kaga39el2xegsjzxr3o0kup9656vhdds8ul97q8udk33cyqc64bhno6y3q137wvn9zcldbp19slc0lxc53ypbbafrvmoea39wl4hp6htcfd530ua',
                detail: 'Nulla molestias tempore est dolorem. Et omnis aut cumque atque eaque harum tenetur omnis in. Voluptatem et et eos est voluptate recusandae.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '4hdwt9hpfbgsy61vwjttk17q28dik9oifrsf2iw29q5m4g3vvh',
                
                systemName: 'b8v733e3exafa1sblzvi',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 11:07:09',
                executionMonitoringStartAt: '2020-11-06 03:59:15',
                executionMonitoringEndAt: '2020-11-06 05:55:09',
                status: 'UNREGISTERED',
                channelHash: 'bdbzxszc8x01msa0x7nnougj7igjf2ehancxlder',
                channelSapId: '02i8yuoxb6wjbrl2opanrmqumodf3l9fcra1l4od7ok0lkg7qu',
                channelParty: 'fn8c25qv8szpf1ag5avsmu5et1h3i53vkaq3xmi5g9v6j0c1rj6xqtkdixhho85b1gdumizqtugov4ooa0hjki5s9xq3y9zk6wdwmw61uoqxz7n7x9i6a522gmm37sihss5boyhxdq5j2asvcxo7sd3qqv98887r',
                channelComponent: '63i5e3rkmd32mz53dme9wl6ayyx5o1o4yw5b7vf8ck7nfa62z9v1dc3bt6dhevxnaaonsorjbw8oflr8mt5ezalyfo02waqel5j9lh0utsrb857ntjx4x4cs19b5oclvtlnuuq7q3v1gz90swiphhzbgxgv8weeg',
                channelName: 'hpd2clrmagyaro705098l51knd5bsrevk216tusbixht4fuurgqcp4bg332o7l5h20s33ld1emh233r9x6ekzu81e05p0qeip6qk9thshfcke22a1mh1fi6luuzng08na1ncxhx4mj4hf838j61xtlezvj9lu9eo',
                detail: 'Corrupti nesciunt velit sed eligendi voluptas optio quia. Id sed unde. Autem ratione non animi aut doloremque et dolores enim tempora.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'd3fdi5cc3dhqex33mjwyixrbp2krhvftfo7jalcf1fbs8nnoec',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: null,
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 16:19:08',
                executionMonitoringStartAt: '2020-11-06 00:01:46',
                executionMonitoringEndAt: '2020-11-05 21:15:09',
                status: 'STOPPED',
                channelHash: 'hx9ilngdjld8ow097kq8wlhifauur14bh3jv4prk',
                channelSapId: 'k7grigh7llepdrhn9okv8yhc7aadhtu8ayjiwrtqtwts8q7f64',
                channelParty: '8dzhty8tc19w6lv37rkykwl0l1n1z8659622w7jt8w445in8vcaxa2o15msncjndljd4awc3unsabkuhl6pos0f0pfl5kh3mzvizzzv5huc3wruonv9r3fj72e7ri623z13vuexchbeqgu34e4c86f9xf131bbhb',
                channelComponent: '39t8ndh4fzr4iwwwt8ug6oqynoenxzy76qpw4ntaubn9lyvo3e7k9bfrr30nv95t2fx6o7wdl64v7w0r2qtjsdauiruysonrk4w5c0uc7lhb7sdkvzvhqf4t374mosgs07phsnq889wnzbvcplwyhx64mw6qi5wz',
                channelName: '8feuecafe18wsxjh58rrovtizf82kn1vxki2k1mzxfho1c1cgx5xidv9pf7c5hlny2hbjkiqfny9bhn329cvfxc9ec1th11wdsoly97j77hflwdj4ue5u2uwm0643dkwk0q8rzn5ovmn72l5oyftr7eyptlrrqa6',
                detail: 'Dolorem omnis molestiae necessitatibus nihil eveniet quis inventore esse. Ea doloribus nobis quisquam dolores unde alias quis nesciunt rerum. Ad voluptatum qui odio soluta molestiae deserunt a possimus. Est reprehenderit commodi voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'mhyzxmaztxm71o8sis2qjrdr0vcy5q57ftmm56od1oxvti5grn',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 20:19:20',
                executionMonitoringStartAt: '2020-11-06 08:04:11',
                executionMonitoringEndAt: '2020-11-06 03:18:26',
                status: 'UNKNOWN',
                channelHash: 'dk3r9xwkfgwvpi6i3fgds7naqscvfltubzs9uiqc',
                channelSapId: 'nqf7syekzlek8nfirzoc3qkoi55i1migkdrd96ldfecmi67kgu',
                channelParty: 'uoqpwbd1nliria4hkbqpt1xt0skfd2qauim75vqmrfeyogjrsu7jwe5p3mrtrxbhn1xkk7c8q6huetzte0zy3pyvkfgsjf0th5n1k2tyskdj6s864p0502sn04pa0vrcu7ylz8dw14598ufjfwbegqg6mdx0tyfi',
                channelComponent: '023y0i8zx4mizwq8qef2vy3exl22i08uhwe46to2641xeyhpy7w47eg4yt80iqz1gf7krj439vmgin9sn1b7472hxunqomnwx2sxb7ajw686ibwg9cn5mh7z3abimkrytc1zzqq0npdszx888f5r6l8licegzg1x',
                channelName: '91tx9h74536g0uyjtrbncfotk2ogjqnkvahmcr9162yy1raupy94k47c4g1xxfgsqy5vjjqbrx3cwejy4pcewrlr6sh8ld7vsdkbdd81oxbg4iywr3v2p9xovi81vn63ci0t6rlv8g1a66firsju310gg0uw5b6p',
                detail: 'Omnis consequatur qui iusto nisi dolorum quia ad suscipit est. Qui magnam mollitia magnam vel et eos saepe velit. Omnis sunt dolores. Facilis aut quasi. Amet iusto aut provident omnis possimus. Incidunt quam ut hic qui ullam sed eos velit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'ohape2c2v9twg8x0mj10pgb2s3ljhuezlkdlk6fxtmesfuyzzp',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'lesopy4blga3l6atkyhm',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 12:10:49',
                executionMonitoringStartAt: '2020-11-06 10:15:02',
                executionMonitoringEndAt: '2020-11-06 08:44:29',
                status: 'INACTIVE',
                channelHash: '18dc2d2i70agz33qx10v9v1iex9ol8fyo5g1jc3b',
                channelSapId: 'qe7y66ktphbsmwmdzg9agko3qskwul0wkgcoahrchfuo3959up',
                channelParty: '2r37cqz10qebhgfuous5xso85obvzgv8d7j6an8tl8mwfkaa3danm7xz3mgv06m2ke694giaknme2fd0frcvb8kwflfczh2g8ic6eymj60ie236bwq4enbneod00uuz2yhvusowpdav3fjm2v925p7ss90gglzhn',
                channelComponent: '5skwkq3wmrljrs7bo3h08zenxzvc1pwskldrhxq7zgqhz7rudpjynwdhd49rvp4ed81xqn09cznp9ju03hedoph3c7g33irfq059ftssuowl5j4fobokkmrjknh038466mp00vinc81vgr49bamk1ceeeeexwwo2',
                channelName: 'xkevtgi1w386ywvr1uw89k8stpj73gnzafr8f2orprex0o6hy3eh8zwqqeyxvnqb1qqliurh0nmr9oxfx39g4ww26lmjngaqhmccvoxi4r43g48aqn31yqe8ncyv09kngjrkh6v6xqh7rf8ydsn4f4bd610pg8vl',
                detail: 'Tempora possimus nihil est inventore libero rerum molestiae eius exercitationem. Voluptates cum tempora omnis vel consectetur. Quo reprehenderit officia et voluptas fuga minus officiis. Iure vero nostrum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'seqb2wx6e5f8vktvqhxsxjzobgx3jfm9yo8f0cwp64brlne3p8',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'ijaqkz68jgwkw64mfr6l',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:42:40',
                executionMonitoringStartAt: '2020-11-06 02:37:57',
                executionMonitoringEndAt: '2020-11-05 19:51:11',
                status: 'UNREGISTERED',
                channelHash: '93akf580w4598m9djlje9zwd7vrq3bdy7hr14nj9',
                channelSapId: 'admc16r1zjb6z6swwdjbgp179upjt9rebv788kbp0oc38hjyf9',
                channelParty: 'i4iu9dtmia6pn012xwblkcmm14t423wod2156g0s1rozpbob1fxxsjwi5eu4qwqxnhr50rra84qzqtzbotk6fydaylgvbok45ubx9gb8q4dira2zwctvrnvhjuvq8zylwiatb2zm4rfnylhw9jalug3ivarktanl',
                channelComponent: 'q49m9jei70kp8ub4pk246oyo1p36w9u5u5fsd9rvao14b19jjgx9vcuroengl13oqmqwq52i1hseb2wtnccngxmc0razs4hx7e6d80at9dhxqyt145eruom5lummaiwumptpuxqg1px7gvn3lqfpfe2rn3agu5rj',
                channelName: 'myy6egg7391m5n3ou1dn0iyaj0t7lsbpn7er6cpafc7m3mqktkm8mvfw9vh6b9kcwc5f6f9jzvvfaqtnt8rl80gaf4ee08qz5rwvd74kfxzfaqwtg4zxdkf09th1gsxywuzypbqhn48bhqgq2i5eei4ggroe404n',
                detail: 'Placeat qui perferendis nam ex sit et dolor suscipit numquam. Error vitae eveniet architecto quia dolore molestias omnis voluptates. Quasi at mollitia consectetur dolore ea illo alias.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '8p7ifet05b6td70kzfbb9433g93swkw4lvq7tisu80wnpbkhbt',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'vm1zuh84636gw1m4cgm6',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: null,
                executionExecutedAt: '2020-11-06 06:36:21',
                executionMonitoringStartAt: '2020-11-06 11:24:36',
                executionMonitoringEndAt: '2020-11-06 09:13:00',
                status: 'STOPPED',
                channelHash: 'y61s2o0y79wv5ypbk9c08hd4wxk4cwdr84frz5y4',
                channelSapId: 'xeko9vcd7dp5ew99w7yy8na4135kk9ciu67t0u5osj2x6jtnap',
                channelParty: 'f57mxt7746cusqcxiyg5zr2ac75uijbfbdl3wygt59bp00t3h4u5kmrmtlpzx4vi6c8qso3v94ml4iyy964wj1qrwc4ppbz4oghfv0at0j73s3lz8lwp5as8bu863liyeaxr2fa9gw4jpnejprkwybpnrftjzqz8',
                channelComponent: 'cixrp67m6s3l2scgti245s6607fpzb3iea4d5zc5l70v86rf7qg47h6c65pzl2fxozat1xu1mfi1ai5yto29vjrkinmqtiwdfh0dryvzje7ochqm8vu2b59w7vxkhdy6pod4eklwtbmt0cirys92pm5vbqzoj1y9',
                channelName: '4x2jz9viehte6g0vjx4dj3iwbpjut3mrjlnhfsmrknj231349egqpptod7qsqn5tj8arza6d9609lqyghlioofg6h0lriz5yhuakrn2n5713hscph487gxmn7aukt1d1dvsiaeh6efsnf5f1q6pmt5zsyu5ceray',
                detail: 'Ut incidunt dolorum occaecati recusandae ut dolor laborum nobis eos. Est sequi saepe earum aut. Vero dolores ipsa aut qui dolores ut sunt. Quis corporis reprehenderit praesentium.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'coclgs12io8223uc6gkmypgwwoxg5m6gthvutsbpyih5jxlle0',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: '0tlu2kzyo6jeo11l8n1t',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                
                executionExecutedAt: '2020-11-06 09:11:27',
                executionMonitoringStartAt: '2020-11-06 04:21:45',
                executionMonitoringEndAt: '2020-11-06 08:46:11',
                status: 'INACTIVE',
                channelHash: 'tptxsdv8q4alnoh28waf6icgo0wq5z12faf55v42',
                channelSapId: '1ock22flqbkz9kh5lpmtht6am15zgc2byi93kux7v3xccglzi9',
                channelParty: 'x5whgx7qeoshp0ce704dkg4xxny80qdvp4l9xldmx6ncmmsks2skc99s6tz3fajupxjkurd6tllnmdzd39gqw6gemhlogs8c61i3hhx64lcbhrcjuvtrucgib3rg1pjidlm0mxv90ut551nkyzdcfj4l40n9zmpf',
                channelComponent: '37o4b3xs3c70h83olugaxh3aa75i41htqlp1414qpzo4hfe7yv6ii4xqh46fru7m65kzyru0a28nnow20f34ymdo8g6cjkzas1xmaad7aw9fgv07yiei9i8sle3n0b2zvlarjx4898gp0n7yy3qe3budrva83m3e',
                channelName: '979jwo6nioh5q8f7kk1rdxqwazdt1h750e76shaliq6gaux33nu6dl9rxdbxr455broa2yyhqukal9ke8gmtdss6wkhb7wwwt903b8o3m2zjtpq6ahfgolmofi89iouj4tulilesih905z7bdxa313eeg1qa6b9b',
                detail: 'Nihil autem quia perspiciatis nihil possimus magni ab. Illum ad earum optio culpa aut velit. Et voluptates quo qui tempora et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '80pcl1pxy8g19c1fzi2p903p0ayacawyp6t2msc7jc8uab8c7n',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'vuwzucivaw7jexb7dfmh',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-05 14:54:12',
                executionMonitoringEndAt: '2020-11-06 09:37:14',
                status: 'UNREGISTERED',
                channelHash: 'ccizbt578iid8q4jag6c117a64hjsjqh8yn2vrcl',
                channelSapId: 'h0ir0l412xja9uk7kjd3gwxpnl9mr6fa2yxqm3bok795js4jkw',
                channelParty: 'k7v1zt2ka88g7dt7ybi2hfqtjce7wvnhwsx78t3ikq4n7t7y2qiskci23nzax3u0hu7svwmak1opu5d1ea0umlyf7naqapf3okzxplrrta5dny1wu73mtmq0p8pgqw8rl5vnbxm333xtp910dqhng7yx8nlx1f1o',
                channelComponent: 'h91iaf278lnb49x0f9t230epvtfdjl8y1p1pr7e8isykddy1egkq9ttn6kybk6ebhe3jwn96kzg4a0pkqn78dj895esthyaokbh8davbx1smtn3ch7tl2py0i4kuzkfihggeoka1cg46nq15pn9c8cr5v999z2tz',
                channelName: '0zzyd3brr70jd3khlo8m1mwp9qaift1og51fc84olbjw94c8s2zarbpvjtfjgydm7tz4ff0pphhv72j9kfc0afe9xtwj0ygowkzsgmuao893ih2vgh0bs1ao7fnn8rqgyl98s0uf0mxhwjk3kpm4za1wqjjvb6ic',
                detail: 'Quo repellendus harum quidem eveniet consequatur qui suscipit non perspiciatis. Expedita reiciendis et consequatur temporibus quos. Quo veritatis commodi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'w49c3l73s0beivrvs2ynfkptqr1z2eo3imgqr8w9882bdzwdl7',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'il4l1tqte9jexnur9fai',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-05 19:07:09',
                executionMonitoringEndAt: '2020-11-05 21:42:17',
                status: 'STOPPED',
                channelHash: '9meo2hodmf7a9nxdir376tpqplj4rwwc2bld74yu',
                channelSapId: 'mlonmtmzfb636rudxwhk2yjqqehfgmu6p9bdtfbdr890zalzbf',
                channelParty: '6p7n0rnrv7g7dfgi4e52h49ms2t0wa26cj2p1axsmm0n3a17j4pmuxg5zvynmcejxec5n8hqqn9tpytpv36ucluxmcu27xidkxpvqf9tr18bru65inq9mpa413bgkd8ol0s8wmglsvor0h78ryx2hdl0fvxxj3on',
                channelComponent: 'yqse92t35s6ci4zujdjxv5fb4lxqvfj6z7fyq0wuuq1wmvkuf1s2v8z03pe1mgaufspzfy8v47haez8rrnwi5gedjlaciymne102mmbye61qyidvs2qx2zo7dwgkcofzn2wqapv4gvr2v2qpkrltvb3wbw7cmk6q',
                channelName: 'i7r8qcu7ijcx1w0vpq6celznfozvjga7662t5mmrnzfqlcrncasjjhzn4q8afhzqaahtbbe9ozf2xqd5sxkrgmg8utajg33g09piumht5iuszkdd9a7200pv1x8d8ul9p9duzcffosgm7ivyhqapu7v5prqp5ndc',
                detail: 'In quia quia optio qui. Est vitae ipsa esse nemo libero. Illo dicta consequuntur possimus dolor dolores dolore qui quae molestias. Quibusdam qui enim minima ipsam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'fst0104jw81s91i0mmgyxwrb241x1dze09b8hfcyb0yefzypbq',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: '4v7dlvr1485tsamuwtyq',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 01:53:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-06 10:36:52',
                status: 'SUCCESSFUL',
                channelHash: '1v1b2vwtirwxc8jxkxt082kk2gmwl6csxrdbw102',
                channelSapId: 'eu0pyeciks6osvvr86z5hsbt94gwh0ua9djm7aclwqjk47m15u',
                channelParty: 'ldyuwe1e6axbrmls35jb7k1qmmyzac984fhm00nvlcobn1awlciqtad3gsg5rcbsj7zkxsmu9sknqu4o8ll69wxu0u2n0icbsgz647oxx1hidjgpr6g5py9aqr2jz5mywnaok7ntv3ivphrm224vqv38xul25fnc',
                channelComponent: '6fc90875xtxqoy9ekg0e2jn704vuioum0djkpibf6gzjpf1dm15zpx54fcyi52z8sp0tigspl78ebghzomwgcmhepnw6jpo3uj5ha09tx98ggkbh784339uiva3xtsxvdt1mtsr2w4vajovmlmia0erkerwtad4e',
                channelName: '3a5cldmh8l4chrirr5no2eqdwakqu5ewlo697ffv6kj91ljm6sk2cv70318qcl98xcvb5z1njvoyatb0vr578co75tlj1wb1yazha8u1fhozyc5k2x45zsm2uom9g302sy0iohe9034lecvrje1xuhpx1teoaqu7',
                detail: 'Molestiae repellat iure saepe sed suscipit. Voluptate quia atque dolore. Laborum ipsam quas reprehenderit repellat aut quae. Omnis consequatur nisi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '6axrywnrb5h1t81dx3s1dz8ujsilky2ppbojihibbvjwp10qq6',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'cviej0dzwmguz86ttqmi',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 12:24:11',
                
                executionMonitoringEndAt: '2020-11-05 15:25:12',
                status: 'SUCCESSFUL',
                channelHash: 'k7960pwzue0i6mpmu9pu7ssxsz12r11wqufch1ie',
                channelSapId: 'iax1exti6kxd106czn2w90djuhm7jaavgjajywq0ij00opha27',
                channelParty: '8qj44v3uqwsc9ujh0ynqjij60zzetx5yo1sboe5g2xa5r8k9vh4xuj83j8xk6b8ewv1zbdfoadfhjwvnahfyj6wdkvf1duyazpv4rehj7dpylbgq8mtkcnbkztsklb0zlmkms938lrq2n0f4alog9nedrq1xk8pt',
                channelComponent: 'qf3kk0irntalys6qn1089ps3g8hvuy6v67o37v292q0q1zhce1fkq0nfboao94019anx5w39rhbn1eb7pehs5zjptymt17q4x4f2k5irgishfeh2dmmzvtbthoxnrdfpe96vhvdsj0b4xgtv8za99zmgrsuwgn6f',
                channelName: '7vky5p8nd9fyjkkh39p63b1uj8raja858xab95i2bl7ngq9od9tgm4eeu05ob9jgtlll1ufhwz5umw1754zqulcy6zxubqn4wil000xwsiozn0699bt465pvyuurt6g6edeu6kjtrdpvmtcgxcxn1gdz37azvm6u',
                detail: 'Deserunt earum veritatis. Sapiente iure porro exercitationem fuga magni aspernatur aliquid. Amet ut nam. Dolore est temporibus tenetur sapiente aut occaecati voluptas voluptatem. Non ducimus est rerum et ut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'peyfd2ancndxagv7679ok6w193g9j6mfxted90ebcobyhq99ek',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 're7koszbowalgrom249r',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 05:08:38',
                executionMonitoringStartAt: '2020-11-05 20:50:58',
                executionMonitoringEndAt: null,
                status: 'STOPPED',
                channelHash: '75l82q6jdoj8ltb49me3wuhv1m8zqd543z8zgkda',
                channelSapId: '3qomuuesn3tzhvoc2gopwe9z2fqwsvxdccv8oxlfbiey0h6d0w',
                channelParty: '7xuxsd3c1mzl8o7oaguo75lnhtfd4secz9swvdz2o9m0e30ejiuxkfyrbsegfcyhjftbgqhakm429nw9ahosge7heiiwqbvmj77zpi5ig86zm93mgot9pltdvplkr1ev3ejoax6e9lwojagfnz0hmihyz4oar189',
                channelComponent: 'bvrdhpbmit0rwn75njwvrici6v1pob4v8nkdhm9gmuc57yyluwtl19c4zkcfrjrrmq6sfhelcxngoeu9q4bo6xu34wat3f8sf0kefbku3oomsm4ncbqqj06ekncvjf1zk12bi6968pq7n0g4oatkheckechhqkwi',
                channelName: 'pj3s1lwk4caduwb8xkzwrppnr8s5md9dbqrw8by2e0f6sll6jzbauwfyiu8nvfq32e4fu5xwj3z7paexlvex89efc0gmf1zg1sj3czpy8ujllz0zvz3n69vj44c7a9v0yrz72okvr9fsw9ji900cxwod4flzd2qb',
                detail: 'Praesentium ad cumque impedit consequuntur. Dolor itaque quasi omnis fuga consequatur aut. Ipsum hic enim dolorum. Odio sed iste consequatur sed. Voluptatem occaecati id excepturi magnam ut neque qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '04rfw1o5whqrgu41e7jp1wco3nigtpl3nwgqej0wsak6jz2hzn',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'jnehb5ak6qwj43abjo2i',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 21:22:23',
                executionMonitoringStartAt: '2020-11-06 03:35:24',
                
                status: 'SUCCESSFUL',
                channelHash: 'tholdrecug7p0bfg2z0ocmi3aruo01kde1dbmef6',
                channelSapId: 'wf3askul8nnyyqbg4g0nhpt8i0zmrg0f4by0s2lagjksf7jz7a',
                channelParty: 'rgmcej7jk2p86rg7er4my9fjncaxn6hw3hnh73se7cp89a147x8l4eax2knetpii34yy7nrqre9memo2ftmpeksp6qjh74s3bn39t5sh206a3mw7q2iw7bzd0atplwwf69ajurb76dcj7kwrglr9pwe62th8qygp',
                channelComponent: 'f4uvnx3msl4moffmnsxfjx7ud0zrpv14v5yi3xky923amc1znclu2y1mucyn8i5x6di8vy5g5k8ec1kivfc4t9cl7kzvcu68uh66i1m9qqcwtbkuzlud9g73snbkybg26m78jjmtkdvsv74k59xnl6rhb71swtw0',
                channelName: 'zrgy4p44z03ovi9dga2qowoo3s7ikszaif3gs7kbq8bmtwntd9m2oa5656ul7mlez7k4kphyxjmxpb24y59qw57rgnpguqfk1yfui8spq67lzgxx83rm2fo7ayjugs31aik4cx1v1ik9fpj42lxeaefo09zemi16',
                detail: 'Pariatur facilis et voluptas. Et consequatur repellendus est aspernatur eum eos. In animi ipsum vel.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'camekzt8g285yf6xt6148p3wm8rhril8irnhsp4fo9k9a69ipn',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'f0nzluo1o2a3pe7vjwrx',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:55:00',
                executionMonitoringStartAt: '2020-11-06 02:37:41',
                executionMonitoringEndAt: '2020-11-06 10:21:12',
                status: null,
                channelHash: 'jceu7iqg9898ptwfkvsfpyxi4fyutl1qqp5fm3ll',
                channelSapId: '6aoqsrkrs4itiz8aknm5kfnvzgxmz6ul82pjeic7s5t594hs7t',
                channelParty: '9wh58c2begjom9tmr2lgwlxojmmj3npto4vohre6740p8a0q40a544dzct2jmrwp2tsvhrvfyo4k6ewymwce2qtz8dk7roxxsty03fz9w0ezuf3mele9fkpwiuitucf02lff7u8ot4e5q5v41wjvcwnoylijgtso',
                channelComponent: '3b5p867batdhwcbu20050m2g0kkqnor4smd29vvacufvwosz2bgteuyrndbxokjh260hq04y5am6282yfd9t6rd7ofnoveohpb7jzg016zphn3jpul1mlik2yhv6rrh96jcppyctnj4s3q74navpwximpoju705y',
                channelName: 'dfrzirwxio5c06vu99widuvrcuu3kqi5ckrrdw4twdcixa4mgewu1f88oyvdjbvqvtrsl3zxbiobkrk056ypwrxm2ll89k0qb5kdnffj04x7mwxo8vv03kabjv6jd4o5l615aeafkz11x5sdiu0eyxa6tb11a48m',
                detail: 'Amet harum rerum dolor. Dolor iste et. Soluta at soluta laboriosam officiis impedit aperiam in deleniti.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'xmw7dss7zp4kp6uad7reye9f23zfj9d2ewp766765n9fht8vd5',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'y8uex7bhx02uym8b4ikr',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:23:28',
                executionMonitoringStartAt: '2020-11-05 13:26:18',
                executionMonitoringEndAt: '2020-11-06 02:56:28',
                
                channelHash: '4u46hug6fmke85hylo19cmqpws2sgl0zkvtsq1sv',
                channelSapId: 'zou1cdaz5pl217ad5t0b0v57ppy1pusqb3b5kpdfc7yg8vcqy1',
                channelParty: 'cm64ld1tdrp4yzhoz4tn33vjeoejejkto1e59e1n5jhuqh61vfdty0ij71jscdsuex6o7acu2qvwnfq9z2hzwkvzaogyulbmcgv3f4l90a76msebzsyf34tvwfz869fm4tmqpycqfdww0olef2w82c5xvxzpwzcg',
                channelComponent: 'rnze484r9f0r0wbdiisou2h8tjm1h9ypxh6f50htd72inhwz2y3iyrfq6629z7m9mpuznhky0j8kr6fwqhkb8zmpswnjrgddkdu8u7wnh1av5bjqgj7cd8mzlu5xznr0l5d017lihj9nr94t100n290wmzkq42qw',
                channelName: 'zkyabzv74fsq3cq42nrfbeixkunvab0fcx2d2e00o85wm1tuep6v7qpb07o2wq7bnppshzmvwjixibfzab5tjfuuprp9v07gthf1k01qbek7c3b7pyn2115h2jfegj8ec0e2lk249s60pdm1ssekd5ghtef9p3xq',
                detail: 'At voluptatem sed ducimus incidunt. Fugiat nostrum molestias. Et et quas dicta.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '56f7it7dfkdqczd9qdolr4gjxxrltr5qyddbpdeokcer0r5v43',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'bz7j32yasbpcs7jus4lp',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 17:02:34',
                executionMonitoringStartAt: '2020-11-05 22:57:17',
                executionMonitoringEndAt: '2020-11-05 17:06:04',
                status: 'ERROR',
                channelHash: null,
                channelSapId: 'h1dpkwv0pc2b6j5t6kej646vff0edwcs1f2levrdvkd2gfw1l4',
                channelParty: 'c65tudrf3ukzxgtlbtjau8udro04rde8uic5w5nyg6mnv9u360p28d51d24s42598d6ad8aju9m7f68jjylxa2bt64cvdno169a1nwcphnewkd51voi8fw05ol27hre48q9lnm2jz451myw98h9w4ugp7knsy6dt',
                channelComponent: 'kscfe6g01gljb18cgx6gst474x4tm2nephrdgsd4n4ssjdkc5m0h1s1mxrma7ojb5acn6rcyw7a178d79lzah4ymlznpl2ze8jrjltkbkfl0bvp20me7wr26mzvjuky6tw0jzw37rm7qkxd9xbhpzs37vmurnq73',
                channelName: 'nwsqaxdbt7x6b0h7qezwtmvkwwl80jo8fjoq8p6gbkmmje8y7bakbbf20plnmz82zxfzoicubj762lrc6fpfz3br4bikfi5kod0knncfy5m00n3b81fm7ambsuwtsewf3cp3uffwym3ztul8i5l7io2jj92o0goe',
                detail: 'Atque rerum est numquam illo consequuntur enim maiores. Vel officiis voluptatem est commodi corrupti tenetur sint repudiandae optio. Aliquam cumque quo ipsam laboriosam quidem. Reiciendis exercitationem aut est temporibus et nemo neque sequi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'l1ytohbpugnrtz82o6p4deneq5bbkit0j2py1eqfoheiz70lxp',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'qs8w0ydn9zzm2cum7nd4',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:01:09',
                executionMonitoringStartAt: '2020-11-06 11:46:09',
                executionMonitoringEndAt: '2020-11-05 21:09:42',
                status: 'INACTIVE',
                
                channelSapId: 'aitllnpu7hclkeplowffjskg5ul0htw508066930h1ruse1kxm',
                channelParty: 'rstj20qj1gbu62pzkrxj29puq4mb6e6k131800taci6yjf9a2ccajf57gu6abuvlzz6ii4xee5cfplojbfpnb8amdvs03y7xqajz3rvukishwao6ekdrqlqfk83vy1snb0k4iilplr558dknhzdnp2tncchfqp4r',
                channelComponent: 'cofb98d2jojn3p6ijmh2mz3wa5cm7cs76qgndvyioje693po71dwsuinil22qcovjwhymmkunwln98vcohmm5hxfbuvpukem34b3sukbma3wzot7baciczet31fvyubhth1f4gzedd0rj57l9zrv9o91bmvj1c1m',
                channelName: 'alvgeggh9d54zcrftq9l42cvk5ewo4sadc6bj0xvqo0vxsoyd1bafpcwkgjox4b9hnacxi120arvd2kopg9rcjst2e2j1buymrxfascmeugh23xdxa8co8ri1fjdqe76p3tyiigqqhu8hpl9tzhieezdx7w891lt',
                detail: 'Sit repellat qui mollitia. Sit quia error atque quibusdam dolores fugit. Voluptatem tenetur voluptates laudantium.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '6gpudqm3l7ck014r92zojul94n4zk2447us69hgyaex7axynwt',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: '7xmf31wq31i7xprbwt4f',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 10:01:08',
                executionMonitoringStartAt: '2020-11-05 15:16:40',
                executionMonitoringEndAt: '2020-11-06 08:03:21',
                status: 'SUCCESSFUL',
                channelHash: 'et6sgut944c83md1crw9dyiw7g6heanlyltx07s2',
                channelSapId: null,
                channelParty: 'ox3doj17m9xdij48hkt7kxwm253uoiz2u9iwy3w5fyqd2056j95j4xknega6d83oiadl090rhtuysvhxa8k4u5rtkj6ogic1i5wa9cdqq3rq8lt46fk1dfv2es23huo91k1qjk2qi1nmu4obm4hjee65akpuu0n1',
                channelComponent: 'bkzv11rnumyu2qj1wobs96j5ff478tv1g9bdevpot5kvkcwicvny3uu8jjmb6phi57qtsbxnoa0c9lidnxll4azohzuve7ejekhjwv9rjfwg553qgdyjunmy98ex2iyevksmwrqcernge79i0uqa619lcbs0wrn6',
                channelName: '5eie8z87g17ivrrhe19tzug8jv16ksdetcompkzdd6iv2u082n3edeliwudzwfgk35cbqg32ncksydjlj31jgj4o9dybp2jlhxakom9zxznbmbfgjrm43u5n2k9h8y9n3o2dxae7bxevp8r1tw1pxtzlihowrb56',
                detail: 'Nobis itaque quia. Eum dicta atque quia quasi voluptatem delectus. Dolorem aut culpa distinctio fugiat repellat quibusdam animi corrupti. Quas sequi placeat mollitia modi fugit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'ibw6oi6r819k9usdyvkieq123l3uvwkfn9ybbrgo89erhkgy7r',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'hr6wfagru232g1qsa2ck',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 09:10:58',
                executionMonitoringStartAt: '2020-11-06 03:32:08',
                executionMonitoringEndAt: '2020-11-05 20:43:21',
                status: 'STOPPED',
                channelHash: '2fl0j9ezikzof1qyr75dlykhefhe2cpfkmfkvvk3',
                
                channelParty: 'wv0pbcchpkw4zpyqnhxzmx3ef3lxlch5fd7ykiqhpul9h8dqhrrrihokb1sq0hbmqr46rvfaa8dt6j5o2x71taal1imgap0ryx5dpq0g1r0mdxkc4pcbjp12sl22y8oa4ab58a5o8m9ok7wb7iijputh2meyhkxl',
                channelComponent: 'pit24y8mh6mfs2arlz5q466rlps6hgh7lup2b137o0iullwk69007qaunduk0paowjr3vx2vrvya7xf8mmk3hfmsgfhxghmgomy61vy4l902bzhh5cs9l84pi3pu6kyjiusccwuh25j8m6kqch5g5q2su23thqzy',
                channelName: '5vwzdzj9tb1rib4xtp0dvnpofwj89ky9f1i0d0y1ij1jl7pen7ziz6uofgvpi467lsxzqwawa5c6z4687oh76jta4qlv20ob7x5qw3r33af9ew6w8s0ytethkzxfvzv8nzdyrwugbeafb4heqcwn9i7ozy18xlv0',
                detail: 'Quam quia sint est et laborum. Deserunt beatae eos earum autem quaerat cumque recusandae error. Culpa quisquam enim asperiores ipsa dolor non dignissimos et eos. Voluptatibus dolor ratione qui beatae ipsa sequi omnis accusamus. Sit culpa nisi quia perspiciatis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'kqx6et2ac01efjzadywl4gjp3ce6ph1lfd1r1dwkl3ojdhklia',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: '5zagub6g3xjbvi1bsjk9',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 02:46:18',
                executionMonitoringStartAt: '2020-11-05 12:08:52',
                executionMonitoringEndAt: '2020-11-06 10:18:18',
                status: 'ERROR',
                channelHash: 'ln042tzxhgwexsc54c2e85fdxyswm9pc3cnvyzs8',
                channelSapId: '79efbp7qouvxkjrr2jr49d64rmyn39xbyxhsw9tjliadx3jsxc',
                channelParty: '07vosrn9e7qtdcdc636383mcvxi32nlimdl0q6wiqck9bpbjjopyk0bbcexdputs0uh7giqcjwqpldah73s43kndgb347w9folb2y4a0fjw81hypmhnhb6mb4bq7fki6y9mplv58oczupujubjtlmyz5kkms3bha',
                channelComponent: null,
                channelName: 'lh9ndcfxc05s6zo4tmxwu9syty4v6mn6o6409ce6r04ufgg5h6y9yn1ri5ro1tp3en5kkdgvzf5v1q60wf0ie8czp186ot4sbdbg4asqnpqamodhhfixtxjzf0cwxxzvc7p0ox32c28d9nsx47e8yia6quat6dbm',
                detail: 'Est repellat temporibus ducimus at voluptatem qui. Ipsam porro et pariatur. Repudiandae at maiores quia sint soluta provident.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'velm8g79ly96ovgy08dbh2gb2bd8xq1ybe1bbwf7ef5bc87nui',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'gz72zu4db2uinmjn2ubx',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 13:55:55',
                executionMonitoringStartAt: '2020-11-06 11:00:47',
                executionMonitoringEndAt: '2020-11-06 07:46:07',
                status: 'SUCCESSFUL',
                channelHash: '378p9lloi959zgv7qf0hpe2htr9uennb6o9ismbx',
                channelSapId: 'xvk7noqy6hi96yhmfj8k4e4ppamxobx8nzac68f2x6h0n4b5sh',
                channelParty: 'kisonuuomuzqrwi1sd4y9w6k733d08tzon4n7yqx7jkuilfgghze21bjuls1uu5g72gmu5w10v9bjzb6jcac3mqw0aqi7lfd06co19y9ypum9nqb66dw32swm595y6tr0l4eg58vo7bb9c1ec9bvc3sbbp0zl9yh',
                
                channelName: 'un8nhdty1lr0aoh69qfvev7kgvwjneu87dchrduphknn63nijasl1pi880pyps62irz7wlounbdzdy2zlh8chypzao0y7y0rqjlibuf3h8l6fiovzijtfr7mftsa8rwmfull7239422p7l6dbj6zcxd9gfqsi3g8',
                detail: 'Qui nihil mollitia ducimus ut enim iste aut vero sed. Fugiat nostrum quas atque et animi omnis est incidunt adipisci. Perspiciatis et qui repellat eos illum et. Autem amet ullam doloribus et exercitationem adipisci.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'zghr9mgkfqjm7urtxezqu5jkocg6eht43xmo01cezqkj03sh9f',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'pp6bipsebg8p7p8rplda',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 12:36:14',
                executionMonitoringStartAt: '2020-11-05 19:04:44',
                executionMonitoringEndAt: '2020-11-06 04:48:17',
                status: 'UNREGISTERED',
                channelHash: 't9oagl82sve39fm95f1edpzbi9iwr7bzzcyhjyzu',
                channelSapId: 'vvyrx4f91kr88mg89d1l3nsopp0patl6mwqs496pgnn3vkbdph',
                channelParty: '6retadpt3j1hykrpw4ebv4hfofcz1h1ojd87maxe6hvgyxchfo3p78w167387yti6cnq2vfqpd9ehpyx6nvh6xzonqt737d9yopc6bxjh1twbcfvclhzp0lz10vjqt0sqxhbeqz1w4t7yh0rzomjw8gtdwlu03qq',
                channelComponent: 'v4bv85a0eb6u64a3ejvm0ruxurkv7st6g3itvp18z81efllyj98cm54p9vda0rjcshzxfoi6pf0yseasstk1cx3sbn7mom9njce42crcy6r0jazwun24svdp8w2s2bidvp3b16oon7ihu4zh1exlajsju09p9g4u',
                channelName: null,
                detail: 'Qui illo in voluptatem a quo eligendi incidunt et. Aut omnis unde assumenda dolores facilis iure. Dicta id neque amet delectus illum excepturi eum adipisci. In sed sit corrupti.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'cqfrf3j8bg2hjnrrjwp78x49wgddv5dgnr45d0x6pk0hij0gwo',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'l7lzb4ujao78601iihzu',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 21:04:09',
                executionMonitoringStartAt: '2020-11-05 13:48:34',
                executionMonitoringEndAt: '2020-11-06 03:54:03',
                status: 'STOPPED',
                channelHash: 'i5cy652sjjawv6vw30jvd97eknnt5c2jtgfsmk1t',
                channelSapId: '6irpb1t3cd0amascg811tp6wtkqf7ugyxbpajzv13h2jc3gu6z',
                channelParty: 'vnf5f0b0g5otg5j7az8bmn18pbo05ojpp9ynm2y984aih9tbsbhjlmx1w1gxdjy21pvmno200k0izjk21r81k1gbd5cclxo8gb1afzealwx0ce163oikh9sgcvmt9jhatwqjvypokb8lay772f63l8ua0vsud14y',
                channelComponent: '9kbxvm8km7olgkqb2soi82jlm8ql9h2my7lxcuz1i1czekl8rjhtlliv7kfpb56f3wjynf2emzajfh6bwq26kyhrow74w7mrwhgjyapi6grg6uu1hmiiypc10pa3k72rq2zkl2ieek1z2cfn0t8y0s7ent0b29av',
                
                detail: 'Beatae tempora iste qui. Aut hic et. Enim quis dolorem commodi ea. Libero maxime et soluta cupiditate earum ad similique aliquid. At facilis et iste doloribus nihil neque at ab provident. Vero officia eos.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'r4fntpbumvh2vafz853s2kyg4mj6dbf6k9sjv',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 's1mduf7fba8rsb9evdyizcehkoztc4mdb2eawb57dw3gymy8ug',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'ew27eyqj2v83bxjllexo',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 07:33:15',
                executionMonitoringStartAt: '2020-11-05 23:32:26',
                executionMonitoringEndAt: '2020-11-06 02:46:37',
                status: 'ERROR',
                channelHash: 'x06wg52zhteduv34k87hftsmg0wnotog75i8f721',
                channelSapId: 'k7rz3usccjpwzf1t4u274frhpovgimdpicod6r4tcy3ular7lg',
                channelParty: 'j43oap1o0qpgh9xzuzf28a8kg4a94tahwn4rxie7wwsupyotaw2xgmvnmz5lsdunjidsdjftbq1n9p7fiqsnhi8qz93vismvc1o5kq1slhfo223dek3moomvibgwugqk4xg39pc9u6p8xz4xq7xo0ss8sez5h4zf',
                channelComponent: 'ab9npjgbw9jksb3zxtq56od0y1dgh0l45tso6xvaleex0pu0doheuq8j1fka8eek52wcnya119gzj4rjkkjgwx80drgzuf4wxd7gswy6vf4spmlhbfuu4lhehqc8bbof4rjan2bbmko5l77ldxyg9fk0z9fyblbz',
                channelName: 'aswffdcnbq1bji1uqqkwc8w5reuipqrarol2guvju8i92050foxyiarmij7a7znwhtoymdd265v3dx5u4sj0zkd35xr7l4jwh4efff1j11uw30hc26u4mank39ylk103bed76bdc5mcp1s70jf7vhdlctudw038x',
                detail: 'Dicta recusandae fugit qui quis. Praesentium cupiditate rerum debitis omnis deserunt non reiciendis quibusdam. Vel eos fugiat in omnis. Laborum et explicabo harum reiciendis qui. Veritatis eligendi temporibus doloribus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: 'cpjgz8ugqrtrke9ur8iedlmodqr1pt828uja7',
                tenantCode: '7yhmu26i7h3v6q9w0xi15ixt9o8e58myf8zf72x70azic5pqd0',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'u2rxv79sbcldekvjqo2f',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 21:20:07',
                executionMonitoringStartAt: '2020-11-06 10:02:39',
                executionMonitoringEndAt: '2020-11-06 11:11:48',
                status: 'UNREGISTERED',
                channelHash: 'h4tz8w6yxmofvr4u8ymcnecdgchp2dc7gnnlp831',
                channelSapId: '6174o8r6bru0ck1wjs6x0wh3jtxg47j2ftjbxlyf575dm99rc9',
                channelParty: 'dq8xejx4oo7y15f4nsyeekb84fb9ozzzfdesjxe290cy4tmdymf0imjfkg7odwiga99ilbhsn964ke0ze4pyzzsuq79j0vc8p62yhxyimvdqxbn80oi5zipw4ylxtm1z2ny393g07yfifo6qnxqm2dzq7buxr8q4',
                channelComponent: 'kcj03u76pds5hk3oiipw5jh0yyasen27esq2l1c0z8vktclw41j3n5eyx85wozm094zdjz9kcgd7ap00zupo856gmmab8a3p6b315yvsrlxjael4bkl1sh8l5p8enwej5j4pb32w19ziwh82aj6s9csugthmcpo7',
                channelName: 'lkm5keebbo9pch08netqkn9jf3e043sz83nl4e7xnbfwviq944771lrjjxm3aocupg4vlms3xhbpyovumcgpcv9y8mhrtr6ygfey628kssh76awr89bagqjcypsf9f5h5tk5hs2og2ldn8crzgzbithqi3boctml',
                detail: 'Non ut aut odio soluta aperiam eaque sit. Debitis et repellendus molestias reiciendis non. Corporis pariatur non debitis dignissimos et rem saepe et et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'g23kawj7179blsuuambjkknu8uy5ym7gen1gavkodg1m9hv1kn',
                systemId: 'r1cgf8gp1wxlue49k584toq8nkz1xmnjg7g3w',
                systemName: 'h78txvwcmu8ajyttwp9u',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 19:52:11',
                executionMonitoringStartAt: '2020-11-05 22:24:29',
                executionMonitoringEndAt: '2020-11-05 16:17:29',
                status: 'ERROR',
                channelHash: 'leaml948nmhglsmojw3jledbrox5gtrfiu4zpq99',
                channelSapId: 'd1yohqcwl8mivz8tx0afdo1np16bwybal8a1m1gsdkcmwr0trv',
                channelParty: 'jqmymyqmuhfeub5pugw82vmtdlta8pic5ltlt1ox4jgxrzzqnexba34sa7re5oj4i2slendwbm6kqkna13cmvb2whywjktmelx41mcl6h2hrboe7q69dzd7of25keiy3nqo7z6xx7w616rm0wthzdqmirbarir8o',
                channelComponent: 'gj8sgon23dk5y2ueyun5o8zdk8cbwydodgwiacw1wq85ip89nf6hu92toiunw14p763cjyew9dooiznkakdcxasi9xwjzt8ll8der4puxmt2n06bp3fuu6c9hr9n51mn48cd99os8tq56na65i6hwm2worh8ek3f',
                channelName: 'ds3qvvsep7gxb583uoajlwxuhi63al6gtvdoxbn2m9t75aj1rabt6j3ylh6gosfrstf2f9rgrne9fccihhb7u0adznc5otb65m6d0c9lqikmxet8ncwayfyx72k7pxsmze81s9fie6fmrl345njmn0my75zwhcke',
                detail: 'Animi impedit aut soluta quod vel. Animi eos ea nihil non et possimus neque voluptatem. Error dolor amet non quia aut doloremque. Neque rerum adipisci nisi sint et quae. Accusamus nihil et fugit reprehenderit alias.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'coy0ep52306zyvnlkr0ma6wd6unfd8ny411kzlfrduhlcz0doe',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'xltrhwqvth4vlxwze6cr',
                executionId: 'skrc2nzyffdluxoo6q9et4vyhpxct9inh50oh',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 03:35:42',
                executionMonitoringStartAt: '2020-11-05 22:15:27',
                executionMonitoringEndAt: '2020-11-05 20:26:20',
                status: 'ERROR',
                channelHash: '1vnh3n9qgc8if1rdhhxcghkhf3kpzwp07fqq1hv1',
                channelSapId: 'e6jjmpje3ussjbz3o5swkrbtyroguhtgxp0qwxntblvfyzrabb',
                channelParty: '7by3begzh2l3pq22d3vk8li4g225tycl1txrjfp8wt5gnmhwbsbba7xd7ydoo1ackw083rj0l14rzzmouboodwprlyo1keosumgozvjxswc7vj4okj3qzb70048d404kt8t9odh0nvbde24856e9m2v7v2zg9wm6',
                channelComponent: 'zjcwfaq3r6ipa3p7xu9vom52te6r0qwl97y63avmmv7nw8getq07x7hamtqbx58crncdcy7gg1gk3jklyvmjzzl4zugvtp2qpcjhqabqhanzmxmlxjqc7c4cplxiw3srhlxhcql56b70tbycfc1extk2hrwwwmk7',
                channelName: 'zgehat07b2gtiyfas9b7m57segr8zs1ryf6w2al0x8nmcefno28576ek85olbl5nitugl1j8zebifp97nuqua8r8kphh9czu3jmvdzun3kwt6q5gvdivqhgp9folr8kzdxzwbanplmxwrbfp7cl9vfzggakrce9c',
                detail: 'Ea ut sunt assumenda est eum mollitia. Eos sit culpa molestias aliquid velit quos. Mollitia alias corrupti.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '5bei2951hmscp6l9pmjhwie71k5ciuvy325z70whwws23ivf0k',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'em86z0p34k2u93f6oa1n',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 00:32:02',
                executionMonitoringStartAt: '2020-11-05 21:04:16',
                executionMonitoringEndAt: '2020-11-05 22:00:01',
                status: 'INACTIVE',
                channelHash: 'cv8rotruxomtdr03mm8hr60tbc4hlwljzdpirvkv0',
                channelSapId: 'b96te8v816qlg0ck2ndxs0d2q755ngx9vu5oq0cr2vyn8k1j1g',
                channelParty: 'yu33pol8u4yfu6g0wngbouibmrvkg3mcvzbi0hrsizravcb6svp0sd80n06t7q0uqk240pu3gai43vmr5p9y6o8uqql484w8g0l8y2p3n32mmekvma8zfj2fradk9zx08va3ot4j7d6y1dmkf1ueskkmrz9tyuod',
                channelComponent: 'z9i2wf072bnlsraln0x4iw7j656e80ic6kez2fivfejuhed8fb6qxwi5pxx2jg5fpmzk9gz8apj52fgace6ha7cqbqicycwr6wycazlftk50vowfhrriy2wclmbvpanoc0z2g3x22o6rydhm342dkd5gt2r89c2v',
                channelName: 'rnidu1qw9p3c6bms7270kkixx1ibunfb6a6i430uzw96b1iw8n1bztwyqprf72xthvs0q9739z29q3d5mgmha7xj32kyieh7w75j7hvyrdq6m2n5mvflhgl332ufl3o5deq3dixdanbs0oem1fxqhbx4roqxuapz',
                detail: 'Non voluptatem error quia rem impedit id. Minus nemo numquam ipsum rem molestiae. Et deleniti quibusdam cum nihil. Molestiae aut omnis similique et ipsam cupiditate.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'ly1z1ae4c3u8pb0ph7wpblbmgeckowjbvnpbothsguqrbtq7npa',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'snvj9scysglx4bc6fu5z',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 00:58:30',
                executionMonitoringStartAt: '2020-11-06 10:26:10',
                executionMonitoringEndAt: '2020-11-06 07:39:27',
                status: 'INACTIVE',
                channelHash: 'fhrujypmdhuyaz79tvzab68uhi7o14ngf6dff5b0',
                channelSapId: 'o0kfki186amk792s10felg5pasjhlvf4ot7tnswdvh2fh8276t',
                channelParty: '66a4nm2o7sv1jkxa4v23bg672s13zwd41pzt1h2ub1a07myv5g45wuso3eruaoecsrl1m2x238nbf9w0kggrf38u2wbh1m8lb7q7lsifu7iffyevhop4tlgy9j8t8djwd48n5ia5p084xr6cix1qpkhxpf5lrfqo',
                channelComponent: 'wbfp741ms2w35ushatunok4ucsqjqnfoqcay9hoeh6ct4wt0ecpaak0xi629zr09mhqvzb29uyyqd0czag7bg128egpgvsip264g689nf472p23ulkt5azurtoli5rk6ra9r8wtorjn2xnqpym3s57sx5uozn4km',
                channelName: 'r1q76lqpcwaoelog4lbmawgac5ledx72x6ai60kthhk01zxeu11u6a0t9ks7avucx5q8b01jafqke5gw69j8r66po6dlgibsx6i9t4753o48ilgqq1yjm69kd6n1ma3ktkkfn88gck0ce7612tu5xr7hs1lz1lah',
                detail: 'Voluptatem quae nulla necessitatibus assumenda voluptatem dolorem qui officia. Rem consequuntur iste itaque et. Ipsa aliquid nihil consectetur harum provident accusantium. Esse commodi qui dolorem repellendus ut optio. Fuga vel tempora soluta sapiente ut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'lhxhcxe3nqxmgn8d52pkomhh21rsahklyr02mgl21yetrhmo7b',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'w1oi7es44s0u3edzh85tx',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 07:54:23',
                executionMonitoringStartAt: '2020-11-06 05:55:50',
                executionMonitoringEndAt: '2020-11-06 11:28:51',
                status: 'ERROR',
                channelHash: '71amyz3t8gswrohwnklozqydw40xfm8detgw5zq4',
                channelSapId: 'zga0762dzrnbfh57nawbm8c40y92uk5x88gap9fnan6r5a43ny',
                channelParty: 'rzbnu4jk28utps483lzq6qhk1d7h5o2kr3nldiw6volh55hcpol4esfczqinojd5nopv4ihcmcwhf94a10cjnr4nyn6kekt7z4201g1kubyixmrim22nwssr0f8vx8bi4bo7xv9ph36ecinr1nmu6om328sypy1p',
                channelComponent: 'y69g92hcolw07s8glnlcbf3j9ipmyegsyjdyythl1qnt5uybt3wzw1yci17to7awakyi8ttjzpom9hzv2mhqy9q4dny87mcc2uwhg6ti131e3gfrtxulbkoyvv917d18og6kukocxbw5rjoibne7c8zesz4emilq',
                channelName: 'o5kp0unjubnjsg08ymkpvr2x6tg826y3y4phmlddgccbdel43y15672k4u4zml2xr7ftub1hgjggxejahbqemjn8kq89ub2nxlrxvsocbak383h4wh5wibi6jxhsbc5bphpkcptlk2x54ghtnh8a2jbgf5bdt3wz',
                detail: 'Est assumenda et quia ut sit consectetur ipsam rem hic. Asperiores consequatur aut aspernatur aspernatur laborum ducimus autem explicabo. Est iure ut velit voluptate. Assumenda aut quae ut placeat.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '6gqz9qe5oml02uta8jy0qezaf7xndtnj0hi3pcrcg43gvcy8bs',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'kym0qqfpytfygt6hgeeo',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 06:11:46',
                executionMonitoringStartAt: '2020-11-06 09:19:44',
                executionMonitoringEndAt: '2020-11-05 12:13:12',
                status: 'SUCCESSFUL',
                channelHash: 'duad3u1zvalwldc7tkqmaga2ph8spzqysu0rt1cr',
                channelSapId: 'rglg8vzdevt0pioen6m4rtfy21uyes6mffj0w6tn7l51okhdjl6',
                channelParty: 'i3b212ffjpieiq4476ozm7oaywz3axpd523r6a9shye000ph4grol4bxcjsrkp5kofjsgttyfrrd1uw8yi7uvrtqkqke43l58sb7xow6xdkgh2agbk39gpaj5ya7hmjrului4q197an996473wgu7owl0t535jar',
                channelComponent: 'f5rdqe8ak35ivniwwdcuw1qzqdvs0w6ro9dtvgudfnzqap4vtrrglq2c9t4uhc2m3n7a78lp73beu32kssmcu4lwul02r6fvfhu0nupbgngf5m3g93fwgqpq7y93ljpux27cc8zrwn6fmkegc2o15dk63i31p2qs',
                channelName: 'lp1s5o3aaiacw2lw2itw147qck9ztnivt4373od2zs5kh1uypztb2gxuipxr7mhxi70km2161iptdspej994ur08k77bzc1unrh29jszmij1b2m2u4js2q2xnonr35a19p9anxlxgsn4i5uubxam1ya6gjceogs0',
                detail: 'Dolores velit explicabo officiis. Ullam quo sed. Hic dolores cupiditate cum autem nihil rerum magnam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'aqjl0g7jaqepdadsczfma1q7yqu1cp6bnx791grcsh1188q19e',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'xmdkjpu45f42f5wts17v',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 23:34:09',
                executionMonitoringStartAt: '2020-11-05 22:17:18',
                executionMonitoringEndAt: '2020-11-05 21:15:33',
                status: 'SUCCESSFUL',
                channelHash: '4h11e2aicm23f6oduhyvm31u8zg1mgi74jtm4dhv',
                channelSapId: 'rotprp2ujn4j6vw252jz9i0scrsp6sejl063vfpa35enyq6m2z',
                channelParty: 'hukr2u2dnw3zkppax6hfb6t187rswytkam0pwswskv1zmkffu9bqaln64v1czsoviu2wiz6np24qqhhl99sxz49obqeohpwlql2yfwydkit36a690w5i7kw1fplgwkrcm1rjugvfdan5bb6rxo2cdkkp8t9pewxny',
                channelComponent: 'jftrlzpsexobrts9elgf1v0z46ojmr5mgjeq34kd9b7k39hqlnmjxp3jxpugcs72h4hrorj5l1j4p92p41qqffwsv1sch86jmsu6agys472s93p34p91mvlcdjz7382t0q91br6g85o4x78o2ryapfxm5fr6d7wb',
                channelName: 'zm5gbea9368x0uuc5wazx2ecks6g0qw5cjsq8gxhqkw0eqcaewat95z4t4ywwcwp5166lz7m63vpirloxgucc8bxcktdi8yddcx19zl2urg5jqlqbd8p6u0gp36w9ofmy4mez0aetdkoffdbhodor3t6k7fwv2nq',
                detail: 'Non amet blanditiis nobis quos. Explicabo autem quasi assumenda quasi nihil. Occaecati omnis et possimus magnam et et rerum rerum. Itaque enim maxime culpa. Voluptas ad quia molestias minima doloremque in illo iure occaecati. Dicta voluptas exercitationem dolorem tenetur laboriosam odio voluptatem optio aperiam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '3fiy9ssc8j4mi03wgmht8gdt090rnq3x7mnzde1ah12llazcgk',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'lcox3wewz9nyqa01xmmh',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 17:52:23',
                executionMonitoringStartAt: '2020-11-06 02:05:23',
                executionMonitoringEndAt: '2020-11-05 23:28:57',
                status: 'SUCCESSFUL',
                channelHash: 'olojt72lfobr576z71rfxpyolqql099z1z54wn6y',
                channelSapId: '0fv9i4lro2mhgt80lz747qma7d0yy0chw3xjn54q14nvgn6xgc',
                channelParty: 'qb5whb1lvh3ycfvxt47l4zt9bmong7y5jlodc8ca76fpj75t43g7ad2uuwzre6ifwqw7t2ui7jhgnby30j5365xxbzzowl9cbmxokquyndeoqcbzlv9m94iuvbh70f6l4zhgd9hrxq18xch75dvcyqammapet47y',
                channelComponent: 'dof8pmy077dhpbasbflvr5v13j6dd4f7mnt78727ku8a9x7m5ps2m022smr4em6u4808mtzdx29tdxocuaoi2s14ar66q4jlazhh6qm7daabr5efs0irmlv00jigxnv62loavcuibsjxo4rpfws2kba2p17yrybku',
                channelName: 'ej9jh393ig1p88y4en4w8pbw0egsbmo1umrhsky3d6gl7gdppbvkx2p9gqfuul5tn0yqusjzjxrfpxag686mi92xod4hh8romj99cnh1wk31is7n73gi3vimsgi5qr30e1gcmpdf6hl6fhlbrblqwij8phtis3uj',
                detail: 'Est quia repellat voluptatem architecto nobis sequi. Aut aut repellat cupiditate accusamus ea et. Amet natus quibusdam non laudantium. Id tempora provident dicta provident maiores ea. Non similique itaque vitae est porro. Nihil consequatur consequatur non unde.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'f7dg1xk6ccf6a2ecpz67w995n8axpg138wuinyzdcu7a76qe2u',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'ilpak3kaxiahypu2wicx',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:21:15',
                executionMonitoringStartAt: '2020-11-05 15:48:45',
                executionMonitoringEndAt: '2020-11-05 13:05:21',
                status: 'UNREGISTERED',
                channelHash: '4st7oa0xqd43xfl3gxyh60s69ul0gx9xswzx2gaq',
                channelSapId: 'ycyrn4kfk5cc39qfsqdsqo2bu3sefhtd87vuvwohre8bexes53',
                channelParty: '9cdpvcu19fukj933y9i1swo4ip74zswh0r017szf9woxvumduytyspldh3azzt8tk0twg3p6gkh96cp6htxj3x20uc6w5ar5nhcsu3xoduax3eownhx0xj7ud6vpubg9972zb31iwdejmknww12xjqhrplepvvi0',
                channelComponent: 'wps86gpjzbosrw34nvioszh7ls5tag2al8teynzuuv1y6acl2kyo7o3ltxqbvf0t2j26pi14mc4rsb8pxnvia0bl237et710xd18b37rvk3nytfzo8ml5hq6cmg7de9yaft9r8fb1tcmlt2f8xamygng1i2mis8w',
                channelName: '0b0no8mfho9badp3lv7k3dny2q2ndnr7gdkst0f4j2zte5hvrq7ssm5j84be9vx6g0g4370bt2wkit7zqyx2zm1716p2nhjx4l3blfc5hxc7ploifmtkv5iqcr553lfkrguzfu9u5gag6frvhfo1rx1lqdyv6xuh6',
                detail: 'Facilis vel inventore eveniet ut repellat voluptas autem. Sed officiis in aut. Dignissimos laudantium atque velit consequatur quaerat id et explicabo et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 's25z6ktohy2hkb7ak19rqly0q67w9a3ctxc9ixsmyr2osj54za',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'm3axihl4528mdn5r43t2',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-05 18:17:37',
                executionMonitoringStartAt: '2020-11-05 21:48:57',
                executionMonitoringEndAt: '2020-11-05 15:17:56',
                status: 'SUCCESSFUL',
                channelHash: 'fwa8moclcygyvd6hk5fsx1zuk60m12ux65h62yad',
                channelSapId: '7pkouqhoqlkpzmdkiebmt4kgifmgv11u0dcuke7jt0mxuxnx6k',
                channelParty: '3afxxr24qyhz3zjb21atn61i5p7jzcesc3dy8pan1thpuoo645j5gz9lrp7ryv5j3isgz1afhte7516dnw2r1f2dpsxuu8wy1j4hfnq79hk9hq0ivgd0atvdgzcw0a8a7k3crekh5qrf1yqe4dakqhkc68rzlfn0',
                channelComponent: 'ijpg7nlryltzdmyc91qkg02fpxdnx5ly94jnobgq2zak1cmq9dy4ni8iv5tlnohu5gsc50def9x0nu5u0kp37hrvj3ka173a9fuuba350o81kt1hoir54fact96amcv2qka0s4xfd8wln1qmdkpdut1pe9ejd3vb',
                channelName: 's1q8zb8cbr7s43ia0ox1m3so8r4asrl7rdbx5fqwhhdrwl7xiwuaeeq0b5jlqic1n9segf5hbm6ikhc6d3itneubt2rp5zvstwfuk7efeppny9cmlg18w9r6fix9j8hjfz8ep8quoago312tt43txu54holhvs0y',
                detail: 'Et qui dolor incidunt explicabo molestiae. Pariatur porro quas deleniti. Est rerum et maiores atque totam sint. Molestias quis voluptate sint aut. Labore culpa velit error magni. Similique asperiores dolor et enim at consequatur laudantium ipsum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '7xjwp1b4lqlpq21mu3r8596b0dbf70h69rb9ppl5fj5ok0vqer',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'c96p2v6rjwgwpoc1trhm',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 02:42:12',
                executionMonitoringStartAt: '2020-11-05 15:55:35',
                executionMonitoringEndAt: '2020-11-05 21:54:25',
                status: 'XXXX',
                channelHash: 'xanxvep8h5tvicfiayg3jlf2ejqr76fjxganaauc',
                channelSapId: '2156tlbvfbj1rvhxgk99qc9tqmj54ededar01e6l7vw9tw4h9i',
                channelParty: '0lytfqarpn9y23xlwr8d0h49oi3q49hye3di6nnnekixw19hkwgf93vh1b74pau9y0auablukmcwwkrzznm1goiw82wtia5brhd9ekogjbxd2gr6jve9jhxw75a0c0xh9sy0vz2ahi4kjemw5uj3l737xmtrbw8i',
                channelComponent: 'mg61h76lh2m7ny46ojx4gdx3z0z5whsd5yk21aqd8b303hfxk8gioehwciohfxyzmnnut8124sifya4iztpm3f1sqdv4uzcwmvkqerco8v9wkzsjq6nklaguozbui9h3rowde6sij6tr4ncxvq53ooe8giid5k8s',
                channelName: '0irhqu85i4qtb6364krjlqc14yhurgucivvz6lnxihv7yxptjgdbiwbjcj9dvhwdc7reqigj3tss4mtissfa4zlhy0j9gdqe8d9dyoc40uy2ysquryn5kgnux9mckeydhp3ntj0xx5d198bnrl6u5h2xbl314t9o',
                detail: 'Cupiditate ut itaque sed. Aut debitis et consequatur voluptates. Qui quasi sapiente dolorem distinctio voluptas accusamus suscipit est. At harum voluptatem temporibus consequatur dolorum sed cumque aperiam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'dmh6hj0o28txxk4wrs3x4mlcotga752g94zg39qg58k3jy6qky',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: '6rs88i6gwzv59qk5k1lx',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-05 14:48:32',
                executionMonitoringEndAt: '2020-11-06 03:52:51',
                status: 'SUCCESSFUL',
                channelHash: '4keq1ebcddkxcgcsilg6x8jp9vfj5ro7ipd8fvdx',
                channelSapId: 'u7yuono9uhor3be46rrznz3njslj948smlkvg7o2ezzxy2dyzv',
                channelParty: 'yqua83mnzp19qsemkad0isrfi9sf7skfc7kftfwh5ih40fnb0xpqe5781u0weyeofm8enn2ssmk7d5bqtxxfc7rm8rqr5ypdec4vl54ajlsyq6bwhankv6fm7l5bhaz9pcpn13z7eie92lru3pjfcfu6qujtlzk8',
                channelComponent: 'jy918b5dy9vrheo8gymb68j11bjabk018hqkb3w0dfcspcqcmp6w2du5oodx46fw1fudwu218wa1lhjac7p4z7tstpde1mt8v5e0juuhw72ohasw9pmlel38p3po2wi9yesv0l2dtbi2dtdnn5ckzhg0gcs20uj6',
                channelName: '7c5hpwh1a5nxrwl5n344e8ar7u773ajaf2tw59b8vznsl426vnlk12jlvye7gidndjbfez6bvphajsm5g8nngb4hsixlvm7k13b7dg033c6ht6nydgapn1lk9a4jq12wuod1nda8m0pgjfeooj6nxocjlaetomk4',
                detail: 'Occaecati dolor id iure. Sint fugit dicta odit. Vel qui eos mollitia perspiciatis aperiam esse quis. Ab a est odio.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'd47zb7ag1z1x0dt7qi6pyoifipqg0zmqyk2mwju4d9o2e3zz17',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'gjg1m58cbv583bysodga',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 22:48:32',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-06 09:29:45',
                status: 'UNKNOWN',
                channelHash: 'uhosrksg7vuykt3nexviqzsp4xsln1d4ma7wscwg',
                channelSapId: 'pwvx1kvmziu67n67w9te7xuqo6f7ljwe35p63gn4r1qo9j20o5',
                channelParty: 'tcgbmwv9bszdob03q6xgwrjnkn3n0u9el162sva4px6h9kzkfygmqyf3m45rinoorrelty87zaxf37urluhvedl47448j3qz9r269kwcaxwlhzd8o8adogxclkfbytv3nlg7h3aa6jhu82ws3ohqo4nbub6d1oc2',
                channelComponent: 'mpidu33l3xq7lojn2hdgxd27kcux307a81taezprptuvi3qhef1pc73ocf5a9hka1cro4fk71qmub0p6dils3xqqwmn1hgug2lmgdgt7p9mxb2jvdxb5s6klqwgu3xnbnvl28n0ko4lrst40fhbkpprp2i70zayw',
                channelName: 'cjjo65cojbabnatsru7g2ydyb4inrcuglb2hw4e6ou9vvcjtyrzw6r6xwe4anwo4juopwlye93sk4usz1wyd2g9ple4qx30pig4vpnprpll0b5fskk1b1xqqbvotvggqo65yb3pzl1pcaha8tsha3d75fgan8h89',
                detail: 'Nihil fugiat excepturi aut repudiandae est. Dolorem molestiae voluptas est alias iste. Eaque voluptas debitis incidunt autem ut. Ut facilis in. Iste ut delectus. Quidem omnis nam et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: '9pmluwd2t4ikiqx3fosvnflgrtu75cwj4gsuysrticlodkowql',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'bd40z98behiffyj3ycc6',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 17:21:40',
                executionMonitoringStartAt: '2020-11-06 06:37:26',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'SUCCESSFUL',
                channelHash: 'xmq9d06lsjkag3qrw8zmmlybri721nu6ia0cik23',
                channelSapId: '3zpj2lisvs3z0xey464cpfnnadedsgnfyuwdxw7ut3cbcemp5k',
                channelParty: 'kzc6q0xb7ezr415s03n3qxt7hnjflf44qx3sgms827ip5gkda0o5q32j84lmapk684dz05rx1bheu7sp7yvhgpgu44karmk2t8b2x7mvcuftykxipaw1a8if6nz4pcncia3liv28ccadjbwq46r451kq51itoc1f',
                channelComponent: 'ucgrvt4a2tz5qt33t4dam276svfuwqv6lhk1k2bdu7nxkx4sw4ghfopy5u07khoasog6mpq6k0dbjj22eb0su18msk7tiig3dzg5rtjzvx9rpmwqhxf4netqg063xpcs3iot8npilawip0hp2ofnanrkanc5tyig',
                channelName: '1qxbw1myqre82h5je8p01ilrswkc899p7dotw2qlqk5v74njkzbkmsym4py5b0bwrlxlz835ae811bknjymo28q95lvg6knd2rkuwkjrn55ba9wudoc4uwtnbic1lqfzy327ngt4vnhhrfnn9d5ybqjpmjjyq3f3',
                detail: 'Ea maxime inventore non saepe facilis. Minima at officiis laboriosam. Aperiam corporis omnis. Fuga provident mollitia omnis blanditiis facilis inventore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'fwotd4t36azl6hfn5ykb98xyzux1faeea00ii9c5lwe0ds6aa9',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'f4qj19x3rzndbny0moyg',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 13:56:54',
                executionMonitoringStartAt: '2020-11-05 20:48:25',
                executionMonitoringEndAt: '2020-11-06 00:22:26',
                status: 'STOPPED',
                channelHash: '2v20fbpv563gbchdy1etriqsyhh17csml6x6shj2',
                channelSapId: 's6vro3yyhgx6tbuxjsbolomnqaefyb10vuwqsdphuhngdktgok',
                channelParty: '36pf8f48q45qumr9xfqoswno416xvxbn2h9tvauwh3faw7of29rze5u2g00yw7buaa8gvs5bfuvo884fexndwvplx4bvrysvh7afz1pcdlm062nj5842yvwz9kgf3ix6hpzev16j7v41b0ulftfd5bxa7utvn8ek',
                channelComponent: 'amea8iadx023azqdw9w9pm7hgktl0i49kzoursmmsd5aef937w4aozyw4mkc96kuri1snevaa0k2cpt1a21pdf2bulr1bvbjqirdmru5nlslxd12dxqx3l5pqpm3q4zxegc8dd9nhzrobcc44ibinyylt61cd7zu',
                channelName: '5uwbjhs1rmgtktp4hm66fwv39xpzmr1havde5r7mt2i66mrhg30f2ho7m39kk23iip8cuktmt3biuhw8g27l5i1494lrupjt3d82hx718c5gips1ehj5ipm2pybkwff97anak9dmwv9f8morga32mr6r16tvok3p',
                detail: 'Officia repellendus dolorem tenetur iusto similique quam voluptatem quos dolor. Magni deleniti culpa. Amet corporis cum dolores. Tempore quia quia ut quam. Iste fugit quia.',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-detail/paginate')
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

    test(`/REST:GET cci/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '834e1830-a954-4d65-a8b5-b010db6cefde'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14'));
    });

    test(`/REST:GET cci/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/0c3c7ea2-27ee-49e0-806c-04824c11ce55')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/d41f40aa-e5a6-47bd-8a50-59e7bcd4ad14')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14'));
    });

    test(`/REST:GET cci/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '1719fbc4-4f1b-48d0-8e56-4ebcaef4e5c0',
                tenantId: '2cddcd35-9139-4c8d-8e0d-61e3ac454d97',
                tenantCode: 'zqv90pdihuprkn3oj5m26hfpx5o3hgcutv6s7yqd6dujo6hbvc',
                systemId: '0fa4a85e-3176-4c23-a87d-8159ede28a6d',
                systemName: 't33f5yuatls28gq4qhgn',
                executionId: '3626553c-9dc2-4d53-a44f-b7634f414e83',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 02:12:58',
                executionMonitoringStartAt: '2020-11-05 18:02:55',
                executionMonitoringEndAt: '2020-11-06 08:18:27',
                status: 'STOPPED',
                channelHash: 'ibdja2ppfd43o3di1u8f9y0ehd312f9yvrqjqr5t',
                channelSapId: 'qou41y6l6f4atqeefillvc8cmrwpa7cfdk5hcgklqojgk7m283',
                channelParty: 'gyk2ng7g8g4gwxiixpl5eeh4jh4jittmuh5mi9vvbciaariusirez984z2t8n4gxe2o46kjksn2sct3t3dw4l972v43h10zyk688c0uli8da83pef7w3k4g41ks65dqdqlr76z54encnps5b6tdebf3ygij4rpwu',
                channelComponent: 'wo7h7g0bbb3yh84zusq2ycqye06umzl2f7ymilyv56ajm0vb7mcwom2zuex2z8mdmqpo23oflq1ovgqr48y5efmz1fas1oiulmtg1fp14nby74zhxj07c2wr565ujpfpmv1x242puut4d247rhpd83ifao95si96',
                channelName: 'qrsjqlmgdtz0dydkgofs5ggc1dmlb80yek3z400p8l0o323n98npxqg61gjx9ovvp8tbwke4immhyzaokssirn64vqcg6xa50g52itx4edh0rq7fow1eihm1kjy2sw1dghubb5h5gqsascpvpspy87hlpt798ols',
                detail: 'Id asperiores ullam eos. Quas voluptatibus molestiae aliquam nobis quia quos architecto aut rerum. Consectetur voluptatem autem assumenda. Veniam odit nobis nostrum non qui minus impedit autem dignissimos.',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                tenantCode: 'gw1cytue1nc5oom1t2dclkrrrld1l6lcnjaxu330935jitqdxx',
                systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                systemName: 'p93c30fqc3igggyolmkj',
                executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 17:47:17',
                executionMonitoringStartAt: '2020-11-05 15:40:48',
                executionMonitoringEndAt: '2020-11-06 08:26:57',
                status: 'STOPPED',
                channelHash: 'asvg2rj5zzgsx0oyt2uxmu6ff6x1az1l5dyake19',
                channelSapId: 'sjws54p7c8ixwab95p0av0m9uff2cklmaxbc2geja08otza44u',
                channelParty: '1jzkrmghh3lgh9wlglesat614mbu20951fg9xyvlgos23kjhckc5x960s3cd8wkxoe1xg8yzat64sq91tb9dijakph7mqi8pp35muiichfv02g49o078dzipr0ihbhlthiuaoeya2mq8vovg1zomcho0wzxqpzne',
                channelComponent: 'plmyo4vb639xynme9a0mg4fectwaahvczvkegdnrvnuj95r11zy1vz749p5kj2crkd4n6b3nj1ul6injqw7ouqitlmg44aii7h36ni11gpll6j4h24cocvbbpqbb3yhk4a6rfsbwac1zrvdmc3z9q2qm2g3rftba',
                channelName: 'aiavv93ykds5l3fphoj87jgx7ptnji8ix0t52uhufsm2bdm06rkqh5lb3iafbsv58neb56t3i9t4g0ovttrpapfqtnf0x3zhasgya97nmx9ie9bg83k5vh2l64kdohkb0gag71e40ermonknox0x5s0txzilhln6',
                detail: 'Eum ratione et. Quos distinctio doloribus et tempora dicta. Qui similique tempora est. Asperiores minus qui exercitationem perspiciatis. Vero eum perferendis vel est. Sequi maxime ut laboriosam.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14'));
    });

    test(`/REST:DELETE cci/channel-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/c853af1a-70c6-47e3-bb8c-b8015cc47536')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/d41f40aa-e5a6-47bd-8a50-59e7bcd4ad14')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelDetailInput!)
                    {
                        cciCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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

    test(`/GraphQL cciCreateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelDetailInput!)
                    {
                        cciCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: '99a2686f-bd62-4010-871d-aa05a471db4b',
                        tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                        tenantCode: '9v7vaijbrpz8e9sn34lkov32ku4bjz3p4zxg5jbya1sd8kt3qt',
                        systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                        systemName: 'lcoo7i06qba32k9k03lq',
                        executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-06 03:19:25',
                        executionMonitoringStartAt: '2020-11-06 11:20:56',
                        executionMonitoringEndAt: '2020-11-05 12:22:26',
                        status: 'UNKNOWN',
                        channelHash: 'ma8gg1yyemxq08uqdvg8jxbz2g9kyzn8ysihxpaq',
                        channelSapId: 'b608ebpa2kwlb0z1m1mjft5fl84a51bdiwet9y7h5b6zebd0rg',
                        channelParty: 't978vqke26fwqdwcnktm0eekhtbzp0d026nou2o0vadje3hbm7cdgfi457ebf5gypf5oc1uyjfq0ys4cit68h573sosfr2dkioh1biclvlu7yf0pn3ucagmuqj8jihke2bm0jqofn5s22lyzqvoxjibweo53vyxi',
                        channelComponent: '2texbk7he3sotnyv0qpp9t5jjzzddok23r80n0neshia5b6vxc134v2io41ycvv84i3s33eyp94drw5fi48ion4k72xqg2t2hj7be1abmhb58q83jv74e2yblj0lbz5ybmqtsk1x932rut2lfkyra6o8fdkfim7g',
                        channelName: 'vhuamgpyd9hrfj81jjfxphmrw9i6bb1kwqp8os14pqeyngn9sygme1xq9bsyeew032sl2t4al4ibajos7wmk8efdq1k0uc1si5lluoc4debgc9s0uli66kl3j59mmtltppzup2m0tio2mlcym669yi4z6awlun7v',
                        detail: 'Officiis sunt nihil quis id eius enim laudantium commodi numquam. Similique est possimus temporibus laboriosam sunt doloremque quod. Omnis vel repudiandae in cupiditate harum labore quia. Sapiente aliquid harum.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelDetail).toHaveProperty('id', '99a2686f-bd62-4010-871d-aa05a471db4b');
            });
    });

    test(`/GraphQL cciPaginateChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannelsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannelsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'aca512d4-65f8-4351-bd2f-d12aa1e6be3f'
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

    test(`/GraphQL cciFindChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetail.id).toStrictEqual('d41f40aa-e5a6-47bd-8a50-59e7bcd4ad14');
            });
    });

    test(`/GraphQL cciFindChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '40d889ac-29bc-46b1-b94c-8b420c2be5a0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetailById.id).toStrictEqual('d41f40aa-e5a6-47bd-8a50-59e7bcd4ad14');
            });
    });

    test(`/GraphQL cciGetChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannelsDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannelsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelDetailInput!)
                    {
                        cciUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'a6a563ab-c058-4d1f-855a-dd01453706bb',
                        tenantId: '4c5b88ac-db70-4c65-87e6-760ef6b9ee56',
                        tenantCode: 'l0x0rbi888rvdqha2fliz5vmggthnj2tms1fc9xni3m7uiira6',
                        systemId: '23001a99-4705-43cc-acee-2b5069d6896c',
                        systemName: 'pra9cud3356s5mki617y',
                        executionId: '0a2616ec-8311-4574-a4f4-f1884f7c3408',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-05 23:10:40',
                        executionMonitoringStartAt: '2020-11-06 04:45:27',
                        executionMonitoringEndAt: '2020-11-06 00:09:53',
                        status: 'STOPPED',
                        channelHash: 'kynl8ds170qe7af9k0zqsjky1wvif26w73njq5om',
                        channelSapId: 'vl0t26gcd2n5q1tzd3ojim7nnvbmvhmuvd2s9l6x7ynhoe5pfg',
                        channelParty: 'f4n0aqepn25fb70nw6infurla71t0feig6obmw69e65p26nn16rrnhc7cmrc3j3xd2owu64avmmuso1ygzntpwyjedd72vb93cgm1l0jtl3w6w6r296ldbgn3f0j0fn986dr4okxk98waflm5helu3b80xcuscy7',
                        channelComponent: 'eiuszw4e7l3mqbe0no7wmw7vqcidy4gf3e8w8yc4ck8ziyastlcub74pffg8vkcb0qxb0skpfc9hb9go67ome3hao1vqm0g5u5u5skr6j9w9z4row41o91d4w615dygibrn0ztmd7s3107e1b0iysm7rhohbfdjz',
                        channelName: 'vka5uoil25szw1xdwzaz1oafj1eeujoxpogap3errlwaerct53d6ltthqb5xacdbtoy82ty2xpcft7cily5lfdz41awh6w7vr9u1cgc3khz3itmemplkr17mbbndhsvjtsnaqi2gpsefkylbqxuqikdhjcdl9ae0',
                        detail: 'In dolor ducimus. Repellat molestiae reiciendis quod enim qui blanditiis quo. Dolor enim qui labore.',
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

    test(`/GraphQL cciUpdateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelDetailInput!)
                    {
                        cciUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14',
                        tenantId: '071a5768-25a5-4618-81bd-0fc6e9792c32',
                        tenantCode: 'oyvarpfhcnd31f5ne6036ghpq83nnysppvrh6e4laenw4gmw8g',
                        systemId: '3de17313-c5c6-462e-bc3a-d37cecd08be6',
                        systemName: '8vw6zgklnshspshtne1x',
                        executionId: 'c87b7ba9-f3d9-42ec-935f-26aa89eacbbd',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-06 02:42:55',
                        executionMonitoringStartAt: '2020-11-05 12:38:28',
                        executionMonitoringEndAt: '2020-11-05 22:04:21',
                        status: 'ERROR',
                        channelHash: 'lr8jtggsx8sf1m8yw1c8lhzt7etcfz5qhcro3hys',
                        channelSapId: 'tbe0ipjn07kwnqrmhiaiq562zow60yl1y178w8f0fi9xe16hmy',
                        channelParty: 'di3ft8tk3d5oub83d0yah1gfz8t2pbbfjbbnqb201w0vx38xymbageqayvhhmtjqk54mqunwajw9becihpv74bbpzplxdgwx3oxvl1dvt2cd2d55b4ge1j073m5g392uzxrzkpa4q1vinyvbnx922ybf63ld4693',
                        channelComponent: 'y7uaao2hbe9htp4gm8msm3e4kdg4a2nmey7noeq6ugmxyooka4i2i5fwlu4bes70k0dl2fl4rqblxzd6f1kibk9iils59akhwhrybdgqqglsho86iqs7re5chghl771qa1932yayd2qbo9rhxu7nhxx7n64twofu',
                        channelName: 'nto6d2aaytpjmxh17vehy4j7ym9vq8bq5xjve6ibpofpck55bowuf22n3jdhq5m685r9vtmjvkz2zk51sn97yuu4y9r6gh3mm0utp1zbhdn7dgekdqe35bqwiqxk8tpx4wa08hn19a8vhp70eknewyxy6dhaqwjj',
                        detail: 'Quia eos numquam eum delectus iste enim veritatis laboriosam eos. Ullam expedita fugit sed illum quo. Totam id dolor. Ut sit aut ad.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelDetail.id).toStrictEqual('d41f40aa-e5a6-47bd-8a50-59e7bcd4ad14');
            });
    });

    test(`/GraphQL cciDeleteChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '14867756-d8a2-4d72-a10d-e5c9b010e7dd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'd41f40aa-e5a6-47bd-8a50-59e7bcd4ad14'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelDetailById.id).toStrictEqual('d41f40aa-e5a6-47bd-8a50-59e7bcd4ad14');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});