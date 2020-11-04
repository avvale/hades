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
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'f06gr7m9jtlcd92u2kvxn5r0n5syr9asfyxfrloetx6inacogv',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'rugfbt0kuf4v8nc2hor8',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:01:43',
                executionMonitoringStartAt: '2020-11-04 05:44:29',
                executionMonitoringEndAt: '2020-11-04 02:25:36',
                status: 'UNREGISTERED',
                channelHash: 'gogrtkuir5prsyauhr44rfs296h8n5j8lsmtpv73',
                channelSapId: 'edmdt4pp0oxq5n1rx9dt583ouef9ji7wxcl4jvqxr1eupxy1yp',
                channelParty: 'x4j0bameyzgvikbri19pe2l2b928j02svys5mptc4lqvn53z9lh0tmywzsxgtmq1jg13tbcgos3g4j1yh8q34h0wfsry7b5vddvgwnjs7k2ll6dvaqbanfuii5mngrnbrg7defqqlqnpywtl3v240lcjk80vn4ln',
                channelComponent: 'o5lhplnqk8bxyl75wzx5tk3g7a478lrzx7ibw67dmhtb45yltlme82zm3ahnm3e6hc1831y28wdy1r7c9io3ckozjecaj1rt3pfkfog87wbohj98k9pbu7lqrt96xsp6swgqn6nylb4pvqpfvky7jhtu99i9kxmi',
                channelName: 'xi336pqczgvjqxg5f4xygnu68u65mgf4fvm7uf44rcx0y8s1kk4h3j8s7i7uh1i55w4lmnghfu1wmx25nmmynn4q6etgjl3a686kenn143d40u4hly0ez49y8fiv4beurekxanan5hebavlqyysr1td3tmfc3jck',
                detail: 'Quod non doloribus explicabo velit eaque. Id et voluptatem et dolore assumenda beatae. Quo aut aliquid veniam harum. Sed beatae qui ad eos et voluptatum nam enim possimus. Ea aliquid facere magni consectetur veniam.',
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
                
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'kpf0foa6iypgoh6nenvlkty3voip8b3pob7wuu0ncr5cnadwdx',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '9vcq8adoqnfw4q38644d',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:26:50',
                executionMonitoringStartAt: '2020-11-04 22:03:53',
                executionMonitoringEndAt: '2020-11-04 15:06:03',
                status: 'SUCCESSFUL',
                channelHash: 'jk320s690s0z326cz3awtv1iadlj97fbwfw5ogz2',
                channelSapId: 'j072vwyc3dxh1i1yyqlp9imzaph0h34ulwzhal4eirk62825kv',
                channelParty: 'v2txxl491mbq7lw3a6cgwha6o0v2k01ruqvj0bikfpgototjbcttvgjmks99cnk6lief9fa42ze5aodda2nadrz8jnxrupxtjwoji76b7vchbtrt7s2xc58d88b2qdzeq8czyfdolgvgqfclnvxxxqdatvduovet',
                channelComponent: 'b9dqln96qtwtux8nrb1cpsefhczz8dntssba7efp1tb4v5s3cckw0ms7uwcko8fnty6st5wop0newrimh3tj3mgqxtjs60agf2kx6tb0ttjxplv2056j71a8ue6jrddzx0qy11hn0n93lmdx7n0b3vi2oh0l84uk',
                channelName: 'c967jsan92sfv170weh6e13io8wvlhsa5ow3h4um89s8e85fevhmibd5vjanggk18lqrttqgnk562cp8t1x4qaly7kb65w5k2kxld1eojtw0ha9fpykfpo4wf06fqy3659gg4v07b9d228odhuls63o0xna91uw7',
                detail: 'Ducimus harum esse optio et ut consequatur ea hic. Aut vero a iusto aliquid et deserunt sed. Ut dolores et quis expedita aspernatur qui nihil minus nam.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: null,
                tenantCode: 'l31ufriep5l9qeik6z3wo7wegrqqsu5uf74ndrs2tukutna31w',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '4abq6e2r7qvxiru2jf5b',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:58:57',
                executionMonitoringStartAt: '2020-11-03 23:08:38',
                executionMonitoringEndAt: '2020-11-04 15:52:53',
                status: 'UNREGISTERED',
                channelHash: 'igzpbjus76cjysju2d241htwptwsrf1x9xshkzam',
                channelSapId: '90m3uv4ae7mktgo8gd8v6uh9d16eyhyorqd2qeu02jd0yhh4nb',
                channelParty: 'jy96ijsf1xtv072m8nmpxyp3b9xkt855roeva2p9kro9hlctmvte3lq4hmzcdw23s8wr1qfco88eys8n1r5mb1ha65jaadxmraffs3p9oidse4vh1j454iws06t3z8hivtng8kvlh5x4gvlyhcyngav8nzhdl9pl',
                channelComponent: 'bytxvbp17icbdgqjn48gedl4keaml3jasdv557549bgb7fw19df6kdcmnsoiuctpooiwk360rg8s5gwz0x7nfre3x9th1yk0poedum7iv0bm58jq2s8qpe5cnw0djyb9sclfl9p6hjij8skrbvcfe5qv3u6n8cup',
                channelName: 'bkn6hfruhk4odeoh9io611g8ck6bi4ayc9lquae6momc60yr0n4plgnel065ik9ldfwf5r5wmjfr4c62i7cilh1b1cg85j3383tc7d2pke16k1yc6m76j0ui9wu3hj9gcqdo9w9pztvrk0guz4xv5ygvj2u7z3x9',
                detail: 'Voluptatum ullam consectetur et. Temporibus qui inventore voluptatem est dolorum voluptatem sit ut sit. Quis voluptatem quis mollitia ut. Tenetur laboriosam eos autem et ab molestiae. Soluta aspernatur veritatis quibusdam alias est et quis eligendi vel.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                
                tenantCode: '3a1epstwjcapryjar59ea7hkqffeofw2p9rsra5gr5nelc8w0l',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'trl4w3vocn0w1rs0y3nw',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:28:57',
                executionMonitoringStartAt: '2020-11-04 03:33:47',
                executionMonitoringEndAt: '2020-11-04 06:59:37',
                status: 'SUCCESSFUL',
                channelHash: 'tsuhb8abbgw3j5g6nfwwiz7yekhvev06lgtfwex8',
                channelSapId: 'uu7sjxgvos6d151uobxddl7kqf3nkjtck82ijrbug6waog9kmz',
                channelParty: 'ko9m0bhfla1avg7xspr1e6mya96upie2a6hmr5s6t9lcyyi97mjqiru1e3sot6km2jxmn85fgzzy2hzketpbi7jw9bwowalu8o98pikxa4cofhcoyouh9yjtbbl5nxwb2eemqepggu5at3ev5oxw18f6tl07qc3f',
                channelComponent: 'd3n0bofvs73un2qsfc8ympgsmk29f2hrxygin61a55p4jlbrmg5dqfjsrvvf0usmyve4tjozwbg9i3tz110e68uhfby7m8oqq8kyufcdbe5a0nz9uqx0sq443dtt8rlyhdgdoin2ypxapbx7vi6qhow723ghx4ji',
                channelName: 'ts2poi7y3aq2cgx5h8p7c72mzmcf9mthp82p11mgefymf8upfagfnj9fhrm7k83a4ha1xte1cqgz643q1r35ng422z6116m2ogdj9uq6328gp3to32cb8v9m39kou61rh379x4z5aszncv4jldo4bnzufi4mpmcf',
                detail: 'Aut minus sint quia sapiente officiis sint rem est ducimus. Fugiat error beatae deleniti aut. Quia maxime et in qui. Ut illo maiores. Maxime adipisci perspiciatis fuga repudiandae velit sapiente. Et itaque vero quidem omnis unde.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: null,
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 's6vm2f0i0fxuuhnon13b',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:35:33',
                executionMonitoringStartAt: '2020-11-04 05:36:03',
                executionMonitoringEndAt: '2020-11-04 13:43:31',
                status: 'ERROR',
                channelHash: 'ppaluw3okynflogl3c5i2yz7ggb9reswqvxds9k5',
                channelSapId: 'p0mf8gey72r18708yfjw2mczdtufkceylls76sp8twetamoxwa',
                channelParty: 'riu5fy5l8gx8rc91c960toclu8bt9j5kqb2td4997f2cutxmstylzxeqtbps4z0r3io2w00n6v6k4ukflwuq9x6k9dpd0e39dw43nubngsrrpfyufvg2z9nvu15cr5fvotm4j39m2kus7hsntvm2d6ps313h0g4l',
                channelComponent: '6q9hs6u92r6yn5trf42b1gi18owrwo5dn262z6ss3ytxv2nbxjqn2t7updczv42nmumx3sh5hhlwldke1cir2cs7rh64tkfbzp323scfq5g1mtv1ao26sp56yj831xlpexu8tcyxtpjapeg47s06nz78e1u1wggu',
                channelName: '8wup03u5ilp222qhqjzsc0awi339i5umhnerkd4vtu2ljyr42h9klvqepsjgnztbijfmik75sjgglya9r246iewisdx3648sxd69idc0isqvx610zjgfp7gjtslmazammudsp52akn35mqpdmzetgxxgzwj1u5jb',
                detail: 'Fugit at dolore est rem provident eveniet autem. Fugiat occaecati fugiat harum. Iure ut velit magnam consequatur.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'jwd9wlbvf7n35092l7yv',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:08:12',
                executionMonitoringStartAt: '2020-11-04 01:19:23',
                executionMonitoringEndAt: '2020-11-03 23:33:37',
                status: 'ERROR',
                channelHash: 'gtwicnmdqncprxj9h3rw9zo21ytlf2g5mnodz7dv',
                channelSapId: 't603fh3bf4m22ql732uxo4p4wz1jy75savg92xl75j42w5kflm',
                channelParty: 'w7quiif0n45rk4ato1uqkeuzaidmbzxn8fvqyffgzwsx7mhzft720uk2kcqgye75hqoo249jgo2jfsxycb4w0pnrr54jkleggdcklf8xt5g525zcqnoexq41qu1yi0w9195kwd61vnr9mum40350poycubzplzmf',
                channelComponent: 'mejw4eblv50z8g5bkt181zx6ftk8x0ewp5agmnaz3m9amya1t16usymj644961wqsowrlpdfrn4dwq8tw2ddpd8gt6kleq09kgav04xjd0tzzlemr0dq424rljotvukz4te3s91ysabstoyqcsnw6ga7d6wu6e9n',
                channelName: '7j050zgb97amfnodmork4ems9mw6e73o470zxqajlrcur1cme4hdr1apyr2e8r5mwbw5y59tq1iqed6fur12dwy7nt0x2stuonoomowv3y86aprbhrpblxxbjfcz27r8d7e77znru06la15vbetxvy23qhf01hrf',
                detail: 'Ut illum tenetur quia soluta nulla voluptates. Voluptatem ea possimus vero illo repudiandae aut odio. Omnis voluptatibus ab nihil necessitatibus. Similique molestiae enim magni fugit occaecati fuga. Veniam dignissimos eaque quam. Et et temporibus sit.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'i1no7fm360r1ny755y1tmpfrlnatana7e6jy2arn9nm11gq42p',
                systemId: null,
                systemName: 'br1x35tkhmtt5lfhj4w0',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 19:29:09',
                executionMonitoringStartAt: '2020-11-04 13:00:24',
                executionMonitoringEndAt: '2020-11-04 09:33:05',
                status: 'INACTIVE',
                channelHash: '8f25ciaaofbddpa4vjvuist04wdudmtvxnwuuj5c',
                channelSapId: 'u4mh67gjgy4h59eiw0jx28f70eux2d6ves3sg170ialdu61d7b',
                channelParty: 'upewujb9qjxj6o02xqu68n7kpoe14bar37tvcrilszyz4pfd7myggrulti2371beomf8dfks16hpjogxgredlbd0tu6rfomk3cbyatqnfnum9vc3cyj6206h6i5b2ozvuatjyfwz9m059oj8gi4mg9g1aseji8da',
                channelComponent: 'k2a9ory1b7vv9kebxwvzaibkqox1p0j3fupclfkjhfsihu3rw42bfdxo29yoljsd7uu48q4bs616kjndnhxi7t0bwlkvloxc6sk69k2vmjyc0li3q0e655isqotns2deconi4iy9oz5mz20o8y0flhqs0gc3fztq',
                channelName: 'yl7sab9um1ssudl04wlc6dsfnmdk2f24zyruogy72bqf9ja6swzblrmxfurpjmkmnsq6txmhkuuq6tv9vc6auhotm61lv15p25zxgd8y8cljorh1un54d452jbzw4rshx8jz4gjlpq42tjyj5ic14e13krwdiaqk',
                detail: 'Saepe totam corporis rerum et dolore iste molestiae autem. Autem autem asperiores esse doloremque fuga et ea commodi. Quibusdam totam expedita enim quia dolore.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'uvlm0vi14g3pmcmfqdfnabvl9zthv1g18ix7fmh14imychh05k',
                
                systemName: '7tn17xcl4u2infceb0it',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:35:26',
                executionMonitoringStartAt: '2020-11-04 03:25:04',
                executionMonitoringEndAt: '2020-11-04 18:03:39',
                status: 'UNKNOWN',
                channelHash: 'x71wydw1paxqwqblupklmrgtmh3xl97oe4zfvev2',
                channelSapId: 'rxxfhv2y2vzkcgrzmreuuqda7xshefhv1ac22vahxlp5w1je2p',
                channelParty: 'fccs81oiicka3s6stqu0cnpzp9jsex9vv0khdxa3qu7bju9dv8gasvrtrteq6s2xpmk4bkd54fetu45lvtnnp9hom0co8bcaxzo6knv2wkjf1bsk88y8o7ah7236f29xfzmyzayo38p7p2j8xgjnujglsl2bp3f5',
                channelComponent: '1qov6hrbc2y6buv5f5uromdxuunpweaed8d8mrk180rg2bemhx6lpepp210zgfugsgemo86fh682f2gl5dtu5q3cvmuzvf0aqmnx46br38kgk9vrgeqxn4hga9swi29454ht1f9sa4t01dlicdx9czpdc9btljbu',
                channelName: '1009xxqaom4qta7qq9ib9kfzip4qpqpdmitgfrwedvessrg0fcreqon294frdoe36tpl4zo7goyucqdokehkm2dyljf7nt3f2ebmcqaalpkg02f4edbtacqu2xdynmzjrtpz5b3el95spqgkk0lbhmvjoeendm52',
                detail: 'Voluptas aut et quibusdam necessitatibus. Qui non repudiandae molestias qui consequatur consequatur. Accusantium deserunt voluptatem magnam a qui animi sed et.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'mfpw6t6mgcohmpy7iypi0mtzztkxv3otppu36n5c09flptw1j3',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: null,
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:08:45',
                executionMonitoringStartAt: '2020-11-04 18:55:16',
                executionMonitoringEndAt: '2020-11-04 16:55:13',
                status: 'INACTIVE',
                channelHash: 'zax8fiaou5khfposxt0gh2fq1k9dgkfxm1ouwdih',
                channelSapId: 'mk4faibm8yxih7gtds1ckto9sgvpkb4pbmcb54jol08xy6jinf',
                channelParty: '72btndtnot10igxpsnrrda5ih62ys9vd6tey2t6xt6lgezi1f4zsu30a003eo1lgfeb9g9yfc7k2jj21ybgtux0dqwc8lxizmjhk9buigqjsqhr0qzu8dvfnyf1mbgjpyi6z9u8ndylc0f8jdw43ra2l1l0gh24k',
                channelComponent: 'ca6gid6fy7g3kkjdfvlygbuz0e1kra1q29b9yzzhf9h2ep78p5s5wtvyopedzj12pc43kk02dzvuvo6or2fyvdvv3einv7kulllztu4h5ooobxbgo6dnh8qaobxse71r4law375c67uw1bwm2irp0zd3twr2vz49',
                channelName: '2mi7sytr5lnwl7ugv3eiz5rmyhqws6mnjmbh73oyie4mgyyp7t96g2o53wdnkpegawe89yr8s0zrzuz6o0yd7fxjgg2ujqcjtolldmnw5wnhyxrb2ib9lw45v6oon5n9tx78nau08i9wr2y6vp4trx009ms04tk3',
                detail: 'Et rem totam blanditiis aspernatur minus impedit voluptate. Accusamus et itaque nam harum. Pariatur eaque perspiciatis quia consequatur modi odit iure quia. Eum corporis impedit aut et rerum molestias iusto sed repudiandae. Aut doloribus dolorem ut rerum laudantium animi non.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'czw0sp9334kddwdidysy63o8hfmewz25j93nklurc4cixk9vau',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:05:26',
                executionMonitoringStartAt: '2020-11-04 00:56:25',
                executionMonitoringEndAt: '2020-11-04 20:02:26',
                status: 'ERROR',
                channelHash: 'oh5v5vb1sczl93yuxpcxrwscdd4oyhl53eeo6222',
                channelSapId: '79edmo0wrczpih2bgvx1kd39h44e7jllf0y8xc7t25bi4sl1re',
                channelParty: '9r2unmyqjkjtn1lk3q8n3lqdrsw7ezed0uclbvhzx1mi22m2p2o986lw95cbk0fkvyrcy1nh5ur1gqco9rld5h16v7ujgso0hajxcdz3woozkfly8phehvs5dnedzrce456xol8ewa9p8n1zewjkvw82zmihlpzu',
                channelComponent: '2z0ww8ieaxds0ckm1sidk92a76fpchr6uozi53uibhyy7bkfqjdvdpjpjg9imhgdfngkpj8e8g04o5rvhihb13jhhmvlihkvtt8x9wtqtaltz1h62b1s69hwwnkbgr6v8bka697t9ouzsv655q2dbdm8iuzes1cy',
                channelName: 'o1uc1p0x8qajd3crpb0j1qcodvjmxn15371im9la0k16jub6ylq5x6u5jofaaobcj9pmnl6dlu9xcukum7ny6wyq9tmjpwnypa5ltpx9utkl3m8r36xpdi4o58vvemrvfoq0bcip9h3u9rgwzrut2j7ru6tmkhaz',
                detail: 'Commodi architecto non nemo facere optio voluptatem. Voluptatem dolorem dolore quaerat quas a eveniet reiciendis et quia. Autem sed sapiente voluptatem sit. Quidem vitae iste in ducimus.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'fcrtumovuq27n8e6uegxhqmd58dz9misum8tugh42hk1l9etmz',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'l5rdb87wcvp8kgbq9xqd',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:14:53',
                executionMonitoringStartAt: '2020-11-04 16:43:44',
                executionMonitoringEndAt: '2020-11-04 16:43:51',
                status: 'STOPPED',
                channelHash: 'rl0qhjlekf5jbzne5a3y1joif48zw11zi3lphq7g',
                channelSapId: 'sotvj493omxrb0jaqvh0duzf785kjrdw18v922cgztatrvbvrr',
                channelParty: 'b6glef85avxadiysqhzh6td2rn81vyidxpcnrcgrufn97bbn2xd78xtk1b8y2vqfj6wjv4o0ahaojujj04haafuedtucynpk3kwhvgi1m84oik59bh3vaztxmf6tj0todp2rx49c75stbpez5tgarn74vt23d6w1',
                channelComponent: 'onpyqyiku5v0suzupcas0b5khd0jftmvkus1b82vwm38qrrzt31xnlj8quka17wtuc5t20vs5iefymgnsmtc9kz5jsam9h9rm8zwah9dkzwws7z5l7v2mr0fd3dr2xcw9wp1iktos83f0smajwud3kolc2psragi',
                channelName: '75wrj1lzpr6tf0iard1fw07xee6yewxh7lirkv0s4v13g5xt8jjtg0ky2loxkxiaspdzw06a96tpgwx7diifaiw3f7tipx7wogktn78qkr5lgnl8ktee27ljd0bv9s1z2fwfsk78vr90r8ykc0luf2rpsmctqkcx',
                detail: 'Qui est et aut iste aut deserunt sed quaerat unde. Architecto qui accusantium consequuntur omnis laudantium facere. Voluptates assumenda aut iusto libero debitis officia. Rem aut quisquam voluptatem eveniet ullam ut libero. Nesciunt repellendus laboriosam totam nemo vel. Aut nihil vel et fugiat modi totam.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'ki7j4dyidtzhpu5r5ffb820p0irxzfs5yf9jzrvhm2ba3sym8n',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '0vz44195tf200mtlvxcm',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:14:52',
                executionMonitoringStartAt: '2020-11-04 14:26:14',
                executionMonitoringEndAt: '2020-11-04 12:11:51',
                status: 'SUCCESSFUL',
                channelHash: 'fdkocwxkquuzlknfngjp3xavvk0xxck0varu8vml',
                channelSapId: 'p59wl9b8244f4eimkg5mba5xf1oekcptc3yi8ei28olh1515dl',
                channelParty: 'n90615h6q9gffv8amcao3j7cema524fbz46ectnwkk8ifmqo38q3uljnjyulk1hrownsymgxpdtut7d63hzru675ta5tuwbhmk1a8iywifr0prkcb2r0dev9iw9vmbslzegk3g1w9yt80ib0rsoanfdmr2z7pmbq',
                channelComponent: 'k0iu5qak8vk9xu09hdftw6zvey5s6ujvo2yqeip3h3yh8vz29z66ixxaos9ncya1v4tuzk5m6wcnx1qd6f2hfe4u3tz1qit7lj2835cxo6gd20ssgnaqkbsq79t14dl3colpjury96pt2ueiqck1me0m4b4qx9cx',
                channelName: '8n6q4ix8ffzf6my44yq6ds5255fsfqpaz3ss991lr29llolq7yhj19o7qcud762n3kuk5ity6uou1phr9gdvhgc7x02mqxeh3my3p87x088dr77lk4sudb81ga9vkgli7vol6hp37fzdkpvuru1sc29rqjqhbvfw',
                detail: 'Inventore repellendus odit voluptatem accusantium aliquam quia aut. Debitis saepe hic dolores. Ab omnis nulla consequatur. Voluptatem natus labore eveniet temporibus nemo eum maiores rem.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'c56kplblllisjovvzomhcz3iebpf3cfui8gn6ke9z6hpjuesle',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'ila01ieko1kpm52fx3vl',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: null,
                executionExecutedAt: '2020-11-04 16:34:58',
                executionMonitoringStartAt: '2020-11-04 20:52:39',
                executionMonitoringEndAt: '2020-11-04 11:04:23',
                status: 'UNKNOWN',
                channelHash: 'w19kyujelh102pf8qe46golvo5mj3f2a65jl8tc4',
                channelSapId: '13ryjjfkeb44vh94whazglvynyou5galm9gq8s3fy0hwaozbyd',
                channelParty: 'ti21x20jqcbvrid5o7tdo18p8g69ks7pa6cc7sirwj0jgwn32awcy2455pt8c89v3bcrza4cr25k28bj7zfm7b1jn71eo0388is6c32mnzawlfibq295k5erb8kujqmukzljybiejcigypadjvikvr91tfjbmfcc',
                channelComponent: 'bopycqzooyeibeka69payxbfdlxp28kg85j9h7lydal5ws9pjnp9e9up4rhqi5n7ga3sybarjiiss9ctv6ejoic1ykq9xhhpads8xz4q9dsurmuxfsqtj4n7pw7zaopnnprmd3b7isbqwe1p1fmm411iaoveznef',
                channelName: 'xqu7vqm2grlm3ros1l1ny91rro5yuimq11zt8lfvc77mkmzovhu6r2tk7afw65fgt7wrsjoqb2uv4vy0slhrhe5ba4efd79z5tja2o5xv7duiphjw3cxxg7rkk8l8d53lss2wo08ypzjdoe02sx85bydz0vujc6u',
                detail: 'Ipsum occaecati maxime molestias et iure maxime. Voluptate corrupti mollitia ut et numquam perferendis. Optio a blanditiis vel dolorem. Qui et consequatur est consequatur maiores fugiat debitis. Ea possimus dolorem dolores nihil est veniam aut voluptatem assumenda. Consectetur ut quo aperiam doloribus hic cumque.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: '6xfipgi2d55b6zem6wzf2wjdr110wnrbmupvmy9q8s202fjlxj',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'cwuvqzpudkdo8pkdrb33',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                
                executionExecutedAt: '2020-11-04 08:32:47',
                executionMonitoringStartAt: '2020-11-03 23:25:54',
                executionMonitoringEndAt: '2020-11-04 15:41:40',
                status: 'UNREGISTERED',
                channelHash: 'ylnr1x332obz1qjwvviso9ua463ithzt06sf65jb',
                channelSapId: 'yp13l58y7r272w2cf5ndx9lgjrxnl2fexg7o9ailg9vzgiwumd',
                channelParty: 'oxewgnn4q504axuky5f508nt1kawheoj1brjtpstymmryrcu5uyrxxglgapbxdc1kvd7mqu0hofrm6x1uswdnqnmbe1l04oghwq2dg4nsqpgo16tlf9amfm4qy8dszut5oeol0r4x1myxwclpbf0kgw8ccg7euu0',
                channelComponent: 'zhr7696dir8csvvu5lvspaqbn5mpa8sq3sdu2hf7cxa8fulflorogesfhi4ggmzwi0g6vpjy46ddzwc0d1f7urcymuazi4lgq62g0f8broenznc5v53rr336q9vaeh1qymabmupjrbqg1rzilsn07ahsas5dilx5',
                channelName: '1gzmigza7xcxh6aanpkwyq4lp9cde1icbvmjv2lmbjviodibta2w4a4w0ic7v4ngknea6a6kvd0w2yle2r3n7h7f2gzmaujod58szlipi0ivi2gb1zo62kno5hhm35alh62lbj1rui1y2pbpl4qjdf8a4v09ifg1',
                detail: 'Maxime molestias sapiente qui molestias omnis aut quisquam. Perspiciatis quae et. Animi numquam corporis.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: '5fggj35fee99h2xwkjkvv9xtqtlsy95s4cvqworwqine680cfc',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '7ypsgttk5lb4z802dige',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 18:10:14',
                executionMonitoringEndAt: '2020-11-04 01:43:14',
                status: 'UNKNOWN',
                channelHash: 'jjl9aiqq0nucqepttsvwuultkpjydeuu0oe84cjx',
                channelSapId: 'ji2gf4gubp4q7v3ddx7nisqyeadbfyymi61n2hgojbmc1rgh65',
                channelParty: '4lpf7dxr1x80zmgeekgf186hyqwiguxlc8fhfyb1h2mgn6ta0myra44b8mnk7bza2h1oox3y7z69faqx5fgu5g903p6m7brlmxx2oznk8y2w2dw2x8szu4kbc5hbprd9conutc53dbcpxncj22dldzgvmb1y7cal',
                channelComponent: 'w7wr4qr45zwrytli9xhseuox35hzc25730kp424xxhz5ct24ed90exqs4axjv7y81lk0y2kuv1zdbw47vh1gmxznrgpvxkxki0isam1fkv3a0fv5qkrjqoijzwele88q2xbdsgn77qrfqp5whmcug68e2n2spbvx',
                channelName: '0cp869ac1bukv6vjpo9x8xvouymcmq4vkf42nhudmmncwa1jpomz5fcfwoud7za5ubfry14p2n8wvem0d3fjtbpkd9t2mjs29vdle3k6y36nsd9t9vrp7twvtx3lx7ag24jo2hjnz95d4l3npvyfgowe6sl6p9nc',
                detail: 'Nam sunt neque odio soluta expedita. Dolores illo molestiae quo nihil fugiat dolor saepe. Voluptates repellat commodi voluptates ex voluptates maiores tempore. Omnis laboriosam aperiam dolorem quia sed aut nihil ratione quia. Accusamus consequuntur natus est voluptatem sint porro. Ut aut iure voluptas.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'fx7sut7zsm11bxobrad1mrlpf3vuhqkor9qw22mo017cbm2stu',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'jhljvw97z9rhuno6o7p9',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-04 05:36:34',
                executionMonitoringEndAt: '2020-11-04 01:44:42',
                status: 'UNREGISTERED',
                channelHash: 'x76uniws68xgdfqzfn3s2zsl3n305vpief098j3s',
                channelSapId: '80kqw2q5sdt4kab15hkrzcv4751qbli1f5dqijsxx4f0z02dbm',
                channelParty: '5l4r4jjv7fq2f8s5p4t0cphs6gpnjdp2oo4zxmxsorxutfyyzzi3uy75x39q9orzxq5m5qouw0kb0wtfzz3jbzg82upswmct7g0getioxn6wwtbg79v7t9i4czugoiacfqai2ebtgw2eaodebwp6nqcv5w0hhnhl',
                channelComponent: 'w1yf6sa0e8vrqa6ffovrmbe1x7lsbw1zplwzohgm5x9v9l2swwtqlsjemb8vhzcfh8nf1aps9qsuljn1zzr3cj7dj85p6ld20zpg2cmo0h5h5fk3anh9nr5tq6e3vujz69t0de0lx7br85cjb8k7virgqav36nty',
                channelName: '5j5qmlwgrd6vnzklmpfeayiezs0h7giebe89m8q6zjl4zw16ix9goguxjultxxg1cl5b3queh58o0l4jxjrrbjnxm83vpuqfioslco8ceaf2i6x4m8fj8ub49mj0k602c1sdmwe12fcojonhpnbor2j867e8ru3g',
                detail: 'Iusto odit est facilis molestiae suscipit hic perferendis ratione. Voluptatibus tempore consectetur numquam dolore ducimus voluptas sit iusto aliquam. Maxime voluptatem suscipit quae amet illo quis nisi et. Eos ea ducimus.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'igwp649svs3dws54s0v3qo2zu8aob9a7ea89jctfrctxs8a39q',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'xoe3zfzy9fxko8oqpn4c',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:22:01',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 19:18:52',
                status: 'STOPPED',
                channelHash: 'xezwo6x0d904oc18l0itwym7s8golkvgf7ehs0yv',
                channelSapId: 'qlqyipgsuh02un87j6h2b22zr7ync168kfyw19e85xfl2jetpr',
                channelParty: 'frpwvati0jnf9ztqv3ajlmi2s4sn94ci7nt7pa9dczx52uwhmv0rz9jkfpe0p193cgr4m0c5ftn2lsta6ekbjnt84i5xuskv771wyhadikvwurw3cl9eeg5wmd23oipgklxe1s94njdr3xvls31jiqu4n5eyn2st',
                channelComponent: '76vpgyfe99urhhe2xa1uy5nnrpbw9hefmxdibo6yhqvjoc9oow8pjgb130ko370le40nfcopxsftvag1t8g4e0rdgjnoiaoqzfh9awerst0l310h0mcnnibm0onfe3uk98yzbd50zezo3hr5wvu9mke3guvse2ei',
                channelName: 'tom2s11v0yzcix8a4ekqvy8hfim3ylk899urz9p2mhc5lvebx8xcp381dh8pcdyrs2kcs6kgueqrc3hmpax2xvh5oxc5vtfruqxfkl9hnfuruq6f644wnczur3ator7kjrz9htcqhgw9f753vlfd42prj2flhwjc',
                detail: 'Praesentium culpa est dolorem illo aut voluptatem rerum commodi voluptatem. Architecto commodi laboriosam voluptas quasi quisquam explicabo. Nulla eos voluptatum repudiandae reiciendis corporis sapiente. Fuga doloribus voluptatem et et sapiente voluptatum. Non qui ea molestias quidem recusandae. Modi illo et dolorem et rerum iusto distinctio voluptas vel.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'l4kr7nv7o8ku42o7xjizu9cfefajgrrrxyh699tdke9g4wrwbz',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '713ay79d0ym7x4yb90n8',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:03:57',
                
                executionMonitoringEndAt: '2020-11-04 06:20:27',
                status: 'INACTIVE',
                channelHash: 'oylc43lb0fy3rdyeuutbk5u8pxshzz3ga1kwp0sj',
                channelSapId: 'yfnfyje8o82ri619153u875sc0uzz066r80eptisro4d7obplb',
                channelParty: 'q1ayi19qflwge5wx7232o24e8uctgvivrye2gat4wqvlp31q8hnb1rcitdebzgsv8vfdf4rfodf459y142ucumk5zg2n1871wjygkjjdvp23b4bfgqdr15ob15ks9rx23gvvwz0iig1gmd8jjmd70dg3yheswv11',
                channelComponent: 'htsz9vmdphs3zmdm3q8jhba3lnwiub5jbtkhiuz4mpim7yf4jvhvrembkhueov2gfdd04o2s1er275a5tq2vq70730n69bdfft0e8ixx4z6j09uqaoto6wjrjpef8wmbxzf8g96zx3bncl1ur7db64u7unk1g53x',
                channelName: 'zibilqql6w7m4vahh4mjb44eab568x4olz434jxw4up2ugp6t2b8w9mit5d84oba99mb92xzimzf5gc3s9a4tuliusoq5b8z71p14d5wcmpdz01i7f1c2xt1ze4bu546ujl0w4zd1891frozy7m6mo5geaziyw9q',
                detail: 'Veniam qui ut natus aut quis officiis officiis beatae delectus. Iure quod voluptas sed iusto. Sit blanditiis voluptas voluptate similique. Vero temporibus saepe sed. Aut fuga adipisci ullam maiores impedit omnis quam ut.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'l9ka9qdcge7vakht92n1r5j399g17kc8j44d9rdy6k4k04bgqh',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'dn58591cw4v4beg027l5',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:13:05',
                executionMonitoringStartAt: '2020-11-04 00:40:16',
                executionMonitoringEndAt: null,
                status: 'STOPPED',
                channelHash: 'z9wlpytcl4mvss6dxnnqh3oqh83k3afvwhx31b7m',
                channelSapId: 'q7ftxq7jbrtzuw6wata1xl55u3kvp3aqcl8jafqpco33n1zgjw',
                channelParty: '85mla7ohbnkmp9lmgecvrh7i3lxsk9gkv3z3upgeghz4klbl2wi4glf64djbblau5rdg2j78qscu0gd0ym7i3austqxznd5cndxtjxn3mwaod7k3wofqdyxf81ejcdp0m4zqazaj0bx5nsa1qbz7tnuzzn986og3',
                channelComponent: '24gnhdt4aq600iqdn7cd3uhls0n5tmikep6rsblqvt5a14pq0f9un11i2ynzav7utwhzrujr0yz09lgs5o6u13vhipmkrpabvl55191c8ob9wlbx4se5cyxul0cs16mua5trxr8ioehlqkhomeomwp9f7kqps4ef',
                channelName: 'r963szmhzqqx3w3dfonr5bgeamuarv6xwj9p5j4yq046y07zkkqxxybuerdtoh3ngf47ro11j1jrx3z8zfa9ekmmuu3lnoe39nxzi0tt8b77gm8okti43l2gk567ql4hqcl1l1q0qq3fsjwmcd9pui8osggv7s91',
                detail: 'Ipsum molestiae eos quasi maiores. Veritatis dolores qui autem fuga et facere ea dolor. Consectetur aspernatur fugiat. Enim iste eum quidem est qui adipisci.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'n6bfw9dtfg5bn0g5chexudzlnfh2dbkwwx6khgnd561lqv7chf',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'wrj0ajto0l32u3obr82r',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:21:06',
                executionMonitoringStartAt: '2020-11-04 02:14:42',
                
                status: 'INACTIVE',
                channelHash: 'ezkzmk5uy19p6dsmcacjubdcmppvx2e1ax55hzv0',
                channelSapId: 'lur4fdvtfnfc204tryprqra6bbdzio6n51sn7ysu7zwsaaeayj',
                channelParty: '4u1gd55rm5hjuatwb5y8m368doks63mphp542opeiiycp8wavhua63jdzggswlb3w0jkww77t17xjqmyzbnc47s8ck72kkzbe92yvop91w1opd7a5z5iubo2q7kcc7wjk9o3p4y2ablvoswkjg4kfrhvtii76vzz',
                channelComponent: '95lvyxel7j18hk1j7b0lwkl4l2gb16oiuw9klh28co03ao560s81gze2jjrnv0nje8bf1672upuyiwkryyf8hl9m9nmqns1ji7h7z8h7sn0w4w3jk44vtrsanpljbxehfxp64yaviqmpqtg36hd0r4u5k1imyps3',
                channelName: 's5m8js1eeyy9vl8j639grfmjitm43k976x4rrcy5j62r0x0oqib9q3o74afsmuh73bbyimiss8dk4p51es5558ls12a120uqg9rid2tuqbvu3u0hugzn9xt0tcujbnxz6kaf5ru8qzpltowjwxpn2rkibgtzjpqe',
                detail: 'Facere sint quia voluptates. Voluptatem ipsum repellat in voluptas quae quia ipsa. Sit adipisci sed ut voluptatibus. Id provident sed velit ipsam quo qui provident saepe dolore. Assumenda magnam et qui accusantium alias rerum adipisci et.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'c1jusm8057het1rbunr7k68u7qu5dvuic2mjirgcbooh0peykj',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'e3u2uojbqn4lmp7uf2u8',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:43:51',
                executionMonitoringStartAt: '2020-11-04 17:07:08',
                executionMonitoringEndAt: '2020-11-04 14:59:54',
                status: null,
                channelHash: '8a7u4o52iudpg0qk4j3xd1frafzasbnw61c16wep',
                channelSapId: '57mls419ylh81u0om5h30o00ndziniwamse6a1t6wgh0n4dsgm',
                channelParty: 'vkvynncinxn7ez2dbsc8oek9jg3cbirezt5ahvoqu91xtjd6fdf00bznb3fy6zirq3l36qmdaq0k2yzajmawogmpu177youtaapwqm49aynhlrruc31mjxehuc2cn9n16o8cw0nm7dx54mj8sah7rzjd3wiwweku',
                channelComponent: 'sdc7sk61ufo8e0zi8lycr3ujpf333r5x1jcbaeez7vv8qqinvczd97jam75kwgbhjnw1bs4ca249fqf8eirm0curpfpc6vzgx7gvqwykguuh2h20h3rjmqs4x6845qeg551ueq6phf8lzqhowhl9vwmji0ut2zlf',
                channelName: '5mwc22li5sg2ol98h6013p2v0ubia520sml2mwkdr9xkr8ori9866drxwgkg7c2iolrro2bbs4omm6ulfcj7f49knyh9r2kgc401jzjs29sikff2t9h6nw1zbuxrcy0hgivs9hznyuzg8522ctv67ebxb6kxisdp',
                detail: 'Architecto est dolorum incidunt quis nobis ipsa. Rerum impedit facilis asperiores minima quia nihil. Laboriosam ut autem quibusdam. Aut temporibus harum nam quaerat sed et commodi in. Et mollitia possimus illum veritatis quam ad aliquid omnis numquam.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'w1hjp01ol8jym0dbcsvuhbni1bg3rfb2kkbmswh8c2p9141ao5',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'krxzq8jy8by84lyqc1zc',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:27:59',
                executionMonitoringStartAt: '2020-11-04 08:28:08',
                executionMonitoringEndAt: '2020-11-04 20:10:25',
                
                channelHash: 'zrluzzrk29cqf6jt4sauea308m3ok1x7fobjt0gh',
                channelSapId: 'qiofifyqmum7vejnauv2nhu75fwhkhhfihav5i85dpcskiav19',
                channelParty: 'jj6hxbz60ienijpq5bu1cdk89t5f2f76sa8js0ibvywseekh1zfqvab67smsrrgtgejh2tti3mrlownkx4tehgjc8yzfemu5c1iui2cmbbfj7zxh5d08vjdimhp2cj6wtbnqfeo61lolpz7myi1ha5bw7mtlaws2',
                channelComponent: 'ks3akngo12ny7d55al3b3vg474hjd37wzmtys45yde6n4hiau72363zd1um4b0bk9ddhd8lbsap2vj5zae0oioo8vzz8v26zmvoh5447gn65krjpq4xtw3ysk8rhqqhl5bkk0xedww6piq2walgp1f9mwjeaw5u8',
                channelName: 'gh1hnbwkig7nzwpfzvq2udrdwctgylhcfd5zu961uhhldbgkwfu0k6ru5ulktx2cmm5jpkohl0yq30s413pe1s3n0lsv35hejzlkf0xi1epgdkanjqi4ov7dtsqcmd6y4w01y34z6gethbgls4b69hcg28gp4nx9',
                detail: 'Dolore totam ea est et odio in animi. Odit hic autem inventore reprehenderit alias iure ipsa. Provident optio sint. Aut nihil sunt repellendus. Vero recusandae aperiam architecto officia quia quibusdam. Perferendis exercitationem ex ipsum.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'y5mjmrfn8yvyle4jdvm9mzdxyq2655lssu4y0axkjzvycpvgln',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'tq3n847d32bsifwhxioo',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:32:29',
                executionMonitoringStartAt: '2020-11-04 09:41:17',
                executionMonitoringEndAt: '2020-11-04 05:32:27',
                status: 'ERROR',
                channelHash: null,
                channelSapId: 'nkwbk6f3ysd1k1jdoyoowo773d0z0lzf5es5mkoogz66kp5hms',
                channelParty: '19mzltu0xqyoa2sbt3tmwikoabh65y96esy1627i3akpoi2mg7h0b81f8d1e1quidbgm2q3lqkil4cg91x69bbtzna9cyw5mhq368hv73gh6xteveg6a1pm5qcyq47w4z87v968mfvmxocf6alzhu0dmnglfwk9u',
                channelComponent: 'vta53ynvuf5g5fvcl8lhkfhx6i9h8q0qgnuu6xeqgeee6vrk84a1y11wwe8h8ru3mvl6r9lbuhukbv7ian3dwqu4oav2zy1gt81mq3nt1xc0v0fc0b2m8momdygw37p16kkksa1b3hxzk1sd0h0to2u7x9mot0zm',
                channelName: 'c6rcyrihmzathzmfywykkmnoocdt51ca05lz4ymzmi14ekql0vhwp9eyaymzqu1mxhlf6qkjxfjqe4ffbihf7xlzoapwvwrisxm7tvenhug6k7fitigacrfbcsk8p9ennj6qetxja3h8ektrejhrqqoia3gfk1kx',
                detail: 'Et temporibus dolor nostrum amet possimus et ipsa. Et officiis culpa rerum. Autem voluptas accusantium dolores quia inventore aut nulla. Praesentium et dolore velit assumenda quaerat consequatur. Iusto molestiae quis nulla.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'jkzgh42qjc20b48o86qes8p7859tj7kl2loow07ocdewtv9uzy',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '28ef9xgc6mks7yqqpmu7',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:55:36',
                executionMonitoringStartAt: '2020-11-04 17:41:41',
                executionMonitoringEndAt: '2020-11-04 12:42:18',
                status: 'UNKNOWN',
                
                channelSapId: 'f71f1zsnuf39ue4fe4edx2knvziwsssc0l8jwpob3zk7jiq1jk',
                channelParty: 'w22t2gckwfyn7izk6ku2v1913bl2wafdlsocqso3ge0fgu74ztjfpj5351fzi4y38a51z48ynav5mrq5u8wnrtf7iegchu6tax8obz07wo5vdefn9tnodryakqjh7luijtd5244e3vv6z0mx31wky2og43ijqjk3',
                channelComponent: 'drvbb2elg0k94bgjy3lpp8obitr8ajs4xbgkl8boxuzclh4ina0ilqrie8l3p6a8z6iial9etoztrs920pe6taycswb9up3ujl73gmi1tr0kk6bdcwhyz5ib43py0t2dc366qdmlnvxl1frdbc10ion4aeo8xoxt',
                channelName: 'ughilpvo3j175cszmoesx5rs7sbxokycxxk5n3up90nck5u3vvfi77k2tw9iugat5h4ny5nz2kkoqnmqbuzypgd9veyotifhf9wjtc87cj50yisa9y7ms5h77jd2w7dcbfw621l2ca1fjlagxze1eiauw1lqnzet',
                detail: 'Similique sit ut minima. Non cum tempore dolor autem voluptatibus voluptate est sapiente pariatur. Qui molestiae nulla atque. Et nulla tenetur id impedit quia. Ratione consectetur voluptatem et. Sint laborum minus optio esse suscipit porro nemo.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'v67m4iejrnn76j1q0034rtkk2nz69wytpdi5w1lrxx84tfd4hz',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'bpf54kp95uf34grsuv8j',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:16:28',
                executionMonitoringStartAt: '2020-11-04 07:33:06',
                executionMonitoringEndAt: '2020-11-04 22:30:36',
                status: 'SUCCESSFUL',
                channelHash: 'xyclmlmt5nyllqc8pky9wgu3k7qovo4w0yygktcc',
                channelSapId: null,
                channelParty: 'jf5wl7mlpzq9tr9bkt0v2jrnmrnht8c49fwf0myi1v3s89jeojfs6nvbyy2tg83i64rb8h6kog3quplpc7g0z9hubtllnfg5pnc5subyc4g69p9g9nyh753q7q17tfwwx3czs3x0cebljz7q9ksc13yg1dirutve',
                channelComponent: 'ep2jv44xhyo1pfpqs7ct718ab3ofxb1nisa06m18aouc93o86amb83dyj7z55lcuucgs0moseuedd7us9d2ho08s1do0c33esbx9o7oox65cozkcqicm4ckjbf1klgnuumtmimcxxew50cw9unnqfvjrnra4gysq',
                channelName: '1itdiqfn52swyd8mrb16hw4zz7kj4hctdpnzhg1a47qiey9qgcj6y6xakxf8bfn1zqd48xm2ojv1xcvwncx7dsm9jau3b3wugirs145heman7qzjcmx8257ubkfbsrzpyfhrt4ctmyslybb2kvxkryalqywcrm3c',
                detail: 'Iusto sint et tenetur veniam. Quod sed officia dolorem placeat. Quis quia nemo saepe illo nulla dolores laudantium maxime quis. Aliquam occaecati ipsam quo animi. Ut saepe dolores voluptatem. Laboriosam quae quia ut.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'khfhk7evrji3e4lfq7q6njpnvqv0e5gijq4xwyqqowns2hor20',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'bshene2wv8q3w5h5gbn8',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:39:20',
                executionMonitoringStartAt: '2020-11-04 14:28:36',
                executionMonitoringEndAt: '2020-11-04 13:05:12',
                status: 'UNKNOWN',
                channelHash: 'w5wqeqrozzxtd9bknir8s4gnlyvxkpklsybdx4j6',
                
                channelParty: 'to02w9z8liwxq6s491iyh9e7bju2d9fumo0xrwnstl592vg53hv9op35z4pcwpq7hzain9djx3w8p6qbk7b0xwmloeua5p6p1r76ev8rf6sjvd7az76iy4unog9pz3kbchjyyaf8ao91o1wxp636wvnbwkq652d1',
                channelComponent: 'ctnh2pw6qlbwjccrf1gxghas5txufrd3ai38gg5xeq1ex3lrbfeyn26h28d9c8edk3fs56j1g30gf9cxylvhlyog5zi8wmqjq6x51s6tq67b4gptrkmruez4jemoo0np1b4pngpx96ckqx6hiv0o2fsb8lbdl74h',
                channelName: 'qg96tnnzkf2hezt89lbx3evme6b7y193vsdk6lwgxed0of3hlwh3xcndlzs269co4tnn5x920w940qd4g921p93373emzykkar29wlcw2j7144rnj6mrhejwljoow1pg46s71z1eidh39ymqcqj0flxuiijran09',
                detail: 'Tenetur repudiandae cum ipsa alias voluptate adipisci eos recusandae. Modi non occaecati hic sunt expedita dolore. Accusamus nihil tempora incidunt animi minima at est quas ducimus. Et optio optio quod nesciunt voluptatibus eum saepe odit.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'ns6pep88ag68o9qpq984sizqmphtrgmc9iz3iunh3dtt40gyoa',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'vten8rrzjtxl81re9gan',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:17:48',
                executionMonitoringStartAt: '2020-11-04 08:48:36',
                executionMonitoringEndAt: '2020-11-04 21:02:44',
                status: 'INACTIVE',
                channelHash: 'hlynsy9m21ulqhptfzuhoqdaqnuvuorsdkg7yx7c',
                channelSapId: 'ttdpg0d5kb27iypfv6nuu248f9233n0afey945wuotochlurda',
                channelParty: 'oytk0d9ygui4baiye0liewoedyzmnsf05qjxuugm86a8i2zuuc6p131zpujf24rkwim396el6ooykyq6edje5czqegu096rh8rkj3jljta0qmcmutyq33rfzc9uelq6jqtjeact6o8190iqm78msis6qli0fhy5p',
                channelComponent: null,
                channelName: 'ffnebzxjxydbifk1415pzfn7x6pe3d3x7uivp9a3nd6gb0lwox3r06hjadqx78hgrrh5yncjo2no1ksrlhp52zcmmtsj6skftwd8pkmizc0y0xgj7c60fva4fzyekuvop4pt66wo7jppsogbtxmykqx6d08ylbb3',
                detail: 'Sit eius ut nisi molestiae. Et earum dolorem cumque ipsam eius non. Laboriosam sit sequi mollitia ad dolorem ab ut. Amet quod culpa. Rem omnis ut hic laborum eligendi.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'iusmnzeqs1qjrh0wajmhy5celaho31nuv0czl2oksx3aaawuzj',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'hnjh9jhqsdkz5mt2kzjc',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:45:12',
                executionMonitoringStartAt: '2020-11-04 15:25:57',
                executionMonitoringEndAt: '2020-11-04 20:47:52',
                status: 'INACTIVE',
                channelHash: '13bjtjy4hcqknxtj94j5w9ld0y91gmherieclqzk',
                channelSapId: '8wnrkvj6k9merf4l3we92hwlhrktyucw7t7gocup5p6j9qji0q',
                channelParty: 'e2y2f7q1v1ioev39taqf907522yyeffjmejh9lgs7c562z9uo0mvrvpb9qso1d9nlhbsz5djra15a59w9m5yxz2jktp2rp2r01dqdmjobkyu1w7bx17h14nvtqjrtva81rxq9soabfb57dgi22j8wvhkxjpjzht6',
                
                channelName: '689n5b81y7ogg19szcq8rn1nrct9cepz3fpz5ynn3obosfbyqoj00ed3sgxft93bn4biv3jq4e89qlor8zmny4cy623ekneq9lopdb07ur9h8h469qq3ub9ds2ewesu5g5xp3wihgox7e3q0p2y8lt6wstbo4qk0',
                detail: 'Quis et eum tenetur quidem ut accusantium. Pariatur deserunt neque voluptatem quidem unde dicta recusandae. Aut officia dolores cupiditate saepe qui velit alias. Eos commodi aliquid eligendi molestias ut molestias id. Dolor dolor magnam consequatur aut laudantium veritatis. Laudantium aut natus sint ut et fugiat error.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: '9fnqyyl13psxp0uriarqr5mf33rv0hagbyhwlhgz6pmllsfdnc',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'mlhglec0pjq3nr775ur0',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 19:20:25',
                executionMonitoringStartAt: '2020-11-04 22:27:53',
                executionMonitoringEndAt: '2020-11-04 22:02:25',
                status: 'ERROR',
                channelHash: 'ym05lqjwogb3ty91mr8ovo9pw7cwgnd24p9058we',
                channelSapId: 'sgp2ft1djlnbik91bqvfc85a0d244zj56slibveqibcvj5l366',
                channelParty: '6y47qs94mpkugzfhb5g8ls4rfv62cf0e0fe6mr83xblplqv8uw0djorf4p5k9mel1bjyqxpm8hau6t7pauy1r4km0wkdkxknqz4q4cynri5ozpzo37hotovs2x2bhwzlsxtxe60b8xhzu85e4egl2xx5zqmy7rnj',
                channelComponent: 's4dd45yvioj040kvpheq9muzfeax2tot750gvomf31dw5s3tzk8eqdr59a3xc5d1kshpg0c8zqp87yxix4p7goi6mgav52wb6g7yc2h35pv8xrqzjwmoqjyxra6uswclvhfnkzzmafca0f764prrkffumuf8adrf',
                channelName: null,
                detail: 'Rerum velit aut est sed quo. Rerum magni voluptatem commodi ab. Deserunt adipisci doloribus.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'pkjd0vp9jn70xi7lqqk7i8m9egqvrqn9by5vx78lofvreq0en8',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'xngw961vr5jy7iwu7t5q',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:33:28',
                executionMonitoringStartAt: '2020-11-04 20:57:04',
                executionMonitoringEndAt: '2020-11-04 09:53:38',
                status: 'STOPPED',
                channelHash: '8rpikg2r1aocjzmhhiifg5t1s0d9d26kv431kwv9',
                channelSapId: 'b42fzznnh7567zklg0q16opm9aptd74qr8opedbd6c3bsf52m0',
                channelParty: '32ltokiyq2m7vj0hebv2nacz64c1lbaivs5bpcaause48b1lw8q09bs5jzgbrshtnnyg3zabpwsarjogdj47ivohfbq6cxs3tb90ukgo7i3whbw4nhnnr5uwemcw4t7wmv2m4ri6xds57c4f441cb8ue0xzk9srk',
                channelComponent: 'ytu9arjzwjh4frlp9ur1bnwl869x8c8xz3u2nff4fsmakqk0xbzc8pi1qzhb4x0il4z9blbkqqxhqn6l147m26gu1sllzygyqzn3n0y2r2ei7va8kzw2b4cvdja80fgwixbxt8kjcrecttp1vywc96142src6a83',
                
                detail: 'Sed sequi culpa velit. Perferendis officiis ex. Eius beatae in.',
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
                id: 'k1kr528kbbrdzw5m6vg9n13j0zb22hd27eorv',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'xr19w258zeclgyviufgp5xnfqy9q8tpbhsffcvp4taoqx48u7c',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '794r66aiyxx3ifai74f6',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:39:37',
                executionMonitoringStartAt: '2020-11-04 05:59:38',
                executionMonitoringEndAt: '2020-11-04 14:28:51',
                status: 'UNKNOWN',
                channelHash: '0abd09tk98vm5kbhp6v1p0qo9cqwrt1x78bkutoi',
                channelSapId: 'e91t5v5uy28koxej3lccse7mvc9ejm80mb1lxwm4al3t9eclm1',
                channelParty: 'saroea9ujufkkzoskyldbr2gr31eaesauenicq5ud4k5aqu53b47qmlcuscxn1bnzqyezcm4qsjcoqp8qzuob8ejrn7kesuuph2rf7svpgx6ybcrjr18n2nsvuzjeoiw9rtzqqj007pmroxvu3rkvf45th1cxyao',
                channelComponent: '6r2z4f6a62y6ipvmczzejdu3rl7audojllkxky0plwpytli1az6yey4e8u43ynb233qqbclwrg2hbt39a3dy9jaq5a3wqu85yppdacdmbisa7f57xs1i9ktlbkykeuzy4mo9b8cb0iyl2r52vkj1i2zb0ifb50kt',
                channelName: 'z9o5vci37u190wfnp8lfq6kd744iwg3knzajsd3b33z9055s11fuj9asb7xwsj4nlo1ka8m2gkc2azg967759bw5ywavn25nc3ww13zj53ivzfwl2c494atso96ytiwtlpy3tgm3tv03ha9sye8xbcj1r1m8v6al',
                detail: 'Deleniti minima distinctio placeat voluptas ut. Nobis aliquid dolorem est error temporibus dolore non explicabo. Tenetur dolores culpa. Amet minus qui corporis.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '0071cvb1p3xp3xhp4yekoco1uwm2k6g8rv944',
                tenantCode: 'rky6nol17v81qekz9k1su61thxn2z553w8oqp5j3lx1klvkw3y',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'u893d5bwv7m0xc05u0te',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:46:45',
                executionMonitoringStartAt: '2020-11-04 11:01:53',
                executionMonitoringEndAt: '2020-11-04 21:34:29',
                status: 'UNKNOWN',
                channelHash: 'vrl18ovpivvi2ihtdxkg1j94f4sfjoeye4h46qgt',
                channelSapId: '3o7mzo8j696iu7vcri1w3rkv7t2ddmaueji661w9lcm3b4eb5i',
                channelParty: 'yvjvx55ntfqul654jppfzf0ehzxvrxdoqt1m0dl95zxtn91ttgx2fyd8o461yagsp7dtcxcd4kffttlixw64cdztmsg67u4aeagvocfnk9srp7gry63doemgriezvfsv0o2dyddeosrp76w05elvex3qn7d91lze',
                channelComponent: 'culm7iel70wbti1eqpldj9ycpt43yl1r8iwon0lw0r3zi5daobzj429swuj1wk7djmncww2vwlernpbh3ntec8nloljpwo4tl0y0aa556yy7malu0gibhawz8o7q4p4cjggiek061u5h57zwfmxinooaphynkm6a',
                channelName: '8e740zb6xrmo9a6p9ogzym93kpwb58b7w8pflkx17kq3hgag4c40erpww068p6ydl1x50lmaenzf9uixy7g5ejx49kncsyeaa1u9ucctutbu4q3qdavkb9wf60wzyq3cwgjc48esf0dhm9vmyq0ipu3wbyuw7sjj',
                detail: 'Distinctio ut ab earum vel sunt consectetur et aliquid unde. Est maxime consequatur qui adipisci expedita nobis. Soluta minus aperiam aut quam veniam cumque vitae rerum.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 't3plein3p4p6npoxxolyb8ncdcf36an0s9mu3wz73wa4clyshv',
                systemId: '30qdl4l6d5ia0qgjk5hzp3n4wzoebndfwr33x',
                systemName: 'dkdajchzf6rdyn70rfge',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:00:20',
                executionMonitoringStartAt: '2020-11-04 07:34:52',
                executionMonitoringEndAt: '2020-11-04 13:39:34',
                status: 'SUCCESSFUL',
                channelHash: 'yyykwkcsdkvy4xqgwb2hy5pr7j7bg7s97xw8pzq7',
                channelSapId: 'io55o60guesknr5rxyx7poyrhe68w3pte1hektvfuh105gpywt',
                channelParty: '8paacg0xhsaf94so2ms84qj7tybwnnq1q8epmawos40d5ps701u61al98oa9swvo972gd0c334ar989ehzx130fupgfypo9gcv6umr7yb4fblilp0oys8jgnfbumhhqr2c3ikueiko6qcvkcpry8o07xm5h7xoto',
                channelComponent: 'q7j2qtzrljbs2g4l6kygkkx3ytrrxfofglqsrpknb96oku1h9f1gk7lrpj5kudu3bmtm2t5xux08e4hterg1lvi3eswhj3mg7w6bkgahwk853lbc7xnkvrpe2wyqhk6bisu641bpd4nxnmu2z51tes4bon84za91',
                channelName: '5b9k54lf3rdmz5kfk5pkv6nj82ohuj4f4m36aj7c2ck19itewo3v0w04ogafgmtzk8bnrlbg544lq0a0swl87u3jra1jgmgtxm8e33q09td8oxs0hvz37bn9j0q6ha0j46a6sav1jb4rvpxhys2iqyvpskiwqj1q',
                detail: 'Ullam qui non vitae maiores neque omnis ea. Et dolorum earum et. Et temporibus praesentium assumenda nihil porro nam.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 's568yq3jvvcs2nd3tafk9nes4kc3of0tu6sgr1382lup8v074d',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'olptle0l2gjona2gyo65',
                executionId: 'xmtdoj6fzxah956v42bjx76jot7zudqb6fjxn',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 20:14:49',
                executionMonitoringStartAt: '2020-11-04 00:12:07',
                executionMonitoringEndAt: '2020-11-04 14:07:09',
                status: 'ERROR',
                channelHash: 'qt1t8nfrbi22uhmkmtwjfp7czatvcimd47n61jks',
                channelSapId: '5dqdldt1fd33pk43ujq5epbc3jz9cw94uw2rgjn5r8r8enlbba',
                channelParty: '6vrfkmv2t3kjrvy7w8k7i8doi471y6y74d6zwurav37u2o01kk93nzk3jy2v0kkzttofuievkjiuuqf11gfjo4dwd6czl8w7p12g9tiamxb80yvmhp326tr08pvu18umlhqr5x9n1pc9ju5dpmw867a3115flmxf',
                channelComponent: 'cle9e2yowkmo8u4cbrwhncd5kv2c9cvfnak45w78k3kdfidl21ye3c8asdnfsv7u0vkvfzph3le0gv92xk486eq5n6ncfyp04z1j9beyzsgkr45nwlwgdtrul7kaex8c6b99u9jy65i8ihs535ej7v2lk6arnbry',
                channelName: '6i3j1o7737xg51zejm92f8n0yvy06l11sm4fa6jxbcaja8p4wbkt7gnvwsjpqfrehmbzfu8bnl0l3bwrxjpgtqoda7lvpqqrnlb49m25senot5z2cywjp7pt20dfya0ce8i3lvya0ugd79kugplcmwyyx83a29bj',
                detail: 'Iure nihil odit est non consequatur enim neque nesciunt. Eum sunt voluptas adipisci ut nemo sapiente sapiente eveniet. Qui dolorem at ex voluptates. Quis maiores in debitis in officia.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'mk0dp63ado8l2sy4w7ib5hasz3bj0j53vd3vkfi3jrdytftumc',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'x0s318zu3snokcga8i38',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:36:24',
                executionMonitoringStartAt: '2020-11-04 21:00:18',
                executionMonitoringEndAt: '2020-11-04 14:40:59',
                status: 'UNREGISTERED',
                channelHash: 'ke8cxfvim7q7kn57razeki0t2ntn8ocvre1hc1xtx',
                channelSapId: 'l0epwck7hawfl5tb8pgpz16sckfq0fiu2cmhjq2xowm65c1m5d',
                channelParty: 'dolk96hjv2pn0gz1ucmjd6yjgda19hxkkj69xa1lk90in8cj0e5yfwicub9c1tb1g8qdobq9i4rf5lngeacqlqe9vt9hf15ezlnfyhq5llrjz2uiew7pkc70epwhxpznbv4n81j7i53otnft6rfc7568ts0shwwe',
                channelComponent: 'y9su6lvjz0xao9k0p9zorowxb4bzts33xukcougrqnyvl86hmyjjrexrlibjqzt7cm5sdihgvbmby27473zs9go9043qns2n7yjrw0vldt661bp6ec7442b4psx9u66oyam7i5rw8vsxvetx89n2m9iwt4f2pxes',
                channelName: 'ksjqqqfk0n6er9u2vlvr100tfdp163aeffspo551ajjyi4a1w82xx3pq6qaviw1xte7hnnivexqicf7s7nozmzz40q27wxvt75vsr3xvbz0xywxt2axeq25qcgmeyekjr4l6xrud7dlc5v56rm89q3dz8w9ug2q8',
                detail: 'Fugit omnis totam error. Unde aut ab maxime provident cumque sint doloribus. Vel aut debitis. Libero optio ab impedit. Et id praesentium architecto. Qui officia at aliquid aperiam.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'twek52xzprzirtf2br2o92pnsy4xec9y07nc3ifz3876zabj4dk',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '9pbdpnihbt86fd8m716s',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:16:58',
                executionMonitoringStartAt: '2020-11-04 03:21:13',
                executionMonitoringEndAt: '2020-11-04 21:52:38',
                status: 'SUCCESSFUL',
                channelHash: 'bmlfgiyt3h205q6muixcndtgaqneiwi13nfp3cdt',
                channelSapId: '7u40aevi5d9i9ixb6bwx2wfzbt2f2guw43ep8k8uui2iocqhrp',
                channelParty: '64oql33oi9mqmk7n7kvr6b254n2zta6swfg5oe7mincbtppegj95xzolvl3hb03u1v5phs0ltpcn6wxrudmv0pg6h26dkihrra6n00gyv4fl8gpbdse8q2ix67z8bj2r8dd0sbodrzkimpo0t6tadozt6x598eb4',
                channelComponent: 'gpibgx5px1atvrz82knbs37et6g2it2hahgu6hgus0mbap8imp0ayeo4isjwniq0hs9uojpazxebqfegwqjgz3x57zch51dvg1tkt9o3xq0ktl7jq1lbyze3zcxdsf0o9vp8pz39jt12yb0cq3mz02yr86hot33h',
                channelName: '3tj0nb5jx2igdlx6gon64satsahepxwrahcao7ktzsdlpj1c40oy2qu9esmtkluslow47uti7kwnuvsnqrmwt8ex7fxnar06ur1nz7un92gj72g7tyxjbv9lh3n4bc3w03v51htzjneoq6fe3l7lyn7h4wg05a8v',
                detail: 'Atque autem adipisci autem aspernatur asperiores et provident numquam. Porro delectus sunt architecto aut. Minima aut tempora optio. Enim magnam magnam. Vel quae cum aut.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'vodfk5mo9ez3bteft04asnvjqwhljttx8oo9u4viur2k590u3j',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'xl3op5ulqx2nv4r5vtf4f',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:31:36',
                executionMonitoringStartAt: '2020-11-04 15:56:50',
                executionMonitoringEndAt: '2020-11-04 07:35:30',
                status: 'STOPPED',
                channelHash: 'cpze62wnzoli18kwpmcssnlznjmw8egul307v4hr',
                channelSapId: 'yk8aveaqw54yp4amfcxnvizj9zhivmieqalvzdr1ng0pojx2zg',
                channelParty: 'jib4xwtxto7cqjfk75nj67x7j5ehddqz8zg5lpho2jyokoqsrn40t74b8ipppovbb3n4aa0wdogxoop3xhkzh0l3onsvcjtp882golhfm8o4riargvtvlbcghxij9coq8bhilfu6a0pyrzonmplehgvhz16rxfqo',
                channelComponent: 'r3us1psltd7dcb32lxtnkhw6whkt48exo4f3p70wahk3flqynpeicfo44kdp0krapd7c6ius46cdkjlzyufj11esqjnk0x58mdcwbje56hxh7q8ygyj8yq3grozsxncta8elvz7sjja0zzjcvkdfbm1um74bmmp4',
                channelName: 'i2jcbtllnt8mbrgllqfyjuhdg45aedq85lpzoibjcs7q4izh77ecw0a9qb94aggwb5g2j4bzxcaf6jitphd9njvpchurskpdpyxhh2tb328acg75al641z315yju3xkifqwqs3kinrt9r1vc596a5txs9pgt1lko',
                detail: 'Distinctio ut aut illo optio hic et quia officiis error. Sapiente nesciunt voluptatum reiciendis id accusantium qui. Nobis id praesentium. Totam ea laborum aliquid.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'ewef9cc7iwyxtsts152ysymnlpqlsqf7jj984t711xqwir88cq',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'ibavau9xf9bqzzmy80eb',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:52:53',
                executionMonitoringStartAt: '2020-11-04 04:37:30',
                executionMonitoringEndAt: '2020-11-03 23:56:48',
                status: 'UNKNOWN',
                channelHash: 'gf9ptt4dv02vckuf36cdrge9bp8u5aav0nxxbdai',
                channelSapId: 'm8jkcepm15gro0pa4kj3w9fhevbfcgilycaa7rnp767pg7r38wn',
                channelParty: '3c7bayvikakrntv4i16elteb0foz63isasov255yo1aqp5fk7qf84jwe7rf8qm3wxvh4dmbbku9xhav2am39fes0pxurv8p7ye8p9jbsgk3umqzpvtp6p2j90gep7f7t63vwnnx5m9dcw2umxa66om9z1g34wpgk',
                channelComponent: 'gtweo4go089zlja0uaxdza72jzkeoyegj4msvrs5juohl52fkhelngkc5xfvfz4o2uuax196v9o6edr9x5qmgt0sbb89w57rxb3b97lunjx1hcgrvgh9q16a40zy94o3rez7qh6borttjyjv1wcfowx44018i2tz',
                channelName: 's674eipmbqxkedrl0m6was150m4kvazsx6r1qf445105408rlx9k0lg76mn7lrd90qnvh6a2rrux2gs5jjatv2z5ai8h4a257ey2rivwpmlbo1iifw8i7rzvzvcexoabytbqhw35fn76zkmt7zvysn1vvkyfivsb',
                detail: 'Laboriosam impedit quis. Vitae temporibus et ducimus iure perferendis. Amet illo qui dolores quasi molestias debitis deserunt. Quidem sed id qui.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'xo6o8k4jcb7oxp4th9r5srcgbojrm27e0rnfkq62a75ugjfppt',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '3e4s0ksoy0hi2kcp0ung',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:10:28',
                executionMonitoringStartAt: '2020-11-04 22:58:29',
                executionMonitoringEndAt: '2020-11-04 05:38:13',
                status: 'SUCCESSFUL',
                channelHash: '923s42v90d1utmc21rdvmg2u9xb5i5l3fx1p8w89',
                channelSapId: '0cd9hf56zck49fve2n7bzv4wasn8dh80rs3ox2ms2ye8yq5pww',
                channelParty: 'd4462so9ezanrjpp75pu0yvszrj3ylpnf4v5rpba8xotstamy2opet2iwti28yr50i2wbcnwspnp7c8tt3u585s2zp7ffuqjnslh5o96ec0pte7c7sb6labxy23brvek53eid1rjrmrt8i7rvei7hm69d8wsc0ych',
                channelComponent: 'clq2we943ol1zh3dweg40dvvplcwwgcag9z6nnfo5cclyfy7avls6937q5ui1f7vbr7mx5rc1km2chfuyklpvqlbmyp7qxs50ovgrqayj3194bmfag5rl83anrp9luaoxvvo9hy8lznjly9vxa3te5v13u38u0ky',
                channelName: 'amumo4u1i3vvnkzwdknwvclm8zdln4bqppp6gqjnsne78qb0s7u7obiw02rc0er2htjfu3ty0ijrjueen3r37upbktygt84k0b84pz2vks5y2qk76nuwi3js7syvjptw6o0t5clb5lasvhphta2kuct14dv55ibk',
                detail: 'Dolores voluptatem atque nesciunt in quo dolorum perferendis. Earum reiciendis occaecati. Cum dolores aut quia ullam. Aperiam tempora tempore ullam beatae eum corrupti. Reiciendis et dolor. Provident qui accusantium voluptatibus unde optio vitae qui ea.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'w4sbibndwjay9y8qucq27lehqxpap7601om5tc0i5l95g9oxdd',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '5cn5uhlx5tnocvz8qplg',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:56:39',
                executionMonitoringStartAt: '2020-11-04 21:26:49',
                executionMonitoringEndAt: '2020-11-04 17:57:28',
                status: 'SUCCESSFUL',
                channelHash: 'rjccfijitc95x9s1hd0y2tt8xaorp7nt5xa0kdy8',
                channelSapId: 'l2nai5z6zvdwbcjht8r2jcp9pw6610cmuck6go6sw4pw2sw07f',
                channelParty: '2kotneccuk7hbwx4qvdlyi6ip04z0esghse4m690uz82ey3ouh01e359p2qd75f6k1sdcpqgguzjki3qnws9wqnrc1x0wzwe8o0ott4tgte28efaupfka6gp2vbjiokvit9g1130ywn6tks2yr6v8i5ch2asrk2b',
                channelComponent: 's3rklqm60o1qz7dq4astru6zhgepwu97wrqlnd866bj03dhnjfgzykktq6j3b2hf30zflg1t3fw7ww38js3pfls0wgbl75jsuypetdpkolqgq6gdkll4wpix8yqtm9gb89g39em2clwcnnerpzcix203n2aq5x19l',
                channelName: 'etlb46p5z9kwek3nko17kjtee1icqtnfik6bqiht1atmc407zeb9a2re9o8fomaavgowt8wf4s4ljdtptlx5soh7ynb787snjdlff2fm0u6r5i5fq64nj8w51ay82pyw7xqjyf3kxxa6wq0ohwfls498krmvvudu',
                detail: 'Officiis quos aut et ratione temporibus. Sed laboriosam sunt sunt. Illo pariatur voluptatibus mollitia eum magnam. Et id modi inventore modi laudantium beatae. Et architecto eveniet sint ipsa suscipit beatae. Optio quidem sit distinctio quo iste aliquid vel sunt magnam.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'xgv6gqc0l4lchjoado9nofuv398wtn6hqkkzi1yrfh8sd4al6n',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'ictmzlwjiinv0fau1pul',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:11:35',
                executionMonitoringStartAt: '2020-11-04 17:21:45',
                executionMonitoringEndAt: '2020-11-04 18:08:48',
                status: 'STOPPED',
                channelHash: '9ss87eg3s4p5n16bz4q260a9qxhi5y51jb8cyhv8',
                channelSapId: 'cxlvv9g0irrzvp2d1fjt33gfxl48p4nvm0oomv98idf7hskg5c',
                channelParty: '7wdgmmud6q16rsxxfse5634im88r06fn9zbv1wxqngzqh8y4vs2m4iuo3pajc91b0bxfiahg5058vtkoluth815ulmbs56ua625s367edf1ac06dpxld6eqmmjnhxrshvaxarj0hn4jl79l14tibuf8781uggzdl',
                channelComponent: 'g7dd5nn2an4h7b2stg1gm41fb6z4622i4q60ne49fztfeqwc4go2vbd36dq9w39goynr1kf22c56v5507zvu2mjayfvsm5oab1w0j216by9yzbtv81o8yxiyz9cmfa8m7yjhgdpj22e18e6bfpwh8bwy7676x00g',
                channelName: 's5fbcjvs6jzjj6xrijhj5tk9iir0plthui22ufjjtjat5dppxjnumggxh1n2fyosvw97pxqntmb0tcr9uj23z4t1lauh1n05q0nldjlao6jsyti7zzo4hc7si4wnkmwf9gnzm7mir0wi6efsuwul61v60hxn33uxx',
                detail: 'Excepturi impedit ea et voluptas aut temporibus. Aperiam earum saepe ullam consectetur suscipit quo consectetur tenetur. Distinctio sunt et consequatur odio et autem ut. Incidunt ut enim qui ratione ratione autem ipsam placeat. Facilis ex alias eum explicabo eius itaque quibusdam. Officia ea necessitatibus aut sint nam optio aliquam.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'ukmr0n2j2qvfw5pxuxz0of34puul225gswq8629guj2u6hwsa9',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'nil4vp9x0pszyr09097q',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 21:29:02',
                executionMonitoringStartAt: '2020-11-04 21:35:59',
                executionMonitoringEndAt: '2020-11-04 06:54:19',
                status: 'UNREGISTERED',
                channelHash: 'jl51f8s1f33id68uaa28ldipg3kzpadmzdtf39ne',
                channelSapId: 'c0waribbc32bxk6uakdtbnhpqbva07fx9jsa975yduw2e91r62',
                channelParty: '17kkjx46z3423wipigbkss4i2tzvuf1g4nulfjxoxuuvxb87lhb0gyu2bsbzh070usc0l94elesvoftfzvipod5n3vqkxrr2qnbquwjojlhgbb2nsah0btsmpsnwvic61byd6wrcmcjq6lwb2mi6yzfg4gs7km47',
                channelComponent: 'schnn1gpdrcu2ojr1cc5481l2wg054r7rgy0kr7eihqvfwfffhv9hauzb1y377fhpkrstyo9ochaf2l37fxiro1hi11i9uzmr3ycskxd4jg98qa5903a9n9w99uti9x83776mv4t0775hc7jbbqg6yr2bv5kn9c8',
                channelName: 'f344l4piboj15sxsfgzchxcrvpogebv0rorxz9451lyoald2cen4fmmymq1kvhzf3svppjppprg1wpy52i0mopricplo25xaxno6c68pxhbgqmlhw48547vw0tax7s17n7ej3ust4rdkr1gvfn5gvw17trnwwr0o',
                detail: 'Porro aperiam ut laboriosam. Laborum laboriosam tenetur veritatis consectetur et. Sunt quia non vel sunt veritatis facere itaque reiciendis est. Nesciunt voluptas asperiores eum eligendi repudiandae voluptas laudantium. Quae deleniti magnam perferendis est debitis.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'cd8xko7qnfjg0yfql7guh8iz31lo7c8jeoyaak5oqnw22efuvw',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'cmfhevjuy0qonw8sl8e3',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:53:45',
                executionMonitoringStartAt: '2020-11-03 23:49:43',
                executionMonitoringEndAt: '2020-11-04 16:38:01',
                status: 'XXXX',
                channelHash: 'i3v14f7f5izl2hluwcdhw1zvpcmwxcz95vdfw2ug',
                channelSapId: '2dafbf4kccr86puxkvm1im9rturoeki371tvvac4d9exfwbjhk',
                channelParty: '7e4gv5qf3l0d4kwpsc40zatacbuffyzi6zs3tardqfsicxgbjjgt4sgjtg3fir2xei2xraqplcb7drzfbuy71cxk3b1g23epckw843rx9dlv5lvwkmkzc56szl0cttl5fpl6ovq6im3538jrlpc6foc403l7qyeb',
                channelComponent: 'dr39tz8j5ij60x6dns5r7tdvtkm1qit60c1dd715bqyz3b7x3bsmk1amh2591sbbfxhntwmn7egju134cgc8mdy9xlfx5sxako1f6apolazf3r4408q3jaqp7decan2nmq7902yg3klvg03ctb6mja96qq4kxtjy',
                channelName: 'bz1exgamnqbu1i4hqfm6j2ham9jndgrj4733g7txu8u556wxrwk7glr84guhzbp1y2pg3r0v5842gwjazx9rd2logqa0vegghxt058294o1nae9nj9q093zq9x3yhn9lphtp6qy8y17xvddrwsaqlstk9yvyfeuz',
                detail: 'Praesentium voluptas pariatur et ut. Fuga a quae distinctio facere ut ut. Illum magnam ipsam illum quia quod qui repudiandae maxime consequatur. Sapiente corporis laborum.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: '3dvh8vf7a7hd1iga6jd88iqy0ywfxslg5via2mbhcjwp9qbwiu',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'sltbac7csgzd9tffx2p7',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 11:15:48',
                executionMonitoringEndAt: '2020-11-04 03:02:21',
                status: 'STOPPED',
                channelHash: '6gloz878hdsfqxu0sd6lvxje6shz0vnb9321pi67',
                channelSapId: 'v9n1bc1rxpndeisy9fevquy3a13nwl1f3pyced3vtgtx0aimdv',
                channelParty: 'u1fccoxiex4kh3wfrqvk8bnmfdn17xmiivrlppukfj7648g30jl10pirwud939xvt4tl7iyfr0o2trn7zdhx5e8wwrmma6axn5wz0xd8f1fu50mhhynz6fkpdllv8p5djdn9qejq6z1ps9op2kwe1hzsm00acdqn',
                channelComponent: '30fohrq7zaoxzt5lvedbddednpm1oaxznmsbin5v73cj7vadq4j8zkk0ej7czitx4v46qgj5viq4m8dia1odegch75b3dvfj3wrw4nthl3g7h72yx5l5gyuwfbmsj7wf2alepcnot6nuesfr8dmnjruf18e7a2j5',
                channelName: '6u9p5utf0wkrwgntquid7y3p7glesxx3wxydkeclsluws9wpr67xb09q7sv6u1abl4740zkytllbx264euwpoeb0xwtwwimt5nqqsywfvi7swh8eho1jf5eddphf6sf92477d04qdrs3wq2mtc7i7z40mm28lbjn',
                detail: 'Ut aut quo nesciunt consectetur sit. In eum corrupti odit magnam neque neque. Labore placeat perferendis id ullam esse molestias tenetur possimus nam. Fugiat dignissimos quibusdam dolor dolore enim atque quo quia. Enim quis repellat quasi qui. Magni eveniet quis.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'angsvznqpw9l1txg8s5bcip0d5rzki1i77wuri4ijxtb9lq9dh',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'ampb1rehqehcgsi22vyc',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:56:38',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 00:16:18',
                status: 'ERROR',
                channelHash: 'q0e1oa9tntzphsw1n87sss0wpq60ruq0ipyfsf9g',
                channelSapId: 'hezlrr9ww5jbxdo47qy088lu51flsojcwx24w6jexom7hn170v',
                channelParty: 'r22d4bwofrofpiqkek5k1z6x3k0g26t2278ppyd46b4o9rd9qjq538q6ttbozunqqdlfvr8kypin6qov60uul8qu8gcxwhrr9neh8w5ztm3k8mhjybatu8i69lsmejbv07jeasgoki6qbmwyiu6st47v9vmybs36',
                channelComponent: '66o4x68v0ayt33gxrexqxujc59decwpauk1kj4kwj6fd3ag2rwopzr69ehvoki82so8na6s0ke72pakyrjpbm8w4lr8lvqps70b5zw0i1j23eazjn0bvk2955q6y1e0tdf35qn1xc8htu9mltuq6zst8uj10l057',
                channelName: '2do3m2uhc4jad8kvd6byv4qmrxrzett6qhpbyw4x6fllunx3uakhflg6nsewuaq07xjzln6d3q6dmkpdybgl1ereqficutxwtnp52qavq5q757uaojk93xawgd0j0o4daks1n2bx7gvnf547sq93zpk28lps7pue',
                detail: 'Fugit ut et dolore possimus. Tenetur in id ad nostrum laboriosam. Qui fugit corporis nostrum impedit enim et. Iure similique odit molestiae aliquam laboriosam magni. Voluptatem blanditiis consectetur perferendis cumque earum labore. Odit necessitatibus dicta iste saepe.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: 'n3h2wl81ghwdemoz0dqwgcvi02luv2rofbzoo5kxj1etj54q6n',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '8ws1a4xgzjwbds4b2r2h',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:32:34',
                executionMonitoringStartAt: '2020-11-04 01:30:55',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'UNKNOWN',
                channelHash: '7ik6knk016pz6ahaeqvf90udqrkt0gyeqnhoxcxx',
                channelSapId: 'z4jfx8a5yi3me0b14cneu4ttooa12fu3fc2o7qcpxfzv4nov2a',
                channelParty: 'nfjo2rpd17700bqudil4immorg6ls2puxaeiz9zdd07wj6712v8vgziz6vat2kuhy5fg4wnnm26j1z13hyh7y3x3np0u8oxbqn09gu3rae9dogkr518gezctb1qokqb9gd4rbszpkh9j2orslmxoujdhn9218f2b',
                channelComponent: '9m4x0voay2b3r9zoqtat5jogbiivc3900aoo41zwwtn7ck86yknqgf0o64ae4dv7l6wpaa2zu2pt64ww47sdh5c5afz8968yev2a3aiv2dpk3aqkrbkx06vv4xw7stj91x5wfdd0ewdioshl1piv46wvxgb3rn62',
                channelName: '68dpwmjzrc7qt7gr2ks5tpfm69ouqb2oq3edkp4ftknfse5z3jwy57p1x0r262e9nupqddka0vey8iqlnpy401gtsp7273h00w9gg4b2v9dzmtkqer899jg828h1lk38gd6c7oxelb47rmbba700zzk242u1iyal',
                detail: 'Repellendus porro excepturi aliquam et quidem. Id ipsum aut velit suscipit esse. Aut ut aliquid laborum recusandae tenetur tempora iste placeat. Modi qui architecto earum doloremque qui omnis. Consequatur esse dolor dolore libero laboriosam dolores velit sit voluptatibus. Porro tempore labore doloribus recusandae.',
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
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: '2azd9ypughiwh7tys8lm4qpulrxpshcjlhnbhjo80jxanlv2da',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: 'gmwfuxd4oujcnk4ke1im',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:59:15',
                executionMonitoringStartAt: '2020-11-03 23:36:24',
                executionMonitoringEndAt: '2020-11-04 11:57:00',
                status: 'ERROR',
                channelHash: 'itp8qzjx6hlnofqwcz1fevnl76jjejkd2njbz4i1',
                channelSapId: 'zvj0d04exjx8w4s7v84e0a26c1mmonstcuglanzn3me41jt06b',
                channelParty: 'bknkumbu8cdvu85ji9f4z30vys1e80fv35td9spoesuln399tzsv04yae2eskw1tip94v8uu6xgvowspyn2di80cku3z06rps4l4dvokmel9d98o6f8ke8a8uuu2h7xa5lbk6feod1aerg4pzbhcf4cpnropxamb',
                channelComponent: '0m0djvam3k50xu6p8ouun86fkqi5cvb4nip1kay49wwem4937sirtotqhi2aho7m0q0kgntr9acob0vpk1tsrqr9j0zf5kr52w83r3dxh4bggilztbbwzgg6x5yslo1p7iwgp6ay3jzr1osio7h1aa5h49qsfq2c',
                channelName: 'dfdfzcie4x3csexu43zu49ottep67zomfu5n9wkgcyycq03782nblkkxfqm81qb4t2zdnzhh44t41ntd66xh2y6ops9a98h65jk051zmea7hsd8gy3kby7l836kwnnzbqyzflzpyb77cm6aqu6oetr97c0ikezac',
                detail: 'Placeat facere atque sint dolores accusamus qui excepturi consequatur dolor. Debitis quis molestiae eaque veniam suscipit aut vitae. Inventore aliquid et rerum omnis. Ut facere doloribus cupiditate vero nam cumque quia.',
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
                        id: 'e18adada-033c-4ab4-a6cb-31f1c8fd0074'
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
                        id: 'e78840e0-821b-4641-8a38-d9fd7107b731'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e78840e0-821b-4641-8a38-d9fd7107b731'));
    });

    test(`/REST:GET cci/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/8cede6a6-79de-44e0-a2bf-55bcc261d8c8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/e78840e0-821b-4641-8a38-d9fd7107b731')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e78840e0-821b-4641-8a38-d9fd7107b731'));
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
                
                id: '8af36317-9eb5-4061-8c3a-e510adb3e824',
                tenantId: '247a4160-ba0f-4189-be8a-bc55ba363396',
                tenantCode: '4wzp0rrefagl71ehrlghc06es0bqfwtq4t8b8uxdhjvuz7ewm9',
                systemId: 'a82f291c-e541-4280-8ddb-11e0862d37c0',
                systemName: 'nsffmkx15xtooih1rbv2',
                executionId: 'd43a7367-d696-4149-9010-b7b1392025a2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 19:57:57',
                executionMonitoringStartAt: '2020-11-04 17:43:24',
                executionMonitoringEndAt: '2020-11-04 20:40:59',
                status: 'INACTIVE',
                channelHash: 'd72vdj77iykq9myogxy7xalpbd0hqsri81cxoxj2',
                channelSapId: 'gm08x72uy71ei5vkczkyibw7hemoz2vjfeo9led1snx3oa6ngu',
                channelParty: 'ga3xkb5ouzws9hkmgw59sc7wxud4yyrrehkayjgba44nelv5innfws2f9jluwqgtagy7d6tt9w0fdx2mooyfoi6edcl80zn3vv13vc9ul4u2813mtgkjpg0v8dz2u4fldqshyyxoqixsqcfplvqiu87nbaelwxps',
                channelComponent: 'rfsyvt5dzpy4bjxxjuwfsrpe9n1m42b65pjf5auspp8uhc9le0pj62va250yl7fz8trxoomopyh50zdfubgndjvzbdsdcw04iduu1uysvh7l29gdaoynhjvnvq0hellmja2lnu7ga1kbydy3agkoejcmxm3fdlug',
                channelName: '60rangpfs2a6nolawqz0lspkto6nps5mdan460j1mbj4u6qvrggks2ztwpa73uzed18cbm27xw36qe5v2udgv3swnk36xr6w4d8cgn3oytt1ufzi3wiseg5fjt6vv5ly1ruipkhjdfh1ityzeh7ssmspgq7qcd69',
                detail: 'Culpa sapiente eos harum aut voluptatem fugit aut. Officia et illo rerum quia eligendi ducimus possimus rerum. Et est doloribus nisi fugit. Ea esse tenetur eum eaque. Esse aut enim quibusdam qui aliquid quia iste ut non. Dolores libero deleniti.',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                tenantCode: '4q1uheafrrosv9ypa622pedwy89jmku8i1l7gcu0cinl9m9sgo',
                systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                systemName: '2tvevwzbv9es7v3oykth',
                executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 19:30:45',
                executionMonitoringStartAt: '2020-11-04 07:41:15',
                executionMonitoringEndAt: '2020-11-04 21:38:15',
                status: 'STOPPED',
                channelHash: 'g7paozrg6vfa1lb1g2ic3qd9j34h38fk4h79yys0',
                channelSapId: 'ha023rkuqs0tnq3q2kelgprsk9musq5rq1i0629qq22ozba9f5',
                channelParty: 'ghsnfhuklvx3w3r4dv5al1506y0kczhujd39vzj2lwtwrjvw8ljnt3y05zxflw2a7kym7o44pzx2vqopzwdts5344tezvae0sx5ksblm8kuq5d2a4kaxu1cdo72t18z9kqa3w1dqclwq9xeozu9jr38fcirfgibx',
                channelComponent: '6rpqyenzdlu8xion5tuzgxel014och16c4spxbgqbkuigr46l1ouhkv636fiw03ambgl51d70rh8tx1gxy1qu23rmqv8ro55uoakbbfd6bq5paeg8wbc45j6rtkwklebz1firuyxaq5jw7sybohkxo719qj8i7u5',
                channelName: 'jx4fnpepf7s7pazomncxc8zewnf42fw5cjo5e4p0xcoa7y5v754zcw20txfgv3zj33rv2l1x4fqa1frl2kdrviv9fm2qao3fvntvodzhrf1rrb0irdh9ojpapedxxkyxsjrl00k82ckpw22klptff0n5qm9w4bn5',
                detail: 'Voluptatem id sed aut architecto qui hic. Rerum sit odit illum sit sed placeat voluptatum exercitationem. Ea temporibus aperiam ut aspernatur quis architecto eum.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e78840e0-821b-4641-8a38-d9fd7107b731'));
    });

    test(`/REST:DELETE cci/channel-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/cfa7fe65-f012-48a8-a8d8-7d77241f87df')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/e78840e0-821b-4641-8a38-d9fd7107b731')
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
                        id: '8a446077-d330-42ed-a5f6-0a6c2e0b233b',
                        tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                        tenantCode: 'ukaot98tkwkz7sh4d4095rouv1jpqy3hsp1307zuj7ic93oa8c',
                        systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                        systemName: 'ici55h3f39k22fi87hi3',
                        executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 13:12:21',
                        executionMonitoringStartAt: '2020-11-04 20:41:09',
                        executionMonitoringEndAt: '2020-11-04 20:07:02',
                        status: 'UNKNOWN',
                        channelHash: 'qvozbgfr4vzzuhd8zzuvl1aper9vr2a7zeh09qrl',
                        channelSapId: 'z8ksx1pbp5um842ym2h975a88bdqv6x7z2dbqwhfs255exyzu1',
                        channelParty: 'hzcwalo0i64cd02dcsfiyrai09ythjl62x88c20vs4reae63dvgfvzw9gic0j7vhts3dephrb6hwr5ap3p3oh268ud0mwszlg2otuak5uex4zu3e5jnco1kjovdgdzsat0wbld1k5fmgbrl646dxeetsj2p484ny',
                        channelComponent: 'npu5vluz2a1xm8erjssnzxnj0huec2d4k6sf5u1dshg9e3rhxu7pzjzqyntbeiiap1pqg6dwrnhw5l7tciv2aos4isifkhghbjkdwuhsdnvzsa5rocblwg50yogclqtgqkycyjqzrwpqjw6bbp3an6rm60i3dn2j',
                        channelName: 'ia5pvyi34wmk0apm301qnxt5jb63oj0k0l4f7m5j4clns896nkax12vr0xxlwwu053unvgf6v7crbkcrsgub5o3dn6keq5jw7hfwdcr7o6agqzx7xjkjlhfm2nd4hln1839u60ygasnp3ske2sjpq7kg362zj6nc',
                        detail: 'Consequatur aut cupiditate. Pariatur alias et et veniam commodi. Ullam dolores natus ea qui quos magni. Quia eos blanditiis impedit et consequatur voluptatem cum. Unde rerum est ut possimus nostrum.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelDetail).toHaveProperty('id', '8a446077-d330-42ed-a5f6-0a6c2e0b233b');
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
                            id: '007e8a93-4599-4d0d-ab76-07570b87b934'
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
                            id: 'e78840e0-821b-4641-8a38-d9fd7107b731'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetail.id).toStrictEqual('e78840e0-821b-4641-8a38-d9fd7107b731');
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
                    id: '60a25870-2789-4906-bc8c-46e7eb5f1d28'
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
                    id: 'e78840e0-821b-4641-8a38-d9fd7107b731'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetailById.id).toStrictEqual('e78840e0-821b-4641-8a38-d9fd7107b731');
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
                        
                        id: '0fd4c6db-8fa2-4983-a8f1-be5cd2740af5',
                        tenantId: '3144a0ad-9ac1-4e5b-b75b-1b436f12cda8',
                        tenantCode: 'hgfujm0t969kzgv93wpvjr4m0fjf8oi73dv9jdghw750ypjyd9',
                        systemId: 'f0a6f7bc-a07b-45a4-90cf-7be4ec341d5c',
                        systemName: 'i283dyd04mrxu1efutfx',
                        executionId: '8eeac9bb-e77e-4154-9c7f-c8ef0515b5e9',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 08:45:04',
                        executionMonitoringStartAt: '2020-11-04 10:58:42',
                        executionMonitoringEndAt: '2020-11-04 14:14:56',
                        status: 'INACTIVE',
                        channelHash: '77b2b4a6xt12i40v5fs1tl2r7prgo4wjjcffr1vx',
                        channelSapId: 'hipwo7k79i45ka8n25uma57gy2tjkn5nbndv76khya1hs1xh0o',
                        channelParty: 'lbap345spv39jzxky7w1nr6hhy73c8434ns71n2qjttpoxgslsck2fxamczxk0jyxi00ftwx9g9857hc8scbebg0v35ea9674dlrzh2hmg7huvvhabinzzb76jb4g4rwxmn8gj4701htmvioj0fnc43v8i434p2r',
                        channelComponent: 'xvxhidyud0xxjffxxe2hggiexnysdaryy6imdeifd0oh5vez2iqd8m3aumh6b112lftj621x3bvk2e6eu7iym99yjkocwb1q8fewtewgd4y7y00qvjexu8xgm3b7ft4qzae84mssqegto365jiftjkakrdxdjxfv',
                        channelName: '6ea4x8mr6mkkkzkfgsqs43bxz3sx32vsqu7bdotfqe6ymj4dnpqyevv6ml4bhqbfy70xkfhk1a9tdbvq16aj4w63qfutz0k9xh5kzs12oadql110g2cwuh0d3u7nzw8i68aqbnzqqjuqxo0ipsw4n292dtgdfa0l',
                        detail: 'Fugit praesentium et quia voluptates inventore. Molestiae optio reprehenderit ullam ad fuga dolorem. Ipsa atque odit et est at excepturi laborum quia omnis.',
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
                        
                        id: 'e78840e0-821b-4641-8a38-d9fd7107b731',
                        tenantId: '61b0837a-bd97-4b56-827d-5d8cf14890ac',
                        tenantCode: 'ujka2tx9chl30ed42qty102gp3sjq4i30uqwz165uvn50za2z4',
                        systemId: 'b0963589-99b2-4127-b23b-793d3c9e2b5c',
                        systemName: '3kb03s7jdc79fld51ghb',
                        executionId: '8e28ce55-c0e1-424a-ab6d-088f36535b1d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 10:38:59',
                        executionMonitoringStartAt: '2020-11-04 18:55:11',
                        executionMonitoringEndAt: '2020-11-04 08:12:51',
                        status: 'INACTIVE',
                        channelHash: 'ofkiwfjbpdohjd3ikll187pix93elk6r2v9ztcgh',
                        channelSapId: 'pg133hb2srqezfon440xfwdsznonxzsshupqumniocme4js6y4',
                        channelParty: 'lhlft1guxsu0iru1em6t5rei71y2a21t65cu5e9qsvvhaczpjgdxcfymfz4132uh2mzb8hux909uo884k1q1kaupbmswavd34ekum17jyknr5txn48nirchz5wal6sgo031hktb1ryy4yd3wr8v1gt2fqms47j2v',
                        channelComponent: 'c1ozl7u2rex0oloq6yu8sy8es0oe8anb16v31iralfpkzvvsmyzb02t7hnyx242fho4xpb450wu9iv6pi6h78yv2fj5jz0u4rld5c79228hrdwz2fcemqi1snl9js6dsqdusgcfb5ztst19v8ib8p7qyigl1ueke',
                        channelName: 'lwy16qg4set2hcf3286sec3imvcjzo97bwejkq8gjtyeczs1bgqouxn8x78alk4w039ek5jvtz58gwoeu9k4kc30iicidicav2yl820kiw7ns9r3ltn0op90t9h82me7lwc7qqqkuhftjy2i7evqag2haizccxr6',
                        detail: 'Vel sint eligendi ullam dolores qui vel iusto cumque. Perferendis aut labore est in. Dolore delectus soluta saepe et harum. Quisquam et qui. Consequuntur corporis blanditiis necessitatibus possimus culpa excepturi voluptas. Quisquam voluptate recusandae ut.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelDetail.id).toStrictEqual('e78840e0-821b-4641-8a38-d9fd7107b731');
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
                    id: '30ba4053-ae59-4997-b9b1-8c4d7187646a'
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
                    id: 'e78840e0-821b-4641-8a38-d9fd7107b731'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelDetailById.id).toStrictEqual('e78840e0-821b-4641-8a38-d9fd7107b731');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});