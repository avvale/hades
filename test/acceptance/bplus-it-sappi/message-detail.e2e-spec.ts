import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('message-detail', () => 
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;
    
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
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 's1kprxw7130uea8dd7vnfbxnp9lo7acpde2qdhcyqq2v8kblk8',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'acsxiy5puyqwznnh94ng',
                scenario: 'crp78pzvydzznxtq1yj7s4cdxy49r80mdilvluwhfzdouphz0v6lu18gon1n',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:31:54',
                executionMonitoringStartAt: '2020-07-29 14:59:59',
                executionMonitoringEndAt: '2020-07-29 15:22:54',
                flowHash: 'qkk9uhgeivay8p6jk6xz4rdfc2cfdftngshr2hkw',
                flowParty: 'j6xupp5f98rqb7q0ipribycl9dqk0az315i5ty6jodr9416146i7sycse5tpqlognhah409pxoffo892d4n1kavo72voj3iz0hkqjqqgyssz7pnwffpesg7h0q0hn3trcq0jqfp4jirms9ntobq86l5qqo4j5lnd',
                flowComponent: 'mixeiy1kiq6aci2971uhpjt59jh2cooq36o5sr7eglnfrrj8vv8dvu2bpo2j737jav9k2k6iw9zw961hqxiing0nzvlttwsz651kcuzru4onoo3hb9ub7y3b7ylz199uo2syz73aic5omgsnzxm2y0vn9qf6bokv',
                flowInterfaceName: 'us4ouuklfebqoisb5ee0lwx4eroavcgyy0ehoglb084mcb0e67smrby4xor2ay671lu4t7jf8fm6wqx4942w2d96uv5o7v5tbouc6s9tuquprnj07zuh6vex36x69rq2oo0dva9u36iwibqswua6eoynx5ucijo0',
                flowInterfaceNamespace: 'oyyw8hdlr5pc0mw4cl1izcmkvmhfq07vhdw31b249ujbxlcb7oomyo70y8pe7o19d8tyesyufybvmxa3sz8jcokqiv4nw2p8lv7fi098q8p1bmmlje1jn1lztu3jnhpdt1u2ta3e8fs91l5ma62uihun3od76kp4',
                status: 'TO_BE_DELIVERED',
                detail: 'Maxime itaque officia voluptatem sint. Porro occaecati quia aut fuga in placeat. Quas perspiciatis ut qui adipisci est soluta.',
                example: 'bq2ux4ge0rwsuaeue44aaw5k87m4tenj8f52okmwiw7nhd5h3z17qbopicny7exuaos6wec89k38ldx11q13xvxpnw21mvft4xxdbrnjxwpv161pal35upp0cvhocqdt5qdzl6qeursrjjr32qssdbrln6qfobcz',
                startTimeAt: '2020-07-29 16:22:59',
                direction: 'INBOUND',
                errorCategory: 'a8066miwj2ak3lm54qnckx7zqrhjxg31i7pjqpzy67bl1lvc5r83pjhklcw5c79qrzmv4u8fq0zqai5f43kb1rw77b1im24zlckm8tmvr45jryf6xz2l4f1lrp9gm1r6b8skx9wn2v7qo0s0u7u0xwzk25ikebci',
                errorCode: '2qiwxwjfeii0hj60uperyahyu3538w08nwknatsieakvvz6fad',
                errorLabel: 827978,
                node: 2984504892,
                protocol: 'nyf3a5outgox04w8kymv',
                qualityOfService: '3zhuwyxhgwm5bkjp378p',
                receiverParty: 'uydlaqsad9p46kxtfysodccd2j85qwinilqlxuoxkcmvchijxvl2f6x5ihzd3wlk87xg3ddkbz6prn1ygp7al8m87v57v1763boznnybpg3001wn0dcj5ze5qh4fmb8hcw4bnk12gzrny6ehltqt7xjxdm4839au',
                receiverComponent: '2d8wroci1xzi5zs7exjwqm0ndw9k37ncn22iqngzalbox30z5oews8rloo5r4qzg1a8ax97cs1r43a7w9a3fbx8ai7gpm96hrpvpjtkjelqutrhs1axie02cr3451yu37ty7uctpf10f39ramd2fa5usvs7o06rn',
                receiverInterface: 'xjlfkxxhdk1127nhxbba99hmxlwxja0onnwmsndzzf76fk182idgiqr3xcamaiacf8v67zbqwbigeln5lh6zkry3920co5r3m9xqyfssbyfdvfb1da7hkwl77gg3uh47cjt02g86gjnzq5vo6oghzlvu5pxsovj9',
                receiverInterfaceNamespace: 'j7ohfxn5v9sq6ytjpr22rkz2kaait3xfe459btyzwb8xva31qnf9k6mreg1xle0dyyxanjj85s3c1awyj1aedn76x5nck1zj2pugx1u3e60e7g0vvu1ask9o4dg5a4t4g1i77eqev08ss1ylsfny0vijj10gxgsw',
                retries: 2391059916,
                size: 2345703128,
                timesFailed: 3676882474,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '6m44duiwa8nhajxsvjwc5r7zj131kcheatjfw0vebg39i5hg5v',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'o8js46aesksqj53hefu1',
                scenario: 'u9anpl4pxj5hxdxlbo7a3yg9uw64xka5h8lle1lsskl2isdev92y8a01qygv',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:56:47',
                executionMonitoringStartAt: '2020-07-28 23:37:54',
                executionMonitoringEndAt: '2020-07-29 08:22:39',
                flowHash: 'lw6vg10zrck7qzgc0uw715ujf6wudcwxe3vhe801',
                flowParty: 'dxsr988jnbkmuicjj21f736u5piqvj78q2d06y810csmcxyhq33re3qsqfedq4o9boinluwyvvokglefjexrdrxt7bro04gp191dcwge6foo4pi2t2hufzc2et6uiao3bu12ojdl0syys4fygg3nlk0p8vnm8px7',
                flowComponent: 'vmcqjjx5addqot0iv5g93nf06day9py6urrwz147o51annr6rjk4yoqyj71h6up1n462q6cbj1mm676lfri0u50z9q83hs3ur8668i5pc01qyz3v7m55b6knzcm3q4gz63gj6jt2soft7umy1bdu3m1n7bbmb03o',
                flowInterfaceName: 'iru8jj8ne7fq6605i12mytc04g348m0ar9emc0o4kw7u6u8pdysce76qylkp68xlzatu07ik9rg0boojuh4equs7un0wjbkyjyxyyo80c9rhih3mppyll2qvctz8w7yoiy6q783ma5jteb8m3lgqh6q8inepx14p',
                flowInterfaceNamespace: 'jz9isg0x7i7vt181lk1hjsine2mhht0kc15pmkj11bbh6axj1avlv1obhnjc3ewkbqtpvdzs6aj7xmxya1nd6ag5js0runr8baj45uws2iecfxicfvsg2yodctc4j7cxsqbrfb8vcscamfeckego2cnskls8hyj1',
                status: 'ERROR',
                detail: 'Et mollitia pariatur blanditiis voluptates dignissimos sit delectus. Nostrum cupiditate minus voluptatem sapiente id. Temporibus nobis nam eius quas voluptates accusantium. Autem quaerat eos quis. Fuga qui asperiores dignissimos aliquam voluptatem tenetur beatae. Voluptatem quibusdam et tempore corrupti voluptatem laudantium ipsam.',
                example: 'rwvj94txwmmoky0pjbom3kxdsdqxlo8qs64lfwqhhmgumds4cv4ny86qyb7xxc0899ck422p75oz5akl7k3q5g9ggj0b0qe5h2sawyls403akrnx2ngy2u74csruddpijyjx971pg65z72z4ra4a0ugvtgucnhhi',
                startTimeAt: '2020-07-28 17:15:53',
                direction: 'INBOUND',
                errorCategory: 'fs2w8hkr4iof2820cj73x8m58ya2rgr7u38kntyg0edeukcwuttg8kb6xfw2l7pjhmu7vvw0e019c6uh4d0mns0a5hi3wsevzimizlvyn63qpihamkjwjbf40oao0f5ipzvqohc8zvx6u3lpgmqd1dbbkekqh32z',
                errorCode: 'ta2qljm512zyzqlkv435v37ltv9u2hecf3gzufne1z5631ytjj',
                errorLabel: 521154,
                node: 5472974389,
                protocol: '2gkpql6gj5bwt3bmj4bf',
                qualityOfService: '7tmnzluz1h33hjco9daw',
                receiverParty: 'hxeqnybbyal5k0qnzonp9yegpkzk2wolsvxvcvbpuzhv4jyu3i5p30m4mbqsyaksuyy75wbte3oixw1ahlcy2ydzbi9mwm8hxkfasm0lgsavycwy9hhkussjrtdwhpjwwl5kclfoinke0gk6h1grfvznk7onwlc5',
                receiverComponent: 'x4oclxwu5w6c50ntnv722cuo1fzdk7jqpyc0515qsbuyt5b21r9lra9g45fid4f8ofzgh3tpkgzacwgw33nc6lbwqscjfpaf5bui8v8czhj8feqlvfjhgw9g0n94rsnef99531sixqed3e9gklmklmf14oy3h81s',
                receiverInterface: 'nvxzxi577vijgizimsjmpvm0upjv43ifxz7r68yv5qnp96xn7w06blrr0wwex2etk1kfm08j6zb3hize68wgwccgecws4o6mtqip936v61k7hc9zahhgwqn5jlicsrtpfcwzim1qfbkf7zr0enrhiswps35n7bg9',
                receiverInterfaceNamespace: '90n15t34xq99khy9aw5qhkcvzebk994irn04sp9tibx0exp9uf210oru8o0v6se3x4igczt0v29tfcb6p6swwpnlrdbej9qx31x7we590qwebwka7gk9ijnqn0gfaxaspajruu1sf13cw98rtqz0uttmfipdrew4',
                retries: 4508653851,
                size: 8423213876,
                timesFailed: 9641039184,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: null,
                tenantCode: '185h8nh9pcp8ws6ztge41sd2u48xqm64znwii8m3u4fmtvumlb',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'rncqi9b8j4lc29nllmx6',
                scenario: 'jh74dch2qp21t4s3jt0ml6veo5kelgrbaii24ww30nnxr39va4ssjf46at48',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:24:51',
                executionMonitoringStartAt: '2020-07-29 04:09:21',
                executionMonitoringEndAt: '2020-07-29 08:21:38',
                flowHash: 'yo45hfk8bx6wlvg76gbb5eoo0h6pkkx6vxs9641x',
                flowParty: 'qbvqmqpo111gicm4j75z43atzfrtyda9xcu2uf34g6nabcu0e4h2r8g35ecjqitrwdax1hok1ax6is2axi6er5cvh3dxqh68j6oyju0w9t4s1nvl53h9nged0409y1jmtyp30t2gn3inejoef0j1wnqyifdjcxnp',
                flowComponent: 'ppedxu2isw37e8fft4x7008kj4widkm1s5ojmt6m9ipdo9r7je1gi9prmkug99r8cqosnx94n0og6tv3ex1nkk87vu167jg3eix4a0mrgso6rraj04ux2r5myyww95gjevg7myvfbckjitjwlg60n4hh1i4a64sz',
                flowInterfaceName: 'alzlr548xrejaj1wy1gkt8p85ve3oy59e5simgw9sbyr126ti42aer1108734dwdg19htq8ahruu10frt8zco6k0q589rxihmi7ith2ftoeprja1i94lkdtrsooooknixbmpebj68daw7i5r53oc2924ydc6fxis',
                flowInterfaceNamespace: '2cms6kvfyums9fv24k8fc1e1y3rbmekm1ynnrv7tr8gzbv5a7sz4in3nkeuvshlv0uxy8g4cnbcg874n9zpb64shpeq5lwnomxadnswrzkwmgge16vossi1uwanf1dk6u1m941glab71549bbyo5b2mbiyj2ajlu',
                status: 'SUCCESS',
                detail: 'Pariatur sunt eaque. Quasi laudantium praesentium eveniet sunt officia earum provident. Et aspernatur suscipit et blanditiis qui sint. Vel rerum nulla consectetur maxime dolorem reiciendis.',
                example: 'ohsiw1x7idilmps55hx6fkju2gi142gp79nbo9t1cz9xn2ri53pt2jf02qcjewocb9etylfcgwj38hei54wvf0ss9eq03qdfhztgyqkybixrev5klckg7xxpbpy7dy1r7pseyvs14ky5goyex9fstga5qcgg64l9',
                startTimeAt: '2020-07-28 23:42:26',
                direction: 'INBOUND',
                errorCategory: 'dgkx3befh3vy9f6xqq2l4e8nc9p2r2w90iqt3f1dlqmz1zl4drttfbp3ylfyugfhby4xokna8y2gmkuk53qghnop59l0nqvl1ndqtrv5nxg52btysbivp23zzkja4ihfixqv5pwl9wuko78p73pu0hl40lq5s1dp',
                errorCode: 'o2h83z7ucy2jbrf6nbb3b9tyk55i237ea24uxhoubo948p489g',
                errorLabel: 612319,
                node: 8863116756,
                protocol: 'hfdqr3u7qytnpqpc4jju',
                qualityOfService: 'bjhrkfl0qdkv8grzqqk4',
                receiverParty: '07of2iixa6zf0135ibk0mi7j1x7akxjl2h9phwe1ujjzjd0ur6w6js2nl9lzynv8f6c50cedixgcqvnqy6g53oso3dlbydkux3gjtf2nbgcx9pnyujg6iqe7fje7m7o3q5q8yxnn7epb3818l1xqwuk51084cpng',
                receiverComponent: '6bpdyri0n5j5ik6o41e5ageha1stkfxdm9fx86zfa418f89yjilmkn2rehdfyilyv9wkxvuyoqkegqs2il2ujuukn49qej2d4zzbis9idkl41jjlmela026fpc00jpc6n556s0k5z88vpgyqbg6tc30vhupgwhr4',
                receiverInterface: 'udcsimr857v9xueab50mb3lz2ecskj5hgc2e0znaxtw3rxj4txwsfhzpgkc3xhir3xj7i5ujbf6uj924tlbrmhryqwcb2xipvl7ngjqsro1df69ca71x6qhs47h5vz0yrh0lwoqqt31u7f5b9650gwhrt880z3ws',
                receiverInterfaceNamespace: 'bps3ygf4e1t912oscrs17kw47jocr6ho57dikeakzfkavod96yj2r797zyjp5xhmlezpt2qqgczx5k8hhuebg7zoxjb0iu9l8ty1fs29v82icujedi1gcx9758wuivv8vui8vtlg7x0dfdrk4svs4njf1rr90yst',
                retries: 3971331946,
                size: 1060160383,
                timesFailed: 6177930233,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                
                tenantCode: '4z9nu4ag239vciz89rx6wzu8vtlgkshmddofx0svwl2mxo6g9b',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'ocv5dornlcjx8fm71iij',
                scenario: 'udpqavmmv3sc14u37rw62acnr2qbt60nyo2cb6m2goiero5vvee287w9cpht',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:29:19',
                executionMonitoringStartAt: '2020-07-29 08:28:26',
                executionMonitoringEndAt: '2020-07-29 05:18:03',
                flowHash: '1j6h2zpwujd4mii6iuu0dfhfdmdc15t9l2zzajtf',
                flowParty: 'k9s05ogecqxymqdt22md4il23biqbykia7phxqbxett9hwfs87914nz3462r5jypa7s4cqg38h0sv65ym7no16td5bq8er2m4ent90nrf29p1299pw55dng0zr6champbb89opikzoxthmgf7u126an75abn2451',
                flowComponent: 'hbt1l48a3k1ua2xdavkl8it57yezz6xmlxgd157vkkymt8zozsw40b560cp9vlovzjnxcbq024axkvfrkr8cm5z0ng82yvq5qxse3poo3skl1te4mhvfsqbpjdz217mraol491j7ru92x1hirra19grul6fdmxzk',
                flowInterfaceName: 'mt0ruktmz5zw0ufd0unfcpr33wlr16cxtlu0empd8byuptxkrysrmgpewo20bw5f3u65d7rjlqd73r3854a3ch2r0k671nlfdayo7x8w2napas554tp03hkq717nxjn6jnoo3autw8jre7cujo67d1wv409sj6ob',
                flowInterfaceNamespace: 'ygj0mb62f45qr9c0mfi9vjr1lakcxmvyxp5we5fmrv0dh5rz5d9ihl9fxrv1fhz2q696834krdirhi0j3xgvpas5w90k23c2iv3lamw6zu9p4sizjqxwk5qzbnli7qgq0q0aqz6ydtcbgsvzeyk1426eh119f92s',
                status: 'WAITING',
                detail: 'Molestiae modi facere. Qui quis officia quibusdam. Voluptatem sed eos eum labore.',
                example: 'ntczdj5zvdh0343kh6fzxd2vboefmepqil2kidg747ew8iynz173zknr6ck5pvl6o5rwg74ybbc68n35zzham4gx7910zi7o4cb13658qedm7ssxzb4pawsrg1z8f3txsqg7hmktwdld9gndppmmhwiufpu6e626',
                startTimeAt: '2020-07-29 07:20:46',
                direction: 'OUTBOUND',
                errorCategory: 'sjaz2zy7hunehofa20rrws6mbcns10guvlahk9wwkfo0v7mf8bbyzbbpdqkgpyww7y2pxrwxuanwwff75i1ypv9el9oxgkcxoam82y17ulqndac4xckowc3kdisr4u7jrx6pgv89dio17xmfdl7kcs0x12qk5i16',
                errorCode: 'c47op85o53ynr9rkn5wbloqrbhawqxgz1c520jn6hig0x01fut',
                errorLabel: 141126,
                node: 6459907797,
                protocol: 'jbo12bi9znxcg48wm5c7',
                qualityOfService: 'scsbs604dbmkusraocbz',
                receiverParty: '7abd0pmh7lq15n69sabi5vnvhxhwc9ok3w3td239owalu1wil194nczd8fo1a6kk7ooakhi7eafyv2ljlaueo5j5wrjix43sqd2mzxorxxdy4q71olsv8r0bkyug18wzwjhs6kzufa44g8sez7u3htiut2rriv3z',
                receiverComponent: 'se1pm8dn2sa46qv4387fbd3lok1kom41pec0q51tqu30i66wezb1bmowfl4012wdn5ui24h7f1omdq5xcpnxirpd1gk6yc736da7xf2243142a1f0r65opdft8bnlycovg14vudzw75ld9rv4ugem1948608twih',
                receiverInterface: '3cwo4opdy33y73ua3ta74z654rak5bm6njz1l063ps8p6voghpxpk648o8gokohhe9xkp9ub1n6lr8p1ciet2f86qdeirab06qc0wtbjv9vp551v94976evcp5tdsorvy9zpi3obdz4n7s458ev1hnuyq2iy7j8y',
                receiverInterfaceNamespace: 'f9vy0n47wf5tshtudi7vjdaxzpkkkvtsgj240zp5z8yzmpjdtep2wv2a6036bnqxglega6ohzyqah1dfkcw2ssivyfev2wuefr7ybg1jx9q6b3t4qz7x69aiqhpzfcmw2z12x78g0cqkaan83js8yfv1qpfzhu8f',
                retries: 3229516169,
                size: 2585253694,
                timesFailed: 7618396535,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: null,
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'vle4rxdjrrudm0oo57ah',
                scenario: 'tvgp3xg47ghf2kb5x1trqvntbe9i8ls2n0cwj3pndgz9vtuybjzy7krp96dj',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:42:38',
                executionMonitoringStartAt: '2020-07-29 10:10:50',
                executionMonitoringEndAt: '2020-07-29 16:08:15',
                flowHash: 'mhqymgv9gvk3chyuwp8rzens0p9hemzqeutare3u',
                flowParty: 'cowoivqgvxz2szt2yb108tocua5vdemcsam5c2v31w80tzmclvqsbtr2rtzdu1qtnnxtgdiiod99crxc5ta6q45b7hktw7icqokcl6i0n4csypftv5mlkfsvp3u7ezqxfhvh4q1m8ex4kzx1rau0e1m0rhakvq24',
                flowComponent: 'qvlow53t620x1c38k0jfdic22k06swxkrks3rsdx0sm0zg991br2cioqi1tj2l6uobb0i5gg3agtobqq460xt4g2csko2lmkdii91unqsbry8ckm5d27n08166y490oexvysk23ewpbriqigzpjdt16szolxmx7u',
                flowInterfaceName: '2nk061dcb49vo6qe41ftmm33gu20b45g2rjkiw98ezephauupkq7zl5olwdei3wkqras9eh4jbyrvxleppsviuwwyhakz3znuabv06pnkyeqdl0m6x86svagcws3h3m3llkf9g3mp136x8wf0zx0gjstggtia8gu',
                flowInterfaceNamespace: 'zer4v39grrkoi9owuphp7rt90x6sxj9ebuzbhpf4bml8hyds9ecc3b06k2c2vn93x8ey2euc6anpvs11697p9l6wqsnalll4j6jdry6keom6yp3cyrxtgum26581974vrx7ue6axa2yq3pqfsxaa81ysohlj1yik',
                status: 'HOLDING',
                detail: 'Qui dolore libero aut provident assumenda et qui illum. Qui possimus ducimus qui hic ea iure aut quisquam. Consequatur vel itaque culpa. Rerum non quidem a hic facere iste ea nisi.',
                example: 'c1bvru7rw20wzvg6nzh79hri0jk7pelo6n6oy4k4ollj3wg6a5b0lhc9ywtrme30m8ckxn1oo8y5g33rdd7xjw5l7wh78fiw6vlof5kws3if1h2x1lb4rss3s50vzugkce8ociueqowjgpd57oqeuwsn80jsbhzl',
                startTimeAt: '2020-07-29 14:25:21',
                direction: 'INBOUND',
                errorCategory: 'tt45qnkiyug6b8poj7f0atasuwqfbn0gqwoqt87eut51tgu9cmcdc5hb3jqhqj0m5xw7qpo4gpicptkx3lect50ketz3dh1uwg6xf5m3n9snrv73pwzxwiztp1tc7mldh9mjijmcfqwkg27z9ausyau6phuuigaa',
                errorCode: 'ygdw1ww4eyvjowy9l6y53n6eo10vlh8h7kv4nr4pwk9uvcubix',
                errorLabel: 649537,
                node: 8473775203,
                protocol: 'e1kll4aw6p3m4tyznxt6',
                qualityOfService: '1v7dm3ctf0d0lkktvssc',
                receiverParty: '91illli9l1xlv7aldji8tgwya8exkaczm6wn7gopfmofuw52fv6zjh2mdnueb0vhvtrkptsckfd2xsajl2rapo24fs85qwp4nk55t5m1use5ezsmxmc7o3d5byz1134xah8q65yw0anpt1mduj8cfpbsqdugwua4',
                receiverComponent: '6yd33o9kcrh083h941xi4cp15zntfpiqru7sy5es470fd895jsskgw0atnct0d1o8r1n4nacecx3y2g9ksogrtdvq8pa4aiat1m602h9a5mld90odghsm09qa9fw0hc3yphymy4loq10s4u5bobqnqmgq52y328i',
                receiverInterface: 'pge6ilkeihtqrjx6jkpz6sh01q5nxswpk2u9q17npfjz8fq01ly7ia4j508xp11bda9s2de792sw0o4c1kl03wm2nmlo4zuungptz4o6bzbua2pn6hdu5qyhqbqz6not02wis02de6q0vrd573wcap24xd76j1p9',
                receiverInterfaceNamespace: 'nompd1t77i2o8ce82nj23mw8g06wwu4x1u0vt3bsq1nesnhnyedqdbgf9768cni6ms47v9cuwx4r7lfqgtnrsnihwf5mpgnlz4tlg6350y2w3n3opfgc7bv986flb8kwlaqdj3dex8fu70xfj9zo4qv765kp1fhr',
                retries: 7591661640,
                size: 9698993487,
                timesFailed: 1580708295,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'ies5vjxc82492o6ptgx2',
                scenario: 'a9vl3po2h9z4n1ibt7od70vdmaob6ktscnq0xikmpa5vdg8cxemtu7waix30',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:25:20',
                executionMonitoringStartAt: '2020-07-29 12:34:25',
                executionMonitoringEndAt: '2020-07-28 17:17:02',
                flowHash: '3jfy5v9qu4wypiu9ew3jhx7ewu47s5dtqzcc6js2',
                flowParty: 'bx82tlhb694v8krjt466f5ripy1p6p2vq4f1rydfsvy9dw0erqdxb8zy2zkfx7tw03q00f2ssjal6te25duhswnyhnsh3vwu1y7dt7cqnkj05hon18t6tx94c838e93h7h2p280f4o0d651tp77pl5c1xmtdxl7v',
                flowComponent: '8rf8pgv1u2txkl6mc6mi4nlz6rs0jpf9roc210a6znl22nv4kahy6erwjes35hufri27yo4u7mechuiufy8nimqu7brpdeskkmpts3r0r1d4i3jj9nw2jzue2yf4q91rc0vsqv9epw063gkf1fqjkx00gr1o2zee',
                flowInterfaceName: 'qw56m86xq5khr5142m017axu4ajwy4dwsjzl73d6g2327euqfi34d1udwzf90s9bff623lc7glzykui2rmt9g0sf7uddvwjtb15zo5adlotop6rseztv51e7mpwze6eiqayys8vo61aa9jfv5b5q143x9evkfkwt',
                flowInterfaceNamespace: '2hjx1jba92rzn5qr98d6f2xqown8c5kamntuci9ifd4otcl2d63z6q3pfezwmkwgff61cfgif6y853ccfnwqtgyleznvjwf3ygyta8ziqxjukc4lkyimlaav2w06jksaxxbvugfuu377rhrj2mpl9wq2655f3j5u',
                status: 'SUCCESS',
                detail: 'Sed assumenda fuga impedit dolor quis quod. Vel possimus distinctio. Quis quaerat facere aut sed dolor quo dolor et. Quo et quis sint iure aut rerum qui eum dolore. Sed provident aliquam nihil doloremque ut facilis omnis. Enim sit et.',
                example: 'yq2szf9v3zgf4r7vwejcrsaa3lk8fn0yr3kheffubk6p50lo339nmghg6qjhin8e82ea55g4c4y11d3ydzignkfis32esducqur20z7vsxoj61rkxqom2cwv5l133igsv21fp1p2j1xfn3hz2z9wfkhz01qgowuu',
                startTimeAt: '2020-07-29 16:42:42',
                direction: 'INBOUND',
                errorCategory: 'n5vqapnmm2g0z7he3xxhu6xe2wt65t3tcvpqzasw7v51iad4u0hkvwkazkkci4bi1i6lk2ij1ulgt2yqhlucq4fccuuuflhft47q396mpc9jzzcwr5dce58aa63wfjbofr0bx8yikszlq9ma696upnq4b039iobn',
                errorCode: '8a8equj0td7d7jtylbnld1yzynx9h7i8yrttne5mh4m9q49212',
                errorLabel: 602930,
                node: 3955826465,
                protocol: 'p3ac72wrkn90tan1uyhc',
                qualityOfService: 'q25tigku3kq19f73tmqh',
                receiverParty: 'ncboji2wlf9ojumd9gsha1jjixuy6fofb54tl9rnxix81t13ug5glcjv4a3iqdw9i2mva3kn9eemn3a20vs0lry5z3wv65m1girp491nubuy8rpt4tizpm2ln3af29498umabymqyugzswjuo9e74fnuvy6qy77j',
                receiverComponent: 'h20gtj4egipj4v1dxij53auzv3p98hhunnir2pzuuvtew99brala70dvnx68xps5sj035dfb77ipt4jeiy3jy57tyn7z31pdwgiqlnrtob3g7iqvxh8catlgco8uw5h1ommxrpb98h51f7jkon5eit3ccc3zj34x',
                receiverInterface: 'wtss5qkcnjfazw25dxjs76p1eu39oalxuaoi7lt3bfkieptnlxluog9fy1x97h83477ptmjgyy5u43s21de2qu80pjqv9es4rsw64gzj2fko9fx3b0k17du15o4pqgcmx3fbb48bwl3hv1f6a6kak1wu6l629qqh',
                receiverInterfaceNamespace: '0i5vw70zw9eiocyj5xf25tnn0hbicjmnsq3dx7tvhvzdvtzkfjuo29xq2h2mkw48ckgjqmt6rsujwsqpo6br4nizbtzk4qanyvxaw74xa4yglk4p18cuyr1yxqavh9utxrw8fzgkghgso9jglstuundfu1pn86wd',
                retries: 9889173435,
                size: 6891902391,
                timesFailed: 4488065002,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'i3151xl5txh737g9xq2ptxxfy8tpm80rhklkp8s101j4oymdzx',
                systemId: null,
                systemName: 'sye0lm69git9u667frhc',
                scenario: 'iu978kieusa6tb19sf2fv4ltnimvi9h0rtls87qlkvy0iw0w5ybgx0jxbw6h',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:16:39',
                executionMonitoringStartAt: '2020-07-29 00:23:13',
                executionMonitoringEndAt: '2020-07-29 10:22:09',
                flowHash: 'q5apf4mhgxz0pf5118us1um7f2sg480wjwb69axj',
                flowParty: '21hiwh3axd78vugm3vita3gti49xihppl5ezohwwdzhpo6yjf737y9xds8fn5ooopufqewm7b0nef2dp2pnd75yh4t9mnknd3e8ipjfcaduv47mvzkd8elbda0pap8nz082ewmatpwiohtw5y51w4s1avnjt125r',
                flowComponent: 'ijzlbhy1xwsvbl5iicchk36ewgjxy3akl5saf9rkofmeu7nxjb997jz4rpctgxzcogrh82lxh3k197n302cw3s8jme3twtb0cyhu8z70dzpji5hdhw6xiael1r7ay9vlud7c4ejk4ht7mvud9n5e0zxk34wdqm4k',
                flowInterfaceName: 'jlkr6dg5f4xdze8ocr44vl7etkzlb2m4ujcsg906ejo366bk0b8s9gvp0qv02eyx313ol4zexcx3m7ar4bydfont6e8tw96lxkt3in750g6dghww7oi28zpd1gchus2y0wfqufvw2gw9rxu7ylogmra5p7p9ie04',
                flowInterfaceNamespace: '5kme75o4ezoc9r7qf32z71ao0yowh4e6l65xrbro7ib37l9yd1bivl96jcknb8gt92b9133oubbnpphoksnwxgcud89sbwyrizmanbt0rrr81kp2vuoubc5mg63sh20y0jvihy6fm18hpf9m6fy2o436gr148rj8',
                status: 'SUCCESS',
                detail: 'Dolorum molestiae quos non omnis accusamus qui. Nisi qui est et omnis repudiandae nihil est magnam eos. Tenetur ab minus blanditiis eos autem sequi eaque.',
                example: 'do4nrjwp2i4wxfrh29c2uyq9ozuzdxxs5ki4fmuccg0gca8qgo772ymq3iuwxlwvtal7wgyry0mevgr1e5xpwm5tby5az1mocxv2iijk7h8yffa1dbhu2zfupf509qzb9dl12zmu9tjo7ak8grawriknu6liacxe',
                startTimeAt: '2020-07-28 18:30:11',
                direction: 'INBOUND',
                errorCategory: 'g7awzjkevwsqux4a66e0n5y2w97bogl43wqbl16tr374ni14o4p3l8wi5rriojnrijeboxtk5ve2sez8y1x0f5p6mz1lb8aieqx0hx865f0tuxipxe7lltlzjrakg1hvxj58xpdu97copxuc9cgvjzw6j6oe3x2x',
                errorCode: 'ftpq40uscddmpee853sdyoy4jgbjhwi7uevwv909hna614hca2',
                errorLabel: 230260,
                node: 7566549298,
                protocol: '6dtvximx4eexio3cs1z5',
                qualityOfService: 'lrdc3qj61gijyc4lnaur',
                receiverParty: 'oyzbwufxg9158kxj3ag346yfr9q6ta5uxv47hqic8dparz97c4roe3t6tn8fvmf4uj1jhrbwczpo1ktjfikfur995eys05tx25ukbp13g6nl741yrncdzk7u3lylvml0b86ro3s4jg6ajvqou6jwxyafq7n03fkv',
                receiverComponent: 'y1ex3gmsehhew8mcyj4w811y7xr8mheuupzr6y37uxp7kedsjg9c1bqfxmkrgeeb78iie5a4ldo25lwv24fkff93324a3t294gko8kvowgb7302u9gl30qfsdz7mdsam4qgr7upbpb978vutxdz9tnvzfw0rgayj',
                receiverInterface: 'jiox5lrhgrll93c3tm3f9aixcxxd2cddrrnu703nxaxpojmyuh01yvi460r167lcgnw40pab69vo8lvd8n3ub88whf0045ydfonvgtfibqj6xxtdrqy0536htndst9pm1l2utb4ruxome9v4264grtqwip9ac8nl',
                receiverInterfaceNamespace: 'y99yn63p8t2buerswngrw7l9zou01pemfz5p3q4xwg5dzjq7n0bcavzg4f8ihvxtm4v9noovbhtd8bdgtzp2cf9myj7fm6eqsmf6ean74pd7lvs5ggloir4y62jna16uurvf7uh507ipcgzop9wxcf659joc3f7j',
                retries: 7208963234,
                size: 8599751520,
                timesFailed: 8250275594,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'pduny0z9jpwkxogeu3c1tczedjqc0w0nnhxhssjtkcdzpi626l',
                
                systemName: 'mxci6j5jbegt4n664mly',
                scenario: 'h4glv24kxc6rs83aokhh6yg5uer0gzk7ka0b6v4mf7o4zloz5bitxo3d8p9b',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:52:13',
                executionMonitoringStartAt: '2020-07-28 23:19:46',
                executionMonitoringEndAt: '2020-07-29 05:05:29',
                flowHash: 'zkxd7jdkqcrswcfsa59s7j4gh0e681y0pgtrxy8w',
                flowParty: 'm4wxx0uqsuclps4ksnckdhw06kne6z5z130hquia7iz101calr9pe8j9x48o7piwjb167avoimwv8wqj31ks9k8f62kdur838xuarutmc5xlj0nimynmhin7s5n2zjg4jj726qm5ko9kyiq5jorjihsp1ozhtr1w',
                flowComponent: '8azbh2gkzgcx1g2ets3vt1uuo9dsi5o4jj3c1jpp8i8g9ck62w4ie3oapoi79603f0hny0tyuah6l3a53e09oh8ekdbh38icmqzbv33gl2h8qdkx985n3rxwvd76op1zuwtfr8sctqq367avd9d0cid0ok873znw',
                flowInterfaceName: 'f5exb1mqk365o6nr1bio49ujuo4ro8c1pep90j9jm6mut9lp7gturkav7vsvqntor9zt683i641s040y8pjl6c51lys4onrw0y5lhrgh4r82oyyu1bq67c4yq2611e2ca8wxz4s5fjmqm2qmdfaz3hhkg5ybt3pm',
                flowInterfaceNamespace: 't075z63du6uebvlsz2onwjs5bk71hfm0t219k50mo0mihvvjcnlix2z3qkpjwjyasgxg8o6o0cetf237c7rbpv965plq03rogl3fo240kovxxlcmjd21iy1l2zcd8za99ph7mu0jd49ee7n6rmp0yh4zilvjls9o',
                status: 'HOLDING',
                detail: 'Alias nihil illum harum odit dolorem dolorem dolor. Molestiae voluptatum reprehenderit officiis rerum. Id dolor sit odio eum esse est. Sit et et unde pariatur nostrum enim.',
                example: 'ziktb9x8j8uas17mrl3gilwctsndkv9prezmh7flwin7xs8ptdlgltq6a79edtowtstyv9fzc8z4pubctrl9rukylbwkvdlw8bnuvex4usg7qvn5g1tztfpcu2c68qij7w8ri5c5kmpyt7fja0o58kjf09tjogyb',
                startTimeAt: '2020-07-29 12:01:14',
                direction: 'INBOUND',
                errorCategory: 'iipy2huk2l4460vqrj9hqjeliv85n1aow1lp9avw9wugqx4gu7kr24zz2bh0zbnc8jhihwod1ty5rgbu1c9tv0unu927syees4myzukua2u03b3ackmmlrkfjpscvumya84lgjb33sprxlm45hsk5707a71yagwz',
                errorCode: 'nfyafxk4yq00msybgficul06exle2ibq7wgbgt1g085mhy526m',
                errorLabel: 853549,
                node: 7518178027,
                protocol: 'rmvbmpnnmaq8a3roikxu',
                qualityOfService: 'iel8wsp2hpbtsspr79uk',
                receiverParty: 'h1rkabg4mbyzzcz8jxj3wvcyzmulbwhwcjo2uekcbunfw4z91o7pynh91nnnked13r7a22lxvtzkmpjqssnhx0ffzg48zfksgzzzfgsbihivvxq25aoxfk68xm9ooqly2lrhw7iirqjm1jnj2rcx8kr6xhwmkd5e',
                receiverComponent: '8b6dpyqax8auoymmi2h793v5t43oxih9vl723nuo0y9jxd0625yzqmwhiiul84zhpz6lqfkwfogb71q23rldmuy9880oocm5bg14ccw1rsj024viehz2hvoik2s2imv6aarhjcumgx9xsvx1hyqze3ra4uztzt72',
                receiverInterface: '90haztadx4l017g592wwyb6zdm4x566yrl5ywgnza5css1tfo7io2epujl4ltz2yzv6lf9f0y6fz8fjxx9r818ni71j1yejs8xppwq390bh8ryg4twcybuc50gi88qqksw16ld2ny64f1f661mowz1taagcpo10b',
                receiverInterfaceNamespace: '684hbycd9dowylz3jaqjfwd4ezablxdyq0ceirkn04a4yte0g2afuf2h2glqhaay54chu85jdbpjl5wjnpqyjkf4dzpruk573t32hocs73szreqzmrwgua7u6hqgffihydo4h2abzq3zqwms7etmt360ho96dwrr',
                retries: 3565427946,
                size: 6753725992,
                timesFailed: 8160393137,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'liflfw747uls029l8byxg8lbxflzij7zu7bo74tahmk5w61gur',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: null,
                scenario: 'eca0aa2lnfnt8y6dr1sby4gbq7sv6d8nips3tvjj7bja1mudyd8xmr0b6b21',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:37:20',
                executionMonitoringStartAt: '2020-07-29 03:33:49',
                executionMonitoringEndAt: '2020-07-28 19:33:00',
                flowHash: 'lz77g7cpn4a6chmnscp6sql0dtx6rx0y18idsxk6',
                flowParty: 'jkw661s3l775m3sdx9g4pkk6sgb53vw4grwctp5ga611830n9i1etrqztw4ygx54njd0iww5g7syv8ru1r0vb3s7xmdapv7k629dii247sv8u0e489gkwrlhpsmcnepk4r8v18o675kxomywuoplnpkl9lfqb0vi',
                flowComponent: 'bm97mz5zneom3uj9w201viqdnuc8kvpxtvyletpy7yv71vbwzv5ktf72tv513pqvfnkj5n4wu7rmmcu7incmq91bpkb5z34yofw5a7jqqidcsq7azey816loq50axm2rqkvmj5tw2w9uxoc92d84prcmbw98jilj',
                flowInterfaceName: 'j0ylameudv1gfbleazu8qvdwraxc8b0oc1ufd10h4if5ep1iav0al5uta50wiuqzuf3oofyxiklaf6vy92qyebz67eady23zuiwmc9zbrcqo7y62ctcwme34tjtrt3jdcjujujt8s0zkqv98eepn7fbiwputus3r',
                flowInterfaceNamespace: '5ya1pq0b7h9cbsgian34v6ts6sdjq6e0k6c2h81qnt2b1as42r0g1fkaz7kpuy6f4u0rbvpakkhezlurn2ya1627zv455di7j3yzjrpp8hrsegntq4slpvbg8bpgl0jkuhbgwuhwi308hiktnrggl5zd6s7hd8pr',
                status: 'ERROR',
                detail: 'Eaque voluptatem saepe dicta. Et blanditiis tempora quibusdam maiores sed. Voluptate illo et atque soluta eligendi et id commodi incidunt. Omnis eos rem amet pariatur. Repudiandae praesentium velit quam.',
                example: 'wnoiwlnq8ht0qrjeh6r6vbuxrll8jwxdt8ikx4scxsaezwr685tgn4ffs7m4kgx5gag68trdpowx1pmwpr7qtvo8m2kajdvog4c7ruwbyd864za5o89hs5kruzl50ybjsebdv9xl3dgihcpu49n6905sfnqdgayf',
                startTimeAt: '2020-07-28 18:53:06',
                direction: 'OUTBOUND',
                errorCategory: '4ri8npp6fpu0perny8vhieeae6k1ng5ouja9p1kkgga9u70lcpvyl6e84qne7hrnlwq3mpr5xs0wamz0xfvjz9cw2hiegx6fzqxgz6p9juinudx0kmzbxutozu4jo0r2xzhlqioqyefdq5fpddizee82y33x10fy',
                errorCode: '2eh09zncthk8nuzltrahdcync26ajhhvtcdxuut1mux1ayxquo',
                errorLabel: 108069,
                node: 3166987222,
                protocol: '33nqexwspk2ddy3zwnko',
                qualityOfService: 'lpxavfj5qjcaalgxpcai',
                receiverParty: 'wcrfyjj8vsl4g17id21ckcwyrhfd0x8s7j915trd0b6rdxxvii7wb9fbngghyx1h13jvnfu5882a8oyjx4o0eiuv744dexbvq2hb9y21g74fa3cfac1evef7nz35088wodsuciw1rcscoe70garmbli57yaj3j57',
                receiverComponent: 'aj9yrp2t4slrwg7331f6fxkl1ryrwfiowm5vjpnidqofgzec78k5258cwu0bz5j4qvkgua7n4oec65kbrp3ch8mfvammd50gxdlz9ptgii5kbrfsb96bt978qmdeowcxgdneup793uc2bet6vt9pedvt0pwlolbq',
                receiverInterface: 'a3uutmxmq7id7mgrsujmypehuna0bxelcgkddxihywmzuvgvqc4xl0abgju2enfqxv8taq8nsy2vkddw9mkcplo0phb7sxmuslu6vnhe2je5d9rl2bvjnuw2jr2j2aguuuc545lxvuct9eaevkh1vwbf37bzg28r',
                receiverInterfaceNamespace: 'inauc4wdtn42m7bkxco9mpy7k1amqbv5yyfj20dqg7uy9gq1v5qrsym3twpjbmen6ktz6zql2salfb7gdral9k0i7ppob3xudf5s4psf9mvu2owx21dufq7wwncnvanh38l59wrwqwyikcv1uciur5armsn978i7',
                retries: 2936753429,
                size: 9366309777,
                timesFailed: 1904207809,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'f068r0b735m8exy0165gimefz6rzz4ob5g0i7pwpnqxxh9gdqg',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                
                scenario: 'zqo2rm6hk1l8rx8ftpwxds2pr7ev3xgsuxrsiijyxlq7ofp1mdd6g376sd9p',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:45:52',
                executionMonitoringStartAt: '2020-07-29 05:57:25',
                executionMonitoringEndAt: '2020-07-29 08:36:19',
                flowHash: 'jv4k46pjl5o7t550sv6s1pdhyf1zshzcuonvh3r9',
                flowParty: '8919s49kn2793i7zy5pfwf6hbjqyrvy6goh9yjvf194n1909787irgzpemz5fc1y9jh1l4b37i5wjtxhhzmv69n4kh9w5avu0x1mbg2bc072gdzwvcp43e3f67oehj3dv4i71bn06x67ztgp2kmshexoj49mz31o',
                flowComponent: 'wwtr1yha3ubi06hyi63jcqopyq9db8czd7i275x8q3x551brbt07tk1p7varvi4xfltvbknnrcqg0uv4281z107sbr19d6bhqlpbr29gha6drmqg5nsteoypziu90t0etwdg1sgyss2od46ntpu7h6neck2e1jjb',
                flowInterfaceName: 'hl87ammnp0gqciakpnl8s1k5nsdphx1drmehgnbzbt9lg6ink7swrdbza9hgmt9o80cemwb0rubej7zwl0o6hmuvnzum1vep47ybp0aui32gq91f8u2dq4nw3p7zm01ru2mrkonbd0t23896pr9frigm2ithbqim',
                flowInterfaceNamespace: 'mzffborwqdmbsdefwt6tfgxqhys8vi7x5p78gbz38gyagqrz4n3rcq6pth9tnkxl2jrvvch3ehzfrh5e8c7c9naw2asfomdw2k6uhgmu8of0adi1do1t4vhshtixas9hgtypexaba8mjpbubvl8jskzlvbp9rt4q',
                status: 'HOLDING',
                detail: 'Eius atque dignissimos adipisci quia. Doloremque id ut necessitatibus quia nihil quasi maxime aut voluptates. Error hic incidunt soluta.',
                example: 'k8zo7w57kgsmz28nv9h4zeki7as5lbib4yheqc57yjpky9aczf6k5day23hklzljt3ea8fp2bpq88tqlcxr1wh3su6ocjezffqz258r23durk0d59w8qr3ykh3ehcgu1nf5nxp5jtr9y12ghrs52pt5hfoohe4hi',
                startTimeAt: '2020-07-29 04:45:27',
                direction: 'INBOUND',
                errorCategory: 'k8rithcnm8bh3qlisvjhslp3g3nr4m76ljmbfearhsvzreaknu7l90d91stngi7dau03fu8v0dglh5mhz564d5ntkxw8gl1y3smflzqj2qwmgng579piot296pqiouhx8ye8nylfb3wfuyfqj61kov172hw4gio4',
                errorCode: 'v8u3mue8a4hrvvtsg4xfc1bg0byt33rs55bi3r2y1yfplnls5b',
                errorLabel: 789927,
                node: 4142909659,
                protocol: '8ijg70alp7waw3k7j2nr',
                qualityOfService: 'l7o1intxtq0w39yjzr16',
                receiverParty: 'lfe5hij94p3x1v4m2mq6xcrbqhdhgce03squxjenk1gtjioj7qb39h1cu0k2kiltwg44rbdud72qvmfwkwdq7l8sxgeyij56kzo8f5aauusgtrhrsfret7xginedtwrzy3lb3oazctdgtahnexygpmtb8z3df0ek',
                receiverComponent: 'ezjf3j5xfb5b1r5562ezalmywc1lnuqqf302novkkwqsn5apbb0b7u0z8sji9lkncoviyne39218dcxd3m1u4b7aze5ylireoewelxbzry656o4ztdrdxpc4iidryxezvjmmcvxdznzjcjjkznalzfkszxrjj0av',
                receiverInterface: 'mnu6adyjwljf432tfz3g4vvjwqgbssg0y126gv4qy0rdswaj8xpulyu0kvqv8vlp55mh3r7hk82f9iu3mtu81suhfl5b0myrlcy4my116xb8mtg2lndrpfuholhmr1f7s6e24rbokc4dtjgi9llofpj6h5bevboc',
                receiverInterfaceNamespace: '5qw6m4u5aol1ic32tkjxtqf4g8bxdfvxsntbopt5mamaqp2qpfhs5tvxowwx6nl5fxnzkon6n5aoc676a0azb6z3agx93f97iykaldaqik29tgz7w8vi2hn0buakn3okoba4z1dgqh4avpqdm9ai1suiwmttvi7k',
                retries: 9485959387,
                size: 9828606119,
                timesFailed: 3143340577,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '8l4q4kmjh7wqxp8olci3ofrt5ze5ewqsupvru9s1yb878jttu6',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'zhlt4rr125y6k7xm6n4p',
                scenario: '8mwa3bsa9w26b13fxmlwce48wk2m5wbnmvxziqmf884q1od5ac8k5rez2677',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:26:23',
                executionMonitoringStartAt: '2020-07-29 12:10:13',
                executionMonitoringEndAt: '2020-07-28 23:18:07',
                flowHash: 'pnzwmd32brpfa0ibkeevsa66i7idhd94qa3qrgih',
                flowParty: 'iq9nc61oqaz00rfngj2k184kylp38bkdsw4wz4mkrlqgneuaw4admtxbr6l6o29re4op9nyxpvpt5q1v7sfeyyq20szvwr5v4l22a01quiqb0bmmmn0qom8ujq6i1jw1t2gfbw7x0vb2q8zrxb97kpd5kapbx35l',
                flowComponent: 'csuw7uznvlg8mx7abkpllrkmx39ghpr9dvrulpoztl4faus1he2x97pc59rz7dn15xsn6gknew6qiaowgzb1pjm3qy01qj5gt5mfs1s9k2zqbk2jszj9nb0npaiea1yiqzhh767cvh7olc2p9eaqbh2qoou51quq',
                flowInterfaceName: '1q1lnpy8rhv0eyggidq7mpkyg8atbueyqejlfpahk82e83drigh2us12hmf3wcaxth11kkhxwlx4y44q50s5b9tz3bb6hl9n682lf1ntvv031xlq9ecjcjcl8g3unr11x3thaxzl3pc28o82ui79x58h2dmr6to7',
                flowInterfaceNamespace: 'f1ve0ms1t355wawq4j65sugqw3l62fz7sz86o9fzz5cpu3daz4lu3t9q6jhgdbdjndxxqq7ao63jdslkqtl0wbdtwz6x92fpbunpz9vhgqbuepteid7c9cfp6o1pc2xlyjp1zz3hbn6epcsx7kgqmg1rs4543p7v',
                status: 'SUCCESS',
                detail: 'Consequatur explicabo minima quos eligendi molestiae odit doloremque rerum ut. Debitis harum impedit quod. Dolor non non sed. Natus reprehenderit molestiae.',
                example: 'z8gb8sb5h2hqgpdmy5hh6hkpa96xjx8sr03jmf5m1rkpkub9gcdg7k3jjezzemoa9vp57mww64o4f8htwdtzc3ehsogcmx81ayn0oft0fmph7afp19fwo0nvy01vapw0gze2aol02lp3093ylq8xqwfararq7yel',
                startTimeAt: '2020-07-29 11:11:08',
                direction: 'OUTBOUND',
                errorCategory: 'qnrhlwadrokwbiwcnwwml9txt0eyvqw8rn62w3nnbu7crz2iuu3q9oiuli8guo7u3kxnzthtu59bf8f9429pcz6pvhplq4p23nywlnd7e8jjka38hq1aate37d3jifo1fqhc1vhaogf559esh9sha3khr4edqhj6',
                errorCode: 'xbieeuwat0xstdh67fvzd8okyddvka8ih2wlvfiacar1vmk8s3',
                errorLabel: 933244,
                node: 5754230712,
                protocol: 'yjai9ogpqa8fik0qm1gf',
                qualityOfService: 'wp7jd5qmbwe3kal6gboq',
                receiverParty: 'dvdqespz9loywi0mhi2jitxfn8trx580poh9okmxe9qeysaab08rs033v2tajwuucmdvmz63iz8y0wbj9ilbzjrsl4n9mzh3czed0oznl8vn3t1nx9w64a1hep2n4p2x73jma0tehj75fbbns1w2om4rrjmcoj36',
                receiverComponent: 'ioot4g1mxedyt8mq3mojhzetxbnttryv90um03h0s2gj224jln2a1ctqf6d4dsog5dtkjf49opzyq7buuf75cdcnsy214tlf8uo0v01akrfzkm19qcwmqhazfamgkljvtuhr2p2dajavjt98sq192kas3ljgxgih',
                receiverInterface: 'rn6inwb4ny0xngnmg6idjrwsezpr9twqugqm08asb9l6piwljced0wwe4utj3m1sfqgui7jye09kxpnczhobxlnjdmmbkze5szcno9fp6d2fv6op8ayo7cpvk16juqo00dx9k7p4tulo7fhatsf24h2cju3byqsl',
                receiverInterfaceNamespace: 'xofg86vumpx9ze0o2tcv3xilfseog1kch91hqeordcf1wug0acozphyj5pqmofrg9dbozzdh7sh7wdfnieb2stfovoymeuwyghf0cbhhib2ojwr1561w2fgjzyb6tblljgdr126brvvs8nelpju028mjhwcq802x',
                retries: 9593600936,
                size: 2189363706,
                timesFailed: 6767329215,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'exdmicounfvsxhlxtz7zjylkd7btjhjwvek92jfe7kosm1tm7b',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '7sd9v2wmaepil7y100gk',
                scenario: 'eee0sqwb99u84cv7baadlb229h5m8ig9wp3x99vi5dhg0ffs73g5c6l0tq9e',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:00:42',
                executionMonitoringStartAt: '2020-07-29 13:44:44',
                executionMonitoringEndAt: '2020-07-29 00:08:04',
                flowHash: 'b9pxq0z6e0yhe00yn4xhlt9vxr8rngt3735xptjv',
                flowParty: '3dcn82r6ma7r1uvv3klx4iavbungw0p6s6bbw63vb2icieuz1go6l0ez9sya3ykvo2mynswuuu348z9o8o06vtl0kaf28svpimputb4fgzo57ciq6oy6xwztiatc46bsxeq8r1necaqohs8v3tciprcdgl62kqz6',
                flowComponent: 'rq4wp6cdfd0jb8hmh4thl01an4xptc6vdui36ig7hfg3mxoo8n75qfeegfameq7lu1vm4550gbtgodgf0wousw3yijom5xriq5eugp2wimgjqlm8e2m8l1rvgeulsycvaqmt5wp7ifstykv4zalns12ii1b1rq4f',
                flowInterfaceName: '6pgfmio29lksy116uxnr0h9t8heq6bcktzchv0idkjc4b7jbtoc8ngflaq82ag9yh0sk1415jeqz0t362hgusr2n77q9ozv29k2aa3qve6tclxhtgxmgxaf77jkjzgydhb32gxp0zy673uy5ji227iorm84c8emv',
                flowInterfaceNamespace: 'wyciuso8wloaul2zy7n228i4sjvrd1q5tztlznkyxhl2smw0e6c2xzpe84ybk0obvlqzr8oqp0oryj8tb3d95n96qahccd9k8zh3l1laa4o4wat3nlcy0s1w4xqtdloubt8yw0bw1ntv66mhf0fw8kxi5o89xfet',
                status: 'SUCCESS',
                detail: 'Eveniet eaque tempore modi reiciendis dignissimos reiciendis aperiam sunt. Rerum qui aut ut velit molestias molestias. Ullam ex eaque inventore maiores.',
                example: 'uky6b48b18a31a37n50e150r1cd20rmypw6orjqt57e4frnw6c6rq6spiy2qy6o3icq76ga5t97vze15sgogxdwoqw7vwof3kqlaewuj331nc41kv38xe1k0pa8crrgblqlhgcq67qfs704xe6z9ncx5jl8zbgf7',
                startTimeAt: '2020-07-28 19:18:34',
                direction: 'INBOUND',
                errorCategory: 'ja9yhxs3ls2b7731nb00cewj5zcl9kyfzz42ho063pc44nxq8igy0xhnr802wo2b70q2666p5v0zndvfx6sus2pkbsbrnv61tx8vswydtami1l4822hmjqf5hd67b2aovl1v27ejjen8b9eqkpzhjsr53p6nf8jj',
                errorCode: '51txmgv5hpzc5hwankme9mt26cogaa21c97kknug5n2sua8gmm',
                errorLabel: 485690,
                node: 9176824802,
                protocol: 'ekdspwgzvpwsn68qn4xa',
                qualityOfService: 'vd9njowcvh08d4e6dxkw',
                receiverParty: 'pybb73dyn2b0mzjtgu03ayja0qvqo8dn1bc76gza35t48fkrs1m223fxkjykk3slzzwf1n2pslg8749fncwsdmjs566v7qtdzggvay7byenk92xbxa69y804hdciv1yrgtect6jsv1kn3srg5tyrg95mq42n0f19',
                receiverComponent: 'wndd7rh8vcgl88cl7f052tme29fyy4qv994vka3q4bwe3yhk8ht0dncenbomuebvlhlp1aoqv71ljszsyjh1dfqdnoiuy0k7vi5yu0qec0kzi6ijglfjfdy5etmdue8ua81f3oujncdftski80z0d1giumcwt1cu',
                receiverInterface: '7dd5b5qof9881m677iwuqefrcak5olsd6atrt72fkyirlq6bi3rhlhztlr8x33trytfipmuhoj0jduq25o055sudd94wfzn9jlbr9jpqu5t1fyx12usfawp86l9sbuihp2bzuskaq1dsrp2cfzo0505zkts9t0vj',
                receiverInterfaceNamespace: 'gil2gsy9xyte7jtrgbavqok8pxmkzx2m72gwrl1i9qt4xwqlbsnsvp1ae2r2guizqnb17t7slqqxl2zjyu4anlu03oqq18wj3006kwa891dncv8238jkoed19juin9r0n8sadj2ny4b40xr5y7vyde9u5rlt846x',
                retries: 2648367290,
                size: 2293215152,
                timesFailed: 7639180473,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'hw98pin3ha79fh7t80wmjd4z4a8l8xx8j7hx8e8vqgt08o3v40',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'z0exty9ieh2pcn1gk9i9',
                scenario: 'xt1ox6n35gd7lse8fi0jpmrs4xxbnes1nat5exvm2vp5or5wwklofqtkj19a',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: null,
                executionExecutedAt: '2020-07-29 01:56:27',
                executionMonitoringStartAt: '2020-07-29 11:33:22',
                executionMonitoringEndAt: '2020-07-28 21:01:43',
                flowHash: 'hge306ztol1vxh45d8hnn4oqnvqtad8db631fbta',
                flowParty: 'azihfvde2qvmvtfxu9eurdz1mrlrf18g6ket2r7wyki2kn8vgoelwoxlk4eu7tkuab8c7fsbhgl55gjkx2crvudmmg8nmbqistqzsjxces61afxq2u4nzc7lgor50dunw5kul2cp05m36xx0zimw5ckew0srjzge',
                flowComponent: 'pi0bnm351uueyujn0b37rvl9kmcxy8nzqae9gl7c6s5fr0kf5j3aprmhwc0o5ct5yuy300qxb1dcbmds1posy9a70y2ijvtvhf1psbbpyw2k2l1ovbhyks7xsdvwzq47b4pffyq38vexgz8g175au0wasi3r1llz',
                flowInterfaceName: 'fxdbnyv7bngaegwenixfobcitp0ylshok4t53x2phr8st2qjha0cqv0ae8fm2sceoct3vgf2x2t77gayq8pg4gyxgnj4qoqwor3zsj7sbntlz9hyb8ncugsx59ppeyitzyctiifezvgljzx79qi4sghimdwxmpgm',
                flowInterfaceNamespace: '9egrz9qjzsutyw0xltm2r0kp5jp03534ojx2ghr3tqq3o0i1xrczw17elnf5l30av0kmu6bxjxnuz6lxcs8brh3odll49k8cy7hj6c3n2sesznn247scga1lqkd3e30ryyzxqi4636dg5wou8ulctl7u3l8nrnqh',
                status: 'SUCCESS',
                detail: 'Ut assumenda voluptas eaque exercitationem praesentium dolorem quaerat eos. Doloribus magnam consequuntur corrupti alias alias ut dolores saepe non. Magnam commodi culpa eum. Cumque minima non iste ea tempora eum veniam. Temporibus qui quia.',
                example: 'nglodnvwx1ou7wmxnl176djp4gluqw5nchbsjihiwue5b7hg9cer019r5bdr3rop6643spqr89n39xt5j1qysdmt6mcbnzsy8lhp7cd32ddsd21y6b4xz1x1hxhylzds77lm202gri2xymv94ro0uvrlz9fzxns3',
                startTimeAt: '2020-07-29 02:14:40',
                direction: 'OUTBOUND',
                errorCategory: '7r7gnhst3ogvcy3gka0ne4s2fzsllhnnvhh378iedc6q4x8iublyba07qvtbs3oxii6liaqk0vk56ld16bcekaoo5k84hrpu1mcvxtmt3hovefbgajbsbaxii5j253qngee8cc2xx3sdm3zvmhvanrg8vp4829ja',
                errorCode: '2h5xuserdfx88uuzx2ukhf115ivoav7q9n8ts2nog78jh6o08y',
                errorLabel: 501495,
                node: 2500824252,
                protocol: '6zbvk5i2f45w62ekzxti',
                qualityOfService: 'm49dmqi5woaw3nbr7fst',
                receiverParty: 'vouk33ywhw2ablpn0lj340lsygikohejk61d9ujjqk0fkopxeb1a5uvhhio0oroxz41efhd2rmsv78bjahb4lmle8hrowxiyznsu24j0a2akf26ovq5307sr92d1v9k6bq2cel3onntimuznfhuj7nn8cej70k8r',
                receiverComponent: 'kl1zzfplnp4whfmfvyu5m2pv4r1nq944djqqa4dus1bh19u60vwcte9lecykrzuj2x7tdah0qh1igtgdjch6c5x4t6g8kgx3ccxli2tbohkj2chkggqyjx4dmpubt2nqhaa2thb9lzbxzg8aya702h8nzqaycixu',
                receiverInterface: 'zhds0czmis4li83ql8gkjxeuedykj4w78cv2cmn3n2pkvs5aysv03zpwlz4rcjzrncbovrxionfbwbxifnfd1n4exf8rmzdfwnbgg57ztuvqfkovkvd6nifttcaexyd8kqjumyrfe2p79tht65eaai6rbopijfh9',
                receiverInterfaceNamespace: 'omv3feyfiknq7ivg3tmlgpdvkq3dnxo11e61v0hodmrlxjijh3bg4e0ek7yf8q6p1qn0h9945o43fiu3zzsx8nxsqx1q5u7ygfv5tdi6kmxch3zfoz0rgcmflmc2xaytg04ob8saul2ylsfbk5v1ktw0z8m4l1av',
                retries: 1741659703,
                size: 1425101933,
                timesFailed: 4036486242,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '4y20xnvfpa0tp1aux3euz72hvxslkyr68p5pska0lj0hwhbw92',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'fy8m2ks1nrb43rtdj6gl',
                scenario: 'v8bo59q3w71cgzatq7eutwq06n1ludg3u82xgbkzeym0z06asiayhea8n96l',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                
                executionExecutedAt: '2020-07-29 03:40:45',
                executionMonitoringStartAt: '2020-07-29 02:16:51',
                executionMonitoringEndAt: '2020-07-29 15:18:54',
                flowHash: '4gs6a0esbtsikvvd404tu699xz94enfum0u00qtx',
                flowParty: 'vw2hrnydttmx1yu2fdbaxnd60qb6xrh1pxp9zyp1sohoewa0vidfycjlxln72c5z847n798o5bi0y5stwytfm45dkzi93u8ptrnhfjrnffabznya0pbfw3zav5bvd2jjtr9cygq13g7nlokmsbid1tonrw17vp7e',
                flowComponent: 'p4kwzbw5icc9i90yrj2xbaacdb1bz8epd981geluhm4h2i0yn57evhm9van5z4munzqlt0zsmf0qgjigovp1eklk7vgx7ek61z7hba04vtx847ii6m13ww9v8w35rt15twt75hnfeigsa1mrlx0nuc5zbgr3ha00',
                flowInterfaceName: '71hyw34opmvlc1ch9mewcsbnqzr089rz650eqx7iobx2t7w8qzifd4e04gkz7hndk6cuti3hafpcztptg0sipddd2v7kf9s3z77rw15md5toimqqggo0exn2el1whns0ca4dcamtis4j8o6g0av0f0ssuuy960bo',
                flowInterfaceNamespace: 'grui8x63z848dy1h9hre3g55s9brfg6xcdutj8vgnqq4kzbzgaf6c7jit93qc6rn5j5u6ozgvsq2v2t6dfir2w5luaevsp8lqbe1uk8oyujkzrjd13zl370mahecn221lurzmejwri0i67bo6uv3ezu8jz561ytr',
                status: 'TO_BE_DELIVERED',
                detail: 'Aliquid ea libero minima modi mollitia officiis autem praesentium. In perferendis consequatur aut. Molestiae ut labore quaerat voluptas est et.',
                example: 'wle8yp36hjajoypwkbwjt4zkan7vit6096mh6hbxgej322oh179qlzsul8d2alybhl15vj3ivdg2kqir0wk8aipjpn7mrdt86eyr7p5r5nveoiwxvu9jikrh3zl41edeaoq463y1z9jz50y2ty7fmogw63h9qr1k',
                startTimeAt: '2020-07-29 07:09:50',
                direction: 'OUTBOUND',
                errorCategory: 'vheursfasgg8oaqn05btpmi3t1c0bnogr0u4zljnz8zq8440539ce8xbnskt2ytd7mgybctda3rer46lx99d412uq5yi92ykcuit5ivlczm3vmrjbto4f50n2yl76xbnfw2vgkyei5kqi3idvb6u4i0y2hwzh7ul',
                errorCode: 'kmit3tw2x7s8ef1ap59gq5n1vr5dw8klpqq0zlmycek20ta0rn',
                errorLabel: 782933,
                node: 6052490117,
                protocol: 'wi0y80893x0j7j394ry4',
                qualityOfService: 'fiznc7ohau3cwji0u5ew',
                receiverParty: 'tavdd4oy2zxyjutamzrqth4aim9bofr9vbj9zif61g33f0b3ohbe0q1u5tehi3f74n69c8hwfw8tu2q0f8jjrx5ymp483t39ibvohz4nc9r8bylxwjtn27hg3ffzf77hj5pb88t3uldim40i94hdmmk2ir45yhjw',
                receiverComponent: 'toa17sb8g24evewfc74f1iutj4rihdh5mozdb3etp9v60upvbq96stg50sumwq6d62eeco383ro0dyyjzgwtkllpq1nj5wo9omnu8c1uazzpnxci8ndx3x7z9o1vpgh0s0f6vrgtgljguz9hbbo3ck8ohdc0y26e',
                receiverInterface: '9xlaay7xcqhmd0325qmnqczl781pdb0ibfbdmp0t9aj28w3o8zgo2lazk5p28qhtq902t6bu87zg4pr2fh76xvhd2tfghc8zkfy532hyjm9k720j4dzdwvvvhkjbjppz38f7ooxvyyxszbf3wzj4spuv47v9pv60',
                receiverInterfaceNamespace: 'vt1suu683grjqm9583pwf0x3liotu7gzsndknpqfupnlb556ebfu9q9jcvfhd27xs92bsmd4y3bdlmkngjf8milps8lqkbebs4b4dcgi5oll3si7esu5bd244iyeist3j1kcgn0se9z43yeuohrfycv4hq30q5cl',
                retries: 5519086387,
                size: 2198992680,
                timesFailed: 7163552222,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'ue57qbedoqn6vfizwxtr53wx6z4r87ujxtesvdqc8rtmso988x',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 't3nggnou5q0d70dkj2tu',
                scenario: 'tiy7im7zgux02d4wksii9cwiu9hk8ajypuaowbdibddr0h3icjy9oxkaineo',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 20:21:38',
                executionMonitoringEndAt: '2020-07-29 02:19:04',
                flowHash: '9cspun29555eorvsndrfboeoixdtonuuvgq323vq',
                flowParty: 'dj27o7jfvi8rq7ohs713eljv5t53sqzxw5re5hx38x2ybpqmmira6kuy1g1eb7lq67cv5coa9p43r7tnijwknrj2ona8yfbwfwl7jlslv5mhld1cyn26yx47bh0kcudq22muh6ks46n75cdsoupgn71rtdgsv2dg',
                flowComponent: 'wxmvu21k29dw69kvoc5p8swb40kdaarbq1ker3bovsjeeah5pp3dleyfk021hhtp4amk5079q4n6vq0fti51ykx5aezeu9rk2kz8y9pamk444ns232ncjwq2ozwamyvfr2nxujr4v32xi3ueq8zlpa51j2jl66oi',
                flowInterfaceName: '93hudkhvxkvab62cxjelzohsl6ducboizw8w361hmdx7t7vfxyrx1uck27n40y9mc177zs5kavdf46wq4t0hpoemz6qjgayx6y3jpzbd4z04qfoohfjwzeny1fnxw1mzznzxd3jzw5698n0psq8f0trdqy6odtuu',
                flowInterfaceNamespace: '965qvvc1kc2u43imfsk1hzdduo8xkwuue8xs4i461bxdeqbze2we408dvo8kri2p352hais34yylddbpit11q76w99r0sgh4zg9vdo3hirfskmlg7c1w8a1hz63wjwik9pasqi8a0y37p4lj217rvzvcw49mhet4',
                status: 'HOLDING',
                detail: 'Dolorem voluptate aut cum. Sunt qui dicta at et enim. Eos et labore qui quis molestiae. Saepe omnis quasi omnis labore quam porro et. Ut voluptas consequatur quas aut perferendis.',
                example: 'd3ygp5zrmhsn7tx5pr3y6hv5dee6pav3t42fpjfssmyb4fmh2tt4w5oqtb3yv8wpsy0b968nvh4lsmlqp4z4jczfcc63oanoeajudfmyj7mq2znb3z338mbhsp6jk40co6wtxqd397khzz0hcoitcqmh7jp40avy',
                startTimeAt: '2020-07-28 20:29:09',
                direction: 'OUTBOUND',
                errorCategory: 'uzz5hp2hpctz4gol5tq859229u4qceuubmi5wz0ocml14u4l5on0owym9mu4ptjy4qkcjpog20vnkexwz3yrm5p3018eo0azepkry13vrqbcvrjpule16cpxibufk42wrqj72ubuy2t97vz401ypbkt4ae8zciqm',
                errorCode: 'wg06lpfejiac6fwg9p703ef3qer0n4bs77asy2b7s83ck21nhd',
                errorLabel: 412817,
                node: 3407828480,
                protocol: 'tue9gaoujyqlgrvwzwws',
                qualityOfService: '5vr2hxikjnvx7y29pnw2',
                receiverParty: 'uy9uxsyyrredpa8af4962o5xremm8gglf427bctso2w4l63ow06usmh1yuzqtjl2uekw0mz5c8fhyhk3bp0tsh4ni0s4og2q7dqgavq7nqlz6g0jekh2hz102xt7ozk85ug2ms0joenqxn4cqh3l99r2iujlb7o7',
                receiverComponent: 't4e4n4log25j7b5uxe6et6eka539uv8ioabg76cseuua38nsqjkvplya44xslayvgo7mqd5sbg2g7axqnh9ii72em5g2lgw00vngybayf8qjchqznkctta1phkl3v2s6ymqzsm7m8icjwjyezxwshaagnn17cyez',
                receiverInterface: 'i9faw1s3yiudom1nc3t65bejczdn6rnrylxrh76hznl4x9cp31n33lc1m088rwcryugkkt1lk1rgwrg3qe1qanpxblueiftsovmwwnky1ypnz9zox6hq4rrtdvtxesrcq65z7p2xr9rz4icbfabtd2fwn2uy0ftg',
                receiverInterfaceNamespace: 'y9kjbgqx3vsyob03q0sd0nvxt0bzusvbblq1v21q1xmvy0pbc7pilnwux8sxkrq5zcjmnid9ktngqt67h74na2srbgv19xzwyak0n1mbx55jgam6y9y6jhv0w8pme2wy2igwz24jruw1n9rmljxpw6t7y183x22h',
                retries: 7728847713,
                size: 6711648600,
                timesFailed: 6348061403,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'hacvg9ethb6rxyhtnd6jrsmizh2hx647ulplikuz5sp4vf6fqn',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'gcb7dz8olwh1cruk0qlf',
                scenario: 'w99z4p53x5do1jbg8vxerw8awvmvg66ozhg1ev35nieqd1fcktmyfe2jvrda',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 15:11:42',
                executionMonitoringEndAt: '2020-07-29 09:28:43',
                flowHash: 'byeaelzekrv6r97j0rcdn7iac1x125fcwghz4a99',
                flowParty: 'vvv7n63c2xuhzukzosgw5rtepwkun6fkups5560m3rvatmbzgakz68iriwsu830vu7x2bp8lj73dhly8in61gisfonpf67hv08vuxftkoeq9u7qltmnsxor9tas5wh8pkhk2fhu5k1um821h2cgzkig84keaa3ao',
                flowComponent: 'ehd24dp5m13p75dseew5ucon913m0jfd2fsh60jlmot4crchaaswwdov2fl1i2kwi6vmmx0iklborb1606xrhjsajg7jxuxx0nkub4v7u7z5wnnraxajdru5m6m06tr1nzow4cceypii7ndhxiayirjs0fx64qcm',
                flowInterfaceName: 'l8amnih1uybc91wzc4wp0lceytr67z7i888e1mvw10zi4ez4pot9g1b98ruqm2gtcdix8hxx4hvn44f9rgh6zzpv89bdv9wsovjz5tq148ivbqdyz03vkqf7pzvwulq7btr7fjj5zjh12ywvlcieevks0v5n7uzq',
                flowInterfaceNamespace: 'db4dcip4t1nfuyl79lw1ck0tn7oxelyyozvsa49dyhqitxqlhq4fs62voif5qhol44w0lzluuesh5xoexbd51ih2sb4q1jit2pg1b3zm400nfaf2yimwi7obwzicvx3vczrqh28vi594xo8b8h2nw1a0wi97f0a7',
                status: 'ERROR',
                detail: 'Sapiente illum cumque quam voluptatem rerum necessitatibus eum a. Id debitis qui consequatur odio dolorem sit aspernatur cumque sunt. Dolor nostrum quis magni sed. Qui aut alias non quisquam nihil in.',
                example: 'ys3dptwfrllx6cdkqj1sh1ti7firwd8gx354uvc1ofbz3jf4u0fsh2xseo5tkg9p1zoejinb9r44oku5ch1k7f8necjzvdgdw6za6g009kl8cksqv5sna94g4x0x7qyafup46c829tzpkp3107hi3fahp7lqpvio',
                startTimeAt: '2020-07-29 13:12:38',
                direction: 'INBOUND',
                errorCategory: 'ns2c8lzv51zzam4873z45zca9yshbmlyselsihave05n1s5lrvm8ljg6t0h7hylrbkjmi2svxg2p7ks1825q1q8tedtf7uo2ih94vrksvyib0hi7tl8l2k9k13p389pdb55yid7b1g1t65hf5l5r62b0889t7q2v',
                errorCode: 'o9m4px281g5c4bp3mw34ekbp88h1cxfofpmditfd9ni9szqbtr',
                errorLabel: 683789,
                node: 7051944546,
                protocol: 'sntzmwzw5sqi74k505q9',
                qualityOfService: '2b3lrodhrciss97jf6uh',
                receiverParty: 'vbji59twisfbies8zirc1fx5hpwj0lv0uprnk0ckzyoxz5jepuk3qo8tlhauvh1j1pqfllkv0tarfb5abhxnghph9ggmy4asr9e6w91dm5uc4ksl1lq4bwh1g9gbv7yqahm29lif0h7qey1vc6dkjgspislki2da',
                receiverComponent: 'w57a5hhohxfrlqyzd0xgph8ic49gadu1ao4gd45xi6lk5oh7gtp1vb6dxelkat8i5i9tkzd4i3z7a5uelslbyqeovd28md91ypshk1zt3fyarvn43fnqipfoxexojmp2eear2ex4t1oxqtfy809opmqyin7ffri0',
                receiverInterface: 's0eas0e3k2n4c5d5l8zlbbgu0r44cqum2ivjh8wrufcxofnuv0zaudrxqjf5zjklk8d2nzmpl4hs99xshdayfdj2q1224cs6zc6m55q3c8plp94449dca9itqv0g77hnmvh0ocnr7svi7g6gzfxst2xt9x1fz8do',
                receiverInterfaceNamespace: 'l8khodrlhs3xnh4my1fpy5hpiyglgiuhfeqt9xzalkkyd0ozctlv84cgwojs1xtpqlggw5tg87uf0otjibv6zkvjy1fn7i9qsx0cc8r6ltyculkfse1rlf66e6cumfend01ez7tjwwq3go4982sdf7v01q2711y7',
                retries: 6318714920,
                size: 1911310698,
                timesFailed: 4829435820,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'g9btangvgmo0qw5p7h9j44mmakqyrezsjflwffab2w919z8758',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'qcvykw9srkai6wagk2tr',
                scenario: 'zj7iryxjfid2b5nwie6u6osdtew6n3lvclc9r6gwqca9m832nxejjkczuljb',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:29:34',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 23:31:10',
                flowHash: 'z0luu9bcswbtp0smxn4hw9ypr50y70fr8sfnw37u',
                flowParty: 'boa6selkhtanhtkn68ez3omosxgr0kxhcs8m88ospo4w8urx0i90sp8sfuwrhdn67zxshx25jymlm89p34xuw47d8ciu9jyke51lie2ixnpkf1u4dyguzgncvqtuqr8iostl34q99ry1ufnbr2u4n5wa0c8mpd4z',
                flowComponent: '43ybiwv730nf8lcpsi4n35mcudzr3nvg6cu2pso9xusvpduozc50amp14znzl2hmnbxtymlt74j1vlindt7kjodd6kwyh4234617wioui1y5d5ojltxiqfl5owu1ybpg0b6ycswj0y8u1chgjizbk6jrdbtx7ylr',
                flowInterfaceName: 'dl7uzir637y5s33dr89kp9qijzp3tzdwurrca8cpzahw84n7a21nzjufr4k2qlr3v3pdq0vbgum18pkad31pcfsh47jn9a3a8trjvmm763stpopm29oztaepmbdvtnoko61gzyauf375h3lzn7aftmpo5uuttup9',
                flowInterfaceNamespace: 'qt5k7115kjbvk9oplmvevmgebnp9ldo9vr6d8z79d4ktkomzyr7a46tzbo2hluom15xcu10ylmzwlazhzdtrd9i2srzimqqn56jvonf5046h0ib581tgedcm4yt2ljrd09k5uiltn1a41rw9yig7xjw0hexkv8ep',
                status: 'SUCCESS',
                detail: 'Voluptatem eligendi voluptas voluptatem. Molestiae velit vel. Debitis illo explicabo. Eos rerum et doloribus sunt rem. Non esse accusantium.',
                example: 'as4phslkt0m6r83dhbjy6ena4oufiqmc5wuj2bbtrxjb85w0a4sweknyfzjz68go99z3widzwfl06posiy70u315gqybjhz41p0fgqr0qxibmrnt53y1479fbwodxde350iwjhjrsemwky83bnrk1kutgesrkz00',
                startTimeAt: '2020-07-28 21:06:57',
                direction: 'OUTBOUND',
                errorCategory: 'm6cd1fzq2upi5kbttbmdiharo69rfmix0hd1msxokjj6sj7wrjpbtjp7nhx3ft68f97azd49e7z2y8cliz76wn1n6fcoohx5npvvk66tky2o4wvxof6tnbviht7vohqfeiko6awakrqa9vus3n996ki69gpsrqxe',
                errorCode: 'c1r607pffxnb0bnikgt3rcm1zcb28okv9balnwsp27jeyns0ue',
                errorLabel: 798638,
                node: 6804401582,
                protocol: 'cjd57dhgoktf9rqtf7r5',
                qualityOfService: 'jcx2lkickmity8835qal',
                receiverParty: '8gp9avr2pjkmhd1jn0mhllca7g5lgoeecgexip2rws27eb4lmjkol2mxii3bt7blf9t11gg5x4rpa4fqqphh8qz0czlas8rlk6ykrmddckeqm0lkcpzeuwlvgm8waxr0l7abeszqw5ajyu1te0lxrxjhz41lsb02',
                receiverComponent: 'qiounfc828z9lnlxhbn45qd8er7psnd01e99vd1od1i2uffrnp28xrdzn7g63bfnf1op99xujo1qivusn12duwn7si1j4zhsqrptmr9jd4c8nqqujlbvn5rwswssilxhna5yhezo7rr6574zrkzpjgby8eltskxv',
                receiverInterface: 'tuhs1ftk4qssifbo0u02crwewyd1r4iqspwdr74d6r0kj1vev9h1jsiz9dofevgq5mwt9i6740p3eisdfgp8mkce2mmk3110svujl11luzg0jmkigwkfghgo66dtde01i6fo5vj7uq8mogzm71eu6cyl90kb8ww3',
                receiverInterfaceNamespace: 'zpbppstm143rlmbqco6dr5xwxv3aqpcodm6fiwzwltt7gxk3sqqwnttwx7r9zxpyz56uutlqbeswzmu2m0xub8xkkk8h1q0uv5dapptsdm7k24hykoo93skwx8ycsgzrmwd9uobe9jfpg32ytrogbkj8o489p01h',
                retries: 7090418847,
                size: 3399642906,
                timesFailed: 4428725393,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '1tg0x3sxmn1yir3u9j11tfj9w39l7uiuu0sd4w7q08jphs24qv',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'mrzvtwhdfb3paq91v08y',
                scenario: 'cpt4ushauhkez3r1l9v63qktgddmftfh3bphi1n70so1fqjduaeg59ja3ar2',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:59:09',
                
                executionMonitoringEndAt: '2020-07-29 06:05:22',
                flowHash: 'a12rfits503xln9l5ysjxnfj801jpqbdi37o28p4',
                flowParty: '1seoiuxvwxdgafuyf170qwnn7vgym15565hsa6y6wtwunbxa3hgc6v16nhejgvl2mguuwp2wxo6r7aof0sngt0t15q6f80g86lsgc8qnhj0ltdwxi1y31qvynvofhtpryyul66gxukmbrilk0v48wkm60hwag1n5',
                flowComponent: '590q6kstr52ocfyvlvvfhwgsf2b47n9ulv0ycmr4n5yond35oxvruvceli67unhmwhqmafh9it65wwwbw8dhe91xkyrlqiu2qrkj9bnjy5tolfnfqx4ymapkkgo4k51e0wlzr4tjww04juwomppb7zkk6psnq0zr',
                flowInterfaceName: 'a1x6ueibh2nnj71fw281p3r4f9s7ykgcrifyp31r227qee6fn2ysxle9u9l15hqpg3bm6w43odrjkv10slzocdaxy4di8hwhcfxohywwhm2aa1bgpbx6bjscfpyv97acl71hsk1fugo33scfec7efgvr62dy8g0x',
                flowInterfaceNamespace: 'b1v3baa9zqhri7u8v8xzc1vkmucx3ow59jdrksog0f9s7fj8rcveviv9zgqlxmv4gdcklg2m7g94bxlgejeyqjujw54meyhn36op7tz1wk2ljlt153nevb6ksng2x4myo519gb9twqabnl4o7ybgxsr7wphqorj7',
                status: 'SUCCESS',
                detail: 'Eligendi facere fuga sit iste aut laboriosam corporis. Omnis voluptatem ipsa officia perspiciatis assumenda. Incidunt accusamus molestiae vel labore delectus.',
                example: 'ik7a3dmwp8u82v8rgvmtge5wqhuepvvsv736fere3tgsyf8sogwjnmq2ml9nbnmynofga8g64h8ekh4f1vb5gjm19m39xi2oe8rq0xm8tcdwrlvfvbqoo2ly0pgx19b974cr9yfr1j3eplp3j3l10knycogipj2o',
                startTimeAt: '2020-07-29 09:16:43',
                direction: 'OUTBOUND',
                errorCategory: '9xbmbtq9n8gzit4qsixumw0pivykqvshocpor3253r8usqy29u6lk2ll3ee6io3n83bch11hq33vctgzlzsb8q3ry5fi0dtm3xl5gpgulx6gq35v95qpl2xc31rcsqry7ssepmesy4vglelfasz3jiczrcqiy27w',
                errorCode: 'szyvu4860g0btvw7qx79563cev6vp6v4rvwgsmuj9vw36t5ox0',
                errorLabel: 109761,
                node: 1037458460,
                protocol: '1f5f1wvmh6dgoumd58kk',
                qualityOfService: 'yzk20yq9xm580u1ob53m',
                receiverParty: 'cprgekddmnn4xke2aw634zou1vd7uxv56415731o24w716oexlsn3rzcdgqc8b29g1m2g1587e5ofsv2ke0okalsjfk72gduye6h647p3q3f3mgq9k586kjmi76fq0sojtr3dpi4dmehxoy2g2d04yl3ntsu4g7p',
                receiverComponent: 'sg0id825cx2zp6d3jou4twyve4cwskfs320gov1injd4zf46xq7e4jzomg32p5b2tmufc91mc8h8syx3uoy9t7dp5dmf7elu6sok3ogc3j01jzc54d0108gr4qhs9f5tz0ocxasjdw6768p6fn45kuuf98zc9ku0',
                receiverInterface: '04qisyo98134mqantshdm50vcagu1ceqgt3ffbxrt46aryjlgjbvgj0t240rd723a5ou1tmr7ozpc1enngm3x0oa7dy9b5gc3efts0a8yui3zmzxcxhgca9mnux3k3ptcnlda6oldfkfolqe991swc0tf3ocgn5b',
                receiverInterfaceNamespace: 'zpgq4uqkly5ewri1g6c6rseo2sh5y4xcuptg1gx5jztbgflpw6s2gwpikule4cy03aomg1co1flzwiaqicriumnn84hpkizassdmekrwf1nsbelfytryf8f775d8yz729xqzjn7zcdwjzjtrxu8p14wk6oerf9mn',
                retries: 7063853046,
                size: 4736897349,
                timesFailed: 5474404993,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '49n8fuglgnvb47gcrvrvguobhvu3h0dgubx722pv8ttljhmy3i',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '23ti74ii43a0na113jhx',
                scenario: '2igxmzbjw5lblhiert7gi5r0b7t6iz8mtjxbdon0pcwrnaufp1k8lbw7wmew',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:36:30',
                executionMonitoringStartAt: '2020-07-29 14:37:42',
                executionMonitoringEndAt: null,
                flowHash: 'bra0rb7qoliu6m82fl8wc2qkzzyz1fdhwqy1taql',
                flowParty: 'tvaggczkjh4robv5bb4cgyc3i4bqe6sfh37qzc04g331ebr2pc1v5yyxsscq6m2wrfkyov3gdiu8ea40ht79c2vicuf1nk47314cimj2zbt46zkq3isfa24o8k94klnywrcr2u40h0fgzigg99q646tp8cp9nqup',
                flowComponent: 'nrda3ee9o73txbbv0nctl3hm2n5um704k7mbv4nql3iwnxty3k0u06uahu0wdj7ei85966qeqp5st0qbckmmfyz59akris46g6zwc7tfefgk9rd2g0cjyz3qbcnfd7b2w7p59rshvak7e821oyx7y3nyt9golzpd',
                flowInterfaceName: 'sg3ltqywtu7czxtmdkfqx5peeiz269vu55itlbjdba5rd0e10r4ponnb925ttzi76l8psdj2anaqesz2sqfz634y3k2s9trvj8bxmcwv1mhewo9lh7e62prj4dgi2d5kjwqua65khswmg7shfpc6j6h8n3m8u8v9',
                flowInterfaceNamespace: 'bm9l1razgkhy5c7ee2chwdryduurcp3mcp5zr9spi0m3cmqxtdjxa51zi88qxfgj3mzbec5hs0hmw676vojxeu6iu4wuoryg4pca0aiyjd46k8lehfkafj7gwrfynqs7l9n4l3zek8o6e89lj7nzn0m3xh44ik4e',
                status: 'ERROR',
                detail: 'Alias deserunt reiciendis minus error dignissimos officiis nihil dolores. Tenetur commodi est omnis optio qui. Iure eos magnam quidem et quis illo doloremque qui nihil. Voluptatem eum architecto veniam.',
                example: 'y56jr29itq4yyi4edzzlgquhcm45nwipiq334m64gh0106yy7k4nridcm51x5q3ryfe3yor1jms3uwk00v6s5rmlw7asyqm5oce59bii0p2hmqgjwzg7uacq46hn7ykgu81p33vs33jcxenfxi4r10i9fj97jgq0',
                startTimeAt: '2020-07-29 10:19:55',
                direction: 'OUTBOUND',
                errorCategory: 'axpurt62334qqvwkhgybv1mxq85o06jocw9ssndkyx6a9ex081xfjjoin2ripez7jix6957ptfcussaiwdgoj6ja6n7vxin9tes8ghg766o7gnf3voz1zf9latjxb8btl71fbc9kre73sbwt467wbh4h95zfbtx2',
                errorCode: '4js9ry3ujnau3zvfv2n75jwvmklvbaqlp6rlvlujjpobdcf2xn',
                errorLabel: 698976,
                node: 8926288243,
                protocol: 'nc9amsafy1d3wexezqp4',
                qualityOfService: 'z37sx0lrh09d0uz9qdey',
                receiverParty: 'mv5kd0p9dxsac1q0t8xydg2ifgxhnolptzkmsx4uisbhxb67986aqviu5kf7dcifhfcoq1dmbr8t8vfhqafwptq60kzagxqes35l052qnhr3ehbwhpuv9kvebvc1vh912lgtlvwkmyyr68stskwiarv6ur0vlmu0',
                receiverComponent: 'd8y5hdqbg3hoyon29mne7thdxrmaksgke1bbqnrwip6um9pajy7xbxsnrz3sub6bssmsrm1k4lm5yz247hza9uosqmbalu7to3r5sx7ggiveoyassdy2q7w1ifh0ofxuj7ms61odun794dg8ox2vrspxb08hk3mp',
                receiverInterface: '6dzcrmgmiuwocdh3a0ufh9lkaek2ssgwzlerqj34jwn6gk2s53h0mqwuiiyobkyma1kjwjcohi9379qznw6lfaao9bofkqcv0nkk6f81ereimevp85jp1horevrqkfg41ne01pfnjw22e1cec877ngcns37741g0',
                receiverInterfaceNamespace: '2qw0jv2hx6wyq896m6o4mzx5graxq9ocofz9w01utoeiyk42ixclesufujzydkhnlcdkcp0g3js8xzxv8diah03s1tkb8u3ze80heu1ibbm7t4187kfutysbj67i9h8domykcmtrh4sk7dwv09zpgp1gtdutpmhp',
                retries: 2430668175,
                size: 3420927043,
                timesFailed: 8780488279,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'np2z5d00fuvcja67p6nn2okb7pzhs48gs2sxp6290aswxxtj01',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'wfbn7yxuyo5ejbhm97xh',
                scenario: 'b42jrhpijmsw0lguymxm2ie5ezprycyc5afuoxx8vz01yb1o323xq07dbsvm',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:38:15',
                executionMonitoringStartAt: '2020-07-29 08:04:50',
                
                flowHash: 'bbfpihofw0fuigio71q6qxokh12navvybg29rxef',
                flowParty: 'p0dqre0ag9px0gwuabtno25daecvjmq2wwalmy85kp922qzpcwrlyhysil6rv41xtmic0m5x0djyd60nxtqnejhzdxwy3yb7awnb7mr4cbudyfjetgyb58973k207i6z90584dfvrkvghaabd4etimc1h89jhczh',
                flowComponent: 'wriytpiq2flbzsjzaigl7xdromdh88ftd9skpp1hhnxq6tlpvv1apuur5qw7lsgxc4n2esszxb766cqqxbcj8ys7phz0zf8p9w4ab7bg855y2fim47w5acep06wkip1mvh9lekzlof2crwpnmdstef85i8r3se34',
                flowInterfaceName: '994on7p2t64o0muk8qrlsk9uvuxn94jionkbru4vjl099jkfi1x5ax4xhalcb2uqa7lfk27wpnelzpk3rendlwq51apixtyx5l7vqvf2qammww9bhw4avufmgglep7cigzi1q33g6i9zpksob07hudpwcj9ybkzl',
                flowInterfaceNamespace: 'l1d0wxnfbcnorwfu4f13ug7d1k9lpqsjfgyu3v3sy0yc1zqn994nqeuacggf54e80e3462qtxq4h1qxtt3bxwq6k95lyvxt9iicpdxq7fsispv4uqpzdldajcrx9k9vj42cl1xawz1qgxyb3vp2i2bbw11gbkoa7',
                status: 'HOLDING',
                detail: 'Deleniti id quidem enim voluptates repudiandae minus hic vel. Dignissimos quasi ullam praesentium impedit excepturi. Eveniet sapiente dolorem consequatur. Dolores dolor officiis rerum placeat nisi beatae minus consectetur. Eaque quos in consectetur culpa recusandae animi.',
                example: 'sl8d2ukiizsgbr6elpqcnjkoegqp82o5wwt1souy22nwkcqx8s15kw96ya318v22gxoig96nydb90ha7djb9o9kpfmdpv3uee26k08t1fid4dmttzzqqxmlgtor3cdh8e7446edo3kc9jgfcwu1j65uffbn5s8ro',
                startTimeAt: '2020-07-29 13:59:37',
                direction: 'INBOUND',
                errorCategory: 'lcjbasut4gyt1ica1azdy317942fd3f9wejyra9bu4k7rde0x4h0t0pe2x10pkho7lj5sj3pqz9fuyqgwzo73r2svlbcxlwl0sm3u5bf38ez9z5y17isbnuv435babuk48qzkiop9wguvmwym0x5a9kpwjzflix4',
                errorCode: 'x09iy5lftma805hss99vwoqwp36v8jva84g9lv3elvsvpe2uur',
                errorLabel: 958748,
                node: 1063722526,
                protocol: 'xoxwfe7tvuwmy0pupxne',
                qualityOfService: 'snbhuax1e3w6uvbq9n0b',
                receiverParty: 'ey3a4w50vrf1pzo2vv5dbcg1vtmuptpue5ufck5yxi2q04i3nj7g3ewgz908wlqnfw7u00zs3vfo21fs12qufz4na01q62n1lg42qhyy4htv1jna17mgbu4aafjlhqkvoyjxc0kgyi1umsw3hmacqpp07qc0e9nd',
                receiverComponent: 'lr5j1tnb33v6hz521r8z5zsg25o4zpc3g155mt497pu2c4aoq4p7dymd9ltbni6i2xzovy5yoxqp2x0h7q9g65kj2qe6seshtoenx02fbyejg8a0kfwnv31h6zm58yl0khp5osk7otap6uz8nfx2k8vpw1vjzal7',
                receiverInterface: '8hxc6wd9qbvnip52t76eq7zz2r9tbfpdttynsinxmlri13e77zjelmob5dhrax0c1dtj0ozsc9zapfkyfopaccwlpiljqxs1v0zpj60kfju1mghr27w13ibgqlq717z2i909vebbb79za5pqako75dseld0pbs81',
                receiverInterfaceNamespace: '81tt83kk5zv37kan1q6213b2idjvyg3qz0ihfjz9d5wjak6t67cha9e8ig49nkgky4ixi65kji190i637215u6l9aqb4o5oxsv7pf8xfe9lgtno38f24luhnqnnqesqcl9cv5d1va0zi273z7bnpeo64966ngrz3',
                retries: 1432843063,
                size: 8301025250,
                timesFailed: 7156258086,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'n8svuuthw6syj9tcnl4j52cc0b0rezxa246awyaib6j459rg6n',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '1ylerlbp783buy8zxno0',
                scenario: 'ozbu87hgr5b01mbglnoawwn5z688gn1dm3ewqz5stix0cfx6uqp6rz4b59o7',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:51:35',
                executionMonitoringStartAt: '2020-07-29 09:22:33',
                executionMonitoringEndAt: '2020-07-29 07:06:10',
                flowHash: null,
                flowParty: 't99sx5ddp616xuhu5a262q7u2960gjckbgioy5csjjj39s64lyxb2zty2lyxaah16ggcedyumepa0x7hhuulkluj15ve632xvno1u6l2asr71hzietfw1gip9ly4bibl5vzzmb6ej3xrynv5nq5cybtgqr6qmfwn',
                flowComponent: '98q4ncv321dr20935ps3ikaxxf9uo19mvjkbif0025zglhlbtg5icau52lytam9debblr1bbyn22yk9rxv9e2h225kvr9v7vvh484nhgeg4xpf9x0rk4yd9ncfa0bjfc95iebv3iyfzj8xi9sroqd2x0c47m0lr7',
                flowInterfaceName: 'vid7nb57u51sywgsrt6jc6odtymitah3mf50l0ewamv653cvrzizt3w3vntuy8b8j7dne61sxb26dvn88x6bnmnonjw7k5zqe8cfuwde7o5pr8foet44p7dowm2k6krcgoy3k8e3vahacn32qlfny901e9a1bva1',
                flowInterfaceNamespace: 'i35eq741pk1071avgbw934s47rdxn4ymktyvne1xxc3lva1ahynm5r9xjlgf8cb31b73k54pq19pcbjc7cuvvcbrnyakjc6np7b52kgrfdserjjqriofi635rfp7gtwgwz6jwz1ei1ihkwrk6pqnlsscwwcuw3gn',
                status: 'DELIVERING',
                detail: 'Amet aut sunt quia hic a adipisci. Nisi atque quis non. Nobis autem sit aliquam est excepturi.',
                example: 'rjxcwf43dyko3lt7ytqnx3pp0dopf49bo3mttpcrw170pufqpd5v5kz13g8kte4arf70i8xpkp2l5zvspv2zfzfppax38okzelcy2f5nzbxxb1y1xje2ntrvck3hlbdk51jhipw9x0hjmd2tpf3fcymczdc1vfb9',
                startTimeAt: '2020-07-28 18:19:52',
                direction: 'OUTBOUND',
                errorCategory: 'e6et8u8lzgk5co3tusvbdzifuli5zk5cghrgjr4a134jras3smt5lu7ojra13040alrzdc8lvwr80n597emtkix6gczh006jdcks0v7827jro6jncq5subds0dk9kqufazu8v7epzt560rgwuyfofhylpr9nx6pa',
                errorCode: 'brzxfetlrzpu9qr6anmxrvvw7w0jay3y16boih7r4mkvj0jwsg',
                errorLabel: 293448,
                node: 7271327739,
                protocol: '9eqic5rrfqdcc3689o8i',
                qualityOfService: '5kscpro61stfiv4jwba5',
                receiverParty: 'g2abo5y1mf7d6v02nj3j9859qmbp04hvnr11qh9sor81m2mb5nz8udy1rhh821rxbih1pozug5m31jbrz0y68uyt58xpbzlm53iglujv6a28qakaepho8tql5tfr60u0o3yfgljo45rbg6tuthouikbl4hw4zfyr',
                receiverComponent: 'bfbb43ovge41jg0yfr4she1cj89s94u9p71u08b9f3lhbbuuz5b2n54borw8o2xkx0y6xw168ixupwugblune848d68z4er93vyik03aqitmp0py8fzwrrae5ltkx1xjij25pf2sq3qvybn3tv6r6xqaw0od0hfv',
                receiverInterface: 'i8a4u6dh72euiw30jxljibg4vsp71saiqpaewdtiq6m0ogft7ith82q171nesay6hg76s1604s6g9vyswn11390e6l7uzljnpl1upqqfnl5gswx1on3hg2zc7df6i8ajbfufcj0umes9f8b7whdauwz069ucc1d6',
                receiverInterfaceNamespace: 'hj3vqineyqe2q8oczz8tah180nkpowkg5j1tivblz46h7s0j7m5imahuzbpnctunl1x220hjj9euob4ht4n2snmhixcddbeaq03s8ti3n1nglfke0u6op2cisxbk62um0max03ydrxpf4w3yc1zpm9r8h6wiqcdm',
                retries: 3475024206,
                size: 6667470454,
                timesFailed: 7044809054,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '83jqn55o0ys06vpagzz97j30a4f7sx1szs3fek82yoczohkhek',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '1f2w412yw1fkz92ysbuf',
                scenario: 'jvtjdxcy9xz9kyy0gi6iz2brbde0jra83xp6lytmbsbjbfbw0t0bnwi1soms',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:32:05',
                executionMonitoringStartAt: '2020-07-28 17:31:43',
                executionMonitoringEndAt: '2020-07-28 16:52:56',
                
                flowParty: '0p70kf9gx9lmiqivn8f6q3m4fenp2ffobjcmrynmh7d393rjznp625294yigleicisisyzm0y704gl3nix5to0drv9pijkeuyr21htqc8qtxnbdni63jdvaox9a17p91oip4nnbchge30h71otkldc9pr5xtrbjn',
                flowComponent: 'q6a0rpex6ouv0pncsfk72sbc7jmnrmfgxib1r9uuetooxpeugj3t46q4f7wkfau0wxqdlbb27lfhfmvhtaiuvm2d1huf1asl34e4bn0wlqy8c84n3elbf0zpl6do2s4jhoqgk9srcdmr9vjq77ltz32h9o5n1udb',
                flowInterfaceName: 'i4296l7yxcswdxqezakgwtjj140pxd1brtbx7k6v0o4ga83kwqm1pke8qdsy6udsbva345w7ir3skgo22j9ixfpro0w5kkdxpvzbml70upumfyx0ap8ta7hwvu75noavoj2rpo3ohdi3268yp13mpt56elui13y4',
                flowInterfaceNamespace: 'tevhvg682zrfn9mpafavc8avn8zhrjxy3e09kntoc4mwa5guzivstdimv6mwaatz5ijjdihw1i5ji70nnwb2dp3q3guezdzfaqlg8xrjovq5hejt95oooyqtbz0sank7tgpp0aj41a68zo0y2yv90sq351z79t88',
                status: 'DELIVERING',
                detail: 'Id quis voluptas est culpa adipisci saepe aut error voluptas. Et dolor accusantium perspiciatis at libero. Deleniti fugiat maiores molestias temporibus debitis esse vitae cupiditate molestiae. Est qui doloremque. Dolorem soluta voluptatum quia voluptas soluta non quam ut provident. Qui laudantium culpa.',
                example: 'hu841z6b7m12f19pg86af5k2j7r4xet0jvskvfrqqgx2xil26ztyyxq6ieqh0tlsel6anc083keji1fqxracn9wtdvxiu3keb5ji4zaulyjfqows6bra638mjr03mivn0syvm5um5zxbnklg3suzc8pzy9hr0ket',
                startTimeAt: '2020-07-29 15:41:15',
                direction: 'INBOUND',
                errorCategory: 'l2b7ko6yvspi2yg559zdsq65kgb9xi3p7mgb33ki2mn3ym3obwmd9ilrh7dsqtptosz35f7k7sppexp6i2opgcpzjiant8supcer4bhyaeva8q443i4e588dfjif36l8wuzphd7ux8bzy0bxfvf3uhvplosh9sqv',
                errorCode: 'qsty2xcys49snjczt8b0k0ee8v0ttuge69c9epsypgd2zs72lq',
                errorLabel: 615146,
                node: 3969017839,
                protocol: '8j7nve3rwfutvonj0ciw',
                qualityOfService: 'u8upwh6vt9cm7hgdfc93',
                receiverParty: 'zol385jrmgx1ywketzf4el7jhfp4lr8vkcpa6m7s6vtxb6pktjxfb5pfx8lu3eyzsobk0500aarvnrdf1dz8bak4h4oxq3840lsfkwv71bl8ihy5hkj0qqm9tv6pfkg4jgc7fhlo2s8www3aasw0h3yy4z51kbkj',
                receiverComponent: 'j0em4qnq7nwhkejhj1l2puvqh0s1h73nxhim1j17jf9d2eff68atkbtv17spo6wrrx9m1mk4yqnlpfu66e0ti2iy7v3nhx76znjn8e9zksd6q2b2upjs6158rkl3r0uc07kkl53gs0iab1sicenwwm5yhzs3jyw6',
                receiverInterface: 'hsr2kdjq9bgwd18ymhfkj256mtzmuqm3ffjnqks4glhtjx4k6roqwrlmkaogptde7l4ryvl7tw7s5l4ys06lkp8d4mgtje4qxiybky0dmuy9wpax7ofq8jvphowe4b5jwpmk3xp5olvj89vpkibr3iojl0vtl7yb',
                receiverInterfaceNamespace: '4sxpawyykh02z5rcq6b12ayxs85lf0vtv9yne8atpxe34hv2i8hcwxkgz60vuka9xo2ie0jy6hgc4ok4akvpxhjygx0fsliyrera82eo4tl6knz0g6c1tdhrmupzdyzwvgwwlrmo0cdgqrkgcs30z9njvpvuap2i',
                retries: 1686028421,
                size: 1758457171,
                timesFailed: 9895056942,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '3ks9bmdwc81fi451ch1oagfy5bg68aym6v77kbj0hbxirihlc6',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'wd9xrodm99s7iglm9d7b',
                scenario: '7izgkh9ngxo9kjn8tbu93ihq669nhg5kl81ukv5148198e2ftdevblxbbrjc',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:22:29',
                executionMonitoringStartAt: '2020-07-28 23:56:20',
                executionMonitoringEndAt: '2020-07-29 15:08:31',
                flowHash: 'qe8yrj49ftgvaqjwnm1bmekufsp8yp3ky7wjimnb',
                flowParty: 'dx9x8shtwbd51t2fxv04nwrpzesalc7c2y0xcyqi98wkxvihyev2qc3r40hhx7ktmx9e1xb62m1zxzm0d8k9bubishezxuz8s5pvkw05ls4fre8o31q6cquswq8m17whytd5vtzxjy7lihvps9we8k5roixv4ssn',
                flowComponent: null,
                flowInterfaceName: 'tvruhuzipwhxyz5mymb9dttd8y9zpd68avd0e72gqb2xf3jwv3vrvchb3fdor57sx04jktun2z9ata85x258pjw4hmhr3sloyhpk2m7u74ype5rqy2hc82iw0cq7g0jfpfrcgpbgksl86xamnbd1f3dbgox6ea35',
                flowInterfaceNamespace: 'vmr4d5x7zycl2hqi2jvtd0cwtm590b900kqugu1nu7uzbgnzqkbb9i9llm0nrndzk75q0h1k0n1oktv82bre6ivb137ldozcwys6x4pj3dnt9hpb1rsji286vm58whkwvhmyfd9sf47e7naqcnzis0faw284q9oo',
                status: 'SUCCESS',
                detail: 'Natus deserunt tempore optio. Sit dolores quis minima quo non. Sit eligendi eos eos incidunt non ut dolores sed et.',
                example: 'm2a07ffzf4406jj9adbvpqkza1hcu083tkin24xraonozpuyjsvjbqg5agozm39hsplhd4svl5cfjzoq3f24zmawtm25ivx9psb56tsykx6zcdlboig4pdv1xaq155xrld9favbwhfl80lk15rkioezozu9482hp',
                startTimeAt: '2020-07-29 07:54:00',
                direction: 'INBOUND',
                errorCategory: '7ba62fzzhl5k8q8u8sol7j7q75jjwgdfw53b0tx0bpa1en51o6tdp9o0ng8xujvgnac3i6pk3yx62rk4gecrxecp4ool7yloswq6asg45mjypxgyh2nypoxip3v5tc6rq25aim001vp4cyxabu08idf1y2xofbea',
                errorCode: 'r954ahmfu4cnupsvemxifysta41vs948ty4s8aaofn3m7xn18g',
                errorLabel: 527117,
                node: 9677850485,
                protocol: 'yrkxl5zavt5s12lpjy7u',
                qualityOfService: 'p3s83wppurahuqwt1gnz',
                receiverParty: 'j8x5csytfdbsibgdtqqawmszquijg169nlfgudpvd5fjnh0ovb3vjwvuza31sk7wf4c2ujsyk8ewibg5949hy2af6k6pjlyfjv1avkcf6vbxcb7r6qsue73jk4fbwrcgfc8f5sys4qsmxg8jiol80anrma5j75sk',
                receiverComponent: '1y1zsgi46u76x9lhu05mfq548iw3gej0bj62ubfc6ucknngjwddmep4n1vloxabvhkl7h7yoy0dg2abbsvihvisxkf3mq8uaihpmnauwrzlmvf5pkcyhpq0zm0pnavq4wn2jyufiilsspifiv9btgrybae4tu425',
                receiverInterface: '4yf3bicm9l3so423llit16lszhhvb8subegrlouzyp02b2lzsi4j9nhhrxvcffsyfbor37onaagq4mhadkyuwf2p0y1hct9zk6y4ccnwehlxxvrqujdyrw2quqo33z1apkqchsz0hhlpo2r2cdjrhmsa1vv2vfx0',
                receiverInterfaceNamespace: '1wc4dtu32l4vcn4if06i24hn7mz85ah51xjqksabv4zmi7rmfrsv92ft5wox5dl5e2ejqjl8toieeqgr53m92lavrjl2ec79rupa5k3r350j0oq9v4no3kw44r132v0hhl40s6auz2rl23a0d52nxz3u6v92seq5',
                retries: 9026494835,
                size: 3114384489,
                timesFailed: 5073812726,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'psamcvypq78kxpwzvhslfwh0i4afffgvd49wxakgfr2ru63cdf',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '0omwleo4jaigpa50sdpc',
                scenario: 'wzdy9ybzhyg9cexv9k3jgbp80wm2dr7t65qq5ylknsrav6l4j61ta32tfazp',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:38:16',
                executionMonitoringStartAt: '2020-07-29 16:40:41',
                executionMonitoringEndAt: '2020-07-29 05:10:26',
                flowHash: '2ph9oatrtraglamrky3liu1heub6yurh52gsaha6',
                flowParty: 'mujupbkyu0quiwn63uwyw2nij2sf3wqbsr3hcjdf0w2qcm33r4rf3nmmpyxdv4w2yz0vvmg0ajd3lnrthkeuiik5b3qgrfyofb6imq27vi5kjbab7aynzveei3q4emkbei58bvigybzzhg7g4ubizhacm8wd7q1s',
                
                flowInterfaceName: 'oqc0lxvkyxiu63hsm8foksvz01vdb4srcs1z8gjd4mlg8hpy6rkl4rw7zvxy6vp6eh19a2l3vnwsmyu9d8iccln9ufeoe92t37anzi5nay37fdbbbt0lcl7kvk8wrp30xt3tcnh0x6vkzozwd8btyzialbh246w4',
                flowInterfaceNamespace: '8hr9kwsd8h31vp1gpl5w6ohpk05t3g8da3g41it59qhkgxzihpu1v1a5wywy7z6alwn430h03h087qsxh9tuzc0ltjt010qvi57c209vm9tb536p67nl491ke7oqvof1y4wwcq7vbevznquay8n5d38x9b6npdjh',
                status: 'SUCCESS',
                detail: 'Laborum sed tempora maxime dicta sed eaque veritatis natus. Illum eum unde ea dicta in nulla est accusantium ipsam. Qui minus porro et doloribus tempore amet. Aliquid molestias sunt dolores blanditiis commodi accusamus facere.',
                example: 'rqf1x1d1kais8enatoru9pw9rly0vxvkyn3s2j47e24qp7bgxlsvntdtz5ejyj1d37e06gvecnwhwgzvp3z4hr4ffdlxqjccc701jdpz9840lmjipsydj06v758otl2590b0rbsks49szdm1s6euuugtcyqx2iha',
                startTimeAt: '2020-07-29 15:21:28',
                direction: 'INBOUND',
                errorCategory: 'qginflgub9bvc9955j9tkoxkc9fhtoplio1p8n2fi4osxdexygv9k7rjsdfvu6xdzom9tvsj5jxr7b1hia3xojjfckqnfyiy0pgpwocfin3lb95m6k8cnjrgbhn6u2noy3acmvnd1fi78ge70avf2o0holqkl9dr',
                errorCode: 'losbd3v5sda4xgu65ycs8roc79prs0tzxa1z735kdex39i2oge',
                errorLabel: 378609,
                node: 5580935788,
                protocol: '8jojbfuz8k53mhylfw64',
                qualityOfService: 'hk51w26mshjfbqm9eloc',
                receiverParty: 'jewxxt3d4eqoxyhj1yjj7dfavk99melk2kvxscg1gez00h2odcnj1oifw0foil4fxh3oxm32zorfh6gixb012nhlchkee4ff1k1ozfae9na44cahpltsxpajt0nfh3wgrwx9ul619zfgs1l3kg5f55f2aaizycco',
                receiverComponent: 'y9pe6m7tn3dkpuuju1lqix3f5jblhiqfq8we3t6qc6znkm5e5fst7zc3nbar80d157q6fn6li5le5u6y168xgt77qbyb3e72r995wtac0vx3cmd5dd8kjovl93smjwa6g2j21f5h2uigygmvhf5mez9pmoupnqph',
                receiverInterface: 'vzh2c0krac9c8q65wr4fhkro096s23pe455ohfx4gsyshr0hjsjfdxixn4kecp7137k1e6nyqacac4onv3sy7y6wj4dwj31dcamvzp8sdo7x29zis40ehfobesocvg8dgq1ijuqwuwnsm8hh48hbzfw60pq61ze2',
                receiverInterfaceNamespace: '1dss3bemkdbjmypcpr8dcuzvt7ur7h085ggdxsqr8o2cwmklgmn33zdold5ttrlc0t0dkjvj65v6375huc5jj6frcum8vagz49l1ur17ftlxtxkahr6vul0i4ipoesc6uj1pjpdey8q44pntd2vzlcaspy1anqfc',
                retries: 2245178982,
                size: 3531392597,
                timesFailed: 8395607413,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'noq01x06ln24xfktfub0sp2cwgri3o6ez28l1ayybls0q4tbul',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'a01d5s2hb7e28kd23ana',
                scenario: '1mraj1sb46g9ldd0bprv21y0x1f5bew2z729r3jssb6c6bnkuqxgyi7i54h5',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:10:05',
                executionMonitoringStartAt: '2020-07-29 05:14:42',
                executionMonitoringEndAt: '2020-07-29 04:39:40',
                flowHash: 'xxuhvljlqr2x7hrif9sdfpyuhekl03irqa0406rn',
                flowParty: 'wvfme4n6j6kc1vdnvr296b72nuhbz8jlhw1xna6be8e886s76thjc7sc7cqxsh2kvnbahzok0ddpumhsno6k0k0e4udqxbv4buso65glgouqly7aql5ayycchazrdulxu76fo4hm0vbepys3d2rx1rms4s9ax1ki',
                flowComponent: 't3xghqosfwwtlh431abwsszl1z5632zx0hauxg8s93hsudl15bbfjclc3ayx2lrbse5vakaj3y3i8qdhy5hy7xyky8rfjy3df6qf0asrb89o6a25e511dy5amxqh7a17gziknq777ht8zebjoe1zdlv62xueyrkv',
                flowInterfaceName: null,
                flowInterfaceNamespace: '8p97r5r5saalxhpxkqapq81rqnq4wn4m1bhkwfbqex0s2rsig3y1pmw8ku9r1q95q0tniz77hfzv2xuk5vhstrw54w6ex4q4mivt233tfdqcxx258ln5wqnvwb0q7wq5l187opzmbrmy7481abb498jytewq70fj',
                status: 'DELIVERING',
                detail: 'Accusamus voluptatem est. Et placeat sint modi temporibus est aut est iusto. Nesciunt asperiores debitis autem doloribus placeat consequatur. Impedit sint commodi ex et fuga modi et quis.',
                example: 'ed0jz7dfeovcma9h3xqct26m958psvm3ordsgwhmark788dz6n4fmvaa97l10bmgfzskdgcimekx5shxslwm408d1m46cj4y5ohvfyqdlbiug3v9aeexasi054vljlgjs2j6nq6yatm5wwqsxfms3qaeq50ut51b',
                startTimeAt: '2020-07-28 22:14:27',
                direction: 'OUTBOUND',
                errorCategory: 's4xx3vex80062wuzo6cp5s2c2m5z7n8df29idhq5alr3zcvfy2vvcsz64d5s6soexm7c46z2vjwuxbps75aveqf81lymkfy9vkdh7uis6mezuzk0a2qfn87r61d4dltcqgpxacdeb0ci6lsa5aotj6wmii3hdtkk',
                errorCode: '7vit0vnn4zegskiizh9b8bybn0smiwsbs8ipujavja56p6jicb',
                errorLabel: 331900,
                node: 5075927699,
                protocol: '4yjojdno85546zni8he0',
                qualityOfService: 'qc5uod9lnhdd1d09pkq7',
                receiverParty: '2ptp1ilar2ney1kb5e5j1dj699nw88ww1pnvnr2t0eb67ra9lm4p0w8g7o8v9vwwyi4t2pa9l97sy2or7esrlgj41n898fte4sr4fed9lf56y8mslh9h0kbif9w9wmtd761zna10b51zhtsaxcbugxjdid1cfngj',
                receiverComponent: 'yv12bclvorngp35xeo91uckb693sa1w47d8defi3oaorftougum4un7tbsqkn3esaxwwxylvfnz7stcxuiehd7234bed4kj8gjebl2e90ed12aw6mp89o90crcql02vniyb39mtq2nrzzqmohw8jid4pwhpxnf71',
                receiverInterface: 'x6jxwn6hw89lg0621jklitewrfeszlb2ju5tpxlapuvneph5gu3rp50q86okduiw0dggw6dpzbs2e835qb6tvmxvh0hisndmiwz4sw2isdhe68d6tvl0ymjggi2epiqv3tvk5usfu9kpvrokpaj1coahxns9leel',
                receiverInterfaceNamespace: '326hovx2bcq3zhonm4ebrs8mc2e69nt250ziul6daqjodz6ea7ybgp9ux8fho962cfsmj9znigm9dhroot9qlwvwalpxruy99225996br2he223jioizybleepmi2h8abp9muccnde7bmvvvqu3e4qs5k8kcitzq',
                retries: 9448118070,
                size: 2262410239,
                timesFailed: 2611500592,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'tlou309ygz6n59zqegl6odjvupn2dow5yjh4gazyyjx9v7jatz',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'fw3qbs4r2yk6hvfg5izw',
                scenario: 'i73hfpd7b7cpj763u0opvell8w9til3pks6oek3zclpn58ups3x2xvcn1md9',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:27:26',
                executionMonitoringStartAt: '2020-07-28 17:33:56',
                executionMonitoringEndAt: '2020-07-28 18:55:55',
                flowHash: '5sx332rjjyw6y10ehui5zgbn7te7t4ri9e09yc53',
                flowParty: '9jkbww46bqcebbzca5p7g2sxm4sd65zj1cby2lmh0qcxz22t1hu02spc9g21eb1aus0030pgor3akqtzttz97fm3vnxn0ey8yfy4uah2bfied53g31spqqmylwnb2tb9n2l6g1gkxlfaipqd25vj5ssqm4xclaeg',
                flowComponent: 'xrie2fs8tw7xe6162mh9dak8l3ll9wqy2qaakqws23l28rrtcusnfnu24fthdynx8jyiub75iqfgrcenk046kh9k0q3eeg5uhmkxsogbadflaogtluk2cj4fzobqaxsycf3hzqvh2g1qqqjdqnv2akz7ynoh3bgm',
                
                flowInterfaceNamespace: 'hjy4v7adta6veu6emvspczqr72yw7cmtap996240a0j02menj81y00a31mpav1tlvegtvtls35b68eksg7uif8wv8njfjfhq8froymwia5l2r96k6q9ri3lcgga0q2ms9b3fsn84gne7a1480ulkaqx15nk6m2oz',
                status: 'ERROR',
                detail: 'Sed omnis perspiciatis ut quis incidunt atque dignissimos nihil maxime. A facere aut fugit aut earum voluptatem qui aliquam ullam. Delectus excepturi voluptas unde cumque adipisci qui quis. Consequatur dolores sunt.',
                example: 'csudbrtz93qvdx40zwzueirnzz0quuemp31d344rxgaajemsocyty8lh0nb5w7rqezimm5lgkur7gddmm0mu9wvyjqnk4q1tmn8d30rw49wlgjwwyefilll5f514wtwnc2deucz23i9xmdo6lwv50kk42m0o4ajq',
                startTimeAt: '2020-07-29 03:02:41',
                direction: 'OUTBOUND',
                errorCategory: 'za62chi2y5kuhor1cx00kfttq2gsgdwu4b00qltyhlm0x2z6tqs30yazl5vdrwpnog23mgil2wvcken4cxm0nvjzhzsuk67y5j4n797px97zgmc4fi0xs78ey0fz8gtgnyoov1jdnymte6s9nrtmczslke7n7xqd',
                errorCode: '445qgoudab1raf7cn7h08zphsmm6oo5g9ijrqf1afhn7gdgzvb',
                errorLabel: 465923,
                node: 1644230645,
                protocol: 'ethnobz3b62gx4c7glo2',
                qualityOfService: '0g2zcbg59ct7npex6gai',
                receiverParty: '0yta6ijzi4xo8kpxzaae3pnzh9enitr993ik16u1410l9xvf4fsl0oukkkilqg6fgxzliu6i8qkihq8b651zmegnlxlr6s0qzzy8wj61erygkauaxv9wjthzbzutk44ehqof452gpwjqminf7p8vmsph6o8ojmg0',
                receiverComponent: 'hl9ky849vyc93izywyxuq63c5r43ek9i96gik2si6hwvqgogwgqd2jpitjfk64yghx7s4fgp5tb9833gsoitth6owrugwtljnhn6m3nyqmvn9s23256zsdn4ax3u5ghj0fyvaffyt5a2oj598vfcetrtsy1badry',
                receiverInterface: 'nd3cf63lbjn7ppva0pv1bat5rvl3894g0fh9n244kl07uhdiki6idmaehvlc36lojsoikviqyovlckdvj9bhafttwtxi2btow03z0uq8yfyhxxhnntcl915u0c8t92s98z2ss4pe65lwo6wgy8hzptmkewu6x0x6',
                receiverInterfaceNamespace: 'raibet0cjbvn084ja3pd5u7wr35uhgr7thmok2fq5kz2qhy0ooacdjte02bxg8ya8rv231kfeuadk6zxpk04win0dyceaf7ag1hfrbe7a5q5qw9c2k27bzuxjog3tu7r7ke25161a8hp9abyfy1i6qdt32f6xgip',
                retries: 7772325345,
                size: 1724927899,
                timesFailed: 6343103335,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '87zwmzhin4joy8i1poc13uxwkgma3n6d7icbhpvso7qiohq0nz',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'wg3slrv2p63r6vtbq18x',
                scenario: 'avroz9zmkwyuhf8zqvedfxcn7fw5i7e0niiqkzbtd4gxsiqzh8gscba2tff6',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:49:29',
                executionMonitoringStartAt: '2020-07-29 05:33:06',
                executionMonitoringEndAt: '2020-07-29 10:12:45',
                flowHash: 'sbjbgqo9wtj7gy1wm7lz8x2f85fahkpf5gvxfze2',
                flowParty: '2537i61m7k3dd8qynob0r3st7jo0mx55c2y4lq4knw04rgb57iqk7pnwaoyacxcyr165d91yzasbvdbhultuu3dfp2camdz6scivneo6iixwnz5mwffhow865lhp0dwd31t60nf160vwlwp3iwnqrwvipniw2g2x',
                flowComponent: 's9btoa8tn4kcgvtvt8uuuna9ce51p4yejb03x0ehz33jybca84vny2ydipggrtk3zase0k0g7maux1bmbfw1ohbmw6n663bozpopgvg8wn02qutuj88l5jpytctshadqibhpsec8htschm5crlqfdf7ppcxjdzne',
                flowInterfaceName: '1rsrgaw260h9s0datfkcz08togac007mhu9f79sb3irsqeu2y0xknzfr6bsnkbfy91sig3cnc9qr73r3qolv604kugyr67rrtiidlpi9l4eym12vg6gar6jym7s17pm665q4292s0d9v181rx198feksf0kwqb2v',
                flowInterfaceNamespace: null,
                status: 'DELIVERING',
                detail: 'Temporibus et eveniet qui recusandae quia corporis veritatis in nemo. Labore eum adipisci aliquam rerum. Ut consequatur cupiditate est reiciendis id quam commodi. Et minus pariatur tempora. Ea at quo cumque repellat. Qui aperiam sed sit ea tempora nobis nulla ut.',
                example: 'vtawrmpmfl3r06rqn0v1mt4hx8vh1w0vc2gc1uyw52vn3wcx2h52hs2abo3kcffgvmfuxec0aabclw5at01r60gv0mchpnmq74ibu9b398yxaw2zb0og1fnh9nl131x2a8bqyebyrdo90gvfbyznww4dmmp1rets',
                startTimeAt: '2020-07-28 20:34:35',
                direction: 'OUTBOUND',
                errorCategory: 'b0wbzfozex8w063mdsf4pee36u9fn3a1gv3xh7re1zq6z9s6sdodi8b79ofk19d90b4vu6qpx7cg2o3trt901vn3vv1i4sclw8te5jnfaqgdiw1zp4rd7zbszub7tj6qa921omr61ft2z1j31rrhulmy6cgko4ii',
                errorCode: 'o1nnr6idj8qtmclhjqu6jmh0na0lioofypqexs3ew3ak6mfe19',
                errorLabel: 539013,
                node: 4597923541,
                protocol: 'mc92ucdux4ko60aipqte',
                qualityOfService: 'enqy6i8i1mlvlqwy4pqu',
                receiverParty: '1otbbqc23etw4fkoby6vvn17geeox5linogwpnce43xfius6l5gvjc6gg1zqqnybhunt4fdwkzd6e4uymomciy0he9ho6i6vwhzlsh59iotama8sfxxhdczgi2sa460umhzvo5i28ydf6zvu613yn1meaxhxnfrw',
                receiverComponent: '75vm4o44mc56o345n0ao2ba3c1jfj1v4qxo89mkr0tx0exbroj2v4o6lvawd1f97bnt0rvi7uficpt82g7ydhs7wn5k8qyoq6xvys51lww9vlqxb8q7fwkpnb7bgwbwqo6o15w618aqkj1vjy7ubfxkub1izvy5t',
                receiverInterface: 'pps3mmnuzm4dsobx1uwi5uaofmehbq07fmj3v0fatjgruyr3zk99x3so8eone7iyjsyds333e50o6jdk7p0rh3hqar0zi9s6wrzyt4w154y69z90y1hfbwn8t3e2fyf3qwm4l11xi7bxzhak5nycq27637cuvg92',
                receiverInterfaceNamespace: 'on8435kuhnp6hzl24jf0ld614azx236oe5yom2mr0diu17cqkk077fwig6b84e7238shshcbv7gtppjaf2hwhm5n94997mn2rghtbw2m7i75sbfun18b15yrxuu508rvrdnldp7jpazro8183q8x84mgfa7jzx6d',
                retries: 2641418795,
                size: 2370077117,
                timesFailed: 3175857530,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'vlffdd92wgdb8zx6oxh5o84vgreknpbqvhwndv1k5m7t8zt6no',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'wsy3hxn3zwr4zb7uq77d',
                scenario: '415y6vb1ic7eak8tz3ordc3rx28wjj58qhlsd3rjjfhftelp6t7wddbj7hkv',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:26:57',
                executionMonitoringStartAt: '2020-07-29 01:34:58',
                executionMonitoringEndAt: '2020-07-29 13:19:07',
                flowHash: 'zr2vq9rkyp51orkhjcuajjyirq1l7e8orwvvwrc2',
                flowParty: 'npq3514ab66du06ltslxwtprvkhi0akm8pdkoc99c8yodlr1n3t73hikfjjjapnxec74qui06lywhkuz55xccm6j9zeytip43ztnvq0kqpva6xkb1g9x2hrxijoqh138xxgye349n95w54sqxcsujelwhshmsjwb',
                flowComponent: 'p5rf8qns6e828ohycuuwfo2bcyffnbmxd5psbhnvdjpkh38902zbut19kc2cw3oj2epxjomithyti62u14g8nkem5nfi6ubsuf0nfo0xo9ud4i5zu3pjb4pt8k32vh5qib8yf5vk05qigvgfb33k2ucyghbcp3m9',
                flowInterfaceName: 'fwcxpfzu43unudk26q7dveodl3jzmi2x74xp76qixaeis8ybaxv20i5koib68z0d5fo5x99m9cohhmanyq7t105tx1si3kuzswxzxh7weahnk6tahoeqc9qlb3i16t2taci9o3buseiw60mtlp5f94my07hbffnt',
                
                status: 'CANCELLED',
                detail: 'Beatae non ut qui odit. Similique saepe quas tenetur necessitatibus exercitationem omnis. Aut provident ut aut molestias.',
                example: 'hqqdso43yu0if58kv0umvrw2fnv70b3nk566hbi0339f6it3u8omd0ragfaqojqyqmhojrwv2soky395vej1dlkqu5sr7m0jh65kbvr4hlk0mo5sns12a6qjd4x9bcylqdxwnrbbmt87h6u2khz9bqh8b1795oql',
                startTimeAt: '2020-07-29 10:26:57',
                direction: 'OUTBOUND',
                errorCategory: '94j6g8j07in1gyxoa10ew2yizv2zciepef2i7op2tj4muuq0v6lpestr0kexsk8lel91g1gqx398olsh8jglrt6pf3ka9o84yqilcfs0uypu4rqdnvt05bz1i8bu06eoes04essk7sc0pd5e6pyphbnoe9di8yrf',
                errorCode: 'xx1pjzyv6sttgvr84j99fkdwf2s7bb6o7jdpqu8u5vtlwm8nan',
                errorLabel: 479405,
                node: 3610368382,
                protocol: 'brx41z8kpun5u3rlvfit',
                qualityOfService: 'd59knlvyvhln0bdhexuh',
                receiverParty: 'j5dko2s2eujsed8nin5oqhkpgqmbrd6w8bbt6nh4r1gmv7mtspq7in7ujbnh63t6rz1ic4sbmnok485d5y4od8c3w0r8bwg740njjlwsdppd6wrsa7uyh5z7xk4n0eg8jqggqq12t9pc1mxn21i41uc34fo79c8g',
                receiverComponent: 's2dz8b2f7tljg51i84ej201xi9knch344g3u50judhjd5vp1wof3mhfthhhm3k0gduskn88tu0fft921lyezt5whnkx07w2nd4j1a3nwozmk560hbn66cjoqnr86ftbcdb8nexy045ievrm5hjvm3f9ndy4jurjp',
                receiverInterface: '8mik47t7ashebmo6ecdpumf7bqm742hnujjw3okr5pjf9vdfrgoq10dneynfhapox04fjw78jxp055z2ajsic23ncy9fuzdue5vi9ophegoxs2vhpyadegdkwt2opccwt1nugjh3wbuzm359ow4kpdmflis03b5s',
                receiverInterfaceNamespace: 'hrh8k7o5ysjav0mwdkmok2j80s4lrxab8lkegfbfpzd715edb1geyho5lawj1bd9yeauecjmnpmtl8a8d8stuc6q98g6xjdrj4lh9x2t23sq3ra6x4qbp2ctz48kfajbmkzz0jbcnbetw2gxkgei7e2xo2dvzezs',
                retries: 9850651225,
                size: 5081643813,
                timesFailed: 7119213246,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'ic7q2hzea9v6til8ahy16zkriuw2hrf4r2av0i3gp9wfwzysm9',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'q9botzxtwndrdtkvm5ze',
                scenario: 'lkigc5zwlb1rykpazxq6fd6xgk927fv9apbpakpgjkcailwz3vqchjdxhchy',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:26:51',
                executionMonitoringStartAt: '2020-07-28 16:55:04',
                executionMonitoringEndAt: '2020-07-29 13:17:57',
                flowHash: '97sc6njofiacvb9ja8ohawjcgcj672i86v0x53ye',
                flowParty: 'tdsrpc592kwbox64yd3n4j5sotf8ctnwg2qvrad26dj9lndnatuf7g3nb0yil9petm5u7x0ug47nor3byxny0rqx5frk5nubbzmkwgymo2j3hfb36w9cbgoge6kuzx5d2wvuzpzihtfi1li0drmzq8nv8z2c4vik',
                flowComponent: 'z7hem783i2xlg8qqgse5090dvba9b4y0e822evrbtmpizx4bywkubtsqwy087buo9ovfnea0glp954behlayzyq07ifhtwc5l7i0kghjynbvag3bzb5hpa92e9lmc9sksx5wccc04ydj28nimfup1m3i27x439ax',
                flowInterfaceName: '2nba46mfpjz2s5g6n6e1q657sea2t3jruznr3e3mbvcoxkha7xfrm6kj0ig4ix3y78lp97fq9ucl0eb9hslqixha1jr5h549g9pxz83tai2u2geohnj49cl9yzn5sp6ftyw94s7z85y3gj0g1tw2orryut050ktv',
                flowInterfaceNamespace: 'yai1gb9acctkh8p0k57zywxm8ozlyyy26ymzer3bzixfhf6zmjn36cw050uxa0n6l46nwl2iye5l9xwg9iyu3dmxyh5vo7y1ods3hzr1fwqs02i3byp99msjvdm60qovkmn2o4gi3bwme2nnkadeaf26i68ilpbf',
                status: null,
                detail: 'Cumque eum quidem necessitatibus eligendi. Nobis in eius sed fugit ducimus reiciendis odit deserunt voluptatibus. Similique doloremque minus ex consectetur iure. Quaerat deserunt ut voluptatibus voluptatum eaque.',
                example: '3agn92i31rc9ayb3cq1csbllbsmlmp6zy1vui8zi9c8ryf5osj1hsretl9m4rg8n6n2rnbmksuikmfm20d47arz4o7kc4qk3guyklwdzwijr9uvno631aijyoqgzlcrhyk317v9peb7xlyz824zl3ke42rcz9voq',
                startTimeAt: '2020-07-29 14:48:21',
                direction: 'INBOUND',
                errorCategory: 'lie7ttiysbebsadcm6qlkzdi8sc38nl3yrgxkkp0gjq3vfqcqk8cue4zb2k8209ixy8chn9yryhidaa0kx2jnxx2frbe0qpdh1t0n1jqtl3adqokstu0hctb3f6vajwrdivnvvty0llswt6tc0z9prbw9rbt985e',
                errorCode: 's1ukfueu17zi22nawv3rgkl3gph2u98809flhn6kar6xcrhprv',
                errorLabel: 123853,
                node: 1286872612,
                protocol: 'wo8pl1l8u9qdc7y8ferx',
                qualityOfService: '8cax7xphfqpt7pghzmnl',
                receiverParty: 'gm4qepkf2macq5v69a2gqpufu1o7n23peu86coj090nq8lt9h4d0ps6a1tcou8lsodkvdp16azarlwufto74dqf2tebfj7sdvz2apfz51qba6x3g4bwc9noqgapncmf0x9vqvhzf0917sj85jzt47o8q9wynw8cb',
                receiverComponent: 'mv2mv3ls49cctv1qvo8x769rtmvegelgy6vg3r25ovpk3m3k35mlnuw8edmg1sv36mnnoutriedk1q94y7f9c10mjzv5miekxcni3c8ok580wnij39nxx5bxl9vlscuu0mhsygylmzc5d1m7xkpizfl0fymcjnyl',
                receiverInterface: 'ly3oexe4n1thldwzk37nms38fwpn2xqdqh4gdg64ppron97wepgzqhj02bmhbt07p1hhofil4204wi0vo4b61v2vyw4elkr1y4qbvhdoec92empi4rpdxs74quaop0lzfbixqvrhyjofbk7gqi95ucl91x8j29p8',
                receiverInterfaceNamespace: '368wxaah4k75hhl4nq68lmqmtan31vhbjx8lfhftqoqn2mtuo2urtlfovjayrx5y0jz27ixt0hqzrayugr9myxkzyzkldkw1eydxrptgb6m95vtnfl1qbekbl23tyymtbebov9tojjvneoqcgfkhrgyjxqlc6pax',
                retries: 8624152127,
                size: 7578449582,
                timesFailed: 4882051286,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'g1mpieybq14dot5vab6po883lmdxpzeks947a6w1pbdngd8awk',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'ibs64br8h9ty9vwd7pt1',
                scenario: '7mxifw6ykhyghmugoudpgcc3ovdwuxqlj7i4kx5oz5vw3n01y59cxcimqw4s',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:03:42',
                executionMonitoringStartAt: '2020-07-29 10:40:24',
                executionMonitoringEndAt: '2020-07-29 13:44:18',
                flowHash: '48hapw5if7jstgu1tfz6idlrminvl0ytsip5f2r8',
                flowParty: 'axr6jaqg8r54qfmts40p53kbpkpll6cvndmz5vbn1j9wryzco34xorpm6t8s2jqbklwxgc029cs1gk2w9oi3wiszzi6wrl1y60ez20z3aucx2xa1zayivhxrcq3sp0myrk5wfkxidpnj4wlrjfikbdws8ef3mph6',
                flowComponent: 'qcvb35sh3yp4aj8re2wdtdng9suf42zerd148qr62jnyf46o7xt4htx5ybkoqrio6dqhs5m3ieegdzd0vt36sx4qh42hkma4n4akn5oosd3u0yj9hp898yvr5m3jwwe4wh5pgcp1itxotyfpnwsgr86agflivjn8',
                flowInterfaceName: 'dzzn6dxzc2ja37o0lkv6dkxxmd2yo7pa1gjvy4z2t1edl6brl0b937cz6vhtfhh0b414bn4iiva76v8ypkmwl5zrdr1m0upwuvz15xkhm2533qjbf5icn50g4bk1n6ymc7xvyjbyal3d1qeof12vanl45drxikw1',
                flowInterfaceNamespace: 'fo8wgmnmibzcj46iyhj9n09scmvjoybw3eb0r1cmhvqiih6dvgyk485x2l9ztr3e9id8obh9jacmxngnl8020azqmhad0xdoz5dzqdfvbj4i6uzvmatlxdwp0xodxu65lfy5wzar6npi675d6r1sj3q6gn06dnj6',
                
                detail: 'Quibusdam delectus et. Maxime non est ut aliquam provident reiciendis enim libero. Optio est consectetur qui voluptatem. Tempore qui temporibus sunt. Repudiandae quis et quis rem fugit hic cumque voluptatibus. Ratione voluptatem velit.',
                example: 'h0zd24drki1c0arr2uynr4cgu1bbijrtktn6p1h8cg2ryr95tbqimqux518hlzvd36inurwq2sakn90iwp4yvikxzba6o1i6qwtihpokugfe6kj5cagzky48gb3s4sb9cqqaegm9oy2d7dsaugsnhtujc03t0h83',
                startTimeAt: '2020-07-29 01:44:31',
                direction: 'INBOUND',
                errorCategory: '5tg6av0r3cj03pq1n5dwo4yvowkefxd0tmvpp9djc2h5qisy4gfyj5m1zjcbb6hblgkb2j5o54qwvmlzm3rl3wdhoz9mlmq593l87a8qofxvi24i5lk8513vykotgudyv8asuz49alsr1fwmesl23o1pm3agdkc8',
                errorCode: 'b2kvb95yi18szu7ou37kcflymuwkt7g5xyoshcebr93sh02xw1',
                errorLabel: 441958,
                node: 7066114166,
                protocol: 'or7yyk043smu1z3199n9',
                qualityOfService: '4hzpwy7cyz5ntom86f1s',
                receiverParty: 'c4609neqqhi5mh5dhiri0uyl8yl9b01b5mlx288s0m5wp2s0jp538i26bk1h05zy82jim3071qqsr3dplmao9g7r4bcvt7e7xnj3pxfqyvuxefqhfmhga7j217dyw46lzxxlw3q3d9csfd4bpdys7dlcr8bmczoq',
                receiverComponent: 'udrmqwvrr6v32u9j4wjtwo1ko79wxdb2ompuas5p3r2qjjrthrg6sdezga1uhuv34j6q5c0ntji6rwo8qbke5c69l836muik32wcy2pb2zz0t6vklrc59a6mlim7r39fjqubxzjitwv9paoj1l8u6d85ejvrs6w9',
                receiverInterface: 'qnsse3zzy72kppohh551p48m0e3uv53353smam5o2goakq26lwgozv3jqlcnsiiwkeqp0enkb07xdqosfd7jphf6xjxliihsz5yyvkx61naxrxmjz6m51fh08uycqxodjfyh9mgteo3z02ikkvpff73nfr489dv1',
                receiverInterfaceNamespace: 'inxw9a6zb2y8tj1ucsqrs3rgdzy0bpkok7kl7lk2ix45pj97jfmu4mi47smgp03gbwe3wf3ccdr19e653l4l0gsnamh036er2g855nv7hlszjx9phbkcaxh6xvv17rzds0bjlmkdx4a65pan8jfo7rrsjdb8su9g',
                retries: 7674379805,
                size: 7205471298,
                timesFailed: 1210550225,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'rxfk1tar087bwx2ww4krfb00sc0zullpgbdlvthx7m4m0fn1c0',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'dirguz9zzd0ba8qbmnpd',
                scenario: 'kmjue9q3s3t3f0diotax2p6huk6vxpem6rjfmyhwo4obqvb1lns42iftm7d5',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:37:54',
                executionMonitoringStartAt: '2020-07-29 06:01:49',
                executionMonitoringEndAt: '2020-07-29 01:53:05',
                flowHash: 'tqg2hmmlw5z16roxx0yqszxezfrtgcz9hcqa1p3n',
                flowParty: '58wn3pp2vwy3264x554k33hwqnigf8jubpp5h2wtki2he6lt29dcv7i8vwt6icrrhyi5hvgjm85nj33e2zithzf4tgu205v8g0rl9l6tidmqae7rxnbkj1ln8tmss3mi3a5cewky2535xu046o51740tu8n066ya',
                flowComponent: 'gov9up51ygsqt1w4tk7gok5cg1x5nqayoc5b9mbie422emi2avbprepnodqb4s0tc9ghxwyvqk80h1ykdphlob49rp8zkaulim1d04ieqa2pc8gclo1ol5tkafmuhudiuetlv5z4c11v8yzbgrthlclxj9d9insi',
                flowInterfaceName: 'wychy9i9fal6sxhhzk8h34rmqne522kqbx4w0p1p0q23e6yya8ktu8lszgn91z1v1pj4b7xqet88dk6tj969u7ffk17j9m2o5myp4zy65m72wqbx7qwmyzks98drcvwsgp0zyldahekdl3sa4ale021bxqnbzxca',
                flowInterfaceNamespace: 'yq5zir9lkee00qpvwb8mmyba6f6dqkshfp70g83olc5v2exr3fgr2bn3r37j61h64cyf4wyhd93ps6vdrgxne9ff8tavutd541l61cma742swgk5pyfin1419uew9x9gy61o5jm6lvusf1k2j74js75naertcdcg',
                status: 'CANCELLED',
                detail: 'Et natus enim eligendi ab ad. Animi ex odio hic omnis et nulla minus aut. Voluptas ea id ratione velit voluptatibus nesciunt vitae. Minus enim repellat accusamus impedit hic hic quo ut. Ab eos doloribus eos.',
                example: 'lmdmfjfj7wv0ztlmolcx5cboxsje3z05c6tp62d2i4ywb5mz0qajh1utv0ta2uo1pqnyuxhlhy5wxz3k5bzw320nakml6p1sxpevvhfo17hcm2dyr3asqkszjpkjpeoh17jar75wfbhjcl4ykuqmnbirvcc2t72t',
                startTimeAt: '2020-07-28 18:47:58',
                direction: null,
                errorCategory: '6m873yx4913r3gvihpnddbpdx8webt7whz6ltxkzio294xbxqdcku71wp9rbptwme2y6u8pcprab915280ybml8889r7r3612lf7bzq5r3o1ugrvqimmkpjy771u9q8u097rdrxlenz53niqbuqlw4fn6s6mh62c',
                errorCode: 'iq8gw5tmizejltf2ytydqmi5zbt4o8r726vsukillf9entp2ca',
                errorLabel: 573358,
                node: 8237051879,
                protocol: 'dzi9q6fb7rcrkbr9izyv',
                qualityOfService: '15y2rupqam2k2tvfs3ci',
                receiverParty: '1sybhpiu7ol890owzh419piddps8sb2lrmvc1z973vudqgv822dpyglb2ojz2x9vjvptyr5xut02y9vnw83pve7dt600cwjf0uzwinps9y450lyw53tumaqiwoet3o1ixv71t9h4kstm8dmv2uof4sy8worcbohd',
                receiverComponent: 'yrk3h73541bt82zobtw2iyv69egh6o5d1pdwk0yxr7n01x5jibi1q73r51uy7q5b826em93cr3n18b9bob9n7q5ho037hb9byn9e0bs9i4wi4baz3ds9n4xmqryuta1midjni7ta65ok7l2bksu36sf3v6bckmtz',
                receiverInterface: 'r0dzu29g2vvm1r0csb4brkecjwt1foi5zv52r0wmvj9mig9txdjzb2l62xpl87qfmjwn9449d02v8a1dir1h3doloo6t6twjtjq1zu7g8ub4gy68mwqxdb7b4dns0eb838dbc0trwpx2qjm824dg7x85kt4d2j73',
                receiverInterfaceNamespace: 'o8r5dz9llphdr07bensuyk2bkqc51mwd221yd0nlrqxnoyuz6naurt5fx2ol0r6ipb1ryr3y2l29sl9iw4k58e774ac4a0n6bmkl3i6xdy62ovvdjl9wn5yy2q6yt0qdj4sc0yz1wm893uwulhoog4o9ovczkjk7',
                retries: 1360900079,
                size: 6281358941,
                timesFailed: 8378574935,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'zz4xpziln7pnec551c7fy9k2r9uzlzdnrc3y4ejdhb9w36ts22',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'i10wma4lfsqc93lwuf5m',
                scenario: 'pdyc8t1qs0qgsmbu8e7q08fu1k92nxc5zwev2ri19saho14y4086c22l8x24',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:35:26',
                executionMonitoringStartAt: '2020-07-29 03:39:37',
                executionMonitoringEndAt: '2020-07-28 17:40:32',
                flowHash: 'br7goe2zgsoq1g3r0t50gq588qvxecqeykytbtzg',
                flowParty: '789lu63yyykos848dem0y9k3a5uiv4wuz2q0nonp024enpry19jiamj7yu8y6j8r7qy3a5e52mwjc8zw2byco1g5l8css1mn15sa4gt3265hm4v2cm4xio7dx8u2z9nzg731nn7ykzwo4kw8c8q5nof1be1yqwei',
                flowComponent: 'db84zpublvwnv1f8rrue2as8e95oxp7idrh29kech0cfoix2uyvkeoyfr9gpdnxfctlzeuv7lju2rbr5jvkn2zdohd32yfm0fs7dce7b7ptgk00wjimrtirzy29natpu3wx3ucd67as28ehfdvsnn2gan2fp5jkb',
                flowInterfaceName: 'cfvuotb8c54wxlj0jjycgbm4jlyeqpn8nx9h107hul3cvb0xo64b6qu4km2wotfgf3s7uw5q15fji2f6f479mfst1bunchw1ilwistclcfjiy48m80zp9w0xm80zxvyif277495g0sq7eyzlb8k4vhp2vi0t7u2s',
                flowInterfaceNamespace: 'c5twjpivjfqwbozyxwg6hxfjz6tyz6qyw8xpvqvxd0f918sxdmazgq6xmejy3gu7dnaiiw5qbntxs6uly551wtd2sznqetusi6l7laxy6b0vevqyasz3gu0wec0hjgc0zg5zw9zmoqkh72mad2n28vm2ckkwy5o4',
                status: 'CANCELLED',
                detail: 'Et autem minima sint iusto occaecati libero quis. Illo dolores iure aut vel nulla quidem doloribus. Enim ut voluptate sunt nam officia. Magnam reiciendis et ut optio consequuntur voluptate odit iure. Aliquid soluta ut distinctio quis. Ut quibusdam beatae repudiandae qui voluptatem et.',
                example: '54n5xgnqqruez4jxbt6dcxh2zk2lxizycfuzzsyuucn32fyufe571zs960327rj3qsobli7ewtv0qq0htt7kipjfmb7twen7pvxs8soq2xz31bipsji27jkx0r9mrowxtbaoat4r8d9mvyicm0klr2ylepge041w',
                startTimeAt: '2020-07-29 02:49:15',
                
                errorCategory: 'xh4nz30cf61etw0wd6iu9msuxzc1609gzp8ymjctpsb7otq46akdkc0ic6j4at88gvbveh4j7apcx4msoii37434ki64b65syne2xyasiasqyt4tux5i1dkj5hzu8ztltwlnx97y681ul8h8irkmode8mrihzi3y',
                errorCode: 'ygt782nwk5l129504eey4zre4eo5r6fm0r83u7s49mp1m2qoi2',
                errorLabel: 428038,
                node: 1924915479,
                protocol: 'rw1tejrtgpj355btsmqq',
                qualityOfService: 'khbq9v6lckk0i2uec0i1',
                receiverParty: 'iq1kdxmzm2eg50yrizwxtoi8l2vvioaz872jifevcgu6sixzhjk8cal9qor7lo03pa67vueb1aswcder9vlzc2na8knuvt1jxltehznzm5uuqd12ncuteli7riarji3wglihq3mzkhjdcxoqbfrcw1v2hokvxbqz',
                receiverComponent: 'a2rv7yrmr6e0faumtzh9hpmpwbqv4f5tsiomtq4rcxd95jp1khu36cjkuboa4smjiyn4l06xetq9y5lld4f77j9gaijdjakxi1grjcuyku9qr1c5igiddzz1l307sb75sgi6o0t983ev9egj2qpkmpn0npct9185',
                receiverInterface: 'g323hf5pthadwq9ypcz7mbaoqsecks0v9bjg883t2hijr4x5pi56ft4hemozo2u8mq5bjd17mh64yb9zmhu9xpp52il5p6eev9ravnrrwbqxu258mxyev1tqr4j7ux0lzr0n4supdvw875ff6p3va1wn5h29sdb0',
                receiverInterfaceNamespace: 'anwndz9n8hacjby9unjczicszcyd6aeoi14jfaf2vyjv71he7i493yei0i1gu1ydz3s7wu828owrj10intl83lc6dxyz06slp2rbbrjpu1v106841ta0mttpnk8moxmmf2kvzu7scqgw4brqu3pwjwkay194zwz4',
                retries: 6735704305,
                size: 8310679813,
                timesFailed: 9855847992,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'x81082h2q1kavqst99tms2i9ohm0izfxzme8h',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'kcqif75byi5tx4u1c5xwrgck49r7r6kjol1rmjuq5p8dpek7xe',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '0xfl3h03mdaoqx099y5f',
                scenario: 'ac9yg9zu96d6lrcllav88bstitf29dk30qibkaum63yhlguwefd2y49wcoqn',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:21:27',
                executionMonitoringStartAt: '2020-07-29 06:33:35',
                executionMonitoringEndAt: '2020-07-28 20:23:57',
                flowHash: 'nyyvhxea5uswayef56amvhj575uw8nrxqiuom9m5',
                flowParty: 'o0g3et1q384c18yyin6p38ze7wjhbls7peeovkyejumqmraoeee1z81cwrrb5n3fl7rgu1jistfn3ebaen2lpt9usdug5kr0roly32nytvg7tk81wrt4fgz7wku27jc0t8abaq5diipz5ai3oi2wtg4lnsfp3tsm',
                flowComponent: 'nhr55uy56igj37do3iuraswuf8qpqzzbfr92vel148js6e2zbb2t70h7i1k1rvbqhwcnbmqb6ij0vzk96z93likbog9onh8zbc54p6dd7pgcajf2jsn00ce0xfzwiz0whxyc7efqmk1hpt5yuhgahymst0dw9kb0',
                flowInterfaceName: '1shqj8hmnwwm7lubtyki7exghsw8i24vs6xl5pnk6xs7wgnhdva6gfq0ea56nyftwvs5viwd4h22rxx4giuqwulon87r1zj82uxd68cwn6slv6tifegddwbi580oaka953yff6vftboftn5832potuluob3mdl7t',
                flowInterfaceNamespace: '2pwceizkn94s2n6ikrzf7zgxxxb5rpkamag1fjea084n0j7s403j6ronn7zirfvm2jnov8rdjlrmljrek5lygt0abnyupy6dj3vr3ceyymhfeekrxcg7asb1nc64qyzjfxrgawlqh4ylnxy0bzhxgs564xk517se',
                status: 'SUCCESS',
                detail: 'Aut ratione dolore unde illum occaecati sit est distinctio. Natus consequuntur est. Architecto quod autem omnis. Voluptatem aspernatur magnam sed sequi voluptatem. Deserunt explicabo eos est laudantium commodi neque pariatur. Nulla vitae iste distinctio est consequatur.',
                example: 'rge7a4ms60oebquclmtzkyt51aortvtzm986caguyr9v66nh6r0wpcqh986figpdtsdb9y0rf98zoygdnusdlisz8wtpxn6v11puxirvhe8aphaigqk064a9a5oxpfobnm0gfp3iwpbe6uns1ed0e8y99k43smi3',
                startTimeAt: '2020-07-29 07:05:37',
                direction: 'OUTBOUND',
                errorCategory: 'x2b30iw67xzay1mbw1e62eevmhhgdvz74qows0u8g6yqxkqx4re3sdim8q7p30eqyq30t4s0wuz44q3arsiuity36dub5hkgzcjcjqeybfl25azgv1dkyoucak1sw28dfm668hvz2cufb892wczfx3ubqajrmelh',
                errorCode: '1sz3s777sg2gyod15zwk5n1413sgwtawvxvnbg3fgmpwj33izx',
                errorLabel: 137681,
                node: 9706324152,
                protocol: 'x9zvrm6v9feqjpjgns67',
                qualityOfService: 'hugj0359ubxahht2upt4',
                receiverParty: 'igrq18b5cp1deof37uli0knjif2hi50fyw1mn3x49itcvmd5az3m61ydkxkw2qsaocuw8dybpapbdo9ix7wbdgbpn4613zmithmhrstqefxl38v9n5ayfkx03m6zge8d2852i68i75z9rb2cbu9ksoju3qfves9m',
                receiverComponent: 'elbdrswj58707d56mm98njmqy5ra4s6to805iaeylptzrzb626ksh635xaoghhq2qwqjb9hy1s9xndgnv5qbzabwz0qhq9tc9pn2bpvh0sgfkeduvmdcyth4xif584hixvx65uf3zh127h2ayz8bbcehttdbrtca',
                receiverInterface: '992zes707jj49z20bp1zn6cj4jho4cg8df5lqo29umuhdr3uj12v41rocswvubs8qy6znxgt0qwddp8z85ee6qwfnpf5f9mscem7z1gytmwdpcppny22n3qaapt98xm5e5znaom91lppzybsv68u50ryjxbrv3s6',
                receiverInterfaceNamespace: 'zbhun9vaevx8ad3ubqrwbepgh5k6sjkir5czqw1ed3rl05146urkfgpft4fth6n21cmydiqxmoec4u6rmie37wb4hovpav8lsk5smkctkkl3a87u37j5sxbc2mk5vnycc4f815walhdm8t7g1zffpwk79lpfbn76',
                retries: 4099257804,
                size: 8527174863,
                timesFailed: 6221473567,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: 'qkmo6sykqaf03cgv24u62nar1fycexnzvsnrz',
                tenantCode: '69mwil3rfj6eef0ozr17gdgg3rnn219bmb6zjp6pf2iulkdydn',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'syukxdmihlr52m4qtlr2',
                scenario: 'mjr4xvh2khpta3zfnnls7momiaey66brh03q893qclgs0xtj6lxcxs2n603w',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:04:27',
                executionMonitoringStartAt: '2020-07-28 23:54:52',
                executionMonitoringEndAt: '2020-07-28 22:00:48',
                flowHash: 'gh5jfxk9y5d2l2e919xq44ji45vh8x43gdo30a1o',
                flowParty: 'is9uxmq260gt07c1k8rqu53b0ovm47k9nfldeatv4u217r8o3d0wwp267g3xw3tbfwvob66xjrhwwx666dt8o6hlweek6s5w4ijq2tbce8zbydjgvyxvc8mszcugqxzxp5gx6wj3f6ontqfhqn4iz6qnsyi8ve8l',
                flowComponent: 'rmmmy8t2tm3zsj0tz0f1yy4c23y5cnpgigd4pdptriyuyhnxgu2hswg04tv6x1u1jgdbo4r707xjzblmo63vo9c4nmg3v1n4ey239nh1tpxv3ip8vvwd7e4vg1v5nbnl67ynblfic3bovft5fn1khxwxk15wmv0q',
                flowInterfaceName: 't79duqxf0ix7nhtfsmrsv83x81cf241t9sm7ov2c88et4kevn9w6p7kybloa1533zksfj10jw72y795jm0wbkdnntnnsmr66en18fbffctgi00oqw5o5ky5wbfrsa7npqu8byotcop0rm50k7xaga1t2qcbv4jpk',
                flowInterfaceNamespace: 'sa59s72iopxfs27f4xagx8jielhvjy4cecopkr5izzvbn4rpi8lwutkfxeo25tvlgmearzyvn57kgq2eycxipw1pl6wph03i0hm82iu4rhdndn8imm0vvqlowf3bh6lltzrdvyb0zbuq2irtuah7n543682q34t4',
                status: 'ERROR',
                detail: 'Sed quis porro alias omnis et magnam ipsam et. Et soluta quia voluptas iure ut. Magni saepe ut aspernatur. At fugit ipsam ut. Minus sit asperiores possimus quo recusandae distinctio.',
                example: '4xpxgw9qsch59ovyo8gqwqz9pccuomphmb8mpjwtotm6ug5crwhv6r2r5wtsiemeg9xp6xjng1dd70n9z148n8lpv2l94hugvkwqqj68gidqnmq4jyea5er9rh1ozdtkuvdgaecdq4asumk4cxytmla6zdbplptw',
                startTimeAt: '2020-07-29 13:10:50',
                direction: 'OUTBOUND',
                errorCategory: 'dsqiifmfqgilqvyw5ddphw9y2iufwhu1lh4q1ohzeuhih3q7ugor9qmjyvmtx3vty14msinhcseolwzkj02bv91nw6du29am6rnys2ucu5huueoi2kkfwxojkuhr378ed7tgts8q35pj6vgadzakw9ltifeaqpeh',
                errorCode: 'gn9d0fk25tm0tcocoxjdhjjflsg8q73mq4uyi0adicdrzw7va1',
                errorLabel: 276619,
                node: 8727179391,
                protocol: 'g7r3ianxx0zgsrlepahq',
                qualityOfService: 'eye0pkvxjld8y6lf95rm',
                receiverParty: '4btw4q06yq9wq87pko2hxt9gvsda48cypis4avaj3gi88968l56uqmua8pnn8cvl8rkomwa748zl8r6ib4au4rj7n90e28m10utvy3cskf4rbenm4m3sv0dhqvxhcd9ynm48orjzwhxg5pj4h676xfzpf456efn2',
                receiverComponent: 'wgvndbjf7ingcu4p0b3ezra485wtg7gr9g3e01xd98vulxykdahrdohk53jtf0j8zq2f8e2rv735opkt9uftdd5cs82ljb71g7me5uh852wlycqt5yvkxkrq61nqqd0jq80iwujm8yhdd7m9h6hrmng2o7e6ca10',
                receiverInterface: 'o63hp7dqkhh9bxoz0084zd44d950hfrgg2kjo276y430ohq8ei048tze6ihlstmi6q2weaczzyzyv5he932ekpssiv62lpqntrvqigl6zb7v9f3rn6tloycfdbotjs84ioarvsp3yci982lthowqu0klbrt3ti2d',
                receiverInterfaceNamespace: 'lfneyvb0ft4odnvs3mqgpb2mkk3c8x1om9mk7q4s43acm8io91z69f4mutnzlhel5dij76gsj8u9vrxvu3bjdaek4dftir2blrqlvzjtmfnh3tmy9qagrr2ojsl4cddim99marro6tjwrgjdyd5fx9u94twp7q6y',
                retries: 3477658053,
                size: 8850491327,
                timesFailed: 1722258327,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'mek5f0tpsytgozmnwypw3bg0wg5yr0ertakrkn3op5yxcujm5f',
                systemId: 'ijr2m89s6ok0gnp54dcm1veome5b3n9v9w113',
                systemName: '8hs6xfuir9ltynw1u9h7',
                scenario: 'b2u04zsb8kiiv0h2vd3lov2lsepuoty02kzm4nfv2ak72o7mauy44zk3ls4h',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:43:03',
                executionMonitoringStartAt: '2020-07-29 02:56:30',
                executionMonitoringEndAt: '2020-07-28 17:39:33',
                flowHash: 'ip1o58lq651f6eesrd6b3kx6xwl8b2vbnjjxg0oh',
                flowParty: '3jhafjbxx1prrguutrlyv3xk6lbrn2u1sc9woj4biwlrnrwjzngmicr6lxrwngpp8evwhv5ubkmoo51l5bgjgcffwsgvefldudkp8p0njsgqe67o8b2qzhrd366y5cpiwu5n7amp8yfpn3l3e1qqzj2y7km0umcz',
                flowComponent: 'zfcqzqx6c2b8he330jo47awgvkmkiqnwxmgs499ywpxcicpl7q93s6w9pjhqy4xw6lx7ino8le1lus2g8qurlhtb7ksrm3tok2nepq98e4hs7ocshd1ww5fqs0j03bpfyqr4g59blmsmyxjlirxxwsem3o9kqd2l',
                flowInterfaceName: 'zo2gsioxuejzu5ovhkyv3tjzl34ixu59bym5xpbjtjqd4vsitedbcpali797m7ldi82sucxoa5s4vtv0czs4zsys2n2vpa1akphlnrnzin9j530k2sqrx45jdfiqqljqo2b01zne4e6ebh4jidh9z5wlacmabnm5',
                flowInterfaceNamespace: 'ucgmli3srwzo0bu6er30k0mlf2hubvxyhol3tyxkb7am6bl78g0x1w69zghl4l1sgmqlgzu2ot3ux9lc70qh4u6748mxmi4jxvssjnoqgzclks91vj9v20any4b80j5ttu16fvnv8ew46eafku526wb5grmqupxu',
                status: 'HOLDING',
                detail: 'Architecto ducimus natus cum sapiente. Velit consequatur voluptatibus cum perferendis non. Quasi maxime non vero. Minus ut quae debitis non amet repellat numquam adipisci. Ipsam quis delectus voluptatibus omnis est corrupti repellendus itaque. Temporibus voluptatem sint non quo.',
                example: 'fajtbpuvrg18uqh3mri9sndv9q32vcosywphisaxqamkooztdf067up6syeviuh0mcawjgvdi7qqx7rud92f7qfbdhb9ylchzryc7t6tk0f7fd9yyxcwqgm8ptwf9zzpilvyku84jylkibajiwrnwfjmb3u7pluj',
                startTimeAt: '2020-07-29 15:23:45',
                direction: 'INBOUND',
                errorCategory: 'bvnnhvpidamdt0pz0u93ai0dlgv21m4htnd9pky276kfig6pr2kxxcpvoojkc5cqzs0qpeu4pmoyvhqd63paapwubbnnp4pgefz48w45dn0u2wdlnrpw4gfyk8vjmkdu3w5a6w8aoff7pz0wp9byfzvb8izk07ul',
                errorCode: 'yg9xkuirmdoocjekhhkeq4b2aez4yfi5anj6cfii0f3l249rz0',
                errorLabel: 750623,
                node: 2472331220,
                protocol: 'ea64cjdmwohq5tpbyrf8',
                qualityOfService: 'de1ij8odha7j63qzg6ap',
                receiverParty: 'js2nm9mvl0ulrihu60vvii4c5nqp8ghy0isnof6f93sy45jq7xbhoja7hcz2kuffzck5dpu1wnrsa60h0m2p6vjpx3i3mfgo1kyrm4rz17m2ert6ts1qlso1ho3fs6yx7jap2904n77r2n28nxqxcdhablwzimih',
                receiverComponent: 'jz7zxr40odfzqjzzpbc1m33y43mx14zgzi5mzda3ktc6r9lxg95s38xgiycruy863aw0bhttw0kfebhg3wzzp8o8pkbbms6twkxu6ts5q8ph8wayuzkc4v8wljw3jxpfcpezvhqliplyei31w0bfus5vbzkuc91o',
                receiverInterface: 'i521n27oskmq9hhjqislftoh3ux52c161vc1r2gi7e02pq9jqz3wb6xpidqg0jsmw0qgiyc2dssj422iijcoc0p7a6vdcmd6c98kch21owgfyvy7u2ioae33fu6ty9nfoipgbikjvgaotojkojc7eishojphvcwy',
                receiverInterfaceNamespace: 'thtosc55kgwlr9odwkedjer3yo4mpcvk4yfqrij4rzzc16izql41hz9h9ufpjov9m362t8z86aeh0bwneaopcybmq8z0fq2170fo0rpxt5jll3fm5w783m57w6joc3hk7msdby2sima6bmk9xesm5efodm952zmp',
                retries: 4431929288,
                size: 5183025383,
                timesFailed: 7555010567,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'sqdih4x63bg73l6c7oiwgjjoxabt8way2whf9jvde0frzj0hpb',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '2tsqs9624blqxtdutohg',
                scenario: 'zamb8dcfiwatlh65ap46ptkf2wycgo72d0gn6k4v6pj3di8qosrg1dstysiu',
                executionId: 'ovvhg7eo6s61xie73sck3vfufrltu54it1x4u',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:15:49',
                executionMonitoringStartAt: '2020-07-29 14:04:40',
                executionMonitoringEndAt: '2020-07-29 01:20:55',
                flowHash: '454n7x97r9hne211bdrtm3w2vvgfjbsnaceuzt98',
                flowParty: '7drf4a630wkaklkhcte3l7upmxjoz10ed27pdac702bt1k73szvb25xz1mzaqm69bbiidn21x82ubh5zmw0fb3fo2ihiergqjv8slyq22pc2mg9qudqzksxe9c551700bstmkeuvb1x50sm8otglebh1crzfymt0',
                flowComponent: 'jsxy8e7k7zarvvzgm5ko83xqmaphd5o8y377fmr3pzik5v9iyig9ek36vq2g7ee2g7ceau7cn5f11zdzqtgyh1gx0styzxc5mn0pkpqku5i7zdtyldk7472h491dz0yay94yaw7rwrd64hahsvqdl1cezw9oplgh',
                flowInterfaceName: 'n4eb5gdtzrjxc6v7wjlipt56la9sjcdaz0t2efht1m50u7fef1fdugyu6pipn9vjw5wvvuasujurdclxwq0lanv8pziihbgvchhaxn8g6nvwsmim75u5et3yhc6rllhqigydfzvnqv37j3hnrao8ai14ns8dab8x',
                flowInterfaceNamespace: 'qwe80nrb5fd5sku0iabw4bp625wzxo3uzgeixxhichs3styzrtryk0xbpdyzmql8meumwvxmzefq8fyi8foneoi701jedd2ts0ermp7r7vitsqyheud1y9oumlpxuskuvb8juq8lf708yquqftc2mpmxn5ecn0uv',
                status: 'HOLDING',
                detail: 'Nobis molestiae provident non ut qui. Perferendis ut adipisci. Dolorum at ea nulla expedita eos.',
                example: 'c01o9f2xz57hc46v8olzcrtss6wp5v47cmqgplpmr74s1fz0cxuvlwrpycv3ioaf5wf2broxl72uwr5elv4jjwyln2jcqiag3u51elq35jg7ahl5icqxtwu4n6fh5lutgkcvvexwwdh2hqvg4acmevn1wigwuixx',
                startTimeAt: '2020-07-29 10:42:06',
                direction: 'OUTBOUND',
                errorCategory: '7wxchreiy0cktmln7bo4c33kippo9ca8pwww2m2yqceo8pehwuf0q4eeuh2hw2o5yau4qpo845v8iijwv3hozg0272jnyidqcfhj14ns8d415z2mgidif72syhkyrmxlixt7wmt44xcrvr3lz58carwdagrzkbak',
                errorCode: '9iatxrjns6lsejb2p7hlf9e117pexdfu5rge6p1nt3j43c3q6b',
                errorLabel: 604367,
                node: 3265629477,
                protocol: 'v4a4sxo429naa1xl3kun',
                qualityOfService: 'um3fpmp0ug0d5hd2nutt',
                receiverParty: 'jsgx0oob9uhuv2tynk009tbic131q0rj6ep33vjhtepoesvp3kdex0unvq3td0pep49xkg8zgblnu52pddritts5gkw6i61s5cycre9on1hecbgqmsf9ug0iph8z0yd7vrqqtch5hbhc9knqtu8xsfjlxd1bjpm5',
                receiverComponent: 'uq9wv27c1ngr275p2ervzyjhnp7xud1ztprp5o2khj0h1nzoklyd27s3jw7q6nw8wbwkaccpo66vmg8md673px6fk0wul7hzhaypd95dzyjo66pqn88byhgnlah6ynbqfnoio08sn1hsa3asuhauccso7jspfcac',
                receiverInterface: 'evryk1gyjdqn1yvt1ss4584kj239ark2zyhwydnjq5oelkl74ndwvrjath28q6rzju8b6f0s5bpts03xt8qphwasnuc9vlpmsuq3qs5p09frcaax62a90q2wsd4s8cglqjc3h7nr9znc1r442jy4rzwawns03wro',
                receiverInterfaceNamespace: 'xo0ffpucu9rujrq0qxy6xm9v6g4g97zfl3psmz8lq1014ta69blkbmo9ivode2jl9dp3wj8jh8i3b31m7tjkhoc5hzm31wsnr9wyxav80t45lbsbry1tbmxrzo3exufw5vxvt532eawlerabn5mnmv1jm7v4ftql',
                retries: 9350031162,
                size: 4122841193,
                timesFailed: 3062049634,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'ev6pqljii1jhjah45299k3nbx7itslfagxys439phg0jhpde6r',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'pl0k374jzdi9p9lp3gpl',
                scenario: 'qv4bxcslen2cj8b22a2vg76vjbnx2ku8x2ugqvdka8a3qbc2ppalocj8uebq',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:06:17',
                executionMonitoringStartAt: '2020-07-29 07:47:17',
                executionMonitoringEndAt: '2020-07-29 09:26:14',
                flowHash: 'ypqbwvdas0t2disbo1qdeyh2jio1t7njopu0kbbl7',
                flowParty: 'mub61u9klgvzewtrpt4ntjo62jumylawp8hg08qap3ricr829rz6qh94w3s9k97h8e3fsxcbcas5u90bk2rsxnoqjxzqjb1wz6rbsjpw8wt7l7qwrtex34s63ccmnqf40iejdcbq3iuval2c6ul2054exgh5e1qw',
                flowComponent: 'pfq7a78g98tdyaxymx29pl6t1yknaruoi5gnkhzup0hth8cl7t8wu15hxdwnyvuz2exw0r22nh58jeeomah6pawg9l9c8o69m5qrlgyrpy2vjb3vovtd6uv3ko3l24erk7t2gpat9n9ev75xul45vdzelppte1z1',
                flowInterfaceName: 'ekwl438sj9mjgr4taa9yyrp5vkazz53n440k32flafv22pdggu31v1oladk6g40iw1ztn40i919azzh9lwhfulmf3mm4txfk2ax9mi3a1a1nmh6cnyy6gxzxrffef5r67y78ho6yvo3uzx2rq3a2ihagzsz6zlyy',
                flowInterfaceNamespace: 'm37c4gn99szxzw21h8ltup72fg8rbiqthvmxg5pvzht6m9sohs2rt01c4m4ixcb8nwafxaxotqait72d9980vwqyj6pvw9uqjmjrietuhhs3che3kjkdubbi1ntq8tf12b8ho45d1vjtj867wtjuhrjtpm4rmzxu',
                status: 'DELIVERING',
                detail: 'Porro consequatur aspernatur non deleniti saepe sequi nisi esse. Quo necessitatibus non deserunt blanditiis at cupiditate sunt ad. Ab ducimus aliquid incidunt deleniti nam atque mollitia inventore deserunt. Odio perferendis aliquid explicabo et. Culpa mollitia quo soluta laborum nihil iure et in. Ab blanditiis at esse blanditiis ut.',
                example: 'sj0glo8fbi4e2rnd7wxs5re1n0io1jyo3vg2kw3jl4erv5gtcdv9unlut3fv0bk3oek52o92sqw7xrx4pbrwynqyz9yae0f6mvn2bgi9o5u0fcvjo9b67w9mm83qircpbmxlnrr84o0r02icsvhk1d48soed4i0m',
                startTimeAt: '2020-07-29 05:03:03',
                direction: 'INBOUND',
                errorCategory: 'j8kqzcommjx8bzmnhw4qcxfw2v2hfjjzvhm5y2dkjtb0cntc6x1key9au1ahzgbmd8ygrqmtooa9adlwy1644ybkpb8pbkr0of49044fho5buhc314a2s64e9a1x320szd3wqhjnv3d30v20fupbch1tx3ulhquv',
                errorCode: 'l9ks5w6d9vldhx5dj0vzkbyngtfdzhkmsisu0k6yi6l61219ny',
                errorLabel: 856762,
                node: 6760931264,
                protocol: '7bidzlpikyuj4wq7kf7p',
                qualityOfService: 'ytolh54h88lr71t4xqm4',
                receiverParty: '2mvwz0va3v73c473ofm5jgyvuteruglsen3b5ie7dcay80j7tfrairlq1ku1paqbusp481g9i3g0y1xnbggoc36xmj4dwbhe3fn0nrfx2h1tsrmis2tsppzzwk48mewe5ek92iop2x9r6kvbahkqacs0919p35si',
                receiverComponent: 'x9qe8trxczu5w3nrjum3bej95j17sxe96im2mltfkpndwrr2bnri4zfzxdkaerbtg38tmkhro804hd3l5d2lqonjrsy710v9qh84ml73l935azhszq6tswhhy593o8s4f0khptqbes1o1ld9mg1k4s6sh7qkbnxu',
                receiverInterface: 'eph9gb56we6gxnkikjhdzjizr0kiz7z4opx7l5n71gxfbo09sm92e7buar83c2wwvs5w556kubfzxpvwza7tmk3b34yph8u5irqri2iv4jt7drmrqu4v5zvo395wpvek4z6jpz09wvga067y3l7vd9j3c65t6xjh',
                receiverInterfaceNamespace: '40pvfgh68m8rsh04iqxc7mnsrbvpof61arbpnpcv432zxhpbtawmw18zvxkdexg536m3c4en4u06ecoad7ztoqjlahchglar9abchh7ho0926zb91yshnikznlh0b6fu905j5vql99xw81ke37xxkf0ogyy6y0kt',
                retries: 5829073777,
                size: 4507212826,
                timesFailed: 8016686866,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '5ya0c41sfyzwxws02e5exth05ivarasglksl7wenvlw0kzkoisc',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'bkz9dt4787rjlpqhtgw8',
                scenario: 'dfv64ew0c0nk4qcjiskqyaysnalf3hh6g1dzcifbtl7wo5b8bgreal0abcbg',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:22:10',
                executionMonitoringStartAt: '2020-07-28 20:08:57',
                executionMonitoringEndAt: '2020-07-29 03:24:37',
                flowHash: '8fbozdb374grs7lib9gu4alqndls9c79685hs8rl',
                flowParty: 'yvwddw0pyt1xah9rjzmfj6u5nhhxskt6fwys4oweot62xoupx4hw8kn4egmywosvx2tf8dw8oqtmd8a9tohadloafsopsru76a4ae3wcy73yl16tk3vvwtk2p0m0bkitl6wkys7m3c0g3wgtipwsxlc3kvt6zvtn',
                flowComponent: 'o9omvhl7etv1wz174lttpoyt477aexm678gkurf6buz54gsqmky4g5fa6pxethng81eom5ik31nif8w8lmpoxzpmmarrn4nx4gqh08zy3walhrbpx7m52cyyd8m3aa4wjqllsrxsurh35r5aqabr9s14b2xe1dxl',
                flowInterfaceName: 'e72kv5ukoijkum0dg8so0fs78cingx62awz5eqvgq0ii9b0s1n4224m9caaebch4s87140wwegy4lyydkh1tvdxqsuq5v68yzny538d87pyzzm9fdo8a8t6uyk7vij3j217q30tkr417kmymqeptj2oj7rahye4h',
                flowInterfaceNamespace: 'uahoi1sfzeuamxrjsbaseevrvihx4g14uob6yfx1jxlcujyke0dir59xn06g5st50ec45f23osfnsefsg70nrwykrqk89i2ngubn0jndgolk74bo85niu2fgyaaf19ct2y9s3fy00ewxb8tajiiqi4xbnbwkmmgo',
                status: 'DELIVERING',
                detail: 'Qui placeat alias nostrum. Et quas quia ut sapiente enim dolores nihil. Occaecati blanditiis saepe eaque inventore et sed. Autem omnis ad.',
                example: '0uaibvuhh4wne2ie0oclussq5g6xiogoghd0r717wi8yvuqtlb44933jloehau389ati1mfzulvp6l9lohigqctnufu9k20l391a1y2dxc3imk8h0f4dmrwr46dv7gdpuxahbmalmi7ln8e9sf1c7kmzw4iv0fd7',
                startTimeAt: '2020-07-29 02:02:16',
                direction: 'INBOUND',
                errorCategory: '2xc8f3jtceca4dc5yq92aijm7wrpj6ynh0uzwptk1ntlg3u0ccyrq1ss85udjfl6wa5z4m6yjatblnqm4wb63qpkrjagylf3zzzi21o8u9o9tx9yenwo4tc46ae8f5wf3gbj6x3blngwukd2o98fi1diqhjz2a3q',
                errorCode: 'xk347pnvqp99erz96lx4rzsc73wovjcvo7e5wxixi7jintz6vk',
                errorLabel: 137689,
                node: 8706367013,
                protocol: 'oi6h0a2e9p6spd2q40pk',
                qualityOfService: 'bk0oss5x72muadjg2p3c',
                receiverParty: '6vdx2xmbn26censgd2962x0wrzvs4fxl66oqarmf2a5eodw8byclgwkutt9eh10odaupscovio8zn5drn3owscluzrd4dchw336burnw2ce1l56bn913ca8fge9qwanez5sd1qklbou5ath16a8y1t5rdui8pya1',
                receiverComponent: 'kxwmsobbiq4cs5ihsefatg25trii46sijh76qfga32l6v7qkqu63oq9dp37oeo8t4bu6g8gcki3cmwxtfasykkk57feokoicd2vjtkrryd24g57lrv2uaj6ajsk0dmnxl276syqwuivy5dkc4fytglj89b2ou5gv',
                receiverInterface: 'ofk26d4odj6zcwgupcnksmcpie540t3eo2dc6bvk6fzdyx59b9k3irw1nt3a1ashaza87x8jckefkmjdn53xhij7hrk1k61q081cdvfucxuxzcrzn6ksasn038bgkbdyhit2kua7k97seyqmqf8re6xkqm0ap82f',
                receiverInterfaceNamespace: 'llz6e9ppetasf620happoesutqizu37z9gfw0sje8ffuulk9to4ltuyovooo4usb7yfraizupnwo3w9mi5kd4eabn3hhgmpathjv1u4ihrwpjl27kdvw4mm1oj1wtibm8mcpfvitfd3qsynf5kbsm7akipsre1jb',
                retries: 8495317240,
                size: 9148677494,
                timesFailed: 1868544517,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '3no7w03tuwcv5284iicqezkwjjyn7gk4tv7rlr0zcqre1a20j0',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'm58qrfz45e48pc9vekn1j',
                scenario: 'ycr8bk2joz9ll2d72hy4n223wv5ip7rkn0i0q3a2wnb85xc6x42kmro9vzng',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:53:20',
                executionMonitoringStartAt: '2020-07-29 05:08:32',
                executionMonitoringEndAt: '2020-07-29 06:27:29',
                flowHash: '96gh48lzu5whu78ktlzxaelfnt3dmvjl6rg4ghgd',
                flowParty: 'l8edknv1xbn5ruct6suue4q39bcnc5zqqxpeui2xng1jn0gykp23npexsef0lytj2h3whqowvmnof6kds042caiknyefd3k4wymvm9xolitfvlfuk8ug4yx7k51es1k1iwyrlqb02sr2o7pcb1sj1g9830s2ddd1',
                flowComponent: 'vzlh36xklkia41usxxh20gkzx4vuxskxbp18019tr6kxxerjmxeoatexoh09blmjoy9bkbb3xrzu3m9zpo32zuk1zafp54m3w3rp3ip7pvnm6rdwmphu4iax534fiiivtpvastw6fkttgmvcn1kdpf0nuao9o9lz',
                flowInterfaceName: '0pg3fygz8u6iapy1zlo3frjqjc5bfcnq9epkhsrhux4lmr5g2ivsleg2rrc2vd4got72qdpz0n7n7cv6kysowyrkw7l9rvmvr8fygzdq584zio47nc0hvdqegvmamxrca70z42z9ey688erheiti5vbf7ck63g7n',
                flowInterfaceNamespace: 'eac2e0jnvsax7mn6enscacadgnoxgolhliirjoh5we3q45kz5etdsd98qh8efqt5ipjmqe3armoglldptdv2l4sype0ylg9rbvy5h46p25bdlwycnxgzhpmqujpclh64xfcffvs81fwy9c9uqu4my89wzo2ml1no',
                status: 'HOLDING',
                detail: 'Accusantium perferendis blanditiis omnis quia consequatur alias fugit deleniti delectus. Est optio ut sunt. Molestias soluta harum voluptatem rerum aperiam aut dolorum. Assumenda ea nostrum voluptates iste non rerum consequatur inventore eius. Ut inventore cumque expedita ut in est sit odio eius. Aut aut ut sit perspiciatis voluptatem itaque sed.',
                example: '9geibelip0docmtbourc1f2dtb6itlgi553ucrqcw3e7knn80k80v9u11gak57qz59ex96jizxt3jamtw8092v4dw3flw4wie2lu6b5mu86f2n62kbch3rtf9374hp38vs73rcqnoh1lg8l2o4v8qkny1ur7erov',
                startTimeAt: '2020-07-29 03:32:07',
                direction: 'OUTBOUND',
                errorCategory: 'ecmzxv0oad7o5caf2nepvefr2ofbhnnlpwpamggi38ad4t05vwu90dwo7wuiew48ptgjm7t8jjag039jscj7bwj4nebo9wyo3pmjo8p4dwc7dh9zwhhyr1huoch1stff2kh4ztyb7zqpwrcdw761kwoadnuhkxo1',
                errorCode: 'fox46t4x709hzkdr4y1a4h19wtrn2iz4ur6ruc5ptoamkg2d64',
                errorLabel: 178728,
                node: 8191709197,
                protocol: '47y5cqq3520810qvamai',
                qualityOfService: 'iuvo1zd897kump4rtyu5',
                receiverParty: '9410j9fshjcz36l8fuvalyhf9pxyk0doak9mmz05rcdxqcr1tcv544ldfmglqkk8xuomdzh0qkwtb67dznccsiqnsyyc8sgdtr60n7zbj4umrox3iebio3cbzihgq0b8121321hr37id62fizjzjeno5g9erki48',
                receiverComponent: 'vko134gr0q8e67mka937qx5kr0e8qdle5e6ezwe9e575pbdoow3at1h0ymzj9dqjyg2j030z1pi23tuc63kfxgpwg0lipejch8ac92p452scmo2rfcx4cal0h33jl2c29s9f4sf54rz98lo48924ezljbgvq8e4h',
                receiverInterface: 'p4zj1kv6dgb3kdustkgv0ilmvbawnn6xw8elpxll7vuzpl1m865fguwdkis0sco9kmiw1ilc068563spa0b4gub659mkwab4ornvl2o4k1wzy6cea3ndlddzv3pwywh25g6vthuuhi736pr3t3ks0eggbl5filb6',
                receiverInterfaceNamespace: 'm2p7alxj4mrac6jxhylrlmattxcksbxmbapa9150j0nuk3y4z43pi9o9glec6szk7x07rnc7a0iaw7unhjjy3ot175fi2k7lthj8fmory4d9gdmvicuvulywpwtoh3cnmcag3tuf0jlb9rjdwy6e31u3u5t5e2mg',
                retries: 8705166824,
                size: 9894644886,
                timesFailed: 8377919044,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'sx4p44r8vaej9bjiqzxq6g7q3fnqlodo0cu0m8b8qfq66nii3o',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'arxqk5uv59cswm9vc4qr',
                scenario: '2pjrqbdul5348ygy41w0xlpg2p4nkrso70sc8d19da2ocs72ykqjz9103jl0h',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:11:48',
                executionMonitoringStartAt: '2020-07-29 14:29:34',
                executionMonitoringEndAt: '2020-07-29 04:19:11',
                flowHash: 'iaycpz9dyoiadcgu0f5vx2u7bxj1epvu3ko3ite6',
                flowParty: 'z74jvd9y4s3tf7fp1xway3zmd2hu5bqr3xv183t2jag184eo9zqepk8mrbzxd9cf9xmok33ir02gjwp0k427txdyju4ht99q3yme5kew3jr8dsrrvgjtq87e830qsxdakke1vyyd0ez1jfmlgw096hc7v3op153a',
                flowComponent: 'yr40qzi9n5fjwch11grrlv8t7zuhq3q0r0i6raii21hboe6oclm12l6pqjmwtl9iadockqmb50qrbauq0rm26mcbvd5aqf4hst1mkt2ipq7r49fj2vlyjlt3nm4uomui19u1bcv93d8eilyyd3d5e1ynqlc99clu',
                flowInterfaceName: 'phx807j5dragoeftofeg5pn9qmq3750n1e80fc022kcjq044fj5c33cj51ay325su2bmljecqzq6lpnhksh5c06nwu3mi8c0s8vfvg78bq7hyta1rd3mwep5vhx158ovp9kl5nvuhsi68olqkf1h1l3bp2mxzyxq',
                flowInterfaceNamespace: '2i4saof1hjkd82ghu6gxgjgbwy4bqhysr2usrhwtvch0hodp11hw5oha3jpddtpnw5hc1c7j6roun36jmopr2l05stdsaf9hilxiag8228p1opujltskhfz6qrzvqwjf1rty8klcg6z4mk42b3dzz3iew19x3y2m',
                status: 'HOLDING',
                detail: 'Cupiditate et doloremque et repellendus itaque accusantium est. Error et enim. Aut ut illum ut eligendi tempore recusandae suscipit vitae excepturi.',
                example: 'nk77ym3byk6qbnbco9ktjumyxitgbzdr0c7wdo5c2ga6czr7wslbcazqoxnmwimwb8hxjbw9gg4v31ubbgeqlyof63eaayex6gcxts67cz1t65r57gigfutzmxje8jgatob6xob4xpgy1grvxhdxbfqyneczgl44',
                startTimeAt: '2020-07-29 07:36:41',
                direction: 'INBOUND',
                errorCategory: '6kna03oahzazmm8ytnilsh4rvvdb1bwnhyp9vdsjzelroj6mipw3udwaf5e6k90psa55c2g1jmx47wpauuenfqq3hiagbiaz28r8i09ogru2ndjnwqu782bq7tthfx659oj3wug2ds6dsz13sm3ooirs3ros60f2',
                errorCode: 'q2sakc8sfyj04awgsmc0dj1x3a54gfcgnwrjyeki6lxtrvpq0a',
                errorLabel: 324128,
                node: 7589047288,
                protocol: 'u1wb2csengp7s0u02c25',
                qualityOfService: 'umize49nopyr1zpb8v35',
                receiverParty: 'rpd1vfrzanpc7j5dt65ubgpzwiimoxkgj0wdzl7r8zc78wjlzuaeuujlit697timr4x2i5yt76033z2yvxjkuejf0ar40jxd3o8sm7bpvp749toaebzihdnz8hp05jksg3orvqx3i6nymdfikiv7u36sej4cx8h8',
                receiverComponent: 'xvqb6ewc0cpc7tzhmmufy6bb5qrqeccxsdrxnk5id4muvnpnebweihq4mues3horg27xmpgyg6gqgdyo55ttufeg6d5zkonum4cmd6c4fo7y3tj1n5zb8pog2r4la856mt96ajjlc5pbccwjoskacbnwxbr764la',
                receiverInterface: 'ep9l3530wqz14b1bnt7glrio64jxksdpqxtvhsglheoluuv5kko0bysgcnf1f5jko2119umkk9m7q1j9gnnbp2haab4b1pixmroavl61kwr1lirajfzty9f31o00kqekxfl4c69o4j7hszigej3ebmnrh7gljrkh',
                receiverInterfaceNamespace: '030wdrtoybw8ka5s2jgh3zjrwx3r7dj8dkfg78w3k3qft62n5irmrzrf5ryxfwq0yzhjmiecv7ycik925638ry5kv7qh779j9tr9yrw1olz1b0fhq4ppamab6fn1el8a787phozlax9i0qwv74gkjnb9dovdh7lq',
                retries: 4931542191,
                size: 9083225456,
                timesFailed: 1714265414,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'mfwoadwncyp814gadq38xh11fvend6zsp3xmlpa7l3uhw9wivi',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'y3ipb8l2hfasvt75ih3j',
                scenario: 'vunkioz63lkyo9ty90rbp1m7spa4ffd8tgvqyrn21adi0a6v3wbkr6jv1rss',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:43:09',
                executionMonitoringStartAt: '2020-07-29 00:32:20',
                executionMonitoringEndAt: '2020-07-29 09:42:54',
                flowHash: 'zvffbzq39oioffs9esgfbkfvm91edtlo52rqf9ul',
                flowParty: 'bvcqt66dccf2fjcu8rhao99v2m5n0jhctuxkvf8i3jz4zl3sjfl9esdvr3pw6orw62x1x16qhqw38ploj1b8dov841rxvepxl92rdtni306hp51umax90dtmxjmgs4n4zqh3rjo9g6ugkw69ohclghipj5p33zo1d',
                flowComponent: 'jglw2260x643jz2s464zic1h5xm0jephvd3twat0bn0wxm5b577cz4ozlic7vk3kgt2srvp93r014vz144p3unjrvjm3wgug384d0jekfh2s9np6wcy9at8c7hqj00dt5zh2vy8kz2onhlr5fr8xly3f6nb587iy',
                flowInterfaceName: 'eii94z4lf9qcxx2wh6uuigwkmjfy9p04w0890idl8uggeeof99vw2v23kou99eqhqryndqcekjn4a7el1hczjbvnqrtfjscw2uif6thq90a5wh4gh5wl3u56lx60d9yieo4ns9rofbz2esclqmxdni8p081pi6zo',
                flowInterfaceNamespace: 'k8olgxrhs6c9q77kqw2rxfz5brb003kf8d065vjwg9jrckplzh9emiu5no8pc1e7vjc7tmfpi2tz74n75bdcjqro990a47g1xw9he46t55hign3hbc2vt73vheei5ksp2yp0knzq1czoz65ge0cweksd7k7gg6g7',
                status: 'SUCCESS',
                detail: 'Voluptas qui nulla autem. Et molestiae quis et molestias repudiandae debitis voluptas sit. Nostrum quasi laboriosam incidunt soluta veniam debitis itaque.',
                example: 'hu2ulcxt02nppywdmurp3u1x7h926h3492sd6719wlew3q7pxjjmow540q8c2mjvrkklgb56fg0xmdecfavtep8rtq084na67p6tfjge6t0eq2giyrp2hngkchl0qscbm875194cf6uihimy7zjfwm1507gvzbbh',
                startTimeAt: '2020-07-29 00:49:15',
                direction: 'OUTBOUND',
                errorCategory: 'rnvyrda07yx89kjqhf9a8ans5pe98dd95lkau4t6rv5u3itngohjtzzggqx5jyy11y0xwad9nyhbxcgqmf0yod527lmq3tkfta8g600vpkznwg1i5k350d0bj9pud6zbbbg0ucghm5wmca5mr08sh3jz3hbo2efc',
                errorCode: '8pmwc6yuov4r358hyh1p1q54ztafi09rlewm5mwxnaipn51ojc',
                errorLabel: 841036,
                node: 5921564690,
                protocol: 'az80427bm5je2zs4tezg',
                qualityOfService: '0to9xhmoo46szhday1ve',
                receiverParty: 'fj9lcuws9f3mvq7vn8w3m2xd4nv1tm33hssa8xq73xbgkc0q6198xt15zdcifocxlsk6yakux10sllh6k1ir0kfzz09ppkrplw4gxu5zobzq5gm4sxcuvrb80opxnfd5v45czs885sez61j4qbinil04f9pdegii',
                receiverComponent: 'h3bhzued3cgpsukpqd6easrg0mur4vew0zg1pza9yxk20ovt1m5mon77jtv01ex6g0dsckhqxq6kj5fea8v3lnuik9lji3ockj8xu2xqycr8vmmm6knag3b9m5jtfeu5ihdunk2s3uwwmkgchbx8e9bxv077b9wl',
                receiverInterface: 'dwzclan0kxaut9voa1aijdqlgib8foawmmslzppezn19bz6u0uu1br5uq25p6ylklbbgzvp38p42oz2erek0kp0xw8muivq1q9fux5ex67qjb3w9qsckxxzuig2bc8yrt8tso3rdmvvmb8irg5017bb777b7q5v6',
                receiverInterfaceNamespace: 'kcbn0msmeinka6pblokzk6egvfx9xc1lygpt655m4pbbbu6tdre3gvsjsvcoz0gs0fbi3jdlbl11pz0410yzl365bqt4qr77jh14gwem1sbxgqft7fvypvpxpskp9jhbbss5fv8ibm3wrv4lie1rvoq9v5yz4jrq',
                retries: 8589220884,
                size: 8970308268,
                timesFailed: 6587301734,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'sf07rp2vhihp5tx1vwnzunnm26ik0etnx0ebvgul29ui8fzq56',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '5ntyph4fshcf266g2zp5',
                scenario: '6td58361stcwall2due3icd1f9qlqz45qcx79siyempfhlp2qslocotjrvf7',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:25:06',
                executionMonitoringStartAt: '2020-07-29 13:43:49',
                executionMonitoringEndAt: '2020-07-28 19:24:41',
                flowHash: 'l36np3attm9c28p2fehvpfk9rmvfmp0o4x1n183w',
                flowParty: 'rzjv1lxjhz5go0zkscult3dztjx9lvc0nmow535gn4lms21dkwd93a9r1osqf8g62td0mtii3vs3cd4ce4f43ux05399azl4rxfkffpu1o2eyziog7o4thf52a1nfh8ktpu28fwg4u20op4x336nfm3h4tg8x3ob',
                flowComponent: 'h5qiv24xw0z4u1qp94w3u6esbzurk296600q9b1rg8vjcrkukfh0xl1xxu8688hh37gchf8tieqdlvisk7cp5nkstzsxlgpabhdz2pjui2rl3zyxnku4yugdrje8z9e7wbduca28rdorqa34vz0nfuvvnp41x9ljk',
                flowInterfaceName: '8ai5qu48i8ehdk518ehswz2tg21rw2j4gsm5fqi1zkx344k0bcnb4jhxy6bmvorrqp0iq8vfyc0gyexyq3m9mg3rqcisag60gp689cox6c5849kldyiwph0o2yd6m1u6i3bxd4fl8vifk1bclbhls7fp1f362rt2',
                flowInterfaceNamespace: 'naogyk62mjsnszmu6uibnu9n5b0c8bnhoppvimsz7mrnsm1yiripwcqk06of3ej9lrbevocvkt9y7hskuh3ssprbn8ridshyevvr3lj3w0l62amyzxpwn8c00nelkeebazgs8wrp0gp3fnr6grpuonypen4w7lv9',
                status: 'DELIVERING',
                detail: 'Accusantium facere aspernatur similique ut vero. Architecto aut praesentium sed magni in cum voluptatem. Ea et quo ad nesciunt. In quis et expedita dolor et.',
                example: 'hxsm5gln4t6c3j9g8mf1q41ec6rb7i146rosc0b2k7hpf8fduxe1l93mbyp7ogc3uqwkr3h91jsfb6swml858uh3uz925how81to4dxnv1ebc78ihvlbtoaycb2lksptjxspticxanzmg3qk31nyyutkvi828ga0',
                startTimeAt: '2020-07-28 18:24:59',
                direction: 'OUTBOUND',
                errorCategory: 'ov9j9gqmja785o5cpvjxp4fdcy481vpjc6vynbmdpg02k1y0pp2vlu7o77lrsmc4hgz8xev4382lrvb561bf8nzcdad7043xku7w3djjbi24gg3vki69hevxmb43pmyw8xuke4qqpdf8dqf50zwn2qxya1029sfa',
                errorCode: 'rtgc95loyvf3n8igrzkgdrmeskvtw0qqrw19ew25qb0bvx9c2i',
                errorLabel: 613033,
                node: 5440003997,
                protocol: '0cd13whjnrgvu87pev0u',
                qualityOfService: 'ppop5szg566y1ps2pydw',
                receiverParty: 't6obxnpf1uwhjy8eyk4zr1zn861yofkowpxunr01c6ebo6khiva7pkmw9mgh66b1fj86t0k5glj8ntbqrh8odli530e1npxvqfrd1i3a5baoapx5cs8ew2a1suumc2jgbtrdv97nvegzogzn6ibulp8in6eiagv8',
                receiverComponent: 'j42nat3fq3jl4cmxoogyz6by8lwhtkijhf12lr67bqmqxuxso1u2o2n39marw1a8n5dcdkr5dj371uvnjlvhgpp7hqk18h3mdtcflnlnv3cht5gkum6i9lz5g9ifvd9kx1e42fwtsbpk6q6vhjd9s80tf546tlu1',
                receiverInterface: 'supv53x6wgt2rb8myab9mzslpbtzcczqnuo9y7397mxjbgzkx5joo9ir46ohjx8r3c9j4hjouq3ot9v357dms0j7uc89n3yob99yt5ywtj8xt0ra12064foo7crob5if6fqz88blrjbznud5gometxm1oi3erjir',
                receiverInterfaceNamespace: 'de1w4e5uz1iaa7kov79fda9tfznp5qsw5tmzonq4h1yzgju4wh0gsjzarxl2f88t3jfzj3i546e27a7ykky3ss42f8b8umbhgc1g6s41lc9d4sjwx6wyi0t1ydtxz8wj0pp09aucelnrancczs7too1o5v6kscvs',
                retries: 5007562108,
                size: 6072932317,
                timesFailed: 8931318879,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'aeshm6s27ndk8wftgcchpk7n7em2zs0hnuvaslkhzpx5qevctr',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'ehphm3tvll0vzxpokboq',
                scenario: 'zt0i0uzfiq6gr18pab5zgi0t484itc77nk35awdtzbq5rwu415l1zixnabmc',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:28:28',
                executionMonitoringStartAt: '2020-07-29 12:53:17',
                executionMonitoringEndAt: '2020-07-29 09:49:42',
                flowHash: 'zi07k4iwrta1aa25dvh6cufi9jglnwgostcgeo8b',
                flowParty: 'sxjxlv72ox9wxtrndwa5z9asxae2eekf42q339hd76er67i9whsrg6vhgeaupncjeflunjkfzws3jau8c8xabhbv4a73fuo214vo2bqpannvkk7puz23nzyxigg0cqsntk7wua1ey06946dtue67im770dfyzezw',
                flowComponent: 'wepv1zw3fvqxqfpdraaiulpt6voex8pixmqtl0f928e3t84m8dj65wvng2ar79wci9ganw2zoxqs8py0d3wdxl3gdxkddle5yjacro72oy76rehqblgo89rlav6m1p16elw3ggpu4esbwu5k4px1vfhp7f89ppli',
                flowInterfaceName: 'kvz87oyuclp699p96kf2m8nthkg1lznkjrmsinhgv9b2azy2iclu3qy7hrbxwealz88ekf3m5s1cz7o7qveng434vtqpb44jidhg7e07knqqn0ifkjj6napjtaffyx73154w0inzs46ls8rcikmb3er594pqm4xad',
                flowInterfaceNamespace: 'yzc6lwrbey7jtqlse7ryifozhcfbmxg44m7xxets4wd166kndexik3r7b0v3w5s9lofnocbe2wq2ccvz5aloroqarasqlwd7qu2htnje0rttd1au7n4qbgsh9peb62806z648kmlommg4lczpagqymm3fbd32xsr',
                status: 'CANCELLED',
                detail: 'Non consequatur est possimus. Rerum occaecati sed officiis magni accusamus architecto in velit est. Soluta magnam dicta doloremque iure. Quaerat asperiores consectetur rerum aut eos. Id voluptatem molestias. Placeat nisi asperiores beatae sunt reiciendis mollitia illum veritatis.',
                example: 'beakfacee3luycqtsa2jbzagoxocow0a32t08irp1su5rudrciitd8qow8y95dlw3sqyh8w5h3um1gefu73b5vud9b1kzxvt6ftvtuf2hjaixr2s7nn2463ukox8jh8pgoili7smxpshtpkhwfxj0dj1xf1ch136',
                startTimeAt: '2020-07-29 05:58:10',
                direction: 'OUTBOUND',
                errorCategory: 'qkyun6gymwqtme0f8r1jir801kr7winzji95wcx5nzbbtkacahuzxfh6gov2jx18so6vxu2baq11fcmvijnfo58dxcv8pakf7mlat7r4j0mdp335n75jqs3cp2o54gw0m5w3a4p2uj7h97dmu047zpaucu8z8wz9',
                errorCode: '4azd53zlztigu0uh6fx2qcvsr1d09m6hut9vga46bdqayn9ogs',
                errorLabel: 883042,
                node: 6469934526,
                protocol: 'x9jljkttq4polo6nayeb',
                qualityOfService: '7q00sazpijmap2jqlr33',
                receiverParty: 'ug1s6ifzu44h8jgztydgixl0csfvhcpkj6cvjolesy57sc4lf0wpwr4jh7mnj8p9f263a606k7vicns7pyurniw1qfzd13ac71st1lnn9o3brpqzp0kw0ue9ge0fzpytuv73erz91dup2w6igxq1fctlkv49twxy',
                receiverComponent: 'vmrte2hf0pv6wk0tsvcmyy68k166t05udvn3y15vlm1pvd8ibz202olq7kur8fxy4x29ioyct2dm5ui46dnviwqotjwp9j3t6wa2eyq597ovh6ofxlysfhzoxapdmwkjexcxzkhqdmxl9rhhimaqgjsm0ys77vph',
                receiverInterface: '0a9nxsq1glvh29elip1bc3nq68y1ffv2ddl1i62v6zm35ps21rxe0ka8pam9byqbylqh1s80voy1teqpxwadawlws260zhccoszs16o8ew2aybdk77c9lutaet812nlornfn047mwhq4ae3xgv2eliobxkdlhjlj',
                receiverInterfaceNamespace: 'forhc0m2lp4llf94yrcpp66prx5mn7w7ko14rx54uvad3fx36rws210sngyuzaree8cg7hgqd65gm1z11azwjnivqzhi45bzkiw1xk31hmokm8z6lk2cdc912tymh81ie2admsrduxq7pkwt04tllx6bwnh7uwjz',
                retries: 2306141778,
                size: 2191347789,
                timesFailed: 7474252538,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'aut1ugksold0b5anzd3zu4aol00pfpizclmmo1vj7erp6z5sbx',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'qadun7knbdw2rt8n3eyn',
                scenario: '12asuoto75zvm4axv69632w8fe94fqejrb31kvqkfa8ynnioiupvhl4mmxvu',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:27:18',
                executionMonitoringStartAt: '2020-07-28 20:04:46',
                executionMonitoringEndAt: '2020-07-29 01:49:35',
                flowHash: 'kpowmrm7e53vmj3j05t060jtna025spcbzbo7fpl',
                flowParty: '0w8bv79f6zie5nlrdlatdudkb5fjwo9mpjq58kk3jjkbarwetx7a3q9116ik80ovtkm36f4tidz7jpcy6r8aa319b9t4mw6jtnktnlg90xjglml09xsbonvdqqn5bl16sdpdgenybjt5khegz486bc6xhpq229nd',
                flowComponent: 'lcbhm1spw5z7z8ehk55yxhux898f9q1zihvds3f4t62qrsdrkny7jyun5jdor2bgq4gokr1am29rv1ql9tyecx39ja4k6eo7gtbfffszn0ph1joj1ncfdweokhi4brt2yxbzp7bae6j4oq4ircjpovslaiis36qc',
                flowInterfaceName: 'ocp128lj93ojfjq2s9t0oew7t8odydu92gb9kv0gmgdv7nmu1vjvefa9frbnhongrr0bzgelpl6szpofoauc7si5zb1t4iw0o7fk44karfwm8vqyvi1r2pxucaz8ejrlutmyenv1sp5nbvxl8x8c6d5tbduce0yc',
                flowInterfaceNamespace: '5ilb8w365f4wucfr6k3vj8bwv3tfq5plbu770354qkwg3j2qkyr2cwkhw2at02qpprcqu76qz9n84aojh9qjmzjwxpz9z2o0i3rcigmeik0upxazx19wexj10fyllal0bcynfh7r0p046drkh5va47ajyzmwaxa32',
                status: 'WAITING',
                detail: 'Voluptatem molestiae voluptas. Quisquam aut consequatur non nihil consequatur ipsa consequatur est. Reiciendis cupiditate sed rerum aperiam voluptatem impedit tempora voluptatibus vero. Unde sit nisi et ut quasi voluptates. Numquam fugiat vitae qui numquam sit numquam.',
                example: '8x3ss0p7dsspx9erypr8ct9uo7py6l4yua1gre3cesi7z8vyakgxwj02hguoeu3c2kqjxparq9wrhekh9dzkc7jxry7zwzshhdx88gg3syel2pqrw3wffffjaw2axd9q31ks68brkg9h9bn5fl7cmeim7k5327dt',
                startTimeAt: '2020-07-29 03:07:35',
                direction: 'OUTBOUND',
                errorCategory: '7jynss8w0fra3hlxpqwbmppkulxs0snbbeklrmq8ccbfpcmhvns02foomy5lzwkfdkr413jo8kn33mi6bun84e4mzoeaeaemnqhy3v7rdzblv2ryic071fpn67xompv5zf1aetxxw5l2ufdcnykgog3lm4p3k8ev',
                errorCode: 'tz503bcntdf7jzmai443dn44ecpgvjw4q4iu3gert7m1g4tmnl',
                errorLabel: 721818,
                node: 2078812409,
                protocol: 'r8620ognt16ubinu1dpw',
                qualityOfService: 'bti5v6odyw8hcycol3t8',
                receiverParty: '5x29mnuwgc2rvdeub8hj27boh5b523mlhensoj3wfm9nd0v82etootwkzfm9c6i7amgu5s932d5eteik0d2bcz4imnjc9ne5xi44i4sk5s646kjpzh9x4tmtozchhuvta5n6l8q3kn7qcd0xivbmq0ju1ftpnsr8',
                receiverComponent: 'syiboso073hexkgb23hizgvo4n1lqrhviv0n3rvjybkgisosm7uz99r5vbwb8aj6xnqav4la46o604mqrrtrjt5frjd0olzvt7pvlm8rx96893oas0ug4n0w6s6r1ib034qiohmp8xy9ak0yh4mtse16y2uxcfm1',
                receiverInterface: '10o9e8fumjii4sgea9xebviz4f9krkj3tyxiyb9ihxlvtwpas9poqdspo6l9u7nhtxspxwtr19s6xj79ksp9q41ngkuyblvggzxlvpxxu0rh24g1nv602oz5257p4597974s5v7nzicrsa1eu70zks01rd3dhnzk',
                receiverInterfaceNamespace: 'r3w7shzkue2oy7oq2d5iqn6ouhidu58pgo4lhrflr9gl9erp6xffalkds607t9rqs2ylj4x6donojrn2tq40xunaphb67lk8317ea6prwehlp87xyygdwnl217n2rnyjrh4i2fttwax5dp56c1evqb73sna5et9x',
                retries: 7251284135,
                size: 5704540073,
                timesFailed: 4162432177,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'n1iec656clmr4rs76k1nylc48znaynog5vu97sieba0qk9vldv',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'vggw7q45aebdnp0juwqr',
                scenario: 'nebn56gvefqt4eu9yk92kgouknlyr4ngkzpijt39mfq1ulsyhl43b50mk1c3',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:28:00',
                executionMonitoringStartAt: '2020-07-29 01:50:39',
                executionMonitoringEndAt: '2020-07-28 17:40:48',
                flowHash: 'cxa6ixbsed1mjwpjywtl81ppexxxslub3cdx1rvq',
                flowParty: 'zrt3piy8do3i35wwrbdhj1yowx0d3dgur9unpg1y1f3ek9fm2b71pyy30fmbtk2hf4ecs75ne1actf5u666ezb5q7qyq1h3jonxwa8ooq7dxp2hxoooizf4wgcubqjxryg5ard1q3bqmb556r13o36fxhr2yieyv',
                flowComponent: 'kva4hzr8mhqdtrbfsl983psutcix5nym55h1lakicahyctlu27ku3w1s0slog271lnp8nytfpd54m8uaops0a44i60ifzp8a3qccl5iv4vjwb273eyfj4mcoazywd5rlceu56xa404p5iftntxk4qwhbd7szguu0',
                flowInterfaceName: '27zntbnwmyuy32vrn1nd2iospw2tl1onuj6la3io7nivqr2v04exixptsprx7lwvwz5lmllgr7vdf13h49w6pywjo2s0at8rjxdgqt0o6ew3i52mnzonb9zjwmq3pqj3lknku806p20lsk48yz6j9bcbkv7a0tfo',
                flowInterfaceNamespace: 'v1h3asuujd77e8aagag9xw4osb3kotgyrsdzo2heq2khdhuxe6kzoip3xrfzvn6ylxrci06d3ux6pakg6nfwshnmoh8neqw1ar6owhdtn6fztglu8h7ytsx8qiqb2tg6fw1xqgl87qsxl0fdqsa7wm73v6wrzbgx',
                status: 'CANCELLED',
                detail: 'Veniam sit ut ut. Cum culpa recusandae est voluptatem. Quas commodi voluptas reiciendis quod id voluptatem. Consectetur aut aut aperiam et voluptatem reiciendis reprehenderit.',
                example: '2eizc9w8ipbvusc05g21cpt4wipaxzxwgj097sdyds6qycpq0uan68wsxtyjqzkn0tlgri71xl3x0hgra8eq5qs3svvbt9f83jwyxmn68aa8pk6mq2ewn3fjwd1znjx409e8kohk801x7kwx593eaasuco8z7mb9v',
                startTimeAt: '2020-07-29 06:38:21',
                direction: 'OUTBOUND',
                errorCategory: 'fgfadeajlb5p3kq2dsofh7xgbycytxjqoeuh0tqipy4t2f1nxk0j7d9j4yhhuhm8wrfl0h0v03u545nqiv5sz76drxbu5tmnh0xc8k1soqjtiuxi9lb0rdvlvpkjjqvgyvujks7gil2pzf24rbdriwxuv92gso3a',
                errorCode: 'yd2d51a25qxqkuxdju4gfsp5n6k763jscnkk7527z8krh4rzhw',
                errorLabel: 973733,
                node: 2550430332,
                protocol: '3sga66ruq7k1yzuw7wlt',
                qualityOfService: 'ae1qro0s5yttvj5e8w6e',
                receiverParty: 'jo6sd4wjbnohmz3jlyis9zf68r79txsdd8ff52hjj5xnjcmho07t2zx2dz75h5o98rx7ei2wff1q9v4eu801ac8rhkjwcrh3qhormwsb2jy9njfgfzu7i6zjd0u0mr4331trqu4j9qvrdznm9x6ujs2ig5r7sq5w',
                receiverComponent: 'hoago7xx0ztq9vknabc1h0s1h9fecc4ofldt9jlo3hta20shnzdg3xnld0e669lg1idh6849bdbh0kyxpol2f6baebfpp423u138j46uhy4axt77xpud9bfeng4fxdqymtj17j4b0e6yh7lgwz2t66vebntn7i4t',
                receiverInterface: '4yyfhe814xrgihw82j63mmb818zifiybkogv68tnjbb0dmca5g2704fh957k2u89qs2fn41w97mz3swjckz03gjkkmpuqlqu7qrhlplbpokzwl0bn6hfu3qv2inzgqbvcwo38jczhsdfgv8e2hs8l7jjp6hm9m4x',
                receiverInterfaceNamespace: '9vbmoahq0brrmiusdlyy5sf378gtv7aeee6j7b4tblsuamg2g5lnlf3i900n96n0l0ey6vjl5tzjgee99kxo2z0cvwbnyjrqtet1r01gy86111t3ewazivnslcdy4ty39u2mcxiv3japwj5wamg9syonwx60szq7',
                retries: 7398167541,
                size: 5490144383,
                timesFailed: 9989611494,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'aapd9efce9xkqvc11qu3fdyxwxsjxhwtey1nbrmxfwdppr0szp',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '420qyblroxby0n6kjlke',
                scenario: 's0rmw5fhrgd201jrmq7opu09uq99coyh7v4er4p92uejxq8dki83yqn0mrqa',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:30:20',
                executionMonitoringStartAt: '2020-07-29 02:28:12',
                executionMonitoringEndAt: '2020-07-28 17:46:04',
                flowHash: '16ksltu032xowkbr0yk6hfey29srl5harz1stvqr',
                flowParty: 'y7kphxtjvjpwnz3m2xnwdtwkawfbql2oscw57wah0p4u3baveo98viuon9t64gbu435hrfq0pcnjrcjfrj7hooywd5cet701iwt0vm24bb8x3jgmh057uhi1vn5l6ubhiji0itkcr7j4gm12nfx4vjc5fd5qvqq6',
                flowComponent: 'rrj49khx8trpfitwjpd2ht1uine8haaupoa3w6cop90mwbmtmnapknoh2f1youysjc7irx2amdw52iaiknymi0fxgb8b1qixlup3e6sd3yhwp4wznp1k64666k5csr0plj7ve4lawko9jctqcu7nsokcargv85pc',
                flowInterfaceName: 'mbw1xqpnk49h6ignfuiojssgtvhh8tdcjgstorjq04v3uixfvmjroau0p0k873vdyjo1gxexq1kwbzhygxru5nzyp9xhyzadz29sd9xfn0po74jh3vu0uxgknll9rnvj12hyr1c99uvb9xnu5aunkkv1omwau3ss',
                flowInterfaceNamespace: 'f6u2qngygh3rnvw06l44lo4gksm8o66c0gp72t2mdiw3bqwofzsoyoutbanx1mjw72d3cl3jkp8fspmzfna8elxn2ri6aoxeu85a8nkvic37ure50jkiq8agr5zki6gt49s3a0x8kxajyrx4gtlzwtdk8logsz03',
                status: 'CANCELLED',
                detail: 'Tempore nihil quo voluptatibus. Vel nisi voluptates eum beatae veritatis. Consequatur est corrupti unde quo consequatur.',
                example: '675jtpxumj7tdfu2xwf6omt0sscvim4w45b8eg1jyiimsrnlb1vs62s20gucj0y7lqj5des0rn8f9vl00prgdzjxdx4muae2vu2vnbydms1n9n14hzpp86etjqnbdss44g4c06vupw2rwcxevznp2625u7r897o1',
                startTimeAt: '2020-07-29 06:58:30',
                direction: 'OUTBOUND',
                errorCategory: 'p5sjqgr2kzrg4izqchuz2end1oz0hwojhxam8vl6jeje3ovesaumoos67owjg3lpkdmcqgvux81tq56wcn7p6xj4d0cnltg48692npao20wrte0x7xvpc8glm4o6xignpyho30p0rgiojna2fsph9k3s8p8ccj9e2',
                errorCode: 'ivsj1jdfy1yx6el4fyw4g7qpxycbk876smo1duh0wt8alc88ww',
                errorLabel: 757038,
                node: 8371597104,
                protocol: 'je5xzcllj6by4xhrbln1',
                qualityOfService: 'z6c4fzi4gnf73zwi366d',
                receiverParty: '6dj9zaj2sfbmu135j3137hb7v3vffjimq3gbv9icasr9xumfocao4grxbn5gtijquydgxkxc6bkyv2d0kbfp0pqr9o19wglrobk00itwgolnsmc323fv08b80odtqalsqdjom8fetmkc9i1egtkx887h67nkuufg',
                receiverComponent: 'rjuo0kixsriunhzvnpxnoxajkwm75a7stzvnjtyssv4v5qvzt4yrnvho4v6tuum2lehcbldoufk1h7pcs3el42nwcf53mi0omj37zu070nmbnkj23fpcowyjs0hiv4kvz3ogkjinqtskorz208sa6tdxbbowtxzx',
                receiverInterface: '0ttbqmu8wx7gg8wmsyihzob13gieacnxvqxpa78claaamg2g9bn6cthr0jo0zeysy49n9psfnphknblhb9nniu9x7p4z94egexgj7e0em1y54zp2fgjojz6h2xzfdimmxdtc9ogz6y27sv3h1478vfaeywtvblaj',
                receiverInterfaceNamespace: 'lvbhmahl9wkixziyii2j7yz3awgmxn17r5iz0ng2sv8cu5p43f5hjq7o72vs3cv0sv90ev8v14ykt69gds7w0mv1kci65emjkefangu4b52n07tnsjbvqn0417dbmcn5vwpa8lgyjrkx2eixfuxtlbmunv34blhf',
                retries: 1698355464,
                size: 1675123614,
                timesFailed: 6951092954,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'l7roi1fk17zgd2rbyg53a04qemk34lv0g04i36j15e1mjoqzv8',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '7u6vdg0w39pzgfxkjwyk',
                scenario: 'y3e95m6e30apuiclv4rce80kdvwdmzkq2hsum942j95we7p89hiqio5k6anr',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:28:56',
                executionMonitoringStartAt: '2020-07-28 20:50:48',
                executionMonitoringEndAt: '2020-07-29 12:50:06',
                flowHash: 'x6bo7h8ho5zw53l04f548kdvydyws258qjbz8tua',
                flowParty: '1vcngk1gznmxauzaxnb1qhybidhwcwgd963jtksp78vmals6ovpmmaicb1r3kd8lqejlqj6hci4jy29mu0xch08i9t0mcucyxe9scye58tybfqx3rp1dxgr694knznnylzg2cdsszkwl41pbm0hg08vofgw7p7rb',
                flowComponent: 'ipylo95rw1iqau866uave6ioirnmbt8s7bn5aa4iudpxuv84ccin8lxzvtkfuvjkblwf123tr52jv8e77siye4w5cyma7nfdo9z95mbbh5fltigezo0irsgf4xn0dr5tln2kg4nhx93djtjzp2s4vytoe0bzwfaj',
                flowInterfaceName: '2kcfv5kj1zruish43x22ssljfzaq8o2vhwnaapkazebzdzseum4r1ztyxwod8rak9229mzayn8tfrccz1qjh6zv2dfutrlzy0u6ksb7qsdgk2urrbkezjmpdzkwfme34wtqd7qehte05kftgw423jezta95smr84',
                flowInterfaceNamespace: 'gwerq696n6wr42qsufcjs6uv6171788anzu0n0ksqdzqp0av499lnh9c3nln1qsvxjwa2osx6p4f1fsyupu2ndqcyvqs29jzts4pboucoqbdd79k297y7xw3ip61h5gzbi7uvc6hiwfrj4lu8v20hpt27kqyf113',
                status: 'CANCELLED',
                detail: 'Quam nisi cumque. Autem ea ut amet facilis impedit distinctio molestias et. Ratione repellat voluptatem commodi blanditiis. Sint autem omnis consectetur et perspiciatis. Ut rem quo et dolorum dolorem ullam eligendi. Molestiae facere maiores.',
                example: 'bofoyermvr5bi6o7lt0cgnkyee09ftu5bhqorwwklvl22cjbwhtwp5no2heo6f45q06vdogkiw728zjuynxctjn56g7hs4wke6hb55nfz8l09q9zhksli1we2lt7j0rj9lsfppl58wzc3qw509uo96jny4i5ejle',
                startTimeAt: '2020-07-29 12:25:19',
                direction: 'INBOUND',
                errorCategory: 'llktw1yajbn99hpqyjy331mupybvwpdwsjhear1hh44nes6vy9pes5fuiuw0viupk2c3fo1d5m3fqt55p62lx3fztedofd9daloinmljctxzs6vvah74x7jwucik9eiwenl8zx4gtg8zlh7w35xn7xy73l4386yr',
                errorCode: 'wz9pvspzg7ltez1d28mlzjas98vfxt2x3ztf2ac9nl6blpkq00i',
                errorLabel: 817559,
                node: 5823867519,
                protocol: 'kxcvsj9hxhrlw1cknb80',
                qualityOfService: 't2rhvbvic48qgh5l0lp0',
                receiverParty: '211i0fho43z3y0uwydyxipr6dto53a5pde3o343rm26l6qc6w7l4qdtcnpola1v22iq8xb244m7j8t7fnz47c3odqo72ui93itz9aaj536d91f34rfkbtm495cl82nw5pevo4uxmtihonfzqmk0mg0dd2zm8wllb',
                receiverComponent: '5h3xir9ubni3wsw8t917burolin7ylstozmw31f6tisrtyx5mc1hqzz3s2xkttts071x80e8n6izcdgh8vwkzu4qqa5a8sbkc6ajhjilzpvhkoiy6ch09ouupke84m9v717yxx4hyd9p33i6r38h5pow69ggoh2a',
                receiverInterface: 'obmickxk3fxxii4r2do15r6bk9450xivv2vec3efbefo79qlja4pnccd6p5i3frarylaow05b6b9l2z31okaklu9uesk53kwb5m80cnw2bmcppvi1amrlicqxyqahyj9xkgedfmfxs8b0dver5fuiwq9ee8vzsxf',
                receiverInterfaceNamespace: 'aypctt58kh3gblvsj1ig3710yyqh4mecd2jz8fap6e0pt407pl2gpvgi5n91tgg1c0o0w84vuogolqia9s2r7tax7egdlm519ch0cq34b33nrw2d9hm2ujbu84j0uzx86oya35v5h2qw60v7v4rbjbrbv4atbupv',
                retries: 5265416398,
                size: 6890463959,
                timesFailed: 4051243994,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'syzpy3w63prsttamc634n8qvfnm79aoolwmbjfmelucs6nsodp',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'e9j6q5aytruqshscizie',
                scenario: 'mxx9hg8yyebecp4gjumkntnn6v4j13vxl581syhs8ie8zo8bj7a75vb73pe0',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:46:08',
                executionMonitoringStartAt: '2020-07-29 16:11:54',
                executionMonitoringEndAt: '2020-07-29 03:11:16',
                flowHash: 's9zl7457ycbipdo4btr5oc0jl7kucsr7qqleggkx',
                flowParty: 'v2ylotlzxzsqwceq2xh3zmrgvddp61k9w308uxri52d4c13sluuzwo9wox1uw93pznqz0y17u27y1nd9afpyj2787nvkatnh7s6m31jo7wna0nl3h536ei05wtsuigt75hcql0zxptiybr8ko35v4c5rsu9biz6o',
                flowComponent: 'i6raqtqddyt3l0tj5f2fs8h6x3pxuizycter0fwg0wf46bep0k4ryhvl9bqfaauncvykazj5wc6m76r5h8oxorb3yi5xo9i38c4hw9fs95a453lbt6qd8fqiw8c5ild4tfl6pjldjxssf1evxihd3zkzd0k6u6al',
                flowInterfaceName: '363ngtae1a0yu8ksuulkoi5w9bb4w4jheoinsfvgofaaahasg0uvr9uyu79uxdg1h2m0th91i7ne749xogymzjwoy7mqe9gdoqawcon76b6rpueq8uinttjwijumxbinakdk7vthl2ljkr0dr3b3apo8tg4a8lam',
                flowInterfaceNamespace: 'hpqjvgq329k50c4ped2xg1negt81icyyakstmmgwks1gpudowfswkhj7iy3qhrjsb8rfh2pdg3f7lo51uv2k1js8v6ssbaqwp61etaw3u02orprtcqzrzle7dn58i5pedwu1sactuzfct3867p8s4nltuctpmt6j',
                status: 'SUCCESS',
                detail: 'Maiores et reprehenderit voluptatem suscipit. Est deserunt ut temporibus molestias perspiciatis dolore. Fugiat incidunt qui vel iure. Veritatis eum et harum dignissimos quisquam perferendis velit. Similique sapiente quis ipsum consequuntur et.',
                example: 'vse47k4rwcqc8sbxv0ux05ifedbrxaavf8fhhir3irvj45hn8myl0jcqyw7t03qlanl97wk9gkf8lks0bmp7uyq6rzpk8fyja18o8yuye5xavxcc11hf9httcoj3ly09x6qfv30hj44wuzxd0jtyljoo8n9cv62v',
                startTimeAt: '2020-07-28 18:31:29',
                direction: 'OUTBOUND',
                errorCategory: 'k76pmdboe0i72l0a5bpcdspnpihjengwiyqzjfqm890v1ta6khywupkx79q2xd7dbmj330ojlle1iuzoc0x44g2lnp0op77n8nm5m45qab6ttfiwviwc96hwr71vwzz6qwub3a6lzopwr1pe8vlw8233jy1x4a3i',
                errorCode: 'yj5pmz2gkyn4ezidturm9kcatrb2q5j8csv044ha5qt1hq9t06',
                errorLabel: 5353826,
                node: 6841614339,
                protocol: 'tdii6yborzjnblclsk5q',
                qualityOfService: '4vnx5rgt67qtyg8ksuoq',
                receiverParty: 'ecnpg3o60tkxo21iyt8xnv4kivvqbkzxmalt64x13qwrje0d7v7nqmfzvehuf5ccncfip1szmmds73156q1tuz5flt8lbewgg4tntowdjvxu416nyk3nplydottgzlgkkxuz7vdxoibo2ob29bxu7afwgp7ygqbi',
                receiverComponent: 'uwvwdcs5j68ygqrbp7ibk9upxt22q1lzcgzo79ugzm8ao6u2hu5an348juj81jj8ifzic19zjdwkqpa3muk9e21u65jk52xe9lgk0xm47gbkhus757c6tn3c0802bbp8oqhd72f16qbbz77lg2sgyi5gmc0olmce',
                receiverInterface: 'panfhvhm8wswotejdjljnoryzyf3tavdseyftz0x77xmfod4gf79cmfvopwci5pmbgbxqof5sn579n0fvb6ld5vswxgelv122wxdadsm6xuw3ta3odsa517i3yuinkojh8q0ar9nlxw5naf0aqcfna8o507osre7',
                receiverInterfaceNamespace: 'qyqvm61hpqhg72ce12ljwvcb9lghm23q5dadce1jz9fhdj0k7w14eq4n44lstu9zj7ljb9qynjsn1ymhm5p9uh10o5s85fwprx4w58zfpushy31oacae8bf1vsqlk8wqgtkt4upai7qayiuc296nkrgtmk2w08ua',
                retries: 1721693168,
                size: 4129832063,
                timesFailed: 8565159373,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'r6v3urcx67cpexz1xwhs2v1gdmoe9cplmqdm7fxbkhj4cgvlkw',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'lbuk3rvc5zx9jn45er8x',
                scenario: 'm1zcy8otpfe9bs5b5zu7mnytfevfce63dpn924rzi29dwa9l38084ajbycm5',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:12:11',
                executionMonitoringStartAt: '2020-07-29 09:25:10',
                executionMonitoringEndAt: '2020-07-28 20:44:00',
                flowHash: '8su6pkt7s5mismwaeybis3wztxyjz8fuiqfixiz1',
                flowParty: 'iky4i2yd8wrdthvb65t04idsx0c2futrynd9aw6krlv8v07zxtagw5rdhuh9gdwtw2zzkbtmi7obm5mf1vp2n8a8dc36giiq0r1j68x32nochanddt5d8cby21m50w26sxpo33kydd6d9bma5cbbi02du2av3u1t',
                flowComponent: 'kgmikt0dcqohkre9cd1swyo1qmvu0kgrg43azo1uqonfwvlb5e4trijbtztzrzxhnzfng90s4mp30vg1rq91za6y942mdemoqhzuagqssy6omf573dg0b5b792xgnnp3w7y5l9s63a4iwsj9i5awqe72m2myj5ar',
                flowInterfaceName: 'k9xwgfclua632c44saa3koonwbdqhtc2dwydeg8hgi5ejqm6jj8kqgiti6prdf7o4lo5fluta16yx7uc9vf0p84nj1eclb93sgolpji6xs7ireygi35c4ziw1nb1ykcfmq9nslvjsjxqsov1e9898luqsneu3p5j',
                flowInterfaceNamespace: '5ym1rukgjaxc7wyiaqn72vjb15yrwu220mnui8zy3c33d3q08rozmj1dqrynnhgwkvhypi5s8k1ri1r89k73gjzwg5str9sl1buqqx1hn6971d6l37mm5yjtgfsc9bhappblv7fzdivojgw5rrzl8ochh0fog20h',
                status: 'WAITING',
                detail: 'Maiores assumenda modi est facilis modi repudiandae. Perferendis iusto est repellendus non praesentium commodi sequi quod et. Porro quasi harum ut fugiat facilis quia labore aut laboriosam. Quibusdam laudantium et. Qui aut error consequuntur quo.',
                example: '9s767hesdgfc4joxx12f7qq03h9d8fef1yh7w81lsmlozv87f601uw3h4xo34fe17ndt2d0m5p9eejq2g9oarw25x9govzjy03kq4sixv2huwil8odtohi8zb55ixvpsmmcqblx1hyq44n5ne8fhva3z3pf08l1b',
                startTimeAt: '2020-07-29 04:19:18',
                direction: 'OUTBOUND',
                errorCategory: '15yuhlfmv6crcogplh6t07ww3tom6o13dt5hohj2yrxp4t8bgs7yjr3dzoaceew6sj72klo2d41tw3676pe8jvu93oi7w1cr52x9deedlshwiukavwga9dwk7pfkgni6wm5eb7vix7o0q9go5qpdov1fhkd5jfw4',
                errorCode: '43vf6919ey7mk3piryrknbkybz28v7mxv93lau5navleequo4x',
                errorLabel: 686418,
                node: 82888861171,
                protocol: 'f9ecdllcec6h49a0vhkx',
                qualityOfService: 'nwezx5fs3h735dwkxudw',
                receiverParty: 'el5hcqfq0owjrcqg5jbuqa2vb8vanlq02mnk2r8bd9lnzqt8hllkh3u2iew3fr3xf1wj58tt1feytl9dcgjwhg1v204dd6atakm8bnembm1qg9u8qct4h45f75t8e5x1p4y2tr52ogspv3s41oujhi5bijrf8o8q',
                receiverComponent: 'yqirzr4i1rmoijxvtw8x5jtccq0r1zqehvanehxppirydmwceb6el1v5jxw3kgt44h034qgqghld0us72zh9r4zcb8lrdvsxa5zsexi3clipxeyfeydzl3m3zmtconoq4vj0yx16zgztctb6euayfa9hthncd01f',
                receiverInterface: '30kaxlz8o53qq7jszttjx7illzga4kqd79f8z7a3jpro7p6007b0remx68xl6drwplktrer4kfccrqbfd3glvjp6quvo3l1eto9rvyoiqy5l1hffq5i8cx8pcfsr9o96pgxou55m7g9t5apjs7y0lkbjrrkrtj2n',
                receiverInterfaceNamespace: '7jdawpgrmv6afqx6cqmwjylgsf5nw8x7csqfgpv48rcvr4gm3blgioqmt4rdjxr011jp6nvtbhojrqy747s1x9mocot7yizhoin7t5ekeo2cvb72f0htni9aqw2weh04eq77z1svehhdasjti6wbbxn4o62klttf',
                retries: 9191506567,
                size: 7586957755,
                timesFailed: 7837080129,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'edig9lvk3ylbq7bnbhaysz4eewifu5c41xsbf7gfw2pj7qvo3e',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '23c3f9tsmesl6uv03jud',
                scenario: 'bi0nopadz9mmtlfot62elml2tsq57j957mnu839der4ijwy28evmhqta76se',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:10:31',
                executionMonitoringStartAt: '2020-07-28 21:53:49',
                executionMonitoringEndAt: '2020-07-28 22:33:19',
                flowHash: 'gebxlr01hzp7pbydie6eg7jd72u2tmrwz6x6zgbq',
                flowParty: 'bk9hm38nvsfi1bh3xagf9xh1e9h38hyx4y8gtarq8o2qjewhngf9ejefshkdb8jfgk04jvllm1j4iio5hw4ntaww98d2w2lfgrl91rohg91ghuip043so7lww1whn08db0hm9152g6rpadih7xsz0nqvqqno0lv4',
                flowComponent: '81yb6m0vbry5abnv4c9uys4hhlbjzthnwbjdaswgftsm49yfp04k219zm7axsxzadp0s1sbxv6vftkzrt4hliz6rbvhf0zfxv4aq8jhs4cwnej7h7rtpp5fts1vplapelohadfozbwa0dw6kxwsxnix6htxcef71',
                flowInterfaceName: 'shul2x5403he35ynmrcgf1xpkh6fjuqz4gx31f1gotp1cu55q0waeo6eicguiac739pp38q671d7o8tsc1nutgzgvopbeqif4qwl64gtqvbjo9vgix9zxta0mo7roxekvhlz4w9quovp0tspmm16rrn6izqj5vew',
                flowInterfaceNamespace: 'quf81nvuqlgqo6uyj67cx1vmwyzmj8x7rl55v8hb31rx4s031futd0028ny4yz15ockruqic6mi10qswax9q5hixelbxnchmx6r81gn35hcjdurd5wpx2fi2q3c057o3sje7fe922ifwodiogfix741ujn7bn1l0',
                status: 'TO_BE_DELIVERED',
                detail: 'A ut incidunt dolores magni dolorem reiciendis voluptatibus ut nobis. Sit non iusto quod hic at excepturi. Quo id animi. Ducimus vel labore nihil et. Ut accusantium esse quas suscipit voluptate in. Veniam rerum mollitia qui corporis qui aliquid eligendi quo.',
                example: 'q00as9p4vba6ncssyrkgnwys7lhfxg8bdkekq7ewepafcgqeubpbyrztt1iwgq8r0f0fxilq691qg8t4xo5e8hp1qk7wcow2k2grb8z4blbi8fghsioqzj3crdkn1ek0bwooenqid06g4hnkvbdnbzzbbrl7mmv0',
                startTimeAt: '2020-07-29 06:08:08',
                direction: 'INBOUND',
                errorCategory: 'sqtc08p2k6znjr37j3x8j7iismn00mnyaknhuvli7vwr60iiti6itp8dj1uff7wgnbo0jxkdagya1u3d28foeyahdks4e6ajtk6n2bui3lz2cfk76b51tbqbutmomcops74wpgfeoaks9spxsqvy4sw9o0gy1um4',
                errorCode: 'vngttozawo3gvgve774s8ci4bokw2r1yrkpivfovoc0hc1z6zf',
                errorLabel: 303501,
                node: 3090317787,
                protocol: 'qi2urcpamgydme4x2w77t',
                qualityOfService: 'gok7lgb4swiivnxrisix',
                receiverParty: 'jn0z03vli8lery22tcy8ghbztothnw1xjeiadvoqiig94hbbbj7ohd2q0rshyamz6rpukhz7a5bdoncv160kpgp2har8c52y4cqjkanqu563gftlhz4u1v9nr35bfvl21veig2ezzv1g11abl16bpx3if4bkf5be',
                receiverComponent: 'h7pgxe0v7wnmx6edcx0972i7haucv2jxl9jwgiwxwhjtk9mrunopmp3x49l91iecdtz576tcoacz3t3s68tur0q9mv01icjul2twy50lvjqhls968a9b5ymtaemsqehkahmh5b01djhviyvqlfqal0pqt916llau',
                receiverInterface: 'c02atla7375ijtal9xjhipgrgpcf2hp21nwrq5w03jof31n80nm7rsstg67ba75c1cvwdewnsizx8bo7b3ij9awpqpihyyu3b89v99kpfj32xd78ydq9gx49x39cqyi4fxspi5hv0480co08mi4zm66za77q3gm1',
                receiverInterfaceNamespace: '7lcqowf4ie6wg9metwzd4u05oqu9svqklvly6rqeae0mqyoa8hkl4u76xdhc0bn0i01q9swfkuk149dtspyifozjf2ph2s6060yhauv2gw4n8qvxrt6xejwnw43x7jwwkzzm7n2jlbdli5jfhzfgphpdwke4cf0b',
                retries: 9909264087,
                size: 9637506105,
                timesFailed: 5947770673,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '0zcdxkcvl3o4gnrklsutnf5f4gpjq8anwxlblpkvpees8d5sx7',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 's3dgl3rf5s67ux9kd4ea',
                scenario: 'qokblbdvdxsskifaxhz2nc0bgva5px15wkkhzhr157mpnhbrxfrh2bq6h006',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:54:29',
                executionMonitoringStartAt: '2020-07-28 22:21:11',
                executionMonitoringEndAt: '2020-07-29 10:40:44',
                flowHash: 'vzec3qr6jt0xws6zlzt4dk4e0k7g73nyndrgjztk',
                flowParty: '2xqtqwpor6gvq9edhndwac64547su4zx8t9ss5tt28zjovcu3cn4vgyjnqvh37gmn7kotlz3exm7dkpir5zmqcq15giz4wqquti2wemdvh8ux4d2uv4icrcnsnygtt59alg1njv5ory9d5uewlwpdzbdaw7t4puc',
                flowComponent: 'lalbhwbupmu9s3acfhw40u5d7mhkhuh4mb0shhr9ah3xpxgnqhqetayygr39sdu1wwcc3fcbc13istg5rj9vv40fl15ug1omoqtj92bfzvq0nwsiiitud2e0oslnj3wjuqnd9kdxrb15ojp5pgu4bnu7lnob3rqw',
                flowInterfaceName: 'vehcq5lil0sopxp9y7vokdu2q4broqdi3lqgy8fp5v86nxe63m2o2fm33tgd5e3yo0jrabef8eu7ceod0mnkjx88y0n7oxs427vnhffpg117caicr61q61gkis95q9zbuye8q0znkdvko07g0wj7fuucn05uzh3k',
                flowInterfaceNamespace: 'js6vzm4by71w34vzrngsbi7qsblyvbfsx08tx9k2lt8bcf897iv8qeh4r7oc4umylrfukf7tp6c0m4r2dtd44ctp078esjr4xr17i0vh94neihpea4f50bhtwibmg511uvp09do3m7ssnuaj3ayr7ln09cme530j',
                status: 'WAITING',
                detail: 'Enim ipsum totam. Quas quisquam reprehenderit molestiae consequatur in. In sed enim quas ea. Ratione corporis temporibus aut rerum.',
                example: 'i3b3oy9nvg338or3myuhdhih4fa7q65mv0e83vbofx1zp8fufbqu8jlxsrmmg2ytf51y01lsko0rsheztjlph9siveht5c37ltwl6y0vc08ypbjts9y2ysyekd9f9l10dilzsdwp45lh8hlnmjsu9bnmjty8nqhb',
                startTimeAt: '2020-07-29 00:57:57',
                direction: 'OUTBOUND',
                errorCategory: 'e7pq1xluy4mzeer0sf4sgiv1frlw15we1m1p9foq8wacodulrhskgn92fj4ieevjmdbfjfieko09f3uyrq565krawrsyv7n5iwofs3g65qhgdqrwosl5kms453q2f6d6x50zzfqqsijpzgxsp4tyahzky0ldx8bh',
                errorCode: 's9uf8kggc9ypqrk7z1xtqv5kanrlu81vvjyw0s2f2q338409j0',
                errorLabel: 205155,
                node: 1446481814,
                protocol: 'um8gln1sauecz1fsf1yj',
                qualityOfService: 'xv5elv52wcyvepvwxd52o',
                receiverParty: 'qsf8kfr7fevauc7tmm0z68hr2z8peut1yxm566aku1zvinhg38zoptznlntetbr63gy91vuorrvmzka6znocxu6s7a2xed3v38w943i563hqu391sddsdr71e1ys7ydi593fyablhfm6fq4td6x2po6oxfc4fmh9',
                receiverComponent: 'nyk50l6et2spu9r4tj9wi4ngukwhfiinzbkb0tfkl2rh97as24m1c0zy9wunrqptdaexcdzbrg8pnlhe7jh8cmhaop79qti9zlmh415q7c3bz5i5s32b5cj2xfg9ot6ns4em4ad00hn2to35s2ny8rh8sjsi9aoj',
                receiverInterface: 'ehb4ygdbee1c3xrszsrm9xjhh9ix0a0wgozw84cplqmfbipfbf1c11ob1896ix2xcoll465ozypf1dc3axjwvu55h7jwtye87358brffqdkl5i2otlqndsu8s6wdbw3h6mbmrkd5ehotphdxdwkhzr3bi017c83o',
                receiverInterfaceNamespace: 'uquerzfo6xqgwq5ath1yf36dukgquoarodysx12pbkrpgb5ufbdv9tgbp991id7bcplq8b2upy5vmoblqslttgsjy2s2yabdkhoq05em5s6i48upevsbs97rg50a9cfnzcvdzpqdc910jxklwxthnm4d7otx1iaf',
                retries: 4354505032,
                size: 6137167073,
                timesFailed: 9297730228,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'y7jgf5krfsd90yp4uws0hua5ivhhfsts50vbdlp7ljn0a9z2ae',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'ejevztykxt7kngjd8sq4',
                scenario: 'ml92pcpa5ihbtk5zuzwstj6q3f2lwir24f5hudtavg530zdvudqgz34epk4q',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:43:17',
                executionMonitoringStartAt: '2020-07-28 22:49:08',
                executionMonitoringEndAt: '2020-07-29 12:20:36',
                flowHash: 'mpt6td3fb80kva8mwvrrlx4q8kl2z6aw28w6u82e',
                flowParty: 'g488oodgtonk3bjj10om5k7wccqbpwgae2xgqfw6qmsk0v8v0hnmq78zn7dmdtp5oi4nvpmv3rt558g33vkjgjuymtyl8zb9n0k8lcnor9lseb9iz1qc57vub8g80e2aphycca4uyvjyl7zm7pjkveleyfbk6rrd',
                flowComponent: '8uo7xxwqfzxkt1ix6dm19j9s58ip2p6posjrv1082c6k3ja21shzkt6hnjkobqppbjon1xzru69n7dh6we3smcaz3649vtdpozqyqhk32lw8536w7wro6t74i3rlchsht8e1l7o26d0jqj2sbgrqu9jxzezjqnoi',
                flowInterfaceName: '9am31en1avt0op6sflg9rw6ngb3n1fgrnb736ms7rh5h032yk3q03kr8hi87wwjfc2k5u0xt1bfbl9qlvt6r78k3fw6p8okl2vcxntb0gznt3z24n0l12fwj7wqbyzamnxckrcpycam04lhifq0ofk345i7m3hkm',
                flowInterfaceNamespace: 'cpuxdl6hhnti1l1mq3fzzkkj43g9mclyey26f55ln6en7tq60su51ihao93vmjvmraxxh6gttzxa5n4dxe4cc5wwbqxcltnkx99o5q41pshzuxm5oqg7ww1zvhdytr76cqeyhaof6p7fvfcxmfv5crxifvx1605k',
                status: 'WAITING',
                detail: 'Saepe quia sit quis aut qui amet vitae non. Est unde dicta. Ea nam dolor. Facere sed distinctio commodi qui dolorem fugit labore tempora delectus.',
                example: 'y4nszfevkrigqpqkvz7efsuh8gdeokzx0azzhmaeecn2asivtg7kvzhzjwip98qyov5gb36ovu8kpt2l40qga9afm9exuv0okhnc9ay2zpv5tx8upksmkymxxr9u7o3knuejfkhe467gilhr9o6l2uor2djrx011',
                startTimeAt: '2020-07-29 04:42:00',
                direction: 'INBOUND',
                errorCategory: 'xtzsfbse8wd5vlqio07as70uoxa7h5ccm8p5499ybatk8jyd6lf6he23pnmyu7bknd58wput7m074ktevx9mv8qd4agwmw4b83n6bkscsyv6wyok39f6hycjyob9lq9x438raum0wm6s9hyy6ux8afqyj3a1rikk',
                errorCode: '32gboabok015s6rlna8lro5pyp21jkjptrcbpz0k8sb1abo3ss',
                errorLabel: 437338,
                node: 3541021886,
                protocol: 'f7wnxm57nhpr64r3hauh',
                qualityOfService: '9f0td9y645xw2v5c8lf1',
                receiverParty: 'hysqvxkq0112spoc4ma1wx41rblgvfdqjl0a7l2xdaj3d0mk59v9ysydrilr7s76yxx4ymwsnv42wbew49mxn1ckdaeel3ty32beb5atzmrzt1q0w2718z34w4w6gf0rs0owc1ay2hfmj1an3gjeipd4073w1s9p2',
                receiverComponent: '9tsexacry3abc9196sx8qmbkuvi6qc1iym3u516lbuxgl99q6wcu0qm57v9z901o74f99a47en9fx31o8gq0l2hszzo50hpzle05q4wjf4dltat9q54ga2jizulzn51ms7lkx36bpbo70caw2u2p7knidwy701bx',
                receiverInterface: 'khtvv8nxd0qppch37uwn4qgelpoeg955mor7atpmbvb4ihf0ryv0ez5kp9gzbe5esxrnzw8bfrz2kmoh1epav5uiswcwzh5elq1dy6rx2jq658r9umxml50x3d8fkmyx66ccwt778guldmvy9e6ybos3o17py1bt',
                receiverInterfaceNamespace: '2q0b7dchl3ar2jcwhidmagp1rgei89g19bxs75z6q9n322efm6thy7ni9a841nnsy8pt6px1kxlwfgzvdwer5rflk0nw8kir88e14eroer1sczyk763ig49kv9givzx31nzmjxekbln9uixhzz8uyvszc7n0uawx',
                retries: 4037235059,
                size: 9150948856,
                timesFailed: 3773009297,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '8k8kqldedrh4mmomwghhzgjea55zrbxcctoolaboj07a427b8d',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '2wp1tshkt8q92jifzagi',
                scenario: 'ganpu9hix6kfwyixfb0vzz98eozdk2zdjzo7gatbd5fv3dkjv3v2puvfxeng',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:08:27',
                executionMonitoringStartAt: '2020-07-29 02:05:39',
                executionMonitoringEndAt: '2020-07-29 04:33:41',
                flowHash: 'yzuakgl724mg2xoqiie6soxtfsih6wbhnkt25q8e',
                flowParty: 'v554c8dnpqalsppt5vcjm0mxp41d9e3egxy0mah2od1yktsxbklymgh6npwr2y3drgimwe6lmu09j8o9c87jo5j3bzcbx5xne4rma2zlrfvyd8ni9qsqotdz1fj4i15qeco86pvioc5jps41fdc2x2vltq8ifigi',
                flowComponent: 'gv4vbkezsqw27k1adm6euxo6xrvre9ja6q1jq4cngsi505ks253e1rqkcos09qtrg3e0y0xpefs7hkr4ffj8hcihyihkl3tlljtzsjhofvav1b5ontq4nlmf8x1iv1c7s5daswu9mrs22e1esb7kjk8sfisqyzt5',
                flowInterfaceName: 'oz2tybht6yf5ye1gc6x89nq67zwm2kpppupzyeezpq68kqh8wne7sv1o4uztfb9xd57qw3mx346gc55nv425vaxyfu5e9ucw5nqeijjkfwz8g07rs2b297je9yq5kzak1frhicwtlmixuene8jkd6mvveu7chx9l',
                flowInterfaceNamespace: '3p67kf97o1rl4xymb4xe7f2lljy20xfww8wa4b66sn96exhxcvz2kid1n6hqh5uriz64q2wz9255wiyuut9hgcej39shd830s08cka4v9ph5s1iy9tc1qudka2pf8jc30uwp0970xlfj9lfio0avdkjze3vx6vkw',
                status: 'WAITING',
                detail: 'Voluptas necessitatibus quaerat. Est corrupti molestiae pariatur neque commodi maxime. Quaerat ducimus officia velit delectus voluptatum est. Nihil dignissimos culpa voluptas natus voluptates est similique enim repudiandae.',
                example: 'kf8knzs91v49avnegdg4v3ezn8jeda979g339rb4321fuw8tkq8ivzii1ncyh0i8zm9bzjyyid2oog2tycd1eam6p2ogpm627fur90bu1g2wgrgm21gm16yivcmytyfoj9x9ng7ozub37olmthdybn2ovct9ddov',
                startTimeAt: '2020-07-28 17:15:16',
                direction: 'OUTBOUND',
                errorCategory: '8k368s9hk1ah2fd1tjfzlbf4nm9wl30aicnnwp674p5cizy85y6rezv6zpm1mghg67pg2r7u5ej4uq3m7u9nc9m3483ih969fwl9ytqeh5sni0876tu2qltr76nm4sff87uoyyi05mx4qz8kcyh77y62l1n69n6v',
                errorCode: 'wvyqj7ufz34vcupz7fxh2bgifgzyziobmk0frwdpipbm7scw1c',
                errorLabel: 195753,
                node: 5723469113,
                protocol: '3qpru0urbonylsat1pme',
                qualityOfService: 'z5g8c6eu5cblct2zu388',
                receiverParty: 's1gx954mrtjiy6yo2hzgbloe83mqe6st7a92o499gpey9quo6g2vkcz5uvlvx9wb2y9fjt6ochdo7j9x3m9jw2oi6prqb4w8asrzmet6folzj8gxfbcm1kzsp7i962vzzva5wmi3y7e7uwgk6vru3ph8jvwftof1',
                receiverComponent: 'weypvhr8hyoxhfnttv6ozr4dgnbj7q0733cecj0klebxm8py6yadjkcszv91t09i6n24m5o0p25f4jagbu6263hylvazjft28djsph5qoouypwgqa7ihdzwjponbvbdo8nh14yr08igtap0k3aowuotxfqfnl1m6z',
                receiverInterface: 'dejs0fu1jwbcq3akfghqwqjjkworh8982nsc1n0u1oi94jrf6kbubxoinexo00knxd4m6wdkmxh2i8lyryw8f5053wstunloh5y1dbepywggf8u0ykbysxyzz35om1u65tahqbayo02znqcgie5fub59x8xnqlfk',
                receiverInterfaceNamespace: 'i8geuzfxo9e806n6uhqo7wsk6sbzrjytwi83h1e70u9r9ads0e660x3gg2gzzr7tca6v5u15zjuqiue7uihuglkymmbfzeziwoq2mp7zv8bp9ruhiorh63etjqutmkqfp5wob945lornsz1ac6tl0swcizc91v0j',
                retries: 7913611907,
                size: 2654938443,
                timesFailed: 8144561665,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'ngz3jl8fo5iqfupkn0x2qo3lkpz1ad56iwga60qtcdho1zd8bg',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'feep1v8ogsrmdhuy7ygs',
                scenario: 'pofduwm2npj6spsh1nvx9rlbg1xa4s2o805s9t4dbo1h2aqlxjs7p2mzuqtw',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:58:03',
                executionMonitoringStartAt: '2020-07-29 07:59:06',
                executionMonitoringEndAt: '2020-07-28 23:44:43',
                flowHash: '4ey240xwdlo1pixd9t85bb2qq8ku82dl96q1fa0q',
                flowParty: 'acq7zx22yehr1keyjw6kn7grhcxc5b1t2gmzv2ltnwnn1ssijda3qbx0m0du10hjw09eq9s2fuk7fj3r8cwjur09zxzhnyhq6n68wttkcuuyd5r3zaqnwvg54ueopvji1fh4xbjs1czkcwe90bhr9m600zacjh2z',
                flowComponent: '0ey76sio09o3iuc8e0dw8r580kr2kr9swqieo74hm6vuq0g3m1petyy8qs9nl2v4qctiwstf2sely78fggdkvo4amb84zni3r5nzdg6e6fc7er6syj47c2ib4lasysp2afgxv0fd9nu6yl8y7va0kofd0rbea3rn',
                flowInterfaceName: '9zk31ygam7fdazit4izbwsrq4w30h8dhz1vucpiyx7wpjv26know8sn0wz0pbhd3ketvyyilc6s17o5bbyl6l1m5s7dyl1fso0zc9ex477jmpcjxecqgc5tt93d9heexnyqs40dxq4bj7t9i4t6rutd9x5jm7ika',
                flowInterfaceNamespace: 'fpeeaz5zh79tdsf0yi6rsgcguvaywrac65cvdx881300bk8woeb7toxtuux5isi1x2asvtq97lwmuo0i1u1i15bmqyrpc9us659ko39w780khzkzitd1zaoh5h6frq0uw3wufb0emd3fe16s2xfeydaaxr8z964x',
                status: 'SUCCESS',
                detail: 'Sunt facilis temporibus. Excepturi assumenda in voluptas debitis vitae ea qui recusandae dolorem. Voluptates qui quasi. Et fugiat in esse dolores necessitatibus. Ipsum eligendi laborum sint quia fugiat facilis et repellat facilis.',
                example: '9zuoni4fo44ev3r9b9rce4dzo5s6dj9m6kf217u7syazfqfpwzwv1xdk5hirs1ujhvtqcy93igj5m1x7tgw40clqxau89z06sy9x7sb25a7yu0kaciqhdxltck1a2ts16fi6rovwgprwavz01r87z0v6rpo8ogyh',
                startTimeAt: '2020-07-28 22:21:35',
                direction: 'INBOUND',
                errorCategory: '8wzpvawqtvxb3w6b7l9kdlut4u2ovkzvsceu3e1mckg9x4jr2mpvaw6b10aiu4278xvo13v367jtr70pxkmte871dzt7pw90z0sbc2miyz1zz60lbhz4cqfqo8a1xtr1r43d1dpdga95vmv1lbp0wsvuc9pj7fhs',
                errorCode: 'm2cpu56ct7mt4xj59vlkdlw3iv63kctrrlqsfddylkioxu3gjx',
                errorLabel: 642341,
                node: 1477421444,
                protocol: '86qa7snjvquxwdb149i6',
                qualityOfService: 'ibow3zpc1rpa1pj0l8jk',
                receiverParty: '5aqbb3ssust6n76obvl71zrbzalk77rksulhvcqg9aaxpvaqw4qv8a9zn2gpefrt1xb7sz3njnx1cvody4jdvfx1zji640swfj73eyew4k8oi8jkb161wm86t9etqt5hb2ux2xr08k8tv5cjgm7fs598x6p74zx4',
                receiverComponent: '8a8thjdn6ii0vpln0ep2vojvsm01pn72nfbcladk2x9n0z1j40d58cegmriyst7ut44716in1qiqkfqc3ubangp3fizz25l4s1a6uj02b0jnk31qxa48x4pfg6eg5oxmr2tc0exetg31xo20ai98vugcjcmc8fjn',
                receiverInterface: 't0fk2vjirhkw4ixapb5bfphq6r4sf3qitwhc81gngr6yil89zq9w3njgoi6lz4ki719itfhjnm78f57tngo9to1vpeupy9yjycz3u3v1hj0wlb6mve4gkcbyvyienevg0uld8ixidp5egs8lx9nbnwidunlypzmhz',
                receiverInterfaceNamespace: '48x4680m20phz9hckt2sy8rfhq0867dlf9t6k3tb4zs4jrjblzrf1wrurwn1vl6o4g0q5uu3h866t32qbw1gbkv7dqavkznb02n626za32yj4s2yjsm2elvwkfd86shy5k7yjvm19ovh3hgzg1i90k4ykt78eae3',
                retries: 9230196883,
                size: 4989966786,
                timesFailed: 7299631526,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'q6qp64kji55sxqpz9keilkrzkdp9gs2j2cpr3ihn38o5fq3io1',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'jv7bli72dzfj7frlf3j5',
                scenario: '4wtio3ngjkwt97kw9pemkfdj7023wu5r5v38zb095fw458z7ksu0r4bex3jc',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:55:39',
                executionMonitoringStartAt: '2020-07-29 04:32:39',
                executionMonitoringEndAt: '2020-07-29 05:01:52',
                flowHash: 'art31w1p11g8rkhvcogjrkstf1oyu64xwhcgi5q8',
                flowParty: 'get64ci2srs83pjaragl4jrlsujq60aw473bbqre4oi31jsvir5av0bvyb6kyksvc2t5a37zrh4tj5hruzlj5p0cufe6efk5x3rpc4plvi7aolsxj41mwi2b6jqqtj5xvtx04ylcd47xzezwtzg4s2enczjly7x2',
                flowComponent: 'rtmeiur4pnynaorq7felhrbb2o0xkxa35thwiwdtn11soqig035dpit74lzbrdb5ag117esq8ajyb66up5ac0m0aqssl97yszio9onkq1h3e707asyrcyob8fc14luyzjjc5qv0osrsef7dwpo9ihmtjynii761m',
                flowInterfaceName: '0giymjbb622oo5c0peumt0mrr99nk2h43hfqe03neixulonr3ma09ddaepn9hpko3p9iklyx5yr5wxyyymw32161gf92f28ji54dcv7tmloaxf3phlk6l5dn4ik22t7uzuc8b8r5avwpk0yk3tuzsf6cdqmrcdox',
                flowInterfaceNamespace: '349aw5zqzs5ch6vnioiersoro8skx30xplqeht3uncbl16oipo6upwg1ycly2t0y20s00k5a24g70m2h65j6zp60vflelbi12uxa7u5gmh03hrlampkkx7qpovokpsqfj1q3vnm5xdv4r5uakmqbv7wrhjrbz35h',
                status: 'WAITING',
                detail: 'Blanditiis perferendis et minima. Et et quia sint dolor id sint et explicabo. Maiores magni cumque veritatis assumenda. Exercitationem consequatur qui enim vel quibusdam. Et saepe natus.',
                example: 'ui8065o8s19ugusqwjs35w7fwzr2b5omfvggukeu1mve2eworug5n4xo6ceszwsgfuv2duttp3zrjhux85seykxurrf3zb8wovdwi2if8u6n6d9ychv4g3nfpgnp4pudbgvkecg6n78yx9jow1a3ogdy7k4lqkn7',
                startTimeAt: '2020-07-28 20:04:19',
                direction: 'INBOUND',
                errorCategory: 'wdumcuijzgo6kc0phgm15zzff95xtd4yzsce4rp50e94udqjfx25xlb97dy72jokc21g4m0jetdriwmlisaj212ymgeqri4s5ic1bl5uai2rpgg2885re87ab0u1s3fg5n6hbtnx9yqh2l7njf96z4lchawwhxy5',
                errorCode: 'fucv6kaai2wcpm4sjwtokp75thqajxluko6tls3foxh26kmqoa',
                errorLabel: 814917,
                node: 9965049491,
                protocol: 'jf5k1trgoh8s1earzhrd',
                qualityOfService: '29lps0neui7hge2i6iyv',
                receiverParty: 't0cbffaul5wvaq6jjk9kqm6p9d99k5ldr6f5eygg8rwu021m03kttsdksozvrgor3puqhd3qqgucm64ex5fa2db5jwcfxi6go1av60cfzuyfi0aivud2p2thmcibqvn2sce8mybisyc891s5r8ml2uvob5s9066f',
                receiverComponent: 'at67zs7ft2lugvknrqndidef4ptrh8l6ojfr4fd3uk32xeuwhi0o5pwzyrfespabie9uchonm6qzpam6cn0yezjyc0sqjbykhkuf3fjyc0x7yfsj6gk7k293t2syoweaj7e3aycuis9bo6vgde3i7qjnubamd2w1',
                receiverInterface: '28fm91c7fich1jmjxvt922ulrc48fi9iq2wped6xsjj111b4gyd9yij0yyt1tz4mlmfdypp1d77mi9gvw42690n4bj7ldtajmy9vx2t84h1xxac9t25m59gd5nmia5iezcp8a3wof5xurse4quo53bqhc1fpj1l9',
                receiverInterfaceNamespace: 'oxcg6tsburct8lay6gduf3mwmdymbglaiktrf3r3pqhf8d7uaj8zbvqn69bzd7punqezly3r9m0j9xjwsc2wgynckco56ap1w5n76eu1m1r0emop7g26aaysztag79jjws50oghmkuuovc9oy2ebfx6x64ly4y88u',
                retries: 1796375898,
                size: 9786677547,
                timesFailed: 9409076096,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'g8ydxiv533fpqw7z0f67lnnfh8tj16aocpwaiwe2x4eridqpy4',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'dx9i1dxl96b7lxoxviz1',
                scenario: 'gji152nri9cebz22gk3cms4rd7hcbsnjhu5m5zxsbietfvq2q5np16j6m7sg',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:34:41',
                executionMonitoringStartAt: '2020-07-29 05:50:47',
                executionMonitoringEndAt: '2020-07-28 21:25:00',
                flowHash: 'lzp6i9nc2gyarjbxrr979j1v3pcro4qci0hvt1n7',
                flowParty: 'az8jmcjvxyqyksx9twurxs4ep1z63t75pfdvxm7mgkwidilkfnuoc7icx8h2stcle303cromve4gz0b9zmtus2v8i0zz34slvghnr7wv583lh5uj5wnk0falw91w09smp1ew157sgcde906jdlfnzppm3gukglmd',
                flowComponent: 'cp0ypbcik11xlbkiqtb7uabdipsrzyd0bz4v8pbprtfn7vk0631pqloatsunluh712u4qa9vs0p3vst184katd2uvcphhxhqoyiqx9p6lc3ymlkjl9q68d1i5icx8b8mh3qu5l4p8upa1xxuajaucme85awugaxv',
                flowInterfaceName: 'wthkjrblwa8b4v4r3j1l1kzphfgnsq6k3whx18kt9zu0dewwisr98oeu0jfhgpbrbijbhj0a2rz1vb3s0jg351irit26o71l3twoudy5bgltvbayibc14f2oov85qfxrul0nyk8co9xpd27kgrw48xrc3bbj0e72',
                flowInterfaceNamespace: 'faurlhi0atvno32t9tr4sxzac919203a7nvke02vttnzlbe4zv3waoaspo27aeyvvs5bkp7ydy0eo1v6f80wgmz1eoim0bc25ieqc1po9vcvzb2v51b3m98379qowdsjhqsy5e8ili3zd4ko4lceqb5vavfshzvd',
                status: 'WAITING',
                detail: 'Amet itaque eius dolore necessitatibus quaerat quisquam ex ab. Est repellat odit sunt enim ratione amet velit et eos. Ratione repudiandae quisquam ut aliquid molestias non ad. Minima similique consequuntur facere. Vel sit velit molestiae omnis voluptates non aperiam iure incidunt.',
                example: 'kjc9xjgyupkx22ykf6oqrpbqiyv4wfofil6tz0sz45z6w3nrf9t9e5rac4qk3fcrltfmaig0f1929z60uc2yx9fb40ood6veso04jq19xl89rul95o30rhw1kzir9p420fx6s49o3jiwlgaoqy0cygnbiiaepyi7',
                startTimeAt: '2020-07-29 06:31:27',
                direction: 'INBOUND',
                errorCategory: '9guf2eg3t2ao2rqpyefgd2yqgi0m8f2kk4nk9dvby41n8kzidgysghd4cd8jv2osyuxpm0rd40kznqxtzueuxqn7f44f5b57v1qpmzyv70k89xbw8b5jv72nf0lf5sh8u5rjieo9giao72ked29bbxhk0drn65x0',
                errorCode: '0efdv8ovunoes2svcg6jbgfv8jn7gng0sw3piopljg0wkebol7',
                errorLabel: 319887,
                node: 3655928923,
                protocol: 'gy099ghwnxxmf7h9j5u1',
                qualityOfService: 'iny4y13e3wzt09ygo96x',
                receiverParty: '9c48unfjxtgvxnkd034n9aaewczirgkcvgcs0zzprdj0fnh6qqb3y8z76qon90hv6h0y2moivg2zeuh4l90wo8251h8ihkn5woi0xtcjy1p6q7e5be6zz349mz1jy3azrq6wa9qlxsw02x2u4u7prnl1w1sbaj32',
                receiverComponent: 'm6xosay30ufoqjq6gwspaiyhgztzgfi2q7dob0mgsb8qskfbgh0elkb1z1clmpyzxu9qgdkpgziim2z0toyeyxrdj3ixq67qzmhsqkwadib1ctgeb2zmh6wusnsw6st4sx3vfl60c0ffrl7sqejmgzqx5u5ix9m3',
                receiverInterface: 'vlyx6kn1tbsklh2iuhpt8hozo2qjbvv78wfy6mc3r2w9igzm684itp3hpr1sxir8497ecmgb76upudh71fx0khfvkb1w0fp7c5hzuel4g22ascshbs87saw7chl8the6zztwybym5v69whs3dxnbacobju9d9z0k',
                receiverInterfaceNamespace: 'hl5lq66c3spv19u4sdwk0chnvt7d7qw90nyhsfn5wpy6lz2afa354d54hu2pm3f30xsytkefrb25mq288q3y8bss3mapgnzttmyjuvttqw09b2k8div82w5pgdp2hjbiek6q9kc3atacxxvsknny1g52bnwig9at',
                retries: 79451314457,
                size: 8463683625,
                timesFailed: 1623713376,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'e9c641vpvzjjb9bozh06eus5f6rpcap4dcaetfkp1gz921e5rm',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'zg5oy3n1sib2qwp2dnb8',
                scenario: 'ysluexqggyxolwaiolph7qrfblwv3zeycoqs2qxy2j04d92kv4pvj5thic6r',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:48:06',
                executionMonitoringStartAt: '2020-07-29 04:33:51',
                executionMonitoringEndAt: '2020-07-29 02:56:08',
                flowHash: 'va3bejwpczug0up4h9nby2921kghfg0wpv397cts',
                flowParty: 'i7bqi5pz45tre6yj76kpmmqmeeboeigmn8l8wh11weq3mzovpr6mdbgyu5oo22zpbj8b0sdtja9qqs6vyvtemond44aw14icwe5s61l5ctcynlxmu4ofs4p31pmg4u7rpwinnqxkdsiocuc43b6qc2r1g4ndeqys',
                flowComponent: '72eoj7qs3g51v5wmk8nv30qvj9dshu5m2w9l6i1iez92d3pkdiamjexhz0u735wca7e03fw78hyfsm3xtrcazk0fw3uwq4n4hn592s84a5u63cmno4antme1oobrs6giofcjwvw79gahigt115b9aq6lhhsfu1yf',
                flowInterfaceName: 'wlq91gz3ad94uryjvmyh5c12clhv1kdd20wtsmo760kiqjw2juvch7v8wv5a26ucrozlox49i7b1o7xmgayaism53ns3lksusmqc70f48rxhqkz0onyms0v5fmk19hod6d9v9pfn4zht0hvo83308b1mmxqquxs4',
                flowInterfaceNamespace: 'zbz8lmvob0zzhvtujtn0tiew8ywjvqrxc55dpe6v8y843sq6vpdorxtbt3etn0f6sflde7s4cviga6gxqs6p4gbomk0qntjgfvllzwiiwyaelsz245xlqun6u6tedlrax3i3y8yoytru9ebis9gv1oycyojs1qzx',
                status: 'DELIVERING',
                detail: 'Placeat tempore quis debitis dicta in quasi voluptas. Aliquid similique quasi. Tenetur voluptas expedita voluptatibus consequatur et. Repellat eveniet rerum vero voluptatum quae libero.',
                example: '9d7drp1h2km198ykhmsr6bs40pc2sufkhxawycgj84avg3w8zmh4ujaudnss9f3hx780glzrdsksd4k6jjw0e199x2sd09f8v14ebqr3xfx3gvehgkfj833aambxm3mf8jgju3wapo1otw4ln03ouc3fphywthj8',
                startTimeAt: '2020-07-29 15:46:16',
                direction: 'OUTBOUND',
                errorCategory: 'i36submwut16bexe47l0mluua25zy430tbsledtbmo8m3qmvuc37e5bviw4k2o1hq0ms4bxt8585c8ec4fm0ozistcrpmjtuj52lc7k0u2bnwb4vzods6fby79wwnzc6ifhj49dgze4ua16rrvftm6vopvtutyp1',
                errorCode: 'z6uru81ofpklgx2fc3gc003ksflzb0am5wmmqpmk1hek0ms0lx',
                errorLabel: 983015,
                node: 9269886154,
                protocol: '80dliff0fap3it8ht977',
                qualityOfService: 'bmopgf2nip2rbakbabv4',
                receiverParty: '01e9kxla7iercj0azyqznwu6obdlwqoo9l9wd29oe5u8789pme32ta87rvlcihb5a2l002d168ye63msrtfvn0r5p9grmmn5qtw57vyqbxuwsdsx240r1hlxumhz4l0t0igwd5brf21w3jjmaxxk6sphbm1onhdu',
                receiverComponent: '59zdfqgfkbv33fdq2jqizzle8gwbzrxilolqyrzunmoks2ga6owxgr1fxuo2doo7i3b5yarhk9ojqbzv9wqu2shq5zolor3x3nx4beq70ymp1u8mf7w8t8infetk49r1sbf3qmpqb7g6owj8qawvgjogp1olf8tf',
                receiverInterface: 'v5k3f1x1wb1mjm0f9arml3ngeg3ccssa2xjlp06zww9n7q5adsj8hbr8e41hu01vxofcs2t6fvdglk19nk8a5ymyk5ggggvehknuokazwrx38h9ug7tfvq1oeo6ws3q16ofl2nna9lutdivyhg893a4mzdur8lxs',
                receiverInterfaceNamespace: 'wj34zah2qp6rm6xifhuz2ss4eowqj21ws59lxb7qzwrq9gw651a20plqn6wdr35il5vqsd3b0iem4yhgkp3pbzfm6yu8wfu8plyteqb7r81bx9x9p7phudpyq0962p89o09inmtaij7ea593r1rdk4g5lhdbzsfg',
                retries: 2451314570,
                size: 87347806775,
                timesFailed: 2947485187,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'fyq5c4l6jb9h2mhcn5vldx7ypd15e55tb2a2y13oarcmdyxw9t',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'zaag6v5dt7mqqz7z43im',
                scenario: '1gf5vx90tpjvfhmb33fuwmfpv2aojjv27jickmo1e8znovjzqt58h4rqhvaa',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:08:52',
                executionMonitoringStartAt: '2020-07-29 03:24:52',
                executionMonitoringEndAt: '2020-07-29 04:59:28',
                flowHash: 'ix2684jqnsq8xj5t4xkf7ryqx5tic2kxtiikqelo',
                flowParty: 'xhklwmacd1pvh8uxnfwl4385rznjfot41r7oi7fyv0mvkvjrqkmj6208y3glwqv4inwlx7hv63esk3znb3nu14rudy71dr7b9etm36kf5soalhbfmejj3sqjfkfux7bfpb6c1kr3u28bbgo50uzvtqkmljmct70l',
                flowComponent: 'rouk3x2zm6ah7xs3hy3o2kwev35t9vm6pnmvfzwzh24gtq3q8bumx3h1p70koe180ulk013zn62fi3vayxtwvgj3jv7glc1snz12an3z5nmpmps5bmnw2uzosbznnsik756m5okaraeclqyubs2lwxv6v9v79ood',
                flowInterfaceName: 'fqrxtc5gw73sbalatfpm34vgxuxklqf4u9jhcsuql3ydpraujkvi0ak77ga1dur6n13nqngpevkvsub8681v88re1e4t739j1o8z2dskcou8pxo5p0jwa1erqqn47wfv2r6cxdf9f9msffzdmfsylxsu8ytb0n3y',
                flowInterfaceNamespace: '0j6k9kiy8qt6fmoy7n1hc1jn97dv94oib1nte8x1qr1hh9hl2ivuvgjbsin8hf4xfo3l2pbqz8j03fk7r2ywqexegtuvobfsfz44n5nmm2ntw7ib3k3ra6ly8quro3ub3f1jsmm2a533rh82do41fme1aoy77o3u',
                status: 'SUCCESS',
                detail: 'Explicabo ad temporibus rem sed. Est mollitia quaerat reiciendis odio. Quia optio sed aut sed voluptates. Ut nisi illo vel occaecati omnis quia dolore. Voluptatum repellat doloribus. Omnis culpa placeat et praesentium laborum quo.',
                example: 'qyps2ebcyb4llpy8icfsj4dpygj536of2nmybrc1au7dcxigaa3jz7fofco5wv9ts4nvwja4osyjloriwh254mtudrxzwf9rtf4nakg1dx4hizrksrjnn8okytrcs3yygj9vobvc6zj1y0atvrxxl9a6kbfn2pzi',
                startTimeAt: '2020-07-29 06:51:07',
                direction: 'OUTBOUND',
                errorCategory: '910sx7szpzbsn8g2pe5bjrznl50bsgafedni6hbb4m1paqdci0t8ll7f7d7doiep3or10sgodo1rgsqkvv4zwcvuwdydjj2mrbb9qzotc3ls46xos6ncng26ts2cublmqezbymcanj3kpwh7prflue414tau9f47',
                errorCode: 'zpuxe55u03bh85qk48ue8b6q17n591ucs40i651cukf63doj6k',
                errorLabel: 458131,
                node: 3464576663,
                protocol: '9rvrhyty7u2ofx9r0m3m',
                qualityOfService: '8q89qz6tfbh32c9k9ub7',
                receiverParty: 'd1e8usl6fdqi28gjkgdz24dc9kfkpkfjcvqzjfn6v2elfbc4hdkgas8bd4c2jepo9wzjeh7nw4p6me8c1803bras4cb7fvkfhfvec1ytpld3vavss5v1i0asi99f0cf1hv5y3u095hzxo2s4lw8l8t03z1crghp2',
                receiverComponent: 'dfq9v6c0ekw1t9u0i018at16pnhc2l5ro2812it9hcflrzgncdot1e934lo4op1ui5e97bwhsswehzk0es1jgdjnpqc6w2cl5eqsyc4yvtufdg7opv39r46dxhn5mdizjvq74oc2e1gtebweaskyclh5pog9ai99',
                receiverInterface: '3tg7yq4ql0uoo3e29t8ab9frgk4dtyvq1ph3yinftsq1x7k9f9q9uipdjujin73pxkh6c3p10x806cnm5h27l59n00bnl7bhx81zkpfqnhj4myt5hjps3a1rpjg1geslqkrrd6d0zvaueecvaiu8mnkzwmq1h5qm',
                receiverInterfaceNamespace: 'vbhkf1wdlfc3kj3sx7fijoiinj71rs94k1jwk97zccws8hsom1uwhqr964491a5vjj0dwwk6ooebfwarnwda1dh7j96nx4pkeco3p3r6h04cgmgcfw54bx5qmppn8qzllt3g7zbiyugzcwanyg5jmmwfx6j1pw2d',
                retries: 5601510484,
                size: 6722255181,
                timesFailed: 78218498172,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'vvxqko16bebgyc5fovxqaeii4acc062hxfnabwy2s1a24cwzp5',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '97frnk25hhilqktqbugj',
                scenario: 'o8kkd98ukq2hndtkbcszh18qf2wpx120lrmuyuk9d7hzy4j5j4t309rrwgqq',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:15:16',
                executionMonitoringStartAt: '2020-07-29 03:15:23',
                executionMonitoringEndAt: '2020-07-29 09:58:54',
                flowHash: 'f94s164b6jxhmz9zjo8tsa7e6x0rhorv779d1x98',
                flowParty: 'e11m3kcd9jw8tn4lmp0olr4fp3o496wx4do4ojmlhhjatlqm7kqx5iwch46upqtev6jqspxjffbcv4reno898huq3d6is069fx4i0xr02uxf9r8yj1o9exdsj41clyu4wy9wac18n6ahkrqfot864t0mdyaq7qws',
                flowComponent: '0wukzqwf4blh7yrr7q3r0z0v96uncwebsk58grm7ffhajrxu39ux600uyu3qln9a5laupfqyqglzzjchhnwz8o2ays17lam7o5jre7p250k8xz57dgztmvy4jzvec07gigd9z0fhlnljus1eiemhg6n12uob7zt4',
                flowInterfaceName: 'q13xmr50ocodj77dwmp83n9wi34iyzwkba043d5altx4v86wjt27qiaz0b2dj0ufu3auuh1up4imi5o41f4l6a3la77dqgw9ttniwtaqv73wv92rxi2uktp5r38vhw18smnn2cunttxta5rtt0bh2cz8ax238wz9',
                flowInterfaceNamespace: '41g9f4f5pwixjdfgks2gr842gicb0eg330e0vr9f2wx38poxjjli6gyvw7hbw1evdtw0xm0mfrsij3aimcsjadkf7zjxcvraksb44o2afr11pifbs267wis4wo7hw7g4im9ete32o1b6jf7crme2kbb9ynsrvbjh',
                status: 'ERROR',
                detail: 'Omnis sed magni unde rerum aspernatur unde dolorem consectetur. Aperiam ea impedit dolor iure est nostrum voluptas. Molestiae qui aperiam numquam quo quo fuga ut qui reiciendis.',
                example: 'u39pgfy43f2pwuyd0ckjm5hs1ac1fkon806ajwjw6dearo3g8jsoggtxopg49htacxrzs8zbzcyzvljcnx7ezjdy2wj5rf7xtvtv9tsncsj4iax49r44pna8hlg0mwschkmmbm4wkk4vhm7i9x7o8ly9ntrace79',
                startTimeAt: '2020-07-29 00:45:46',
                direction: 'OUTBOUND',
                errorCategory: 'suehzm4m88gljhm7lpkq2wrmvzsmreyjba6ijrwxgxmrzln4ums8xtx9n6gf05d8qk5dtddg20l4y498kxvttqk5fe8upeg2xfrnnhvvdzswcffjmdnonpd0x7ymrdc0g35fuczrytpi4mwsoyy9lx9luyip1b5g',
                errorCode: 'uhcsl0epc4vobbhdjmfpz77e8yrg3ybtfrhohkz2n14dlmi161',
                errorLabel: 860714,
                node: -9,
                protocol: 'lkfn4lvrgrdo1h4jc561',
                qualityOfService: 'tn8qcsumsiokk54qbnxy',
                receiverParty: '8d7po0btac1oy9il5ks2voz3pqhz0gfdca9ry1pqkfkvmivbyltchu82hd7l9nsbucyvh9mdmrs8gemp0mpdhkjzsxfs87b593mlohv3l6ufdbguihd2pitnzbuzxyesszcf31ili15etjg2s8u7e9lsaulw6ita',
                receiverComponent: 'kg81bb7tdghowtmjg1lcowpwxaaclat56euwnshqqcjexxoqqo9di6se5q33k9b6mqzgs6r5lfzayq4wq80zxn6qtitp6ledjhabh9cqt9n200cfsw22nkzmnrj8tmpeiv86irwyr50mozfb6espgeencrgg8217',
                receiverInterface: 'mu9bve9zmmpaoqdaphwm31rbkco4kfwjudcmcg9uzt2flgisolhtlr08eprnnvvivgrm37ghzx2txwb7c3kzazkvp1jds624cfna2rpmj3m5qpbeis2cf43kwsb2x18pk1wqhqsi34tpmpzn96555l8cnu8958db',
                receiverInterfaceNamespace: 'comtp3qvpqi31ogl0f1n7okzrgxrg8u5gpb4zjvyrhkxxkj5x2pwu9sy9knzh0vzr81wd4oz8pyo6mshu2hc84eqw84aqfux29jyq4sh21cce5e17oiwb2ng25yshjkfv3x6mls56v6xpw4nkzllwqcqwd1oy5q3',
                retries: 8880572200,
                size: 7376995439,
                timesFailed: 3543791058,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'qoics08mbg9tc5zxj10f4v528imup03lhe6efjwjt6ruuijpuu',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 's7rgnr7ih4v4rbhleg0c',
                scenario: 'g5jrhclmhtkc80lqefy25shn779vfs51n2d02hrphdax7n3mbc5q9fpkl335',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:46:37',
                executionMonitoringStartAt: '2020-07-28 21:12:42',
                executionMonitoringEndAt: '2020-07-29 09:39:28',
                flowHash: 'f4ky4x3xpq5bbwvep8ixh7t8elj5010g7lba8plr',
                flowParty: 'aaiukihps3mobm1e8rk2xqbu39jcinwkvz0j1oh52dlnd5sl8b7ghmrckg88n9rezasyogb1jfdplhqlk85mbaiolipmvk69ypus4geyfadoyin81t883443g81h0znjs1r2mujpeownzrpgmnrhgfq2as36pzt5',
                flowComponent: '8fxvs3b4l73wpfbf55qweaha4v5yefas5r18cbh3nuri382jjuun1hkowoa7dx53vz0f8ioyi2tdzzharni3mczy98spigx4pusg73zyi5tlgenjqdekh06w6ont90d30jw0b6z86dm1x0wzx8kxorn54tibetpo',
                flowInterfaceName: '9dmwe1zva1em8u69ff024f5rc1qrw3856bgg57jj6ff4p5q693x27nkkrl4kbqgn61ai818f6azy91j31ytroizkyhm3493e2emc7z9vmodnmfsyniaq1rwjp6vrh0vw7vgbasuudeg66ucjwu2kc04mjybfw01b',
                flowInterfaceNamespace: 'qx1sb7ldfa3lnn9hxk6thoo0gecf76ko0i751pt28924i8oyeregud9nll5ob7ozcwpbgzr4o034614ahnyrb2fz7pcl8psldyfbkd1as1o163s28rosch9l466e9au5magei6l0pm2roxjfn8nhusdo2ycz6u9l',
                status: 'DELIVERING',
                detail: 'Est earum cum beatae dolor et esse sint doloremque libero. Vel praesentium voluptas libero dolore beatae. Vero ipsum laudantium velit voluptatem. Velit accusamus ea saepe nihil ipsa corrupti facilis ut aspernatur. Ad voluptas ut aut aut.',
                example: 'to5wm4zr18mplv1f0c21rahmkbyjq0vefzfq0yiipsumkbufmado3evlxbo5qfq4byzowjxrczbqzxt27c5q3ml03n4lrrjtr0wu6xhpsuryp7x5va3rq4gbapc975hjmpch49tgfy2kgxvoeeuatrmpjhkq33pu',
                startTimeAt: '2020-07-29 09:16:36',
                direction: 'INBOUND',
                errorCategory: '48cde477bbot7y6cpjs87ch1nwdz5nw99xq7rbljykahbplheyput1fs6fcv2mek1g5c4l1vpv7jii075sgoq95oe1vsqx26wam877ljokaebrj0201b7ozn91hil1bgtfh1qm3q01vplpq0qw46tmtw7q5djdk8',
                errorCode: 'lg1n0o5byr4kcbcax2j6rdumlelv9nfukx9v6mnuud7ohdmzd6',
                errorLabel: 719957,
                node: 9916846236,
                protocol: '4ox1z4mktbzzff8sn3oa',
                qualityOfService: '8dup9ejnvz3cbcf9yr5n',
                receiverParty: 'wwm12zh6en18p8lkzkej148rp7nefb91i2raq850oizdmzlbdc8jueo7h6qwug72k4szew6yfmmlwfxa58aajfrl2zefty4s880ozfwb3mm2vw184ycdakzsgsc0jgjz08rcm7w2nb9y3v7qrwpa7ihamh0bfbed',
                receiverComponent: '16hzxr15fn1x73mz6850wuoqbevuu7zveqc2z7o7y07subgh2m9hfvqhkyvvez8cjailosjwz4ctiky47ykaakg6qczxp1f5maya7b1zkqkg98mfzbxly1znpetddj2uyumo9w0sj7avt20p85nyiyv8376yo394',
                receiverInterface: '741rsq0n9empt5s2icoykr2sy55a4odfqeaflxtkj388htzkke4jdnj5qltvccjdr333na5zidhrlr35co4xzqygnflwk5jwvfbcnb495fj6t2rvs68zjv3n7zf5g61hfya9hnxxwe6ns3satu1k7kdyfervkydp',
                receiverInterfaceNamespace: '3on1705sltufncqk36gmqto03s0fpkc2foz3ybym1scv4955ts246v2b7253u199idy03hzm46jcdvy1w0lf4y3r0wycd9xlqpszqurhq3uozzh1pvcywaw6txjay4qaez5vi0xz7v8acrtbvnzhwdt0mhibz3hh',
                retries: -9,
                size: 8913244733,
                timesFailed: 9652486473,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'km4sf7m29np9uz299rddv3py52glt28fzv3viaidxledyrcn96',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'wo7dfurb0ad1jzm52drz',
                scenario: 'zx8umz08dwcforruca8hhivj3ixnesiy71wi7h9jc2401j1jrqd9luz41vo2',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:15:20',
                executionMonitoringStartAt: '2020-07-29 02:10:56',
                executionMonitoringEndAt: '2020-07-28 19:43:51',
                flowHash: 'jly4tuo62v03985ircnkm4hj7xx39poyzad6d8nb',
                flowParty: 'xqdupunt3cjcnfzvkco4sh8sdi284qdxw7llfqfe4vhcbd0swp54mwnsyusvshtav6liyfx4uu2n66k8z8njobeadc9aobyk6ab86uihcdjbrpprya0n7uput454q2act8tt1e80zoeidpt8xx9ow3lwmbvpsrc8',
                flowComponent: 'qss33ecuh4khwxlw4afbpjy7mexq5wtdyh9al8vhzuv4mpokwtz51obrnm7z0y9x6vzxmhkjp12w54wvhzow37mwqmhac0szuo326khast74k18nq9sl6dyaad93p25jhnjj6qgos8cul2b057ia6p8bnone8bxc',
                flowInterfaceName: '3aah8zat99c1yzoi9pdg90t431fxw45xvd0zvp5dsntu5kkjhjd8bv2zch5794nf3lsgsswzyn25t5mofrhbg72e7g0ob9cgkusm6v6plb24ae1nanon2zexejicywig4akbio29i2cl4a3tlkaqmqevkskhvr4w',
                flowInterfaceNamespace: 'q6lxtigf209caq2tko8aylc3iqhq6txcb3mydli9rmyo284adb1f77gpakbco9rogy2g51riog3m5xb09iakpdsejnudjbpt8yvxmebobs4m6jylnrs2rwds8ml8z2p8armkip7cybkm7mv510e5nkpnnhwpxrgn',
                status: 'SUCCESS',
                detail: 'Modi at at inventore sint tempore quos. Quia nobis labore dolores pariatur. Suscipit debitis provident velit ipsa sit. Recusandae ducimus dolorum tenetur.',
                example: '7xldgwk9twzy8pnl8wjbjltw1thp9b73p4q8ynm8ilbqpbatxlkvc4ne6fmk53zi89pr71drnczre4g720gz7556via9huzf01qh139wq631xmgwaz9jw3obkw71qh45rk0lf1g9i0su0qxwf9i1zbay4amcayhl',
                startTimeAt: '2020-07-29 15:23:35',
                direction: 'INBOUND',
                errorCategory: 'fxyqjoonirt8fo0x415hnwui83dm71673keoqg1ipgedyaallt8q0v1zk4ens0twgi5qiu7aa28g1g4mnsp07ni3ptdayln0bwupyl2xd9ef119xpozv6kszrmr7mlekcgo4jpzvj53we6grtd6h8xlnqefhr9yg',
                errorCode: 'ocm5c5ge3nlhun9zlcu19m1dvjlw618jm9ij46twl4e4di3z62',
                errorLabel: 831402,
                node: 7254760498,
                protocol: '4plkfchi46g1f9xkd5xp',
                qualityOfService: 'rh3ll0e47w0dtl5kk1u4',
                receiverParty: '7ieskrqnujz9bnfr89p0p85pvv07p5i887sw371a4rhwqyb8oneks2a1nxv68miat95zg82y2728vp4uxlgmdggn6tn6egkwivc53vc9d6mn3rpiy50i5d17jgdxrjyjlvcf45vfbwjxu7bl0uockr6d57yppot9',
                receiverComponent: 'b1d81p3u4i619pf4nys6mfkd2vuccwl0receec67gfabc5z552o6s4q7kjfwnyj73xv5pekf0ea4k0wixfmd1hy0zunokw2475fr15b0cd3x2h7xttsxq6y3mc15lyqqmyqw8ve7evr5w8avudicm22bf5ugm4jp',
                receiverInterface: 'j81wdwke4q96hgl45gtmdhta95iytm8j4yn5e87tnqd6goz4vkeqeyxwgp9jxmumrs6tz9mdsgx7blp7459bgu7razlj99s0a92dngcx099w8hsvs7lzr4rsfuo84sthlxy2exx7d8l25aq84m3an4m1sbqjfgcq',
                receiverInterfaceNamespace: '46xqyp0s4dqa9vq64g8w964gxhzymhtketjvx3y4xop9xpa52okce3ctt3jfjfjewoyox5jjesmtacvk0evvkdalr9x2kfxh4cqtyp0prnh89es5o9la5kqazi2gegrntybs1w8f9lelcsrq12wta6j74u7rgyqt',
                retries: 6600432032,
                size: -9,
                timesFailed: 6850708461,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: '3w30uayuhsxeun4352505in3maoye9y8qk9ejncpa3wmvqi7rn',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'fqwxozb7jeh122zeza6t',
                scenario: 'm6byqopsjl7s91rhzk78457xlwih930xvq6nzzplwmg0zryues31bvubtxx1',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:45:34',
                executionMonitoringStartAt: '2020-07-29 06:13:21',
                executionMonitoringEndAt: '2020-07-29 04:32:28',
                flowHash: 'c3jqqdiqnemqhjnijt82haaw364tgms7ep7d95bj',
                flowParty: 'vkdg2apu1w6nc1bj522542nc2e7otwz7k6x8n01gm9lpdhrzmixlpi4a2uj2ofeui2o9nj3mj9lecvphv3957ucjy1pj0q6p13w7luyd8nquxuhf0rmtfzqs6dam4sx9np7yl98wzv7ir69vwrpvdqvfnongl2ve',
                flowComponent: 'xfboy02yicw1xm7sa8hu7evn5wy4uj6d0s1sp9rpqy1w3rjsncra2i3v1ko9z2qfgufg4wu1bxafz7ux6o0lrrsncqw1lbvous9hqxi49y640ky1zz5genzhri4vltjth4maw09pqsjkosprsyxvvish94174qse',
                flowInterfaceName: '1g56lg9ns4e4wvqn69d1aondqpq8zp1jiik5gzww62tm9fx6yq1fy048e72d47wn82objcpwrujq2uaty7amoa7wc2sue9xvgin574r4udykbdnojlqgl5oh70b16fn9hc75u2jwxdo6zynjca7llnrwicp9ds1d',
                flowInterfaceNamespace: 'wfazdohf0hgkshtemf699otyc0p3rvq2olqwpyh1hvau90dv0srqweob7p90mo7q9qley2p66jh36n3gcrso2knc5wexs78f7ydoi846b3m91bcg5e6yx2baeammq4dfsf03y1l7g5hmdebb4tcwfa9zuu7fwvtc',
                status: 'TO_BE_DELIVERED',
                detail: 'Doloribus eos minima aliquid temporibus sunt odio et corrupti voluptas. Qui inventore totam nobis. Perferendis quia dignissimos. Sit eligendi quia fuga mollitia quis dolores.',
                example: '1oxh1jqt10cenif4jil63eeq1hm07154nl2xzmoefqd7o52zvwdv712uk15515sik6jc2fgj40me1sswbdifwyk4lauvaohbenhjsuh21kfta7kklt4mbui8i7luixpfgqk78y912whqqcvfeed0tswfn0iwxfj6',
                startTimeAt: '2020-07-28 18:00:16',
                direction: 'OUTBOUND',
                errorCategory: 'lbdq6c6exmm1qwu0vqepdmfciyuomtyinki42am4fw3w7h334v71cln6rju3bmo3744sj37a50qmeusnfh1mz0ejv5771en4x9t90km9zdmedjcf43rqjv12w3e6wtbn6x2h7tbyir6laa2lrukvofgmdxb03jc8',
                errorCode: 'd5ipp291haysntziqh3birjrog1htzidq8uvzqqlpeg308rewy',
                errorLabel: 950196,
                node: 2404168554,
                protocol: 'xm2k3jx316d9nawkjsv8',
                qualityOfService: '0t621ix15q79tpb47jvt',
                receiverParty: 'vgt3e4x8xj2wrrkh0jyqmvgj4vw34p37dkkn8qrzoj0wxaspwve742zqc5vdvrk8cu6qy7pqqc552y91dr5izxomeyx5q8rfxodo9b06m9v71ypt4kc01sprgrbmhc2ru3kiurcnmtwfykep487o0i39ymiey88p',
                receiverComponent: 'fiect4p1n4pefgyegkisoinqfizlningbh24e82qe0qqgrpo5vn6ltzpenmy6e8lnkh9d165ay1v3vonr47jwjv3l5afywuk49zp01jvyv077studv0f2yfwht62uuanox4qpwvhmen4lm2j00suudnjeulz6gq1',
                receiverInterface: 'ode1dss5ndkx8kdc7hkfrgsmg3aq715qtokeco6priqbeqsfbweii7uln5qgtlsr81s5lut252xy2i44gjrau68jpl2gmhc2zxphs3re1jxydjbygvtbef5pn2n6x6v0bwsaj9vcpahv144h8xksfipj6xtl97dv',
                receiverInterfaceNamespace: 'ysrq8zck8h1m4llt9vao337yj7oywnvbc5b19rxizkgx4jvc8q4zma3g4ewr3osxbog50h77u8lchuz9skwquqicarv2dm71tiyxzsu5ogn9n812llldafg3fpguzsbx41brqsqpb2la4425x5zehsl7ssc8dxmk',
                retries: 3234344388,
                size: 4498370332,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'lm367pcis0ar30slnbzqtcefgiujgn9ckj95cnsiosmdt613tm',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'h7gw2072eb8gxsddg0jo',
                scenario: 'yayazwyh1kpzwmgaj8c6987rm9modzozci1mvt9nbx2r3ex4cjcl5tct6sti',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 12:49:59',
                executionMonitoringStartAt: '2020-07-29 05:33:14',
                executionMonitoringEndAt: '2020-07-29 09:30:45',
                flowHash: '9yryxx0gz8348ngc984953qge3wv4trs97m0xfeq',
                flowParty: 'x144dgacyqg1viofxsmxkerawz0skrq8fm8m7652ip845bsa2zl862umsiyj5nhvyxa6dyiwwbbxfdwliwpvau0cv4gw40y0jgdh62lzcj3ntghd7s8z4ojnqau9yig957prb0rxow0lqldur3mjbx6edvtsltwo',
                flowComponent: '1inpq3wpz3nc5ii1e7jr7l36p8v1myfqvrlkb20uperzv4opdtcc2tlwtc1vzke0u51kr0cjmxmny91eahzncl7s871h060xg6pwnpvlgcsiiox2n8iba0ya1ifkneg193jm58rt8h8gkqvlcvuo3h9zsj2m56uq',
                flowInterfaceName: 'lvu0bg73cmqft5d7hqthl5foa5y3fpnqt6kinmib3g8r40hhebocaonkr1pke47t74eq5gdr68zh8yj6ffcpd9d9yjsauniqssjwj65elkrzn4ye9jtwz8pv3jk6jbi87v9o7yvozuj3wyji5l48zdg17hh1fuqm',
                flowInterfaceNamespace: 'vmqhg43bqhflzbz0w7tv0y5wllorey9lkj0oq7cqhdmbbqm7u269pytrth2gdpa80lhle0ncc6mf7r55tzn5s6gaeu3rrgeva5t7k91t1ifit2zxr056d8k571ozsxc2xqbeyctyookr7tqcz7o8ijl8246ghsbe',
                status: 'WAITING',
                detail: 'Ut ad minima perferendis itaque tempora dolorem praesentium dolorum fugiat. Ut est beatae earum tempora sunt necessitatibus qui. Temporibus enim iste vel quam veniam et.',
                example: 'ovhqr6l8xzofodfrbzh52l1o902hfba6hkzqata0fmib3xfnatg87hywtg8fr71dmqtgrbhqi7afo1ylr78qprx2msiq1zmxelmks5nbmexjvy261e16ff4x47mvrykzoig5dnm7wg4mrphmn75psi2cmh5yawiq',
                startTimeAt: '2020-07-29 05:58:02',
                direction: 'INBOUND',
                errorCategory: 'gff6divq6rf34y25jl6fqtk788wrdp8p74ajg1rzcn0cwpxgsbet9z24zeutul7ouju834tugxqn68s36vus6pgd7i05oiwm4hd0aum6j6m379k81ldsc4e33b2ll5ajvql39d7ii8144l1z94v1iu99mqbynfdi',
                errorCode: 'o6njfa8k6ek49yb946azbou6cwh29ft66bnmdesmm8tan5vtsk',
                errorLabel: 787065,
                node: 4647899060,
                protocol: 'rfras4csna3mph8pwj8n',
                qualityOfService: 'e89qjxh59rlgn3i07mil',
                receiverParty: 'le8i7i5mcyd25ql11zzg63x1x7yjd12mz7h2bqe737h4z9mc2obcnbpcbdyz16op5wgjrhxt6iqwkw5v1tf4qee9p128hnd55nsjmt1zdwkcfb6b4djfeth7jg2b3fl50zccwch29qw2utcdsms68v9b4v9zrrae',
                receiverComponent: '2t5nseejcecqvdkeaz7vmnzn82q8dsx2ve2fxend72gho3kn02nbuy1psyxuy66rmtnbnz376r5ui1dinryfut2ccvkkpvcaph98300x5qldilcylshk0rkj32idoqw6jfjwom65838fpmpqrl0tsd4vrv6i04nv',
                receiverInterface: '1p4egb7vb5ovt5bir9acalgq2pi98x25spnmpvtkbxk61zrc7clzy62cp2ijfgrpuqna39qsuz80cb9f19lq8jsfkbey55i9mt4vsefl8hr4nrfqyk0nkmb7l0xmbimb3jrubuso0jfo425r1u8uomwn20vowzzf',
                receiverInterfaceNamespace: 'p00ik6o6rdvg5fx595w1jnd0sb3h8kmeaj3h1cr1560u3ickvrmmvg0uxnf4t33td7mkyeo1tqfyh4kb92o11qvagm98r9dppfe2qao14weebqyqygtmjs3eb4s1uzwn2cgomm3y5d9ufbabsqqn954lu5w77r7q',
                retries: 2022292557,
                size: 6639961205,
                timesFailed: 9382011880,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'ce0fppt7ifz1rb7cjryh7gia3l22jqnjy9ipexgmvm0c6aex0c',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'imnd22tqxnc18i1lrmi1',
                scenario: 'cciv6mdvvjibndgispdrke66k2f2u9j1xsfr409jt4jxk7e8ni6ug9j45wcu',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:33:03',
                executionMonitoringStartAt: '2020-07-28 18:11:38',
                executionMonitoringEndAt: '2020-07-29 11:51:40',
                flowHash: 'l7zg0lkamq0jeagr4n773592hkkf31rv5n1bkptr',
                flowParty: 'w38qp1x9j4n096mryleu2eynljulkovqp3rnhj6k8te4sh620fds1u9h0g2fdfif2nnx3wkr75l6swikirqm7gr8nk37kgfw9cidkhdygnqfx8t4kiidik7isd8511wrw4f23ux6z79fba7yp1nzr89qpizhrqb0',
                flowComponent: 'ze20zlaf9gu6pvpl5yrxlp4yc5z3f2svbxul8gd20j44o06wqyhgtssjbs0uom03ucr4prem2oqcwg22rpve9dzt8b0yaicfye9xxa470o256kndubww3tjjqfydhdnpmdtiarecjedmzuz7ufq8e8docbd3uk8n',
                flowInterfaceName: '44ni22md648zsfl8bmk36tsvnuieyg43t9fti5fkrvejdyjzqto7kh92qigzoi5hziancttw495gbi9zj66kgnk5ab5su0zovt1trm7b9m8nzz0mgeuwsysm1rzuyzemkz77ozxcc9kjal16111wog3nt5yoypy2',
                flowInterfaceNamespace: 'sfjd2juk1wzoytlah33ntyzysbzz59ceual8az9uqtxjtlk407f52c6sq765dh2d53lqgmvnjiy6rd3rwapcgjo7vbri7k03zvr8msg0uu9u68rdnmgv8zwm738fx6q2jad0rvohifa9kjq752xdwuk67oojf2c9',
                status: 'XXXX',
                detail: 'Voluptates et totam. Rerum velit iure eaque odit aliquam dicta. Quam asperiores molestiae aspernatur optio occaecati repellat. Dolore et aut voluptatum non.',
                example: '8frwgxpe7z25fpkjs0n4cjqxgaxudcvr4bib77aoscdxia3m2k00zzh1xasclzihvylcrfgtvh5bqid3ltks7fxp13cuyf3uma9zqjw059ur3j5v3tradp3qzpnwmb7pkgciq0njr7ymy5j4oam1kxt3ewpbkb6k',
                startTimeAt: '2020-07-28 22:05:40',
                direction: 'INBOUND',
                errorCategory: 'fvbsjxuj3ib5nbo4sjxcryjvk0ggoj4ueqyz6x54xkk0y6ne54icl1lswofs7p7xyehe2b38ula8u7gnu7z5f62gweg0mzkv1e1i2fu68zdfkbkz6eti5usp00c5a3sm2neg9jpgbockat0azty0g3gh1mr3iuje',
                errorCode: 'fmzkwkoolk9qay0b74k640v5z1dylpa7qywef8790kk5672xgh',
                errorLabel: 454618,
                node: 8072614005,
                protocol: 'fb9sb85vb7z7k26bgr8p',
                qualityOfService: '4v4z57sariy7z12d572b',
                receiverParty: 'hr0xgzlawigb3n1st5sfnlqcrkuibhkc7vbs1to7ss7xkqa0fobk6rne7hror4agqsto247yjon9fdi2oiufye08hhycf1jo5208pg5quo2rvsdp2eozythob4eaesyk3t67kkbjbblymtd0l0a0h3i6nulgqcyg',
                receiverComponent: 'lj23gw8sc5kp731gt2y7bmn0p006o58fjvhc0l47wmdiebqe2qolpphv7hxms24upg1co2p27jzmq3bbyakft1otf3pefv94h3mth0fn0hsajwplv0zssjvguqe22xbpdkes8c6tde8yt32fbdutlfgf5t3uhz8t',
                receiverInterface: 'tqecxnr8nw6dtbk0oj88lvsnpy5sj598csqay94kuxmdo86omdio9p14q7g6fgqrlg1p5unn455zx9uvk7joqlxiabbcp1ez2rsobxznck56gdy44yqwwd619v4vtzdx9dmri5idwkgzdfhckdoug7w9mb9i13yb',
                receiverInterfaceNamespace: '4b9yosij5yt5o6ubwuqnef9z55la1tthkbk52902ml2ny6fvf5ff1o37ten67ku10rfek0clp6xinixw2kmz81rqeyxfuewkczxyca2imqzcawgqwvndkz9qefxya8p1b7wqg21efh2xhmukwy85pagz483iie54',
                retries: 1153766389,
                size: 8766499354,
                timesFailed: 9910311380,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'e7551rmu710ua3vnl6fkn2yy2tft04t1o3v6atqefii6dj828p',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '90ddj94orsicjjkbq503',
                scenario: '2h579yna46c90k0v9l35mnmhpv8tc9q1cgzirj9l0sfm82uffx6b6qxio9ib',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:15:20',
                executionMonitoringStartAt: '2020-07-29 02:06:29',
                executionMonitoringEndAt: '2020-07-29 06:10:02',
                flowHash: 'kzwaxkykwm1bfu8loyxtjdcpzjru74dr9zr48fty',
                flowParty: 'w3yh8t1sqzvxcvgnemr31j901pgr5dekmj0q6eo7nnb2lwvkxhe8hy3er4gtwc1nbc3jiaymm8cadbj2iqm0nz9sllrg1e888ijghgfhmgsidf4a749jp8hrsjf24xowvta5lj6txtxvzeyl05ure3u23i7d67za',
                flowComponent: 'a0ea0ritmceorcqt9b0wypv5zgxbnuqlnpscqsiuux8wybp2u6ajcxqrpykk30w1dlwxiha4imdz0pi1d8f780ie5pbxe4ulvmnm77cvu3tfu15txz4pz1teetygijvjrqydoh7nfm1v0w641c3j3ailcb6653t9',
                flowInterfaceName: '1r4wxkt2bn4797hrpa4ubpqrs0g5lxzji01x2zl1wp1metdb7339pmep4ijdlcoj1fq0gjzw12ys0ty90qyquzm79ucz1njetkn7jorfqzqx4b0p4cs7p9jsg7x2xwkr2gy1lm00cucnj2am0acyagwlfplpaovt',
                flowInterfaceNamespace: 'sx7lewxhgwhic3c2hmnjeudwjwnmgcn669nwywzfk63rw7bh5djqoa9kf4md6ny1v5xkwvoethvklv4zght7dli8ppa9qr36elkkuzcqgb61wki47hba94vqueynjuxtil4yrmw6korwnipelocalzgdum1872qz',
                status: 'DELIVERING',
                detail: 'Qui consequatur nulla aspernatur numquam. Omnis odit atque sint amet perspiciatis aliquam sapiente voluptatibus consequuntur. Deleniti aut laboriosam delectus et cupiditate quae libero sunt. Delectus nihil laudantium in laborum. Esse odit accusantium quo eveniet eos eum dolores est sint. Dolor rerum amet est quis minima commodi.',
                example: 'y3klls77sly7qh3vzz5c64jj8jloh3y77zgrcqc01jket219ydrhc3z06jz1pjcx42a7hbj3nikkylbyzdqdbykqkpjupy2eeu5jfph38qvrvv3h666zkqabpzq58jygyslybc6z9iv7naacb83616crl7h743jq',
                startTimeAt: '2020-07-28 22:15:42',
                direction: 'XXXX',
                errorCategory: 'dv5gyzgsebd4q1qnn5q0llaavlas3pr5r3p9elictxemovahl7atu8pmmaf4kgvjp7qemyi4ppcwdlv53h5zf6e444tz1uyeu348m7lw3nnvqmv6vq3jecpdnhdf9joclouy3e1xxwpic33x97qhttpjn1b06rpf',
                errorCode: 'r9q54w13ryy5lx911baypw4gibp5knqz7bmkomv94hsjk8krw7',
                errorLabel: 506188,
                node: 3812791817,
                protocol: 's3yx5ln2dh0hvsug28y3',
                qualityOfService: 'mtt88m907afgk9gwg9mc',
                receiverParty: 'z71g6gwxu1s7ht6tpu49wqzhp78uwy191eqkyl7rj48tvbwgg3ll870qewamleqqlo1mn3sp9xxs33x3hum2ohpj1zgcntujl0sz4y99tajzkg4kxwlbtpu58b8gft60oi75zh56rq9vegj0nhjslz3ieedy4q4r',
                receiverComponent: 'xao7vdxc654nkciu2hec87g5bfe6lqgppvdv29j29ptj7qy77bbcnxpdisvh1bsap45gfvjaee5w8yg6779cpdhis2xcot966gog7fbngpd9yfjpuvk8065wt5fhrgl0e7d8ak4swjzo07t3ca26df89e6hps2cc',
                receiverInterface: 'z1k8m63hqpdbfyxq7tvaezs8dey4tu1zli7dhwzolp3dg5o5xyfzdl5cugyhgt2f7ub683oeny5c57lcxokhrbetvigvrooixobzxtlf6cbjer08nd3yi4w9ejg050qr2ejy691v1wannbiaj7vlhhueteuz5wna',
                receiverInterfaceNamespace: '69s34bdmuf9ouykcl6q2jodkiq4txjouaeeav4ttsie8dt2wz3cczwp7ghebj6x8mo21m3tgh914o07uap5dlybbox7nucpx2b5ez1ojmxamiw87d5e8tpqulbf3tzzsaoidfjgs1420y1t7lf0f8bc05mw20l01',
                retries: 6195623063,
                size: 1911690195,
                timesFailed: 3047206424,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'qtkgxfn0iql82ghzy8y0uwjr1hoy7yym0m3vuwoo8md6sebro2',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '5t7g4hgm7k54nvf0q8mj',
                scenario: 'yut7lzc3supqqlschx8xh7kxx1bzjecvgkjb7mdm1jkvbt3cn6b29w5akhk0',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 07:31:32',
                executionMonitoringEndAt: '2020-07-29 07:08:53',
                flowHash: 'xm4deirczpau2luwa458xzsf7dt8sr3a01d4up6s',
                flowParty: '64hkwc69xf6wp0x59njwpx4ju6ne872psr6c2jqxrrf8f3xti67dmigxjkyd6yaaamyndlzd5z7bol5f3oprxlmzabdxfhi1e9rrzczfj5n28sk7ru4m6l4nfyh0r2ou6hjv4e2zgn1wwl9pzdtdhc5g2y5ft2n3',
                flowComponent: 'hb1hq314a3y6e0utup66qez1emxklcf8n3npuyyzdyxtv47ehhm2o76yydaewzhmn8qqwhyrgw115fl7n7xdrl4t7ri7jxhzo49z6k6rncwuwj3ft260f7r5qsr54xx4ghao8u74vnsq13og18eh04xyo3lt8pvg',
                flowInterfaceName: 'zz5e07onbrrmh7yx1kzqg8b3cmo2wu2eqrqku6lt4w4nadoqs1r9jpfr8aa0o3o65f9shxrmspaeojcx5bg18a7ilbmeg0n53y0300eg9ij3na2h06hsk7upa0k137wvz0thipmlu1klip5mojfblgmn6c1u1wm5',
                flowInterfaceNamespace: 'lpf5co0ha2ki4touqxpc890c7akqxg9qbi0tpbyoo74aa0u0y1ruz60ng8j1hmpodavg7qc93mfn7q2hw0j25doudzr7kdbk1qwovb48lz9ufbgqqiijy6r8wxl4372rhwj4uvhu5t3x9zfv1lpmlp5v04l9xrxb',
                status: 'DELIVERING',
                detail: 'Nobis harum molestiae veritatis. Quia quia similique porro. Ad nam magni aperiam quo molestiae.',
                example: 'l1nu1xlbyx4ccjo8d8jmmpux5m8csmm8qgf6ip21y8wzl6q7t3vzxwbs1b37baho3fh7pyj2fi6dg42lxl3w7n216i9ah8n18m7pozm6svrowhkjccyyw1bw7qy3to771swm35wa17quc853hpdoizl5pl5juwxc',
                startTimeAt: '2020-07-28 19:22:07',
                direction: 'OUTBOUND',
                errorCategory: 'sy6yzfjkfuw1oaybp66unlqbj2cj5e1j528aha6fcbpaxw4o50ml4g60f7qr7oqp5hri0k8yaf06u8z7v4b05cmn0ys9fgogdte2cz2joj31dwf4gziflsqdhlymmm7zbh33j8szzs5azb995uux6ido6a0h24f7',
                errorCode: 'oj4lis2jxdu1juuqai75nkcx3pz1t3kkd5y1fmz9dtzzc8xo4x',
                errorLabel: 366026,
                node: 3957037162,
                protocol: 'zoscrau4bs4e7jbpnxcr',
                qualityOfService: 'w0zh2q22qrurm4sxtki4',
                receiverParty: '78t1zmzj4dztgafkg6c6243e1cnb5f34wlkds66vz9jlwply367ary0jpw4sw0grvcn8tq5v5i5zwoz1n8ak3ojyql9g6uklm8prfmin7yayvikaydgobvkfu2hq7tgb6z6ii687w79zcaxipl4d7ui04tigzktp',
                receiverComponent: '3yfnpbcntypltpv28hxrw46u0n6ze9uvk6uuwpobn7qnpilp0ceshh0nhn1kaildaet09c51eseeixlb303tpmn8a4k80vvr0du664z2w2gqtn5p221rqvcpcakm1s9nc8ld865b9g7ga8tt8v41xh4hhzc6tbgy',
                receiverInterface: 's0i91t9jd1frcjeiy78ukdg8t92di57fr14bjm7v3mnkz741qii8naqhrgkmi3mpj7e5rtgkgbcn5q7waokeudosdp9rrmd6koh3zkderrwkqn4prfwflyxqz0bcbvh1q855evszpnbkrbms3cm5i4khz3r4rcq3',
                receiverInterfaceNamespace: 'iygnvju0shl6af8ci4000932l6a5qe63er0x8a0umff41jprz0uk3poiwgowta3sock96unuv4wxltx2dqfx046afm5xzrc1x302l41j9044ge01o7udz88awlqy16r8t8h30wbma3v7rm7gqw6iq034qgds3gux',
                retries: 9369075715,
                size: 3412762874,
                timesFailed: 2430726239,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'yqm6uzfq704n2s1n28qow2ja0j2cvixo4pv3x8xbi3bczp0925',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'znoc3s7g1ncul57a2njk',
                scenario: 'jp9eqn1xt34n7gb4fbr8h7kpa69jhd6a9qj7apeh5aaseu00p1oyv22i3xcf',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:32:34',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 18:46:59',
                flowHash: 'vsmjks0mdbt053l5h0kk7es2inu4w750uwfztpxk',
                flowParty: '8usurqu1kjnf8qufooice7254n76t9c43p5pqimcvyiy5ur3cj41zy96pf239fqy7g9ovbd4porg8xrjj2g7k5toe9yllbh1k1s7otr2uaqtb9lpiw04685uz5aarw9qc2307of9fbxvnzry7sghrsp492kzbdgk',
                flowComponent: 'reayz9a64tozr0k86zz4ql97mst4a6m15nv1roirb39rur0v4qklja8wkpzef49aingfdq8b4hjos9xg417q7k414d6xg175id6jpb99th2f4txhecpncnifzbz8lwfuuupk9n0nsk524r5uniotiti0ux6gzbo9',
                flowInterfaceName: '39z0ju9o0ir9wqiwnn8geocye0cu2oog6ksc9wycfza68612dhghwjqu9nx6j8m6q8rynxdjf763r3fyq4f5k4lx4zemqp7jqp9vefmux3wzr831op76zsgg0ksxf5199wo7xvkqe6vku9hsr8adio90c1unhrgg',
                flowInterfaceNamespace: '1rf3187sbl9h1iyn7ik4psqoqql0dply7evgj9f3zfa4wcc3vhcbm4fyomn5eylf6ipuafdp2irniynj1uiqinol251bf4rbja0sabo63g0g5v723h5znekt37ixoetx846yu7rzoxvehz15w8mccv0vbejenr9m',
                status: 'CANCELLED',
                detail: 'Veritatis accusamus reiciendis tempore sint molestias officia voluptatem. Pariatur quia odio nostrum culpa. Sapiente iure natus ex dolorum. Est esse beatae quibusdam sit.',
                example: 'qswswx6xkrzsueb6d6ekicxkbsca2rbzpxstj0ukpfbvzaei66amcdaca2ip0pxjgwg0d7v7xxtz106iqu371wl1rbne1sq36kdzoky402ueyp9009x7tnhxjco93my6seqrtxhpomsy618bxeop3hhagnjs5800',
                startTimeAt: '2020-07-29 12:16:11',
                direction: 'INBOUND',
                errorCategory: 'iefahuj0ynzkknqzgfkvr4bwrk2ojakvcjgdlgcy6f79mtuba282vvxjarhoewnx6tip28szxyeukmxdckh48euy5vcx1pe21hugbaz8tcydifxqxsfqjaaqb439ugppk7e1acncx5p1uijok4oyymauaa07mbck',
                errorCode: 'bq5xud4qzogvc26o8lkaq5z7xnl6s3zgep2tuqxe10w61e3mkt',
                errorLabel: 652395,
                node: 8356550936,
                protocol: 'h4v9mqdl6bvp2nouqjmo',
                qualityOfService: 'jojsoeme567lbn9n1nf4',
                receiverParty: '35pnmpencatmyl2nvtpsd1dt2mv68n7jt0j1cb8g70k44y0cqygj8f09z8gr5hv3jpkuz0ajfjrq94ql5fw074u3uisxv67doclnfqizu31aqou3fgjyrtucrhyja89xte7f2sru54ylur6y834m7mcuwy77hd6h',
                receiverComponent: 'zy213lclvhx5j5hqv7wnwwjpfusfnei1pnvavi2mg1d704hlsa91lt09edsythdn2mnxb8qjgcgtk209xgjs4ggnb824mapkyuqc0g3zu5ppd6fyzb2m8l5tp4187t2hv8tb0yg5bq9oy28957wdcczuse5wgzkw',
                receiverInterface: 'whpe836df2wvdyf8qgyjuoyu8dw5edan1ot01hy9fuv5qz4i3wrghnh1ia8djx662mjzqucke2185zm8fxobtok12byk2tsvbn4lbg89pbo97zy71df8b49nm1bur0mkhq9o95sfr889lsiv49cs3gtqjz4ewnr7',
                receiverInterfaceNamespace: 'tp498wgcxnvqh6viaff36r1ofp4e5oav5uku43q1ttl7omyls7xfk7g9igg6o0omkxmmvvp2ryuy515pghoiapesqmqihf9wap96apkcbt5340rr3s8iu5ggvkbwj9jfhxopoxhs9wed2z8pr165apdsg1m9d2th',
                retries: 4547496250,
                size: 4338798674,
                timesFailed: 2916963033,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'bx7sghrcqbomiqfvansqndniri3v05h2q3zjya55r0qbrs5vwt',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '2np6caeu8nk175ip0uce',
                scenario: 'gpeox5p1z9q38tbcjtzo8t2idjoxb6qmusfp5snqe240lvj6xmeryytk7xuj',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:26:30',
                executionMonitoringStartAt: '2020-07-28 23:20:47',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: '5bwyet0nkb8wbo6ibfjewt5h8vnm60j99dn9v65j',
                flowParty: 'iu29phx4lf81n7cfenw1qb7m25p2nu4pf6ecpriuut9guu0ml44mcpyk3v7qnvvggmzw1avqcrrt6d67dbz9pczgbm10ciih2tp5iowqh9gng4byuow8dsj5343tmlujwunyd6ymx4ep0fz3zw2o8mxmpsziy9hr',
                flowComponent: 'gf2zr70fnywjygm4rge3txehdh6wcjyfay4micjobgo0cmen4n20a1b6j4gnlsuhj3wdmwtcjgrt19v9vhaf2qbzgtnjzwofu2cz1f56sierbbgljqnse9n3rbxrfndgyptasn1eo4j84odmycyt8b36n9bfrlnn',
                flowInterfaceName: '695b08rjyspi5lnznalvuhqivczdjd2828p8siom9qrbvd5jpf5p0mx9w2p22hrgl4s59q4n32ry3hjdv0zmwaygknf5jp5g3hjy5kr7m17wa4l0cxf506iwwtagwm66jz4qg1jfspjskw1w4z0tri4fmtbe133f',
                flowInterfaceNamespace: '7k93sze8pdf8ss5avvh1925cynlh6lbqpql0l1pt0bkrir9dbxgb5ln1kl10fq3mg6t7x0inick2e94y3kg46gz1ena40p0otwzd8889064nuroe5zy02qkrtvwu9ewkf2ak3nm8c7jufkrxx67tth2qv24eckt5',
                status: 'ERROR',
                detail: 'Vitae vero illum. Laboriosam iusto quia. Voluptatum maiores enim. Explicabo omnis laborum. Veritatis explicabo praesentium molestiae dignissimos voluptatibus sint perspiciatis suscipit et. Temporibus temporibus quibusdam rerum doloribus accusamus similique quo ad.',
                example: 'qsyud5tfldhkxgyk33qo0d6orb6qmm08nx47fig0sk9tgkcertw1ajfrj7647ug9ytti4ricpv64h7rzrygyrdp31rwidyp0cwey2he9w39utxdf1ibf7vt8ooe32li134g1ps8j010h13d5pj8lxazbji46gcre',
                startTimeAt: '2020-07-29 16:47:07',
                direction: 'INBOUND',
                errorCategory: '13ib645tuul9c2yd71ihczqjw3esr88d5cixllez747nt5ycd85q919b0ci85ij2ex4ulgfgz0jx5cwmmawtiwrbe9b0up5z9afx2biw0odltj9b2az3sn2sbx85cwa800w488c71s3ibkvx36so95y9bfi9ozed',
                errorCode: 'rfrciyr8q5dwdwb0s5p27we0idg6aw3waawhdjrmmwus7pi0oi',
                errorLabel: 143930,
                node: 7719298527,
                protocol: 'cpo17axwusuwsq5v4c5m',
                qualityOfService: 'vjwy7y82mssuq11cya9x',
                receiverParty: 'sblycxwvh87m5j084zommn4fp5e9t6e9m2ihs1gxa5e2cbgliht77vhwcszrrw5kczrkv98z88yb5grl596gwcukt90zjxa4tail9cqq6pnclzbfgtmah6sqw1beyanz07p8dndl8rab3m5sgwylf67j6c6dhphb',
                receiverComponent: 'ga8o3suai2ph3s2befjoyphgxtcs47nkowya2hfhv5ldv6ex144tmk54u5otbp5da3jt1agu389tn3alacjmd0qcm7lqpkbp7hb860f4hvj3w8azgmowuomi6ec4ka3vascdbzzssma9vqmcy53j0nkt5668kidc',
                receiverInterface: '7p2d3w9dc9ldn95gqr5ym7igznfqxjdz6n74wm57s2njholjjakpwbwvllhz3xgzx2j6hkjk7485g6dlkdu2s8we1yjvf8wsngybskrhl516c43v8s86c7dtrmwkeefpljfz6ztc2plf5eblv79oksqiici1r6sd',
                receiverInterfaceNamespace: 'fdspuyqwdhszp1iltcvqty221ab90mj0y6zyxsnky7611bdl65jwx9lr8qa1ixfgivdis2tg2tgwabk5quds91t0i6zruh305zz5yze9z0grxexib0r1scxli96w80k0wnzv6kb25vjgwgws03ibba7xkbejh2t8',
                retries: 7194554224,
                size: 5824581112,
                timesFailed: 2316524863,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'gmaxcouy2sooyatf1e6tr1zqge4qk4evg4ss42bgz17h5of82h',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'bxb0vuj81g5divwzo4c6',
                scenario: '1tgmtwfqr669uc78ca4trocjh0n1jq4q7y99l95311h9g6y6kdixti6xch8b',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:57:49',
                executionMonitoringStartAt: '2020-07-29 10:10:16',
                executionMonitoringEndAt: '2020-07-29 08:23:23',
                flowHash: 'nqsmbixem4pzhgy8i36kiyospqly4nzyl2rvfulx',
                flowParty: '4rdvgl5209qesk8gj5qvi7j82izcoab59v6jhp9xr7aj675r1v3sjy3qha42swi95x8yqpdp11xrf4rbikz6s0dhldre1zs7oa4vfx69oqb4uemskmtr31umzxk2vjmze3jz0p741yvz6hedpqh1vk8tpzak19ep',
                flowComponent: 'hhwi7fqarefp5o1wdkzpiv69jyobs990qgjqbreeoibwph0vvrfzmlhb3j8j3q0bbotwewhxcmh9t34ufue5gprp7oo2rls0kbt82i7und9b39hqzjjkrhdyv6tqu14kxgmg0uwtpuxwrhdazm9yek0enh0tpm0w',
                flowInterfaceName: 'a1foq4x6sj13kl0ihsyvw2v28lh46heh33q02c570xwmtxppr0rhjulkyib20nzi5yb1mc173mlsaodea1z4mjgcz9s5wy08uaeipw6e8jmgpi1641843wrslvevhrh8m3jcy398adenj4l1ibdrdab2my942tmb',
                flowInterfaceNamespace: 'x91hl5jlzz026fpuclmh4j3i3z8j1ijckx09ux4swxf4ddteaiq0g4d4rjdzgc2ald596aot7t8ysoxt2gfu2fumw7zqo52ssz9xbs4evdv7tmcsjogsvg6w2buymyb7t22evl02ms8nvr15b4h5fb52p741l31k',
                status: 'TO_BE_DELIVERED',
                detail: 'Et sed quibusdam ipsam eligendi ut est natus impedit natus. Nobis voluptates impedit rerum. Voluptatum voluptatem dolor voluptatibus similique in et aut maiores.',
                example: 'gjpz6j2bkr6w2uxxe4k602djuxfvxoimljll63cyxblgrqlipvssmeafovu02yd5fut1b55whrfxk0xffktm7h5li3qizsh851lsdg1h5tvnhjsv7xauh1rmbdee9vebmxqah4xc0295doxpjbuh8cwzgjx8lt88',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'aoel5d1r157jwupr6vd1tm5rrfn5ud9nzflmxll0gxtum2cy5q8hfn2aim6wa2ysxng50xsv0b00drir7aplujg60ycd2iwm6ktunstkqkpqqky9ac17sxhsb5i382jdvws6pp08ax3762xsf0y99mb5rttwpr5b',
                errorCode: 'puwlf5k9g3p7topfed7clkjegb3xy5sgdvs7v9aoclj6ubxga9',
                errorLabel: 865988,
                node: 6897014455,
                protocol: 'a3piplppbelw8rczo9s1',
                qualityOfService: 'omn4tq2798fc1bjn1zpf',
                receiverParty: 'h9r367niwyni84wd80jzx7q5kylnbmks8598u0d19iuxws54xjqost7wzqr1w85ygpxfsvv0sysnqs1iuuq8o5b1hwgcpbcake9fvj5jdgyjz1d1sjk0w74lod7yndkh9yu4vrm43kxjddit4qdfn540bldvntlq',
                receiverComponent: 'qebfirh746xmaj97e7qgbiqrfd1o0of3xveh2qpvancdyu0mycq5wfmieg17txmf4sdiv52raj65ky3awdkr08cr8kgg7uu09l8gr9067ce8y9kcvrq335yd805vfaubttd951zheyzppqjil20n122j3epef2rz',
                receiverInterface: '5ddx2xv36jo80g0cha24ewmnjepbuhcp830whdesijuxzsrlrvqi3ujnf9wtb947znbin3515m0el2g4lluvwwb010r5cn5kwmuwcsl67pjb7f97hgiw0dpoi6q172rwcmvncezta91s9qaplh5nucittrh39hwx',
                receiverInterfaceNamespace: 's7mobnvp9j63y86jll45vp9vz3l8mm0cmpjikrp8la8930p2hbsxcj6xonao8cph2yonbz70ltq45kesj0ypz58hnb26dmqq595ixnr4lkbpocki2dtvkknlp7w5ta37kc7wtzv3xputicr18flca5u7muwa24vs',
                retries: 8975133955,
                size: 9978761975,
                timesFailed: 9323233541,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'ylhdlqqg7q1ts46xg04pylygf09t5865dvjcvd0jn2xoug0bkz',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: '89itigtlmiopmjqhgmtc',
                scenario: 'bci0k2ormc0k9864luyyp0q3grzzrq2k06i4vvfuxytc5y51uvl38nedn62t',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:49:52',
                executionMonitoringStartAt: '2020-07-29 15:44:21',
                executionMonitoringEndAt: '2020-07-28 20:32:22',
                flowHash: 'pzk0zpmpefo47wddx5hpcwddsz5pblbg7nrub2ni',
                flowParty: 'czrftj4gh1mivt9gjwadruls3fq4csvqfl30f51e67311lzd86gtlv0dagjh6acoa9aovebpk0p39zxjswb361eur0n3d2kqz7ava87o157bez6hzuuyzgh82tjmo6y8qef9kjdzr5lzdxqj4d9q4ce9yqd0ywzu',
                flowComponent: 'z3fv66n4e52u53h2489b59k9zdd9pm2awfmrwlsn8mbdhkz8fgtpao7oxdj74sk2hapxb667wp9zohu6r619q97lnc8sfsuuwjrye49yhtga3bex3b7z9cez50eqpz5hs6vrz9aainpe4fp7ot3365hvvbufrdat',
                flowInterfaceName: 'qdlrm17f4ftduarrb5xmzmvvuhujsk4kci6uqyxl9dmlihgms3m5g2cvx755pl5lfmxdzw3xf3pei1oabd2pubr4mm2tz6duas5s17mjvgf2d14ictjkucprqs16hwx67rkadrc1jiicih6x0j6hnqmuvnu7tn8m',
                flowInterfaceNamespace: 't354kybg36jcylys3g8mo16b25gakng70iw351l00gtnahzpkx4rwxc6o29d1w75tetoiejtjcklkdooa6m1ykfiv4gq5yjryvslsv7jm99cyocvj0z8z58rsmo3pq9oumj38qpdmlcydic55yvsosfzkudc60y3',
                status: 'ERROR',
                detail: 'Cum sint et quasi ipsa molestiae esse. Perspiciatis repellendus dolor repellendus quasi reprehenderit sequi recusandae similique. Quis sunt aut cupiditate perspiciatis ea voluptatem explicabo. Cum quia culpa quia reiciendis vero. Et perferendis aut in omnis sequi et sed. Est voluptatum ut dolor.',
                example: 'vv55f265bcbhlullvhf8sk9yuff1f257qp8emybwr9270t97ucphutp9qmm11ksnaju9owkdcboz10zz72i2yvylz2saf1n1i1uipg05kd42csde8m8be692wpczh5utd0oc7fzbvnpa8d7pxgvggftt8ca9rcyg',
                startTimeAt: '2020-07-29 15:06:46',
                direction: 'INBOUND',
                errorCategory: 's2g6pogntep6y99ak729j4o2cqtbcik6xu4bz7xh87bjtsa6i1nj8dj2u5id1em83m8h666oounf5pfefg3726gsut5uyksawsqed7h0zelly08ehrd9lufemo2auyqk72wpmrmvyesvrbn8th0ru18ph2jhf170',
                errorCode: 'zqa5lnp0l9t2nqnk84ecm3yjklwsmz3uo08pn2r1rwf9gccnen',
                errorLabel: 316800,
                node: 5228948306,
                protocol: 'i9qgp5g0okr6sbdvwhoy',
                qualityOfService: 'zmia8qled1i84f359bjv',
                receiverParty: 'yje9f7pne2a67k51vpfnp0rcbxs3idtu1k4kcd1zqrjje5zu7zjgqgoebdfe67xnosatbulwuxxzx91osapgrobbo1ipnx4wqgfaivxnz5tg371i8euara97ocvma74o5nsou7ys2lydy6wj8y6hhj46i7wc4tb5',
                receiverComponent: 'kugt5ga2pnbdjy7lg7kv4wr9u2h3kl5uy7cuq85j2os5clmvbjweroz23h8rco0409xfvcujn6rb9ucwv7qj3i179h7yke2nbk4rv2ewpyrm4k3wn3yxzq5bwc0vqtq9sr6fmz9cexh5j3mjehc6tsl4cikgph60',
                receiverInterface: 'zreynt4z19vfh1vde7s6nzxvbs25nmko8yx4nhv7lrvxigzqaqn2ekayriie9usnrz0mj4vv9qvcq85cqit6z075xvet6okfbvk22wbd119dhn7nvrwm3asl341cb60dovalisij54bi5q8wax7py4g4mv7vd1i4',
                receiverInterfaceNamespace: '6onqj7nl7coasqhuh0nreo35fgyen4v9ns61jovpdmc8523bnvx2a6qkrtjxgsciohl6ce2lpgnr2qeu95o8trvh2yk14utnr2n5kx9q8k7qak0bbfi5rdk7zeaaibx3umo1u4zgu9l6riagzn29v6wtglo4eipq',
                retries: 9011536936,
                size: 2007899611,
                timesFailed: 4984310507,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
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

    test(`/REST:GET bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '2578dbe8-3df6-4b7e-bfbf-225390315594'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2578dbe8-3df6-4b7e-bfbf-225390315594'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/2578dbe8-3df6-4b7e-bfbf-225390315594')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2578dbe8-3df6-4b7e-bfbf-225390315594'));
    });

    test(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b06493d6-ef10-4a9e-ad46-1c027be75cd6',
                tenantId: '4575ad71-cbe2-41aa-9409-32d408287af7',
                tenantCode: 'v5kvh8tccg6knueyhm85qezoyk9noms8ego4eqewsk5z46icr8',
                systemId: '1c628e3e-5e7f-48ca-bd58-e3666b7e9440',
                systemName: '08w6gv413o2jqfqumtkw',
                scenario: 'rzehe5kry9t76hb1zceth8337t7t27shsudh0zpjruqd3qxxae6vodbm7wz2',
                executionId: 'e512966b-4c45-402a-8e09-9596c345e241',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:48:59',
                executionMonitoringStartAt: '2020-07-29 12:39:31',
                executionMonitoringEndAt: '2020-07-28 18:14:24',
                flowHash: 'kkkc0hs7nd8p0a03hmj37fmm5cvicndrlmi1xwy8',
                flowParty: '98nukntmngvrl2g9gvpfjxvuiqsl4xa6mru5hjbiulhj753lnxlw5903ji3wjmr7gsomeqyn56ie19be77plk8u2u0cfpci0iz11aqyftwme9j4qlpz5ezsgvg78uzqi35adtap42plnqocd56itgnd2c3ncriaz',
                flowComponent: 'a0424sqpedio86trn8f6la5wizz9piy7wews5a102z2frjfo7u1vo21xqzq6641cf9r5oc4mg2urr7j0te31ogp1qmvh1yx92shygoic0obxmlxff4gn0y1lb3bxlad097k4s0gp5fk8zme8532gg5zg52gc51io',
                flowInterfaceName: 'qa9ebamy3pcwtuaw8xf0fgapzon9idt72op62rknsgt3oy5kqdr6j2jy0ozmshtjcncc3cn1ln0i11fjz4fl4fwt89o0dj37r3ga1xppqil3xy7f3btec6d2x54jjhkg8fb0n6z18wkire23hlne5fpn554d7u0r',
                flowInterfaceNamespace: 'cv1gflyl27e5nae3t14gonut52wzb3tn8kqp78ndhvd1o4wx582wis0kz3mu9s27c0t8sqv00pkh0posae94yab3qvcqorkra1paxmauvy4lbt3hda92t40ls6xgp57cox85dmic2znpcsdwdwdhev4y473ggj2h',
                status: 'TO_BE_DELIVERED',
                detail: 'Fuga quas vero iure cumque ipsa ipsa esse accusantium iusto. Repudiandae corrupti debitis odit rerum modi quidem. Debitis provident eveniet quas voluptatibus consequatur accusamus aliquam. Mollitia pariatur cupiditate corporis iste ipsa nesciunt nam. At consectetur maiores cumque quo veniam nulla ducimus.',
                example: 'm7ksbk2lzwu1jz94ioim5tw6ekvrxb7u1bryvlb431txz6n2bazq2w5r8kcp3h26jk6s62vp5x0t4d8afrh43pbbj9e9zydkdj6fonthei6sc2x54pshq4aiczc3tdpln9rivpolktgjj8tgjn7d7nq3zrczh5jd',
                startTimeAt: '2020-07-29 11:55:56',
                direction: 'INBOUND',
                errorCategory: 'fuguvdqsog6e7bny1bviqv5ysahtfr4mp3v1r485jsw7wmy8qu3owu23iksd5fginf8kxfjqf5tfiz9u9nfinpr2skvsf699ryiqsnvqog2twv4pozlpekivea90jncdx9nm5336rxavq49fic554d90b0lxngfx',
                errorCode: 'sa6gn6uh1ffef9krcp0614nsnxciivv3snjm3lnr187oyik0hq',
                errorLabel: 243179,
                node: 8017439802,
                protocol: 'ly9hmfdvc1mpjp8jpi42',
                qualityOfService: 'd47uh2g2eqiczbfboefn',
                receiverParty: 'p3vyrrsvkd8ttag2vkbbj4i8379k07dtubithmy5orgsch2uib9l9rouo2ez6j8bbdowtoadlzsa2dbu66xivlv5usuzod3gm62vy4kpps21aetrfl6yw7npilvbc6xyfpj1wn0fgkg91k5q0u8tjxn609tb7f5v',
                receiverComponent: 'g2hr8qiszql4o9nabj51r3acy7cvc3f7pj33gik9we5cyeo4z9rjh5cldvbktzjatk8de4w6us72gf6h3xc4jn11u4bu85c4i6umgaxe2r4c5pltk1ndeecpcq5ugnqnc1ch5gijaf3p5a16nsrr72wqg29vtyya',
                receiverInterface: '1sal89q65k4vm23slw7rqlm0eq5m8y2zq1w6tt49k150nh442661vyrgpauc2o7lvu4e3amomi4hj92s913zb7dieaap396kglv0p41d4j5cpzqe2ah1swcl8ee8e0wwz4zmy7ef83hgz5i9crbuhs5n8paiour3',
                receiverInterfaceNamespace: 'oygxbdivwpjiq3g6gho4zc8br7idgbfrp5fwcu5faizul27qqkms3382d9r0079nm9oj5i2548qexf2q7hzm0zh5q65ut7k9olivmdg12l0x34kzjtanyelivxsfni17wezozsfsp797t1z6twgdc0gss9hdnjjr',
                retries: 2924835641,
                size: 8622872526,
                timesFailed: 6982631015,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                tenantCode: 'qhbof40tanjiraukqu6mek0btecb6wdw8hi6yxztio0xatqpec',
                systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                systemName: 'rvscb6mmdm6nkvs10zbk',
                scenario: 'ly47rnpvwy39ho6ldvc7cnon5h616b7ptc3p19byvxn9a5uugipnunoc869k',
                executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:17:39',
                executionMonitoringStartAt: '2020-07-29 03:05:46',
                executionMonitoringEndAt: '2020-07-29 07:39:40',
                flowHash: 'vkt71tyf9ijxjqcd0zq5uquaozlpy1j4vhpav1lp',
                flowParty: 'vubfpop2n5eeflg9wn1313yo88qm5w1ybmxbkhv3ylofbn8pr8qegwqhywdbab43chu69y35yfb4k8mll5zajxu5u7upgse532z5t3qhqvpso062pbh6r9o4zwfmarrd4eylyc6ibxsjpqq6a0ld9yqp9dut3non',
                flowComponent: '5lz0xkx7mzqnkiwbnppu7013xxtdiern49gk9n8h98utc2a5stcp539gtknncchamwqoj39fmstvfpfi5akxpedv5qocgvxunga8mql6fmfwk2dumk6rsjt7b6dh4etj94vz98qik6o5f9zyo1tjn7049qjlw4zw',
                flowInterfaceName: 'rv0bu95ld5y8g49yxfsya5as4bchpjvytf9ui288aybqptsd7nibohe16bmi6ugkfe7fk0e4a52y70ivaxb5ahc2yfchqlaetq8edgwlplopcmuekn8jrw2tra3pav8d3dyumuv23f3d3492pi4wle92szv4m7ns',
                flowInterfaceNamespace: 'kb2pemhxoyica76d4tr990jpfkcws47a2o89nej2by3kzoh5gth4keitgai4d3j3hts8z1rbhwo8ahtscf3lw7l56kjz8ftdil652l0rq5owl1y9j2nzch74ebd1hpsy6cbnjd52sgvc8e0bra7wlho7vrzpwjmv',
                status: 'TO_BE_DELIVERED',
                detail: 'Eum pariatur ut in hic sit. Occaecati cum iusto atque quasi sed. Consequatur sed perspiciatis debitis accusamus dignissimos delectus inventore ut.',
                example: '5tyopzyrffuv6soaebpm8epwv1vgk7w8g71119ivrckaeaueka01ulfdjzl4884omtx5ylf67dj3bnn1204ixk06s03u09srjj0s7z7dc0w1tsshlf5e3zak8w3ln4jmupwluve66aie3vefbadx261n1l4oslgf',
                startTimeAt: '2020-07-29 07:05:03',
                direction: 'INBOUND',
                errorCategory: '0m42slz7cvb2l5bqq9pxwvdss2g1re667wrs6ibwv6m1dmbhd9fz2o4laqqrkctnsujlpyf51f3ztohyhm4qk7wkmmwr5nwrsh73hl6hbp9f9ed8vqqlqrhmh55zqzg7cm2qcqmsq8gpev8jd1yia2526qqwqyqi',
                errorCode: '8wi8dxc5oi7o3482vp8wsn0ddiakym0rn9jd38l9dbj6303wca',
                errorLabel: 421762,
                node: 7478096237,
                protocol: 'mhjhqu2fr2din7202b4w',
                qualityOfService: 'lv79f4rbic02xqk3kyzu',
                receiverParty: '3kbv9trciukpvmx1qc5xd5hy7cl9n9mtgs4vo1d8v5mre9wolwcf97iqg7efou1b261mt28127eooscxmoomsd60pfkvoqpy2dn0z7m3ag64ovn9oblcx6uez3i49ilyevyzaknuxcaflmpkoohggg3pc84hd3yz',
                receiverComponent: 'urgchux1ewsbfygtpwssu3mecgulbfjfqnog9ta1hsvuell7h95avnfsjmhgpvn39gpul412efgrfpfe8mcz6irmtayvrujemou2is1eot77mka2wk4r6wvxk9mn6xparjp4qxcagj38ymihp3mwquv7zl214omw',
                receiverInterface: '4zyh2nxu6pcc2ybhdohkvmwa32jtowt81shm3x5sh62ubwi6zm1dx1s7wwl1xe2iqztcnv952lcptiq2jiqmnraifdsjpwfvyhqqpwv61v6rpaswwb4fcff8uxkpbgycbg8sptzoj6zo08lnwcyhm1kt3i9jpfa1',
                receiverInterfaceNamespace: 'q8wtd0e66st9cid8cjpwcv0cew43o61vq5e1jjnl13bb2w2qxtb93cti1rtlhh2jx3aqutserse9nvx2ce5bx51ijk4ets5h1elv51y097vjmhqbokuf0eygpg8ke3vbhtxxrpjxqw26xepj92p28vpsdy2bgkpc',
                retries: 3559813024,
                size: 6084222004,
                timesFailed: 8230334373,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2578dbe8-3df6-4b7e-bfbf-225390315594'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/2578dbe8-3df6-4b7e-bfbf-225390315594')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b566bb7b-d5ea-42ae-add9-7a4ad103aea6',
                        tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                        tenantCode: '2i1radtt68c9f184jvjwx2ugdglrm9kbborx3c1foaut6tyggl',
                        systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                        systemName: 'e0xdskc65cn6q9fhii5i',
                        scenario: 'e39r0nmwnegtky1vmop7et8dcm8p6hdepyew4lthbv6s3vzyxnus97ol1so6',
                        executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 14:45:14',
                        executionMonitoringStartAt: '2020-07-29 12:19:25',
                        executionMonitoringEndAt: '2020-07-29 09:03:48',
                        flowHash: 'hlnup3976igly0kx5gxem47qwm8msdie1yo6ruhu',
                        flowParty: 'a528jenkx9yioqqgngzbyvhhi5zwxp2pbd2hrfbb4h8in26s4zqchcpd01sg5urdeexfchbyly0r61r4uwztt6phdrn01zt5qw1fcq1cpfof4qxrspe3lf3xxkpff5zzi3n7vhxjwblz8tte1n8c4iujt6vt45pu',
                        flowComponent: 'g3iqjsmnipbjx1dye1zpcu0d0tagn1qnc2ybine4gzryp7dubqd2zsr0ctwgnvlj297626brpm447t0sbqrnwp7vlu6enj3krr5frl552jzfqtwj325xf1588axgbnuub2f842yr3m09hrwakgaycyzfz8517ydf',
                        flowInterfaceName: '5jqbqn7unk8je1v8kt772s54xqhio6vci99rncru8dm5vuq6p7c9l29nstlr3fouf964qwckb7v1pcob3xmnhcsc6r8a82r0uak2gxyv0h0hrvrx69t6yuy0kpam6ufw2syl18spsvjfbs8swx4rh585tzar2qa5',
                        flowInterfaceNamespace: '9lusv90fq3u4k3ce8sfatf61t07rww8naicaqv7t1apq4umqfucxqypig9nktfpf51dla0kwzbaupa2119g1pdmmrws70h32g14qs5cokz093l8aaw3ig3mz7xv215vq37fsd573m52u250av67otmsjao3sjmo8',
                        status: 'DELIVERING',
                        detail: 'Nihil quasi nostrum corrupti accusantium repellat dolorum explicabo ea. Alias modi excepturi recusandae iste et at molestias culpa sit. Et odit autem non officiis. Vel ut ipsam sunt sint non quisquam optio. Aspernatur omnis quam odit repellat quis.',
                        example: 'xo0i1aoey3uer8rmewuprk4k4x3mv8nw4r9rws0w5flfcoupak9tvtt2iowuoczyyf4yvhvxsf3bykr7f4fy150weva1daem7811jrd7pqg3r47nagb0ymhd47p2mj9k6ebvt02s9o8am0xvpqsz9yuyzx6x60mv',
                        startTimeAt: '2020-07-29 12:57:37',
                        direction: 'INBOUND',
                        errorCategory: 'jf46jax22ou0va9al89b0neax8lkwr6heua4q0s18k6lfhkx9tg8yhsk3g1ufbc9pjsh2pw77jwvduj3nnrbekexqdu55adq4wm4g8uy19eimeveod4c198sspvwewl9xwuhggtbk8cvuembkd33kkrzcluw025u',
                        errorCode: 'tlk7c71un07f88lqrn0ttn3yl7pbp93trzsvy1g73yhajjcodw',
                        errorLabel: 182113,
                        node: 9050708870,
                        protocol: 'wtxytecv7jdug4dmkh08',
                        qualityOfService: '8er558xddnnjub6hgt6k',
                        receiverParty: 'y29b5092ec7a24ztvjl002q2rnorwygelt57ovjo1qufbicktd3w5r3pqmfv0jxpxhr1ftgjq75r15lsd9bv5ndz2nre4ivir50d6ov84btnfhnwww8gkk2dfjc1ikohmru6yogmakua2r5amxssybz67k53c78w',
                        receiverComponent: '4sxays4xqdzk3fuwj1ulkejika8dfiusbi5p5r1gy3qd1jegj8lodwl6h25njlr1mhxvkb1v8h93uhoeop47ldjb4w8thtvltuzel7830bf70zss1qczu68qja61nmmpvim22kq29ykt2s473urdxgyeiog09kwa',
                        receiverInterface: 'fpu028em1gtmrjhj60gdqqk917ks4auur142cggb69hflwbkf13b3r965f008zgqepb3ejpalu7hxor00f8wlcyg9q9oeguzcwuv0kvvi44yzcb23c4n7nemo8cpbh907rkve6g792vavz34ew21m90r0vbnsvhr',
                        receiverInterfaceNamespace: 'ddo31snxloc8vhqmp11c358fz3xveohfaxuv79d8fs5aywhnbqe82bug99wx92po2v3vrum9xs5ljwib04s56skc7d6l5n4shvknd6rcyx7dszak63p30wljxn9twtedbstl105ye3mowfx4am0vyh887lmonxsg',
                        retries: 9782673521,
                        size: 4589875499,
                        timesFailed: 9851665677,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', 'b566bb7b-d5ea-42ae-add9-7a4ad103aea6');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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
                            value   : '2578dbe8-3df6-4b7e-bfbf-225390315594'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('2578dbe8-3df6-4b7e-bfbf-225390315594');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2578dbe8-3df6-4b7e-bfbf-225390315594'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('2578dbe8-3df6-4b7e-bfbf-225390315594');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '407f468c-8ea9-4027-83c2-2aed2025c646',
                        tenantId: '5d2d8202-6990-4828-8f1e-12dee36129a8',
                        tenantCode: 'encnuizf7fon0jkfbjn3sf8z5qg6sp304srw0v96a3qpmdsfs2',
                        systemId: '09e978a4-4cd7-4056-86f9-2bd7dee9dbdc',
                        systemName: 'uktmfqf1ybza3yp9utl3',
                        scenario: 'ynqy5p9xcdq5pfkfrciwseu1n1m9kv0bl6ppnq9pe7hafvoxvxn4e23hu3ri',
                        executionId: '25579c36-fd82-4b1e-928a-71cc91f3a824',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 06:46:38',
                        executionMonitoringStartAt: '2020-07-29 02:54:01',
                        executionMonitoringEndAt: '2020-07-29 09:35:55',
                        flowHash: 'mfmx4cfrpgmaudeb2ckp9dcmh4o17jtfjfaiiucw',
                        flowParty: 'j28yci92n2gglqzjyipo2eka3j8b5hjhwq266xd4on618zywa60v69nx4vvydg6c7zu27ts6rnsxtjcnr05taxyk02h4adroh1j091c5ttrz03hw3i48murknkwyv3c9v07ltjum0oxvq8kqphgqw4ndhafgcj2a',
                        flowComponent: 'w22f3jqmy9bjg2wjg5il5tye8y8s29zypf0dsjzy8mmf2ntgqubzxqh83ydiekglfxvh7vneiqn0frs9jnzxwqdap5dld0gtym7l355b8hqgxd0k9s5rsaa82hcpe5uf5hmt6wd1k371h8vgxjj2jmynj6m89lxf',
                        flowInterfaceName: 'xic5klb0lnr109cfodoxq8wnr3m0b45bly0kb8ps6i5ikblonl01m5ymmsxa34pdvdgly11iedmt7xljyvqym18q6o6texapqueu0npjdu67gexxfvlpi56t7xwxxvxu301a7uzj2a6oivb2kxmx3ayi0g9l93dk',
                        flowInterfaceNamespace: 'ymuuxjnjavbkpuruam1tud0gpy8of7agswtoi1nmtl7689a8lpumyi46r9ave5deq34ruosxjnsr1klp7ehg68hfbg29iphu66ca5rbuvwn9g66fsxyewod53o6jlilegmy5i887n59oyixto0pp86vi5k7wqj3q',
                        status: 'DELIVERING',
                        detail: 'Veniam qui a ut repellat laborum. Quia esse nemo in sapiente ut. Inventore ad quaerat quod aut sint sit modi.',
                        example: 'gwow89scd1e4wa13k3f1nn8uo01dv1p60el7tf675x9hy8011o7tu2p8xoalfglw24pnho6ixa0oevtpvbpimtyjfdpur87j9m0b6lskrmbx1wi8mbn0htuu7xv6nzttwd5khc8i8mnzvyodmitdgk7dny38f0e7',
                        startTimeAt: '2020-07-28 22:17:50',
                        direction: 'OUTBOUND',
                        errorCategory: '4ynpvkctor2gntxq1rg4ej0b5alykkulpvzi2iph3cxvti9vxtgjstbdvwvwl8fd3u99kjzahoj501czobifpuws18grvib4yfngv0eee1mxpeer5mj6fe9idw4mhzp4qopi8th12x8qwjlmhaz6yat6l53eff4n',
                        errorCode: '2kaxkzgtzf0cbi8f189vai9owyhz1u42dlb46gi9a138ke07so',
                        errorLabel: 862556,
                        node: 7302472429,
                        protocol: 'v6wpeg822954d8y5t76b',
                        qualityOfService: 'xljqcmomkqn4mx2p9cth',
                        receiverParty: 'ibmmyo8h0i878yg1ur3hlz0wr89zfdqpvywmr8vvtu0kiwpnj2ytjflppmlo0ygvchdn439hiu6g4gofpfn7q88ya2srp5xxyin4nqgc70d5bqsfg7g6ebd1zph33ppnlttc0ht7777zgm3jnw61e26fsb9kg0vz',
                        receiverComponent: 'qsg724jiwutqbat4q8t3kh66qepjrwg1nuz7pr8h53vhyovptqpu4vu6v3bmdth1li6n8gg1mu6cgg54dhrmu9nnlzla0dnyhurbomv2bs41gnxa1cdrr1hwc8p4mcjyifpaf6tr984mpnet5lxilmzhcewkusiq',
                        receiverInterface: 'wa0stibfxr2fn37q7gt7yvxz7qajh1yanunmwepph7rrv1b808jya5h59u3xbqtfcm58en7xhg9xqqkkulx36l5sl5jhgl94nceu5i65emmxf37qco9zr3js9febkgmq4ij72sdn16kolh56ziy0w63hjjo6l2h0',
                        receiverInterfaceNamespace: 'tfjoamdx5dt4i6ib32ehsyy5rhzecw05czk7mgs90rktlkxtbw6mrbzkgaelugg85wpcy26u3q7hcir1bdly4p1gdeqieczg709btcybb53r1zxn4vij2k9bg9d73uahd4cx5arhgebc4170hsxshfh908zqswt0',
                        retries: 2580883563,
                        size: 7352354110,
                        timesFailed: 7024116134,
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2578dbe8-3df6-4b7e-bfbf-225390315594',
                        tenantId: '0e791533-1e01-450d-bb1a-5e9a2a315752',
                        tenantCode: 'zyjxni9v8uysvwrt2olignjr1sd6wux5va9rkldkvshid73se5',
                        systemId: '51f2e58d-0ee3-4172-8cd4-0e91841bfabc',
                        systemName: 'xriyi637h2ok3ted7ybp',
                        scenario: 'odp1vlwxau8jkwjbozl5kzgigynocwy736p5ic51josvrb2sz9e6uyw62cme',
                        executionId: 'a25fa511-8c1e-40ed-a971-073595a75a4f',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 14:19:35',
                        executionMonitoringStartAt: '2020-07-28 21:13:44',
                        executionMonitoringEndAt: '2020-07-29 04:03:10',
                        flowHash: 'nmg2gmsp2992noncq41m4wkzqneeefifz7xz3218',
                        flowParty: 'bgr93d6r9ijqrvxt5tk3xk0c28jcham9g10jtpks3aj1gfw69tz555h6sic0sbqnb2za653n3m6dosc80huvwhhr3wevh1w7r91a4h1d7u010eat5rd9e0ruzhw1c14idk998m1gf6v703fx73y3e1e044nnxkpw',
                        flowComponent: 'runrlcqpz3wwl4gdgdv3kvbipelwrkmjhgpabt78xihvq3ffac2mut88kuvxmoha570yw1mb733yl6g8jknk9eeqdsegepe0419f2f877gru5n711xv4mi7dtsbw2k5y0k4d1vp2wpiomluwcjf9pb0yfowxeepu',
                        flowInterfaceName: 'qcsu5ngz3m2sna0vi0wxsxst3i39y0i0pffjlqxot5e4sl4thnbu2gsv9gsn0zk4734jt451pe3tsjjlce5h01bl260tmmjpwb5y2oslnfpo9coaz5ufj7m82j0v2o9szd4a8d9i2lzejk8rm48wawd6awwaw9z0',
                        flowInterfaceNamespace: 'sv0jvz89aeugm5mcrkg0t5svxsogjv6mu58yvfww8gupzss12jiknkntpg04z2efol8s2y6iyqupk82d0iecwghcpj25ow3y2y1croejqtos890nhe49bm3sk1x7hwnq93e6wyg5z3q5om3w9twv0pf0ocaxed1f',
                        status: 'CANCELLED',
                        detail: 'Enim velit autem. Aut a tenetur. Iure quis cupiditate quo sequi reprehenderit atque neque vitae veniam. Animi sit voluptates maiores alias sit.',
                        example: 'ltvwhtt1iwjd4v5vojfrqhzr4r8650c850mlaptfu0t3l69mc5tfzhaw91ayh26n4557y2bt42uqitphss7y41k3hosqcbdbuluku37oe8fbea0yrajix2wu413kut3xdttpz5wuqwm10p50cnzrqu2svzzezkqf',
                        startTimeAt: '2020-07-28 18:49:59',
                        direction: 'OUTBOUND',
                        errorCategory: '8s1486he9twdyuk016qs2sfa3q6m10rlfrh1ccok1d9cx5x3ar82xjdcl3l41ppcdaya8wdv4kwd7q75jho532dsruh2lmax2wwft1tcftmbfv5urp8vle3sdk35g9la14t5tu41p4mswh2wunob78odw3be1pfe',
                        errorCode: 'l481emkathye5hgpwnob5qyxlglk9yzgul6eee2ewkjxx1epn6',
                        errorLabel: 332777,
                        node: 6345307140,
                        protocol: '1olih1xmzro7qd3873k7',
                        qualityOfService: 'eoh3v512rh7boi5hlda2',
                        receiverParty: 'suw7v5s32tmtku9c6w33knyfrk6hzedklva4j652lifs3vdme7w975y0w0o94zv1tqp6jvy93knvilccg8xtk7x3nig1mh4ciktp2tfeo9ejfneowv1bzzteydntjq18qtegcjmqoaf651k2rstj12cucoewpigc',
                        receiverComponent: 'hj00j12o4vegi8qrdiy8f5he1xr7bg1g4wpq8k5g53rqpzl29i5lm1r7jlmy728wvdt1ysuznzel5piusqcwqfszeonbhifx3yhdtpfoilijckab4m6s4qhda8srxna2yqqmijwlega1mxdqo7rfnnshal6czwwj',
                        receiverInterface: 'lc5i46mgzh06gsrdg7zza6t5ot7mzr2s1h7b3eyy091mexmey528tcifwtqvbfu83g9f5jf68kt0438rqkbselwk24a8cx4r31gi6e5p7wylcnrp66s56ja0yro07u1f90my7jled1q4lampkmr2a9m6d5bqvusj',
                        receiverInterfaceNamespace: '6jcu8d1zjjwnfpts84c3t7wkyc3yqetzkq1xc213r1ilmsl06t441iipkza09cjpzrzt3bdxotywka4hcijslxzj9ut3voi2xa6bkk3jifezgc63a2gcyfcmz9k1wst10dxhmm76zc6ukspsu351osu2fea2n1tu',
                        retries: 2710158139,
                        size: 9580130607,
                        timesFailed: 7476773545,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('2578dbe8-3df6-4b7e-bfbf-225390315594');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2578dbe8-3df6-4b7e-bfbf-225390315594'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('2578dbe8-3df6-4b7e-bfbf-225390315594');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});