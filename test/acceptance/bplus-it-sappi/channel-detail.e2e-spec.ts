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
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'zo3r64jqttlydnlds2pb',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 18:51:44',
                executionMonitoringStartAt: '2020-07-15 08:22:01',
                executionMonitoringEndAt: '2020-07-15 01:50:40',
                status: 'STOPPED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'b0e7v4nkv19cj3tiqnnluwhzbk4ci3nopunyiq2zgsels9zr54n1nw2lk9q9clzdw00g3tidjv0czc4r4vkx22b6jcqwrnac5q6cz2y6ojpir4xdztiruubgj32xkagawuumlbgxzjx8ja6uxjc3g75rkhoj13if',
                channelComponent: 'nvi1skfxx9d54nxywak74vxuo2lf2op5fy1thdrkwe7x6hwzrqnzdngfgnrj7q4km8oj1r9j2rpasmvhno3gvdza94ms8j99vqwn4pj2aah9w6t3khklq5t4bl3gqppf7bzq9w7xtsxby76ljnmthdbrwizymi6r',
                channelName: 'hop6q7x5m16fklpfblxis88r3f24hyvfx3elih8rthpiunfgcq5f1k3v6vpks4ya6qquehbuxwfyrgcxcoowvdf48q6mkqdlhdpld6slhqqwurhmpiam1dt0ssaoq1t31lnlbd5vrz2uky4om6nymo1u3yuylyr3',
                detail: 'Et deleniti accusantium et non. Facere delectus laboriosam consectetur alias veniam nihil laudantium animi. Et et sed qui doloremque soluta. Et molestias sed enim maiores dolore eum sit iusto odit. Numquam non unde.',
                example: '236cbxpxx8ezubhq36x4fjod75jv6xjz0nya1p3xa4plifpntwsvh6elhcbwf0n605m6b0joh6xe0bbsel9wobpn7dk6arcjh400u88e78ip6qj9e68r7q5v6525jn6cms0331dbecf1hkxkp49oa6lv0inee5wa',
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
                
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '3xx0hvfrk9ltjcti9fn6',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 13:20:39',
                executionMonitoringStartAt: '2020-07-15 08:47:27',
                executionMonitoringEndAt: '2020-07-15 12:59:35',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'oen83z21fv34rtxzlbxy9kgz18uwlop6orn9r0ieqxojz5s6dpajzyofgxe68td06v99bpflf5v9qh4h2gydnut6c14x0dmessrwh7cbowopbymrqzmbnl3rnglawd4riojkn8ryszy8c7d04k8k57ngisqh6sfu',
                channelComponent: 'xbpkdj1cr3vgpq2g6na1b6kfwaeeiakiri71w3z5vador6qjvl0qos3k7ulz6jpfoutvwfiyu0rrg3lleknwg634f5bm7znypbf4kqe7zzr0m92nv5auwr1rhbv94by3cxoe5cryh9bdn8u3p88e77yjxcmfut37',
                channelName: '71oiiv1s1gi90z2mgd9sg6utpjtphz4vdth0f5ohf6s1m933id87fi0rro3mmnk5u2ywvnxr25bdxyggwlm5qjr3b2bwhee00a1cklqw81vtv3s8qbfbgic16yubpn3j9epi3rynst5cvmhqyczc4nxxj1xu29q7',
                detail: 'Laborum facere dolorem corrupti dolorem consequuntur rerum aut aspernatur. Nihil eos blanditiis eligendi consequuntur. Aperiam quos modi nostrum officia voluptates impedit quos. Fugiat ipsam aut et quasi repellat omnis accusantium. Voluptatem quo consectetur est sed eligendi at. Vel quo numquam hic minima fugiat maxime amet molestiae facere.',
                example: '0sr4mfek3pyj2m52nbzx2tcrvgdlpomngwjlxs82ea31q0ufn5aw2702imyths32znjdw0ksv3rqp9op02xyqyhuj9c7rbdtp4bfz7b7r5ertl41wmp3nuqhb6z8nefb54nc4u84r8bzlcutksqhkikj7s2d7rzz',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: null,
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '1exvx34ylm0csevc4kvw',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 09:35:42',
                executionMonitoringStartAt: '2020-07-15 09:56:41',
                executionMonitoringEndAt: '2020-07-15 11:56:06',
                status: 'UNKNOWN',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'e7c2uxruzyatu0caf8fdbxxqv7ojhug68xtp9qxiw7sgenmzg9klkv4izc5gtv4fr6x6ozws4mdtnx98mmqri4p600rq5z632whph9oi9qat4f1kr5cuiupn66p8vur1xrjt6l2lyreg3vkkdxnssetg8xqcwblh',
                channelComponent: '2evztwo1pd9c9ivaw7akckulltsonfj9uwx1y7lasw6d3jfxvfwuptuwxt7zhrl8qnsxcxmloc7hgt1f2r62a01etytedq9vnoeinzkhz1k8hg47i9msl7tlwu41l4h50ydv0r5uz8s4zso0lavsmtyxgl0mkf99',
                channelName: 'rdolc2l1xwf8o4wm2qk5bgvzxzj1l8d7qk0l11tqqny2o9reh8g6w9ygarrpul9vorbfmyk03s8i3y33kei5dk3vlaxpmutejsq27s2nddal7gtzng8bpsrdjnd739i94muzx9d4w2f1o2ta35fsvobxi716n7jl',
                detail: 'Quos sunt ea cupiditate. Vel corporis fugiat odit. Nihil ut ut atque eaque reiciendis culpa odit blanditiis et. Est consequatur consequuntur molestiae et sed voluptas quo animi inventore. Fugiat suscipit dicta. Quia eius consequatur rerum.',
                example: 't1tvpgtnkvbwjrinos79i9zt9dztypz60t4w091cqxyny14xwukwc3j7u22ytlv0vmhwcs059w2flrgz582k5ru2ubj2x5qqarojoo9twbqo8egtf67r4c0n3n2v0tndb7bs1c2k1yp9rwbwmayylwg16f0nwbmn',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'vkjzzwca8qrb6t1qe9qj',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 13:44:44',
                executionMonitoringStartAt: '2020-07-15 05:33:17',
                executionMonitoringEndAt: '2020-07-15 06:31:28',
                status: 'ERROR',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'w4vbw7it9w4bz19xh7u76gzb4g4evh1j1vc7p4ash2d87s19ed3ifl7cpkpgkkytz1pd7n2zpln8wh1a55rw0r76ggoz1f91nse2ejxc5wqdhav0nlejw9ujjthdyjet2s9ete3ltf8qpwmtqaxveov022c9ddg2',
                channelComponent: '53vj5izctys163y7cagw0wpjm3kke923ivjhgz23bo7ouli0hjsgis6hl23r4jnmdnozwty5lwk9k0thpb1y1pslmo7asklmecuibm7j2hzpdi7oslqz0g7ij2jjqv9ks4f68q78208euaqo9umqt8mxbysuoh4g',
                channelName: 'g3a38z07mckyemukuhm4d80fj27ruoqjd0jnejj1qfpde0dx7cakip5j58us2eszsala9pwxygyrworkzgfhtumxh3v7kiqxqxe4wjmn8f2akppph0qzjz6gszikqo4ngtgcdrjzfkhqrbsv1758zaphiu5rh7o1',
                detail: 'Nulla beatae laudantium commodi autem. Suscipit fugit blanditiis enim. Esse impedit voluptas et iure eum rerum veritatis. Ea vero veniam ut fuga id. Laborum earum corporis voluptas tempore explicabo omnis.',
                example: 'f1aury9si3c4f6dorqeveh8zzji28jaf216lnt6j9s8ymop8cjnovlfd73iobvof4ugnhffc318q3yjbjoxb6eulfj99r7zp5ewlu9kdabc0n0jed78vzwi0h5fdn01f1qt9dnxb5yp5z0fdsxjwi0ha8kzlnwug',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: null,
                systemName: 'v7ic6qvqrmpa5ted3ii0',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 09:21:01',
                executionMonitoringStartAt: '2020-07-15 02:02:32',
                executionMonitoringEndAt: '2020-07-15 07:17:29',
                status: 'UNKNOWN',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'm6ry90eoplk4e75gp9hcx7s7yqstrtn09qas9ms36uivgwrzp4rqld2gydsmdsei3f5lvv8i7t34dy7olqb7julezjza74beqd2164yhcn4css3ok96w3mt0fx3swse7bp6yg61lortx12mvm8ij4nqhjodtlcyr',
                channelComponent: '2l4rv8rkkudh2r5sdo88g05zgr1d83u35is128anu9n00ttp83kl62ql5qpl97uzmur0rk7g414nby4wtjzo2wl7bjs9q2v0o91tk77m6039du1s2aa1cz3h920f9fhqnaokm28dj3u7offqpud70jbohnxfxjpm',
                channelName: 'gxbai81dyemh0bo70sw6zfk84hjfoqoe85z2nbg08ekyoge81l7n2s8rga0hhihwq9tz5dk4nexm215k5uppn7nrrzh1dyg8oin54mthhxbm915lkyinzdgrml59dexvoi44rf87rxlw2z9fkvs2kycu0ngcgk9o',
                detail: 'Omnis velit qui totam magni repudiandae eum. Omnis et sit ut aliquid sit totam. Inventore magni voluptatem placeat quos ut repudiandae. Labore ea ducimus aliquam est tenetur nobis perferendis enim nam.',
                example: 'n7wky5i54gae274nvl6gk9rpqwmecv59r1hgf2n9u3qhnhdtcc11uf8loowarkjzzbgmroznndjv3k21ejyfvk52crlu971vk1c2m9j8yucospf312numdb6wy4gskhoy96zpj1gzxe01lkvwu3vd87bvfk0ptmb',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                
                systemName: 's1rganb9cajn4vfkj63v',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 11:25:47',
                executionMonitoringStartAt: '2020-07-15 03:06:04',
                executionMonitoringEndAt: '2020-07-15 09:30:08',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'g8gosaf5ffzfi8nkuk8i8dv161o52o1x0mh2297v3ncpd36jzf80cz7n1frx2m71vn1luw698pq0vfkqraijfi5xr3ens23rajwufmkp9l0nlebb9iczz8uukou3xlbm1v42mko4ciozykyvf4e8fashsnujcvfx',
                channelComponent: 'd4s6crktm81j9yu7nf369wmnw10eenf87i81dievc40rc3x2ngj3hpssz4iuy3munpzx8qahsm7qdl17g33a8tf7o3ye0jfmov6vc9kgbo11nnp1w8q4bcjjrljw1jp9yo59gdbuowz17lzl640gjm0te6rvtaox',
                channelName: 'p4ucjzxakkofhslek5qfu62084z0cs1xwr89y93ojjknw48kfcg932n2zwjpckre1lwd5b9lstfkugbnhved1wsh77ygvkc13pv13e828l3fvyyprangrf7kqkmx6sh76uo4veu4qh3ha1ywhmhjdcc55801x11t',
                detail: 'Est perspiciatis quae laudantium quo. Atque hic sit magni excepturi. Eos sit alias autem ratione eos quibusdam reiciendis tenetur corporis. Ipsa quaerat facilis. Non commodi optio autem. Suscipit reprehenderit consectetur voluptatum magnam voluptatem cumque voluptas voluptatem.',
                example: 'meraejd9l51z3k576xqyep2p9qak3o7hyjxs4uor2m2hwl6irtiwt6xrs7p0hhuot5nnjvklnlj9vl1jzfcwcv6sogzc2k49lx8ftye10f32x9a9e5ljk47sugcsozaa0ln3hhhjjtyf5xz7v0y9adfwetu4avqg',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: null,
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:20:38',
                executionMonitoringStartAt: '2020-07-15 02:33:20',
                executionMonitoringEndAt: '2020-07-15 16:21:34',
                status: 'STOPPED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: '0wmu6i2ea2h9wc5gvpvhhpx8vkvqpn3t2rrb3tvzyh38qqedm8u6a2m0ghwb3efdepmn2h1jkhbqztyh24nwn3mtcg9i0x60soupm4rnjefkyv5zxhqfk205y75ar1t1k49w6mpdosq23oawd40couoeiua9xpnt',
                channelComponent: 'jiedyv1yosu3gifw20m2ro1aujyqqlgxl90c3n58rf05bccvk99rchrnx39geg433zfkebade1bo4w152yeweom46kgsr39xequoyydxzio16h31bbmigm744ljitbnb6fyup2oss840zepp9eifjn76og11e9ge',
                channelName: 'xpmcvewnvn64o3f5ehju3lxldcjwvuwx8qkeijxtnkbqfffybq1f00t6dpon1gvi495snhngs8jvuh3pg9z9pjwyepf7w98l8957nmxkd5w9dtt8zk35nhujag7jp97e7306zewc2j9n9nb7ylyuv6x55a94z8wg',
                detail: 'Similique totam nam sequi et. Earum et tenetur laborum fugiat modi repudiandae accusantium omnis. Vel et officiis natus iusto ut cum voluptatibus. Molestiae eligendi reprehenderit.',
                example: '1fyxk5ejx63pwjonkxmpg6o2kolrcb6o2pl80q5woz3xfe78bnbk6bnxglkbekxc4h7bngz8hwaipfum2uaiafu4drg1nddx2gv1moztgdhdmxeywg8csn0apiu5ai76ldaehf72gine7n8yqrj50u58m40wh7ii',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 14:04:20',
                executionMonitoringStartAt: '2020-07-15 19:24:46',
                executionMonitoringEndAt: '2020-07-15 07:43:54',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'py3m3dtwla3m9gk0ow82djzknel98oujyqcby7j5v3uq5vvos752eehd2t1ugnn27xrymqozoctwo3dj06wtcnc62agq16cl3wdgi8846jl8kya39vgnm39trds2ebsdrbsdju6zl2l356epc123aasoyfepnszu',
                channelComponent: 'sfvhmwvg9fx891z7todes32048fatfey3i4b1q692pbsia53qb4kwh371n0h3vtnmqvxhm0cav2g81qrvp99o4wbjto57qf4uxw3blq5u9lhym42fswb68hktda119yn7bc10f7rru2wrkalcetly0056dkh906e',
                channelName: '7je11umsxsca41rkbtlztt8q46cl4wlreb99sv1ul51ck155d7oy64j6gjr65oehhhq95bzgh1keynz6lruzj95almfcvhhwd2ouydsh4usnx9pja4lbdtfdu7ffrbgcm240wjv1kxg1y2b9d8ymlx44z8dl6go3',
                detail: 'Assumenda sint ipsam laborum. Et et quae et nihil error dolores praesentium consequuntur. Ut est facere recusandae. Ea voluptatem illo.',
                example: '50nrstdv39nfcuv0iurtv8u22a6f4u6atraap0hkb4n9p4kz1820n1zwk20ha2q4j2jn07zli0oqj63new9tvz3l53ftmr5af1ys5uvvzlaqu1j0pvfujq9k6sz8zh1oowzs9roq84s0d8htw6fpbabu3tsw2yxx',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '52xzza84f8tttfmwe9yz',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 05:23:13',
                executionMonitoringStartAt: '2020-07-15 06:25:59',
                executionMonitoringEndAt: '2020-07-15 02:14:43',
                status: 'UNKNOWN',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'm1rppxeiesuswxymrb5nguhpxm175b7mw3t2l191szs3iqeq2kheridjaj0c0ywe3vlwi4toj861c631dpn4vv6gku7yk5gac4kt3qmqmaifjl9mv3rqtphqerp9ggr9u4duhen2o2askc1ffzmauknqqj2q6pcb',
                channelComponent: '2bzpcbng28nsqwu96ky27hygcq8gpc9wo7cwefrp4tqieaf9b0m2dzmcy4wieg4d64sikn5xcbi3ve2xft1p36sgefv4l55b8p7ni91ee2qy85y4grojrjj4nn1ln4nexu8yk46nd8e7co99xzn9qllvc0bn27uk',
                channelName: 'uuv1pgp3m5ctt9ahiyuxihqiip44n7hbog0rl1917diqck514s110y1fhg143j5cgvcow6ehul1e861dznronss68rj0gy1mfj7w0i1ev2zgc5ptob3w2ez58p1433dy53494bg52qf7d8u9ya66la800e5x3hey',
                detail: 'Ut sed at eligendi quod. Neque exercitationem quis ut enim architecto. Quos quidem nobis quisquam a consequatur rerum. Ipsum facilis non fuga necessitatibus ratione quia. Aspernatur quas velit fugiat sed et accusamus non quo sed.',
                example: 'k5pnu42eafnzoiuvxokch0cme31ud0xfil4mg6oet7qut9teavcsm52rs7c4udknz8pmnu4hi0t7ppf1pg2sr06suxodwgyphbf7bvmkpvkagld9m24zsy7wyhnw12g0tg7j1a24li9gmp33nl81wgyqsayvvo1z',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'vh34a5e0txv1soxixvid',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 01:22:01',
                executionMonitoringStartAt: '2020-07-15 16:00:09',
                executionMonitoringEndAt: '2020-07-15 12:56:33',
                status: 'INACTIVE',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'xtudvs6wsk1wcwp0zx59n0lhewcvbsk1vkd2bqpvzlnvlcl4l9ogtzcltttlixq2lolwbf9mzikrrk49ovfnp372gyfzuqss0a5dh0f0lkliu63hku310qm4l8ug40ax2ne4obdji05qdot5og2cv47znosvyoao',
                channelComponent: 'yn0requnl8bhyuwrngfj1mjn9potbb9z9omyjjtn2cvgiw1p0zokw2g8sv8q7v4swy5qd9k8edb0hxv1mhi153e9brf1uunq5vnde04fwy29ycds69crk85y4b56nb5fozaqfw0fzgez1f0wbfyurvjttabfhsgt',
                channelName: 'panak43zyqzl3xds7ul4vbz5tii676e8r8l9njv5fqiupax7jsp5cp11yyy62e784ru02gu2lff6nte640j3dt6z40s0k0rgnlrr8anpgcogw0nl83r071yuxv5ut3bzdir5qmkui93rktsn3uyeg106loszmyd8',
                detail: 'Quod fugiat et illo quaerat ut labore repudiandae eius tenetur. Soluta quo et facilis quis iusto odit aut. Dolor perferendis neque sit vel sint tempora ut molestias. Tempora ea minima nostrum. Sit ea eaque qui ab nulla deserunt quia alias repudiandae. Voluptas quia earum qui eveniet quis porro ipsum neque voluptatibus.',
                example: 'giyltzyy6xhdyy56lkqqgywnrvk496w7zcnatwb0dyp4a4hor2yzlgihqdq8crvy1od0g2ukvb4upraowphsg06k2qa2qiusd1863uxe25tuxng0856tq2i9ye0l3psi61c461snc53d0tbn82pqc64dbh4ztmyy',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'yc07lump7pqe7pg6cw8a',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: null,
                executionExecutedAt: '2020-07-15 22:17:02',
                executionMonitoringStartAt: '2020-07-15 13:58:08',
                executionMonitoringEndAt: '2020-07-16 00:08:44',
                status: 'UNKNOWN',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'aruc1nurqtasjnt34ihjfva2edsrpds4e9mfhd9zz82xpzmn60eip6fp15iy8g1lkkfeh84fcz927z2i1lrinxdbh95mw8t1o5z1z6uflg3h8l0ol36g864m6x5aieku1nscr3tlfmr0xjz64oush2irgrvc8xgl',
                channelComponent: 'i552a21nwm2l9xjind24y2fswo5uuvbpg97c7zdcvjtu22utbqco4yl7tzu7o1cev447e9ky389pseb5k0ohxpsh3jpjhschmpcznra51jb8rkfm3js3o8cjhsfnofxhk0jd6a918bf8yp3zg0gsn2pq8ik5uc43',
                channelName: 'fnl5aoghlle276mvrofoa8b9gie7p2lhr6ls4xtrvyklhimwgvp1ayub1kk50hf3rivitaoauh18ijanejo8s9rw8vuow8aiu3jl6e2ahw8huavdqq2yiqen97puuyghg0fawunp2mjum2eucfv0sj05pfw32ig5',
                detail: 'Laboriosam ducimus aperiam. Minus voluptatem consectetur molestiae ullam dolores. Provident aperiam adipisci rem ea ullam quis occaecati delectus.',
                example: 'itn8qmrjlyi95enha1cag30ty60ngtw3nxvs2imod2eyppr8v1eyojoktcecgme2g2m5o3it5jtwla4jf6asf1owa344cp52ix48npp578ejum1dua2pm2dqjm2bnts2i8wxiihw835ihc3wobzi7xa6yv9twqy4',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '9944vsmcg5banavfrshu',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                
                executionExecutedAt: '2020-07-15 20:52:08',
                executionMonitoringStartAt: '2020-07-15 09:03:18',
                executionMonitoringEndAt: '2020-07-15 20:49:54',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'dlfzqvydq4n9cqxzol3oai6a10vdnepby4bww5eppt9c01q1a6k9abjt83m7yalug970s1xzwj428dzqzbhcmvturpac8bpg25dz6ovtulsk2flr5912p83x2ly9merobfey5eiui65gxzy81jnpe9jvu1br5ghi',
                channelComponent: 'ss7qeclk4atg5wi0vl6jcsk2nzyqf838805r2w9redys6nn2i5zk8oxsux9xkcmqm7yfspeuedz6m643p8fi8rhrn677qo7mu3yr6m1idqn8avhnsbm8cbfd64fmo5xcwwjcawgp3szh9jj435d9t1meth9noyht',
                channelName: 'jk5yq2okh88ckrg89n09ve2mawoje0k2kt9jqdp6hb24dhrjzad1shgw7bvalbxfa08d5lc31fns1y9ckl0u59qyek8cqfrq633jy70o8z170u7q3u67x17uw035r7xt7ceom5izacyvl6fide2gpv3nrlmsbu3l',
                detail: 'Temporibus officia molestiae voluptatem fugit asperiores et. Aut laboriosam cupiditate necessitatibus alias laudantium id ullam. Vitae similique id.',
                example: 'i45yxzp8a6v6fezo8gona0gakctci6a8rdhwcoolo57rv7hyup7na79hkefeymmdszzeq5aqp5ldhd3q385yr1j6hwu63vozdyzt9r1xov2vz04mnwd57z73zth73a8vhyh0e6vddh7j1zi95f49e5whrctqc29y',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '0s6g50xoo40eg0ntrfy6',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-15 12:42:31',
                executionMonitoringEndAt: '2020-07-15 09:19:52',
                status: 'STOPPED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'toxv3kfw3gs2yd0csm6boin5dwn12wzfhiucnum9cxdekk9tsep3ebmkbo957dsdcocw9237oeigmtm6wmzm169gxmolt3qfy3g4hgz0vs1qrqpphsrb34ossllwt10kkxpt3t4so95e1xdz8mroyzsoo8z6m2f8',
                channelComponent: '7nhw1wqxpvytm0w8bpnl6m1ih5w2ydvd5a9vy43cwx4nj8yht40tkvhcc2o5jb7yk9jod56na7wh0hw0eyx7cyrwyr5yuhuhd5ecj2dvqmejow7o0wqigc4hfoxfeptgtmgbjdp3qujzc1m71n2oytdx6j8o6k5l',
                channelName: 'qzzpsb3jn81gpt54s3f1uptpyrhpvut9h5xx8vg33t3ct95rvtoql1o57fpkg01ycse7g85sybzl2razu07kjom5xxw0wsjynx8bf8rtoxihua34780vflzrf7lzxu0cgvchaytkf20d1ayitve05vxqnmsikf1d',
                detail: 'Eum amet explicabo dolore rerum rerum ut excepturi a. Ipsam blanditiis minima adipisci. Beatae qui officia. Est corporis explicabo sit impedit repellendus nisi maiores omnis ex. Quidem sint dolor reiciendis ducimus.',
                example: 'syn2gru57g278s4sfucw0e8x1959mo8qrywscvlz1oe0ktzk0b49y4itqcp7uchqb4zlthdzh5k8la803sqkcw95d6rz05lit5xoj6annrmt3924n2cj8fisjqecarffzowuaygs5nc8qla3z6q7fx9ydyvd9n7t',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '12dlnhlu95dxz6and2yj',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-15 13:52:01',
                executionMonitoringEndAt: '2020-07-15 06:06:07',
                status: 'SUCCESSFUL',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'n1rer0x9x9dui3an0esaq8b4gg8ejs43g7lbazqukdq7kw8u1p4zo643k88innima9hzgllonpnbtk6tfu2loe13iothcsng0747mht54tuvdp77si9c4u1yqadaxnpek0r2i2zo4zq2ino7iedrmx41evwcn9z8',
                channelComponent: '1z8840vldii6o0nh40db2fczbgpw1hfm1g3aelddgjla43y604e7n6mnoh5ej3p8bd3xwjjmia9gxzdm760lb0b1mb44x4z9021iiufqgbcsc5tp02ebccq0sbxhddtj3mea9ykvhtbb9z50ksrpvloty6uugx8f',
                channelName: 'u4pbqrei34s57e0pgvesxq3xuy2fnpe8j62t7ull9gswyrkiqd7gx95mms99cy1hhfffn5ki9n8c4ajbknvmhpasvoo91kki8vu29zqgfgv8retgg9r7k5bpbio8q1cqk5ua3oz0pqhfure62w4ulczchaur99ir',
                detail: 'Sunt voluptate ut porro harum. Est voluptates possimus mollitia omnis corporis nihil. Temporibus maiores accusamus explicabo illum et est dolore sit rerum.',
                example: 'r839jg0clt9mcrid9tfnbusu6bn7wesbxerbefpwd0zncx3i6sf4ytj5vn4z1rewxat6n9jwzxjzjn9s9jeanfew2tlrsldsxj0f297cpvwfdq3hxam1ql06ivfrs52xs0qyka19od275hsne6c456dc0piqczut',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '3mtv2r4hteaf9k5nmda9',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 09:12:49',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-15 05:59:23',
                status: 'UNKNOWN',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'ixt18w6tw6oat78o62pj5rjewdgzm4wsznxxubd87l2lao17o079nmsd4kft77i72kvmib0uirhqbafo5zfuivr1lag56v1h8sfss95wcdfd6h3m6zwu9rfjsacuibpea925ft7pvjx127h59f9pqyx7qjk7y2fy',
                channelComponent: '67krm09e19g7dhax863f2wwivka2gjb72kb65aboc1izffkqdehbbk2cfsqi8etah4i9dyrulenp1q7cchjv6xd5xaoogbdhsavja3v807i9fnsaenxi2jk08r3vjwhfv38gi0rd8ushdvw2ub763clz718fmh57',
                channelName: 'r5ohdo5f6qa88scpn0oh9uqy1a1snrkqrzc8ixvpy7qr6sp7efooj0ruse79nmbd2uj54tbuv28a57bo97gpr2nuyg6l8vh9y8zv25kc1dqaqh428sb26plgpkfr011jkmntf7124bhgjmzfxkmzvvsl3202msve',
                detail: 'Est est enim omnis quia. Aspernatur in qui velit sit. Voluptates dolores consequuntur. Consequatur eaque et et dolor. Est natus ipsa non consequuntur temporibus labore modi et odio. Dolor aliquid cumque explicabo et.',
                example: 'bh293fctp8yv773070lcs2g1e4fyjvesse79tpmty7ip0wq4n9bc3sdrztd0ydp3pz187me1pddj0a2akmsnvr4ludkz5a5vjhrgq8hr16zsqqsrz6zxrz5aqaj26ka8jrqs1kvi9m9910dakrt2m4qa4eg162j8',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'grcgzontbue4y4xpwoe2',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 19:40:53',
                
                executionMonitoringEndAt: '2020-07-15 17:40:59',
                status: 'ERROR',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: '1xuxvxon9hrjh01c66jdrc05qu22k2lu6etiv1xagjgids0l5ne39jevg5csdz4u7582ti6ugt6ma8p31zzogkxdcoxpvxczyz5kf834d6al3uzqys55994ibmxdrdo7pd1yce756u7z9xlf9y948gvomkpux82k',
                channelComponent: '63olaarbpfpdq8an061yndexcmeyojzt5ksx7fsyi7n03s85nu4xjrq3cg065oz9oraq1ndzbotlrszrspq0v1w87d17bzvqkf0kqcbx7oc2n46y6wl1rve1mk4288huoxy79ymbxxaxg59zbt0g9uu544yfle0n',
                channelName: 'o9tiz0ke64znwnv0kh8yzyltkhpulc756pfzo9x9f60stbqnlhuzsb5kj899pv73yhemvv0tne1sz2piwruju8mpa6scy5y2vx9svg6b1ma2w0sig4katy5vox49dmga4xg2j25i3x4fprjor3n4n4lu5j0esumd',
                detail: 'Ut dolores ipsum. Omnis maxime eius velit est tempore nam quis ducimus. Ullam consectetur placeat non. Sequi consequatur dicta expedita occaecati nostrum.',
                example: '64kr0uoedmfo3z9ruqonc31on38pfd7946nonh1imgkvj69pq7nglwywvxykwsfocau5dvqc09mavrwpxufrp8brjoxfsq1u89kfz7jgeo8eaaz827m9tgoho6597dsvp038f9mlft49j4e5oujq2cjs9fyb0nfl',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '25cggzq6rlsn7hfdv0w4',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 15:38:14',
                executionMonitoringStartAt: '2020-07-15 06:34:37',
                executionMonitoringEndAt: null,
                status: 'INACTIVE',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'miepb8bi4qp2krdymv3x83e8q0qqwhvmu42xjni7pdn2q134wptkj4toprm818ylcpoqy2v9mrnsdg8u7g33v4g8h1prnnqhfy1iwi4wkc0wsrm47eqyczo0gnxfqdkfu1g3a0uyoer2txvu507xw9k44tsn4dop',
                channelComponent: 'u5mi1sjxosv7wf8ie92eex78nd13vushnpflsrlomxhjuonpmjhrbz0whahkrjwke6h7bf4fmkegefiyat2lrceucn7gg3glpgmvlfjay7zr016sl3orwf42p0lcxeeg286jdf13gcqtd8cwaju44zrin1pst3t7',
                channelName: 'caxjy490i899wni8ykp3ontqupvbspbonctjpserohzjfdmoy90vojdrex45yz71fz9g9b1aywlq9gb9p5r4xznbk2xdpham0831xq7cam0oa6dcpy1jpfn6iusc9z68x9q7gze8o36s8qcdgtanybbcjmbzf5jh',
                detail: 'Quis dolor aut quo fugit voluptatum quis laboriosam officia asperiores. Dolor iste reprehenderit consequatur fugiat consequatur delectus deleniti architecto temporibus. Quis sit non omnis optio. Debitis qui placeat iusto est voluptatum magni. Sit omnis adipisci occaecati laudantium ducimus velit et. Qui numquam et voluptatem illo.',
                example: '682b6bongc24q1lxb7fpg4ey5xq05jkcdt0ytol5gbd7367skhxra88r8cug2v5g9yma3k5uw5emdwth5ufs73p3lvvzg9akxgdc234bjgf4o2yq0n6gpm0pkk3racnna8w94ngcnzf3hindfm7wuc98itsdld9f',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '2ha1j68n1rlmsuw0spjm',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 16:32:20',
                executionMonitoringStartAt: '2020-07-15 08:20:59',
                
                status: 'STOPPED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'kvjpl510hsyzfgrimsshnbq8uqgsb2kz9w6bcd2taq0wtxus31176mqntmcgcv2oqz75krwyypv41ngw72w696lqe4q2srhyadjzpmjyxk4w4mtm5w5wpku31xuc2ynt7d9cupi5svcfpjelfw5ocjkrictxmg96',
                channelComponent: 'xn1hu8ky0wrvwff5jaqdfyae9uq280ay1vdviixsk87evg2wtlx8lhxv84dp98zhowshfjnaac7l3suq2m9dul28hzxzb8k7jjh1uqtcipwbzze5m0n7ml3hss7vryl182stput5ejwhoanuqibwlucszqf4u2gq',
                channelName: 'bcwu87l6343pkwmb02sg4jl8o5eussptuicchupx1itos5n5wt8h0b7dgt0ks90hdwciaj4gj50zwk3wqwk12ovf7gjqqbg32tdtp1c8m6xiaged1jmvqseuenj78sytthfhunzwsalqi1t0d9am7hyydbkv9ic3',
                detail: 'Saepe tempore voluptatum corporis consequatur ipsa expedita dolores qui. Explicabo corporis provident consectetur maiores distinctio officia consectetur enim ea. Facere at et ad inventore itaque aspernatur mollitia. Rem quis voluptatem ab et illo aliquid eos culpa doloremque.',
                example: 'gxdvq14qkcac64x105sxs2mxz6jk7h09isl5via1eftpt6p18kz9m59e8cxhrtnilr3q3cnr52t2iri174582pdv7p352urqabg8712a05vhvxvr0t4ofyemdyg7m37ovsdcng8bkg23qngi3h8erq79wqm88ej8',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'sky1ejqgy0k73tuqtkha',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 06:44:24',
                executionMonitoringStartAt: '2020-07-15 21:13:43',
                executionMonitoringEndAt: '2020-07-15 01:33:40',
                status: null,
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'qsnzkh4zhq7oy4cho1sv9vrsxu9m4w1ll68rwox605k03o5abydu4g4nji94eix6d0qg8y88g28sg31y08o2p70w84u9xyhjpgrhqgjzqjch582mombqtop1tkmeib54yfff9pimgupuj2m275c43dqp1f47i3hq',
                channelComponent: 'r9ogbhd0vypsjnbu0qbj5fibmrdnargsjr2iqd7zcahdzzl6sbkjbgjj3hzufa7mn0kmebiec8n0vrgnt28yyon2doq4hfrwunh6ffyeli1g9mxw0rdvdyezefy7q0q1m7mmhbvk14fw5l3xh3j8qx32hnk98x0i',
                channelName: '6h4e0ek443hzn775xern6afaz01nz05i0x3mqad6r8a5tsoevfsxf81ijzgpt3tjn2pmcpj4f3me542ibadg69fbxnedr1ozo7vb06ccucb72hoxbns81ajj4qr4h37akx6ej8i9420hdsadndqjh9zmtvvd4338',
                detail: 'Qui corrupti sit aut natus molestias blanditiis. Sit libero sapiente. Facilis atque expedita ut minus dolores at qui nihil a. Voluptatem amet ducimus consequatur eum et dolor sed accusantium. Commodi dolorum nesciunt voluptatem odio nam perferendis esse.',
                example: 'mf7yp4l81fyhqcl2qtg1bp69bbns6mo6rjzpjlma20a5uy69jyt48pa9c4wvzirlz5r4zw1e182ifkbd57r0n3g6ndgqr8bju8eum5e6oly8pd9zi4w2ve7ojfl6cemqcez24gv6t08xqp3s1vqa5go8zgx8q5xb',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'qn8aslctxuljkisz2rmu',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:45:38',
                executionMonitoringStartAt: '2020-07-15 18:53:30',
                executionMonitoringEndAt: '2020-07-15 21:38:53',
                
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'vy8lpnhik2hrr4m7ipf58st57sgtukqtp3u1uxzu51298phfozsnfzksm5snc6byx8vpmu9jrrgw0mrdc6405r8cio80utifofoqu7zpn080i9v0zizhywdw0av4nle8koi59mairr9yv9gevs70hvr5dy95zir7',
                channelComponent: 'f6l1etphtf7acv5hk6n38z6h5xlfh3jnk3yd6jee3ncy8e78txooavp71bbzzxueu5hhjm1h5yptlwmj2s9gm1aun4kpcl8wcig178tuf8c05ru1z4dmo73ldeck6u3obx7424cisinr6i50hcnm2c4d6f3o47la',
                channelName: 'k301durlmt4xou9ibc7vx314ky4zeuw2ybfv26rz47byny9h1j04u6udcwkjn0j7ov0h52kfbn4gyr8tyepqcstflapyoaxl8lv380ry2d58j9sy38sou32c3znlwkuqhk0b8ah03lqr5703zrg3gqigmum98yw8',
                detail: 'Dolorem porro aliquam sint. Vero repudiandae tempora nihil aliquam sequi. Quia soluta omnis mollitia in quam ut et dolorem. Rem commodi ipsam sed et quo. Error porro rerum nesciunt. Ab tempore et at qui.',
                example: 'cy3y7so529vlhotyjqnx8mgt4kv0q8c6210mupaqourvtdwbctk4u8rier012ny16tsadbl4if5fg9z4ev86vehpn54erpopz6t8x0yryayaz6sbg027luycyxmwqk5q47bob4c8tj1o75n3lgnefhsmchj5lhsi',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'mrjpg8gt10oa31riv7rw',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 07:18:57',
                executionMonitoringStartAt: '2020-07-15 07:41:13',
                executionMonitoringEndAt: '2020-07-15 08:32:44',
                status: 'STOPPED',
                channelId: null,
                channelParty: 'nuij5to7wndcec3lsvl7u2ot84toxg5sy072nmksv80u6c49c2o3l9sydxh6fql1gru3veiycl8mfp8w1cu3qwfuy0sq3fdnm43qp67nmhwhmjh8lrpetidrw8iyjpz3uaw4n4g299sysb11txkqf81hatcyjruq',
                channelComponent: 'c9oio1ot25k0sjdesrfy472hs1h8ogelg215td2u6pth05ixhjkcwngehegc2v68hhny63oxow4zpnnr9xwhctgv08g3i1z1qtqir9hr2r5dpse4gx75w19zwc494sm3krrjkhxyhy1gb9cj6f0hpc03o14a6h4q',
                channelName: 'dxwz5h6ujnevk33gsxnqv5dbojso4p539ghtqrbn4pofkmwrhs30ioa0c8q2uk65witncc3iio532vvzay4jl375e0ydp0x7zaol27363dvnye2ju7bsv0b65rwzlg5z6cxkfz2mys6b0eul53zqjp9z5mysigpb',
                detail: 'Est consequatur qui ut minus. Aperiam dolorum voluptatem et sed autem et voluptates. Autem necessitatibus ducimus et assumenda facere aut. Voluptas molestiae rerum iure distinctio nisi.',
                example: 'uqoab4o1rapzu85vpabpj61ui24y3gka6ygn29ikp2bia2mncftf8ld14si2z6nrdxssupqnpgoq556g0hcsxyh7raj2z48og4oofdf5nelq7rsebtu4jsa6s4mhek5fgxw9llerg91s4ph260lbpa4p8l39nc25',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '4jz44r6wpvc88shkoq2k',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 13:43:51',
                executionMonitoringStartAt: '2020-07-15 08:33:53',
                executionMonitoringEndAt: '2020-07-15 23:19:19',
                status: 'ERROR',
                
                channelParty: 'nt3m5vfcnya3ovawwjkw78e56s9ezhoxepsjtrcfurxsydd90o6cbr7ae4wupsb8klsyhsbr3oygwkcai9tsd8dy7jq1rvc9h2w3gcyop862frp5a5mn2osehhn59o0rpu1bcs9s3mnc6952o8ze1d4zcfnubczv',
                channelComponent: '4ch1y63yayxslbepkg12hb04kliw2h1yxd5hxojriutu5obngvifngnyph73h9pvvvoyk9gt48jatcc216y94p9m7bt8q8m3yoxqvw90ejs9yled9ayssqgb5i8n697ajyixqzlutroc65w95z69buxbked74h6g',
                channelName: 'g8afjk7yac8pnz03zhu8hj9rwek9a1q9ib2qfmh0r83s3zjy1pl9js5g84uo2m9xubanphe8aiyksudmr2gsrmqhu2gyazpe4tljfsri58utvcjs0ro6xwcoswy0zjvbnfs42iz27aii90biay7se0h42qy9r333',
                detail: 'Eos et accusamus doloremque omnis. Sapiente maiores velit expedita et beatae sed aut exercitationem. Praesentium quia quisquam ex magni. Animi iure vel.',
                example: '0urjgna0ljmrm7myja1mdiufp8klip6uuresvfxzc0znnyco2vp20uqgp9r0a63khb451qnn554n8cnh5byoo2c1bybi2hoansb9oswrekx7ecuxgyqg8aja38jbvqmh65by05fryj4py475troh28460xxsx0t9',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'nu4f86gn1ipeoz8hm3hv',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 00:44:56',
                executionMonitoringStartAt: '2020-07-15 23:02:30',
                executionMonitoringEndAt: '2020-07-15 18:05:34',
                status: 'UNKNOWN',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'bciiluk5j49mzzlk2wiwc0ipgusw74bdwe2fbhkht179pilybvoo0qrjb0owxp2615pqh6rahbn6h0ib8g3l2s8rn8fti5rqq0qrglrmi1ytgzhtx9348o8naoauxuft4j5254gakyr2iojvv9mk3mo38s81ymp0',
                channelComponent: null,
                channelName: '0ev0td00yjct9dbd40agx4dpxnfplnjpjn93jz8pu92fpqb3uxdu5afml3qlso2zlpsh3ag3egjajy01nx9bnt0wujuduik0zbkle6uzi6gjjy5ztv0sj77r9ie6g7ktlhzbi1jfa31uk6gil5ke4da5qmwqf6je',
                detail: 'Ducimus culpa voluptas omnis eligendi minima quae. Maxime repellat voluptatum enim harum similique et sunt inventore. Deleniti iste est blanditiis officia ratione. Ab consequatur sequi qui officiis libero saepe sunt nostrum.',
                example: '0n018vvb9sshgv4slwwzh4curfr525tkqkhv2j903rwarosxgbn0rutvqwcpw1v087nr50gb9jnfsat8o5ra887bp0y3bsznnlv08lxu3glifh0j5tme1yu7uafiucuqbimeyoqf94wgqeilrjg42oot7ezvwwh4',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'spb7hjlrtbudt625cegx',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:44:34',
                executionMonitoringStartAt: '2020-07-15 04:14:16',
                executionMonitoringEndAt: '2020-07-15 18:39:41',
                status: 'SUCCESSFUL',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'nmec80pbhy8bengldqipfuypnfaqdzrujd4n1jbo6jpiwzlv5hbocz0jbeifj0igs7xy0484a43ll73dt74bmd3xwe5ck1o1oyayiv32yft5l8l8244dm73a3mnmcx3j48eel5dk468kjnj4sg68hmb0sao8vfy1',
                
                channelName: '61hbxamby1zk8bbqq4a0a9t8fvsg5e2aedpwyzchrah6rq5f19ezo8f4aslvdgqg39m3t9rset573l0cdka29ypkpc2zea4d8xgkm6ywbgqcx4sfszr403yjc1aw1bub1vej9pho9ybuizx238ujhj9643a0xxjs',
                detail: 'Dolorum ducimus dolorum excepturi aperiam illo facere quibusdam debitis quia. Eveniet sed laboriosam voluptatem ex sit corporis velit aut deserunt. Sed magni ad qui sint non sunt molestiae.',
                example: 'q56js8c43ci0sqj4nrats6u1e21y1b7wnqd1eznzau8zvwueqeoqqjf9b77ph1gzrtuin5d3dpx43uc451gttc1wd5bn0jyvrg1komvpzn1wj9pqoozdbwm5tta6omq7reuhlg536on69mnh7jhemtq0iamh0w3h',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '8f0ihfkej8ltrtl2zebw',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 02:51:37',
                executionMonitoringStartAt: '2020-07-15 00:24:04',
                executionMonitoringEndAt: '2020-07-15 06:56:14',
                status: 'STOPPED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'k81d0pl4bdd1y9c9z47dy0qwdgsgo76hfb2yo14ouy8kdln0fed3cvf2zae7t7ys1ppxq2kfhs3np4pphury7zi3ek2emyuzc7hmgxhhxsm1hm4gakby7hnrftlncw8zqjsm3c92p7bm8ja6trn2h55a5bpbywse',
                channelComponent: 'pyj1dhs3tykgjlvhsuhzir9c92cjwv8xuehjrh0mtmcpzjuciaklk5qmi53cztm1ql97hyfv48zzip4vunydgtzssoyv6ll314t5tva30fcass5545wnoefzlpovahalpk8iju58agxngf263voa6lnb0ksi0x4n',
                channelName: null,
                detail: 'Aut et voluptatibus ipsam alias. Architecto iure delectus perferendis debitis labore et ut ducimus totam. Excepturi repellat modi et sequi vel iure facilis asperiores.',
                example: 'oot1c87nkfogwb1o1jaw22kme9qmo9y5vuvy1ytgtun4i8k6x2vmjvt9cqv7gl1n75tq267q3t5uexf1yum7xnsqu86nh5txj2vzbhespih6d94od9rm45q9wu43gygc1cnsedklxsgeeqsp4ozh3fl8ryadurbl',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '2t5cct98fupj1xjxf2jf',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 00:41:17',
                executionMonitoringStartAt: '2020-07-15 19:27:11',
                executionMonitoringEndAt: '2020-07-15 09:58:33',
                status: 'ERROR',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'purbu3ammiyk4gxa8m32j2ikl3typxgqlpp337kafycbls5v9y9u2gi70b06ydqkkcow8mky2rahgcm0novztdjhfp04zugd2zoiaev6ikqrfwjlk897csosc51zhrwbu3c8e93dapnsun4um9hhex5pm3zrgsyt',
                channelComponent: 'r6mxk561b7lbt3r1ist5epj2cmrfpyuvgrlvgllzzbg26l2kux0si683goasmft8py41ohnpx7gxs8q2bqh8iyiet8m28csebs7q8dud4xgysth7k06rvlo1aek0e54lf5ymnl8n0ljc4nr1lofyguig72y274k8',
                
                detail: 'Et rem inventore earum. Molestiae consequuntur expedita et quisquam mollitia. Tenetur quo expedita ut et error sit. Ut maxime vel dolor qui omnis. Maxime quod veritatis.',
                example: 'ekmxbnfjzdfi1ytvp9i5sme374zjpi289xdf7j6e4p27mwmbvmtz6ygt0i24v43e87l3a5jpefb677q0xcepf2b0d70kkg0msfusn3in0qlc3n6cl073k5vejqsyhdo675sgu8ahhlfdikjq0yb44zcwpc8i2gfj',
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
                id: 'v6lx9fsfrcz006y3vqr1qu3iby1c401jwoosm',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '39mihtkh46n7kz6vkws2',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 20:13:37',
                executionMonitoringStartAt: '2020-07-15 07:19:09',
                executionMonitoringEndAt: '2020-07-15 17:05:52',
                status: 'SUCCESSFUL',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'btexqpf4k60izoerju1gy5r0evdwachx9ll2eefow7eub00wmwjzcmuqpt9h57eeey7cpwx5oeg2ebtd6v27w30y5y1q4mmuje5p47oaxn72f4ft1ybd28iup2nwu8fpql9fwxijyr53niauitopbqp72yx6uflk',
                channelComponent: '2rzuxdbtk15ql1pykondh7wkv9kkn09p2dlbs197snmpgq5lcsu6t8buutma8vtk2epky3g3oxmax0mqe7x06hskkhg8se9sz9tmisj18zc7ysj20i5js7fi0dgickve5jlsd1tmpd13e5dy70mbfvemynes7cum',
                channelName: 'rcx0kawird4mtdnzww7x2d3q4eqhqzkal6kea7vbjbivovfhasehvrj9fa0k88j4yde9amlnsalzcsoxn7jvlr87wntyqrpynhw77j4pibd46j9srxyscfyq6zlkzw1vpqqmqhslkxb371xloxca399ypwlqo3vb',
                detail: 'Numquam recusandae qui beatae est dolores similique et. Sit dolore sed ullam ratione. Corrupti rerum beatae. Quisquam sed deleniti nemo nesciunt officiis ad id quibusdam. Error quia quia illo sed eum.',
                example: 'b1r3zulmmlwfxs3t7drci2vb8qp4ujjyi2d0m2wttcb069sxjvkzga3ladiwit2yg9zgtio27xko6h3mv8pvul0j9mcu5ej2n7t7nc5zxxwa73bym5blgxfrz08wqrl198hkfkvamc1oennyvtoo2c1scyb1zr84',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'd6ul0gdkk6y2oy68cxm865ap720a242cmmzdl',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'nrc6iwbaniildof4dj8j',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 14:44:02',
                executionMonitoringStartAt: '2020-07-15 02:50:44',
                executionMonitoringEndAt: '2020-07-15 09:10:04',
                status: 'INACTIVE',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'nyg3zyw8m0pdwjpxk3ijhnyg5ecnanz3wazlgvpqv379yz12tlo9bsfpl2o9ez2jqj6yzlaog8vgakhf65feuy4h9n0jv6i40cx1na2q18r8weve03258txkvylvye9rwddojljrlne0qzz2gro2k2d4yrztzoav',
                channelComponent: 'x8lb8ymjdsvrocyxac5rzxfk54pifvz6ep9td4k3l1q0q20530zyb1trjczojegks3fa0vxjhpbfr2xlldc8jak6fykk2syn8l4zlzdc9a04386qqmtv03fqof7kqiwcum95fyq5muyu221fi5j5fdcbqaj5atbr',
                channelName: 'avr0zjsp88em6d6dggws0o7q81m3zpmrkdfhomimtb0rlc2e7amptfto3t3l56577k3ntffg3caj1ipslb3aujtac0ezw3czog665sofbji3x65cd7em2jkoh4j9026rls0f0ww474cfwxol4i8o9tau5cy4thhg',
                detail: 'Ut ipsum quia repudiandae. Quia iusto et. Molestias molestiae adipisci explicabo vel. Incidunt molestiae non corrupti aut rem est rem fugit. Est iusto eius assumenda tempore ad rerum consequuntur non. Facilis veritatis neque veritatis reprehenderit.',
                example: 'tmlvpg5m4k5nbbiaupa63vswhhjews2yybinl8gyul93qnshc3hfui3eo706j9qbi7u4vx85f0v8if49fsg6j5d9nd5dy6jaey63zd2heyjghtz0a3gtoaxkpp7e6xz4jsktfjmkmq49en2fvfn36rzz89znui12',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: 'eubgvs6pqaa9zque79g8tjnainybdrxio2qcq',
                systemName: 'vhdgl9jwews5pb6re5un',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 17:51:30',
                executionMonitoringStartAt: '2020-07-15 04:40:57',
                executionMonitoringEndAt: '2020-07-15 04:40:30',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'a6p4zao09zlsk2p9j3wrctxhg43si73f79rhs2jeczrgkirwwqydlbhcwrs05q7ngg1hyju8593gr7cq41b3jdyyk6yuk7dq6fpzn7demhi7i02yqc54unzcmadqqgy2tbkhj0piw4wqx62t7ee65h8ge9fic790',
                channelComponent: 'jnpnvociwaapozaz333bv1cjxndkstlk8mflp69879udp1cm2dbs9hvzs74nu1a549679wxws6jfsrpthsctw2vvadxqm06gztk8d14sk0m101ddedr93cbmt55hh6vwnu93z1spiht8bnbefg1t4mjrx7rb2vww',
                channelName: 'jmhhazzx1i1mf5tf3t4tysirxukast6i015acxfyteqp8hvlfrw3eh5l5vglgiavvnbkh1gu5z3hy41xvn2fg91kg82ltimjkn9hwa52xl1geg0isravza9b3elig1yfjnq3frsgk6xa9ux7eg1jv2ta9gb3vrzv',
                detail: 'Minus molestiae tenetur atque culpa porro. Reiciendis quo dolore. Repudiandae qui exercitationem qui qui culpa. Dolorem rerum eius. Ut aliquam iste reiciendis. Animi aspernatur dolor sapiente error reprehenderit.',
                example: 'zbfh0o2s2eld3f7z5iafuful2kp0g93xrlvbtul16aylvvxmgpkwhf6rwgm4cy4m93dhuy6sgrfjcbwbiz7x6zz7xh4akppk1fg4yc7bxc6izntcrufo8h2t50fer4g1kmuqoz8eaj28biffmw8ldp1tvkfmpc9t',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'nknxzfbvl7v0imwmuxow',
                executionId: 'beuresizg4rbvypyi9zan370bn4wjinvpamku',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 22:25:15',
                executionMonitoringStartAt: '2020-07-15 14:03:07',
                executionMonitoringEndAt: '2020-07-15 06:42:48',
                status: 'INACTIVE',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'ai0zbkffm3tlhpy7pf6kfoe07hxp6h1cjnrv47jdn9o36vll39g1m6fledt49bea3vr9rf15cj2hawbbg86v12zuj5eygjbxao4arkbj6l20omjeoou7q73e1wwsbqu4ufhluvsjktnyaefm97zsb2w37jmze46h',
                channelComponent: 'zypf1uccqldp5w96517ej96pqw0zhi3tqp78v4ngehwqhq27u01ke1y6e8423sx7eg7533tk9xm7vxwj5t5kiengzdz1yz6we01npguunzonlqeqbko0ozkx3ld11eikjw3a3kesxls7giouldkbxhggjqj93buy',
                channelName: 'gk10up8g5vbh6u6uw8wwwcbebjznjk8uu2jg0kutqgk7qq1zfse9rpxjjpmffwyzgrox1irhis5db46kou0wa2coqq1mdor08g4bwy7wa7h31ai9ngrn06cxuc72fj5sdg736n5n1tsd6mv6ie8mym5nx68ia729',
                detail: 'Quibusdam debitis ut est sed sequi nulla. Quia quam dicta non quo consectetur tempora nihil sint consequatur. Labore beatae nisi aut. Molestias numquam dolorem esse dolores omnis animi eum. Quidem omnis quo ullam. Ut est quo sunt possimus illum error quasi et laboriosam.',
                example: 'lpzrlwgubxc3yjf4ok055u62twyucnasosj7i4o3us7juf1xqljqyug3bma2z0cyh7lbubaq6smzeb8ls038u9vj0smzlkq6ek6tc78aqaclwhlbsju3ngylurnglnhg93cbn1q33hzhhdhhve4qev30xhnpya1l',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '1alk9zg9thkua86fmw57',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 06:22:56',
                executionMonitoringStartAt: '2020-07-15 12:04:17',
                executionMonitoringEndAt: '2020-07-15 10:45:57',
                status: 'INACTIVE',
                channelId: '7j2b3ovty4gel8o3349hl7whfydu025hkpq4z',
                channelParty: '4mazuoj54kz4ksjzi4lyv9l77b7yk4u6x9zk8zzc0bdq30eitw5ktkiv29fd81hiy1em2gc9ugedkhlg1x9zrx1jgth1dv79o5gz1eg73wcrse5xb6x7m02oon1nq7dyqvhn124ley6eomienxec9sxskx8rxcfz',
                channelComponent: 'orr20rh0wg0xzh2anoesk1oyfwuij9190yf1nxnz1heyvmnabuuj65e2d9ab3d91qpuka5abpysbuxvlexezrq58y9xv8kqvh0smtqew3eqhsvomobvlt3tjcf9ikgt2dga0mofwdgd4oucf9rboi4xo5ndv8kze',
                channelName: 'fm6z87hay5m42qhxfel111tahere387rl8yduw2tbjgczfvkqvlcebbcuo3etx7vasxdf7r0qr8p7yvmshq5iuh7b67bcvi0wslg3mgdnpc4gsf7obcmorhn8osvhga6ea24vtutzwwovri9mrl3m752ya9ffvcs',
                detail: 'Dolor sequi ut occaecati ullam dolores et praesentium soluta eveniet. Aut ea hic corrupti repellendus. Voluptates minima optio enim delectus alias dolor et aliquam. Fugiat nulla quae modi. Enim ut sequi ut soluta quae voluptas voluptas vel.',
                example: 'z279i9xuk86f4imo3th8je1jnmdx36i5cw056z57gqq9ux240879adf3ptm16mww2twpja5mogwh1guju262ah2avwcwy0ji8b2e1bj2j0xdc1ykjz2e1b8qqsn1b8slx51n10wdrwzlfioyqahudylbcre4hoh7',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '0q4ze75yowfa6l2nq4r4e',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 05:20:31',
                executionMonitoringStartAt: '2020-07-15 13:05:34',
                executionMonitoringEndAt: '2020-07-15 14:57:22',
                status: 'UNKNOWN',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'isaxk7z4g8sisl78ras3s9uooqotcslngizybgq807lb4bbnoo0ox6scbpsw8kirtcixndwna0u1r4by46m8oic8avj6wmy4bajup8e8phpi37p522nw8esnv4gyynelfmv7au1bavxjfarax3oqbtr1bd0uaph5',
                channelComponent: 'f5o6rzts8w6atsfjfdqhojy2r6hsth77zllddnomu5blgkzj0jtdyz6umpf4hledfxq1wxtkzyl9j03kybkdavbq8tzrn0twq559s0dg9z8hk6k92qq1mmofi34ljyo5wk9kr3niknx1ua4wz45iprx582vyddxb',
                channelName: 'gxiii8u3rfne5uzn3gw955vwnkw722t5akf9s3mcbecdy2ymc64vyzwv1qzlyoksrzde8cbsgulxg3wpnn6dtupf8b9kbo7qae3sukkby1b5vhfq3s7bnojcbnbsak9alsecz2abv48p6j1xnmbcpxdjazgmog3s',
                detail: 'Quod iste est est ut. Molestiae autem blanditiis et. Harum similique beatae ut praesentium nihil corrupti amet non omnis. Non rerum vero est dolores dolor quod dolore dolorem.',
                example: 'zr42tkyeqrb2p41i20kmz7qtt1kgx0owpwwflet1zc0a41bnbnoq9dpwyian1hrtvau7avd7r878nbq5xewzpx3uoz9oc5u43dfuzpq5e5dofeiztaqqwb3cwes6i2mla1onxr50heutu5eqsav6j20npw151x22',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'fi91zqq48jv8px3jocgv',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 03:32:51',
                executionMonitoringStartAt: '2020-07-15 03:48:25',
                executionMonitoringEndAt: '2020-07-15 07:09:00',
                status: 'SUCCESSFUL',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'dpgq7yqda5ccjmzcarvgji0g9noduensam1wgt258buvsps5k7imbjyg6k60w7y0z04pfehxp5thneje8oa6cntecpwopo3yqidefzj6yu5puufzvn5v1yb4inlmpnc3jqco260kksart4m6qjun5rnuoatkei5yn',
                channelComponent: '0utvbdbc0dr6iavusiwv9tlpcv0woz1sm0fswwngujk9rid5wwuornk9smz97312jzqy0pdd0vf0khg11yvdo7tjj1brfw3idppxssl5ikzyg702i6d8cxbdu8gjfuwalqv3b2aqm6ern15va99crrln2fx1hu90',
                channelName: 'ym3gniqhrm3kfnnsp8xn4divdbmnbofyrou5x0dytdpakbp7crt96kb8h6h96loop01f2kc5o5b3jfwylipg4wo089lbgvcrrfwge63638vv8ngjsnrskkkzxhc6e339fqdsa1fvi46z2o6f7vantcps8ii4eudi',
                detail: 'Amet reiciendis enim. Esse fugiat qui dolorem perferendis. Corporis ipsa nesciunt unde est et qui ut voluptate dicta. Et est ipsa adipisci commodi cum dicta consequatur dolorum. Molestias quidem voluptates non.',
                example: '2alahejo3mfgu6915pjxdil8ar96hzrc6a5183qzxug1j9stz2lzjowlrqu5lhq7p5sl8xs7h0mk6mkjeo0sua45uqthev0jerxb56ikbd19xw65rdjrwg3oz78cewsltn2zo2ego13d7wqvndws3hz00hujdrbq',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'rzfscdj8400t5l26fok0',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 22:13:51',
                executionMonitoringStartAt: '2020-07-15 20:20:01',
                executionMonitoringEndAt: '2020-07-15 03:19:01',
                status: 'STOPPED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'r6cy7uuwmr0t5z8e9sih979u148n84xtjtdq7kk2ntoq3gwvjzp7gw9ve2ew1be2f1ynq212lo146z1di9bdlc0sbiaa4zoruvxtdwj2p1wf4klwtgj0cgguwp1r4s25uvrde2jx6v0lr78egtytte23fh1llwdq',
                channelComponent: 'e4jyxmxulj8tlwdbf1b8zdsfns3sezgqtog1xngbkwtnbt5mm8mhvyz5kbrxt3om9buc0vpxqqrs9dvvovt1lmeg4qixsifc1t7uzgo2j7opqx3cde4jqria4cxvlx3hkcwuqmj8hd87vot4c4k33pvgqu8y9o3f1',
                channelName: 'gbra4o6fu0veztqfu6qcbdrka4ymkf1jgdpeke3i48h7r8v83q7m1teipaniqr4c6nrm0gsijuf4wp9gkx9meciqr4sqks1gc0etejlay7y98zvygq0mo6dd3x765u12af3kj6gmeggijjwhcstnc8okrk7zjpak',
                detail: 'Id magnam aut qui sunt aut sint ullam iusto repellendus. Repellat eum quia ratione asperiores cupiditate nemo quo. Expedita et quia sunt reiciendis ut eos inventore. Distinctio ea quae. Odit eos et adipisci tenetur necessitatibus praesentium. Nihil qui sed voluptatibus doloribus eum sit facere odit.',
                example: '2ko2xnf52n5klr6jksfg8j0crwna3qcly4qnf4fjzjw0djhrvhaxelcpjdwkuoq735bgrn0nnkpnosw354x9h4v0xjh74b6ozqzmzl3ir0rqk5cmu53ziyjjdv0l7k2hnijsn4granfump8brjnro5sl2x4katgg',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'fvzlp8fjrkcmhxslqtpo',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 22:50:02',
                executionMonitoringStartAt: '2020-07-15 18:27:40',
                executionMonitoringEndAt: '2020-07-15 17:39:18',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'vxar48micp2likhbbmgsszxmhnnpv93zvc3wfytqkt3k17kadhlvi74o7r3vdv8nzu8gykzxqmffdunhob7tfkhwge6qvyyb3l72mnj1s814gncgwh3xuwum7e2fy6mt3a4hk2p9p0uhiyl81l0xci47bsdqim7x',
                channelComponent: 'jljd2exxntqtjs51o791p592uwj5z082uby56bgp199lxrj8jkq214ifus5zvrhg2uzg7nh0avyfny7qz1c3yl8bg58xiticlndw0d2y6ccib41k7vjzat9utot3jn93bdfljofdcguf5btj2ulzzpcnmn842487',
                channelName: 'h1u3kf9j801vbk9i1er7ktlz7xl0lrxbykmahn97ffjf9evc55cpunat22rdyigkly0su2usve2xgzf5jxyaub4vu5votfp1j7wtj6ubcw6721gzpa7qdu53wh4l7hvt8rtpu0q5k37kw7jwa5xr0zo1gq5fiioie',
                detail: 'Quod et corporis ratione aut et nesciunt. Aliquid a odio beatae. Natus et quis natus a.',
                example: '7x802aletn7oo0amzh2uulqd7srozs0czd9p8l0ifj334fo9aurs9bprvbgxe0wy6eqcdwr47vmldzahsn3nvyqafpkhlb429fqnhregx3csvgkykxoj7m893cwhms1i754iw1ylylvbpombgr3hjy5ahtd9pgae',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '5b3w44e9mq2k5akzbdua',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 17:58:39',
                executionMonitoringStartAt: '2020-07-15 21:29:08',
                executionMonitoringEndAt: '2020-07-15 19:07:34',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'ey7zl8n1fpqrsmuewjxpzpfsdtl1nspus4hud01q4ecomymjol3c5d8l8pt8jzcr83py8j30vk88seo66rejzxx1lrwk22qj9sph7jpmnw9hnuj5bw6jiovj0p4icgnvyvmcd812t086hkjmxcoyelvt9jlr5h0i',
                channelComponent: '22fa7ua8zyh24revm1y9276tgurmnwfj1a9frodgoniq0f8a8szstswlc6v45g774vbisnqqhyd8do4c2uf93kx5vf3tu6fvgw6c6t8ot0bbkx5lwfvp9ss7dg7dpvevpuj53nouy53vs712et0sxb1x5fbayhv1',
                channelName: 'xq6f2x6wiwps8gd0ntgb0dqrkrdrxxczxqbhjrjviwzxsloeofbjbiaby917qbbud2ji50z21yn2xfejpi3v9henqh9igcd49ptmoj6j5be4j81fy2k5mpuk3kig2cdb3rfk5wz8rxfixyavd0hhsppzorz60564',
                detail: 'Quas dolorum dolorum nihil minus voluptatibus temporibus. Ea mollitia vel aperiam saepe aspernatur assumenda et. Quia expedita temporibus quis officia animi.',
                example: 'ife727fsbrg7t7vkjz9go0el06gftry6q570cozzciahs61ijxlc91foubg757g6n1jglzg3e62l34utcybhm1kiwh5ann6aq7mlrg7chvr6qvj1yhhndj577xei37d6bp3era2241f6u4usqy1rm6bjdvc1gafzj',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: '07syme51zvhccjfhzvjy',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-15 15:56:46',
                executionMonitoringStartAt: '2020-07-15 03:44:19',
                executionMonitoringEndAt: '2020-07-15 01:34:04',
                status: 'UNKNOWN',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'gf1wtywrorq7mdupsefkk9wpxwb9ajm0j1itac4puete0aab8ebv6s2mwse7oxawj21nz1dxcfvq51doa1wlqio3yfxqq8u6h9dfdlutzelaeztm8t8tjh5fcdkr5pb3jzjqsdncsvfxcxyl1r86fk41wsye65y8',
                channelComponent: '4qbh8hk30zy7jv6hjjetv2w1qzyjdkb9ntdj48wwkvksnrqfl23l5j4l6kntcdti1shf95mw3mjirt30z4c7vqpj2ttafflp1ts5v16y1k7zbfhypo0g4jb3m8wjmk03vfl5m9n8cw1nx5r6u36whn975hmxswmx',
                channelName: 'nwawbxi2ufsq8jj1x23kt2u0rwbbrh196yay57r7i1989cuxtryqsnitouyqb21i4te1wy3x2vdbsd3f48qescnl9ytqhri3rllmbn85b2octg0d5esurknaohqqqbyiesqeesjtpgs716vwypdio2lq0z1tbhtz',
                detail: 'Quasi molestiae ratione enim deleniti possimus. Et facere vero et blanditiis corrupti. Molestiae qui hic.',
                example: 'lb35l3h37tuytppfflbgpndf4m14hth4gr96bos4kgzges7c9inkepynjpucsy5pf3ka79blixzt27jg0ke9krmwrm93yaw665ef30q8d4idc000vb32tya96t7pagl64rcj0f8rbxi2yr4402sctuzz99wfbtru',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'k7uvannb7vvbmqqlh8h5',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 15:30:07',
                executionMonitoringStartAt: '2020-07-15 20:35:31',
                executionMonitoringEndAt: '2020-07-15 00:49:45',
                status: 'XXXX',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'hjvksipmg9heiomldwtnomsq87nzqp737oy315hl16tyxv724ijrdrncvsan5cr8uqwur69mv807qf8ccfyhgha716hqf4lftzjx1cf3vwb3fwbpq29tqgctjwuvm4f1r0tv8e2iqww9ggqyk6pw7ver93mrozmc',
                channelComponent: '6or7y0suev7ez35v147v8y1zif7zky1ugywb8976n3yk9j2s2jx8eqrpg569b1a53o07n7eccggor0e69hviqwhq9u18w21rtcixirx1tl85vxflppd1c0ocue30ancgawdtfgfe9d0ontsch5ciw5bd85thj9wg',
                channelName: 'vt49bzxnkkuguoitq3f5pxplpekj2bjqzjk6id5isdts9ndd6anel2bw3wapwrvxkwqnedv4xugji6yghu45xwa32pw4vw5vqo1yb4qpq1qypjyp4iejwnuvsmjak7sogm9qpmkwm20pmo83yf92qj0ri5ud6zoe',
                detail: 'Quis accusamus accusantium doloribus ut eaque et. Voluptatem saepe architecto eos laudantium autem nostrum officiis. Aliquam dolorem ipsam. Accusamus ea eos et occaecati id unde alias autem animi.',
                example: 'lrpmabu57ct9fc3s378eovsm0g28sxgz55jsxjabfz25lo11njzb9ofz1m1wul59ap0yt15z7f4bz7yb81mat31thakdwotoj4jddirmhvyfjk0eg4si3bk72mavqdbcqfw973za2o8g9ilyyu7gfzw2yf5yro14',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'zheqy0tit50c9eqong39',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-15 21:30:31',
                executionMonitoringEndAt: '2020-07-15 02:27:57',
                status: 'ERROR',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: '7nae84phjdlg6shjlnma69dzfg1oe55gobwvbk1m0pxz7swdhbhoxalg0trg53ln0kz9frav7kf8vwc8v7j6mb7m9bqrz94tqayx1ekwtdupgfk1d96vww048e58pcsau72a06yjzhc8dz57tttf4eezw5t8oodl',
                channelComponent: '1eg0su1zpsz9udfah7yizdycglf75g3iqfhvp22gzucqrnrx646gwjlbitpm2gsraeq3xpwbu068kul1edt4hqcvabaku03h0dpm0sp0jvn9m68engptcjxadlw8drdrp9z3i7e1pesq4lkkpk58o28pj3tit074',
                channelName: '0685fa2vnbzvrfshzds979dqkchao45vz3bd96fd9bw3rxrz8cfgxjxi64ojuz40mv8x4qw86gczozkc2tbsy9vdfbjvzklqmxgwtbgxllamg5a14vc4oiquh3eb6xr3qqji0bto67x35lz96hbne5byivv89khk',
                detail: 'Occaecati libero pariatur consequuntur. Voluptate quas perspiciatis exercitationem ea. Nihil illum odio sunt non impedit ad facilis assumenda dolorum. Nihil rerum eos qui pariatur omnis et sint ut unde. Rem velit voluptates repudiandae tenetur ut.',
                example: 'jl96o7k0y9f58h6qgz1a4w90uk3lu30hh6cpdmwpkbfhe4i33wdigmeo6j3u4gr02rypod485rlsblvomkew9z9vi7190a24iu27ls1eoqlj24p64a4gsl4uzlswrefqw1n7wao9sktpsbm5yikzy6cuiym1moym',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'vhvj2f31q0fkyrn626z4',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 02:34:13',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-15 18:28:17',
                status: 'SUCCESSFUL',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'az8e03ggyggh26fvir0w0z7mr7144kqtqibug2g23xlmm5cii2oxuc3j3m23vbkhfkt0545q5qy64xh7dzhqd3qylp8r8y2qdggfprpcrh9xn1uw9kyb1djm2hbtxqambjmatosfc40wl9s0e53h9zhuekwur6m9',
                channelComponent: 'i0nvraimhpzd6micu1nqzvc11kdjrn4ip9ecidwof5h03eppsct6y53jtrr92nmtikbs54eo4p188g8rhgftotswej6v4zkrytrlg3xa7l0fcsymakcgx5y3xm6ovan1se8djzibyyr1qowdf9cyhsi8mpjj4nen',
                channelName: 'x8fel0c87zwq1hf0akbuckxgrbr88hsmbs8grv26yzhdy5r7l6qqpkr59sacldjp5wdrhouff5w8yyn7bksj7k6egkxr8jbwdv53m8thr06ki0blku2uqtz9pgo95afdn4kzpt8rjhngruumqoknvv76zgx1rcib',
                detail: 'Perferendis dolore et sequi. Nam eius ut similique omnis. Expedita optio debitis corrupti id. Dolorem ea sed est et nam unde ut officiis omnis.',
                example: '5pl9nkm4mc2xbgq99tzzn1hh4tn4e1gunbsywdi83gwv8nifsgp6uh5dx8x3dfx6cdt9dpvhqakuv38zd8t04nxcvbbgpynmbgzn1bv598w6354o9r3gknnm0qn23a8mqpwv6u0vkku15pvj1klae10zv7y3hi5z',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'ivgbt1kfp12jybhphbtf',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 17:12:09',
                executionMonitoringStartAt: '2020-07-15 06:38:45',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: '03rts74j9j98c1yuacn8uow6vsp7kxbwx3fnadftjz40m6giamiqymrkop3sd7xt22yi7m27wj9t4mmvpg25nnjggep1twtu5o82ja8bfwoy3naqb6eag66lhdnt6flb4y5eorgqv99dr2bfaxh2t27sl2138k4b',
                channelComponent: 'w6s1hai92fx3eih8mwhdg1bh5cke1lo60boufgidi6jzqghu5qr38tgwfiwepn9w0thy520496xz1omjo5tgd3ns0mc97x0jewrnwr9rlx2len4g2avrt5y351uy3ci743uvdz2sas3ng6svjspfo1817k32h7np',
                channelName: 'rlsfbngyzv70sw4jz0dewlrfoy8rikxux699yi4bprfj0vq81zlk37bemk1lbw1clk6v681f24jrepmj9e1i8wnzagi7a3581c7yprtd87gshrftmqt4dq43k9kcsfywf9ggblg4vgen7t4cyv2ccyvp37gfy6kn',
                detail: 'Inventore quia cupiditate laborum. Atque nam et provident expedita dolores modi qui eum vero. Cupiditate earum distinctio expedita hic.',
                example: 'bje4jinpxqq5ykhtfn6x6wmhwr97vtrzx7h5r4tb34ucp983inl8cvvjlf4bdi3jiwuz1d60v9tdgtb65nl3ieo37cfbiv3bxi3rwvj87shou5d47l2ft3mo0m3ulfautnhsdd4h3hqs1hlsrsp94grti1m2kqes',
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
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'cm2ltaq639xkedpfv293',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 09:40:16',
                executionMonitoringStartAt: '2020-07-15 17:51:02',
                executionMonitoringEndAt: '2020-07-15 06:56:43',
                status: 'INACTIVE',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: 'xo715abw2epxydlcs2hyxxxhvxw9d3j79qaeek0jb0c2lewbsivadnyp1zhz3725vqwo2gwxh2nwtljho3xb5bmwnqvfz7f6sy1vz9lztmqqomh6mxqecd50gs7xu6d2esw9lczs1vcapmow0dmgnywwg3z0511d',
                channelComponent: 'u77zf1bqtgawz0jgrv944ndypxd110oscfxrl0vmbqbb2ztjv7d4g7nwl73vq1sa00dbxyt5yw2xibpwkeyzuyl9cxzbctkz4m84y4ux36c6vurrew3b0na94elfa37z3i4wp10ckfz1dxob0yn9vayslmlg4e37',
                channelName: 'z2yi6g0i22yv6kesgsraypyxdnxslb63755zvnyes0qqlo33ezqvu2quxrskginnzkd4sp7xbn4af2raxoi64uqgc8jqf3c9kg5stes5cr3nwybad4za6hl1ketwtoc8ers21o5wg9plvsfumuc93ibyhfyhhkj9',
                detail: 'Tempora voluptas non et doloribus. Vel dolores temporibus doloribus. Et in sed eos officia.',
                example: 'ih839b3sb0mm0c369870x92f29navandvw2b61v8wfazbscr7y7x3wet1j2glsxs94n3vkup7zckbq1x4c8twsave2r1ui1lymkxsgzlb2jc4wyv5k4lwo8iqz4euy81ikj9h8m9zw0pt2211enw2ouhmwk8t9zi',
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
                        value   : '35c7033a-a9f1-4378-b2f6-31ac10190849'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '35c7033a-a9f1-4378-b2f6-31ac10190849'));
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
            .get('/bplus-it-sappi/channel-detail/35c7033a-a9f1-4378-b2f6-31ac10190849')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '35c7033a-a9f1-4378-b2f6-31ac10190849'));
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
                
                id: 'c4658743-0601-4a3e-8c53-e61c63f9dd57',
                tenantId: '45e9a888-f043-4b78-a550-2b826b714dba',
                systemId: 'dbfddc6b-dccb-44fe-bdd3-860f2a04b0c8',
                systemName: '96trk7bqcfl4xltlbk5x',
                executionId: 'aab10d44-96d1-4328-8c1a-9ce459bc3ca3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 13:31:11',
                executionMonitoringStartAt: '2020-07-15 18:34:36',
                executionMonitoringEndAt: '2020-07-15 22:19:57',
                status: 'INACTIVE',
                channelId: 'c8bab480-f8be-4d13-a49b-1d29fdee5f5c',
                channelParty: 'fhi855qzj5wo3xduhh2oxl02ue3pl5b1khewxaoz3xaxfud7fwm6euryuc5oawhmeapqxkfippyozca8r6g7oey1kgkgxynoto3tgs7kabucdz126m50fecqfc9db0hzxgsxs3pdm4dtemj2rwuidabxl34tqini',
                channelComponent: 'i923z0kvz2rrpxku6kbj61gxqedoe5h8zq3i4q8xfh4nry99mwwt62wdq5x0ai570cr1r5ypzu5lwclcs5a8sdmcuq3uhkd1li2f4puw6j7am2ykdpmzlt5718gytwtoxuse7utu5y1vxkzjn39423jjl27oufdz',
                channelName: 'xuziaqpe31huece65uk3yo500u7upu8c4p2glcl0wwc40kvjpl27t0qxn0jl412pbv8lmsydul159meum21ee1bs7ycm4nddte92xjq2luxrsd9datp8kn448v45k706i40um7kyqghfardyvbjawcgz7710zz21',
                detail: 'Aut quo excepturi est vel ad. Dignissimos et ea rem. Qui dolorem facilis aut velit pariatur temporibus sed voluptatem enim. Porro et dolores provident ut. Et consequuntur fuga nam rerum et aut tempora delectus. Quia sunt esse.',
                example: 'xsbo5i6xnyaqeqrsjkztlbikhbnkrsuohbwolhimgzv8qdx8gdwvgvtfl7p6064r3tti6g2xa832lpyxn992b893zgnsvk22g7hfgq722vny5irnekqx63dvyr9d72l126s7yroll77fs56q31ck2ytcy06ksp1i',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                systemName: 'kf5fj3ezgizjqmx5dr2o',
                executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 15:26:02',
                executionMonitoringStartAt: '2020-07-15 15:49:13',
                executionMonitoringEndAt: '2020-07-15 11:17:24',
                status: 'UNREGISTERED',
                channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                channelParty: '5vwb5svjd4weit4cdow7c0rs3knmhgbpe0zxbnf5rgbly52j9a0qrszkjc3fd3bbxjv0op9bn6c52629donpjjfkp5carg9gddymlkvvmzb8m0uzwmy9locsu420v1spz0ap6d0mk08am27hb5tjgww9hy6qz23l',
                channelComponent: '024voj64iwga3myxx9zmr0ytg8a4vhvbtsvje80n495l4fucvncakb756fwm3nak5obkn3cyyqnagr5y37s6i7y9x3d3amy240b5jq9d5kqvf6hux4ba74t3l125hr2tfz9ajdr45xd0pn2mzka40iyh5r2fw197',
                channelName: '5g2eg6i54s5wv1jpgl4wwtj9m88zxq0ogbmkf3dim7t1p3vgojd9o5490o54t6kb6d347tfo7it12lv51wn8127fjmvxasn4uq7gnyvlw67dwq3mo2y0np5b0koryf1njzx1j7a71x5cqrawhya7zheyx63f0ggz',
                detail: 'Rerum saepe voluptatem sit harum consequatur nihil. Iste enim exercitationem recusandae minus necessitatibus ipsa aut. Natus omnis dolore et dolor. Dolorem et rerum aperiam aut est voluptas voluptate similique voluptas. Aspernatur eaque recusandae dolorum officiis in recusandae quibusdam sit porro. Aut vero aliquam nostrum quaerat culpa eos nihil corrupti.',
                example: 'cial9xobmhzyisfo7rxk1ip5bbsr0e33zn0u6yvf98ylbjk89kpmd9wooqukt2xqaue5tyozk4zlh5xvl9qvdz3eox64m6hnm2zcno2m0zsl1ry4qs5a8fktxh1y952gxg2p2m33gl3c6430wl5poox8zv9l6v19',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '35c7033a-a9f1-4378-b2f6-31ac10190849'));
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
            .delete('/bplus-it-sappi/channel-detail/35c7033a-a9f1-4378-b2f6-31ac10190849')
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
                        id: '7f8bd80f-252a-4d28-b6a7-c0c273851a0e',
                        tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                        systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                        systemName: 'o8yr0w1n9lxh2w1xfmnr',
                        executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-15 20:38:40',
                        executionMonitoringStartAt: '2020-07-15 22:08:13',
                        executionMonitoringEndAt: '2020-07-15 13:36:10',
                        status: 'UNKNOWN',
                        channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                        channelParty: '32x4csy49383cpf3wz0wbpnq7i06e06uuu344buwr45ygb8lwi1z8jdpalok2nbylcgwvn9hckvzhx4lst2puauju3xl7lm0qnhcw6ouvqjstggen2nmgwwtkrkl1od4r273jb5z2g134l3rx48wtziv7i0l8tj3',
                        channelComponent: 'vgp6ea0c4074kckxq6gy0dlnfpmzd5d3p3a0vbt5jhdhgzfsumsuca6qz83enkg3touvy1fvdzvwwiv77dt61mx7hts1kd79yh9h7e8hx54ucs0i2ay4olivvwngykw3up4ikk4gxe9oz0jfrof0nwtniyw1385w',
                        channelName: '5fx5k7nhd2mnbxh9fzm0yze651sjybn6n5lhykiw7iq6e044nlc6lpoauamtfw2iymfd1j85naept13ur90ycpz44f81w8ai35eijs1zaqgz1dbbs1loyqswobyze02mjvvoswcbxayw1tetsk96q1d6g97omz8k',
                        detail: 'Velit aut excepturi quos consequatur minus quia autem deserunt magnam. Sequi neque delectus id cupiditate voluptatibus assumenda iste repellendus aliquam. Deleniti laboriosam sint reprehenderit ea odit sapiente laborum. Repudiandae earum ex quae et est animi voluptatem sit.',
                        example: 'xrv3zqltplhkqqqif8tfaox7fexa72k6izm2ml34w3hzo5ixblwn1gv4tb61oo4dngzli8d2shp8svwddtor4id1sj9x2lly881k94e6prbw9jyg5d5a2prhzq8r9wdutzhhxd83i64yakjlw81fwv9pj8tcr51o',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '7f8bd80f-252a-4d28-b6a7-c0c273851a0e');
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
                            value   : '35c7033a-a9f1-4378-b2f6-31ac10190849'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('35c7033a-a9f1-4378-b2f6-31ac10190849');
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
                    id: '35c7033a-a9f1-4378-b2f6-31ac10190849'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('35c7033a-a9f1-4378-b2f6-31ac10190849');
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
                        
                        id: '71f26f3b-42a1-4590-8872-6d11595ef032',
                        tenantId: '0f1474fa-6c4e-4099-bd99-8db2ae0069b9',
                        systemId: '821237f6-b0ec-4f52-b06b-12ab582d6696',
                        systemName: 'xi2csnqktriyt97e0znw',
                        executionId: 'd45d76f6-a742-409d-8096-d9de4106ee43',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-15 23:03:55',
                        executionMonitoringStartAt: '2020-07-15 09:45:25',
                        executionMonitoringEndAt: '2020-07-15 14:19:39',
                        status: 'UNKNOWN',
                        channelId: '8c19b36e-a1ed-42ab-814a-2c6a7ff2c629',
                        channelParty: 'hdjy2fcuxos82iaayg8u5mm898kq2a8qugxxbtk5o5z6fbirkp0lq8iw8ctfxacfi56r7zswf0ym793ynt8uqutboddd2cjtlsvj5gykoetcesmz7zdhl8dxu2hvgub06wfgzxtugk6wp8kxqy0e2jc8nlezzod6',
                        channelComponent: 'fmdiofvotx1iij4ljucul7yfjsy30fc7aswb6imczevqgtn18x9lux9ingpckow1wtevk66tr5m1m0tpdlufv20l31co7prjbu2z0pltxs897598dl2swni1xunqvt1b36hl2uj8b2t97ot7r8knkqzl23yso6ze',
                        channelName: '8jvvimvugih119ln0bqf8vupdb7di8kmjdhcy4yehmv7yv3jrrjubai9g1ykyjvjuzk2ga9m4gdcxkagqenufy34dh984k3e84hd5cnyngoyfgx37ixpwsxqoi9h4hxa048v1mz4f8n6ir54sybx6fxqqnurd61d',
                        detail: 'Provident inventore non. Consequatur ut omnis debitis eius molestiae rerum expedita. Voluptatem et quasi et aut enim eaque. Omnis doloremque dolorem sit voluptatem voluptatibus eligendi fugit facere.',
                        example: 'xow5cf54zsbsuigmwg48lkvjxm6k7e37yct1uqppewvfatusk8pfe0g1ipixta0tdfr2boo3i0bnrgwa4yvjln3cp2w59rt4303qwuyuoaldlk04xztl7sfw51nu1bs63fyd2rquwol40hzrvuds7jce9ec2d3mi',
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
                        
                        id: '35c7033a-a9f1-4378-b2f6-31ac10190849',
                        tenantId: 'be1e4846-c166-4a63-b080-cdbb12d02b42',
                        systemId: '34d50977-a2a5-4f06-b2df-b3411f41a587',
                        systemName: 'am7g71edt8kvctgjbks0',
                        executionId: 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-15 05:20:46',
                        executionMonitoringStartAt: '2020-07-15 00:51:38',
                        executionMonitoringEndAt: '2020-07-15 20:47:57',
                        status: 'UNREGISTERED',
                        channelId: '66b34d6c-887e-465b-a19c-8f850de1f93a',
                        channelParty: '04oqnf9t437dtn8j00d2vse4jp99agphcocnpvusomhsga4rmkrabt4nzt1q0pg83niseaxy3urymqw6a2qky9oxs2llxaye5w1ht4b836s2w3vfbsdial7jr09opq2if6k27sq79kdekud0j7jva86o8eku1yyd',
                        channelComponent: 'ysfios0lthp9be6nm3ij1yzs9knt8b15so8t9zwlbrvomiixqhhsmc359b6ert27go6wbsfbpa8tek02bi5xfthxngmojpqn9nc3xclufwc5cfi6gslanrfedy8gs6tlnlf8fwsxvdazdeoczpyv1qvopkah2x52',
                        channelName: 'xs2sf00iwcdq3tlh9i7w91k7py1b5pn1xw08dvjj2992t4jki2t84x1dtubunzfusi4qh5zuqpgmg0gjtznt128t1cbd330dqvsr8oag5cuhk19otko49lb1g6lcqmea0gqcqoy4in3y1rl363g8oid04eab62yh',
                        detail: 'Non in reprehenderit nisi exercitationem id soluta deserunt consectetur qui. Dolorum recusandae molestias iusto ut voluptatem aut. Qui possimus ut vitae dolores dolorum non rerum.',
                        example: 'qlz0ulk1th78zyahkx41iaouqbug3la3j86n9xi2e1k2xfkbgukifg1st5gzth0qkbpcza9ro3q4cqbipy5houlrdveqjbmzahb7iwvbol7glcs21mrcnxwwzqg81ydo4ig3dsytp93kx3055nq1o2n0vep365jo',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('35c7033a-a9f1-4378-b2f6-31ac10190849');
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
                    id: '35c7033a-a9f1-4378-b2f6-31ac10190849'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('35c7033a-a9f1-4378-b2f6-31ac10190849');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});