import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/cci/flow/domain/flow.repository';
import { MockFlowSeeder } from '@hades/cci/flow/infrastructure/mock/mock-flow.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
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

describe('flow', () =>
{
    let app: INestApplication;
    let repository: IFlowRepository;
    let seeder: MockFlowSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
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
                    MockFlowSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IFlowRepository>(IFlowRepository);
        seeder      = module.get<MockFlowSeeder>(MockFlowSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                hash: 'un8lhjvjinztnykp812fuyx9ka1mgrhmktp4ufee',
                tenantId: '6313cb95-602a-4533-a54a-c4175e78cf9b',
                tenantCode: 'uge8qotfawcxopqg7a4bktalusu72ipe3jynfqwo2o4ein5c23',
                systemId: '4d5effa4-9d71-4f35-91a7-b2d6db95506a',
                systemName: 'y39x4gi9rqz4eutrr2cu',
                version: '3wavffvgx9eoik4qogtk',
                scenario: 'ex5t93pe4gbsdusd7rozhykh83uat9dahk2mxifkjjrez3rb2uf16uzqcnfm',
                party: 'ohxhgy8inxbf2y7j3emqnt249dtkj59aakm9echj0p5xr5zxzr7ht32mg3a28p89ubis3o53z3te6ve57rvblgsup08160umb8mqhx4sw7na60kngfzrteztfvcbpns703gq0jg7jx1jt5voliz9y2a0maq6qb1b',
                receiverParty: 'nc6qn7xzyxnk6y1y5iyc5g8qemcvax5yneiabu1dcmamwxu5lszn9903cdd0yrrl29f23b5321s3vxactkibbulheztzv45mo4m62ao1rcurvb1jsqa694ycesqhkqpc7j4az3ouw73u6rlsg9eucrlqo4lunn5o',
                component: '6spal41gtxa68h4c62t1lrzrp17ptbvrbba11799h4zd9tnf7i9ub4oqms72aoxp1jyvd9ldhgztaxlsq6imfixhsoj4k3g404af5p2n9e4le25m1xffl5nl1nu40x7tyfuisr8i4nzas9yn6to63g348imm2yjk',
                receiverComponent: 'jhfe6tockhk6oc7a5qmvbtdp0cs7xz6vki3n34pl0682pt1q6bu5q30jafrpwm4jcrkj1txrqoysmqcbz4a2fwf3uv1yku632n4hegqr7zegvxunzouylyhz4xjbywz70wh135qr9tyz6tp0vkf0t3cxilrvdp98',
                interfaceName: '5rr0saek90zlw3o0qudb1mwkyx37fjjqq7tcc91e6f9yn3aywqi0vtirv6kytu254wvdo2g8p9s0c49bkeqm76nn6x524k9ozb3p2vnb622bglutz0ht3wqefuoym0fma3t1yd30i5afwq1j52wr8bjnbl3j2bm7',
                interfaceNamespace: '6t8uo8mbh06tvxpq4q3glv904u8x8oesh6z7v4a0307h9dmik67lx3v5e3hm8eztcxlq0iubhjqjce020oike1mnwq2714b5pr5hnwbpzk3cmjb8a6fpwa4o7874qpwdctus6rvknfe8f7cqwjkdiwve7vu33r5r',
                iflowName: 'sh60q9satddyj226hqt07x8phfwhcgsq3ksxle1n9ly9uuw7o7lkp9dzwl07qwo205rukmz194zy6qe3n5906sr20p39p0lodmtojjr72bvyek9ul85ah46rhcypq9qkjlfh9252khax9fhiphkmhobupfek662i',
                responsibleUserAccount: '0xy4aencwizdafyk2czj',
                lastChangeUserAccount: 'fzs3j3ohrd4b59rb9v5d',
                lastChangedAt: '2021-05-23 01:43:25',
                folderPath: '45pweyj9ujznoguidqwyfv88zxtlcrd2zx471uodbyv9sumiyltgnsocif3a7rxmqqq16br0vulsj7fgkt5u0kn0qz5jhjoinu8yy8cvw3mi02milkhcby28kl1me29gr3056m92g8xppjuz6t31f8bxkbx37qvregof2yrmkgg0zkp2z1wr5u9q2f56irm6dehunflb4aw2s61t088n3dyujtrbge34t7i66k313zed40kg8dktab3rqwm7lmu',
                description: 'itd0zm5bp9q4p85cwq6pdqjbz1oa6t2ci5zi4y3qnoweexs8y41maaqh91t3tb5bfsrhtmx98r7lixhwu03t0r6fyfab4ykz1omh9lz2lqonc6792f85s7j7ngr39bsizjw7y56acgf2cp0eho5rianaamtj7i6r298e60yv23jgwxsjxtggtss3rdd082u6p9bvoxl136xjgtqu5hb9fbpne4ht07d9lzrkct1j0icu6ez32ynj87nxu42pa3i',
                application: 'isdb9kfnp1vl2a3xilrxhlouci4q3ecuc3aaglc84ts9j63r3wh27342mzld',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e1a41ba-db1c-477e-9f2e-32ee23b5eba7',
                data: {"foo":"#:ZX:D!CZd","bar":92137,"bike":92036,"a":"E9A(p/Zdrg","b":"dn$Gn5GGTp","name":"*QHs6b=q>D","prop":92815},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0d37af57-4787-443e-babe-0f59f5e38d1c',
                hash: null,
                tenantId: '57205245-d3b0-4b24-95f8-6dde9df3b64a',
                tenantCode: '2ws97gsy43jsbbfchnfngmesno86cudmjh1m7bwiz4sxiu8npg',
                systemId: 'ae21e249-795b-43bd-8429-e33c69431ae8',
                systemName: 'uo6v16dqiud6ovzdoxmz',
                version: 'ljrf22xyqjxg1ngth7hv',
                scenario: 'zgjn4acqwpzf0mzd7jo84yzq2phfcm5bgld79led78gv8us9tstpfcmafdd1',
                party: '2ar8tr5rrwx8fx32yflgv540kwftuz085511j3yqocmkjwx4z2jsvyryu96sow84er0f5gibb19kri1b6r6doay1whk0ow15ye75k61yk1t5f8ziqz1skkjiprk3ooampkckpmcjtzo6l8hqb6vulom0mddde2zo',
                receiverParty: '22r7f0ybfvz2p241srt8b1h91v56sn4efufsvdypun3ameqaxbwrsl16np56mhlnm9bpnbqlvrx1fv0no5buq7brimomumidel2icso81mxdd17ws1xvpxy79dov2t7ppe7umfkyz0xbyfk5j8cz9dvipokliz8i',
                component: '10obpvtlh7d7lq7rlmje4449jmm88nfnbup4gn692355vvcwmjz07ds3x3s0wpu1pucdkna2j0bdacyhfk48dtxd5zt0z1y5c4g8oz61z0q5eapmkonk3rp2fzhggw7f620buah59vbdzdbaybhhni9sjk42wpzn',
                receiverComponent: 'vtjkb14dscp3bwbegu4gog3h4nobqk9f1wvrfac9x4k183yl7ki7h4krb7nit3rdo6esqwabhrxxq3ebo3v8ij2xzs0aww3lmdve3yxrmih03l1duktnoiru0wizhkkgfikcdzyhp7fpiu4q7sdkpl3khzqq7xrt',
                interfaceName: 'eqwuiibigz758a6i71jharcz7rm2rw4gkbjupdnz10b4zyz64qa9re3958lisbcjt631ds0ih3yq8pmrmjjs1t61t16crpcprjua7tt1bb47od16rp9kdzzk28qap3t0jzaxjef0or0bcg4n0oq3iw90mfkvvtlw',
                interfaceNamespace: '0c4w049m33mexxs8o5ulqk2wzshxwalxkoeb1b0cuk2t3zlfh821zao3sv3qbnki738ched5fyscivsd7qrfevp2p9cvtigpaw6r4rnauz50ughtur3wp4y3utm3n1qd2gc29z86nnim8cyudck9ewbe22n65ya1',
                iflowName: 'yg8ri7f3vlaq3vmwf9q8wrb2l0xh2xabn5elou4i64p9morwgtq99v45un1l1s8wbcvzjkzkp4qnuebyc1pmvve6i5uvfr3upluh1hn0d4qkf7od7estxlm4p3w14vdp1pf54zshzndtdjypcbnjwr6r1bhvyb94',
                responsibleUserAccount: 'yepa890tqwyu5wv7xhku',
                lastChangeUserAccount: 'skpra9lv2k4d5999b9em',
                lastChangedAt: '2021-05-23 02:59:31',
                folderPath: '260dekgx1omez31l7sadzfjnrrahka4a9wygyh3m0rr01skwqodx8nnw8b90tzxl5lcs6e97g2bxm8bz9un3cx8lafengllu6swn0gx2zi6r41vh7ytk0wa0xpovq8vwlvuhzijokfxdoxcx3lla0pves6grrof574hf6lhvveoalhkpgdk02iotrxwk4hwb81uhatyrtejh0gett2ifgxt7jn8axpnl978w5lidefkbg04lgxbcs366uudy58p',
                description: 'kksfiebx8ypzsth4i3py8s2vie4a3ry9xwkl05t62zsbn2ga4gtpwyq5jcdirse0redlwy3fnjsuis35ndicwfwpjj1753dmsgkm8yu8mep6crzzdq87tudnnqh38ntpdr70azg48d32jxr0u9n7rg7c4vmqsnsnxugya908qvfw2n4uqmxgt7rx608fp8oz8d3ispwa8ciiamudfdfyoha694nzm9h9z044lgqkxfqztkwrvrcseinyj6uoh65',
                application: 'el5zc4hgji1hpov6ud5x2nedaeldm29j7xh5igl5515bzhovpj34oyugcf35',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9c1644d3-028d-4ca6-b59c-4f0220262e40',
                data: {"foo":"k$jz67\"1UP","bar":"8P{O'oE92a","bike":"0M4_T2_Gs1","a":51827,"b":81035,"name":"QH#2T'K|RL","prop":"HL*4I;(ZI*"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '68cc16b8-b510-411e-9b7d-2ba20d731d58',
                hash: 'ftzh26oq4atvuq255v48868w733zk97p3vzo3m32',
                tenantId: null,
                tenantCode: 'shp4ppsotcm6gtpuztu2rffgb9s3juq5cgm5lj8j25qv3nmf8y',
                systemId: '95c6ea08-4893-40cc-844c-455cc8d0796b',
                systemName: 'gowk6l0h3nju0fzz60ln',
                version: 'h7vfdx7ywdmmbesmz496',
                scenario: '87ldxp7hmx8u0zkk5eopy037s6kgyi6zpxfrjllwdn9gyhw09tswkdpn9r7s',
                party: '1bbt0mfwdiu262bixis4o5c0u1wox67r88jm1yr89z4pl8ppcfva4n28i1gjzaxt83t7h31b5sclpmnz2vm9ralkw4em601stll9guwez3f8wy7e9wtnj8epl1wf1sdw2y8rnmfv1w3rsmx4339psbdmi7x3rm2s',
                receiverParty: 'ebabr9lx8kmp2yqmeib49tdtnykh0gj5yninxvq0s23witxtcb6ry0iv8edfhz4ckeoj2hntqlm4nrtc7jnz81nv3gbe8mpx1eykooe4y746f8ml8ohc49kji5kqe69haoue6o6lr18uqjz1p2ebr5ffbb5uww4x',
                component: 'kuaxmn48zhb8q8ne83rbyvkvaek6x7h7sjehdtrur9s3v4k0wt95nwf900rwxtj1rkfc9sqdon6sklrb3h7qqo9zuysv6y7ybqzxs2mtgdknr4bktizovp9x5bwikcms1ki93pyy8rsyyq3ezjpcbqvmbetzidpm',
                receiverComponent: 'qvfwekoabaicnh84yd6t62wclinq6lejveky6nvn3osmsos8gc59xgl7outb8x0sugs1p7eyi5kr3rlvlj20o9qx1a66dknmzjy0odtm79kjvx2r56gqo01mf9l7i44l6f7ljh4whomdonioxjdrjcz1tiy5etdy',
                interfaceName: '1c593wsgtcd1pak7j3bu1rfwllxhod32t7dhvt7kgs7si7bfvy334xu43c76z698chjcn80vkr76r2v45e8fqby3zvfyg0iwnisc4a7mt4rhbx3io1duhx201usqxbcabtk8pz1yjdg87ttznnpl5ketaloi35is',
                interfaceNamespace: 'm10qz6m6kv1ofd6if4of0jn2zxnnq11vdcqhm8gxihzk5hgdw6oppv8osu03rbkdw3kvpa1r6mnpnha5fn60i1f1i9rgibpuityhh5496bixbg809j7ji7vpgkag2xordokl4izad2ut3k0u9eq4bvnzjms86t4d',
                iflowName: 'w6xqebc0thp9qls5tylkct9rajw3w6epqflaz2wzpq2dfdo6x980b5xnkozokm8yge053zhqeukwa3gnvjli3ajv338opbwwzwug5a8o2qr6ao94n6qf29i61z7htthafiv8g5k7neq1kp4jqvmgbqs3b6aww81r',
                responsibleUserAccount: '4b36m7bynobqsdxjskcv',
                lastChangeUserAccount: '95z5cgqvbtzxc0bl1k20',
                lastChangedAt: '2021-05-23 10:03:51',
                folderPath: 'yvw8v80icljq5wyrotx9zrbqxnpc81rina2vl5msk8bxz2vwvnycj4h5g4tovps3xmt0cxsauaaqg4769jhjqftocyaurb1gd0nsl51i6ldgg1zy442xhd9iks7iavgf63uwionzg40zwv8iiztkuoha9851mktg4evyo1doehna8i0xayuwxxz4dbe6invlpvfgo0z1vsc3dx61yin2wsntcrsylza9ipn1ph4s4509hpg3fn3f02zg9fp2pky',
                description: 'kw680fpufqkv5qmgt2pcdj9ld1lgvtb8mm1nee47nzvt8rjzc8rlbzke5hzbm0jwka9gha05iyrrlffwjmqv7k9mbwddxtceje7r5d1gceak4f66bbyv2t1b6fiy53zo4kn50ykniw9uvub39gapuad904hkoyrbznyed4zbvz747wmqttp3d9nxo29dvnx39okqymdybmellsydy1vxtmpmysxzw5kaglbq45x2qhk049qfb0h1r1t6h9vvoft',
                application: '2f1b1b5gqs0zpb0ufduyre9geoy8cs6f80ax9cxg2wljujv4ozf8k0cm3uf1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '120019f4-14df-428f-88dd-6f1c2f32c603',
                data: {"foo":"gLE$O]EzJ)","bar":"${jl6Qv`pm","bike":43366,"a":"JwI#g@t\\{y","b":81162,"name":"M{4k-(LPr&","prop":"_(5-t<{nBn"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2aad288d-8f00-4aae-b85a-7aedbd24a339',
                hash: '6i25dlrrhidgr31n2fcmx144l0r10sxde81rg44r',
                tenantId: '13d7a101-26c5-441a-9fd6-58148595a4d6',
                tenantCode: null,
                systemId: '698745d5-d62d-4daf-b569-833c4ec90303',
                systemName: 'vm4rmgchrj2a605fcffd',
                version: 'tfb0rxeyo57w05ptq0hy',
                scenario: 'pzuv7ke2rrl51wg744r6qn1jszcxhvtzzmlh3wfw9glzle7jcjtj7nf8ljba',
                party: 'we6edmbohhrfjqgjfhneek9yxz9pxjj8shtlotd02kgdbzjs164xsfe7rp9ilekkh04erz1say0qmhi206r1ywnxrp0o5dftc3rt0ilt9dgf3gq978ylzycvtmodmdt126ljdbzwkxk5bq71x9m0th6nt4pvryh6',
                receiverParty: 'ld5fjm2vp99i9byne8cdcpiz2gsnwn3setxbq7ra6yyw5531e5q3xbs9ls4axx5nxm1gzcbqsjvmlpnecklezs0i23mybeqkyxcxbsiny7y4isfoyi6mun18jkhx7anfasteyvwv4q7w305nt4jq8yfemmztn4ym',
                component: '53oo7fjnxnqux7d3sx81bstml1mbmp40vypxbl91fgdahs7g7mkhr54t1zpjxzss5rfhdqkcra7rdxyhy3qxmn0nz7n948gnxfmn4aekiya14aju0aso1l9xh5dslbk9clfnswva078mz4tlt9e7h7yudh5skuvs',
                receiverComponent: 'awxo7zyjv8wvcqh33iv8j508wd89wiuxlld872zvarlfgmxk4tddlv3kuar61n7lc3tnj1dccnyyj5ujydb43k2td4uejl2smlgsgk8kzwnlugbib255owg9q7f2cffed7ikwkqc4i0ux1owrv3bl8zsiy0npn2o',
                interfaceName: 'ad80u31hmco8fvkwd9cfdrkaz3z4ea4tg5nejwtd0ev6x0zub4n0il3bo1nzcxzngq2lv933nrj4c4n4q3makk2yhes4opzt8nf5uh5aprtgi1a8z86htv7es1j74rr3o588ny4msrgg4nds2alghwc7moqoy6k6',
                interfaceNamespace: 'rems4tt6rz0iphk46m4ngmzj0r3u2xn13jkftebc52rnif0l5zx5jj9m5dej2h7xsbf4t6pxpw5ynnigswmch6x0usl7xsytec9zaspc2zz195xz7s5e1r9rj08wtcde71u2w13qo70dir31hx3wr3sdz8ojvjdz',
                iflowName: 'fa2cvowm2gnv53fgz44ysg9z1rmx66cjuh0wp22xrsfsoxp3fb0r4prxmupvq3xzvvkippe4q129vlgwkqv8gun4irarle11uvslkkwbif7d89mtooytoymem8fc3am8n4v2ytwfjxqxjp0dd3h98baxflrd34t1',
                responsibleUserAccount: '12lghu0cshiwencufa1n',
                lastChangeUserAccount: 'q0l9c6v4bkss041zcllf',
                lastChangedAt: '2021-05-23 16:41:38',
                folderPath: 'n303zxa3maf7r7u84lfdcr3zrgxkxylyh62s58zgwv9jcigkp5wh94wcvjryqr63barskqttz8hiixiregwcovl89bwx4ckor3qrirtd4zbvf9cvl5qoi4xigboudg5i6hk9ta1nfhs6rfyy7fjg0qpolq8dcgw55k4nj06zsq4solymr4gvtjv5xjgdi62k89vw4h43713s42srxzjg2c8gygbaqkuq06hts9vbzvwieejvb7h6z11w3gv2kmo',
                description: 'lsivuuvf3xjq7mpz8s09hucjdyb3jt1q7rn9eq2ek3jrndcvet4osfv93khy6odgogvhv605pa1zsmapynods75w04zepmvbkdq0c5nrgrh7s36tnv7cb9vuaox3q5t82qln5fht1fnub6xhf22lb9ipaxagnn2479ewskipnniqi230jes627o3ab22wjyxg94g9adkngtyr8tzo3udifv2qi4jy0uiuhnqsexesuatshgr444zodiyeo7ouhd',
                application: 'o7mz73x651y7yojxandh421nz6yuud4vkcpvn17l6pp1p1qhfv1d36oocymf',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'ff3faac3-d308-473b-978e-20612fea44e0',
                data: {"foo":"/}=1ZALgzO","bar":45851,"bike":"T$VFJzP:{3","a":"^Z)>-x'*ed","b":17814,"name":"mfZGxE#+2U","prop":35976},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8280b6f3-ebc0-49d6-954f-668d207684be',
                hash: 'wbeeesx18bekm5joihw2ig10ti1pla8morsns5ai',
                tenantId: 'c310fce1-5998-4b15-bd22-840ce5674eae',
                tenantCode: 'it74icj0in5uyoy8eapzvr9gigycoysa2wgr1yxq8gj2iefj26',
                systemId: null,
                systemName: 'u0o3p0q4grzujh02262a',
                version: 'by3bd3g0jxb9oa4260tj',
                scenario: 'rq5tfm0vspjxq1ag555cvst1qis69sjpjv26kdmw4zlm5xzvqipfsuz7288d',
                party: 'ou63rt1bbpdbf7fo9oc9doqohxhd1fdj9594bzk82j3qpxd212w4p54exm9i7rti5mxk2a07u3445kts1yf5dh4tt96qmvqnypa2hw59idjy8npi16lcnlnjah4d58yaakomkidbse3z6tva4pbuer3v72ddvk9i',
                receiverParty: 'o21f8ds6onnv7dydp6c90yvbh5u2ewgas8nxudt51xdqq6txgell8kg7r3jim2qmcnm09pgyggzmcq4tonxfu3tn72oyv4dkfeuxad4ny5u00rvv5k995f3xuakb75ampasobnoaeyyc4ett7d87fq1eldd2buh2',
                component: 'ntaxs29w7iwdb5j6r12g2wodhmblzu3v2dvgkqhv1emwb8v8ax5kizyrt4ffutcqckcrzcos3ccff7126iif3c5iqt3tt6yke7zc7xwhr2b7l11336m9gcfz66qfbci68ziegxzdbm5ly0s9g9bloilh81nv62n5',
                receiverComponent: 'c92gaa61qho2jpsnvlwp9eug1z0kl5kuv9s09wcvov2t7j8zyaqtviwiybmmh59pyh39zvxxal8j655puq82bguyb7e803f7r2ixrmxlv6yy6exkjniz2h6g2tb5j5sed2y0gm4jr4hiuz5sktssggto9tbtglx6',
                interfaceName: 'wsopduedd6zeq40waakaxdz1x2a7vrtmgkdajqlni9wb7zvyoucrpfw86oyqk99jblwbobwpuq4b0jtv24xkh26tsa1zpb4qhudgthwr1fo5lhhglc19ur9o7go1tpr5vvwom58rkoco4ml390wzz3n30oyuinfk',
                interfaceNamespace: 'gn81bj2vvayff1ljtobm2uh5bv077vuz917da4rkxvz8jcttxzxfvnxng5dnslpckq74z6b8ao06ogkmi815bmmfh8t0xbn3xem3ilx0klciz2rvhjntq8nup8prqt722zi3jit6i2e5pw05pp344yvn97bugx43',
                iflowName: '7zi40avj9fpmdgcw8h7c5jyp6kr6fhqn987sbmyf6jr38z881nhij5e730m9o1ftz4hg80gh3yk9mt3j9lkod4zw66gx7p5qu67uextcpei1dfwlw04l9yp26mxzhl35arz8a1ineoinp6p0472058uc0dfpadfa',
                responsibleUserAccount: 'b9a6ut6zlxvt7dd3az9h',
                lastChangeUserAccount: 'o2rdefzb7y6kohlm0gk4',
                lastChangedAt: '2021-05-23 09:38:26',
                folderPath: 'gfarmzfb6syh0z793jlm90w4gr8qu7039bibthq53gispjocunjhbg9i99kmtnqbvs5fcb2nthwk7c771dyo4sqspe0no3t93v7kbc7hia7tn075wmefemsbaf1yedc4z80s9a7p24y2h03yb4ymaf7t89j092ua58q3h27tnr1wfils0kh5uv64ntnouf3jp8b8dq7gooqhfxo91tclof06qeuaqwwtwcy6c919pgtw65kbo85mavrizmmubky',
                description: 'b8a7kcqay50eh5hosc132yynjnhppdodgidulxe5hwvh241nr16ddylwfrzb1079sftd2csdrzojf2kfnvw9t5mupxws4fymud4wmjezwgty60gpkuoptsenvcd0bzoa0rtblgr6oe29u1c75ojyra7c6es8emd1ramgn79c4li42ly0ob1dlbviwczy2151g1317e72hkjy1yyyx4t8n8q4l5qd5b62m2082a4jmyvmosfa9r2qvfbax4w64lb',
                application: 'kb11z37q0w563u6flg0ecvzb6cyoowjnu0msw54xz3jhbobqbb1wkku2j65m',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'd5fa4845-afb3-4863-bb25-fdb34a4c74af',
                data: {"foo":23908,"bar":"XZukF(Xkoh","bike":13515,"a":",mKMGQ|DCs","b":3632,"name":13673,"prop":24097},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f455ac22-54ac-409e-a2b6-d389744063d8',
                hash: 'go4ovggswnh2anvlzc3v2n50nsr7957qia1pyh6j',
                tenantId: '30ee4d6c-dd37-4597-8767-9159252a082b',
                tenantCode: '357sth9sia0j0eri7frs5twt1cg31testv64r0mr0bvwtg8j1f',
                systemId: 'def3da7e-cc7d-41ee-89d6-8050bc3a3614',
                systemName: null,
                version: 'zx2w6hbm98qnr9pskoi7',
                scenario: 'j8qqngt57mnio9gtooart7jx3tyu90c80xfyb5eu7ok7ag6zidkk35trduoa',
                party: '4h05orhxbes7b4xe49nqzsa6azbe0rxwtm6iafrskwde5029btt8d0r7x6zntzdrplq1u911ymsn5unzz3sp4jnsdkbml5i905dqigrq880va6u2gx9fc9fjwfr12uxszzhhb92oqfuz51qtloxvhdhts8sgjeav',
                receiverParty: 'bax3ckvg6v2nlzr89vflpmj25p8m2kgq2kl8h0vl2tyw7e4sy7jqyucqw5twfi0lyps4f8bsg1jmpgcxq3n3w3c3zv1aqt000w5nv5am563qkt6u6i2ooqkvvf7ccf6cw6x416b2qiz9unrvx4vfyaqnxv8gtwoy',
                component: '9a42r0wbuvf0i3os2eite17vz3pcydn5aqr6ful16lp5i31xj7rw9on9ggula9ktxgcnbdmrgfoaorcdm4cu5ych0z5k5majs4cgaumbpssbjyjw27zgtdx4gmea0zp3w259uyttxn5k5i54nqy2no7rjmgm3etx',
                receiverComponent: 'blp3cseswi88ev9gq810r87uleysbj8o0yyedari5acxdukh3v3ek728t5jwg7ye930zqz2dad7d6t85njcjh41axm3spcd4mqh440xgqnlwua3cgmejjtpa2u4er6mu49r5x5ip32lihb2h1wm1t1bzkmu06kx1',
                interfaceName: 'i18d6bfm4v4hd7g1on6mg0y4cem65ifd039flzkciqtjww5gpl2y148f24gqgdyh77at2pm5078825ee08ru28hswwpo68up2xhqzd5yfypa6701nhcbej2unneujkgibbpct4ztawsdebcvfblvq6eyqz90yvqe',
                interfaceNamespace: 'gx8gh0xdszlikqgsv4ldz07t59sf5ysnxmo1kch5bmin3rl8eh0ktlpduvemj7vpieq2ezoe6ruvlrbt7lkqkha5rcvga5a2ur3sc9mrbvdqhlkc8pfhlm9y8fjtrs1x8mpt7m07vhjbasmey4aj18dudwyrnobx',
                iflowName: '97jd8ia8muie3rosiqhwvrpb1jikcg6n4xkokssobgpspf7kd8h4m8p3t466q3bcc4jwefsi1pvo64e3c6cx7wsvd875fscmpomdxyzxfkmmzqzpty7ap14sqt0dmcuti6p8y3t4kqtdoy6z4xmdjvo08rsmitaa',
                responsibleUserAccount: 'ochiyvvb90rufzdgrql6',
                lastChangeUserAccount: 'kb8o8ilzezjwwoqobjws',
                lastChangedAt: '2021-05-23 01:01:55',
                folderPath: 'mw0elojhkx5m5bfponj2ufxpcwb44hsg27fan3vaiwm3jv402n3vjq2w131bwxsieetigr1j1puqnrj7mu8kogymfoqpbv8c63jgwmsxtmy7d20sin8ud9h00pdy2octchs8on52hrerltea1r1z3kb7wr0s1xkpkuz2uir5pnlcxqriy7d062yrzdtfpn7jmk56ohsgcklws0ejzxu2d5d17fc0bxsygfvdtxabvdj9t3jr1vwfn8jpqd9b8ht',
                description: 'p60qylh7jwt8ip1c1sqry1gi6s33yufjf6w8cl5hhj2r4gokdya95rue7m9z4sbe9c5lxrp0u4aby8kqaboyrw9zekheanhg3vlhh55vysmoz9xzkmwnz43zfs9j2959b1uvslbzhe3zhna7xi662xb7ciakbumtwme967ozjuso51tgrsttv5rox6gy845d29oh4bwgrf3zoystalkkhburt26hzhugcf9mf5mkyf4zgt6r3kjj4dvi7i6j1sn',
                application: '42m2o9pdznx2xkx056xajjrs0vzu1gsua1umh3t3u7e7c02ig9qrg5954b58',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'c75ad7d0-821d-46e5-9eda-a621567cc150',
                data: {"foo":"yrWh]g+q2a","bar":"B5dD3`mX3@","bike":81651,"a":"&+$@!6\\pOr","b":92884,"name":"x(An$%oHi1","prop":22705},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '64f8091c-5a4c-4c65-a3b7-46d229e9fcfb',
                hash: '98056top9jfl6m0guql9qqmapp0al5eyo7eojn32',
                tenantId: '4a9217c0-4a9d-4f18-b6af-02318329cd2b',
                tenantCode: 'z5kz8rz1o6ys665v6qjsljm1c1mdg5qyzez52f1lpcwfpr3p6q',
                systemId: '15147ec3-e3d7-42a0-80ec-5c9f90f33722',
                systemName: 'rzg2zsumgqoeee2ielrr',
                version: null,
                scenario: 'x03caci6xlhfe2up83pn2u0a64kfmqc6gzzwbxtmtibdpuq1ryfdeew6u2m4',
                party: '5rwg7lp1lifzzm9s14567pc5q3xor7h92zsibrtl1dmoja904cjbm3ir4k9hokqd121kd809fduri2rohs3wm9ljxa60n0acz5llqe9wml8i3xli34c9wn2xau21svy6sg1esgeir34vvxamox5mp9zo8ot1hggd',
                receiverParty: 'o6dtzs2to87nfqpzui61fhh5ltq35mdckzn6vbdh0td453uedwqleuet8afed660d5zjazpf9jn217md52rwf7ql9xqppgygm6khgp3pknvy7b9c4nd0ejp95ousc5pftpmkwoy61iqf9ew9xfxe3jajv6lzu2u3',
                component: '62429u9rnkokyvlunztn36etmob5af0pkm5onazgy25kcxvoqwxpems3ftsqjfqq932k9tpkxyacn3sd1f9zyg3ktsceq6adzxf1v82bvyz9dwpqmfcl2v6v3oeqq1qyw9x4jht49six5ie01vxpn7x3wpm9i2u2',
                receiverComponent: 'yvtrbrcbxgkpyu3q5xho2qysz0qt5z2wvivuj05qc9uops8kdpe98yf38e9kz0xapcpslqyp08hw6hp1emn5e5yky8kts7g8rfuy35r3fus42qp6pv1dxvyf0syeucitgysy8nxy8vafozgp1ba0ew4j4qrtd1y3',
                interfaceName: 'bwlzlvuthxxahvvlo4t66c61mavf19382b0vp58l5ltalvr26g3jfupw6hqiyvderc3v52mn96jqoldq01ibes1eo691ouyfy9b3nycxp00ut1cdil67qw1v2hu78vv2z6lvd7zp30rd0aqthebsyorhpjwyp63e',
                interfaceNamespace: '1tmld0w96wxko26r239yyfn1w4wpv4slo69a7vpv3r5akj83j6006qx95zzckhhlt5rf3obct4hm82pinhthqq4y774v24hperu3pv2682rsuf90rivzxqvimsgig56r11qz319wanuni8t3h0gwc1wt3wzl3de7',
                iflowName: 'dk8f6g9tq9udac3yfiwily0ekytxf23ld7wprp1ly5o0jymtvtr9xplo76dt5hw7464wxghdaxu8vpun29pze2j3dfu0wx824sca8qde7urpwplfz4k1neco43e04pepi7kil80tztf1dki0gjya19y674bg9qcu',
                responsibleUserAccount: 'devgjn720pigf6ni8pms',
                lastChangeUserAccount: 'fu55hunh0d1avpm5qro1',
                lastChangedAt: '2021-05-23 15:27:03',
                folderPath: 'vrbthgu98b7j2nk8c4w6e01shnb4ozu4yjrgb6nw7ngumv5g0dahq3si55erybswonygmz3tmyirvfe7hs7vqdzv1wck273qvzj6dto1f697b10cmr13gh7933xd6tvw5to68w9m8cas0a4qpaut9xelaytfd1qeryxah3t386w4lak1go5k3zjf32mvohdod0sax3urdu45u9a1334v30we9ttu9h7dlqfwk0kqaxliuozr4on8s09i0rexgwk',
                description: 'hl394qftso8941ycg2bofwoi2mpeokyeepuqk31me1acmga2932zel4mry0kht3ncw3x6iiea2m50gfo0isgi6xjqxrwomfg3jf2pejqfg1j2rz4ogxzr1psgnun4v4aphm783pbbh3es3ua1sr5i5dbdyis2cvknui172xy8ezzobfjs8uma3uotj5gl1llfom7np3t2a1zygnan6pijmnzloilxo5mp3pes1rrzdwfnzm0wcr70ztlx3aw1u9',
                application: '3vnk8kko3qx6dp6jn6piwq93fxfafolpaea0snj9xvvpqgw13xzep4op4y4i',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'b4bb39f6-285b-47ed-96b9-62621036013b',
                data: {"foo":42533,"bar":42531,"bike":"62yA]jh+;4","a":"M[T%[6'Yg#","b":"JEt9,7ec.0","name":"NfP,$8cE]]","prop":"=$A$!Y=?,e"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffe2e2c4-a3a2-4f4f-b6c6-3e5d622b474e',
                hash: 'zpipqbhrh2fdjyuvhrtvguwa9akm3p1rjyfykg0g',
                tenantId: '09231cfe-db77-4cdf-9abd-f53ec2b9a43e',
                tenantCode: '3a1pvpwixblmibfk3o71lnlat3m4sjsk2aj5e3l8205gvxktku',
                systemId: '27a4da83-7f0d-4eb2-9bfc-db1d092ac075',
                systemName: 'wvqkevz6zuhp4ymy0spn',
                version: 'flb046aehheyll97mgjx',
                scenario: 'nv0qye1qh46vukk9glqq4obr6qgawoabxymokej0r5tb5gp39w1cq9kvby9i',
                party: 'ih0hngdouriffm8yd6gj2986p18ztifmo6wxerniasahq6n8yt5oy4ungji73sfmfapcm0o3bvvtsajoidal40vpa71kmihej0z0qxaif3ymmg8v0t3l6zgtb4nul0mgnu46l82v617sz8k7h5k5ev74yo4dyjbw',
                receiverParty: '406tmzv135opc4r9363zyteuulm4p5a5s14kqezd21h98fiahrby6re7n2f7bn9kj9h0mxhnz2t2lrpgs5v7jt5v1efpj1oqa4b8w9sj0alw0x5jtgzzi1rk9fdxlboyp0chhrpprngbzs25qzy9gdxs1d23ippq',
                component: null,
                receiverComponent: 'nt3yv6mi392ijfyepnsf5t4d1gcqygtfknxgsjdnjmqawmfhndeq2ugz3gh53pc7vfwslcppyh5lcy8efy5rb2d93kucbf21cipyuu6kwyqcooufcp7290neijuypw2vckya76gykqqcg7tplrzcoyj43l6rie50',
                interfaceName: 'en44ou9prelgo9qkzhz7dwma4vsagjrhqojt8d6uaz4t9wg8fylwll71mec272awexo6urut9vsqez7s1aer8pf6ekmsu9pqly4svppihcq13ohfe4ijt8wz9slh8bn46vw52zbpfen6he99s06zq7j5d1xvw2t3',
                interfaceNamespace: 'dizhsv3bihwtcfpapbgz1rdpmb8tdumbdnkmsujpsh6i0d6ziqdyvw4m6kgyjv0sz7z5gkk9aiiq6oibg0ild7otlylaih5f3wkrv4ccxwbu1p825szy2g3zcub2dup2uu88yigoglffarlg3yzn7wgk0catmnbh',
                iflowName: 'j1u5cxudaam9egkk2ieo4jdnd2wpqs7zqb9iamv5nrzauvf279noh1dlben01v1fhl4zjnftjtfw8p3x5authsl4ftqvsxdq143tlctbs4ewo7gcugucdtfze8vddvbapqy55b4m84xcoieh5wscla27q8yvizlm',
                responsibleUserAccount: '9l7jaco7amm4s2o7pi6u',
                lastChangeUserAccount: '0kpsgyo3bfat8501aakp',
                lastChangedAt: '2021-05-23 02:24:39',
                folderPath: 'wt16q24v0pjke1mqd6llkfgx0grapwq1vbm59kzuwiu8mn7reibww8k2p8dkh3kyqt3tifir5htq8dasj7bh55js47we2spj8hcdfwuxdaewoz63bqroem00dasv3iohoqqqvie8346ukmb80xta97wlpvj1i0male3zt0luv45vlwoqc6lg5u7rau2gfogido2z94k3ymln953alt8ajbspjoi9shhkote2gu8gbxvqto4r8vz3v0bba0jowh3',
                description: '9xfbsjsxdjlf4de090ge315bra8s0gtdukmzoym2a3dy2xj0r86xl52939044agd7ple2s6hnm5a9xz37gtcit33u3u467hme9769bhgu8wtxrl9gwrm732r5ldbj94d59gnugoh02fagvfqxhwwa955rqwgqrhdgbpwqqm0o0jbwhqz9zj0cs06tgt71za83w4alhxpny39kjqoqxuyv0bttxo48bii1zmnvaj0oxdhjkc3o3uajw5efjo9p3a',
                application: 'fjioielki1onygjqgis3t3irs6ryznmu5u02q1axsnyfaymmirryty1y70h4',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '393ecc53-4915-49ea-be81-d19ae2a9f487',
                data: {"foo":"'GK]$!(moY","bar":64091,"bike":"[,9mrWX;t!","a":33710,"b":83539,"name":43788,"prop":96075},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'defb37ef-a4ae-4e3a-90c3-17ff019c4cb5',
                hash: '37v8innd2fety23691hetnut8hwda25dapnnss3y',
                tenantId: '0ec997e3-085c-4069-9532-d8e450f7c392',
                tenantCode: 'pc32hn5luxtmak8hzxm7vj7tliea2xpjwscoq6mutcjvj7lufd',
                systemId: 'fb37d5a7-1fe9-443b-967e-d4a0013a3cc8',
                systemName: 'jasf483p1rdehd6j6dmt',
                version: 'my0753zw1rry08b2ddgn',
                scenario: 'z0h8g50h6v2t20sm83nt2rnm0s1x0jubgjhv28ycqjewtgh7ypo6valmzvpy',
                party: 'b4unb41h7q0im2bspf8k9onc5boh15iv328q1w67b1kezb76g809trzdrlnlgsi57a0y8fm8e2dp3i5g68u82lfd11nntyry55lg95t1wh7iums00f7uiotcza9t6q3w2x2fu9srn4ulxc56dkakibhzb4xilkm1',
                receiverParty: 'x9n43wnodn7id0sw5cy69p1jr7hazjxamrzfyod7ggbltdwg8e87r5vyfxik49dni7v90juqde2b3tkzh7km6b451hip98g5ntia16lq6d2x8sj57jz1x9x1hd105k03f3gj1xwnplwf371lyu8taljsyav578zy',
                component: 'v9qt7n5eoclp9t4yw00jfv2bos3yenjk5qnvzzjyaxpqknu0z20q335foivkhzzsn0u1x7j3gl5lvbdb6hx6pq3jvz7fv9xhacy3r3qhabthwmybglj3u8ndchmsb8prw3eqiferpg52i88tj3xbs26qgvl9jy9p',
                receiverComponent: '3hb84t3qqgcerloo1lupmh7rs7kbv3h1azyh3ythouiwd67nra33ycx3y9yis20t7ksdywksys7qfv7tx4r3p53g7de59nfbl722z38vndyueeskv5wevducpeaxz1xtng27ppbfbcygmg83i87mhxi4eziwmqyf',
                interfaceName: null,
                interfaceNamespace: 'c94btc1ihxecexr99dnqruizvo1tq4xzli44vgjahqsjlr8aqyk3kgue604jilk02s92jqb0uo34x8eghmthiuk4r709218ni39gwog6kiexblawj0i5f2ql6yd52g2pjv4voa5ppjpuk3xu9s8xs50byh0g43ay',
                iflowName: 'k56hjdg77fstf7x4zenb8mg2t3zqu0vdkmpj5nkgmjp6hjj4gphrs1k0whi5436eyhid9staoj1ugztjh0d2jj622dicjmspvpte3lx7jqxpsoaldtnk9h9l77lrlrfae18kmfts17927srs29whkyvgj1wmkcvu',
                responsibleUserAccount: 'n8nq4o2s7a710jkymp8j',
                lastChangeUserAccount: '0xk49ps0cdtu3vvinoby',
                lastChangedAt: '2021-05-23 09:37:54',
                folderPath: 'og91tiez8ap6zi0w9ulovm7ic6ao0yzrmq6flxbixs4nzppxd6xkhnw54sipl0d73m0xby7zhkbof8ms5zz10nkmhm5tgb5lb8gbodnklqybozgy8xmbdyk50tyvtub555gtj1s5dexjieessndu3qz19jlx5kz3z2vteumu9qt3t15fljjwmmlh0ai187wtiogmdx6gmzzvxlsnu1wt4avitkzw46og208jdxbjpiegc79uwm5wb5kkue9k4ef',
                description: 'wdlcdzuxrwik58a0g6cvpgfl0lk0123p19ge3hd5ixgvzu01fa1s2bo5ta4c8f0vdvv2fzmr423uh06hpxa0c85szwlyezdlvxzxmujxj3271vid4fnzsfnotsc8a9umkm2esl9g9butzz15g3mns3ja0u3ie9n7q52jslmhdh9b15wd9wlfgg5dtv67jfdtlot0uz9vbwbq3tag9iqm7k52rv97twpg72ma71jqilvvtdefwqso697n3ruiols',
                application: 'qy6jrry5ndmwkrycehvnwdjfa23orne26p98efsphy43hfwfyn803ixk3vac',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '77aba751-e5e6-471c-af7f-94a88c3d78f3',
                data: {"foo":"p\"HR9-6qhA","bar":64517,"bike":"`]9vyV^^Y0","a":56046,"b":88510,"name":"Ti?Sb8?5D|","prop":"N$mnEEj[O*"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f63ede8e-27bf-4d12-a735-7450d5a26ad6',
                hash: '7317ujrd5wdzj3cs4b67jj95sp1zi6zy4l6fav94',
                tenantId: 'f3ae4aba-14f2-4ff1-a6cb-7e689faedcb3',
                tenantCode: '9d151qcnp2rs1n9ud9bisdcgwfeq5lcfop7f3k6nl10hj7p3iy',
                systemId: '84ce44cf-6eed-4567-94f6-97f79fc16bb1',
                systemName: 'zhlb2sqf92smzmt9mu8e',
                version: '7eqv06v6i1se9mask1b6',
                scenario: '4tkpjonx8jcwcbbwp9by6qcz0qzrvkv5j6q5wk1n2syt7tz642qktnjo01wh',
                party: 'hdippx87kwoljib4zc3j26qpewaq24pkexxo40i20zpi5ecvvh5fryqv1cjwrf6woq1q2ukqfoqd39d07n8fxvxwi6lgyubqg4p0m52hok5ra7bfqhw465ari0ctqoz7hnwljkcqfqc2l238lmdcmwyxvtc4bhf4',
                receiverParty: 'ch7ouqyabz2lo21hpzkwbw3ii7fo16ml8gh68q1iiz5tbazusikxzntvfruv60ob6mp7npyit4rbdm9s2ucwauddwqzv0sy7tkm3ma2o6lt5gtlzban28t6coyqs9g0m9need3r4rnzcjh5nnsdck8qb1cpx9fdt',
                component: 'n08fukcww7q73w58x0dkmu616jp553wut5655igy998dkbbxoxg4kuu5y2mt1zshzbbny4tgp9cqawvhtgcyjk564mvcpk0uwdmp1eayz72ml5tg0qoz13uj2rf5p742v0yjpluesyp6sgk8cjn1u6ohjybx7egd',
                receiverComponent: 'oncqeaymsz3krk1o8lffgbi3qcbqrxdeb7xfwiiuqkqmhrm8uztxpuj8ydncd4qo3dg5dpri0ybqow1rtxwhedsnxqsy5rr9gzh3t0hzawqm4lgwm3zveoem1sc9pox4dbzll44lailp2c39ypxdpuoslg1f48mh',
                interfaceName: '15fzaaz0kz4pu6y6kimrhza5hkfm07r8guoox4b6h8ssnt363osc1rj3c1bsn1mg5swi1bwjntk6dmsfsrwc3roz0n6suz9qctxu76clud8u1pppa6i0w9fk9wa1y6ap3crvlkl7rv8ftjyeizeuu2ljccy2ypx2',
                interfaceNamespace: null,
                iflowName: 'zs8k1c94mq0ymmy6mvgqvd5pb50n7l4oe7uw4se6pb23xwrqqho3bqww908vwvu4b7mf5u9mkoukqsmu7kwabyukzmcucowgth6f0ex1llhcnvw5k3196spkflp8vbczcfeiqqehf0088hhc5dhdr2zztrmyjovk',
                responsibleUserAccount: 'fknpkcj77mpcmqivmxfd',
                lastChangeUserAccount: '3zgko560vnjf7qcgyb9a',
                lastChangedAt: '2021-05-23 19:47:52',
                folderPath: '3km5j8fzrzo046ru8ybzdp159f4ady0abxmbbqh70uipdi7s2za3tu7e2np36mihlameskvt4z6v604ogdoajoqs5mraa316ivuxp169r6gudqcb3h2yapgi0nejbje25opfmff0tew2qvu5aymmhz1xmbcklq810x3dttvcvc7tneyqzhpr5kn5hfdh559xx0z8vk1bfmmcaxx0kuep3jv1vhaepk4t84zm972nz26rjg3svk8c41kmbm8313p',
                description: 'pcqwv2f0cklapub5kpvwk8xpwfptu19wviifz2ekiik0efudq54wr990h12ez0jqkaf099npssynzo1smk9xuiye88ea44xkdwfns836k30ojmo884wq6qnxgt3rvuuk8ndtt2imxa3mnb4y90nkqyj3x11qwmhnivmekbxkrvhnpueg1qld8ldkand8m7kays74gdoprexqaasn6h6c8nqyha8stehote31ea7dnwfcmqyqbude7252fpgjfgl',
                application: '8dkkjjzftpjvwbk231xd0l28xedo9b8qehgntwoalmultiedgieljp8lc19p',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '61ae05b1-cff0-4126-951a-ef6ee8d55976',
                data: {"foo":"!2`iOxctL:","bar":"Ad<bh)Y!Tm","bike":78556,"a":26341,"b":14409,"name":47863,"prop":"&wtWt{|uyv"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                hash: 'peph9o1cxhdnp5nl5m2r0k30mestcgns1pt8gtzw',
                tenantId: '4898fd6f-ddc3-478c-846c-77ea4f8edcda',
                tenantCode: 'kl9hszxrn9m8z4lc2yyt1baqiuf43nsknxred3y2uioirbxf7t',
                systemId: 'd67a8912-081d-4618-85d5-603848f54b0b',
                systemName: 'ji0bfdupn5hhx65n4yxk',
                version: 'j0ei7er6r3wh4l5bz26e',
                scenario: 'j49z9kq0qvsthroimlf4vm8ez0bc9es24rzohdd4ja40sftyczbew0c00z6q',
                party: '3wkrz4hgxltb1lgnx09ow06veutir8qiukcrfpmy788b8f29x4kpyzvwwm7qmb1c1vbk3romektb0bvna2petf886i4cq6a4lfvyckjvw72jnnbnq3aykbveuu0ie6cvzsc3zof6olutnpxkbwcumizpc7mkxejs',
                receiverParty: 'h7fkogw6636u68yznie00h201s51ikirnjk7iri85ewol6iezuo3aoahaqkayfx123qs58i9e37oqey5j4bt0t43pv575w6w6fjigu2np5y6ioetakcb19c6yyhscwq3568q9rvggeqydhs1ibmnryubl87or03g',
                component: 'x1eh0bx1pg30q0ap8i4rquo8gqcud0t9x7ambdpg0ki1bb9swxbdagcct5xm21jc1nw01rg83ywob2j91ozagm5x06hydfwqv8dgsh1ghfhee4jtcty7gp06qg3cgg4f7kveugfn9d21i7liwdjutma5f7p2qi35',
                receiverComponent: '321qo385iqheqeejai2mym6yf29985fd3y728605pl6iq9k2tvasfouxhddef2dbm9bofjdn827sv4wrkbe9td3lja39qrb8sk4308t0cteqkh2nfxzejwa2oi1xnhwexk45fx3putpd1o40mdq7tn3oem0rdcro',
                interfaceName: 'hjzvlurq2x44ym48kjx41cefd2yb4r7gyvyy8082ds38t0fk1mmg66vzv4hk3g9if2sz8swp7g8jyc0ac912z2rxuuq8onyx6pwx5zv2ofm4mjpqafdhjias2xhjb81v0sc3d26630tp35yews9kw9vorfpjmfvi',
                interfaceNamespace: 'z9sv43w0ri48yt1kwi6rjua00ii3m2cfr0j5vv1l3te3z94qjp65afnosh6ipnc7ox5gps63nuo66pax3g2qwab1i7jqx7w1q18cliuts534avu1256i8usflqcvmjdbhouvans2p4ndx4gpx8j61l8lrnwxo8tr',
                iflowName: '644kkn74ao7w4c16470nsrai7jpfzj61uls2rquo2w43v42wwxbb021kpz6q3zwabczeznun9ni88qxsxuv2ystx3wqxlzjvkke88zxgvbpd69g7epzb2wdrxlpjpmjpabczmuwmuoi14zywkldmm8a73uoz7rpt',
                responsibleUserAccount: 'wihq7u6jnfnud9rb0kuz',
                lastChangeUserAccount: '8xt41po8cjjdqvxsfoeo',
                lastChangedAt: '2021-05-23 21:26:47',
                folderPath: 'eg23qhg4qnl3oqwfco2p53juf3bd6q3yp2x4ravrh9g5d937v8oarvee90fynh111wozoqjmhmhpi8b5u1ms9on7psl65yo2ibyjoxa7vhomx4nd9b3gnikrg04azj0o6p56n9zfkq2wmkkx4yiali68negt0u4fjzs5dzalt93qp12vgkw8er9v9njjo92mghdxhl20a6bv7gltwjqpsjfttzj8b888p04sp5p9gjvrzbkvke50fp1gnhof8hj',
                description: 'd3kdtz9xt4bw3sw04xs8eaz0al5m4302uizveom5wf55xg7dsfjlq985mhrde3nrlnhq4ubm09cd3846im6t08s4v9skg6aoawy07bqbdc3nl6fvxqymyud1flshpkz3uby346fu52e9mnlfyumjyo108u5mlcujdmd14ecv5ovbmt5vtqswciabp8j6mkru5nhcl448xch6k1cwpvdbxfhsskewp89xk9y8rv0tvz32gvz1r8igui5nkj5v4ys',
                application: '261d0c102litq73bm39y8cj7nbsct2gbbvpn0uw3geo4obhlahbc140d8mp2',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'ff2d42c2-a483-4116-8c8e-55ecf77b3be1',
                data: {"foo":87252,"bar":5569,"bike":"!ZD/vKGMCD","a":",\\KO(*7_[<","b":"<`yV[eg6^Q","name":"?vj[3aPP/\"","prop":"bi^g:[H2op"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '35f49bcc-8f39-4e58-9da8-fc392d52f291',
                tenantId: '0813144c-6a83-4233-8fef-43b38863b5f0',
                tenantCode: 'dyruc6b3i4ztmoxkkoxbhwf9zpgb6v8fu4zogpjp2c1dujmmce',
                systemId: 'b572a778-8150-4549-86ed-3b4f4df59a04',
                systemName: 'z00exfmkmebniosm0iez',
                version: '7ylx5fy2gkxsycq0vv70',
                scenario: 'mzahuqnv0f9nyz9uylurfc94ejydabqavbw3t9iuqw32lkusojcv6tb9uhkn',
                party: 'llfo1q35qtmvm9a79m50vvndep11ai42iomedz3vli6y8cqwc924u7iib01vsn341w9xcefdvj7tc0sy8ye8j0drlmjexsayu7llp1qhszu0e0c9zqaaqw0msb43hquzgfz6mi31xgv3dakhpdieu2da3rr252us',
                receiverParty: 'ulnb2tlu7fj59kw13p4uenllkh0k40svdq6x8rnduifhet382jwmg1t1exqtbjvqslag5lsma32ngi7wmy4lnsqm8dtwbcxhptu5kv6u3p8rkgzsvi8h1sq99ou0rvpr3m4bx24j7a3assxorpe1g92gko7fvkf6',
                component: '796lycm1ii824ds8dyf4gr7hse0gqf96xp7qbu82tlwxbdrhza7941n216n3oak2rxjrapbcsy31u5q2ib567i7oelwfca6s6gaby886r49we9b4my32w6d8kww5ppyij3b8vpwyvdipd9d8wryfefhkw1pv6rhj',
                receiverComponent: 'pe6bfwnnrbe1nls5o8ou0uqt5wbdo5khijpkdvj1zb5rlpzxfqc4ntzfhre55olusyzeb04u6vmwsnzniqmrgdwppv0vkhyiz5vwopedbi5ateuwxoqnmberku4teswyl03y4s2hm1devi6imjq0cjqntvosaazy',
                interfaceName: 'odgigyr61rgiuwvvd80j9tit5dr8yi5f78xe4d2fwdppnyiswl03jbgz8hhcrij3nfq60j5i7pnplxypsi7xtw16444hlpfwmgd3ws2fcztpp8wa3dvib90z09nnpfbhojirzs838duxry594w3h47bizohz7d04',
                interfaceNamespace: 'b7cq0xif6u3hrd8f0927filod2f9t1826n4zd8a2pwryuixqwkq8r86ofdwjbsye4mq9637hy2bvc89qgg58lpm9bpokjadxqosvls3qg4o5qrkmxu78ttmk2ddqbl2csgg6moflqeibvi6ege5ts4m7ncd26mjz',
                iflowName: 'ydzxemh2l1qd8ipzobb1gj9czy0ab7bd9ae0yrlrjkdz6tia0iz9rw8hq5xnkmqwr7z96cmyudv6261lgdjzkm4njhuww5to3gtf7e2nmb1v92ksx4wnhgve9xxmreftewx7dkrbfbrevvbk3flfviz6uqs1f6yi',
                responsibleUserAccount: '6ck1ul4slevc52p2i6a5',
                lastChangeUserAccount: '90kn21sjq1h84pnxlqe7',
                lastChangedAt: '2021-05-24 00:03:05',
                folderPath: 'k9cnhbfmot5u1g8b57lhhx2asntt0sgdo6ocw0ifzvilr57dwbd0gd6ime2p147g97y1lx14goltnt5owt0hk3gi16vaxq1hjnynnwmwiisphnqg6885qth26igplck025c98qo24z9yhrx9wayil0au8luci7hgabksupn4epoh34fpi4roqaf1huyc9709hn9yrrbioejz65ob8e1lvfvwtie1056q257wcoj8rbh5agr839d42rtf5vkarqt',
                description: 'vz4ork670m5dn70j4hpj2g9svp4wiit6hbkx0gu7noss9bngunxqn8nuhxt6jym2dgd6acat6dgbveect7pbw09o6ivdfydpcjy9pytaj3bvtgrx39y7d8xnit5mojxzvyub7vb0xvyujheqcn47yy0p9dwm26aqxflkpo2zd44g7ken239f9qcf0gjo05bkak8sgzyqldk2l1ye4gkvi1x8d5edf2d9afbmtan8pgb50s9vyu0316wxvaxhd7w',
                application: 'ut8sq7ylv3oyskpobjezfjwodet55dmsln4j8fursjny7yhfjtviw3kzv9mp',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '8c323d3e-7b69-4266-bf74-0e2168e0856e',
                data: {"foo":42584,"bar":48565,"bike":"lT7GTM)zFR","a":46361,"b":":u=^041(n\"","name":45016,"prop":"m!HSN<ZtwH"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0f7ccd9c-e4de-4082-8576-8b7f1b87c24e',
                hash: 'rocyxj5glihpyxxbnyu7zx3hxe9dim9ov3m29nbq',
                tenantCode: 'tfo83or5wd8oz1h9dbwn0ck4zlz4xhp1q4vxwru8claycf1la0',
                systemId: '4feebc67-9e05-4132-b2a0-a820114d9682',
                systemName: '49evkmpekyad6zdaotj5',
                version: 'zcvyy7w5nargmlg6vwx5',
                scenario: 'cxunvnqohbgd3pfoaaxatp6dbbz3v29ws5fteclkgh8mowcriievvgfgrrwm',
                party: 'b05x9bruqa2yor5ot5ecku3yf1zswwefzxmeq6wwl2d3n06r74h0d84pj9251pz1o5w1hq3szf3yy68cdw211174d805rcvirl5uprkttspsiitdkx02bp5sz8hisuml2f0r0efg5xed4u09ljwfwc6c822dpsix',
                receiverParty: 'c7xnm5ekqpoceguappfm5mjrgkfo8jt7011fvest0f5l8eh5pzuen0xo08ao4ha964rfqkr90scs1ytudgev0n7zj4llnamowzwrue0qcipuu33pbnmvy5txh8orq38zfb14qk3rnmyffgpqc1x2vv3fp0ccujxo',
                component: 't72m856d7z9hp5yrsdwyelqofee086m41gjw0aehjbeb5x5e51jm1d8k020tm7zzqit9feiv642pwgq072egpvfc271x46d0qispsqwiegb93dg6u5f4d5crbgnwruiqomcu8on6q9zosw5nq7csb5z0p7xgn114',
                receiverComponent: 'goc15gi5acmjh4zj6v8op8djdw9kdyd99csnv6m5vtmd78wnzm92zriphu1vjs6aesk02zcat63o1l7vrr9ijw1xiew7x61ov46vpbwwgwwkyck9nxzbzl0aa4epsucjj0w18j8olv54i55849gp8jpt8ydbi9un',
                interfaceName: 'jepy9ydkpjtsy3zc0bvjgu5jt8k4cbpoj79wlg45kcan9y0p1ipt7jof0805ih9lylgfg0mx09we5zlflvn6yvak1p7pobz3yauijplmpwkzksp7luj022xi2ck3phvysiw3k408xn0wpy8i3jwz7bluapjg64rj',
                interfaceNamespace: 'whl8cyloi9659yxvso9h7pezqeg4zggokdi9vjw8jocyjnhf15dxvc5bh4pq0k43p2r58cu8pquix9s2t1kwzwl37wzwvju4tpj4qkje2zw5ig99umn7u6yqz7zu2hwa2apfree6ddwz0vd62pluk2ao0pnpn7l8',
                iflowName: '2u7qjv0tzilbk8rclpr80nk2m0ilwn2axpm08qy7rzy9bln08zp1nz4q0fh9ab30s4vljx1eb9yec6247hf4f8cd5us0zogdyg6dsx4ya97grasf6mny31n9vz67f0qm3eqx4ropn6iqlmvceyt6ijzncxmwl9cz',
                responsibleUserAccount: 'zpdxl12wrhvjadi2nz7m',
                lastChangeUserAccount: 'c3vv909ec5nn1t4o41cb',
                lastChangedAt: '2021-05-23 19:37:08',
                folderPath: 'r4vq9y1xlr74vzhtdpxg90rovxrvqom5qpzs429bptf17ksba9xdrg8nodpquh9sf1s2o5djp60iarxj88froaek06cucfi2aaix3b99rk04d0up73l99mn3tvyt9fy887zt5jn8zskgy6ifx19752lcpdon9smh92mw50ka3o7swxzakm5cnsuh37esqxfttg1b6u6ybz7454d3a6cn1pijeqcad81empgs5ki3nwifqpulfpaqvihny65lfjn',
                description: 'x0w1e6m2bt1n010zwc5cgh8teu92nfk5tzd2tcn41t204sn746lb7pyalqilivslzzqvk51653nx1giqixmr01o7frvmlosehilh9goynyfgngcam2rx6qwfrvx0ty1qk61ssbax6kn89ok91jbaa7of93t1l143tkne7jgp8zxpoliqvj066mv7g7os6r0ze4cdgl0p2r9l3e0nmd5g6q6a9amrqufb0tvrium43yr1ssbp9pn9f3at3vpug4q',
                application: 'sogqy61qluvfx958g5e6e6vl8kifdcpwh8uapkv1ok2wmiw96alexe8i2ojj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '4d85c036-a792-483e-8317-7571dbb9b792',
                data: {"foo":32305,"bar":"5\",Ghlrd-f","bike":29552,"a":47036,"b":"M>ozwLQ){/","name":84713,"prop":"WX7\">Y(8oX"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a76744d7-4386-4f2e-ac33-c3f7ee15a73a',
                hash: '4j8usd0tg4bjraogrggbmdb99bjzxe10wzfkq9a4',
                tenantId: 'a2a91674-6c5e-41d7-a33a-f91857efdcda',
                systemId: '860a803e-71e0-4b35-ad7e-aab2a75e55d7',
                systemName: 'irtlq4fa2zuv751vpl1o',
                version: 'kmk0a9z7cldft2a7xdyf',
                scenario: '400ktcih1c4rimfk29jqyttmvolkv19nmdulcwge3ysvbo3gxxefzyxi2esu',
                party: 'aiwleqq35cz0sac6r70z33nz68g5x393x20qpzpdrpltv1l9itieacnj394k3smfj1ldnrvphl4e84vv6ps64z6jd0t7yhmkgr75tat35693qduzn1dm0427j00koo2xg9uunxch7hdlfda2mx6thujatdh6gdzr',
                receiverParty: 'saa1zzr8jwlis8vu982kygmjpt9ats0p9srhzo05zlvb6mspqis2s2525da3kpy4tgc7ma63d7ckwuxw5701ntjr2t6enhulgcacgr4ae8djcesek47jum14o7do5ojy95nu6d0kq67wwxck3bqeixs1agajx3sa',
                component: '3wqqei2wyhuqm9k2tujnqvtbm0y601j129cb93zfqnine4ax6unxwt6lku7qn36rt1udy19egauyy32t1qd3w2b325hdw4v3b1le19h11ptnx0sx6x583mkk5rj1k9kg0lhehl1u7d0bvbwybktxmsjkmm8snkro',
                receiverComponent: 'hjg4xy8rxh08ivniiopuc6148tpql5hljbcdd2j3lws27942kehgfqzeujc75uml8ijoopz4osvdwpa0ag0dlc8r8mycwyg6nk6r6dgo7ye7wdq2142m29h3j7nqkqv3k68cm11funnz7erw208uh3de4azegz16',
                interfaceName: 'j5jcet8tul72qn9r4leymx4p5bxyugh7w4qf3teciqfbewyitl92vlyhqt50qe4r7gywqdr1wxfsdc80iwselk0as6n8gmxtnd6kkya5zejckr819w2iunq22x3fb9jl74w0yrr32xm0vntajxjx9emepnwgr6lt',
                interfaceNamespace: '4v7vqhjmaa99rdk7kcr4bdusry96v9tdl4zbwux3upwtv7arbm0yzr9hlqm9oeax727o3yonqhlndwu0usjbg8228j90i7sx9g0m9h29y5t3z7mzgiq1vzcznaybjk92z3h7a41qoiafr6dfmog70h0kcimvnem1',
                iflowName: 's9mrxnr9tkvycp0djg79jwp8a6ib4f6044zzefucg3rsdpnv1fy6nc64ibemxrliz8ucm7ijp8j1en8vlpg9gzuj6d6ng1xan55dapur2cvn0uliecrgb7foqhe4enu5792feqnjm8icpfzh3huwgz677xq7waoo',
                responsibleUserAccount: 'nwq0f4x68hfluegy1ef8',
                lastChangeUserAccount: '6ofvc6ipo1kfxis6tfbz',
                lastChangedAt: '2021-05-23 13:12:39',
                folderPath: 'e5xd6tk92maptfhv8ruto8pog5puqrvymt4xxoq87gxr79lbk3pv1evkzyd7mvubpyoejajoapup6j4vdt0sfonow4mfzljqu9kuzn7v3p2p1isibpfwqh293z7smmthgoktqtder2bge9kyyop10dgyjtgs5ngbal0fi7zvc3axmg9e2hhx675wr8hejdm318lsa1iyj3ky7augtj4tjkuc27ith412rjoz9yvj4iz4hafoorlmb69uvblfm1h',
                description: '34yjrplvq0r883s4kagi65g72h1ceb6xh2go6sqm1o5d1t4lh8afvxs5fwxhqf4yh3qajs5wh1swmm8o4etvg1e5hghokmpq0d6us9q7i70q3k56v48ud3uqmvwzsfdrwej3hljh2i9sd1o14uj81i7te3eqaacx1gb9z8fbi99fn3zy6m189rq80h2yb439zf2iajcle9jb5rgff9g1oleskb7yh2czpwxtgit7sakjdsep2x4atsh4i6ya9gu',
                application: 'oowyahqr5rc7dzqijyd3zv2b4ayy557jv2kjkrh97j9d50bff9i9vbijgwc3',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'bfaf6ede-26d7-4d1e-82ad-47a3b3c4bd7b',
                data: {"foo":86899,"bar":"(5(wvCmC2U","bike":79102,"a":67592,"b":1373,"name":94713,"prop":89090},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ce549b46-82f0-4c8d-affa-038840eff960',
                hash: 'gkdgcug2ihmq1hijzali9m240dmwe9zp17f8n2sk',
                tenantId: 'aff793a6-9d47-4f73-a432-69327022686c',
                tenantCode: 'ffemaeddh4l0onods3zzif5znuzr5m8ssxe0kxfpulutjskk70',
                systemName: '7ynva66lbxth26ugpv6t',
                version: 'wj0wg1fje7aln4owwnzs',
                scenario: 'htpktfisz1xeu5zblfpo76mk6i3i98cf1jpik5470bf3f905jliflgjwv310',
                party: 'hc3lxfsq6fjjv0jym6e1cuihcqotbl3ocots9y55xih3ne6oijd7p25e0j8sqjfxadhw6n7fo6tlu99zdinz6zst818dc2s5ww2ne067ccahv37w6rpto0a01kxmqqfzh774bfw7kukf3i24m5l5vre9neg9nrpn',
                receiverParty: 'm6u2vy0u0sovwqjyvvw1hfgiwzmwbmprgjqrp8bso2y9tv2ygmjw0st3h8iwa7ftx79l50uprew2o4t89xhxqfcha239kld4hm0lepwulaeavkyhorqpt3soolp3wch5cmgcea5vagwg3k8xxbvzvluj73i954g4',
                component: '8rgf779qx16uluqjau11xk0glf44p9mjpw8th5jdwf6xh6iqraoeulyg3v0u8rhiigapm4h3zv5i6vyypseuk7y7qhvkcflxunafgaf8vrct1w0ylngq026vym62xk74tduzpujk5iswkv4sy1hmh986ytejyj2k',
                receiverComponent: 'u4jyxtrsjwqst7gduz3br8y1v7b8jrp30bf7lugo41z3fhb0naurhh6ay3aiard7p7sucw8fqibr6s6s5n9fbypxckfd5mm93iaas94snxl6gkso1dz1a7oghk4wgjt55v4w0satnndwf8tzwgxen07yfr3rbiov',
                interfaceName: '6fcysi2wv0r6krruvod9oz8abohtf7bsc5yw9hq225mnel3udnpcx722y7f5g3opa7vhl5mw83fbnlot4jbpb1aysn6av0lw1gsnfirreope07we7z4nx0qro5h8c0gn7jdyzolhz7aqptmkwoc6n3cbp2u8iyww',
                interfaceNamespace: 'p5dfq17fwdh85cp84q9q3dzmkfv8s5onu8o0njbu8w79s80yf5ko6fw19axxj0621a2do6f0h6onrojukj753oxdcr15oe7llofivebli5wbqwgsae96wgannpt7j8cmydbicd2y1ejmfnraixjxojobyfsl6bg6',
                iflowName: 'ebbm1eintg690zfrl0qz45lm98vewteskbzx419631500bhii07ac4zfip6mxdnfrpkn1ecs8g60zgbnk6pmo628i1svhw6e0wkzg34qaq9seln0cv8musjoj8cg5yj47vxs4wn1flrzp3t7ucj2bj0tgzsyvxyl',
                responsibleUserAccount: 'g0ri3l37ao7sg4dfciu8',
                lastChangeUserAccount: 'be1tne2irfvh76b9qz67',
                lastChangedAt: '2021-05-23 21:34:54',
                folderPath: 'atgt9hohuuc7t1cwwvtur83p2fj20iki85kgkt0lghcejuxcbq5yemxb5x7qvfpe8wqwarlvhab7oi4d1st25t3gy41vesko6uq6f517x3015n93qkhxkdw5djsyxhesnu2zcoyid1xr4b2e52ggxfusvymvmidkskfynp3lpaix87tgjlubhn4mdeahhb03kjf4d2imqoi122dac5e12tylo82wh56wzw6v1sv0monseqhmhtnwrpq6ve8kjj1',
                description: 'l026fcvg8zyxra0hfdnkd9pwaqpjfb0qukgs2ft9lqnap7hpqkawxcd44redvvi8dqfdu4cnu7r4xnw25rvvpl0vbing47i2802bxd2451m8oa3ukdluq4x0gdql3wavu2m1p6r4gpgcywa8bpwnjvhg3z8r7jpda9vp746lq4suhjpzg0iitvxv95u1ibat2ba2qf7qlyradkwbmgvogbad6ihfrjpbgex0853kfmstx1fnuopwfiffgd3c0pn',
                application: '38qotmuzxfsbs7yxt0d625eo3put6n5w4s6bgo70h0uraeypfvp0dpbuxgct',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '9657959c-5f3f-46d4-b020-02ea84391dde',
                data: {"foo":"4`?LZ*@J3R","bar":"V=E|oY&J#s","bike":3571,"a":"mPhGL/.]9|","b":"hHs)+GWmmJ","name":53122,"prop":"G:e_?lky=B"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0b10dfb4-a503-440a-8d09-873e036807ec',
                hash: 'psjcy07x2617dj8yht4bfhqw8u5vqplc9g6zyp4f',
                tenantId: '13ce6311-b77f-4db4-966d-32378f04d049',
                tenantCode: '80bc8phlvrhcmm12l9n3vm8clogvi87wj16lyyj0wrm05ajimx',
                systemId: 'b469703d-fdc8-4219-b076-5c11b66112d8',
                version: 'zxwvizs7z5j0x8ztl774',
                scenario: 'kw5nv6pbsl2p0caesy8pawjb344pz8665hse3whdgxty031tx5pxkr24innx',
                party: 'lyetnz5eomtluwmo5hl8bs3zgtkaujwckya7qhvd1aun851o7bwp11oi85eivk5wfxu5f0z2pk7odvsjpemd4fsvgjeldta9vxf4hkpd2af3ts7k1pkr3e2paznq0g2v4orvwi7zsmg8sj65m4eyjn9ymaxqi56z',
                receiverParty: '67yblt54ritv5f4q38uicww447c33z9lcugvi1lhfgz893vxle9d1fs9fpiu3mhnzas57dpw7eszb46a9yjifutry3zxm2t2wp7k6z7pp3bbpves6ihs0k2bzhtc7xe9h5m2jta8cd65o1vlz5qfmt54a98ri4q5',
                component: 'qyqw0r3jgukg428jtyb5xq207ychnmgqhn4m80w4k6t0ijdf33eo0g1lqfwhcato671nj0rpazss3wrl0oz5qyfqkyuvn3knsm7lg0tp2hvqposajjre3ig7y90871fy8zoen1nbpxo0l0jp95myxmuhgi4qowou',
                receiverComponent: 'guond6pxbwtakt4tunhlljiu2bz45s9vko8vmqbchs14na8aldiy6871cr7qlluh56rj0w3j7utbwmc8hyu950fjmk620p9rebs0grz62z6uajt11iq5g9w4lojp875wfxfi1wekcoxts4v7snwyizl866mhuur9',
                interfaceName: '8fpyt2amcm2lycd135rgblka2mwiez13wfhoh9sbi0qqme80fgeyxv709ch9e0620ef2cbqd49fbjz9b6pgl1h8h2jnsif3aubsbnbmhz2cfkx5edd7lrtt74bsu9xo1xa7pa8zbr1e74vcuurtdd63dcky6jx8z',
                interfaceNamespace: '2dz05udnc7dqzlcr3kn0vt3s4z3jstwd2nbv245mt2bhrcx4aq5rtks6ih4yz2l2mtnyw1vv8j3i0wo13u4ey3hwtwkwphjv91h9wopwp0bd0lygd069a8wgs4sunma20j1u46cq5s39lksb2nz3xnfdjk8uda97',
                iflowName: 'dpa7x4dgidbfvuz2z3sd52vpvl3hjzwanytwsqstkvs7kmv1d4wem0usj89nhwa5o0b1mgqoz3mijxtxpt4igh10wa7l28rn2ev2mstojuhr3ng6pv550wz2h9hxwv0j76etii7dc9ipv990zfitgtete84ikd4s',
                responsibleUserAccount: '9aoz0jln2pzdp3xp0uf1',
                lastChangeUserAccount: 'qux9v215poxkzb8rnfas',
                lastChangedAt: '2021-05-23 10:10:18',
                folderPath: 'xwvnwrmf5gdajfqt66yc40oo97hx9r9l5ky4ksprunca8nfgnxzuzwm7qmh35zktaqwvhneutg4pkuk2kgtgzhurrkqgmr9u18wzdlooisepwtsl5zi5drhk9kvlzhklbxanf297537mm261znxd4969ogjmuzzvx9i0t747avi8c5lj303qfokjbcxln0xstll7d6a53hbygjl4ldimxruguuu4f8b8mbzjsrzzfi6qngeecnq5qb96t2ogls0',
                description: 'yfir81yk1ywb1yy2auel258snh353ajbuqyhuhf94vdvywp00iwr6drwu61hddkwdc1sxxm1n5nuvgzs76rbhez6sz4r1hjizk20t5oduptytpih2ma86d2s6iiz65elg93dsqr1vxtbnnwn7y9ym8v23o38br3uzt1gaasq2sa01eeu5915ofrdv0p8lssxovqri8cikm9dkb2lpmnep6c54oos5dilg9na6cjwgnyxkjdx59411lk2cmgm07g',
                application: '5k7ihp9egoyegsfh0ehlnfhf3r13w4sijbkqnmlt7nllnrggeo95ju3mh93w',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '09b5c3ae-4ebb-4148-90b3-1dba59681212',
                data: {"foo":"y%I,YbcpYW","bar":"G*Zf+YYT`d","bike":"Q_&LV1q2kN","a":"[,6TUvTq8-","b":73222,"name":"2Aaot`i#32","prop":84269},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '17c38c70-ea12-45c9-8ba2-2e2e4b086e99',
                hash: '03xg6ak9qqaeyht1wzrsw2ygnfs3mea2a5jzoybe',
                tenantId: '8c849f81-07d9-43cf-bc93-615ad63cde8f',
                tenantCode: 'o7f1d3jaa1d5yh427wtjvmr4r79sv57jcqq26vzd3q623tkv8m',
                systemId: 'aab61662-4c4e-4f18-84e7-33e5e8bb9dc9',
                systemName: 'umsl6j9x6mfvaz5rd80r',
                scenario: 'c61qnqw1auleev0z2a181vfybubdsbm3puw0mvb6ep83x488sz4y35gza9pi',
                party: '6mbhex0klq4fl60o1qfllqq9p6ahicaedrtkbgssizwlrvd98f23j56l4jl4e5p08qs82odd7vdpncx7bgoby1qx8q9e4pu2jk53y57rptqhfuff6r9ewbfaoezcqtjinny8vti7ebkoyllkdt40he4ec3ltynr0',
                receiverParty: 'x502furnzpeufjb0w4c0vo3vrho2y1g0eqc0jav6fx69sr7w5i5sivp3t21qlguyu1mwsa8mrl2670mrwkzc9jaiqat8c4cm8obpg9owvqhnl9r582tz15qe97l5pq4f3un3f3ljvvsjlybuovwo0rubb9pex96y',
                component: 'lao4086w06lf6ky24ucq303892c9a14ghn73m08c9f9dv6aqjd7b3g0afhbdblp8ttc07klsg7bkadwwz2za5sbqvb0mbce6ek6s7ysei1457k32nqfhktqks6b1wdwi0ty90cy3xu8xgctooqzq5erppr9zw0xq',
                receiverComponent: 'x7ukat2dxlge98901ns4bckmd9fxrh6wtlk2u1kg6kri62hadfuwa2yhypkssf7swh0mugv5ywmxpx1a5p3ddvpv38equwmgvdbzfpzyknjk3pwbebvntldlzdnugqltwnt4xjwe8ztxighge6j6corpv4c2ba32',
                interfaceName: '94fb6cfy81mvlmlg3ydphaenfk4ricyur7hzgvhdhre7lm5e8jtc0dirgl0eu2wco0t6mqgfns5jwd9l5a7e3v7uuiwafwad3cvu02zj5ws8fjo6usgrgmh2ngswpiij0lxwonq7fiswnj7vrnamzvq1ka1pa6sd',
                interfaceNamespace: 'ar1alawb9yng0t2fhfqcyfdlvy7wxjkb28d9qlkl9xnk96mdvywix9hhrzpqj225lqe03a86vphpiz4eec3g70exok0mht7s2525s4oavfhco35dhwcfw64lo0czz9siflc8se9p7mc0t26b3ec53bdmrq5w9ahd',
                iflowName: 'yjkoaz7dfh3isjztk29up4pcffou1yan5rccohs6lju4rkyzwsn51yrpo7cjgpnub1rvjksutldydl5mc8fxk996ocq19iusv3lyud9awuy74cb0uw5o3lz7z1jcp65y2k751hkmia1qjp4dz2e08k5hue7iaisd',
                responsibleUserAccount: 'fdajx56r01b3on18fugs',
                lastChangeUserAccount: 'rsawaf58fnrkvith8kmk',
                lastChangedAt: '2021-05-23 22:44:34',
                folderPath: '3m0gubqkd9x52tmcdex3r5s2pm0s9sy4v3oht1cdcan2q00b1m56guekelqgme13yllp5v1reog4y1ad7ezeyiie04lyb48cdnlm91aaij3xp2qdwcrbep3g5poz0k58pmdkygb0rb92j0vjhsfzfperm3z0ick6p2vqprdzckldayp3ghkdn1dkur8pi9wnkpj3t9oafhmsnwu1k9tx6ix9c4tsszzr4uj40ox8e3qg392othur83kqkjeiyi1',
                description: 'f4ep21rbik29cugbhd6067lhq3554n96beyf904seixafj6whham0k4c8dx9f0dmkvw2srdy5s67xesy75nknro435dxtydoqz1ji5xwsw13j8z4cq87yqi0t21u6z0utm2gvixoadvrqdtj1ccmws4oyvjjrig6o1y2b9d0ks445ntd2pozlgdpp8cprnsfcr7331givmk5h2ngepxan6h42cqo0hkfdcfims68uylb2pga9w6rlqhsa4gto15',
                application: 'ayhzbsljlu4p4agtjbs8x7ahk4dj2y9ejz8q4d7psqczs11tt6t8ar3i0flr',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '9a3de171-82eb-466d-b1c5-a7c831bdb0d8',
                data: {"foo":"TxmvWA((Nq","bar":15321,"bike":"&&%7\\.GeK3","a":"s!)IxrB@vM","b":";!\\LT@^$wc","name":".&>hRRHtGu","prop":"GOca$2u)F&"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2f9c173b-9787-4f5e-a704-2dac576d62f4',
                hash: 'cg6klnjoh65ijc0gzruhn6spwbupbg3g1ofqkzce',
                tenantId: '5c9b09cb-a49b-4ede-aee5-18f25a5b4cc9',
                tenantCode: 'ncdtww886x4ho0nzx9u2y0k72nto3cijscqbpnjcce5wy7t25f',
                systemId: '3a5584bc-a461-4ce7-b2f8-80a9c1e40b4a',
                systemName: 'rvzpnhcogkknbpn2qg8v',
                version: 'u55sk8gfbe8ndm56c7sj',
                scenario: 'bv1ckxve20lr2vyf1r1bglo2pug91c63rq5siw1pxlbmh5dwjqu45dgc1qlt',
                party: 'ceonyd6mynv438x2lczo7ld0ihlo8x932h0g137qglb7z8aqpexsq1cyxyk0h3v0awhdu27or7hkmyzp922itjn39j2th54ws184rtppk3ubrdlodk8b1of37ua9422a5netxufd7kj885q4lcce5flun1rdfcgv',
                receiverParty: 'pcdz6095ji9ovnaqg6u96xlbehzyn6tuea8iuwtmk5xxd41akka5qppmb1v9yen5ikr6rucnfoe85syufdx0ufdcyftydcjyh2up782n4tbse1znggec7rjv4ordrxyx5p40l21wtlw08n0q574kj4f830nw5i6c',
                receiverComponent: 'o9arxvu5lct6qlpg3ylrt3wa8xxxlyl8puxaez84imi57kzafv8qv3gif30hdpivkxr0ugv409s0gon0voepkmjzafpdbiimfqh48u2yx339dohbewpxv8szmlch1whdrjh08wjufnw8f7kpv4wy094kyf9ro8i7',
                interfaceName: 'mdvzv3tq18318iklr5mrqs3366qqtjkm9usg3x1xyp2esvbjzngkclj8gcau7ymuf6pgi0nyiaj9xb7azd8crorvmj1gqm4fhcek8vsufm2xcoqwkodrj881jojujjgjken5mx63mzm35r19u654j0eshdsd0lsy',
                interfaceNamespace: 'a0mhv52001o4mxzxdvrl01jhz1p9p6186nyzkfn8fgvl10uh09vwca8k255esqjf091jcrlytif1xnodxsdx7dv7rus06sx7bm683bute7qmmf1a48trjncu9ryen4oqtxgbecojbzy3n26hu0zeraajijmprruq',
                iflowName: 'gzeq9ji1fcfqkpu4ckt4amjyrasi61mvabunzqix3oik8iqw28nqz9xxf61eablri56zigb5j6dqlqbjnvjhlujmv0y3ic3mq11ug505dt8vjxbllj2yrji3qnh05xjoni13wmmzmxqi884jm3v9dz4nv2m8ussp',
                responsibleUserAccount: 'jp58s59tuje4dw7f72tn',
                lastChangeUserAccount: 'jk1r1spmst76iboyfl3q',
                lastChangedAt: '2021-05-23 18:57:54',
                folderPath: 'oowa1bgcykth6c0iwclc9c98hz5gjr48d7pxp0u2stjbpdadzh5pfk8wvymm9220z71yekc9o9q9ejczsi0ucckjasz5jou5c0bnkgqepafhf5opnhtrjrctd6uvs18j708dd0co1m40f0a4x5dyj1ucmlehjlrkc0cd9h0agjk3eae7gx13iotyzxi80z48zrye96gephs7r9782eu82e6rgr8yt7a0q2ym96d6e2t98vfx87tz194qj9yn7q6',
                description: 'kh1rggv2yi2hgje3iptb6bfr0pep05q2prtnrce9duw4ttrbr4wfczuuuu2xsn230v0p892phe376a610fknwxu8ou9op3unq7k0q5p9py9ooq8uzwuixntu80tzinrboe2z3l16kxfovcu2cln843g5c165dcps080j5s1vas7ka1wrmrc74z93r2vstvw1fiim5t219yn8xhttrcmfkx3r005o1buow4g7mmwuh17pl944j14p1f685rgszv8',
                application: '8qap3t5dcninqf0ihpkh5x8r59tlcnp6nk5ql64xe91rvlvpeo1oyg6kse1q',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'fa2dd584-3781-420c-b9f3-af0fd63525d1',
                data: {"foo":"?j'YxRK_|}","bar":"AT.]DA]Ly1","bike":87540,"a":"=OO\\l0WVfm","b":"C_!&xSF0mw","name":".wR]A7NbJw","prop":"|}1LK3+{j,"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '804c167c-290d-4c73-8b80-2f64382bc3c3',
                hash: '69rnzjv0yx6uea5l74aq2qvbrnaa73775hpfcgax',
                tenantId: '8a7d4726-5907-4fb5-a1df-cae5182f1039',
                tenantCode: '4bwn4s3suafsuqlt8z8e6qebnubk6kxl0enpbscx0nhoiqcdpq',
                systemId: '98a5789f-8d66-44aa-9937-97c237173b64',
                systemName: 'x7k0m7vdcrgns9uuz6zw',
                version: 'mm3zt5oov5vztd1atxqv',
                scenario: '7fqholm06f72esu3l98w4szhcffws2867i9n5f6igseyquxvmz0d8hvb1y2z',
                party: '9nvi26lduigj5jnba125jgyjkvazt1osm4kl4yd0fvnc8nvhjcc842f0tm7rnuatl0tpc4f5fely6nuy1ws3d5kt498rcvmae2qgd6e5ijk3gd1fj7a99oxu84jom14e2v6ibjeg1ejho4zrq3o0ubupg9pwpqji',
                receiverParty: 'jfttx0rfsjoe5phls1uhdv7moiqy1r3a41840xo1ardd8aavz9c8izbabs928824yqj3zehvuspl2nmontw24trvz0sc9pzzawrkt5rp9b51n9p8hukny431y3puudutf6igjpfi4pihdy6fx3v5t61ftbcn6ixr',
                component: '231iwjqkbzndtlk97qgq17buww9mt82onzjhpjgnpjs9irvvt1z8cn5ni8x9sdkhzco0trek6vdrqudwqlwcqv9nrmk47tpe68hr917bctf7hh1c2ps7sewz8vhd0yti5rcp9j0x2ccopl64nv3f872apycbyarf',
                receiverComponent: '5msfoe5kn3a4cavvsvg0bwrj012v50bm2ztwx21mowtocwkg0cznb67l31y63tmxkvadabu7yfm7xqkyk4eifs4jnsctwplf5h47nutaqkn42wfx1avysqecqlike4na0mtyg5bav06od7cfnqzdwler1x58cy9m',
                interfaceNamespace: 'vj0njg5tvc6ld6yai948zmsh674bmyjdgbbg9rxh2kr394iv5fjvzm36737iqe5kmpzlukxwqf5noexsoqy79m526f3jr3ewdkzw2vkz5jx9echkzx7jo6srrymrqak89zpmxn6xoi37a1j90o827nq0a2cvqtb7',
                iflowName: 'vkqazguvyofxx2dhyedg6w4asozd1k20ewfi3imwxntx46sqmnpxzlaz5vsl6nk8p3rjojgbwdbfb074afma7mj9d1p9p6md9gz2s2hc3gyu10cgtbbimscx74b0e0x4ymgmo3a87xl0hwpw25s6asl520qw28v4',
                responsibleUserAccount: 'xu4xn9yyouhqwgr7u33r',
                lastChangeUserAccount: 'dref2d7pmlzsl1mm2j0x',
                lastChangedAt: '2021-05-23 20:28:26',
                folderPath: 'nsrohx3pvej1cm79jw75lbnwq94qty3xb0g9aguagj76g8az6eejmngydjwat3gjxw5z7ju6024qt9mzvoe2y239j5veghsz4pcub28wewwnca7h7k5opt22w9z2ijm3pva9ibdxks4a83dnwldtez0l1v2pxor6ox2dj43mttmpzn4me2gndckq0gb0lonitaixxl138lqm0o9avucjdknhnowg0u3y4j4g8of8s1roh8q5qwopfuz8wwdzs33',
                description: 'z6wc1xpqpkokaxq7mu6bmvhy2fx8uedk36tl97gjkyr073tof0fhbew1o3928mqpck20fdteb4sp68el6p80um61g9xruedch91o6wtf6h2xhcme36uy7ta4vyy4c0so6k67r0od95zzx975lft4bnb93h80jaz2fjub417yvv4a5w0k0s3rwggef3qv0qetwcruj4yart0z7v0o32bmwre97fau8ai6ez0y91z5z6q3x4kd5xsb2h1rbip6oq6',
                application: '7ammn2n6n0vuct4u7yzvyigoclobs6abe64kb6gjyv78czz6jvb7a4cin54n',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '4a22d3a8-b850-4f8f-b5dd-efb0cba6b03e',
                data: {"foo":18737,"bar":15287,"bike":30865,"a":85040,"b":9642,"name":"Nl;L6D/Sqq","prop":"Y'zTMTc]o("},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2a5bab08-d34b-45e3-9db9-bcd576ea1f4e',
                hash: 'b6hg0wfebxmia3j133thgkyejt4we7nil88f9j4g',
                tenantId: '023a437b-f328-44a0-adbe-e00786fe9917',
                tenantCode: '48x51t8c5ayz6k5or0ej0govfxtye0ezoh4c4x2ju7ltk5h81e',
                systemId: '36d0bb84-1845-4030-be9a-262aaa84b0c8',
                systemName: '3sgwsywl14oh8jnpkq2f',
                version: '6ak3wolc2pmp1e263o3n',
                scenario: 'q4sp8jwjms8y2kilrbs8f7c3xe5jimcwsu6gibfe1brumkyjo9rw0mn30vvh',
                party: 'ekac5lra5hsnbe0knwgfk9v9ubttiqnzuxzr4187uwjtkx8xwamz7x7xwqgamnkv2h35mviz4uqvfj9k655wqlqd36krnb7og0pyhdh490nsbd43bxidtlt976no3c1s5djrv0jlsfgtmxwga0cbx0kjcefyasye',
                receiverParty: 'gr22oa3wrz4q8lon5w264r8j0ihg4lobpoptj609iqczobpvthrhu6xel35b8mnf7hva0o7nf6gte97xh0xo296r81s26hmqr8e7j264t0arvix6bhf4zxdlqogzjrrlrnockc0lrmt5jubhfph5mjgdzejxr7sw',
                component: '92slbu134yli12q7ftql4op33vxshk74x3wvwfdljnyt9pi9yec0brvfszyb84dv2pcvpw0lh4i2i2nym5dk9r4trd9gkuyum9ro0r1c1ufrx1kun1cxvc5sjts0caab3jpy29jxodq0mmrmi8xllt3fzici3jur',
                receiverComponent: 'gtumn18wmzbib6k0fr6c7r5zxw1xp39edwxcs3etwq5c0hw47r5cinue9p22i3rpvnzbwc0yzlqudioy10j8ua04usp4rgzzjreimhptbxw2l6ljnwvamv6xwervxbool7agx2hjvkh8m1q1n7i72gdtkcjdx1ck',
                interfaceName: 'aa8yx80ckftlo46we0lz4u0rms31f168u32gu6427s7qv6bxkxjv8dz5ik8yd3v1kxepxb0f51fv0lmimewv8z2ssqpo8n2nekuqn330bfmqo6zx386ilvcseynqbwv192buz6syg014w9iefuy3uth6d3h5gkh7',
                iflowName: 'dvtldo5u2fh0ro2lqzgadkpo6hicnurc2j7ggd3080cby4fagft7lqvpersd9axxo83he7ja2jt88u4lywipmt5tictwvcwd7ggqpkfub4upaj93a1ic3ci9ip939pgk6358ft2gsk2ns8kxv8qqw3cysi5t8bas',
                responsibleUserAccount: 'kn2xrdquxb6zmvkj0bb4',
                lastChangeUserAccount: '865vbnqce3j8t2go4ru9',
                lastChangedAt: '2021-05-23 03:34:14',
                folderPath: '5v2if9lvt0dvm2mmwa1q7l1k6wn46eeaqy04ozoim2xcntyed7aksmjmnz5spiwx8gna5mms1tsbnkgkpriap9qglmo24vm7vwchz5qusrs5tt22erg0cfyth7nq7tixq2ikrim5k874gij6xckxklevg09lir9n13ae6ha6f41qx9puhh27ejnmhsvhgok5jtzvxh9qyadm11d0lxbatikl4u56msib2hlymhfacjfdm1dxaucxm7qyovpzlgw',
                description: '9urh08a1w31by1x87y0jft57y1vd8eitbaotini8zqx00ul8nyua1ljdyz5bfz04ziyrhaokgk8gyrhpflz4rv16vx7qitqpi1vf207fh7h1rxlyscvyt7cgpyk5cva0ddgonik0u75xz1yt3lwpfm4fl47wh5reetpdvgcvrllhkxlwl8o4fothp26zc8vanm2c10kqarhndowejwbaea9yqpkbkwab0ioxse23hzapqzgwvfrhooiqklpvyxv',
                application: '0nwg31e88yo1e8buxr5g2feikb766tymrusuo7j7idf65dab1shdoqo1tc5f',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '67706e6d-1c48-424d-a4a8-ce13cd70e4d3',
                data: {"foo":"[i9q=ZUZwR","bar":"BqG!%:uVwB","bike":"mFx.7DF/Ao","a":11980,"b":49679,"name":62371,"prop":"Ug;|97)hB/"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3qebuycrwpx5bx4xle9xl8gxk0dvkjv66bac6',
                hash: 'h7ex34ve4297afod2stbketd7izlus0q918vouza',
                tenantId: '77442d75-2a0f-4989-bac6-bfce173d32ba',
                tenantCode: 'fthqt0t8a32bf609mv2p2q398i72s21k3xrf04nt8dol9czmvu',
                systemId: '542137c7-12da-4eac-98f6-61caf4a59f2e',
                systemName: 'ct4m44w86r4xlgwct4y9',
                version: 'xj363y4bu2kqjgb3ejoo',
                scenario: '62kwgur723itkx80fv295i04lglke5udd0ccxr1dm6ygttxc5uq4xt09ny2g',
                party: 'cznnrt07kg69cs72tm0xn1hmt3xenl7jof29r055utdpaqcnmj0xmg6p33r9bc5waayxi74u4ubni6gjqokzflfkd63cky2oep2zjut78s5bq8pqroseu5ttu9xi4rz1rqbbp8rxeochvyxuu0q701vbd5n66aqg',
                receiverParty: 'ea6xcq2jt4grme91rc6bfn1hro0l1mwuyjro1pkkgepr7nctjynsy1zo5hcfxah8ut9fmnrg8fyn2wrp1ex6ujoiyi33bnl9p4vqtas4htp8p2g4jcjtwhea23ydvb8qiv36rh7sz33ffwn3ons5xrifyvu7ye2r',
                component: '3lgbum9m55tl7nicpobc24ze7a1iok98lha52upnusc2i41k1sbsh315icswmnn7rudkp5kc9a6bm0m1i3q2u4pr5jyiukyhy9h6zo3eeaohtvm3dqxlabsrrshu65wd7rkrdomqna08djm7m5j2qn8m3wf2bxkw',
                receiverComponent: 'uiqck1x6qan9q8a1gwf7m9fcc1uo3fxqjrtll6s2l3xnns28v5q8bdtfs7nl0gdo8yykzux6spv6er2uf3j75we7ftwhozmihwu9xmoh2yvl87qyf1r8xrra2s2uzord3oeeu2munq7a27rfqw2nkfjjqqpmhq7c',
                interfaceName: 'e919ekhlayhvkaetl49jg3a070zswjg4ae5b5czb666j44lsb8rk1rh4gj5f5iys7tq39ro8ljpk7excvp3drqz9vsbke0rqfgb163fgrwdkqswgucplinq6oc1m4zviwgg8bjr3dew8cwtae669cuneelpolufo',
                interfaceNamespace: '216evl8fr5v0f18ulzo4q6hsyemqweoc73c6ktvaqtmjpx7qm8ne5ymqk29vh3ylm1ed2sojkidckrv9zcw061xm77a19zcwff688z4aafvqio7xh8wdm8unnczwlnih9bcz0unhtx0v9tli9n0kjhplwqd9ifnv',
                iflowName: '7oah9l46f6z62467g1qoy0zzoj3pcb0zulcw8hgp4oqfuu2g3be04tdiyzz7mr12a00d5t2zs2tl2zkp6vt3rlsbuxz2fvicajt5p4b4mxkwh3m4rkhhhlibhtzaw8z0y4rpjzb8t0gn2102fs1phxdtaki5a6hf',
                responsibleUserAccount: 'dw02xmcx6x4yof2uto26',
                lastChangeUserAccount: 'domqjq2ythhmy4rjvqlm',
                lastChangedAt: '2021-05-23 03:08:39',
                folderPath: 'etdhuf2ianhuj0eyoox5cqysdpqev2w8iqg4wsj8ey9ior1c4f2l54q8j5c9gp9pd2ycvjptwy0e94djm2rjwyrwzf1wiu71l5qjiqn4yzdje900e7floxjng53vjvz81kwwhj2z0whwin7lo3rd594w654w4rxjshlezmwr71404an226oa9aqahe86gw8t80to6q2tqoze1z3i34oc2cdn7nxhluaqfp56nbhl8c44j4cme1egu1coy4xpuuu',
                description: 'ppk5il9m3wuz0qfrluqel47jikik98ecgety18y8a9giz3i8utvi0hvsiy97stqznihv0y5mxlxlfeft94sia1npt1sj2e4uwlwzcqxjmsx95x219f1pk0845d3l07m5x63ljzttixqsuqvhhr8b4kkkz1h6ws0tkstb2x9f9kwe4stxlog42t3717y29rz0g70ket87s23awrgvk5q1vbdf80bsc0exlgmzukwsbpjn98uosb40vbxuyqxtcv2',
                application: 'aut3vag2gz8ua9qwna8j3oe1yeg97oymxxh2np5v7v1899y6pan691bqywdt',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6fd20c70-131e-4fc0-99f0-1081d6606132',
                data: {"foo":99604,"bar":17795,"bike":36408,"a":"@lXL=^Hda/","b":98372,"name":24802,"prop":92103},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash is not allowed, must be a length of 40`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7058b3e3-59cb-4143-943b-7ebe2e671ba1',
                hash: 'vdcidbs5vokq5hh1bsrmg2ee6egp84uqdvicvdg3v',
                tenantId: '1669ba73-5259-4263-9314-ab3a19da6132',
                tenantCode: '1i02kgcwj5urku0fzvya19dq61thl1wqupnvxer933ylh8j71o',
                systemId: '5ee7715e-9d54-430a-b14c-14326d2a004f',
                systemName: 'hjcqmf2tpktup7vq8qss',
                version: 'hy6m8b13hm47nk5ouss8',
                scenario: 'xps5f6v3f0mrve09tapp2c7gllq6tptytx75ljq4785hi4veunpjtwe9dvz4',
                party: '79ehpnt7wur7a3nmjlxzwt8iu369deb93h22huh38gi6l5mrgkaup2bb3pkzszpb0my7nsm10t4z26uoldr6ynscm8nwcpusopsziobgqlj9qy4me7n300i0at9av4jheo8btbz4r151a10ywgfeg7ruk6v5ncx0',
                receiverParty: 'ixyd66hlpssd3ojieormuka90wiev7ifunt13k8u17d60d0hc4nw7yb8uqm0dojgv2pje4sbe7kmfgc7q0kr54m2kxe5ejdpythx6ams8q2ue1rd86kpgvn5uksbkkl1hit2fyykexgj3nttet7lsh0el28l425z',
                component: 'h2sv92rmtw6wuiqj08h2hwztki76w2nebv7jnk2b7zpccaeizajycnu9mhmppphwzm7ssfegxdj97pksag0l21h0fcnkomps6d8ix0ltaj5gjiizlk06bfw8iozuf4nz5dc826smlft5wt3jb4w2a2kh430b0erh',
                receiverComponent: 'zt06hu2prk08cq615u07nfqolnd4rjb1qtkhgrfaogbwitkboiaz7fmwsea47xiihzj70n1yuuqrthrnciufttseiwy7wtug31wodhfhm5ypyiwnp7d0dxplekto440g1xmkscmfq8ko5x2ib557bxrq61ihcfh3',
                interfaceName: 'anpbm3xo62mv59au22lcf8nv5s4ddxrzfhhz5ydgbyj8tfks13caz45tah07oikmb7fl7i33djljm2vwxyv06f2rnqe0ji0maxkegk4063ut61o0xf3q9ubnrzgnrpgvpvv26xdqhhj53731oov0pl8hvxwmrabr',
                interfaceNamespace: 'xi671pgzmulqk4xzx1c3ri2l3o9vk4gwcc33yfm3g8kj1tpwucux9nk4fbfzk5x5yuszca1wylu9et0f80wob2q8mk3v8g01as01nef5zy4nu9bjfq14zrnvuemvdupuv1ajmdv0zix4lr4mdxoxuv4zqh6jv4xl',
                iflowName: 'el82382tfpcsafuya0wwwpoqkontj4n52eveqna8bg7wc2zyldi4zrwbzq1rs3lqpeikmn6uqvizuxiokcfah4pksmpyuhgts676z45tqc4k8ugrq5tw2ebwqlu9elecpaat4f08g0f48sc5l2hs3gth65gtxkzu',
                responsibleUserAccount: '6jf1eczrx7k8akblz8s1',
                lastChangeUserAccount: '6a7eqlw54qc7t52ls6b0',
                lastChangedAt: '2021-05-23 05:39:15',
                folderPath: 'b7pkhebjn54hnpzxvys8bl0bo7mm4gre5oahw5j3n626x1a6i6nuxccfvw2schz8922gchgrm7oce2zv52xogb5nuv2s3774v4cbz1det2yencef98tt6h57yb12vn4ioiigcjcb2c99p2ri7lrp0k8j2y1q6jwdia14srx98jtf9nvzk9whdgw60rgt7dji4537zhuulhpznhgqv59ok00nptwi8649ipl6fyqbl5mlwdaliaa17yn7evfpdzp',
                description: 'q172wzkhijr31hcjb5hr4p2i5htviux9c4zayett8mtdsi9n23xrmaybsloo0ropmy21d0q94hcsy0jkdrab26fduif7jdxt8mgr1ufady8ttuq0dxaund5ejgzcl2a86uaa53s6klwf3xht8pdazm43nzkbjltw6sptfkrulww4bul8tfb62opx43mjiv35uneqrswni8j5debscx6rcfgyfyzz2ovje7l8uvvveae081m73rwyemon4cchumg',
                application: 'n6u7x2ur69y9e977qt6swytai65apwjr77llqx8bs407qxbohp04a0b32jfz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '3abe69bc-2154-425c-b88c-b816586bf736',
                data: {"foo":36414,"bar":72125,"bike":18412,"a":37360,"b":"Xj`Z,jv756","name":"(g;bX}YAPE","prop":64649},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash is not allowed, must be a length of 40');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6222ce3c-f382-41bd-96fb-697dadf526de',
                hash: 'b5te0ilxbo92j7ur30984u8ga6jnv3mb8gbvllkw',
                tenantId: 'nekrm02lz0wggh6z5m3vm5fautbzuxoq7jbmt',
                tenantCode: '5k5hk6firx30s0mvfgwlee5dbs055vxemrcf84b8hlcd8syu5i',
                systemId: '4f2edb16-fa53-4bd2-b74b-d0c4653cacea',
                systemName: 'zscdsngqe5o7aaebfvmc',
                version: 'nsrmv014ql92wrx9k6fd',
                scenario: 'ewflmdl6utfuqgoe7g1sg75dx6xria58y8axxdtihuadbc9t8vfupk1j5weq',
                party: 'lt621itdy8qlcgqx4a7sgzqwbfg595duoenlavnlltfem1ggbqc7oscishp2jof8woz4xekkla5ajm4gcu2uwt3zlapohgjpixqnm1fssw6n3ydr3bxd1p5ppyt2m7b5sjkus3q0090czn92wzvv7v27rmwni8bc',
                receiverParty: '6wmh844rvusaqd13y04kzt0v06s304clhg7y5z1pdh7ekuwvax7sh8ftcibdemk9p60zb11c5wrcbvutdfxzf1clsdlie51xkqbbzo8fkye9ugzqir8bitt5z9ml3dp9u9was3arrg4lta3u28k2ll3oao8m1vz7',
                component: '7kmls45wsassxeyf50gfxz78z4xdr6u0hzpzkcq7tvqbzwks166l1ck3pfmlel66qs32358a1samc5h9b63a1uaqsjgw2dh0tg085p3uk55y1h7fsqrlx2x3fnqqf4rfzxegxk1l0tq4yepp12vkyo67vvetpq5h',
                receiverComponent: '0ievkqzx9c4lffj9da9njs111jdoiyclvf8t6o5217wjbbkcziy0lqjp0c4cghnxlroa5ztq56ttke5tzpkl5ioc3rb9b6vqka61h07fvwlvmbw81xd727led8etocj8tf11wf2l5wj2wd9swmpa8fixzil8xfuh',
                interfaceName: 'jslzu28qg0yznqny1psykl6f115v1ctdrxc433j2yt1jh0zasc1llx3vc4e1xv3dcsbknfrynxfn09vwenc8hg96rtfhp69ruuvzn4sbbhwj7nrzpyghp1xcdp813uksjyfhqkczmgpieqd3whb9vg0r66q9tlsf',
                interfaceNamespace: '06iw4rv7qjvcn84waz6aq96cjmz1o5c6noydmwzx9kjwel595srhpt8ub34ixdcgikwudyw8nnvfrfkrzfkj1zhko1rjvxs04l8iv7heepge2dkhpxc9pojjup4b1sxzf645txklvo67sclscc9lzemnpcazdm6d',
                iflowName: 'a4r0wz03odfv17yuifu5oh8zjsknscivunuo2har2yp1hwzjgw5fbe1c8d5o6zdz3xut48jg3sn2lzw410ovwpjks4iszi7vbj1fxv00qjt0ywhdbuxgm0pws04cq2qimbxhqdh30t8yctzdsgqq9n8nyay9e8sv',
                responsibleUserAccount: 'g44potrek2cqa652x3y8',
                lastChangeUserAccount: '3o7x9kf05sj5iyin7aep',
                lastChangedAt: '2021-05-23 01:57:51',
                folderPath: 'qkntnvp0oxepkwlldefc3zr1e9k5o2v82rxvm3bxjlcqdbgpx7lh2vv9ey3y2nv4v4is0s0ib6hzia649konycpb2i5rl34nnw563arikx8us7zja4x73opohq1dxqcfyd34ve4iwz5uf0owjtepbl6lu5ww57l23ztlfkjyy2uj5bas5fr34v1oqodsvrqbfsb3zgcqyswklhncn3c0cbzan1r5d5eqi3izymlwqjbqktldisk30sc0dno044i',
                description: 'c9xb1cb530s9lzieo89c5zo06wfdhwqrv1y6zflxv1t8vfszlyewojma2bcj7tt6cf5urehi1xineoy7oc0h9e3qmqshcm7s5d993rsnckyysi9id3z7qzdmqrl06574p1ecy61pleixsvmc1vl2hojf8jv1jvigm5k458fmrpr93062y09r6jnawjkn8gu6v5hm4t7f6g3t9ayuua0v2nagubmoy7s1euaruml9g4aoczdztv6batiktytt0ki',
                application: 'g9tprtwynto22d5s12labg7cdcs1j1256d22youohacp25h7nx16fv00pzky',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e34c5f76-e3b5-42f0-960b-a6e32207f72b',
                data: {"foo":97685,"bar":"00M.j(wgE$","bike":49775,"a":4241,"b":11349,"name":49138,"prop":50923},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a7682446-e2bc-47f8-b44f-0bbed4adccb0',
                hash: '8fsomjnyql8i9xmuok2vffu460jtc294jnpvskou',
                tenantId: 'f3e03d1c-fcfb-4946-8759-d65c877b1b5d',
                tenantCode: 'opmj36fivp9djhdgpn2pjgyg2axh5to7gyq5gi6yfq7enrd6dd',
                systemId: '7f5qubknxfw6nokeic48w7jysa1qucg0lzx3y',
                systemName: '45ywvwnyafalpako9vv0',
                version: '71pms31vvbgb7g4ip0xl',
                scenario: 'azubuc2pa580cfk8fefqv8dve5vpxcfccf5uz7i7ic1idesjow169fivnqo9',
                party: 'b06a3zpwvluizc4tc5v3z41entjrdxysc8a648knpxo8wie2pow9ep52yjkj4akn7syy4geu2ltujxxeiqfkwf571pmnrixnyfquaqiuja7gor57xv0xfxwm5gpqc3dxq17fj0n3x596vva400z6mt0hpj5zlxjy',
                receiverParty: 'zxtnbkoc8rxb1t7mioblumvac7xh8mjflmrdbmyahbfbjjsb9079o5kzg7ldcozymg58f8uia9z1t21t0uh24x0qqt7hfl64jjndfa2zg1ghj1tsa149ptc4iof6yfgoq2u64cdif2c0xqst1kn2te25mqafcxxp',
                component: 'oi5rya3u9hfa2rc2usha5dyet0bg99refesxhwv5hztgc4eygop27xbczmtc390oqrn2y14j8g8g38qe8qxg3ucscx1ja3eae4ggys762vwzms99eof68w5beklpvb44gmh7mpjeua1yp88ca0bn5ru8ido3wg9p',
                receiverComponent: 'jsarc446enmhbfy8n97nvok7mjhf93ivmyu8pl88fphj9imd7guzud9ej95fr7rhdxhwovqhkohhvcomn69m87qkpc4pifcbptxft56ay4hdbvagqfvtj36myqfddblur4808enh4o4k3bg1zunzuz2kuod1zozk',
                interfaceName: '7z0oks151u9o876gi5wonltgoj249397fe4e2d9ytl3kxfc14hll2hnf31whpz04xqwa2q34u7f255ltavj57kfyccjb13goxt4si7f5rhzb54tp4rpuzhcygiy846fkfl0diung0gnnzrg7mpyum9lw4de1d507',
                interfaceNamespace: 'fmr9uuif5bne7eb6drodik0hx68c8w2hj7t74ak95psdf1dxwodgnm47nd1sqrf6817zskv90yk09gt5lqslkatkwy0l57kz1ha4w7r1ombzvi8qlz9ccsz84mt0jvs4bsud7sl3s8l9qramqg9mspo9mxr1hycr',
                iflowName: 'svt7w67u82ac5px45728s1km5tt2d04n7f6mccp0q4xibhjuo4xyhpjj6pn2tu9oh7gkg0bj1k6u735wujvwebqxgw068q4ps5dy1x3fele4gswpj0s9kogyx3zwy2wzbid5iblyws0simxv7uc6gsx56qv3egr8',
                responsibleUserAccount: 'wmpxradh1tqfu73sbtig',
                lastChangeUserAccount: 'wr3it4bbvxcx3p63qn6p',
                lastChangedAt: '2021-05-23 12:24:18',
                folderPath: '45hvb4mjo8uso3mx5xp80c2334xkxd5m1ovdqiz3ijon9sz9bj873jhwtezqn1ilsrpzl5cpgejq9cknk1a0uuy0lcuvkkq84k3hvojh37ovdanjvqc5oaewmyyux1vpvf3mzc9u4a7ykkoxxcxh8g6lxngh3yz6g7ddwube6j5damy0n9nwjhh00uirin9bi0wjsmnq1ptnoc2zv58nmyvpb2euj7o4oclhjtzovsnes0tz1q4qrgvvknmwoji',
                description: 'ouz75rgf9paxv8ywlrtthv44v2n75ewjmzci1duh4tdz5mmjmd2rlsr6xv3q35ikzvtre7ys0c2ebil3fvt24zdlneuywslvcycjiu5nkq7690ir0q5hu13wbkcrf6srt70c0rpuvulugf4sg15f0i6ig4cp3tv3zdvr6l6ut5s83necrlueu7g25y3kmtwrrwckmuqh6nk8itggd7x6v4do0qu4ekr8n5cj8pd4kaikt4lzrxs3t04gg35xyps',
                application: 'wojlkeqnxzzdssvwxuflle3kbz779hvl3pzd37gxyvbkzoqe9enqmgrkzokm',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'de702384-fe8d-420c-b4d1-6d00b997a8ba',
                data: {"foo":73799,"bar":">p4e*y(j8P","bike":60452,"a":35018,"b":"={V$Zm2ucr","name":89522,"prop":"wE03>Sx57V"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '48bb9095-3a90-4176-92e9-b2b341c75696',
                hash: 'wc5lmbs7m39mhg24cxao37aynu09pz9qv9phg2ze',
                tenantId: 'c0c3f50e-ea9d-4d71-ab4b-69e3f28125e8',
                tenantCode: 'ahf31te8uqk72wu0vfpwy8dpko9aiwun9i6m3twu719xivxg7y',
                systemId: '00cf9d7b-8b65-419b-8dfe-cce55158ce02',
                systemName: '327u9dyrp18h81jt8vn2',
                version: '6eb3gqyiycx6utrq61dv',
                scenario: '5byf9i058u2u9gfjn2m3al42m90z8iti4u1g2gfywspgop02vpdq4r381cnw',
                party: 'wl58gka14l5ehp6yv6g9etzgobncie7pulvzgw5sgofun6dffm8hsyjrpeq7vtxsv5fgt86c884ym1afifz22fvazsr4mcd96oymrazxbc0fi15oh40gykanbrreg5i6hi6s8lukqoco4ulu4cpslz506gfv8nke',
                receiverParty: '07u5q6jy1zshn5qszes3uoktl1dygy1fokokrtj48vfav49oexq4yq1uchivnpmw4dvw9wo5jiqrbfzf8vfbgz3x413xpp0bllorllimv0s4bzznyzjfkx7imupzgrq6cb0v3j1u0ntkrf7pa8tis12vianat8lj',
                component: 'sepy56xcvpsqrdmp1s9mt3z8rws8y8rbz0opyths4i24k11xfsr7e61rq9tlx461qh75i2lxar4vh1vdyfdbx7z5a7rkado94qm6tc1t424nl3k84brk07ep2v5ngnfsgftkj5p6v11yxyt4n830rjc8z9843w8u',
                receiverComponent: '65hf62vtonrdoz2c1lk0xa6bwua4l7gkaisjbhm4g52er1ohts082sxc5yc3frgomibnpfm77etba1qehl9t5kdpet0kb3g4ji8agskraive386dyiytjykv7dczxpvn2te4d3u7io92m1luzuw9zkbyt7ihkxk6',
                interfaceName: 'wqvwnysln50z7sqenxxhc741pricyzs5trbs1q2kc443iazitdzlepotvqmdldx2zohka37mt5tosf1cp2b7jtbw8zgy840kclj0m6najuekczqzvdroesoo38t00ld7nvarp49lj4kbkn3pbn96twm5vnglf6nc',
                interfaceNamespace: 'j2rd70xzys5osv468tvygot1qmgyj1lm2de42ltm9kad85j5zcz3o7yhapi6p7u82pdkrb0a48iy3jk3cp8uipwy6usqcoqnp0rw3lj0purb4o93rqhk2hi5rlzgoukgn3673hznqebrcf7ehv8dbhu64fd9w9a4',
                iflowName: 's1b13x3bbyysc147mf2hgn3s9jnvucinu5qux6fuyeahjai8ucavbvzcebj5rgfimlpsy0gnid0fzgswpfx2ozjqjg8ymyefgz8zuyakwx4j4y8vkzo6v8ubwb4p99hho5bvu20sni253w54o41owb3h0ox4fmh6',
                responsibleUserAccount: 's7y7wvugqxg9v2o3hmju',
                lastChangeUserAccount: 'pbdsnrumtfype1b4xszy',
                lastChangedAt: '2021-05-23 22:29:18',
                folderPath: '1s0nczjw3u2pf81c5ymovdx3usnucublwp7ap2utgootimwkievbwj0scvrwnejqhoun30vsq9c5yvgm81rdd2lk2vgwhpdynur4t2pnyswn08xy1iqpffz9knqe36hgkzw6l54hoby9xd33gdhopsb549c84wr4ko3dtufk5iwluzmskbhas96xof9w938v3apyxcshp9hukww0w7f2wa0uirityrwyma14vg04f4gl0j17ql546b1zxog04ap',
                description: '6n6lkz08fmcwxmsipmzp9zqqd9vycdrmgij1ohd5qcchc9946nlixiath6xzflp05cactn7jrwvk8k0yne94krz0l09tgfpzbbfdtb0g7j6ejl8pf3tbgtyt4qn4adl8k2r9awisira06pxgzenfxkq7patt37yydbpkal9uoi386snbunxjsbh18gv4remunvn0mlq5f7s3nlqbymvtnx3k4d36bid53doca8sduwdfwqp5q8kdg576abo4y58',
                application: 'dymjljzwp1gwchlw7fhc2zmglu0pawmxblmgxsyzwnchrlfyk7j2aynjv7oo',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'kmq8on8xe8sii8rcybn1ebj7n7avze6vku9v5',
                data: {"foo":92829,"bar":47141,"bike":36775,"a":"2x;-PX>_/G","b":"CK/Gow}O7s","name":"-X|5I9;a^U","prop":"r/v<09s\\gX"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd6afd193-2eeb-4048-a90d-9d6cd761c069',
                hash: 'ndtv2xmi7wyrkmy12ju5jd57qz5hd1n2n7g4qmvj',
                tenantId: '7185cd03-1dae-46e7-a577-83ed7e594640',
                tenantCode: 'bladhgeutfwkg0rsnyqo2rq2zcb7gt192n97szf3lyiuv9czobs',
                systemId: '823508e6-9044-4aab-960c-155f17f2e484',
                systemName: '4g13u943yf0mfnvshm7l',
                version: 'm5fkjy2rbsxe3x72advu',
                scenario: '46u7n2b8le7jcq7a04fmte1zkl7antk7mn4w2aa9rtd0hdqlwsyhr3uy34l2',
                party: 'crxewalfgvqre6n8vyglr975ij3hgow12z9wdgyx3n84m03mzwaigh9dbgctcyo7jr72bnz1i08afwo5r88r5t6en6pmyov7etu942ce0m7rpzonkbkzkmnztcd36rrw6sxijh32l0x0fjwhj1yheb3ixh1pa6uw',
                receiverParty: 'qorq0wqg4juz7hmmdgo6dnb2i7awyact52pobkdicwytfu292qzsobu8j1tpu8ophlwetiensx3733fp6nkkr2fol2p28o58yp84irs7u3zed01021hpxfpkt8jqrtbwcqn0irvg5vquekxwe0jur15k6khsuje0',
                component: 'ros1jemkoequnw5nbglggbnqs9783ef9ss97ejhbqd3yf7hfdratrnj8hpwpueamzoc0gt003x1bpzizqbp8on7fxm03tp0lhuwhdjymv3f6r5y4gea744o3z3ygikx9sb20mprqhmjxcpugd91v254rlzcjez5y',
                receiverComponent: '342zdoc2cjvwfowk16l00i8fdqmwoanckt433uk2vjdddh2fujk0bygpeprw4ioh0zvmw0ok9tt9z4kmahx6kyl6gs93l2gc3d2sqwysk44fy9pil4ceenwctb9f28gn8e50lrkyh39ssi90kxphv8wprbmo45qn',
                interfaceName: 'kcec2khl111qjrjjicg3bun9sv1jlc40e9s5ep8a1sb4hjkl6qn78m5oh4dowrpte1piq5fbhzdz206ofd1iyb94iv4yd9u7j2gvwvyplh35qq9mie5yub0pf6xssrlahcwhdcnvooiz4wxqf1b9dqfj3t4vrsbg',
                interfaceNamespace: 'e64nk9i8lt7n1zztacpymo04p3mu0lkawht79ce9lm3tmw8yritz3daqb63uju7twgjmdhr2dxi315cs3z01jghj8kmhpwzn018fwt197xa91nayiucscxcezxwmsj496nsve8a83na4w0gv83hajetchjywultv',
                iflowName: 'wpfgrkfww9ja1s656vtfkf8o0c36eu3fpnzenezqp3scy9uza7qaify4c347ajjt65wu1uq0mjok9mbv73ylf3l1x651o1yb0g09vhbussin2epjo87o5e97bsv56bukixf00k63rlfj6llxj6h6ag4f1fvemi1x',
                responsibleUserAccount: 'oweborej6l6wr7b6fsj9',
                lastChangeUserAccount: 'w6k77ooxb5xmqdsb7o15',
                lastChangedAt: '2021-05-23 12:26:15',
                folderPath: 'c0ea6rvmygx2oqyo150jdrawyoupgwtkrtnx6qjwz1wguy50s125sprwn1hff7s98j5dupaf1f16emlsonezgl3nbzsrnmly6p7jmdgkm727fjn25tzj5u7qw1rakkh0uvav3slzrnbpqynlp0cahjjgrcfw4isek5xd4cuuxehw97ednxrotx76do9f9dbunenu9kl0m3isarozld95iiflt4oq4e3r0gl1r5lgucw2tijuh20guh1qi9c4lfh',
                description: 'l7vcpnktfvnno0uy0mwpzwbz06aavzyga42nog8zhddcjejzqzdvqahtbrpbkdr9zzetq38mqq1o6jhvt9iy5ggucrdn8v4bvojcc478dnjg436hnniy5kbltl52xp0vdyyzvihd0f1su10e44rqu2toidbz0ar0vwv2enadpyhtfx8ptet29w05etbtomovshh3yblbu79z46yzohe7u5nliqhwwgue5fz5xsyj6thb3f462xihpnjsfcjvi7t',
                application: '4e1bbdcw4gtnq6iumls8b04ewkpgnawbucd66elxklbnk5fbhuijeid116wb',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6c6813c0-93f7-4831-a222-a4bc1c2911fa',
                data: {"foo":"jA&!S9a_+R","bar":41539,"bike":"`r,xc3wXLI","a":",d}25R5:@U","b":91027,"name":"}#ucp$;7,r","prop":"6QD#=[9yrO"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8c7baf94-e3a6-46a4-afdc-88d86ee5fef6',
                hash: 'l36hgi73ckyvrbyn5g31ar6t4os7p6rz26z6qpcu',
                tenantId: '86d16e02-fd86-4c96-bc0c-07e9e96dd82f',
                tenantCode: 'k3by0suykxbc0eldfl468e9nlmd3s9wiyie34hyfeqwwpwkw0u',
                systemId: '5c36d773-cb10-46c8-9491-ec24189aecf7',
                systemName: '1b2earwfpnvymlxyw2cbh',
                version: '8r6h86l2l3qg0xvbtl1b',
                scenario: '8z644uitmoldos1hssjm30omuncod0zxpyf8kv3db4ptt77yk8dabw8x3stg',
                party: 'wlc6tzt9hhbt68d7jjvzqf4ojod7d6hom0woaynnmesz0a914qm9p6kl1kf2mohtu320grgd79ppasncbv4vflnveu56geeiwnwz1wxm5gg3eftieo8ei06lddtl20puz0321o834351tggpgtikja3mt0efotfm',
                receiverParty: 'aqinbkddw914jhijsgrbkylpmvrljj243vck5rgdfolfg9mn3f93kskd8bay1mlw7vlrtpp537oydt7nk2mjkpjrtfrcpltg4yqy6fhbftz9ibgox88au6n0pu6o2o0olsu7hhkaffixkxf87tvtdvw07a07all8',
                component: 'xekoiwy9i1a751t70k264zv4irazsclec96zg2l50ngy9d2nuneigrgp8xwdm78nffmay6y786oan2jq0ywxn4pu5esa62orno6bz2lwnre8xec9r26lk8a999jrpe3hq506f31xsdfnmlk15rt4q4h3jy0n9n70',
                receiverComponent: 'k2vmd89yz0muvidmkqg3zsdagirvaj6u7m13auv6e17tsfs4m8h4p0t0e26cv1pxsooyyvcyp8he9pp2577imnyk1sxjq32m42bodrzkuni6y3y4e2waahzbuozymp3wdpuzsi5ugrhog737uh92608ugrxlij9z',
                interfaceName: 'zhgbtov8wcny5vdexbyar3websx9qfly2ool8n2x38icst7c504mcnhp7a4llyda55scu93nqb9ox1qd2vjwx9o6o9lgd922kim271r3z0oebsa7q786ldo72dtupkliwvyz1a68sljmzh71z41pnhh5u3f2kykc',
                interfaceNamespace: 'm0gpxkeulj6mc2e371lkup6ox135db8e86fwoyov6ogfsksd12wpjnhc2ibls7e4y3tsrwpjyiby5l6ilwd9wu4v6fphq6q9euvyru661xgk7mbks2y0yzgfe57ccewa6rsmoatuj9kuqd8fe07b0tac15q1eqtn',
                iflowName: '7hg7d7h6hsn9y8t78e0xakmll98guw79m8vstw1xg9dajvruv2sxn9zm8csclslp2dnx8j2rsy1wobvih0dqxrlyu68ygap8n4a9n0igrhuiqk7d08cennftu4skgq2eplmxr1f8rvbjfrc56tatnj6ed1t65i19',
                responsibleUserAccount: 'tukzrj7xrustjutxbsx7',
                lastChangeUserAccount: 'bw4z4ccnp4kkh9t644cx',
                lastChangedAt: '2021-05-23 08:01:38',
                folderPath: 'i73n865go1dcm6tcta9k9ikhjawqpi49tb6mipgpvq7ls1xw9yybwwo4ap7296lz790e74xacko8jcoheq8lb5jtmq7pyai8qqck0f1eytlus7jq4swzaxhqiax14kdeosa0w2be7chbwg5bttoh9ed8uv81kf88f2muy595ojdd3xtgsmff0josj9n8aysgbn413x5x28xnmeljlbza0s6s535hp73dowguc25r4omi3h7u6l58gnkabnud5v0',
                description: '9rathdre8f7rgng0y1v4qhym0hkkzs17yujvkbqlyu7h55ca7efjzr7uxw71eiwfi7euwgd5m6j6br9jf0ad8duinzy1kv44nmwmyq6yzs5e00bvng3yxwjozz55c3mw8biior4yu8h1pn74kttydmjw2i50fk4tfho087v79jwnok9targsbx2k506pal6b5m7xycveb7au4w3tzzlud8rg6ase1ijnjp32gdchjk0np3cg3v6webzppezvugf',
                application: 'fttixaw6c90sm6zabmd0bmpw2orw7d248wznikhw70hf93pybc01gsvd296k',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '76ea65b4-206f-49e1-9faa-b765d75f5db2',
                data: {"foo":53845,"bar":"4bL.ovM3l=","bike":72274,"a":"ZqHq_ay]j3","b":90019,"name":"-M=9JtI5:I","prop":"rDII'x7R!?"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '40ccbe93-6953-4d88-bbb3-c522839fa553',
                hash: 'b48r8vszrn3f7mtq8l3mlei55e4f1xpi26eml08t',
                tenantId: '8d6228fd-e610-4692-82ff-3447181a9d90',
                tenantCode: '3xf86z4sss7y4j9cgrtbbyy4mbpl4a3rpq013mocp939ksxo28',
                systemId: 'a8adf164-45fd-43c3-bd25-42fd98d6dd0e',
                systemName: 'qnu10fktk3sxm5tlergs',
                version: 'ct6ckr9yd1e39p62njrfn',
                scenario: 'v3862qs57lx3glyf6kes4d36apxmc6rv6lmr87d1lazjihmhlun4sb7fx8hd',
                party: 's4cj77evq1hjq7fzxdh04vf5fnwa42o2tk0tn4oal1yrl1s24iiihqtjzgvvrjmx8ud9hc4k97b469lvdsuzvemcpkv9wbkhrvfnfr5qzhneggrl92v5vnj1pjgnfcgbxz65yfkqrr0xsq4wo9v0k7p52vs1dk27',
                receiverParty: '571cstk8bz9h8mvex4h85myxe2l0bi64sri2cbcu66n4ucqpkxmx0az4jojy9eumi3k08wkebo7xqedr4huq06yzyv4454mxfh1kqzowwv6futpu0glosm17adionbdk7ohunt8mwzmcnktlsbtqzr02n2a5i8om',
                component: 'unhw1knqzoacm2qwttrsmc8guc16hw85wcesjjudk9n45b97abvf2029pfcutontj0ie2vcdwu5ykke30qc63ek1tucd3h7s1526kwys5yh5yrua6nltouinxac32ehospizkbd7m25j4uupi3jlcs1kkodl1hoa',
                receiverComponent: 'v26p0lkodzsb8f57nmnzligqndquh21gdcssfkb1mqdnfwgy6wxryc2jm3gxrz5xly07b5kcvzm2of00brq9qp3jf79x7v0hdli7u954dq19olbt2vqqsa0fno28pl6m0d4dytjmeme0pxbw4sin2onqnucgpwew',
                interfaceName: 'vh97mm4z4yr1cvhsbzu3jpnsqiwq1b2mtbwfgpsrwkyiwwmqiedsg8t5o6tmgj71dntisqr28cx50w60upww64fejov0dls52t2qv44xrkl8ot1eg16s997i9zgkpi05t6dbkf1ea3a7rnfa4zy8qo64ljkmb1wz',
                interfaceNamespace: 'q5fy5pjhzxgc79u9ptlaw90f5lx7mnro351zby4f0y5i6hccqqz2ousy2y08lyqgesc17lfvuds1r0u8ne7dv4nhp0qgl3zcbbrlljtpn4g74b089awl50np157ulm6a1709nzmlxa0m8ctq3zahmoxhzly9gkjt',
                iflowName: 'cs9wbx8akt9mmpb0p68e3tkqczdsozkywg9iqhs8jp911jsw9onvc185dt5n8jfamv3nhjb36d82mogsrtsa9sa7mvsm4uuyivvd8bplxws6ews4rs0rpmvmxuf2qt9u3msdo8yx4ih4mx3266viajaykd2digdp',
                responsibleUserAccount: '8ov8kb3t1icx5h4ewyso',
                lastChangeUserAccount: 'i5lbbilemyyeklogw12t',
                lastChangedAt: '2021-05-23 20:17:52',
                folderPath: 'uofve5q9chrhdena5deymdibcftxohms4z2mdpjiys3bnhg5824fy7n3r83xd38mrfk5ohrlwyy8n5o1x7pb8odj7139zmtju8bo3fndq6d84ka8e8e2r4bcvfxqyjx1rhcmkugijkz8m5a1fbrwm9lyo2csqpip18fhn0cm85b64mdtn7b2m6z1nqql77109p7m6bso770cqlh4qm6a8cm1rbkbl2rra130j31lnalz6cl7xh07fttnd3r6s09',
                description: 'c24wn3796khldaztlvt9u8qme2o5n4qy9xrt0fdy8rcyt6i2gvymdyaluuo48phlytw3fmwl9sdvaxj0948r0dgzfi7mvmyul3uji3fc3wka3yey1rb6lqdquu5ed935nalm3ihxwq99vovi791yr6tttzr0o0xexyc5zal6hkeybnhz6ejo52gtw4c8etfj6h3d149v9ao7xsjc4mlshtbhgt7ks7egc9ygh75zqjkn24qbemmi94zuo0dmu7m',
                application: 'jst3gdv5fr5loo20eyt5jaauyajhu5ivhzdlqyfkeot7ok02zax3wux7ge0y',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2d488427-3cc3-451c-9e60-90762ec4a580',
                data: {"foo":71639,"bar":"Qc0`K.S%Vi","bike":"hL$czvmA@j","a":88227,"b":"y'HRa8tN|8","name":"x6CnO';F[#","prop":17203},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '567fd344-7959-47ea-b7c0-93658593164b',
                hash: 'whsj1i2cxhgvd5x9uwb5femeo6dir6vpdz036esf',
                tenantId: '51c56ec9-7f2d-40dc-9cba-96b21da2b7ad',
                tenantCode: 'id3heqt25s0o0kt3ws9d43pdg1901x4jp1stu4pgfjs8bil8lq',
                systemId: 'c7f6e03b-5f52-46fb-a292-40eb835bd2b7',
                systemName: 'm2nuduf2ay58s6ms4jdd',
                version: 'i8q1wb6t49o9qy3bzq48',
                scenario: 'fc4iu58wqb122xputnb03124257v790g2u5da1wwkzhccj11py28vjjnift4w',
                party: '5d2mh4yz3uzuptuqnoh0mioq2veohtycp5mckjsm7g4zgs83kh53q7lu2k1g2ib3rt9nlc1fpgawrfu6y9x7zdajzrxwu6f7zx0xn30an0fdvf6yb2nqsvgv8ti50uuof0v5gcfzcu0ob6uyrjfp2k750tb3kkko',
                receiverParty: 'hbjqjrjfx1iv99o47967dnu07udt0rr4m317fwvrzc1jdonn6bb7k4wr87nssidd9h9dgz8ywrprhjp4fzoytrmssv62cs12hxzq4s8d2ax6iiwop5soqsveoeh5rezd3d51xazzn2u16f48elfc1xfnuo8ydf4p',
                component: 'gk57df5arl3ctvg41h2m6fajl769mkghc578qok5b6qfacuqmaiy7uaadfndkq5bq5eucazh3qishfefsq6jp6a983d5ijf68jrsjhg3we4lk2l4t4s3egi5kyiupd7sjy67voljl81mz0hgnpttagsk43kma5uz',
                receiverComponent: 'obulr7khcxxrr4j663qlxgpcous4pyascoutgzsamfd7mibequakcy7q0k40v3y4237dqrs4ky0njcvv1r7k40xapjyl8e9n67xi9kjf2qup52nbon9zy0d3okg53n4qzn66xjvne6vjcnlyhyn2mcmofbyupn56',
                interfaceName: 'og9gu2y83ypkvvjrpvj7bsteyl0a5wx0gbyn2gtpeqwhip8sx24lxds1uxlcayt4qurc0w53w14p4nm1u4dllktf3kfsh5j0moyu96k34j22u9bnv19zra15wa9h384jbm7jq0qov7vrxpxzdj1df1tkt1te488c',
                interfaceNamespace: 'ilnijpka0myu6wc22s2totpvd9i2rdhug14y7jekvxg41m5b33gurdpmxqkv632wsbi6gd79ftz960fhglkf7wvk4qakt3q7vr0vasfva4ppd4feubw4951l48xazip12udwoxr8iu68r0zebpe6apwv5q534hjo',
                iflowName: 'doziky3rha2wpdzukxx9ldxac8cay1ymln17i8mio25p4avx09urzxj0o5ox33iki0dcp9ugtw487i917ivw0mjotzfsvm04m3q0469r2o831beav8vaabf07hi5he0uyfzj9hisj184dxc53zel2c7gxndash7g',
                responsibleUserAccount: 'qw5nspwii3j9mtu6k6ay',
                lastChangeUserAccount: '6yun5uai8u78sr6r6v4g',
                lastChangedAt: '2021-05-23 11:59:57',
                folderPath: '62abw67lle8u10fihvp7x7aluqnj7o83wbyc804mwrxj85gaholditkaekwh15oh74jk5b0dqavs4jqjlr4wz6j10svh2c1n1eo7xox7h606aed511dqd8p2uq7qw144msouthipiaihjjnvuearea3u4yib103d5ec137oqh1mpmufnr7s3ayt8uebfr9u6j536tzw7dpl7t3wv1j0800yrwtnz04xe8wjsm6vkja8nis1fjp64npwg2pilugp',
                description: '3gto0z2v8d6dn9vx01wp21073grdzwmv5nnp6949uyjoz5l24b49j76wbiy9h2z4n11bpg0hbsedu17jbpsp9j2d53txxkqsbd9tyy8d8g676rbs7ptwtjvhtt6ez7cvfp2o8hkp53ksr2ymf2xi4u7ocl8e4greepk3e8xijxpjtxku6w9i03lxbpj9mjciwiu59mky1a2evvh5ju4jds9ec4y6tz1g3nf9bswpyhkca70y2jibygpg0m59dl9',
                application: 'h7o55kdqyh2piq0u3y4rasjk5c39sr8vylwr2t8ptiohjs1s2u3wzoqgaqtd',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'bb281579-b70c-479c-b421-7d77c911623d',
                data: {"foo":40047,"bar":"{V{?_Okemr","bike":76576,"a":56884,"b":96187,"name":58622,"prop":42209},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '586f3eef-499c-478b-87ae-4595958e17f8',
                hash: 'ewpmd788prxw2bkrh5r9to3fbdzn93f8b5q19tcw',
                tenantId: '2b87c579-9f83-4918-b108-79007e7dd4d9',
                tenantCode: 'ah3wzkc48ex8u3ntm9p8c3oxak0n9nh5gmzpbeelgs8qf553qx',
                systemId: '199a3e36-5720-488f-b0a9-8b9dcca76494',
                systemName: 'q6wbfs1spjax0cyvovs2',
                version: 'q5cd3esg0iu2hngj7s93',
                scenario: 'e2ecb2odelfyp46b5mqyclg5h3ecty66wok7lqzw09aabmbxc5c9m335wjca',
                party: '3r11ksxlnp1n66vm7i2i218v8l3ng5uks62jo3952rjppprpwaedpfsozl40ru5lwj4m583bk3nj2d5slutcgbezbqr6kaug5jwhd7krd3tpc0pwb6kx9pzfnmdaqw2wh19mj8mpoopgqcmh87914iojfv781vebn',
                receiverParty: 'vd6quumxyix0hul2w5s99kz4t0u6t7cwpojtarrbmzao1npuby4mxup3xa09bu8xvl0vtvgx3sc3crr86nlu15ap4asz36prnisn7e1lsanqkx5wubmtw88i4lxp9g1cxeob4qx85lgtbr17nr6inj0v4b3lktai',
                component: 'v5k03wwqdbw8di6kz54vaxjgavqew446746dxjuag3dr8oagkzfl03uj1mn8lalnqqzy002qtzjs1tfj26n6nlq1nxlah9ek2c38cek8425f316al1kbu7n21bkrdnn1xfj25ppuas432mfzf4o9471xwrbss78r',
                receiverComponent: 'w51kgrup2o0cmqwanwaemdfy0d3gdp3dsdfixxn2zq83gm4yfaxbw1a7v21ta8cwo189yph43emupui5iq8tfdhhrs8iejdvmzxi7l8p6qdao8ptidaglps8z04jow3j418m8n75i1ovexanfrjwt0v8rf6mfhqr',
                interfaceName: 'isw4jo9kau6ityf9j5zlz18tous1nav6mry5rtzf73z1wstdaqe8twid1e01gm1ustwkrysiliif9u2ey0ysjw5lzcrhvc6oowuow86mjlrh5czkyy3fjsmydli22rg3qz4uf39ykk2p1d0rhybx8fe00gm82459',
                interfaceNamespace: 'oyha6dk8xioyn3qpy2m5j0dvae8g6rg4zwpoyunrmxjb8ihophlwna38qeycgg19psxhwuw7s4nxgdtuhy7fl4gdco3liunxpuewux8u8alj0l85qwtj3td74i580ac3y9zmov2dzq1myzvlzly889fw55fj4vk0',
                iflowName: 'qpgg88on9muo28r7joiheztgusfi704mdi33pfm7cpqbt1a86nrjagm8szltgid0ds8umu362rdpz51snak3kqsxjpszfu4f4d6j6kf5k9wklvnnffj7eyb69hyptv4r9sgbjgg8kv8n3bueys4wqpr5lxll7gl2',
                responsibleUserAccount: 'ukdj9px2b3nxecif05a9',
                lastChangeUserAccount: 'mcng3tz4etp681uxgvln',
                lastChangedAt: '2021-05-23 17:58:12',
                folderPath: 'xfp4rpqkbs4v840ecz86msbite76ohw03u6mgghc04d2iwpt3japfnk2484jy5zz44ry6t75501e8x54g7x8gyzje2x5f9p9twonq9skj18ahklsjp8g2qixarb2nqm7tuk9q15zonq2oiurtxaq9e3ciy48ov9den8kfjty5w8xrchsv93ziwvz4frwyzewwvot8xrw4du9jko11xhvnxzd7n17zl2ylbr0epsmw9spwww10o6qixz9qlpt1vk',
                description: 'oywt2x8dig0tkumhr277ino2q9fy4nhqyg4dg6vh1icb4i6jj561arzo18ovg8qlnejiayqxocd2era9ayz3hkyo7kqks7a4ndgntlbfvs4r32blzum555z2m8eunolhda3v2wco4a48f2fsid04glu5e753ymhadzxwrfjiw3ar3i9afbi4j1pgjiupeh1i7lhav5k2wnqgc0mvazty1ehdrd3e10lkd8a4b2newi0pbkzypz74lavr9ghg7ui',
                application: 'fxohk7ffdy3ht5d5wbsru4vmm5yqa2jjvbzpdpjikjix9yl22ebhmihs4cj5',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '17bf0a87-ad90-4714-adc8-755322a44df3',
                data: {"foo":"AY>SEW,%|v","bar":"Zt,M3K?vn_","bike":83405,"a":59077,"b":60936,"name":39213,"prop":57511},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowReceiverParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cf8ad8fd-a51c-4dbc-b587-7e089105ac4c',
                hash: 'jc6o4m1vgz2z47qhp572sm21s62y2bptp42u4fmh',
                tenantId: '1999bdc8-615c-4d67-b56d-11bd67218c8a',
                tenantCode: 'qd8y4qjlaghzw8pm3xbxdkjb41w4jhjng6rdqjr4r5jmdhi0zx',
                systemId: '3f5c28c0-3358-4d08-8cad-4e830191ce0f',
                systemName: 'uvbgnh69cx1co4ut4skp',
                version: 'nnd1h64a7sfl5ev0zm0n',
                scenario: '6ylvy7juiami5g68sjjgeu5wtqzflpwsa4qwvbmeng4kemonk2zir2dw4bwt',
                party: 'j9ib1sefw64gr3l45v479lcjpbn6hb31ecnjwtet1vvtjyb8mbw8a6vrf15wi63v43po5kl4zjfy5e2nz60a1yg7kzek2qqug3z8yq7o54ym34jm3g1nv2jy28a7g1mnn9th8jwsdpoeulx62c5b86443dagg747',
                receiverParty: 'm8a1ln8rrj4ldzi8ydhxgo17snoe36or6mgoe7zf90hc140qce8v135un6e32899sq1j6ihgpqve9te6vzm3el94bmxme9htzcghm2aup20bf148ckwujzm0ii428u1o6mgh5rj8lug6f6fuwsisq99qwiwsb21xj',
                component: 'tskimv93j9yn7vg62mf3007qou75jot9yho771lw2r52gf3ydzngf4259k5h8etrfim17hdhzbiygl15wyihgm4rgeqtck4jylblv2aa8dk6pts90xxtz55dszla2lyob6rq6n4y8fl7e6l7sxjs4evlx29hsnlq',
                receiverComponent: 'w0rk7razqwzaalcnexnemzuagim3r9f2e1jjobwaoxe2tcwmwx41kzbqv77hwfv0drky7skotzw0q8zubswxlk5orpuqylobo4kkw38e4w258bgar9njanvv7c5n34s2hf4b4cw4tbpwifz861etxi374ungsjon',
                interfaceName: 'bt9thcq7o5s9utxg5auleixlgqs3pyis5wscnq2vhheezvjmbsb9sogndmiq6hgdbajs2s36nwhp84vgcvz3dibhfr1w5mmz73dhqj0dtqk7355eh3us79z4jbq792b4qtbeq4mdihkow5ans1y1wdag52hklhtp',
                interfaceNamespace: 'tpdlcrr9p5lqbr21dpxnsv8czj9quc8zmrbyknwaz14f7hsy9j6bl1tlhm65gsk5cbf2h9g1gohpmmoal76ha7qxkg7py1a23u1l5f3rwfn0smz8r8hvljkxgw4hhbqqepi7y8p0xvcglcshzzs6jue0s2d4oz6m',
                iflowName: 'urwcvzbjl56en5y2gvxcbblnthk7r7rl7xtmufm1mq3u1z6gitw3f5j1u6wgmup1gqms5z0jbrtzyfe5vbkxgxcqn4qtz6z34u1ig2q1xvtrpxq2ms6ygvznd8772y4z421bvcmp7dig4jz837mjkxl9alrwxu9q',
                responsibleUserAccount: '4pwi91aduf34pn20qvpw',
                lastChangeUserAccount: 'nba6b5a3mx2hsqpgqrl1',
                lastChangedAt: '2021-05-23 12:04:16',
                folderPath: 'lrtbqmp9hqtr4ne937jvhip5s9rm26d4yu7l6hrcb7maoirtk1njgmsc9tvmg1kvsqcwft7243fib99iuk4ef37yuolp7dkkzgzgppjeejv8pqla6x5rtdpxj7p3mf6wewpjoonvvpxnc4z6bnbo789gmspybhpwxx6gt7ojc0i232tbmwnhk325rniwbwgggnhk9fvqndlt6xff223oh0rdy67j30vg0egyj8dowa0048qk6sldyed7008r3f9',
                description: 'btblhy5ktwbg3v0s3gj55lf5siozkbxlpxmyqvy2lh8q1t6lk51zwoy5mzhlaun7x0cf5lei68dc6xqftek39k0ry8optfwho3l981cgprg5o6wg2ndrvhvfl689ez5ukdgtj921hv9lgwaqmjgsc1ap0klza3zphomjc6c624fkhauxlimhkx6j12vr76p4trz2c23bwt1ol1fdrnll63ucn1zkbnsei7m0roy7209ub57czrel5dlwllo7pi2',
                application: 'l3bgslshugknqvf93gwylvc2acoju6d9tjlwlii9q6erbhv1qqflksfhtc1e',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '8a13e1f1-3f84-4282-b527-5e2b0dec74cc',
                data: {"foo":"y#h5/A.<HQ","bar":"aUkOzBf`14","bike":33642,"a":31399,"b":23432,"name":39240,"prop":"LsIE5J`c'+"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowReceiverParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3cf819dd-e9fc-4eb3-9bf6-aa4ee8da3169',
                hash: 'yo6n0kvtmyiwyp6sogsqp0e4kjg9or2werk356le',
                tenantId: '3ff80687-d2c9-4860-9398-1a1ab64830ef',
                tenantCode: 'hrggxjels8j8oubxat9q96ugk4sd38dbyi6ez07fcxjtbb0k6n',
                systemId: 'd6437696-beb3-4dfe-b3c5-58b234ed0d3d',
                systemName: 'qkmndnnuof3kkrdk0q0r',
                version: 'm5vff3zxh4kghoe133fw',
                scenario: 'fslsszj6dkhpry41qd3iykxa0nb9l90m49xvdfxudobfxg16lu3t1ru6wjip',
                party: 'lg02oexwl7ugz2xit1payaa8syabwnu88di3cituqne7a7hs7n2omp4ix5ik2y7pemehe0ly6lzwgbq9270p4ityp3hn74s0oouxwfnvqkhgx6torfn8mi2oc6ud9iqycdobqb1j8qi1t9fwr66f35yudcwzusnh',
                receiverParty: 'm8shc1zvoxll56mchc84xjily1gzmiuraltys0dlql1uhrvkzsf257c7sgsfw3ylzkrte9itwz9exo5gt020cq7wgxccf2uvz2d28mbkuun4wh4jbya49i8yizrofsfmtf011vgi2ul8dqmudj2ger0d5zc6l7n8',
                component: 'lf79gy8izezqxchg9ek48gyvjaj6t0wnsswc836ypa2edi2ib9n2b0qy8h4vgn3datu3euhaaenm1jfmgnzuknrdp8ec26oertzykwrwafrckapar9j6wwoo6nn75sdjwp2nuc8d3a1rgxlmly4tt4gvt6m9mc8uv',
                receiverComponent: 'cj30pdqcyx3q4wat6nt1zgg1daiyv44na9zoj93r1sacekbnqj8jwcqq5aa5k1me5q6654lo3ho93la1b4584fh66ur62zrsdp7lpbmdlyg5tyly9oh42xb9w5jivwh58yv2rw9gj4z7cokvgvx90pbb8pj98wge',
                interfaceName: '6xchaolxzp4lpfphy158zvha2k1kd2bdft73v3rur9gc5oazg63zmmxs2brgcsgpfzaxazdkktaywan770azytds8t5g0z823bndzj8loohzo63kfj999edv6nlrmjr9pduiqn048kujif4vya64p80gogs8s8s9',
                interfaceNamespace: 'oqhl9of2il78zry54nd6pfnrerc385cdc44euqj2pmwni7zbk8cbc5gbibdamfpj54du4old4un4srtds9cpqcjgmwslu8mb2fqlfitdycv9it57ga2kp5x7e88lotp03gnkf0k2v7u9f2nvsp1h7o3uxh9pdp1p',
                iflowName: 'wx3p8y73hbn7bchixgxcb82j63dm03mfwm6zee72behgq4fotjrvdr9yoclxrf4ucf6oddlp1547eo70x383tjnxur1goys9tltpn112uso6m2euu6yn91nr1qp7clmxc4q76esp0oul9qeos56mlqyg8yq58qyw',
                responsibleUserAccount: 'p5a65nu3nahhn4cf7lpf',
                lastChangeUserAccount: 'dhvefueck32cxj9dd1er',
                lastChangedAt: '2021-05-23 21:31:28',
                folderPath: '5kdexipb8cn5svw4hnkd9h3uivmsjtjc07f6pfyrih6gmjh590v8l8r7a4jppaff47pj7ey2lwrw6mo40fvccscg37qh0gvq5uj13mq7yxn91j2bwbzqat28y9rbga6tm4rzpnt13m8487fsmn6adbr4v9afc169jbhwbxc0ngaaeykyvtjox6v9nxkmy91ps919qisjkovlf7dhm1cbmqs6ot91ysaj92r4yqq0xacov2gso29fmqi7553d9o2',
                description: '9l5nmivnj2um3xrxgzmu9ngze343p4hd0dz2rsxw0i3o967sz5wmyabuzakm6v3ouuvfxoiqrtk9skwjrswakfb6m0vlt1ewgq5vxpuxkx002d6teh55v0mtc4vqn8ms3rjzdlxtm0lxgzzcrzi5cjhxou9f9jjnm4j2ucpxvn35v2k6dthfs6i4fj5kmfc90f65rn5t1k1cflrapzwpjqw1ce2w9qs6xtb3sfagdovhgvc23z448njp6lc4prw',
                application: 'licjplkdlakm7cr3wlj9z11dnom37rugh016xin5s8p6f8gnsllwj1ijbnym',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '67aa78e0-8c6c-47c2-a7f1-2eff52aef8ed',
                data: {"foo":"+x`gxI-.VB","bar":83382,"bike":",SaDd{$oa)","a":"fNZSh4s`\\G","b":"VyQ(g3PvpF","name":"X!Q8xkK&7$","prop":43804},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowReceiverComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'feedc261-5279-45bf-9740-77cc73b92ade',
                hash: '5frztpqejhch4u638y33mmwob7jnyl10oy21smqg',
                tenantId: '808d7da9-e65f-4ee0-913c-52611e57062b',
                tenantCode: 'j8hjkmyqj95u2zosavxje58z4vuj9ns3bp8gokxi6f1ho73pk3',
                systemId: '1179aa18-5843-4b77-9921-a37d770fe927',
                systemName: '13rlpvuj781r2jff8nij',
                version: 'zcjq3pu54tjvxu7tu0dw',
                scenario: '2k5ofm2y5fivm8cdpzhi9mmfviu4vncm0axxeojyni5x7we0umc2e01bicly',
                party: '33zj5as2nrp7cw9revdto3n6p1nypvaglxevxkwzj3jqknl9hyqmrgieadeutz59zbygo6t291nxsgco8vcqzwszjzrkikaitpr0gf11bf4566i0ehlk3s6pdv8ngilwpph21eu81o202g42coqnggmudl28c0i6',
                receiverParty: '9ff72hltslfa9gv6c8106vzj5dblr7lw28c52q46ckqseufgoehk1w2gndehir4d0ahjefzzhk29iwvlnu5del3npxuxfwvzx9jj2908wmhul52hukmuxmdhpnlkv7ifvyrba9c661e4ow531e440l04n7m40y9j',
                component: 'ghznajafxjari82rea871zsxpcdx9rlgl4ju3764omo0yhh4ki6nlceah3oujgzw4r20yqiatuq3mswvitj2o34sy1k01tm76dk793km5y0wyurjtecityfofuehfsgq5ltu1w8snnhlol6zrm8qktrx29fdobg9',
                receiverComponent: 't6jp9yhstskiwmkwafz1yfv5kfvio74ctk2ch3uqab7kdru4zojmspt4isxckmpgqw7mtgpx1t1easbqv5jqpe1x6kn2ar08svgsjbfmd285l2uvomgs5mbkjydj3ioo1f6jvv3r45fl95aisfx6te68vgmdc1cy1',
                interfaceName: '433olwoo4tonsndhusch59jpgfet563n5r6k6fcuqyeqcgd1fw4r2kt5f3ld99rw366z6om4jgyezc63j9d2xuq61ap4kc6da6ak8teqzvm3jcto5wipqr8johf8gdkmkz9zghiiaxge3yzpgapppjb8fw7tz2xg',
                interfaceNamespace: 'qggdzsssntv85uvd5h3grszephs12g69e2bkju8b1587rkjqdbpf75n8mxbsmd3g58mhembzqyg0xvflwck7ps7xlb3lyyn46xv4p48d1sfyq7iajhm4b8i17wy2v8gjnnvbyyb8yuk2g1ypiiyin90oxwsokrj3',
                iflowName: 'bst387lvn6ughmmy520y31ew3gxse4dajfyuxi2pg4uejf90x192jglz6ezxxiug425o1mggsdjf2g8pqt03vi4aym7odlxbvqp653lojfvr7gai36o5e3de6fea4fhpghg47rohcq1er6g0c6qpxiyquz93yu6k',
                responsibleUserAccount: 'ssbijsyuur4o1cxjji8r',
                lastChangeUserAccount: 'h9oqleitdyidch2puj8q',
                lastChangedAt: '2021-05-23 09:57:14',
                folderPath: '3k9cvdb41rkunoe4iciudde3nrzxah5sqgxd44vd9cm3fxw39tui9qbocr6wsq8rk1787mk4bccxznj94bf1ospvjjgp5kvbla38thlfzzlmsmsd4gxm8wokyxt8c94nllmnprdaug9450tcjpefle9xui0608apk6sjr3jnngzlz1fkevu3dsmngjlywbd240fwfbluxmeple9zj12hgkozi05tnkteq4towy3atkfiqsel2l4dcb1lrvvsmc4',
                description: 'usyjmokt6d6tymfvvodaxpsygjcn5juzqwko6ncn41eu59bcee62e574siowl7vixvyjqotsadn35bv85z867uy072cgw3v6jkvx2wf7xf89bs3vjuc9m3v8yrm0how5kv44dzw4g7suyxv6h1d6i663oalrw37vz230e3hbbl84d95t8ce94rks5hvrodet40dbtfyvjdkuobsjsya1kp1lio7ti02oro9n21hpwkawx1xyjsp8b4baxatri6h',
                application: 'lqcct3mmz6ygkh02tx8nvxwgnxbwklswvsubhqlhsx3s4k00u9vfdvkta7ka',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'c99df099-c278-4526-b81c-77f0fef99ac7',
                data: {"foo":"ceg}yaK).@","bar":"Yilc2Ti\\n<","bike":"suN`-5P6B6","a":97640,"b":"B0Rl^ByUAB","name":52113,"prop":89244},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowReceiverComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8767c417-3ad5-4372-bcfa-1d0724f6c040',
                hash: 'cwsv5b6xr18mxeniy30udw68g7lwpn1c4d7nyeil',
                tenantId: '2d50fe77-ce69-4fe9-91c2-2f169f191791',
                tenantCode: 'ehk4z3pwycxuv1mwmywntu6mz1k0pxghhuchxazk5axwyp102i',
                systemId: 'b389ceec-ce72-4210-9e53-37ccedc9dd5b',
                systemName: 'f1q8se2ovj4zieaw6wki',
                version: 'f8zyjxi7zzsx8mz1l9m3',
                scenario: 'g6ju95rrzekhsu3t9yu6wlfixfy925amg2ium3wsmhx0oehq1x3ul3xve0bp',
                party: 'rhjas0aaimupzvkshvcfgnhtucb2u6azhzi7ykugs5xudq79unhdms4jo1gsdr375lxl3rafryq98fjia6ntm8e7tb2utxepn38a93cjs882u7gcsfyji6djmshmu3iawrns128ljbxe1yamegfkxh9b5sdcy46e',
                receiverParty: 'z2sr3dwik7gnoutjx37drkvp0s89ud2k3aevigj9qkyd9h0two9flyq8kd2k0g40gukjttlbhml7z79u0qw4kte3cscbm01pixbx5tivxolczbir9r59cp9mp27imrornanc7gbljnl6hpj9bhvkbo1t3jd5xoys',
                component: 'q0ikphtg8lbamnpqzf9iy3wqe0ui8s1onvdy50hakeye8tn4dqex4nu94jxtjbqmho07626q1asarmm7ez59wvkqa6c50704gqrx51q5i6u78tqe7399mcqs9ygxquqrpyz0d21csifw0bq8ac4h9s9gg7mwdci0',
                receiverComponent: 'w5brxskpb9im3hu3t4yuutn2lq3ovsi3es1fns7ka4i008xti76rtww6p10q8xxfofzem12gq908470mnkgpnceakn6itpnu5e1mrtzo5o6ln4ehhsay2gdrco2obh70uxpzz57od7pakufwr65pmuhqm5t0zd6v',
                interfaceName: '6twg37kj78tne7je7sphnyb9z4nmwruougte0jmnsc8fwprsuih0415vschbdohch8cdjf4w85a1pq49ruwll6lcxio5mnbq7z6rqyvwzscpk7hx7fpm6at0f3fdamphpc4khkxijpeqdwwe5bgbor4850ghtc1ii',
                interfaceNamespace: 'aph7fxh68uuawoz0mj35k9rl729aszth2r60z7jr087crslo22zr4tov8m8wv48wui12k8chd4q8l01ozd6q9rzcnjqj599z6s0jl8qdbxtatxa3pmnl0blehciwx4y5qiakhl47q6afcbbnfrwpwb3kyiagq2ah',
                iflowName: '5ra1dmcy6m1wq3clfv0cywxrzxyw8t75aytvl69rrnyu2tmm4v0wl8e39ai1rk007w9qbiksn4tfta9sarrhwvo9a7wkum881vh0ogqvgtwmw6rjpj5sawcmywahuu7cagq0njmhidykna4crjchqvl6ftll5dk0',
                responsibleUserAccount: 'yuod913kxm7abeeqoylq',
                lastChangeUserAccount: 'ubuqf1gpq17hrbmrlnz0',
                lastChangedAt: '2021-05-23 23:15:43',
                folderPath: 'j80ntaa3a87we287145y1owd67pazhdlm2eyp9xikmnag741nmg1bnvcvkm8cvs3yd5rizrtr7umbpbo0ghhymka7a6hc8jykpdqubtkht2vfmnekcd7j2rilcpolm9ekbx0nvkpgkiw7tcc5rzqziv7w3jf5mbvs93wfc2q3bif68pdln2rgru3urz68yg78nvx5jn9993q33k9e17bhb2zez3zxovg3ji1wxpruqzbckfvig8brgnowvd5k2u',
                description: 'ytsj3dz5j14k86bspl1umtb1ltzcp8kae1vlm175r6d8jxpos8q846hkqo8yha7lnnelqhfrg8j0274u2m7watfzc305g38zn95n89k3dz61t5lkass5astlig2w1xfof98te91zm4vncvxsg1o4d8ybtai2g9cayn19lcwhugzzs5myl5t25tom7vd78e00vp6k7zfk74px15omf7orc24rz6hcvg76jd2osncw7dqeiyugo0b8ktenv97o300',
                application: 'vry3n1f1nyelj1o8y4i6pm7pklkvqbh607bcwx7f4qqugui2yt1r7f967v51',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60c16431-a640-4967-abbb-62b46a990b32',
                data: {"foo":5148,"bar":"RLmu)1zsF@","bike":"wvg43v@U',","a":"fvm$jbxr]M","b":"6PqosR>HW)","name":97593,"prop":53032},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7f6a13a7-9796-4e9a-b604-f05d6af71eda',
                hash: 'cnudtx1j9xdeuca90x0t93a7fihttujm8u1j7wv6',
                tenantId: 'efa5cdd4-88b6-40ee-9f08-e657a03190b4',
                tenantCode: 'rdmywlmleg5kyoortxq7woxrsw0rwcxu2o5u71ddv5tsbvf2j5',
                systemId: '9b97d2fb-da0f-415e-a0e3-3d8e352e2bdd',
                systemName: 'zjou3v4vupbhkeg58a1a',
                version: '5q6lce938prpeyc6wwqz',
                scenario: '1q7aqzpd6fsrqvyfkx0cwoh0se5y6egec10qwfx6kcpi84nrrbab0fmslyy4',
                party: 'nfchzftdz62qeo9o7nnh2g0cng31lfu9ktxqw8yq4l11wxrfs7sphaa5tm7ize07ld7vcsdvfanorwhfys048yvs4hrwxp9js3qg97cjey4revlxspag235fw8tk148wam570x9wi9uqtr2iememdwegtnbhq42b',
                receiverParty: 'v6cw3brti9x8hmw6palzf2zhugg5wtdfm5wffzkwulsu8e28ym8kw3kikl9368ve02s5zdye9mqd7z4ktk06bvl6922ld17um3bfe607l5og77p3dqsd9qd9btlrenrq5wik6sux6pu9uzsz102u9hxx2vy4ccc1',
                component: '8s507pp400aci2b2tuuy7xxxkcsknzmxp9vk8wcqwrlksoyzv4knosrg7vvviw4xac78swxh3pfbivl69h6h8lgt6litehvxjeid7ukwzgvr6e4hk5eustbsb199lv8s5ge2yqu5iuruag9jz8drbwdg91c75alj',
                receiverComponent: 'bm6g3ggmt17u0k4wvje30dmb8ikl7xm1wh1lpxj8c1bhvs4dodat6nuxvurcewnydddq0lqn5pc2gfifriy1qa4dvcmgaody9t7w2tzift9phcitjrbt21m8tjhq7aodzo1btkywjwllixugr2q570mqd053z25e',
                interfaceName: 'rhke5ysdkqituspmztyftef04nx2lhghv5aovcvtkri8p2jv8p86vrr27qvctbjga7uow2lc395149k8reti65cwmolcdt7oeaqtpwmkfmezionsnowcw0ifjvarmmooswloagcrhtf7oeswuwq08prxudzct636',
                interfaceNamespace: 'hevu1dbmpifytdtfy9erwjhn3ckcfcclwdyrc328a9jtlx6v1f6yiy1rj84nb2ralr4p1seicoa0y0j74k5wmdj4eos0zihoqk5tc8t2m4j93f2u11okc4z7xhtmtvzgddhcf564sam5dhliy1abjtelhznk33kr4',
                iflowName: 'p2zrz0rckregxezuel9p6h07k1rwnnsml4auz9f7stpkxkoqbuzj3hs65jmntz2p7kfkb7ec4mgleitc5stxle25c7eq5y7j12m9grws3sw4iwyl27uj9e1i9i2aqa3w1tjxs53h6upczew28ku7u8gq5nyp3nxm',
                responsibleUserAccount: 'so9rfy1kkp4ks4zhwrby',
                lastChangeUserAccount: 'ln3omyykr53344ez96fe',
                lastChangedAt: '2021-05-23 15:50:52',
                folderPath: 't3fo3afhl8sghn29g0ahtfzmh04ixv0b9akfcr1v164ciote1hrf59t3g3sszefdd9bnzljfno562itcyiy0rilvbsxtf5qbi2u1259fvtotkq1elq7tb3mz38d8tycufiimhjtw9sbc965e52erdsdajjhlh6z77iuk3pfvbh3o0x5xf5puq201ctwieo5o686cdzzifo3jkb7nb7c60a3aplcuup87clpwq58gvvkqx6k0gxezjle9gc0oac1',
                description: 'jvqikig98mchg9v1th02e8y3oddhhvthloy9r1yjonohtgucc3b86jyk9gl45koorry802su77esydwzh1xj8i3ioh1wd5rdv1m77ht8i35oj3utemjh4jrggbhutcw2a1dfjfh1swko7udosi3ew5y2x68qo562obimqa65grzusdux85d3gvkd3zuoa6l5vsjv5e4wkmjd79jyyuod65m0zeq1bdskhyrm8jvb2raxaqn3pkqtlgofk41z6o1',
                application: 'obceih7094s1mhkc20w3ewbdls49fliro2ljrq3i32qkow335elh14maxiv3',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '692394f9-63ff-4334-9b23-d116eb97874b',
                data: {"foo":"[Ra\"E|L`fH","bar":94357,"bike":"e::AZo.y|\"","a":64676,"b":"crs\\yS1xTi","name":18379,"prop":61859},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f079f965-cf06-439a-be99-066f377d5ebd',
                hash: 'hhg1cp9k2m0sseuygpoehzzhbu0h6ikjynilkemb',
                tenantId: '3e5041f5-6687-4af2-9111-c6269f21f299',
                tenantCode: 'd0wtf3krjosxmcxnwl0e7nocls75gi8ltcgql4r41jkctusk2j',
                systemId: 'c75dd8bd-c7b0-49dc-bc1c-62475b882e51',
                systemName: 'tv2tzykgrgt05ns1r1n0',
                version: '0jct59xa7r3l7c6vk2oe',
                scenario: '71gi5vps1vktzizshul4t9erwt3haxaontbunrtpkc5eeu9eegc4f784j1tg',
                party: 'kftizf5p5q9vex76ki3maz7x3d7b0iirg87yy36nkmxy0zdmlkjcel6q55ovv55qfqjowwsgitozqbzxkr75n40w79ldf372rjuhdihkq9chncqs315g0bjac2ywtighmfp7y3fj91lfli5yjuyacggk8b3gf0ij',
                receiverParty: 'psnal5xkue3x9l1o0j8vto499p9auakqjavzulzcfwyzdldpcimsi11w1i3ovv2bwwrb47s0jjbc3s04h0jyx0dgg560s0scdaucc6rntdfmq9t481iumr3fa2kws7hjr8lyfe7vx4mriysi1a7ya4aaomvth7da',
                component: 'uty7kf7srkqibsmakwgerugfc4t4vr6yezgelvs9vy0295ip1q0hiimichbrypba4cnn8d2lmfrsgs97fq1hoor7moopb42b1gr7sg8bq22ze2m9b3nci0l65om2do4lqzn44gg66swp9a2cyfkm73tu6ut4wdh1',
                receiverComponent: 'zpw4hme6sefigfdh57cb2vyyt3a80bzcqiifci9jsmsk4i5xpnu5to0i9re5ao503z4sp7bbqyz1lpksin7rbome48y6ymy89wwbfwu38vc2fhnp1udp0w4ff3id7lg4l2h46eit07667eeak58sub9yytpdaizw',
                interfaceName: 'fw5zk1bfvtks08rv5bnfq0l54z166sfa7jye9cpobcnm3771mkon3rvagnfl4h504vwplgq31r38u16wc6zalywpfj503q43uenn8dgg78mg1jtaf2c414xpco7nepae8gzc3z9rpjm9pvpgkuwk1r3nsornm6my',
                interfaceNamespace: 'i6pe0fiu2ed2e21ko0lnmyn74efgyz87bm7v645m7fdkr45v0uly0f5f4yj50f0nik3c3z6g3m5vcz6z4t7dgu086to0o9ykqneqnvo271gxut0ttb768qo7irniebwexgjn5gb94zkyjq02knjvzv1siymmzwz2',
                iflowName: 'hw8og15nxr3ghq70vdhch1vjvv8uriwqgotgr5t6j6nhy72vnr6duo18h8zeawf9i43js7akcx3zay6zcp55q1dk9hnnx3aaa1pi1winstarsevznx5glil20oellrhq43tyog9bi8j10n45fxuyraqtod95xb8fe',
                responsibleUserAccount: 'wvsvr2ogt1ovpewbqwjq',
                lastChangeUserAccount: 'x8o97ffzp8x00drdtm63',
                lastChangedAt: '2021-05-23 19:34:19',
                folderPath: '6rgjp5nxnrgevmmzbv5m4vijummu5xhc4qj1o2xtyxe7ls7as2ajtxt427j89iwn4npijk3a2ahn6rbn7ncdyhfj9mao3tecb92vkyjr58w5ctbm6g4hb79rqpwxiy97saclm70pjdvly2c35ecmug5datmjwg8yv43ffv9l7ogvsq471miemxlr5l5j6mh33lax8jzz5yewx8bbj6sht9wi8v93234zwhcknsitszss6l45vvfhibzryzakoub',
                description: '4zmrn4ddi9xjmq24awzc1xbee1jfn000jnga9q4xv4u5jdca1ob1gu7k4zac9mlibs76mod1vrz6loz0hj66rlmrsu5u1guztq4kdedh55use9f9bze108bfq27c584qyc8userv6awgtydlnk1aq92fsvh7dfwreuwr5vuyphy395797t4fjyny9q8plfj9dw6eypcdg833iiwqfi7ejdr442671iu6houmehkir83ke4zx40xobaffa3nngao',
                application: 'hdbqgkcjehiuwftwoqev6bnrnkwnx5kmvn883gosgd2miiduk0c4i6cip95s',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '65b79b20-f2aa-4e28-b43f-e8bc4ffc62d6',
                data: {"foo":"S5h-/)R?@e","bar":8517,"bike":"9'8jq!Qteu","a":"%1+:.4wvse","b":"#em(#E)kcz","name":60797,"prop":"r-[eKDM^:&"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '739817c0-ddbf-4e69-8c5f-2b27b00ebfc6',
                hash: 'kre9ai33ryfzch1n7eflhsuzh89dt6c5azpg34jr',
                tenantId: 'a9a653cc-d5ed-4dd0-b391-6b823825c29a',
                tenantCode: '7b6lldrvve1ofj2nspex6edzrq1rvzqnjhuxd1g19h8oi8i4v5',
                systemId: '286eb621-cb6e-4b94-aced-fe310479e8bc',
                systemName: 'dt8lerqznn7wvdq9id5p',
                version: '2eidue373hrzua9mqzal',
                scenario: '3ltbhn8aaob6w126ps4qfnmh84zsdwx4rwkbv8n3i42kcwfmsp0rds8otien',
                party: '7jqulvrvyoims7m4tixuw6aqeiia6m318206l447jelfffij9bsaoweyhaxna8sy2iwl0sn93j8kx8harzyvblys1qwy40gai84s2fyogojqf54dw24gvx30yqtiowkgnhc4t2xr4thqcippgfld4q5w9na79clc',
                receiverParty: 'gc5otk52d0s6osrfeouztnxuxzzawbkbc8zj76e91mr7gfsyoovbhn32oqskjazc75j5p6op714wchoc0zx9vpd1dqicg6jbeyik8odsjprcch3u9lat0vc19ie71jjuvw71l899hlalt6ig4p109fzvdieloqhf',
                component: 'ikj660q0xqxes8u4sdjlmk5yx8wx4a3al2i1clpldroxwxre7rvpanjky4far1kkxu6ohw790t0q8vb98161su45xpqb354s5q07krpfj8gea7ihp1c7nouhhusmjai3eka5qer3hzq360hs1gxl1d4pwvdeenjo',
                receiverComponent: '93l9xdy6lnxcipmk90fnta4trx5j7c14025xkhrog60pk68leldv8mf7u404xkl94h10z8ojbk941igfdv0dvyguejg1pxjml3yrmg2257sw3ydkzkpl08y1wvror4fhpwpx8tnd2ll46o5dsys8xqxii49p3mag',
                interfaceName: 'v5cgvf3zsgilbnxly6pz4ibzc0s30ok3fkkbghxv33hikg0xf8chko7navafhfj4ne6tw2nars96l1l73qg9vd80vay0x1jdzim263rbjyw5ro9z4g4wny2s6ecjy3rr53172p5uitjpbc041awaghculjzqxhjj',
                interfaceNamespace: 'v7h1645wt1y5nnfe8tclaq3asus7hmvcy9h38b2nas7043w90ob7pncm29eyjug20yopi9astk64carqs9s5brgya8sa3zkjv2izn3s1kz0pebzc0ytjqdfs7vspolcc6f0ljeybyyo7tct9bs42t4yl29ialr0o',
                iflowName: 'wnpgmbpasxjirz5p69bdfb9qpyxtw6c9je1jq9hgq8gdd9eybmrgsevcqm107h2e5hxetvyl2d2b09udhlp57jpfqvpcxrceh4rxkj1ehzi53cd4jiof35qcisfaa49jrn56doa1psyqyqz40dm7o3uk1mzenrzo',
                responsibleUserAccount: 'nnica1ny09gx65k4xjcyf',
                lastChangeUserAccount: '9iat59lo3tyloesbqh7n',
                lastChangedAt: '2021-05-23 08:38:31',
                folderPath: 'p37ks4a2yz7p89ubjw3zskmlhorlxvszl104q78p8vyj1onu9lnbk5i055sm5s7g16ui5l3kat8zsl7yyyuovyb32f8vczglmwfq32d2uwha8i42czgbgo11fdv6jaeyxtjgammv76eputa9b3l3o2opfhakng0y5db21hjotp62yebx67alztjxnlc5r38wcm2bmluwyg01clrjvtvkojsdx6bpzpeqidzu8wzlzzojmuf3n77k6qw69j7r8gt',
                description: 'br7qwgp50l1362rb5gm38xvt1styvla5kygfwc5fswwamcsl1j1fre2g3550rq7zhh5clqg97vcy87s6ne4fj3lge4hzdqi4kifglp0pbx1jlpotdscjkbxeii49vi4n1kj29ldfg9eaf6zhb21t71iomtlfkdowusjl4bek9fyc1z7be9hs2aeocejq54gv7p19jrig457w3aau1gqsn9wnx7znq9z41o4cf93gd5xib59d2ofz7ebngfhkbv0',
                application: 't904fy9qu03tyzspeyvba9h0smwsk2wj57rh2gb3an8pldewfx4hfdsdovbp',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'd59db874-9044-4fda-9dd2-21469f7e7a68',
                data: {"foo":50601,"bar":94542,"bike":";(5m^$\"V?)","a":"we[w-f5r?z","b":16308,"name":"p]iZO403OG","prop":"R{bnY.UeWC"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '76bd533e-8fd2-4e5d-87af-6d6c3eed4216',
                hash: 'urschwga1wevz5evetnclm2shscoti1fm1gxkv96',
                tenantId: '99be4cbd-a826-45bb-bb87-cca27097706e',
                tenantCode: 'f3kbfqlwke3huso4rzg9jw909jt7spyx71e60t4bnk2ihdnyun',
                systemId: '198a3f4c-fe02-4def-b49f-126fc30cd088',
                systemName: 'hbhaq4phkjn4ln8kx0gp',
                version: 'd4a7cv84z3cvzs5w92sy',
                scenario: '98ptamni0brf7uys1fp5eq2a7qnonxt9v3agj3jnqhmogv4u51jtqt9d7ake',
                party: 'dim55ef6pydzrnlpwox0wks0o02uab9kq46ux6d5z0xw2pxwnz3qc4ispx4loh4uijf2sx2ynmssepnq3pn2syvmbtypz2grewvy7y9v1anl156o8urbrb6nkpipzpscwyuyb6t2sa2ebtgomoxvqbdbs4exbrlp',
                receiverParty: 'nlng0smoa7g2y52xhnj05ynd3cbwiyjmtz9goggbdaywn33quvf5k8wt098wxcmfv71sm43xt4lig22zbrlzco037w53xrr5szs4jcffbyl46ltl345el71nycgb2w74jlpjjj1diy9as1z71217nui0ffvaasl4',
                component: 'blakg4g6m4mccj5wrzd7c3s7hi2czus55z1vwndjo7oump79fbg8a7a8w17zn3x9i7dvkieogy6tbfv41kjeke4r3qgv7qdq7rg7c5xwpnmi4m1ntyli7v3okhjjk6p1lkv6bokfd9alq52qsmbc4ogetlwj63vv',
                receiverComponent: 'rblps6dh987cswhojv65w20kvssk0vyzmajwmy3fdbhqn8e7mc49146s2z3f95z0kn9rl5b3a6s21panyaot054shcx71if9lqqrzfw8c6aq42e87fvqc5w5lh6k3rrb072rz7ccnohon495mnk3ezcj8qrrxs99',
                interfaceName: '9bfqdbktkxkg0vmxm6wutha3747tsz8vauubazt26ndwsw6nrqz8t4ojluyhgg52pgwq861o19k8oa0swwislaz01ghi61apxtsev48uxmtr2ytv0dznoryst470dsl2lwtwkq5j9xutovl7wkc28kt5i24ag3ls',
                interfaceNamespace: 'gvb3ewytfxmijn71vikz9tga4u6zmchck8fknhpz87fi7qiuj9slbt5k7zgzejeitlkynaiqglnwfjjvs00zg1jnczksdxtgfqyd1qshubcjayp3skdvgfzvai7e7r4padfhc8cs9nsc8d0n1iufqhqpyqwebrjl',
                iflowName: '4gmvjrg26nlr2hifdraa2k8uiy3ctw16xbnjmaqzsljpyhmprsg56jspvbbqgqowz8xczdy3p4q9httoylc4o59x9064fyrt8yyz96lek4xox8gk2k6pr0max2f7h1vggoe1v7h4igsmxfxkgg01kv8km8unycg7',
                responsibleUserAccount: '5q2j2imb9rjeidaz77i3',
                lastChangeUserAccount: '07lap7bjo3ffb6k16odji',
                lastChangedAt: '2021-05-23 18:33:12',
                folderPath: '1mue2rq3vvt7zzedv5fkwb6vxse2uu5j42i30441hf3cqb4u7ea59xew5rebsl03g5mxf1oshvawb4l5xhj9kch0l0zaoioltznszyz1rjdo7b3bniz6qyn1ht9byfadgjy2bkc9smzch47xjangkkl9zny9xq6ddbpk2rh5tm4wuuu6elu3ql2xcxdsic1ptdv7vqgdv7xfi1pj4ztmvx182pi75omxh9paejmskdwc0k7mbkjnk5rhdmahxr3',
                description: '408881e4h3zhsvdtmixc5fd0e9cghng9r043tmq5m1qd3l1xfkbs9gatgffrt8sjme8z3qf2v20cx49crwv5xhvk73whazz6b78axtfk24utasb7ywu4qtudzaof74al1dgsukwoz2ikx2ksku6qiwox36y45jcqqv8fh7wdxgb643arvm1zgp7lwfe85kfb832pa8fkd3e3x8o4v4f2n3azx71hlzx1gl9u78wkn26naf0rbjnmss9h462vv5n',
                application: 'z0wa43n28vd8fxxieqt8kbdx7smmqq2y9pf5br2spq6ujobbxbgucvu6un1p',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '9d7a2366-c834-4af8-b620-0c6c5e46a481',
                data: {"foo":35003,"bar":"kkyB@OWA6!","bike":1981,"a":";i&&A/S]R}","b":25221,"name":"/&Hd%p<Qqk","prop":"gYP)zPDb=`"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '30f3d65f-cae3-41a4-b8c7-1239379b6f0c',
                hash: 'ku7p14lz8vcmobmiq80orc936x5fh5vufwoko41k',
                tenantId: 'bbc0943f-d5c1-4cdd-aff5-c9d4b47c8b9f',
                tenantCode: '4bjnb7jgbxf0o5ca596xm14src2f9tdp8pfy1n2ge2u12le4fe',
                systemId: '71822268-9d4d-47fb-9fa0-74f49bc3f5b2',
                systemName: '0f3mo6cxtkvn6iwzc9sv',
                version: 'ayfl3zxz7831n9zqkoqx',
                scenario: 'sa2j9oxtoyn2joy9d1nkba87zecaxfk1pxn9ww9a0dfrcekg4bxiy635lqno',
                party: 'qjzkqryilv6hefbsysrdt42lmissstn130jiw308q9cdyrawge06cmyukvcm3ik5gltxepylzsi5aol7sdfuy21z35h3j4c4b5m558qrjto2oshejk1m1170fp0ocen5dmf34q0fl1cltuwiqpkal4a5tdmm4ceo',
                receiverParty: 'im8sqc9bb6jp656veizma1gx2v1uf7qn9lqomnz2vjnmmz1qhsrjlrfhvh1e39qbsv22tz0gszhy7lw4iaunklev029ptzwlmip308vsouueimbh2b3i0e6kva9ri22n78p1mw42anokr1vmhruke407ofb2jnst',
                component: 'lh9cgfyevrwaertasbov7hdjdvt7m26ifqtbwyu9hbgo1jmcruj3oomp5k1fd5vwvrh3sm879x3frmtwga9hkv2cix7k71ki2zp0gopsi47gpsvpop0zgfomage8b178sp9dibrrk7ovbi62z2yopf26sc6bnwbt',
                receiverComponent: '7lodm1vwji2zydrvqxk7e6no2mkniv76t7iluecn1t7ce7g6w5qr70gy70mhb8xkw3hwyyiaj35q1sovii0910vaqcvvcrhvhieu2shkwpxioytw4vwxjmawj9fnhoorc1y4z4u5ao2kr25as2nl63hrlc8c5vun',
                interfaceName: '5rovaxyd347455st7wzvhbywapsw39cld3jn1o2se3o0utx09777fj2z0lpi3jhjwevxjvqw6a5xzhy0wz9dv66u4yl9udn3ek00w51w7tkpyn7k8jpempejarvy3g9ayu4jukf76b3521ozdlvfp1s48kpu51ry',
                interfaceNamespace: 'je3hcergdqzqlbxoq4so1f3tzgjoqkvstnx8c8n2fj1p738gc7ldesqhyeezite28rqhqelg395ztwzhgkoz4wa5x3s9l7x2utv360wb9lgivvsp1uezflhlq77gtoso3gma3a3sr0lsmrtm6ha6hp20sxmjpnns',
                iflowName: 'n0b2x8rgyskklx4tot76wmez2qs342vaqerk9ggtuxdpixwosh57db8bk6mpmzecjmh0iy0yndnlmw135cur6gfwjuoyqg39v2ou9smpfkvyge3v81o0isljba24x0ijhwhqnacoyfs2ypqkzlvjvw7tywbwnmfs',
                responsibleUserAccount: 'r0xy8px3zmy64limepgt',
                lastChangeUserAccount: '2hyn4zi89m9v0ac85y1h',
                lastChangedAt: '2021-05-23 16:37:52',
                folderPath: 'spg9fo2jpoqkk80883gx4hnmkd8cgooizy9o6g85m90zz5hpn2guvmpy9whia90mifo3wsz73ik9sg0y7rbhvzm7eshg66bulnpq4j4kxrsvb8i57ajty7dh8krne9wte4amaocur3tbptpr1leo4xhgejrv3xi7vw3v2ec8e4f4j39auyar3v2bhdubxfiwm1smdwrhxw8lwxg946kg3d0u63q0hg4c04hle4hqmvev6bl6om26tecqffqepu6s',
                description: 'dh84ninlr0zv2pc9q6g040rvh10uki3ska6270gi0lax3tuvs6o3r7fwwrpyg6bd43aipdyopk39qhwvnu79b1zi15n4pj8vyzdv6w2b0lpamh0660b3o1aifrgx2np9c8qkxibt75vvqe2ka70n8n66ql1i2pcrw8jywdb56k4ogppym8eb5vecpla8eino4j6egnqnq6igmibnjxuy5bxpz5xmfe02gyc3fepex01ax9wqnc39k3fs4x8wybr',
                application: 'dm6tos584b27ofvk9495blpf9tepaqo6y7ld0jiu4ub2hu1gmywgsdl9git2',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'b4aec9e5-3a04-41ad-8db5-88b95b86fb02',
                data: {"foo":"C@l.f3iYI<","bar":"V7scWQkMk#","bike":12148,"a":71619,"b":"_uHuXAMJAT","name":24106,"prop":20717},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'aa8432e2-ecd4-4430-81fd-2c39c096d8bc',
                hash: '79eesudwdss6oz4hj8ml0af0k8132zsr6ngtq9ti',
                tenantId: '5e939cf0-e880-41da-afe5-55deb52bd4a5',
                tenantCode: '2u9sa9lm5enxzgopw878i1pefcykya3eo8wqurfi69nmg1p91d',
                systemId: '89df4b4e-a424-445f-8ff1-8d81a796510b',
                systemName: 'xymiknaadlbfxkyb1432',
                version: 'i3tzt1tb0sgayysiazfd',
                scenario: '3lj1yj197nv8uaawp1rrvxioev8qmx6ln42lc8yf26zdmcdbmdq8p94h4x0o',
                party: 'fm51orkqub40njnlv3aswj7clzd7vajjj9z0wosswxqxn7vsm0nc6cp434woq22uwaw0gf87glklymnysh265cfcr1l7x5dhdke1b3c86gbjz6zba2cwvf6mtiew09ri764uesk9o3wiini94edsoy3rustei5eu',
                receiverParty: 'zjct52sz5ainro6bbbj5rhmfl8b7zi7w7ahg5ws4oz43q9tj61tuaov4u40le3yv8i9qz5lk18pp4x6yvusvsvwz98vp80gm8rj93d8qz2mlvklhfxkwrpirqfmmiytzcvf5hy3z6u2z44cjsktzizt4nu9tnhf9',
                component: 'pbj9rf7uxznwcgwyvzpmq65geiyonhkhqjy3r837lu4z31j9tygn79ipfnp01eqb97sna9kbrybqmj24rxpphi4az95rq9kw5y9w98bcoc7wgk7ksggv37tonx5cg7hnbuafttop29e1f3k145df9ewy9r6fqau5',
                receiverComponent: '38od5nx6inms1duc3m2z2g0nr40krunzdp65wjreonbse899p4v68dzv3ogeyexl0qj9yyazogqadhggv3po3db2zthzqyw1i71bqse44bncdz4i95o11azylkf2o7alm88gzbviyt3b6oq7uk5zoj8xm67xhevh',
                interfaceName: 'i7ra9ejef5i2iscycy3mob3zkeyu74hppdyieshniep1lhvr6ei4zrp1zx5ycbzszfeou0sf5k6wy4s35t8yt9q101dibyh9yt4tngn3e8wdgty7565nssigvjt41qej1b3ic9g6hajtpjptxy0wat15l717yq50',
                interfaceNamespace: 'fkomxsno2ydslil33xmz3gzaspn9n0yt8lju6leni36m1zar36vzn8xp48qedole2ebarqwm62a96lz3n1486mmmp32oeuh11ndb1lhlcpi7phuaz3luutvjraxbizoasac5ypg41kxnnbrqrh7lznjzdkszkx8x',
                iflowName: 'ce4yot1zn5vfw94ovn9h3yhz68wumfr6su1kkdl2xxgtv48ub625wbk5darelecpq7ccf787gxkdwxmlmd3wl3jnzupy07ev2o8uncir9lks70zlmkkyvxqtf4y6mjr9e8hcv51xxphhh7ujbwqgwny4yne976kb',
                responsibleUserAccount: 'eq6eailgbtg98spdarzp',
                lastChangeUserAccount: 'm64mtee93nz4hhbqhile',
                lastChangedAt: '2021-05-23 20:01:00',
                folderPath: 'u7k5phlryj1x710l7zew5c5yexs5ywhw7qeg3fzhjp3ivi4s0hxh7i0qpul5q5wtfo51esa76am2u0ah7ahi3ukvz7hetw4ak74gnuvxkjbvst3oxgkiimv58oglyfns8x9mh7wdmgnfm5rcfl0ms4w2r3mr3u5f1ogf9qlgj97wa4qctmcbrs621j9giareqxq5lp04bz1hqetn81cqfi6nbvcxxrvuszkxop6qj965m99sc47hz31ehklffjg',
                description: 'fatg4oa6yo7ddlbe0924lml4nxjk97g2tlm1lnhm9sv371z39cwf6x7nr4s5dgrvtn8wlnqqz5l84ibxrbxwvrr8o8xd5e2i0zu74soia795og003xe194dskc43yi17hihqqd4k60fwjkn6dcptpu3tw4h05n8nykwy63eck0jrcl521c5q0vloth548obprghxrnn25ve67hxxu0ec64a2nwda7syynuq5sne60n5u79oyoubjbx54ykrf90hf',
                application: 'qxws47mxy1t1xmws6k9l9t8yok8m9bwbaae1kqw6ck6zi4aszsu041lrq569',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e24b4ae7-3a2e-4832-bbfa-71d4387ae175',
                data: {"foo":"rr)Gzk\"k=?","bar":89352,"bike":"et5%7!4i$/","a":16335,"b":94591,"name":"}d&u1C)]FQ","prop":53191},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cd29c3f5-074a-4e38-8550-d4455ea80b93',
                hash: '60opztoqvgm11qyfbku10hzjap5vy2aihf5lmcuu',
                tenantId: '5158ec12-5454-4824-a494-6e2cf4b38098',
                tenantCode: 'ddf8wkm0rierkolnbpf9w7syqr2earst7yz202hgxzaollzjvl',
                systemId: '2527b6ce-e01b-4290-809b-508e23530489',
                systemName: 'byxfcbeacxf8dvz5kg3i',
                version: 'hyhv6gqm71tm5j9s2e5w',
                scenario: '0elnjbj0scv7j887ifhr94jcvaucvuyp9vu8av96zi3yb355gp60ieufpmg4',
                party: 'edx1i5cekbxg0l35ybbzw870sgw12yo7aqfqtljnjf4m2zmbi8pn60yum1k58rwuoo8eioaprwkcvbnydmqi4svigqnzl0k74m01u09xhm2yykn53iuevm7bryhb1emmwxxuhi9e0yfren3evqlsosi8u3tqumsr',
                receiverParty: 'mn4eouwfano6y6cxfs210nuw6x8gxwd6wpye75o2m1i4v8oi6vm9lc0tbv5kythwesjz02db7oper307dvfrumq8y0zazi3arvwyefv4zosvupkmwwbt2bat120omj4wdvs89e8untagjuehrb5qwtph86yerqrz',
                component: 'hjf0qbfktupchylvda1cc2eo6kh7jtc278yvkax0lvhrwels814oez34ujzr0antucjnn0ch3xznyyf2k0hik4cfmumxxj50a1udjbik2z6sdzlmnzd1oroea9uz68wuredy46w5qeg2sxs79umt43o60ok001l4',
                receiverComponent: 'appaa6tlhd1eworhf1n4z4qwwgo7e1vsbpgstbefuabfhg7qa8us3w9pywz2558es8u9xc4eo6n39n8s1pua1q44yryw9sefkk9u5lrnlgo6itmsl8ov2x2oo6xyo2j3kucs2jhyfi9eio6k5hb89c5pgosepn4y',
                interfaceName: '50erylwguqp9nacxzraqz2rur8x9uzpq6lpkjwhr7pso0c7w76p52plrmtdryus885pq00o6pg3fynrfzqfx3jisnmgztcj72kbtftdkvvv85wmgcp5mytlq7r7jtzfzqlcd7ak2scvbvbk06bp8wzhjadjamigo',
                interfaceNamespace: '4l1jxc5fm688mhr0dnsla8vlirqcco0gijuybnv99kofxwkhk9z5evkcamv4il5yit3rzhwec6gdysol2pd4m2ikshkf5htcr3b35xgnxwv23e5qimv919nog48yxj9o4uyah4mi7n9ia6d2l5mfst5o5101scxg',
                iflowName: 'fdbr9vd3y9q2vhnejoy8nkhzs5l6lb3fzpvfzl6ogungseg090bmhsg85q91d296axetnmu4g6jfzcid0ko58hcm2s14g6bkcq0eeoueumkb7tmes9eahja87brijteuo7un3lgs5k5awc50ln9lpojw5web5hyr',
                responsibleUserAccount: '6ylqwaguiox9ov7mff0m',
                lastChangeUserAccount: '6dr06v1z3h7y9t1pk358',
                lastChangedAt: '2021-05-23 11:44:56',
                folderPath: '1ddyochy96sotbrvrmshwt5xmcyv7zeb0wefz2v4yd3cvwahtvwzl942x7vix4lhf7tkcevr8kzvivzeiulpwcsnlxochlr2q7zdv0gljlb9om0361m62s9rvmszozspoupc067yyhgq41ts7r8yb7nsslmm2vfgzxl9mb2rq3qb3m8wrkm07302bjq32f5q7savux23i18rykuau9ssbf39xzievnmainumugp3ebamnm28bcyykwx13bfmu5b',
                description: 'h31ufnzyksxsuaufmfav2j78528hxcbaxb92ynon6s5bhvischlewy0lpxdfdnnym43ae8n914b5s8h0xsgrcr94m32azkx3qngesn3zxuq3yda9q5f9nyfgmqfpanqlvt1w1qsmbmjsgnltu8x9nq225zuxezlz43iqsnh6q6532uvqry8hv1y2kkn0o612hm1wsrg5to9ihohkoj3iu8cxto76h68imhq0c7km3g0s7u5rj7bqy6l1n6aas5n',
                application: 'mnlsb1lwl5ie3foe61x33htdqevylkde1qxh1w6aj7mqinib4pthnsmzbwcb6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '95c30d39-ffa0-4535-9e43-905666fa6110',
                data: {"foo":"EXrw:p*v3m","bar":"o0taEa\\8-n","bike":5170,"a":"ZN?51s2mFd","b":"URJg]rd{4W","name":52959,"prop":41370},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2d3234c8-85fd-4902-98d1-a08a2d6e7d06',
                hash: '3mbebm2virbd9a7rzydkcvo0qmw3m1ewkyps8pgn',
                tenantId: '92000732-309b-42ce-aecc-3fa4ac8c6c6b',
                tenantCode: '07xs4t3fzqz1xiei1kx801ceza0vyh9ngt8j63t2yy2kpr8vbp',
                systemId: '8a5b37db-ccad-43dd-b3de-dccf11424e8e',
                systemName: 'hp8ds6dx1d23l49d6gca',
                version: 'rhbacf43f7nkmvarqbw8',
                scenario: 'bx6av5ae1zkewdevvt15gz588yfyzn44svkb3cilrxykjiw6845s8uwkbfwp',
                party: 'wjw0lwwng16q2mgioxuwjt68tfm9h66d6o6xk5d1xp4bm76byhc57d5sfm4od0739nx7r0zutrqmuo0d8ld14vgukm9oj2xshwo8gde4fn9oew43fo4gqz314e30qiuhoi8hhck6b2fomczzwj3fxtskklamirf1',
                receiverParty: '972akl10w1sxsoz6nb2g2zhxsufhlk6kmp8tz8awmo8577zts0f4hzmkum2wzf4d62l5rcdnhg3a1klpc7tdr80wd69khxatnbxbwttbft0xjmtwv16ve3vxp9dy3euhekzxkpexeqd8bws07nyxde7cbwqmx2mf',
                component: '114athm853ma1m7lvwvq25oye8ix73v1at6z2b4ndhwsuz5yjd39sb3fehd197pq60vuxq93bruod5263q8ebr6ca1n6v2typuy4ijw79tazphlxxk4b6ub9qn2mcvnweym9kacqnwsvlz6pay441yhn4463xk5i',
                receiverComponent: 'koxqzmfl90tt3502oo881teic4lqu19emjqmt4a5n0o98tq1t2j7e6exhv053nkkrgr39lozx141q0k3rdosyy0s945ecrl2nfjj84g7g9j6bzxl8tr3tmoi7hpjcujwiw7yfb2kfgots2vf2ddiz1scgg8npuok',
                interfaceName: '0gvvjj29etaee0qeynmw3m9zruh042qfli21zmcg569kjncs0gkdmon63xmvmf7r6sglxpodxgqqs0n3ke5y06zxfj2xw64633jg86cfo9b49lehq5x26i9xox8ra4u8b55luvsjy6mr6gvboimc6z292589dz7v',
                interfaceNamespace: 'ia9c3do6j4r41qc3isvmnv6c2w2reb87avmjec542sbfqv38apgor05fo1vuhfkf2z96qsqb9n45ymqf1miq0d4qvit5bnpap4t3oazl9m9503s1e8f6751x5662jbq0w4wsdkaonsm2lm6fi8ce011koprmpd02',
                iflowName: 'hn6p4e3n3vz9qrymb3s8frvdusr7u8thbcq01uodty7x2lnehzlismb3vwoh4ff9872elridmlorjod2h51rhuroglz5nhx24341mn4txc4mx0jwn0u3g10z8oc7dxwc9zl19z3w2r3pxsuoeooik2s1pb5gxesc',
                responsibleUserAccount: '3xxtnyiht065vdgcgn5m',
                lastChangeUserAccount: 't02mirpk4jydtasx4s0y',
                lastChangedAt: '2021-05-23 23:29:25',
                folderPath: 'ifi3qz4brawt9tncvstt4pc88db0bwjwposhll3v2lmvpb5xh8klki6jr2fbzubsklkh4bdzr5ouuimedz7gphbkm6lkydezkud4hpjut3dw1ly0od6ti7t927ehyr5nrnnvmgwopek1fki86j4baxsjqee9joiet0z1j4z3624r2n4gii6ygd6o7vpv9uoujuyf04syf3nusprcmpand4kqj6gxdllf81ryhxddjrxr1hnx5shwxd3ucg7icaf',
                description: 't2ewn4a122ccalmwbxjqj9vj6tlwzmx6jtl639ma58en7oph0tkx3gdkayo7fiho2k2df36ut7lpkahq2ok4ps7k3ha8sslwsmbal6q5xqk6l0bjuyfvoxnneify8f0ut2ov6zmwc4uzyvs1pq1ei7if0wm6i4wg34jzuwzmzd8hse4f8j8iqvzse3re5fyyawvo9et3nn6knnzuwd2uy0kl6o1n0x4crckfg32zdotm0d5amy1n2i4ke1axdr0',
                application: '42be6x5mudg3fzuvk9mp7cfgdz3f719o76jyppqsrp1qjxu27sehvxdcxmie',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: 'a531f85c-ddcf-41e7-9072-1b5d3c2fd672',
                data: {"foo":38152,"bar":37694,"bike":"ne,5a/8x(n","a":89370,"b":94543,"name":31868,"prop":1639},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3caaa4fd-e194-40fd-a25e-4c54d8475ecf',
                hash: 'vezg44jgdi0wm4gnzus5p6ida1sxhpxxpf0k8qjz',
                tenantId: 'fab65664-1cb6-4647-acf8-045be2e4f44b',
                tenantCode: 'bmzwkjwbnkgqg9fakq6tx8816c54zg0taqhmofsjns4opswpb5',
                systemId: 'a7b84ff6-97a2-48e7-bdad-ad6469b91040',
                systemName: 'xsjqfipger0jdostmu9u',
                version: 'dy75x062exkx6le376le',
                scenario: 'agenmqgzzl6xaqv5rrz3t7m6ngzf71uoldc7o6z2gj9vdzhwr9jtrx62ai34',
                party: 'fyzsswlh5wbmzikfkrfr9273y2vipbc7q2syl00oeafga7pqby7r9oar91ibifoxoo806728uougnwkw9jvpnx1g7qe9qu1j0ixqpewn3wqg0dw4lfa8oernao71qa99gwh3sravantauu4mac812wp59j1h2iu8',
                receiverParty: 'wzb1sz5cbfw1into2cmx7fk7i3rfrk3swwkn1qpflhaz2ipwwat3gvbhxkrikvbfxbh53kqjo2188onoee3cpw5bmuvg149i6hrk7r7zx1licp3l91gmcxe03fmuoga7ymqb07sqx4wu22lw8zz1v6t5g3sme09o',
                component: '5e26rsxsco5vtcpy0uuzxsd373rfwe0oaslc7pkyzzo0g1xksk3bo7hfo49eth0acm0vg95mlyn5pgj1rmk0buokpr24swtmsm4r5hjzc6jk1xxsl5qoykuclbe7wxqa0cwv5qt8s08m3ve0azjo5kjyauanbhar',
                receiverComponent: 'myiqlnhtlz0w14pb5m1tnr4gzch96lpcnvgsrky1bd3hpmds3aezi3o1pqtwml4z5zyafmqqlsaj2ex8d2ubajnwftchzmtl9la568qy7zn3afhdwb9jzew5su1nhf0iqzkugf8wtuyd04tda1e4hr54h2wcg318',
                interfaceName: '26snzq8aj0csrurgziopk66vxywnuvh4hx0zj2wgbd6s9xpi88cx8ab8t6amj0ub7veby4o7sc59jwxkr8igbcq2e0fc405xwff3e6gexxkzhlzkq3cdl0jcamgtcgxly8z3sfouxer1hsgdcyjfxma64gtclx21',
                interfaceNamespace: 'skwz5udtyz458mqtn8qr31erk586gq0anoutk429xafwqfv5lu59sxj13p2gj4shcy43ur3l4j2rd3eivmgkfsfkjgzrblr8q1yqrjs3cro1j5jp1a5dse9l4nj8e6g30slf11ypsjr6nah1c83izujjj3eme8iq',
                iflowName: 'ge7lpbt61tegsvurakifn1eykv0n8jnqpgexjwyoxq88s8p58r3a2y5pxb2g5sntin14szqk1o9e04jfc7zt37tk1928ywpphaxbqpf4709b1ca9z339ood90z8ohkobeodrebvmq88jwoviuno8jgate6yqanyp',
                responsibleUserAccount: 'wh43kqt50tbne0ln5u95',
                lastChangeUserAccount: 'r7jn8ixlxmyjq9ezjazj',
                lastChangedAt: '2021-05-23 01:34:42',
                folderPath: '7vje78dx1zwjbia5cyj6jztu7uyyxkgruymcak5ajbc10o0x6p6f82ga4hg49kembe6e4bgf94tofi50dqmg9g8i0apnz2opk6qvxjvnmquxvqwhrw3cie297ua8da4ik8z15m2afk8xe0tz25k0fe44mw62wgoiao0v2x9yy1359wgrvltqc5ymkmeq0m4446f765z3amnwau9vr66itikkieil7kp5t6x2lhadpstgai65oxim3d8h7x0dfrx',
                description: '2tsw6rt5kzuk2dquxsslyd774ptmxvpv1oy1m00jc1adissuxfwr0v8ttclfhwlntfoc8lfwt9b28mon9utqr1zdjmfkopv1rl8dbippshq5cud49yha0uk8uuus9xg8dwpfyl464prv95bu4i8wf3pih59laz639d17ndwftvjitd8a3f7a5fz7jotfszxzrmfxm93km1f9tlcuyefg3wd4w6sbz0u36gaots356jly7rmqyzxiuas0ysoi1fs',
                application: 'xifzpu1fn8p71sgypmpt39yfyk0hlx6l0ez2my4sorxt41gy45je0q5k7wt7',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '3e80d380-bae6-478b-9d25-8ba126442a41',
                data: {"foo":"Q90wl3{UzJ","bar":"hH+g\\&=r>o","bike":97416,"a":80090,"b":56704,"name":82095,"prop":"6K{*3&F%+m"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b61ca185-5c32-499e-bca2-989b3ec6af7f',
                hash: '7z86qzy54m4b4vejnd8cpb50quhvxmyryyz9d9do',
                tenantId: '99afd361-c0a0-4fe3-9e17-2f5e2a8ebb24',
                tenantCode: 'p1cn249f6a42qi1h502bqblblcqumf0g6akvgzobcaerf9iha5',
                systemId: 'e14810c4-3ff9-4a53-9684-74cfa965cf96',
                systemName: 'niepm2v76jhq6fqxyr13',
                version: '5e41egeh5v0z3qzq9ztb',
                scenario: 'cnow7m679gd2j5f3t22zst4qlnyzjbn8hkptheqkuyiipybmftcrfy2kjz5o',
                party: 'prf94ujmz51oapuws2dyk5q2yfiadnkttr1ylaxiucvjmwbvj1jmac80zpbon6rvoumharm45xtp5elc7u33b94l24vvr6uomi8n1qaoj9bwhtxvywcc1aflly34eb3cykgvx4xx78pnmor673vznk62l0t6ypsl',
                receiverParty: 'zuk3pbtrqt7sjx46d72py558zlecvrtrxecxaa05uk819wr1zuq4tp9ks50ywgq5be44tjf0gs99d90krt8b7j8gvbruxljncjolr08f6ha2b64t5yoa4ga3345keiky2d0ib2y6u6phhprus09x3vxe4hifdese',
                component: 'zimnjicamw9j5x5r1ckg9di54c89nldh0xadv3awy47zjlckp3xynvg2k7jxlkr8dvcuqv6t1uooyhezuprgszhxy9jaqaszrwzzvm0z15evmkk8ofhkl7o37l7pvbr0mr926qqj6qttso8hfftyon95s53tjlis',
                receiverComponent: 'tmgp4n4kf9p1xblmuh3ezhko9tahtw7mi7ucu327dn13sydjfjpafwsyh13xydj9tuh7bgm65woc59vlwtgez94t0n2qq4vkjhude58lvkew4s5yymur6g5mezc3slx4x1qbkjlcw2892hyniop35f87obfdtk3n',
                interfaceName: '1mebeodsaymw1ogkxfbvnqhkorlgocz61qt2h224k77dd0jveq3khh46rvvt3e1pywgc8n8xxut448f19d8k31nub9udjni4rsastjrs0i0rvkt2hlakrbzn8el41omhauyjreh0xvbvegm5fsoopjpurlurk04t',
                interfaceNamespace: 'fii1v9dpuhn9nnwnrsiya1aysbg8t8dqxew2r7bj5c7o9jomuhzzcxnwzuc15mscmhw4q8vfuo0ax6b6j13qejxzuimmmi73h3lavbpqluxm9omfwj2arwpstvyflk1wdmb490u6czbjnnrfudfjgj4cdztdto1y',
                iflowName: '4oodjid1v4k019kicuda64fe05w0u2fxbybhfrhk2odg32tumdbdogyjgqbwwfpndrlygmcnut124t415tew37g3fw8d5dna67bz7ob32zmh9hqajcgv9604jtg07shzutrnlz49w8z62godhvjabu0ldxoqcze5',
                responsibleUserAccount: '2hdm9hkdezgect4k7hnz',
                lastChangeUserAccount: 'nt2v31byhbyzscex7ghn',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'tiwwyrb90ue2orhl66nn92u6h3bes09o6iyblp4ljujkotr1yr9jsnmxcm9e8j1bcnz8nmj8wiycprl0ar4zauy5y3mxhuao2mojzgq5e4j9aqvkomue16mb0szmel8e5o93nxke4iw29bs81sd5poffzagvrutgbhtu0m5soc6rb0rt3m0eyn9ruyqvvsp5bs38bbaqtcjzqf8o8o5rofran5f8ui95vmh1u1syzgoqwq9zgregg7mfcvo9qcc',
                description: 'w887ciekqnuynxj4mechuaeq6un8yuoweopevrmbqd7t9qve402ufqqucg4z7v5js9pa8yd3ndgafdlqzcbdg0boen6skpgk0apb1wbe1vagy61rvr78n2u3xes9lwrmr8j45tdmc1pu11c62zzt99zzlvopmo7ddcqz6sndljdpkg5p5ksr8b678lxtmot4wnbnt7eugf2qvuf374z9s2fgh3ev6zrm9g30lbljqgijhgmibe7xr6yc0lejjj8',
                application: 'cfmqigt5iqp8vw8hh813tzyrfv3wxuh273m5gujoytoh0zt6hdsxrd6tvb7a',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0aaa5583-1313-4542-a4c6-27c6e0f2a74d',
                data: {"foo":56058,"bar":3153,"bike":27055,"a":"{(q<2\\[j`5","b":87030,"name":30403,"prop":92104},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/flow - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/flows/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/flows/paginate')
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

    test(`/REST:GET cci/flows`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/flows')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/flow - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '3b0f077c-148f-43f5-a542-9dd26b383511'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/flow`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                hash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                version: '4iyw9pwsdxcmgcu744j2',
                scenario: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                party: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                component: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                interfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                interfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                iflowName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                responsibleUserAccount: '4iyw9pwsdxcmgcu744j2',
                lastChangeUserAccount: '4iyw9pwsdxcmgcu744j2',
                lastChangedAt: '2021-05-23 21:26:23',
                folderPath: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                description: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                application: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
    });

    test(`/REST:GET cci/flow`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/flow')
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

    test(`/REST:GET cci/flow/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/flow/1cc5573b-0b41-4d9b-b8f3-d9810439f6bb')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/flow/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/flow/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/flow - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                hash: '12v8rbexch6iemni95gavle8lc44pkescnln7a3o',
                tenantId: 'be097f1b-71d1-4e1b-8c58-473271bff23a',
                tenantCode: '0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281z',
                systemId: 'bdf096b0-633a-4fa0-b0f9-065c35331eb3',
                systemName: 'v4ajo1l62460waru7gxt',
                version: 'obxgad0lxognfmpgduel',
                scenario: 'bosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv1',
                party: '0g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7',
                receiverParty: 'emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3',
                component: 'i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmh',
                receiverComponent: 'wdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvag',
                interfaceName: 'w7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfi',
                interfaceNamespace: 'zd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnooo',
                iflowName: 'iw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9',
                responsibleUserAccount: 'q8ret96fqrjswnje4vs2',
                lastChangeUserAccount: '6k81996zf869z6auhukk',
                lastChangedAt: '2021-05-23 17:28:53',
                folderPath: 'bcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f',
                description: '7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3i',
                application: 'gv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jlu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '5adb06eb-6624-491d-91a7-8b8bbfe433b2',
                data: {"foo":"shs}<g%k^.","bar":"/O^`MC22<s","bike":99972,"a":"dvUHgO.z`U","b":"/|HA`VC<x'","name":"qMh`WuFe@?","prop":",0'+h4bwZK"},
            })
            .expect(404);
    });

    test(`/REST:PUT cci/flow`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/flow')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                hash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                version: '4iyw9pwsdxcmgcu744j2',
                scenario: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                party: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                component: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                interfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                interfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                iflowName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                responsibleUserAccount: '4iyw9pwsdxcmgcu744j2',
                lastChangeUserAccount: '4iyw9pwsdxcmgcu744j2',
                lastChangedAt: '2021-05-23 21:26:23',
                folderPath: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                description: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                application: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/flow/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/7097e89c-1cc0-452c-a1d3-c2a5f0cd64fe')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/flow/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateFlow - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateFlowInput!)
                    {
                        cciCreateFlow (payload:$payload)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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

    test(`/GraphQL cciPaginateFlows`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateFlows.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateFlows.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateFlows.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetFlows`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetFlows (query:$query)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetFlows.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateFlow`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateFlowInput!)
                    {
                        cciCreateFlow (payload:$payload)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        hash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        version: '4iyw9pwsdxcmgcu744j2',
                        scenario: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        party: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        component: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        interfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        interfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        iflowName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        responsibleUserAccount: '4iyw9pwsdxcmgcu744j2',
                        lastChangeUserAccount: '4iyw9pwsdxcmgcu744j2',
                        lastChangedAt: '2021-05-23 21:26:23',
                        folderPath: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        description: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        application: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateFlow).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindFlow - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindFlow (query:$query)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'a8626546-3cd7-4005-a96b-b2416f8aa563'
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

    test(`/GraphQL cciFindFlow`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindFlow (query:$query)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                expect(res.body.data.cciFindFlow.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindFlowById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindFlowById (id:$id)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                    id: 'd0b559e2-44ad-416c-adbb-09e7a8a93dab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindFlowById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindFlowById (id:$id)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlowById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateFlow - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateFlowInput!)
                    {
                        cciUpdateFlow (payload:$payload)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        hash: '12v8rbexch6iemni95gavle8lc44pkescnln7a3o',
                        tenantId: 'be097f1b-71d1-4e1b-8c58-473271bff23a',
                        tenantCode: '0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281z',
                        systemId: 'bdf096b0-633a-4fa0-b0f9-065c35331eb3',
                        systemName: 'v4ajo1l62460waru7gxt',
                        version: 'obxgad0lxognfmpgduel',
                        scenario: 'bosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv1',
                        party: '0g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7',
                        receiverParty: 'emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3',
                        component: 'i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmh',
                        receiverComponent: 'wdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvag',
                        interfaceName: 'w7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfi',
                        interfaceNamespace: 'zd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnooo',
                        iflowName: 'iw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9',
                        responsibleUserAccount: 'q8ret96fqrjswnje4vs2',
                        lastChangeUserAccount: '6k81996zf869z6auhukk',
                        lastChangedAt: '2021-05-23 17:28:53',
                        folderPath: 'bcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f',
                        description: '7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3i',
                        application: 'gv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jlu',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '5adb06eb-6624-491d-91a7-8b8bbfe433b2',
                        data: {"foo":"shs}<g%k^.","bar":"/O^`MC22<s","bike":99972,"a":"dvUHgO.z`U","b":"/|HA`VC<x'","name":"qMh`WuFe@?","prop":",0'+h4bwZK"},
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

    test(`/GraphQL cciUpdateFlow`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateFlowInput!)
                    {
                        cciUpdateFlow (payload:$payload)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        hash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        version: '4iyw9pwsdxcmgcu744j2',
                        scenario: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        party: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        component: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        interfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        interfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        iflowName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        responsibleUserAccount: '4iyw9pwsdxcmgcu744j2',
                        lastChangeUserAccount: '4iyw9pwsdxcmgcu744j2',
                        lastChangedAt: '2021-05-23 21:26:23',
                        folderPath: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        description: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        application: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateFlow.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteFlowById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteFlowById (id:$id)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                    id: '2bab298c-8c04-453d-aa66-2a43bddf776f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteFlowById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteFlowById (id:$id)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteFlowById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});