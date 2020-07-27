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
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '4dye16x0y6qv38hz8abf2fctvgbbiyhjp88g2lvitc565ye1cw',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'pj7ihxj0qylmqlhw4h1o',
                version: 'ndvwqnan4mc2d0qy8tze',
                scenario: 'au3nnxkypw7d5iyio77tjc9or4y9nrsqa6l634e506bpqbc42q3jbhtwg061',
                party: 'zperv67m2pprecwfxdv6hveuff94b1jcx80fpjwdsyoozje2lakvkeq6katb9muap8qptllfvcpgccjde1adymmblycz19tz8o1t9z90hg2pja0fu5pd54ymq2adxsn9xypbrff9p17o3cpvnwhakfvcgdn2vhxq',
                component: 'mk2fln7n6w5s0yf6z2z0eabky8jtskilbu3tsofe3iodhzbfikkn1hdf1l3xa254vc7hwc641udbgxjtw7332lpzv1imgqd2bwsz2lw77ldx84epvceaumwglucl0y5jfz2nsdln1oelzq78v8z2jzjcisb7k2t8',
                interfaceName: '3lg4xi8clwr8ee1dbh1v7qfcgsnz1ej2kt3efzba4f7td664log9xho9s9yz70xkvi1n55zx8ksvuam4zlfo65vpmwuqcsi3lnn45dmdi5s8p90aljxwwg23dy2ru1z4sy04lnylt0cwer48a9p5mnswd8iie7bk',
                interfaceNamespace: 'g5cw3cpozvv6kgt1awipzqp63a3mgl9xqhgnxb98zuomss32yech6xld7zhtmuwqzey0zzjrvumff04tbnx0p73oi7v5mg9ej6apr8rlzc30afjvpop2en2joz07cid8vji70xelmge2ciiwd46n3du3nmp3rrfx',
                iflowName: '3kqecd55j5gbmsl2629t5o4xbzfutl7007xl5n46r26m0olfeg5eumewuyzwft21wej65ymgjpw0zqa2bmf440g6w23ngrmuv9wbuddb6bpbaujqiwtufgf0o69z5vdamhfrpfcbsdd5vmpy1mudyjguy0vukd88',
                responsibleUserAccount: 'f3tknntaggcnb704xnui',
                lastChangeUserAccount: 'dkk75e3n52ubxip3s4y6',
                lastChangedAt: '2020-07-27 05:48:39',
                folderPath: 'y7v1fsu8fiig3dqh3eyma7fqhya5hz2y5vuem5ijqjyiead501j2zvnsinjmtnqmcet1a3qvrweqi780pv990yhm1kvuf42p9dqunmbupfa2z73i7q5u2caj5c6jcs5yyd4llw7d9w6b8eh45qlw4g66c0mkhh81jtrjiakq5px8fp7zgkrurcgsvvjjtwkeu3vtufe2otrf1lvtuefaq1ps5rgedp8zskfbd6ylv45gehg3fbhrl31yliurzkv',
                description: '5gsh1lrqlrxlq2bzsvty9z1vhfrqgz8cz7efsff5j4a7rdxnzjqe9urubc2o6edjomfo75e6lg8k7tag2i05sdiv001qk79v68x2gpv5rhuw7nx7ugha0uwftvf0dkg01g2sap82e6s2bxjolhr3j9dyc01yxu38f1g0qcbnrt0qljbi7gynj0b2gcccnkufi2ij6dcrvtkcp1zlp2y5mferc5paen8ts0k88l6owjlxfqkabiv7us4kzo0dtd8',
                application: '5p1lw58h8tbedzxoal0c8slt44xilliduo82ptv6l9bd7jrdj23y3ys1ylqb',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'bc8j94q4sj6qwb0do4se55elncw1jq0pffpe9aeksj23mhsqmy',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'vyqo5q90bqzg70x7fzp5',
                version: 'tn4gtzla4zm1nctip6zr',
                scenario: 'qpgz8vf76s0dh00fphdb3bq71v1bwpyowpcd5v80es67xslncrtelpy2uc66',
                party: '7cj5brixp6dwqibv96zq4sl383yvvdecdf3wr5gbh5ejd5nmnxkp7by464pxc5bvf7k01ph8ss1inikxsslbcsv11w91kvmibmp5s6hxhcowweo5kiqp0td9sy71wc0xsvyj41odsafk0vuukd86nctgoj2zg1h3',
                component: 'fst1kt658r4jbkw44m3ocbkaszzymzt4r7apxts8qloifnyy0h2054dzgkkiissol52p7ux31bdu55ei9mgrk3wnylnv8a8q7bvavlj7czq6u1sereqpu3z3a4gy8g7tzp7al77f1d34x8c7pwpojnpz4h5xhvnc',
                interfaceName: 'oja34sw9dmgsaebh1vq7rz73f1h9qynvl923aus6p9cg9av13j43kepuj7wloee9on5su11z1ji38g2a91b218px68xg0v046usy7o3dendba0kf5rakm5vqg373kztrmsnzqbzo59hpcj8vwslvg5ai4idhi48e',
                interfaceNamespace: 'hzrcl873ftl9tbexk8v4d8942140kiz4pqtpefq9vgwputcvac6x6hkw63k6783fjod3xf4gzarrq7alcg1e6fc0ko6u5fyka5s1gswca820mrsabwxuiqh9o1l7fvhkp7stev1wbwhnf0d6rsua5o253cx8xvqv',
                iflowName: '4g2g6i41ak83cdfl00njvh689qhhbtx6a1wsf75qpfeqy17zra033g3blmqgputg5mf2td62zfcb0btqug2xc1tz5i5daqnfw1n1wmkl6achk1p9j0qqku1s3aeko1vnzsrpe397pv5u23ppk07wnglpva4z7jec',
                responsibleUserAccount: '7q0val6somq9heeeib3t',
                lastChangeUserAccount: 'k1jml6quxqjefe3av5it',
                lastChangedAt: '2020-07-27 22:39:59',
                folderPath: 'qyhbit676363zjgfqoexb4pp1hfgstak4lp1dxcfuw1mld4w60l1n9pxv89c124s98j7mmbk8wvor9hej57bx4w7co0u06bkexfdwkxrhb86xalaajrxgprb9rk9s2f1dx9qji4xukykm7m8vuypaxjzmao2tf8mwe9yra1axnrbzunfd2o4aeh3ebr5ea6y6n9aw8x13d2brcmg8yh82m5blky14vde91m8haa35852xwwirczkuzm9009y0a5',
                description: '245yw9zaxuhqxj7670m8am44812z6kgrab40nfd60unkkagytociu4sbnexezke2nygmp445hxbolecdiavwfmmomhzjwoh6ajujng2j22o9lftzhwp5z0rvppiaezmifum5pvk2g98lf4vggzw844gu7zqkdz220r6erv9umx31w7rcontbmexf10xoysmbvsqh2mojwye7igm8e31yyt0kj9anywm5g4zay62ueli6bdrdv8stw08mo6ilvox',
                application: 'j8ujrhgh4z5hqmq0oe2fjd4gu7fgn441qtcsnt4p5fm6aiseupquh5tj646o',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: null,
                tenantCode: 'kqvw3bwjidokdi6tzq62i48i4pj3ggw1my41e5knonhc1jbp76',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'p2xg6vfod4xfn7fm921t',
                version: '35apsckpjra3m2wpnu0c',
                scenario: 'kf5jcka84cfzz0p0hxp4oh1sl8r80zsnxqh8pueu1k1vh56x462x84glc2l7',
                party: '9n0d32ki7x5m86vd52h4n30s6xw2yh2jtzmbnzy3s2jjflr9zov9byqm6i9knbsrg35v9p13w66ugelonfrb383yyqp6cadsjc3jgstn3mhu1d0zi3vvdadriaugzkwtmzxzxz97tek3qveqhcltytnxzforcheq',
                component: '1i555mt5kdii0p4guolep4cw0upkxa2q1lzhzbnoz74cdxkngfx8yf0da5wz2hrsqcn8e4jampkpbx8ot1vh9ru9zwr0qm2hhcjijwx6doagduvti2hg6jcgq4vwhvf61ficn1sgyr0yhq0gb80x9n7stu9lxrhl',
                interfaceName: 'namazgjx8rbrh7etey478zd0ez8rxddcnir8aanxlepzuk9wode1pfqci9zojnq87sapasfgb42jxtdzse0ztbmwjk5g6k7nfndj5qq11c4s5z2ut5fczbcmwzzxmp85crom0zh3cu2ap93asnu2qo3ohz4lq0g0',
                interfaceNamespace: 'adtuhkin8kper9rcuvw0n0yuxomo5j67gqkffl3w3k8v3hliu9c6rlmg0p52ll267t11kisrtikoe6xvz1gz0g4ltujepa0dpxcnb8enz5bdj7nv4ygq27enaur3u1v61inaw98j5t978ukgr7qyj144wj6phjai',
                iflowName: 'qeoid174v2nqf88n2xk81c826gk4vafyjz2c8mcu31a0phfnng5sp6qu1j3obgk0iepr9dz0upj0l2ty5okwd9znihhnhq9qnogpfo8xr0d5owinz9s2evct1jz8m3bt8b8ezqwhs8x44zir9szxqx9l3513vw6q',
                responsibleUserAccount: 'gd8jjd3slesj5o0c2zb6',
                lastChangeUserAccount: 'b44kkzyudhge4my5cg98',
                lastChangedAt: '2020-07-27 08:21:51',
                folderPath: 'd8b5gcu4l4kdwzklg6bqv0wa9xwmt2xeyyzh86lxcnybjsnirhgxvmiw9t3obgkqc8bib4rpo0hq8ic17d4jzyswf0w72wm7scvlb09g0knxv03gepr3z9ug4qsmc1uyh522fju4lgc42tgiyd7g1s2k4tj6gen12ngsrm0lx22t1iiko388jg814n2iva941kcawruooygd0li54ew1nstan9ofc1hw03hfx1c73k6p860jl7m41u9oejnhmfy',
                description: 'zbnsh6n4613gmbxa37ix98xrn8pxl13rrybcdy2z4h7pjztptje1c5nxcz79gwmsq2qx9uw3go87oahkugged69alft440qxb90ut7okj8z9ylu6chk2xbspau0mksi2jnhz5u6306loiqcja344795r1adnwlzf1kw8q72mwm8czzu3cfwv8s6aao9hcr430sg0qrm1zeq9k2tlkm05upe446ksaxgar6pk647obfx2wfgckzpq67y9a7ce0zr',
                application: 'sh27u3f40mzp6j0ri0cjyb8y98rlnz3jbfyrncldoyvrnrw5acwtox5fk6g1',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                
                tenantCode: 'bodpbdz4z22sqh4wftrjsm3536foc9hg0s7s27tbbd3x6u4ix5',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'tpw1pah50xn87vph29o6',
                version: 'a3rsr9notqlev9v6ne7u',
                scenario: 'ufmbuvhrs1yworm4zhkyie4d0xf88sl7ct6tcn5n2zvuahe5uyr6s74l0cib',
                party: 'yt8z1bi05enu16lztgjv5d8lhrrblat3iq8da7iqlizakwtdaokp7e4lyb1pj17pyf11kxymq6iazlou8i171dgnrhksxgidds623nnqvnhsl5dabzysockhq8lomzy61e1hbqg72gt7d69hu0zvdfr9voxg82hf',
                component: '8tmgjxwlnn1vlwidq18q34gmbwx2hk7q1vx2617rliufwsby6atd3bdv9xtz42kj09dvn8vq9wldjledvaj2zqm896llf4trzzo4e6ami3dpeg1dye6s43r1y6ej2tz2b1sv2dc9kts0ny5orh01a4hqy05pa72o',
                interfaceName: '3fesezsz14sxf44sxl7hhyw8sbpnlzrvflmxhmm083dul89c3c4m4qyll4m8w928mocy9t8ch7v48b6gmubo0nyu0b90g0twsu0qx3j0rxain7flamcvpaiqbgle7zz1ul99t14u7va5j6l7e3b35ae30lawn1y0',
                interfaceNamespace: '0jo3cr2jwjt0gw48nxaxv32qjm5cb6q88acy1u54cr1izdltvhwlko9y3sfdbsf4nhvg7l5vj0ijartqi4ncwjwluutyz5csv3poge4z1ic0ts2nmsypwipbmcfqeu8jx5l8hd4ir1f6u6tf8aje4ly8solb4y2s',
                iflowName: 'phwod4q2qeipkspispzrl8fkpcuf89hfnwky6n81ohbww67c891gi4uorowbgoj17xmdrx2gii2dryfj3y2kiia2w0h0tgcr1ftkgdnkqi553s7cmdcgd46e71nyb6acyi1p1cq2r9syhjnnwy8xmuzgb3hcnboo',
                responsibleUserAccount: 'cyaao66k7h70vkfpxke9',
                lastChangeUserAccount: 'jq8qbe8c33q05pyj74j0',
                lastChangedAt: '2020-07-27 21:25:43',
                folderPath: 'gmjvkswqp8t7pyoqw32q6m12xu47posk8h7ue9r0tpxxhrfzs6jxn9hhjoev2osxzuytqq18drfb3068i1fjzbfxot146jq6c9ckqx0xxery98tphqqje9he1zd5ifx7ob89x5ki332pmk63lxl3uslmjew3a5e7lvi6s36sxwva3fewi08v7v0jqryz3vnkq213i78pf9neq95ofrvfpqig123lyyu6q25rtwstrf1ybw0rhim3djfdwfk0szn',
                description: 'uv48jvpla8501o9bikb4etgi18jv9mfm2jrap1ahm3q6f6etw6t43k1ofhciadfvrqij1uhir275km97bibw6ffn2c5vqultxqpzc7wbi3rv2f7wvmxvffdyoa472105dlux4rdi9rvphqhvvb25alwjqhx89jt5gji352pcqhpv51b8ao4cftw9v6i98h6htk1o1c4fz5b68oju2w655cfd3go2l9c4ijlj99iqz1lcgxay8t3qqoaw08q8a23',
                application: 'suq8yjuppjzqmqr7n9nyxnduv3uctn8jw82dml4d61jtqn28ah5jpju434k9',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: null,
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '79dciek6j816yieddwfd',
                version: 'wo59pou8hueabwnfyr9a',
                scenario: '3513b3k1ejbqezcc1q0ohernsgulyljyoscdipxg59gdszkreqfz0w4978oi',
                party: 'blizu1c2tmg94x2huohnfromuqzlu75d6th0nvpisgz3vvv660l8nb332adivzuc37i5o6i70fs4kalxy8hpawrnqceuwkruaafkzyqts6q5llti22agns3xnp0ww1ep7jinszfhx0osrpb4edcwwvvjngdxzjmq',
                component: 'jt1vtd1udnwclrbjo7mi713kr434tnxmpzl3vzh4j9nacdesoj8eqiq3449px2g16hyu3z778imnb7x9rl20flgzftmff8pzxxbg7m3hzl4r18bfd2rp1qqa78ms5fygtlwgyty83evrjntb75w2ai1mk7mmkmaj',
                interfaceName: '9a3bgjqmxv6txhw2i1vqredggksuhhln5rtj76lnx7lffmpc94uve6p8q5bsrvxr86peptuf40z9wb4iqa6krel56fu0etetlicoxtvk11cw1yt2u6yd23qddri8v5k9oew7prujdb51fe2ugzzt8wgk10jaf044',
                interfaceNamespace: '7lxomz2nhfcx1opfn4n9na7gmtjutts31ywtwcz0gv1cgamcteraghunii8v0yyu5qhy67wpjzrtvejlzqtfnfwnzwjazl7z3mjy2ueg2plx5vvgirsmow91pr7zv5hq44mw5q1n3y5pb4gncl3oycrh8ye22ja9',
                iflowName: 'ppbtjmeqrel5fiscwkik14pen56yvu7yutiaxh6om9al3btl0907k9gdiyw40tgcbkigv7px0iazxdp6oxdhxpqpxmqz39188y36b4ccq5ydlltoarnnzwyziads7jl73e60xyk5b5qmuds604t5lx8u3t1uzc6q',
                responsibleUserAccount: 'bid5m8va7tibfbly1ryr',
                lastChangeUserAccount: 'hvli8ofxgag1hjsvimj4',
                lastChangedAt: '2020-07-27 19:47:08',
                folderPath: '8bzccish7vnaul0swhhoxi0zj12gtjdusig67f6ma422emeosmvuzmktfg8xa1nbpg6sqkkzu7m94o7yky3u0kgxrgcfmprbbjmp44ebsugbpjk1nofwek2ou1binacprs1fp9m69xv5roa3bow7oq2zl44s1e6g5ksvipf9m1dr2lxt82xs6mm89zq3ax27vfz98a7868l8wtihsjii0o9c1u0w6ej4t68hk4nhjwbg499qqyxyui312iykmai',
                description: '7wc62c0edjqkspmss2282eis42u2y3g3rwy68iuao0pg1r3ctno5qy1e75s9pfepl5y7hpf5d950u2kxh71wqvf49281g23kyxp18veun1j6lwh9rqcfk0aifgez0w0p5jzy4yhehw1tyqn62kc8scs8acwskkb576r1aqjnqoy156peuohq57brmsrdrhecanpeuw5f6vxj7fvnp2cdk3852qz51ogo8826ekob2touocziri5o7gwllg0u3ml',
                application: '6cyn8linw3pu9og5zt8qj9l79riwnd3ozgafmx56v3kvg60ta1e2zr0giq6j',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'usltx40nb4qpfifsyqe5',
                version: 'bdfnxyyulzrg32baard1',
                scenario: 'avhlhn2vq8ns7wwgt5iyjmvva4rp0y6pcvrktpkjpcz50s3ta1lf6b9sivr3',
                party: 'njn9fg4pv8wn3powsxt662zeebvxz0vjzqd3a95rs3om5440lffrxje2ytt65d60ryci9izbqu1wvfxeqde4drnycwn59e4pzklmmkjgugnuuob5erjwlg5cqq1shrnzc3tgve02927i1u8859fbqqnypsr1w3p3',
                component: 'fihqt7y6n15ymocjntnt6rukbo98dmx5gem1h5bm4g1hdcz3hf5ehpamnfhi9ok4ozl5dco0ngywm5fkcpqi1brzc6mk48n8q7n7wsn5c1f7j7n6hk48yf0cr082bpo67t4z3ujzge3sqblvhgxio8kuj274bu8r',
                interfaceName: '75ye86f04nkknfhi8n0050lsv8d47i1cmmmcz12n3e9papmanvrkw056l1bwpfdd60vwskz5zr83nkcf7cte8laz1dq71bvca4qm6mnxjrv44pihn6l6ai3hpspt9bn3wdnlivsz1qitks50q6gxopbjfkhekwlp',
                interfaceNamespace: 'tuf6vdjcqo9swsshy9dtfipntnkq2x1mgz3afejvrxbejg0h699qub4f9na7m31fdmbh3big42kdqgtsm1ghurgpf804qy3qipwc3xjznbkbgk3vhfg9tuzlukyn109pbg4dezayoudt35wt4sej6603s235xbdx',
                iflowName: 'r0t8p3lyvheq39fewvc186xr7r5akkmalirfturmwyqz5nx96lz1thlatmziunyim0csmvipu4hrdpkra1t1e3gujb5chko9vb4dilktp1m8bxxxyirxv87n8j0t1kzqvv6owf6gyursvbgdsq0ikgqlk58xcf31',
                responsibleUserAccount: 'mle6nsxyey26hisr9lah',
                lastChangeUserAccount: 'k185pzj85tmatght1bss',
                lastChangedAt: '2020-07-27 15:20:02',
                folderPath: '8037i8xxkhooh6yf8896aawwhdked5apnsk6l01mighuuayb0iq7ebybl1wdxxrv5l75siiy7ih7z8c38peywzi5b6wkpk9hfocfvisxzqz3z1a894xawbu45dyhlv3awt6x1dn2gdpcks2tnizkzjlhd6dx0x0l890fdfg8n2a9rhr7vefjh27szmc55dojsghrrcqfvv7btqj95jkr3sr745aa33w27m0a8t2b0np01ohq7wp321g1pclg03e',
                description: 'z520m4qkw3k0poftz6oi1o3w6y3qhlfh6vntctnb7ckiomn8vk9zfw6k2byp3k5uaekfslryu25i9k8b25wu4ro9fp21pn91s02pfrm1mhrhsjjkk8wgc4plhqiljb9ibm0pp3b51y2o0pkuosuyp2teoge5eatnsmu3lzrpn1mrd9vxohsxt0u3t6mgr6zl1qp7jjkhbijsvnbttptmwrdfywp6qldyti08i339rwdosiafa0lzdhiot963d2o',
                application: 'astdzjf5zxbg835fog5ja1312vg705fkf5bry7esbrxtjf4ceshu2sbwnbvp',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'oeano85ruxohw1qnrub57nq5yl2nutxpdhifghv99pu0y4x5nc',
                systemId: null,
                systemName: 'macl0v9eybryzp4u8zpf',
                version: 's16bwpg6fla0w7l6lewz',
                scenario: 'liy9cgqo34osw7w1ji0crjajd2pdskjdxkfudy033bk9o8708nfxaq8ukigi',
                party: 'xmd4f5qyukhkllbhr2cqyswug2l7t4oszu4qjei73re03tqjcl3kanmqorrnxj38p7v8q9zimpcw8eq4oi40pdj96kq2jr0m9x3kzvuhn3kifou1a43mf219bjrqjgj1gc6qfquqso3tflkm9b02vdbamwlwb4xj',
                component: 'uun9kkyn1sv67xcisi7keqo05chahyb7f93vpebldwdrr5wjdosg6dz8twp3dio7esklm4vhgal7bxzgzspvvg8c9riqk11qckjxpshyy6u50kab2wzpew9x344um0o8b0cqgzwa0cxwgbl5y10sasdyno6hl5he',
                interfaceName: 'd8pqy2jjl2gc7v9mg80pg9q3zs8cm3nlmvbc2x9qbsrsry0ax6lbha8r46dc4fwb0iewbdjw825tw93dkkjlvcxfyy8bj8ldgqxoqp9qo6c0hv206e8f5jvmcrabh5080cj2by4u7vikda6a7z4hdvld7xoi7ftp',
                interfaceNamespace: '4h0sdizh4h2k10evhs6vbe7q6c9nvplbsjjnywskar9ln1h3wvyn8lgpl9grod5fpvky7klj07dfq6u0x7d9avi1z0z3w7bq95abbhgb7ti46flgucal7mw65sczojejpid3btzuks6705013y2fgm3b6hky34yv',
                iflowName: 'gfwoxwjvj07rzf0saesbqkrobhxzd9h9jd0qpk09ajn8zpvuqzxilbxrr6eyel2c7vom98raj08z4rdklywh8y6odmlrveu3jtszkfjvunuii73vg80zm0wnuazf0yzklh1y0qvmg8up7p202hnrq8hfdfgt57kb',
                responsibleUserAccount: 'p7rt5mtd99jv2o1j59jc',
                lastChangeUserAccount: '5mv0omcqlzq35wwe8wjh',
                lastChangedAt: '2020-07-27 18:04:55',
                folderPath: 'jqhrmb7cvnhiuirji82adf8oc8ieg6fmw3fu06ap2oh2r2z53ndb5ke9e8n0man4d05gymqieh2q2k4zgsfk7digctukzhylrnbnr3zxrburxqrafxbfz7zxfcndnrnyrl0t0ofphdzofsoo9kslhpltjtcvvsbzi8pczg6dmffnfnvtfn7oyz32nwifp1lr3m8an6x5ofdtgyjwmc5taisztcqmbsfvhmnriwgbkqevmsnc7092cjxfwiz2tmy',
                description: '8ky9tuxechdtdnm80f0lw83gzh9expres0rnyftseylyakljl9pxcp3kn83gx5dtezbsy6mk1qsavssmicnyy8mgchwr6bxmcjntgzgc47n3n8gl3xr5hq7wafo5u80pm5noezzs5ab526ih2354hs0v8ok9yy6nvcpk6mrqya6qt189a52ni7pk1hmmu6upy5wacgrvbfwzkx10sql7v5n690pnb0cmzrcet74ser260x3jrktw2r7vo17zhxd',
                application: '4b1o1cp5q9sf1os9ak43iv4ojnucxduvduu62o12cgr97k5z9paxmzpr88la',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '33pqfubkjxd6yc7pidbk84iri0wdtyb1fvlznp2wy0qp03qekv',
                
                systemName: 'z0q8pb21fmt7lx3nzjc8',
                version: 'dt86kk0wd4nhkzu8h746',
                scenario: 'nqo569treaj2xzz0yf45zxffwj7e7f3x0mfl06omyst9o12n1n2vt53h4ohj',
                party: 'zul2ooi1e1av0frrfmcwjs7p5xrw8hdk3fmrd3qusqw4fxc03hs2ohxwjwaxdlv0lpshjst77gz7ajzkpea05jc91yg5mygdtisgh6f31b53ducvxx95uiiie1oruy5w1ggmt9k9xckuta5c5swq8yvfvd1ax0ij',
                component: '33rxeg0b8lkg7yvu6ao4lh0zdaalhcprl04gysu7eyl3ltc4sa8nk2einsw4d6vvptrt5tgbzvtq5u736s6gvfav9kyh5hiiytlpd12wftezb18n1icz79j4d7fztgowqfm2t0s5ml8ps2jgpi2vaurccdy6t63s',
                interfaceName: 'c8p8jtkgt10d2urr18fi1txegl576j1angxf5plci784622j7r4b0iv9ouu8z2h17w2i8lblq560pbm9iy2k3jwek85glhm4opwad4q5nnl6n356o8ayiscogibfm3oaytwsomuzn1u9df84zbusdu2oe9d2g7l4',
                interfaceNamespace: '4z0cv2fbjia2dke3u9w0mvvouycl5cybrqoymg85804vnlpz3m0v4q6lywi6pvxzrpj1o9rairo1xvpaoet75yjoxwgkts0dtccj5m6jj61dxsnfjrosgxe4c1khkziz8j586icgvtvb9b15rw1k5udur4pqprnk',
                iflowName: 'ogoz334kktlytvp89idl8nyxy9eoxu145355to57sbcybzhjayki50r1p1dsu9pha2n54us8pxyc55nvvgdzbchc07c0g8vjt5kbsekl3k0v8sl9k6s59a1y0rqpnq88ag9xnoby4w4ljyce4xae2e4edg2fevmy',
                responsibleUserAccount: 'xiilimbnqkzgsf26c7ni',
                lastChangeUserAccount: 'sz02v2jtl2ckhjexvyhc',
                lastChangedAt: '2020-07-27 23:59:26',
                folderPath: 'tz1tlcxjj7qi5clfm2jkohglatjrmz6xv6kv1zrab561n662xtiztgvw0oyuhxnrrfnnqatjyrnioh5lkqm7t9scc3v95xzihukjwavj8xxpxanzxxyap0snfclgfikyr5hcig378seen4pwoi3hfxle5rx9si42bsnft0w0pfeik1y34ilr538lob0vwud7d7zce5jt72wiq48qualmaomzwein3wy91z9h9uso5vrghrkzckzbi5hk8kcibm1',
                description: '1ubcdo006dpt2v30bysh2a6ysg2p4m91hiaw4y8f3uvcc4n6sq7y2ubtvvjk9fz1kpc2ru765ljwkhn5ptd3o385a3h9ep0cvnmayjykxxnd0vm9n7h73wl8lz7u1i3w5g5zograydssjgpvsun6xokyrzkb30ljlh2bquc7mvxviz3sn6rvdvoj25xn9dimkvsyqbe25fsw28xl42pllvtf1rvu2p4thklxqs007d11oei07tgezjaforue0re',
                application: '4vmz791zg9oyezctcu9vc1swksj7qhfs5cd5dt3w9pdfwf5n5doyvp0apb11',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'aerkg7zvgh0i1ow9oidfl1tvr0d7xjz8js937bigrrloj6jnz7',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: null,
                version: 'wd1c0917bd1n0xoftsga',
                scenario: 'l6tn3gioj6371a0sgnvzoy0y2af8vy62gf88efgmgnmvco72fhzqk0q9kwz7',
                party: '09yr4l80rtavssq1rupe5wmlq0hohhlshvv7qj5k7t5x3u9ij9v4vq172wax5f0tagqc6gqbmxcoyh5kadtmr0yzr8worutpqa60wxzl9x2n8n139bftbt6x5ygnrmbi7m0biyyfvy6twc7ryg70nj0mg5b689by',
                component: 'kkvkwa7f00g7rk0unr53kbn4ym3bvh254xk01fn0ljtvz3gkmee86ub45aretuwrem5m2avdzwrt61ljdpxlffrdjlo6kxwnn6mspgk6tdnengnqbkf5wx68o47hgvwr225wo5hvcb91fc8zf8i39v35f2no64oq',
                interfaceName: 'ax0mcd4lv1yqey3zefprpi624yv0i3pp4902vu24azsmncx0i8vw0ozznbliduyq2v08qe4a489vwgcsp991n6en8swu11dj85x9dpdidfjpw18p1wmvilgyrwect1b93nfvwi4dbkmtuwuwpwnqfgjz86834rqk',
                interfaceNamespace: 'grjyaoicvsycus1lyc5g11kf4rsadm7ghzdjjifhe055tumxmebrlz9246k1jbu4fxtow81e8rgvg49fz9nxibprfforjzt39e7fh2wmoa4z6ofpbgulz0jbvowqxgopnfi67h9qqlkohwog9q7gw781frqtw4qv',
                iflowName: 'zfvjm6i11av25x4cw6zaju8zjbaay28sv9lbzh3h49vq1l4est1180jq96vw3n4oek0uwvhtpvi7e9q0ox7idc2o45em0xrjrmowh46mqe5v9pirss4z7ca5zsomsewu3cfmh9b8ep4zvc797mhhf9h3prld6x7r',
                responsibleUserAccount: 'v4rh5qo7hwadzen3o5uv',
                lastChangeUserAccount: 'qobgunnzpt7uyl8gtl6b',
                lastChangedAt: '2020-07-27 19:23:31',
                folderPath: 'h0ix0jr4jdkzlshof73uukoud34nlmrh2kmyh3lg94fwbu7zs32vbuh5ji75xrdo0w24b41c2qj1ncf7k4q4qc2nfc1bghdz1kvpazu1loh9flok3ucfgdqvpae92dwji8zahfyy14s3cj4infaw5d36mtje73ippm0fwbyurvo7aw24dsetjtaasr8pl0aqbrws1diq1exxzmbjzpgw5iwqy7ztnn6e1jze5x8tbim3dw5dyg68rozr02qkrkx',
                description: '4d04qsjjf0xehkb6d4exqdy6zga84bdh47j3skk643uzzzvusvzghzl1v9yraj4vrkc4yy3abfyzunay5iwqrmqo15ftmx1jact9qf78rukb8745lmz4bnrflnc927wcockwccwhq176i53to6k1ldsfqvbbqaau9lvpo5yyo2caq1b8ezv0es5me198pyidxq4elepiz6h90yeqq0ltgzid9up5lgbufhfjptgcpsfiyba765j19gayqrqzj9k',
                application: 'gox6j99judbtebxyors5w9q2idc1ent43eynajpvskk6xvkiz6xszfkf3jc5',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '3sfimnxrwphox2nl9eyb22e3xdck9fh2r2we58jwjf9dowojwc',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                
                version: 'bvgozpr3sofkkkmrro0e',
                scenario: 's2mbswlgb0qkkubqju5tcbh3dm0nv0fpvdm2y8kfpehzs1lbasykcu3qpzze',
                party: '7e8texusz4ry5uz7b2x58cs19sqp93ir1at27r09wzw2ppdxrcjiquice09k5rzo3jlvkyu0z08jlizdmpbt6repsid3otjmfd9bzo90twty9xoojtt5sjynmmmgljd7m58nytm7k38ukf6uatw557mqshteap3p',
                component: '31vohe8jicicldc24o56f0mtzexa5altxdcmtakhl9w5e9yvm8p2e869u4ocx80l0rafxauroszzbds81qa71hyitbqukze3jr99xfdmgyxd2vni7z50jag1vg95e9xopndvbrye4daqi02hy4efmna51oqfz3dg',
                interfaceName: 'c032z8z4lopxvpmdisebfjvaxjv6uwbgt5r74k6g49utphmdsasf2fzs38cagquwsn48n5czsm3xrmr2pn7kef4af4su4tcouzxponecx1723cdzycg6zzmklr6ba5st3yijz9g5cxh58eidyzwjbqvp7b1h1yk1',
                interfaceNamespace: 'u5ketcftkpo2tjp2bdpbbh58k2w0o3ji9yi0k6jub62qou89wbnl2zku4m3h0levnbqow6mo3zwaq63mec3tlle8qrf5h80bir52dru22yt7nk0021jxeqf8mt3v66q1qu5a0x59bmeofq6led43odqsl3k1em9r',
                iflowName: 'ddq6usiptrrtrlrjmidekjt3933bpt4fyxyg5bhszvglouu362y39xa24g24ddgq3o1gu7it2b7aw2mh5quku1m2wjze5rcxy716m7f8axgaf5th6sqgbjm4e24typ7gzb7ff3tfvlhjtt8eikwrtbabdycj1l6i',
                responsibleUserAccount: 'nicqlguzm6z98545j1ju',
                lastChangeUserAccount: 'td9d81oshznqzx39e3ir',
                lastChangedAt: '2020-07-27 21:39:32',
                folderPath: 'wytiwwmswyud20nj49swpxxlrmq47pqk2zs7lrva6lmb853wesva6wjqvhgjwmsysaoeyfb9iizr5oyyffcku7p36vnh0eaqz3nmnysneu0kl8tshf9gyfn4gff7bgijbhw559gtlz7muu302gz9tfzzd0yt62tmn6eln0dc9bujez01kmnhdhlfob69o1ktbn6g2m9q3gk4gsompjgxgy71qqjrzvu9k5iry7fm12ae1ct6pdo8r9zme1o0kt7',
                description: '9iarozkn07b825xbwp1q0vdnaqdyqvv5qf5f2tlh84t6qopsxjghskmhnnaphxxybxpe282fkrvjphvjpfveijz6ail5yj7p1yuk5yfelf78t9p471n8ud5h0h47i7vzhrh4b0rhapf7np0yz5jdnvnhoqep4u018mo9pz3c1ji6gvda27h33vo1q9gybjwnaio1wejsj17emfu7zrzkv28v9tgjw3i35l79ki1f48u6m5kggqemy1g05rjqkph',
                application: 'mq24ispgqohqjthhq37fw67fwqmof0danx6qok4btmjlyht58jeasg9m7iv1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'pbllqn6wfbkojw16xg1499ivok16wsnhq6n1rdjge7bq19y0ig',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '8jn25fov6srdh2dkg4uf',
                version: null,
                scenario: 'c06xw7lu00igaaaaobp4u6tf26yai0692jtsffqgi9k698uifkkprr5lmonc',
                party: '1q95hjlgexw2zmm1oflipee4dx9j7hht67d9e7ocx6lryiwwxekuoomifatu26haopzpaelfh2gtvrqpxtr95pfc1lqdbc9hq6kljlb36eyi9c9wxfublg72zz4gx6e8lxzbkx0dv99qo6txzx2pp8n198ovrb51',
                component: 'qn7twgnstwnzpgwnv8bqfvp6z2v4k6pgmo1q6mar0rmx51fct1ddx5ipu052t8597hiw3snqtx2zg8wmonddmfisw0uteatykpixrlam7zx1jni1r1cylzshm1aef506tbecoejt220fih3rnrt2d1ykomsboxiq',
                interfaceName: 'v2syukwbpbvof2g5c6v8tubg4gzxxzilm2o31jh7egc9jzlxvhmaso172bo5lh19vug52swie16a4ehjmma4l7vmxeyurc2cv7m8eqhomlsojuzgccdv5vfn32tdd0f4aiu20kkhjqpj13e7b9b1owa4bp33hpuf',
                interfaceNamespace: 'tn7frwv9hn4i1svaktfyqgqb9kw17n8paxl7x7caudtygrwwd9seqthfkmjcwcqf0vw3h9s7dj9r58onxobnjisxqgxja2clcdkc9tqpupncskqven6hrl4bl7g4hrtsx9vyspsbw18wxd3orsjwlwocfybsycof',
                iflowName: 'd4fb8smdv89d2h40lxo7hyijm5e74byqipemvgqbk5cfc3ubykc5cu9d493ik8sfktcm1v7b4vidmq04u8gciwctrfqr6ae6g00ez7x71k6mbndbgw8b3xqp4pqrjlp4pywbogssphuexjdmk6n06mads5r36kyj',
                responsibleUserAccount: 'tbnmnczd9iox8sl2jqap',
                lastChangeUserAccount: 'xnddmqco0dwymp26eh1z',
                lastChangedAt: '2020-07-27 22:53:28',
                folderPath: 'volmfyqvvu9h5ro7ysi9q5jvha8g6gddijv1caq80lo05a47pg6673lcsyqb9gik9vvznhcetnpizykx85e8es0ty9jelyhmnynjxfebqtxho2vynn2nbvh9qbaezy6mnoyuzin5wkdofzlrdhlnvltcnn3p5vs0df1svloihbg6fcy1121t2fvv0tfnppcg324bvbu1mbnch9d5d8c6la3b4sp68etoqbx1qnc44ledlvs57ibssptchqlvhfb',
                description: '3qh399pd5nmmd7wtfcgt7wdhw25p0w6n1z50s5y2sx9h5cyhizh4mcu3sgdwq4ki0gy708p6y8hsjl31rc0dtorallpe8r7emwvhmkspracpb8pn5gcs3bviykm15m4q2sbbl4cfymw5773hn3t2tj1meggrd8ahq3dndexftcxeoat6ifdmntqxyvcdht9tm9rqwbww1m3qz7g8qyxiu9nlu32si338kyhnc13ehpjhp0poyg4keouxzhe8ub3',
                application: '93txia6l4l053ygn2lp7b37zygfe8phstqgjmasnz2hoeu9zcjwnku4skof6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'k9vcmjfazq9fz50o52bs33rtt3z898yj3b8rfh0pae71vmvyfs',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'fe8p3xa5nqywgg42i1tv',
                
                scenario: '9nro4keid1ixoge54073t1wpb3yeb4lfkukrs7ok08jw468k0cglquhgjsub',
                party: 'iapd10y3qejmf8lc5fr3sr68zk9csk3ji28t96aoz2cq8wrekbj1klfyh727x38pet9ixh2qhnhunuzygzg5zxy12sep6g2bzlxubipvxmbf0l59z2r69bakdk7apstgtm4pntn5a49ln2qfs1he1t5lbwtsxpu5',
                component: 'p2jmx3rzf1jf011ug1tkyi76x2bpex6n7ij0jwekavqiltauxjebbtcj7fh0inhv48aalrced7bb83eaim3dwvvykkqm154w6a5dfka96fmqemggrm4mj9h2pvl9lwlyruyng2sj78v6ecw71lmxf80t0o9dzdw3',
                interfaceName: 'lsx4mxr5y0xfxrf203yypv9at4ydw8w9um3oar9giby8mqxv8zt9w37xqv4x19wtwno66z9s1wvocuzcxjlfwgksa8eummudigwge49n0zvppdes5wrxzaciljprka8a2qyj7l76lhmar55cnwukf1hqx2brwoix',
                interfaceNamespace: '10gapgql3etqdo72cqcbzlrzpsmd1v6syp8cbjjjgls213ropx4vsmb3vzdnlgdlexio4u8it67nd9ewdz4biu0jqiqc01mk65ps4ubo4uqnieck857w0qymu4g0fd34e2c0d3zyv8rd90q2lib8wid4cb093xwf',
                iflowName: '1e3pxq4wkwh94g1xykeav0fpieozpmxuunscq9x980iywvoa0ciuwvhae67mkxz7y18011t382j9rzgmxeaehu5ysnxi05z16pcqpgchtrainrd1s7jhyw54o51h3cccqxgl80eh9jl4s5fhnf5zxqx28b8vwikb',
                responsibleUserAccount: 'xpznwe51z3fqsj3ui75h',
                lastChangeUserAccount: 'ac476npq11vfp2gibjb0',
                lastChangedAt: '2020-07-28 00:38:43',
                folderPath: 'lvphu5wk7thxidabmvj1ce4l4b8ftbes879f14rwwp68qbwpjjd0a65jbz33leoskcjrsgt7prtlr2hyjox6yihrsbykvyln1m7313ymecuoc7cc7l1jm6t23xei494mfnq8b3fxyxk515kohqlcdtb89yyvmx9h66vfi3kdj63t11nz3wwvda8zr9d3qj2g97osoh8ects7mqsijop9kitipqqcy0xi1zvevvfzt5y08eyuv0639t00qx9muza',
                description: 'au628cc21ocna4fgvqunfkms0i6v107age4ro77zptjej0u67zj18rhzkg3lyfb4etcipvdtx9glc5ytjhzlgxoa1dsqvodwss28urppgwa72wrdgk9tcrl2os4245yjdvo8mk1x8mhyoifd1h6wf90iwtsxotw1e5p9unt0ej5vr5kysf5ttfpbpgsml80a72svbv7o0kvb34hohw8iq73atqx6d2mc6oitkia85ew3jozwl2k4vx1m3eji1fh',
                application: 'vszqmm3htmcoh3f3x672rgkmdbk3d83bcdb17rgacu3fvhn0bzq76ge2eb4l',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'lhzstf4lbef1bwka4vvp49o9cl86z5o8vcia3h2gtoczmnc2xs',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'oo11jczq3xghaugqvlm2',
                version: 'efx4vu5uiecom8jtrw7y',
                scenario: null,
                party: '7acw04yzlxtxmo7ob8exwsuv1r6l8vcanmb3yhiux8kc8ig3suuiupky1bn04mpndzfhl83ub1yqonoosaczsiav4cu819bgxhg7i3e08ls2k0ke6y2i7t0xr9f5pz0l4s913qxag8wlhxo3gwxzf0ry7ds2ktfc',
                component: 'ajtmdtq58qpdbzga9gzgalh3q72ig9nvqrv5edocwhsb6p30qdi39yj7i8wocp4p0qkd6p7ckzen2g45sfhk6rk9zfwuxujomr1vi9dxv5unq0hvbll0gk1shhb3fbi4yekohx0j5pqf368ts1a2mksz0wl7u0qo',
                interfaceName: 'so1ysd0fznrzy3wwlhiisxa9j2g8f67x8nktnjjuf2k08o9agfv2kdg4bwxj1nmt9l5mm683ktkvjauz50wuxdd1ohaga5jmj30pzq1z7sariyeafdbk6075bju39zf9nhkjhsd9oujq6bfckli5ataxg88jtmh8',
                interfaceNamespace: 'nfr5n88i46x1e9xtcjafrkfa4xsmwri2zhktjpoa6atlvgxh8w63allm1nqblkkv530baqcrejujktdj7sdd88rcf43ssbrhgg3prew73523q1hrukxnro8sx0jjat4a5b4lz9ikgckdltgzeipcvic4q7nj6uiy',
                iflowName: 'uoghvkpotihhptibici4neyhgv25nphgscyzkvh6zxiyj7vob0viplhdpgg50seldjb7aghxgiwq931ys1m5l871upzkm8gvacl8tz83rfo2fjg7nwl4q7jsag7fp0tt5exksp7njc1dxwo5fads2esl88nz2hy2',
                responsibleUserAccount: 'yzo30f3dukd3jatxrdf5',
                lastChangeUserAccount: '5gmufvcm0t3kl76p1sjx',
                lastChangedAt: '2020-07-27 14:15:39',
                folderPath: 'twu2w4jlhwzma3soc6pnsxw3sj9rhurga87rh9rolqyzkdswrzq6d17t0cafgux7k4b1ffmpcygoo1vgikbjqla2yhwb4u1qute7930jcvr0stv437gjc8a5zsa84s835ri9t7clwsm9qzmy08k0j4n3i6nnlg90cefab08p7sc97xi4xj03ouacnyln7p42b0gzv910rnaqvup4b5rqaw100focrfgmhusoeby8lsr72e7eo9pqqopjismmvl7',
                description: '5px435o2rqf9hz5rhnw9s8p82aost4brue3igbfym13ru3fhmognpbqwy72qmhm85k5h0d9n1x3qjksfmc210g0cfij07vz31b003mldpf63n20gslcexm8wereemazljiz0mf5l99t3peef1iaz1cbu2vpc21zkwnd0y7q7qgaqivk82oikdxgzmtjlkqqziq4jdgdzwkyl7uo2027ajzmvatk2q3bapn87h2saq8p04o3bd8wx3ujl837w32s',
                application: '57ir4matq1ytkgd65uvix43q35ujuvgawg1yygwf5zfjsgs1u7jpygbv4hgn',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'gj0cmz4fu265edq3188mri546rtcgcekv4kn17oe3kddryex2d',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'sc612oef7sne2znfwvav',
                version: 'z71deu0r4xmfp6z22ok7',
                
                party: 'fdyeuh0vr6uhm5w6xvmj4rtdzzu4yyxmn8uqisudng7quiztxgdoy902m5g3os3tmrtavrj9onx2dyn98vww75aek6lec6kyhw9l17d30pqa72io0zc2frb9it506mil4hz7y5cvc8pkeex1sqx2n3bq7x2xffkc',
                component: 'pcf6i44hmbmen1y9ag0si2uqkw8nd844xeu888xblmx2lippjohbqnxq1b9o1pb3v320rzs4mv05a7zv5l8mrvgt1r7f9hcn2hb00mn2xbtwyfmgfywfdlz8rs8jcwos1emwu3tqezoa94vnz7htxkwpxt45p7m1',
                interfaceName: 'ont7jyqcbo5f6vssq0a1ainv9z0f2ax98f7q4zf4f60rps2wbtpk1luqdmj88akqbk9lrmjn5vaebdkxfsisf4rlmqcvfemo1xshugbuds5qtgrle3ws932qotsscs2fiupxby3xrd3xkr22dnip22aqayfz40p0',
                interfaceNamespace: 'l5d9mva7jor2dnm6ty2525p8dkhjmu5n3f0ay08keefeqxssve03cdb9u8n6zcysyz7xiwlt03fed5litojid396jfd3n25dpjw9qghrfzsl7znltcp0n97ntu38clyqqb8qc4ryn3o3bk0q58geb55jxr3tndm1',
                iflowName: 'ostg3l48a4b38y2ecvontzlflsvxusikwxzjcvgkkcvn66zfg6ss0yxoludojqot1a5x18aslu2l89sv9cngt6y3u5jxs2o0h5wgudhd55fy7xbu5icqtdjwuu5zmnnzt86ocv03k0v847gk0n3h55lz01bmjvdp',
                responsibleUserAccount: 'aetvl37yxkru4li8kpxm',
                lastChangeUserAccount: '9qy3ucldtswsflozv089',
                lastChangedAt: '2020-07-27 09:26:14',
                folderPath: 'o1dtmnh3sq1jzfe4txyhxkejfs5770dmara51ef54y3xqa559apq2qdpu6xxm89rieljulf7irnmjbu1pnguox8zbu96cluwf8f4vgzljl0jili588feqyne8rs9cp7ltwoyex37072nbdnkx6xvvwxudhtyj5gxl4lo8f8jbzwsqzm16rjl56o5ru4tmiqsd9w5c5w4t9tz7yhmt6p12449z9f9eer6thhzh874sq35d9h7un2qhyl0xkw2blp',
                description: '8gb30xheod5xe8lbvj51bk0q5cq7m8n78h9ptuoerpnhiy8vuc6e0jw5bads9rwpfw7kb886q22d7ggba3tx2onjldhm2vrjy26b09893aj196e7ypboo9693hs4plu821750js1ir20qp2aq8fj0v5otf15fv8iu9nula3tlhgupvfbx3du2680j6cqdibgc5y56vc25jczx0p300y4oqihblt9mwm59mp4f97vd4qlquast2sz1dr7903cre7',
                application: '3accyme9vzqxck814ohtrwjw0elwbfvr3wwkeci9pighwwop9a3vpvgtuid4',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '38w3mu5bp0z4xyqz209scf5dm3fa62j511nyi2dx8r56jhsoz1',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'sos2d1w5780l3tf7m8v8',
                version: '3ikyyiwua6nnj1n3ktr8',
                scenario: 'm8l08wxf4145mz96iv7ny8i2tdwkcleptzbuqm95d4huvc320jh5ohiveuso',
                party: 'kdg0wnmz53f2tqfoc74yzll57jh7azzqr04vommhdytd3rk1jz1edp9l2icfqqvxyhejf0ed0llf6ru9dbgrywxp5o2u1dgncu9ajairh8c4wk7fz86z0z9x8uh4ne22mqstjjy10aej3fu8ggsg8ubupyobmwwp',
                component: null,
                interfaceName: 'l8ozo9hsvdctr9kdnt6shdanlqnhyxlzj2j0xy89ndpc9prgwi7urux5ptc7x84rn1t5ovb9u7bfekqn4tqqq7zclsyplmbqbnrh3ktpzbz76uyy8o590lg6qq1hbrx2p8cpfbf2jt24pw91rv7yrqsom8q9zxab',
                interfaceNamespace: 'jewge3olxjbqmkb8nw2qc6yqey7k6ryeyubcgfh34ijx5cb3w2sdi0h4tlmy3ogq7vk4msxk2lb560l3khhoz3h0vpmd6l8wrdlpx6us3jiy72czqwpk9j2p590fs54umk7jy9fjptiu5ducfutla6s73izlunq0',
                iflowName: 'rmphizk8sixgsmovkbqv660o4tecylcq7gh83msqhthti9jjfc4t0lj0es6qawkpwl5d38tyym1pjezpl04irj1l9kav4odig8lgwav41td7slkvr0iewj6oulg0epsabgci3uw4d77jk21ezbmxmta2w7887py8',
                responsibleUserAccount: 'bknmg4uikpwafz5q3nuw',
                lastChangeUserAccount: 'o1fh1oh1jax69ve6zbo6',
                lastChangedAt: '2020-07-27 06:26:53',
                folderPath: 'g74mownnvjrzeukybc40bni67j055185n27y7xqldnyety1wosfplvmq35m7ap3fs0uerxnstvw5b690waq32i3xrwfry5ropgmj90inanhedb77u2mj8nxbop1ryoj65r817vmamb5czzgendskzln6joiaffkcoxy54y8nail7r0ijsgfr8mmqrkayl2cjbikav49t06i2urxcy3jm9f62agtz67lu3df6slz0gqcvps54zu55kyd4lj2aa20',
                description: 'ro8n7c1uvkr0h7odv8rjkcwpj8qnlmvar3ntmjcwhx6kgub6qli0phcz650vj4co50yi5q06dhsiqe45yql8jm48zzrqcegxuuqu7gs9fi3vzxrhd26qpsy8dbbp1wdgjperld5cf9s8tn5ov0ie0vyvvn3qcls6y0oi02ahoej5uw1tah6y9nmoxbxkrvb1e298wgyqwktd50m8ac0126cyb3us7gg0wg3xbwwxq6g7rjbyc9cal5hyiv9rmrm',
                application: '3impy80huh0xn0f1wpmztisfydm6rpej9gt72fy00dx6vo5yzuzoxh366dop',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'gardfknvtjglkyowvubeynnvu5upxy6fjcjt82324bmc434oat',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '1u4jge6c3tsm4hzvd0jw',
                version: 'x9amsih3mrffpae5o02b',
                scenario: '9ijkptr7e2ny19nz4n1c4l32bxyu09qknipi2nl48wxwqat587mc3y64stiy',
                party: 'gt8gob2f4p4k6ppbuifqx0dk2wotnaqwo949tncdvfsnvzwlopo6n5x88kfuhvnsw9oaqtiiv45nqk0aaqtv3n3fzg0y2786e0mh9xax3rvoxpdoclct8h12niiotq1vrri5b071vmsjznyyjxlzxkc1vdk83wjw',
                
                interfaceName: 'a8qkrce2ky4q4pvap9p7fa70yn8oocqkgdu0rd4us8cuiiltviom5swybc7qz359cxa2k8yzg7igedeuruisr9mfo43pkqs8zde1u0obtdwqvhmjduxx9hny6a5eznnaepgupbc1kpgz8n6ectl4bqvykapoqv69',
                interfaceNamespace: '2nfvxcrukhjcolmu1vmjv9o6bbywirqqbny70j6qrrw8y3huqsrixb41qp1re4tlt5kgr0hpoxj8b7qewu9hx390579mh17e5qs9vc8weow1x7iqhqwdnfi2gp4qcdy9wxugukj430zwv89g4km9pu78audp3tjk',
                iflowName: 'seqtv4g9qlxkdpln6nt1gxwnu0d0d8qr3u77ou569uyi278rdslgj1hg3v9nz343cerazc7p365miqpt8m0hf7jbyd5plh0l9n8bzsf7utl5j5zarqchj1zrwiqlzbvbj0gacbbtz2n4wy5nq8o7s22fgxp7e0jt',
                responsibleUserAccount: 'aghtmtp1ub92gr3gsdv0',
                lastChangeUserAccount: '8ar5mrj2wzbdg5grjn8t',
                lastChangedAt: '2020-07-27 18:25:24',
                folderPath: 'enl3lo98fegjd5uknp6mws9hnxhqpqje1rc10gwlcvhw8zg1upm4x17tohvcb42w3a5wfarfn55raufm6nsrwa7lilxdvyp8k4mbiin5c55xm3ffqidl0l5c0n6bj6g8igh72kn5suz3rxfezsav82242eyh2eob7mv410omhqwdzhd2fkf7g8spzg3emcnvivjsl5v9w19nk5e8shkounzt6f70ufaw3yu88lk7s8g5nb3j2vy1yxavbx1iyij',
                description: 'mq95o5h3chzs0dphh01yeay59y9s6c9pfqwbt1ln4qujrvdmim5h03qtqotgqem25b06zo38grplbyc19t3tc4vee02utzyygq2cgkcnnmf8zl8nq8nmkmxqgfi0cghna7i3pesswxejlum36a0vam6pne0c9q12xlvowq2d37qxpyhx1748y1btfqkgdgdkvl3iat850y3oo1hm1o09exzn2sfbx8dhgkxr4r633fsgeyn2unavtkzhf4bd190',
                application: '3rfibcedm0t5om7enex8o03f8d50gozh9p2su0q4ipequo7vncrolrlolpp1',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'cpixijcq9ympc3wdwp3r9a9l3x9p6l7bshowfzpji7i95re303',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'mxdeqz5yco3wkasepo89',
                version: 'zjhds4xnipr60zhqya3o',
                scenario: 'nw0nayenci72ecfsitooa3zxgsdkr9sdkwyjs815toosnhlcafz1rsrb7d0g',
                party: 't6ab5dgysq1hdjrzxf70mdbyis2h1ebgd2eceiju2x6rqbcds6bd9cip9yllzv2hj7uqm0ll9d2ko2ht379sv5xkrycjhbn70f7y7d0eqzimkx9wnbbwljrch1ch6si2q2cdcx4rijg6az878paj75fc8h72dtus',
                component: '0p0cj4rx1piireus3jg1a4by2dbmfqxorbb52vw70dfckz9mtbms43adt5ghicnltnhfty7kyujsq9m03pdfb1o87xaderbhl4544daswkqbu0uu4sjwea1lhb6rwz3rx6w839awkgx3yb1uaublnr53pwvnrnqm',
                interfaceName: null,
                interfaceNamespace: 'fs4cca31qkx2e7w4t12df416wm2yb72lzc34tpl39spbem1lv2hou52q4a2xsu4zvef8enl4o275poah1hhb33q0td3oplvxntf8lrq18s8btjcc986b963sor7nongy18yt1wo3vy03wn4loqafnzcd1youkuf2',
                iflowName: 'g2gtaha4g02n2un8nmwpv7p02fkkevshzrrdrcgqb5p9biblpltqk5qeud5vd4l9xn0rqyvju9t4f3lpy40s6u8wfgnhzomm8nkf1uudt2lj4p4zyliyo2ymwjg433hrr9os3j9hoaiqzhy10r37yhf20iqejrfq',
                responsibleUserAccount: 'xqmbfzi4zt1ixtmksdux',
                lastChangeUserAccount: 'oq5tha3za1r2y0mcmeqk',
                lastChangedAt: '2020-07-27 17:59:31',
                folderPath: 'rytovs8qty8j5isa879nketnrsk92yh8jnkbellsgd1jegiwgdm94i0pakx7xp7jrgjt7qpo2umygfr86vj53avku8bsxm3ykzspjiduf1gtbp8d5be099jz47k88gtnjitt4qdzdo9m4lt3qjwlgcogwve75j493gxx9kzws67ai6wodfmvrgu8y0xbq3zmwwzgs5rxtwyqjjfuv39e7ysgrefa4yi8c045ikfozv1flol2e4j7wwekrningo6',
                description: 'ralx5ywttvueo1pz8c9vl20dt1mlzt5grsoj69qsk30mmy1wwu9snatfrmnpwhjcpm7ek6jeeemaydzfs26wca46g61s3sxqbxrgus5y65o5s71qk54y4r548v91fsb4i6g0wwynhed1le9xfndqmj6d1ogptlwrvqcucvp6pjj4u4pkois4qmobnm551tcg4tvx8zsyo9cod3og2ju4r31wag7uf13pl42k1cgjrxuxfetue2shlu8fw7kbmpf',
                application: 'b5g0rt09x0qk74149z0d212qma171s9y10nvwltweo0z50rzsbrtl55dofy9',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'itueglxxk10sla0bbh6ii61otz8ez8jrucnuv4cjcg1xt78y2v',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'o31rrcykeaqexgqvafmx',
                version: '26t91e5vqns0engtjjbq',
                scenario: 'ypi68yipua9rkgkkwz8gfzzukyvfoxvn3c2zdq2li2s3cefo6p4ch9uztf3h',
                party: 'jnj3tnmvy18rwhz1nsot1sp8j1u0xynu22wh6tq26ng41s1m2wsm5kgitw81kgz57yuso3bnr34iciqpk8qeyaheq3fiipchj3lwpm8hdolnh64j2yzfkngmqcygcgsangalx65wkdx9dvusd7v0f4yuz2y5incu',
                component: '7sqn1c8bl1kel8htjc9qx2wnca4tw1s85ywtxwx8543uruuy6oz1daai4l9relpb0eadlwiza8hfnnyfr3j02df8ftth28rxzggxzmjhs0ygx14xnxjt2vn1757ngoi4k016hoxfggb8y9cy5fueldyhcj83ybhk',
                
                interfaceNamespace: '2h6eso8zcmpr1cxrbpyyed1lx21mdt5vhlg5bws0vlheh7ooj20imx9q3tcstnuzx51ow5h35pb6svd2elwrzp8mla5fx0i0mlqmn45jaf81habj5jpo510mj6rxjqpt9nmmx4cmhje6pxjhs2yz4cyxzatk829t',
                iflowName: '6uiice6567nzbfkom4vs5nlr0dg92flwax7moexcj2uqra0jgky6svjvjnno08880rj91sg2azzsl8ugf5lqwr8yl1ez2p1jzgc4t29z1vhfa0xhkhgafje8dr9yafw52kud00riyxap0rijtichrqfjqbo4qdjn',
                responsibleUserAccount: 'heql1kackozgn5dp3q92',
                lastChangeUserAccount: '4bjv4cjdlmjc4q1ottwj',
                lastChangedAt: '2020-07-27 08:50:43',
                folderPath: 't7yo9ed1aqe4aap9n2uxqu80rx51u5x7c46378y5lyckmls3rfs66ju2jf6qn1qcta7rbqztp41toh3fc6lzc6f9avq52svj3y9mq8rw5ciltg6r3pslaxfmiputsttzgkd1mgme4x4xo3o8ydotwpdj4ixbzxdvn6mwnoub1naduei7ma554uds6ia5o3d5rt0qugml4ova5bx5efswsx2y60snf3puufbzlcr0mtbaof9qic30adeg5620ao8',
                description: 'z9n7rd8trjzjgd4l4om4xodjb3atu6d8ghn7hvl94axgrbk7mflog1sxdp4gbpcgeh4dtkqy0b68jsr8h0itvdm07zwpnevorl4vmamsm4177qdjio3ejpwfcq5blbaypq1jqi5so4u7qal9vvmvqykktjk7o2k8ju99daf1lykci2n0dr8pu9erx51wkwinnlcil3l886pn22tnp4cxpozoceto1kgl2i4kf969kmn6lpo71jxv4xfemofbawo',
                application: 'ba62kb74fkd7ickb1kyau3a1g262d272r5lz2rhv65m9xjxi70h5d4fk33t6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'i7ntlxx4rdjltno31kwjq7uoc0q74cp0r3wbqnphatmhnaiv9k',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'q55p7cbfvxq197q889ld',
                version: 'dnk9rh17o54er70a5skb',
                scenario: 'pxzx66komg0ebvjrj4sk9jrre9zvgmiv4fptx3t4f8pi6klm320vxrk2pn7a',
                party: 'j2alltkhk62o0duzsrqp4321xy5iymr8pt1fph06vog6p59v5xis7pri1kac3cm66on2x24q0m8crlkzpzlej3uifuhiam4qpnumqf6hugbts3d1bxjn0i0gsm89zwqjp6cr2wtyba8131v7skls1nqbzx4vxtu1',
                component: 'x5k84qk0oz9ytenkv1wk2ry1loztjq6z5c9f3apsmqw3hpa9kcay7nojzldzuaf5gl7lhhprrwq2xmhktiv6ntv9gpwjqp01qi6967zy1clmt6cz4ggkcjj4mpk8hn32fqj2qysxlizn63nzwth3qsykdafrguiu',
                interfaceName: 'u1tk75q2ap3bo9j7cj7h8mu3p18lnr7rttwdd5ks7y6pde0n3p4ofv7wj5t6ollj4uw63h0u0lo9ysm87z3ere5hh5ghe6gr032mks9vg5rscsaqeka4n4a6jl07xurfh1egn5o8z7guzoajvfyygopgn7wc6q6e',
                interfaceNamespace: null,
                iflowName: '921ws1ogb5sjkqnlffal34otnmevx0un2mzzfyo2b6s639qm5kxctat4xpt5jbctcdtreylzpemdwetci8fcdkipxolx0l4kcgjl4j291nq7n0znxgfpfcnic5imqe9kzkvdvnoes3fqccip8500a31nncenf0lp',
                responsibleUserAccount: 't1dcxaeuhcdy24bhjhlj',
                lastChangeUserAccount: 'kbjrfxy7152l3aqcniyl',
                lastChangedAt: '2020-07-27 02:53:13',
                folderPath: 'oy6jgi8ig7pwsgop2ulkyn8h75is3812cvy4aoy8vm7f547wxjeuhn9xp6f7x5vbvs9n4n4ssmrkd2pwqyo7600k8lc0swrrum8s6dbvrgex36ilm51whhlhbaadxeo71b906x4hbdmwl3e73ad1q453vb1wxhzy4o20vkxs848r6ynpdi9fkebr0ulqmks017gyzi0msbeccg8qfs0sw57fpzx99zfygy5ml79k0n92rnqtep5tszwhluh2y5d',
                description: 'p085jk9o20kzs3f8w4ogpgyr35kz7nnckuiag4wtzl71gk1i1gmxd3pw35abilit2atq9624qro71yafq8zvq4egyksdy5u0f5t049o8kyap3h01yj270p4091p47q57ugdotsj8s1lljezjo293pf1jfk3m4tlvumegniziw13dns62ecd30nvu71o56pfzlfnlmrw28vwvut58o5t4x1kjui0ox6j44a9f460uqtt4bbzu7ofns7arpinlfwq',
                application: '8pbtuno0tof2ae8cdojuvhihqllirdagkvzchn1vj3aijoptb7msi5ftucqj',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '6f18dxn1ckpvut9dpsj1raxo6g5p5ardojnprc5ps6y76c56u4',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'dzs82tgudta2o8qc7sdj',
                version: 'xlowj0n1gejdspvzldx8',
                scenario: 'n927xx0535hbmubmxspc9n8yfhynfa6e1t2cnlvbi323x3em1f8tita0fhco',
                party: 'c4r7zxrcnhc07qi4jr5srza9gkynjtfgvvx8gl210arcw5jgx2x6g5g1485pqjvvcy9muxgsefl474hd4ejn36kn4i8b43vpaqbqq4jimffoa9zk9xqarz3edyo8wjzhivo5h99sfwkur4habmpwybctyt0xg7yb',
                component: 'ktkq8gtdb36ncq613bzbxtakowfkjodiis3f02jggmscbnx7mxjfuskcjumvh5lmpgoccz45pkkxeba2ymw2u6j3rte586urxc117xb9yeqnj651qjx8wb7w9it55kjmaw2wsum5bue8erf0mf9wzubbig3abynj',
                interfaceName: '746p3bdcvpodata76fcgepn4guxj4rs2i2adg7ldhu5fsbsxspzwzbtdd9a61ipi1ujw346runl81agwhso5kjyy98d7tvt3a4l91t6dvc3tno2tll6so1ztiax4kn5qecvedcltk0r3rhkz3ousbtxpu9xo4err',
                
                iflowName: 'goku03zyaizpvxqrbz4pb3p1sn18tsp6bd8wgj68s1tid4zwhpdd8rm05k14qtlf9r7gbuvi8adb368tng5n7p5xt6yzmwkzn3zajm0arsb0ox9ve4ay26i6kvpulk9yxr4ar9vvcnj2r56bma8u2k635q54a5rv',
                responsibleUserAccount: 'dbq684c22rkix1nbsduf',
                lastChangeUserAccount: 'rtjmn37zhxarpiw20c5d',
                lastChangedAt: '2020-07-28 00:25:48',
                folderPath: '9c1vkt3mh8mxvsg5mt7zfxit28ut9xld39wc11oekuxwd1xs72p88isd0eiz2qiw38d386rk95y22mcc7maylx4ipnguh2egvi9vmmniuxr2ekzxgtmvqfzmssrv303b1r6jas00n0nbkvv8ldv9gert8u2uhwv2jdvxbnfk9oxltv9qhwdd0j5u7q1c0fa4h18d3b88mo4jhca7o7o8adcxg29audde5brl9rqvlfin58rb23shx8yv1tqz9nu',
                description: 's6x28od5zttt3bcm037me3hatdaee2gwne6zbo780jjypafi56qrmuubpg1a65m6vz4jrnt1w0b0hxhmsvaypos85jp5u5mj3sox9gkh5u5qpxd95bgmetnzugn57oj3huhpxk5x4ju29dljs8il782fkry6lzwd0cahyg3n8ayuu51q2p9ewsgtwwc6x731mdxpiuopxmg560kq6168gepqi7h3vpxzr7s04jqnlzh4fbe3ceybuugw4hrzy8i',
                application: 'om0bm2xtuhntpbr5d0qrgi8sw4vximsps2b9qmmz8444ofw895y35i5c6arn',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '9f3ctmzm69gho62zwz1v89xopbd9ei2bpgdxb8xl3m89vq89l9',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '9iwxn8gos5rbsk4nytha',
                version: '5z2fmv6uekapnwj9fvh5',
                scenario: 'eliy8iqhya346ms1y7y6zjv3xe4lxgps59s791g81xjxxd6e03gcxqlkjsmh',
                party: '644m1hpkfscvod0ccwdgcp386kf7t6vg5ybvvgzps2ziyxy7a8qcipgsuifahqh4x23s5ph6yn7xam6dou96al8ltdelud2er29xaf5peew28po64i78wcv77tiz1w0i4crksebxy7btj5gtc3v1gy53wcy1m0an',
                component: '6j0a3242md0fh0odywvqs5fsc11idueknq69e4rbxz6qey9tgpbv58j185caa8tck791u2vx5j3hmevh2n40e0m4zcoo892u2k30q7d2gecr5gftiprgtmc43aexgg26k0kec1kh6tm2223dexa7z4cf0vpg6goh',
                interfaceName: 't9m36dfk8ia5yeihrx7ebqs35g95rhprxfigyml9bxtp8f8hu6k3y872hnfe5162jv7saqzlowau0why30njz2hkpg0d1d65xxzz7x35bhmlpxdt4qj3fr59ewxuxu41vlpgyjnrw8336vjquhw64kg8fx8zwxpk',
                interfaceNamespace: '8j8vy5hrvj9lmmcuhxdk7lm7w9g4s32uyfsg9ar9g3py7novabe0ld5jmqirvqnmhcd5wryu43sx7g7nut66o7nkh8vcqak9is9hxg8nydhje649cl9u0cxc5zgffp29em4n5afltgz3kg7jv1dx8s3ozl0v9snu',
                iflowName: 'i7lgfq67ukewq6h61cka1ua3dgdix6523a8b2oi9gsntc0yojqv3gx1ss9xvifmegq13ht1xde6j5yhoqu8h29nj8m3wll9mestvvr0a7goaig0677qyha14jfxddx04p7pf919gv4q7pakfzjle4ze64ghcgsag',
                responsibleUserAccount: 'f0lzclni2sqcd6oahqqn',
                lastChangeUserAccount: 'bhn1ctze0qlsr72xlzh5',
                lastChangedAt: '2020-07-27 19:52:22',
                folderPath: 'nyqkjlvpw489xeqe9vev5fppvpknjugr1ezrnthtda2lofadfnbk555q3c5f7rgn7fmayv7d07yj4bcpogzju13xn7mrwswx9h18pm6ddzg5ucxi5a5lx1mlcijpyqqcpxnqunare7yo9fzk626l9og8ft1duh0prjbql9q6oby29gbbeqnbiygpsn92qhrxdaicax34d0dh9ch8lcstdvkrre5qq65g7cr4zek10rqtff114qrn8hukbulporg',
                description: '1y6q62f6j236ee9kdcapzquj3pxw1teitd7ajl7hyi6kyjnbfhocagrdg2jimaekqkvewuaahhunpwxgo6c4fuaep2vxvk0m0z9i0fn2d1dk2s9qlom82wm7qj4e9vf2400enamo4gzjtfn5uwh7j2nonywjudpkdaysyaos2zmsqdarwhy1m03qsjbv8wqroqdim3edexztm4n7362b9m4ydozbi0t5hs7a1hiuep5ujmfbsd4tvmm4hmhqgzp',
                application: 'bhqik9ybv8tpegicd46afnamf1uk30vj4gysrnu0z6v3za6t9z74cevbxxll',
                isCritical: null,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'tv7k0xv13hlql8hhcndel5w9e3sikju8y4r0zcy8gim8kvwpe2',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'zyi6p36y9kx676yh8t95',
                version: '6fwkjna1gju26gyopn1f',
                scenario: 'fw3p3nd0nvjsiwqkyf0i1gqhlgqsgehd40rrlhjxa7nsqsrz7s32j8twwh49',
                party: 'zwlv00v2wh5egs05zxn6eu6sg2m9owqc4und6gkizn2efjxpbp6xd9i2c0bwr43wex8qc46zu5e5ly1k6witlxnt4a3bt5zp800559rh390a4r8n3dm4pob7jqzxfsta7217br9g43sfp1wjbgft63hjr9rj70v9',
                component: 'l4i3imqmd3et9oxxt9112b8x8ommm6lseaqzmgtli2kw8r76kdxey9gcusmzvixujiraglgpllqtymehykhbazv1mzwtkpx1cxvofceulc4f84nt63j4g0o3q52hovc6pzn3liyuueadsxr75jqoyxudup5ghsan',
                interfaceName: 's6v02l0oz2m9y0zrfpqmmdsnfdc5aamfe769txyi1e2bfauvsoew0af2yw4el3fla3g3jqo2rjimgs11zx50sgwthl7eteax5ayam7tfhysiuyrh6nu8nvzkttyjn3c3uxunrxsc4ruobgo75m6rbod2kmtbpy0d',
                interfaceNamespace: '116n91zuo8ji4nkua3j72585gbjyf9c5oedqjvddxz0y3vprv98dhtpifbue6j0ewv7mclxlkgvboli29rmtsozv8ibksr6i6b128kwycgcc98f4zz30m011rrug9h8m2txmrzx94pmo44js38fi9p9a729d3urc',
                iflowName: '9uj9agbm6y6e7jgp4klkadn5oau0o7q94fz07epgvoduunmptc02czdym4t6ko0qp88hh7bz2huo70h1zfun1yzes4cjuogxu6v1g71518q7psgo53baj3lj7bj61zggyfapheveuw4ninipt6ytomxj4rr5mgtv',
                responsibleUserAccount: 'oqut99mwjwapqy4urrjg',
                lastChangeUserAccount: 'mcbm8333y2msgyev4r7c',
                lastChangedAt: '2020-07-27 17:00:48',
                folderPath: 'yb9kkb1on1vf1tswjgwjxplatqzzljj1a8wccxbl0zg41nrgww4o9h2252lsqreegtmnv7bdkju999nn3zxa1t8jdqxcg0h2fy6w54h2kdd3z6g72on5rvg1hn1ppll0n8els85mcmxuzjmoiuwe2l0bxav19v1e361mtip7q4g1uvpahxkl16w2u7lc44tl5mlzc514aolwatuy41ylkpozjt0wkc19ihzk1vfzlaa6sh3euvkxc20m3ezogyd',
                description: '5n0zkijyv5g3dummsjhtcnb94zplf7jb5dadrr7wwwikvlyl07vhn8yx2g6n0bfidzmastwh44h6kiha0alx0g1oc2fvint5nu936o6stsa1qwysx15bcqdxbezs5wxiwz5zqtxo4o4eg2w059ejnpr15yaigd714yg74yo80gswdghbqrhn8d5z9fv9d177mpr0g32hx18h52krs72ce6764hy2ru3royqwmsmj20wv6guo1qqsauochkmg1sl',
                application: 'hmbfcq163bdtov0hwiwvdgp47puz5xpprxmr2de56lyldryiuu5asczpat4m',
                
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'lqpfgmke0ebpevsdh8736b86ihla0dwxsmabanduv0e2ia3jfb',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '14hkvj6f1kut96sl1hib',
                version: 'yw8q2b96f33bbcaso90h',
                scenario: 'keknpscovrwpomewy4z38kdt75aet964aogemwuwsznp20xuoppm0rpi4wp7',
                party: 'ijuoj1h86p31spkaffb5retg3x94dwvx1a9t4b640vd3y2944ugi1tbm5rt9sfil9lkq53vstutmfzkqdc279lak382olkrneqdl22dhg0oizwequtjfvt72mnvekwphva484x2bsc7q5o1zla5wcbsp189vbs93',
                component: 'sk4eb306u50222yzw1g7cizzzi8fd8s9wjs6rv002qfnfartwphmf0329nkir946w2zqci5tendhn2x56428gxwckygcdj1yuu773awi7x8zh07qbv7l4dtlnswjgf6efwy0lip78ogfptox7z7fcgmqpbmd0qc0',
                interfaceName: 'rnb6ibkoougtlc81agvmq4hawvyk0z3p6ner6qkgd4dtxzvxotlwmtzwyl7g9223jyjrs0g7woqiyyoi8ccfgswlzei1m1jphx4r9auntm2vfbusvr12cdpd9ezpbx1sj3fu0ok4al7q0cyek1zcloqk6lseyjh0',
                interfaceNamespace: 'kppcchka9hunqn5o7ozpw2t6uizs21fhdp8fkb8lqajd9k8dhi6b0u141mp1r1ey6kqaz3if3uimifjjanggexcoi6o747vd4exmwodsssbdddjwi1zcjy1jvyku82dnbwfbqjx3joti6zhvw194yh6ans8f7unn',
                iflowName: '6kt6e8ogiadio94vylgz0qzbed54y0g8feez7iu38qd2o6ora0l65v87ovutntqyy7osmfsl1tjsyymf48t5h5krpp4uix8ryhsrvqwghtsih55z99lvz77olzcm1tptnjvabd94g7634noa3ek8amxmyjhni2by',
                responsibleUserAccount: 'rlh3wslz3zlj34r1ya1u',
                lastChangeUserAccount: 'sx0a3rw201fhv33zih9e',
                lastChangedAt: '2020-07-27 02:34:04',
                folderPath: 'cq3efdr7t33qv5zin4089mjl48rogqpok2hmqi9kxyirepxf0dkehqgqb6r7cupy3ytch5azsvq9gmfebgo8oj1revese5wpytk8jj1il43chedbc0ptdjo829vz11u9q9m8vq3xj3u940kh3t7nyveqc5guxsb5urq19ft5tol7um9g98336xrdwgetjswxg711padqlguvhfh41gf4mkq7f6qh4hp28wy9aspmzuej9eiq0jfsx0a02die28h',
                description: 'ro4wlxtf22iiyzkeocagbd93o7g62a68h9ldtkohj9ebr59q0p9tjs57y5ny6dy0c57yljytkmxeuctuonvzlm8qd0g82f6xvm440jj0xqahxkqliy6or1ikxgv90sjxqybd5hex6iw0r6q949z4ebmsh713n6op3ivdd8yruf0qzq10bp8sjpqgipg7hvwv735i5z2c237ntwkn2aq4yzsggg1ndhy52wt02vdmn6k6xmybvmdi1w9ar4li7e7',
                application: '579j0bgtct0glq23xon7my93461ocn28cep5csvv8f23icwqma2t2qu72bpe',
                isCritical: false,
                isComplex: null,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'ut0pw9v82ld3udor5hltcq6bv0q747fi9xcmu66a748ardcflx',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'j6wec4g0y9laz076lqzx',
                version: 'km12o1dy0vu5fq5sxrmq',
                scenario: '6a55tuvxy8pwyhj64nqg52bdhxi9y6s2lq5wv1punkrtexzxpbc26m08l72w',
                party: 'lfiihze5qbbedqgc36lctjatue7swtqkwlkequc2uzfdtct3ldqrcbgvhz077mpv1hxe9qf3fj1jo3u3ugwt336gsgxo121b3x0mugsraapaq3g7ywjnhtfjq3mh23i5wnkorjnlv8pvrgdpzscygcm3c8t3grv7',
                component: '86b9s0m5t2jtoa256mlit7rtha61aoz3h2n2xm7yxxq6v9xp52aosscvk9wqbo79y2iqb1rc9cuhjpwb14kajzsjhpnamt9x0yw2ba8lfh05f6atzws3m8og0ftowwszpcpjfdp83iowaddoa4aj4if0e0otryb8',
                interfaceName: 'l49rj3crwpc35f4h7k5sa0r1fxtgpo1l5mwu0vbjur1l6aifyoe5zcap5p4x6r66rp8rtaszieymhqstx05xg5ctydeh7eijm4q4kxfysv5x1mbf51y2pu85qzdfdf0ttk23eavt9s6p36ukz8uknm76v0n7r03d',
                interfaceNamespace: 'bhgezgfdzyhjmayxptmc1b5svky6v2z5vnckogoonvvyba1ts758rauxa5nqft4dyr5hsi6krr88bs8b9es4zere7e83fuk3kseqs9i0ub9f70kbon7acibzx5pknddlmc1h5hsp20vmmlylbcltqo4d7dnu690z',
                iflowName: 'je08wwn63k3pat999arl6p1qc24ei5offb1xc1fwly9i6hhpxhj8xnkm87qft6amvztdwduulm1wmfcu3i08dgon76rsvr4ssajax5fxj95mm47u0ozo5r2brbel4ebqjm9ixa1mtm90104qttfqgtwmeo8v8nwy',
                responsibleUserAccount: 'f4ur72o5s3m651es8h01',
                lastChangeUserAccount: 'dwbehf9hga6bv0l7txp9',
                lastChangedAt: '2020-07-27 10:39:54',
                folderPath: 'thck3vp0f1pnpr136eziviky3avh1wg7rljuivhoijuyqnbd4b3uogwm83nyyrf9sxhhla34v5lytrdxls14c83wq4h65bsvq3wzctw0amm59avz1npll18cinaik3yr14chdv68cm8uzxbsaq0u9a9jfog2n6qfhyjr8fw79r2kdv1p9n90srxz039rud1o9uz311moqmh4omz85vx20u476odej49n9yt0yr7vsn2ca2jzd3e99lu4f8gcgcn',
                description: 'uvt31etsajr12mxko3iri3bfoz9qpcfflvh7rfgil3rj229zburgmqb1tkf8c6g2x55la8ri6v3lqe9g00ohueth5pzme3nfxulj17k026xsfgwif2wkaadi6suot6pvt9z47irm2e2n13dew83vo3tb8gt960sx4b3jmeblastj4ptuu0lxvrsn8jh0qg5b96r0o2ygz94sfxrsudz37wx3papltr4o3b1l7hadp0hfgrk4hbaead9fjgi8frp',
                application: 'r2zs60paem94f4brkxzo19n9p1fi0dwyywp9d6jdr4i8jc2v3mxm3ewi2f2r',
                isCritical: false,
                
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: '1q6qnlh8384inkdmszzcmvfn2j0h5niw7dfgx',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '32sri3y19wc3fk3s4qras6t4r9e4a0vzbcwltonpdki3lyfby9',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'gg1shw0eg302k8jwxvtd',
                version: 'ktw54xeutgz821lbbgjz',
                scenario: 'qx8isfnvin35ftvtga86avlobk6jrwo7u4qmbez1bn86bucyil2uua3a6k3g',
                party: '1f2plhfbpaynpcxj1a480fjq6ecllwxnmso77ajwj3cntft8xztc5f9nez7cvrird1gxc8otiuje77ip8kjcsg0dp0wfvyyithu7i5qvo2dtt53215ktc2agsp7nb6njr7jlv3uprsmjs9ddfsemtefku4hrnpd8',
                component: 'tswj0uzouxoz9o1zt0nziepumyrno4ktqvdrmfzqi5fsw01exrgyl45789hb0jt0u0k8u15pgxzpywz4o0ribb7i72digm89f9b3j8a23ohqu9v2bcn947vrdcgpe856xpbwd50dqk66wi4kgb4xv46jvozf1p76',
                interfaceName: 'u7ohof1u09ygzvun5nf0hpibq2incowdvlcjhkt706o0gtf439mzck539gb33l7fyeb5ab3b1yqhdjveykj4t98l2huuy0mktxo5uuyazobeelnxzlrsvzzood2o2q56p48d116ce5vqx7rxzkxmocsqoh1hrt29',
                interfaceNamespace: 'ly4q4nhhrzgcyr8jx7wvh9ys931r7lu4odx3l1jwimilqflhsw234zma4l5yy5px4re295vagb4o0spl7hepf4zb9jk41n4o9rsslge4u6r05lggwamwjqqa0htqvcv6u0wxirivjvebczze3nmj8bv5dcsx1z46',
                iflowName: 'avxqsf0v4qhzb47zw42l4dl5wi1c7c25zxh1rs9rqje2yljl7belnzwxazbwz9rpuqa88yfe8p6gytnghnx0wh2a26tbukjnw0m9isd7fw9h7k7n6y5pbxtt1nl57coq6qv4vleyye896y4wbj0unsm08rrpulps',
                responsibleUserAccount: '1cqeu0ugk9jbp5pye1ph',
                lastChangeUserAccount: '44ksheo83yg1u0fmeu9g',
                lastChangedAt: '2020-07-27 04:33:32',
                folderPath: 'r64j827iezdc4w4c1nxzuur8wg6j37fa9rdr3wog4w3aohw51pc05wn3jvml1g4wnky0jkybcwioal2xzuhkv1ruteheecw16en66jpirokkjhz2jjladqq9079yzl06koc4gelw0sk6bxhrindymdt8g0ar7n9rbz5bxntazb706kao8ii5r5avxkf37cfml74lzabw7iejwnocqq3797feodrkm3pc34qrra953jvucmes326tielb0rnuv17',
                description: 'gvlb6o37jto8xo9augod59a1nybi025q1xxum1gygy1wbe38hpowd0ekueg83o2hr0hwsxfgyw094rb4boevwv6zwid9m61r8t615bv7hj0l0v1n7n33fbv1tfd3mpyhvw24lxxe0k9m201bsq8sdkcx76303gmupl8j967784l2cathroksbtyy78ezfyuzh9ay47ynvlrrmxqfafk17ps26pidegusn7srpd11m4o4dcm2nuhlhbhe1txsc6s',
                application: 'jfqtbyh0rg5lafabrm5idxmiqo55cta849qixy7h33d9soegvj933ghibd2o',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '0m9pqu0o376m3nltbpg0bdss1ry6ixd09ptca',
                tenantCode: 'qvyet21sybz0n2af687gg1bl9uwkchzlrh5lexhytsn4emzd1s',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'laih3xw72giiwb1dvp2t',
                version: 'aigi5deo5et30j04r7zl',
                scenario: '33whahkfknxwqlo21x6vp9tm2dynqtzb4tykn5q3zx70oahcdqs90pkkx2c1',
                party: 'nyavf0mn74hypx77nhbmuperr3zfd0t3o19voeh94sixklwef76yf7mahuhyyu5pfq99jctgdqeneop671c3r684svvmulrukzpy1semctdhm03cuvnylypmvq5jfn6x0tzli03o2ko49w13m5g04emg3srtqnmx',
                component: '10pn1xym2qm1wq5foyvxxaxuvmf1w7q0fe3twzbkc1m1o6wli7xaa91eu1cq5s690rf8ovkkxc5ky979c3yr0if7e6k204o17d7tc0vtrr7o1etymurv997vw7oy4mio4oiylw9onjgfqjeyo7fyxh5au9og5myx',
                interfaceName: '0rtrmz3uhbxnmt99n89hma707mxprv21zx6q1g3bza9cfcnx88crhqrdponi2okar5i6yf0uziah2zas9ihvd2kecvt90a0o1jz8dwv1ogim8zwpy6oles5ni5n7nf0mzgaja6wzjm65hliaql5b1pwe4yxid8up',
                interfaceNamespace: 'sysi90109awhudvbuv9a95n9g51cbq6hlhpi9oj4mos3rg5hprgcupl98ox86rss2n0wofl334oovx0mmb5ykknr0oou4haw4lr43zvwcl7j9wjvxfalaioeadq4bqsb0f9s0x0tfhfjzzsidyj7jzidp5urbyqn',
                iflowName: 'ub4v76a9qa8egrl0v205ykwiw1uxbx7kep0w58fpxo8a2txqjqw0rtfvf4zx5pnscjltitf23w95cn8zbsdin7etmidgoe5qlas9mjgm264dhgx5b0ury0n084t4f9wcvds3c8znbpcw79jt3azd9dbmd3ekd2ei',
                responsibleUserAccount: '4mcch6x7t8bls4h0ds7e',
                lastChangeUserAccount: 'wgknve8po6rr6cjywu78',
                lastChangedAt: '2020-07-27 21:02:05',
                folderPath: 'qubr0b027qub5x4mm33k67egy4xrm13s9hawfvame1lm1rxd649o87nvjkvsou12ornl5ovelqlx27lip0jtqhlq2ky9r1x46uk5e8y22a865wdms4o9aw3gbtnuqs3raffzj6s6695ahz9cph33vtelgubm1l70l6w2fp75mlviipply5etgc3p8vnr4455yz5np4kt5avezp2cfoh4x5kcde7bddwf2nuf4c07bc8c9vlgtxntaqo0hgrhww2',
                description: 'n03vtc6t47w4ruxsaobbjaay0u109ti929e3tluks6o68di3718wsd08ur5y3k99p50ckipcjngrym3kkahsih2f7j1hjya2px54ezc2sk6njjaots5lkc0fof096k62jmvlp07g4qibj6gmem243qztop0hhnffqorxrubic9xj1n6ftwf68iw58g1w3j007v643wwdi4yysig6ckgnv938ldhpfbwbk6tt8mq2xl49mkyzb1k7915aopwuilk',
                application: '8cegivza6k8339273bam1rccnxc6560qvfvslcfl4yphvi8bvh1zxrcyqiva',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'yxb0gd1f9hm9xc3a8g2l6nhafgkt10qzkavpf5nmdo2e6v4tx5',
                systemId: 'zp5cmw23aj32hjlxlmibgdvzb0dlnp2dyiltg',
                systemName: '8b3nbhfqyq0xs1rs28t9',
                version: 'thtru5qzfvfrktyj3z3z',
                scenario: 'vakcystdik44px53vzzyvswypx7fzh5xuurmg1ntli7vzwbr6goj3swpb4ag',
                party: 'agr48d35hprzpe0suz7cfwl5f6mmtuzi8b6g8mbc1islvs216fru8q2o2fdrd02edzbp8c1td62fjmk2iycyhpcazcocx741axhb6ayvvaq09zlg3f11gtm9ytfo9en5c5thruzpfa084b054qay91jjt7lgfdi3',
                component: 'odu5l24gz6us075awfzuo08lna1f6fpns03wphhe40cga6153ihhhk5yhtk6gzwpeiquzfl5yicpoe4akvyyj8pboywxfuwi3qn0ulur76q9p8chfxo1n7qx11iojolav0pbwk8a4noasi65q9pvdldikh83l95g',
                interfaceName: 'tr6da666thdc7taehnk1v6kid36wpp0qjx4gu0mzqncfqmd6jmdfa3j2y746ygxqueeakvahhr5ge540qh5hcy5jnfvjn9xhd6xh4owj50dydb8nqhqhfki8y134osnd99m3d0qsrbwopnruj2jgsnt6wvvb00hq',
                interfaceNamespace: 'vwvyd66gzw8tpjf34puit203025h5eh81ytziq2zezmj5a5b8ut2euivubjvich48yz6eb3ydh8a45gr7trcf0n3m82i7di81doosddra79e9wzk3nabmpjxbom9l7n691f32s7bkc8pwopa7rtuye7nt7mp4ycv',
                iflowName: '91zk5v9bkeg31o0p87ahqtrd3fnztmnvxgg4du1m56p344sp2ir6xluc4wfybaqsywwt22qku0xa599gpafskmnlgk1z22pzvfqoih3eemk3es8mwit3p6s8cttdt7hcoxw0x1srjjfxezig3m0m144x5bokysru',
                responsibleUserAccount: 'gq02j9rkzkgrdmqtd98e',
                lastChangeUserAccount: 'is3mhp1ub9fdisp63u4e',
                lastChangedAt: '2020-07-27 09:13:30',
                folderPath: '89ghjskov8p5f7b4j3kc9kccet1yc0y9sqcjitg4klhqbtmw6e0afikka3ohqwjhag7zqiqv0farzraxzh0803hc7k32d36wyqvoogbq5ifmv1pgfmpg77la367p836c81gd6poewtg3bhih7emmtr9j7b0qospi2yw1m5h3of0f9cb909ix0xm1d3j96m944stb39au9pzah07crl6cf1x8e7uwftd0zokkri7b9bg8o92t3ntdvc8c724hn8b',
                description: 'iv9kifyjytikxhetm88qf82jmeroskghg9h41su4vacl03r8wes7c1hhaqux3j6mlhmfryhm8tf4hkgzvur3xvupyh7lzhaeeu8hwvcuswjdofhaaz40lfxrzfot8ib4xi025q2n2auld7oaa0p9hsykzjhnedb05d835gh7l27m9r5t4v3dmx9k0gfqzgfdxj0b1md4mv16wgorh0qn2az6y2v4uza6nld3ovnwkiizo7465tbmztt6trcrmyu',
                application: 'iojpugpktcsc4a1h69f68wna2fey9vnajqgekag53jeymd6y9145l8ka9k5j',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'kfolgfhe9etonwuyh6bk9za22nmwfosrw95u5e3hc7byqvzb3q',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'nxjtzqu2bclu17s17jb6',
                version: 'cynva68vuctj7hlc8g68',
                scenario: '2ix98flgwwdg8kex43zyrovzuk0ea37oqvw4ddgln4ejpo1snkpn6os7w065',
                party: 'fjtxqpklblcpy6s9wi9ieae2ha93cejup3qrz6q4gm66jbm8x91226bmb6wp7ntgsmjp5wbqftm18mmq89fb4v1trtku4mywi3t5rs2il1d2mowm6njl13ocz47x1wa2p2rkaddr4kd57vtc3njo702yjqo4ea7k',
                component: 'zjln7eg190mu2yrbgfbd2hgvkx0kbr6ltrf81ipz74rqji54xattmks9zz01jsub06edwqylvi0bkc36ev2880w7zwrbc84r7q5iyslr91krwvodwbqiwlcinoiopiu0gs8kz3gpmjozyd55d7yhe7y9650z7doc',
                interfaceName: 'aeqqqufrajku4r32tna4q0w5nyuidu69drtot6rs52dyg0fdpi7babnitf8ker9bmpo2r4k5mkvqb2pmt0b7mp1efytr0rm4riezpe37uwurvyo678e7a86qwgyae16h2oezyp95f3sixm2iq2mwafuvwz4hv6ud',
                interfaceNamespace: 'z2ab2lvy32pd990geb9c2wmyd1cik31pqwijxk1kytmojf3ityid95aky2togjt14sa3iqbrt03bsbdf1pwc5ef6ugufsz4qol4lcu4m4d6s41r62lliuwdksfbk27w0kcks5ktjm77qmjljjjy0qykttk9ky2f8',
                iflowName: 'eshrnh0v4j1hwq4j27j0ivndf7s50rh8ls12eqgfgxm5nlllu4da61wntysvajuwpw3a1f90f0dy2s5jmn1ed2rm6elzm9ooevb4xdcgoiyniaf61k1gx0z9mlaxwlhlqhx6hnqk43o868zs99u4ma710v1dr2aw',
                responsibleUserAccount: 'p8s7vf4lbseo9lpxowuo',
                lastChangeUserAccount: 'gldaozofxv8vaivuatds',
                lastChangedAt: '2020-07-27 02:32:49',
                folderPath: '867ca2y2gbsg9yxl9o1jfn2rzay9vh1ckpid51ju0mk7cbhbudwux0mskm1i96lehw6d16wqaq42n9tu7cvb954d0u5vnyhc5u5y9on04sjyhrb67fr55q0rmjnklq5helturqh1jwrbkqgvwtrkaj4yg7knfyqhmac24dydsz2pz85j66rlvaqsry9vmzek5m17eabe2s8snkxadb07273xzvz03xfotez3jt85rb9f6yw6aa37xv1jfk4okms',
                description: 'ayeci9diyp7y0ne3k10azno8zmhwipem7y1yy2mbpqx95p4ifx9pc47j14l2k4fylkrstbbfzfbt0ox9zyipa3eu5mhtd0y3kqgb37tr2r4j0u1egfn9y6m5laxnfqrxdavh86gb99v2dzhy1wi1qmp5k1u09li7vwd5co3wt05723dvxkp3yobkwodo4pos1qvlbwobo8jiut4pqxd4qf54e0eeugzdqn4uk8gtmteuyew8dxgugyusow3hp3i',
                application: 'vqlccwgp5rqhwklryjygie9oluj0u797javhyvquj86pya49xxqzkaes3lo7',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'zb1239qlxdogqn7tv4t69wn31shucwxkezo5p',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'pqlgjdnrwb7p41kjain8qrnjiiqiglhs94kefcrqbwko51f470g',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'ewafagy3uo5wadsdnyj9',
                version: 'jjasiucey7bbodaf611n',
                scenario: 'l68fpjx0x4drflo98lro3xwm4nuef5jzkr3taw83l9o1d4nuzppccfdiblj5',
                party: 'ms2vbmrflhssxho8j0j2y8n8jsx2lt15xwdrwq8u8gyr0pe1hzxxd1w62dmghz125254wvm5fuq4szcp4qnn46jm4d5zsxuhwzhmb9zs2xjsg48ya284ye313dac7maa2x77l7c0m08hf73weavn5ssabp2b1b0p',
                component: '5ruoqimgbpb4kjqkljvwynza971b1g57umcad789d85unwkb8l3lmndpsj8upsmh0wfh7104a84snxjvc3xna7bjg9b5f84fyrkhmwzvfedoxxag5rl6iigrtau9ecu9yvfzxain53u4k9w2s1t4inxvwa8jcwvz',
                interfaceName: 'fddoki3u7kebs5qwkce6b6qbdojcuu2agfx6xskf8k8oeirczattugrqin1rit3vhudvj5hbvqn4o7pf16v3dhzsvqxqmkvwc6o1oargqwz8i6zxbynpj61u6c3f7sabd7uyhd6r9n181prr4w3g58566la08vjr',
                interfaceNamespace: 'klgp1yj79epainbx3y4amgr87sec1zgkqri9ptc52jcthbdd46w916qrc1bfr0zqaoorz34by86l2p1f4sf1xc5hgutz1sr7uuq6xbp51bcg7q8350ok607zkmt2yefmwyuthvqbhmj6u6gbkhimf32vonh8vyw1',
                iflowName: '2khwz9ocg20ofa1mxwo2jgowv1dkwm8y7vetvtjogi45gg873649axahrsa4o45kfe4idvkq64m3eg4vbzi3cekt20ssdhreqticxy7yl4gl8gj9pph4587m0j0u22deedggryqtim8ghbjc9xh4nick43ambqbw',
                responsibleUserAccount: '09spsywzk960ed0blf7h',
                lastChangeUserAccount: 'ar7jh85oit6z5ztwz534',
                lastChangedAt: '2020-07-27 18:02:31',
                folderPath: 'p422ng19pspba50v6ln0mcl4lf5d42c1bh99ll47j6strbht0c4fj7ooudja46s2sup0fnkrbrzw9tz7bd1wglkmvu7xgjtq8rn2r9qs5yhzvpi4mjg62phcnll6ixjohkjqq2ikdu4swame8hs63gm82x8jc5o3dr4szhpdu0yb7dh2qvgop4quf95qm1skgrgd294sjyv17nkjp067qycmxtisplv2eg6f5pyowm6qie3eelcs3kwem9aat7g',
                description: '91ppc34m8fkabwath6l7wtyg6itlkvbt5nksutwxqsu8nrr6djmjxsndweywhgi1w3eenji77jch9zqqpm1ka5mw4eg9yq7j02pmkommnbt89f107r5z5fwawwhb6ghxk7cajamfib1yunsqsq3qxt3aka7rry6bs38qxjawhcvg3kx92xhiohyvd6yp0cik75r0qhbwzw2hyclxzeenma6jurssq4gj9l5pu0573wegqrxcfo3s6n5q84318j8',
                application: 'uydbmpux7zuy25fe693qcip9b55xathkcke7ccjnypf8f1r0qr4z6lc9lnc0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'zpdue6zkmmstyusahusq62h8ssd5uqhmhdvcrrzrse0g7zh1ri',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'cpyu2abl1tmmb59rz9xru',
                version: '5gaggqm7xftog9ntnxna',
                scenario: 'hlzm62nrkvyg59gjgg1x56ra5m9ve3wyqgtl76sggnvu2arlt5zpxtcff5hy',
                party: 'dgn5l6vj662krtk60i2jqlt10um79s4sqsjkj9kh6q21a5b52khqac267vadizkifnfqo4llsii06xzt69pwyqbmqozs654ont19latmaga9lpsd9mxy2n4dgvkaht2l2e5c562frtfvqiyugnxakqqjdoxaxhkr',
                component: 'e570xifotas6ebcltexd5wrs9vh1399p0yqtfeag20v2kl2vsfifybf6nnczkv908c4m9piiir3x24duenvolwrxhs7omvt1n2tm4qioe4nmk5iptc2ll2ydky5p2gmtxo1j9k8ngjbfk4hihs9tl6xln15dgexj',
                interfaceName: '6plarlvpybx4tbf0bd6dz9s3q75lw12srty4kstrrnrigqyoge4bfbxde7l75vql1n7d8e6uvgeqf53ad4l4xjcadaf9g9qigulu1lvyvxaovsuqqc44w4wavyuisghzc2t2ljd4z9627wo65v9woxr4p2ps8c4b',
                interfaceNamespace: 'cah5kbwgp7bgafbhb3zztlas5509hfeq4x2oq3ws1s79k12epwnlwwpjy2pge9nreulxea9zm0jvii4w4di2m1gyhj9ei8ti10dvdjq5bzawry68fuevgezl57au17wxppl42lc7hpjl3ysqigfwtg64fbl9uq4c',
                iflowName: 'tz3fddtoxtbo8izxdlidsnkxuvgzhzabpeoq9jcjqit427sgh4bqvck1362jjwxt7bjegz1v2s770gadulbrxy8rxyyer9hvpjb6nt00cjgjd3jbcwl6evqewactvl1jhmy69flybk4m5p9en5dxcd92zdvnjdiw',
                responsibleUserAccount: 'soxior1tx3fjyiu31is5',
                lastChangeUserAccount: 'jupudctgd4rq3r4wlmtp',
                lastChangedAt: '2020-07-27 19:10:53',
                folderPath: 'l5qd8k5c95wmn1ksxrhdfd587yh686nvwpwhdvyzzsn2cqfvh3ealbvclghu1abe6amolz2vkpj4puyt0wdsc109akme19ik6ho4zm4nk0ii98ejjkqfta95hsymcop45ss614q6nczs3mdlbi8kzw0ovj1iasy3ijk5xue2h8uwod75pusv0wtzfsnf85t25c223du846cey1ybzfbg440oh9dcxkmkzbsuvzykaopmfki94gpk4devslhksww',
                description: 'lnr8aqe4ic1o7cuspf9nv3hh3wfn3raq96ujctrhpfdlvipkmw91qk3w8tz1izi3t48f4nqtqebz49s1wxe7cr6tdpbintfjbz1nv8fbd6x0blodf1e2f5mtukkr4fiqlwx6qrkepyjhjq5yh4av2eyhmlo04355q5lq4y6v60fhv9ajzjdp7wyyqyb46rpleetgq8bt4y3r1q48al6yw7d1uyjp0ecxzvchx2h78bzauoblnju9zye0z7o0wvo',
                application: '1lyqd4oigxcqe552dwss6xzlarq5j9pqmq7d0o3xgzdg72q0av12pz0a3z0t',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'gikxbgju4otg88vufnsqlc7q5ne66hr296rxbswwdreqswh6cl',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'r88fvi4rwvk6c2j1krmu',
                version: 'paiyhhr6iamg47zbtengf',
                scenario: 'zvszxxak7s3neexlqszoob9umpg2k84fa6y6xu55ha3ca75v4hc75xkipbjf',
                party: 'x9py15wbm3vzp570b92gq67fwylvxt74257bbetyj0ndi9cnytfiiq5egb67rmap8ymhyd9x1m5oxecysnaycely6v8xkk6fokigml3bw6gowma0h8c8wjnopc9bf9duec4kqkgfiht6azinwqh4qyjwyaqvm13z',
                component: 'b3xnqoo10w5d0n2k7ijyi6ibgdcxjhnmda84wi9oicl40l29a7arzynk4b9j0mi1mzu5t5duf38xdaz14opoho7d4cayhoikrltc12uixe7qfjr8rhca7cfcxizq2ucyu48keehizkwkf165ch3rf7tud22lmuzp',
                interfaceName: 'ikft81vr5pf3h24dpv7wnzkb425lir24cbj33xdfou80qpznh8fyua1d5e5ftm9i4i3cubqpl6l23863dyom03qyuknvyat2xysmu9axkmvpf1lpayuf3hu1zy45f01coio0i4vynd0nxo7hcb1b5whuqhte0c02',
                interfaceNamespace: 'wj8pfqp3n9bpva745v5e5hvglc4bq3en4me17owqbmuqw8q7xsrxf2ev7ijuk6g9phsof7d41a8mb435rcpnef8lw0lmcblxpa2lu2uuplyq65zgjikyg94a9jdb9rnkvhn19eq3oto1y54xrfbpwu7tokwz7qvt',
                iflowName: '90woaa09fhoymm45fb17hfibubntj74tphdsg4g7kof5squpmsyygkndmozly3fk5tfb96xkoz651d3cp55p609niw0n6ymohgbwmlbk7hwh23wcdudlhn7e8pnuv6ahldnlgfz5rjx7fztycc6lb82t7ea3a00k',
                responsibleUserAccount: 'u4yx010q3ax0s62o0ikj',
                lastChangeUserAccount: '63cktc5pegxz2bpy059n',
                lastChangedAt: '2020-07-27 11:10:37',
                folderPath: '7fu0uxhxxz4tvaq8mrjep82w682mjho79cpoqu9q4df5v5he5m7eh42kuy5473p3xa7f4wk65mjrmqq7wjlrnej90rg2cz3c6v1n1bph7g955039153daa9w796axjtoscfxlepbr8hpgiz8e20iwog6xxdgc2hu74lgnr9znaromz1tvlqwpup9ro60xxf1kblqdmwxwgp07j7skj3jzvgcmfbuwdn98272k997n13i3krjtasp1jttur33a3l',
                description: 'kdo45l2iyo2dalgcmmxlhpbs2ux3pstbpqhzl8918vhi4bnuh0mmyi7f4fsd5nt30te410hyda63d4zq83f4ws045xu1jj6mb67u1hcb0n9d8hj2kqzpswec5q1i8cwpaksexqhzsxfvhyzcsgedxs751gkyfhfgie7op8nb9kxrzrtk00halfxlo243vvoq6w9dsz0qk6sk1w15dx0wpow06sogs7wy00703sfvgbzoy1ikwqhbzm557k5qr3y',
                application: '3kozjzobweaz6614q9swv6b9cu41qm3tku8mqju70q7hjb9uz5pt4l2fhx6e',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'g98mvtkgub1pt1uxe1gimqtyblj75aj2ysu6t7tjjjrtf4alg6',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '85x5z6fi37sazzgvaq1m',
                version: 'sap0qeyomg0z3i52ei1y',
                scenario: 'rqf36rjtnxb634x6mll1tq5y2cnywfwpnli7u1qf0ppnmpxhn2p0vvyobf9du',
                party: 'jexc8jzg4qhiw6n83ah0857uzpbqtsxcoj83owlvz650xqx7gn7m7l9gmaah1c6wk9yzfsx311nujhfbv4k4yergwcw3jgsho4wsl0dgjxirgkes7ztg3c9yipc6nzkm5o4zvkffz9pzotlw8yvth3s11tunhs9s',
                component: '4hv8bdgz8prag928zet70vyfq0p5h09rlia3t80bu8dxta8hpnt81cpdxon6w1ou4vgxv3ognawkl3atzyc0fkqsumxzehthoe4ha4oj2135sk32ymabw94obz15qe1uhqfzvfp4zaozh6afhqdlv8banoh2pnuu',
                interfaceName: 'pp6lnbof4l020uyyw980ntur2zab6mmboqrt0ni9c320iztjpkm8xizm5gd7g7twkeea36lj01077zcshokof3hqov0xfx5w0jl7nhc2bqqnye0hq1sw82e7scvncpbyy9rq96n8ncnwta541rbzyxuamwyj6arl',
                interfaceNamespace: 'gqkam3m0rdcstkbpozzfk7v8cgd64bzlederk9tmjuf002gj4bwk9a2emlc7k4ly11clte6k3l2rb4iqj47b9uf6qmih14z6tp539lmmfb0axwmnwe3jyhaltmeklixzbgc7tbjuy5vdcrbskra7xnraph0b77uw',
                iflowName: 'd11o6ce0kkoylzshvjhj2g0870f3bxivp5b8bd8891fwy7zpvus9nxbq6x39gktlyk0alg4kladoy4wxjgv759lyk34bshpz6jwp6xu7zj9s1kst3ndrhzdeyea4fvsmksvl556z84yv02p3724m1dp5rzdesxu0',
                responsibleUserAccount: '4att00lgsggnjsiyksrd',
                lastChangeUserAccount: 'w99fcfz6x8ntlt3zy3as',
                lastChangedAt: '2020-07-27 23:47:54',
                folderPath: 'jgumhjsplzgcgrtbz7mxzgej1oykh1l56jpqmnjb69ztaez7jachlpz4oplveyn921v5elt16jezca79hnvz7yspyrwl86songqvrbbgwmj9mqi0qm7tdvfo3ban6cbvgnus4zrbjgjryub2uoowb4wwvxo8ka9dpxozzudfrg3w8q199bziy4j19jxmpl1e0ri5hutb0ikahaor65da0uh3w9uvm5ss91sn493n43zekd5gc8t0ysen3t6j0wj',
                description: 'cw75cg2lq7en6fhw0592cpbpw7bxuub7y6218i99es1l2bs7js5yq0pyg72aa8oj3j9ib3hryin32a9vnv7eq161axjsl41i8kc2esc7nj7wc1jcf29ucqaejx0ra5rwdcwy7eq3k1gl5rtes4hlux3r7bxofbf6s49vvgeq3esu16d76w76qos5pjijkr5l15vq34jesmvrgaikux9vcs5t5vrdxw31zj6r66sd1mqw2zxa6zvxcgtjoqqxmsb',
                application: 'n2rf9lbankhbhjfked475hswp43jswysbjkpslk0y59c3h24yd5qxskwceio',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'ys99v6mdx3eo5eb3v5fl60fe4pq4bphhfy1fuibmnrvqqgc67y',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'k9spuvnyihdjt9aj8c8d',
                version: 'tuyqtzlaryxpc3f59w0i',
                scenario: 'y9mqqxhl7wo5osw2gu50chugb84k8cm1yt7xkee1j9hziersufp0u3irof6a',
                party: 'lqh6uwo6w7gcaprdl2npn3i0l4paudg0so8wf2b43m18tvvvmg8wa9mjucss2v4ey2nrw7401uyfh6mfl3xosi97hoa1r1dkx3kyqrzinsl8ssxdqhztsja6b2m0h5qc1ks86gtioclhrhd6ov126qj60ppobhhhv',
                component: 'u1fgyjkhtjb28n9oxx548sb2qd2vuim23dh38im2n96cka7ggjudetwrqp5dna80tmhp6gwegytoz6f38ufl4zbxxrd8wf1w1kqefgsr3qh6hav6jkov7b7kkvbb0tjy1tt64iwleqecjz70ygspnu7cqlbi0ff1',
                interfaceName: 'yvgd4yh7k76vamher76v0q4tl274ppfas8uakxeef8yhy1yl1j3vbdpkk7tvqe2y934yat5rdajy0ochirlevntl2ph162yeu6zkdb9yt2jktyzapv18m8s8cv43b3r7840ydgkk6g01sk9sag0y21ihrn36kqqe',
                interfaceNamespace: 'jy4df5yeeolbkywqspc4l7k62j7wipbh378i4e39qrpxc1080d3ra3tb5lj00hlnh52vk836mthv5x3df32ej5og5yzws1ctfsblu47bagvjxjymmz4aljpiisbfagerot41haoaicer2c5deszmu1tghvag0k5d',
                iflowName: 'dhkpt2556uort89lvyfiq4gkg32jhl8v0tkj974uig8ryxvmhqe8rwmdmdg9taq5qumzmn4ib20ppvsai1cljsbq4gk9q3l8rolqnf2agjzv0lqsqtkyk7k5l4jarug60rsqivik2pdi6kgt7tz4dcql3t6kxcae',
                responsibleUserAccount: 'zvh0ev05fxibbbpe6czf',
                lastChangeUserAccount: 'flsrii7uqg1q41qo7x27',
                lastChangedAt: '2020-07-27 19:36:07',
                folderPath: 'e6sg485e6pcnz7rk71a1c164vahfz44ip1tex8mwkxabz30wczl23p3ibn0px3swdunprcj8jkjuabrhdngqlqcb52d8und2tbawlneyi7vcz3fwxsx8u9uo1gm36hgzmhr5pt3pelv550rqouk2tiw2ide77omb2vz9fr1ttoos7ks38025nfvfi8f9brytg5ejz1xiumnvnm7d1e886zzj17cx8s16f2fjtcn40dr0qvs1uex9osd02n2zpkc',
                description: 'fkqzpbp7tvdm3m3ns5y1byc9ai1mg3wg923hr1or9wmap0lqnr7b9xqnbzka6u5gv3cal3lzjqqpq3pwhharaperp3os3tt04tuwrgmapnghw678z7dngore8v7okpyva1iv52ruq00b7mawkxtyigdvj5f7fgtwdl5aqy9wv0rav8f27zqnrv5yugd95fwhopndctuk7l4e1tl4ea3cykjug3ccgp656v9orow4cf8hvzy4shmew0uimydxwju',
                application: 'u7jfnotqcdtalxsfu00uwurs3fp7awm1w9w00y5ricyupmbpk3ocuppc8fdd',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'g9wbbt4womy9zux6ddtr5vwao978uglw2k8bgz3a83a6xwvnaz',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '841fop6l9dt6zg4ylvsi',
                version: 'nfxmcz6qxji422fhfn12',
                scenario: 'a4tgu65w58jwjqytujz51lcnnge7f0xrbf652mg8a9lknefyzswqln7uw1ae',
                party: 't2ixyo02rgcz9zv33mccpyiz2k0jr5m1nv2txi8msyit8lfsth4rjicpvx6gr2kgbsdn72lmx68amje46padiq9wtihaaycgds8o698qqywtteunlex9134uy59n98k9m3kplj7bcfs1efzvgso9vreofu5n241j',
                component: 'ux3iei207mfcyhrim0436c4l6706kh3wdeuii6fafabexpgjkxzt2p1l63gj7pxm6wjxbeb8snmzz0ib2gbyk4x1t6555fjefbg4aynwyhbspw0uq0ia4tkyf7r5ubyq5v84n69tieicrumrho09z26osudfd6fj9',
                interfaceName: 'gcomghkh4otarjhiww417pda9roh27rknfnjbfy8dbd8zkwzuwqndhuakf944skeqy1wcfti4w6eei03snwc6gedack01kakt06zmjjkryh0qzmmn02ijb0i01s47xmxqvv5mwj093wfjxozurfquywjq95oo66w',
                interfaceNamespace: '94s1407oct6z06wd08g5l6sn3psw09m1knn1h8byoydwaa663pp0nawp0158dyylqz7xlixres05ldnyn9n5jztl9hlngvpqqc5gpa590taxjyxevbgfcfggiq76krh1wpxbzkjt1arj8c4phjage8bn7j5v5b7d',
                iflowName: 'j57q1krzx56t64lgwr0u3lfdwou93dh0i04wrxts5zwve0thn6bes8cfmzqz46zj4a1yyfh8mxgsb4u16vfxsiluykm37bymzoz78f52xqx2qgxg00a0wbzs3iqmbqas7c56rr5upybfgla0t7cbbo8v3xer84jv',
                responsibleUserAccount: 'kelfb5omxs2yyd51gyb0',
                lastChangeUserAccount: '7kxbd44pw5wgtemz6cus',
                lastChangedAt: '2020-07-28 00:35:23',
                folderPath: 'cryc5ih7hvw8rjsst2obmu3s4oftwtupcfs32o4dmwjprif28qowjjtohecpd6x3kofgm6l6dteq2xablfd2rqave2eid5o2ldsxi5y89r9phslgtvumbjoyhubqos00t33r5e132h91ovus0bo1mt7prhhivdtnss3wl1bq97k8d62lhq5bg75q0fjh7bwh2n3b38y8qgqi3sbprzm6ja8879rmaqedz0abn1fa98x2uohd2egptrqvuo0rboq',
                description: 's5830x09aag7wmahxugpgvyfhxadvn7h9weh3oqel8yu73iiilrv9svmerp0wsc3vehatopojccvrdmnrkl9tcnz8x7r9e2i98cg6waktv6kq3gddwoqev7kvg3bfdpqdqpsowippjuku2c6kjar5968lgbe6ajioikrk8edpluyr1vfkm8w37ap2v2u37db29bcs21idda6une7vru6s7ddpbk0i6yrgnq629yimaaxj5krjw4af2hs3wa0iya',
                application: 'icr94fo860p4pd7773qk4ccm9jcw588m8bqqtdxe2sxoqz5mgimjjzz05i4f',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'klg34kozcgex9f3uavcygjcx3clysh5zeh9k950l03c0q0exkd',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'p3q6qp7tme9p23e8wfts',
                version: '6mnjx6mdkje0nnlj7unf',
                scenario: '7t3ns3fixwxo1cfqjczhidnd1kqr0yh7sigwawj4nhw4xp1znt1jp2o8imz8',
                party: 'rom816wba6h8ebmgz7dcv24n5c3jw8x24i7b8i6pybtopdo8c4jvlgcm97amdkjvdz0q2x8zv5gcghf8l23wys7ruvj5n5mqwxdvgeztba1lyemhz2kflqw10yslqestzfyw4ytf3zipbyw1j0ryg8sxh9ffkza6',
                component: 's4vms9pjkm4dnbrt4cyckmvapcj0otiiy44w7zbttix8xvt22vey5cxl94g1dy42jdszy4vj68gkixcfkyylhsl9yt3jb50k8pt9f0nsgsh6ik3jzl1stpbu5gzya3n7ge3o9vbr5g7rbr3jkh5vglnry25s085c',
                interfaceName: 'ojqkqamhc3jzzc5v9mlpgjctg3lzm79lewl37a8h26mqwn4sdza4n3091l0pbducfawfcekc5vg800wrl0lxzaop3s6m1t7su7o6fb7n5hbo68c9a5p5rxet125rl1lkzwgxr5k6x2a977kbjosswtk9cqzz9t8ng',
                interfaceNamespace: 'caf31eozt792i0w0zbyl5upzqdwgkiee1ylix6tkw0dcwa8624jw5k167tyeq6sdbdsgthqduri2omgwwhqg2q89u139vp54ba1xvt2oooukzguz447kft4it7v35obqr6f722nfk7qhssy69x8gnlzq1l6jbt9y',
                iflowName: 's2m582eg70e9khhtxqshqgnmytoa8914mu95t7rrtx4l1pnwynsamnabu0aqkkdf7t5t2wvvp57wnsbaz1e2km1anvx38zjk22y85ofdc7fgbku0c6c2695dzoa2ms2np512xqxunuujgfxpn8e2n9q2w271s4qy',
                responsibleUserAccount: 'xxunlomroe2lzg2a3v3z',
                lastChangeUserAccount: 'j2x88gl5z3wd0pgu820n',
                lastChangedAt: '2020-07-27 13:17:21',
                folderPath: 'ethp7j0y5qgnrvbaz6p64amyhfg5mk3x8oyqvzktsdxadt8ap04g4ch9r0k9a2zqfysoq2pcijvm6p182mob2ysd22tm803jonz7qjjmbzv5tqnsmqonszrugp2fv3162j7yzkfju0scr7tc78fw5gh9t7egfhc1qpvxsa1f789757skx4cjkn8gpueoehgc87uagk9oaipowtwdor6j4ldoecop1eyjc5b1r9jgte3xdaamqt0fwy92f620qrf',
                description: 'i2atyzbavim3qtkao6v7zqidd0ola6rq7vc3mchj46xd6fb8cn8up91qkm1ia8hsxnsoe37lr6tmddzo3vl8chy8xz6it7h8z29nwk98w2yrpvw7waeasckmc5r9x2k0qhn7itgtl72b7lx1j99jaiqoralz7m07qz2pulj6ln6w32zxjzrc245e0b35sj0na9s6xix93sgj8vtbw7b495j56pereih575y68ggroep0bgrie8zld0tiny4x5b5',
                application: '23q70sz91ow3ipnfokm957f35suwaqkocpnq2nbzq3cio2d31uifqrnox3oc',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '6dz80p7y9xkrben7dablctmaorcg9kclopmryicw5ncd4i4zx1',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'kkga9pgsevnqbw9dlbr6',
                version: 'hniqoymcp1ndi6h4e60q',
                scenario: '7b7f3kqdg0gk18fd3zteqdftj9v9nk5xgzfcbu46qt58ju3w0q5rrooq0yc6',
                party: 'a9k29qw4am20wrwqh8pfsfaeb7alvydtx7ydvkh4f2lg8qdymy0b4do9m5gzez89zqq0kl00vtj636sf2aek4sezbtsmg38bfsfz37a9cbn3iymciznr3tw3vhbu742bwsmexom8vz38wyq7xux9o7x5tgde7o9b',
                component: 'unwxo9z999mxwjdkdpubr1388afx7ls0evjtun04r9pf921esrdh9nmet54hbsznidfoi1taahbdvaui6ta45c1rcgy9fo6yp15hxzaq3ivgd8qnukhlly40k92rc0lmyx7rknnftxoh4hjnxp86h0y116ifismp',
                interfaceName: 'uraqws3764ezz9hciclpulb97ncpz360bdxc3mv66hufkh2m236q12he3gm7hdjbzg4e3vimp13is7xdy2tey56rsd66qmu6bg4wo3dy9cw5rxs6d9wg46jcugl15v3gkxwqdh8iuh3vw4xu23lr3bl8213x2xw4',
                interfaceNamespace: 'ibcgm5rfbghr8aylh3tgu15puxj8ip9qq9zai8ae5hugk0szfg7wwuk7o3cvkaxyhhrvrfchtztr7m9zf0hh1y2i61y499hxvd5o02e7y9qvh79qefau7uyo6evlhhj6w4gd80516w6tgsqvmc88541sce5ds7axv',
                iflowName: '7lqiukr5pp7y71zn273aw2qv8tik4wb71w74jqdqhq4koaj90e5pfr0vaxton6rfhia03ph9fqd4lrbhk8qboizgewgux9pgaed6839v1lfydkxgho5duoppnmtrihlb0iy8aht38g0t9dp9rf1206heqjwsrneg',
                responsibleUserAccount: 'kka4jxlsv7pknufinrhg',
                lastChangeUserAccount: '40ibi6kzjttmsmgj2b6o',
                lastChangedAt: '2020-07-27 15:23:50',
                folderPath: 'x99qp0hqo3fdkpyd1wk5giyry9trszuo5ptx5132v20ldimyjdkz5ub3sg8i3nv24u1doxow425dwp8zrmwiiktw32w7erb4eyndp3pk2zddbnx7did0e4el3s94nzikwmi6pofk22kpksacklmf11ds01m66dhvkzcr7x24sc5deeekrqcrfx17l13u50367p1tm35k01f7099hv2cczndqe903ejcm5sp7jtc7d69tq8xhut2ea6b4jvfte64',
                description: 'a7okozs8jlvnza8sqw16l9a2bnip68yy2fu0c3stmxbqwdy8skoe1q5xb3bmo6l3kil12ttr91blwpfavrbzidlod0o8m166jvl7dpmw58d4nmwu6j6onfkuxc7ievphhefavy2hfjb3c7m8k1f08uhaiamzrj98nn89rmad6i3q2m6fjwv0jx7pfzbzik6h0up145eynht2harn2imn9zz9bnujz2vr4qbksu2fdkvuf7ah4kxe19r672frl18',
                application: '0fxld2sorfmv9m9hbo427tpprs2d0a27sndu74buuxwmmju22whinasuvoe5',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'ymzk2b2pjocv61nnpugi62z7bxjblqu55rlopvaoa99ssu0he9',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'zssf1akdp7i2v09hti4y',
                version: '98z7l0agywyi8pflnlga',
                scenario: 'ez0w0qhdouz9ytieql07ecxcdlcnzggyaxigmqxzddvibwzvl496y9srdclg',
                party: 'dx9y6on8s9moknfvic46ep7k6droc6va1j4upwxjzj1az0hvon7z4pjpm2pwof36q3l0xkmbi27x0elwswt86hlh7f2ga99g3j6cbs5nou2vzd3xs89p246xuin5l92hbmb8ahk6twjnj7vtqxq7qw0gthxb6zs9',
                component: 'hhhwrtc36iesg9judnkxs5ohbkwgvkijgwjbbcyni8yn1h7nipgihk09id3lpocqvpxhw0l246ovniywfiktxloecqr12chtjnb4810qtxq2j0rfazvxnsz168gmo1iohe7emqsgfaw8xm4547s5soge6b37h5ku',
                interfaceName: 'yago17gu5tkjsrz7ogcis43eoad9fc7vtnowl6sfu0u669603gdt4qm42bfov1ydqooxuuh2oa8ubrfgyv3fj22aohnxxfrs0vcjl4cfwg1nk2uorznmggoc6syh07y7g2thswosg9lq3hy3ooaibjvxrpsl69v5',
                interfaceNamespace: 'c0qrpmpo1p0q35mkqoyzkozoavtx6prv8uulavbkp225t6msw29j0esdnnwkutr4uxakueiv7onwnry6i6ql8nprnnbu6rb4phd6p72xne14xdrqjbbp13xqn994tag14fg4b1z67thfsal10imnildshuma9yuu',
                iflowName: '7qiynx4wgdn8ev91q30mrluumb9s6at003trh7yefnnsttchztsg3la00pcvwgqku1j8wg8rac3vkp6izimwh37ecydqgzzi94vl038mx9o3za7tl1bpgbc89yba06wjnxgwfdkseuj6pqdu8jxa6vvnkwx4w5p5b',
                responsibleUserAccount: '8ntkzu1xssi5vmqm7ina',
                lastChangeUserAccount: 'wszmg93ew8in0pj4zo32',
                lastChangedAt: '2020-07-27 13:59:23',
                folderPath: 'xvmnkr5jy4qiqeow0to60n70otbulujc9hp1tv2xvlugj3ypn9idkejejvxqie537nfkcfw6tdvw3lcfjf56lropr857o63g2y24apjbice9hyw013s7j11ujjy9fg9fv7isurrymerzbp36tin969evc1y04vt6ptqk36yrnsntkw5eu29hpbc3g39xyrwlxq3z40yr8y3dmrmmd11d3c0k71h1wxaz7hfsxe7372lv82wk3eoz4675fpa9fkp',
                description: '9hni93czpykqen2f7ecqrj3qeoibfl03h6it5c0ls3jgzbzhi5prconw8l5t2ptht31fdgvlpheg0iklv2ewfzcr9d0t7thg5vsnpm211uanheimx5u46489w7cu0807b38v482q8mwsk2cxddeb0ilvctuoh0obj9o796p7rn719ow3jrt2xlof74ab74mix4z4t5bmivcs7htrmkgvem1tr4b8oc37ghqvpevzoyqif1lmq9taa5iu77b1feb',
                application: 'uj0duruvus3ecjz91dqofau88hn5i13hpk1z1rh45ar1ockhooroxmwwwk0v',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'cctxa3rl0azay8or920wx1weklport0l52hkqjw8aflxgytsqs',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '250rhj1wocd3u013rr6f',
                version: 'mh7lmzw1mwnevcsjwdsq',
                scenario: 'cvcr938dm52ouq7eb5ly360cknuny6uivqmmrqk5n5m9ulzvr2qoad26hgv5',
                party: 'pg5dvx836ts9rj4z87lo2rz7r0e7yxx6bllc6nfym737heema9sish3i030h3idwt35f3cb029qdjr4k2ji5u0gaeg6f7ffizbwdke8x01vjom5860hjs873s1x3zoxyw3hd0kecuc9l8tx74mi62qfuekybg1ze',
                component: '4r5flv7hjo02gt9ppd9up7bmzcahswupxwoc3zzfpqsk8mtmbx9gmxoxsdwuoaya6byws35fao7iuo34c4nc61xm5h1shv8x7m3fylrbvf80nu5nkue3x858vwm5m6whkplvmbh3m6lysc40o47fkzi0yf8ltsxm',
                interfaceName: '22epbec7rfby6vj6d3ulwdbu5int12mg7717wf8a6wzbbppfy1pyfrr4zul0k2fzthvqmrzbv42ph26mik4dnd98ttf8floezgwmuk2v7qymfcswe7guavbcryppxxkd66x6unopa4i1p3s1x1th8xjbro698may',
                interfaceNamespace: 'kuqa4wqp4b2yh6jq9fnywf7k9ptp2hu4o2x8ja2nr336xa3i28j16n0pcqe7uujbklzslftp05dxoovanp32selwh0zvx8jlen7gekhidmopc1qx8tbgg4z5fuhfjtsdvh5fq3ethxf9npc683smgcqrcqub6elx',
                iflowName: '1842vnhdktjin1uyaln0ja0x1revros2mz2nnjvejz8wdc865ejkp53zacnq5iiqdzisev1f6j5vh8x295bkom8n4kwrbdrdc1m8on45i2k1lm8yb9qlsggbc6wnsc3g3302isa8c5hujx8ny3bykgxyzk9sw9hd',
                responsibleUserAccount: 't5t811hl6pbz1kie0j4hq',
                lastChangeUserAccount: '3jyhol60oxeorqe0g3yd',
                lastChangedAt: '2020-07-27 05:23:39',
                folderPath: 'p0er1movyoswo1m73z1j8wybhj77k759294a0urjetjlpznbeqokneau3wu4x5gmxq20vostyrpitfbawacw85z2fg323h5kqk7fyksi8wmpaur5smbydx0xp9r9xldtnddtt8irhsfz6ggnshq0na4xmz90oifh52rgasyv4dmvggx3v1gv674hoyl3ftu82cwzp9p62goic6sse3hou24r2x3pqlom4fj16u194m59hguutiz0o75h699rtvk',
                description: 'jqc3lir514ms7xhjr5zv0o8t9w1ph607a1qpmqgvd0226m9pzy4umsqdfyhfo928ef40l2493sbz52nb0jl4ao1v9l48x3ic8bk8uxei7dhjy3fmhdfgeu0hq575iwnr08rkfm42rwtvjfg1gmn62ha6g38dqfkfviqbxcrp4r4z42wfausm6i40kljja9if4q5v7u57gxx765g7y8kf31m21rqrloylbxiyxk2pq5d34mkxuv9d0y3aerxcynn',
                application: '888gqa4gut6z6ixx4dfgoegdt90qjybc4sssdwrikx69vbjb0nd8yl3jl2iv',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'vjaa23ivcqls5w9ahsv2jqsavm1u053ci6x4iguvaoepo2zm56',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'jjua46xgu9yesyde7r1u',
                version: 'p4hffivnnh5qkbml45u9',
                scenario: 'hczk5nqon2o5rwb6mk2mgk40xjjb1sw9qrgs42lixuy1pfb6us2rhjrdcwxx',
                party: 'vv8vvikuoowfc8fhrvby4u8a7whmbpwk899dycp0ytlkiyqrojifzyw9l2rqorzg1124thonr9vzf6xk43lk72m2omzh39x5udd7o9vegsp9algx81cokwn0va2luwu398id5dnwj2sywxahb0ctuqor4p86f8bp',
                component: 'zgwh8ouwo8rsu6fhr1wescj9le1bs3ungr435lgeuliu906rby5cwn4a1wt4pt8aknrx5tej3bti74c9hpvhrh8c6hlgr7v5ntv7hk3j2kzi6t8jjt63ux00oez5wszrac9vqt9jpwefdw208k06ii4o350rpsia',
                interfaceName: 'yip6vsmkni5mlsio5er7wo59nw52uk5kyx5tlxhimh9bs36qo0xf7cgwgqhe65wndtqh49ja7pmcuqphq62qevi80dqo41yrrkp7dgzknoxmoqfzknttg0erkmyftu66hgqghc8ccv6wj9wz11yjfmxrrkoo5b0r',
                interfaceNamespace: 'l0ymu18p3cqrm4xedhb0lpde8ksap60fz8rfze0h1apaxvnb844uymg39gfowxu8j55iyg0etxei2vzfkniqvqngdup1y2d9olzeqhgzajui9gdeuanwt427s82b56l5ypke4gc066i2s8jd6rtmbs2s64ix52d6',
                iflowName: 'hsdxgvxzlwdmx2iy67zr3ugnfr1railva4gnm9i55jif3a4adfofelmif8vd6tzhvyjae85rx8u10uovc1kb64bg2d4832vcr0ykqlsahy5yl8a6xbezx1w45cmp2vli7asd40xcu5ge8pyk5b4kqz69b2tkqpsh',
                responsibleUserAccount: 'lt9uewsgmycq7am2ukr5',
                lastChangeUserAccount: 'a9doq9pv1hp5oh71cqhah',
                lastChangedAt: '2020-07-27 11:03:35',
                folderPath: 'm1qbjy7hegpugk8t8w82m6o4v50gdyn0ew94lmoyybhkwl218kj8vuljgoncqyzxrp593rxm4vcc8qvuxzl8rn3xmvlacbd8obe7dqlebro6c1rvjdfb1zghbx4kk92pm5xf1w1kb8sh12tcxoahxs5g0iul71vn8g2kme50ucm44ysdx0c5k44y0ds41nyyfvlssvlz51lhwlgpv3fw6uy7w7f7d06g2802wxqqynncdrfmky4dizbhzhwv6z1',
                description: 'h70c80p5o85lkdzfa1ajv608d9lbglp1ebcoe7kk87sdgovvqzyuv9ihd9chwo312m8xrx6p6lhduqac38zj40pq7aexvkde2l60rypz0aie3mnhppepuwvns5oqb123kkojgh2eomtvkfpomy14isfmss15mvquaf6u0hubgo6e1svikvaqxnr9lps1scogtkl16phnubgjtpk9p2hc2upl5xdrcgyehxd77pld6nkow89jfm5wipeep64t08p',
                application: 'xybauml8l24rt2nho3vj1k1nj7dou5spf9tnedf8ywpov41a8mia6bbrk82f',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '9g3yux56ffva8h5y9smjpev4o1tsn8em64tfkmnmpadal7n9m6',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'l8w9mi0ieze39sxil0i2',
                version: '62meke7p92ns5usjhhy7',
                scenario: 'wsq0p3h4hr0ams3lvwxgbwok6q055wle2oayukds0gtsvk24eu3cu4j9srje',
                party: 'yr05m4o01i1ir2ylgdac1q92guvb43ynukmy7yisfv9ulbfi20zriu0xykucqfk6bf8lmwnfw13w38u3yg5brs6zn0lw2x5oplsnve5hmpkyiuwx8ldqhuriebtuyhyip2zoyj9hv2ntww1k8twxr4eyk77rre8a',
                component: 't8mrwq9ts0dj6zm9xv4df4621wzvp61bmi7ms2tel68didjaw2wgdlq4l65puzjzcltxav4pv4hsbaaelotw6i9u0kwbsd7hqw964v2on3gzx9xslrax0qac4vm9bei3mpo6tlt6ea1nhfnjzi8f1cls6z1hijuj',
                interfaceName: 'xa2qewq7w92wfjecru960ebgkrh33hc0298u0ddvzrsyeufkybacwrfrtye55u538canfeuo0vg86nkfhwm5c4pb9zq0q2bhkpzy6xtqszlcrat7fyxc8579td519ij3p956xdk000bpp84hewx2osek45nbvehl',
                interfaceNamespace: '0dicfbkx2bdaolwt46u9uabc9fjt0f5fjbr504tb43ictj9t53c0zbl0r4vg4vvvd1qboq1nhpdor9lzcwlwttiez8q1lpq9ik29j4lwme6k7fj7t7nh96dg2dpnlgjw7p1kma5hkg6py3fydmrs9vlv2sjehay8',
                iflowName: 'mtlhx6e3ryc3odpnktit4d01c9o9noy0mqygaf6tmd7bp215uvp8ecmia2s81g8vb4hcm0vekku30tl5ofvlonbdtr4zh0auehbgtdlscv8siqc1obwagi2kwhfh2w98vvolyjvbweh7f61pqv88xcqfhvb8z81n',
                responsibleUserAccount: '2tlevsawvksoud4fr0nd',
                lastChangeUserAccount: 'nhle63tk7kerrk1om04d',
                lastChangedAt: '2020-07-27 02:00:06',
                folderPath: '1f2c6aif3bh2hr7z8o3n7ym9x4fmnmm1p63scsccrdlhl0hen9li5h9qizdh3uaexrmhq5k0xxut6l325u2cwi503g899m53nycb7cmwep98y66pzrftlpdawm2rw88k5x3fqvcnexixv6d7921suy0am8hy1xlj3uzvofvp070fmmol7z5fme7bdp0x3pwt6xdsn6o7yh1mh1ugnjppcazhd1t05rtonqudnaf5vjjqz6fdz5qped2id6yt02be',
                description: 'khtnql9lz7llqf0a850pkdbvcqzsctrzwqj1ebl4csw47kk32od3tufbdoavzl9zp3izlxynsbdpe4miv02eif2uoijvqo2m9izftg41m1lc3nkkxitne5t22qfh1tusc9tceo6bqd1fzbab3z6zhsw3ysboidyejkpvz21uap7d516ti15e6uwloqzrxbprq8zl2l5vswt7cobm46jeigd99v8ipex8u04ybjk2pqhqdpw6bpnxh204s6kg89k',
                application: 'x7riiqoxi4omoqd9i10ddeh0qiwl25svkqgslb9oocznsg7tlnp46iit0nqb',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '17nkaqzhgiwmhjiq0axj09wcoredwolejxm8tuy9ezia219rgj',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'imymfyw41bt03tdzgs90',
                version: 'vvm4c4jnwboy8o3613v7',
                scenario: '1ovhd4f7y5by95okck2sswn53mext2jjozii2bo2ititu0bsdizaxef89i8f',
                party: '1p7vs9dhlxgsszaareqk2xezip5ba8q17rj8btvl0fguzh60wobwgzc4552a6rywglq6bov94bhe3qe9sqp8vuua6l7ydp5jyki6dilpqn5y8vlfd27kxl11ivok3k7c4lcac2eynuuhv60iaqgo7vetailkl8e1',
                component: 'v0rby8ullyhc48f4gfbd3dg190prd8jgzgjixojj168r00l9id0wnn60o8w3oag4tm9uriiypfrjb8tthm3cihpsgru41c9zxp49u91bofuyrr4i6u5r73g03f7huwplwv9w1gnotx1p9iofz12wztgbz22q4fzn',
                interfaceName: 'pssq4s2reetab84s4wa4enwt5my6yr599ycp3qorugiq29l0r7xevbrlbh04ieasr9u6cwjsoj7qwsr5r9b7zug61eyw1s8zf44nqy2v78mzp4ni9y0wjezx9valot1xm2ovd5jjvnocdxaysfwi6unxen7mahcl',
                interfaceNamespace: 'rpqt89bmrqngzkq3yiqjagskk6xa579eaoosef848dtt9jxf52dg5a54abopnc702olznaavoq7ruutf7vyo93knjmra1ku02ergmc88bivgieiejibr2avuy42akdak6zuwdhkzrn1x75dqrpcw25iywlkcgu1e',
                iflowName: 'j7s8u7gk26uja8n6tsv3kjyyv7h8lij5ezpfk0qd1x4cw7fejjrlhmvckzi2fr5xq2i5dm3rm64gwil40y6qn9s9q41fc40kbjn3wkgy1efgk8qudnbvga3kenh0o56ymsuhmzxlsopqu7fqptfs176al2f5trsv',
                responsibleUserAccount: 'b3pabz32uu7a37rhql1g',
                lastChangeUserAccount: 'yr5rtfoxie3816qrq724',
                lastChangedAt: '2020-07-27 07:47:55',
                folderPath: 'x4lsx18vfsuhlhu1imnsmr4f1ra6w2q003zke83kzn7hvxq3jklhcjmnc7nj6s55kn7w9pc1ap22g24craw803s77p3p9a1fkghio90gobcrcu3e4tz6mr3pfbwkof405n5jriiwc6quuuvjg6o5dg2fbss9qqx7hctzt8a5a0zcsk68dr75unjhvj2efayn2gdjwv0s03er2lbe4qhwggbt1dclvv143a1wf7meqi5lz5lbt7hitkk7p6b665x',
                description: '3d9m7nabvukonoumm8dkbye8z9bwhd7bcdk0elpnuml8ula9qe1hygqpeuuntzr0yq7d3uuvukm9mekgvco51akgct97dettmbp4wu8mtxyrl983jdyhm0wqtrinrzioy86383l4blynev8ehuw922hwcxxzhqdlcon76idjyrhmmvzzr1fgf1klecf7ladof9ujc773y9j17xhyj9p39lasnsytqrr3tl33qw80qt1w2qa1rvia8fkz1nv912gp',
                application: 'rf6a5915wbau9g6ye4z1zqajrdknn49h7yx1uawuv6jm062fg20o2h1kll19',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'j9eterc7vnaf1i1ytdqjs1hmjec2h1jfmony971ushnnmhpciu',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'qoqzl4ok175j4780aw6f',
                version: 't99eqg7tqk08tkgb3gh7',
                scenario: 'l3iyqg8axswe7js524jv808mr4owuu364mh84679ydgwocqgh1qgcjpj7uu2',
                party: 'nvggsld3xcawcuqaeb04y8hv4jabo1sds439yxpg99h6c2rjn4qu1hlbqcxufy6ed3pgfyph5xw53n9m5n5n9zzah4ryswllpu8fk6ipplo80dtgz9er75uan6ag3vl41s2f1nkevvrl9f5ic1uz8rz4ivh22pt2',
                component: 'go207pu4ls9y3kp8lpxqb0625gxht70pjjkdhid1sbdnzyrkhzb6bxvnrfjj8lyqq7gca6b5vzpwzwo0npxgz8gmvrm32ythpugy2uhmksqtt4wbehaqyraw1ryagyynhn4300egr2gh4tnt5yofdo9y2ukc8hnq',
                interfaceName: 'ug5dt9ja1gb44z7eu8pg2r8effjoly0sumtu526myvgvh5y8gqcfeidgoh683tfakl8xdtqlq6la4hjuo7vqcd6ymf21v48zloy6sdbfc441cpqpgtorxll0dpvqwbz4gox1bwdsdzpf26e3wkob6ato1p6tsj1d',
                interfaceNamespace: '5g5utn021eopbxeuqniv0joheecz89v26lmm7kx0qjx6tyy5efgvq2tv8vjj36u9lwx1ws69ip3wk84yfsy50bomttd2xruktkrkfdqnsioseqrd9xo1fj99foiqmauep3s7ja9px0kjxkla12ku43r2npway1d3',
                iflowName: 'j18raw92bz1i33vbc1a60c71acdxstxbgrpvnk0lka3n109ddj21zs0axglh8c3qjx3mwa443asjew6p80tbx0agzaei26sp0jay0jaexih3cucnzo05djrgp428ehxi8q9271uclde9qpx4fqkxg8y52oq5uk82',
                responsibleUserAccount: 'hdgvld2zweyni9sx9lzl',
                lastChangeUserAccount: '6rvtb97jkdeap05gv2b0',
                lastChangedAt: '2020-07-27 12:55:14',
                folderPath: 'vuiyhy779k60x2unkxi6qbbpb7nsmotief287dfvrorpnqe0scn2axmibp98n8ai127gdzikohplg5o4jm501zxjd6sxu2l1vm07c1y2yldc6963mvnm153tize13f0tzze36dw6wen5ef1v4ne7h1tch993zh2d87b6tdskp7wepvhkypk3tqkpmk4e9le4bwd5owjy1s02ejgm39bakwlaqfstxd3ofg3u5c8jzn05yqunvju1q272zbe308f',
                description: 'u25athag8w4ziaj9q0y5aldci71lxmjtq8eau0g330pk21dm1rtkg2hsqdbvi4p3cgayy5o3shhurw0mwfdalgmpk6f6orslvaw0pwcsvhd4n5r03u5ut4iz9vm6lqkvlx223orf5kpp0o4tpahkwd7bh87e7lvii5eat9o01r3g0o7orptb44c8eqhcliqbrare9l8qo0malc2kjmxz3rxkggpv2vfs2y27qmjc9gun8aunfa1ri8o9uje4wmr',
                application: 'rh35o803p1kid6m28m8o6x66frglsav38c9mcpahv7eqcpjfvg8vntkfnh22s',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: '8oc4a7qq993fyhzqc668zhlz6jlzaedfbkuv0205ux7nu4130m',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'cahgh5v1f3c6cfxza27a',
                version: 'pd1sgs23z709s9j10bk2',
                scenario: 'vwcsq4hb8vexu6ubvbwdr5gpfnva1oabwfq7gjm6wjlrjhd1whlj8cuaosya',
                party: '9ck11yvtfrqa59d3lw30hel0tawqvpbfbdyks2z6b01t76yyqnj2ei8hspcryoyoa50n0l2b9xbh8skrphac9bns6np87ey4wrtp2rfjem097lq7k89kcgmf1mbaertovki8sb13b7p3h9ixycw0hnlscynbv2iz',
                component: '2ln23ik8fpbij0ijh2p2dlbnx4u9k8fc9vba050iipwd3ute2xdz8cb7dq1nrwpkswqlr4ubtk0v8iz8s6y0qkd96j7togi21gyvncm0jyn38zanuwkvjk3qjuwmke4piwpy9wu5z9yxp0dqza9qs5g8d4tnuara',
                interfaceName: '2g1dzkzxxjyavwf5g04x1yi0fua2ytbl8mcvqiuhlwbyr5qf5u1bsb0wk5lbekwv1qw5y5o6nr0xo96jg7i95l8egigdycmzo50zbv5xvzjy43v9get1vxj8govu3pek7hqktq2memgu6kdlbxhyffatoqt6bz71',
                interfaceNamespace: 'lplb086188vj68lxf0utb0tcg3tqhqo2zpt1982frwupla8oqy7zmsrtz2szb4u95qq3bbqm2l02o2tlbd6ios2bd7dfa0odtuqy31yatv492rja76yun9n25lw9m9d0mefi4d5g424binv5xt1d8c1f1unn7e1v',
                iflowName: 'gzaer7yzt3oj6jb20tad6jmf1rmgglux2rivup2cgxhk9z0p0iulb7lgsc1hvw9oe7h05m758buta6z82rwtqxn637wz85tflu2rmn8o4e6pazxfd4567ooavymwxkf1juvdf3b22tauxcqsotheclz73dcbg6gu',
                responsibleUserAccount: 'nigbhknjgzs0z4s1w671',
                lastChangeUserAccount: '52o4ckkc0qaa72yvzmha',
                lastChangedAt: '2020-07-27 09:59:19',
                folderPath: 'fjiegdultse364dub2yy3lylqhithz9k8zpjwf4u8n97whijno7o8tpdl2p5wvz2c93stwspuzwlk6pl6v3ruwz280az4rfg6euw859guaqsb6rf7jk8hp0b0gehw3x0zpqrqe6hb68d2cy8qlymga6renfbqr7ne5u62nc2ezp9szn2j66bkatxt1vgq7k7sb5qgqvx1puqe86lcoj5g232dw3q416a1r2ea1dgtgv6pfreuu9el76keefgcb8',
                description: 'lbgqal86uyyqr105tt6rfctw8ou324ikrba9xa5helx732ch8zghjm9aas16j18jf6rik9x8udn0bfhori9xzehjdkf5jzfpbab8tc1nor1drux0qiqmpdcjt14yb2uusavflvyjz4fxr6xjw2i7bewgir3jmhrb79sbnjbg7lsg1km7lq8dgehw1qk3vrdb7ycbrhhyi7z0kq7dqh71rds98wbt2si4ooicz4emzv8ko849ky7a7bwoq0tacdk',
                application: 'q0555mt0tlhd0ov82ftsbda95t3coc4aximl1yjmna3xdpb7ggm8sos9dujb',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'ttv6cp9a39ubudq3bbjud4ngdp7lpuhb0i2xrh0hblpp9o2gpb',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '1dxa32l2x9w0cnwfvfsr',
                version: '35i6j2pz2hj4tamv0hw7',
                scenario: 'u8rrj7bxsfdptxhrd8dnluhg3awdrluhm1gibtib3x1jgxum0dq9tiotj21b',
                party: 'vtteany6t95m2gmavsv4785c5a1xxsr79nisf3bjrcosavjpp0km8ln4pvmg0dcran2sk7o8z9x3sro3hdiamkhv57bm846xzx63wr2z93dea1cxasi6k5xdk89pe2qt3ix4kn6wbvnppsvclsb8j3yparsehf0n',
                component: 'dc2yvphxpfxzigbsoorcbjxtcyxfyi7zabg0g8a4dxvrqxj4vtjr7wgwa1mcnbk95v7t7nrkjisnshq4uxwtryhg0p32u0214lh4j89g9dk7nsbmbu1q7ci17rr0w8jqe55s7ovo8lxv5q1q06zkw2eshpk7v8i2',
                interfaceName: 'nzjy7mj7w2w0wsbgqnwbk2pbamp02ca6bqrr8ulglzqa91ijreyrdpwncdbzbyy74vgazytgqpwbo51iyc7lzm4s9z12iyx1eu48j7e51177n6pq34de43sbh912bhejhk6kpziy1ktp2kcn9pf8wajd99tbg5g5',
                interfaceNamespace: '4bx6admp5h70mi4zkdilnz8wsz4mnfytgvf8e7ptoadjh2onkuu36fibmd6qyc2y6phbd9ps8l7ic8x5zwieho2kptinrzlwkj6mp8xq5soi1ygg4ehht2scvsiq5l5l3rgq7ubv7ig7nsqbm3g4kf6tm5jv81ul',
                iflowName: 'clxwof59q1kubtmbp6jtgdxrfetky26to9orqhi45q60cs0i7o9z23lkyl5zfs5g63uth6oj6po68cgoi0sebr595mgtahxv8lokszw6c70g3hnz0tf8gpoenesnddjupdxyfnpcmh8toixvc3l00adsxdwxlo6u',
                responsibleUserAccount: 'fi0a0jq2h7zy9c1cn4v7',
                lastChangeUserAccount: 'eaq148n1o2tw3132l2rp',
                lastChangedAt: '2020-07-27 21:43:40',
                folderPath: '3f7hesumdif9nyk71jodvcipbb7pia1mtf4aakckuraj4bpe7zy7yzd3vemloqqwvq7wua8wai4yjhmul0he3is6xamqy8bqx2r9yfjni6aj7yhxhzzrlyqao5sv9zi3ct7ipa55nflx4gvvtghxyn3p9y01smejj20r74texyivgnwj0m6i42hfl8sflbxnixdao7rcb3cs6iktf8pu1y9h2jvr21u27k8lkwu1hvuy4ij0l12avpygeo1nepq',
                description: '926jydkr0ygp9rbco13bxpxs80dyrayiwvqq5obh1i0eq2cvsa0xburnj5rg04e8n9hdcovm95rn8n8im8fo0pses54qi3xn8mqowuojsb1is0nfspasfhm3hc6wabuuezdps7q3apmcbfw146ri6va90g6yrzd521vaqm8ms44pe1xqye8pykhidztldz9fu2h3569jematxbvz87kzkhqfos6vuqdgwlzuqr6zehp21qp48z8kig7en7ubief',
                application: 'qhhsh7l5t846laiz8wd02sxh2ms1d3k1s70jwn7oa8jq4ti1ace02gry9aos',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'thmddu3ag90o0f2q9pdirq27cgmx0biea87cpgmmp3axc0lsn2',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'e86qztncqd6ziogj24ek',
                version: '6f9kn011ce0l6jcb195w',
                scenario: 'mahc518u7d5ztyes3cjiuag92ead5j703je20gseylkyy7ckwpuwtgudk0cu',
                party: '95qoomir8qyt9sghl339mydxnveicd2b434os3zi8l3h31yb4ux61vq98c7pukk2x33hlwtmjsdkbej5inxtistixlwwjmiyr6wk76tff461874k0q24jmsbw8pysjoe3qq8c9484dys2xs4sil2tteudxpnqt4h',
                component: 'i98x06eoulggxskaaylox9sptfl10h8hhncrtss0kjl803qnedil1o76azz26mu3c5fc7tzsu1752umdgvs2ramwwln6kyrric8fhgnj2411azaxes8x53jfud65c5gmro8qb4h9vccsrc6lj8a818r3r22gvijo',
                interfaceName: 'u2q1oha6541q5cj3zqr7mss3xce9kcfuac3x84ylxo0u9ukcwbibo4urlmvuhqrceciqeb7sqm4s5q8i06a6ew7e8k5fzy69ndohb1k156cn2mj8pp7ipi66sv9gp39qf0dq4domzir0yqo7kbhwomwjjaonplap',
                interfaceNamespace: 'adpoe2l6gw2eof66qyqmu9fzm1by1z8uqbks4bj9oe030iqnvz3vc9syry9noczkxwqghngel5y5ki7ueli5f7lx4msqzwz0uqe6hfd5ie9lhkyo099hikrd7tvsij6kpr0oalqw52m6lz04ul6zpjwy8ij86q52',
                iflowName: '3wn53jcjzw7zawin8z3ut4rr0lumoxid6efw47hkzlhg2n5iz2ashoz1b9366fddl28s8hs00jjhc2axbyuhmx2tnd652qj4p6xuoi6jc5w9iaopjl3pcnnbyeiw36x7835345tecumkvh1qjssm6tafbk2vezkv',
                responsibleUserAccount: '961wvzxmn6mpp41lgn58',
                lastChangeUserAccount: '5i9lt1cy43znuptcwmto',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'mcrcka8sijwhct46e8uw5kthu7rpb1m7w6vabqdnaw2rfh0kt84dzlm73hw69qayhcu9vutvz9s54d312en10e4b1h0h02g1yr6ugu04ogyf8sjlhwqkk7de9w0mbkxd9w4rvwotjjpy0v2x8bkh4yupiw3m5ojezlfjm95te1qw47n9tv5lm8uxjoq6g57066s9b1e617gvchu3lpci51huuxcptkt29wortsi7rduhmhzdap0m1pzge2tha6q',
                description: 'piswvgnz4ipe3ecs9hg4ec4wo384ftr8o15zn2ve3gh6l0d7p6teddwhsvbt698lx5g2tua9fdrhcfmsilhlf5jzd3eq3n0696dxx920clntl71n2068f9t9bjud93dfrnt0oowf0k9t6ayfmhhgdwuyrkjnwntb6w20ed5lt24gg44us3xzule08fziq4zr6bcw91i5xdwhx0ofxr19xit8tm5kk9qk1ksvcta9wuit47aqq8ndyaijzhf3077',
                application: '87h0cost2bh1y6sbdopvilu3w4i2vl3vt5pw7ao47vxybdr1b1ww1tmmjelo',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'zczowuzas3g7ki2wzir3mdcxmogi6la4zofm2nkfe72kbmbsub',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: 'ez437u9k57zla1el7fow',
                version: 'cde7tgalj74gq9stai63',
                scenario: '1f3lhgqsac9kwvgz1zfa27rlx7qk8tkd2mxrwofa7g9h31nr6heddokrio89',
                party: '22tj71z51bl7k9v20y59vymnl4foqnivuaw6rcrxlxi35efbmhpdwydfh9pzh727igcmrkl2gw5lcfeeweblksaug0rl6zrmtoduuxko2p1t778hi6pe7cydfuwzcsokbaoxmvjyxq0g1krn1wr5tqnn34flsyj2',
                component: 'hslwglhgjjblsgvxnnvh3zo7iz6e9bmk8sneodftnufe3ybf6i9hqvg6o4da1pd244ad4te6age3xh7xwu276bj8bb7hhbzr34xcjreeiiiujc8w42453ao5edfagj5kptl0o812i3pbkor5ff8ybdx55l7aglji',
                interfaceName: 'wn1o8v05z7ir4jv5bbetuif3usg9a5ok92f5e2jwu4jr8iiudljdfsmxzo6xq22pe8kmf930lohfis2dxg7hj4f8p56kn9cpqt1bqbyiqbes1fyvpmaciovgpqg4namtkyi9rbpwkofumnj9oqu32ntynnt8d1dl',
                interfaceNamespace: '6oy7e2rl04k15qbyzwi8jl6nx4owb6lrhu8bbj0x0i69blrm2kaafpyoojr5hvseqsk95ek3w1vcy86o3tto5dixni8duhk0vczyn2wzo91dzgroc90m4e4klyiy9n0h243q2ekzpq1c6umgtcylgv104840pzqo',
                iflowName: 'yi3jrwpv7y12eiy7pc18r7t1pv2sejtxxppe4phib3td0ssoy5ms7zwmzrimlzdnkmg0j3nlyxtjwq983w4q96v83e9lwhks7au7j2q4sg3xlf5nf6932q0k2bi3h04zg89qp2l4xgta1kd5vuigvrvhqvlkgwps',
                responsibleUserAccount: 'g1zdcbhjzf51r4bas5nq',
                lastChangeUserAccount: '50ipkjjzz4imlh5orsz2',
                lastChangedAt: '2020-07-27 20:57:57',
                folderPath: 'l9olaxgs716fbkyvm7i8swin0c96b6pw03mz8b5uvak00gq4o0sqmqz2a5dww7ptm5m915m2sgdz08k43pr4iikewqc7jrjbvunpe5nax2zxakirfgwyv7473nis9iw8j3nx139bcx978lxclow9vtfz2j446a353d6nicbtguiaupd6dh69xn144tcwtwsq72ko1a3oigndci31yh1p6zd3krgmvv4mm8dmkyofds35lzge3dmhhv0t7z7nb0k',
                description: 'xerwul8ol8tz1j9ndtvuc28zjvei69zgvysxv2iy1fma1uyxajfy8xhtrp2cxhiepaya0r63yi5ymut4qxntyrr51ymqrru0f8vqmlzgpfi14tnvmsh78ffmxe2aq0vjuvs54irt8636uhckmquctk7joxg87bkz8lt02griw7hhpryqrunckhzih9cacb68x7qbh6lrmo81b2dlxashvj4h5mmai9ts6isf8x2jh7ovj6nrzq6sdankzf99gpo',
                application: 'naeq9femh2xk26eaebvmwvqhb1qu4fskqguofjq113yc93himjplei6gr97w',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
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
                        value   : 'f7535896-33dd-443d-8c67-ebad67c40cc3'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f7535896-33dd-443d-8c67-ebad67c40cc3'));
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
            .get('/bplus-it-sappi/flow/f7535896-33dd-443d-8c67-ebad67c40cc3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f7535896-33dd-443d-8c67-ebad67c40cc3'));
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
                
                id: '23b851c3-e2ee-407c-b109-4514aba9cdf1',
                tenantId: '70f0da8e-eb07-40be-8704-22bd27d04a60',
                tenantCode: 'o4ct61qyu9a8q4i0ifoidwkzax65rllduzaxug5a7owsfpbmin',
                systemId: '9da4d7ad-7551-4fee-91d5-ae6fdf9648a1',
                systemName: '4yk2sg28sbekabqp1na4',
                version: 'oma8wi89shz3i3u62v9y',
                scenario: '34ugudhcuiiaelpvfw6asybi77mhjt9suztjbulbjjh2blqcw4xv046srejp',
                party: 'y7gq241dh29okv3xntylp0ul6cf8vth5wcu8i8u1khbb37eco6int8xr6q8evhx6jjnowee5c9c36n51rs0nxxcx31oj8kj0a0v3mteq6542yyzelrvdg028uffivt8y6uv4ulak8vajb87rbe7eu37tb0yiwkd1',
                component: '0tkl11xm1ckwmz2engfvl8bpfh46mxweth01p754tx3ubxgxqd02gsiu7q3l9zaylgwwn1xyff6xw3k58278pj6q23w2q2xc03odal09ajkbiai6mu7ocpii34ktvz0ksm0xg5uo1b3gq9694on8nhyqh3eo0i9l',
                interfaceName: '5o6zpu5cchahuv0ood8ut5l2jiueck8w7map4htdp98b5q4qa3tgchisj2sgml8eunsthdq13tfnrfncxu1d8aqndh7patgzodmv8x5c2o5me5v18orki2zv2zwp7wmw88ihhwwluqg9zfeq8iuncvhrmq5ec2px',
                interfaceNamespace: 'gaevica3od8vy0iivceq3vx60djrwrfami3bqofbhak5rae8wssb8cs4vwtapgng2lkpdkwmb087hae5ewhxo9jjgidvmvl1xlsncyi04m8prvbim4juvj0hi54ooy4jzg21fulk2cxphr7lqg9hx5e8040cfm4f',
                iflowName: '5z8zy68cgjcsmd0d3q3acvea0nfhdcoxh9hhib6h2fh2ch8vd9znwfijj6n3hhyj97ksf0r7chb72onjl7mtjfvxugaphtdluh61iopjncx90y5dxxu9qpyfc8embk4lwvxvzqaczrtfpw4patvmv9dlbqmxrsge',
                responsibleUserAccount: '0gqnb6o4opyst4h392zd',
                lastChangeUserAccount: '4ps5ju24x8mid7nqhjt2',
                lastChangedAt: '2020-07-27 07:17:44',
                folderPath: '83y33g5m5uwzuyhlo1gygx1vik08bwd312k0fh1yn8359v5cn1hyx1zbrg78yglviszjqf33we2i3bbzghoq9xf6kmsr8qxa3471er94ymltgm8yw9d3m5zvxnz40urpd5517f8af4lx3wc5loo84zzqpf3wxe75rwzqk27vc8rlbq8d1bc98guuhst9br05nfu4worupsid7fdr5ca7brg0qy74kkprzgi8nemavetv6b2nz7ugre9qf0wmggo',
                description: 'kshmz8hvhel573bvd38esv9246zjd13o4be0o3mqpqve8ras8j0ysvs1jeahno6juopfwstksxme8nc6pffi7ki1v08zxzunn2hete1849cqdkca26oox58zgo3sl9nid46ypio67i9oal0fca689j3xpbrkcsze7hoayulkeqn6dk1hvpfhbyqhvu0wbas6k1mmtjbembftl4o1l2nv0h0qzvlsk83r4vqul3on8olgfo7fntj2wvseinc7bxv',
                application: '31yjds1ateqiw99e7mzzi799hq2w6t6zgiu0qj0lmis1ki5i0nl85l3ref95',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'eae1d48f-d1a1-4bdf-ab9c-a4e69bc58153',
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
                
                id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                tenantCode: 'krqbmq1bd19gy7rkx2e8qe4dobsxn1mclfyfiocb7apws0ulzp',
                systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                systemName: '0f8wzk9mc09ic45pdh7k',
                version: '4l2a3n1pru4pa4vz7cq2',
                scenario: 'kax4tpurevimpyorcs26ws3kngkaa8rk9uv11e9a7sfo97tfhb74lrf4qkvk',
                party: '8uaxlgd33wgynv3zz3s8p5w3v5jozpw2hzg4xuvdfhdfaj5sm694toyvug3ohhzpulk79a1q3coo8u9h8fdlywlewjhz2vym6tcaehcxsrhy94wtidig5jawl1ui2qgyo7q7dvcdfxuejndudqsd4s0m7c02cor0',
                component: 'z2dilwf7j78r98hazjf9fq6a4sxumv7a63yi7s6f5dme1twuk0fjxi2vxbz6q9b9jjwsi1uyy4ytcz08xm0ska5ramhglzjhaxut7lcm1tsr45x3hhpnc72uhj8pwx2iyo0j805s4ac5z9b320si4frpr4knioa2',
                interfaceName: '91xy18eq2ql2ag3kvg6yh06fsrqoebiupra08x76zv4gdl3sf7tm05pj7abj5weuaw5iv4c764bl34yq2kgseuns0ja039o8g38jifgsri7ud7pka2sfqlq0k7u61oxjsnshruniz2c2qnycq9dxoqxxj22ltdk3',
                interfaceNamespace: 'koey0imb5ns5u6lgyye2wxrphupwxet1dyauvczxlg8phq76jsym8wvvzmtmbakf8l7z4f6jypt6i60fngg4br1x80io886x5ph9pypk0i61ffy0ull4gk6tc21h87hvj3v8wngtsm6v78jfiaqttbsy4le02bog',
                iflowName: '7wf5y1fq1x9q7axx4eqagkr3l0t35xoip2vmiuyjvys2kemgs8ecfzjf4mwjvvk4t6tnnf59qaqy4p5umzwdtn0gct5kprv0axi6i4uaww0z5e5hfkxdb9h3wz7y0p15igpccopoz7puemr5i2ce3j5xas0ov8ne',
                responsibleUserAccount: 'sc5m98i8msxatmm1xgcm',
                lastChangeUserAccount: 'okgns1pdz5e7dlj04uce',
                lastChangedAt: '2020-07-27 17:33:31',
                folderPath: 'szd5ecgl6tm6hatu9znwjhru6moojt8zaggvopnkzkwqaw82ogy2ere60e4pec8w9jzc8wcoxp7n7srtkx7nqakfuwuna9z5bai41mjcpknc63dty8t7u1d2uxzwvdvu9ok65w7k371yvmvpzj1l3r1qex9udsub6m3unnohbajfwvcbzljmwl1sb1yfe2nnlhay0ib5go2jptl797a4xck36ttiv4sjeqtp3knkwqu6tyypxybsq2nw8kk6x5f',
                description: '57zoimdl455lj8nhju2nsjwszb4q3dv0rlxunkct9k477lpg710ob02hpzvl8ld3pjprup5jftv84mo0goh970480n5c7tywp7zyy1j3wr780novjn2lxuhxt8f96xsab4hkmle4obg1nmvmx2aupstfi5y0rdnqzoom63b3mmmoprsgehnn1b1pf55vv45njv94fvzz7f7l4q4icgmqqhcims8990nbavzomtmhhey4x42m2vg4yzu7qmhp4r0',
                application: 'k6qto15sicd7s65z37tdlkmpmstkqhj1kr5zhz9os0flnoscre859bmzrk5a',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f7535896-33dd-443d-8c67-ebad67c40cc3'));
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
            .delete('/bplus-it-sappi/flow/f7535896-33dd-443d-8c67-ebad67c40cc3')
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
                        id: 'b0d3b7d8-813a-4a5e-b50c-2b6ab9163caa',
                        tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                        tenantCode: 'xhps8d6w2jcrsm74x7gsiwuslp0bhujj5tvh40khsoobw80q4j',
                        systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                        systemName: 'kfzlu2onigk95kale11p',
                        version: 'n4rmzz348dx32ox4j75r',
                        scenario: 'nasb0na216oplq48irn3qth925mf8exchhfbdp1br5yns87fnmmmz448g628',
                        party: 'q9b3cfpqmq5r73hiiea1oj7agfvz184giqaxwwof1op1f710aboql54m9uptmpmko7o3xuv101wk495rcl3aon7o0mbk38o4cma545ebc5gymi1obc14vp0fh5s7s5r5syffuw420ypr4gn7rpkdca5soe0ne8r0',
                        component: '1oiu4pdjc6cj7opy7vkl65yn76oxa1mfp1vi6khufkaklx3fgoqbjy7ihamns46ffo2hdeor0ihnk49r86tk9mpfwjj2kqxqy6qqormqg36r6nhu45ip29qfyw77zcupljcvz22824ashe7qv48evjuj2v1kcawp',
                        interfaceName: 'ce35fr3ay9cg8dlp10svoahtfattmslrsl3fka0tdfbck1rsl4o2q7sdv7m7jkt0abr1sdctfl4t0hemsayk59ftykwhx2bi137g1kr1ft5yln4v10nmoaa0h8899u6eqdridi5mpc6xnk3mi2mhsbd83u7uz0e4',
                        interfaceNamespace: '8m5c4aduost9t1zhslfylr3u6rnf13yqcy1tun24u3yhumpp20ioiz0mjqv1zh58eowczdtazm0t8bmxoib002tuplx6nmbzahu02iiqizj6wo6zky1euez0cg8cslir3mawbsb9i4kk1uz7wituy10b4iggdl1i',
                        iflowName: 'tnr8cg74bq2ax2qc2kpd8gdf8rvnbhe27ldua49p3ohni8viboomo52mnregixmxfbj3xu8rxpnay73bcbbho7isskec6d4y4appw1bb6rkoxsmosn8w4dhrioqnz5o1bmnuxh7lryeeee8dr6wjdwxj3vtkeu9z',
                        responsibleUserAccount: 'ut5gubrseqv6otf69lpa',
                        lastChangeUserAccount: 'vddyzi0109oe5rqxy0rf',
                        lastChangedAt: '2020-07-27 14:49:01',
                        folderPath: 'ml2arbzp4ljkxdbbqdezqj21l2kypkvxdihm5h0ugl4fmwqj611to968tsx4ty44qzen8lyk3fieiym7lkcrudge5df7j3xnf9h16cl4wytil7hmnpc7ja4wsiml4mdevw35hab4b5usll34vwvtnj682gk9k9bkvb8g36ycmbu3zxd3j9spznkbi99av8rnneelhgertop52grve42dzkuoewcraao3u55rovm9juh0scn7rmzhesduvdbl1og',
                        description: 'ff62kxmxmw1i8ri39cfa036n78iim3ah8kcxn4820oqkn3zu0pdc8y06car79tgoxcw6kixwinduqxata82xdk8ucizpqvevbs5017tumm77oby1t19e4eclgqleyuhcx6alenrgnazfdlrmk6uwam5cnmev7g8msndswt9x8afd8jasn9rpscb034crp7vvwuzx2qvxay7hx6hhhvspwqqi12vk2s1g8vqg89b3475bewqxkm9l17khqmoscan',
                        application: 'np182mibagcx08m1tsdb8zjpt58yvaso8t3hznlwmx098n19mooxmybh93ge',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'b0d3b7d8-813a-4a5e-b50c-2b6ab9163caa');
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
                            value   : 'f7535896-33dd-443d-8c67-ebad67c40cc3'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('f7535896-33dd-443d-8c67-ebad67c40cc3');
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
                    id: 'f7535896-33dd-443d-8c67-ebad67c40cc3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('f7535896-33dd-443d-8c67-ebad67c40cc3');
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
                        
                        id: '1e8e5faf-9d04-466f-aa7c-5d5f69ca2a90',
                        tenantId: '2bb1cc30-9def-4f87-b9f8-cdbc41ec44ed',
                        tenantCode: 'jc9wx3cnvspns1s8wt78s3xx634c8iintx35xnts67dj4he7qg',
                        systemId: '4dd32e69-cace-4c36-8aa6-f1ab7c89e8d4',
                        systemName: '34ueevq9zg36g5odsrjs',
                        version: 'fe8g75s1lue5el9euai9',
                        scenario: 'e6efqq8z3tlv5s6shgnu84qowl0fa5epi4bq5qtcfyumcq6v1bov66ry6j9r',
                        party: 'h87kxcc9v64tv85qok2svs9jnapmf31x917jyvc0jqtdg53p3n9bwx8oo7olhpkcobu3nl4kyr76vvqqv9ujglbwbzke7y1wc4393zqlilx3aktav9b41ml13rn87im7mw8s8fojbsw4gg0cmnj3uohlwtmb1nph',
                        component: '0x8u7itcqwnkm0trcu22ecgd9i1ojk847f3z4wt57w303vr0wrcjqy6hmkqtyp717s6gto3hw4v1l4y5hbx2ngx1331smqq3bnm4oqzocsjxwgbhk3rejjpq4yt6ljt5wi8dmm6s2g4pmxrufudzkigndp2mnpcv',
                        interfaceName: 'jud928hel8sw3wr5g2p5qwor48zzb1s2f48y6fzmdz9dmkqyrp0anxxbfqrk15bakqy4uk18718cg817l4oev6pcbbtt7y1ptjzaucgq8g8dug4taacwe73def67zjfnyh3veenkfsmw6dw546t5c18d36penia3',
                        interfaceNamespace: '56b3pjn3guzjm1afbxb6xb51u5isnckvee4zyirxgot3g78pfb0tcpjyppxeu2loroisfsty2ubzecfwmvcglfgqyzqboo3kx9d441rc5fv2xtiui3zeouz8h7job0i4jqnijz3f4cnd2b7ykk648mpisl2iy4z6',
                        iflowName: 't4zt4mr4vnd45q9dck19nohtf5n5jt0k5cp7uk5al6dogrpyp166xu36j1mp00unuteu2mdjcps449q9b8fobjwk2e8v3hah8ayhc0huxsxpumxh349tbxs841wh1qet14q959sy3n1npfzz5amxolptxla7qfyr',
                        responsibleUserAccount: 'n4d0103d2tm6xmwnnev5',
                        lastChangeUserAccount: 'x5basb4c7fji2hylg2le',
                        lastChangedAt: '2020-07-27 12:34:24',
                        folderPath: '8k3ps4hz7grtufewchqpbjpgpcnknjrtv8bizlp2qswuby18ld2hel9oa5gjywex5cgkqo7yiv5dunoi3tn8pfcbzlbrdu3nkxvy97w0drsio6sreweesimi3yczrpbwtupklva970q5fnkgfala2f8rt5k6sftkt4ja5a282pkbtnodqpztvyvcyf5cpjqqcwo5nvsjezk21n4dbbu8gtv03hxyw70a8ftcdkjq3idiito84nfyr8dlmzetlkk',
                        description: 'te2c4agx22wcscp7z6309gg6f2jdeguwidx8vhhdoildccydl2972k90ktu4r5easg3m422oxskdedx4v8eq6ewaiwza9bhzz75yn4am49im5dhl8dh4cfjoh2ucvlp1xjo1pktr4lxllrsvfu7cd6hcil75nf03k06g5wzen4buavuop2xbqx5y1uzq3jwt3tjzq72p62xyz2vkwdwuiigqc6prb5wvrukf0eri8viu8wokdv3z8bbsw5nl6it',
                        application: '2lop2n92iaectz72zcjncj70dbdept87ji53tu1srxbquemplayk4toyf4e8',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '935cc6bc-78e6-452c-a06f-ce90b4f7844f',
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
                        
                        id: 'f7535896-33dd-443d-8c67-ebad67c40cc3',
                        tenantId: '1bfe9550-9bec-48a0-973b-027e1c28664d',
                        tenantCode: 'ipdiy863utmhmbeti5t4dt7l99qa19lb9no0a0wkpex7bv7i7j',
                        systemId: 'd55f9b87-8235-4db1-8fee-6478dd366ca2',
                        systemName: 'un5sie4p28lm201c4y8g',
                        version: 'byr0ckjcvpjx4dp6zqkx',
                        scenario: 'o85q1gww2xczimdxrgnf9psjg5tsubxla1dsu19fn6x50w9w2up30vgjhera',
                        party: 'jaieitse2uet9cxl0dnheez5zn5ym517ya9gmaxqb1gkklkerzizl18xlfd69rqhrljl9g17grm4qttdzxygkqzck2so8vmai8ewqxx7f2ins3okwmn8tk4qnn7kptsc231bsi75lvgn7z45ob2x5aoolj7h8sgn',
                        component: 'lxz452njzmmt4acnc6swz1f4tqa8729an62nugnczeqbp7fkv3pxx06r4w5af3r45ohhwmxr7qwdhdku2w9zlisqd7lfxnct5r85skkvm479omtm07o9yvzbskftvhep9ghyltgoipoa6aaubvfuxne124ojxcd7',
                        interfaceName: 'v6kvlqp241itiw4lyu3z0a1hqdm81zbyofh4bduvemcg7ll340qd8fyj3t2bwd9462m0i2znpqywnxsi561pow1uk9j2gxg94fg1hjutg17hva6nbmazdqaltd27qu4el35me7he1z3dk9p934rtt0bf63vwocxd',
                        interfaceNamespace: '8y2w1w4o9vt8je6gkyv8omo04c529e9mdd1cekl8a1yi028m3jccver9fdd685gk8ckg9df7wwr1vdwj1vf1rdh47xhs0y6ft2pni0fi36thn2xn0qs1db5l6suxpzryo4e9rnkyzt4738l83ibh13t1jqcrz88k',
                        iflowName: 'o5lbewtypnbxwrj8x6d0skqlongslxtfddnjyr2ni113pujs2obb13u47vqen9l9z2x0nb5a539uqnuogt7k9h8n9w23hhrb2a9zze7z8ucjvz38dahau5gjcqmvebyro0fzdszz8byn3bl8elgvrceyy38n9xj2',
                        responsibleUserAccount: 'rj06kfg13ung2vxk881f',
                        lastChangeUserAccount: 'osj1i9xl9aq7hik9pim2',
                        lastChangedAt: '2020-07-27 03:02:26',
                        folderPath: 'vkvmsnczzqr450om7c9gz3i1e1zzmsa9kiovtkm1s4bsqjcnfqad3m1u42ugf8i27etez3w5u9rwtnqbr723pbv4ohvqutkkaponiheoazx1bovk0n3de5svww6h3vz3oo65ah6hugfs5pj1l5e1sb5yj837pugr2ga8hh3ttcjkkoc1eyeonqrhp5jluq8mpeqf62z8m8xdmhoj5993088rbi4f7swfd4oq6e9d5j17pyrnyi96925skobrij6',
                        description: 'fw007oc5s0a10ub9vwqnn18ugawcb8iqwjsjx83x4tqkywxzbq75tzn8ew0kjpkr78c724w9qsuym88yl5l2efvewk7n3nxhz3hgcyr7whl0l5sq9bddqnk81y30i0m18kc5vm2ma69af0divpqawv4c85ynsjx93n5zgfoj7q3g86op5xgwh622u7w0w3spdp81wt5wnwleqfktowbykcb3ezlhj399m3rc6fkr2qkliwkosuko9icf2xgdxfo',
                        application: 'qjjowbywhkq31az6kd449n9xv47ry9eh8ftz29ph4hl94b1lk7ikkcum0xpn',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('f7535896-33dd-443d-8c67-ebad67c40cc3');
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
                    id: 'f7535896-33dd-443d-8c67-ebad67c40cc3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('f7535896-33dd-443d-8c67-ebad67c40cc3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});