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
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '4f797tpxey3rn7rvgb6njgipltumxsm6uf21saw2y755id7yqe',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '2fig8spootw0t0emw1em',
                scenario: '67yk5o1ha8gp0520rrjnxon47dket4yx67zgvdjieyfvbnjk0iuycin3ufwp',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 08:32:37',
                executionMonitoringStartAt: '2020-07-22 21:17:11',
                executionMonitoringEndAt: '2020-07-23 05:17:38',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'lkqf4cyjs648gvukpsti6o3llzf1ndud43qakrl1pz0fue0uj9udfusk7zw1esmbsjha90kq3mjk03pl4hsglkfn9ur1gvgoj26jpi4c62e4ngxseqw0l7yljf832x0j1h4rn3efhe45ueo82dluo0laeo6jbzb2',
                flowComponent: '7id3m4if2095wvbkm181g9oq9n3nnto647g5ekgznjw2c48ala3n0qxsxmqewpzd5v9cy5w5e8wyi9ifrbrhnso7a38n92v1epast9z94l92x41ahi3a52kj1oagb4f60g0wtwsdzhy31cfoy4r621dmkkeyviu9',
                flowInterfaceName: 'cvpo9urtd21k2fjm21i3oje9s32k2rjg60gqd58xggqcsss43yn2csznla7jywun22mfkoep2jtu3vq3mh7bae825qsu2f4gkvx3raialu2sx1eiuf7031tlmuan67cptef2xa4xbe1m9h51cnc6xl8b1iayom46',
                flowInterfaceNamespace: 'zlcqej1e5wdk8j2fvsrlryim4tud1cnknd812inwgutv9qmb6cioe56ei6t1qvel79br5exaimqkq4a1p0oo493xd17jjc3swu68rs38gij2646lhrw815cvppsi1sa9twkxom9uhvm37w551lp4cfoukc7lju5n',
                status: 'ERROR',
                detail: 'Repellendus quasi sed commodi vel iure. Vero et modi sunt voluptatibus architecto maiores. Quos sit et non voluptatem. Sed autem enim beatae ea perspiciatis.',
                example: '7rqqxopw37r0fykjdlk1dhi8olvu8sbeeg300mo8cbz7i8ziywx2jxt7dpb4vug2b57w8nufs63aj9y7ljpguzhfnfwi7fcyipfruy2kr8c262xjcz2fycqvn5v9bwdl7bflb126q4jb9kohqo9erj8hmyim9jwf',
                startTimeAt: '2020-07-23 02:20:15',
                direction: 'OUTBOUND',
                errorCategory: '7hm266aqwynl42q6bku2gf4ulw6k7nvlmszuqgb9uhjnwh9meqvv0r9tr0un7ll8dlxbq1c76dy8iq2llzqknxvpyyaq2kvmgoa8zau75l5o84wknpcu8ekyy7k7damoaqc1jgvkax1tk0izvdj5r7s827eqdwe1',
                errorCode: 'ztnvo5smcokiuztzkezr',
                errorLabel: 122991,
                node: 3434634222,
                protocol: '8tfpnhyzq65xvd0ds8gv',
                qualityOfService: '05hoiea5xuvqnve5o7jg',
                receiverParty: 'o3scd2ovsyogibhdhc7wgjzarug0pgannemq53sue4kgl6be5ermdkv80uj0sdwx6035736ds978tuoz56rqgk09luqqqz6znn7rpxhmtwr9rxi0ziwjts3fasr2qw8zetembiqnctof7uqlmpgk89kx8dk1b56x',
                receiverComponent: 'nn155wz2zx4t026agdczdimkp1fvbfk5bj8q5o4nghayy18dqmtzkfiqm1ibu259pra2gls69754dmbn14zzmsgxpw06dd360caia0jgb3kvv43n2087m17huh6kq848j6chh3sgu8cjtz6p9h5ya1ug5bt1fxn9',
                receiverInterface: '72m7npmmx1fnq5nyivol7wircb95xy38b3gd2sgj2wor1iweuuhq008n47y1s5kxpqts039e8guai6bk98oszdjp3q4q8wrf50qxfomkx3jj8ln1s2xeufg3am4nd7dx2w7y1k83buf4gblsv0r8ooocwk15r70t',
                receiverInterfaceNamespace: 'te876gduf7b10gm2771n4gckk2lov6usrn7wlnhzc1qbfqkvnwcbeqh4cz7xromcdwv6amcd9r0eethhx7r6ap3oond3xk08y93cs4nn00drlfidp9j8nt8v68eiuhyx7h91l0pom8ym00e5f6dt4gnsfymcgd6b',
                retries: 1156697097,
                size: 8367036353,
                timesFailed: 1414312101,
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
                
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'd8be4qvnh9rw69cuwqjipko9vdk1hc4gj9u70iemzcc0df41hs',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'em6wocy2djp2j5i9h0ct',
                scenario: 'irbcu0fpcd5ljwitqsosetdvyqj8n0ghno80ahuqs5yfjetk3l81f7d8dpzg',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 04:14:57',
                executionMonitoringStartAt: '2020-07-23 01:31:33',
                executionMonitoringEndAt: '2020-07-22 23:49:04',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'nk3rq62fl4t6dnoyku79vqx18snj6hb8y8cxgxyplthyli2tojdb9z02b3rfj6figg1fjsm95wdtwv1oy57na1svx7rpfy9ia4lwls3ay5p0nbwyrqexmqpf3ha7augv4213s8qkcv0f7oc6r5txozfr48sw7bcb',
                flowComponent: 'riga130vuc2h2why200jhy3i83wh1nfea910fx5fwlrhvigu9zwl6hqmtvuxsrm5u5qlmca0awufdj5mf49hpflj2jfsupx8zg61r3z4qhwqx0oetrtnx8mdgjtzz067seebgyjzhyzpu85cq6i349ocnoru6y8x',
                flowInterfaceName: 'hlxrq3b9wk8lwmlzpr91yrg0uq7myadmeochvv5dypnylrg615yif4kovtr2lau40h2bueok3chr1g0nia34j4h8gr9fda3flv3uluo7viwxz22awq9a28mpgctim75rc2tuaw3zl9wpe5pa6ygg7x9qaeo4kle3',
                flowInterfaceNamespace: 'yflrle4tf6crg7m3n7rvjkggghikl0vd0s6fwyzud5l53229xzx93l3zc4rvlqtc3h1zf8anqsjv0szhr1tng79mrxbqmf9qc75agwt2in6nnra9lzxmuxzvlv9s82yhxd7h1vkax3rq3yr4f70vi9iclaejev13',
                status: 'DELIVERING',
                detail: 'Corporis vitae autem officiis ipsum aspernatur ratione consequatur sapiente. Nemo et aut qui consequuntur voluptas. Sit facilis enim alias.',
                example: '9ecxlh405j880gqritz4yb4owmhocijwz13oyox3517w273q7s26w23fe4p1a7ph4fy5bz6kvl3hydljbo13hdbaql6x3dsyx632zjsgr7raar0hehahafzeus56t04na1shabrnuww72dasndbt4kbmpkehfbi4',
                startTimeAt: '2020-07-23 10:41:10',
                direction: 'OUTBOUND',
                errorCategory: 'ri4xyre0qccvkddsvxc9qhzhad2oalrbcv8kg0d54phooiefij6upy69lf1xrij7rnfejgigjqnncik4bvezust83332llcb4wh19ys6e0cqjdpw9x1afkx0vv36n1efmk1v0o0tb3lkeqaqpdl3u0fe3ug1ckoc',
                errorCode: '81dhelbpi3h3xic5hvab',
                errorLabel: 588814,
                node: 7151143246,
                protocol: 'ri7v3euhogc5ycpfdiin',
                qualityOfService: 'f48cudhp8q2bherhotnb',
                receiverParty: '7x1h4bwutavlu3p2xu789mee0s3pkji7uxu9a0azj7utym1kjs0m67u9gbhak0qicrxuve50wr45s9qzfwdv8rygbybtq3jzq8asao75oo0s5cw390bg9d7esljwalgszkszf1j5pyrx1gh8v1w41od8ubzcdz55',
                receiverComponent: 'qi0anyiy9zcp202myo0veafxr7fq534buecij020psaycxbaig1ofdkk2yg3e020ly9gv3jea8y1bphi39ya3a1zm13bpzvobxsiyxocwiiukfxdeesgdy1szv8me39t678bu4fwlrrer334kn0hkmv75n14y09d',
                receiverInterface: 'r9axzy05f8gybfqbkabalvz51nf6sp7y3j9ee3tpjjjyc2vl84dl2ogdu5l1ybpzs7grm11rumum1g7s4jd9g896jxed4spmiej9g56kjr32rvi06qvcm4pjkl6ix4lnoqrckhwy0901w2m1eoqau7g7r87i9d5f',
                receiverInterfaceNamespace: 'kvf2hex1zf07pa6ahhwbse0jt7ixz71y1t1v4k0ty7o238p8c8qbbom96mz6bt5pyphlxxlifle94meknwrsc26xuaw8ncmhtx891rxoe4yu8a3oy31m05g6vzwgreqfwtnekxwyoe864mw0skm1ir7isj2cljot',
                retries: 2657232926,
                size: 4467016815,
                timesFailed: 4107174011,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: null,
                tenantCode: 'nki05p99b7uple0mpumwnlswebfd7glty3x3yi6urt7d7jrxns',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'zrmt8rvjlg187zr4m4wh',
                scenario: 'k05fsrstzrysq3cloyqtx9fcz73r0f8qa6d2a57aw4o31u6cmccjfwgxwqf4',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:19:21',
                executionMonitoringStartAt: '2020-07-22 23:53:40',
                executionMonitoringEndAt: '2020-07-23 07:55:40',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '1xhoogwtdfzn9z3vzmxnc2bhzx2j2y890b7kaf9895xupu0t7tzcnp1r3kog5ca2z7zl6988vj2lcau2a2aiccg9ewp4mkn7tq1at39lwbv6mwr0elx8amemvi6i7x9x4xc738uvqejznfvixhqxk3zl9lam47hl',
                flowComponent: 'cisnboqi4of8icav2vwa39z127jigznlwkgpun5cnpkzoe8hqhrlsomrfl8pputgj9qr4ae0q7uyjed0padec9gfj31nomlmw50va10n68xjgvpoo3vq57ylvo8dlq5du8rz1yxuhj449rv0oz1h97bzxausombq',
                flowInterfaceName: 'yruahf2xo13sxl4qpis2601tno77y3aztukm2le897btmq83ebkawfkxh0ksvimjeyzttyuoz8qct9lq1ltz45umcc1pk359z2pn030nji7u79kugr1p8zfml891ildpn8r8ahlo69gcy5vj3f26t4l7kdyejqf1',
                flowInterfaceNamespace: 'xwl04wjem0f6humebgp4ld0zftmakar0x6j4ayu6a6hdxw0gscc2xbg8ihmlzh2alcgxlm19osgpmna0tuislbk4w3r9hoz1rz7et7q231eg3ht1ew0zndrt9ym05rmtyzoyzq7jm7v1ksdsryp5ketw5k37rj33',
                status: 'HOLDING',
                detail: 'Nesciunt fugit voluptate et quas at. Possimus quae eius. Ipsum rerum minus repellendus soluta voluptates incidunt sint recusandae. Ut velit nam ipsam. Qui eaque veniam tenetur a. Ullam repellat alias esse.',
                example: 'oqx8iuvdlw2qkg889d3wsn0fujerpepkjc8b7j5obdf46eyvvbng8szcngnsee6sg770yq7ko39w6q1aj8zyki8bodu7eglu11rwpbyj71tzvon04fda72wrfir6j44g249wap7848052m7d8c9mq9sqpp5gkjm3',
                startTimeAt: '2020-07-23 11:55:09',
                direction: 'INBOUND',
                errorCategory: 'gqvag1fvtron99bwhl0zcu81hqnvbo6apzangnccasuhwjmb9ypidnii5mbuceg2qjrpf8oe3osiubdx9dccc0yjoiuxa8umifj3xnzwstf74p8gafanv1f9sfedq0mhdus8kq5eeieksb7wottxdbgju6025skz',
                errorCode: '8u6y3uln6s01eh40niqf',
                errorLabel: 333372,
                node: 7647796162,
                protocol: '87ru2d5h0ati82liw4g8',
                qualityOfService: 'lqvqoihskoonix3l6vtm',
                receiverParty: '955aloakfys2f8fxxdv1z6ok5v00c3x668gzzg4c3xzjga32h8vp22bn99eikorrfjukr7fghifqlmajin97m9ccr05rxnqddik4c2ez8qbdswq3otdjze1kalrfhnexdckwzypv1zzev3gbl6dim108p55lpb9q',
                receiverComponent: 'f8wxybr51hvjhjimo12ksdwuxh8q57po8phidkmd2af6p5w89w5y9faqss562kvr62uoa80c55mnt0zzckka5jv0ryq7iuxmvi15kszi3pflh8qc5hlbhjw3lh4naglc4ff5vh3sdqkzjynl80trsafspwcbnga7',
                receiverInterface: 'cprnhvxvhwus9hftc05ds4o5dyoqwsp5vqz70hfjx863rxs1l2okljzyu2hb8o18t0u87g1vs428db38i4rfvfmp318mss8912rpts9sapi469b2ujq5djwroktxh7ie14bpdxix8old8rm0gkhsrurjse5wnsbp',
                receiverInterfaceNamespace: 'h3qhx6gyblg4b0kmsywg5ncacewztmhr5ci88u2ld1qivqd2mn0972tyvz241l3lrwzyz3keegklp7nj6j5u643nlvsecaspyonbmgso4g5j25tjenpoes3g4sp8346mghp3mv77qxh37cvyas00qaeup3myqarx',
                retries: 1928930408,
                size: 6069616668,
                timesFailed: 8075004621,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                
                tenantCode: '35odwg7g8tnlxb3i1nz3e1cegsvcgc9dp27qvnlg2z27fbbhj6',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'gt0txy17i194917pj9k3',
                scenario: '7g2dx0rst1fuv70djtozlnhrki5gxliyuxtt1hnafcyg1foxfpgsful3431k',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 09:08:17',
                executionMonitoringStartAt: '2020-07-23 09:32:08',
                executionMonitoringEndAt: '2020-07-23 01:15:04',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'jnm42b9c4gef309yoy1xuqoqy6lr014n89s9ciaarro4yjuljfa2dlppgnezjdbi8hebxkwzoo6hhkt3t5jcm9m2hbnvg1160835w985lnqr6eki6jvpot1bkrqbuu6ut26a1u0ejfnfgj5i94vkxg1tto9j6e7n',
                flowComponent: 'xsd7pxuhmuvcfoht4tnljqlwx522zgkubezra87xo38crajd35rcez3ssbgwne27pykfzhq7usabq32y7paxm1ct5y7dibxvm8grbwuy9ubpzcl4o76mualcxena5f5b9zl9sjlkkxinqa3yz7wtk0ytd41gd9df',
                flowInterfaceName: 'w6hsjssk3ijd97g4zgbkug1albyjmwutb4yb2eki1ifvdjutwf3u82rqaftqlicqkokauzygfpp6surc5nequkjr8qyxjfqhwkl7w0fjyem70kdi3jzo9dfb461qw2irwr8hn7g9hjw2km8qceh55n4goi2823dv',
                flowInterfaceNamespace: '1m6rvp66pg9hj9o8wa82i5la72v4s8xy1sp6cykyif2bivr94p8cwq3307u2a6dpknmvrc5a8kkngfzrmzy1xs5flfo8k223vnhf9b1ukzvb5tvcnx6bal6uv7ef7kulcb2k4fccn994eaa5sgackhqlm4nra438',
                status: 'SUCCESS',
                detail: 'Minima aspernatur sint et ipsam fuga qui quis labore. In tenetur eaque impedit modi. Est ut quos vel reprehenderit a unde. Nobis ipsam dolorem nobis consequatur provident. Voluptatibus harum non veniam.',
                example: 'q9b47b3wc1frkzt3lqqdm0j27nz3ja25qnkqd5ngx63c4b0otiwtzycm75xzir5y7037ob5lhiv8i4qfjki2qw36y4w5175fy080g9k9iar4f2e0joq7uik3vurjusz51kq02x1ao44hcapa2zxny8o10tbr0nxl',
                startTimeAt: '2020-07-23 05:12:06',
                direction: 'OUTBOUND',
                errorCategory: 'x4a9a2oazft7wctz334qslh5av7me2gfyyysbi7x8te0haqzpses7wl6kz68osee313gvuthnyvtb4pz01eqjkpjlgry6ysldv7cusx79544frxlo3azq7sbmun13otmdq9mwziqiscr35udk848x0xruh7fe3ma',
                errorCode: '9jzbkbe9ombk3e5kvefs',
                errorLabel: 642572,
                node: 7012781673,
                protocol: '793ndijppvw5pa2t62sv',
                qualityOfService: '04saj65yv0f6w8d9um0x',
                receiverParty: 'l5qn3vz59dmlizb60pn326fb90qolmf2ryhkiimawgous0xa19f69bblm41cl6nwqkg33222b14jtpdev6s41cxblnu7g9y3m6kwwxd4xedbd6ce3j4cko5xctnn2sd3hvjyvrvsmljxi4r67q31yzol65yhv3cr',
                receiverComponent: 'd6q5gyqgm54vhq8mlqtj9b6zkrvcbcqs22nfmu2smjo5rzn46utfqtdqxsnh9mw13vg60iwrbft6t67rfun6qccng9kpxg5c7wxe917afxtjybq5cxfnks7erusiqsk1asmjf0zftsjqu97c9en93taphiq63oym',
                receiverInterface: 't70ijv8w0xcerwedrdzl7zslsepuajf7gji17x8szorvamkt9tm7k8gjjb5x3xvse1h6ae1q58k7erog5foctb2gd5w66w4qxakkpf9wtlppaqufljb35iaw4rr9idzpci54gk0jgt9idamqb7ffl2lqxncufjaa',
                receiverInterfaceNamespace: 'ary9l744mhdi3ai1knghkjwj7ucidnvzygfpigymguq4dma5u76bc5mf1bgnpjeyb57h1kvug3ij96t4nc6s9jnuqi3pcjrcqbz7c36p3otps6q5tny1fcy8jg0hkdiedk5g04zu1hmvbaf6xrh13fntos3lofyb',
                retries: 2960166958,
                size: 5502187730,
                timesFailed: 3254863347,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: null,
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'l9zfaju934c258y2184x',
                scenario: 'om56shtqtv1vxwokecui0usc52dxiikhr2utszgij3peiafpv90wggtjc9ji',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:26:46',
                executionMonitoringStartAt: '2020-07-23 08:59:56',
                executionMonitoringEndAt: '2020-07-23 12:19:47',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'xlmfozfm21u1otc4an5mua59xlqelxugqrclbjuond9thrpbo7z6z7evszvvy3obpqzuwlhyqa3kgj88a6ou9bgz1fxfrukanqez9kldc2hszah5sj2bqd0brlyoxss342jl3w57i7ji9x0mxcjxxv6yg1tp0mox',
                flowComponent: '68hdj667jr1q7gvytga22fzivl50qtezwhhq16n7n1fm9o6jhdx29zp6939qcdy9c41prk19q98o34sz04n3fb28xhzbv4wy4aoqky74vs9gwrvdt3ogungqrfq054tj18b1oo5175ku38i2lxvnktfd29suq25o',
                flowInterfaceName: 'lxtx59sngna5uupyqhueddy8bx9duzus0at0wjkhg2pd75f5awti86y2dm3rl56xhp7h80pgd21fatrxy3s1ovmwdwzz4k3o0wed1hdt1j58efcxks9kjfrfr6lvbdqnsz7kgye5n1c72za5g6pljyiub5kpjmh7',
                flowInterfaceNamespace: 'sfzhqa21nzj2inocm6smkci12s0x23gop9xolbutxn1z83q6br48peyeds2wxpz9wsc6r9eyi1g2mve7v924epi5eyn6mgqjo8l1811a1tal4ircauns2edbxho7p665zieshzu424qdyt0k9nib1sjd71gpdtlf',
                status: 'SUCCESS',
                detail: 'Dicta excepturi temporibus dicta praesentium. Odit et qui provident quia nulla excepturi animi non. Sapiente mollitia officiis non asperiores.',
                example: 'm18li3aucr19bo3slxw57yg2j98x813e6ccmvs2n48bu7v7ettaq054kwe6waqoy0g0nwe4lejaeb5kq5dll5c30643nal4j0kuizcmwib0enq6szzypkukxbbhjb0unlvukq0h7v0c6rezfvvfwy3m2ugvzdai8',
                startTimeAt: '2020-07-23 04:31:15',
                direction: 'INBOUND',
                errorCategory: 'e83rn99gi36q7shfocsem1jj5l6gf1qhosd0evn9pfc3cnpxy7oc4gblah61e7sddttu0re0d2igfj8wr051vz4w7v3xpkcnfnzbesyw8bsidc8qzd0dzer6fegqefdwucjsqmd38tipokirxp6r97nxrwhqrmth',
                errorCode: 'ezko1dzzvi83pfv9hjca',
                errorLabel: 623442,
                node: 2701499253,
                protocol: '4lvwsb0m6tqaymovp8yu',
                qualityOfService: 'n2s09ujsz8mktx8p8tyb',
                receiverParty: '7ty5mlfughu6efvp59hmebqr946jjutngvxtjghoqpars0er6z2dtmt7zz9np8lqi2hynbunt4q0w8piajtrcut784f68gxawirkd5nwbhvoog8ttz0yl900e3md6oj7ihtp2l5vnjm0ds5na5shcxoqvj2rqe4w',
                receiverComponent: 'y8hhzel2mc7gjafutgni2hd3fc2x0pb7jcyyzkqyh7z82ggvcud9th83vxmviog8t58pz8n2lpuobr0w9565nbwoeri9g1lnvzyuao8w6c90gzrtazfjyz5pxusq3bgaz31detne27iiloncdv2tv2259geu7kx9',
                receiverInterface: '5mhiygg0x6knvuzmdvb8uiwivggblavossi6g4pgncoyzafnd49qjn9eb8n8g57bx50eelptntvyowosx8h4pw8qg0zio04to09h85md6p75m6cch2sl30cb67tbpfpwbitwtvygi7z8n0meum57o2hkzo7bbcyb',
                receiverInterfaceNamespace: 'bnk9kqhosgnpollra847nd5d9w6ljyw3h6gvhoptphog2vtn7hb6g67wrefbeydxtfathi446bilicjv675ob7w55k9f66azks8e52lwo6i9rgprqhzwmkdsgr928grjzq85rob8cbhhgvnkn79bvhw37eb5acxv',
                retries: 7374621704,
                size: 5250191917,
                timesFailed: 5034122552,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'm8n15ugg4eqa88bwg7nc',
                scenario: 'e7lxiugzwpijdga5pm3m1y5sb1woas5a1jzume6pqt7mufy42rv73ly4i1xw',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 17:08:51',
                executionMonitoringStartAt: '2020-07-23 12:09:02',
                executionMonitoringEndAt: '2020-07-22 19:58:02',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'zk7qni9kbdqvjuuhmeutew3edw7z9suhv1gyycgh39gzv84b3j3utlt00ou9mgmrsceqrre3sw6wm12999ms4ucgnxo18rs5hgnjn3yjwm8q3dxa0y9g2craud5b5p0gq55sniskr0462d170dkajcneu8vu992h',
                flowComponent: 'brg81xh4v83voiegm34bud6tluz6iazjelcod3gz1egfudwmxer9vrr3cchgmriy4geiljt4hfs8afi4pnggowvchosztbkmtpi90cwsd53k93arl5jowgrzi4r3ccwl59u4eycllk40yjajztu66c0kfe3h4gdp',
                flowInterfaceName: 'kyhtb2l98azv8oe72r3bf441o0p7pywt6rep7vqollphinmu9zr7n7k4332nlp9msueo47pkkdits11o86b397v63q1bvvkurk5vyxyr1oy7ewjhp63msrns24kfwdehluhevpqxrwcx110nxyyk32xjdgvlawm6',
                flowInterfaceNamespace: '4za5kmyph6ydf5breiauatemibflzti45j7tk6kcgfnhafe4yfewu7cdpe7woxk8dasa5mij7fd1x87px4ycafu0gdmh0hwczwxqm5xdnqhsujldc867sbw5y8dym9ew0ruti4zn2xwuasmnhbsvcv8q0rwuwwb1',
                status: 'SUCCESS',
                detail: 'Quidem eveniet eligendi sit velit et qui quo. At nobis velit molestias ea et quaerat. Cupiditate asperiores et quae ipsa est. Rerum enim nulla ut cupiditate delectus impedit velit dolores ab. Unde ea consequatur exercitationem porro similique dolorem necessitatibus et. Rerum necessitatibus sunt.',
                example: 'hq4bxi3dpul7b85ce7q2zlupkfgjbw3cbnbuz92zr4fy4pldwpf38koyozmajz0hzy5x9ulyl4tdfn6x4uracyl3sfwv33pdbd10h2ttghok954ynofyky550vns40bco72y5z9q8lc4dmysvtpkl36dlypa6zcm',
                startTimeAt: '2020-07-23 08:32:06',
                direction: 'INBOUND',
                errorCategory: 'j0xteifre8pjd56hp3zwx1ux0npcoindti37pocx959k0ag37fmz3gbtsgntlbi26jt2nhxqqte6shd8n339w2ksu7ya685i8y44u140qplf3n04m7p5gaaicg2pyuwt964igsvhgdc5xwneb08hsg439294v5qq',
                errorCode: 'hddb1ncn8elgje3mgkcg',
                errorLabel: 643828,
                node: 3889798333,
                protocol: '2wa5kkalz0g23go1nx4r',
                qualityOfService: '5l9ollwos1odjy3v7q5u',
                receiverParty: 'ce8dn7uyx26hnbwr0qic1wxbaw7c9kjrfp5x4xlsaep2mr425xvme368m02lswyt0g7e2mact3zox9s6tzasie956sqxzi7gxdlnccoq4ivoqa3jou2ibcj09qzchyufhvyewuqwboawvqc7zw7xcubbdxu9a3by',
                receiverComponent: 'oactzw5xe6av03yix3aq6gzn6s6rw7vf2flkmi6cagxs1jqvhgex76x6ftf5kbeu2cp996mekyir56t4ib66icycgg3uhcyeba7z1wy7mkri7o8kat098vutnv7d53vlc2nyvfmf5bk5ewh7p067wycetwmnxk2n',
                receiverInterface: 'o684kt9af204avippzc3bvb3evw8xwtv4b5aio8w1uqlpvpyjenkmr7h2nfrotbi9ytsbnlswg18r5icuouzvsvakt2ycs4597se81i5z5ojy774v39ivkl6wxmpqc4y1rftfvlygg972ws203shbn972fr0h18a',
                receiverInterfaceNamespace: 'lzrk1uvssucb37sdt40tcru3m05qhgj1mvd146xpx3vkrxuh7y5p35gqtvc8oa5dm6s4x1w6bm0ybtuxidzstmq81s71i6j2wqnmajn2ynw7grh9xfxl1yxu0d5nosxk8p90nddlcth73rcircby5jay26e9512m',
                retries: 7936532674,
                size: 6245395550,
                timesFailed: 6048744424,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'v0vhj6idgcw3lmpj1dg6z8ezhnlpa9ff8h6zgx4oreyyevgyx9',
                systemId: null,
                systemName: '9i3rzhboe04orhxqa3rs',
                scenario: 'tgyqwq1uxona1k6yj94ndka6y76rq4zixrxtqdowsvgat3zvf6u73jbo67cz',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:13:47',
                executionMonitoringStartAt: '2020-07-23 04:25:05',
                executionMonitoringEndAt: '2020-07-23 10:51:27',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'bv519r145y7u6smyn8wnxwgpj8coqmfc6nfk1xw3nvdsprsrvmu00ox7is9rhm2gf3n7fl0xlegtagldpi4dbodt3npmbzkeh340ojbmlxvq2eyvc9d7yu5lgba21ry0bmob87ci11sqdaej8wluxg0a1jdcemrd',
                flowComponent: 'jqe4jsjxrabnshqdp68uo1lhlwucyrpnq8ezo5h0x80awakcgbqfozbh49vtiz0oknr1tnaugxso4igmv4pbb7p57etnv5l86ww1gffbxl5mngk1fjfne3duiv6g0ya29vggx1eno769pqkoplxm8howwqimixet',
                flowInterfaceName: '8u0klkbpw5mxr3xptz4kn68b9in6vfl9jjkt7uoer81f2ui13qgrk5lbf1118s1mrj9jislomt27s02b4nhatg5818r8uq537rqd9uh7ffnw91l3t6l9t69isixgg6ajyxkz3rof24delrrx9wo1qpeap9faa9z7',
                flowInterfaceNamespace: 'ynmht5v29y1k7abu9kaflsv67uoloujrunccdkkaexwie1r5qeetn1nkyzkvvl4ig5ajj9nod5m7vqwzxfxc41i14xn6qmkx0oulzik7109m6nihto4he1di4jr2uiikfrhtd7lin18wxix8s4i5ulwpt1xfc1xt',
                status: 'ERROR',
                detail: 'Fuga sed dolore fuga nostrum qui sapiente est. Sint placeat aut ad et est unde numquam qui. Quo sequi aut sint aut. Ea autem sit iusto explicabo qui. Et consectetur iusto similique sint autem consequatur ipsam. Omnis explicabo quibusdam aut officia.',
                example: 'qi6jwdz1gmlq9mbbckq8zkmdxvb07l2e5y2hrr1av3o1lgwwm6oz3rrml7uo9pu968jx1zbx4t2v84slgw5egfw4oxic2am6iyo8nopxd9r4xuoug6ov7fn57ek7ozbw4l3k11k2rzyevwc6r00cnc3ugeposjor',
                startTimeAt: '2020-07-22 20:29:53',
                direction: 'INBOUND',
                errorCategory: 'r81vw6ryhlnb8zdd86lkzp1m77s3tas0fm0ia6bw8o6tqnja8q81dxcb8kf8y4sbc9bvuxu5hcmcs1uvjeksht84qivpl560qj6azxejqp3zx4994g85k0pkhwj6ml1kjpb243hbegwifqga4r7jih9xwokhgvjz',
                errorCode: 'kxunjp9aqpmojtq4u4yr',
                errorLabel: 232090,
                node: 9871660529,
                protocol: '25ohtegpopeavmg57grx',
                qualityOfService: 'hx8wx95u5vwzyew38u7x',
                receiverParty: 'cthxpg42klgt7um6y6lsgem6myzo0y0g4hou3e114t4gh3vleni8am0qbrvvu278m5x9k1pr1t57nbyeuhf1r1fgfcsfnil24iguo3mf6rcji236yaree5ifxmdet02hme8xrs3dh778d6qqyjyy69phw8adnlan',
                receiverComponent: '9z0oxdyeqqt320vqqxod7zuu0k9yc9f26er9fcpdwf70tf8b61it4radn5lw2ffu68vlrwjcxwnml68nmg0bx5xfpzprxphfqz5gkidg7gp34iuxngop1q4un0n1qhrofzno097ds9iqgo5kjeu8s9jp0ejo1b66',
                receiverInterface: '6h2ffwx2s19wu3npcqkgiwmsf3vp53tknie7q61w1wovh3x2flnvpce5usqdt2j859b8rm4lxji490uxkkoxvmvj2nipdayiw4oke4vtpchxyuk362w6192zz00jhjtcrdx4t6jtgb1lfr0gkij3cvrhqwifgubb',
                receiverInterfaceNamespace: 'e42uzbmmjqx4m76dv29jpv9jzjlahsc0mdc41ml2ki7oommsa7482iqjmp76t6atiuaekc3s4xzedyy5zg3e43x8dp2h99dohezc01pakbha21fo4wqjhkp0j5lmf5tel30elrs8ba2wrwifqpw4o5htsud38qms',
                retries: 4825858636,
                size: 1215957081,
                timesFailed: 5132063282,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'h3kcw8xbvv5m3qowijsffus69n40cl9fftva8ucy6l04lo87d8',
                
                systemName: 'm0sl0uxrs7g0sjx511l1',
                scenario: 'uknel19hwidie5ayc7uq4jf0z8ufg8zv0xdc43n3eh3qlcmwfe9ual6upf9a',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 03:31:53',
                executionMonitoringStartAt: '2020-07-23 11:43:49',
                executionMonitoringEndAt: '2020-07-23 18:02:01',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '4bx8xrax47kk1v75ren9areqb6cxnief2g142zhyytm8t9s6sa97iy87zy1fm5lwygvbvaa1ye00810gxb2gjq5gzex6ynxra4opsvqwx5nyiwayfn1ye04e64opwel68b7295auza6iw2w8fsw4ygjr2t2jnm3l',
                flowComponent: 'rmp0u2a1nyrknefgdq0dpqhugf0r3yyy2fa4e3b0kahad5q1trovozze7muqbcvqw441h9ycdtohra3mrk2tloj83b2hnvtea0v9psw8ovdrzq72y64fsy3vxbdsxehj7ojd7na4ry42dcs2zyunzzbb3jujknyb',
                flowInterfaceName: 'gzmi9p6adom5s0jqo0kkb7mykfafftg4z0n5xzijdosgvnlpkc2x970u316p8sbrbr2jabnnmp69agavylpqbopnfwr4fdkmne8rex1t6zvsml17bcb2xtj5msznar3n37m4l5g8euqvynr7zkwh4e9bgd9oqldg',
                flowInterfaceNamespace: 'oquxt8kthu6ptml4pmx8ct31y2ufks4o0g1q0vq53h5jpar32rzv69bh9l3bbhbeivus1j97jdnsqembb6i5u62agu2bwo72fouojk857unj3lrzwxhckuiwd4v4ojyy5ysl7jgovfhdwc6vrrn6csa56fpro2e3',
                status: 'WAITING',
                detail: 'Nulla culpa non et maiores labore nesciunt aliquam qui. Quaerat soluta incidunt nemo ut qui perspiciatis sit. Non voluptas necessitatibus optio doloremque fugiat tempora libero.',
                example: 'ftzc5rn44p7b3i881r8wdb4olutvea9gqwm1zjhqdrac650jf26ewtt6r90thx3yvygxer66qzn6pa5kaybvytqkyydrros2bicsb272rpyhz5vef1ugtcwq6pbuasocctaqdxisblevkbzdtn6jujtfeji4pd2c',
                startTimeAt: '2020-07-22 21:52:49',
                direction: 'OUTBOUND',
                errorCategory: 'sror2dwphceufntir6t39fodips13nmx411cyyxfux27ps25jizlm2jz7a970ieev1inivbtc6ekdv54kdcriqq4kd4ecy4pw62ps8qzkzpptus9p79oo3tmvemah4tvs15fzborwtju8se8vcotrhs2e5t5luke',
                errorCode: 't6zp1jcrbzva88ezpz6u',
                errorLabel: 354427,
                node: 4807477046,
                protocol: '51om8kusrnq9b90kd0fh',
                qualityOfService: 'rtmiw3sft9xh7x9zt3ic',
                receiverParty: 'zyc1bj5rbsxtc2drofg3vuizfy9adwrmuwdfi0y83x8ts94dat9kes2pue28y7xptjhhaktodr25amkcf44ployfz920306tyt5xzwbkl1spjswfyqxdpissvlted6h4jmtjyrwqksty26k0rnnv0ljcyf4dcdj2',
                receiverComponent: 'ql6b4een3rqer7wy7l46iebp5imb8zzm47ke7nriams5bg6m7evrb7cge0xkn8ee66badsks2sougizp1bsx25wres1yabbb7d7viv98ob8eyzp83y0qlpkuwru8jkiq12u54yu3ow8401h813uszq8y0rpauq60',
                receiverInterface: 'xt39ljvsdqjvzdpoaff7h4z1kecvli43hei5vqpr3j1npcjbydfcdls28av2kj8doz9fxki38qe9hok239b6fcikkdyjbq6izse356me67gpjgrkdl14qkeufr5hsidnetkx6g9qbgbh7fzltdvzzqzigf0kid5d',
                receiverInterfaceNamespace: '7aqvf5yhbzn2c3pv7lsmm8n3l9g3ydsliqc1hvt1ley5h1us1jajroyipuvolcl4iidj9xhmxanhmpjxs507pdbdcogxstyvlt2ufvrxn89tuavnrjrrcdz4ju1mhairikljk9b10wd28vwpe09qug9p24ke7spp',
                retries: 5610388622,
                size: 8750671243,
                timesFailed: 6796860915,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'qlanyk00uaixk08px6nv4xgdqxr3t6adh4oj56o422tvimr56f',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: null,
                scenario: '03rwf5u0g2o2400g605g8trqmel9qgva3366iguzdc4ja9gxsoljilvxx0nj',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 13:55:05',
                executionMonitoringStartAt: '2020-07-23 13:28:39',
                executionMonitoringEndAt: '2020-07-23 14:56:36',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'xrwexlrg3anp2qht819w6v50b3xe30x643t80nb4k70uh6y4ajyof19r1obgj8rewwhbbo9qjpxlylgzrrriquvk55j0v2rwbaqdo43rs9030mylwtdp97a8eae1kb56l5kkdrbzc4754h51nkngn3y2ak7ty0fj',
                flowComponent: 'du8x7xgeq8a6zg7vjkp9hg6fzqn2syv9k91vbep7dedusvjpugw0wri1vi7qlyx8ej6l35yjyc12etysyx4k6g7i66pv24046vhmpf63mgcu5y9oj0d8lkv1aihgd86le47oh32t1s6ulmk4r92504vtevu66qyz',
                flowInterfaceName: 'ocnmgp3p8nm1r01o1e1yjaili2a3rvflvqc6fjzmzqmvyjrrin6nm3br5apv34z5c2hdgt4v6ow0qwn3uyuxrm3rn94tw2l1imlatw3tf1zw3hac8yc8hsti1u2q76olumsa2r9cvc5ttefs1tubmh5wq0tcj6g6',
                flowInterfaceNamespace: '1coglnz277xc64zcm2xayz3hlz28wx931bpi95ubwq018ycv71dajkzm03gl56nt8qyv59vp05z90x38pcyc2xd4gsc0sc310wn0gkszlxysjhwyv00gn2frx1cej2y9ciz13msfzv1kbszciz3cactjret59kfl',
                status: 'DELIVERING',
                detail: 'Harum quis minus. Repudiandae vitae et sed. Alias molestiae magni. Nihil et et quis omnis. Maiores mollitia ab dolorem. Eligendi sit nostrum id voluptatem quam esse non neque quae.',
                example: 'm9wqgncwqoiy15q1hn1ybfx43zprs6ziay55edvw0ptg4h8k8ke9a50dv4ppbiwvvx200s2cuxkwp6dv60osxpuf7b75zu9ab2tydu32hih9jr9ujratb6wh1mwu6yi05xf9xzmcjmavhy0v5z9xof87ar1tjozg',
                startTimeAt: '2020-07-22 20:47:54',
                direction: 'OUTBOUND',
                errorCategory: 'zx5zipa148uo4z2oihui1r9zphcqxlvi4vgvd6hxffvymfd4f0ssjqww14fxuzm1hq1qxkwt6jpo8c5xb7s1hux3y7iwxaweyaedc29hp0du66dsk27x8typ99sqq14ps8s2m647tueyiw0ltb7d2zk4g3iytd2a',
                errorCode: '7fex3jsov313parmd0za',
                errorLabel: 652459,
                node: 2175609960,
                protocol: 'ude4wbdivnpzkmju9pjt',
                qualityOfService: 'd4380qj6vze9vnincjep',
                receiverParty: '5ev56r2weflnwm59bwzij7p59re2pbqli1yp7an9tcmf7mgxa9072qs3qfpn446abn705oum7gfssgxev7ta54mmweaphvo5dwr5c05qdj2ovyhgzzhellhls302i2dvc3qdiy5jke07dei1khgq1t2dbwg6doi3',
                receiverComponent: 'hw7rujytfkyslqtaaqdpg74v3ngwdaexp9apddc0yehemh2mpvp02pvmdnt3shw3pbft5snbatakgl3weylmgq90nw3uayfq47m1hxs0ub0dal2cy5m1ces77x22iaiqkxa8jewnqyazu8thzvskomerw23bqaeh',
                receiverInterface: 'b31isk9ne5qyn3ck59e5y0vvnj8c03yegjs0428p1n7szsbvalczl7ct7zhc6m3ez9z815pxu0e3cihpj2eur921rc1zyr95qx4i8pqn26owcb1ushi196nmlcfbt5d2ibb05dbdr78fgc3yq6e6rvdkgqkrfmuy',
                receiverInterfaceNamespace: 'tjoaud6cca6w8hd6leqxmvn8apuc2l0ndh4zrdyuedtl0tpmrw9wl6nl99j0utgnay58y897xoy6oia6ysv0m83b30w9whaadivvsmss4uyh7otpw4xgyvg9p3nngck1sbpunpl3m6xm27wp0ufp9lglyqcvxyv8',
                retries: 7208180957,
                size: 4680059404,
                timesFailed: 8433020281,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '48e3pjicm28ahf385b3mdtrpqz1sfq1t5kiltuulc2rphodbhn',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                
                scenario: 'ieq856e5d9we5aco82p7p0zgrf5ir81mzdmnswtuxclot6vpk9sqh0g8ifwx',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 17:34:37',
                executionMonitoringStartAt: '2020-07-23 04:24:57',
                executionMonitoringEndAt: '2020-07-23 03:26:59',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'j15yavoxopawdtgma9bh5s9y26fitf9nqeyy2txe15nqz4zrouy2mb07kx8bawtc991rjaea1l36yv73yh5m1281wv6hrmt5j2ymhn6ii7p3pbgybskka3zw4cg40z1c0a3py50swkrj21f7flgx075u9d0cl54e',
                flowComponent: '266jdhugyq4mjaeijcxb9j5ulhdtsclpx0dlx6afvd0ejj5vx3anch42q158ojjjof0qmxbq4winbfgepwmxnbg1o6t94jv295jmqwphuiuzp35fakjnykkd3a553kbvspxgqe34rzd7nhkjwc5m4tdir536ypgn',
                flowInterfaceName: 'lgypoajc8a765bsp2bdp95sqnaou6674y5ztn0x0pcu0rrinjh0a2394kzzsiv5oa6wbehhs1333yn1dma22wjbh2swf3lng0c23xbhxxm0zqbk4t5yp8ukzwegw8g6qmsiraytmrvejv5ytzjoajwbta7ft2q9g',
                flowInterfaceNamespace: 'qzbp6ev74mxwobg6daje0mfougi2mcf2qfn5vo5qnzri2sfpl2ucarevi11gv6z5hh9ioabhtzpzfes1qmqoz0txm0ji3a0417czwakv12l9q4de65apm5z7ecpqskizrygg6n5jsqz7dnzpd199wwzu578g428r',
                status: 'SUCCESS',
                detail: 'Consequatur incidunt neque provident et accusamus. Odit voluptas sed perspiciatis ab est. Perferendis natus esse accusamus quia sit tempore molestiae sunt deserunt.',
                example: '2kopvo2e2ty21dx7lljkpcrahmvlgi31np2vxiempc1owxqysqq3ufd38wvijpbu7746jsjmml9elb3kpj4i9bknqr71b49rz1t6al4fxpo8wkigstxbhnoczhjh46lk7gg09u5c0qv5jd4wkqv15j4ve4lptik4',
                startTimeAt: '2020-07-23 11:54:04',
                direction: 'INBOUND',
                errorCategory: 'uf2vjhzg05dhtny43wj2g1gkltk7mv3ch54ecc3gics4izodgza1s88urf9dyigop0qhwz5sxw2m83zvcp2ll8uio6myr5k10s2abvbkhmvewgn5vkpjiy9zws9ampx3f2zwbkgbs2vew2gwzzxky5fk4lm91hkz',
                errorCode: 'ha3hd1iavsnz7t0b4egh',
                errorLabel: 700370,
                node: 9902697280,
                protocol: '9bpcdoddej8k7xwzdgd5',
                qualityOfService: '1834231nolu6ndaqksb8',
                receiverParty: '2cs1xsh5jb4aviurfr0e2yh2018hkf7hsi23ngizyomeklmu19qlli9gho2wa30qyxmywx1igekxvk18yy8gv0jspj7ipekhez6zg32b5n5jags5i403eves5o42vhsr68w56fljbre42evjjen5z1c0a8cmdpud',
                receiverComponent: 'smkjhul7t5vzdduxtu6iltvqqq0n92kl544a2o89y0571o4kehl6fqxs3ozx0ay2qx37h5wsftv3dkzvq6phhvek6cwt22wmauvoiwlfm91epr8cfm28vysot2i7daegxuyf6lu7igdviblg786j6anxs00rjfef',
                receiverInterface: 'cdf1iw1yh0ieieyvm7uoyo5j6l8jr70ngsi1tlp7d65e1zt70k76gdd031nz4sk7lsorhoqxtzz7mzifms73l2yy05tq4hnkxpxiiw93nqtxeiw1cfuguvcr6wkfn608u9ml4rjc43rdg5e9teiq95ykwxaxbi0t',
                receiverInterfaceNamespace: 'yop3britjtmugij742uxo6tudjoruaqbm5s0hve2qkqrowz4missocuncp6sqoemt8v65vtnnlq2wezrn1q7vxazk692zvsdfevc853izv3mhk24ulcf7oucbk7lcf1genp1qo5s0l3iynjnonm6bny1munyibx4',
                retries: 3172895518,
                size: 6572104015,
                timesFailed: 6298321111,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'i8q99qiromvvo52z2h7pz4w3jwxb2g909671cyeqbx0z5tcxrs',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'ce3bgwsh9jpszgr2pjq3',
                scenario: 'th6gf2kma9t3yldub5x9peqc8t00l1pt2vsty02d1qkvww11wkke9sm4g5gn',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 14:17:47',
                executionMonitoringStartAt: '2020-07-23 08:49:18',
                executionMonitoringEndAt: '2020-07-23 06:01:01',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'qjnnu2yeu4dvzcsolpp5a4f7il4lx3fzsvcm2w81l8qtwu8zrind5r8jvl5a04v3omttodvniv1u65shaha6z3vag76jcrua5i9srwz4iqfgc6tym4v025w4sojowua5h76bqgccox5h2cn9blcalbsuytvwqg4w',
                flowComponent: '2h5xitdjcughtiauucid2pkhdexa31uakz4i7jsf34xn50hc1hf3eoh30yuysavuc3yeqj1myguqsrqnk395fmuw55fm4dc4w38s0wzjhu678k3upx8ybsjrnr8a823sp6umj4r4sl95j5joyp5c6slrhr2t6k29',
                flowInterfaceName: 'nbr2v7q6t6expo4nhaawlbfldk9jtls2m18rqrirwjgnvx036x83snnc7idk1o28agv68da9vqm323cjpgecrwmqg14th1pmg1kbb2f9w9j5dtuwj0ha6kr5wgszdmul28vtutohj7iwj9q7cgqld1xrw3wve4jl',
                flowInterfaceNamespace: '1t2jug63ogia2c9kbm4r9p9zwlnks5o223it4fy9vl589et1csk4hzugwv1eyj2p3mwxwvohecz5bzj4lz7qumlgfa2qwb4es6sv594zt2tcxhx67r1ogvbrmajdyeet6kxxam71ld5omifxs0er41wbmn6axxom',
                status: 'ERROR',
                detail: 'Aliquam est nostrum aperiam et ut natus labore molestiae dolores. Accusantium quis sit eos ex. Voluptatum expedita est id. Dolor repellendus aut. Animi cumque odit adipisci quia necessitatibus quod officia. Architecto molestiae ab.',
                example: '1vxzwu77elb8mkc5qb89yn0otw6ywe2pf2v6m67be8iblzumwmkbnm0rehylorcjbwfodcep8d767o5nhndl84mmnd9dydscvle85u94ie5qqb9sx5cfvvgg9tfvsjzwav3mh2nl0aev00idjgb1nev4qb8j8hco',
                startTimeAt: '2020-07-23 18:07:33',
                direction: 'OUTBOUND',
                errorCategory: 'q3uycbnjjdffil7bwm842wck2sh6pz13u2eccmkqff1z2cc56acieb359oapxppadtyf52sc7c0nshhrryou2sft5paklo92kh72birok3qcpsnt8ctfhpnh3iqlmiodpzq5gxnkms08key1z75hrnmrg58ungyh',
                errorCode: '8iiapvbs9wk5sovn1c7e',
                errorLabel: 835439,
                node: 1501317444,
                protocol: '14heviul6q2elm214nez',
                qualityOfService: 'eavmh2xdiw8n9zg5fpso',
                receiverParty: 'edxhdmm6y2fkeconumio7sg0n35dgrji10t16ipg9sthwy6d5y2bn92mldqdcczv5zjbs8ebuvsh05yknyljrg8md2inaeou27axngg731wrdrm5v5lo2wzlg0acnue7d8hj0zcj3cjzfu7tqf59q5mqjuhyqa1m',
                receiverComponent: '0u3w8tblj89aly7qxr6ytyqszxqufzesd1fglebo334sb7pwf3l5f8fnryamsmbk1jcflka1gdk7eur8s4bx708z6fm77kwlql3l030bg5502rnhlavx1v9489lqp8hhgo0pe4ljw8hh33rceycfx567v4fia719',
                receiverInterface: '8jiu6vds0v8pdv1ecljzftbte99ny3ygbz14wuw1bqhuk4ymqny7e2j82s0t0vf20h3dzb2rzc2gkww377utpdnxnexkg5lf1c3g4ax8kyld802gg6sx8nr4drha1tla4p2cbtq56esouffnkfi7dk6dr3mfi32q',
                receiverInterfaceNamespace: 'v4dto8pvpvj8av5r5uycojprmourr4trftdig4los539ib8zux69pg2g93ioc93a5oxim4t1r14mfsg3jhkku65qboyi3yc8sp3g4qay6ndzy2hm1fdb4hc8k272rwisv9k5p1dvt45fqcad3xcfrrg8p751wtzq',
                retries: 8679852149,
                size: 2227584800,
                timesFailed: 9368683194,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '740daag7zmpp9w1cbju6sidm46dzwd8e7rmmkv9rkzjpckh6h9',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '1wz7q7hg9a57rlfch6yo',
                scenario: 'mudreu7s82wqu5ly4gmzf084j79fpqso0k81ofxwfso19zviensn8f3ckjx3',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 06:57:52',
                executionMonitoringStartAt: '2020-07-23 15:03:47',
                executionMonitoringEndAt: '2020-07-23 09:34:25',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'qt36tuforh3g9hbboc1onyt0d3c4b5smods3j1n06f929hn0bpgv6w1rk9s5txexi4oidwu6k8hbd66qs13wfijli4qbqsnzrntu5a6j90ourh9sehkoxb0e15utsj3rpv9ymzekeorj713ibiwd3iaaaiwp9240',
                flowComponent: 'rylygpdjlleahbv3d1s4ged75y3fhxz7io9msk75om1j51qupol0vqd3lcqdgqz3jtrlq66kkzx8qjgmuhjpuepkcr7iyq340vyr6lm0y6998m17zojhiwdlacsrxv2lkrnh9bvrbg2d29amct3o0cqbp5g9dxw4',
                flowInterfaceName: 'pnd87pqq2chvccl48czkq0c45n00ut5z03ynvscy3aoa1hbiri0t5fn66ca9uaprorluhw8w1t9d6cqe4lb4nce8uq6ig7kgnp97ezp0hbw8rydasi67p19yqkniffcmujxf950nqkg4vat2vnp0wark56gu594e',
                flowInterfaceNamespace: '8tu75jtsc5nfbznyk587yplljc6yvgb351d61yc49177how7zjuiryx8o7jxkyoot8fjafe1e5iw4v20zn29gmodbe4y6jtitynk7gusj7fwgopfxw55nlx5wlw9uhp22ns14arrmd6ndnrbs5sk5pj6mg1svs5j',
                status: 'HOLDING',
                detail: 'Qui ex placeat et reiciendis. Hic voluptatem cum nihil. Porro soluta dolorem sint facilis nihil consequuntur. Et distinctio voluptatem ducimus nihil hic et molestiae aliquid.',
                example: 'eo9r3z79sinksiiv086ogypl9qaq0jayytuvemfynuarffxvu8hc8boi896kd0c6wmgx2gadoqaw5k6ta3zcwclt2s7kkdav3yfkqna4csgb2re303y2u631fjk04br626pyr8mfjdok6m293ayljjwslbs7477q',
                startTimeAt: '2020-07-23 16:55:41',
                direction: 'INBOUND',
                errorCategory: 'irrexu9ykeasjmkjs0hpgzsjicperqrban1aqnd9zxq6j9tgy811t9xwraypi215yhle242bif5nks2lzdqhuj3v6njrrji8qplx91f66it04kp8geris6i9ex59vjuztcp5ga6x6sg1k4k8tdovmawhtsmebrwb',
                errorCode: 'tshbesa700yh5wrklqfs',
                errorLabel: 558908,
                node: 6964623196,
                protocol: 'i96py8s40howp1a99106',
                qualityOfService: 'df02qanxrbneqcs8dp2a',
                receiverParty: 'lwc93iks3e4gqhadg4you7j9xycwb5cr9eqawxgqsmcc2j2ezumviosvdwodc1c1sq0c39fx65cr9ayfdfb08beyxg4rztrb3avzllz0ak7ajiogq2y4qdaqesmwffpfd6ehhwr58qbh7puyi8spv1wji5g2fpox',
                receiverComponent: 'm74yhss11zvs9vijw1ki54wxw6tv46l5o2130vtdk4r1baqvc5l0r0tvvz757vo6dhilwlkgirqcy394mbnthd2pb92mkznq20r4owsuos1o4nmnzyo8e1l53rvvhkkegzifsa3grl4o0lcjed52xtb1ro8f7288',
                receiverInterface: 'yj0o8f71me9zszzroqf5x7pwt9fx98d4brhkq14ga49od0mbk8j799yc1ac25srelktfur4xvrifqke4oezmusd38ruk1yk7nn2hx2i1momh9l21axu9r7c20fd1ifxp1hpiyezxw88dn4ke2g7u4gk6gkt23jep',
                receiverInterfaceNamespace: 'i60x61c4g7yk3fdh9ph7rykgxffvgi4marfax1cheqf7xx9z853ljavsyq3il9joxhk8ytosqtx0sifxf5rs0rn5p36nhxb09lvp8fcwma3jgp716z1g2qflmwuquxdirf2ij1rq1o8kh1o2xljfiac1b0sasz8j',
                retries: 4536239719,
                size: 9477442635,
                timesFailed: 9135073904,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'o2ao435vamxv5081ti8jr2a1ynl24wmzv3ihhzrwjy5rlhzwxb',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'k0vcissam17170aja41a',
                scenario: '8a792sa1h1dkvs8wlvf03bglkgmkjxltybso7omt7zu6z2z2v9e0ys7yx120',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: null,
                executionExecutedAt: '2020-07-23 16:24:14',
                executionMonitoringStartAt: '2020-07-23 16:25:56',
                executionMonitoringEndAt: '2020-07-23 04:46:23',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'tstlzmd1318rhq5d4ooj1psbadoxkp5ssgn8ec5sfs5o90hdehl61rddlcsxe626cn3gh0ebnhpmukzb6lobdpmxqc5bh08d3a74bcis02jxsi5bkn8nmhcfkifpvdrvmtbfjujt87nbzs5n0zgic3p8eyk71pes',
                flowComponent: 't5pkc8jtb43q5cgdoams09cfvbzvjf8duotj86op86t1a9x33ukh77dqkyie5r83mc5sfrot5qxss4sjt0l77m2e20xe2lcm5jq63o9i4z5xpk8hlb55s5l3i3p6mh0bjra5t9509g8bcwma7e50xsbbh8dusmja',
                flowInterfaceName: 'ks1ecb0gnrzdvpma5wu57smuqfdasfv3v4phuezvealdpyfak12o8yxjjw1sws2pozwsrywc4qyy21z3z7b81tnb9oasyar6kn8wzc24t0uzhs6k6pkfiq5oya0nuou71ttqyco726ga17s9eb7ljsa80nb1vpbw',
                flowInterfaceNamespace: 'yxba9oyrinypkv42xbjhtdemlmyg2ztf58n6co5a46jwh6o79rk4rjdhm1i92fbry4udeyr1t6fz2v7npfrf2vtvrqax2u48nac0oy6fe72kr2digl25kjv5q787p9lchl9io1au53otk99itsfl2oav5jmhifn1',
                status: 'DELIVERING',
                detail: 'Repudiandae repudiandae ut consequatur voluptas excepturi. Autem repellat voluptatem asperiores necessitatibus aperiam voluptatem atque aut ratione. Esse occaecati qui reiciendis consequuntur. Est nobis vero voluptatem non commodi nihil. Enim numquam facere aut adipisci omnis eos itaque.',
                example: '2rfoo0irmszbvd5s45v234whzt58b3p0x5bviep27fo2u6pc1iuiwu6w6csy9yvqdvcgfqaen6jdlnuvpydhbko0va5pi8sm7482k76c93u4l8l3nffmv0zd7kjarr03suzuvhxxwh4miitilecne8wrt163m1pf',
                startTimeAt: '2020-07-22 21:37:35',
                direction: 'INBOUND',
                errorCategory: 'xkvpofjpk4bq9ksw300ekha6zmq4fv0zmgpew9biul6tzgdg6h8hxa63nqtccypt9bf7askdfbpu9txn13notw8l38f0tugfc7pr0w9q4cquet1qp1eruj0y0edbg9poy0dm3e8ihx43rgl9g9f7oipneuh9bio3',
                errorCode: 'jumx0xeps3fbcq7dxprp',
                errorLabel: 227924,
                node: 3352588089,
                protocol: 'lkyr2qjjs9fvtzxndqto',
                qualityOfService: '94d26xpfzp8fa3oix0ac',
                receiverParty: 'xmsdx8px6qkf9g8yvky8lryr8qwabnc89o9ocile4u2u9o41x48hc1o3f11k11wg8vortc928momn3vr2sql0eldxkcvpb9appp58l6qe3leqeoryyfo96hpo3al2dnnz48ocoa4toku7jasadzx8u7jq419sso7',
                receiverComponent: '96k2afnjmouehhwug1o8sgkn619s8w69uy74r64c81igjgqnvrnq7yaju08mpkxq3xnp9h17b8gscg2zqzh5m0qfrddxrzn0zbke3vpe7tbq2v1j4u5ai3jzoh5aoaerc5pwymhd09mqwx9pd69k2o3enkpz19y0',
                receiverInterface: 'xygqspfhouahuk26o169j2qhg719sluy9uzgzebk94thve3lh4652forvpvkzcnn8h6852mvkztv50pcsc73olcedxd7vxiedutkyoqubu7a4ol3w0xyklnnoje2w6a8a1kvqigpnqq6tmcelp9ybnkll0zr6n99',
                receiverInterfaceNamespace: '30etrnr9u15vh3e658idyi5kxr1nqmaskxnyo89talugfro7lt7gxugl7orgobqc5o5nwgv44dajsjqae4nbb5vi17l98hzgvk9ktxpgb6dda012bfcb3dcl1p668irudhk5esrig5qos5zwgi0kxoe2fjh1vozc',
                retries: 9485813658,
                size: 9938061681,
                timesFailed: 9320842028,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'g8begi918yt1n8gcdvityhgfgvzlf3ulvjju6jfcwxf8oubhjd',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '1ruk2fzo8mdqdfarw3t1',
                scenario: 'slzm92e1i43jfsj044hmxope8jnpqh6a6lc8n2fp26to7kc7aj9ri6mx6hvz',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                
                executionExecutedAt: '2020-07-23 04:33:28',
                executionMonitoringStartAt: '2020-07-23 07:09:39',
                executionMonitoringEndAt: '2020-07-22 21:51:33',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'k3tc0kubnm571b5vlftybu719fcqlmcs426jq4j0r6uy22ek9lmrjtwqpp930x0czk4c2om2iwqeyq2b3a6k8idxq662regldrig69qat2ablkb1wst2wkpvnnfcp53x30zd8xr2lxj91rsc8jxdzhr10nnqjsj1',
                flowComponent: '7cy2br1rte42wln9wglmsazzbupgkpc1g22dh5pezh4k0np1i1qw0mm4eq9j80awu89c2ff0nc15qq2arjwdpv04gmix38moq0jo10kwpa9yvnajpeu8fcmul0vfmryk9uvi9wztfrwvaf8yjxk5w2m5oijow0he',
                flowInterfaceName: 'evnwidq14lenzdv287twzabvq3gig7g9tn1xj5sv60l1bbow61b4vcpphib16d00prycvdj02pn33lmz4gpviezch80f6qxuy4ccgzomh61cyd0m8923tfj5u0rslhryb4a2eia72ldi5nzke9fpnwgu9hf3tsqh',
                flowInterfaceNamespace: 'bh3ie1n9anscid67o8486dhc64emjxxvl627hewd18rjqkp4c6pwqj7nd2qpss5blgypsm2jn2y5zg8w10z9wi3e2s09tnshp453b7t308gjtvztojy5jv8d8njrxfjf01zohfho9wbuioox957400tw8uxns9hq',
                status: 'DELIVERING',
                detail: 'Commodi dolorem quae mollitia doloremque eaque ex voluptatibus velit occaecati. Saepe perspiciatis porro ipsum non nesciunt magnam. Ut corporis praesentium consequatur. Consectetur perspiciatis et harum molestias laborum quia. Voluptates nisi et officia in voluptatum nostrum quia rerum.',
                example: '3z0n5e2fs564fqvlkq2kyd0cy7gyairu3rtbskil0ld7ra1wi69wrp7i4ilm9crzdish2p4hqi3nsxh4jd36g8y4a3jo6z9ifv6iyug6hpm9wqvdelk0ap8nmjmldxldcign7jb9t1z97hx9peksy18hw5snmlkw',
                startTimeAt: '2020-07-22 21:45:08',
                direction: 'OUTBOUND',
                errorCategory: '9zthuqg50bv41o5sfa5zjhmpi2icwc6ej0usq23ggw79pv1wat418pnvh8442vwvbx9y3e6xrcs66tr7xil334augoa1koq04xthfmo63icqi9f1fe209utmcvcdo1wz6zexub5th972f8ek4yi4o6kzaorgwzeg',
                errorCode: 't5hewjk7v0w7zmpvgufv',
                errorLabel: 641996,
                node: 1437070446,
                protocol: 'evt2fjrz5smt13kin5cv',
                qualityOfService: 'hr647ooqsbhkiuiv3aqw',
                receiverParty: 'nbur3cqrf11e7sk858jbx98jfij54z7a1ggdf5wc3thyxydvh5nqp0mkz7e0gx73izpkkin2zdzkvwoqvx63i3lpfszsn20jbz6pwhfcyzqkdoqkqfomb2sq1h5hxundwsxpldc7ixcuroiud24n7psgtpjammzo',
                receiverComponent: 'ctpwykzrwxzk39fvfqu26xhbf9ozx50ae20ts3dykc911r8q8av16nldvxar9dreby76gz4dy4zm1yw6lsv1pgl23zq0l8f751ldby0l405jdyci16hkd09ypt9nksn7ed11q2mmefb91p70uau17sc67bjeagjl',
                receiverInterface: 'zmu843luvavjza645vbrxafw1p1dslqzxml4o89g97xtulhb97lx4vn293z7vl4npuxspxcg4673ay12l8frzz8fuczflsf098c0oistszjmol47eyg7dkah3f1qvxdmiipdrlezsb9t7ga883w3ygwpwm8lgs6e',
                receiverInterfaceNamespace: 'puyfwhlo0ku660134nfcj0d3dp1oysis68xvm7al6si23y8pbtz01sd4567zhtghnay2bymfizcqpxnrpeuxkbfhujck4qhkcrhvy4k4riyd2ekaeepj66p7xqnv2x3z81n8feawgsmiwnr2arufgtwx3ypwjheo',
                retries: 8113048104,
                size: 2364525426,
                timesFailed: 6486853832,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'q21tu30yftlx5um272kz7e41otfqbu3pzvq9ye309rwb67i57p',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'dk8qeceg0dmnfix4pijb',
                scenario: 'vpumcbk323omszokv0vxeofw34sziaakqfnsyjie20vbfhdnmt9e2e6oyrtw',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-23 02:04:44',
                executionMonitoringEndAt: '2020-07-23 01:12:42',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 't77bmvbra1fcabkdbmgolasc6xzjcxhliugtvf7vu5kutev9vchlyl5cbv8quk2ku1xeooermfslw358so6oi1ehepqar1ilvse8onyfsmx3z6bxm5blrvxkuxin4e0piyfacxaz38z9vbk7jcela0p5bubfw1cs',
                flowComponent: '7gpidpzd01e18hzl1cbrchqj5pp6fcd3odx0oh9tha5hd7wraqbs9y6dhhl5hcse7cizwb6qehdkepy74g5oif1y7otq748g448wuhei6qryl92flb619sb48qnm70ci4auxjfvtrdxe5relkp4p8eo4sh4kc4ez',
                flowInterfaceName: '8f1rmfvcpmmg9ff1d6pf5bib35nsjdfq4wat9bkjnumme3hm87xjalyffx0qmx2lm562gcg8lpkwpxk26qzukp5efoxjpyapcgysjs1tw7650hrgmfmz3e7f5kwtvez8g629edf1ba2mnp0eckqev4kdruqmwdqx',
                flowInterfaceNamespace: 'nkb167od6gv9yjbu1ay7b7ye2dun9eyeh44sce3e9a5itr3f8852ecvm6pvzg63zmrvwzt7ytag08j8vewtrm1egt2tu1sshw85mw6voiy2bi7eftlkhpmg32991m7smt3079pmc8d4x0q0bi7edx30vnt8a5jxv',
                status: 'HOLDING',
                detail: 'Architecto laboriosam ea dicta impedit magni hic beatae magni. Accusantium consequatur velit vel veniam. Accusamus natus sed iste delectus enim qui.',
                example: 'c5wno71fsxtcsctmweymj3b4ejbt7ztgkei5ul8z36jqtxgjjtdh0q2mef5g7micrmu1vv94kn02hw2xnicpiuz0h726dum8jvwrbex3y7m1yr06xf5hjqocrqno0uacgrhtjyqxk8pbj7kclrii7cbkk3uyy0by',
                startTimeAt: '2020-07-23 01:34:08',
                direction: 'INBOUND',
                errorCategory: 'zwxk7giteykckbl74b3ox1qiq5i5wxfunbotq589eqt4oaan5w0t8kul7z9yu26dbiuqe0owpkkjb3w3dkqim4huqgo1yqiwav1w5lch6p30gg0p1jtkjcbogt1nwyv1inx0vkri4a3h77ieq5za8te9ct7iygyr',
                errorCode: 'dtyd2h8wypy938ld50n1',
                errorLabel: 324781,
                node: 3852647662,
                protocol: 'fhlj5vjs5wdkkx1trfe0',
                qualityOfService: 'ezaj402bctjp8y6vsxcl',
                receiverParty: '2z5n94quram4r6aktt1x96jsxoydbqyioii7coyodde8so1tif8ojwudvdxqcyd41ugvkv9wn1x3egs3ktrh1mkmsc49y2e9mohjtztqrc85eal3tq0vl5hqp8i9cviplnx6dh1r9iuq3z03e7ddx9gb80410r36',
                receiverComponent: '9p69kuyh8lhcfbj209mpjlf14livtf5jpgu7ajentyfu3hs58xi3iqjokp7st0n6ihl5sjbci5vjm5n4epini3jzv5i5f66psqxwbl5ouwdsfomet8fue3m2mewmnbqbgg05yx7ntmhfjsiiu3humpu6z4f7h7kv',
                receiverInterface: 'u4u0bqc6blbvl6xefzelludyn7cha97wxy3q5v29173txas8d0hcfzdxdyv1z6qbnzsm79w6o9nekcou5uhn5ocyp9mtljjtg67uqvjri784o31gl3p60s6waklgh8k1romumnn6tz2u39mr4h1mcyvph4ern0gs',
                receiverInterfaceNamespace: '8prmnylwpu4widbp1bfjlo3nvs9xrbnw9bpd9e082g9wl1xhlrd6abg5ogt4umys25zebwqpahf4v0w2k7eqp96yyyrd10pinr465jmtb00qavhkdrvb5v6j7o0jiihx4xldpvodkw4iohruilpozxwgtx6om7hc',
                retries: 6362736780,
                size: 7349680829,
                timesFailed: 2553435684,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '3fv1x7r7h44zhld7iudrgsbydbdal5hphnqx9yso35mwfo405a',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'opsfwwq3n4jauo9ajkwr',
                scenario: '2tav74jtt2398y18top1qhk81kap158nwr2dmcuoy3ukl8hcty4s699mk7b8',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-23 00:43:03',
                executionMonitoringEndAt: '2020-07-22 22:41:44',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'id9xprz9z8pu9ez9iqq7ils7zvrh0aeitsy67rg9ry6x3ak9cdphl9ww79lskges5ov7d2jlk83f9z7rvw81cddp9hs7hamemfvako89ewi26t3rdqhs67scovcev68tfblzfj9dybtcoaix2ajozwexp37w8mud',
                flowComponent: '16bko5q3hvlempk3brawqxr9xk2ev30o6wz59ibt37wlpptmvz1k1w8zgxjbnofbzxhnen9djzq2v5vxbsxpqx7qfjxs3cu2rarvhftr1j5v94u7sa06szqv94xm083hm6dqshcutscfkmg4c4aai1ne6oh6v27j',
                flowInterfaceName: 'f7snalp63iogch7zw6u42i6aj8o1os5s9yy2oe8rcauua8bkgz31nchb7m998dybj9b1wl8gyksh6ka8gpox77c49865bqt5eh6cte0aolfnsfsttzc7jg3vwo85f6a4pvhk83njfed5w2ljpw7r196va38qa62t',
                flowInterfaceNamespace: '70kdvurcjzqjfh9u4fwwrbk2sny4zjcxyr92tnhuu32zwh98py4n2zbb9rbgypmozdtrox7usstk3loth32oeomd0yofwzddpjep2tmxgzq005q6z5e95n33mkb9aekb65ftyjyxi1e7tijoombx42vtgh4wy75e',
                status: 'CANCELLED',
                detail: 'Voluptatum et aut est necessitatibus in dolorem omnis dignissimos dicta. Incidunt quae non illum et rerum autem sit et. Officia in sed eos. Iste at placeat pariatur iure est doloremque provident. Iure neque voluptatum. Aut incidunt ipsa reiciendis.',
                example: 'xzm2fu9u1q69owjqq1o3r592s6kqrdjnomt4wvi5nyxqhq9xqx8hj7i9488mcy2dvtayp50qmdnnc67uparhik7s044zcwe751vb0tgzwtckbw160w230ektm475bxb8ir2py0dzp3w2y6j5wglblwtroy6gwfc6',
                startTimeAt: '2020-07-23 11:58:41',
                direction: 'INBOUND',
                errorCategory: 'rku5pq2292bmwc1elhyzqwl7znv6mxvnjwix7rj131imj5ejmo5gmejh7rw8x43073lz5grkmlnlhkniybvkb95ya69e5pvhg42t0t39pv24dag13uklq314p49u9uxd7rpofpcxw3mcac1sq007vgu7n2r7uoeh',
                errorCode: 'wob33ywaq11y3jtix4s4',
                errorLabel: 102771,
                node: 6377449452,
                protocol: 'vrj8nynk2nj9j90zrkht',
                qualityOfService: 'piufhaqre7zu26pdjk5y',
                receiverParty: '7swgpa8bc6jqebv9uj2uheeex888lce0qf6e4cj67n0c09x1pogb3yuvmwcj3gfpbpozmhxbfhosjeznlwhpnmz5wapu49fip5amjq8n8wjt2go820rlzl8jut0y1vowkjj9fhucrhs8r3oymtp6831469661m3y',
                receiverComponent: '7xw7jf1nmsk6ud6i2o4v61iqyqda9ya4epklzd3gvw3l2ghnx6h1j6x45dx1detf3v8wlfm4tswxr3ro91lqas3b32t6pwm8vo9wufs0sb628xylelzkxjastpmsebprrf3y2o5h0z0fjnzhy4tq6fs0pnysv9p7',
                receiverInterface: 'w2n3do64vgri135egpdni9va5abcb6mju5lixt3eggnqg5o0ucydchy4fup6sj3ksy84m4dafoako8b5e19y8xfkj5cwdqk02xtqppolwixnj7c8b1d8i91gnrvx1lsqngph5t6vq0rzbdx2ev5k55uge9k9m5ee',
                receiverInterfaceNamespace: 'new1p76sq1a76fnrpnlav787koih9vkott185km4lhyg0ahy3i6h2q7jy4ktsfkxh8ljbi2kecfodhxn7gykmrj7e98y6qyj7dkx0wmlpgj0633rpt8iuzdw7jgj9bb2jeom6nixytzr1akclrfue6bz4pg7z0ma',
                retries: 6507979531,
                size: 8222674736,
                timesFailed: 6873908958,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'nxdrag2flf9fdzilq4a64sps1rxr11ooqj9u8kfaem91saalok',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'b7hin099iqay6mml1so9',
                scenario: 'hg51w0wbf8a7jzoiuv8yy6uriv8nk182n4zsjxbn4fo0y7b2qdhtluavmm2n',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 00:28:38',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-23 00:19:12',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'u58wxnp6dsa29nzhoxq3lhtmpv2ewhebu70i69xqzd7qjycfhwz3771wcrh0woc69cbywilrle1ovxelfh01ebnqkaz4xyhwxkd6p0ffc9ia5ue3rpswhullo9rjbshzol3blfugf9a7mka4nw5g7zom2xoh1omx',
                flowComponent: '3v1h8t787q8it15rexubvchh8bdnefjvf53p7rxa6bivjlpgwmstpsq32psjslpn498871smrlhkd93g6jpy9pmb20njhioqs922zvsxkdbsisthysbx6g3163t2roph4bphzixsh6mj71zn51is01ggalbjszjn',
                flowInterfaceName: 'ij43txkpbqayimi3mhgfl9021gduem2ros7iqmhk15jtg5va74i994dq6a6q2ob82nco6jw3ip8xh58xyuuxx5wr3pl49ufxiwajwbwax5kthdgcmu96wauyxf9580shchtc0oeyg2rp5xp5sp1w7quremtqzndb',
                flowInterfaceNamespace: '6xi9ra5dit3qgg2m2i03bdy8jn63fl9uuenbn0n4qxysf83pmfoap5vcdhbs7p1ryf1c5dyjo8d1aaebv7gnie26xh9olee6tdzpwzqgljtjlh3l4yligyxi2fpsejpnq99sa4zrwjfij1ojub9rs7dwrsswv3vl',
                status: 'SUCCESS',
                detail: 'Repellendus minus iste labore veniam aspernatur omnis deleniti ipsum. Adipisci error autem. Nihil qui vel fugiat commodi est error. Eius est vero.',
                example: 'f27cotv16nmf2zzmxcfr14z6ilo9142hj9lek2mqq4ffpz0g3yfle5txymi0uj3916eirv8qlwu51cgtyjnhpro8hzpur7l3o19c8vndeslgwbsxb9kcd2noikaey9jvxdgoytcrdopfr4rsyd7bri90t90cn8ff',
                startTimeAt: '2020-07-23 10:07:13',
                direction: 'INBOUND',
                errorCategory: 'vus9uj71kdngpkh6mv9pd4nohf0oqvupi5wz4p4u903fbl6r8iqjcekltxgjswqkraqcwcn1nzeym7cg5ywd1kbnp7w9buljdm5llzxgrs25v2mxdnkt3p3z3kt0bcshj4yhho5gsqt1kyvk3kb7pzt1m4hm6h0d',
                errorCode: '29bryoldgfasj5msy8ix',
                errorLabel: 383531,
                node: 3815566911,
                protocol: '34nhjrctiupxvp0zyl1o',
                qualityOfService: '6qjhqbgccxccnitga9av',
                receiverParty: '6omkxdkdi0vvwizj3rw3ilrq5gssm8z52hx5u83rj7r00wwweahe08305yzwuow7jttzthajrazmskk4wxaexuakug7lii3ld0q7coj09uknspvii90oom373wtl6w6afrgd30m93oo4bk1cjvglit2ugyf25sk6',
                receiverComponent: 'vrlzbh17ukw5uyg9ql5z9eylnx14n94je68jwcvqbd6nvvtr7p2lkfpr6r4722ta95694rzrgd94sxtzk4vvkrd6vigia633j10izuw6y90chf7jhpnp2l4nirji4hy704sz98l1wcjc5688blob1szm12zrorxb',
                receiverInterface: 'dnyhv5fbn750y06clks4vy3241nxcv9hwp4yuzg7rnfux1upcbgfxccrfrvf0crl2upboqeg36crdumwpkgk5f9q3c9tuqhx690qiph1rx9mqz7ivwhw4qgd9i79pbg66xhi0qiwkbfm5x9j759fmzgvi6lkbhaj',
                receiverInterfaceNamespace: '9w66ix7eb8zxhlxgpkkwj099ney0f2hoafr2pml1aehpu1nxd7p1gkjnvo85y7bqvuqa1wj6j1gby662o9d46xkciygmsnsbs7q1l0qfwx54kt41zx7lvsjcwvbcymy3tgwvznhkaniacnah9vr6kla5ym7jc1a4',
                retries: 5214224004,
                size: 1304655154,
                timesFailed: 5191930090,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'f5li9njf8legrm5w813pa1fon7xclb3zbvj864q8wzk7tbh92z',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '1l975vjrq8kffod4al80',
                scenario: 'tmsch0vrva884wdo9v0xp5tpokc0bxkmxx6twsl5gooax6n8zjgqnaocyn86',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 19:10:12',
                
                executionMonitoringEndAt: '2020-07-23 18:10:48',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '7ivbljpaoj5xqfivqlwb8w565jndz7zjn9jqtq2ieoetwk4qvemhzucjolfq0aftom6t46layn3kevb9vfwieb6uw9e924svw4lm0oi695tmmdqk9zbv8mk5q32wecgcb6r57qtao2mocodajso1cx63q51xdea2',
                flowComponent: 'fk7e2ztisog9p1ngwrd347f3z1czwwssaj0dopk7wodok7gn4af2ncsllyze41wpqo8dvxpeq2xv5wskfte4b1387ksifjrrpvwzodll6dhgfifh9mwgzk0uue0pyio3qbnve7qnykqgf8wznghyz5ssq8awnx73',
                flowInterfaceName: 'bm91w716bxv3jw2j0le8s8odouyfdymjyt324mzs7qnvcpb0uidue7k4zz7u52dzthicl8ojab00ksk8cnfgfnsyxeywrnzyq1iqlnhc69q68dyd8caoa5h02bazd5s50ntripz80hz6usswr8oji0k6l0ppsxrd',
                flowInterfaceNamespace: 'rn4x8dmy390azvm5re9l1bysakkzfi3xcq4xt23m09bryupd16owvq5an55gdcdvni6f2xfb2kmrggzama87oe25hsxb4yr9sh79u98xhzijiwvwoybavt8tar8yognvmjd2g1dukzu2dkq0uk9zndnq1u3jozxf',
                status: 'DELIVERING',
                detail: 'Quas magni est porro culpa. Sunt consequatur exercitationem. Doloribus velit nisi veniam aut quae aut dolores assumenda. Soluta quia quasi adipisci magni autem fugit sed amet consequuntur.',
                example: 'fmdb6bseq55i9k7p8041zjhuk20jp7kwtrk38cd61pl394fzpubwlrnejk9aed030a6ffgva2hsk5i3oai1v672t06z1a3sri8mef0n6gj4k4k0zwusktbc7wi81ddvbhhtcttppp0e6ktdmnfjr4sigmpp0qf5i',
                startTimeAt: '2020-07-23 14:46:58',
                direction: 'OUTBOUND',
                errorCategory: '85qgm4onbvlz6t92khq6hu08taxthlunfvs77vghwhodkr0vcir5connkuuu7z9euuin4qzfov43ku6l2bkaoboqxjk1pwhx237f0snebokc0qi4n80lpcmcuhvg7x1cn9x7q99ewe281n2x36jcbqtpp9m4mzc7',
                errorCode: 'v2mcbfwzsgdj5626k27z',
                errorLabel: 948884,
                node: 8516909821,
                protocol: 'gl3qpw369hu3uhq8nhai',
                qualityOfService: '6ywmj6s0tb7jxn80i0i3',
                receiverParty: '95ycru7c7qmazsjhosshsyogu1tet0dtxlv18brteiqx2h5rxuzxgrt91nel8r29iefiwkyllnn4op2hf85nkoh3nl9kshi06xbamajm72d8cvpkcxgv2fy8dapwtj8auq88xvs1mzt1ly1r1n99tbafn0o59cxl',
                receiverComponent: '2sdjzx6gpy6allf4p96zwgndiuciuacsqdo4lg9wwcf250ztkyo3cwcruqwtpsa42ermjg4bxr5rgh068iagvohijsgodd5hldu2tbn6fg9iqg8oae5kv56jfzo30lp0gi8flflal6cgxhz2phdrgj0ggufc45n3',
                receiverInterface: 'kbzlo4dxxlq7dag7ufpmt8bix6890x713xazqbvt0itqa1o1bjgfzm35rumk0nt9eu1zhibym482spbruaq9m168uxdt43jvip7d33mynyi95bjwyuzcon6mcfytkuvb7xpagmrzpws1jv4fhyy2c3zo6809hgg4',
                receiverInterfaceNamespace: '9kt0e9mtz7dukdd4m7kdnhcube5q8evgjx8mvvummfwe1c4ur8vy9nkf9zvwbz1ls9sg0c8yl2woaxswa28yit3xmwluxviikgxp5uj7fhqjz2jli9yndc1780jmb8ynxi5gp2ecz94i4b038vorjluva87t8n0n',
                retries: 1468090710,
                size: 2754740739,
                timesFailed: 6952432903,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'p0is3of0o2v0whqm0msxsmu15cthgh2uveewa02o3xc0q55e9w',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 't3y40kjgi0z0ih5x5vf2',
                scenario: 'ic8dsqiwpgx6klaok3hoagmebno3bia9b6ju4wmg6qv6jzcd09834u087w6h',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 01:32:48',
                executionMonitoringStartAt: '2020-07-22 23:39:37',
                executionMonitoringEndAt: null,
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'ao08xfawcs7h0yydct22fo0gfe32br1vvd2xzooqybf2gal8w5vf8yzv9ivdvd9rtgjjrgcs9kip6lm3wfni3doyu8ghncfpuku02uddqp026jnobnz67dvivx8keg09ptcdj3y168qbqhp1l7nrtco5pf22bw8j',
                flowComponent: '3wr2m7riqerb6aad55et9z1kbtgq45pabwkag0srw4jygplrkmwc3ou1cwg1470ayoio8scb6ub9a31prwpnw1ukhvj7aam8wyq4xvd0ljvoev1xa7j69v6obng62hkibivhefkysek2e541b4lx9gpoq3c4mmxq',
                flowInterfaceName: 'eourlbm7l52p35lfbf5sbdk9um4kpizyo8pamanc1ppatx62850ueq31p8g2zt9a5vkvjws6kna9i9lua88r7ikkdahbk4iayknhfrdm6jb3s4m06hku53w6vf3bt0jdki2smsx4ua3fk6i6v140vilgt7xelva9',
                flowInterfaceNamespace: 'oeb9s93vsnrmh0u4u6sh2air4o988br60uc7brj3x3cjxoosk8xubjks2r6acl1facpibkhhgw7x1z6xtwlv4dzqk9v603q6j80xfguhd3cudaueb5qlcjr32ckh9olylakouje6d4p1w4njazdkvgecmuutll5v',
                status: 'SUCCESS',
                detail: 'Totam dolores quae dolor magnam illum. Aut dolorum quo. Alias saepe quo molestiae ea sit veniam. Exercitationem consequatur ea est rerum voluptatem aut.',
                example: '6bakyaf91xywxagve37bpd6aji3xw6g3h5q57r83fmsdh4r2w7kbjgp6q1j1cfags0jpq2kgl5pzug1hhnjnl7gxgnwkobb82gqgq5geobgywxtd0vvi58sjo4tnspwp5kenun85uzwvmc6n5zevzetio4mwn3f4',
                startTimeAt: '2020-07-23 16:18:06',
                direction: 'INBOUND',
                errorCategory: '3qvqhj55udr3d4kpjl518npaqoanuf20hbtmt855ye5u30ila5i9i8m4c2fnwoucl21w40kx4zd4te9u7dmhm3d8zn6c565o077qq2ud9b5b3bxd2hw8kbrgnb9uwa1yaab4hxf1s1km2kzhrbnfj1f9u6ipdrf5',
                errorCode: 'ii7dcajsfjt4av0s7px7',
                errorLabel: 999495,
                node: 8247476067,
                protocol: '7akg9cb3s7kp2tz316ad',
                qualityOfService: '2v1acquvx02wuvcq22fa',
                receiverParty: 'slr6me2van9f135pyxatis7sypduxox9n87p6pn6y2tkrza3c8gkp2fayqq3u47mavom6k7d22f4njs75u6d89skjq83v1kg5viqcdofopqe39j028oqt3jms46zfxrdty9f9389savyc8b58ohgfpxw4zff79nz',
                receiverComponent: '52gq3qyegzeeztzhj2zss40yshwgdhvc4n5iijpm6kadr97vgdkjzkjw62t2dwm6etob3zz2qr6yayd2gzj3nax3dxmx78owdupak3toechk5ahpxucmas32s06kbx1hwh5435f9ja3lnnam2hq4ex4u4f3hxzbe',
                receiverInterface: 'ma2e3o0m31db749dzywngduc0jotx8gdwokieqtpu8hzxefg88sejz4j192lz5mrkfaa9ah5dmbs0aqjlzfjvwq4yy9lq2zgphobkkp0kgwiucqk8xqugqw3rnzz0xstpnktfomgxn8stuez13aq5l88nbdkuwsc',
                receiverInterfaceNamespace: '1sh9akb3ycjblhtwn9b7x9mxe6wu9ohaqxd8hp1jmavg17qebgmxufx0zsah9z8rfxow4bl804fd57e2pudc20wlx8z6kj10pyf246j6bkvpaoaztde162euu4wfql4ichwujydwvknqc85s9h1uknr8y5mkwann',
                retries: 3411623969,
                size: 1470499727,
                timesFailed: 1224164342,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '0ziw4f33l00o5bghpksvrruneolhiw9su6pmptgm3rx933lp4n',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'aal63iclqsrnsm5ykvu9',
                scenario: 'xypv5ub6nhfcn8wbtr6ch2wbfolqmar9ixh38aznvqln0hg5e2g34012yjgy',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:06:51',
                executionMonitoringStartAt: '2020-07-23 10:50:36',
                
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'nwno4ipio659b29xofkr1afw9szbw93wh2zh0p90zh1p9pl3ul3me415drrxlrldbld2rcjfrubxbuskvo0yzircne3p4gzox9762605hdrawndh9slxet1l5011jyg1fwjk9bvvod4y3465fwaav37j6yk4qq3r',
                flowComponent: 'umteot0kbp3uyp348xi1gfzcl1wqfwujlid89g21kgflpewmhy8u46w46ds8lgor8sc1px8x6q073yhxulz83zp7yu6rc916mzjmuw8h8xxmv6ba8u3clpm1nh08r80u7034golkffk37d3vcfyfbmmo58sjjf3y',
                flowInterfaceName: 'jjxi5xoub7f2vphdw4gmymwmtquvgewmap3es2nb23l1729rdffr7uboylyldztt2my1nx41hucxu36g7kowcmp4bqanqtcytj7y0nqxztp0ryqd3quhmiy2rjc9bdq3k83fulyymqzv4u5b1joq4t3ug4c9j6u1',
                flowInterfaceNamespace: 'c21hxecwzsvbsk3o6sr8mm90ibnsb3k0ssc1vurccrflxfendlgmylxlkdn1z6vvu9wasif77nu5fy4aezrsbbpxru75ucywqz0aovik8jrzdnfuhi782tcw5u0bcs94tbp5s0yyfcw4dmowb3io8fkrgd86gqnd',
                status: 'DELIVERING',
                detail: 'Esse cum vel repellendus quam quis. Omnis ipsum voluptates quam quaerat sint. Ut rerum sit qui debitis hic officiis quia numquam. A laborum velit dolore eveniet autem.',
                example: '9amni9qgeq07wvsgfqd3bfd31rj4njhpaan37nyp32usra37yiwi2jg77gqha5x8bu2f0w5qshu031etxumfj4xdcjlz92zu6sqo9uflzkq8xsfsgodb9p3r2kzsnfgyre495v2y9f6m4nesiffygl7n0bex3r82',
                startTimeAt: '2020-07-23 00:52:44',
                direction: 'OUTBOUND',
                errorCategory: 'syxkgs5mmqlpdavmy2zqb9f093rwoqq23j5h6oux69s2x1en7ql8p91knlyzkiluvrtyl9hd69ugp51d8pozr5cz2sgaimoso7hveenxutkbe3r00j1b91xw07oeie6dnubhgdu8kdobipi3e4c8lanvrpj9f3sl',
                errorCode: 'ditwkmc7br5tov6gobeg',
                errorLabel: 565534,
                node: 5894870152,
                protocol: 'ybpcgktyqx3baikd6hrj',
                qualityOfService: '81j69limbim747c1t95w',
                receiverParty: 'k5rx48mplnhyoeor4v8mjdr5xu60c7esqnuva8vhpage34880frit97mzya9an58c689gxkgz024x1w0lywgq2tqdebmp50chiwm9ou13cppdkw5ceqe0wewyi74qfxx7xc9g0xxkg8xvpl4bb6tn0qqvh973x5a',
                receiverComponent: '9jrf0gj3rzx2zegdqw1zq1cngdoj9dpnvbmsqpf7vxsdifqoimlrj4nq5eknebofo75tsxz7gsomadnuu7w8rjpzu4i9h3b5fpta1vl1e3762mldf0itjjuo8xomsfl6qesbvbq62yh26zidmc9qidsuimzzaw7h',
                receiverInterface: '0aszjv4a0ybkfjsgw73l8eqstujw2di8milm7y46d7fa5r48qi680xkcgdo3qdrgbfiq31yd499wp65n86bavcwf6ehgxuako0e2ul3teofib562qhr43mf2cnn7smbxrk7oe2o1ax1x179tlmcvp77ph5aq2qet',
                receiverInterfaceNamespace: 'awnx88fy5qwmg76sw3oy2qnhlobu7i90gf8o7ah448r57vt2emrvoxgiketow2jlsy7mcwnaejxadoawxs9l309nyp161qd9cietoijvrnbd8gv8jrfikdc4vuc5j5ykj624a0bcf0vzdasv2dctxbfw05vmnqgr',
                retries: 7723172211,
                size: 4602458107,
                timesFailed: 5433418617,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '37qgo8c6o554617jrueyteeyotavdjkvkeoy7h83v6rpnyksxx',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'zzen2jk1r2g4cvm3kj0c',
                scenario: 'gs6gsvs83th4ujpkvxijp609gyqburjclyhh6ufhp6vhk6h4ydcck6j58tj9',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 03:00:09',
                executionMonitoringStartAt: '2020-07-23 07:37:49',
                executionMonitoringEndAt: '2020-07-23 09:04:30',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'bar4q61ehb2hp4t6l9qimpo360s01hgtjbsv9g0p9n2siug807bqsuzcfkytk1tfke3hf9w5b3l5s869qs3vlxnl0bqbfgng9dc6i3ml0c5ihf9lihfhqnn7d7wz7to48euadncc9z85cidcz5h4b0ojt63avcal',
                flowComponent: null,
                flowInterfaceName: '76xbqobtphrawop1r8c50c39ixfndgthupu0datfobndttb1uodtwcx0nr2a1cqg36v9cka8vyy0qyif5xue72mfamawjhuw358ubgixp34fxhvkfpjedjeodoa94u0bpb70gd2abszyuex1a19j2iz79s9c4t0h',
                flowInterfaceNamespace: 'lxm63zo73rd872dst4o730a08sji2ugxkxjy4ftkxku70ke1y16s6r08q8z0aerk5eqflfg164hd0qdrjrbzy1fd34lmwit0nf7vlpnl8tcussda1bzrp1ox7btx1c2cizz9w7k738dvry444pgzas2sitszefka',
                status: 'ERROR',
                detail: 'Voluptas unde porro. Modi nobis placeat ea. Fugit non impedit sequi rerum sit earum suscipit.',
                example: '6lwuf50el9urr1juw0krfpzm6fwkcli61b8v64r3zneywyy9c3tglhzfwm16clfbczgmhodj1s6cjou0ao133xb8bcxczdb6zrndmdqsj9zvuuidhj2mevebqj7qc4wh8tbmf1xczyab4wlod3idjulv02kk1ry0',
                startTimeAt: '2020-07-23 09:55:38',
                direction: 'INBOUND',
                errorCategory: 'x9x7i9blufgucbn4rxn3xdg47w3anx40jtqyaahnrg8vkw8krzc9yag9s9ap3wt0ezw3w56xobis9md18dmd9sk7qpx06vduu6ytglut6fcq2hsxmulwdldjev2olad00oblzsunaiq0ouoxsgn0n0d38p5yjjt7',
                errorCode: '2ig05jzefl2jzjvet5pg',
                errorLabel: 118976,
                node: 9745163078,
                protocol: 'you0c4hvwq453zltj1bb',
                qualityOfService: 'grdudhg8vfbl6udgky27',
                receiverParty: 'sshvpc58dsbt0i63iyu55dys6b04chtpz7ybo557nk4nidgkxnx9beoxumhuawg8v92gaw3a4qqzummnzk3xb2jw8i67ng7jhi8zwkg0ev16xcungv4zpeynfgyzj0j74bd2gejcf6tlv3uv3ubclxdws7s1gs57',
                receiverComponent: 'sady32w229p7srpexib0vnlivqsxan4e4600zdb4nbmzok9g2ee1ymvqm6q95fdi0ek4r6kdmg2conhxdkc3frz3x22cz4hz5tlom68icw89n79a7fibtfcu7cegejghdab348d88q04utcbuhke618qxevadibr',
                receiverInterface: 'ecxfcpit5t10f4ygzucmp8a661w9rjl6emkvxafba0cczjxso3mg1g5bwd40y261ax2ra85bp0fnvyv42am8ey2xllwa51zftyd6t7gfui9of5bz4v1fppas4rcrzdrvesgtqsp9dsy3m72p61n69nbe91fvzl50',
                receiverInterfaceNamespace: '5jp3rmhdlt3e29lcj9m45hr6tsvzn8mfm536yhf2598nxvdb831eqjimkdcyfuvhhwhqz5zufolhbd2uc12dmgplnm1p2j68rzu0q38x1h6c0e30ru10r6c8b05xprx8jhjmswuw90hutwst401sldd1jyheaoxk',
                retries: 2000864021,
                size: 3603653209,
                timesFailed: 9564662078,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'pp1h1sidt90zx9mukr0tc8pafc8dnckm5yyf01dbov01s52dhb',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '6hn8p86sxzd02yg6uho7',
                scenario: 'h69cqjad0bagml6x25a3lk0evd9sij9z8fcvykltw1cms58xvof8xu8mks0l',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:43:13',
                executionMonitoringStartAt: '2020-07-23 17:10:14',
                executionMonitoringEndAt: '2020-07-22 22:20:22',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '6aaoml1hrnuyw3k7umx9yyeu3c5qqowzlldzrhtjj5qnsf6gduqog67yydlvh5j0p4mmi9sryd5gue8r7w61b89vx1wugus9tbytj1m4o10n0fxbqch1989ur0xvsf1z5j3i9hkmah9bxl6481utmxhqjjlvupiz',
                
                flowInterfaceName: 'd8dgn7qb2h6o02kh8s2v2bv00e0zbi9w2slibvuvgod3h7ejklkd93xv3pl8xb3axfea3rvwwpwxg4dbsbkogudg8sw8gimgb6smw4h83kq78o7f51ds43d3wr1ssghptwy36kzokw8wyq27lirrnci4wpo89qfy',
                flowInterfaceNamespace: 'x0bfxiud6463u74g30bxfmsb3j7d6fxsk2iw3a40giouxlfoj4lo1918brj20f23i9liqw1s8mjllbz9ojuhl6gqnif2v6v7kvqawnxxost3e4xg5k3vbl6kt83byex92rkfl5m9ibzmlesws9xniksvt3sydt7h',
                status: 'CANCELLED',
                detail: 'Veniam consequuntur corrupti incidunt non minima ut magnam sunt. Commodi est sit neque dolor dolore nam sit temporibus. Repudiandae in dolorum consequatur totam nisi officiis veritatis. Sit quaerat exercitationem facere. Dolores fugiat voluptas explicabo. Et laudantium modi.',
                example: 'cwswp1rpm1nyfvuruqn6jjfcrre93hbd4wvr0tcn9tsu2fzt66vouhsaay8h03bwa3zui000kpq3hl8nsq1idw065bei0viv3336cnvb6bqywrtjugtne5l96p1u5lcdfubl9bdetx95eg668yygnw8j8i4y5lkf',
                startTimeAt: '2020-07-23 03:58:51',
                direction: 'INBOUND',
                errorCategory: 'fztkqy1kc1oggifd221tvixw51k8dl263pktow0wj5xrbvrbfvg4nfozx634ns0bfwxptc6uqh6c2ikxexm9x4zbcpv7h9fflepv3asfof1ofpr30cp0dbjmqcq4prh94ph78lc9f6qttsi0wrk39zaszhsa0i41',
                errorCode: 'eqr3wrk54kcx3zkqi5cc',
                errorLabel: 252807,
                node: 1970803701,
                protocol: 'eg6f7ptf7jubp76hxs76',
                qualityOfService: '1c70xq39muuvht5zjeij',
                receiverParty: 'doher4270o7v9xecaxb1a38bkak9hjb5euygo9g8f1mirbpi3srs8r1bmvo79wdrss0dpp9ekg9efp47jwng6xaq6ilqtm69k1k2zas1wgn7fb12yjouulgg3faoal2bmyfmqh9ugao6wl2rzlx1ppsbjls2jwb9',
                receiverComponent: 'eqsazmbl0tdb7uw0iv6k99p5kqhzo7zo5ij1k519a7l26mg4u9xqueym112t573x9wb3ez7243np88q3ifbs3sb7kw5h0mt1mfud2di6llbountw5y1a96xa9edo5e9p20obfaycfrxz8bk8uvejr95tr4sp2a7e',
                receiverInterface: '1i6km9gdurtjhnl27twicfi2pw2j1fqcempvdz8tmj88sxpxrjv8ojunpd1ffnfnewpbu67c3jxqgccyt4lfsdabdc93qmyvh084mkov8566vqg0gp2fu7ppuxoqxfb3yfpptix4pf2wzko80npwvrweihdbzhlm',
                receiverInterfaceNamespace: 'dipssjaoi0clc7gg3ua87ay0eceig5yiyqy9jy54d49y20wzjhmyaxdo1k1qep0azff2emu3jbetwq4nevbw15rk1ftfwn7h2dbr9vs11xt1gstpyqpbckg77rxcnjq4pdc85hzwjjal6pqz233in72nosl6zkj1',
                retries: 4668576731,
                size: 3603464964,
                timesFailed: 5240631841,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'v1pianquhdxv54xs779yk0h850yfaao1ze60nt2asue396gl10',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'k7kt9sgvqa0oyzpi9599',
                scenario: 'wi8w3j2hinzzu84slqe860rdxd8t93jslsnd2bdgfadszjch78atnwh9b8yj',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 01:39:45',
                executionMonitoringStartAt: '2020-07-23 16:00:21',
                executionMonitoringEndAt: '2020-07-23 05:56:55',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'ihay6mju1fqrk1m2yyx824e2zlwvuz55gm07dr3rp9mzfqisg6x8erisnd3p5i9k2ig36urhtz4ewn15jo0bbguwrx3kd51n21ac3dtjow4s4ig85obgxi030og98lrgd3we8r3ihyb2riadek1oidpalix2rpma',
                flowComponent: 'sdte18xcvqq535u2mak2cowem8j444lur8elir6bu89hevdkamhgeosntimlo6wr166r3otjckkbu68fyf4y9s6f8i1waoyc88wd1q9afeapgq1wgrzlbyya86k2p02dtxvq36wez296ml1jmi3xqga3vie2ygyu',
                flowInterfaceName: null,
                flowInterfaceNamespace: '7zi94oqqjux72xsgd78cs7aw5as9x7ua491jt1iiukrwep0rgnhm5sv6d78p8oy34pe4jgx0x1tjd1zdy26gg3v63a9dkxnag7l70xa4apg3xlzpezddd7ur5ta1r15nmazibr3ow9qkbndjnf61qbirxbu1fe7f',
                status: 'WAITING',
                detail: 'Autem nostrum consectetur earum qui corporis quia non sunt enim. Autem eaque earum alias vitae est voluptas distinctio. Soluta et quia molestiae. Consequatur omnis odio est. Minima corporis voluptatem quibusdam eum numquam unde nihil at vero.',
                example: 'wielrh3lotu1gr3go4c77t94eghkj8j3mtn0mqm13iis0wdfhoy6hifli5hfg7n6ujx743cqqfbr5mvu5ynd0trk3a86wg7kwgvpnnkuizjjylyzforw0ksg2euy92eof8yabw5meimty5pz6khmhc7fmjry16ac',
                startTimeAt: '2020-07-23 08:47:25',
                direction: 'OUTBOUND',
                errorCategory: 'gwq0sg6wperxujzd42z3acoc2vrbfvame76rpmcxty94ntbxei33pc0v90p4n8antuprbs1iwfjbal1b51oy2t5s0ms0oa8o13ac170blcf5sf1nswxgwpznizmczz7b95jvwup22dace226yuo5filzvruw0zv0',
                errorCode: '1jnkbejyf59elj8wf7ck',
                errorLabel: 982085,
                node: 8830506178,
                protocol: 'ut0cfdf6h6emppop3s5t',
                qualityOfService: 'xq6tlh21z2xwm1k28b8f',
                receiverParty: '55vm8a6kx6k8jesle21ekejkugi1glopzmgsyvnelua7fjunv875xiqoy7mh51wk9409gfbb4jpry0fs380idndtsuh227scwthset41bp8qfzh0y5a5n7dcxyk0aekeiae9qtnt1a5exmuwqqhlqy3knauvpkp4',
                receiverComponent: '0gxk4j1w8itokpkl4h2k7wdqskiqet1mhkh05ixwvgmhanggv0kgl470eh8ciz05xgutbfc531v2vq3ekz2v5esfn8zs617zolga2h323ou2zjod3dm5lojh2l202cp52y4fme76vahvcdnm3bli2xzo2h4acdp3',
                receiverInterface: 'he1k1mth3ndg7u66qobbt313jmbbcqgwroadrvb3tvnpgzihw13lauqtdffj3z0zzswbh7m5jb2xzs94aumhy639isoyh9ai42a90x3xa21azwzwxif06whioip3hmdk9bnah7i0c565ybdiks1544a65d35mwxg',
                receiverInterfaceNamespace: '1zfa7lrx19h8cwppj810y7g4x84rjhr089r2bjwq22mzi3fyro1gxhrh212vrd9gb2ls6v0w4i81ustecuc1115mnq63w0xwrtbn2agsknrxwr6w9462f47gjjwqskpvs7xgvrdl9p2hb4gaozfkaub0qn3dnjdc',
                retries: 8150685478,
                size: 4238113235,
                timesFailed: 3893212787,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '0u7001duw582n9l1knurn6ux83cgvj0eb4g2bsggab5sbvxfgo',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'v3ixznmzelge5iqf2v7h',
                scenario: 'gm7ip78qoanouv52plp5mxa2rzkv85anns027fj61uocopj8gc29iq3jqh5b',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 09:37:10',
                executionMonitoringStartAt: '2020-07-23 08:21:25',
                executionMonitoringEndAt: '2020-07-23 11:36:40',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'lsetveji4ratloekjbedndc5eh5onq2tl9qumrhr1ynklp1ss5q9q5zbmt8l61pv63tnlncvizf7k37ymp992j9qfrsfj2wbbiby9mfzxe15pizc5qop60dly6u5d7p4e0j0qf780bz5jtst6co3s21931gumj15',
                flowComponent: '92fzreobpvbd6dlsw9ae08zvsvbqkogjfgr2yf2gj3j2852tzyp26um5w3873wgpjko5y3owlfydahxn0mqbrlbmao4hi10lf3j5zzphcpumd1pb5csyh9akc0h3ea936vtx7w2pnzb83q8vhuv0w4dl7ku8f4fx',
                
                flowInterfaceNamespace: '19rl77hzhwdmc5cyu9y8kunbsht471l6cmvaazxu536t5ehlj19dhhxiqzchi6gi5bdqfx6bz6z2axx9sjqoi1vf8a5oypvium4at2b8hqf4b9ituxlxbbz9pzmt78j9r65yfp032v961gz24qd9zw51g9hep9vw',
                status: 'DELIVERING',
                detail: 'Tempore velit reprehenderit quo corrupti voluptas nam. Quo aut nesciunt commodi voluptatem nobis et eum hic tempora. Inventore fuga rerum qui et sit. Aut autem natus.',
                example: 'y4zkns6jcki54r2a04j9tr8v1uu6zqzyflurq9z9sa80rwzrxum75z1r0cxram62824yvphb2pehlojs7mkk79m06u7gwhdqs7p9w9ev7f56pslayt6g3aak00sf56yuicckte4ixfdkwdpwfdufmkuwtg83bkre',
                startTimeAt: '2020-07-23 02:27:17',
                direction: 'INBOUND',
                errorCategory: '3nt7v3lbwluhg61ifdc8oxf0muakdgkytvwb8mdpzvaj2047ckkbfiqjc9pbd2cd9zd1er8rg8hn4l0bqr9emjttu5vicbwx83mf336nk6qqunup8kj9p0uilkichql3a6xcb92vv9vhsgd7vhhzks69s4c39v0r',
                errorCode: 'db2ouierpawm1v8ryu7r',
                errorLabel: 833011,
                node: 4314799198,
                protocol: 'i5t6j0f7d9q823ymw7ht',
                qualityOfService: 't6z9trkpmxyu1dbtrjy7',
                receiverParty: 'lwv8qpdrzwwkikjyu2k0o4a02hgdbyifu80p04vtvhgc0hojn4x1si3mvp1d9y8i3fq47381qrq9inux38h43wvzl3ohm7fvmutx8yjvmdcg157u9b7b6dt08gq43strfi7efucyvaw23c3hty2rolux8nf9iz07',
                receiverComponent: '5jvvzn7vkizpe6qeubybzh8iv6i9ip4ckrjk75bj1l48r0uzpm06gjtf5x4rgiufpblh9rvztozzjwmqcfz1i1xyfvcq39oe3osulhsn94q1ffifbrd7kugc1e5xa9tlq3co9i7yjq8nli47kfqa5zqohtz8fy7x',
                receiverInterface: 'afqwbmnpfta4fqxzta78f6ew5k4bepdk3z05hhpx5mkduh59atgtpno2zmothkg5igkeworr68eibcllafbqsehuje9u0fmmtzoxqbg028mfcsbb8j394u0yh7tvlhiyqlb2zyplgoo4iltss0vb04ylm9u7euhk',
                receiverInterfaceNamespace: 'frc7ocvph84w6gm8rpggm522zm6dvlhbdntfzl9fv0kma4qabvda53yzvdqvuieeu764m0qy3a3qg9c5fzksms6v0mdntcl7vetxlyvj8uxm55eb451oewfoinc012o0gg3i4881e68j9o76nvladimyrmztu0oi',
                retries: 8218703434,
                size: 1003974576,
                timesFailed: 5622158855,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '413ejo1d3s2omdp20l0tv63ujx86t5i9ktoz1oq9llegjmyzj1',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'le2cn9eyq0cx7hqxb6im',
                scenario: 'pnrq0a9nlffjvuhm68983ua37ahp89j48ys1e8h8eprvy277i02sjfxcbp23',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:41:54',
                executionMonitoringStartAt: '2020-07-23 07:04:59',
                executionMonitoringEndAt: '2020-07-23 17:50:29',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'wucifxvkxh6rbcdlvucrcm9h0deu7zf3fyx9b5n6eqayc7zjsbubdgqsnts5bxlcgp1kzkx02vwctstwodqwusdiswdl6lmbhw14traeesceb1cr4snd6o2oxt04jbq7uqi8u533c9v0w1oek5ytnidhex4vtics',
                flowComponent: 'ziimukbo4ne2qumsa6mb29omdfx3li7kw8ln448dinephrs9uvmp330lbyzi11c3fi5adoh26qs9hasq2651enbjfy9hk2ydtgh50qqz9npm7hcaspenk8i6eg9bcevkf8ma140mgmlf5hpxuq9jn9eidg9cbix0',
                flowInterfaceName: 'dzijk4841ah4cebue40pwjdjg1bm8uxiv3jf4cvzcihg52evjwonvexyfswm2297g2f66aaxyvkjw1bytv2adl54sjtvqttd1rr470ddq6fl0i38zxzd9v91y57oya28aebkx7luq44m1rhe2hfq6sqbw4dypll2',
                flowInterfaceNamespace: null,
                status: 'SUCCESS',
                detail: 'Consequuntur natus minima quia iusto. Repellendus magni corporis. Alias quas consectetur aspernatur. Doloribus unde modi eum et animi et tempore et ut.',
                example: '4dpvlemruwb8zt9etgcb45nzeg57ugq91feie61x977u5c9cq92r33h7ylumcizfs87h5y7xc2uxwqmu6vw2k7qq25x8hszegfk2cbitdyvt2xdu2z706n2089x53ao5cmvkdz2akypo4kwmqehp4ppf74t2ke61',
                startTimeAt: '2020-07-23 00:01:30',
                direction: 'INBOUND',
                errorCategory: 'j9onpynw9v9ddtiuaxk1jap9w75q4fg7qgog3mdg4yat77boo40h1w0bugc7vsruqxrcecfpzujp4ixagyey94f0kb763se1ga8elfvy4lwydd72budzbzcp4sxcttpts762b137j60x7et0flfibw9uqfwb8mtr',
                errorCode: '5eb3o1a8tg8vcjhfz5td',
                errorLabel: 700800,
                node: 5751757290,
                protocol: 'b84uewvgsbvgnhjbkd98',
                qualityOfService: '4h9i7y8shfe9tgf11qqk',
                receiverParty: 'udh6rbzmmj5fkomamhh7axe5pzroeiyg7c4yhkxwkf1dtibsa9nhyw2j5wjx3qazlazajsbz65rtjp33v34x1dx9fbm8kfxai92k28h5dg6pstfhzm4dqn3mmqx41vgyoarvh30nr0w5wxiaft73q79ga9risryi',
                receiverComponent: 'u5klxc59zt4ixrwv4kr0z17srhs3y0msjs9bmwm7v75nmtiathvgvazl3b7pfzhve7p7oqf1dvcs97n8wlfs0zccwdx6332jzm1x3wzab1xctsajpe853wrdstlbnizaeerb8hgzky3acrqar7vmgrgy110ad6l1',
                receiverInterface: 'e72ej63ohrhm0deyqmlkk21y8tngascmdxqp1bw11to41vjpw5uq3a1zoqhzshxrjk3d22ce6m6dgj5pb3subjx9lbm7jnbslqehkeuieko3xprilna4phcrnrb9tl7t74gvi7q3o4igzlstgjk2ypre1bebk3cj',
                receiverInterfaceNamespace: 'k55yftfzoi3ljunh2v00yxybau4sky5sta9l0lorh4virhcponvn0x0y67itlwk5bjq8z9zytrmlmgpakatdlyq32oo0lz2jpi3rv7nj21trb7kyg0yzjcxvhgf4c6pljxi5ze3fjr4a7kb4h5gw2zcyyaedowqs',
                retries: 8545640807,
                size: 9794863228,
                timesFailed: 9964954070,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'py7482lqo8tdq8t13lhkiy6mp43yo4pqlhf9pxzpx5vewlxjbl',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '4zsln5evug6vvocl20tw',
                scenario: 'u4fy3616n357s1zp5auko1ra3ckuf3mky4o3ont95wdm3mdqron7g4wiy1da',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 10:00:40',
                executionMonitoringStartAt: '2020-07-23 11:40:45',
                executionMonitoringEndAt: '2020-07-23 14:13:29',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'j6up6hlyxkud9pazy73w4hfd4njig2o8003478xy3y7v05jp7hizlf8gez0hvfsdsqn7nwz8ehraiq7jb8bb87l2qtd424qag5fz31zkeu5pllz9z0amenvw9x7wans44n0kkv7uusjr1ufp800lt2emh3h6wp65',
                flowComponent: 'yt4f7q4dbjazkiy7mw1ouuciq86g42f7hx6kjjkd69712ktp6taolypu4yj1c7pposi2461s3t78grk03zdx7zkbzfsuvbktgt6bsmcl3oqz9rck6rw0mvb744t9j6uryl6ukef3jxqji7kqaljtrutigdsvvt5r',
                flowInterfaceName: 'qibqczpw3qo59xgmkerfr5o2uwb7e2tt062ou7hppd49s0u58shluos0aw3kmd9q66an1ty8l62sngywkzyv386j0dj8e0m7wt47vondkwgygmjjotx21i0n4u0iyfxtanbpmp6umhpb91xtacgz9bd2bcgcupbe',
                
                status: 'TO_BE_DELIVERED',
                detail: 'Sit praesentium inventore saepe harum. Veniam placeat natus expedita qui praesentium quisquam excepturi magnam. Est similique asperiores voluptas sit laboriosam dolor omnis provident. Corrupti eaque voluptate ipsam.',
                example: '1cej9fjf312or0owcvkuxgac02onx6o8kndn8gt9v3nvfksfdqj74eea27m8vo574xcu17fayl7w3tu6lpvzcndt6pzio7brv3h1wcfle6t4tjihh6ya2p3jvnytivi400c960csywefscy2ofkgisbscju1qfrk',
                startTimeAt: '2020-07-23 03:37:35',
                direction: 'OUTBOUND',
                errorCategory: 'qsw9fbc0pmk0le6lqujyekvgze09kbk8c244k9omq2nj4g3pv5qdbc2rbia3ebyw409nvdol5i1075y5xpabwn1kyt3040m45bl112z4qh0pvm1c55m4omdp5uvmygyd33n5u2lz0jq7zyioca31k3sub38agt7q',
                errorCode: 'dd8xzwgbhq93g1jmy8bz',
                errorLabel: 915711,
                node: 6274328244,
                protocol: 'kce50b07xrfygzhnciiz',
                qualityOfService: 'ggx6mhsz2ibwq49s5nng',
                receiverParty: '3glrmhe63vyww5yxjm2vujol602prc4jdgmc7c14a20s2ypmugpb3jm2t0qqzaushau0jte325yorcca3ejztnum1ttub0abd2w1e3pke53mgnwag0dtqz85g5ks78jyzm03630xhbr722r0jkjahul50eeb61uu',
                receiverComponent: '4y8q7rxznaaizb0xnijejx2gek2pquwkzn73ijp9z03pn4dao7j9omgq119vz5rfr4z7mfd64uh4c5y2gdp30euan4jvbqaxszftfldfkp1oylx8yykxegvgc12iog2l09xdqg9vn3mpue3ta92b0jbgrrpc2lhy',
                receiverInterface: 'c0qscgzesj5hdnhutibr6x4ee8t5wu2x3zhyp1p9ltq59se44i32gwrd40ze0ca6zjj0fbzfmkc7hum1p7ruveinxnv7720lnwo6gjfbwyt3b867hmmfk3psrvm1x8p9zzv6y2983t6ldh683iq2qhf2u3j34ahx',
                receiverInterfaceNamespace: '5nl6eup0rsdqfy09rdq8h66256oraa8mijvx4abub5oahwfxjbt35hm6b8fdepjsrslcp7rkf3242ufp6bc15hgdxq8g701urfpm2hsnja2t46pi2t7twvecid7w8qbzawlmdf64ilpiosc8zw2oh7wp1zkoee2s',
                retries: 5525042170,
                size: 3543929736,
                timesFailed: 7310838143,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'ok1bqbcj5jquwwoxdpjvsop9eiv7rwrdlhri1a978jow2ytb00',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'tz3r7tmnrek58i6l07hf',
                scenario: 'hhnrg7zg56sbi1s09mtxine1m4n7hl00xsgyzy4j98g4e42td37vn5vi9cbe',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:41:06',
                executionMonitoringStartAt: '2020-07-23 13:31:20',
                executionMonitoringEndAt: '2020-07-22 19:53:20',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'txfuxgsimeix62f90bv3mgejuxja7fd5hw3dj3sebkzs98ejjofhvcsexfxrhqerpuuxo7fgj1jsa1uhpdks4j7my7zzgdqhgymv9dd0moft6qumjk70sgss8irkcczrgit95ygcc81ta9181evdnwfj58vgcarq',
                flowComponent: 'et8dqow02uugwhqhc8kq8tovrlaftfrj79yifajitzvamesdsipg6xcgk6cj6v1dhigu24g6iejxmmyj7lqhd7y8iz5ygyyv62nn5xd03e6jbwnuf5fdm7r00w34wgmmqvsqrnkdsviwsdjtquojtpad4jr40x9i',
                flowInterfaceName: '98zccc4ntxb7xxfjjb64etifhos5kgb8bmd3gowqw581gll5l42in8b54c5qjejhepqbvwbtbqn2wxk3xwxk16rqm7qyw9wfrpvmkdwsnjp32v43okpl8bgco87ilumzdvjnugwefxj9hxwdp53fw1qrrwuwg981',
                flowInterfaceNamespace: 'ok0ze6tg3qcrxuzmvvigtg9tb9qnhgcapjgdy3pwr1ddecxuaa6cayotxa1p1fbt2y5tvyjnuytq3lvrpchnbolunfodsoj4kp5ea920netepfulmxsqcy51cns4nz8xxf1zn3a6achphlyj5ml5ofxd9jbvmwde',
                status: null,
                detail: 'Rem sit et. Odit alias aut unde ut amet soluta ut mollitia. Eum sit aut. Nihil esse voluptas sint.',
                example: 'mx899fi2kpnl7gfonmyf9fn6eq8iu09z0iyoqejfhby6n0vsfnhym2t2234ekkfodrfls963g2r9ln9sneoywizv56tb136c3vaug32hchxcp4nh0ti2tuj83y0g6krvb97erxaks9r2z9niiivj132blogyr0o2',
                startTimeAt: '2020-07-23 11:32:54',
                direction: 'INBOUND',
                errorCategory: 'tahuopfysjjlrtvwo90vzsoirivrerxcqp9fntiziuwscclaqiuguyugpr5bplt7ccje2hpta2ao75e6z0gvdprihp7absz9n5ozqq9dc4ur39pb4rwbf26uphqsgvekhkwqhr03h4sd8vihi005t2fnm6q4w75x',
                errorCode: 'yg11x4y7a54ootcw499d',
                errorLabel: 800185,
                node: 2797171469,
                protocol: '7pc7m29o4rmo46ywd40w',
                qualityOfService: 'lpj4pow3n0bd6tsa3bx9',
                receiverParty: 'he6cpcjkpehg8eyqbzzp80b7stmd19o39zxw4euwc9kji1ivvtbpbrub197zywwxyj4dspu3vlb51covg55xvbejtzn5ru9p3bcrbasvufie76jxlqyxgxsa3vo03pfb10oewkg0ls8ssf62rg61ksqs45ycyzvs',
                receiverComponent: '12uetkx7rte1g9ef63j3bj9bnrl50lm9sz9131c8w54i3uic94apjrglrye8yuyhu695zqlai1amg7qlh5u63ao4ari4emq1uzcykynyim0oluouppwhra2216noph23hq6vheneozy7amorrfpyslgzg1zz6gv8',
                receiverInterface: 'nnzairdhuf8cn93ok9522yan9g599xbed6fs5hhmjyr2egz7g851en54h1bofmimrayiwnnnwzr7cgww01n97ln92iousgbnhdgugyp2rrl03rij0srrwkenrp47y0jayjrbp87fp9yx335ckeft4yw7lnonw596',
                receiverInterfaceNamespace: 'kxahdljjn6k8tdrdzzu3zzchz58727z6o476sx08dvj6p7venztbglcpsn4kb15qilmgkdul056gptlsni2ve49axpfjlcgfvebyatr62zee2e31sdpzojie89ahl0xwiichhijfrtq1zf7coxvbfo1o8kcadj3g',
                retries: 8401344580,
                size: 4779831749,
                timesFailed: 9567106798,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'jibhcczei34x8sguk7938fr8bfyv06rs6id1c93dkzv01w5946',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '65gmryy6fev6y2wx2hpt',
                scenario: 'ederv6x85nhe6etmrm7lf5ow4pe1b5vbwy70cw4c7x0dcagxjn56tdi6akwf',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:07:11',
                executionMonitoringStartAt: '2020-07-23 03:41:02',
                executionMonitoringEndAt: '2020-07-22 21:06:00',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'sp00lhaqgnqbfyiuzm33spudaw6mgdsvgputoh30anx4qy7ykrpvhs3wfmev1sgwuquh5g6q3rbpqws59vwgq4a8t5hpk7qnbf69l6phlffiov5zwnamtaftx4yzrsri50x38uund02cqmuinl0u9ulsbnfm2jah',
                flowComponent: 'nfksedrvsehqz1qkagyyacd4tmgulq615nmvrq9y3q5kse7e5kpzw5l5i8z8bc82crkky5h3mlraqwn0kldixv5xl8bi3lqgz0uaic5qc1vdjnyozw95wyn242ugm9qmlr8dsb4cxjfy95raj8lhhjh97y9uzsx9',
                flowInterfaceName: '85kxaerd7gs2s3l1oc7bqa792xa36ndh5rdckaie5676b0v1entnz3uc75lgvf98s4zwehn1qd7txin8k113avljmxx15izbc0nutu2vr05xiqd7qn26e88y18r1lf4jagcaueiw1l5tqnjto2egt1ol613cl3g1',
                flowInterfaceNamespace: 'i7jzfziimza897yu4hi9iuild6f93a0r2xcthn22pruyhml4jmmr5ex30nkckcsmnfvo8n9go1b8z7iffeki9txyjsv4cwo281oanoqsoj0r81c1xyupiqwmxs7nosvf6b15b0wfmfu9rmas9o35zoq88wutxk6l',
                
                detail: 'Harum in voluptates rerum fugit praesentium dolorem aliquid eligendi quod. Modi vel corrupti fugit eos. Nam minima facere unde debitis molestiae.',
                example: 'psf4l0d17qu743fq31m5yosym6kqk101wb21t2hxktv12z66k1gx4hzt48nh61p9cl5jo3nuz3sxy6hxqxznx85qt1ux6rc49q9ns35bdv52yfxbpxks5yh61ofw6hkwq86fg1hvufcp6ql3wpmo6jy5y2wbbxhh',
                startTimeAt: '2020-07-23 00:08:01',
                direction: 'OUTBOUND',
                errorCategory: 'urvemlz2wytghc5o7zaps8rbeqhcy3yccvm2ywjbmxk07a3x8wz94lbqlh23qpbpd8hjyue9gvshu2f7objykdsoxrub3i6oyc4xbm4vwulvbi5ji2r4sdjflcywxoqz5178qgdqb3b1q5nkmmwxuy221zkde8d2',
                errorCode: 'nrqf4mslv6s4zwlmdpdr',
                errorLabel: 533757,
                node: 3541134363,
                protocol: 'y3s4cxagohz2mqiccza2',
                qualityOfService: '5n66jahep57s5rv8zt81',
                receiverParty: 'ce7e2tmh5y3gxk0qa73ct62rk4hbkg8gxp6mm42rtokuqk6nu7xatvmzp4vtt32mbxilz9d28zwhv9z0y0mhj6fxs892o0cqw4ic0o8reoy13w1xrgsvq4lh2gurzleye7t4aia7zzpa42dbcqzv1lsanladi0mb',
                receiverComponent: 'c311tbqru909k1cmj5vbblny7qnp3tgzc33myvkbr6paj3794q0rsm18tgw62zo37rixmdgwm6m9ilzeojbw85841z3eg4bjehdqb93p5m35znu1mea7ue7d0xssgtsk2smxglah8m9mv1oe5kxvvupirhnbnnp7',
                receiverInterface: 'hp1eu4cxvu3qtjsuwgriaf5smmwpojyqmrzide14dz351mcpv7qoevhm2145et1won0vgh86jxx039zc1f64bjifdhriwqh20dy4kdlc5dz4bpampbyhbh1gliaxh8890z6jnmavuns6usxd4oz5a5qmwgxeka4p',
                receiverInterfaceNamespace: 'oclr6wj2fvudr1j09mnz6x5mr0nhz5thebwd80al3smb2w9i42ld5vd8yz0p5tlesms2pl6x0fp4gww8tjcqp50qzekp1uzsgkwj6n33h7bf7agxiacbrr5ez25p9l0gn31oxbhv7sbextowc8hr9pahg6qdmx2z',
                retries: 1720889972,
                size: 6164958029,
                timesFailed: 9107953477,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'ih7iiqb8vcc8aq9u0oqjg0evpwe38jm2qh22w70zcb5kleq8n2',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'kk4ifxh99944xmt44itp',
                scenario: 'z3869tes61a20lmade685q4ipb74lazdxiz5bzxtah2f35je3xpsjcntqtgd',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 19:02:16',
                executionMonitoringStartAt: '2020-07-22 23:30:53',
                executionMonitoringEndAt: '2020-07-22 18:54:06',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '93mwjmkok8nr0k0se65wthvuccyl4qqgdxsahla7fcubu7u9ra6ubmci1xtbibqcahn705st236ryexoogxk08ynzrzy5jinwqgt3ggiozbd9vzvlfwomrtk3d3gtxhupnyahqm3ewa445mn4bm4bte1hmm65y5i',
                flowComponent: 'cahdvoflxphtxit1ukb2o0m8eis9uughb4ckfldoktarf7ksoqu0wa0z92mtf5g8tsdw0bzauo2w9g11m28dcjnf9un2p54ixmypeqbgal8nhxjiikvl7nps838rw8uqgpzx246vnm6ree5i6nk7q7spody8jm6a',
                flowInterfaceName: 'ey6zjmpy2j0wbpba6yqhsg7axflvkjp1s33zfvplmtg7d12e7g1k7a80gqu8y87e193st54fza99fr90hy9t9a4zpywiwmtgwqzy542jlp6x8a5g53qj4jo2fp5u3w5jh8szt33axl6acjw244rqycqg350eb6ku',
                flowInterfaceNamespace: '0iq4yp5dy096gg9zvocsqu495r7azw4yxlumu6cezyjtp1u8ce8f7l4tkpxrobhqs20srd6idxj2yfgpl5he65mbnc99v2p9zrgsf79cru3g68dqihu4e9mgngr3y0huetc5jklb1z9ad7wkzk5vcu8x51kj1p79',
                status: 'DELIVERING',
                detail: 'Eaque totam autem nobis vero occaecati aut doloremque facere dolor. Beatae ipsum omnis officia est sunt qui consequuntur. Vero at et similique eius dolorum sed. Repellendus veniam voluptatem quam. Harum sit vel accusantium aut quo maxime sit. Fuga libero veniam quibusdam voluptates vel necessitatibus eos magni.',
                example: 'w0oio0sh6la8lgiqre2nqltkf97vo27zhyu3a2p5myuxoy9a8pzi4gyhp7g5kfns4dxgiqnzrfoc4rcp08epvjk1npuhhpgdce6v45uz3tpuvg0ciuwusk7z14ibotocf9pqee0xsp2mzzycncegtkefmh2xbbee',
                startTimeAt: '2020-07-23 10:32:27',
                direction: null,
                errorCategory: 'i4ycctjxtx9o4ho5qf3ie20fvgpculgp2qw2kj22h285r61cyqf7q4nqo2b20yt0qguwepebtd84lfaxtvcvjbx0hrjs9zcvxwv0m8gj42xfg7d15nkbj1pod2qnj70iwcujjf9pphhk7f44wanx2hxa55o67r58',
                errorCode: 'dbz891wo4hjr99fh0fv4',
                errorLabel: 993710,
                node: 8522296025,
                protocol: 'we6snyz04j13umcxgbx6',
                qualityOfService: 'pkjz7hmw9lacj5cof4w2',
                receiverParty: '3ghqle1qsh8rs0fxlmk2bbzkbzb2sprkud9v429lteefrsu56i90pgddln8ob3o92f0u7yhlmh04q7ruuzpbzht8bor58vqz6nyqxqz40bf97odlm2q4fd2y1xiyytpvgz1ry2wqze61htdwg7eg00j7gqy6q4w0',
                receiverComponent: 'tiinhjk9q095xwol9vm6hi7q83pnyao3joopsvn304qiqxjfqlcqyjerosruthveim6zqgovzzij7f09b7itp74e60hvrb08awdsauevtp1d7vkxkn0i0utezjzz29qwj4zkqv2yy7phto1p9c3tajbk7xg6qegn',
                receiverInterface: 'co3amvmut54mqb2m17em7bp400jwxrj3ett6peuke6ztg24uch8mq4pluowaez6hemzw82nkpthe18pdwx6054mc003xvcj4blpi4xrsx6z3oz0ivw0oplb8f9cplflo29exsyvldetavdkaevrqh2bfakxhtie9',
                receiverInterfaceNamespace: 'wwnrfv27hwg7km2v4lndy1jl27x1xa7at66d62hbihfz8tcc3u9g6cfc6n4m6im1zzzlxrw0e8350j4q6zyay5jxwitoiozickm87pnxm59r4gl6w2sri49imsnerrhw1gkfai5o05n5sdeapwtsv84ptrpz213g',
                retries: 8625623172,
                size: 5368656991,
                timesFailed: 5338437541,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'guyc2yemdcw7y6c7ysyc98fvt363xgl6mwyjo8kuxq9kk3q2p2',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '3bs1xorr99t455sno757',
                scenario: 'z2g9sz6xltaddwatmzw4y6n35bdxpttbb70yglc8udtwg33ybnhqxinxgfnf',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 09:05:36',
                executionMonitoringStartAt: '2020-07-22 19:37:40',
                executionMonitoringEndAt: '2020-07-23 18:08:24',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'qilqv53bg2256g1m9o1e07bax2yb131frqpwqepc8m1knb16qrfhu3yhz6cqudsnupuendul6d0l28n3moxwuh3x7dknzrhda5yc4n0wpdw3kcrtpdjyy95p6n7hwth82x9gw05m9odxyzg767kmccxkn4z5g6xa',
                flowComponent: 'nxfnhylpp67mwjp2j5y8zoj16qjm9a9i3lu6qornr72upcz64ovjh519talfpnwnmx9zrv7kh777wt6jtsdtazr4swt5hpjrc7gcj4qa6ixdxntk0v5szdxwafinhywf2v38hhhd3mmi6zgqynlhii5lz5e7amd6',
                flowInterfaceName: 'z3jztqhz4w590blis74ml6xmulrlarp54m7f8kukl9re6n60lt60bt0vvnthmh904tnmj7vwteycicy0cc3hkqcb7ydx84cnzethhntf8slvcfe1ss32syv96gup5c4u5yvq7j8y1pmkxbojajttcu6jrcgdsqme',
                flowInterfaceNamespace: 'ocs8ora5ql25jhmggvhowp5dt36rbr2camtklmk6h73jpxbqtljjcaineaq4h9e33bta0odjd9iot734d5bzx61rdcw42luxrkn8zb4be8zmxzrpogo0hp6dvxczl9m2v7imkwo8bnrdsnzhdqbxilxkastol0sx',
                status: 'DELIVERING',
                detail: 'Libero eum similique. Voluptatem sit aut quas occaecati. Possimus sit quia hic adipisci magnam. Et neque quidem nisi eligendi recusandae ea adipisci iusto. Non voluptas nihil eos totam corporis iure veniam. Inventore suscipit ducimus voluptatum vero aut quod ad et.',
                example: '7s3tvnxagh059z2ljg56bw2a2fumcopg19bisnf6i0a51a5xsxnd32ws2h1gzeqkja0j0d1qktxv7zsbj3oarthej375lh3q9iig3o5isot9603x8684il2muaxutzf182ac0sb8yzftxtofjpub16cta9lq7vti',
                startTimeAt: '2020-07-23 00:52:57',
                
                errorCategory: 'jpkiznwx9ggzg77tjlq9w2rgdexo7r3bnoesn1bjmb7gabkjglbepcc6bop077jug70ghelbhdrxowljtvle3sqpwi4cwd1ef24hapu7tcv272gp6ulbcb6tqtnt80z5fxzm7bl26tbtjjpv7xjtx1db0zf0a180',
                errorCode: 'igysrkrsqo3r8vaa1pv6',
                errorLabel: 863874,
                node: 2981586029,
                protocol: 'vejf3ufbw6jrkwl7ebw5',
                qualityOfService: 'ig161u1gupl752h6v2yd',
                receiverParty: '7gz2pam3ir8fhgxy4biolpkxlgmnvtp8tj9np905yo4rj6mnmq12r9zz0r3hysuu39oy1vckf6lncenh6aaa49io08g4va03jpa2re0k5dkqtd7okvsnp2i51udhrvqq4c4pp2ibbdnidkaqxbo1ljqspx2o1bek',
                receiverComponent: 'tuase20ppebo4fc6j8v82eftpmqp79w3l9l6rxckem31ktw5e1d7snv335f21ifljupr9f2n60rosi6xljimhhk5u3gmxv7xa1ik25lohhq16hl4r24fyh4mm0k79a5u0p3vxm6cpi13vwkxo9djln69f7vq65aw',
                receiverInterface: 'mdzabho85njknt2loi9uw7ms5bh3ge2717yqvqtx5mtwhu133qq1ma8y7qgljc8oj3g6ohjepdlw7szigcqum83jjl36mh30gsuk1dge6cccz6l5x3ihvvkonfurd3z4jzblpmuowh4cgft7lqjwmzwb7k8y1uhe',
                receiverInterfaceNamespace: '1y4byrju68q1qwwff1ti2tzarmbzarm6r7cwq4rsdof7kk0noajdf0384dzh0v6ybclte7qcg0pug6176rnv4f2vm8il2bdbbv4afv1d90znvxfpq37ruvfhceu7cxnmkxtkiwxzyfyu2vt7ehky5pqk74s4wgb7',
                retries: 6791137076,
                size: 4759267954,
                timesFailed: 3386129137,
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
                id: 'x971r0vld0ps2pxcjmbv8digw8fs8bbx2g95a',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'yymh4m103ie955yyfew39k2rdwewjq76j84dn0306wnziqxd16',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'e6jwi066e6iqzsgkfcku',
                scenario: 'trx9evidwvywjgfytf8l9e7afhd4ma4nsdaugb4ikeltoummd9b205c3op09',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 01:26:26',
                executionMonitoringStartAt: '2020-07-22 20:17:25',
                executionMonitoringEndAt: '2020-07-23 11:34:33',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'f4kxm6vto98inb5xy399b8g6b5b5z43lrrkh9z6ddthzlscwyw7nmd0zpjnqne4kty1d5laysnok0dwsml49qclyj2g8g2n2nkrp6wy2xqbvc4vlkrx26dahucj9f3ezh7aqbxrexbsbgwj9oiv3vr59o7sxtcd5',
                flowComponent: 'sapygppqt4c4pi4ms07k9jn4lmssxg3csjefkwp1y82yxommz64cu5qrrxdca2ad8m11vex6py8tgkv7h7wiq56fmi7pu5sbhf1gfjlq6wg84a8d0gicpb8mygmzjngjvt4vtjv3pnaxtk58y7brj2qsfyn6ddqx',
                flowInterfaceName: 'ci3ap4ei5ba0ypwvf32e2tii1dx0crg3kbwjnyoaarpozs4pv03tzc0z8d7ykrbf27utxuotznkq9nhk8yc2xvufetalnzar9rto1hip8rn2s3lcs6uuxfyj3i41wocq8l6mw4x51nc0r03shadr19lfmotzojeb',
                flowInterfaceNamespace: 'qorf4rttar50geg5qlhyh09vfubnhymi4e66mwvkav9b6dvo83rnbjw8i4jrtrkihnpu6aapr4jshdwerfkhpuo9bj8m1zffgdj7t9exg1llhv0bs7dsapw1j2efplgw2wui9ci0xk5xhqznqids58b6j1lu04th',
                status: 'DELIVERING',
                detail: 'Qui velit iure qui quibusdam delectus eaque. Ut totam quo. Nostrum quae doloremque qui et ut porro est sint vitae. Dolores ullam omnis tempore doloribus assumenda qui. Quia unde voluptatum nemo qui minima.',
                example: '086b6vq50agysjbseq0zzw36x591dzp1cuhijq3akyclkxo7ephkdrhgim73yrzmzeu4vc3zhp67wsxe3kqm19039i2s5s1yxnbnll4lsmoe30bx3cp4g4cz0h6bxieeabjv7n9bh6mhj6qz1qqrsm2zv5u0a0f8',
                startTimeAt: '2020-07-23 10:34:23',
                direction: 'OUTBOUND',
                errorCategory: '7arso4o938s5z0pczs9tmdn7f3ytu6eyr6zovqiqwxede3aktzzncsh4klq97kiwifx0ivtm08jml3cgmcgderdgpqhrxamzcfpkx6q2dln246fc4mztiklv7gjjsk12rxkgig91rw6e6xhjmusjhq6wkycln79p',
                errorCode: '0rzdleva4xys23xn3dmx',
                errorLabel: 361482,
                node: 2209240532,
                protocol: 'cwnyj72ooqxj95vdclog',
                qualityOfService: '7114nm0lhnp40ldm3r9c',
                receiverParty: 'akks40ukt1qerrbsju3t24jhpfol9sl4akbtaem0acjjpm4rqwmrzv6dv2z0n4f7nc8zolkknxdlsdkemhw0jn182ph8b35s5vvoya54nfctl8etorp40ncsdnm6p3mcyg4tmfsh8rqkv1p01tfwkwv6u2y675zt',
                receiverComponent: 'cbhcotyclz2w58e0ooko3z3uqkafcaeoki8q6msn49a6e9b80x5zyav21lrgwi90cl2xstd6cdwxk7r9j621868ugasleu3kiil4v2tzbdqeey2ubcmj27obeenj5lgq4p0bdd0h0tq1igj9qry92rg2lvtn6fs3',
                receiverInterface: 'wsygbrkt6ohoyrl7npck14akigwpfx3e3bwlzirgm8sk8kswulomn4tw4a4sdhrcd51kcas12hdq9w6yp3sr8jaxn62ybaqdu9ckmxn4dvcjor6wxffv8ql1lyr5htx6fuirucj1pl0wt9caa9rqae1i0mykqefr',
                receiverInterfaceNamespace: 'la053tmzs487q6zcd4tva6qar0yu27ujcugx5h1mxq934t55gyp8hk6w4wq84gtk3ngq493iekt4oow29xv87gy128jptsczgplqb1a5l6v8udqsgyto2vkw6ezbrdcitaw4jfnkwoavumt7elod1gzxhdzdonfb',
                retries: 2873436484,
                size: 8610574756,
                timesFailed: 3734087903,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: 'kqgxs78rzzrpkf2kqobn3adh7q09jx86gyq81',
                tenantCode: 'l7izhi6rwl4gnz2a854oawq1gci1hbqd5pvqiinmb82pamdaeh',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '0mdujt8tmis7ealox3oe',
                scenario: 'uft3pqls2rwv6hdm7vlfwr3kolcfjepijwj9463zk61yqy6t2ae23ybdx88d',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 01:05:49',
                executionMonitoringStartAt: '2020-07-23 08:42:23',
                executionMonitoringEndAt: '2020-07-23 04:19:11',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'h9bs9f561dn7ewlu3doce6pfasyutak8v4dnqeppvsvgd3u14lpveq8tps8sh006m59v8gkbm5ygie46j2541uwebsofw7bfeiu52yuqwr6hnhxqa4lu521fwstmshrcauhrfgc1ljvkz8xawbm0g8trld97qrov',
                flowComponent: 'mxot1lasz6z9l030nx7molsvp65yuizpr87ejn9xgs1973bt571e5159w4vukcvis2vw8dp3ujn709gftribgx2yof2764uephjj0hojdexjwrhfhygyadkf7a20ao433423mcaw4cqtaa0v0pewcgeuw3nt6s4b',
                flowInterfaceName: 'rxi0oapeo3myl0hr4s2mlxfxzw1kum8e0aj1ygb5699h8hld6c8j3xr3n26924fvid3ieasurkn6axl5qvebuis35777bxnwg34t4c54lx090z3xjlmtcr68zz2la6bhxvrhx0p7l81otf1tskjx5ov9eoq3tech',
                flowInterfaceNamespace: '7qioj6p5o0o0wxf6nk2e0vdjvyh8v3xewqqvscihaqy29ovf8hmbaxjn74duj8tt5mhovavkxjs1gvnhvadyghyx7qbfh90luti8f9c5iykjqfvtfvhpg1ifoj5vj11jecgam99r8e7atznti75jljimsfcioiym',
                status: 'SUCCESS',
                detail: 'Quidem libero perspiciatis. Sed ex omnis. Autem aut at assumenda assumenda dolores ea. Nemo corrupti quia sint omnis ea dolore. Et repellendus maxime quam ut doloribus voluptas consequatur exercitationem consectetur.',
                example: 'dlxhmuiwtwbbdj3e4ae9e58ek9gjy8bajjxrlhkvtqld27er0a6yo9qeysb2lma1pszy5fj0de7uwyicroieg8f2ij77bp17155wn3k8gitxdk3dllbo19l30k1q88pv3jljit9g9y2gxf7zow2y6q31cg2lmgmt',
                startTimeAt: '2020-07-23 11:43:25',
                direction: 'INBOUND',
                errorCategory: 'tgj5ls0z7f9xk8l35sqv2ba0b90gdw1vo5fqzmucx4veqo6xof8iy42v50zmc80ko5hp3em25n8c3kqa3v1qs9o3kl2l3gjp1e6jfgxbop8aq31c0quhdbt2ekcl88b3axze26s8phqoby3wn9t2h8cdad4etsgw',
                errorCode: 'qplzx1h1weupbf93z7s4',
                errorLabel: 699255,
                node: 8779113412,
                protocol: 'pra3sy5sogxprmk2n865',
                qualityOfService: 'utb26c676nwcbjezb5am',
                receiverParty: '0pbpl2zdbfhoer9b0hi54m5v8rik4pzzmvkzgwzl9wciew25m95y6zdyqvwl4hmcweyv1oxyl7xbmfjgim8o3xgncuu0vkia7tqrjk1jteuy817s18s3oxlmg7ji7guhwdegtcqjh1eet5si48ue1yse4epl5hxz',
                receiverComponent: '6sysfwe44lgyz1xtuxjiy96f6exm12yqedd4eckflm4a91gl5r6mzntq1fh63zknid8hf4t3heoyhuyc14qnb0jvk0lp3hgwfd4ivz42lfbev00gvqh6cih19we05piduiqovyo87tnjayrxnb5cz5sk7ay70dos',
                receiverInterface: '73jlxc0v74lki36mct6prj79g8rrq01u92g9rdrioq1cmbaz7igo31a25unaz4li4orofnhbiqc005y7p0hifsa2u7dqrvblclzboobujet9oezmjlqfr1p1wom85l2aaf8svfy7rlm5zngufbelpwi2wv9e84k4',
                receiverInterfaceNamespace: 'hfwyasstbeuzr1kl6s6vpaxf3jl2yeougbex9unn3jtd5yhsd20pvrmju1efyxy3j9vqhc89z9dlasv6uwt14nwhqklngcrnv50jb4xu50aq6qeuxpju30mhd8ih2tzc5f6l7mly58j8qee0vd7b9sdzmgu1lbxi',
                retries: 6111462008,
                size: 5523513101,
                timesFailed: 6807909174,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'egwcvcr4rotbgo8sfs32mq54dog33ir1houyd8ldz9zr53rcc1',
                systemId: 'hxalc1jn7rrwip3skdvl7tt0jd46xknzqru9h',
                systemName: 'euzjk84zjsrji6n54uc5',
                scenario: '3xi77pef7ev2o4hwm3j627ywdtu674e9ov52jm1tw60t4eqm023852ylpqo7',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:52:33',
                executionMonitoringStartAt: '2020-07-23 03:45:10',
                executionMonitoringEndAt: '2020-07-23 01:02:42',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'tki6oavd7zu0i8idb47hmogljeg1k5v3fv5pkf4mndo9c8zeil11hu9qgap787ekj3fsk6ndtkixrkpl4l42gsxfrtmh5j71y4p9816svwiy0m5w8554570zrxt36aj0m7fn38scg8sil0zooqwsi8mjxtwzkuco',
                flowComponent: 'g187miv6hubarofxzftwxgqd90hn9j7pmqj4rkw8ij1g8grdmf497cf5513o8289xryy7qj6iq3lzanjkxplx3jruonsaz2opwltibutk1ejey9o0ub08s2mp60c4jurh3g2789fe48i9rc005v4nh3rp5vbk8dp',
                flowInterfaceName: '1kfdmjlj4qfy8fdjm5qs375zeb3n4cha2nem9upjo4qhldxpnq2fq37u7cyyru2gamp5hdeqk3wwja8f2q94g3e29mo0jenbp7jhymucdf5lj9ch3bfopwad5e1lkp3bgfu9ke37o8cl6mc9l16hbr179lrrypsl',
                flowInterfaceNamespace: '9io2smsds2xir7j8vauyoqywpyove0mspkkbpwpwv7c2jg7u1qqzu4gykhynjduv5sfrd6vrdkjiqumerbb2pxs8iow5a1gpiw0bai95k0dj005zgr9irnhbrxfo7rlb9f4l1cgdpym8ogqdzzvkli9r6fnicjj2',
                status: 'ERROR',
                detail: 'Commodi nostrum consequatur pariatur velit aut rerum corporis placeat at. Est consectetur id illum est quia rerum ut. Ut est laudantium eos at et.',
                example: 'fhteyh0tffbmkpm2ruobhw0bc5zk95e4960ms1anfci8jvnf030dcj5wdbih1gyeg2cwhbonizu9yet8r3u4hbtoveshyam0r3me3dcyzxxtr9h012jdj0fmt9xuznhav5d9ruc8dx9o3tv7s0m7cz2oi039npxg',
                startTimeAt: '2020-07-23 07:09:06',
                direction: 'OUTBOUND',
                errorCategory: 'v16lzk6lzfe01zoliah0p6y2eb9f3q8zb2xzphzdt9sadrgy8hcl1m9u5enue89vacbwoo0rs8x7zsavvzzk5anyy9pujtjubm3e3e7z29ecgxy00xq1gx30cr4ypnihdhhwsvl7wad46kgrzze1ra68vxmbnvzb',
                errorCode: 'edwy82rgt648wie3lv0o',
                errorLabel: 479017,
                node: 9520591039,
                protocol: '0ry41mrvbz43qze1h6s8',
                qualityOfService: '4d3y4txr8n4kdirgzg2a',
                receiverParty: 'x3ivn17mzywmj8200xp0zt6856zgp3lm5nop5nd3czfer1826wu257sws3blcm9ptqm3qjtf9fn9abmqmqmbu03unkeamksdknp23yo4nf5ec8yxo5zynz0b5zskw4ils9iz7i8flm2re9loru5qw784ik2dtchf',
                receiverComponent: '7n2m4bj3haeq5cmy27pvhov8figcylwwagw6q42zqybedd4d63ijiif63tu7x23sm0vyyoh27d9vkiujjoq98p465mydpkrtop92vqxmjhd3kqnwyz1wxdoi4sgwix8za84kjuok7zedgt6u8qho5fcctpbxvp7i',
                receiverInterface: 'hy4rez6cxzibau08n7l1pnccjmt5qqe1igndpv6kyc0zk9wvv3qvjapjx4a2yrebfq16jjbhylmic8hw81m88ld0v3lh7fmfm7trop1wn4qyuxkue2ogdujng1dv69epilej77r46uszle4gwn6efelqeic7jmik',
                receiverInterfaceNamespace: 'zkfrx80onk8i8wzrib211bf1ru3jhgxl8iguy9af7v7yhskvsyaffvyz2x0jorf99jx8qr4dk8r31nymv5kng5amdbxkpl9jafyxb8iix0eawbav88j1q49qcjpqfppy6db5kgt8jcyazrawz35j8hwhwu5v45eo',
                retries: 9824403699,
                size: 9904743979,
                timesFailed: 9346508653,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'vqmt6fc7xa67qv47lgu89jz0z1xlf9zjmnjb8se3tatnpujkso',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'm7aa0t7809eok3py6nil',
                scenario: 'ajwkfkcl94212irz2m3obeq669kely2sq83jf7qhtjtf0nfzznqe69nvi5q0',
                executionId: 'qpl5q2feut02yln3fb3uiwfpx4kzff4kl3esn',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 00:03:42',
                executionMonitoringStartAt: '2020-07-23 06:21:16',
                executionMonitoringEndAt: '2020-07-23 08:34:01',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'i3m8h2vus3gjg9n53aaahs0vevlmt00fhfkh1ejdmxpkv4wrtf6dtvx5k711g99ly5odtnxy7ptipgs4nq7i6qw45x2jpgyihnfpcbxziwbxaz3v3vh8ule3k7ej1awsvzbdsad2iz3pwaeuzy9q3hhdq8p1r4ci',
                flowComponent: '3ffunnzzw23jopim58qj3hz55hsux4qrdy19gpjkf3o7d4ubvu4qtzumbhqwy23c26sj8xc86zrhr1g3cpksstqoz4yv5vdhkt5db84m7n2zypxbwm6d7xxct8j42k3ej9i6hxbhucm47v6fi7k1to1a2g0iesnj',
                flowInterfaceName: 'noa3umvhb6lyn0dbxl6kipcp80jthh30qk1gozzcgpdimn3gpnjml8p412o8toaxuvz7qngflp4awgirpd4hgweml13rq8wug3b1yloixdmq5yvdwek84wwldv5rfgu2ralvqqsab992o0r9jt5shtp3i3cvp7wr',
                flowInterfaceNamespace: 'm0qtosssmqxktd9yzob0k6pn8lw69xbn1xm9vzuabem3aeyi9zq42adnokvy7s18g0cyxw2l9agjheotja0r24t2cw1yvd2zpswzt05iz5w6zr1ogwp5h0axadlxnzuur04z1y1pq4sgdsjl6f2xofmfll2u61pn',
                status: 'HOLDING',
                detail: 'Ut voluptatem nihil occaecati soluta omnis accusantium dignissimos. Odit voluptatem pariatur. Tempore occaecati esse labore itaque nisi.',
                example: 'd4jt9ydkqne9vmblv6f45ipyi1kez89mnedewyrfssflot1qzxgz9tafsi891ckxfz02iz5yssds1ajsqc569cbjc2yd7xa75lau5w71txfrbrn8gjvkip324y7wa9hmv18kgs4j6ea2qdrqjqpg388you4mhavz',
                startTimeAt: '2020-07-23 11:05:28',
                direction: 'INBOUND',
                errorCategory: '9v7jpqi8rmy1o9bohmefiamkui4baf5tkihl0uatd736916p7994xrq2cq7gw93s6308seqsku670tjw4evyyi3e08egk72z5akg5g1n6ih0wm22yl2wewtjszvl6qhv4jivodrumr06rz7j9kviu3o8ouicpr0t',
                errorCode: 'e6fqyahcxousveluwgza',
                errorLabel: 815261,
                node: 8885132952,
                protocol: 't11zfsc8drlirvalvhyr',
                qualityOfService: 'wicmjfytzelkqj0kcvkz',
                receiverParty: '1fg0mk5ef60gpd2wuohsd39usfn64riwgsforsb0zs0efb9xxuone8kwhbwd11jmkkmlhzv39xgc51zygif5uk32ta570tmw6ih3jjhm96j8j0jy7ue5ergdpah906pzq5zi812yjciacqj6tc7orljreupfdxld',
                receiverComponent: 'ixe8az8inwc1ghf3bdrcr15xex97jpo640jcskczupd0eswll5w1zbvlzs560et0km66iw01khk0wnzgjvylz97053zg1n9k04ezrkrlgjtsldzf0zvs6ny5qtq6kqzepv04jv7fj5zce9k17y6yjiqarswt3b5h',
                receiverInterface: 'qi3ty2gemg5oaev1ae8ebdn3bwh00yrl00gkc6uo53jvr8vc3m33vrcjdww13q1vmzq48xem02490b1hpmmnw7nm8yy26w6zl1owqz7q10jqrw9al252n1v6pqm9zln8r3kh5mkc5bvmn323xsfg4lrd932pra7p',
                receiverInterfaceNamespace: '74m1hghpdzlilu29oape7odbc64iu6aaumrht4n8le9p93xcsdo7uc2iqgu15n0ufi91nqg30xdokhvv5ivjntkeae3c62ipa4ivyup2w547yooxmqhdc2zo66az3h2c35caarn67hn5b4fnohhqca5hutz770ed',
                retries: 4493631905,
                size: 2329349765,
                timesFailed: 2313110173,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'd7usamlsybl3pa3tfw7op2ujlae5rlm1szsjc9h5ysl4263f94',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '7sr4fm4y891i9zpge1dc',
                scenario: 'tf4rn25b26kgforv038zgla1kn6s4ezisa1n1ouf64lmfeftqcl6ji5d27a5',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 17:08:23',
                executionMonitoringStartAt: '2020-07-23 05:56:01',
                executionMonitoringEndAt: '2020-07-23 17:57:39',
                flowId: '5th9musv7ig2wuin54hj9vkmr1pku5oenaj4x',
                flowParty: 'so73iar8xfisb61g5eh4f7pbmqfhu4wj8oqvt12r9aa0sw7xupk12tthi9elt0by98ej25vg2taxpbwo4d5cco3mu80u5ksham2iwnjs5g9uji0n3oyazhxkny082p4nz5lfrp7vbzxybhforl28alg0ho9tdwg7',
                flowComponent: 'zfjyjmw3btj0vjnvj1or16ydg9oy3q443yek58ro1j7hnri9o6ho4d7h8odsu4iw370wd41nk1dptetpj1cufectwi2bkjp4ob2b5b1zbnmnzfh6e17sq1gu93ko4h9w2nowwx50ijfacr3cqejjr87gps8wxd7s',
                flowInterfaceName: 'v8xy98kbjobuuxg2n5qu0yxlkjwnrsg3x1n0stxk6t5ugumlufr5j1gjmt11qm8sg51myae2ea89xai6q33zlss27h697l24ly3apm3g2u417165dib8x3fsv7kagwebvzjikus4biaa5lz74vgwxyhyomkybjcx',
                flowInterfaceNamespace: 'vfp8gos97ffsil5lu7lpcog4t8f30f5af9ld84ywkbtgzfana9o5f8s70r7rh9ls7olvqrlptg4b4ojq2bnx66r4qsalh9ypmvb9u3gngzszmo7lzx7lo6i7fptpay8wyhx9xfaz9u7ag473wnikwwb42e3qmg0f',
                status: 'ERROR',
                detail: 'Ut repellat et. Sint dolor maiores sint soluta exercitationem aperiam qui. Sint id officiis qui qui. Omnis omnis adipisci nihil et id dolor similique odit.',
                example: 'vz32fwdn6zdonqwgprm426x510h4o0xdpocxsklhbddim72zxc7lj7cm81m5jdn5ue24pao8g01gunze6971g4mscccrh49zssrifzwy9fq4t0s3ghv9448phrheybldatem9xolhwajh64avgqqp9yj7y4cuk1q',
                startTimeAt: '2020-07-22 19:04:17',
                direction: 'INBOUND',
                errorCategory: 'brb9cur3zfnkro3fayx9wlyh6cbpbfj4esuvxms9wee99qwkgrb2o26g29bwrvbpk70b15z7x4q29ntco2v3hifs7y4gnzflkeeszyrna9hecb6geuqf5i8jpris364xwpgflai42z0nw0abyaalw3b9ar133e4d',
                errorCode: 'fsr9opcuc5rm83m9ggwf',
                errorLabel: 842582,
                node: 8249210661,
                protocol: '938aukaizie2wrm4cjfr',
                qualityOfService: 'fdygewfma3yd1o46507b',
                receiverParty: 'mzydlhy7h96drxkplla0patpjz8soqy8u52bi9ul53ufpboce7s2e0kfxh2e0aqyrn775rk01fv0w9611wc1g950qdpytkz0e8dzo92vpulsmb1sarfv4kn0ajoq9rt0vn5ncu2ppk06ie34g0gdga4yaj9ut79u',
                receiverComponent: 'fifgvkrtjge0z0hhircufdab2ispy6llgodiw5bhvo3bclscq87h1echouklzbm0u98ffky2y3qhotd4dir8t5woaztsccbs2blnw389l0pt2c3lkw74dksfmt5bnkro0rr77jeff8sbne8mdtbq4t9i72idx8kd',
                receiverInterface: '00t1ylh2fsynozthz9ahosmeys9z4shnerg7wodc16yknfsh2plnbevmbpiq7c64s8796mjqt7zuzxj000th7wt92esdyi0eqml4vvthk4hq8ecmlr8f1aggdm9g17wnc6mu8kv25l0ula3qq4xmg4c0dpljgf5t',
                receiverInterfaceNamespace: 'knfx361rawv5o2mqvg5di09gr95u71xk1xzd5sq0wf2e3jczyi8l6augesrweqvxd8loeh2mifkeavlwuvzwq8e16zbx4hjx87h53irffp32fusatfd09njgd5qd4ztebrq6l8hqvmwbi6hfrwrzqb801qcpt67e',
                retries: 4562268046,
                size: 5934166118,
                timesFailed: 9770838567,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '3yy13gun76ninho4hndom54omj4wxxcjm8vt2wyxcroawl51efu',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'cnd015ebd5hwgsvo609o',
                scenario: '6kkjpftdx4pi92s4i752qwdah2za8nxdwf3j51hhwov7y38uujfxwg8qqlw1',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 04:28:18',
                executionMonitoringStartAt: '2020-07-23 02:34:17',
                executionMonitoringEndAt: '2020-07-22 20:47:22',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'b1jccmxbrchfycucemk9or36wru8xcb6ynq6s9zxahbetkxtvyd4n6ueyvewaqxh3gbycig1u3f8mq3mv5bl5nqr2e4j8cic3qnxderxwtv62ertj2aa5y4a5jdr4at0blxg1flnqakin5obbx6nbw1c9efgvbyl',
                flowComponent: 'f7javrq3mc9jz09cswjepqtzdab55t5x5v1es4ys90fx4gc14q9hf504vq640bng23hqpobyohtwkcjxtexevuf5th8r59s91die1zklp0h5tdbyub6rpijmnfi1g5h7s7yp4tg5auq8t8ursyr9lno40u9id1i7',
                flowInterfaceName: 's0koeu8u7a84ma5b8vu4klqzvecqcsaytw2fbuuumgrnsgnq9wiofq2sxub72fuon76kmh2gpa4c7xvy2x26hsol19y9nn3omzd3gour4qtkimuaqerc4n3zilqee746ts12cgadohly432kmu7a6u72j9hw83y7',
                flowInterfaceNamespace: 'lf089i1u5zjdkdd93ywdkiq68rkgcfs75icsf57ajzanbpdoxmv1noeqokpu34j97p2h1c3yuf3f2klyjq635yde1fascv2pirb7km0vaajmbpd4ddhen9v5uuxxc0m8ju78xn9p6ln5gdvaciyo5n1t176kosq4',
                status: 'HOLDING',
                detail: 'Cupiditate non deleniti eum exercitationem perspiciatis unde. Consequatur voluptatem illum dolores et soluta commodi. Facilis modi voluptatem rerum ea dolores aperiam. Dolore porro et odio enim amet culpa est veritatis. Vitae id non autem veritatis ab voluptatibus.',
                example: 'nqy5jdg47gjrcaeruqh1vk2bp430bl2l4johmg2pc68do90lum8kvgp10pul34jdevc9uj1k0idlrykbjw2ye4xyg13aarl7dvgjegswux74lkq3qmc0djo0huxds5s62a5avjf9zj78p46acn241i9ht5i1aflx',
                startTimeAt: '2020-07-23 02:17:16',
                direction: 'INBOUND',
                errorCategory: 'yyz580axugqryxck4s54a8rlhm0iuriy6uvhmecbrf06pv3apc40kh78s2foyciu38m9orkttrjjntdjsfoifh46nqflndwq4utfasxe15goekn2poldzkec7iqgdqnzdp9tm4b3vv01ia3pbj3b8md6qntssxxn',
                errorCode: 'ab8r69yqle0upt71xmoc',
                errorLabel: 595431,
                node: 1003134710,
                protocol: 'jggk1553pf0bosjs2xod',
                qualityOfService: 'ri2ptenbjrdess5520sg',
                receiverParty: 'xeq2umj8kwx753qmm6exi0ho5xkx0a05kycwkjllcyw3fcxkwa94zyivx21ko1bdiympmqphjusaounemhuovoih58vjevwuv9wnps744ohj7gdjjlqxpjekfy32law49waaby5cpbr5b0w7oqesork1xuzg3m3n',
                receiverComponent: 'zem84lopt2x4k1c1cm5bcfrn8a15rr2sq1wvimo8stxkpj0fra02taoliyriro5zgid6253t9ct703er2zjch9mv6jk2c2hwrulioopo75gfgz3y6alrnanbzwpromrnscz86pnmf528jcnwl6xcogxhf4ft9ps1',
                receiverInterface: 'lw43k7walhr3f1ha225yf4of43plot70m5pdrwy22xyxl2rg2yt64lq8zx6y7276jauowe3bwtye85uhttb9imwfz659zqfjtlcj5k85sijbr1suin53c36hdigb13j08y5jf8t29tmx17wig9wwn2ppfwdktb24',
                receiverInterfaceNamespace: 'dvpcqj3m1lz2fx23qa02i0wd4apo8ga2mtyjcprvs4i0gmbset2fabavjrvn4d4k297425ixmogbdveq6tyrdgaikzhnpsurmoax2bzgxd1hhmi4hruufpek5lml71f9fusweg7qhq3uakpj4bcybiag2y5t1y5x',
                retries: 8695969346,
                size: 2162930709,
                timesFailed: 7623567404,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'h7dhoeb41isx653ojy53glq230ngcw3se5dtmsza2a8xzxxgr8',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'a5ghzm5xu85gj7cvyo281',
                scenario: 'a596k675086td25ox5ezlw9zesge8n49xt2cilgjwyt4z5rqfa594o8ajgxp',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 18:34:12',
                executionMonitoringStartAt: '2020-07-22 18:42:38',
                executionMonitoringEndAt: '2020-07-23 17:13:22',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'q34ra3pi40i63b2impdd3e62hbi5a1ibbb78cg5iwyucna6vbqceyfkq15j1unqyehpbpkxdkgwmgujur4r4zc00kyg9lxg9l522u40piiof1nf4nipdg3yxfkyi580gosl1ojyrc5cbbnom32d6nekwy0wbdall',
                flowComponent: 'qk1tl8ww5s9zdaqm7vpesucqx5xjsnu5rf3ssc03yue6e2r2cqictzlyhqfegp02sxqcxdcyftdajv8c5ujhhurxeamlnjca8y7ry9szbvwcgkatd38jxg4t9vbwfmi2jccuosjgozgx26eosuh4t2lh45k2ofq8',
                flowInterfaceName: 'it9gt5h88ow2bn8mvkv5vc5bcgazqacnx3gh0d2u954betaso82ki3ussz9nro5n6f9nq6fdaizvwu5ojhaquv3jrrrbfbayd9obaovpmcno8bo38mw1vjy3u3eud67g3gf046iwyemu5zcmiqwy6lbgmont1q2c',
                flowInterfaceNamespace: 'nedufrirw89s6zc9md1r8ighicd8gwfdf83f9m2u1h64rjzoo7cm8hbvqny423fub6laotdgtfmx9x35r3hbmvom5dihe8yx5b1ugbimyiunxtq4dqylwla4w0yh6ast661fotf75xt2al5li1ef9fqi65xy2r0g',
                status: 'DELIVERING',
                detail: 'Qui consequatur quibusdam dolor recusandae. Autem qui qui et dolorem vero. Velit doloremque sint.',
                example: '4o0cfko2yjk8g894qvk6p9dqwadi960n29hotn9wdexp7j31jt11agptb6irrqn01d0bcurp4ov20pqaex2zjhxxxupxy3haqmtcrkltfscg48m76jr3m2aerr96yppnwuryp3jgf0c7l2qk4kkow8g5ywk2vgeq',
                startTimeAt: '2020-07-23 08:36:14',
                direction: 'INBOUND',
                errorCategory: '73ob3qhf1lojniyywe646gxy3qn29imcizyeewgs882l91dfi2qt3qfnaiu3nce9au2nfn3illi3xjiy9y37vvig2d1jo3de3lz2twwqxqtpn1335a2h5sxz6ry7vkjowb1sop1okw1ol8x5w7ybps4g8a2y8git',
                errorCode: 'qtvaueaj9n7pcsmcr3nw',
                errorLabel: 534548,
                node: 9816670750,
                protocol: 'uj5e9c2h9d2bmafn424t',
                qualityOfService: '3vw33o4e5xt7fu57x6yo',
                receiverParty: 'jgbfixo24rzj5y0vyu2cqc1deg439laj8ka68g794erkxazreng3p8a2eeehzjpwv7cmufiur5ivz4ym74k66b5gwucewzmvm4jct140n4k3h3ovpom34y7tb8zp39ir3gt6szulsnoojyzfppt5ugbehhs6tzek',
                receiverComponent: 'ubiickk45svvk68me7q85tilt1gbgcg5ti68w6nrmysvxt61ng0lp0exjm1uvh1ebs06c4yypw6u6srlrjzfhg9y9dz7p2dxsaca8p57ctuei0hihmmxsyqfeg008g6a8bttl5d8l6omp08hwiqcsedzqbb8tihy',
                receiverInterface: '8k30p8p82u93mgoyw7g7n5fjevb6nbi3n506de5qh4ycne7tiyez430ux1vre51e2udcq83opid026j7x3rq8yu71frioybx74c6t1l96vr05ywax6jud7xet41d1vj2mumoodj9sa5wr1571s9w6hav89hvb6yh',
                receiverInterfaceNamespace: '93oucxte61og44e6gqfh1wz1489lfc8ei81m7nvh8eg47s2ith10brznpvam6bebhrq7ta0rqlvwfupmfsonz8ev5wd6qo7j12v6nbyc3zhjepmkdgh4qutks51bwbt1o38dr1x8pbpmzzkxcij210qplp1linvu',
                retries: 7794325381,
                size: 1860671670,
                timesFailed: 4517386394,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'ciey9tjj6bt6icotxhkh3p0qn0ldv8ojbxl1sr67rqb8t438p5',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'u4dz7f6yfwmgohc9d00s',
                scenario: 't0vlrid9z676jihyjwnhqmsifi6jd9yb2kprckg8fian1hsm0xo6n05ex5028',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 10:50:53',
                executionMonitoringStartAt: '2020-07-23 03:44:59',
                executionMonitoringEndAt: '2020-07-23 08:21:46',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'ww76vir8aaddxzrr2ig5ntodl5ptdetppa38ts7bq8pojprkkrhh2zvs6kt250gtkyc8aus58n0yz2590h1zjy94ve9w704y2fy4er8mboyl7qsga6dcp3q8a123toeklntcban5fuw2he7pdfswb663e9pg0d39',
                flowComponent: 'pfooomihgkkd5d8t6tbcrw0efaulida4gez92hlebx0stuwja0hn191mgpj3ys2imo2077fdishqv8efr9cjgx0zwl0p5r4rfyvirxrtxw6upw9343xcodh9gn8b3jt90fif6vndo55nr172q8y1aanfkgp7nxlm',
                flowInterfaceName: '28zqkoo2d7el8t0zmu4eubkjbwm1er2if718zo4e6o3fowyyrhmta6e3zw74xtg68obtj0q9diwkvipdhiqneq84fmegnfagy0o1np9sjaua5v33xupg45jry3q0zyxksvl7p6t82lqz93xg4cm046yf47fy6axq',
                flowInterfaceNamespace: 'ww7swdczsfk7dhy3a7wi9maxqhsy12yfbumzhn28g6lxgbw0lj3ae4aruuwvzbrjyzo3rdet1hxsxuvrleiz14s5bgofce9me8qcwqc52nci06u2uoiy577k60cxto3t6bd6seprcu5hj455pk0zx7i0bq7ssqkj',
                status: 'HOLDING',
                detail: 'Iste qui quia consequatur. Voluptas ut dolor aut commodi rerum. Dolores quidem quis repudiandae et earum accusantium. Dolores quis eos repudiandae architecto et ab voluptate. Placeat in nostrum voluptatem neque velit.',
                example: 'wt9cqezl22z1s1x6nh8pvwdhke6up7fha6g7h0mwmca3qsb6ssto4yqmdj01mg32dhxrlwjuaarqx8s7lpt4zk54h34evernr3zxm0oxc7ezd4c3m5vk5g4kbravbj6oa9bho1tujqracnyux05e0clbaogip7py',
                startTimeAt: '2020-07-23 06:31:23',
                direction: 'INBOUND',
                errorCategory: 'j3l966z37znywnh7u0htl14ymsdoaqamj8i4l6hfo83c8ynu7xm5a3j1j7iuxjeojx9mcrvr45pfqkwbhorqff6sp5s79l95v0ola1c0trq1la4a0e82j33bfhznqrskwxgsdq7zlp8ln61gh52bdbjrwx3jc6l0',
                errorCode: 'c2qalogc4wc214q64rna',
                errorLabel: 216806,
                node: 5470410212,
                protocol: 'vu7zvb2lorjkds2dlsyl',
                qualityOfService: '4awucoy5dixkj3n6ngbo',
                receiverParty: 'rg98cteqbmbtwd8cd7yomocspuq32qklbdkeyoiwdiq7dft15felsi9zdcw45unni9ad1frs5wzn05tob12kkf81wcrmp93rdelo4fpn10gwuj4xiulhg2e7b0ipbxqwasf4d14kgshka8evm5vs2oovggyzcv54',
                receiverComponent: 'oqk3f85fyknefdkh0xwlvq7ehdeo61wus0j17km77j0x0l8lnzg0fq19epxad1yhjw7ydzvdmspcaiqwat0t1drnhv2qhapdufty5ms83mriynmrhhnvmul60sjgqvd4jfg9kzkzb8mdcf2ff4jdvpurb9f4g88w',
                receiverInterface: 'x4w51350oyfd92mmqqprl5n6idi7n81eyd274e48lqa9w0v1dqwp4yfrewxifh1v15v5d31uc2a0mgo15cryx9cogxewmmfcxxagqhrppxemfj0qcvpvq50wgd4f3eqznvtux0tfd45t5lgsumbngeplohejmrnw',
                receiverInterfaceNamespace: '9dlcfvm2saayy3ituw4sc90yug2c8n6eowe8oeewxavkg5f9dkf6b731sbxhffci7jrj98mqa1ppkz8xjuriddi799iaw4jidpwfevksahjzdq7lnvel3wqykssxbeoqa416hozkziur5sg9l84pfshgsc43d6xl',
                retries: 9418308052,
                size: 9680925496,
                timesFailed: 3659600483,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '7dsfy0o2gobrts9whs36by6gwgckd7tcrw4pk7kisoqqok4jeg',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '4zycu35ya93x9jfk23qy',
                scenario: 'rqjeabfxrvuqp4a347zr5nnu7r1f614m0j2ha9cloo1jvp27u3ji5xlx04wd',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 04:22:15',
                executionMonitoringStartAt: '2020-07-23 00:41:40',
                executionMonitoringEndAt: '2020-07-22 20:13:30',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '300gv3ts18xkxyjvgp4khq8kp6jw7swooqfdzoinupvfewqng6oz6vwuvtmx6fq6hbkqe4y47jpv1q7h9e284x4p4pacqbefw2l266fcqdqrw4b4q6fnqwewbmezcjtb8fbpbkubqd7jg7we3cbs5kmgor6he9h86',
                flowComponent: 'uvd1cwi6n2lknn041cckw1pi2sg03l2fzvttt4an9s6f5qajrfroe218zr9pl02oldaj83fp6ye9ef1v67onl457rnmogxsen8fu1bg89rut9qnnhw89juetwewzbek6taisix4qved5jgwj54b31hdsn5mohzq5',
                flowInterfaceName: 'udm2z0ldp4gbfz0gthmt09z0k1nrmcr35hw65rqm832jcp2bs2wyjytvgw1ow4mxaygcq455wwky1vi3blt4zlikvc7qmsmw1n8tfxq2f8ta93xakgjp8za1l6khnavgqo6wthdofeu1yvtf4jv7zh80enmgcoxr',
                flowInterfaceNamespace: 'u6clmyn5rjgh7jkqbxosliuaokxoi7bip63oiiw8tmpyzfkua9zjvux84306knw0gex63saob0e07p1mzz0e5y1pjoi6wk0y0ujbze6zq2lp5s2grva9v4qy4mw9vodv4uuo4uy622zwx79h05xgge08rtjob1m0',
                status: 'TO_BE_DELIVERED',
                detail: 'Sit dignissimos consequuntur vero est deleniti quod eius. Illum quo enim. Eos qui eos nam et perspiciatis omnis perspiciatis. Aliquam vel dolorem nisi delectus corporis. Possimus quia dolore accusamus esse accusamus maiores quaerat impedit omnis.',
                example: '2lbew6zy1k0sq663y0m2i6eg7m3qkmn0zrjowjdsv2boiaio8dlvsjohz26dwdw40wj4vleh3qtozp0lfy355b949tmhkqkn8m0rz1xvavpser5co7bfh1i4g5qsbd1gc9ve7idsjm2ujtrcjv1widvm904u7n8e',
                startTimeAt: '2020-07-23 03:20:27',
                direction: 'INBOUND',
                errorCategory: 'xgd1kop8lgp2q5oh1mpno1pz7hag4m0kjpo06tytplhs9yvsluaonelcdd8xn3nr9jvyd1st11cbzjb5k31qkb06sz77ghxvgxzolyob1f8k9tyok62lb5ljf6us1gt0nm5kzs30qy5cimvclve0y1u0v4slp9jq',
                errorCode: 'jh6795lgzgyv34y5lzlk',
                errorLabel: 962293,
                node: 9804679471,
                protocol: '7148g3u05j2ua3o5lll6',
                qualityOfService: '37g2pjhmlqg4stglvgv7',
                receiverParty: '8my2c0mhyboxxr62tl9jgakhhnwjqhlsape8iku7ivgfto543x5l2duhomgqm9si02dcyv38dtrg33za5pofkbbxl5uxd3k796d0g7fqsrrdnxe94y65ze5qh49k7equciji6uape3shzxqoe0w3ur7awac6ryc9',
                receiverComponent: '5cacszofsrifkronw4dbqk2dlb84pd6yctsyf0djefjmnq9wsvdwdvpqr19kdmhdb7mbve3zuwyuvbfp20hp62xji56xnd7da5lqlvemj0tgax80s06yb8ixzgtkz6mfqmgpa874pscrh6jjuchiy49nzigui4sb',
                receiverInterface: 'xtkdsga8llsg5mzy1bbvjzouzjvpmwvbhbmgt6bjiyma7s2pwe7f1zvedgvg2ndi22f5ab5hwwo0o30uvch2f4ilalrwfre6zzy78pxca65m3kaesxsyrdbaobi6b5l2cdu5foj01no80y4ddtbvjbxrw2l7izxp',
                receiverInterfaceNamespace: 'fqzorti83gyvse4qh7hz62bu7x9vz5liyl1z028c2vagaymdv3um6xk8bjxom8feucsiurwh5j1deskntc44tm8ck0s9hb2azd38yb1nqhvvpq3x8za0m4j7uvgpkob029wwg7ms4u0vjbn77bddzar9kv9zu2un',
                retries: 5340056072,
                size: 5177495445,
                timesFailed: 3561302833,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'znbzvadxey0x1j0anqhmibzdeg2dr712pf6dg3qm4xqad2dejv',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'e5rwhou5wgkg8q5ibfb0',
                scenario: 'hju1gge8po62gog91nqr34sx5sxrx65igy7ymhx5131wnftbsyi66wzhxzhi',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 00:50:57',
                executionMonitoringStartAt: '2020-07-23 13:12:44',
                executionMonitoringEndAt: '2020-07-23 08:05:16',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'gtz8fam1m88q8qyiplchabxrfedr2wnpu38vsixb9ahh09n7rwifblqyoau7vi08uaz3o6i4wwftjxdv95ijevricblrbvm2lovq4a7bguk5s7ucf41wmks10f7hm14u1b4slm44jom1gv0czzbka8fogw8rtee9',
                flowComponent: '5vczm6zly8n8r4ka4izchs2fvelxav8x19624sjslwrqtdbheb9htx83tj4lpb1uegadeiy76rhmh83e8lv0ojz5sqnngeyhgruvnvrshe8xwtb8i9fkfy7i9bsk5garm9yqqchjripbyb8qywxluzrd1lgkubxeq',
                flowInterfaceName: 'rgtmyrxscewyjzb5ciszyeuc5w474fsp4w6z7xv0f0gx6yfsa0vy4koyryydr2k6y48vcrgpupb0mro6kpj79a73dne0vnc6j3l9hrj517ay6hrvkcv9d3t6cqem0huj7ly874dwrcazakf72ozq7w9i62gy1inr',
                flowInterfaceNamespace: '5qez2pb0l5dff7sboxzv8i9n19ussnzz860ag148um621li74zqumwiq3e7iwkpmh33gunx94482me6outwpps9348r4r0xsy9m7iawxpe3rryp3qhz4uvommke0h497x69rlyurlyi2kir88g27p4nggoocej0j',
                status: 'SUCCESS',
                detail: 'Quo laborum quae ipsum laborum quos assumenda nisi omnis enim. Voluptates et libero et saepe omnis nobis. Dolorem et est a eum explicabo aperiam nemo. Velit et culpa.',
                example: 'ji57s1m3ynau08r0ikjo8cy2q7grl8hvd8rqvd04p7q4mbfgluprnsohhp0r36vrxi6w0rxu6vgcb4utov3280kb45xcy91vj9hd8137ibzgudlde5olqyhkkvzmyflcazmdm82yi76ng3d9kp35mgrqc0u1a6t3',
                startTimeAt: '2020-07-22 23:59:12',
                direction: 'INBOUND',
                errorCategory: 'slhgp4x6frzes14iauvgpe94fedbuqej72c5si71tadv675yq7p874gsk3iowzv0pb0qj4f6oinhrvjvsek8q1pkopade96r9zprbx704z1l9nmea5elnc5dj88yxhvwi1tysmiczkv5gwbgju92sjbur1aedll0',
                errorCode: '0f9ci5b56utuem84quox',
                errorLabel: 227116,
                node: 7444853533,
                protocol: 'lipmj998vaoxbd36wy4y',
                qualityOfService: 'dndiyuv523dmh8anma31',
                receiverParty: '6bzyfzwwga05cjqgee8f2k4c6rp9vr68yvx6xwmlfmjympj22ao5ass7rtpn95192lsn1oia782wqmtjqrtyrzazyjnhx2hkyxotyeluk99cb78ypw6gcwayez5p67q033kwuxvtp1ytv4li0bcm479s3wlx89f4',
                receiverComponent: '9cydt4s2lpp9id84fw0bljd8day95l9s3di24hluqscj8idesy4bt3ym4ts0l3o2qidr17hmtc443axbj6n7e5hhd99ge832a6aw38p7t2iarowt0wm7b2b4rxqojhpiqzycdgpu9z3ktggq68zrlo8dgekyylxx',
                receiverInterface: 'p6zdk0093szm6r8o2nu7dmu0izfwpncmgydhl81yq5x8w4oheycpwov4fsum28z16npoxzyg4nyd55p91fn839s2isyqctryk7pm5b11kas6j7a3elxboyc9jon7gmqlp27pxj7r5hlgbctqxrad3htc5uitv2s7',
                receiverInterfaceNamespace: '392t8br0ucbw9wsnhem721r10jhmnxm5ia7ryn17657sn116wbaht8v875p3yd6jjwjlgrat4uxwieubvyjeqln6r4e4obpk60d3f3ez5msfzfzogkmdloaviy9lb89ig0dwsxbw8ic3qrnprah36cylnbxqzfex',
                retries: 9268838909,
                size: 2494688293,
                timesFailed: 4832548030,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'd8izoliwkyf4tudgq2sduqodo7w20aomrvxlm1u4u8pxvgqcg9',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'u74skx7svs2q06oohtph',
                scenario: '8ygawevstkjzpds2bsmxiezqt8jwncctr34zlo45pptgb1buyzd570kp5qph',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:18:30',
                executionMonitoringStartAt: '2020-07-22 20:40:18',
                executionMonitoringEndAt: '2020-07-23 12:20:26',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'srvx7fyw41n4weygmq88eu4shffnfpc96gyk1kqktisn1ra3kboj3770rj570sfpz85t6dyp73wklbpwgehid37nvaw3ltll0crk5b5na3t1uj1zadxaun40ax0ki33iy7oiei7cynebbnflf74891l5cjmedgv2',
                flowComponent: '5phtorcmfwho0pw8rny45eaknebx51crug17d276hsxkphs3enpzv30100jqnn8188ttdwf6x2ogeq9eyjk9wjcjuv983zkozgw109lgymaw3r39lhhk9xvsqk4m5y9v58jt6oks7gsl02irrmw38aipfe9fpdk7',
                flowInterfaceName: 'xswezwny0y3g2oe45ilvzje8rck5a7yjy838kily8atyhfgrciatcvjba2myutqsuq9dsp40jm46xirheiob07dsl9q3dav11uso3c49ox8zbma5ggnrnljijkn708vfc3kuuy6ro68do1uwp9x8l02ze9y03ipb3',
                flowInterfaceNamespace: 'ov06076rq5s65php70ewkzkt2gfzw0ke7x92lzt3s9pi3qgm2h1sc6iuuh77ixw8li6pr17wk7blrc8597bq2ucfvxw6ejx948ek77kqs8zrn9mydog9zv4afvytpzs9q0tnl7fj83r5hjo5dk5godf5iy3ovk0e',
                status: 'CANCELLED',
                detail: 'Aut aliquam culpa suscipit ea. Sapiente sint esse fugit est magnam nam voluptas sed quos. Et ut earum corporis sint nobis necessitatibus laudantium ad. Ut dicta exercitationem ut ut.',
                example: 'jvfo2dnljy00aqhpnebjcuycnr23xcs7jr86620nts81np147eek9r9835uba3dzj9eonce2gh4asae8yb83l7eolicow04n5tngleq7i63vd7v6urudxv5thbclfwmrrmtbotmbbqpqi0pwhmsrcezjxtd7diuf',
                startTimeAt: '2020-07-23 10:32:18',
                direction: 'OUTBOUND',
                errorCategory: 'v20snt7hl3hokiiflc7zfjydiza6eakli2u4lnovjusmxwi01pfydqvavv3c0v5lcnjit8fk5bh7jhw00mol9nlcmxe2l7zgjb9pzi5sae1j4xqevnendnqxpziy07x6928bhid9imainhe7tko6pw0ye7wyi8dj',
                errorCode: 'j3nxgazalmowhwefoxo3',
                errorLabel: 431373,
                node: 3046292877,
                protocol: 'boagb31vf32lrg94wghp',
                qualityOfService: 'sc95h918b1hx6qplcul0',
                receiverParty: 'b9wcbdfxvbkfhhl99i45tz0452u8knvg1hkrcrii70eu4um0sgv48vbkczj2nx8ry5bcblm0ygft9syzkwacuc0awrh8s37kj7w1zd6vun5pkpftiznes8mrvohbtkvp7kupm01c8g3n1x38qyz73myy7d8enxjp',
                receiverComponent: 'wq9fwdqwajxd6kx05o4k1ah25gq0m7jll7gexzyuf4kgh1u3j6nkv25c1bt1m9mb3qvkvgtdatyi61ogfhalggsscla0ktm76gs8qzcnpipd67tpqbmfixcayrv7lqe0lrfpmiyhxzdcnk4jb81uxj5k4flnxbnb',
                receiverInterface: 'cml2kz3t4gq1l1z142kpg97gphsl6xmypexyotjlo7g54x944ux1ib5ov1osnp38ygbki8bpi47a166oauxdr7f1ezf3lbcfa18uaxl1ko8ektzk5h0tm4gocoh9unvmhjok1s67624gxlqopp7hoyt6f4h719gt',
                receiverInterfaceNamespace: 'tu26d2b1pqy7b1dpcaogu2cjs7f7tkh3yjproi0ad4ki1zqzxs7piwpqkoh4lknh8y40c8bsd2ci35sekn3b195w2rzx4m8jdi3e5zl5c56q8jz14sufxzscftg8kd7lxpeae64kynryj3w54v1lx0nx7hrxcn5w',
                retries: 3832451565,
                size: 4210950941,
                timesFailed: 9484430051,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'ivuxf1a2ba9zj4m9bzb8z52j4q837k0piwq2wv6swxzugkgiwa',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'sfovafm4cthtclqgzavj',
                scenario: 'ddnyesr59huqhq2k0567ot9g6cs9q25la4yiria42njoq0mkges5z9jza6ky',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 17:16:07',
                executionMonitoringStartAt: '2020-07-23 11:13:18',
                executionMonitoringEndAt: '2020-07-23 07:21:14',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '1simh7maphl86l9y0drya5bytu8f5cmhmdyymkkakntfw6xmw9rrxak0vzaw1q3l3203ilbmriybjsf4l70ap4heb2dnadsxu0lwqme4f25xnhwg0pqpnsg2nxv5f38rmu0nncorlpt3agmrxm263yf74qxi5vaf',
                flowComponent: 'emr1zyfe4zh424d5ghgprv1hock43pcnywiinhdhwri1djj47oyi3us5uioxw448rbju8cegvkmlid9ylopi35lsgfavwu3yrwn66v0z6qmjfuyhdc4tt0q2izygeg7ejqofwg6bqr3f0x6ycao6qp20ojlngzyd',
                flowInterfaceName: 'mwbmkrfbpwt0vpzfecv9xkhnfxnk3c2bpcpkyoxaf2dd11c3ma4hant0k2yrhhn2l78v01j76se2n3hg35gafaqrs8i5j8gthkqqb08bhqrk9un4j0dlv46bhersu79w1rjgevrq9yz6y7v3qoess3yhmkk7l8i5',
                flowInterfaceNamespace: 'lz80vfl6a8g9ehrztgmbcb6gg8jqfku7iivxdajyuatocj13hqiu6el14xaaqvbg91qstprijkrc3ki6v64sjdbd5qjw4zxw9lv7rnlpcn9911oj52hkiwhqwq6ciqgog69p0dxfloan3h8kft8pvl69czjwlpf6d',
                status: 'HOLDING',
                detail: 'Ut est nemo cupiditate ut. Est tempora nemo aut. Ut veniam reiciendis.',
                example: 'pmytnwss6c64iblxefnjlb91f9m5fe83c6rpshyum8e8hbon0sa9fwrc3lakjf4ykzvzrx6zesualo1xhkuepmh2ffmraobxefddchlo2lkhb8bf6q8ivlsxjkui519mloyln5u0du2lt20xbjyuwnjf0ih1k12w',
                startTimeAt: '2020-07-23 13:19:04',
                direction: 'INBOUND',
                errorCategory: 'whqpmb0nji6wu9m5kn5vqeguojs8r0vhq91xygy60dlo0yoi8yu7lbxcv78zqd7fy132kshx5pa1fybgszla29wasmloxxre3qwnhan3d6hc7u6rpzn2zy5mooupjemk6mu3pigkflyau3thha8s9u2rxacdbe0s',
                errorCode: '11k97rsf1a4264r38r1n',
                errorLabel: 211357,
                node: 6054568808,
                protocol: '12ms8tx70ybn62x4ya5e',
                qualityOfService: '1p6y3zoj482t5yrcdu9t',
                receiverParty: 'zmy5z6sibft9qb0j0u3psa7mxxubatsc0giy8ejs1li9yp0gz4k3f2hxiy5fgao18aqxbtqo16xh5xirsldljhvpma0cr30mk7i6je8n4yntmq7ookmxhlidrhoube6sxcq4yisnsyxxf7sj814koxf7nn7e7pvy',
                receiverComponent: '5pin3r2w2k49mob218xm1ohxvo4fvr9wcroyvd3zvf9zyytq3qwmhgxuckwv1mkkv39o0454oxm8ks32ire3bp7j0bv0a7fxim0wfl5jahtfspikjg5ih8wipsoqo7gke62gg9d0qky4v6ckwl7xoh7l5dhq11tn',
                receiverInterface: 'izft0i3bmsiomii5bbqc402nl707e5whwvgtayaif0bogitv16nlw165md5eyw65qiodtk2sf119oey7idjy8i21wl9arbkxi67vj5lfqwxeeg1w5wnj9hsed5ydhlbm9003nl42kan12hxmb1ghwigblb6e83t0',
                receiverInterfaceNamespace: '1lfu6d22adql5hd3xu7nil1aim8yqmrc1rghgew9hvh8xdrdev1bor3dugmq7qpdemoou61zfe6lzr55twdqnr78gnh0z9ygvxji9oxn7edvdt53fh5a4t8b70sv8elkk7l91fvqjnm4bfvuwwfzzlc8lnqwg2lh',
                retries: 8185133046,
                size: 5602260935,
                timesFailed: 4818219089,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'e0qw5azckykamk998sin7cjjbl6u5emty3p4635r1b89g64of7',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '0hy9owit9vpqkrfr7bh2',
                scenario: 'w9brtu5qwkvilustap36t4yp3n54m82v50v2d2khba0ry1y5jhztlznlmn8b',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 02:03:35',
                executionMonitoringStartAt: '2020-07-23 18:11:13',
                executionMonitoringEndAt: '2020-07-23 16:13:22',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '7wnqx9955cvap0daatcoq0g86nq023ltmtn496t9ps2bvf8bhgwl54jwvh3cqqosmylwpyrmhxpjpqsims7ycym50xwynzxcg1cz4b1s1vtwnf02h8m0dltgculxsjc05ngp365yppijipty641ibjwxnxnyfcfe',
                flowComponent: 'vmblsqfdcev429jqcodvg40qtnazu46tl4dmp1g82sp0hkc0zuxnpo7cg7itt8zjmyu5cihzgwmnvl72jzoyj89g49xxvspxtr648u6ilzv92vn8kohap6xuvc2dk5ywfrjfgvnrjb14col80kyfd0r8tdh4tuhe',
                flowInterfaceName: 'ugfaj9ge6posz4qm24fpube9y5p4yeu5qe9o6jxpkucf2dpf66sf3ybkp562ih13po8432cwor4qleopsqa1j91i5mr23rrey6h27j4mo6oocbxkir9uuiemu2h9gd3gonldf3tix4te9o0363ig19797r0yo50c',
                flowInterfaceNamespace: '8q7ohumivco3i1jb2mb0exwv1c61cxjqqa2p43k5xcclemobsjfn5d7190yaqix61azhhhi39fs3vj51qzf08m3es17jhjzycnzxmmporxmz92z0qth8y2envwvbvm37vi9g50ekkthx1346be2nuhwab3y5qfgl',
                status: 'CANCELLED',
                detail: 'Voluptate et possimus maiores unde omnis reiciendis fugit. Ullam quasi tenetur hic. Unde aut est optio et voluptatem sed dolorum numquam et.',
                example: 'ls9sf6sbchcor319sdcw881lg50rh3optjnhdugbe1sj597cvclkk4h5xyf5jxw2358wqs7ybchzyjqru3i4fdkxo2thkgkugz3f2n8jxj1mx0gd00vmk9m6n8ceax6b7lc1k7kkyikmhhrlund5rrdikvsa7ifnl',
                startTimeAt: '2020-07-23 05:45:46',
                direction: 'INBOUND',
                errorCategory: 'vawll8auhph9orpg9dols6wjzaq0awlous2lgqt5l51cw42i8jk847llrh291jzproy68ytxlyor22n4vnvsjf1zhrnksw6l2nf10i24d0ijqf9b0p6ciw8bevayc90jcaanyan06kwoiy5c228k0b09ijs14y5u',
                errorCode: 'vjez5p5qehhfdjj9q8sd',
                errorLabel: 166577,
                node: 4877425789,
                protocol: 'jzjst7s0zwmmxbluinwi',
                qualityOfService: '1ndxpc4mpt22ix5owc4t',
                receiverParty: 'e313oxn9ej56sk0hirkwlr49jj63ghr4apdhvf1jctkmia5ndvbs5qbk9j869kb0jei6n9dy4gp8o5u0vz61nivv4k0jflibdhk2q5ayj2mkrd1swkmq8a2v59uhaywzahbyypst211zi3h2iwf91hv49yhoj27u',
                receiverComponent: 's4g70vd585791b5b3eut3xtlalegs7bq8zqnivpqvqqwq17g20mbbwpsq62lpz35zkt88use0g65pht1qzr2n8zlv5qjljskltrkpaq7d8jddiv4g1q9fwx1o9xlff493t4ygc7sgx751ymx3ngkwnxdy3m5wrsa',
                receiverInterface: '1bt9byggfl4mjiig2d63weu0ttxh238ind14mvjhbphk8zvsioqxfw7r53yhz6c12vjz4fh38dtar3rdk1f72fx8x7mqdcu8w4bl64itcf9720a8vdbi501m2b0qdxaccre60juanswootefo2vuc12hc7bk0yk8',
                receiverInterfaceNamespace: '7z8ers5vy76eu75muhljsiavgws6usedqhaqi45l825hrljceyi60d1g7wx8e3jtv67lygoralcltsdu8fs6zwf8s073f7npu2d2sju6rwo9nd9p1te1a5zlv0cvj14fzay579gj8kqt34omq3tco9ulhovn02r3',
                retries: 4108667528,
                size: 6529471162,
                timesFailed: 8409392218,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'vc21tgsm32znipmhvw66h9rlgz6kt29gmi5vom5c6ivg95wjwj',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'jzx7t8ifotqv4bup4ocu',
                scenario: 'msqmil3y16yjahncbhoi35s2f0fjtkz48xv2r2tgy8xkirie2pfn2idorysj',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 15:41:43',
                executionMonitoringStartAt: '2020-07-23 02:20:43',
                executionMonitoringEndAt: '2020-07-23 15:08:40',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'ehbc91lr4qf8g9g290zwdrck3mimht4qjnn4jmc7amu4e2eb6zf8mxqrd9efno5duq14hf2eqi5jj706kilghg1ul5w2ixc13or7h5vinma50f51o7609sum1d1atrf4jvf0h489o2w56epbmpis36a4qahkqa3x',
                flowComponent: '033uukolfi78t81i66rt7es266uy0acrittv63p33j97srs9t1xhjhuaazk60hoabiv5jivqgcpsdmgczhc0kazd2tny5kq2je9upzyhw6agz3witauqt1jkegv6n5olwu4u4117qdjx94yiyp12pmq9xgwtsoqs',
                flowInterfaceName: 'tsk04zmre8edkfaljrfik9koml3m2ad1r81l7zn0xst652n709lmhaudg48hd9mkcw3hlsmagssqivg324acx8iue3vs8zy9th4t9nln5an1qt5t342th427qxwccywmhu3kcw3zmz8dlsngv9zjbjahlzrz75hf',
                flowInterfaceNamespace: 'euwzfqv5yjzczzng8tnpc9w2ahzduu00in3iduni9m93drhvaoaftzskj7llni52h414r60jsdtggnob5u5m347t61bal96vykq9dn2pugvhv8ymct2kfo2t2zi5xezk9iafefcuzsj8sdu0dhfdh15mhnbmxghn',
                status: 'HOLDING',
                detail: 'Odio delectus id inventore aliquid voluptatem facilis ratione et. Dignissimos dolores ratione et aut. Nisi autem consectetur quis et sit eaque. Rem ut vero minima ea dolores dolor impedit quia placeat. Fugit et alias cupiditate.',
                example: 'oc5sfd3m01nx4gi3z3h6b9kabpmgwbluobebntijy06hbep8u28v1671osjemjcb7iwtx0eb1jqo20fn1jxjk8galiz2vskdksljwgqf75icyfraviandby7v80hvk9h91qgge5dsqrc67r5na8padn0f9jyvmcq',
                startTimeAt: '2020-07-23 14:24:29',
                direction: 'INBOUND',
                errorCategory: 'b4iecdudek96uhfkaixh0awrdyp05880n5s3ntlywzbkhhy5sinxowzao88ibrub1vpphcbxlf4sz8dnffm4dsmykz3psfdcnr7b75pk5nixjwepru3yv6qmlp21mevijphizp06i8z7xnhlryg7pn798bge7t38x',
                errorCode: '3ripnq24bzso6r8vvioy',
                errorLabel: 503111,
                node: 5362198145,
                protocol: 'k51fam4s07in392cs7fy',
                qualityOfService: 'znvr7euui48gw8vhoiud',
                receiverParty: '1itzz91j8dcrbwx5ekpkqw57c9kta1c34hgylbm9ro7i6a7z28h20lkr9j2989jdubgp3atle1s11shxe7ova0dgle3mpolwfnbhs97tu0cresnda4omufgdh4si85xm5grvu8q87lpybbe776s85etnttucjknj',
                receiverComponent: 'hcz251d2c6f8vmlmq3fnyutn7nhd0p2arcq5ngmmc6lacp0g52grj3wppca5pvypzrfu6nzlt8zjn266w3qk779vr1s09mio8j80ul5a5cw4yeot0tnosxyet8252usuce3eh5fts4n4mm7qu5nnzouh60vwwu6m',
                receiverInterface: '4l58qecozbxkrqpinq6fufead6san9i7k8pfoz6lsidz4dqo8kqaz16j20k7rjfgigy2hf3b31u8dccih9kcd7m16w36k5kobvuep2e7bocay5cwwkz8wpi5s5skuggg3g2ibvdh2nnzrp0g51w9sss5hh52e9c5',
                receiverInterfaceNamespace: 'fpfj42gdwd6ki5gr22pu9png7vjir8dk6388yq818lwecyzv1llu3y6jt9xx2w50cr058fmcsbo0olp3ndyoaqbzfv1ngng2ud14crcn25tpdtov8ineha4tijsacoze8fsvwlljh0c146czd1o7o863hdv6gu9a',
                retries: 5328547255,
                size: 2395318526,
                timesFailed: 8062172199,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '1n1qhnsy7dslgwy0tt4r149lj8cljn3jhc4k2sscvy7z804ken',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'q478aa7stsebty97qqwy',
                scenario: '5ccfq7hns0j48x1tfyj70xwff2q151o8q4unlmct7j0ssfijsc28984z05o8',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 09:30:50',
                executionMonitoringStartAt: '2020-07-23 12:13:43',
                executionMonitoringEndAt: '2020-07-23 08:03:08',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'fvagy7d2s6580pie8cfz0m773314frp36bnv06cuhmgct21b42gwm83supi5e0vimdmu9ejq8eagjiw7x6bto0yeolge28u1hqtbiyu055dmmtrkyvbganbbv5tdmob4j0h9b1uaicbbfq7e2lbzwugppr87weqd',
                flowComponent: 't1txu4i8pphcnvwqftqae1yjf4hq8i3gy01lh81fm3d70mlpecim9ht37hcne0w6n9iww9ia7sc6yd9bgwrrugw393i86efv5mqozx6xfllr1eyrh644attv0tvss08fkg5qmyzfnzq5lva1xhp3lwg3p3iobbkg',
                flowInterfaceName: '97l4zmrcvcej5ze0ea8ehcyesbianlgkzbdp9qn4h94o76w7gfe4i45w2f34zgcof4xos4cx5mx3pf5ng58n6ib97646q8kip2c334wn6n0ta9lyeg7u55uctihf341setgaj8gp6b4r1clj6gix8jrj90ubq90q',
                flowInterfaceNamespace: '4za5gd2pos9sxvlrfl32t5kjqhynmnilm4ytosrma8s9tzyrebyvk56gi6acp1cc72pnsexkx7g03oid2n3lk12jnmobtps1cb5gayta7ufyt1u8frhzytx71hccblx665id6270dhek0f8w6otxo4s4lcevzhq6',
                status: 'DELIVERING',
                detail: 'Laborum mollitia iure sit qui dolores ipsam quia ipsam error. Id reiciendis doloribus magni et possimus ut occaecati vel voluptatem. Fugiat architecto fuga incidunt excepturi quas non. Explicabo quo beatae esse est. Repellendus pariatur modi iusto tempore corporis quis ex aut. Eaque omnis ut.',
                example: 'pp84fxqinjh3yqyysjjhdrxc9jzvdduarixg59swmptkr24twxefwssv1w0y054n42z87oauvubjpl2lx6zgrxjo8f5pflofa3g2jhkok300ykdub8iqt511gt43l1w3mabjcpizhn5r9tgswvwclngqund1tbb2',
                startTimeAt: '2020-07-23 14:33:57',
                direction: 'OUTBOUND',
                errorCategory: 'h2ipvp4qkjy1hlcfly347honx6hf0hpsz5ohkbbv80u40ym8v6g74w0e7h9gzvtuk6re61cvsaphenxl4ijofv12yu272cccmin1muhnz8xu7b5yddjyjjr0nnffrmj4d448fipx3de7oqsgl7xax85ut1wa9cyb',
                errorCode: 'spp2x50qqoti5hw6k5kcq',
                errorLabel: 416671,
                node: 6707132302,
                protocol: 'fj2w5q82041ad9t6o56f',
                qualityOfService: 'nrtgab1gwlkjmn7mbowz',
                receiverParty: '7et5nth53kptyifi6kv3wb0ea8kzl0f73pwr33iawqzxzskcckp7om2ug9yw4kmn5fw1yuxar194r5j326ok2ikgu0hmeqezkpyq7s862lww5obikeo4l47gvnbth6vquo0k7s0kumz1b3rjue4z7uup3irz95y2',
                receiverComponent: 'ftdoc0svt6a8jvvqi7vzns2l9wuakrskd9irxi1630bpjjtvc0m06t39v7zcdjsqcr9mmqr3kxotseveygrmb2qcyhgs2bghidcd8tu24ruawx3opu25yuok7wyaujps08z2pm4lglpn7owzmkgfn80th9sybpwa',
                receiverInterface: 'juap5j8eox70u0gbnb9vk7p839oc7p8etixw9ztxv13fjyy3hwknlwo1pir3x70b7n1np3wlvwni6z4d58it35pbmobqmbpjyrpgeos1nrqpubomaoxgsvwam0412aedajowm3q7oi9ryq7y1rdwwd0xue3vwt17',
                receiverInterfaceNamespace: 'ahjw92gyeurwo45zbm06dto209yl0xeisumkhenvuev01uwuw6n8usj6ipjrszor54567dqsnli45qxg6tbus07qbdh9mx1swljpas59y852l1psbt5yls0bfrcgt57dhdp5orsnaccct2ttntle8539grcr95ms',
                retries: 1870105255,
                size: 8061733247,
                timesFailed: 2128093058,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'otnpu6wovg949aockxds1n23o27h3i49m11h3q4efnd2m9ij19',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'peipa9453zid2ng260oh',
                scenario: '40bn02so968i5x1l9ts2ftt6ehqesd1zq0hl7u5dha95m91klvf7ca1hxbar',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 01:57:40',
                executionMonitoringStartAt: '2020-07-23 08:55:48',
                executionMonitoringEndAt: '2020-07-23 03:37:47',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'l2h3zbp9anpyo3e4jmdz10p12u3yekr3ccmej4du9u7bjeoozcarwby2lsnwajvee28cy08ef7103i9m23f8d1wznc9rj67nxi7lfv5af2cpgmobu7xd6yp8kqf4t71clp0pznqj55ihb6cwmxy2c9xvw6wy0m6q',
                flowComponent: 'kmqb1qzvuy8f8f8rtzhw8zjcakk0nju8vojksaulp5pcam66eq2zogidfg9um6w9upumnxabhc8ung7hh5ivdow070pr7pzf0qfi3p72f546etfv8a6qnbhfd7r2034zdpks8g2jb4zez7cfsy6n4fhw2h6x2hkt',
                flowInterfaceName: '94mhd42kytzggdlzei9rb8byyxlnv0g9sln0hrero510ji49q26zjcu7zzawtuu9h2esygyj8czppvj77a81azz3n745vq9w2i4uqwp252casa2n2yl7nsdf5w5nzkspyraarcbg4wwh7x9oiy0hwzmz2mnzcgiw',
                flowInterfaceNamespace: '2ayotvu207a37rmykpzwv638r085inifbkp4nymgojhf8ulco0d4wh11tsemk91xj6aztyilftkzeyktdccfu0byuyv7ctb5ulf5outpxkjzs2sbwy5gio70g4o8ne2g62grxh39me5cpx5rzsx8aogcklvg3ech',
                status: 'ERROR',
                detail: 'Enim nemo nobis. Quibusdam ut similique magni qui est est ad temporibus. Sunt deleniti quasi consequatur doloremque reiciendis nihil.',
                example: 'xurv49tsvx9iyojhzw0f6jxi97xa5x7ryg6xf4gdeksdzzdblre4by0kvn7qjonzs0nu6mr9wmn09vqqrzkuepmnan98a3q0zaov7l93utk6spmrcdcrk8n764gzhokf0oi8877kpf0mk780064n35ynfbxxrcqe',
                startTimeAt: '2020-07-23 11:08:29',
                direction: 'OUTBOUND',
                errorCategory: '718wjoyqhmlki4acoak4d9j0nipbgasruu1iq72sml7x5yvy0uewyduzh93nm6tpgiw1sb7lymslh12i7dhvanbcsurddfhx4x178c9b4jehg7lxvc8ufbz1g3yb944vaqu8lthmr2b463uvdr4rfp2869jb1xy5',
                errorCode: '2n4sbfbn4rehv9sr9ev2',
                errorLabel: 3038692,
                node: 1857654890,
                protocol: 'nub66e1xalqxfo9agaai',
                qualityOfService: 'c46iap8ysufnjz9s7qtv',
                receiverParty: '5mawpawx218om7seunbkpr20zpjoul90nm8kab9nt6xatfq3g6eipg8pj4e7nja2q1c67lz9ty4deo81l17f821nub7l5qh66hdaiy3r09z2f3cty7wba6bc70hfo0gz1rqfa6wj30ksc0pwmljbud79mgg4kw38',
                receiverComponent: 'hlzlt3gtp1fjsx9ecr7p68d96ciqu580f2oo8l0fekn423ccww45g86j2sdfdlg94nlixceufiq3n0gqdprv4xaooifviornchtzsco406jrk0yasm8x63uhcd08x0oimzfr5ozsggpndqou2u6c0q1h4kylx2qy',
                receiverInterface: '812z7f1y0w3jrbl2rx7u3605ektdettcqftw4g53cye548fm9w81ptn3iun8juprrhrkhxrt2avf5plejjwkrawcohn33oe9zj0mvkx4gwnai3t7fx3pxtinh2d4qkozjg3oafhys9t25tx5l75mzv5amccbbkl1',
                receiverInterfaceNamespace: '5t9se00e4dg5ermaxia6pdnmvqo1dzambkxal3tkb4byedf8288678l57dcfnm2etwoiiujanoitlf7hkkeh0e6igx3g53wx0gvjumdaqzppeg8gj411zovtb48p95uf37so52jumisxn9jo9ks2xyqbqlwkdo8h',
                retries: 5348341371,
                size: 5637690927,
                timesFailed: 8147918796,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'fkf35xkxryml56ls2mcvs7qvfpmkycxdaz8kvtwg4h2lshh54e',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'qwx3vq0261dxoezekax5',
                scenario: 'v63ts326rnebmrad5ozedu2tndcxsv1mr6e3qujmgsaxokfo82x3q7abke7m',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 04:54:18',
                executionMonitoringStartAt: '2020-07-23 15:10:18',
                executionMonitoringEndAt: '2020-07-23 12:33:45',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'ui5j8ec1711vcvf8swjxp0p1wl2loxxzngt1f5p5vnsrnfscf4aixsckywm6dovnvv3220lxj0nqfjwn117037pphg8u3lbw9fg4940t845z6snm1pahewom4g5ds4vatf1brhhhhp3vfbtcqsoyv5ibkelgj8c4',
                flowComponent: 'hpbtmcdc1zzh0vog4nfjo2330vrsmvgymtjoxofv51tfbny139oa0fbd8ldiklxs4rvjhl6rdm01vo0vbzmromhlu10nm7tw5tlk49eczatz9yxdtrukzkuu9q2b29o8mmsvg4ur232coxhspvx5oijo5mu2wttx',
                flowInterfaceName: '0pv04pwnhtdpdt38515dk9x4cjc3qv21wnz3o2jrqalactj9lorgma7kl9r4ashc91o9k32ayvabuju9yfksrjw2fmpmhbweba53c5z65ydfws61kt04tw64qvndpz3aszlu0uq0oxqh3v6plpaostlde4dtt47m',
                flowInterfaceNamespace: '4j6y0636t2q4zvcqmuvjlbcnrcpxsr32uek0tvpbp6z761hz4nzimnea5ec5rfbp681jkjd6yilsjiepvkn5wcorj7ou66nkqfeiqsd3j5ah8e6ahp1ti0qo9glbzc3aogzc9no0api1vl3wr2oba89x1060vwie',
                status: 'SUCCESS',
                detail: 'Odio id nobis repudiandae explicabo quae distinctio. Sed quod id ea dolores fugiat temporibus est. Laboriosam voluptas amet.',
                example: 'ukqddec55qp9brtim79b6li5e9t8bq7gxood78ct0iqh7hbyemrygrjsmfcqgm11ep9laufpdu1s9k3xulu67j1konnt5qexkio8hrf5bl37awkkzlc5xi4wollqrbjdcpvr4cu8sv69plvb559hhvxeo3rijvqd',
                startTimeAt: '2020-07-22 20:55:47',
                direction: 'OUTBOUND',
                errorCategory: 'kv4yz97usm98kntfpcbndajdpi5ibdh2lx7ljljy78cpwoou8kffgmapl6ws4b5orbc2o8wcrp7iwi1o5whh015wjgqhqpg0ggpl0mkj48684qzggnx74rrqmctgir8dkr4rxf56hd154jdg27dxd6w70hlbfcb5',
                errorCode: 'ia11lkng6rs087uge8do',
                errorLabel: 602321,
                node: 93537773462,
                protocol: '3frbecuq0ijnn42xb1uv',
                qualityOfService: 'hy59n33t54msvumjt5wo',
                receiverParty: 'd1aexvy28y0i3nui1dsgdqxxryrqwe2749n7n4101l06j0jac8i0k9l6zwygxuni21visezi43lfh1486hz8p8rbpkfxmzji2q3vy5t71jbrwgmkeoxn8i0mep6bp82y27m483n40m697ztpbcayi8uizkygtr8t',
                receiverComponent: 'kcv0v1xgp6s1kbkes9bmln0bsgdhlmjbzsfxn19n5xp0gn678s51rk44l0atqtg44jr100jti0y9b4ai2h1uoee639snrcufmlehtt0rwrvlmi7bopuxejarr9lkgrtifb7s1hl8w67nmwmoesy0nthjcdhwvhto',
                receiverInterface: 'ejt17simlkqs1920rr6txr2x5yj2s7osrevx2tgay3ixtvwuqmfkvj8urekczslghnfdpog83mp1uqobot3iv6vhkmwelx0n1c7d1hffa7ki78ojm1f84o0kx8u7w7lavnybqxtamobzhcor24u2d4rdyp8mcqiw',
                receiverInterfaceNamespace: 'nsw4kmkc4yhse4felwnv98n5s55k5zff39j4sb079mfulhzb0ti1i82nmikn59q2a2hel8m8d6as9qws7w8o5a6y6xfljiojegmfowwgt3sanckeysg2dkxxyf8315qwc9lg2xm14ewp8mtkfj3z0t0khpg235mg',
                retries: 3455011053,
                size: 6278207802,
                timesFailed: 3779173674,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'fph6z8xlnejwku4afgnxmb0zbx0livk6j66lgwtp93vq140kc6',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '046au6zzlzagglqndl1y',
                scenario: '15meraazxi0xwhml2wcbwzt9r36uyvjh8s0oo0bnk62x669ea913ggopzmqp',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 07:19:23',
                executionMonitoringStartAt: '2020-07-23 04:04:24',
                executionMonitoringEndAt: '2020-07-23 06:59:27',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'obc0f99rym8slqly3woox1buet79u86tnkiq8dlm66ts2qvg7dqir6ziw352jc8am65e6rsy9j50x8ta0vha9yjiasdyswb7lmwaee2vah8h1p3bb2qftjm1ylpfxclcbsj47y62nqnjdg23p8wlmjga1yabkjgi',
                flowComponent: 'gcgif9ujwl7v0t7saulfq69khj8bmspjqvgv3a9ewdxqhrrig5o3lw4c3kruhs5odbkvl8xdolcnykkhmrtghn1fsru40blmae7pfblkxrri8t9x4ckga2h37ionkxvveh9otrd0rykt544v52k2kkamu1g1zghf',
                flowInterfaceName: '03l4cbcpghogeqos1wlbs10puofs4oub1ml9h818g6nvqjneeadwhgje4k963tmxy9wu0hbz1h1vjvrq0e73hwbh74kf4esfq5wed1hoo3350zcywfiqxjfyxeciuzmq1dbvyqj7sekaw6bcszfrqd755qc3why5',
                flowInterfaceNamespace: 'k0zjjptj91aay0nioh9hxkh6ujavf4pvqhjmcjdbfql20i02847f0r92kc9jzoi1u4gici6fhrus55vlrsg77pxog1olsaqikbucfq9uqcx0irc454x6qrmwjtkkn1y84lhd1b4vizf1bw4w67xv433ganlbbdyh',
                status: 'ERROR',
                detail: 'Qui consequatur qui ipsa ut qui. Nihil eligendi sint distinctio quam numquam dolorem nihil. Eligendi alias cumque provident officiis velit aliquid quasi sit dolor. Quis culpa pariatur et ratione aspernatur. Sed ipsum aut.',
                example: '79qfjvz5pp7jo2wp6rvtnqv12g1o8mnkjev47ztdogotkdtcyp0uj5jlannctd5da9wftguz102f1457s3vmwbjxrbcpsoothn8vuqgoarutk657g2umq7w1otc39lwrbu9jdrxqascfq5x81io7uiptkknf7hx0',
                startTimeAt: '2020-07-23 09:10:52',
                direction: 'INBOUND',
                errorCategory: 'x8eqghxti1w5nhd3bcw8brr1p1o11vk0x58jzvjyx1l9v6gvhu91bqht2i62dm1kxwggstfrojnsrco7qyh6990zw21v8deto0br7ve6si3bigzujk9fwymm8ije66rydw2mnh0pvpf17b1gmp8lh7ix82ra54it',
                errorCode: 'u08kzdm3rz5eh3roe8p4',
                errorLabel: 368643,
                node: 2289620408,
                protocol: '4urnzk6wvlioadthhgca8',
                qualityOfService: 'sfxum6atu5kzollomzuk',
                receiverParty: '82xhpr23kxe1u3277dccmg4fp0tp04g4cm9aobcunspn4jv7b3zy3vo19puygduk06ny8epu08mgco2q00cnjcm22ei2wzaspv37g0uwjb7joofamvk5gl1tddbcb8i2akwl89mqf8wn9peee5mla4m6vr0zedv2',
                receiverComponent: '7ztvp5jsbnqmm36t1lkj4l7tponb1xz6xmkcgh9p8j1m5ful9bc8wb6rr0hdvtcacotay4vlmr0c5v6wom8shn6yqpys1h3pi57o5zuv7uq7gmw19m5smy7vqtdp9v5uv10ozfop6z56f6nkvclfbrmsy7g51n14',
                receiverInterface: '4xofd9yalk0ni3bof7dmo59kwkwfk03qvzdp7bao861h7ahoc1zbwxnz5gtwnbqz93868ahjjmjzitq8ijokzu3y9i6bfh76g73ylpaiet8t70yedbwzbvapt1ghyk65p8taa3ig5kntqz83cv1koadc5j2czgay',
                receiverInterfaceNamespace: 'utpnx05rldk21isalsz96tfagk6qasrx3pzktonfxwg5zd8xrzhxzaonbm8tzu1o82wydymf756pjokz9334adnfkftiuqe44uwazdrvz5tdhofboc0qzx0g6vsxlts4l4xz1610frgj8wps721le9lw2mp7fxtb',
                retries: 3041981090,
                size: 1115143067,
                timesFailed: 2165327651,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'amxfkym6pu9w38sf7ui14bchvdg7qa194ux9ma2a9gadpvcuar',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'n55nzzxqf4r6u00ph1gn',
                scenario: 'h0tqn42vvnjhvfchx49gvh2ezkqgmoqy325o29qyvysqh8woiznma4lmhz61',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 19:00:13',
                executionMonitoringStartAt: '2020-07-23 18:09:35',
                executionMonitoringEndAt: '2020-07-22 19:48:56',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'jfvy6x9ftximxs5lw0rf9mtkzwrsttvvpkxy2kepos768nxe7rdt1ayc1vdqj8an8olf7uawo8njzede35n18kmsclqqbq2hjbn8k6b1fh1s48a29n1mom79yq4r7lk9p9fwzjdfesdq62hljev5ni0he5thz5gd',
                flowComponent: 'ji2djlus5ck5qkmmol0r5o37lkbfk4vk9bhxn9u4uz2y41j453k2qyx98vlyuhm5fi113856hhkega4xsoq4pgacxmedvhjlc469lri01kau9as1jlkb1t3pydwyi55lq850duiaaip4xdwixr2yevmndkiijfhd',
                flowInterfaceName: '7hvxnpr1ad5jm7h95x45b3i5ms2pncrzl5glczjod7767qn1yjn6ti68jh1dh2ay4ea51buxeda4y3imwa5509826qd17sfbqdcikh6n132c4y67z5br6bqh7mthexvouxdr3jwbo7wl2z8ge08v19g46ykmy217',
                flowInterfaceNamespace: 'uaqehqmjui8ga88m8mq5syfyve3b5u7qfxy7dtxqy7l0c0jmxxfltoqyzageqk2mitfyqv100k5n3kqj31vy3eqoiv4b86qgc32h5dm389gi37q4miujfwemckswzjzjrh10ug2w4u3azqldsr1bwpqlqgwkvte7',
                status: 'HOLDING',
                detail: 'Provident est vero alias quisquam ipsum et. Sit ratione quo omnis aut aperiam ipsum rem nostrum et. Aut et nemo eum et enim. Consequatur dignissimos animi sed. Quia sit recusandae consectetur.',
                example: 'j4e1b6rwcv31ra95yogpp27sj116ultbln705l97cxql77tdxp3w5rpbovn12aum5jr44565udpnkt5xtpulg64e2hdir6p3qdzmmhodkp56m5ddftnl8tpdw1bifk4tn4pzvapuybxn19v3gc005yd7sv511tek',
                startTimeAt: '2020-07-23 03:21:51',
                direction: 'INBOUND',
                errorCategory: 'eoa6g9rl647tj7r7u3diw2ijwpmnhdcwloydy97ffpum43pvli9q1zbggxj542l8zp2mk185lrzdiyw03qsl32kp2wr5m7m2j79jpbxwlgmkeaq06jrml5ampsyombco43yconzlt4s0zbe3aa2vqo9d6kgbwxrh',
                errorCode: 'umlz64697e8zsohz74o9',
                errorLabel: 561310,
                node: 5468628714,
                protocol: 'f32z2zyfh2s6vishkj1h',
                qualityOfService: 'kgocm88x9mliqvaxunzn5',
                receiverParty: '3w4nqxhqyqef1i6dj86f2ase4s87w2mraksww8lwwz9cxkpiwbspoipgnbb72ejtv3kya8cp74uhhcl7rud92r86tpytob2f53n15gou4yltor1ixvkyyspjgzlznnb3ystdr8wcv4r1xg9pn44xnzfvucxp23s2',
                receiverComponent: '71uw6weua6inz0gmnbh1lqsyyd6ftre1opqmvcyqhsskq86c2s21t4j2jkdpdt6glo9vp83oh5fgjqo7d456h7gywgphiy32972edyzzovzdy0dhwz15p80z99dxjxe0pdoh5fco5kb5w84lnytj3mu6tl51rmjk',
                receiverInterface: '3k2p63mdch68bp68apy738d71n5si6myoyij1vb5xht999fmmmbhiyudpny9vpggpxlcqydwk7okqmd9wq2ztiqupbju2dgjzwv0hz3vnztov0gg6l1v5rnbzvw6ngu7xz4ljzta7w535aamyuj89ekvbqcp76l5',
                receiverInterfaceNamespace: 'dbjk02qdu04pppi67aisp1ezqy8b5dipbzffpf1efgfyzk1v272c0rc7svq5i0ds7hvx6toq8rpqviermc2rq29596s4luq8zcmyh6c6ccftcyt19icugtlbpdn7fggc26kpswl4losldtohntxd1mumqm8fsd5s',
                retries: 5206639874,
                size: 9018149414,
                timesFailed: 9846458990,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '1yxoog2vn2yyl3wug357uu93pzk12l8iwunjsk9t28x5nkbqth',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'ncw06gwiilqb45ao9hn2',
                scenario: '0we2iqif0o8duyamfc6wdbff37vetv1scdu7uvdj7xp16pgc9dx4q59ctmhq',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 19:18:25',
                executionMonitoringStartAt: '2020-07-22 23:51:00',
                executionMonitoringEndAt: '2020-07-23 16:37:19',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '7hgu0t8onie7py68yegmkb0y1y9svrytn7wjmmbadgqbrudi1tr87qa0i1qfi8omc6dnlyxstajeh95wvy4a4jty1uvdy6ot60l39cedownfumekyy3ns3dnjfcrp7xjn2q5viblscea5hq577u2iamod03ok8vl',
                flowComponent: 'xmnuhna3sp1m2a88v494zd57foiwv8c31gyycrrwu2zkj9tutx68qpepl2xwdn0nkpq8fdjnobl7jvgfd9hhr4ycbpdgd3p0otpda1kfkmeef95wuit8jfdesd30ahj0c76htumsaehl9ctejf5ktjmlslz0jr7n',
                flowInterfaceName: 'akqu0l4qhhlqabj77c3z9093rh7gyigxr08wjqhoedbcv7flf3qjt9370koamtvv735k6magp972qa93j3oiyqasgvhkbc0adlliuisrd9rfim4okr652odzjqufd2s83mngdsmkkhxkpfv2z258xznr8x11j50m',
                flowInterfaceNamespace: 'b8s950aq8r9iui04wz125fqfyodw4h5nmap0hpzf7k9bgwm0sgsvjwt52hut1shi1c0xtxf0yo9tjmjzyp3wr012t4boguya8b40jr19ysd7e28b109257sgpamhy53ns61s69quxz8t85qrcmv4lnr2e2ezjz3r',
                status: 'TO_BE_DELIVERED',
                detail: 'Asperiores laudantium aut dolores accusamus eos aliquam laudantium. Earum provident aut ratione. Qui omnis rerum rerum molestias consequatur dolorem aut voluptatem eligendi.',
                example: 'xwh6cc0rsqzw1ftfh5favjpbojb90nvid305x2io74m4xo5akozgadiijvoj97na7h3k8hpbef07kl3hm7q3t4aycrh5tibmglvr9ovq29bk9fbxygwossf5wphin58jg47t63k2lki3zlcz6pj3lh2z00jdp7ct',
                startTimeAt: '2020-07-23 05:57:45',
                direction: 'OUTBOUND',
                errorCategory: 'updwahyjo313hdtduadhxavazhcba5omjit8ypem2ii2idg70hp96cegd82tow1t4duqu48p659eo5cvwq9jqw3w120720lrn74nwekk41go4nxmznvp2hbhio0hv8m4hl2ghxoh35vqwnfcg9x86bllu3tgjdmy',
                errorCode: 'ju803fsbfrc2mv6xy38h',
                errorLabel: 994152,
                node: 4060912310,
                protocol: 'hzo82xrnmubcyy46z89u',
                qualityOfService: '45ri3kj6bmu077t7l0v3',
                receiverParty: '4ar3lh1conosr3b6ku8pijzyjqp5co82qiz5gahh3iclg1rt7q4rs5sela21jqr50ilmu1tr0b7619cyuf30145lvuuamvzlt5vw4ut9z1j1gqdc3hgywy2uq70qrwj4of8fntrpx48s7lc0axs2thdoo2gi1b50w',
                receiverComponent: 'rfd5v4db14nlnn45old0p1vywfww36o25ed6acybzj00as575us9evs760musnhzx2c2qgsgnxpbgas5gfmy8j0fh8agbmvv1pqg7b7u4p5ij412sqpl8ijqfsiwlmosc8deh4mcl1fw74k2swnjvn7vbho56zsg',
                receiverInterface: 'en5y4ks8xyoy4xffsm0ocarqz54wye6n7ah50h3fu5x3h6hav1vw0wr6gwlcqghnyhcdavobu65gyeukt4gaah71pgv0yr12c4efmpt10w7k0i6kt5sp00ejlsbsftxpzs8413tyxvzh7a0oi7l0k695z0db268v',
                receiverInterfaceNamespace: '3nj4z8hzkb9m68jdjlm9nwkdg6eyjd2m1jhi4ypwwwfhqll8ir342zb7bxu2aq8e5k39mz0wga0q4br4r5xbe2r0qvj8clxvzvkppifpr8cleps4sp201elup029v9gc4ox90f47atr2t2k3j4rjxmd41giy612i',
                retries: 8881692403,
                size: 3415795324,
                timesFailed: 4727231771,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'u0sojtpgc3dyef2xu8m4i4ali9gsq804zweula8jv4ypsy1th6',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'oxw640j5pt6kvur6srmy',
                scenario: 'n3gk0e176gpljklkxopkwcb3ch00p4lugm9ndi6b8y7cwd7jlkmtfqnos331',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 16:07:41',
                executionMonitoringStartAt: '2020-07-23 08:05:23',
                executionMonitoringEndAt: '2020-07-22 22:09:58',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'zcj4ocgynzxcu8guqjkj8ildki4vrnpe66at06uhm4ca5nus39sv1u07fydvltb2ou7fuk9y5fk8lmrqczof2snffr6pkeuxou3jh5fws47bj2d3gw99nrs7p9i99sdjpduw0c2ekq3j3ek3xhctel0ik8aaq1dz',
                flowComponent: 'et41mwnbqfs3y1b5pvj2564z3569qomi1va6yrxi2hvaj1rkwn50ej55kdvy8j3h1m9y0upees1x1egltfkbvl4m8sg70mjex53nd81ud4zmabj75zwypwmmpgd8nwmc6a1i8lxjjdjoa87ttodd02jtvi6swecw',
                flowInterfaceName: 'iatt5i8u9300ozt4bulgffoj1j5mrskm60y5dxsvzxgx1pcz0s8fbydizul41ivbr4d8zqfl48u0fsvotcohs2p1i1jo1a9vet7mq5fw53pqv57ffunpmw3fehp5cxb5q3vw1arlhondg22xz6l9roe2iexol9kl',
                flowInterfaceNamespace: 'j0pe6wjt2kqyljx82o367ewnhzltaebhq8vsqzebeph600948nmgcnz2n1go7gqwi5h0v8kxt9nigkiycy5h8601ccztqnuu0uid95lgjin89b4ltxdbrhi8dj45ewwt1a50zr6uozjw62jif8lwdcsr8k40erzn',
                status: 'TO_BE_DELIVERED',
                detail: 'Est a asperiores sint excepturi unde cumque. Ut nihil impedit. Consequatur maxime unde enim fuga nulla voluptas amet dolor quo. Sit quam repudiandae sed harum et mollitia. Vel corrupti et.',
                example: 'ss5gv5rhucw3h5vyn6htc2d7edvhs2hamm4qvgrwswgb9o80qg9oy0h7nxxp1z22279a8x89b0dtioja9euj4hcseiwpvaoijcwhdcy3oe2qykwvo689bfv4h4dzqa0plpp2bv8qkaxipem3nlhepl4va3vo0dr1',
                startTimeAt: '2020-07-23 00:41:54',
                direction: 'OUTBOUND',
                errorCategory: 'urpfx64bu8yjlq8vc5z69pk2xgqnznelocudkkh1upkg3l3tt42sl37j2xhx7kxh1fasmhul8mswk1gvuy9l336au0mp5f6lkh4ytf08waarqdvtl8twoepio29sox2zboo6zltnbizleorczg5jaeswe457bv96',
                errorCode: 'g32i43s7r7jz62dkwpyx',
                errorLabel: 945252,
                node: 1730351409,
                protocol: 'cvmrbixmakf6sxhc45q5',
                qualityOfService: 'i9bcpav95vabjm02lbh1',
                receiverParty: 'yh7sbmy9eitfuxb778k7vegw1ug8smcb94ye1h4uk0dpsx2g2hwqgkiuy160413onwu1a1j9taxlqzddbwqe11nz5ov95wv0m88dnjrkrdfpjhb4aqflr77843l6vq2lkwqulwze6iudqm9u099iwmh0ixovgqqp',
                receiverComponent: 'z7201cgozcroknkpisbiv61hjgyp2wrzvknzi479up9sbeic6fa3mlgtigtnxplqnszkq83yepiyvs8axwril7gxqq34ufki2wkhgez4jewar9wld50u5kk7qo661kupcyne49tdexwmipxw26til1rrc74ymn2bf',
                receiverInterface: '649fuv01gfr56hglzw3op4cnj3ucfp8dzx2rkvf9gb3juipiydum2f7o6vc4rrol42r9d403dy1ykljh1s93v4rows52hr5iptxhbctxl6qngup5xzelh0o0s00ys0vrp56dseeq83wibbvd4bpnsbub5ojmwscj',
                receiverInterfaceNamespace: 'q9rfn3xtgunrkkbbqjz6q5qkd7cx6v7fk2re8r5s4ktzijndoawtaw3ljvx8abokvxjkcrboxd7zowbw6vee64zxm6ohrjgvacjlvfgqe79r6wsdk0etc05qqc6s5dyixn6178mj37ahmzwcwoo40yagcn4s3xhv',
                retries: 7128480987,
                size: 3446624155,
                timesFailed: 6378338104,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'c2v0txbdbfoajf6hlvo94s2a7szaidgn0kqd06riclwq7ammtg',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '4eqfktmw0t6dsbv7hzgv',
                scenario: 'r64j1nwihan22wyqx9vhtzbhzp2ryl11kj762l9d33zgvvqw4o6txf9l928p',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:25:41',
                executionMonitoringStartAt: '2020-07-23 08:27:39',
                executionMonitoringEndAt: '2020-07-22 23:11:11',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'iu5qhcm3y7xvg9vcr2c5rzmso4yg0hnwabip5fjf8bjk2rc8ezm8ly77l2q9dgr1podr0qxulkvcl91nlhh85xrcnb41uoy2or77bi9968goea2jmrv6wkrpjefzoj16f00u3yra4lacxtwf280xalkvbb8dmn52',
                flowComponent: 'n6ci7czc1f4lx1i31jvjkmu7fkwzs3esl6ox82a14e8sckbk612ya98wqt5r22a9dmp9mntuur8dhby50d4loj7ero1hcxnu1wxv1ud7ygj27qnp0tjc1zeelqnb6s1nro08jg0ag75viiccs3qmvjoof6jljtqf',
                flowInterfaceName: 'bt4fmpksduvudl7cuwj9htsr4x6vc9zz3zumjwcxopzgemiantvtt5t6vknj54qswt426bi4mox8r6by44moj2olrph9b2673lzrz16lgl5z0vwla6x2jpkdurk05plaecuv9vzjybwv57r7xrwjmmwufr4f8z3i',
                flowInterfaceNamespace: 'smgus581pl02eege8k7c8belg6qmbfxl95uvuskjvniswg8cp6wc42fl6iczvdpbniw1us3zk31c417s2hvaazd0shlwmvlyuwhsqjxodi9yumhlmgywhn05gh7a5fl7h79k0ewicmxs1u8q2f2up65msavasipe',
                status: 'TO_BE_DELIVERED',
                detail: 'Ex veritatis officiis rem placeat aperiam ut voluptatum est laborum. Quia necessitatibus nobis porro. Excepturi consequatur eos maiores quas aut. Dolorem asperiores illum exercitationem nostrum. Animi quis in aspernatur.',
                example: 'cumzo9y7pl23o8orxsctqybe05n509cu6tcczmzzo0bfr1e2484egwi6hn5fqw7zp5myvtf29x5mmnnjmyomys81ldyyvj35f7sqs6laoqk3fq5a1hnulug568uwm14obkjwi0pah8eafn79dp38uuolchvqrbms',
                startTimeAt: '2020-07-23 14:36:36',
                direction: 'OUTBOUND',
                errorCategory: '09vemc1kiixsq1n79hknmqpzoy9br489yx2bddqvflciekn61jkb3eexsf7b56ivh2squvjcpv8hk4z4hnlcjqp681p1ppsz9til0pfbosi9b75zx3kott65gvug2gv1lp3uo0kxeiw4nc88f3usrq4bo5aq6ftx',
                errorCode: 'opkvq6m1x54w6pylvm0v',
                errorLabel: 479513,
                node: 3584084977,
                protocol: 'vq7bo196obokadejny0c',
                qualityOfService: '0ny2recq1x3mrxp88iup',
                receiverParty: 'zo1pcqa693gwgjop4ru8rxdn8cjzbiomsf60l7jbv3qs95ff2aycze3njx5qf64zpqgj5w20vgc8zfveifr9uuot4p0rgevu4y3u3rgoe1uufw2vq7na9l8iyiyknnxha0u0x6zfibmvg0cl6ihii9dejcj9huee',
                receiverComponent: 'ru7sg3n5xazpqat79a4olq9fcwbb3399dswwfubobc432pdz4aiz213vrawbdkx53wdudoa2yk6t3q1ijwj91ein9tkii5bwuoc79oxlvr9ued3qqze37i6usrmw0h1og0f876hylqfxku7qexfo0wfq2pegzu50',
                receiverInterface: 'bgy81kz9g5w5ravg4ervw2mldsns9mrsmhif4q0sxh891f5zqyntm2n1u6eg5rn0pbcxqnrf3jdsex8xs0pxfhvk1dgs0fehgk8b6ud93l7301ujb041w69msq9t3gm75307stwie3gjihcll058um3oexcp6ayt8',
                receiverInterfaceNamespace: 'd7awez0xxblwv8ikuule9iphdzhg3ihrc0y3ugf7h9z005ip3j6llghvykmnumdqh8tzn7yjl6g3j1c91z4scu36fc1jlnvbp7p8e327rfh4wmauvdvbkaj8wug8v5doxaxnf7gr07tzj5526aio93ryk9lhnms2',
                retries: 7587910459,
                size: 7541816898,
                timesFailed: 9082587842,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '4yqiktv690bdmowc3jwb7pvfesz60p1lxxg9syfm4g0uvjhe2i',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'qu8o32k78os4evtryqw1',
                scenario: 'cck7gsvxa4t4jidymhqcyj8fhocr5xwr8i9m3vqcuzjjf4kxjtn4c13acel8',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 10:59:41',
                executionMonitoringStartAt: '2020-07-23 13:27:12',
                executionMonitoringEndAt: '2020-07-23 04:40:03',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'frctzzn7egh4eoageasrw9auemznqe3isvzngwdglxc8k2gcx1ii1ivb67tpl90yy37y2llg21zk3snxwdg6l87wzgqil9423l9whvu5c94fv1pjfnpvgtv8mjqlqb93apz19zydayxglqk9vyklzzh1oq59s7me',
                flowComponent: 'fklbhmqrm7zek8hqijrkra11vwtbghtisoh3zsbldjy87v2umv8jkbj9wcv8pc13ve7v6vfbh7muucuqar9xr8avquxcd6j5bkkucvxuan3y2enyhz6lcrve8pqb2nyzgznvh9x0qdsdxfpnmm762493tsovjbld',
                flowInterfaceName: 'dxkl2weoj3u3mvnc23jahjgp519wuaiaq718izwlzys1yaw3jotrvyz0tebqy3e0qp0xe6f67kg23zsucf1wx3uve65rvhhaem7q40o9alyurc84m96ce0p5toiso49ebjjocz9g7p0memsowm2r9ldpx8gsf2yj',
                flowInterfaceNamespace: '91soxglsgayyw3oo1dixehgta1hjlggmc6reueb1t2s5lqx5cdbjoobb7gxvg97ode15slnfeqv81kqkhqj7tmbvs3ozd4rudsj812gmln3eumofiv9phkf0gsyp30lmch9bg0pq2yzko02irwx4zdg0k1wzedd3',
                status: 'DELIVERING',
                detail: 'Laudantium voluptatem qui eum dolorem omnis magnam ut mollitia. Porro et omnis. Mollitia maxime natus quia. Delectus illum esse voluptas nihil dignissimos est ut velit minima.',
                example: 'sj960xsr93h28ecvkssge86a18o98y1cvkdshqa86137hz6wyuy6t9eobtn6ed26qj88ofpnw0hptjtyitn7fet5mfll7xrmxv89y5g748o3mhd0onazl0stu57v8hs0zfigiv46yozolx2f43jgfoutj47czrcd',
                startTimeAt: '2020-07-23 15:50:13',
                direction: 'INBOUND',
                errorCategory: 'zouvkyn92dewlh6hm4e69hspmawde4qiyvi4n5rgx26sw9t58vhczwlrfktsw90t145nk3ry10898cozj2ztt3a1njng02k5nu7qlk3gch1tgspp6m2qe7mc0xv0eyjz006ut37h9m2uzr6rnckfnd83zhvu7v2q',
                errorCode: 'b5jpesualj9ni6zj9aa4',
                errorLabel: 772472,
                node: 4814151995,
                protocol: 'k1ota7ev6ghl4xj1lwll',
                qualityOfService: '8239goprnkftpdrreflj',
                receiverParty: 'qrc8vq6vpcdy43n08pg74tnvpsmj3s3gludpy90m7dpck2lyxog5krjlggzndrpoe28pw2gftqx21t84rn4lgdo6mph48l3gdrhqhuvoupgzmf8puc846b6bnczzizkqr0c9hs96zdvn9v7dyak91o0zeevft26q',
                receiverComponent: 'pn92ozpnq4gaplf9i6buvx0huswz2tyog4imsaql5u4yr8enwrvwmg8yojnnug8qalv3o58dw8dwo136946hbfelqx4qjp17441do03ck1tbexwne08homv300fp2at6qpqrfimqqhhoq7ihug8dtmsdd2x9u54l',
                receiverInterface: 'agk7ytvy7wyeftnuq6omkaqcst3103vkr6rwagct1avs3s3cyxwmzg61qg39no6laigd9dmdw2nws37umjcil6qlwq4z8b193uagwji64h1ns9i2aohmbbse3akqepqyamkoh5df5sfjrmbkiv6zw8umuhxdex2t',
                receiverInterfaceNamespace: 'rpqo3otus7xu4d35cvhnhyr9e3lbnxescf94i3mvgla54kwovrb94g68tsdkqe25sx4jajt6inouixucfffmftnqben7gx4aefz05zcdhhq7j32f0k5px4i801745vka2u1v85ne5hb601q201xgeniud0jl3k51s',
                retries: 2732112522,
                size: 5522699927,
                timesFailed: 6836586694,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'z89m49fgo37hme1n5nv87v4pofo27i0kxgetjojwlgrp15alna',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'wbiuaxz7zl1ffj555mle',
                scenario: 'asc9cglmj3ut2wwj5x2nqietaqr0j5vk1rjityw9keeuvg6opxt91bhcj345',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 03:21:39',
                executionMonitoringStartAt: '2020-07-23 11:33:26',
                executionMonitoringEndAt: '2020-07-23 11:41:50',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'nrxrk4yu40tgs6nctp8lmhw8uc31wxgeuk9now97s5o530in80ssozmst7sqv27iu1st0f7jat9shljynv4nq13ft5s2tgqzlwwjs5cvu3jguxjmiimzx1ifsrwt2l2ncv0hzkcnjx92nfc6ixey1h6ins974bok',
                flowComponent: 'lv4uqxqu8ja7x61k1fsafxvnrb225cxx0gltjwqkbar9uvrbjw52125sjp1y2zlfv401yy2s0y42atsjsegiju44kj7cndytwadehskuuru24uom4o76oxzprfm2515gwrkxwde254zfoj23dc6948lw6r5x4o91',
                flowInterfaceName: '2tzshsmpagblso0nhg1dc05ilw23bvlq0pwdmjuat9naez90m4hr3ats313ksa7vwmo5c31upd2a9w8xc2vnazsozsaq4jlz27wtyjrj592gcwhv69fy572n7j1kz41l6uka8b89m1fcyabag3afypgv457fxtwb',
                flowInterfaceNamespace: 'bcyi9kbh1us5v1h91bc5klmmxa7frkb30etsa3ffbkdv994mxtpnku3kvxzt877nns1a6ze772bogbfr0mk6a8d7erw9l7gw70c3h4sw5ai3hi1ty7h63apybildn3nn5vksjc7n0xjoskiuhvet9utroupaatxx',
                status: 'ERROR',
                detail: 'Dolore facilis id voluptas libero consectetur sint. Possimus voluptate alias velit quo voluptas ratione aut dolorem. Dolorum rerum assumenda sunt.',
                example: 'qs149dr6arz9qzd4zatp2btj524bwp1nrh98vln3m8tpyoecfuh3rkhsyk21j2qjmh8uwtwkw847ihjb58johmn1ss6qbezv1abgkwhpe030roij1d4v9yarv3ykr5kqlak1qg6v2pz2ma6r4n4y1njz11kdxc0d',
                startTimeAt: '2020-07-22 21:39:00',
                direction: 'OUTBOUND',
                errorCategory: 'xtw8ppi7sntl5qkyqrr4pohmd4jf2w8xybbcj9gy78k3blg5sdx97btvd58w7br8efa9o1ose7ghbouc9r276oq3eu4x8nlrxc0wmmd6xdbu8bepsw5tv04zrgq6g0n8l78swi8p0q0gjckvszdlgctxfcj7g20z',
                errorCode: 'qni73pmkixo0an8krgt5',
                errorLabel: 397640,
                node: 7986789551,
                protocol: 'gy489l5c3o79fweaqke5',
                qualityOfService: 'ozth5cz37mg3w0wlztv7',
                receiverParty: '4u40i0rqtj6gjanek1okfd882ml1c06glahsg4q2bzvzzlh63tbrf3gphxawzea9x0d5yo3qbhwp300j6ebfzdc4ymsbsben21xwp32uqtaeq6h9kfkou6hz7yl4jmemiwfrqoy4vmych3e98h6vsr1ti2a9r1gy',
                receiverComponent: '1k9ei618qd8jpwtumw0ljav3xg9lembnt7qlqmx8r71y3pu5al0dnpe1ynrzd3cyfie6e5zymbblqv9bzpqpe485ws9695sgkfsciwmegu6lbrsrmljuz2uc9ejz01akb463iuquok0fsmcx0ar87j3523xnc9jr',
                receiverInterface: 'szihrlmwtr8zh5k5fvimnb11e50pxpxi9pyjekq1rs7i1dnmcy92dyxqoaajpqp3z9pxlmrujk6i3pq75h3d6yn78q7zz3i3gvwjo0j15lsoamnbas3etnmhw6016yolx9es9977vpvkqvfziagognlnxzx2wtd7',
                receiverInterfaceNamespace: 'oxhkcreeu4bj5d7zzvy6kjxrqrx9uy24z9u530wcdqw811ouak2zhi3993hy3cj7opcb0zo67tum9szi6m8079bsx3j66agwy599hqlntrve5wvjl7h3kv1xaurfaysb4c15z314bow1kopcwjg4gj4t8b6e8c4h',
                retries: 14361395669,
                size: 6598089271,
                timesFailed: 1994381312,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'a2zsqbm2ildg3hfboxhsb8urthm3ksuz4ny31aylps9kwhx33d',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '7c03j5mk0ixsdqcsl65i',
                scenario: 'vxi2clejy6u2jl9vlpkd1c571y509t7wdel2i6qidffznafa87m1yp40jm7g',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 06:48:55',
                executionMonitoringStartAt: '2020-07-23 07:12:49',
                executionMonitoringEndAt: '2020-07-23 06:41:12',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'sdleycbq4jdnwaxdqbo0gmxee8wn1qvwq0gvd8kas9u63877iv157q2h6z6x0oxqe72zue1gf2rga0vagzmxb10yin1qcyee41r7segpp13v3k8xc6dsnwzbtgmn5xr1l21afzrcsxrajuppihub4ca5nutg5ugr',
                flowComponent: 'tcdy1otwex1srkxyjzi5dgr73d9xifdsvhw3mrc8x68fmxg6p56ehgjre9lwvmph5mj6iicu5dbzao17rir08dognbgl7clw18kwejul21j2po6o0awe9yuax39c7herzhg8ukxm1ws63buns2hyetz4m4amecq7',
                flowInterfaceName: 'e8gk5tjk9uwwky79n822adllv0fctzvzu2gixrw578exvu0g933mm4ovjvjdflxxo6wzmuu4agvcywu6poo7b57g5bp6w5d0xxp7f3pbmyaognbdpd4fl6g87wdazz5d5xeqd3n9luj6g52su5axgblfvm95j25j',
                flowInterfaceNamespace: '3gxka6piuij0hawsnl3wrnyk5q8ocb4yic49mcqh4ukr43w5hyv3rx201t9ycs5lhb3et1pqya5jvbojyv42n5wlocrs0i6gk6xeo9z01w39m3g3m0g5v2j4161a6o9mt0n5v4g9bje6ellu8ypesjl6ctn1crtn',
                status: 'CANCELLED',
                detail: 'Qui voluptas vel illo voluptate dignissimos officia ex. Omnis provident ut ullam illum aliquam dolorum. Unde quisquam consequatur.',
                example: 'k7ebp7el24ku9c32fe9h08xpleh4pymn025lsi5gpjpeeks2cyaqzrark4ebo6xaaqfh2lug7ixsfg766nzbr3nt8us4x7gf4mmgblzjonp7n0oise5c2rmmedvlq3bryk06tqd79q94izmqyergheucrh6m5ayq',
                startTimeAt: '2020-07-23 10:47:49',
                direction: 'OUTBOUND',
                errorCategory: 'c47sai08jgtsztmg5t68a7cbt9o77ffe26f2cp4i849mxg7rdjja41gmiuzk0oxnhag3tr0xka3695khgbnp9xktumohacj1e00xhy2bcub9iwkq0osq6z0b2jes4s1r3q9wxlxde5cq0c0bodpag4yadd9jptxp',
                errorCode: 'y7s2kgw67q9r1dav5oib',
                errorLabel: 812666,
                node: 4547849319,
                protocol: 'xcndk28gk0x1ew9f6d3d',
                qualityOfService: 'tbtjk93qdjtz1uiqkes9',
                receiverParty: 'enzvivsc3f3fg61t0yaffk3jni63py4nnkz7z27bbrvdlaaa7zc0xlsxurn87jp3xlthkikzafzhhcyxys1ztp7xmfv1cyui1k0h2rar74rr7x5yf9wjhbdmyit1qjc72w4lftu92cb8m99465e0l09rkabzqzgt',
                receiverComponent: 'vnbh6zk94m4pxcy3tydul9rg5b2tqq12l6yf8pxm7al40ld0u81p08qi87swslgkzzrjuronsuy11j8mn2l3nylas98h9yx1vgdhljy17rndq1alsi189zre7x6uyqvgfk3my9li0ff0hm8sdktezww7x88tg37n',
                receiverInterface: 'gsr0c6kybc8dttvcm1oo4bjag3ll05lke3f54fyz3mcqu3gnq4mdot9c1qj2sh1i14n61jdht65g68j2u8kn3ezvo1gxe095enl69moyjpdhxgh0uctv2uaosd72nakdourj5j4fjz6nfzqrhvvwjyoz1iechbec',
                receiverInterfaceNamespace: 'vyvueucvi0vn0arpz7nkfyfvzgkhhg8642fsl9yvb6i6ifzj2m65ms23bxeu4sui1dej3gdwuajtuk7w58jj83yo48io7lcfc6r3rewdwb8dn6wzpr98xvz76s9vt2ech3wgy9xs1ua4td7v683ak9gbvor1ohy5',
                retries: 2356822825,
                size: 16862381555,
                timesFailed: 7974618859,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '2g78usaz1skni5t6detlssaddjp84nr7y19spni7l2ejq17xx3',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'bneyrjzuw8jybljpsqop',
                scenario: 'j2dyea90fbrg7s9p1uyx43pm452b1kjjygwe2dqi8ass0e7gkpn6bx2n1g5p',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:39:25',
                executionMonitoringStartAt: '2020-07-23 13:37:58',
                executionMonitoringEndAt: '2020-07-22 20:44:38',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'hzw4yjti4z7sdrqgagmbqj7k30tk950uesr7mejihbcs8qbtnil18g61cxld7olbds2f3i6qikw28utxtfjiz54czf8wh6246lsfy3iod7eg7xpysme65oykq0wb1f7fk17u2i9t5n97vhgo8rp3jeoibpl32rej',
                flowComponent: 'b4sail8p5mddbzt2s1i6d7pl2hx59pxclyzxul0u4xbhxhniwo1u416alazt56579gpuqa6if9or4iduixdt8lpo0ob5n61e87yfuzrv0590lpsx4gq2zwg9lzcr2o881l9gshm5cb952sngzl9aqwgnzekxgalq',
                flowInterfaceName: '40tl6w5eh2hskowepex2iv6s1d2ygpwk9rxk7r1vuz8m28fnndw866c8sfta6z0id8qi3scf5l053ui0164cdns1eu8gqruq7tdq40y8c09cqmx5y60extmujm7g1u67a0un3xgbw7sfty514zf3l63621uhdlom',
                flowInterfaceNamespace: '7s257io9wszbwa9azmdpr30mhb8lyqwmwrakuor3ule6l1thifbuik28f7qrlscu4c9ly8itb3c07ii0f8bvu3mopig9vzgnebhee7uwd9dd5e6106rxi3a60xap19yq7nxbhqi121tcrujgd4ol0cyr69rntpjp',
                status: 'CANCELLED',
                detail: 'Error consectetur magni. Incidunt corrupti mollitia quo dolorem. Eius est ut. Necessitatibus placeat possimus est at quibusdam sit. Facilis totam et.',
                example: 'y0sci6p1hawsigw7xecnvvqmpofe1z9jm515p1t2c5ssolg1xqwosshsumar3qzt7kr8gan2zwp669p3vavbhqxerjz1d8nv87jaqg1xoew1cuk0cfbmznn3u0xuoolgv2ks7h4x8c9c1ny5nlkls8aglw9vnjgb',
                startTimeAt: '2020-07-23 07:58:31',
                direction: 'INBOUND',
                errorCategory: 'sgv4bza7pqieb4k3qjxvi7ewctfv5hyn0byrgxt0mo759xzwmt0lw12fv6np03fokassumtq1z0j442p3zhrmo8grn5v8sotxahp0jmu7hl1hoaw6e39gxwrofmgeaasyffd9i01ix4uclcmoww4phaztua3pu5e',
                errorCode: 'lv961ktq9l8nqdwhkv5w',
                errorLabel: 135300,
                node: 8454960994,
                protocol: 'hg7jp6d8l0101z82ys37',
                qualityOfService: 'p8mwosdnszc11hu5e1mf',
                receiverParty: 'ur5pk8o0yjwf3jc7uprqf0lwrcbolrdi27bcl2w2jv85vk3dt8lw8lrhzp24u6i2qggvl8ma09g8exct64iaq6ky4zc3vznfynlr3ksmc04tzqh5vsimzdlni2csg338fzr2b0vi3te6hvowuvdy0ixi0obl8dxf',
                receiverComponent: '1rwa7n968dimlj36l8847hydur8v7xt8osb9k1bt7k6ey42qf2numbz4746ldxeum0p2tugh2r05tbksgn67zxbe2lrswd503r9g460rq656hybe7ullwx3gkd6g6u0dejcmvyzc9zxlx5szh3741ig6bcrcs2ab',
                receiverInterface: 'i8xwskgm85ibmtlfkgqm1fy79vg39u7g21oue3jpkh1xuiwsibgumui0wbe8mlcpoyb6sfouxtc2vswhk1cccfy5jx2dvkxevqlop2ehlho4iymywsly3kzrt1vyifute101t7az983jmtdlkshlhz4l3gr2bqzt',
                receiverInterfaceNamespace: 'syfurc4r98mvo21bbubkuwfu1kozr5ncu4qnwbc5wqf21a6g4xnbmkd8hjfdqo7cxun5d8gr7n4qxdku62t4uw3b8cpwhp0kneyssi4vcxtjwmczak3h8z2l41wilat8mqjdyazp5wfpswkxyyczp0vw1f43tyrl',
                retries: 1579691679,
                size: 7245761292,
                timesFailed: 92336438498,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '8npd43gj4ty5a6jnhj5hrehpbrq12dsjcagz4dyaynn9txxwn0',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'ktpj1bs6dh8unheet0r0',
                scenario: 'ojt2vvxq5as34ltlda9jnz5qgp1uzm6hww9pytnvhnkxlhetrvebui55261s',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 06:31:50',
                executionMonitoringStartAt: '2020-07-23 15:44:11',
                executionMonitoringEndAt: '2020-07-23 04:14:36',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'shjlmlci4kil7tez5td45pi7tbcln810z6f6dinnr622l1o6xu2eqmy11sd0ecn5rnp65ghwxhoxpbomw1xepg1fr4eini48iwxj0kmpu11a9c2ygiiomdpjlu6jq801kwchmy09oejtkb5axhpbpzmrgu14zmbt',
                flowComponent: 'p5pev85l48yxdykg3xjfajbrxoqkpulj4shbz49fi0d2ghe0cmmn70gzf0u5qfkaf4i3fhoc5bvuri0u206f5qmlfsui61vftoi3o8fok84jvjrbqkiwdmpvxb2i3ywf12gdrmzjgkhdmmxo6tcdmb3mex2hmtuf',
                flowInterfaceName: 'xwtl3i04mcf8r60tvsvthkqnxb7qmm1ckwsvt85fv37a26g1lpgchwl4yd27e40nz37g30nsge0u741kn50l1o1vcy8a9r2x3enldtzltnp8x9wkmyt7x13ydbdwmmznd1wjk1utiitsiq7dtqs2lc69bxke1h89',
                flowInterfaceNamespace: 'xgcjtydtin755x33h18lgf335ahdtd3opg40988zn74jxu38os4pup40nrexwrxuvwwc3833lgbqp6xg40utplmyi8snb95z4f11p3vagitp19dc8ns0qczzd5xwx5metrf6mae4uvpdv567zycnikh3g9icrydn',
                status: 'CANCELLED',
                detail: 'Rerum sit unde ad illo. Sapiente sunt aut. Similique ratione eos eaque aliquam et ut. Eum sapiente et qui dolores nobis necessitatibus suscipit error.',
                example: 'vb312v9rgj1ros4p2ldqle48rsja4tgghz7amudqs4ald4au2yxbxb1jo6xxgtdi9062zkty7cde1ku1fldayt222a9u41hv2n6en9wxe5e8s0to9qn2j0jpm8mcuifjp7i671ejugtf7lhcn1suyrcta7jox92n',
                startTimeAt: '2020-07-23 03:58:38',
                direction: 'INBOUND',
                errorCategory: 'mao18mg8u8pyxiy73f2vf95q7o4iizce97rpkj68ffew5ub17974cjkygkiel6yforbtvkfe9foy49ocplnxogz8uw86uvybinybp8g4i1zqm9bj6d88jnvow4uygepq0szlog65bxf7tib9ql5lrw6sk2f51m0d',
                errorCode: 'z988o36lkdo00gj6ge2v',
                errorLabel: 267024,
                node: -9,
                protocol: '4egln4yboifoff9o1inh',
                qualityOfService: '0h3bnskmvs3jkilpfdad',
                receiverParty: 'h0r5rm5cswkkwqq6vz5kal97v3arcnsfsx5uy82e5lk86360bnpnaze80d3rnvde80cokk8vqy7zrxrga1f2ikj74mbo465c7v8sdabdgbrcgb8fbhfg8sdl5iezvlqr3sjl1uyh09g6jey0zj7nck8bg18qnk0e',
                receiverComponent: '6oxboemf0onx2oowgbomjievzaxf03rhth2bhj3c4iajmvumobo0mgqixzl4nyro8u7t91pm866lf2aagyfej30725mupvclsjr9wn5qrcufm7vf5vn87eicgwo1wevvpybgq8diqgzudf4o0q2ye8qs392lsaaw',
                receiverInterface: '0d29hcs6j0kivipofwmynac5n27n1n6rwq00djweifwbwr2om18m9evpqna6ib3tah6aj7xl5ikam3gzg9d0s47r80lpmlbmh5dpdr1oc1kajfi93ldg0ya7mffilz426hebptxyvxo8y51hlx24pdhl0sd0gemh',
                receiverInterfaceNamespace: '4oizzjvg5bzi8cb9xqvb46oukk51ne1rc6g438cxx9qj1p3wtzugv6ha0unsuux4tgfb8q3czgz50x6o3sv6ufwwe2p9273l8hlycnjdjvlnhnk46cap48c20urqhl6ryhoip809eo5b2kgi0w8cpxczbftj1g5h',
                retries: 7890255096,
                size: 8339716092,
                timesFailed: 7087882480,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'awujkzx10ibw89j2juklch8mf5ci07gq3kt53rij1getxqeuos',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'mcu0c0zes5p3oujcwgub',
                scenario: '5v4qls4yn62xd89nstq913ef9yfwfk43qzhmytbw456c04cgq40xxuv9cxp2',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 17:46:59',
                executionMonitoringStartAt: '2020-07-23 02:17:04',
                executionMonitoringEndAt: '2020-07-23 16:35:04',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'iwvk4t65s2kp2dkx25cc5m4t5vbikiuc1ges1h5fepy67zmf2jypazcos1wp7ay961p4hb51jytgfn37od0ve5xjv742mfmobm1sxbu0kp6anupl1v7ex66c4krzsnhzkeujfn7aqtmtfe90ffqspvcku3f0zyls',
                flowComponent: 'u94frg9615rn2mqkratsbfq3bfndkkuxq1wz7fsx0s4a90v65kektwwolmemvohyrr12q486tutzrjhqlev70jnnbbwugwtzl2wuk4qo5jc9pa8fpepj5wmiyqlurp0ed3kn6qc0xjudgcdj7lddkrvtpbx2tvr3',
                flowInterfaceName: 'i0otp7wbjborl91jqhogbuctdht6tqoxmpflv75k4ror3dkginzlnfk8omro20l9a6wl7d187wtrib7pnvhwtzodw5stqy5n8sc1fyhyl3gnqkgejh7isqanegx5ciifxdd8v1grd1ahzfz3ybupmp8206d56hrt',
                flowInterfaceNamespace: 'l4rwouctn5omqet027cj4iwj8knwrq6ryx4rln0wvwii6b6h4gm8dkbofr3580ye4gua92uv6ec2magoxa64yi879x83bznch6g1i08tutw7twxxs3j8p8t5pic7c77pa4bhbdjoq0wnkywncgmqdmo31nw8a5gg',
                status: 'ERROR',
                detail: 'Perspiciatis exercitationem rerum aliquid ut placeat. Labore odio vel incidunt expedita laboriosam. Impedit ut sed fugiat.',
                example: '1wjg1zufrvg0iodfyk668si7ommy31ahzdl4279po2wullqq02lt7bfvt0mopkoer414g4tp93fh8bltyjqwthpzvp61jz9026jhtst7q78rttjz5d99pk3eq94qw7p20r42azde6ta1bix7otjpwj1ch3anqsg9',
                startTimeAt: '2020-07-23 11:28:05',
                direction: 'INBOUND',
                errorCategory: '4osqkra1fn8mf7sequim4tnjs4mn48h0cqemsbim9rbeaki7zf316j9qkse40a5jwit7c27q9er0lhtpqiimmvkb7gemotdu0k4uf6vhtg2cefqjc3wryu3u8exowc4psuza45omj02vanuf99mfp4mbn0bdjcj1',
                errorCode: 'fjlu416n5vp0me8lkx7m',
                errorLabel: 158823,
                node: 9446989473,
                protocol: 'bg8ybmf6ady5tbtysywb',
                qualityOfService: '5y2h8gaq0lunqscnxeli',
                receiverParty: 'ypl1jyiou1x54268frv4h0thyjggy6bzbl3n3ka9wy7pwcmfu0ytx8c9snvtp8w5v2cqb5dr65p6bohv6e1vrpby0javnivxatzqj96unvo83c6f6id95gg1rgb4uf372lzd1dz20ahs7dj8lffyomerbq5v788q',
                receiverComponent: 'fdfwbtm4pktmw563pw6nnd3ap00moznuzw7bhyvhii5qwiql6c30pg66y1tldazazfcj3vqlx8cjws4gm6q6fdv27zehf2bco4w1ctougq4knqu5a0wnz5f4lh12ispw84xm2aj8moedww9vd4oy2b6yuip8ykfw',
                receiverInterface: 'mf5qhfgml0v7ldc2a1eics60grkbfu1wk7k0z70gchd28bja0ykvv7cz3bndbp3co33zftkgqyh6xkd9486su1mc8kkg66tuv552v1htwnjvpdfuo348bkjj1l46lkvn96kovixmxajpg5lzw20xgzj6z9a9cnki',
                receiverInterfaceNamespace: 'qi2h53rdjjvyi20thgqet64nr1an6q6q7y7ftsgkhghspsss7r04xv1v5bf4hzcweydqyq4dawrtlev67k0ev6h6zx8eub20gw2xo3deg4rvxzg6xmniokbctmwcyd194ji79n9w66pa78uvd5p5bg817crv3lob',
                retries: -9,
                size: 8520971162,
                timesFailed: 9121454043,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'nc8wik0scycv8ytudrv5qz0vb9agdde3j84jyylmebstjy1zwc',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'aduodbzmw44u18gsqjb0',
                scenario: '2uqnidjfjs3bjaxqmyzre4nik1wwjwj9tkn98brdynu7rrxiqwex8c6wjgmt',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 02:06:13',
                executionMonitoringStartAt: '2020-07-22 21:20:30',
                executionMonitoringEndAt: '2020-07-23 04:24:14',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'nbmncxw64na2vh74fk38srtgbhbpe2jdih1boiavltazioc5fcvs3ypnc6f86ocd4xbeurj9vu3v23homirenpzwgb2r653h51jty895x1k7fjfzobxelfrqyepeglz5byvu1kxcf4cdrqkmmkawsyrn2v69ybyy',
                flowComponent: 'n7hasaq9jkm7d1uduelkr37uyzabdhhjy18kwgi1xy8c1jir3niimhe76p5htdby8ty00rj1futiz8zyu5cf6hois02ucj99y8o6wjhg6infbyptac43mhf0r6enoz1gp6wplldbc3f0khw0nteb26pspv48jozt',
                flowInterfaceName: 'k4d6eoob2pzclv7ta2od5s2z3xy0lymyjit5w7fozfbt1bmlqkz88isushwp4fqf10et7vbf0m6rm0ic6x7d2qz9zv6c17tzulaj0lry4hot55c8mn7jhyayzu56zb0xhsfocythnmhkbqlgsq2t0ydceowwd3xh',
                flowInterfaceNamespace: 'echzd7pdwwi48cxdezjha1bugmf8ifmlp1311epykfrth7b9i0v21qh4iza4htjgpg3o1hwcxw16ulefwdq99foi28codmmd9hi0l0eu5yw7ud9ugq5e0w3afxg5rfw3cmzw5mdzp5jnnpp0c6e6x2tu8g0hirs8',
                status: 'SUCCESS',
                detail: 'Aspernatur ea explicabo. Voluptate porro est unde. Vitae incidunt fugiat et modi. Explicabo aut commodi numquam eius corrupti adipisci.',
                example: 'b41grsha7hspc7lx6img8uylbbx8arowijdcll7v2s8nr5nuza76m1qyq08xev00f2wd8wxxjw494ks4xat244tvuv3u4tl7dgqmmf9a055d3o470s7ifolh0uuhg9w6323vq5x0kcuum6otlrs438wdtaina0gl',
                startTimeAt: '2020-07-23 12:07:46',
                direction: 'INBOUND',
                errorCategory: 'st4faqfx4rq6phifiezqgclj9dfmyz2mxove72a6vwmlt48qz3bhf06s7wl5ybne7m3f9xkm660oqsm8nvkyqyz2qz0qc67jw8271brvnktjcx8qn430086k3l6qqhupxgv483eu6m8u6fagaq80sowzau9piexg',
                errorCode: 'ymgnurwp1dc3yidfqmpu',
                errorLabel: 647121,
                node: 4921265175,
                protocol: 'koht8lcfw89egpa6ot15',
                qualityOfService: 'ef7esiwl3yfui0u96ryz',
                receiverParty: 'fzvupbk362g1inmuzmy0fn16p8df9tvzhf725tw3d3st4w0pxrgbinsrv71v2e7mkmmf3m53t6f0kz2vgmeh3sjiowcary7ohe156088mladwncx4pdofmj6kratsm6p78ppwkhyhpb8ieharuxu78y7ty4o2ohe',
                receiverComponent: 'npceb2106h8g7s7ltudjnm6ayazg9kvd1oie5si1vun6cwkbk14sk45hunodqyr8uvjtm75pun8oxrmnrrq2ui191tkpr43zm86vfm4xe52z7g4qvakye6604x9baixe32n28mt8f1ziy5r11hgc7d9zojv6s9ua',
                receiverInterface: 'knfrtik7f9tme4vmoxz66ow7iutfocnvetgd78tozl2e858wqgo391sf6vlasnkzn56nfvcethfccjt4z8t8qeoe8p3ov5ufe7r5i232hpsirrwyhwx2d6pxkrmt4h3oqgsmzt5nrnbcnmjbbqg72aiaz7xj6aa2',
                receiverInterfaceNamespace: '1babqfrc661n13a1m11lgbs7pnf6k3qkieypbunifda5vul8gqt49g9vvpv75yexworwrj685a5gx4if9xzgt7or5a2ks8ehpagrmsmelco3xz3g2pnkqgyaeinp06ojepbp2vhi8i3su7dhtzgf2klrdi7x28ik',
                retries: 9495790862,
                size: -9,
                timesFailed: 9075706999,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'ai5mlyamrxlcw2vc3zly1dcrk1kozjt7f92y6z1zsltnb0wld7',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'ihp2ckkb8hhkep8uhqft',
                scenario: 'mxwj0trlk8fiidgdbd0o0ee6wyaao1dde5df5w707itbcw0kb460hc6ya0yy',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:12:28',
                executionMonitoringStartAt: '2020-07-23 00:58:12',
                executionMonitoringEndAt: '2020-07-23 00:50:49',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'ffyoikud4bhhowy3ue8xnyq4qdk3bm6fd0pscid9msv76ekdj38uro9cz2n46jryi7sxmn4c3fewl6hp2ik8ki9me8owrlnan9f4866eyo5s7jfb6ksfjeogtz8gp7nhgkipz8994z83ec9jetx32eaxcgovmem3',
                flowComponent: '1olnsejhmzdgl1sg0bkcitix2difldgw1zc3hlwncvhcldxawovnm6w0m0udjyhnxuz8jyuopsbejnr6di1cq4t0smer1c4gnnkt2883g1b3hlr4rpqd05vbkshkovct06p8mxvxdlxqdrhymf9qetxo34nteb2v',
                flowInterfaceName: '7175bi8bvxywmckqpn0h87xta81m47imxpnnbftevgeytt502oi4g00jdletwtzp6ybsbwnyjz3wz9kh65royhv6zqhu7v5me6t62vuiyq7vv21oawhymn5hglui1egm9rkamc2ulpdhrlegbhw5y39nluns85ca',
                flowInterfaceNamespace: 'a87nkosg1rk9ybk5knbea5qjla5izjrt9zr5zzgnhitcnuk5ela3559ii093n5cmbyj2olc8zmv4zr4k5v8pm7gwvihkqdhnw0ml92dkhv1jmdtvn21mrqmzlwh37bu9kb5bj7fjlwilpsowe7dl5hgzy8yeb05t',
                status: 'HOLDING',
                detail: 'Iste consequatur qui pariatur similique officiis voluptas similique enim. Explicabo ullam et perspiciatis dicta eveniet ut ipsa. Veritatis numquam recusandae eveniet aut pariatur ipsam ad. Culpa alias aliquam non cumque officia veritatis autem officiis. Beatae at enim quos doloribus quaerat dolorum. Sed vel provident hic quia accusamus delectus non.',
                example: 'l5ccwjby4e9pdy57kfrvu2ehiesdknjmx3w24op026qctk5c3yfv9wt4urqi9er1z9obvb3ni7r24mazgosgx1efqmkeey6bjaq2zy7dkz878dwz3uyefnb3d4po2udfdymvm3uegfq9v9x0c9i2xrg333zfqg44',
                startTimeAt: '2020-07-23 11:06:47',
                direction: 'OUTBOUND',
                errorCategory: '91509bc0jtskilfwmtg74mzl5h08pvuljr40xa6tr9odb3r3swvvq90csgo773yav2r0upmr5613zegaqf6xrfvetrz7ag02hkquyikfmziy996ozx9l3gkn9s7poeqosf5ko4p03aozx4oq8hiq3qap87t9rmy1',
                errorCode: 'zdlgejsrt4fl7v5hqrz8',
                errorLabel: 416340,
                node: 6873562690,
                protocol: 'uf859yjr7mo5032g6zkv',
                qualityOfService: '6npem4it9kz7pehjc3v1',
                receiverParty: '69udtsijcknft5qr5f52581m2sdjiq3xsd2gkb7hursn4im05xn3t3q39cjxy1v7uugcff04s75a1giu1w98akmutgnmtloy0ve4siaz8z4sj23pzw9rms3t3wktlh9pid0zgk0u2wsz0nvqa9ct6a1txijosw0s',
                receiverComponent: 'sxogmnu61l4cpqslv1qni85hnd0tssxwo060jv89ko4qirxc02zps5pr1gk9mjmzo782gbzzp0npm1e09cdol24463m3sh9s9nqmqcuzxnpltmvetui2q0or3j3iqrco5ytmb79pmnktfrqlmfahp2h7drdc8nsq',
                receiverInterface: 'cwjgjqchuxxhjmipeq2qd0c8ys04w8453wv3ar0jlczhy0vs3tvp8bh49azeox74mj457lgwwkj5jthq5rf33cwhona3stiymbza7lzjypiqa60kg9zxh6r3o3rv4o9rxb6t6r2u7n9xe8wxqczhdo3e1hb12hns',
                receiverInterfaceNamespace: '5i1jmt6yx52e2gxvcqquqfp85o7lkzd7i0dfbly3l2k8qnsarh8934w6xi2ic7ujmyplicun5z7e7nsyo8wvfv43ztvrmgkftg3zii3dprxorkv2wshh9lsh5upj2jm341z8di6lbgmvwr5ypdbis1x3wttihsda',
                retries: 7095960848,
                size: 5922038641,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'enqntrpzc1ey9ok9n7kxfii1pvjwgwvt1fbslagtpg3ok5iprw',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '3alwtp75nha8wjsuxh8b',
                scenario: 'al4ugmkz2bcn1utjczw0bhsnbq1ofajn57cu4q7jag5xed7wfetsersxrk2m',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-23 03:00:00',
                executionMonitoringStartAt: '2020-07-22 21:44:28',
                executionMonitoringEndAt: '2020-07-23 13:14:23',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '65ql0fcwsrv5s4yhncl8gz2og98y90r5v500kho2f1ycy3r97kaw0tyjitcv6y6g5twxjwe5fk8a9szkbr8o771wj7vbvkevhked0juj1ctjjnmy0zx5kqvuvq76cb4tytigd5y90rrigiz6hhz7fuaio1ppwqn9',
                flowComponent: 'qs9q97voan4fxkf2376wvwsis6rp3f5l4pzcfk5up3ke7ntz3g697p9icb5grtypb5kmbsy0nniykwknvt1s83v9sfpr9ks4qjaym7fg2mw4j2dwo10t6mzzs7dzwc3qziobtq0l9mlkj5cvxml5rkhskd17p1bn',
                flowInterfaceName: 'mowmv6md6dur20dngeq58ejbpxg9yjkxo26cdeb82d8qs6t7zfkms2nmx4031ii1j2a7jha0x3jpck7cz889082p9vy6c6lpwogsvuyx3hckipa28m6e9hicq37vlyb10yao8dqtmzky4xgif2cremqvdfsm9dmr',
                flowInterfaceNamespace: 'yjqmcbvnqmf42gf1w9smwag0dztfzhhb2nimi7q68kp0kfpanhte5pgwbgajjiemqlj9to2wztimhcu132j3c90o2nw9kqy5alwk7x5r9tblu8cvxvpwcgz4exzcpgj6tcwr03ezi1lg2d0mk0t607w8ycaxzdcl',
                status: 'SUCCESS',
                detail: 'Enim in rem culpa perferendis nam. Hic voluptatem minima voluptatem. Reiciendis quia suscipit debitis nulla distinctio. Et ullam quisquam sint et ut accusantium animi. Reprehenderit in enim error eos ad quisquam aut beatae.',
                example: 'sx1vhxgepm202qho7dqda6xcx4bte359ns8v0hq3pu3tphdcwiaowmepsddu9p5y6euh226sifcts7o72kev1kw5mapqurawum0ysljdq08szf7itq3txxqac6tdtt9h800a8xx9cjtjtvio6syduba4l047vs4l',
                startTimeAt: '2020-07-23 00:47:51',
                direction: 'OUTBOUND',
                errorCategory: 't1ogvyl5fulv5le3en82jjv0jjurolcp87v1i9moupffvu76bvnnu3vky3w66lovqu09bir4ja3n5k212f27uwos62539cu1psobrknimc0op2dry5me3lbc02ev7sgbyfhxtmkn3iek302ba44h9wdhwo98d3ao',
                errorCode: '4cfjsehkuypmeao6nt2j',
                errorLabel: 429305,
                node: 4012100336,
                protocol: 'pxpw1bgig5ln177kmzmv',
                qualityOfService: 'kvrp04e1meey6m4hmdlh',
                receiverParty: 'ypkw7zfeacxf8xhgl2ng8lovxldhm3y6xoef87e9m4sgivuwwpjypbwgj35tv5lx5nimkf2hysip1ebuifxtvikpp1lkel882hbo8zx1jkrx7ankjx67yqef2xof7bo7v7bstdtouj72y4hs6u7s9n4zwxh2zxw4',
                receiverComponent: 'i20qu4qia9i5syrupx56gl6f8uhho7avwgpxecsfk29hp6d6bnqvu87m4y52xumlnbzitdleo216k1sidomsylnh91f0j0m11ilvb5xfhc3o6k3ft4scca7xcnyj8ilqnhcfcjcnkfvzf01mj18ihuud30fhe14e',
                receiverInterface: '0061km22erkxv3172gjzd2l3npywradh741gzdkcykjyzboidm8llkjhwb3vl3dfkfzbz7gr34z6mmo9ulw7jputu90l6b97210mm3dennff4wjvunj78henfjiskf8mjbsyjnqhgw646j6c1fqcjecxdbfq5vaf',
                receiverInterfaceNamespace: '9ob6134u2si0ih1z65du4vdvshfzryg52528mgmp0wk2yn87j71chtcqoubb4jq7xkj92z3jjqvrgw28mcvlniutma38l2zupefe3ursmq89xuj9qtp1dmyf3402zzm1om3fubib8jih39gaxq5wyaryi41s70ks',
                retries: 9449621406,
                size: 6370798725,
                timesFailed: 5705243628,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'q4c8f0wra8oai0wgqc6pvplce50wxquug01abskckrzhul933y',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: '3hq0nojpfr9wb7rcq20j',
                scenario: 'aiobtjka8z6t4ddgafk1t102s3a1tqq9oqinav3ggjph5cyeki4lr4s2cn8u',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 19:17:39',
                executionMonitoringStartAt: '2020-07-23 16:46:24',
                executionMonitoringEndAt: '2020-07-23 07:23:17',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'ia8mw84qq36vhdgmwyr8g5iso6070eid4ui0kg5912gohtnc67hul5kw3moq6luen5egtao9podjtpayj6uytdjq5rl52hs9qb5j8b51q0mk3q2jv4ntoq4gay984433v3p2751ja422ids0opj88b7pj3a68fwn',
                flowComponent: 'bdx25igz4d6tueu6zdyztc6vp24wj16mgad0wyjl6w8xeg98xb8mmqn56ejrn0l7wjq8w4xp3805uthqgfr2qa42x0ye94r54kmhc9hrkg13g9wbemewzaszviyv0ej6e0itaq9ynftr4j2d4s5msv3gb1ed027p',
                flowInterfaceName: 'd8618uirdicjhp8g6hgg6u92lmn0azugyrp6e7soyiourvq74gd8dtvmfmjylmpa4yx7d6cz58mi9scqcnkgt5jv4as3xgnvpdnvg0g3otlevkf75159gk8dicmqu79tv8byp510gif3wofkvxuhnu4lv0fhs62k',
                flowInterfaceNamespace: 'ytw47u69m5ha5tpkkem5fkm1rpa06rzb8pseoqi1ilkbill27bq586tvp9yhhywpgo3b6f9r3oaa069lh94eg9aaxnpc0h4lc44uavwi12o1lrrhzutca6umpxote2vdkb26vek2myh9r3iez51p0qj55tcfruf5',
                status: 'XXXX',
                detail: 'Voluptas enim maiores ut sit laboriosam. Eaque vel nemo necessitatibus nulla nulla ipsa ut atque sed. Minus id voluptatem reprehenderit voluptas eos dolorem odit aspernatur inventore. Et tempore consectetur rerum odit. Minima voluptate molestiae quis ea eos aut mollitia.',
                example: 'osz5h3nx3xj2krox40s0ygg6qlzs5ux7o699l70hg6nxtnhzz8qx5bsf3m1x0a4fla98rtvozx7fcn12cvwxvtrgsm1ynlpep93aoqryfzyyazitienrcfpj57rwu98ojfjm3fdro4oynm2bvuy2jfgr5nqvgmkn',
                startTimeAt: '2020-07-22 19:58:04',
                direction: 'INBOUND',
                errorCategory: 'bg704izmq9c9l4od8e9g2pouvqdewioos71vufnm9wk4kj4ivgu1ot1r86wsis9xvysr8y3u2d2z0khr05g7laeupq37li61lzdai8ww7kk2en4gyk856cootongmuvzt9nc90f5hymxnd9wj0g2d8em21au591l',
                errorCode: 'o7d9cvsyjqji0sfgbjj5',
                errorLabel: 846369,
                node: 9542519176,
                protocol: 'o5kflzirhh791o4xi1g2',
                qualityOfService: 'xw7f4b4y822hrmg5lk72',
                receiverParty: 'kvjowr93hass7zwah86or3vhfy3h4our1phjhikdvghy8pp6w6b0t1et6oqbalhnjg57lypb02sdzwtzfe2ca82izlp4ss25k3q84chnzhkkmer3u7c657t4uztgr98pl73xuid6gpfejldbgsmg43rqfs1frq4p',
                receiverComponent: 'm99j66yt2ipsi8kxn9f97coaxxjopjwdearbw28fcwfg7614fima8yecf2a0a74yz5d074haikiegwibne1b1fcgh5im8n8yaey5vmnaq1g0tp1xpbus7i9ornc6aqm82xg1b8p3zcmj2glw3rf46eqki7i58rtv',
                receiverInterface: 'mjyjj7qh0ycfe9uhy689foi9mg57bsjlm8o91r5gex83wpbgiq8akq3s8669yy26s9luq9q9wkw5qmfolxp2oowthomg3tqd4qdii9cww3mdb8mrnxq14zgw35lk7s5f2ckzlyc75w69c18kffz2gd81qr6iek6l',
                receiverInterfaceNamespace: 'nkroaqe1iiyu7a3jz9hsvz8gxq4y465gw7hdfibml4trhbvnwiyjcld4wijr83ivayv1qayvlp7ctersjngd5zkft7ddyewvq80u1in53sypo4yz6au6otsmg3ooh9h3xxlkbtblyatn3bdg29fkvl45b29rgh5p',
                retries: 3383329816,
                size: 6357289964,
                timesFailed: 2577945672,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'jug82o5nooknfqnqv2fzb77z3o54500bymqtkg82fymbyj85k8',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'b3ldhugann1qg73y5sc1',
                scenario: 'gygojluh8hhtkhcdsxcltyeievy6x636ucp592hd9mk56x6heh87a4d26asx',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 14:03:16',
                executionMonitoringStartAt: '2020-07-23 07:40:22',
                executionMonitoringEndAt: '2020-07-23 10:10:19',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '2io9rpd8i6ggrlxt0dva98jcxj1n1lpdfw19syrm8ighc8xbkgottrnjmopcd40vsf1s9jqlugbllfsdz1zbgxjqj2c39rc6l1cibcsb2w09wmz1kt2cc5t1gzmmwphgul261i1jm98oa6iow4zk5zsuoi216279',
                flowComponent: 'l8yzy0nvxmfg41j6u75bplg13kughc4dxg07y2onhq8xlh3v95w9c7vbvyg9nqva6ppsq3yo2c16e5lw5xilnquz158vnwoi1vy0yusk1d4bpu73ldm5sxop9dhnfomk9njpwjro6jji5x9h8p4su46qcw24ymjw',
                flowInterfaceName: '144u9zz5esxd69os6ezbx17waz31akagagn6p1z9n7diww7c3zsyoj7ymn409rvl8xoafpucauqejxxk1lq1uhnn5hm7kt9euyc3tnd63hr47z57t2ra5394idkt9ss8iuonenri2asohu91ot9hzpf2ht8s27u6',
                flowInterfaceNamespace: 'ubpxci290m53pphpr2uaf8ayq5p13k33rqjb9jrnijee7qgvuqzyidwlmma73cjnf1v87fn25jujfoy4c0p2f5drzi75dozwuy1lubcl9f8l9ypo84wkehnnz9ls1l8vpk96monwzj7zj003ckui1nmdhey0tzlk',
                status: 'DELIVERING',
                detail: 'Facere cum velit numquam necessitatibus error. Quia est nihil nesciunt omnis. Modi fugit vitae sunt aut ullam iusto sed ut perferendis. Natus beatae autem modi possimus.',
                example: 'hyvv8qwcen505nm0azl2eqg8xpoboby2r6ozgn2ln92cht2xhejofuy3c3yxuao0cnj0f5pcoi3xm3f1lg56xcan6w9mbzyz4ar1p7jmp86k3j6pmfsmkzxppr96yi6vbnsr6k7s6625nxdbab2wyowdop7le8jf',
                startTimeAt: '2020-07-23 01:39:28',
                direction: 'XXXX',
                errorCategory: 'vr362hhj3ot6fyzfoy6e8bpjfsl9a9mmuq99cgqrxnylqqdf320vuz6wimqr8j89tllv0mtk2gl6y33qqcvus7j38zji8e4fqexs98kvcad6xm0jb86pd29wvrpuv1grjat40jezaqe90uctx2irqd0zkfqd74tq',
                errorCode: 'pn25b88tqt047rkvq6b5',
                errorLabel: 948350,
                node: 2565284249,
                protocol: '0d2ycrwkts34700fs4kq',
                qualityOfService: '5t3fcn38f1qvg22gnqeu',
                receiverParty: 'x2l2zulioqgckg1o3ve7f1e5gt523avjoy1gmzr5k8e4x2hhr4msbdn0ywzf47tkbdnedl5h6w96moafgyn34lbug15bh5n2v0jl7ns174fyvujk6q5gy66z04uhyhx9ciq3kwmfcku1mm0fnkfmt1cs86bq9x97',
                receiverComponent: 'igemufqqxb1xlpz995iqzg2lwo55egi8w13lbfbjpgtx6g0wihomhfm1zax1j4asunxqc70a36c95uawdrpnmu6unj5007b2zrihkkdg70vxsr0ik3yeyks7pf0n4fbazm0n8nklv1juwsvqoi1vw011a0x69q8a',
                receiverInterface: 'vt8kn4ycq3a8vk7kiilo3fczgsveisj63foi75zitlchhbr6nu2lrxyjuga9g058hoy5bwbgc9ckw3q2yet1p458l8jt5pmgb9zo63al16jk6o6hunzjdgppw09gf5tsnurdk94k5tc67el6ewmr9hcxgq688r8q',
                receiverInterfaceNamespace: 'u1mong1npwyiasmi5cfc63q71gghjtulfeidf7vqv9y3npthi4bmj7z5m0c2rv4ie458bc9mnsg9ou54tnknhspm14b302d0kkp0p0n5o0bgsqzkk6ffiklkfry57jjru78kfi55e4ms6khgajqvcrdkk2e6h8ny',
                retries: 6708234167,
                size: 6591602280,
                timesFailed: 6079704414,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'b208iav2aw5ufjkm42ym6sr25wpjefpedvr0he2hhb7xq6tm8l',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'loozwy6hjgrazg86ato1',
                scenario: '07rg1qh7eqfktpxyu32o27ojjeax08p9xpolplob2feqlvj08x6m9s8p2ps4',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-23 12:36:47',
                executionMonitoringEndAt: '2020-07-23 18:26:28',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '9y47gquj1sq0wgo6514vsee5n5svaskfr2wrputaze5pov9kigmj2ik2f2pox6ck0gq4dvi87nkua0c5qptvw3tdmypezp7lkq8ig8dkkpgplbyvhndcmlxjuv42na1czbe4f1v3h8ptkx89bxahc8hanbcixwws',
                flowComponent: 'hj0ppt0v4r63hj4luukl70idygi4fdmhnbotofteqdev2jt24h74te8ja1mm7uwv5v86i7qdm0vhs6mtgb57s8698es029lnsh5fullc8vi2nmkbdtlryauf5ihifoh9mvt83fu2bnrx3kjdr65q3vvtgeuyfqhg',
                flowInterfaceName: '4qqpo14hnuijff6fqhr6ugvlssotf9bllasix71yrm5ugipk979a6wwg27biet7j54qg90qc2aa0z1r3sgfkemwao5ozr7dn6puu1djhajjsphu7pnoadqpr1ipe0rq936v0sg3c7wgrpuo97vpjlxunkt98wpf9',
                flowInterfaceNamespace: 'tkpoj952p6pf65hg7q2rn0i9ls1eygbq0lbtxwu88g0n9qclhasucyka3zqtmiir5gd30dr05ct29f87fd5z8i9eloem7x7f8epfvttvk8u291jfnvc13bkqb9zw67g8w3xbjr4v3b03vwzkn2ipnd6kq0t778f6',
                status: 'CANCELLED',
                detail: 'Pariatur libero sint recusandae. Et et earum voluptates eum. Reiciendis enim distinctio id vel in quibusdam. Voluptas eaque molestiae similique voluptatem assumenda molestias error sed. Et corporis nostrum praesentium eum sunt maxime a dolorem pariatur. Voluptatem mollitia voluptatum tempora.',
                example: 'j4iyywiksge1igtdk7ye3t2jjd7jegeyvuf68n5zr0ovx9zf1m6rbkcqqj4aj24pg8h0dof8q4sfnjrav0uusef60ld6gtbsdt5pm0ktz2taa0kzd45zalz5czkyo118jw7yjmu4gfxbkso9cka3rkie8yzdubjf',
                startTimeAt: '2020-07-22 20:10:34',
                direction: 'INBOUND',
                errorCategory: 'ahap43uje1ep8myo1elu7hmlih3cb06lftmtyx5860a94lyphzw91b7jxa13hel9lpagbn2khmgy9y7mx2t335wfvvo2gzu234c71ouzkopvvrg6hk47zwtg3vfxcgzgl3rctmbecvsgfkrbgq40fcdh9ytvg9ow',
                errorCode: 'avdobhh7wi6ajuhu924d',
                errorLabel: 778510,
                node: 3230468082,
                protocol: '7rd4fpnh2p99ipmq48jh',
                qualityOfService: 'hq6z45xmepief8zm0xdi',
                receiverParty: 'syrggzns4j5kuczxy0vq4jgyqshyh0iqauda52oy76njw9hrb3v2w5q126zgkslzyuvdhzrpaipo0fsqqemxuxbz2rjsupfhvx8odyof3jelaqi232urb4fom73eylp3avvoy5tu23yrjwulxecr6saxl21b3pvr',
                receiverComponent: '6ktutsvh45c7oq8wstnct3pehm96elcfh2de4eruowaqfy9qxaw5e2s7tvh23q3ze2bd29kx7f4fd72p8enru6aiz59vf2qh4thxlzki2mrqr5qvn2bu08w52jj1e111hm7g6u76139pnsy8zxfk13s4ekdunfvg',
                receiverInterface: 't3cx42ktan1pp9jcplghye52imgmrhim0lx2f6f4tcrb9ea22ev5jxz6nb5oh2ma44qpqp9xenm5t58s9l9xdfrumh4nbxi6jnwi1rccda5qu7n8gup9ri03j8y0l95irmdixkk5h1i6ok4ya271zownpjoc6y6j',
                receiverInterfaceNamespace: 'ue25514x3wftgbcbg9p6wo7l5cmdof2ejwidoc1rtynz0sv5al0cb964uq1wf5by2qsw5ey4cpa5p5xkp6b1fd1zfhwlc16e0e6uhxy06n1rg9avxqmkvm0uggpmejhi6dd307dddhm7g6n5nt0st0i7oyj2mrb5',
                retries: 2483438433,
                size: 3475074162,
                timesFailed: 4559723772,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: '3619ns9igtd4olmlw15a5hisc8vp8o43hbnd457dwwf63y209h',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'txo300ejmpxi6mvyd8bt',
                scenario: 'wnjggl0e1e6i1n9dzby7v2tqhweffi07dsc9wp4gzynviipdo45u909xczbt',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 04:47:26',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-23 18:04:48',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'jw29s2iwvvivjz1j777skdh6eeq95qpvharx3mqn1jwzpwiy78d3lit0708ghb83me12kqgakf6bb45f0vi3s8yx5ag454gljljyzcngqnti5jg0bkad5wrimupt1h3sqdzb3eql1l4idcrvpaq6lunqorvah6i4',
                flowComponent: 'ourgc14pmwfkv99dbq5jbbymdjw28mekq35q6aq41ilnf11ikdj09hhqf4jebyf8k7vns2bv74moykh56zh6g4s3x2niw90nqx6evu62075q103wui7oh2v2mvb59dphnmt322qbvwitijdlww12q03r4mjb4ih6',
                flowInterfaceName: 'abgbqeocarqa2k0ojwsxn91mjm4ugavtii5lge4kr0045rq81lia7euzmq7pvybabhv6cyhzrgl45ep97wcjej7aotfcjf5oliggn40anb9lten9ya6k4og2aesdtggj74vcos2eejpwookhh0o99g3ebvdgtjgy',
                flowInterfaceNamespace: '435p5n4hojuvx77kmkhbnka2cwf4ueof4p4oz26c3jj39suh06icw8jutzb95iz34ks2au3jsqycox27uf61tepxb19dtxhobe174ldegqh0pvnn7knl5d4l9t2fkmquj73dp04p6db1m1g3hgne14m1c21nrskg',
                status: 'WAITING',
                detail: 'Numquam ab voluptatem illo ut dolorem alias non aut provident. In quo ut sit. Odit dolorem aut quia nesciunt sapiente laudantium. Repudiandae aut quos ut veritatis vel. Aperiam magnam repudiandae rerum provident enim consequuntur dolores quidem. Dicta dicta rerum eum voluptatem reprehenderit.',
                example: '8txks5x4vb9mp163ppna48gxpfz52ph8a8kqp1kaxgkee42qydpselfzwwbb414fjwybldxpxatdf0783to4qdf5opwsydqqlolghyq9j76b7bkrqybs6q5vktaoyqerzn7861t3ls50hipdrfso1wriouvbaqkm',
                startTimeAt: '2020-07-22 22:39:09',
                direction: 'INBOUND',
                errorCategory: 'rt802pplxs6pvz72mv3nazvvhqbv2fssy8tjn37z1fu2fv2qxeq19nvhq3r5f9fc5q55qggvyjedzaixni4lsebvr4v9w6k644g0n2lcoa8bdbdeajxinjxp030ewizeeivzn16kmissevssmwyi68q6dmgd8qpi',
                errorCode: 'jp6q69vg170cfp1i04fc',
                errorLabel: 137328,
                node: 4198147544,
                protocol: 'wdcos2artzirb43vhkig',
                qualityOfService: 'zpn3rkly3q7qwyhezvc5',
                receiverParty: 'n64m4lyqdmxriqc4ewb5eksyjs3orx9e0t8twxt9x3ff0djj6h88apeya6o9ac02sz6xhpbrwxj1c7niive3xtxfqkhdkvfu14svhop6vtti9ctk2s2rfhw10hymiwk3466p3vf2qgen0xapv8rkvfbgsakcjm2a',
                receiverComponent: 'urs7k1ltgtlkz2mdv0xoat2glnu1rzykmnwdieioj97pghwhn2ewoqydt35pxz2dpak3ik5np1rh0bg6pg4yusgyq6hbea9ejddzc06zkbhdqpxvjy9722d42h4dyeoh7nuq7269l42pn22p9ubmeh0bx77r61sv',
                receiverInterface: 'kdopey8740up1ivn9372n8xofw1825zeu9ud6x3jij3l1sie1o9vzb53olo7vvvk52f657izftifeu4tm6qjqz9aylkwfa11ne8olbpckigbpgk8x1megw3sek3l1t94mco62sq9zm41hkin8pj3c70vtiz0v1sz',
                receiverInterfaceNamespace: 'crs32w1b5v6cc4gir7she3u8rufi7yki1evq07vayyljtaygs4rz3sjmo77cd894b53w8aywc7mj0sxg7if0sig3m2la5e9yejx0ipw0oqdwwo8lngjvxp543naitbrqeb6gknv5cwsc6uqt8ru0jeru4h2i15sn',
                retries: 4980267425,
                size: 5481655118,
                timesFailed: 3989591623,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'pmxjcmugkjpj0s2wj6b1jzr2ezfziki77t4ch1tsww6vgi65uy',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'qp6s4ohzfj7hxojjnzo5',
                scenario: 'jwbnvq2pqynd7njdnwoh1z6ebguo5lg71zpa8iy2met33yvjlmu3sniu1bn2',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 11:17:06',
                executionMonitoringStartAt: '2020-07-23 18:08:40',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'jy0nuoynyw3752t0urha1225pex2y1y9lbnxfl7trc5acmg9y8p2wzhpwdsx6jw1ig6pbmhxnx9dj1zowhqmno1rl16smil51h243bebyns06jf36lauobq32zi2uxpy90fflu90l61auu6d58siwgqkg6uligry',
                flowComponent: 'und3poow9rh6vyo8rjy9ljfj236ykwclegw6347ylx2nigrkds9t40rokell8f2i587q84ybr5ei1ozuhpi87ud04nsf687z0hrdmq8qnvhzyvqdle3iu85z4me8b75bcl07zdhm2mv353oz3uca8ze1htp5q8ny',
                flowInterfaceName: '4nieixd20ifbal2323hl12nmba5iivenuhk9ql34js28etstjvtpz8dgp0fybaclggkjs1rug2cs4v5tvybk1rws60iknblaix8qgqa2lzhs7jv9xtqyaispc3itw49fye3vgjmmq8palb3xefb04xu47vcw9hlx',
                flowInterfaceNamespace: 'otaah7eqznpki9tche851hd0cmc8lad81epof8xtw1vd9m62c8sycvpil3jlc9pbqr890daz4f4uxt3sjggd6by0c6cwjcvvoe0h16srj347dq7w6fd0hxmd8goxss2eev5a4cf6k839w7vqif7hgaa6h4t3sdb8',
                status: 'ERROR',
                detail: 'Autem ex et et. Totam et culpa. Qui consequatur id omnis quod est. Quod necessitatibus delectus. Voluptatem aut quia consequatur.',
                example: 'pwomoejdkuhsfkivvn6vt9yaw00i6fmc64fhf7sns50dzakw6uprc19x72ev2gsb0prdr98q3674seh9tzhkvq8hh11o6gj2s9hr6qsu03i6srru1qf1ie11vavlf0hwfhce3380ak32ltd009n7i510lnb8e21b',
                startTimeAt: '2020-07-23 15:14:45',
                direction: 'INBOUND',
                errorCategory: '588hn4a9nk09pecyebiove22svcwp6nojd48oqkgp30hk2q78uq6dbpq7e7jgxvn5sh6l2t7ojy7nc38w6rjwaj8c97t5o13xlbvgk4cg9kl455qx7kdjcynowanz8434z9sypqnld3z37a2yg4awoowktc7vrrp',
                errorCode: '9anuvu6gclcsvc86ejrs',
                errorLabel: 117420,
                node: 5234183337,
                protocol: '3yhq5h97i01r8vyx2elu',
                qualityOfService: '3v17jak8wab6cv8zytw2',
                receiverParty: 'h9omuf528x29jv5ws574j1y5u6l8a2rv9rm1o4dd98qods4zu1zo3bebm2znvwb9001khj6nasih00umuwuh9ms5ls5l35c7mvjbydazy6ihlvo4l9u6vq14gpmux646l01jhct9etz1wmpq04620ha8ig8dfiku',
                receiverComponent: '3ie9ytsz3prh9lgh6wyiuvuoeera40g9nf38sl01p7re82v03tmyz7zrl8hmwcdjdaxc8uv83ieod9e4kkxbpjayq1zfepd4f5xz1sr3zf8w3zrat02i4oragl689v0hqtldkzov67osqcxnhr2bn86mdpso6o19',
                receiverInterface: 'yi4j4l9kg92j1kmm0k5751xwd0n8ef41qj4gi630wtwynpv97hrv7e1lx4vi981x14hhmy62q8184wxxv6fim1w3f6oey1l6alq8j0fc27i7u2mhyp5vr9d3pxfhqilfz8hd4obrujcs9t4cy24clt12xercpcez',
                receiverInterfaceNamespace: '8q4w7d7ex15z1v3pxj6pz3n9dlkxym7t1a7zd3m3lzsm2zht201dir3klp4bwtlihdfg6rsau09uei9dmnl8829q11mi9ayuhqjzklrewgh1jpui6jvseacpkuud92gexf5nxrdcqkm57rmh7xoek6x1muf8brva',
                retries: 8740351635,
                size: 7165023134,
                timesFailed: 5235593246,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'z6d0aachz26ayv2v030ntr438ub4tfltlimlogo7vlncmogi83',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'gqt7ugaxqxwmfrdxn4lb',
                scenario: 'z7wubjyp5gnloy4mod6oac4v6vig61yo2f38s72wgzd5pe6obios8bu7pxmm',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 21:38:47',
                executionMonitoringStartAt: '2020-07-23 03:42:22',
                executionMonitoringEndAt: '2020-07-23 09:30:05',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '5hi2ps8kbwoew6ugf5po1kyvo9l0kg0mq31qsp999c0fpiq2pvld4k2bbx1h09x5p9hk0j2sj6itk69yvfbyklbfhfby5p7e227eyigotk86xw1pezgf9j22paeflumdyrgb5z9le9ifu14dxj4b9ik86ecf0zg2',
                flowComponent: 'rvfo1wr85k415lp9h26l90dlthukyn5mqtjfj3z5m8wq56gw5jpztxght4slbouej8eh2gho5nzanpnydrcf3fwuh0uxdltpneohbp7kupntpday5e3m9ct2jxgz9d55ljf5kvvgvd0f7w2q42oryset6to4vtdw',
                flowInterfaceName: '3nw8p47ijxhumn2xaafib9mgr1pgd39svmoti91ki6aophp3qog2156tlewk4s1l6n4qjeqm3h7bi4ufz3y436l1nfrdszfju2m95esuffaisnwypuiezsx8dbubbtnjzza6hwgu6d1wk1a96mnpsg1mvu7z6sua',
                flowInterfaceNamespace: 'kmuf9o55tya0ib1hpr5i36qiwwkr3ixtpvmttj02j72fun4q7bw8cfdni7934axn9eo1q2x85iuy7y14mjpk76405cg652neaepytchw7j9as8zvzuzyue22g43etdomvmugvg0d4wiagna6fnjpndcug0soge58',
                status: 'DELIVERING',
                detail: 'Eligendi est ullam nemo sequi. Nemo est et. Et necessitatibus dolores.',
                example: 'ge44xlew8jbf6854vchsvps5kb2bsfqa9u0z8307z2ucn623kbav65bvkpnmw2fpvi7wvoq0zsh5viou909sqd5vqdz6ne2c86rlmavbzp1kqqzwuqm49ru2rs76m6wukqd95u4bxs8wtvj272ov4xcl6av2cbfa',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: 'cs1fa1emxqsjuccade8boni65uztj2heu1n34wig3tp1kqlsucigrnziur8p7mp9jfa97ggz7vzjhjj4apy3tqxvjqjdiyf9bzqsjxwpixrfpafg97s3k8ej7oioplhc2pwqxr41s773dblibber124fz4xgseqj',
                errorCode: 'w0xveceiu82t379snluk',
                errorLabel: 666804,
                node: 5964989428,
                protocol: '5874xw5gf1724xeq4tbu',
                qualityOfService: 'ddtz4nbbscmetao6u4k0',
                receiverParty: '4fucupjmsw3d86chur7xybvgcn73010fdcd8dvd3aywonpoq9mt32rji63h5qbr7igbc45v0z9is4vrf54qm8pnhsmuq7q2xqz12gy1q36h9vohm6kwvtkoq4j8otg1zgbjst6oaz3gquoxtvu7ot9kib9s14o0q',
                receiverComponent: '5xxp44ab97pismobcqtp9k13ockrks4rx283zjwtfcgl38mwyg53l4ok0mte1weps1128hg0v58wxwuvhcbeokegip4347cj7s0cve57fc00pimg5r82swq5ombjfi5o5lo4a5bq06mii32vmvahg27r9y5kqr7a',
                receiverInterface: 'vlr5x6g1dl1fpvbni8t6jzerr1ftoip9qoa1xahhal9m7ujfa28k7i9iad1qchnx9y8kjx30wjla0hv7p0tzbrrynn92jjj9s5dnr8n2pzqntz70atuzxnd5k6xxm6bklsewsd2ppu4qzl2esm0b9kln38piz9qi',
                receiverInterfaceNamespace: 'xxb7jw9ezrdknspo78n7k58m2mmsd5u8jgiadjgvoww7lkjhaxh6wasyaqmub64qsf3s2sycem8a17awmhvnj38xs5ihb8ugci1tuhat2othsz9t1avkna1j43bafo25drvltzbrer10xawnrfbj259tsvoad7uq',
                retries: 5614063233,
                size: 6482416543,
                timesFailed: 9304551435,
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
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'j6w96ljozpzj4ry5tv75apifw6nkkthzmdrt8kiezrnlbl3vzo',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'txbd0w50b36sbvopamg9',
                scenario: '972ag97u7y0snpk3tc77w4w33h0exsjrlo7xn1wll49yc5fgmmfqxmnlpvyz',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 15:18:15',
                executionMonitoringStartAt: '2020-07-23 00:40:45',
                executionMonitoringEndAt: '2020-07-23 10:09:34',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: 'jsvfdrh33sryoyc6t5fyhmhd6kxo0eu3wgxeinecobma55zkzq93kz945o2x1f77q8vygvw1g9rn5cwsm9t0pav0w8wwz43r7rcs5rh29kcxm9mhh2q6umwzbnh385e8lht13z2nl9pqnh1de1tm87ohuvch1vbz',
                flowComponent: 'nnwf4l7dzx1lybvpuszmwv7318w385jsfw74x3e805zdjx6zzdmhwj9ogo20bu832j8ez4ttx2fzmma5phcgqe6q240xftb7h3oc28lo419e24atu1nblcwurhxkksve9mwsbz5t8bn5srh9kra1c0drd3eenr8k',
                flowInterfaceName: 'x0uurvmdtoa5fjm285wo40z6qiblvfrsywr8iqcadt38hxu19nhln57yz1wwkmun4mv3h2tmhy7gnhp21w31e5ojpse5o0yp5fai36wx2pzdlgacp14n4esqpmjt0yfshbi19o2kx1jkyqvgscq7ojfwx9tu2dh5',
                flowInterfaceNamespace: 'gjozbwelz3vrpg4pn1t8piv32et5mm074in4yb51lamztmd9sjqegtrqyx0o3je42tisbu6ye5y9squ65omp72njef1fbelb5su8sucur6wxz6bcc3lxcx0c7yxkyqjqvktrpqsw7fpkdf4kx0m8ehjnh46r38w5',
                status: 'WAITING',
                detail: 'Illo aspernatur vel nesciunt sed tenetur tempore. Et assumenda et delectus. Voluptate molestiae doloremque illo veniam error. Sit voluptatem sint et corporis. Quo assumenda aspernatur explicabo accusantium. Consectetur corrupti omnis culpa repudiandae aut.',
                example: 'lj0p6sz4vu95yaeuf9uicfjiw9pmblg12vgonsoniptw5hjg1s4phgeh88tnnlmt5actci1urhpitsuy75mtbhcztpl4j7n22m2vqcwtatbpatuzmea0d7ir99dro2d3t6arkxqylu4vd2yea2mgpxmr3sfeja1u',
                startTimeAt: '2020-07-23 10:43:02',
                direction: 'INBOUND',
                errorCategory: 'c4srrmbhz29j5zaq5qz6p5dw5uexl2o273u1wdr3coefjwwm03m7e19oha4rbt1wr15oru3qal05oqhbzslh1v3mdwm4egnlbovdmwmqav8smlk05re4947xchuq4jagdc5e651ewm00rsl1ic4eza7c07kdwp9e',
                errorCode: 'vb1erqkmz6vophc9mlwf',
                errorLabel: 526859,
                node: 5337583279,
                protocol: 'lhi8j34o6mn94qriik2z',
                qualityOfService: 'f69a0bmnxeuajuh8tphp',
                receiverParty: 'adeusb8k0nqjdffs2x8py5jv403af08t24g4dp8b0ti0zno0xm89rm4kttr73ktxsy5cs6slby9fevwjijv0lrt3u5kx8nup8qgqgmslzqs3852l0c41f5or7ichvp3x7kgspfc98esvncm01isjgfd123ua8qzl',
                receiverComponent: '12ajdfjkpy4v8xdg56v8u8n7vv5sys5gzbglk7kjfrft986rpcrt4h1gq07yg7bauyo6n0elsb7pdv9gm1v0jlw94qf0aynxbo8s3icwgv3mr994jwj8qhfztwzxow7zmcqhen4jzgeei1b51myxohcl8n5lmzvu',
                receiverInterface: '3aityem3ql60c1ywsc2ymoe0h2s22ri391x21rc45uu1aheatz0jn6sr5rdkn3lpkc7sy937tftkvfxlmwv9u81owf0ce7pckrt63n43csk83xzz0caowamt4238maneuvegwe6cwzs40s2ri0s0twtekfppn3w3',
                receiverInterfaceNamespace: '08a7peecqlj6dasqkorho8ma52j3hrytzox1xe3gshof8gsma2ttym4fc98bts6izyo4hoxja962y35ps95i8vrwy6i2g7t1nxnkdmafr0e3rc1ozfcuw5yamijgzk5a9hvivjxu1wqwspdd99r06dsque869l8f',
                retries: 5150759706,
                size: 1461904288,
                timesFailed: 2848388886,
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
                        value   : 'f81822f8-1b02-48c7-904a-5b6065e948da'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f81822f8-1b02-48c7-904a-5b6065e948da'));
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
            .get('/bplus-it-sappi/message-detail/f81822f8-1b02-48c7-904a-5b6065e948da')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f81822f8-1b02-48c7-904a-5b6065e948da'));
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
                
                id: '86eb4f41-af99-46b7-8c84-e65e58e35155',
                tenantId: '3b4e1f02-9448-447f-960f-f58f2d3aa0b2',
                tenantCode: '8rwvw84pmep1zjdc3kk4v90nn5b0h8xkktfhdcodes37dacrgg',
                systemId: '2032393a-9a02-488d-9310-8c0c1f9b8ac8',
                systemName: 'dh9tgt3vs34w1xzdnge5',
                scenario: 'm7b4u76tp333nr0x8yay3jor5k0p9b5eukfp4a3xxszapokv3vjxi9l280nw',
                executionId: '49c9fdad-93f0-41c5-a057-d63db07864b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 04:53:10',
                executionMonitoringStartAt: '2020-07-23 01:06:40',
                executionMonitoringEndAt: '2020-07-23 16:09:17',
                flowId: '085751e4-1284-4f43-8c46-d48443e76615',
                flowParty: 'sskmykgggl0adzc4n37dj3ilks4w787mkl95a2jvmq7nlkpbf2lnt66lrd59rfl4qzk3v3pik48d1us23zpb8a5w8k0eecie1qhcwkt4x5ibt84pubbwmv6zo5ay6h4pp5jdolyabyk9dkpr2fz4sud0ftaylyrf',
                flowComponent: 'q71hr3xmyfheodmbj6xsi4ftxqnih63g06q3ylcrm3ox95dmd1o1nwbtz9p9p66dtrn39jgsk0rf7c0ee69dfk2pucjby2c0jvexuzfzj6rl8ybywuvn43t1t1l4fwp4zamqpwpw63gukseryphoppex1ojudg21',
                flowInterfaceName: 'mmlsx9macj8k31capuvjzizskwaecopx1m08ahhk0eu2aj6cvxgjmurikiaya2scggoplzxw1g6t5wgvfcy7rjg3x2hkrl2iqfmj8r0wcrjgf74cazk43taqq1hy4lkzcxz8c1orpuulfezwlsgz789mdnuhvy5n',
                flowInterfaceNamespace: 'bkmo1wca9on6z3koe35htw9rzjjf6dvd0zvtm1kuqrebwddgpw3rx2pmqto0167b9rje74jd08yr5b97jakp5sc2krkb6y9exvlvoav6rzwy7d20bperdwttus6oz4gko2w0fufdj8u6j3y1qfwea4fnvdi70ndp',
                status: 'CANCELLED',
                detail: 'Eius ipsum et. Tempora nobis corrupti. Molestias praesentium blanditiis. Voluptatem illum hic ratione beatae ut.',
                example: 'nlpkguqb5gsbfyb95g4wyq2t3v6blqt2kjs311uo4hlmk8f5sywpx1w42a0cm0m5vq71qyu1oke1wu6r7bwwygfurtjv3ipy6x1amj8vejcq3haq9q0grs48pyexbsarhkg2ctbqialuq7eytpxfq58afcr21gyq',
                startTimeAt: '2020-07-23 16:49:26',
                direction: 'INBOUND',
                errorCategory: 'qwqyofcexo09sv7oratbty79yx516gca1h04zotzb9dn2iefr98fazvz9qfm9uec6uo43n9b762f3ypjxqq6n00eswi70kpi7hrosc8593gnckdjut7246k4guk8c76rrc8qculuxs7gvxuibha3055mh5fdg0cd',
                errorCode: '70wql80x2voxbcalyqes',
                errorLabel: 895351,
                node: 3548231783,
                protocol: 'k3sjp7ax5kydo9djyurc',
                qualityOfService: 'ecubg51q0fe06vugl0l5',
                receiverParty: '58qy5skj1nigzlj0q4t1rf9mw52w8f5ynfc1zlp5i0slsy9zifzwjcmipf2y9kamlcr6v0rup91q1mygy4of7pvd50tgn0arm9230wqardcjkbud4ovwkod3zhzegiq8l0b3j7v1r9wfvgtwb3c7d0hp97bqnwza',
                receiverComponent: 'd2so5zhylhqrm372gidx4w2epeh0q5vh9a11y2xdnwo9reu9nsi91pzdphpfuv2tb6ahhgzvcsrxfudak28ovnjrtfkseu0lqxq97tjagvrmlqd8b4uecfbqvaxpjzkhmehms9vwoq8ick7on5i9kbm1bu0ntqud',
                receiverInterface: 'seyzhq2snmai6p88dgb0z6oor7s87cax7h2fqqtycu0t8zqw2dwfeatdsq0gm6uf498ucew1h7k1f2z7zl4n72sklptp5vguz2po5dsefybarw398nhurah1eteenmi7se705f3fr5o1ppbvw85ua1lva0brc3vl',
                receiverInterfaceNamespace: '8y8zlyi3jmg76y6uagg4v3k63xtey4659n8wh6vv089mbn5xwhzdft1rhkyt1vgeb0wyvb4gy1phi810fn1uqbocmtxv6ktmf0lg9op6lnt3hmsr9vzj6ttdmbh064vl0pbg7kza002pt7syj0zrgso4zslkg034',
                retries: 9090239010,
                size: 9573679363,
                timesFailed: 5537956027,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                tenantCode: 'm1voewaafot9viia7m33wlz52o9gezctuvdnedepmyyv5ysx5v',
                systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                systemName: 'hsrpc0nv39dmziz5scst',
                scenario: 'rm53jyev50z92ss3wq6ilhbpwjwv0k1f0z0viqe2jo0xe3mrkmmc0k50ws9y',
                executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 01:51:03',
                executionMonitoringStartAt: '2020-07-23 12:43:38',
                executionMonitoringEndAt: '2020-07-23 09:33:20',
                flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                flowParty: '7ju7gswpukyzrck462fsgl6stzcga3ddijvosi2xf1i9nvmyblfrukc6b8t2mn7u3yc0jq62a2wo971fgkor7wbppqv4qkd4a9qmcf1ioehgh0ulbiik41khtp4y0t9ftyfhtaapvesm2yc5753amjf1pgptyiq6',
                flowComponent: 'jpksyrhp8lusasx5ylcgltl6ab6t0sui7uci5rptpmrsfi54x9sixxhqtxnypmyf8qqgc994oyli41s6cxe1ahnifey3m9e4euzv1siy4ogj50sozdqrf6xze0v9hlbu6xwf518b0lq05b8oi72ggzgo4lk4ttv5',
                flowInterfaceName: 'azfzl9sf4enf9hghxs7u370kaqjuyboo9x0iii25q332nw88yhmc0gy5kgmumlbiv1h34g0vhd54fsflu06xocwsvp4367tqeqk0hyqtn0dl7xxoe2yf1lb99lebj4j5jxtigad6v4s9q4t4rb9orwaqsmprl1kq',
                flowInterfaceNamespace: 'higj67jjc1uwnk8asf3gdarfo50h3kbsby129uwruvybt7qtb6fj5exp9rdx7qc7svrfuy9r4wmhtpaegs9n5yrlr5bt7dyed9tnkafh8jnuueezmvrbon28dxc4wf34u3yixp21xqdkn4iimytw3zzjpv5je2ra',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolorum consequatur nulla et qui eum iste rerum. Illo ducimus amet. Ut facere sunt repellat. Dicta voluptates deserunt dolores eius voluptas iste praesentium incidunt hic.',
                example: 'bdrai1ltt54lcbymnf1ocreiju9ilnjl5dkcdx827ervpbjo4ubvpvt31b3ebwey4jrao0vu06kvti893ymviqra7fhkp09fih19mz8ppegzfcuw8lq0bhvl4dox0hvlwlx8m57pshqn77utgdmcfkijzsmymfzt',
                startTimeAt: '2020-07-23 02:27:51',
                direction: 'INBOUND',
                errorCategory: 'atekl52gavh1303qm0bbaoebw6em7ti3matu0nz2bgmgkdchvoo3t92hgec034zawp19ct7wjj1o0a292sm1cin2j9ulglzlfcogjgrb58u2a2m10twif75lszzmiged211blr8qes5lyv8nuju463wcro8y403a',
                errorCode: 'j2r643zowvtxlft0yfs0',
                errorLabel: 947901,
                node: 6676345031,
                protocol: 'pfgd8zfghok43jiy74qx',
                qualityOfService: 'uz04x675jon30xhjzsnb',
                receiverParty: 'jvnelsz2tpkezwmwu8p8o413erpxi44nejjwqf77cmy0wkl6bjhr4ykjw8ihua5h5ppum3pepqtg6xxpvsvw0v9syy9brb29ary6yhgom3pbzyi14p0rpnzso2b4smwuf4photq1g3wvp5cuta24qfxs57p8cott',
                receiverComponent: '0w2l58p2s8gq62mzo3tlg4dtwkxc5e61o7adnwxls5g71i9k45tcuz2hn0g9veam8dgue1lwheoig0q7zzve51y49aech9pyp00o93pkt5nsku5sejh9io4sm9gskmmsq61x8c01zgnaghn31ksh7w4ydx163ihu',
                receiverInterface: 'kho1y2si8lwwdedewonpj4s5y4o1ztkjvhltwkzv4pqh3wk9ltyr18p89yfcopz7ta8pojxzri0jpuyqjlcy62toh3pxusyiqjvynzk81amecuqxbxg4bbbwr5nh8yjxdeegfvzhp5lyr6gj0b3c7fpczge3li0k',
                receiverInterfaceNamespace: '6dqdxvvjmm4rut4tpd7xvfurw1gwshcn3xdyrl7dlfnygy6d1e5kylk3xtth8ezku6aii1jx0qulrodyencszuwnzaqqlqme19o7c4zhrq7awkz5je57bt9excsc0prd3zav9cmzbu281cobadxu5q7r0exlrfis',
                retries: 8739479296,
                size: 5332916644,
                timesFailed: 8121116262,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f81822f8-1b02-48c7-904a-5b6065e948da'));
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
            .delete('/bplus-it-sappi/message-detail/f81822f8-1b02-48c7-904a-5b6065e948da')
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
                            flowId
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
                            flowId
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
                        id: '3bf60b19-e6d8-4809-a5f7-42a698cd6f96',
                        tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                        tenantCode: 'tx6kwyorv4vwnrp7jrsn0gs2np7g2x932lka9c2mdenkjhjhj5',
                        systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                        systemName: 'kv0tvb87uefkznnbxuct',
                        scenario: 'q2xzuq98ttc0he82cuzp58vw32nimxhmec458dstojtrfy3p33qqzv12drrn',
                        executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 01:55:40',
                        executionMonitoringStartAt: '2020-07-23 01:02:36',
                        executionMonitoringEndAt: '2020-07-23 16:17:02',
                        flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                        flowParty: 'xkhnekyje0aju85b0bmvgym0frtp7r7xzxqkv2pjc0ubnaag0nlfz1dgm0ys6226x5kpczw2527ev8fz6cpjqn4p0rqlgvrhw8b4q7m9nrjhkdnxvi2txvqdi5kpvo0itw1crdh698d9fknznphf7inqvvkrjk9v',
                        flowComponent: 'v4yyqdlpyrrzsb6wtfyoo4vob23j9ixfic9hwpfjtbdmnpbuwyfmqbnntrc3tayyak7zh8x6o40zcrje7hjtfcd0rqy8kvtuirbx2fqhos05vl4gkpa8mt1w0u20nsyruj0ny1a8ntmecc6zaoj5lekwqov2ffw8',
                        flowInterfaceName: 'b1egauognahtxndfo2q65ev7subdqllctbskwxscekpvossvnhuejbl3iaxke66wyduqhf1u9ys1n55ruorziq1s1jy5eh6k4dal5f5qb6jw9kl1yxzq2j78xaeitumrjcx1urpof0gs1ziqnfojxsb98f20kph9',
                        flowInterfaceNamespace: 'doh5xp7vtemo4etbeiu4ot6szgt6kgffi2j8v5vga1v5rfpm85phamk9jaxg7oco4jdx9rj8ab1vtzby91z0321gjb9lz7fsbqc9q3qef0tp0etfd412orpdx3d2p7mvuh3vbpvqf0ekfoo3s7jcryj951w5fsnn',
                        status: 'CANCELLED',
                        detail: 'Ut necessitatibus autem sed dignissimos id cumque. Praesentium at impedit dolore. Ducimus et suscipit eum autem rem ut aperiam. Aliquam ut sapiente repudiandae doloribus nisi et dolorem et velit. Nemo quo amet reprehenderit assumenda nihil est aut dolores. Rerum magni magnam ut dolorem eligendi ullam qui consequatur.',
                        example: 'mte8ffz7og9z26obu8wfzqmwpayhh8k8rq2zzpz5exdvr5qyc0r3zj8ulk8scclo14subpr5pzfxgr70f1circlir7xjpfvm8v6hfjvbf8o5bvfzzmk6gempbuuhbcxsjg7c5rbq3b84behuset6ua1prb9i8rne',
                        startTimeAt: '2020-07-23 16:18:41',
                        direction: 'OUTBOUND',
                        errorCategory: 'xftfg5bydykfmo0fbj3fj9el0bk2suzpd0pfi6wso8rlsj0ek2vdezkp6fl28jvvj6swb4wwtkq8ql876jnbp7ru6h9lww994h1jsczypn5g91g2066oh6n2kudc2lhn6dwah0zt9p0qh945umjnmrvnthx07yth',
                        errorCode: '03go10l1fm2hjri0xg92',
                        errorLabel: 392578,
                        node: 8697079075,
                        protocol: '1l032idt9doejzzibfkl',
                        qualityOfService: 'bi3al9purqzazs17sf4z',
                        receiverParty: 'rdf6g5ginntw01te04urxmw5cjest587yvy8z3ber4nuyqq2ssij6xgnovta7gw6mcivvmprhf3thyo06lmcuy7j3k9w8mnzp19rfdwn0mz2v03ch8tlwzz0nuslxy8rk1n37esukthektcfhy61kgos5o2ub359',
                        receiverComponent: 'vwq2oc8env6dyizy7ef9bzm59qkx0pnf2n7di3v69krm8yuwiwg89hhydhpqcrht3smikbcn5ruk92o91xo52c8wf5jp5ifw5v9vjxo0uc5ln52iadi6pi7lteogi0poh0pqpwiqwm1ad9xgdb8net3ems9how9n',
                        receiverInterface: 'cdn317rm1qwwewor7ckcrxdfl4lmuwvmy9xbgeegzr0mo3j67corljvh9gp5x54i9emu5siu9hpkibdxg6towhbnk715f0vveflpoxsx5js8nnvx1vs51y53z4zuscn6tw3w1agtamtgkirk5x64bf9v5bobyrjc',
                        receiverInterfaceNamespace: 'xac66wl6epbaum6soskc082w3ok2ggjcyxjrt8ve0cngj6zriridaflofq640gvjqa9u39hkbg4ucribvd5m52zentpwtt1dibfftgkxfntmq28yg8vgtlzs17kcny0t71ji7ty7mg325ouuk14p7sl0orjy402t',
                        retries: 9532644966,
                        size: 9733263768,
                        timesFailed: 6055071911,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '3bf60b19-e6d8-4809-a5f7-42a698cd6f96');
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
                            flowId
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
                            flowId
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
                            value   : 'f81822f8-1b02-48c7-904a-5b6065e948da'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('f81822f8-1b02-48c7-904a-5b6065e948da');
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
                            flowId
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
                            flowId
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
                    id: 'f81822f8-1b02-48c7-904a-5b6065e948da'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('f81822f8-1b02-48c7-904a-5b6065e948da');
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
                            flowId
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
                            flowId
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
                        
                        id: '43f916f5-b52f-4642-9e94-b4dd8513cea0',
                        tenantId: '88659e86-1972-4cd7-a0ee-8330dc724db9',
                        tenantCode: 'nmvw0i1cue0cm9enmr4ddyvodmygcdtd6yghdp7pvbxpvlf59j',
                        systemId: 'a5741af3-206f-43e7-b584-6869e492155b',
                        systemName: 'ehpm6ykazat0ix6hi5dn',
                        scenario: 'baebfztcp85ihqoz0th7d02fz6ictcbxi4t6o2tnnvi63s0ooa0974u3pk0g',
                        executionId: 'fe955753-1bfe-4c14-856f-7a23784f79bd',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 17:12:15',
                        executionMonitoringStartAt: '2020-07-23 03:25:22',
                        executionMonitoringEndAt: '2020-07-23 11:47:18',
                        flowId: '040e7633-a253-4da8-90a3-c88c48cea93f',
                        flowParty: 'lw9nqmmjnmifozlvm3zc4l4u9a3ylo5sizno9cjsoutluvjmgc6y7wxxo4b4d0qkadrqtd0606zqbh7elm7xa0lqfbwnabahtvlot4d9ne66mpkrxafyl4v961zp4yedlhy1ms8cbn7d6wtv3id2wctpzkirais4',
                        flowComponent: 'dy2dazy5slpzijsswrzbiyrv8frbzuk5xb7pmagektcqo5aiw5ognr89ayu1k0fptwpluion39zv0rfat8sb4cb1hdyodsg7eebdesh6b55zmvsznasmwj9skkdoeygaso5fviwib5p4bmf3btsh9hz3w3hwia6b',
                        flowInterfaceName: 'emfb6e80dkedsf6mmxf9bhupg1yqsm0pqqlcaxpo4m5d8zloj4s8hi1b7bm1u011n19z2jpicnc6vzxb2s9vb9njxynzpvpvgbfswg3znwro1edctz2lrai41wodsrkrsiver55ptac162whjglb8md74cmke8u4',
                        flowInterfaceNamespace: 'rgg9y3jnm07flhjzh4sbf7z1kfqaqaeqkcr1fekpvs4ay08t10qgye99mtvy6cfq9hcgycuo657zfoffv07e3txcsa00jyni8ams4v06wle12zzo33xkgq31nsyzkya32o72vdoojzvp6knctp6cx9m70dt3o002',
                        status: 'ERROR',
                        detail: 'Eum explicabo aut. Non repellendus quia odio amet enim libero iure itaque. Officiis quibusdam consequatur molestiae et et. Minima in soluta eos voluptate corrupti deleniti nisi dolores quas. Est eligendi laudantium ullam distinctio. Fugit sit ut at soluta dicta.',
                        example: 'j4dzk5jdtblp4sw1vhwaw9bylcx0w3vdwxvdd4xp6rpod2dhhd7zepcwtqkg7mq24rkpw4jnqhbx2u9ee1f3xvwj6xs7qhalida00hifqtdz7zfmwusip52d8h3qtudqlf393zchzd8hauwnc52s459jvi0gqa7y',
                        startTimeAt: '2020-07-23 09:28:58',
                        direction: 'OUTBOUND',
                        errorCategory: '3e7s5pfs7vce7lbd164e0a3yo7u3qsk7op77wm3pvbaft8ydevgtd4vv11v0m4se5106a5t2yjewaivv5msjuyrymnd8gbavlrnrwnrwqcyoq73thohwa2b220bcqsf0u13g592af6dantmigs594mxxyi20via2',
                        errorCode: '30em5njqsqkb3ech4gfe',
                        errorLabel: 522397,
                        node: 7173650856,
                        protocol: 'l5wpqinplnx1iomlx6cv',
                        qualityOfService: 'epce8j09ua42rh58ilkw',
                        receiverParty: '8ssvkc59badp4f6gcpcn3474jpy5zh74tnqsdj8vfqjzn9cckalt76avsgyvdldvqeflinjnvip8vwawj70rynsuou87r5p43zb32aasaakjrgpii2gikwgiyu4vdrhbrypsylhpp28dccv92mj8jrn90os7dp8w',
                        receiverComponent: 'guuy6iujn5r9u3980wec09xrz1xyz77ilrusmewz6ghluzb6o3esfutc5x3rxrqvfna9qbxxhutrv05tkri4sgsaxqj7gvvbv601qta08t7mdvogbp1li98fu0pu8ni04txl427mcuux7ohxp9ypm5xomt0a2vo7',
                        receiverInterface: 'rgf0118ghk4rxzmfwg152df27yiurpwotbhwz1t0vtnb2ezdn9utdur5okny7ylvxfponsgiuefar0tc4934hjg22ebkuygkvooj5jon7xj7nf12qgjqcisydlxktden9b0ekgq2cz9aw7xqgfimva38qsckrnxs',
                        receiverInterfaceNamespace: 'k8f5bv3yuqjfrdk532msgbhu9aaa7rfent2urwcvv6fcv9rmq0q82iy6ld0wz6weekd6lwnh681xkunpe0j4w9d7f9bfycke2f5mt9cznbxkhaqgkh911u9u1e4xspw47ox7unurwk5wz0afexof37e0vph585gl',
                        retries: 5040373064,
                        size: 9758560571,
                        timesFailed: 8269424012,
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
                            flowId
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
                        
                        id: 'f81822f8-1b02-48c7-904a-5b6065e948da',
                        tenantId: '68b6f949-4079-442b-b6a3-e1dee017c9e4',
                        tenantCode: '76kp2gtr9lp3m2n3uud89itzj5u0svxdjgcjivy63wsuzmiavp',
                        systemId: '2eaed4f5-6368-4be0-8502-748a2eb4c853',
                        systemName: '6yy6gixk6grt8w7q343s',
                        scenario: '5ypy415lx7yxffi3de2phpmpv7xcna9ffu7ky523qa7778ydngpr1anyww21',
                        executionId: '8fea31d0-e7fc-4b34-a633-2babb168114d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 09:49:19',
                        executionMonitoringStartAt: '2020-07-23 02:43:30',
                        executionMonitoringEndAt: '2020-07-23 00:03:08',
                        flowId: '9ffd3ec1-ad51-4e28-be31-d94d80a15728',
                        flowParty: 'tkxffb10idjd4plyb8rd92t4u4m0gnwy9bgcyifhnopsc56c89b6ullm7sumc2n7zmqwvhv73k5yhqk8g121t9ecq0j3y73m7idewrft0nbjtfjq1siia2jair2bt22njdy26gmpvc603br6i6k223ba3wkujomb',
                        flowComponent: 'unr0gv3e73d3w6md26yel96nor8tohx2cs3twhmbjlloyp83ad5xhznjvv2q4rl407l0zlj74ny8tf6u9aulzio38utt1mmvszx1ezs8jmnh39yrtmdihsacdicn4cmvxb5v647l0i5auycek6jwrc8mwtbrwwlz',
                        flowInterfaceName: 'tynidw41m5ukyn1n6f8111d4iyzo25u9jlmtb2794jlqiep15s706q9v8ele6wevnrac0s7efmp2rb70i40fe32znw2ndsm7l8w0pcy2ib9obrifohv26x32rf9uxartgkhg5sg7pxxuz3baynal8u3eybcm9qwe',
                        flowInterfaceNamespace: 'xyn3rvbhy4udosmjylp7ncfo5s9coskd2mr11pn0he2iuc8d80r8t07fv611xf2nwn9u1gsyu2hk07yhumlb4cjqdz1kipta1c307td20xmko24ihoej7bxivdd1kddddhk1but72x1iupxde2m6ymi2y91rqpyl',
                        status: 'CANCELLED',
                        detail: 'Doloremque itaque eius ipsam est qui eaque est. A sunt voluptatem et. Quae culpa eius consequatur veniam qui. Dolore voluptate omnis voluptate quis ut qui porro.',
                        example: '1zq7z5jzyy286pllqat4lb042bo518hxjgjizs9jpjx228isnb52x15wja16p9tb8o5ei8dimike7g0nps7xdcruvy9zmf146hwf3sfyucjhfy2ghljt6em3qkvuq5dubot71445j5w6jm9itwa01ymyi8digpgm',
                        startTimeAt: '2020-07-23 16:44:15',
                        direction: 'INBOUND',
                        errorCategory: 'rmb2umjx8bidu5d1dl1vahxonv1sgvdxzfrbd9kb7f00bvrabeql2v364yxezhmnzm3ktlbz80pptiem41sffz8w1x82rfaf3yuxj5obhhnizzkzrwgn0k5dimrkun2d84mq94we53xesbkcqg9oh7e95ucr1cqb',
                        errorCode: '3zqf22w2n615ran0nbin',
                        errorLabel: 904048,
                        node: 7588136036,
                        protocol: 'z8zxdhnz3t0z2oze3g3n',
                        qualityOfService: 'iotyxsp7tej2jljdbvxn',
                        receiverParty: 'ao6nmraxbp9mhkvha3i2eevqnr4i7g11sr6n35ab4bhx4ii278qobar8kv1a51t6s70anf24tw4oojs5haw40fcqjf3p7laotrmrr6dohfbrdkoh0w54so6dyumd9la107f6xtxtmo6c033y4b1erbi4rslbkfi6',
                        receiverComponent: 'j4fu7yknjgy33jof4qxjjyuojwnunojgpgjza3yj2i4qpoqy5b1hz9npnrhjn6wf3623vowbapjubq701c6xnqy7nejhao49und9w88yeb2tjdnoce48lo9gxbci82nmknn9qtlqibidaz7u3r7bwasew9h54qhp',
                        receiverInterface: 'ns2d6t5rdkm492uz4eih10hbmpa5gyuu2sapfuuvjqefzy0sloabwgafpzwim7sbk541xtl3hs6y6xr4e9hd7uepptaa0j7d42pnqrci5ejbs5ihgpx08n2eup6kphhz9ijza0jtp4gttf0dl9276y99g7bx4lgr',
                        receiverInterfaceNamespace: '905iw94y70ib64hc0z0zbyoi2kdwfqjttzh9tkc392fh242wan9p8s7td8ja5j82gr1hrtv8cqz7r4x22yfoi9vdhb6m2o6dro85elf2xdca8q3sc5njl0pj3i6pk5hcsx7oswbxvtb45lzvmseafmuw1yv3z8ik',
                        retries: 9784954052,
                        size: 6142057340,
                        timesFailed: 1511351770,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('f81822f8-1b02-48c7-904a-5b6065e948da');
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
                            flowId
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
                            flowId
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
                    id: 'f81822f8-1b02-48c7-904a-5b6065e948da'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('f81822f8-1b02-48c7-904a-5b6065e948da');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});