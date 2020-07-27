import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'zxfb4yfgtyy5yssdxcp6ympnxwan2uh9zrdr8tzurcglklccxl',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'xse0zgddvljg8qw04xkc',
                version: 'dhjc24deazstui84oqqc',
                scenario: '5xiwqjd9jyl9nqmp6pncrrd29o1djrc6bzuf7yuhwy2sjehmt2en02g5l7qc',
                party: '6x6pnx2wmmo2wff4o16n4mvcr3sz3qb26vowiuuq9iimq2wqjmup8lnoekv0ie37t8m7ortsljpjinzmip1dm1izx4i5qisq0jlpw6wip867xjzwv38p0p1nvpjqzbiq4p0qwqeuft8z9ts758ebor71x0cbraxp',
                component: '5oywp4d0n87ki22wgp1ivx9gz07utdx1szbjk878qld64lzn4qv6ievhom40y3ynaawkaovtx8yjqx65jhxyuxp6fcngsg60evj45nt1gunuxsq8792kq933f05jkzbg46coepevluwn1w4do7g1b16ocqksnxfb',
                interfaceName: 'tptwjr870ba1u2h8wcilhferwrba4f1whzfo99494v1j9mv2dudxaxkqwmelsi5udcpchk7yriuewz6soby58sgh0ptv8puqwh9f2qvkcxsx70ntf08iu4ot9er4lp2a3ghhp9799cld3epj8nigt3wwmhoh81l2',
                interfaceNamespace: 'rmrhch4t1psmi3qfnuw8p98p16ns8wuvgn7d54s010uusiqq3k1rmco4hlhztrrlbwdpqumdb9ksmexohf7h21w2o4l7yocjmusc3jbwvenmthiaky0c43wx5s6xgszti07c0wgscxzgiv3ibtebfiqjfevkdeji',
                iflowName: 'yk4e2ucbp9zpr9pua8e168o7kff5yecu9f79v9coqdqwmcz2pq498j6yc29k5eshlxl1ws9n9vxnl31vz3f442yi4ur154gus0odq7zsahf233pqdzut9mvaty9m343nr10wgwfoi0wi0tkjootp2nsqd0tgc14z',
                responsibleUserAccount: 'kidpvgmbvo9tmblv6gci',
                lastChangeUserAccount: '5fxaanzy0u6i0iqgywde',
                lastChangedAt: '2020-07-26 18:43:41',
                folderPath: 'fj59f9tw3dm0tv0kuxl6jeakhyrjemubtwfi0v9664j595pzzd907muj5lew43d9vwxq9o0o8fydz958sr803ilj1unq3o0eebtdo06wbf0mlijpgch6f1orv89eyv36t6vfpf8uakg8jip4mckldyxmvaltcaxw61fy1vbu7ef7t8ish9g3yy5u0o9v44mhhk6jyu26xqia3k6fpnn5di2wvebltx1cmfjnz64c6osqtyrm2ms9gs5x5pcnk5a',
                description: 'pn1chmap2i8qxnbmogd670fx6zr4raehtssm3ecurecm4dw0ibdjd5efcogh7jh5mucj2qtqeeovsuxi0dst2lknqywrjsua98pqxhen1zesynk10m5fh62hoxtqlb144b3dyma3fmn8kvraepnvy1dph26kzak2n44opmo0lacw8wpzz1cqnmot1nmwzywsm4d5bf3i0cctuvih1c4pnroz8ccb7s5zecffeh5bx553aiaxnd0kivxpd1dbxll',
                application: 'exuplkrcxd916zf1xmfhghpab1vdxrkny4b81khqfgxmdizjexekbug3dhg1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '6cbz8kjdg1cpxmy2x0dx79prj9tl21x9cb7e7qvdxfo4o2wxt8',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'zx975j6prgugnjgo7wxk',
                version: 'r7l6wn5hzmvseyigndun',
                scenario: 'sw9w15i5u4lbpo63ibkxlouqwdjywwmanv5dlftzp2ky8zgvtcechyeljte9',
                party: '078e1tmw8nu2w2s2z6gtkemm5gxt1mvv04vt82f47jk2hojmkwz48fb11s2d65676tdchgiayhcpxj98ybdczqyrkhn7drl3bcjnadruwj5sbbtzgsklbps5ph9ohby8gf8zgu9kuslmh3pokufa0a6bc6ju4shz',
                component: 'x807gt7hz2rs91lkzh4dm4zf6zgvg74dpplcpjog7ddcayixm6kp1p8mtuek56gtzlevxtrh0k4k6pubfv377m4ua6q3zb6jdatsvb7nw6p5j8usi8hpdbf4ozqwsiezlwg2tp484xlykd1bk7p05ssjgkaa87jk',
                interfaceName: '7yezc20vgboqkz9u2f6alpuiy62xkzkqpsqvn5re24l8vi298a6hkl2sn26ub7m62mb3ibqz8h8u7ooe1s48e5hqjobd76hduhjnbkbpsnensgrp8kfgr5vdg5b1htxkdli1rtr9bw37sg934jk2ollo05hni9qj',
                interfaceNamespace: 'fpiqaviyca8slsd5r6i2kqdpcleco8jsylwqfwk3eas3a7x8jvyset0hsch11kz0dqfnqu7yp18r5udj5lhrm9h7dux6ieo5055z8khly50w2lmmxm6u1fxi86qox8gn8s4mj6xrg4a4qz30uixt1zp98zztbfkx',
                iflowName: 'ein2pfe20t4pqont3k2ht6xnqztgiju96zt7fc4ue1kr1lwjz9fyhzwgzndksyfdcof9yzm0n7zloalykr0n05rbt9pk35e4fi5d3h2lpfmof9bzf6j3t1lfm0fbuntdfaff44h759n2s8o5bu6sbjzhs9aeqtvv',
                responsibleUserAccount: 'ipoj62x3jy8fpvljxl7d',
                lastChangeUserAccount: 'cp0msuzfrah36umrikqj',
                lastChangedAt: '2020-07-27 06:36:08',
                folderPath: '5tlu12jn5grxsqcghw9zdtmgtfkoq9msfohcpy2rtym2yfaf08izduild6ad5pn27mcyzinov141xdudvz8z3x4qzighr4luklle8a5zcqnmsfx5s9moj07l0uz10rdkeplvn386upm7uxqk5ttdf57a4n7q2yq1vnnntp50nto49ajiy1fceusr2jjzeqq1pcqas0xfimm4hukpl1jkf5umo3dajy73wfcynsve0lnuh9nyn6bmfbbbjer0z2e',
                description: 'vhflh3le5doq01s9jeovw8dolb0pvf39dysww95az9i7i7pwx1xk6fi8zhgucz4s74benly4h8x7xw8ihr5pu34y1ktb0sw6wqra4qbdcpwqqggdgc09e3cna2hstdwyv2uhk70aewqpwh1cri3jlzk8x6dn61lzzasvzmdnpzt6bdy5sredv8m36il9tq3hamlgm8mrkwy0dbd8k4md6j9juz4udx1s2u5yxfribnh4lxlqteptrfa54q7y4vo',
                application: 'ckm33da1lmt59qgazuacuqni36liw90f4r8pmtvslzus980wl5ch9g3m2mdu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: null,
                tenantCode: 'l5a6a600kzbwbr8czm2izhfhskqqlhw0xyrxxfzhoz4b9gt9pz',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'ekoqgl052nyaa7659k19',
                version: 'rztlphj7q1857yxjla02',
                scenario: 'smnm597y0u1e74amuaj66asqzn5vyq6o9msmil2wgywq3elogikje9cmvygm',
                party: 'zcye9h1jc76l93womek1sdwq1e6o8xm7pp2qirrhn5lca9imch7tzkicgq08ndwk7f6f512qcno9y5rghz4wzft3zfvdm7t380lwtn1pmvflegg39ywsu3dqz4g7h5f90ouqhenkaaxmhrj53692wh5gkb9089dm',
                component: 'olqwcglvnrdyq5ac8qcy6iuhj2k7iyckdp087fkd1tvpuwkiwribi5zsdwxkn5plsbbtyjjt9vcqd9wofbvpbk3cqx8zwolik8hke2ug1s39as77jwaehskmgfq65oakj2nnkzlzrvavji12yv4b85bw6f4tf490',
                interfaceName: 'vzmazm3g19x8ax4sepuwmtpjzmhhefbqhk0p9rnf96ewqyzugkhuv8yx4vncelkdv1chl3qr6rzat0q4oq2afbxgvd6ipj9qqleuwaq9usxrygvfjnj95alrbf2xremq74wv4zck5xhmbqclviqgmlamsgq3nlac',
                interfaceNamespace: 'pavr9gbbowtglp71w99115kllq2aivyytm4l5trpbvf2ccqu6hzcn6kinfh7j4a6x51vgmo800wuohw9uc06b6kqju5x6wmlno5n9wg7xvzyibfxosokwdh5n8o83wbor8dtluqp136n5n3miackrksjloo57ixk',
                iflowName: 'h46xj7mk049nvnan3qsjmvuwrmv7en1b0kzobbg1bvu50yepcgenxwguzi3j02ejw8rcevs53bsc8nxj40ru0dqokjok5406qqs1af9aj714v2xlw9ogskx9mi92ggvg7atcit7izdllge9k00axbvs4o919f0i8',
                responsibleUserAccount: 'c33d0x1jqm71qtschvnx',
                lastChangeUserAccount: 'dp2ghpq1d6wgk3hiowwy',
                lastChangedAt: '2020-07-27 08:05:57',
                folderPath: '8ytwrt5x3lqbqzlzjae34mt712nj9jbcqdgnjtfk8relwj7hdbv5v662t01c9eps496ks78nauggv8kozo178omq6511it156aakqzazatd60g2qx3251q5cssoqqrefur40kh8rr33uwzpvgdfea6g6kn20su79syjw6zq178jwmhqz6ijya23wjey014jnfre82nj7jfmpog6i7j64ulv0ex7iz5f2rnmx9w9isofr8pd4ne5sxzvbxbfkwk9',
                description: 'nwht4nnrwqgrt7ku8c8sql4999prww61232wfae5t9r21gqgisx3xaqa7dalwhuamn206te27wb0w5f415pu8z7vf2w4kn64d9jf4bvsgslvxi5bt73qd0ydge89sbs1kucdt98pnkma2iw0yojc6h0pcsszn8qzq44amfy3n7n4an3jbzfi6vhykmtxa6wqav3fn3792cdah1r0itcmezmx6qlvh35b7sz3tb9r6iqy623hal3qnw6f1lcjnr1',
                application: '6kh1vr9c26n493ibp3rvmqjuzcnkaokfb896yc4iaub55xqw4ghja1g09ngj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                
                tenantCode: 'etxd3qrj66ay2vbg1lo3dkcw84g6e1bke27sbgh2rrknkenwz2',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '08hnmob8l9fajkmydku0',
                version: 'dp55hp5bvfxxad9c4pf5',
                scenario: 'vsy52yesc6imm68bvk3hwvjjsf1dp2hesxpn2i69nzafa89odsbxhogtvw0u',
                party: 'k68v58x5tbsmqdd7lpxw77i686yvd3cc8f2kqmjkicvwlmwlqvdmhhlwbn3i3d06eg5hrl75dbjwhe8ll2yeoi4gvoiy44kebbdv6xanb5lzlda0pk4o6t38hq3uf8mks77rs8ygoi5f5u3p62keyx09mrvkapx9',
                component: 'd6sw8lnuwmvxoir8vb9wome7jriym11cd6gdxv4ot0heyd6y4lxwfop2pb9x12y8smao4ftmztt18exeadrw626g09xqtbtocqdyypf40c0s4resk1byuy5jhj05zxih1nv2rc2t5tzqve0jw42060zdqc5pt6ni',
                interfaceName: 'eantncbg3ub7edp1os13on0j0ft031h3jzcbs3uslkcj61lh6bis0nlxtu2evnfsv7f6h9trtp8r92sytxlaylqq1xgostbn18kfw4dtka9twkcnfqsgdr0yugbww8dnlumuruscazfesg8x6dis88i4sxx4ej3a',
                interfaceNamespace: '1pj3eyyqu19lncwxmlss79m0y9peftbs9xq7feyfd3wqsp32zcbrclbbe600ys7cd34c4ymtm1vg2qkf5e6fhw8sdf0jiagopn8lvxeubom2ts74jxa7iazghjqx49ksyhznqg5pqxnlu8rq1g6nsfsvjhv1sosm',
                iflowName: '3rsz938ybl4pqlhu51ucd5rkaw9lk5ytxxt3ojfwrbhgm32988diq7edmkv3zbw374e9jbytrv4y5wezzd0oklj80200dm51pd6rhs5gtz6oekeynqs8il2uago5w7xv91r9gedwovcd6zzlsvnikt6qxadn96ia',
                responsibleUserAccount: 'w5r54rh8cgm0v49xyq3a',
                lastChangeUserAccount: 'wsybd2iz1wi3m315d6uw',
                lastChangedAt: '2020-07-26 23:08:15',
                folderPath: '8jqwotw0b8uc635gyu8838qgz9gl5lzkjwzfu54h8jbk8rg3qdyv2qo49zi1th1arov6pf0pwwa365rn1zxtxqxsnalick8sqyyu6rc69n7l67avmlgb5qyjpswlsmubwj7ylv07hqpcutm7uhde6m77gut7a7wowj4el24wwo917i8ccargqkkfn1rk77e4p6vfxncnb3qwy4q5a80iwrgb2un6g46ncs4gjknbe6g2829zne20vcwim3xsrfs',
                description: '33jlhugjhm8r8kf66a75dp7sxeqpk2csibae97bhmhnlay8lnzyy6eb0o045fmzemrdo531dod4j1xf0zrcl1yz5qo2tkj340zrw5an7w9gn61e472ltkqw403ky0txums91226yobyv2ds0yd15t3vvbbu1wtuw5yams6228c9j31brm9xxmu7qbdsdp8xf7nkkffnnrupwnuylng95ln782ro39m5y2rt6e3f25kb624qx1ksxfjkdot11zdi',
                application: '1wubgb1vyg4wmod9i89dxphb5wj9789bbgee4t1h7lmrf2l3pkntlko1k93q',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: null,
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '8yrp4f2vcrm4c7cpxhyl',
                version: 'odu9x0p7jp79vpu6sei0',
                scenario: '2shi6p5emor6yypqpq2po7jzaxfn1iii8do2jiu2xwjmoh6otk1imcrjpwwe',
                party: 'hz782zhyl05r9v1p2xzdv3zl2ldnnsywhw4esld2k59u2j2fc8tdpf5hotlxxnei8sjra2l6wm6upxfz0t48lsbihba9alw7dsbg89nv81rifm88q4t930lezphae36nuqawou4u3xs5i1gvn89kqn95b8zib5fr',
                component: 'iw6pnqwx2jx8jbjqniul4550tsux4ug400jmkvzmkga8yng51xc8z6iu2lk2b0b1t0putaq46182yosuwvk34r4c81wrbgtkctht0tfvh2sjkyjwlrfhw7vafduhlt3haar7d9xhje9xuq0h28zv50j3ik8zsji0',
                interfaceName: 'aswowkt8cvbg2pwrjbxgf1aha1zhtca8h81xbs8wfnsin9f5kw4yc8hf320owcd7u63ihb8dyq5cqj6fu300tdstp6wje3jve8bwikrvl0kqzaey22228nf7zf1g0ae031oqaketqhch9r4nkh1fbb1gx8o688jg',
                interfaceNamespace: '04hqy3e7bbynrystp1gz1mhr54z8zzlrubwn2ayu82axbbc9wups0jcb0qagon0xuvjvzqbhv8ang6610ieqkatuv8hmo3tfhjejpsdzt5wkrjo1qtiw1s9hho705z06tizedyay22jeo8lr7vgpsxgeaxr5937x',
                iflowName: 'i7vx2dcywj41shbygbw23jdulkk6g5oye0nydcamcfsxvxw7qlyhc9967qewcq803jm4e7oaecthh3gnu3vwualunyjs03dz3khr7ckczzczkvwy3g0q5kalgrybpq45gaen0i50qieoqgv7gzghtm3dv74bz5h8',
                responsibleUserAccount: 'gwff5b7aesqgb9mxoaks',
                lastChangeUserAccount: 'us9badsnugi8k37qi2q5',
                lastChangedAt: '2020-07-27 05:43:17',
                folderPath: 'gzskno85k3lysnw21v333pzvgzsyak4zeykcqjohsf403zivrxyz3h5tvd04e1sfxjznt7vkleqaiebhxv5sa7z2sxe9c2z3fbqvmvnoaxmoppea8qh5lnk5labxsw9y0n9jcfygd7n9a45gnuslycfuzhm61cliedw6pzp9vv0nfo8i9tyybt65j64p4ty5l6ncicw8il0h7l671cjzlfp84qlg2dtlfpok9nfxnrm4v14l0wipaond3j0gvz3',
                description: 'lj445xxgr2ik2u8kkoz6jc0wgf3gjzdbfqa9qoewaz1eavdko1wcdxqkuhu6jqwjo8bphfakmzp2yzn2bhnrcxw7m35dbwsp0md79wb4h75p52u6kpu4utxf8fguiyph9nlp8ndryy5wn39wjtxkrnd73kscax53csvypboj8n1ll85ypjpxtzws6m645tej8329kq7jd7oyv7ez8xrqjwjlfinyk6967o9rmeyexjnzp22xhr851mwb52k8m3b',
                application: '7aewglq7o2a29d1pu0uf14l7bbpi6f9zslkb7fcnrv2wv5jukogbfafaw4o6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'l49qoevte7cv4dgv9wyd',
                version: 'aas5tm69tsv0pve11uzp',
                scenario: 'od6470bzdjgrleufm4q4qrubews2lyxf6qrzlj2c3zzgsdgeh8xgy818in2w',
                party: 'vnk7zwlrhb6athabwck6nv2d06ek2goe06jmx734mlbe8neecri5nzqp3k7r980mo11hjf4ark3wdzg08h9daxxmonmcdisijb0zvhm0b6lancxdm730l902h5xls7b4g8qm18jpo92aqh9of9f7umgr7m4molmk',
                component: 'h3bdhxzk0lk6orkz9at45aaauzqvfh8n338jxep4z17ofyp9u6rz09jpw508or6cgqx79uac1ardmvnwgsn2eh808i07tz3e6q4lagf1wtgdnwbbnf1b0l7rky9iznh3brqvo3nppcobj7uhhzg773c0nyioegxs',
                interfaceName: 'so15h7w072n71apq2wi6qlievg3j0us1z4rzmw3dbgub2v524lyl112jk39sos2or5k4e6ppv6p4yt3uoqr0piw9ox3j5tz49fuf8ea5p47c6ke9t8gnwf1vxfs7acim59pq6wm9b8ziqiyespnw2zi880e09d1f',
                interfaceNamespace: 'j95n1mnapvei77uo9heiirxbg4uiyf31yulljuvvsje43pb20bw64x44hd8i465445878r05sxvorddojudayrznyeaaanbzf4y7fout2rhi91o2w7v2yrm3l4ynup7crj8dnn122mh5ryb6h1sim52kvzsf8y47',
                iflowName: 'kasspgua532rpo4r0qnxicpn6d8zclm63b5l1f7671x18i032d4o3cjvp14sp3tfh12ie81ohp27c85lrybeeaw4ygpqrbf722twl1vck29qxwmw5luimqkagtae3q8pafnshf0mn9tw51o9thjyhq6sqe1u853x',
                responsibleUserAccount: 'gljv2k4ze78nyubbbc9t',
                lastChangeUserAccount: '2yyr4jxx2xu86tvuwar0',
                lastChangedAt: '2020-07-27 13:00:24',
                folderPath: 'omre1o35c8xdewr92q5cdv15hg4kwc3pxmvlu0331nzvzeflqw95veteop6copbgvtfvm9yfsc72xbkpc1b5nhbb8h45yxgstgovp2okmeywfyljj32kvj6ii57fe0fnr5jmpma0wdrt1wqyxbs2zjza5g6o21mdgdbv4dg1xz5ebr721snwu4a5vd6m4adldptcebwsckohfd3z97m1qeoimgwbgecxqp4jymyzj1thq2cwspmjhmcl3a2sw2t',
                description: 'k3755mahovs3s4mwgc95c4xp373ntivrig43r8w5vvqhqraxp9iyvnj8ejfgdkgnmq3gdi86nvgb8us1kn0n67ehb7hp89xnf3rfuctnsm45og7l8pkgxqs6g1j13nezbp5uxcbq2hvya5h8ndh8ku1zwqnqkrdc5tbc8j7uttiel7d04jtabua78amflyxks51ni85z4kvuwrpppparbb3n88yaroxo8fcth2fez7avm39s7in1u8g8tuqlz8n',
                application: 'rx79gdgp1nvuty1roudfzb6r4z1aqe1qgft808ns0w0rkxkzddp7szyrq3jm',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'kh5is0d6xbjdij66vuhwkzgiw966xu5u6yergba5e9qtzpdoqs',
                systemId: null,
                systemName: 'mdpsmye955kuk0uff1nc',
                version: 'ddfqqh6l1jkoopz1ehgj',
                scenario: '537zxjws91mc9on3ea9fdbzvy8b3zcjeumhcky6w74d5mz2f0g7j95wp11wi',
                party: '92huvq54j21751bxzec6j57gc1qe5yh4m91m4k7g0ia6bug49gezjaescdbawfj3wi5q1bkguqaxk5nnfm8dex7wzhv4pz2erzo6e8w5p47rnrwv8ieltjvifpee3y5ou4udstq91j3jjq7t72frq4yfixegf6dw',
                component: '57zbryd8p1i60fbaonjf0s9mxwwm9zjuroq31l2xiuzdoyu5jg1fvtjyin99eqpkpi20iafsbi638g3kf6qf6r97wjnaagvtgxt98l74e209qx3o2zu6s49805saiig9qh9y94uta7lurx6ebyfuck62vy5u1sg8',
                interfaceName: '3by4z2s7w270cbq4gewq2rmpogc4wc4yf6vstz0frtavcxd2lsd0aupo2xcrfyubohjbh3w72z3zkmdwtcph2r1d22gm0q46m2a3d2drmvnfne6hoc33qe5wsf4u4cqzxsoxcpkk8au6suphn66jcpnv19cmqein',
                interfaceNamespace: 'in551on984m7tadzmy12brb857nyoz24y1lthd6x96xnr38t5e7wvikw5xwqkvmdrjelld1si6jn4hpksv9jaw8pu7bginfkh054rqatgkyvyquht1xn9eh1yiscpy964rziyuskdl6akdvaqaas9m215ehoetd3',
                iflowName: '4vajjchzn0t10b8s2fyarl3cw97g43xl2jkjzl4i3h7ud745w5bw7attxdvd4gktw33d5jbvv2jr98hlnbwtl2dwpkcir27cpnbr9tyemc2oo8pqddr5qgx513yra8knyrw50jvbo02sf9xoayr41pwegfo15gl6',
                responsibleUserAccount: 'pexj30kyfeid4h7fxxmo',
                lastChangeUserAccount: 'ecoi3foqdlii0jf063b3',
                lastChangedAt: '2020-07-27 01:42:57',
                folderPath: '4afsojjz9jozgt3ey76iutzjwtijjh4zx0ichad5k8xah83b9k926jgcy5cvjrlj75frsezpskweezmxj9htau60h2vo3tkwax4r3gptcq966v4x4ta68i2izg4uy7bvw6keyc8r0mmpw8w936qnf23blvolzdgvvfxwyoce1qv3yoyp90tv3hnpknbw3jn7btbj4pqvpmnnxery93g91yfzw5o7vpokp08vk5fvgd4gerrfk1ncpu6uitxcywr',
                description: 'nqr82p6jg13pj416feckrex2qmapn2lmr1qqcctbktpq43h097pq0c8pdq8udw3ishdqgw9zg4gy941t7jeogpx0bpdoa641v5lzym3b3xdjhesmxjdxrrtgooioazqyt108pt2hwkqkjrqja97vz7c44x0i41lnh6wowkyg8af58piwix6cwwmg6laenwlixmr5igdyafq1f4vremgyudi4mx7zuydlyng48c6b1folwx06rpr64c9qj18cym6',
                application: 'jjbtml3kus0inqxfjzddcvf43k4c3k1rj7mfip70am5r6s72t27i80a72c22',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '0uurfno1ou29mi939337nrawizym53bd99yplsj85eaukv3efb',
                
                systemName: 'pha8chy1yij7wqh01rw0',
                version: 'e8rt5jlorwfrzmcn64rc',
                scenario: 'okvxl90uavyghr7src9evwll593n8bdfer2ilnny273o1a257bt535ev960w',
                party: 'ebmhq9ydtlx3kjwm2dj8d68lfd2zyv5it76nfh9f89q7fjsb5amtz1rcjjgrvggdp10h09u4ocbo5ss7zoe26nrqvii8nc4qksbhoqdpab22u4z1jwh1aoaon2jl98ph7vevsi6c8stv36biv9l0ofgtthjd9r0d',
                component: 'y7om7w3p66oboemxjf6pzuumyiwadfhqp9j5lxr3d8f58zadgoqaxqmx9p7tkuylnd67xjspvbjgbgoyn4mumenblln2quishhgxp3v3thbwxt0e83a3q0jn2tgz1jsc8catnyi4aj2bu9tyn9qetsu2z5x0xzbh',
                interfaceName: 'cy1lvz8pl12q63pqljdb4riytjdzrm702dq0gbx8aneyq07o0xsnhxuigaol3tzowanrp4c2pfw1txhtva5vnrw9ua81grr8selzg581vrllkfh91a30vuh5je9z1ry40j70vjybkdi0qobd4jewizov6w0nr44m',
                interfaceNamespace: '5p9b9e24h6ftie7ohmx2r8krz3viw455hd7h7wxdq11oj2bva6x6ovk8mjdfthhx7elibc8bshls8lgrbzt0pn7i7idn5z3z6zwvxm5qnr0uq43h9zp9530tp1zg3j5y58iqtfgplwjodbbi2yj8rbfxbq2t950f',
                iflowName: 'mbnc8loj2jb0gb4mciz0a2a9e7ukz2hmijiupaf1fljxopdls09h54mi6ctk7jitbtfnrerlf6gkmnhqjognivtzb5q11a8otq3jejaj24u4iw2n5oox4nvchk2wo8l9t4jk1m9ft6lq1iptxwo3hoe8fvrij9rc',
                responsibleUserAccount: '0h4mamxvxhv8zlqtsy22',
                lastChangeUserAccount: 'uhy2vx6olxlu2qxxdg4q',
                lastChangedAt: '2020-07-27 07:29:14',
                folderPath: 'er6umw6n29bxrb9uufb17w9rb4t33qut4zcik1v41eyqf8jlde5wzojzkt98885evqnd7u6m1cjmahodj81nxvbnrzfsd51rm36t0jkreakfccrxupruc7afjjjxbijfafpyvoy4j42efws413hp5bvxb5xeqe6ckgapp4hmccswe5t76p4mh836u91ilqhtg46312lym5u6f0rh3ljrcki1puwor4bg6d6qldnoryk0by06mkchapovhtdsgak',
                description: 'y51i1ehq69stvfcp5h6vl8fmssvtg51zwertq4d67n288zm2qc18dvfnbuz26ljwnomtjxij8y9s7qjcbezinu4sl52tzfar819njqpqgqd8jui6j9cjml0iv8gwy6e09fiugavajwo8ocb31m7prknd74ion7ltrw3d5uw6tffcn76hsi82ezbem9mpsxfmgrp9jn8tp2jwi445utvt5zmxkkhv8ksuonpfboygxszwdd0ku94651p951g6kxt',
                application: '627ll5ofxu39xyq00de3bk0chkmy0ft1cirtvpnv6x0v3z6shw28s2zzqucg',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'vc6i9qid1vk3snzjs43zdl2jvn9t7yqkwzy5efr5j7g5jda265',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: null,
                version: 'bs8hvpjkx2zssbirbisk',
                scenario: 'yeagn2tjpwx6tav2ptmab65gmi1q1d71zo2zwkqfifb4nmon96nh59pn6u4e',
                party: 'kn34ts0f9h6oyn2ckoc5racmmty8knbsc5pqf52aaqgd6czbvjqb8sa153ey4lz2itdey8euhwi8bv1oodqfqg0k8hiy7ta53xs3linydvlu923h7km9u6ssb9x509924xmayekbx2978ixznsxxffahg46a4zhq',
                component: 'dl6gyk695wjv72fdxg52i3g6f5deuo4jyisn38safnb55g28hbtrf406p0ggf3ecgmol0qwg6fu1z3nxnz6z9bivxg5vbjf760flz9c9ukt3iqcbf9d19k3zwg95d066vnpz7hui9e6vnpeoe88ogtagmwt7wz9d',
                interfaceName: 'c5qzggki2nvblnez3b4bpecplwzclfz4f1wir4izq27h99mj58ofqdexm2bn5wjqy4aaky1dbd2hm4vx4syt57wm7z5n56128qwaxxyodv5nq6h97iysqdl1q357qygyms8yezenksjqplmb4uxgipcmyj13m708',
                interfaceNamespace: '4fqqoohlkf9yump03oe36fklqdangc7ej9cchdpxpxiok76ptj7r1bpg6kfb4ymkd8m27alcclpqpw9ihurc9y5jq3l7whq98tnclv81a8zmivvcu3x3d8qm30xfcay5w2wpk2s8n377yzfsl7u2ba5o6jo9v9vx',
                iflowName: 'wi1j5lbpogkvqfy6tpnclqgvpz3f5gtz45ariwidzn09yl2pff88pws1ptr97fwyrvdvxrae0mli2rv3v3ig7voqh2s8mtfy76ovhbn3c144fwwne7z2p8bh7qc0r2lc4nhlljls7wvrbvyks4l1pi4anbwgugm5',
                responsibleUserAccount: 'dsimafe04v7pu5yir82j',
                lastChangeUserAccount: 'cbnze24i9rjimzlkwzf8',
                lastChangedAt: '2020-07-27 06:13:54',
                folderPath: 'fgm7j1srud1njyaj0pnrgvncppu9ow1rxn92uygndot2qyxza3u75t8li7s0ecihk4rkck8pebm7tn85bkb8ewejmnpsjydosrbsb9ykn32uporz77qy6852esvj8jg8fzxh49zhumb05c32wv1fc0cynkpup1tekd19b6acu9lvd2b4m4s2idust1nid9v3t4iox7kloq5b7r1k5u0zozrlkrbj2x7uo3kmv82kdnw7i6ylioc57txnchd6o3f',
                description: 'z9llckwdzdxqisoc8xx72k15ykwjj9bj7huf15x07vk47q5bp0gf8sivog5gpfevxprdygp6ay0g33zr4l7l0oswqk04ymgdmv98614se2epjs8tvaccqk6cnpvqslnfybwldupy2jypvchxl4rbeuxoypemliaz0y3nt1f5161b414p75rrh23xfd1digfd3fr15h5hk0bfg8zi9x0fljw9fbdhvma2iyug2vbd4lepw53u4jtfa4umglx08ub',
                application: 'vhkq43cpkotygk7pad4x9hzadrpylyy79pxediqpbnxpkw3wqup15mqmq2sv',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '06m0yca8uxdmgwwksff2kl31kwm5h0qyht6wxbm2x5m1sza1om',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                
                version: 'py7gytd7vb1ag7ykruac',
                scenario: 'bk7jr8yajuujdfsp9rldsiqyzyfc716dw1fkqlj2e58v2s1wwyru9t11xr80',
                party: 'ltck88bwtk61ks3r263ntunup41us29fhwplizqi0plg78rf12a3kcxdifb9otd932cclwczzuewbju8dgpbhae3mkma9wiwenus9sl52cpy6crrsgeregne07x339o239xb397oterm1ug1w767rrtdnhuakggd',
                component: 'li6riqe7gg7syorjbmjxh77tbeqlh2enmjguo6k7wdtqhwbwl9h34ec6x4gzwkoc1ewlkpsqcu5la2i67robvlx6s8zukhncx6jq4vdxbcbii4syjs4ah0008zr5ptulr2e9cpvjf1fej60iffjmjntgkuy9vxmp',
                interfaceName: 'xmnhhs1ep91lmo0b6ugso7th7e2btzr0fjyztw8sb54dtk24radi22t74fmv4fsb7he5i096yudy4xkcagrmbu2rrch6wlzdefw4scrr6yvx7xtgj1iz9qfba9neqfivpqkqgkf73xi4z690zjosiorv0yg6x0th',
                interfaceNamespace: 'ee9c4frnl5wug7790m62r86j6es6sxwj92m3222res62qhtw4c3o8s5n7twqr5s07o6h286he47csgjromb8lthedh996e5yjvuoq14jk2g8vmh3o638clcpnpmf1dpiez4cbspdr1i7eixskbmquxycut5g09wp',
                iflowName: '04hjuvxvdts4ibkbou4sek1c4f5vno7klhvy547ddy2fhg0367wokc2o2gq2xiiidteb45jb1jt3vfqoy3e3laml15troyz33oz54ymulwz5o7x1i4w0pqcbqu4t18rdzibakqhgmzslsn9d574znowqdb123u8o',
                responsibleUserAccount: 'gpwby92yxmnzxdx0rt4x',
                lastChangeUserAccount: 'v3ifp3na11xg7pl7pkzc',
                lastChangedAt: '2020-07-27 11:40:14',
                folderPath: 'y9r6pflr00je719inpqhr4o4aacuux2v9h3xln85yaejhllhv3a4y8qypnqhzu1l15b9gq85lri9ozdraoweccw4ad3zngdqmq3hmfojslz7bn6k2j53abdmt15c5obdk9t1djm294y909vbp6yr59s8oku61c456ys7fuju8ku0fgysmqk9asg2jmexmv4n8ggpgj41xo47iip87o4xkvckeyrhhno5xzln0wbj0e5l53s6x0ms65z4d1qhdxa',
                description: 'opps08qswyrsge24apx6ocfzallee3j628bgyt7ysa06x6fbz828g1l9jw51hz5b1r5kil0dqgffe4vo3kb2u96q44tgzd9asimdk84hnr03j42v1hmfmkamgqpk5w6vcy9d4galu9l2njbqq32ygfhqjbuhnpmq4qbbnpft0zo1wme777yap0j2a5oxz9okrpiasawnkipb3fuyxrcphlzhbs7pmvm8hmkmvxiim285zl2akvhubg7oeuau1zm',
                application: 'bv7fnllmrd0jngodyhxbn4ix3km26r9tcoqksfe1n76q738r15pltofxq8rq',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 't0eycvze31nulvm9ldb1ligii8q0cqnbx5r05nkm0974ebjz4p',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '9lnsbbxqdvmvdzsd368q',
                version: null,
                scenario: 'coqwz0s772xgb6vtntx0xbjdj7eu7d5mhomx3de26vy2iwt6s7osfq62nv5b',
                party: 'p5fuiw11s2doxrhijssemqc3d6kh8qlqt4rs2g3xm3577nxigg2gaquwn0wp73svwy190tnuppr0rvkoi6cnji67kouwe9p1rykar7qhfo2dxb2pf9p0pbslz01netbxx7litu6844jqkm11wmr99sr62xdhpdg1',
                component: '7nds8wahwy3i429uf5zocoirw1bbgggdbj6ubrfvv2pocxtrm51r71gpi5x1r5h3p110faoabthl84npvhtxmn0l2xro7wekm1spvygvhiwnx5a0nfhg4018x0ja18ztih912leifgdjkmtjgpmkfiqcfaaxeq04',
                interfaceName: 'bkbooybnh7nljh77erm9z742b5uedvi4oa6dahbkcsfcxxrzpn0n0xxk3kuxd7x8akiaicy6hsnrtb4ib05ri5sqdl474sulxgpb3bch64ru4pm6p4ixzx6fmvo0j9ejmkf2gr8xv8c0cv0l34a2kzv4ehjtxgz0',
                interfaceNamespace: 'z5cwdhgf4r3uidnswvxsuxg8yqeau6jt7k4ww7cgo5mlnpdvwof8gh1gtk5a3oolx5saj1g0d6vqxv0utcp0u61l6e8oh1uni4cqlp8bi3ubvm3s1gxj3jl3gmaaowxpzw6ql8b7tn84aicv9c5udgzpoaelf1nf',
                iflowName: '25u09goo0o3m4qsc6ic1hs0bdojtcsmhvh13wceucwwgl5xjy65lbw71z99py3iktda116rcqpx9sa4wifwn023jfl2qi18p1hga0q0sxdebkm52krbdyl34czhe640komca7cz9gv2mwuorcruxbjpdqrk42xfz',
                responsibleUserAccount: 'itnwqo40ha771n4abavp',
                lastChangeUserAccount: 'bm7hryym152s3pkdzdxu',
                lastChangedAt: '2020-07-27 14:01:48',
                folderPath: 'abgcqo9x5n5khkn3p4elzb7el3efaro4p4kzqf11r2swfsaan223jbo8xihbnkden3t6oivhz2c7bcs1ka7ypmkec7evj1idfar4xkrr2sfvvcpsm13mqe8mtt9da6wwtqcoslblxm1owyc22f885w5ljryj6opcszaft1lpje74zw6fq1jy139y0h0aurv7omzvevduiegejrehjjeet9zlstxb1f3w136v8ji9x8s10t9mpytis39mwmsoqc9',
                description: 'oghqm8wok8hzdd1beywv5a5c8obw4wpxlvj9yd5c0atp6i144l52mzczs77w4qo81itsop40ijfvz4dicivn4kdtqgy4gwoaclrp7dummytr7pm1irv4kiky9chxlbj4wnnzhemr2sy50vb0q3gzrvuve2ohhxlh0qhnavopxnehqbpiyv7ww92dww4b8o2ny0za21x1t87bgzb7huh39cenbyjd014q01herotm54dn2akihgzikv2vog2320r',
                application: 'krs1iluxiuvl8ds2favkst1ncfv969t00r5qqmhw5j91uqs2c578wlc6555o',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'a22ndw1t6dl1f4u4qktl9hb5ft234ee9rr0yu1olyk87uv0m3g',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'hvnpjpznc02dg21mtsuh',
                
                scenario: 'te37dkq7k03dny68s6xkb7cj2h49rnimiqbz0hp5wttargmrvwyt1phiqbox',
                party: 'ndwz1q2goix3d6tk570dybv28pqw0gevh6ycnd7fgcm41cdydaoizas7vpxcep32cuhlzz03k1123ez0jpo75r2zj8z0od8wdotddax3stj83sd4jha8erjqq9vnasuz85linazgo679k5uuvnifyvmzpaf24v9x',
                component: 'cxuuubbc7lmnq59xe3f38791rtzdyp1jiv7f28cr6xquld4z22fwltzswww05dxa6byhtlco6yvdt8xtux9mwc49mah0o7kfzg7bngifej8o4ix1ozohlzyyulbkf8tgcouif11g1daqry0dl60zsr3p79uhoj02',
                interfaceName: '9wpcbsfz9xyjg2z2jvj09t0s6b2531rr51fc4ocwgw0tyyaagkglrfpl77nl5l36yyko2lpt3wjdgolq3yp6d73yuk30av9wk6taovprktpfqx91m1plswllgkkw4qia4oq6smf7lpwrwtwbd57pogyk4pvb1lwf',
                interfaceNamespace: 'oyucjlat0cd86cfk7ucxi7oucsi6icnfkko93bsbnpf7ha6aj0b7yx5fngvcpcqdw6mbwsjfkfcqi1eu3h5kd1boam9oku9uptbow834q3r8w8m04tx5una9dglmtxvnoej0dqikq6clol4a6e7umcyayc5t2y06',
                iflowName: 'mel8aybfmje307496zq2lrmfh3terrzkvkwyb0l9jgqeyj5qqkklysjskvslsptxuzfohasq6fal93qbb697e88zlzhd2ymo459vkjinpcwskadfkpnwki9dcd1ztx9oaz5kn2sawuxmko4klw70ucx85fbiqs6v',
                responsibleUserAccount: 'gvo8urajxl2urap3i2nx',
                lastChangeUserAccount: 'v2vtq21i70735hze3vl9',
                lastChangedAt: '2020-07-26 23:33:32',
                folderPath: 'vmg9g1fj6gmj74vmp26clzl0y0qvezjxatz9lag0jh8dfllc5h6jkduo9vgcugu6jdtelju99bhb76l2qq7gpt1mj5y9rc5tfyb92ir96ucp8voi8edzxxiz2kkaaa1pjuzrf0xygz3c6xxa57eqpvbic1yolmpko3czspqdc2o5yt0do3gijujhbo7x33qv4apmzpjnoy05ixm7br39x27sy1mfofnf0xr8obj1k257u7l1xfb3nlenuz0zqg0',
                description: '7myk7zurhxurm9iwlrxaaxllz8vip3kv2ihcnkj9li4i4gx13u14r0np7w6c1p6vao5kobm7xgeaj3ovo000e0a66wpovq8e77cgsmp3hrqaqjum6800ax5alo9nhi4njv64mu2ksipn3cmeg8q9itpnh9aw9a6lwcyuwf7n2kv0pqfzg4her66c6n1per2btouejirv7q15d81hjqy35tej4m5j6bro0x4qpjckntgsxxn85o0k8kk5658g8l8',
                application: 'kh8vm4a3l6qm3r7eugvx8r3werlwkjikx35kboq0yn1hi1qgqu61e2jx9vfl',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '0acuqbi85hmrvuthfmqkw75yapnuxy73cqwcon1b01p3aqxbza',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'fhkoks5yrqidiyczv3pj',
                version: 'imatsaemnckbr04dc8d2',
                scenario: null,
                party: 'tqexp8qdnh1o4h06sqrp1bw6mvm64t0cgd1m2g0eje9g4udixgxntbrkh429xgefm7ymob6199ok6nem1bfm29hdct9k6jupw4e2p2701r6geyvygcmynt6e23n6259gqy6fkdugw2u6rzoh0ps6xlwo8tjxz9ii',
                component: 'illirrwy474rinn0mazb6g2q02g6e3xffsrm7cbotb78jbxmbgo45vmhu7qy0e67j5w3apjtsk8oo8uz5fwf07zeihddqo5u9t7r9v4pirskto1qtxyqne0wl8nai3912vk3i3iu3cuhvmxjgf9jq1kwtrql762g',
                interfaceName: 'qnu10wnmivdm0x0fy27jfkzaxkqi97p2ck8yfb1ypefdc1xww5h6vsr920nrb3hlcbi29qovae8xdido72iq34b5leztdskbm6kmioojrk9t2bggcn9k0mgus48u9xl66pv7gm6y3q7qkykfr797til6hqucr08a',
                interfaceNamespace: '0icbhf4f9sdo7krjt9hi25jvkvdv61v1edqcwt4ew0y1gerk4kcd80vq2zr4ykznanaicwwkijg2tlm5g4srwanxo656sndnjtb8bcbtt4cfb519krwgq3xnmvqr4unn3tzc0jascvsf6u8ymhdvgp38vnhc4j19',
                iflowName: '5m3u203hce2wsg4ihj8opz9279ob0jkdc4c87m8ffhr9kb7hn1z5v68rxyzgbde6frx8i0kgcxkoddekwk0az8i4a5vuwyulretnl32id1ymzhms66mp0drr8o70zmzq66qqr4d2cl4f5qg30wlcisoiapcj6y1h',
                responsibleUserAccount: 'iv8iw3536caif9fslsrf',
                lastChangeUserAccount: '17hwsm33bh92v1j7q7hs',
                lastChangedAt: '2020-07-27 05:30:05',
                folderPath: 'n3awdzdtic7z1k6zi256dsgyax6q3dly2g8k7el48te3dfmlekwekm5copcq0v57kjbv3m6u37tgkhj6m76efr8tzus8qc3mxyklshkpkx3dxqpek0css1vn2w138v6qo3y9x83dlwmm77j99kdqxdmmvf7o5hdztrbes9wofwug5puiykd988g23ptjl3q3pslhnnmxl3gv3lroa5qt9hgq3qkr6giw72rdawvtr2c3thkz9qpmjcjrzcpf23s',
                description: '5l3lz0bwrvwxtefvejjr7j6hgkb7rbjitg2gb2xp3pg3gjdc5v348r3njzc930k8e9u5ccoczys12c3dgrmzihhou9lseul6mnxsmmqch30dlfai0qe5dm5zt8dcxpbjqoqgssu4p3op0js3qzpfch7m0xvx56jzuqt63fok1640otu6xpjyu66oc8rbwbp956au1x66j473b83kjpb60pl67guvd3lnd3jvkygvhmhwdmsk2tv0k59pk5tti0p',
                application: 'kx6x2adu83h0s77ydecy7ezqoq1x7moawl2ncoci9vhz5dmpe1h5nscvn0tz',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'obo2csumhx4v4wl2agh7ceg1b0krlxx9441b5mcat7zgu9wagv',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '5b1iznjw5bigs0dekbmj',
                version: '1v261zvxhq8mqte13vwo',
                
                party: 'n6opsn83pqp1ousnw3guce4pca9ywuay4cduwiqthzixjio11il38s48epr8uzfl3snddnzloj6xerxsdo53x7ab1pv1pczfxms43byngu0fwamkem45358ygvw7v65svclal84p1w5j66dtd1kiu6i798nzz1xb',
                component: 'qbp86mrcrtcwy084q83ns2pee2cxw9n7oog8kgnbxg3798hjg4rv39jj1lhr8rbgbm743wvua6l8jjba4zzbnmfor3dmau0pkc2ugaryllu6mlfb5h7d304o7llxd58fe9wu6g3awg4oj4mrrjvjspr8cpdy8m4m',
                interfaceName: 'ff9688wcf0g27znmrwgptrgq80cu3u712v07g7w6s14u73u208o3n9n76yld83gylvooyts7faosdtv24yyimbjzq6491hyxzwouox7v62fy3xpvwvg9uxqg2064y7652qw2tmrzwnm2am4qqcce7sycujhc7qg6',
                interfaceNamespace: '8mkay2wnq4r2u1fmog46fjvjonadnviob5jula2ozm5l0vuvoscghjp74l5q8v871177rqtqbstptmozjzk43gokgvupf1lilkvlez275dly4g03rskf0vcbo88vf23rvqdtd62npskyrvga2pf2r2s2s8req9zc',
                iflowName: 'lgsc46y24kwh0yp99zuwbvk1mionmmxanzjgqru6xnsw2qt9x16kbn8d01rfosjgakbeaqtypi8qy1ci7g92ltl4er87xkpafuql3jmydtqu2azkxufmlqj57plfuc9otjsi9kf344l4nklk2k67dwsn1gafa9s3',
                responsibleUserAccount: 'dwhybt4q2tyse3xfq3qz',
                lastChangeUserAccount: '26sf46m128d4xuttpls8',
                lastChangedAt: '2020-07-27 11:19:57',
                folderPath: 'kzvzd4sd1b7al6xnz3hac650ewv0f9k1r5kx5h6lfro3imsddmkksn6p5xr90hq5utj9615q94jx8ufm3jkcbd3rhu8hj5txw7bvn2whucqjir2ft7q4w31qh6nwldsa773fkffajolip9hfzvc3qosyr5yau23gbfyfip358zegh7lkw65pehhdxyx9ccq9xhudssm2xzqjbks59cngqt8az3oqgpfkn7qlg7y7unl7c3se5p9oo50k1l88ss2',
                description: '79veqwtk35yurp44i2p3cfri4tkgmptlqmm5txspnprjbayj2l20b5o8woaid6c2dsmduwmv4blvekonth3tyh8yv3h5rv2hdzacv71dq0gqqg3zob0cb3terpccub1wtluzz6y6r2fzluo8kwsygme3184fwemagkr200y2f6xsxl6brzkgahq8q0227vnvo3qkyok52mytpvt208yrpmakr5w2i661qe5996duj4k2ce0fpwkqsjaj6zo92g0',
                application: 'yf9dh5vt4ija767u9bkiggqt261ghe54t89nioxcah8wzfp5bjikrgqruqgb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'xmmpjde3xwyv6f5wvqjtwm2wfdepf79u9pc5z00yemox0ovhob',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'z090eig0z9lh88z3t6q0',
                version: 'e6mlyljn0fl6ostdjw8m',
                scenario: '2hyxv4wj0vkvfd0qv3u7ruyfagk2c2sshaodlz7ixart8n2gswrif5ajcute',
                party: '1yyfbt6mjmxurdsynhqotq7uy53ur5s792zpbsq3wx1v239cuibvdtfxpqa090omea3w5838ixsd7zlbfx0iu6ivwj957azicsk8squ0ucrgeqqk7fo0m99f6naz4wsn5znpm4nzgdy3m66680hhp6wu2q8da249',
                component: null,
                interfaceName: 'lwowcg9kqr4t3044zgr6qo0ksncm3ga9ymbhqhyqrrmtusdy6mdacncs424qjzs2wap6n5mrn8ub6j9d77uswfv2tnvs57bvdkao3ssdl5hhdhmjkfwb0uj0wtb13ldtpp5zgamk6vubwfytx965grdh8q25rexp',
                interfaceNamespace: '5zfvic4n5uisln3fdsdw6ie3v0rjihgbcbo02g81pif2mnitrpm8iz8xaq610t5o0fuunhh35t61qi2ih6xu291acwlwknd8klm1if69mxgca0pnfm8vcq602krwsg1bs8vc2okzv76prsdr7p046acr15sn9bgw',
                iflowName: 'sgzi31mi7s9cm48okk059670sj1cbn5zbe0x7eom6rnbkjf6wx37trdqgfam6455tuqp09h41zrtpv0um29501xjf3k1js1e0qnw5cdxdawyqnz40rjz4c453z7j63l5cu9hr2voezkya8hnsccnkwo9unuwjwj1',
                responsibleUserAccount: '80jll2tv0bckvixuiz3v',
                lastChangeUserAccount: 'jsx6qxk17zva5wmw49o1',
                lastChangedAt: '2020-07-27 14:32:42',
                folderPath: 'c0w2kiqlbbl7ou07sn9eok9802s72l6qejrms16vs6lmeh31ca6583eje0i2vvrxur3b597rjk0lhiqxlnnenx298tmrewlzsozsl5twwkovetjx7lhcazl3l8m3wdhvlk2sk515zb8f7ijktwpq04cufzzwqnm62uhya38uqfuldqjb81rnaro7temut79n9mybf2xq5oravbokds5ak358na4c524l94nnuzbp2bg1zabxhr8kfon469rkxps',
                description: '9p4l8r92mmv70hcfwus1akrfyq8gxrkep35pdb16reqwhktbkrdwd3738hu9yz2id1gw6j4267bz8ui2hu71f01tib4892i47ec2zbmced835yixpun9ecyes7nru11ilb5yym6x24dhy6fv77a2vhwf8ev5fwnoln3alrr9n2ocbodtl81a6ql8zx2hda7ai601guhhj1jrczrjpg2am0ccievvkkwv9rivm75rs3tsf7a7k1jsn1pr6sadbpj',
                application: 'i8h9e3a08efr82c3niv144rh1mjkazmk0byah13qo8xmdttdclrrxl4591xs',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '8ivzb0n4sqdcxs0y67cug61iw3gl2ztk1ob9awx5rintpp9rrs',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'drrv2t5ijfhvcie21fdc',
                version: 'd9x663cio2wlfkstezab',
                scenario: '3qjittibbelff9lt8s54ep2czqkb4yxdfkqd4ypqpxfhxevtvfselram5qbb',
                party: 'fl3lvnejspeh6gjx1wcmp7fyoroqm1e3m43qzzkm1nk5z3tyewhbd7ldj70io7ry1x4tp50lxoqvuambvtl8ntqldq1jxfou61qzpdwp1xgoju576cbkj7ia0kan2bn6wgw1bz7ycuy07w36tcw30q4mx0dboux5',
                
                interfaceName: 'gj7hhc099hnyrtkd9ga6x2ts8id0pyyqun8gr8ln077hol36z7eq94y0iuuq825955p7z9odxw1ccytp0o556gx4407z14tohxvq8ljdub7upgs7660745efu2m86gdg5iq89skz5u207jp3gx02gtwmr6fy5e6w',
                interfaceNamespace: 'r6oo5d0mp9v2t1kfwx0o0z014ri1z727clwk5xvab0b7pkanywugevcn2zd8zoob1lr4pab9hkw9owqf0r1f5brehnonix1t2pu2n67c7fpkiylhqdtbbblogoxfyqwabjvruy6oep2ztt3dweyxnr6z1oo0hm5d',
                iflowName: 'cgwdh8vc7qn3ie0ex1qpttw6j790zr594kfatqs2n7chpdiym24bb7p95irduqrcdqk1ip8dfju3hbo99q1o0arl7akm2akqleau366vs8xae7l3uuxykgdeztp7h0v9mh73ltaumddzwzjc8qy5jzl3b99n6mkv',
                responsibleUserAccount: 'hpw84eo6lh5d3n65z7e0',
                lastChangeUserAccount: 'p1tz7cvnmezgc21k6i0y',
                lastChangedAt: '2020-07-27 04:37:26',
                folderPath: 'ngprqicck3q2o1y2psqo4pnbs5w7bvgphcl9a4gy72lgiw9dl47z47hgml75a80msrvs2owcr8tl9wf1h24n999nmtkx36nenu3preum294rodax17eejeui8cx04ckwtfl28xlvulhbkqog9ohux67roy3nhyu0jkr5raduakueihq9cblcd48m713hjm9sarpled0hc6ry42rng8xrbmxs7qbnlko2pqtorft6xqfydkwlkuxkbniukmu5s6a',
                description: 'gxwsnh1hcqbi6zvwc7765ur9h24zwhvdbq8932jhm9yei2b4vb0cex06p6fmeqrjtavy3b2rqm7terplx1bpu15c3dc0ojp1ycl7fk3qm5bgtxt2gjf6516tyyrl8vx58yzj471vnw9d0urcy06y10n2lxf62hcs8rffqesd8f0vcecnk3yjs7l4t4whhaxjkk6dey11oj0xr7n0t9lkwye8vcnlxynql6yo0f4rja9l0hx0uh1f0j6mzd3rwvx',
                application: 'zb5p2ixahsyhvdheduf552105atiisxe8bawix16r0geqx2iduwd0cm44kyp',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '31qoh4x2gnruh5vj170d45xzuswzys4ja3oua44xfb187l57ar',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '2xgx1eqc4mysmgs9rbun',
                version: '13fw8sjt8fddr462eoxp',
                scenario: 'e5kjwkvckmgtmwm5r3immu5syo4fdencxmvpmit92zc7garqq6v2efb6oqnl',
                party: '7rz26sm32pi4igqsvb3709vhx5ik681of8ahv761ip89wvj1s60j267zhiqe1vnj4dhwz1fzrrx2z03g3jq0pbb73ek1e26ikvgzyhh28m4c4k4ct4xeeq2xaux7oosbtk9f7qdrcq8qbgd4ry4c16qkleolnmle',
                component: 'ntxzkskeb812qql9chn81l2tab93vqgdcwq0gqxnx25a4jebu6yuphzdphwjqdv5d4wsx20uvnyw0v30zbt1avwj3kfkq95a2ubwfpp75dwwigrziq2o2g85qi8phogqddam9f1ei6lsi5zd8ra6762wtaxwenwj',
                interfaceName: null,
                interfaceNamespace: 'ogs691g3maoq47dmpf0w6oy0ri6gz4ewnbnjvt7yhv3jjumvjxcuzsdcqrmaloos7ldxk85bdym71x6ctortu10ykon6s03wb1gks8bh4ml5nqzkrn6f0p2wwyun1sqfauuw1ksy60ty0thjs5jc7od57vmapyn9',
                iflowName: 'vc49fq226g2l34v3wdxc2ix1iaojvbs7npatywkbjyt9zu3q0e472kgqryejsocxwcj3xakbatq4vx3f5wu7v6n03ld65ajm4y6urliqgxa5a244ifdwowcnlk4tejrmm6z10nkmyx0zxfe6r8r2a9xwj0abjidi',
                responsibleUserAccount: 's6ie0rte3wzafzupsumq',
                lastChangeUserAccount: 'utm9wl6do569tk3mwib9',
                lastChangedAt: '2020-07-26 20:40:29',
                folderPath: 'nt1rgrp6lktsj65qo31h4lpknk11m5ov6abq8k9f8oilq9kguaqvu9z0r29kcp1bs4rqmh4c91vobwelfb8ups4xwkufu7bmzmpmc7to3h6mpsswyosi1vksxkbkonr0jmv5ye2zy72vdbjgs425w4qo5ygbih8wsdz42y2asi474mj1bayu0sv3b8wc1yu02f4m20l0dndpx1u30gjfyc1tm2g5ki88nsaxgl9ke8hol3j5fuo5cy1kuq9bwat',
                description: 'tfncmeht8qqcchvj5t1gfy9lqd0qkqssf6387s78jcf795ykznm2uac0lkdrmi9jnr8kh58nqk3jiqbdseyscoqtix9jkhrbxsh07h55n563hblyhabrcvn0zn12uaseta761pz4sw9ukcynp0sb6gevdlf95w728pvy71izqk4brelkeji914zxpuahdexsb504cgfv6w6kmc91u462noht7uae3wzwbb1w36cbp5g7j2wz500bap2iafgk78w',
                application: 'a32yhq0wz66tncwtx9ywwuynn7k7l527sh19zsxkbcb3v28uubflwcyd530q',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'qc6m0xeuuquiaxxkkgiqikt1251d9ykgw71uvll2zo026w47t3',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'mh2t3j1hmhbj2gy4uyy1',
                version: 'sfagof7mstmoi8njnhsl',
                scenario: 'gjvrdxhm4sbm33eyhu3bcpjvvkxxznmcori40ez1hx6hqykaz6gws4olzsct',
                party: '7hk6cqfqbuanpneycr1unvjulr2hj4otcki6xcgp33uy5emxukjbgsgtec5v12d7wqi0v5euv8rwtqws6m6pnlyadbrm1ny2cqxs5x6u7lfo49nsq7gy4xlseu20hg0d200eaa9loegeq1vrfgoeieswtroaig8z',
                component: '7nfhk4lyhxphk09m0089kdei67qwirxzg09g5nw4m7vv5cv416w4qvcib5syjphl1beveax1sa86x1z1yoycfgornxeqc2662wttscmluap0x6wvkyexpj83vgrgyc9evto1lm990wpweaxgqi7c7gdxy2a0yvz4',
                
                interfaceNamespace: 'lzjjjg70n2i4wyylaod63o70dl9eqeyxapkp8kgszjdzqctm5y6nuxuhsl1xmmoluja7q3cz9cm4q3gn7stga9uzvqqqviyb17tj9as3tgqnxar81wao3yg1q4adq2bugt90xy9rz08o1xs32n9i0viqkdn4f63f',
                iflowName: 't6052hi8icciq8y9u48ljoxib7riniyie4neg060gr9ojjygk3yo9kcqblxhfpvbokpjxg79nb74yejhrtc2m86galfs1yscvmtoybp502ms346fyhbknzwicfrgygygvtqpmap13azvc4ltrlsas65s4nnisoo7',
                responsibleUserAccount: 'o1ox2v1q5zte0pckqfzv',
                lastChangeUserAccount: 'v1chvzacd4yobng7coqi',
                lastChangedAt: '2020-07-27 07:22:11',
                folderPath: '99dkkyqr7dly16fxdd0nb8avvr5eyr9plw85pkakqwutfyxsyy02ki3m3xnk9uea6a1vh4770620zq88mdvktp0m13whnm676ukj2eozfj797d5k2jqwfu02ccw84ygb1wn86ws85tpkwdrkjyl7kuxk9u51kl2gihfoxjr3ynpabmjuoycjgneiormprj2slt27xdp998r6b1raelt7xnl2nr9qemivi7esduvhjz00umcsal8uwe78bwotzmc',
                description: 'xbu0urkdpu80fqizb9m2yo1771lqwn9lw5nj238dbxkdx7qf0sqvf97xfr6s6zqwuclb5jqunbkc7jmvyed2bjup8gbyeyu2950305kxucbdif3gkj4dhaif1ajybv7508df6tzpchnnca1kflrcyx9ov1xerzlyvpx28ksijqqzltgm6bfew5lqg6pbd2sus1ikqzvfk0v7jygc6pw7vs0u8chj6gk4s2cu5t1kgpqqb8lomwesb6rvvaoisif',
                application: '3a8alk7au8n12f7uy2742oqe6u3v5qzgbfi4313fkp0wl300ijsu9gr0ulj6',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'vowr2t9zzog7drsid42md7ik6tyxy4efxnr3o67j3dbbjzijl0',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'mdt73czxwoq1ou4g8hhq',
                version: 'c7p25fysqamd1gy5ijt6',
                scenario: 'cjwlklo4zoidwtc2pkjirxpndiqfz5dztirbr1ai46mej9thwpc5ycbkfoua',
                party: 'oleewpu8d182uevilyga3smprrxqiid39yij4589g2uspn72ffnzs60q28ppmp9h5xdcv2a9jubepzwk0hubxr6516z76t5h3ibjz954k8fiami89pzez9ihwn7h2ut7nxkjtygjq2k8jb1z6zm8wguat94foa6i',
                component: '6t1r9cgy242uqj52sh6vh6d9enep09wjtlm2fk0tv4slwdgtya764nkkiolzp1sxvtvirr5mmw6zywejussc5hjy5z4eyx1lily7yibv7p6e8dyil08k0vt4qj8210nfclkp02qgzrsmtwa2xxhg499xiyqoihon',
                interfaceName: '0swf59exhft9izjpu1sdxw0lqghy4nfwnael9c9x3l4iobwzv7zopfpl49x5p0q1iplsq8lvltg1fo1vspqdmgefkcke35khn5msjljovhgozt0k6j4uu0yjgz0fe8pa9hgc36zggjgihnxd2d2fgtyixf43nc4p',
                interfaceNamespace: null,
                iflowName: 'mhgkefmxhgt0z0lu3orj33nb9ahc7h6suagu4289di90otkx4ux6te0p27jrrh85ozveq90gxvr6h4saxnraqj9p4gk4gmfnxn1jtvpia0pox2nyjb01cu4i4dlcw8ae44vestucamfuuolxfs5bp9i4til7faxo',
                responsibleUserAccount: '3f8ss8pkrkxhanoejoip',
                lastChangeUserAccount: 'bvnv8qtt1bibbz4b7du7',
                lastChangedAt: '2020-07-27 09:16:11',
                folderPath: 'ox4la6ffmhp7jcy8mtyv643z2q6nb2uyvh2g41keumf9eygxc6r63hyms0xcpcyfpoagfxjevhg35tu489fvuwb2kzm8rtft3rmg04vk15zq99w1cj4y3ez1mjjtygus81shnd9vce5se7371p5i2iy5nmhv9ampzx7ormwswi4qa47sz2emr1xv90ls25b9hylheinucnz5b5pik4ci3tew8vhel2wlkav5szot65ccx2r927jaya32017n0ch',
                description: 'c73nouihuuq13yx30mcoz0aazoq1p4yfjcigi94813weiyvfo74v9uh0m8h9qiizcjkx43eymy6op79lxvhvzd9ktq7c86vijlwbg957za072532ico3s6samkgsxc0xs5arqk097tltvvatvexispqiuufrp1wgx74wnsx70e08vuggd059dh4boawghq4570x4zydo2kecoppf65a98ruzpgeroujtpi3g490pb95026wv8z34ykzlbdnpsr3',
                application: 'gmowp5m6c4vu34ade64uj08cmbv4uawv9795g7nkbjvo79ozefzjiq323a9o',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'pase3whomxwo7eu2irvchsrrvup1dv8lpp8ikofw1yzozk9xeu',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'w34r0pk4iru2w2rul3b0',
                version: 'l9cf7dlsg52aaw5rphi7',
                scenario: 'z8k7t4hmvmmn4br8nz2hvpy1o5qbnq8caqt9usmy136y615p0q4ppyjzbluw',
                party: 'igooesgti87fo9xu6bc6muw9ze06ho3epoms6inaqz4ph0icwa3xruvl1waavyw0obji5i8sxxna8srhlhkyk89xs2e17b7o2mqcfornn05q51k5d6vxn6b7l2kncy5zobkj19xshzqeortx5hhc3xe8nce33l0v',
                component: 'xnpntjzw4j3p8ptztztdaeuqsjjp64j8w0w1ho1dryu2ki4sq9ry6wqsajxb81ap6z6v3ga7jref0wro14i5x7qk66i69wjr6f5rbzz25qeod8c26b4d8z3zpjm289nci8vj7ey7blc7hhnx42ye4g27akbl0gmn',
                interfaceName: 'gq3uuu22ta3icsnkqudxoyfp4mpkx3uk24qptxpg3cj0b1hiz4gv7sak36vp1qvve6acya871doyx2sy7heoddpwgg3jwfftbkp64343vwcy075mw9s5cnwzwwwg334ig4wfgewclk65jyccyuzkzu7q92as0vh5',
                
                iflowName: 'k08pq7cxcnmsa8hnn359em57a11e8htu0iw9p6squcgs2gw3qa2pfj64lr2ihkajgbsvxc08h8modm7ru3mnjefdz83a4pyd8y5nwpvy7xoparhk4ci94kuk5q7oi2tmez1ffmord04yov72zl3f01284ttwqf2r',
                responsibleUserAccount: 'ed1zbi26y5340c7u2pop',
                lastChangeUserAccount: '5gs35c1x56wfcv2tj9rv',
                lastChangedAt: '2020-07-27 02:38:15',
                folderPath: '5xlnsx00b818n38hfw6vowgf5x2gdj1cj5ly60q1enyxa77n6rpntxxahoeppdwziilkkzcmxwj3u9ix1027jp2yxpe6wcpf7gfoxbtqnc72m9ya11bpb9fyxlpej1m9yyypc5i91eaku8tuuhspru4uhstgt07mkehwg5wbrqzsausml8zgo4j6qgzeqc3hpcx4ezgcmjqoacu4m7jo6c7xx0scd2tkicu42t0vujjld7liwqt4wslyyi897u2',
                description: 'q5jde22qj01dwegi2cr2j5hv0w3ex0wo35mufnp3donbrshd0f4355g97m8mgbtwd85ayfm2sq19zp4ayrvbn1quzvwbv3ofansyo1a2blruiw4i2yy7mgq21gmhta4sto8btty1oielubtqk1yx5g466aufw27vr1to8t7gs8ug4p6qxuwd5kghhrgqba14612yk1y4ayw2e5hq3gx15vjcwv03pk5x2w9thf0xf471rbrqbfikl8s5yvh297d',
                application: 'lrbmagybzb9iowds1o85dxnu515csmlflb8ykzwviop0nzcm4lcs8awf3rmq',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'h6yuwdozponeljaz5dgqfhzynjtbubs7a2m1rprqzkayuh9jus',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '1w58bd9dxyicp547uadt',
                version: 'vascyv2sp579fpwgx655',
                scenario: 'keru0o5ytbjrsad1yest0mtryc3iuvsln1f40n7c36e9f3fhj61n0hcl4t5c',
                party: '1riyjli9u9dsre77rr8ista4nvkikolx4coyzpdbpekxid409o8axp35jsgvslfeghwch2zj8r46swv57c7flwarm526omd1i8iflsk6129mtn3ztdvydk7u5bkbuxfjrvgfxfiw82metzrat4h3cc2zhi51pwqz',
                component: 'uqvueum3k2gnttf61hwqf9pelj1ul5tzm5b3otjnvk6ggjphywg5aw1zj1z2ygedw0ipdtpihixji2wnjzp32p7f3hququpgne26jeonhbt1mjpfjo6uzswjpulzmis2468iln10b6j3b683vsvnogu7d567e1e7',
                interfaceName: '6xqb5r5ad4qiwszr0k1bii8ufh8lqwja5pjoqeu2unjolj0qikgs6cbm085v20dm101lniy8mm0u0e7plh2tp328jb4gf06fd6ijs6jfp9mubqio7gmd96kl2f6blbsyq7hfvloibs82nifwspra3gw5m64efrbn',
                interfaceNamespace: 'nazr7fuk2pa17t9noerxic1171o18bd2swh9llroyuy9ie84e82u84cnfdbnfk5rm77xsyhv3qdzl99ni7pyb6chtmcq1i7hg1sumz6gbkug8cfa01zi0rgsbslxxoj8mqs7f52btj258xh9uuhjruomiojqgy4n',
                iflowName: 'noe9u9hwskz8irxiiau5hkk9u5ygwvlk5szagjlefaantwmbhpyqierj4xokivvo5u3r7d6bid39t8pchm2c27j5tigj7gt1bdd7jpv24ez87v8908qar36gty719akexu1ug5y0a8bx6ts2ity9kanzglwffgd6',
                responsibleUserAccount: 'svyhe236v6zqhvec7uby',
                lastChangeUserAccount: 'te8197hrosjwwq9p9w6g',
                lastChangedAt: '2020-07-27 12:38:07',
                folderPath: '3hh32wt1pbaf3u5e2agtchbl9ltdb3iswjbykcyt3q82fa17itfnom2ewga92fiv1820kycoyc3hi9ujtsoqibv1q2ulwkdgjq0da9l91ql109e2rrjw3ruhsmggpkdhzrg98y67foj9bz387a1bptea5kkh14e9d9lccu05uckkw2r5mnako7n9pqbrxmuf0iyzqy49uabub92j43tyevqpvml1uprqzqrjam6owfu4ow1j7urwl8rhgo09nfe',
                description: '0gzkfzocjoo2bfy1rtr1kimv95zbz1t2wbqpd5j1fhy11smhphey5k4d5po0s381cwq9ygkqj1bywac0gdfa6gblqrt2a3pg4xeia917ud1ea9lzf5v205vmjnmakf4581ek3qab8o25a1kdi7cws1rvy0m7knixs2kdzp81zpcrl82b11v788jivmv0dkg25jeq6xgt181x18i8461hr50v9wzr38qtxjhm413fom7iax9s3t4k5022hw29qu4',
                application: 'nkmfrcub1jj4qf5jmjcebqzwiequwr9i5tfgf2fug96trhsbyzow6hmjdl10',
                isCritical: null,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'dm3n0kcbzzgaxedrgfncu0xy634ybu7lmzrwe1tm46z82kke1m',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '1oewr9u8tp9eiqvd70rh',
                version: 'lmbz4if978u3g46d76jy',
                scenario: '71v65y7kotvropwdjmbybvrof2k7am1193rt0y9berkv89h5xarcg0oom853',
                party: '1z3tvda2onarv41anihjx6xrymovcyy0t8zb9czm3or2t0dmv9txb4e08oy6nf7pletuvwh5sz3weydgj29uxoq0aevmz7z94hem8xcxe7z6omxilsvn64q86pu2dxzijt6n2mhw2raa5b6zquxhqmhvbat98tmn',
                component: '8iaz8xg9s63m85p5xvisvbxa097he9y1icwxt6h6nh1jysgwp1usqzwzuj7r8rep1whc87eyjogvc2xwkzy2hobjrsr2h89c6dlniql4eceuvvt4inhc6rm1ct5lktlpc13jvzq2hddfltcws2qdw4eyi9sbtz9g',
                interfaceName: 'tdtcrsddp7wdl9z3i70bw1c4cz62gs9lweg7q2fvg2amnqpprypouhkl2m7y4smlj2is7fetb9haeabingl883427k0omo1qtm4j1yjkmeg3jpcw70d1prw2fnw7k87qnn7bx7x0hwjb6vkxl6kd0byzqqed16om',
                interfaceNamespace: 'vk68kwc2jvd825y8zaan3z9zin0tquiy1tzgtiqiva70kb7rbn87zqvs0d9nbhasoeei8wg4w8a99vb2zm8cn9elkn3pdicnf1wf3me2mu9rpdubro34jop4sdnrwuvsqedju2lbxd6ri6oc4kgbcdjbfne5pw5f',
                iflowName: 'aezs1zwhiug9o6k4yef37dbja5jc4cx4xjgw6h41e46s0w2lrff7hyelvscj71b236kr4udx5blkwfwlf7j8eetm1dgx3tjw4o1am2qcgtd4abdsiy844snh6qw9vk9rkf123g2p1drbop4vct25tswzf31hk7o9',
                responsibleUserAccount: 'tcbcqy00pqvww1cdxnl8',
                lastChangeUserAccount: 'i55aooahkib3jpnfky20',
                lastChangedAt: '2020-07-27 17:18:33',
                folderPath: 'o9c3lr80ghm7ngyh46ar60otdmbmqljb61ciw15wnmm9c0q6nxogqpq3rbmvc0b5nx7azskb5m9f4ft94ltysytuxunvsr682lsf0xs7x5axky0uee4ms0xqkmc7bpajegt1pgsdxd9nlr2pyaoe726ika3bj7w81t54pxc1ut6ix9azv0336svam4fy6uo52f6sfo1wcv4zrotxtd6mkf75ikz76jpw8rxo5bt43atxeyv7svo96fgepojhdj6',
                description: 'actoyrmbw99q8ukfx2cxptawb4hp1psc0x3dwagmuhyv5slvpmqtyhouv5z5c1h54rljudnj1voomh4d5ehvtb9d3e9snx8o623cxe1rk754joiu0k2qekjjjkkzxxnos9ebwii0r4f419rfihcssmlvg14aj3vu6x2qqnxmouut3ouc7qgknbgx1pxp3qvxd5g2vqx5exouiwybihf5c9r6q7vecixkzf8fbhljk5qw64uljrkzf3pwc9e9b0z',
                application: 'r8mudwiqyd52nvu8cyqk5udyp5opcnotz62ap1tx5hctrvwdrsk0gesw4lt2',
                
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '0gxdh1vmlqty7y71pxallzeian1wfl5f9n2pwaucerssld1g2a',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '8fndjfw1c3cr5f188h7d',
                version: '3nb5rnjoa6x0p71ovkpl',
                scenario: 'tzinqtho2jq2denzl9gd9a483mlsbip4edvhatstdj1tz2caji8938bmi46a',
                party: 'vru7efpv8m01cm3nj2ftc8u5ztswu1inofa90w3il7011qozbuirhfxv4hmsrb91nhwz3221g8sshnyzwb59zpby34ybzkuzh1p7yoky9xbkd9cor0epjpyhd8st3myww9x2w3pfhxf0dgjriey61mt13qi2nkht',
                component: 'c37cbuk7o9bzpdvnjznkt05e6e58inp0ooto4pwi19ys8cbsd7ydlz5en4y5ev8n4rqcr8fecfwsj2isn9y2o9xzfldz168r4kqvsnx0qmjwfcdpzq6s7ajz9xar4li19uv9prs1r4xco93e8r2irii23uuxg9tr',
                interfaceName: 'z5adz4cfp586h0o8flwi086npwabam345f5g7qabr7y88il19nwcvwfcxy8jfaztsmwqqlae820br26j1b2q7ospt3cndklkw9exld34kfoutde9cksnj25rhfuesr4cege10x5a3gcznxsgslc8yoo2zz0d9gvf',
                interfaceNamespace: 'fw7ccxculrtoutt3qzcrt6gxzpe8anomfqe1j7qir7bhq6gmabn3fjct7vavex73e3vlfb49n7k3m4viy9pi0bw81g4gn79ulfjcxmurf7vyubcbd3s8no22qw2hqmdlmqo1f4e0vc7rrjlbeqpidrzesw7be77n',
                iflowName: 'c0h9cpcjidyzb22hhh5xvgf416eoo2lduobtqkwqgjnp727j5s08mkem32iqbf5hg4qlciqki968etg5u8fzc957onhg7c6dw05ryijnb41506s6v66ma7qh8wt4frrjxv99fxxuhohqsp32qln9bs7158wmvgxz',
                responsibleUserAccount: 'e74ckxt6m8c5iugcdxmy',
                lastChangeUserAccount: 'u6zdim9d8kbypbn6kuto',
                lastChangedAt: '2020-07-27 14:01:53',
                folderPath: '096qgq6u5q2une0f2slvtunvdq3ysjb3cmvscq2vdhtrmb9cnb43tqkkctisj384s01cfsvjuyelounzi1io1ardkjkx0pafd52mygn8d7cdk2p77pmcw28ryh8weshvvp5aelqg3kmsp173w23pzifwyf551gewpfqvzmnbcms798aoh2n3in71un4v1j8yrexy0loipi2b8guxhuko4at1depbf4x8mgf2k3tjavyhdbg7byuh22o4e6wd18f',
                description: 'i17llejy6a36id233l0ebzfl17zyaq3n6v8autrrbw2xychjr4854de7cft8xcjc11u5abt15xci7hb3yfb9i1vw88i5wu8hnrj3vndny3hcg3zg7yg236szrc4d86u57m7s0b5glx5pcptkkyx8bhv7udmrmklqi1nmhvbabprwi7mwca72u4kjkdmhm480d8p3h3o6n1z8yvtnfx98modlc93d6yla0sjpom5awmu5avjecisfcq1kl253gog',
                application: 'ajrhze1tb28m9uxe779qbka6bap1rh5abptkbet2zenkd99lf2z3oo11r0dd',
                isCritical: false,
                isComplex: null,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'ib8oge1d6qr4n2jff7zs5h9qgl2uwj842z7kiu4bbw4h2evpfz',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'qqbig45a53hr7e2bicnv',
                version: '47qcqi9ha9ko2wz2f3ap',
                scenario: '4d5z9a65wpgamkqq5ot4uo6ezn4hw2mtds0ps5bmcnoiovqy8baqqkf8f5ou',
                party: '11l6z2wp6evyq3d0fevhxjzfdqvaijp3hyydw0w98lkkayj93v277hklpctpfg37yv57zhci0p5pfr6z3c2uaqsuwrusuxs8uinc8j6m6xav7kyr80s5alajo22pgfq5me68mcqlobvrfvrbisc0vcmtg45abfes',
                component: 'hc4jsfch0luxmord992a51as634ppoy3k4bqvyywvpt16hhvh9gup4udl211xk56uaddfxh0cqormql1mwz2zhkrrlth5q9hwxgert39m596lkmwcxkn5q1acndxxsfjvw2pnunskd2tge0pbzofdfait8odfa9m',
                interfaceName: 'xkuqpaltup50vcxx53ricq5ffkdveys0wzbe5ko7x6ed04ez1gxxcqsixm891gdxmcl7o5a3wqkk4261vb5vovg5le1etxce4bs9etehdt5givbnrrsj70b2f7kq7dap5ptkjxtt6bwcuaaqa04382cpn2clu49w',
                interfaceNamespace: 'uijdqpf5qzmuesv6xry068mk2xj5dode37crkfiw8idyiappxfy7ye7p6bvbrnmvrk2773dhohy4isdbuytjtvaxb6pnma3x7vw8ogg1iezs8qcc9pq4bbl1brjfoqnfk9cyigbpn50r1ta37qkd0sjxes8ocjue',
                iflowName: 'sxbmzx63xcj0vuf73q1id3rgb0mccocyqpumj22739ktv2qhdcltotde77npy1rf6aikta2ykz4sy9puwfj22xnnl3f7no39qmh7kclfwpcs1q6ekqru2yby4oyimfjy4v388mq2ljnn4gr87ned03s60kmfr4l7',
                responsibleUserAccount: 'ad582bbq4whua7psjrhk',
                lastChangeUserAccount: 'b68lpcw7uplcqwcukvhb',
                lastChangedAt: '2020-07-27 12:33:36',
                folderPath: 'd05ds89on24k01ch6w6ji768d1d8lvfcxe8iy65jiiwecpx1mae1vpmae08r7p79dz1uok6evtfocmxf9j5p84ga4elzf0qyaz1h4hkoal7h4pwntcwahbuqr5037efs9ea0dpjpb1ndshisfh0rujj3pzvk9ydjjhxxl4urq7mz7qo7rd3ytix4os5n14ngdg933kb8iewy8fmdt9t3jug0hkf07d2rarqa0sxnhwf0gjl9015nlsv4fcxxk4r',
                description: 'e71n3397sy2wdp5r9sa6p0c2dcm2nkqj7mzg8lwxya49kcwz7f06n4bde8nifiufz4drolminwda9rfjh59ur8ivls43idpi1sq0olymucle6eq3ke67fk5rae9imbwuttndqj2y02v9ldvhasneo6s3k5hoyht22kpvi9avzoera8wvwooxxy3ok652zl4imzrvh6tirywesb0kkh38h4s4my262jo5jjd1lnya7ituf5hlki7iakrdjd5wqj6',
                application: 'hjc87sl2na4ivmay9ipw771rwy1kay0h7qw5iblchwjr7xei2p6ybxf8qa00',
                isCritical: false,
                
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'izfulvukvliw4us3e8l87qew5f2famctd8aly',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '4fyp7zbv3kor6270xkbrle8vbets163owfqfvw74cojvhfd4su',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'byqzczf222593hhhw6ri',
                version: 'f8yoz1sypmzvvk0ryezg',
                scenario: 'u13z7vzu8mmx5dzbkpxjnfds3ewp1k9j7vpbbacg29iaqncrjhvphjx9ceu8',
                party: '79ihugcewi7zv0o1bls7n3z8x4teooq3273d20tq723qvw4qzbo063tj9mj5n6obz9s9c9dsci9pymrh2jmz3iq2mvva27nuwwb5rtnn806aq3kbxwfz0pn4uijm0vldpbvs10smajrs5pw24qlngs1oq74i1oat',
                component: '5xy9cdn02505maad0oadl4ai46fjjb2zab1u219nsiwy7dqul73ps79kx1y7ijr6s07kw5eaaqii6qzgywnw6f929a7fowpgg8fk5rdn5trpv075s6nhrt5cok4j0a97z6pxto702o9ay2bmus0wth1ilqw3577d',
                interfaceName: '94atya015knynyke1x3uamaueufbk6w814ikxz12ii6k5zdhov2sqydg3fl2yu2p4onee7m8y9mbmrhme04my6qrm8rkeursu13c86csuroczz7h3wrokresp73z1aip62lxhpm69avaslqhlvjmfonuer00m1gi',
                interfaceNamespace: 'preumhxxieuuzw692ynrs8a7nygqq1zwcu1vmochzp1k0oks2ytsm1stww7uq0v9g6h1uqp8tlj8ft7ehm31j9lh9virin6rwx3nwzn8thrxw9wbsqehufh1wtl8zlqu9estfpolprd4d31muab03shldepjgark',
                iflowName: 'k1g70zmw2uqz9opebx4u857fisxh1f1d5r2rnf5hyudxm055idq8f4nkhevpofkyd3o168t76jdww451af5f9lqzc2frfwrubul2rm1lz6ym62tan1lnaxrhv1ascxmj2op0qyuhraiouqmuw2wfgh48oy7tbacn',
                responsibleUserAccount: '7g23m5i5ziz5cntrrytp',
                lastChangeUserAccount: '384zr1tc00xh0vtlw03x',
                lastChangedAt: '2020-07-27 17:30:40',
                folderPath: '46ccgs47u8q2oy4t6w0h5m29ywwcmf22sysk1k0dzjum42lqljgcie836yiwt7poamt8po8tz6u7kftxwcas7eprgi1j70et3unf7vapnef234lralmtrhh2o3odrdves3lv2uyfevxd2rknh23mdmjspbg2qnl1dqplqlvgcmttz17ra5aqgfrw1b0iobjeq5vpltypcjxc86wku2jtr2b8mb7uxykqvgabtvznvhzh3vbgq4v3itxto92fskt',
                description: 'sftoxp6smut9hvmv1k2xryzym8jnxwtj7uj7yuxkjpls6vmkaymvqil3x5e4xbhaqgixofoz17f9tcthgeyy5knv873xe0muvx0ts8xa78wcp0o95d7dfuimwgsgbsj3gt8t8gtdxll6bzou66gvvr7crhnqf7err9o5b59wwzmkt9r4j70bz2hwq8sww37ydua5zl1v3bvyl1venxv8waklhklrwju3h468udfkij8rgpsek8l5z0pmf68pr3k',
                application: '1nff0vntbe91bjxew354hkwb14edfbxnosd1dn6l5ikrwwyy7d3zrjsr9zcl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '8rgo37kwpvc98twt77doan33x7k4xeovkig4j',
                tenantCode: 'z0572f7vxaq1iic4vinbgwb1zkpaf4b5dyvwz6u6qwo9nzmjyx',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '361jzeq3wrbai4tj9keu',
                version: 'oklgjmchbzeb5hrhfz99',
                scenario: '8a1sd8bruorv90vclj1xb39nm2jtk0dq6vvuojtvckf5foqq9h6xc8lcgke0',
                party: 'g8dnhtm31k34xd4kojru9ci31xahklilu4uq1rrzrzx5a9uaywzhrev25moqz81cpzqf7mx00kh9ekgemryq3bjn0ngbxbad1sktqovxuqctkkelz7lb9717x7yuqfn36aebiochzs28ilzfkcfk6c436ytt8656',
                component: 'hb5r71n3qgzoyi4kszsdemb7a38o006jx224a9m76nipf83w8a9vaw2bg10uahwjrdx37mkpe15e0pe7n6i68a7ehr5zh0z9paplqhgrddvll031fhh6dq0q9du7b3xsmx14o3g6tudvnocq9jt5heiodo81odnt',
                interfaceName: '3zk3wmz0x4bicel0mqwl4vql6xsxoioqhhrbi27wr6a1ngagq38c9r6naz69s0fej6f0v616i3r8kb3q9ftn9uj4v3j5dlb4pdyy0h6qd8v78twkwslbjmrtxhlpnttt2lekdq3nnlwtpkvcalm5dpro2novglv4',
                interfaceNamespace: 'yivrxil015p2ldzwkjmwrmg6enxsmgl5nv0iah98rjm06bh9a2bvalaffjley4f3qr6l6bkk3sfl72midrd7ynl90h0ragvur2atekxtn9w0ktcdf0o3ntmdbpcy8da657xluhrolnp8qpwvz047hw5cu9nzoti9',
                iflowName: '4yaae2kf4kin6ykc4vsypuczqn9m2hw5l2sy4l7172ew5w1c0k7be98e4xds6qtup71mzanbd05kcb273ge8m6uwb32d7eucuf532hnbvvcxz2uqlybjm4qp32f44jzfyiiiold31j3lt4tpohyz7kpr6efmp9ak',
                responsibleUserAccount: 'ygckzw5nltucvefosoqe',
                lastChangeUserAccount: 'nd2iztigvzrq587zfr0p',
                lastChangedAt: '2020-07-27 14:26:35',
                folderPath: '4lqdoyypzoce1ns1s9mkcuoj0lzo57b5ipwf0kcrqgow0jka1x4sp5i571h3hsh9ijtnjyk2w7y10af9q904id5rnc4wrx4fb35jvd7qucgayk63p8wdhpndt42jv7odtw8xnddx6bexh5xiz3s7mqug90b5ll59nan6w3j1dd2smlmf87d92tskho6kdk04s1fi0r7xi9ah0idgnkdkemvcji9mv1hlrapadmkie234h5t06v9sf90wohj3oey',
                description: 's7oxf1ds953lc08ti2t2cibulup940nrn8uqy981gry2zxlngkhmtpqnnw2c5cx0r2x2r0hw0u543b7jcr03oxbatydwx0wo329w6ssn6n5az63dipoxncp8n12bp2lad95uzh8cyqd04zelvcgu2i1xhtql8iouonq4o4b9assbjiwyca721hw9c6rbnea177lsq48cxve7u3iuutop6wirxklbpi417nzpb41140s385cboicx68fpdcnccsx',
                application: 'pilglzpml3idc833ysza6v0ujnl03d2bg5q0w5slox2o499099puax1e9ddz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'l1dtwd0a9mkiai0rw6b0nwmfxs4ybmyukkpe3t18uh3nn2ypt6',
                systemId: '769bsns9ie0f8muw9mbv8blc3jery29bxxbvz',
                systemName: 'clawcd7qwplc7823bi13',
                version: '3qxo7lrzs9bpxi4iwhdm',
                scenario: 'pbcek8x510w6cvjdzl4vck25lf8g1jw6orzpgf193gbcddpjqgw5m1qsh9i6',
                party: 'isgxfwcc8plqdnpjlk9c9f7c8x5guxrv3apb2584oi9o6zs1eb69j8dw0401numz3hulm11xdohvpqv8jqyu4cov9dmymm9kjvd908ta6bgsqhjadzhlxtv1v79guup0jlsmwg62pnaehn3qlfxjn0m4owmyn461',
                component: '7v3zsmjbdqs0wj2nzy2olnhy2txo8wnm8jd5hn6t402nle4u927arfhpx1jr49xmivit54r8iquxhwgqpb8bzqgnacnxtxt325ntodpvt8uy38mkvfx482xdmwt0njnokfrzbkgwi6lg5wn8wturhoybx1yb2fzx',
                interfaceName: '0d2xnes7hff05rfgwqlf3k7dgnuzit8vd9jqhxms05loi7ilysp4hg5z14zbd1m596gxeug9g0xz5jxuxdhw8g2jztbk8g1uyd1ukl7cunkoymrmu4yp3nkzzy69955lz260kn3z7tq8v4ncl7kvek7l34a5veug',
                interfaceNamespace: 'efldzwcav9jsa1he1wr90dfek5oq9lj7zqe4lji9q6b1gbh7rhisho4licz2lr3g0zfliqia6twfl9ik2gwjox9auaxdk2ypw2ipyg2s0g57c9wmyrffpe6nqzqnbhkw9qxjyr22a5sj86exrn4frqncvbugp5fm',
                iflowName: 'sie206hpdhm15qosts3a2ryga301ow1sm7gxwt0p0blzgfecfuv29zjcqsaz1pwe6cwsf3sq6ch2knocv9s1zkodlmd3fiuejl5p0gbhlm5z4ar62d5xqu4d8jpn60o2ssxdz7ms427qy9i2i2uaw6j8al3evthd',
                responsibleUserAccount: 'rzuv30fskvsmabxmk0yr',
                lastChangeUserAccount: 'kyzrwf4bdopuvk1529ck',
                lastChangedAt: '2020-07-27 15:08:15',
                folderPath: 'co44exltexj8p9zo5kxn4rao32eroal110ysk98vn98jvr626rptsjl7vq2y6hsirg3dta5td07gytyyg9nn7padtupodfvxkd4xn1mbfkbi6mkhfje5stvu5yxnfq3i3sfb9hg0nvx5ao8t5bk3e9ghlh5gitq4k3wwg02w6o46375mb6naovzj4q4gec0ywt97seon8oyd2jjs3b1xu61qh0r8do2py7bve3p2xptqxq4x60p3tejcxj9ljwm',
                description: 'qux5x4sr25xhm09weo9wf4d5wf5xgt5370s4w6rbcv26pj8n4me5gep8e7rv5psztut3eqg5tmxv3q7ppv0pv4epxq58xda3hcvwv2e0blg9a22yf585ai23pj7kzqmbufo3ok7whgf490nei72jbp1f84y90r91p1ftj86va1jex85syhvi27f2vkl4t0yr5aklpjs2me8cp3b5mycv2n78ochxmrlz2hgc4uk1px7ilv3rx3ivcneym1ltj50',
                application: 'qpxlbcxxxrgt2xhscvoyunuww1j9a5yud1pigk6c1695ue7nl8y8rnf1d740',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '1smgyu3rf37tcufe7gr0nukymd2qydnti4pbsk0pile8il1met',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'xn2768phwtj7207v5531',
                version: 'tty31ke8qduldxnx2vjs',
                scenario: 'nccd48y9ndzvc21cvuvvr109oad0c89jy1c6x8rkawjhkjizfadxo624tavh',
                party: 'tp613mwgcoegoxiqltnz6ld0mqtu7gwztvshydluek6n0jvpy9m9a4rg5apbh67t5o8mscl6stgc76olsrci457ocwa4nxzwsn286vxk4ofgwgluk6hro267p92ne2dtnq4eqrh04n47v00pjxkgr2q8o9wbsdp5',
                component: '1p2kyegdw8nyxylg1npau1bd3dqkcr9kjsh3qsibxk6blysbmy2etpenisbgso5sfccmbkfkss5cw95lbb5xgfwzbxeehg2mnab3jb43r9h5jjcdq8j0ail1cnp4xxpiaw4zywcpor6nowbbh7zotyegevzuih0w',
                interfaceName: 'dizrtr4vbjfm5qg7yevz7qt7lies42z737fzakj3asmjcjbe5gw48ey99bbjcww3cv9791pgylta5n7me2erfc0avycuvtuf16r0mtj7w5glz0wxk4gowyobreopu9isy0tagp91o57qguk4fwn2m29z9s7lcwrw',
                interfaceNamespace: '10kgcpljlk2yh1usp86spsvyo5h1o45xf67lq0e2n6q0qam6kyue83xpvrmd0qr7b5yc661knqzvd6f11yddhkwgo9l9pt7npqckv8xj3klcpnztgdu0sg6rx633my0ic1jhneia7mn1i14egtdn6an53k5t6rvz',
                iflowName: '2p4gdbqz7fn6lazh9mup7l8sbziuqflhqr5dawq53qyfmbnaz301r3xcq192fu34k8mnjq3qhooeei7yt4fbyjqzayonc0qje5d8ypud9a41pw7ngshhj1m8n4k78dwea96kv00de7yhzbp7cplzpj5l6nfsqsfr',
                responsibleUserAccount: 'xbaokrc8j056a20sm20l',
                lastChangeUserAccount: 'c7hyag2nirfh4acjaj35',
                lastChangedAt: '2020-07-27 02:22:09',
                folderPath: 'oyivqo0m91v61ase318rls2f1xvglz916lyh1xan59gbr30x8u60qpqpyv0ty4kv11u5jhwabj6x4htuh7ve7gcliuyksjqrpq7tl7vnw30xeqddvdueu1pla9o1h8rrnekk5tcg01e0lhq3ozn790veh8itw4zs2bd1fhdp54oem1wy1jh522fyya7sm5zsycf3oeoms9dpjvvzkg5b83c0qnz8xj39rsxnp1e9gyaq909za981tuhfhjcoehf',
                description: 'fgd42e414v2g0rfyp0lmwrzh8a148y2ol3pqpwxtmdfsz16v3r9xx16k1ey2pboybt88fl1s53mz4zn9h4sfwfcitkwd7hifw85w0v0iw6wn0z6bzz4hqejju8mvfbgm3xdri2lrbrr7l5br6lvdfwhm27hyaban24ivrtqvh96vasg1rkuw6mywei478dzq01xvo7njyctz7i29bi3fdhlboi4gvxkn62u9shqh83tlxn7lt3ba0w2d1day2kj',
                application: 'v2xcpqu3p3i3wcvlel3epj7950kztbm6szctesw6guic3phobarwdqd999ee',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '86mlv0205e0ui7bd84c03udur4dck04uscvfv',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'jh60c6leopu7dbrie3ea40fha3pt19l5vkrq0m246t2410rt85c',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '408cne5qprl8qhrk9nwo',
                version: 'hf8b1pi0bavnpawwkuoz',
                scenario: 'moiy9dzdf3y98eudw352w1tay7z2m5ayx2gmwer52gko6mjqi2w9t0itow3u',
                party: 'q0x02u7idcogl5zamjsxnl38l3klx44u5n5izsifv9dd7jfvsm9gktqh6jdrgxuu7tf2g86b38u979iyaw70hlkvzbxgcevxcq3tdn9pgevzhdhe99qq924z8n7rnmieulpde3nz8sc6r62bhfrmw7zbukuebzwd',
                component: '5fl8ri3xphoben7ugg6brhwmvjumk39f4x75ldiwd276ln2cxr5h01v5ic3izprilhlb0jvh37hq924z1cddz0hs8cgvg77fc1s3xoytxtc0o1lpmqxa9ar3dqccxm7o4ijqz6pcoiv8pssxbxcihxfti9ehctdi',
                interfaceName: '9httkakt6qnnw9phbphjvri3jaqgsq72qyy2g9bdu5lr7599cd8mdxm64jhf35oy0eeewfiabu8k4vs6s90sa0ry1cauoqn4q9m60nzs5detr01d51dj8atu2r7oeurfh18l21ukg7qv6yj962uiwxcksxav2mk2',
                interfaceNamespace: 'dyeanpk5kf0c6wlronwgfaqck5usar8ce68y9poan43x96i6geext7bxwwwfbwzinr0aba5j3d27g2a6ebpsgcla77a2rhpd4spxbp2n9u0g40glga4cwvf2v1zhfb35yxjk2jzj61vx4k930xaid20qacw1gngu',
                iflowName: '3ma1nidpfenqscilowxists5ss11w7rix7ie6cqrggqywrxt6einjim2o6fdsyau76jr9ghjek01anainsbqrozmbpdmmm72w5y523p34439fc0lee2c3uhnpkn6py7km7k25fbhot0j2ncwmbzcq2ymim7ze5eg',
                responsibleUserAccount: '8ssnagwtaahjh7ild9w1',
                lastChangeUserAccount: 'mw76jedw39eyp9e7xy6s',
                lastChangedAt: '2020-07-27 15:16:02',
                folderPath: '2bd8wkx17oab5pfmumvjzdid36h7pyuh83u1qctlbie95f7c8qdaur92fxbb9ytwn5gqsk4zlw9l3a08gqpfwy00vqinbzs1atjzvwrfiordjh0cv3ivqsp5dl1aqvkcrtdly6wexbaoyr3wy4aa9sqd5bk2dezjh8rb1awfn858t2jcud1kgid0kii3wj7wu4s2imi63yio6e15664nshgat7zbkh5ym7acsjo6fqq4xfx2rhzasy2axwktn2p',
                description: 'vxvp43onsp91kyq1b5dg4xeih0urbvlk4wokcgfwcxtchhdtsr5oe2ewuslflwvn9sa7g6skibxi2p9nr3noqcgnp96e1nq961njlkrtcrw918w83g5udvpzskkxwc9z0u8mzbj1xk66bd65fzlulj75wml5m26zk4g4omxo09q8y3dynax3xdw8pik67ur1d5tm4hxua5f1jcl7c438y8nhhi8nq93gxgo42bn9kup4fqapq4yvth7hrvy3el5',
                application: 'y3loo1aj1lmtwr2efb4u08habz1iod3yn9vrvwah3bj9fniat1tib077muiy',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'vsr6okmbthvi9dhobr9lu6gk493b3k1h5c6kavvn8p0bvachud',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'eics8co3bm7zovt1bsea6',
                version: 'l2ga7tb9ps0fsuc7ztsx',
                scenario: 'bvh43zefhzbwnxq99guml3vbgrub86kkrcsnjmc0al94xzugmj23izvgnjqw',
                party: 'xgdczs40bdaswldnz9qo5plbvfqhf0r9k5s3a2mp1kkzxrpn00qey9u001ck0m4685466u5t9qpk1zkh656xy0xl2van1ht1z9fl62i4m7pjdop6b53wyh8mg8d66a70em6tsrgaqjw9q6lrqdrwwmy5nrt0kqc0',
                component: '70c1qg9quosfgvqw8ri8kadc22fizom5m7qitjeca8w7jfay0kfhy0s8q4aa2esispqbhjdfkm6q3ro9qepedt6ufjojkqzpsaqo6maa5xa30p5ducyqg6kgikfitd60kpidjyozd1fk3igwrbv78lvqww44s8l7',
                interfaceName: 'wd1gxmmc83396tdzunndmz69z01sx3rv2gtf9hxflcq4fhm97s0aocxgl3xhu6wv05297fkmmklzlke0gbe4zzusxavkqy1q17rwlrgfd60z0c704qmhte6lwjm4j90wpbbnn8a5egynh80i833z63nh2caygo94',
                interfaceNamespace: 'k57aqq5td12ysl2jbm86vy3ybm0g0ym5u0vvcd5ipsc4sbsvbwvzxjir2vsh28r49w3q07xmt6lr1d4w36ax7v075gb85wvogb0z88nbz0tzb0a74k1gzq066f5jul2j54vdwjnkmbl2hb5rpdnu7nunfyne61n3',
                iflowName: 'krp946ny7n096z5vzt9wzy041v987lowwoy7u6od3w24so3sjl8rhipnywggg7u6wx85nz04qljnxsn0clh91jswyliiywr1t640c6xrx3bvseaa75vcqgayiaf4qriua4u1ge00qji3qtyscycpuhpw5o3725ip',
                responsibleUserAccount: 'kriu3hqsoncavu9pc2cx',
                lastChangeUserAccount: '1tzb25jg0i51zl7xvlx0',
                lastChangedAt: '2020-07-26 22:18:40',
                folderPath: '0v2ld232457vsvzqv123nzojcixd38wpkybq1hn8tcchvy9iq6zrc31yya7mgaqoimibywnxym249u3nov5i8lze8j8ztfn9yu653abgyba4knm2i44n5s0c35lhu5q3ay00ri3o7zfrlapdlwvanccl8zjvq95d68zga17euekabjeizkynp7zmib3boktzhb01u1l6giyo0qk3lmbnq43z610w788w6t2rni3jqu004zflhckpzsyhco7op15',
                description: '05641q8kdk31lcjhy2ko05pu7acpfwe7fc2hqcpc3awtlw5b86nfhdfbs520ctd6i4c5r4nz77vgqkxd8monarfqriysnw6mpdrfke5p2j4r5in448cjbm97tltrs3sgsz7sew7zs5adzn4f5mcdvdp29nl8q5iafzmvh9x9ecx5s6v6dpeisqmi3ojdd1sd5q223eazsr7es89qjqfbegvb0jrkptoi8gvrtqi1pu40j4vkv4y5n3rs3l5hya4',
                application: 'mrzt3g8zgagunpkcc157188fpwwt08sn9zcfvhnaawgjflh9gvo5h6sgelvu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'me95c5f5gauofkhl38849w62pout89pue3gzp9i6vryuoi9gca',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'pctp1l1lp2ghnipsh6lg',
                version: 'xt0qluaxe56d2wko4twih',
                scenario: 'attz7ygkwvxgnttip7sru294ukhcw875tn0qr7bdl5qbbpvo5lizja61qiv4',
                party: '8sdyyfl761a2z7jlvvqc0lxztv5d44jcjk7zac8f8ndvhjnol6wp9usqbrqfy9g10qk369sndimtgwpwgsx4ri587m6xkqlukn8cbinudjtfyq4gy6pb859wo1tbprqjir6xbb82xqe7bolgzlalbmohx8ahmlve',
                component: 'xuzoj2owt2r2cs9ffam1ifho3a98m6t9tog6ht2py37mhcqogcaq1wq5vxdv25dr42wrzwxbb2ly46kq5hfpxi9y2zlc1au61sct5gfhg56txsv7ypx9w55pfu6fskchtwu8rdd2nr9x1m1j4tjswn5532aoi6cj',
                interfaceName: 'gm1zfopbvld83w8fnfy2r2j3hqdax5hok9zchj76d533ydd4t1ud5qvaud8agi622aifmoeo3hw4jjhe18k182y4nvm0p3zvjo4kv707fy0yftnxd14yko10306xyn6pb3uyuxys7ynmfvzu2b3izk0o9yyyfyee',
                interfaceNamespace: '56dxtr0nuokb9wvrmqge0l4z3i9qoz1x8608ndjrknpwy5dan5ygy1nmoxzsc9idxjl56lgoswuxyl0x68k5mb5bxyxe84sqx5tp6as7ax2uc86jxenkg4ejpi92xjns8hr4ky7pa49pa1fncauvs69fepsf3v46',
                iflowName: 'nsw1guj0qfp98tkwyuc96losj65mqrx4kjba738306fcsnwphkvumhpqn439ninro1dod24jzoef6ovs6d6hpywu0f6d4nk9lbp86qozrgkpzacocjyce0gcy59vi5esr9vswwp225f83voca0szezt2psroj0qq',
                responsibleUserAccount: '9o8psp6thjlz6gxphj0w',
                lastChangeUserAccount: 'a6lketj0hjeh86k8atde',
                lastChangedAt: '2020-07-26 19:58:14',
                folderPath: 'p19ev4a1ro2s4u8tsuzs618j2j3z2hy2h9llxdvlxlrvpzp8ygs5ry2gon259qmfaaecuvdutktbo04zc1dcaotknskvuqe2tg13s5cw8h13x758jitexbihmm3ttyjnaa8f90dkq77a017vhdzphzdrgkiu5cpo0iynqkrk8tha19a1bgrqjqw2ig8pvci2lygm5ioe1jkw6fseu0ouifri3azkteq2bfd1b8aj5x1uwl812iolmg7e7bf45h9',
                description: 'fvyhiu2cr2ww28swlao6szjis6c3cgn15mcmnubigj5fipplspxasc1nkqwomgefw4b6v60l3m5gllq8aipllktmc4z1cdftpkeoa9lomybdm1ag51u1ojwiwzudy8m59tpts2na6ntw711z0ndo3f5zguofcwnlj39emizgg325t50w9kqz7wc3z2ns9wo63hxne8ycc8kkf8qunnjykzlg1aam93imjf5bwmslel84mypdujfsp5qlwqhmrsz',
                application: '7kw9fk2r8hi7b6ylmwnb2m192vtquc3x2gt2yryj4dioch8co8hq6r9te54w',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'jbo0qsjcc9fmsfn8w5rcrmnk7whc284pqooy8wxfpjp2i1s83b',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'jectv995s3wx2y1uy8q4',
                version: 'tor8s0sa0ikv59ys57cl',
                scenario: 'l8ew1eos5yw5p85nqp4q2efssfi78noi4glkwanyhp9bfqaub1o50him6zrno',
                party: '0o3ge5mrbrx63vjereamlunqqmuilvtzy9dvaz0a5ohw9wq1ln6na3r2wpubkxfd3whpjbmd59nlca54lwv0gwm4kr4c6j4wxlnkdxj5rbd0y8rjdxxjprlr4jp4hvnvnxekh9mp451874pkt9640hm1kiuigozc',
                component: '8n8jbbiyt6nb6grjy5mp11jkct68yw7igswwdd56r06sam2c5p89xgjnl569ccgbo4j8ulgc5hc6scewo3kv2qj6jycddobqijw2hs7303zll9y5k4hwyz2mnfeogugjmye0jqrsqcm6h1ay30cpimuc655ckdrq',
                interfaceName: 'wmky93169d8k3o251s41o8rwbrte4m3fn6zgmvq8p3n2ptmho3g4jr3ayfizf4sb7bec6xfy5cz9f89n00cm5iz4mq5l37212aznjh4uo2ly5j8kkeroc7yqdzzaxixt4zqwt1gf1hnsy90cc3tv3l4n4b2obksk',
                interfaceNamespace: 'jjofn6miqh78es1owxp5fqe8bdcjnl5bdec1prvbpbxuyxhiu2pnntruvkcyjewuas1afkd57hurak6t12nhpmfu51vyhvcx92n4t74zc0yvivd3c8q494umxdueh1m9w1t6t2gx3yut80ls63sd5rk9evaqshzz',
                iflowName: '3e3wxxqvxqm4k3xxkjc6ixvxhmshp6090e5ilzu8ok4txnf26gsiy1lmh1v0eptzao8shv2ftcghbarucwgl6p8sl9autpyi72su89mx7cg68z9rsl86f2vwsdnphia20ijvm3hawv0e6l6vwzre6un2u5sask6i',
                responsibleUserAccount: 'qgkvk1ajbrx1cu5yne36',
                lastChangeUserAccount: 'mn3qb3v010730t1yearl',
                lastChangedAt: '2020-07-27 14:19:36',
                folderPath: 'dha3yfdumy5l28u65oduhdjp43kwttpk8gpw98j0jrygzx6q7gqc26dai65l9iar7jv5hufxdft67zvir48qzr9hn2hnullarfnxgmyfr6c5w570ulzu02g8e33t43fm6bctfneqsgks3kusd2q88iivzadb176q6gy6uks53h1t2pp1t8afb05k41908y6qz7grvjc7h164dgo2drxo20yjtuabs6z5r58ioj5njcljisg2gp0e3jrgbvmhghd',
                description: 'qr8ifl4bmpva50s0puxccjdciudtbhc9hn2xxz6efazjyu82r5yzny9xtbcfbeug8oxl1j7apounpu2frruap96lnqhme4c8nkjqz726zrzm0zz15aw5bihl3tsyb1xtq822y0h8whi45ztwrznh222ig25kfghm9lhppfwoj6ugc4xl6klb1l1egdi9zl4o9bzxrngqsv2uqv4g0xvhfjw44t35p7t074gl0tc4wu9kbgqlbxf68tjh1w2lhfz',
                application: '0krcrxnarzivmnli94rcqpqvjgwrmpx9ni9seehqjfhqb2y38qurm8wdso90',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'xe47js96vq58yesw6i5w3ie4ir4jsqifh0jjfa9v8kze3ah71i',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'zewt1qhqdwhep4irr72u',
                version: 'a6k9onjup4q2pccu5d7c',
                scenario: '7sj8xvic13ftwv28aaij0o4kmaetqt27yx6cig8s43pa06qu43xvbhxpzmca',
                party: 'k4qm6qfg0i391m2l7670i4mnrrblf3ty9a1inbq7h6okvnl767hbuxt4qgiagct3ch508rwu73b5zi7xkvikoe0qjt06tkppmyr03bgq6crnshzasqkiwz93sr2pjq6l3hmvt9fcasfvheetborvbrnf9pq4qoub4',
                component: 'kl4sh5z3czx3iqulibfqw3j1l6blfc0szz8se1cx2mnnunh9xnlj2saoxzlamco7bizq55h9g9oqvvuj2q7o5fqjejof2o76nzgw6v9mp54lw8zhnnryg3gl8lvlmfs4514vrvxx5em9hs6ls6japbqfvrdrbey9',
                interfaceName: 'ffvencoaxxw2mh0090a57rlywtvduen4zdvxqe7uihovb3gc61umkgn6s9ttkaqlr20x5mducf6q3zihtobcucsafmsmvvmbby6d5hlzi2rdvl0khhrutvqwqlefz89scmajo2q7bx8fblss1snlhjhhuacr5zee',
                interfaceNamespace: '1cw6b03vg77iz61sclsfe3uxg3injr9o53txisr3cw4tdsee3jffoy83cu65jljavp1gaf40wv0evsd2pgpfzq70zponoc3virudgjyoqothg8574r7zp9zedee5uhbbqeodinbz4ix9q4uhxzc4uu00qawqd5zj',
                iflowName: 'e180idoacx273qmyq0tz2h7qtmocev3vqb5nvsnsgs0pu7syck7cbyo7q3sdcmgt1hibj661occe2knuj69wwfhxg4e955xod5z28rs0iqpzhi0q3wh8eqq6i2xqzw19aqwdzrhumr5zvpwn5z3slqz534zmbnlq',
                responsibleUserAccount: 'qbm1rmsd14dkjk5pi023',
                lastChangeUserAccount: 'r71khwgfor7y5jmuzkbu',
                lastChangedAt: '2020-07-27 10:32:16',
                folderPath: 'c9u4ug58sdtqkk6y9fjsqypq2xgcibo8tn9d6nzjfunab34pp02dh86cpm540ud0a5lrz0vvs5n4izx6kpnjftg6buh0a7ai5hdamdrmufx0wd1otnw4p87kbn40hipgajso78e2csu27uk785cg1mrd6lsddaqrskpv7yzgjxpq06rzv0ub7hz35e5rsr08cgz32697r1yoi06cmu5x34ifteg0n10il9hs0ksbj3hzhg9t2tl7wfsfe5eg94f',
                description: 's5myg4r90amkbwcg7zjy8piwks5485uthqw00ukj6t57iy53t8z8o6bzbdccgfat57b387ddokrj3gpub7yc6zf52xajs8zolz5gb8d6p15ye6or0j4pp0btvprthkpvbrsyau758s8tzpgh42g2haxd8uggl60p8mfyjpiwz5llhidpgvkkpwto3k170wpp5lj0o6781682j7pdrf8tzjjthomn43xekc3me5kdwykk1bdt87rsh4kdhbptldg',
                application: 'uz7bso7rpdz3blm6g7drx5adyd97pu265fj4x7ce3l1rt5k3uetj9q27fu2b',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'rl1zoz86hn2xnbhganhk50xwd9zbn5lkpwa6rgq4ua9sf3a0ma',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'n84bx06n5osn4tnvopdf',
                version: '79cedgyk9fl96dkwmwac',
                scenario: 'o00oln0byhhaecquduhdfvf198f5xfeuf5cbpsdz3hhdnopyz180i3hshyyh',
                party: '5knujjfdca8bhwqnwwq7ynqcivrg5hm5o5qwyc8p8s5gq6ehy0598hlehkl8n7ihd52y71hfyks2c9khkgqkqos48c4x8uxbvd9nv702ft8me709ya8pmx9uhx6fhwdw11w1nf1jm9mx7t5ijp3nb9dmgp9udgv2',
                component: 'c32cvw9h7frmqqbu5pus3o1o689jmr8ezsupu7tcb4y6st4vt6i25ktcusqse9mpyh3q92w746qzzfh2lijgjr4kk9hnlfeqof7ith35a4z4cfcxvc5y01jhf04evesa5gpv9631edyhw2v1n9f8v2593f9lxdv4i',
                interfaceName: 'iguvblye60bk16ke0qtbt44c56uzjyzg56xheihbmhikgadoiufzvk30cvjpeu5xrutcgbr0vva11pf5ezbwpg8c4g3oq4um7clhqi25femk0x5gv0h35z17eya8jqyww875k3okjedqb885b6l1let64ytzfpo2',
                interfaceNamespace: '1k6p4cdcbqt6ow85pdi279k0g80adedk8nhpp4s0s2c1qvf27hjb3i0341de6w67erv2yn5lwqnx6zgfs7qf6qktar2pnaqxbl6nwtv6o4v8inuts4muud6zgikq49270q0xqt40ca5owa3jw9xgewy6htb7such',
                iflowName: 'k76bhtsiqfd0727pudd1janzu9okoe9tbjkjey4zufqpwahmq8731tx6d7qt9znlaglxmp6uyuhfomsm47xa49gwsjvdfzkbjrgytkh4f3rygxdtn6m0ji7a6jtrpgtp6ckkigkb8nt2nj3hzwhdl28tpt36tk19',
                responsibleUserAccount: 'md6auy9mbanla8ydicru',
                lastChangeUserAccount: 'om711si3d4luowk5tjvc',
                lastChangedAt: '2020-07-27 17:09:10',
                folderPath: 'swzndgipq6yanzzceoks7rle9ozpkjpmm1web0n13xa6kqkdvhltyfnz1imu1lqdsoqrlw4texkqicwrdtj56to3i01q3v88125xt2lfspyoyuq1olgdmw2er2qk6mpc4ajuvfm99ajy89qw5qxdx1m95arwc6paobsmsmk30mj0r6x21kyiwge2l02p0eqjo5a3x5sg9zwmu9vcqnuh7oej4yc6loanupf0qy7b12u4vt7rcz0kavgmxv0zaiu',
                description: 'x54s24ahucm4jtbik0z9ckrdj70l2sg8u6eb43cxeq1jfiftux0xp6idg3e0irqu3f4mgxllmmsgp58fyxjp73btdkpww2i6s1l0gzsebpuqcm1odpk8w0fjzlg1sypznlvzx8dcd4uuzji44fw496tz5o2d47oaxey5c2sfq46zbdbqsduusnou2y1nf4kld0uon7w1d6tow7ghnvzmbjeny1oyw5tfxtyk6pofszrgp46itlv3ndzy0wgsc4d',
                application: 'wqkaii1e6jofb4nr076654tvodgzaqftu16uhll7bwo84f2y3hywfrl7xeil',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'qpoxfm8f1poof2r0xvmwbw2x9xc705koapdi08ny1cdjusf1pa',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'swr239kh4l91m92jbpob',
                version: 'lkdn0kxh5f92451npvng',
                scenario: 'n30zgrszsf2v9azlf36jomprlmn1zb9m2qmv34hjabt5hxky7qr0rw13hcj9',
                party: '9oyqnnkqmozbyqydm24lynpeplvko5pf16eldtm7ttaw73bvpyiq978mvii60dvgxm6b6uaqvvzfh06vba3kfn87xx5xflei8a4wo7l426doulubezolvvmk7pn7py0s3qd8nt74ti3dab29e1zy4umnb6n95upu',
                component: '7tcz67ad2odsdh0f6txqwzh3qnrpngxrupqxr6jd6h1014jqgh0ih4k0p9hzjkroy2s5gf8c8wrudj2w7j01ab6a1633nm80qdojr2x5vmsoy9igjcmxn7c88vfredf08w49656ayrhltj3fnintdfcglgk4uz6w',
                interfaceName: '0htvydcvx9y8h3sqwxr0a75wep3sdhticb6wyt4j9ysm4ofn9p76474fyf0452t2slr51hyqn7yr1fs1yhy4mrpv22edz1y2ivgfv77a42w75c3phky8mnokuawn6glpieibdgrfoeyno2ie0mtcrhumz9w8asj2y',
                interfaceNamespace: '95ivki51mvykvjdy64dzx3et3bkncx3qwued54tvwybl2sq2j0mzfwe38q6d2wqhkpk4kog1amfu8ru0ijd2p9gd4h4bdqftmkqiqr7x4s2kgyzdtev0l6us72a2lb6anwkd9qnhbhc8xxhxxcnj4lq3g24yslmi',
                iflowName: 'eguh4g6oshysvgihuto2hgbfcwa76lyp4gvprbmty5ci6c1utcw6m4b4wb8jnvhrif2ut14wl15h95eusp390ebjhgn7cnmocb43dvjoo5f4d1palhgdb11g67kvj6cqlzdk6lqrgdfpeatnenmip5tfpphkhlbj',
                responsibleUserAccount: 'cc2zx9ez1z71wsua9sdt',
                lastChangeUserAccount: 'p0ckj7p9byru3qnti83y',
                lastChangedAt: '2020-07-27 07:31:15',
                folderPath: 'a8urostf9tjej0xw89wt8ws8yfjycw01hgshn8rirq54yavx138w5yb32emk3ggm12aojeduvfs2g3ptx3bqzt2ln111qml9xnu8rejzrk3kwpbcrycw12q1nrjfmqekhmlv54ii73jgdx6lx6eotvpplcyons32au6gx3y1ug7182hrfzi0ck68u25wz4bq0tnowjbyhflww34tx79i1my9wry5nm6jbhwgszkxuynz8r55ek7v8yyws4q8vgu',
                description: 'wf70rutmk7lz1068jrkzjl1ehjyssmvw0fwbm3kw9szy2kepfmy15r99uky9wmtauaqcny7i6ux04y126eqzcjfby5ptd2wuw5k7j4qjp9xhn9rae22li3x1tihaxszrakwl8skzq9sng6zobahmeek45016jflkxtqwr9tqgra5lwgzdqtphjtw6940b8se7xtpncxgaazijxooz01n9rnilmp815ksyuaw7f76f9txxnai6yyc1tdpaehvhd4',
                application: 'rvyra7qyn2bf7zc0bfrzunzyb9pd6zg2jg0lx42kgrc8hpp0pzo230k6uoen',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'u1tl4gg6iry3yq0guc4vnkiznfwu9j5xhn5jeye9zitngvxkau',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'aew52x2agzpq6jdhw0bt',
                version: '4kdxztrrfkbcnu9ayono',
                scenario: 'ks8lom3xhoivjvipgve6brzlpgv4bmfmkzhw1e4pyi0g57835w51z9iifait',
                party: 'qxvck888vze6lzs6t4quyut6tgkndxppurqgccljs379mhli974hxl1ackml1fmm4t65n71m5ygagahzb4gs5gi0vwh80l5phh4yvdx13p8a59ranwvxj0ups0r3brejw5qqxhugrjwiufdw23fu3lzxlj6vcg2r',
                component: '2lhwl25dzgh597jl056vl194zhbz4kf6g2dhq126g67i64r13tilgi89a9q3p2as3ixdxk6ub0qfdei6x23tu2ynx2p6u3gz9lholhadi9jgz8l36drsbua8pv4amrzrnyss2fhzr2xp9a0bigkurjccw60bqeni',
                interfaceName: 'hc2c4c3pkopmx1k5cikbw6dyioxac14pmnvix78f37kiawj9q5lrwxth6xi1isz6gjrhdtygy6g8bb00rdbqq1utsj62dhd6u1w0lbzw5p7h4zrs3tnwrramogpw3lx1lhzlcvamo63306gjcq0a9zjjtl4n328k',
                interfaceNamespace: '2p2gwyswu46uwk179yeje37gcmfklqxxa9umy51fnqlksjzqenzfxnv5fnxb3dmm1d31m046f8x1f8lridypcca6al55j1onoo8cx09x4mn2bd1wgwcbrkhxa07ga2eapozp1u9yle2ng944y56767ruju1pscbmh',
                iflowName: 've6lz9um9yptuz79o1i8w3x0utzlgrgvy3kqgn781ookl0kzlm57ixrubn9xci7y0slldn2o5jaq2ehocrhk486n83aevilteca8riy36gm5kbx5h5oxu599ft8yjcwcaqdw97fuxadni4o5r98qa0mfblg38c6f',
                responsibleUserAccount: 'bpjdmtpx1j1tqn9rmr7d',
                lastChangeUserAccount: 'i0fd9jf7z6nezmgaelg2',
                lastChangedAt: '2020-07-27 02:18:17',
                folderPath: 'b8r87iu6f65ir4mydt7u1vne40hrrd9b36r486ppbzxcqp9pzgn1iwursps3w94yqmypx0wi374juoowk9jpom3tjy41fdycta13zk78577uo1qaiir32i11rxzt3ds1p8m9eviw1zm9ttbq5ny97wffoxjokl2vf4ty8lmew03dcsub0oajh6i5oetfnq7980eu7c5fvmnqy9op81mq3jab7xpr1d13w84sljbvhkvkv438cd436cahvwmmhxw',
                description: '5ou1yfgkxsiy96zg6pbxngkopvprnum6sgn5zevtd2qmlcvyyjerka833ih0ap3zphrp23xpbj549wcam4y63lswrjxti9b3va6i89isdrdbwpcyf9qovs9cl7xl000600krgvnnkkz71m6wc4g04z0b1hep92b1t45tx0yioa5ktu7vu2lsvoxcpayspeyl4kr8r76om7v8bzwrbbjqnz8shezggkr0ksykao6rdhisifau4ckxihdd55qnbf8',
                application: '4di62fxvfh33aerlu1k6hcwwquvuiwf7uul1xywlr5hks8f6kop8gpzqq1wu',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'tddyy5offeszr3pur7l0qi3bul8tp2uj788e281ikn1s4e73yk',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '2wqo928ptnr39kdre1ik',
                version: 'wh9g9ufmk9n677ur6d1z',
                scenario: 'kpsameg7xf6tn1ydsop358vyp2okn8nuyxcia1ysl4sybecabg1i79vb5sk7',
                party: '2m9vf7xwatsac9vwm2d6skia604d0fitg3jmx5tcep8am8jtrulscd2zjwlvw50qnpwgkss9zbe7kytg31fg7sb480v9k9hmtxynyamzb7eqv99n6s4en43hhuqmfyxa7wvpw4e2460ak8b4uxds695wuhidqgbr',
                component: '1ynes7jz2r3rrvpdwc8h6wzks5yum0l07tzg75xszzxnrbjhdgyxmg2ez288fmlhn7t1sw7vn1pz3ajrle6h8q84p7o2afni47a9ii77y0344834f9fmrke5p0tjohsa5mehxcsm1014y48masiyc1v7uk0dq393',
                interfaceName: 'hc2p22hy4t21m1xjrs5xw2ct562rmf33rnk36edjfb055o54ypcd9cgf5pdbvr3fopl7qqy6bhhhuz2nl4e3m1c96ba3pllyl48mbhxa6t99oxmdg5n5l50b54px3wmmauellq1pcn4ovlujp0lo4uf9gutyijja',
                interfaceNamespace: 'a0wpvk5wnuh9iz48vasu0yzen42hgtvsxrziflt1cru80o3z4q3w69a0ip9cyjszt3o6wbeybgd6vvp29vkhrcjr5rat0yvx1teir0g6ao90prfauz8o0rf03uan5u10qs10u1bk8iehnx20o95q7uji3n8274jb',
                iflowName: 'wjrunpbxgee3337xvez2yob5xs58s49nufh04vdoxzu35izt0ui2txhrtt1mkkjz8pgz69og0v6mofx9d2s8a79g4y2wucyk64mymnm2vos8kk9jzodgm1yj7kqsm3z88uk0iuyu97rsnbmg3aa3g6d4miewkfhm4',
                responsibleUserAccount: 'b50wskatpe3itngeldn4',
                lastChangeUserAccount: '452h59eti27tqrbb24ug',
                lastChangedAt: '2020-07-27 00:51:01',
                folderPath: 'wuac3pjax5ncp9bg8jjoixka5nqwllgfxt4zj4h09gq8432yglxqueh3c1rv7gwi5ax9ml30ctz8gaw2auhmq6w24he8jv6onheb30oa9hqdd6072fvg7mhshf2v0c7i88bsaksxm7yqm0kinkzf1rgz6xrj2szf81mqot05wiwikotvjy7g9zpocrsa4pqc5k75e3wep7vp3ltnykcekjyo3d0vor5e2166xlor92oi9c53boq3fe0m7gimqxe',
                description: 'inwbroqo0fmrtzpfv8ye931vjy6re5653xcfv40j1ecmha8otwbnvfxr4z9lawbm663ajf2kwrsiwryawzo4h5qtx4ng9jvn8uwih59gb3ft745x7wnneml8rc7em02ssnb2ipw3br5aon3cpjyhpd3f8esyb0pkplltq02bjb7qu31c1oa5ve01a44r2ims5tql8yuzjsulzcs4k135zegzapl92umprcucmb98nncvlke7eh8iaja97trtoxl',
                application: 'na1nvwyholmuoqyxdbu23d4r9d5o89fajghnwgmzbgetfpyxpwco1hgcx4yh',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'qddp4v7bfl03ipqtjz7kwmvdqalekos3q5euvtnfk1rd95h8ws',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'i6rvqi6cbbw4vci0phfx',
                version: 'oe87oktmtd4qd06lzsdz',
                scenario: 'ais4tgjbks7tgwlolfxksis8uqdpjc8e40l3cx62m2ywuh5jarvshhbcw5jp',
                party: 'ntnk1w4uveonvwb4rhu9u6m59mm111kb0usmr7nir5l5gj1gy1kvhqho97ckcgdk20dfyn3l88baahkt4xi9hsgfdeu70954sr0uqliuxsuf3tbyn9tde6glpuh07qcj5opr39nber76pj0wytgo0horqarne7dl',
                component: 'qp8yht6cq0mnmqsggob2o4res5niscjc6quorrvvhuuwipadza66sr557dgse3nuv3tiw1p4vt60wa7lzxgi77181om4n98e6ippptaya1x10q2kuz5rzgbcnyozbyqvdb8o4d76278mf1bebb617tykjxoey9l3',
                interfaceName: 'mgezfhpg9yz69u7k2rssayln4kfg0ksalxob6q678vba0ol5w1aysn7vgpiu1o9r507q4ome1imj7lghx0n6yn2gvlk1jpsrblaisdh1b20lib8cfd0ou7n4b3p1bwl6m1pm591rugyk1vumw7rirfr4z95gy8wj',
                interfaceNamespace: 'xnabk689zii37x5wgyiy3fab83lbj9qw6ew7nz2b5jhvpf2xbqqc3w602kkplrcwi4dyj8ewx9w7w4jeto4csnqh1jls1rmhlb1118r7nrlwf2mihxduine32ji4uojmudqu61pq3wtfufnwr9g014g8uxrnzxzx',
                iflowName: 'fct0imjszhass62m2capuv6b8a7zyouw69pwr978avhbfvdqajl2pxyfr7hbixp4z5muyb52nlrxb5s5c9bv6lpzmzjuzymiuk58rsqu70agyhy0aapqfl0w5zqhyig1fdxxp4ytp9nst0zkeq7ahalxft4z8mhc',
                responsibleUserAccount: 'mukas5i9hjzjrj6bxwc61',
                lastChangeUserAccount: '8fbcljkktpglvl8s1meo',
                lastChangedAt: '2020-07-27 11:53:34',
                folderPath: 'id6pb03qrv1h0lc724fst4xli2um5ylrsojzvfjfh3373u8bmbtvgkgzm04ust63u6f8liqaeiac3ut249acyh67pquqmkl5xg2q8nkxjd4xkntcqfb2ajdonstotkapxpjncv3xvhvsyrv4z6akq85kwcbwi22unyomhfv7yl0cvo6i1pmx13g9vrrdk9go3z4f8c8v04jee8yw3fnwlakw6skrj9qlqg90y8erlytpgu83zu3ow50ycijrerl',
                description: '7szkqh5jpa2st9ft58yrw8ndumedp6xowoh4wnut7uqoo0cmru8qxvjba2rm0cav04s2ig1gfv7t5nm67w8t9xvich0oyjcebhpqf4lf3pqwk4eeb18h4jctxa1pqmdnwdvn7711gzwfi150ukwnwkdn85nc05iyrp3e34rxfz3dfu1650hnch6e6p9kf2x0gunzd7tt25uxl7fa24iww1p96exuq2trjwq0tn4ab62vp5z51885kkxb4434g3l',
                application: 'ubl3qpnfrkwpaapzdgn7hiz91vsjo72al240lyj1i9pp59rzd7cwmhx6x52g',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'gds5wv0qqfppu34xhdthyg0dlurqq1x5td9sh8y4fja2xdjkrs',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '2cxe6i653zjyf389mjby',
                version: 'ja8v8q9miijmwwysbzlv',
                scenario: 'n2ezix698sdpscwl58t39us9thkrzn3hh09mxpt84hsbhap86hsseen0sngb',
                party: 'i35ftxyirxmeu4r3h1vzt7z14slmakbn176vr49hcpm1rsgu2jnmxc1nh27x2fvw1dsibf5m198oqkj1x88huxwphwuuhl09j8xhzk4xvpsflkgev5u7ld69gi69hy15if0sp9217ecfeblsxqczrynumtzvlgxb',
                component: 'd9byyq93y61f9nemrdroif92eb5rhvwfl2hmu2qg3jiaza36tqfio7pbs5cqmhv6nlayx3zv6qubvpfzixt18k8i71sjmg0ax240nzkzkesl84oxl117no9rf1kocx4vgc5hwkt6vokhh32xi54me4kuhffs8dtc',
                interfaceName: 'qunkp48scg08fwtfahu9ezntuwz1rvkf0ic7nx8wnv7twof36qe91gyi25ttrizpicahrmllhlrjns0ie16464oqapdptu4o55j9g1wozigr22gujcykj8vabhw0x7o0ul0beln6j77g0df0f3dl5oqt6jsxyz7d',
                interfaceNamespace: 'lsvvvykdmw2w8jxyiqzgjbuwclx2dt1ho1z1qx6t43lqa6hbvdjcypucixj16t1syhm4ztgu5wrihnt7t269fhq20d5ayecrrbbscqs72d7xdccfmvlzq7v2wlxluczep10x5vw32s2ubv3jrbwq2cvuz8kn0ygk',
                iflowName: '7ybuzg3dxvgaxuqonplxr32qw0ff9cff5bsq9plav60semac7pyugrg0l13iozz112t6ezntfv2nibim26th409insw8yt94q8scu4y5lmvp409fv67vjlowbi4nm8gjuwm0bwdqwkegd5290l1rs76xf3qd6cj7',
                responsibleUserAccount: '803q0dckgywmtqb6cft9',
                lastChangeUserAccount: '3gkua3716kg30di4kp3wa',
                lastChangedAt: '2020-07-26 22:09:13',
                folderPath: 'iyfalyn5sdaaa246vmj0diqf5f1f1x3sd9tenx04dv3k7ssamec6unpu7354zkuv5l3i3pqk2yvdh6o3dwgzpswbhaq5vvqhd0iu1vqqaku69w28wufvf3bdeu925iy65js6etxjkgk2hgp6v5ofl7fn1qp8k0d643pfiqygw83fcudnzrox49t6s0wkox4yckanxyl4ef3znpehnjss1hwssjcon0xu1bgfuqrh9758j8kjxmxv1ylymq4arom',
                description: 'op2ye2bhj9bow46r2obasgwrto615euyeowbngsm5frcc4shorrh0wsmlnr7o436beji9r97gt6uii8f26xzlm1l3x18vjjkul0zdkvb5kllaxue528iz1t1x0dqinm7gvmw0gmu85ui7k9xj2q8rtxf1w0abyipk6tpw7e6l8ya6h76800omgtj807gsfhv2pzmh5spfiukp3f3shcle5tve81hlxy5v9uncekc4yfqxtuvttrq4dw0jxpnqy6',
                application: 'qbujnmmk8ak35aaoc7u8rh6frqoearcs6j9rpwcwv84r3skv7tzbmtu6zsgu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'z9cl7647rfxzww731sk2zetvxb9a1i5f4f2rwwy4gosnlou750',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'b3noqhi6b9wpmeeiqa8r',
                version: 'lnb3prhg0x46nijp35so',
                scenario: 'r6c1y795lvtxi72ma8ey48ksvfstybu8g90ub7h3enp69jndzu2zapqeh7ft',
                party: 'ath2u70ijjqsxswamwrjtgtb29g739r73wauei9lwn1zw366a86e9gtbikl49zgg05btpvqlykdwn8rqnlzeuzae7pxodljwcd7wzbgo2zur36brhtz75gck1t747gf0pshsnhgckl5jkiyni1dkq66302q2bg5y',
                component: '86utnvvf3ysyuh8pva528l7ijj7p6z3vtonppjwm2yf7ph4xz8rxgh2k4xye0d1rd2v28einlw8l60l0g1m08p2a0kzb3ohdiijoelsi6jrutw3hmxzn69vpki5389layn7gra3dzfe3ubqu08tmzzlkwc45hutb',
                interfaceName: 'p4qix2a45va167k5k35f9lg3klax9xc82twzec939l5ppdjliom63zszjor6xbr1j4fh1mvoam3y605hkocg88l3gt2ao305dd1gv5p0ldcsf476zu1lmr6nd7md9ubh2dhvhn3vzx807j8d61z31yp5hxj7lem1',
                interfaceNamespace: 'vzc0j9fbin9t50h6umk26pej8u0766ig5i8zro1nean56orfnzhtwqzr2fcz3w3ae98utn4n9mm93tivjp4awthyrol8yw2i66iywep9mzzmly4jg0wk2k6bkq5d9dsf6lm6wgk6esetccab6ni932vjo0tf9kox',
                iflowName: 'pdfo2dwqc5zynaqj8l8scatasz92d7sulqlndt0qe7vwmwewvknlb6yfr5nq5fyvl4z5ibdy4dvwv1a7pz4q7ybbzdaiphaj0mo3lk2kk5m4p58h4r1d13qd6gqcpf3tf5oiy8hjbkioe7g5r000pt79812zvf44',
                responsibleUserAccount: 'wi2ob5mm44ld62830o5p',
                lastChangeUserAccount: 'pee9k11h6esitse0z9li',
                lastChangedAt: '2020-07-26 18:50:53',
                folderPath: 'jvkvnafi24xixh6u0jz7xs5shyruo4mrnwivkirweln4qzgg724sgwnnr5g1akcd7jm4go7ml2wmqqgqy41mrbiwibz41n6lsqm1i2nptt1avffvkdjck1xnojoxubdzevgxiq9z9a4h8xnkrxkaoj7v4fswaof7t0lx6x5lh0rzh72e8zy7udci6yygn4mml4zgqz1idhk6o2mco5woqwy59wkaeu7pb95jzkvs80jk057cqlwm5xc4gasl111k',
                description: 'jgjpuf7y0bsa22z24r1vx9pojhhy04as7w1u2y4gwylitv5x6y6dd0elfdm0da05z4xirpkkxsxzw02u4yzcnanmav6mtnug9w502dfd6517y19e1xjyvprlkmmbwqk2d0c9hklyglnlwgjfl3mp20d9gl5imis8tgcam84o9k9sr5z7hp519mn8d7w8d0ujuji5xkmxjhpeqav1jwxd1t1lrkbcg39f3leuiluc7f43gzcekaq6ayfv9q4ru4j',
                application: 'fmi5nk2pfyoemw5if07vgo4g48rn6fg355v0tjalmn2jcsnjaaikukza8t0f',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'kr9zu8an56hfpmc0ls87fm9hdexjxq6l04qg60dmvav3ba81c4',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'xe4rzw2alp0xxonh2acd',
                version: 'qh05a7m614clajx0p1p7',
                scenario: 'd01wti2ilewghctrkpg2skm4i4jcnzxriegb2ltkjrnn37smjs914ajpd4n6',
                party: 'ndl0jwhufsthacgwmozvjrt84ja4ydpyode9lpeyezgjuc66qp38l9ycsnffq2i3rx3h1qnbuvsis6v1b021ut991pvpwa8fhdqun10ymjoc41hq7dwwpcc9zsr8gl4tu86hzig3dmzw7yww6so1592vmbzhwjet',
                component: 'hlp6isl2vu7zh6rwxyie49pmjj36mgfnxvpvfp5j2koacqhe9rz78uqj0fu6qq9s4si15keozs52zfb5duanupvalx23odup6xp2yhf7sr6plp59s0rceftlnd9wcupj9tg4bquyi4jenk0zxzesthhsxjukg0om',
                interfaceName: '0vfpjwc0hbye7r1of5p3wu6hmmrel66ps7n9yspy5ztufbyi026um140f1omslfrp3xfnu4ra20zodn5lk8uwk4iyhtvqzqi950j9f4dlpn2i81mlovpzksvlxqd0aj9qejhxylqd15fkjdc6v5szcgdr51xqlgn',
                interfaceNamespace: 'vlpy4mkzph60k2gz2kp83o24a396zyhej7gbalfaj5qoyt1gqqocqljid9ara7ddxtx31pjxdjktsh7xin0xceuogzklwldlgpddnqfmpc6o4minlo2qibdeam3l59tjqvhtlnsok18hmuj7seqva2r6xetv72zw',
                iflowName: 'iloziejgdvkdf5khr110hvrvw3xye5nziwmo3gcgat60yk71vrfpokwi7o0ccis0uthx0hpteuj9gs77acguffn1y3xwj1f2k2d13hptsxsajefyw69vignn72umugwy5gz5oihhy4pzbq5c1tj58i0697xr1imm',
                responsibleUserAccount: '0n4ocnhuvpkohj9704su',
                lastChangeUserAccount: 'ngz1n9ghuotcssfvqrph',
                lastChangedAt: '2020-07-27 09:41:10',
                folderPath: 'sqjdzl1f56hgaermkryi7wxbexwz6awd05y8svr3d0scsy9j4gd6udjk2tqrz7sfg6mxh4ve384oily75f005rtsa8ilx6qqmgz6xg00zqhsan5h12hgg0igdsst4jw0zg24te1n1mu6hfg7o9k18v852bw6h86m5bst2r5xtl3wmst9j81osnfl21vbl1msvbzs07yrw2mjmy72hiely9cprcah124znnfzsq77n4agejyuo6rdhuggwy7bxli',
                description: '60wf7jxualbup6qpwrdi4u5yjxnptx8yavm1m8cj1l79cqn1bnrjfyhxzt00vtvyg32mushaekg24f8cxffun8y49nkqz37uue6ccm96arsatu76jpr13z4su2qmmrg9c3zbju4tvcjghcab09cf4i4wsdz3k2ijkjrjmzdnamb74sy9uwwvja2dweao117n1kls1h1e0ia3cnijqesf37ouha61q4gv9eqslnbpdihbhil5ith6hk5quqhnqna6',
                application: 'w9u0id5dew2wvchmyq9ff1kto27d0oytny153ki25qo8ky1pvj8mp5a2537l',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'sbyg1qar95rgmtxwlox5bwd1sq1sn9293uampx2sy2mch5os6q',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'splftjcfys2ha2us0s7h',
                version: '5sbzrekyjqqh44y66b3g',
                scenario: 'k5hbf4zthxxwqrmzimjau2pbndgderzxt2f4ej5ox78wu1qgjwwwsiyprrco',
                party: '068j2l5a8rsm7tddutdxlv3e5e5vzugacb15kdw1m56bzszlp3trl6o5dla8t56qw5b4xmhsa3wzo2betxj7x5s69fp0tdn52uae1a52c6a5uhq054c1phaygd4pafas818vvolevbsyxa1mrcwoy1ijb31jxrs1',
                component: '8r8xdmjz01fiw20w0ybv9us19wi0dw6dey19fh8j9l70f06vr0jrgztzdmu914os4xgmetmyvrw3ztjhqu79prqps8q5ze7w0rmj3q8joonvfjp0i80l6exfgoz8b2wtch21lly39lrxpp1ya6gtwpty1kzj7qb7',
                interfaceName: 'hjc251kgfis1ospaggmu9b4eebv0qvferyps215oxvu8uwdk8947cf9mzdray6833hln2vi7a37s29ptn5yj4k8nmz2j24k9twuaihtvye1b2abtjclxxprhnonoh2r843kw3v5fwaczpdm08ypzz8jrja1t0l5f',
                interfaceNamespace: '3o3ixln6mvqsxxoxhkzcelm85gumtrojnxnerkbzh09ad7l236ixrr9f4ic9y7c5cyccvcdh7iwu3zo9jafz53i25eha5m1qffnpqjvf51c02ipj9yppd9mb3yj4ceij8sjao2t1ypw15seu1kxviy43eefz0l71',
                iflowName: '62wucts4yyr01qyrxprb6qzaz8ogg79s4pz2kxj38ztj56h8k4xdohl5p6l6clyrddld2manuxbl3pjhj21d51uugetblzgtwaiko6w86hvehbv5bifvoebatdmvgizq09luk9a6iok8i0zbfwssxlm4w4ue33g0',
                responsibleUserAccount: 'r2trql1fnic800n4oi6u',
                lastChangeUserAccount: '1xbdjl7qs6833h2m2vqr',
                lastChangedAt: '2020-07-27 13:10:56',
                folderPath: 'yvuyqh124r5py81bmohwghtnlzujw4gmrvxufrdx0a6a1selokvru0cibvcx2h6fi2jcndvrrz57gnarjgstf4quq27ovr4ptf0cg0u6mbrxpd0575j83sbn6pgi2gy92qhr5v5xbwnw6787kpiv9pc601olkhsny8vuhrzsxi9733mgslptjcgzvmuqfnnbi3dsb171ppairqwv5lufvcsooejxkqdf9lrghgjk3bkq6v74xuctlpftnn9wbln',
                description: 'pm3d2tz64p4x9dtwiberzu2eqthcralkmxjir1wdkcq0s0m8k4m3ugpyvderwtjeu3q46nq9jplqm9m7hg8yynzo6ysfuvohqhoz3u6yk5i3ja3gvui4a8exegayp443bhmj4ajg1lpu7z0t9skf10u08yi8m7hkee0sfym1kdyub26rcyck46x723jxlnfn5o6oyzbi8yp0lvysjyi4c6244v1g6hyr8jyfyd3bu96uzdg5qsib6ngoq5vt8yc',
                application: '2n4t7lzqtzq0yrwwjtao3g67cb5bm7pqqhi9ukycuhjbjuu2z9ae4e6vot6fs',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'sfio2s0u35al7jldfmtz6ytpqgkbc8m88wqp9sy5z2isd1muou',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'rn0dmpi0rttorozh2vz0',
                version: '2qs4zpmgslqn1yo3j4xb',
                scenario: 'w2jetmh1i8tvujvshusgyquyc1xvgp51u6kgf88qdq8vx68b51zhh97387wq',
                party: '0ernthkjzgg069490oklrj5v34fgpogrs02smjrfkcqsktmd0usihhl1bweetopkx3u6jp498cgceusq70vfe6pmb03f136ony1c7o52mdgiri9hvmsgbdsks333oeojiv90rybd9daqerwk8dwwz6x10r18mls8',
                component: 'punddgqtprlz4v2551wh0dyyeb375uyb92s6wfx3gx6k8z1g7gsj3gp6yqe0x2650p81ijl10j1h06fo82pnabilq2lerz2jp8yzizupigbkxwnq0dgynkmnfx7cgnzkowifpskk731tmzlmp4l8mh5s4aiz1i2r',
                interfaceName: 'quwwqspbnec8lyybf818eg78rwik80o9fmauq4zjq71s8nm7hyl8z4hli07hxt7epi2jjsjre0kdexesjkloe4bng2n5hdrsydbp8l62ndnhedyg44c8ag4vdmrd4d8i1uyacr33s2k56bwodkzf3wrukq24qkue',
                interfaceNamespace: 'ec5cl7n1ygmr3h35ps4eemvv3rnsa3c86g52zoiiecy2fbj3m1iszcno4htzoxp023c3rpqse3mac11wa1pcmeyz69o7hxj1blbji223b47nipewrctr7opdhn1ulbubd3thmvd2jimpnzohiwskie7c2gwfwhna',
                iflowName: 't4dlx8lpg88iuf9gnaapis0ofstwf4oz77fuwektjg8dij5dd02zchy5d17xu0gmuuiodej8n443nmi603s0d1wb9rxzu0dlnns5dp9w1hgeod4donfy3im0nyrc7qiay8ohi23wjqfp9a4ytp1apsqgaljzdhkp',
                responsibleUserAccount: 'on2qk3kwzqrwwkp0z9vy',
                lastChangeUserAccount: 'd9g39wmlez30wbcgderq',
                lastChangedAt: '2020-07-26 19:29:23',
                folderPath: 'yzdxjag5rj6p1vdu0wkdw6c0n2g3sadov1oydid6ptq1v5g9ns2b2t6me05s87xid1axkmal9cyit0i7enjr3s89wr89fy31jfzxkjbjucngsehkw5q1bxydvw7qtsn21ymb8b9lv5d0lr40asjsmv3d34z2me43zqyumoufexlikuav1bx0o8wsg5u7bxak77g4y8fniwl4wgncs5nusd0r6aaosd6fn9wlduiz915wsgnqgoznsbrtw5yj1i3',
                description: 'x39vwpfjw4hmspzk3lr78536m3mx6sjixcryms0liaz70p6qxy09kkb6phq5fatpsxdg5jvcw58hkfbwoeefjyrppea6s7me2qtvh7sgpm2obh8o08nwg3gem1pdnw661966vo27ddirzqk02vssua60w4zm5hp4mp9l1ui7rbk6k7nlygxacb4lhex14wkdt9nmhtzg80exs48ytd93ut3m9e48qvun5aft5gd8uavx2fu4dzmhg30de0twmf1',
                application: 'pd53pxh3h0wsz75uv6tvxeud6r8siu9fudil0ul7t9ml29qq2j0axm1i7p34',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'uh4xw0cqx264bc4cjz5czu4dskd6r217bmdf1g47jdw6eibdd2',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'g8z477304r6qbtcbkoi8',
                version: '05qapatcm2x0v465o2w5',
                scenario: 'jlke6h98lug23e9ggtghk5tpqeef7imzvvi6x81vkm2pw3nkw4rzm9wrgae0',
                party: 'sn07c9bb6ymytbxo8kijslf51yuspoznkmmc4rrgh3zwfv97w7eq6dwa1hr8merhmil4t7978dvnabl1t2g4mzzkdjsw15eejs540ke69cxuorja5t67gp5acxdv1w0f509esr4osga9l444qz5c93pvm4g7wj8f',
                component: 'vj6oxx6uh3kgwo2g8ya6i5xsfo36kwj56tfpwxpvmaevwystiw4coxct8v7wtjry9w9r6bs5kbta2ygt5bgucuo6dgn16s3bc1rq3bejhxbm40vio8zf6g5t3p2etplsu70teyhs90st4i5f7lx6n4ujel327q0m',
                interfaceName: '5850sn03ufg20dzvu5d9kngmka9u76j223mea9nqancm2r70s5li3lg6mcsk13pkbryce2w3ti9r8sa3axnfh8ai2gqc0o4wfzbqdxptgir12qh5f4eyrmwmfznw5n2mp9tx08mdc88iblpmcqh3sm27olioq5uj',
                interfaceNamespace: '41jasdmpyvpu0gdin9rwnv54qxz07s9o7sanr4wett9yb36zuy64jbg5diln2ed48a1t9qm4fzki9mdu94xeu138rudurbponzsx2j8nlz8ykc5xxdnigciyjq8te3ypps65olyk21axc6bsz6ap54nsagara1ea',
                iflowName: 'op98oh8bqyzltly7nvxr23uu0wquhhs9fumgnr45w4x7twn2bn5sjm5u4p43vacnfk95ue8p9n7atzxqz0h7tlaiy5oc38pjhkm26qs809a30lxzy1vuxbmvn0wjh78deko0ba40txfysip0qih2g7gpir0j6yws',
                responsibleUserAccount: 'e8nkmfhqz2fk8m4j2fsm',
                lastChangeUserAccount: 'ws0s4wwxywqnd9lfijds',
                lastChangedAt: '2020-07-27 16:13:55',
                folderPath: 'olqkl12eyv4pht1kkvff0vtcsvkhtbe4ny4rr64wnmkvtbb7xhx2uop4hfo8x9gybexo4t0bzly2jxy9246svoammeailhc7m7tdbth2cygqgqk4v9t102hsf1arwo9ly1xztvryujdocj2m2p7dpd871rtaym9ap8k93hub7kihsy34ffzywk4cxc8mqz8c1514ux35yvmh4dilldv2rnzs7y1yiz0h9lwacytee5b8txsjcddyaq9tsoho9oh',
                description: 'p1wcon3xaxfl7nn3gqc9vb7nsfoqjut9ekmenace5k9mw869z812mlsl3zxv0fm7lsc6nrh05hc92snna7u02hoxadtg1qxpfoeulsf1zswhfq3qxtvuj8n85rhk8kd6x3kiv6o10ogq7szgff60bljlvk9ok2vh0hib5zz363hpjr24f56cd3mjbgz823kplnil6fzkbyu1cndpffrksj0gz2amzefn6mtxqand0p3v86g6u2g7vxkbisgc0sq',
                application: '1yaiao1zneu6go105p1dypq4bikj9kk7v3jy5cnwz9gg3phfxprme8v5cbbv',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'ghbb21zozyi4byx7z76awyl2n180zvayec5roash7ftatjr69f',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: 'l9lsb6nd7jsgoel2pxty',
                version: '5ss0mx8m98ynps6w4z26',
                scenario: '9fc97j6e95oc2hjtf0qdxor21rr66e5pjkxs4kqjhabqn5vevl6t0cncdj5a',
                party: 'gbrm9h4x2hf49djl2cjyuwq5f3p1a51nduauwfax8gcy6ogra8i1srl3aq05b3sjgx6f40hwam4a6dwx7uygsu8pwg1tuhjq777hc3izgnrlcbv8qr4c1xshexo3h6lp423x3nadh0szdjvkmi05e12tvqmlozwg',
                component: 'zzcen2uh020gisc6rnbuk4dkmm1kzv3sdfj8uqi3rr3nu1honuzmglad189p0g7oeiumlwefdw6ga2c6lc8ar05qytovouiunf87tq671idtu8xmxggbnji7j47focoy7dr6gojlx5q30y4bf9aoqpwuk5s5he2w',
                interfaceName: '5j2dqkffugj9ncbsutdi2fx8yej8w10edxrtq879z3q3xhj7dwqjepb5oco3epqcng0diuthgfgg9wba5oe5ul8y8e29ooie0rpcbv95x02wyvab4234bcbww56qxt3ghz8dqqzihex3zgr8m0x9jvi813ubyq7e',
                interfaceNamespace: 'h3bc98ve1mc844gw6v3lhqd70x56a3s0scpxw9poqz5efciau4rrco1mmsw7hni675g6rgek4idazqelwt67agxu0je38f2m3t2eyncmd3tzpsp876bt0d0gmziqau1ackmpxtckevxpbn6aoh9icjfgyb8dchg3',
                iflowName: 'ktxfbup5x4mamvzdrsjpupkozjrmadnsptzvp0u0uc54z09fhet6wejksirp5xr2wqsx5c0qwvsexmd5ll7uqehr5uzgh8hit68w28yyz41jeu5ampmp0ek7cksqdnhmm96l6ch4yqvipsm9svega41te27v9pex',
                responsibleUserAccount: 't6xdd2p9pj5a245zpc4w',
                lastChangeUserAccount: 'tt33tcoe2cp6e34dxhb4',
                lastChangedAt: 'XXXXXXXX',
                folderPath: '1q4ib726pulxgqk4cqfrsdw99rru16v4arz5kzqmn0irkubne5iqwfzrref7e4d869ebbq48mtz0gq8ahfau0gmw85mp6kxg3ols6yef96qn0hqtrjl976m5d0nnkl7p6o7fw96xc229bh3g55jzx9iz30vh8kgnwn2bf8ubml5y8nj3hrplm1a5q6iebih2q1p1xl5dfo1z9zg1uzsqkv0lbei2kkkayj6uax5xzziiqedmr598xuwa99odl7v',
                description: 'efh9u3g2wl34cpicggdu535tad8fec5o99o5sbq0b3err6ywx1v29mexgcdmsbfvs5bnbs7a3loxkkvp0itykcmfoy3iws1k2mdyefxfp4h5kjos1on7jn7qqa4wf4u2ivymhuref06rkypjejbp044tct9w65ecce460t1zdkwxwhoxgeb7g364afqk5bar8s3aqlqz5zxnwr36vnude7lba971ws1uhevq7cemh8hzw0zm32vcyolanxeulyz',
                application: 'mimbuflb0re74hbabh0roxvd8vka51jtrm69dof0yxevcb04nno2fi0j5z7v',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: 'azciup90xck6s25uls6f7d9nex2ak4exj5f55qm8usa305o4nc',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '0zte19gm2wybp4ujn856',
                version: '9q3w8r9aynkqvalr1ivm',
                scenario: 'vtkx6p7a8thj2rvwmmslkyz98p2r8eycwteeew5x7icfyh9w7gvs7dvvm1qn',
                party: '5irp5g7xdkra46jj5c97cooa34n6abyihqhon4b314gfsn0nbrvjncfwm9toov0h4gk0ap9nsj1rnum4fwwqwharpj4fnacgeawozjkxhfdb5hajbtg1ievcjpncq726ffie4ytb1m47ynplp8lrsmuuu52weho5',
                component: 'qshknilxhx4kzh1lmxvuy33wa0j6c1tb3v2fe3nztpfpvzk3pp936dd3j6glhpl6h8w3i8r6x8xxa5rtgcf7wxr9bj9u53oe8ozsyhq5kex4k7cq4endqsq066jtif0bjtv10jzvqqf2cyei2x4n7np0pipwo5le',
                interfaceName: '0jsc4sc65yxr54kcotfifwhl04cbv6eqj4w1eqn30os1aqit9dyvov3u1qqkjcu2h5tme4x8mlwhmciam5j2z207m89d40sfrtuy2kckdb2ikiorxi06g8fal2k9aysu79po9r9k8pqbih73kabtpbz73o6zte3x',
                interfaceNamespace: 'bejlm5zskbt0xyykxprcivcxr0mcscj7qm02717da2j3eowasga7c1dngsymau51hnvu7kns7q4aedb4qp54td5mfdzplsgnl0heaf17ca6fcjpa2zpt6j9fm10m7braq53fdwb3i8xbshygr0vnamzbhqfebtwh',
                iflowName: 'w7cqwc0jhj3hcagk0cla0oyqe5z70gz2x5l00jwlzio97ik67wev03303wcddopputcfe02ka9by2syjghobemwm2xuqrg57ko0iez89do8yt22tcsazr64cp8nk078dhlpsupz6w65fbwzuw6xuzfp68zc5tfc4',
                responsibleUserAccount: 'fboy37kulqf8uckzchfh',
                lastChangeUserAccount: '1kv8ecjeotxsqqgynfjm',
                lastChangedAt: '2020-07-27 08:56:11',
                folderPath: 'zx3nict97jbw1378jdsuzg77xbhvkw1ggxrt9oovy7p5606augqj62333o5ekm6rlgz8nc0tpgr31zoqxk660054vb2sbr5e13olsoo3po88fi1rilkkcfojrtwh0dwj2gxmksgug4wfwz0z2djrla3umkkaf36ixhstvj37wi0slymy90d1f6iz37extj20glu3vwd2469l0ialwpuy8mkxct9e6vc4n4woi9xh50v6w1pxxzk3vm52wd9bi65',
                description: 'rs29eihqx0e39t4fakpv6h4qlm466mj16577qw87z8n356nozdtxxjf0kd3hmylqiudzepc3x96p97ltwzq6h4urnqzw2ux5gw0tochokg8tm0gk6qegdywbs8jbbh09k40ijooqyurrblp4sq9lkl5l2sm59h3q4wje77aojofwfriuou9a8cusvkiu8avhblpfup8du6v5mfjx6j5ekkt0edn1xa65kvhvlsk5hlm73yk5loz61hspaprfdmi',
                application: '3rutubzgyp11r3hqzxhcfdpgxvv85ef2btwtuacj44ducxgwymn8cfo9ag15',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    test(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
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

    test(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/3b26d4e7-46c9-4136-bf7d-a85e2ca82c39')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'));
    });

    test(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: 'edcda479-8648-470e-a207-fbfd340a67ff',
                tenantId: '49676ac4-b9c1-4979-aefa-84c8c83c5d24',
                tenantCode: '678xgqc7tohggt1kwy456v3rboj3b3dtfbmhe20v5atnfitqa6',
                systemId: '48044edf-c63d-4993-b04b-81b0fd3de220',
                systemName: 'npoaislor3b5njlmp12g',
                version: 'uyhnxh7io7bwg60rv0co',
                scenario: 'nsagk0g7vp7tb961budrisiqdr52z2riwj5lvn9t0myn8jfhoyg9ak4l74sa',
                party: 'eafy65cs8ba5axsmrzfvzvgctnw0in1nc9j4hek8owpjfcc6ufqs71u6c3zkab6eg7hrejilsvk1btjw44buigfsllj8h3sryby8x866gepysv7f6n0v73xwi6zxqjk8vprlf4w8c56je0elekttnycn3g87v6ta',
                component: 'z1pdshqcg51yxfxja2d0z5k6dzx50emx3sas4z295ya7j179ht2ppwc3bnfk6px2kxn7obi4k0qg81kykqks3f6uin2wtybtgefth7bg605y20v5ubv6jn76h0xsp6oxtt290o1dmfinwppcgjfn7ltifibvrc6n',
                interfaceName: 'r2don3mqudf0rkwkurhtexbksa8wsja5wfk6sl1qqzxqhitqzvvlwndt9xh8qetn8lc9meopdbr3ng15uqfm63vdi5le15wg6qcqxc6ciubsgjwh9pd51sj32kv7um1hobyand1ngm0kabu654p7poxwcsxnwtkh',
                interfaceNamespace: '6r0h8afugbtmg0q5odjrbgzzkrtivnzs5ozbvkjxb3l663aaq2cgu6xdlplbaabhwtwu174lqwnhtltv1kt5x6o4t0txd6q3z2o2klr4fhso2bazp64bzu9h09i951pt9ej3lnlrtvtd21lvetr4ymgv3fs3xkra',
                iflowName: 'gwumng2h29l8636e6b230kyugvcwoqbweluu2kpezp0vlfxm5h4u558d012muu4p9gdaqz3y0hh8ss63n0ewv5mwl88i62mhvg2ie8o4dyjvkzji1jrvevif06fn3lxdgs3fuc7mpimhwwv4zfrspg1e482xmp25',
                responsibleUserAccount: 'lfqp7b4zqch0fb1fe4cm',
                lastChangeUserAccount: 'pa7e6lhmfkllbpj9aq6r',
                lastChangedAt: '2020-07-27 04:42:08',
                folderPath: 'tiu82yrhnadsr69c6nwdmtxpty5oxzq1whka53zithee25lt93v4pad2uw0yzndltyedmpcg5haqkpb4y7kuwjktomi2talkb00mclb6kbh074ntliu5hwfzu0ny3qduydulwm2mri7oantbafm9dwmv14twrr0bv04ml11kddpytpyu7qsvqgj104wx56ee9oheptuek5h0x63zcrkn6brhzcafdgwlolrryc12tlj8m4rvzc8wjl255tckwyw',
                description: 'd89fx97x4od0oygswo8c7rkox93ikgr0wure8akkg9glg2l906sbj3aex9c7a3m0vaej3gpjr64u22hp9t8y1yfbgj1ddzj45htw7k7yxut9kfoeheu7cp6mfrkg3kmm6hkag03xanxc90bjodtq0luq3o23d0mrwoxfn0kp9wd5qzw2uwsa3ja7gdsoh9j19usobtmkfzzofiuj2mgx78l4ofy6em93cr2u73hodfxyfjftvstnwzwe0239gti',
                application: 'q4pwqu9poqnen13hm3jvzoowehd45xfgjn5yxt2pbgabounjuw425nbhd2vm',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'cdfa2890-b2b8-45f0-82ea-848e4939cf97',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                tenantCode: '3agsk9e3s0gefl34ip8hjnp7zfauijncmfockdtuma3euzemeh',
                systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                systemName: '9lgss1pcbfrrz7ccyk5k',
                version: 'anj4nd7fzq82skpgv5fd',
                scenario: 'wl75hjplot4r95a4cbqeu7wz1wjwcgsocc7jpvhmtdphmzl5c3xextaaz6zm',
                party: 'xpekwg5z6u6wo65d3dc8ejb0l474r530dx5iwhppo4kom0i3xs0vxzn5a189vrmumpdc019u5oure36ps86mdm4w5jz5mf9iu1101m5babnqwd8h6j6a0ut8wfdpptgwdf2mx9dxfmdh633tm2clflf54kh4ukqr',
                component: '7usyduf4m80udw4pp46nnpvl87fg03rvypgldgqgfhwo8slzf5flrfbrmhwkcrxmu65595gnfkdoqbngkysc3u7973w9w9eam3wyjgi8mmqwwwdn2jhylfl0mqe1e5dit3nxbekskjsepknj3c9s8zcida66llr2',
                interfaceName: '7jo5lqyqwcma1u2p5un1k5f2hnu45rkgoztut39gdehu2uiolnswk1kefrb0mm16wz2s4n51w6ffnu8u5kws80cadmp8yo0h1hhttttbgjsy1mqw0zwrsutlr05azpz8kezefhqm4eoucssz074a5qchvp1zjxnb',
                interfaceNamespace: 'yq8qgxhxfm97jw302uvfc7xvqb7l44ymzqfkn33rqqbkakqi4md95lachi29utdasvxuzkz4omsb28ypzb0ldz55tsqlk904s08y4x5y6yjchgsqgx4v0d66ul1gw4jjzvt7863zprtlhvpbldgq8hubr6py8b59',
                iflowName: 'dq6420i3eh40osdoos7uro5prmf8cjb9plvdcm40lz1z5dzgh3c09zavqwwpihmm3rhxwe7qmhytu832bk563chdju6shovnn165bmyggtggk69btr22g25e10nla4qvjkgdz5rkoclr4ceakn76nuoc9p3wfpi9',
                responsibleUserAccount: 'ddzzlwkmzde8y26q2seh',
                lastChangeUserAccount: 'gmd7cw3qd6pddtdf4hvg',
                lastChangedAt: '2020-07-27 11:22:55',
                folderPath: 'xlx7kvqdbs3rh92d3u0y9fmtcxv9rvz07gs2wv9uyk97lp4rq9e9swkuu1i23gfxerysajrw111304e4oppwn2290n1k2nwi4quzgb9k7ffrrrj802hy230o5m96bffxhupan6edlu2i6olukka4k5qbagrvk5h3umbfmsncqtsn38w4xyacc9o18gj98qqq32e3yih8pqifqhavf3u0s5crr8nyz8ef1210enims2k89c7v1aqhybxhk1rq9kc',
                description: 'ylzmp9udl0654gt2jpu0e1ikoum0xxngl5w5slp9h3g3l69b1dbuqqrmx09j6ibgzssy2g820qn00gsmv8scd6xpym6gnlfgg3l0di69zerzz9iiphi7eomfvgo1bhfdpv4yzvfi58cukw58gbsbjm586ukmod0q13lek7mi2xezgqbrbx1h10lmmigp4j46huv8gmxx86wed8eu6gfyx0lrr4fhgnbxlluuqozk7r33b926msxmd7c9a0bz82u',
                application: 'o6ezssyifenytsaibxcq4a10ogdyksfhs20km9tfbaeqrbb4kaj0ouzzveex',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/3b26d4e7-46c9-4136-bf7d-a85e2ca82c39')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5dee45d4-090c-4762-a557-5bb94e6c360c',
                        tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                        tenantCode: 'n9jbd3zdyhez091l7m59ctfj27myxb5tjkim6i2ghyd7l954un',
                        systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                        systemName: 'c5vauoncqvvq0du1tho1',
                        version: 'rdu93wz0xz52iprf5b6n',
                        scenario: '4bh1bgvngb9jj5kfhzfykltnwdckta50amaggbwhd31hutm6fb9vtng4ro4d',
                        party: '3fvii8gtvddd08s6ds88la7ois31362k8kjmccja2w83wwk2r5blhjuv5dwosausti3gyv5ygh21vo48hziqap6o4qrj5pck1sc0tse2bjjkccab520wzlnjrjjtovrolkgxvlwbt4qko7fsvj1cy4wgpe868h3c',
                        component: '1kx57cnezfbh0yxrhbaz6h55mqm6n10asc3tfnw4dpc8jkuy579ciah39eozgojzbdxky2pjwc1ofqo5j894uxh7d3jnvh83qylrr3k3qf3gjb83oirtpir4dgeppqqmshuqthi9xs9fc04fc754u39kocno5unj',
                        interfaceName: 'jhiyfvxqei4s2i4l4exto7lpaqlie76fz2m1hnnh7xrsu5tk1x6adc25hccbchdp0yy0ducc82t6n9h1xh3i7bryf7ldinisnn119cbs1nupdzstqbxnx50n80tw9tum80c5j0siaupt0ssvij6pxevsq6dzogyx',
                        interfaceNamespace: 's6rcixaqmo9wd9snhuu4pyaek4as1r7n40xy805suwm9qbdsxmc3bd1py3xl2vgpltavdd1tt8mbg3zeyxqxn1bdcese0p77to60mhlmfwvojxs2toixih28bwdlmhge3deov4liwtlqqzsvlfor3i6jmwtzh5al',
                        iflowName: 'u20p5nm79xdmhhg1y3lzbtygot6jcoptv0qvmcsdt80svp1nv73ch9fwuus2xrsl2berho8erom8q5axx3j0v4xzpj5equecb8jrjawuew4ks46c8s7hy2xgwr6wit6qmtzrwym6ogr66340r3kvvprlun15ldpo',
                        responsibleUserAccount: 'b8xnm2z5qx1bin2j7ikm',
                        lastChangeUserAccount: 'yy6xbq8ly6k80mcdrnys',
                        lastChangedAt: '2020-07-27 03:35:27',
                        folderPath: '0i9x3rv2jjatv8d3l2akfghyezs16tuccqwodtcejh698fqm83ormlj6zkfs5gzs8pvnghx4h9axeauo57am9s8uofjmosjw5vbqimyijptvun1ihu01azlek4d0pm0cwmuusz9fvj36aacxjnz2sl1ih20anmaqvj2hfi4626wzw17azghshywf958tralxh46got2tea53p34f5mw8onke5n4jvsz3nh3xs3iskgjnwx6pemxh4q8a5c8x6n0',
                        description: 'jxgi2loglcyry6o4du1bmvcgk39txlta7duzs408ngduw5h9dib3zfjcjx29m9zdgqzdlqkubaohluoejukwvid2dmdrz0pqdi5gpyf8sk3m5pag5x7tx66y5dsq8spnhx2reitbtrfpqjsgg953slapjpigwm7e4jslnsg81jzr8z1uk9cycifx8txtc1an16yl6dv4u2ow1x7jknfe408aoystcx5ec6l3sgii90j8l3y25661xfalg14nbr6',
                        application: '43z23jyn35f0gi1k0zn2oqmud4dja40zdt38qox1hpx7onqu4g8x9gev574n',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '5dee45d4-090c-4762-a557-5bb94e6c360c');
            });
    });

    test(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('3b26d4e7-46c9-4136-bf7d-a85e2ca82c39');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('3b26d4e7-46c9-4136-bf7d-a85e2ca82c39');
            });
    });

    test(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '165e9f5c-0147-41b2-8118-394fd170971e',
                        tenantId: '6e250de6-4912-46dc-b2ab-52695bebce1e',
                        tenantCode: 'i0dndvko5075zvnf3q547qtjhuacujlebpjhx1v6krizfc0czi',
                        systemId: '4fc117c2-03b5-4fc9-b38a-f487baa98926',
                        systemName: 'huxex1wk0phgazdv43tt',
                        version: 'fp37a8vm9jha0ofeen89',
                        scenario: 'v77se6bwbqf2aqft1veakc2dvl7vc7mladal2nlkvrokwxyoy90ai7w6q1vs',
                        party: 'goudedlf8fuuxuzqvaeeau6xopgf673aelxcra2y0bf9qs8qg4321v56yey6kn3xpzkbx4u07qrl3q3gw6wumyl2evynoi6xytvl4054ln4vh3v1mrxcu6le9wzj8cf74mex4svlm5xvl2pukkaa7t7hzpbg6ey6',
                        component: 'r1klm15dnn8c0ve00toxy1u9vyi3ayhruedo607kt0rz04q1k142bknv92uh70pblo6kopyz9nd74pw1f4tenrop6yftytse3ytswk724hv7s8qnqg23vh9od96zvjzckhoicfjhiwpmms5v74xxifsx3m7lf0nx',
                        interfaceName: 'simzbfwer57iypli38gfhz57u9q501t7d4w2g5ehtp6jcvah6x42j1nwn0ovjxr0v3ap45fxa0n3r5u3anz3venvtmv4auxsyq5vxdua54n3mg2qfc0ol2sv0aa1lmzidecwjhanjerqsdu2wphltbgser9hm139',
                        interfaceNamespace: 'cuy6534py08vru2g7blq7pfplmylcp6hgnp3y7qcxjt0xzxd90j3anpvwb0u0gd53kk90gt16h83abd6mfj1ria3xhp8ogv8758aus1kb24pz4roukxfmolrw927tbcx1dulkyc8xqsa7hqelnal1xm27vodp2ai',
                        iflowName: 'atg1u7y55yamtbjk7hwiz9sf3ylcp1hpzml5sz0s9wbfv1udydzjj1raw4f94qdjpphuhwvhoyudo2nt2fa56lme0b0z6ipp5nqkzmbjbpfnlj1h6jn16va5jk6w03es02pjz41td0xs1n2gwwwz4o1rgf3yu5s0',
                        responsibleUserAccount: 'lxrj71gkje5wzgvz4mnz',
                        lastChangeUserAccount: 'rczvbw9ijmwo9wcf880v',
                        lastChangedAt: '2020-07-27 12:27:53',
                        folderPath: '3dlc4xgghnxp121moedr3id6ym78pd1ggizdee05u15zb6ap4ahvb0i9dsbclnhff0fny3wbdxitajthhl6bjmcqc9ech5a4ke9ic8ng2u273d904wsfnhsf6oqrczkjksplffneog8kn1scwc5tfe0yligeg765ao20lnnke556cqlcp1e9rw0bh0zg442epvtrdfnxw802iv9wc1e3vy98qo9se21zq3brdldz7aom5v3s5le9dbtwb17v0so',
                        description: 'v3ga1a8r7fol33ijmzw5cfdyov5lk7g8qfu6zkqnlhli3ndvxz1d9fzwppy1qbs97c5t9hyj0ef4pk3yi78e4a60p1xfj2u7zgh5h0bzzslsq1h95jsh47nkkdu3mqcns873srl9gbk10mag5p2qb6rmpejn9lsp5cjaya5zqe9giu2yf3oqev4nqxgczwghg3lvigsnhf4hfgk8q6bvs15nfbi4v79e1oehhwfvbe21re1jyowbeyatqhvuyo2',
                        application: 'vzh9ul8le40zp7dwuvvk5cbjyfvim4zt9hhhg3akr7g36m7m3u64qg7fq683',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '2ef5e6c9-20b8-452f-8f7c-1a2766eb37f6',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39',
                        tenantId: '4867cd6e-c455-45b4-930d-ad6eb256d8a1',
                        tenantCode: 'nj41fkz26hxzvt740ramkqyyeqwysp57rwimn8mgp72u62uowq',
                        systemId: '485fc9f4-8687-4102-8431-b9d71015d8be',
                        systemName: '6lbmpkttfj37cf60ghl7',
                        version: 'zet0mxg918s38ihn6a34',
                        scenario: 'ck291wpxdo101ntidnbx6x2avo6u81s2o0n8765vatrs00evidzlmp1r3j8z',
                        party: 'fdalox873wa9v59yalm3nxkrkkwisn3wmls0pmafwkofo1uzi87hjio3nitzlqt25wgkm1dmawm1gab0xsmc6pi0xiv6sgwmk69rtj3nttcl6v7kvlwggda9lmj0ua1yzjzvub47vhgf843to42zcx5rsznj9drf',
                        component: 'n0pts0fd8659q75bf2n11kd4lpuyjl7yv23ue200u4asnch9wyd4aykubwjuy42ipcd0xg6h6g7socwuy2a16xycto3ndb959n6b6jboki8v8q1ylk5808cq9iati0nzjpw0zhk5bjxqsz4yotih8knx83kzz3cg',
                        interfaceName: 'pp6s6d73hm8io04i3va1r1gfrzhuot1qqfx08lou8mmurra7lsi1y4j9rcyc8sh95zw7p4lhhyilxum2o4vo6ahqq1vy8k6vjjoav710r5yh7xzb0st2s0t5gspq34o1y4m8v94s8gmqalfbivm3ll0dl9jcxfg7',
                        interfaceNamespace: 'gx8dwdam54067baxbljfkbwvpkn0cawd53beq5i30wy6qxd0daxqhzgpukbcw285z1kjel88dsl2dv7y851lcqmshjy2yp0mpkd81aw5qp79qfop2ptdmumwwuvy4ze6ytg4jglztygbx0yl5brfr2wnbzydpgue',
                        iflowName: 'fkgn6xyy7h2qmkvkli04r9vib11hs7n911wnif6k6rqz6x756rz72h4zt99tdynnqvdiefd53iq8ioh9s6e82x1zaxajwbzq81jf7d89nbgg9pt6zzz3j8iocytrdgsdqweiwqdlllw0za8epxp8e9zubk3n56qi',
                        responsibleUserAccount: 'wuhvxdk2yem81mhqw4fe',
                        lastChangeUserAccount: 'z3cenivle2v75v6qq068',
                        lastChangedAt: '2020-07-27 18:23:04',
                        folderPath: 'mio8nwunxlzdc03gon48fsh2jt9wjldn22qxw5yfvfee2vx1o6qw64wzf6fqwdl8wyk8cbq93bvd0z0gnrpo5xrc45c2euysycghxlkawg7vau2ol7nhu5heqkshyaes5touaxvvnyhfqh9ub6ht12i6srs8816za04dlhlr5pazpqoqg98cvl8nht15w94h2yim7d3xiygak3b36epuo6vcfjkj9l0jrg5ssvnfbzgj5rcme3z3slg97wy6ta7',
                        description: '52b9js1oe27dr2efuvhy0n989fgxy451n9gpx7iyzqguhjomi5lbbjahu2l64ajctimmx3nsxso76kaltrrf2fy7xiz7uugh6qv3q9x4kd3vckj63zdlhlr5usy15iy6jpxrhrepekksg8v46ylsdccq9pjfl8zju0dh8aiwkih9hd9cnbo2e6aapvojul96l3y5n33b819040538506q2tso0a902iw3zolsgbj0timrp4dfnm4p2dx1cewh0x',
                        application: 'y85u2xeteq8y2kd8p51xczttgzjcgqiuxp0kwy2sx5svotvews0wafx3v8ii',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('3b26d4e7-46c9-4136-bf7d-a85e2ca82c39');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('3b26d4e7-46c9-4136-bf7d-a85e2ca82c39');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});