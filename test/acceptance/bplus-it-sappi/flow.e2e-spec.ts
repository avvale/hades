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
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'upnvclix85msa9j51l3s',
                scenario: 't8u9xqxo48w1e9ta0u9wmi0cpwyw559hfmc3zig9su8k9295nw0vnksvv36g',
                party: 'czhtiy50m3mflrnvqvbgsdk91r8j8l2wxx5x8b2a60s9o9gigsqu5pu4jxmgpufjgx1otiu8mvghrh0rorak4babu6xrynitue7w6z7q6thfqzdjnobicr68simuv9236ipd10engrmfi2lmjd1nbpld2ugf07fl',
                component: 'mhvhzlbnzscuf17xkdhsk1qtqh2ehfuvd37i1iqow44mlh6c59a4206t53c7y5ajjlajjplz0xsvn766t9435zq363agio4bzpyqt8yps2kvtp9dkxi2rh3disa9j0aw3493cr83jx0sk8dzs6uvxcu63kkhdohy',
                interfaceName: '2a6vc367hy1prsvoo0iowlz01yz9ger0ss4qgpfo8tb4derakd8icwq7aac90tglpg84c18dn7xy48kq2t3cp9fwjfdj5moefogogv5a5vmyskcpgcmw04m7d813k317n0tyr2mar3t2tz3oxsoqj9agsegr4tqm',
                interfaceNamespace: 'mz90w57hfpwuzte8jdzfv71mwlvkia4i3ca6t4jzlnu2vinxc057vgpw7qui92i629mkubl91n6t3v2d3leh3mnmgb5oudmioh0wi25mz29cx8a5niqaytxgwuala20ihs1s6pwwejklqppv4jimbkx65pzyq2ud',
                iflowName: '0ziizsrvk6qkthxvgzgekdtho3afddq9diogz4qp5phgxeguxnv8tn15bx87calobak5b74qqfhz3gaqvwlccoi0yatndcv1iazn0zj97p1tgstyejqsv5jc50ozgz3vt53dkgj9wzt8wg0jfbfgw7x2n2lrgbke',
                responsibleUserAccount: '9yk9jkjsf9s0nfnxsyui',
                lastChangeUserAccount: '1qdkai4dqtrxckajnd6r',
                lastChangedAt: '2020-07-21 13:16:22',
                folderPath: 'pt5pvhcymxpx4h3fxfbmkmhdt4o7newuew5wvl72rsfgmuvmvjlxx2dn1dhbjkvxi2827l54e84o1zfpkh6hcval8fvmgbs3tditrdkk4xtqsbhn4jyp0hy4k9oqc4r0z9nixkvkmu6dlzqm4mvfhml7pacugdj41bhf1ed02quumg04e6eyskxqf1mw2cgl6li9mvhpk0zupl0r385iumcnrfm4y3ypo468b19mub43p8zhyo8p7o9ptjtchov',
                description: 'w22ec0gv3xlli5jchpxequ9g23bi3qyqzhuzd5uv3kkfb0pr7ryfys56rm5phkdqqkr8i915sm9li6km0csmtoyr5q20pxjbn6ctipunyqjknm4bdzh4xz0gqg1hcjkztnzw1tc5r7ftoia7ndljfqjv6yv3yaix0hpvs117m6mspbh6nt7wflq5u6v6826ik0c9bdm774ypt4hbmdpmk96onmb0lqgwbncduwd3oun4w8z3r5eaugeynz974yf',
                application: '7jjz2qxbramayxuygv1773ec46ujuqhsv8g3vee4izui0mpjpn2m6psw81g5',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'j7y8rnq2pkp9xmk95r7o',
                scenario: 'phiiggyucjyfeq9dbjoyobxdwo3yxat4j4zjsdy1b3w73mz3nvd9w20cl59b',
                party: 'zjh1a7460e5dwmm66fbgmrjj0svj7y1xqa6egeujz7c18fqqt4w2y5m7dt5dv5agijkr7wy7a11hdmil0guzag7nzueb4lo2wqlfx64bqcw6vo1kji1dc6ph9rdlar0vfg7ws1p6l4q3iw3kdz4nywk3n6xqtrn9',
                component: '28eqzdqs0cd9shgw7tyna6csz5hgh0dmlkhq9mn9x5pnnx6f4kampm2hirs5kniq8ilkx6ppn4886ipb64gy9a32ws8g72xrgp2itrcvukpo61kll9u4cehdcczojwr0zmccaiiewealmn8ii6kdex4usxwtgkkz',
                interfaceName: '7rkwq8qzzvx0ku707ge18gn00f4milk34jukp1aveoxxbyfnncsvxuek4eor3vpz5nw09vztmympu2crcmoyshd7s1hm8lh76kso9b1ucsmswfd3m715m0njpjtwikn9fgc4r528vfmq6pnkn4mgcskuo7hsme2g',
                interfaceNamespace: '4p96y9hb9to3f9i0sc8koi394dpl8xhu7po7hlz9njiq7ij1mwzxmy7tmjhkqz4acvxf0sg3cziqnifvma4nesdsq6qdzyxmz6m5ruiwqklf2cai90edca3qjtvis05cf7inpotgot3taoutmgimtzyot7viit2c',
                iflowName: 'ckzqtg5biwg0jk2xozxicnta4ph6jrcj7cief9l27ym5thl3lgov5w1ekv5ozwcgnjef9fn7j54nh79hfkteez6rpds742u0armmvrrg61syywjx15hgyqiuwck2xxvsyi3m3bctscjfr9yn04zavgry2bx7nmph',
                responsibleUserAccount: '3dbijfn3u4keg6u1o1ij',
                lastChangeUserAccount: '7rfqthkcb5z4duy9jmui',
                lastChangedAt: '2020-07-21 19:04:54',
                folderPath: 'rz5b6hezt1evvj7ayk0mmyqofarew1zbbx4udtnhz8fyywuqy99zfyt9je9spxzfhjhax7dqh6k0j9kq2gvn5m5oiyyvz4eiewb8l7842yaht0tmk9g0tb0m2qkcisnv2lv6u5zwdtmip86x8d6l351tr0gpb3gn04jwmapuw4l954hgs0sg1ybk8vz9gugu2kl730wfvq7nec5om23fdy6wqvcdl03snasaizzhwm5jx46xnhnbrf5q3ujo0ln',
                description: 'dr5c9kyfiulot0irk4oj67brx2eesl8293gpwwc8om7kf0vj9w2hubl5jnzf9h5ss4m6ajjx0j0el6r6squc92wuhzg3gabygrte3omboxe69047w943x3p0j6baoa4f08nbz9ku8z4ra1ae960b5hrin7am7kr6b76hjbokupw0yidacqn7e026hr9u6rbly7a9w7xp1x2bg9v5f9v476gcouiz8zn95n9vw5cizoibtu6crjogrkj14757fqe',
                application: '8pwl2e3vautmarc3tcz9y0iz0udowqkpyfi446ed0tn5ao3elp1d5o4acipl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: null,
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'nm4i9rm1sgtsgwyqiytc',
                scenario: '8a8bv9st3p5mhyf9vgy74979uk17ft9yd5jjedoivlt7vyvens50vg2ej3ht',
                party: 'v56f7i0us6mgs8lruxb9s2ankj559yfobau3hjzj9bczgvhkm9v9z4ymog2pt1yifc8dy6ateawzfnlmbtzbbu0wenzdwozmfhqzom5g56iulk7uxx97axy5qlc2v5gyse57g5z93sgl3aoebvtcigw2r7qpqc81',
                component: '0op8pmz2a2fxl9b94c0nsz9f7o424yr8hvvxyzr5w4b1f88z6h2y3t6yx1tpmrdxasqnc3ze9ux7klielawtb0e1wr40xujw8aarpvlzf65e6182w9lfgy7ikrs89xivl2zryhvwlql8wg29ut0u6lrymvvsxyz0',
                interfaceName: 'p9928iysk5xlvw82qfg80m6r2fe7hgp8wtffqob2fphm43zt6n1ozr3qbu2l5zb7o1j1pkdsrssymcvwhfsqdaulhny2n8zum8ufc6m8qw4vjtmbl7lx9dv6ic6drw1k1vfuvt7jcaxoi14kgvofttcaecyfxnl1',
                interfaceNamespace: 'km6n4a7wgcjfaiq6cwh4xyvtv059syeiveu5v10n10b369srtd4exi565bl8brqbg6e5malqyz5fcj7nrf52f42v3ouz7s0s4hmrtewz4g56ezay9ecggg3eoqg6ppqa0m7ia9k74jlb45d5fv27zeqek9du2n8x',
                iflowName: 'vq23e6sreuif74js1l45n3dourikxp9863unmtqh4rvfl7k565kgjmr8440owx8gznjelfrflhnjbmg3d6me5p2flp0wsyvl5m21ac4yrqa5zgryow5bfpj2dtaitv1g4wsyt2qgi9gz03872vxfa31xff049vwm',
                responsibleUserAccount: '9gyj0kihvkmadxyug9ni',
                lastChangeUserAccount: '23qfnuxh0mtqkrwucppx',
                lastChangedAt: '2020-07-21 17:45:43',
                folderPath: '52pkfxxra7xlkvxsfkl525vfrxy7hz0hwp8ncq6am0kq0im71sj718xizthgd3yol35vksqij0t7a78l4wcqp47dwvb7m73jqtge8yx9kest2ghou7yvtfdyh2wr19cm1qrdxlm6eeifdpgg92ah3vil1j4fsmuqdxd96gx01l3d91nmv2punzppaf8o67o8siwg1kijzbzctp4vxio23ph23iz6prdlbv4rfy6v11bxqhu7dd1bo4xs3bntbxn',
                description: 'yitcrggshwfy21rc2hmdggcmicuo9dtpb9sfoh8m48kik55ht18izh3fdzri3mqqtii4q2s8m8tm8ncf1mdy548f9qxz60367vmzmmrokcppkuutvocpwaof44uizw0d026wevlrm1evwe00z8m0wlt49u6izgsstx043i5ggekxiei4dljx473j97omwuwa6k95rvfhpaa289ev46fq80o4j0rzrmj5dmypaybsh47zhnhxpgv1v8nebfrmyyc',
                application: 'yyt99f3edrqk8dws9nac5y162pep5yqqt7gk0inv7ais7wkrylr1xss6m8pu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'tzx57772tujbqwb5mpan',
                scenario: '09fqn2mewrudpc001fjq0uwnz3xuekszk01jon2rjpdawckp1byhhgy2qdan',
                party: 'xfx9zlhzwamjx2xilv2ew8wrukpgcbt5snxv2rdhb7l4t4j4y5afq1k4k5088kspxd93eryfikn65i5dsgcozicz4zz6vzl8iwc4pba3x1rtz26zegy43mm9kthcfdbyi2iq9j7fgxf1gox30p6nmlzdehitedso',
                component: 'lf83l0le08xvglu3oo0pem6pzj41uz960uwtkt227ublvp87f9e1z4cpajxnpum2dpujz2igqc3hpp7l93z18nfs697eilbto2b3pe48mjvungr33fz2r13u1wjqbxjge6m8xyxpg5whpzfq0kftz40gy180ljo3',
                interfaceName: '3zq6vlrc9f082umem6v6pz37edf39v72g5p33x45s368g532tods0e90f6vycndsxmzddg8ieu1rvbzu91cb4u6af37drew4ys4t0csyt4aoephq1swz52tassdnqzt6hxndv5b8uojn1b8wcy6kwf4qyk55lr7m',
                interfaceNamespace: 'cr9o5xgk48i1nt6hy4rczqu9ezzfvazw6z17hpmz37zlubbq4n6bibcpi0nbtyvvpxio1fl4uqtskzvow9mtay744hudkn50vdyio0nrnetfve5uf6wqmwmkjm44jr144svfdypiwhdcf3121cpiebwo2qx71icd',
                iflowName: 'dyharsnsbmunywd68i7sq6av1sru21uu2jk66z27pqnx12aziq32nuftp6z9vesc54vwi9kf332j6eai9m2sb3nwgz2chmyon42fltaplim8p0b2g5tpl8yiiac6mjh44eabusuq9w5fe8glq724jqmr3jzpba78',
                responsibleUserAccount: '0vktx4nlo6x7w9sha2lg',
                lastChangeUserAccount: 'yh85w4c085prls538r5i',
                lastChangedAt: '2020-07-21 16:09:34',
                folderPath: 'text24cn3r1ylynroq2aho9wr0ce2p4e9vapymnl1p6xw6tswth5sjuyyhe2mrglxnmmrr7epqaj4rjbdx45aeeryhp8vn7q7bhcfh8rw460vwzfz9l1q9y63yr4ijb3zklrr2lnr0swyaen67t0m5e7pk067w2efrtr7zo9v1d1d4d3mecanatfavx3gcprw2go0113nrd9xmenvt2hg9x4s192s1g9mxfebi5e0n3m6j8fwd4bh12da74kges',
                description: 'lfa450ro55h56q7sx0zjkctn8q0pidsdcwqn7afsf69f4tuave6s2izw14c2bcee0xezd0ihf8n548z09r7d8tz56mtkykujpfasl2gzfkau4n87lifsijqlp7ravpgj3rpxlqjqeq1vlfb3lzmanbkqillgv2tkiq961069pwykwtmu4dr3cnm197svn8xx2uty642lq692dw3r5cw9gqlr1a9zc06owf5ai4n7o7y0bf1qq61fe9hiesnyucv',
                application: 'm0zttoodon7269f0jbj13qb2dqu1jxu1poueq4mg6dd1bek90pkvcq1sd9o4',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: null,
                systemName: '6jzdparyqp6blwm2y8nk',
                scenario: 'jcsa8butil88xge0caqcs2d9z3n67jyehpibeep44wrkac9ttfqugr142r00',
                party: 'ojpkfegu6gzbuk8eqs43lmhud0wd1xhia2ismmr2flqsqcq0z7d4bqzoj6mvwfr37o609e7jg41yr2knw04lakolr0itcpt4uh16di9yo8ey5fox2vmkj7qtlk6ohcyjd5j3r4c0e2okizd7r9b7p83ani3fg8bu',
                component: 'j78c2iemvjl2kj9kflclyf7ajxfqp52s96b866vltgvxdnyeigj65sqgroevq6ed27fauid5nt5kn5xbc953qox0c45f9rmwx81xhzc4tga3yedf23bd21q50c3ak4qcgw8bd6fnfr4pn8vf32x5115kd3tu6m7q',
                interfaceName: '67do48y36eutp6882ba9kyxznagn8433jyrzi6trmzj6ev7s4auun7rk5bzpfhlob4rdd9bkr37p714b21gxacbvx0ssmyle18z2su1gzn1rue5zu3m2h56mx6afvanmf6ibm100vv75l9px57lse3vx9mddyr98',
                interfaceNamespace: '1h37n2kyeyv8usyvrtsqyvru3galiy35herinxugcp8j2wbhozx7xvc0t0idjbrx5jgde6rjz5ixaqt5mr039e50h0qsyh29gjp6szkem9ii5j9tknpk7m3lhoghe0mlhbrssucyfjkg8qadyc0o1natburw5vd1',
                iflowName: 'zhu8q6yq4379n7seiadadtpz3ziif6x1t0b4v3if14zzqeoutphyq1dxswn5j52oqmcho2wkux62u5ruetpf1d3ye151yh77i9lbyrm0htvfq8x4xrm4s0qyhbgdbqkti5zebs9au6pqj0m6tc74ohznv9xynjyh',
                responsibleUserAccount: '4epbq6qquizkjkgwove2',
                lastChangeUserAccount: 'nrml1o49ugcw986lz4qd',
                lastChangedAt: '2020-07-21 22:05:25',
                folderPath: 'eynjfb3f7jgbl3zol31r5lkryqy1tau944jek7yto15xtcdar8y18vita8r1wlfnpmy5y71azs4oz3bfe8it0l10zrgksz8hhd0mlffduom1ntune3injukboed9gd78lui3vscjyca5r5zclv5wuntluhsje60hhucxo4n7or2h2m6ogqvmvbdi4aohjmyp4hn77xm7lg6otep4sntjexk5st2rrkxuo83y42hhtrmhp1hxpp0wwi6kohjn38f',
                description: 'm8i4kwxrgwosiscfwenuqc4iyv6isnzrkvxdanra5n0td8fn0k8f4vh9km7zcje2bavyji1jrk6jv5vziqjh62kidd6l6stui64qcq52ztizgd565c6k9bjytev2nmsa17e1fp8ubl4q3jkebxwr8kc18qjvv2sa04qz1qto2tnv7odch6ue78y4f0t5etipluhnkvdfbob5qtdzm3f9p37jg2fqiz5yxm9e3x1b7qlvout8h18oi7e6d66skod',
                application: 'h9u9xfkfr5yd104kpww82945ile65p953jilxk6hqfzfibiadpzak4lhnyks',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                
                systemName: 'jsdwgg8tos1hlp7zj23f',
                scenario: 'xyvflhe3cdkbv1w5lx8tz8c69ckm5xhsa2j0fg5tgt4vn6rxmx07ov1zf5ge',
                party: 'fbsa3mik2sdr1lkxhgwhgpix6t9fp7r3itwr755u4xwrofrs9aprz5riu8t8tw30dl5kcwj2kc4a9vc10iudgd5f97e9r7ebziy5bjysczfdd8ydefl5yd2ki1mxjao31c6ublwifqcns6p6snlk7ya0qcx0owp1',
                component: 'ih1m10p85p2svrq1gr3ayve77rolbqawdzc56zuk00egmjtaups8411cj9n2jq4m5osipawp58a64invpv7pqgpyq1hnbvyf8kgdelzwzgj03emzm7picw8jwavb3da4i1vh0jnnwf3mp0rsnag6ecyygkry53h5',
                interfaceName: '5auuv0wxrq8ia4t355460y6hm6v1chc9m6k8byvgxl5w529ywr3ppwffy1xbabhe36rso2vshvdmqfmih99r0ffer6848nnsy7ld5geqkjj6a0262uhhbwmcitdlwb6l41pzx0ubaapdnzs2pijan5t2m1z75lgi',
                interfaceNamespace: 'jxhtqyqdbxepdx0iy2u5v3xb3igzv468qt00ssjndxc0p6ninphxi21mfm6pj0h17zp0vxsge207bvho0unmmqk2dgb5zzm7fi6uz05cvrdffag7p8vu8uhvoaqeziubwknxg7u80fq12e1zu8c9f3eu0y2lwaaj',
                iflowName: 'l5ap5va99c9qpt1a8c9siuvcuhmngozcz8q5crnzbiw51m713cu7y8svupwrr256s8jdvfr7dd5oqcn6uu1vz1onz230u3ieu2t01tna89epjmcudt6cid6qqsl0v34gn1epwmn3bb4e7afyi0iu3p35lkful9f5',
                responsibleUserAccount: '4prf9f70ss8i0ws2st74',
                lastChangeUserAccount: 'ljkb26kzyjpbdosohqr7',
                lastChangedAt: '2020-07-21 01:01:31',
                folderPath: '3wm0xv3kx6xmi7r3n4pyxwobkjvht51nnskk6lxyh5bvpw132io44v6q11ojd4eperalb4vei4zwvskz07qp02gdhlf0lg23rne20d2dtc50vux3p1ygh9l1wbrv84kyzp73tq6iiz95jb2z6gkq1x19emrif23x05r5k0rv20iav2l66u9p64eyiixb09tfi7x23p46ep1qesqsmn16gsue131hrz7s3oroqwenvz39eg3gt27fagjpd1km8w8',
                description: 'oygaepn969ppafx9ct4adwbgiqiutp5onw1pnmtiac9phxnjhoql8lbwq6gpabbb9xnu2k9y1a1geux6vnrpn4s6vsnym2h7bybx7gofm5twyxh2yctf39jfsaa1gmdrrc6fqwl7zpvzzqwvkn8vrozo139j9h4wqp5t72inbh4petee5dm0pvfoh6rw7fpptpvbl65ipjgmihcalax7u2ttmy7uetujlh2qz191g6aokbqwqq1nlevbez4pkyx',
                application: 'ofa9j58u1rwa3s91kfaxc2br499mkx9iuqk1m1op1umxpyeg6rqb6847r96p',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: null,
                scenario: '8m8yvh07g9hclklad67y90b60xwxsjvlx9bc9qh83ierho2e61hltlwldeq9',
                party: '8dlvd1ftd3asrg9kacn079xbj2rl2fzkfc1pv65d2qh597o0rl2pxr6fzuzg7bgzqvcwcetq3101ovf7f2zl3zlrowh2br4a49sm4mi7zu0t7xwklt51xncig5wht4c272hk7w4te4vwl0jlp982ypgimt1rn18m',
                component: 'd0337tkvmjsqzvc31jql79tdb5ozod1k4lrv75ujcty2khotle5x9xgm5e15h2fx4hvo6b4bcndncpj8crwx3m8olupcv0cjaf5xh3cem22z7c80t3ntdzwug9iq4xq5nicy5m25fqvpeq7gqv1dx5yv0mj6yt5x',
                interfaceName: 'vy4vk5z45wx1dkh7tyjbf8338gndqtb2683al37ohqyjuhu298u9puse5tcbcsods9r40aoy1hvz0ba9cwloh87f4kt4coyq77t9m3p91aq17l66gsunrrvquvz7ytbh2q0szetzvybjfi1s3s07s8xksnq08vtu',
                interfaceNamespace: 'o3z2rfqgv661m8bw598zfn50a06nsbbzkfx5rspuspmt2o3xy5faldp9grq85pdujssow76nv00wehxey2ajshl1rqerh5yqnv69mrm3x4uzew10mjnh6zonk07vs0huvp391gcoot7qnymnqi9zgti2wjlx8a9t',
                iflowName: 'tnifr4qz1wpzia1uuisuwoo6wwae6d8nadg7zpdwxxbux50mno72s52vohh4eoxix5au6d7mpm02000ak44sazdc9ppfihr14rzgrwf62jwjeqskskz84277rqzbcyglnjvt86dihxxdluqeo9o5xay1qs297chb',
                responsibleUserAccount: '9x6mrswzvn70vi7y74h9',
                lastChangeUserAccount: 'fztjco55fixxhml33qax',
                lastChangedAt: '2020-07-21 18:08:39',
                folderPath: '4bpwzza01y64cs1pwfsdz0l50yv9zc6ermfwzxanw3lddxd6cgc0al78mvkvtxxxnkcq1ivf1lolk2jgos2tefafsii6soiknedl72a1pdg2mma9nane6yjkr4xf19b9yr1up4w9t8fokn57uqgo9mvhtum7vz2e9szl0qw0joh45n90pc4u3akwyf42uqmcamntheenh13ndl9kt4rbr1ud6jisf3k73yxa4rug4057uefzie4sl6lz9lv0g7q',
                description: 'v392b8qdgh0q809x35fryx5x98i45abahcdrdbobgwemimi5mca5iuwfgm0auay9ncla069etqa8jvmf66inetgfx143xjyteyxq6ykq8jmy0vopd2rg1q458bvlt4x3jkgjblhoxi5pmulqke9ciuq83nzv1mzxhwfxx44iewvf0qq9ywe78nq4b23pz9uz59qrlr8jbiip0bbfizvhagcw2k0tf3csspo7ytv6cma47da1f8s1g3xvcvnzgo6',
                application: '1kx3767k6oev6iv2aywi3ddgdgtkk29p2rqdkdbc5f69qkn8n2onooqzwk8f',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                
                scenario: 'due5hm4qi8ho7bz41tk76ur0tozv4ns3rnvba5vxo1tvswckts5t9qe6y338',
                party: '64yoi4hkmc2e429uns9v690ljwhi3utpgef2677g2t2aod7ab3yl2qvznpu4uylnpe4wdgspiofrhemzz0qplvmzp3asp7ofhoitkxihh0e6kh87szx11amb8k65o9272mub6k80niz5cix0omynfxou7tlsehy0',
                component: '1wklhjs291lfg6cqim6slcxswqy1zvrrr9n4djikfvm14r8vmpvv6dp3j9m3l8nvlffk670ubafwyfpvx867pynvp3nw7rnwzgrei96qyjbbgduiwx2hcesd98an6io89253g87l4oqn4ttsvsd1vbdr9bz1eqpo',
                interfaceName: 'ry9g7zoo2r5aeozv8g9b0aom9p7i66k3d49xfh2migprqgnaajp1fdiuxhzinlynd0qv68sdw7pa9tsrh8d3yh3ahrzrd7yqd8t4zbfb419xchucgdvdjmavg39uamunn5zt8brr5iazerafe62pm5p8q03zjkwi',
                interfaceNamespace: '510oojpriak47l3h52wdpvpvmhzcl5agojb3im3ldsv7vuvqsnw4vxr46wmzfqcibnucb0p04ckab3hsq1kccer6dm7be8y8lzk2ostbgh5mklemojdb5n7qaium8bxui1bfy3k71i2byy27qgwdb5izfz8j2y85',
                iflowName: 'wg0ipzrg10nll0newrqg7ibcyhbr3y0dsnq3o2c8e4k0u3u9gtu4xsv2ywoyi6iby4c6h4wxo1c544azgazru1ozxrfb61xdheda5tjeos61e1bjfevrwwaxl2gary3qkb9s5z1tu8rxwrnvxme23zp3wfu55xlw',
                responsibleUserAccount: 'tzyiyb02od4wcndvduvd',
                lastChangeUserAccount: 'xxl22dcatxuay6m4d42v',
                lastChangedAt: '2020-07-21 09:07:48',
                folderPath: '643d38iukm51b7d9sldiw42elkm3jhb9nnr585gecbzwxsizvik0eief20lmvh2qj34529rgour8o6zbtu8u2jvqr7qxzf1t2tny88n0wexr4s86ii1br4lfi4fu62ogn9vyrzrrya1awywbybukxjfmly1bsjynyxdg1pffb1qeurcoxw72os56ybwxwspr57m5ip2sezptpzmkp1vwve4qpeev36z21k9ijzfm37v4a0fls6930jci4lqj5f2',
                description: 't78gpetijfkj4z4gjqdnpog979sjibp9caxmxx6pj49b96spa3vcslbgfb1dqzcdg96dgkfsbicx6sgrqoon3y3bhfvhmtbcsnpoo64c794axj3pv4nzejd9l5zqlfa3z2q5wk9eo6vd6zc9c400emxon01i2mk9wv1t8k63rzvbmo3dkvyi2n9wwnkppf6c3mdxwubc3mrx7f11azuwsv1vj63sh8qspj54s4be1zz06c8c6a21in7d7b8nth8',
                application: 'kspr7r7fpr7lvhctwqdbgbstswtb0abevbh5pfbnof9tt6fddwu6vv4k84w1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'kwdg2pq0rd90ihe4md7b',
                scenario: null,
                party: 'k24wejec4bw5r27sdiscjg7x31f05d97661hu3gsszgt01tfv2ty8r3b5754zjw2w1ihdlpdl70jv46uygzrl7bt7ijltx1drrwabzybsf4xnb3k3smthz7tkykv0xtziymxx8i6z88kbb81ljlkmu2p972f9crf',
                component: 'fzltgmqolied1gzubeibt7q4s7ml5ph0ytu24nm9lgtvcrrgun40bdd2qewiiv8uu1owx5nh9ia7i3dbb79sj33p7m8tbklj4hr8nfa1n2y2789i34sr9eniaaxyiet9o3gpwbi6qzs966ginfvsc93g40c07pwg',
                interfaceName: 'r6rqcbfunik7anpv5lcqna0twshnyapkd9miveqpmyb9i4cz1ath7dguuaj5hwuorzieb6exjm7f1hlplixb4y17szgphnka4kdnvbj3kqmsr5b953y7q1urrc87s0guxuo2my9bjq2acpwhvua469z3q4t5ide0',
                interfaceNamespace: 'agbm9um2f21khs7h5n1jd11s4bbdcvvicz5orvdkgx9uszhbwm7hhniv8h358yqjytecaifz7zo1rxsa2kwtrsftsjag3a8y08mswhrhhyxkib6hy0jglik0aoyq6au86tuqmf1mkz98xdplyymzkwhs2f3v3v8o',
                iflowName: '9o469e1wdsfc7x19zrmjsone1khmrxywyxnplzntwvgfp03rr38y8wd8c4lzn8bxceqb0zxwn4ajv5v380h3mtr8d1qmt6kpqo8tfn0fauxdohce7hmog4e28javlnscslz20rru0an7xfhm7tloqne0tuaswf4o',
                responsibleUserAccount: 'fstm583zw60ucy3dj41o',
                lastChangeUserAccount: 'oh3wgibae22afndxvs0w',
                lastChangedAt: '2020-07-21 05:24:50',
                folderPath: 'cxcaq88pbgdr8fi92bh6zkj5ekfq9izffes7rpx84p1hvb9fib98zk0niwz8h1l5gcwkahgdt1plitxu0vyqz9oxq9jtqa44q3bzfzhqqid0isfz5vopadcjhwdgvypb09uu27x4wsua54h5s1tsbrffiu8mwwqltulf34jpje8hxojimpqy5sc65nze186br89yanw7ol26v96w67jn1639x77yuidwjrxaoh65c9zw87369l06smf76p3tsum',
                description: '4tnj82q5sdbwxuznimk4soc0twckcrf520h6t2n8s5pxcy45wfis7a0prl4iebnu8pvb2se6aeb2uz39dkzosesig3pm5z092r5pten3eh7x0vmjqqzrpfuh158s3jjianpyyoq0jnotp9lyznqpvdcct4xywdex37o7r482738unbsikd9di8dobeub5ggamky9dsw4gsgere4zdxs7egzwd0yfw5cptqb2zfkgxkez8sbhmb3zutabtnv2ys4',
                application: '679qbod005i2egg5gim8nwbmw3sbdjvirlivpxj5qzaur0l35y9ngwm8j91u',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'kmwzeeep2txvnjckqdl2',
                
                party: '25i6i4v7c1h8kibfs23w41xf96mgd7yrqfvrqhx52mfva5q2oztpvxve9v57wokbxbo125zxlab6mt5bxoenojcbexzsa4toqtelsta65lnr88ktujhu4eph2gp1iwvhc7cr2uhr52luk1xjea5srlmy5y6xo8yd',
                component: 't9xebsztmkjrnj8yn8qn3zroet1t8n0488fbfgzm7qoj4ty6dp6e26w2xv166tk04aaupik8hy1mcidhms56y0caj6yptfwpnvwu0beqdlww3yukhs5e5mf0lfkl03i1gx4wohnd7z41pft0sofhp6ym48vpinvf',
                interfaceName: 'l3urdsy5gcrnh67ucgkvpj7e59075i3uok3n0qrehfd7vgfd689zsscizfski15c8lrh5p2swv85zgqidaa8j7hchv8zmwlxpbnfserasyumbvxqg04nta6574vn59vt8cc76h7friqq95clhe3fu3bmrq49snla',
                interfaceNamespace: 'utq67v046423uooz0i2gxwxxdpx2jcl18ltsc3c94yuwh2oeam6krixgtmxo0kef1z5bmwrcq371bgwhvuyb84if8zry1sqtr99uvicwbg1jf2w3dx0radtz034sjkwnlu8sab64ovsbtzk4q3e9r7yzqvt79ias',
                iflowName: '951sjumro5hck7rcctr66l36oouo3bp18u1ipn0f9p8jn6aqlrbiuh8bj16o9mra1h54i299i8tkjcjooj2vlm3th1gzeo1g2afztc40r7dxvo18vhltwu1kq3j84droqwmjh97zjpotmvpcyev55oas8pnjkej7',
                responsibleUserAccount: '5ovz17sko15cr06si066',
                lastChangeUserAccount: '24mar6x5tt9rd4apyhme',
                lastChangedAt: '2020-07-21 09:36:18',
                folderPath: '7jjyj0s9ho6rw63r8o1xp1hu9c0lptd37oxc0uvbxtzbmf9xboooh6v39dcj7la957omz7h6wo8z2vq8eq8nz6hv2xvhuvqcbt85llrjw9o0kbhnpxonk8go0be0dwm7e6jsl5zzzoxvaevw1xqjeu0p006ep4o1oghnfjyrpy4p997x4ljdip7hh4g9zgfxm6p7t4cx50al72ji2mhtloidmowg3wghs93kex7cm28ssv6nqfcpl0yrnb36p4m',
                description: 'zm8n1x8qg8ijjtjsw03r9p2bbu6n955djftchb6z63pmfixaksn7mpg8y0q8a6mbpzn1its4qvurusa14k4zg2tsszplqss2eor4b8f839ltyklhm6fhkkqp0wwhg5ts8hvd39drnuizoszvcwkh27t7h1ldc4c4c0v2f9aktnublxovg0i49irii7oyuysiylrpkbt4b21vx6jwawx57620w6lokb3t7dxdjpsujc4e6o284x05dtzq3mfcur6',
                application: 'r66sry3qaygoytt2151rw03a5jaa6w5sie8q4yyfrcuz821x529lrpl18ifn',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '9vr9m4il0mvbll0bhwgo',
                scenario: 'ksxbv2nwpqpqvib5ajyqm6lhhjt4ipmt014s8hghbod9uixax72drgkn2whb',
                party: '0dqtnekypq3kyex5crzyt26ntg9dikqzxduje51bc8qnbine0oxl7u8wlum8ot1o3a3vazvbh52fwtws4kus03yq5r0hdrqli4o5br7yvwn2tb63jiy6sdfkyg64stcbmoloywj6hljlr42yghpuzbkeb6kv52j7',
                component: null,
                interfaceName: '9n087lnglbsbeb7afjgx2umrljqoh8oue4eqivf50nsspuzuivcmy5enw4ch4zfwvw21ckufoukpshtblu426odpcjnutz0jcou23c1rfwwu7xu0w05fp86empr7axwy4u2hbfgabzi3z9qms9ivzh108uearbvt',
                interfaceNamespace: '4ripau6k6zt8s35adppgwjs8td4cf1zx4b7rcwt6jfrpcmriwfdymk5svra9c6w74mzau8tpengdin1mca34g0lzrs9qczove07l0zhooe400m6s9tuu8n16cpfylmc93u4ptlx70rx90i8dp1yqyxhxinvg7iqf',
                iflowName: 'uxcyv7k67uqjkwvcn1v519wesac0tgo3yr6oudybh2bwvr5bcxhiu6nym3s27eeitg3v5ilhft4sspv2wl653uvff107a1lde7kmd2uoy128f4wptucltg52s2v2wx7n4jtadt3pjmnve7g5pehuvi6kcjj3gtjh',
                responsibleUserAccount: '5069eq54mj098iwwysxj',
                lastChangeUserAccount: 'nyu7qook3ynucy1vxzzv',
                lastChangedAt: '2020-07-21 04:45:09',
                folderPath: 'j9lqj5urxqnrtm6x1t3ezqbf9r2n5xsu2m1ffb5lrvd2xea6pfwv0uozreo94x57h83l9v00hyf38cfu9qngobhv1mxlp7fqlxqqy895iophts4vqhzep41p7b99j0n3j8haxya0ipynisxg9iisfw7cu4md6w4d41lz76ii2jj1en2zner46w26f643v51zuryixyxnqb15sf5daffzf9wgal12hc9av8czmt1bcumsuusit60upq3qptey8jd',
                description: 'imq9aaccd53gmsxypz0onygthzmqjqjqk6qhp16iyqjmdvtv5vplrvqgnqhtdd7nzzyvbaaq79tgehc54gl2m3l2jl9hr7vx7euus1ocnjthnj8e87uug5gqssrxj3dwze1rn06yyjc954d37zuesnl3cbqwkc7gl9jxi2vwkho9f60y0mriedgwhyp80ecfz9ooxmiekz01myvliabz566d3i0skx5m9g9wpn9j1vzzx12rvtmdenqa2plhg85',
                application: 'zavvbz9m2vyp3o2cmfmhjie6mh9y0ks6hpk74hd372ma1dar1az8668togi6',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'why7w8kwa24fdz596dkm',
                scenario: 'yqz0829wm0mzmty5pj2wm2nudpqqfnkzevey4fqktim1j9lyh3g4orc6kk0a',
                party: 'dzqgtr86ixvftp2vfkal804gy2kzz98073v15x398l4whrchmqtate2yuxmb6186xj1n5gbrbhw060hqy3p415dq055puv8yh32711s123yj6pi5iupgvujwa66pskvli6teoatpfi5uu5298llarako0q49xy7y',
                
                interfaceName: 'rqwk5juk07ezaktk6odjp1t20i73tqyz43b2g6ihoxcgx7bql76owp1gm6uc0a9cc9c6qscqmkhwvp766bkn62rl6px7738ghgu43sfe0ol7ygm07opqkxgqinvtrtnb0uab38uebpjn6jkxz802avnuzl1iwzmt',
                interfaceNamespace: 'ghcx8qnbwcullysud7rpgzo4kz1j3u7h0gu2234ftlt0zuh7c0wru0wtbq7as6pnls9kxxp4w5q7byhc3tmxqmmw3zonqz9ex3cxee05lmidr45i47lxhztpcsstultqmdt44k4cktkgrhgm83gpdl3dh32ljr1s',
                iflowName: 't671y169fmjv094bqnxnkitunwgs8s216ag2o40oqsg2dafab6n44731m68ccyq0wxocchfcyk7nsdxkt6v34e3z14jvf5q3kk31cxh18z2fb3vovwiu31hn0hedi3d3b5uedg7mkhvqp48fy7gd4d62dmq1lp4r',
                responsibleUserAccount: '9hihbp2n17aoribhypnw',
                lastChangeUserAccount: '1jg38go0lhnhvuubkxt7',
                lastChangedAt: '2020-07-21 04:25:27',
                folderPath: '9gxse6ylo39qlvuhjjhptyzjxk5gqwhco0038lrnqikcwl9qs444yzo0eby1cjcq15oa3flbe4dy1ubl6oawa37fn7qdcyw5o9p6pi7z2g6tx86ac19er011ogwqak8lhjlo5ypwrekpcj4838hlgfmp97hculgf8z83tzhc77ywmx046m44dbywj8yo7m7nrnam39kt6ycow22do7q1nhn59vua3ymlzovjwyn1002odfx1hc92fqmi1ichq0g',
                description: 'n6apv2521y5u5myoygah0n82dj3b6yc5rf0hsh2vdhzl7s0uawmlrwtqlgl7kjy3crxs09wi690ihujnr5ig0327vjhr3aqwcbby8otuqfx0dosb5cxrbjuoviu0t82njm3c2ki6vsfxekyug7tqqeh51zqz173m1aexvh100n19i3qfgdc8gq3sz4om7n6zmw2l9oxto4rzx0xz4kvozc6z9dp0bva7vd9afn417e52mh2ifs6cu2gjvzhw3rp',
                application: '7n6wk33rpmrouo2jig3rzmtwqm5zc1hrefp45eggkzq3ign5ghcsu5aa9gwb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '6w53pse7umwrkpkjjhnd',
                scenario: '33b7vz8efzx76h9c26e2qmv4zb81n8x4xvztli6bx4ucq5kv6ok7tvllkbus',
                party: 'ov0gnmruyxknfyysen3pvqmpoak2ta49h0wyyfytdprop6v9r1664mrdx7q96rv6lqdpd5jhymth1s1feuqf2nskyrqc1cath0ancibnob4nptgtm9x9lmohmd4fxw533wy3j1e52pyoqrj3ri5axdfb0yqw7vf5',
                component: '091yrulgjavvxvzetw39c0w2gvmc4kbm6t0kti7nokxd8ggbnxs78h0auqi69hd9903ppghqe1fjvrtdsfoymwyhe129jtwtmz9nrf44egnzhhqnikihiwgbjc3ju0fx6x9519zvd3btaft2o8o2g1bq808krx26',
                interfaceName: null,
                interfaceNamespace: '625393nmyrnzmwdrb01op3cgljn4l94yg8e9ahxkpdqy6iqp4yv7bf6jkwvwl2rja420qwpexl067d2givug45jmg3csfuzengnbvhj3elay73dhzywn9gxm7efe6dn2miw45yu8lq64srd6zwgb73dazqh3hote',
                iflowName: 't35rnniuvn6ggnts9otgtanz93yxju5g97s88s4ad3i0ay6mvic4xjocz4opx1gl1933nnbn1gx5gqa0baw27gy4z9hcyyuk2rv9a96o3e0vapmwunkbu4wzwqaorxsog6wsf2rrws9wskxvq8903cwfgem335kq',
                responsibleUserAccount: 'xfqyv38624a6z6xg4hal',
                lastChangeUserAccount: 'cllf5zl2t08cummrgg0b',
                lastChangedAt: '2020-07-21 14:20:30',
                folderPath: 't4xpvms33b0rsp44p1ntyceyn4zloj4ac347x39u5q0nwcitohs3vawxyiox5o3hd95faymtor5xz3722xzcvhfue7zcsnhe0m4nbrjkaemy3gyla0rqs7b4hlisedkkdh8y3mfsmp5w54my3t9b8dqa1tvgba4907oi5g744borq90n9664awhbezgt1inkl1cjp3p9lis55g029ydl2lq2549ltn7ct3153rd7r96gdtke926451do0ee6y5f',
                description: 'xbzc5xuidg4t4f7474str4txj85h64hmjryvc3lal5mva5yaxr0ifg1ur7ixurg3pg0gxjh4xgnf815dudnpbka329iim2g02zxio174iygg7e7sqhktzvcjfka7t6p9j54bgn6rh7lhhfjazbdxrhcb36g4y33har3wn70qgn97gm177o1suc502o7wxbosqns4g3l7xcvy6b2f72uld6qeqjrpha50p2ffsmfi3t9wonvj39dmxkntdsagnxg',
                application: '0045txzn6mm85mol2xgx83kp1fh5qup7c80npjgz58ci37j504jcdf715jxe',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'qjzqygkgg9qutkcdb7cp',
                scenario: 'j82ql3chg0iafiahdm4wqcy9o3viqqj4dap3r09kmwrcy7yu86zamktaq5k8',
                party: 'vp89ja6nkr4x6kdbn5mh7fvxmjtyqbu7ykdgaiqvzf34kdbacwlnyeyjea60vudncmk97f7p4bweey1m78oe98ota24d1vff6mkuwsps5phzkck7dmb2jaraqi4apuo757px5tga258fklz2swxvwwnlwss3xboe',
                component: 'wvvs9w4p6kbycs1dpgxwoq2v9i7jxlu91eyxanj1kkauh2732zxxtq0baz478272vq4euj989uwtlh1cvlsnmjnhdqjkopgtjqh4b1d2aewbacfw59l0fs2c9hj4pq3n1pob814wsw8apq4axvpwdwo83s3uag7r',
                
                interfaceNamespace: '48lljyahg22id671tsrtoya5p25kixr11a9tovgtma9026ddeemx5hydvb0zri1onmct28eogq8smsl8n5u3mnodup5a2hsa2kko1jfcqnp3f1o06ejcnvxpu2nog4fc4bmflmj0rz8n482ludomco7l58e1h7mo',
                iflowName: 'q3353fztc12arsiidex4j6mtyq74lschoaejnj0fzv9ztltsr3qg4lw84fle0ftl84nvlwfktmd6n9qcx6b16c5xm5a0q79myga7x1hxwufuc77sqinzvjbkr8h7eyy3jvyqqaa0a0txznktzxqm5mo1l8qag4v0',
                responsibleUserAccount: 'j6klnwi3ijxokp8wk0l3',
                lastChangeUserAccount: 'jurv00cfgk02wud83nth',
                lastChangedAt: '2020-07-21 20:47:54',
                folderPath: 'ucfkoa3rsb4mcbyd8cb0rr560cse37pvws87u1arj6pxcaf48bfsttedoqlknd57w0uypyzhejuopal5nwa6sdk9j4r77prcrsp2xiswnn7agt70qk77e8wahviqouvipqaaclyoz6tdlwgkzdudmu9kcpix2sm6u3o608a8b6k4zls5iz54n2chhgfcna36prcrh9k8xc5jjv36823quaxhpqeh3niwexxm6t8h2b8fyxukqlpmarnls0el1bw',
                description: 'ikwradl8vonna9y1og955w7uoxobyddz5aqwa39zsqq49prty47ou5tr3463wmzs71jwl0x3f7vkpy2nbozhh31w4q1k2d96d28dmwm2e324ttx09kagbrb0jfcdz0p72pf3jg2ywzekhkpbzqjc2snmq0gkdir85cgdvwbm2sfv2vyfpdy4ia355ixyrngpzmrfjqxnqw9l42dx5n394fg4q7krzjbvwbsaqvye6uurisyo7w6mxl5yg8zh5pe',
                application: 'bqpcti5b9maosy8vpvkjrpt6s27i4pwd87j5p80ecf8jgmjao2xhy2xidxe6',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'trxm7my18cjn578p7yd6',
                scenario: 'av5ofccti4st67hktfqbce6qcvuzqw1wexdhub11rbcfqkrnuj6myv045i8j',
                party: '1prsbw8xiqv6eqrv79ay5dfamyrhbc8m7v81qtt98c23ah34v7exn9e3juk47v0gb4gtfk5zj89pmf2fucif87a7s4o5ty6ji7ehl8cnjaqhaccrt78qbhfo0ui57uyy58nnmduufa4ix8mpo1jfb7ponx3208p7',
                component: 'yp2p1acy5qecmvybvul9vwpkfub44nf7zn35ty7j2twk5w92mz2qa4ppleimdbhy7757496cd7rt6jl6fwkbborg23i1gvrsd0xwqrn7yqb03objv7hca0m9e60gjbiwbtgdrfo2moyxvboyyrws5ustpyurthnx',
                interfaceName: '55ionl2piz6mqnammoyjifqxfcngopcfy6afzqys1l0zodeltoa3w3fgkr03pt5ryp79ryk826gzbfldg7oixaj1gnf6it92l5rnvvoixketbhpn7sanesleu8kqepmlsz55ri0uuudsg4m19iuc6he3jd690f2y',
                interfaceNamespace: null,
                iflowName: '0jqej2vjxeilivo2f8qgnhno2ut7qkzbi6sv8w1foxm46u3o6615uijrq73wogsas9v8j5lrqhlei3sq4nyn3e70fmjid7cksm0oublsls99rx5mumqjgvft76evat8n30r2kzj2zhmbsauy5qaxl96e1kfk8tr4',
                responsibleUserAccount: 'pkv2yzi24uwj5mhxoswk',
                lastChangeUserAccount: 'ta90jx2rqzpichgnaf42',
                lastChangedAt: '2020-07-21 05:25:44',
                folderPath: 'w609iv8ayhf2ar9irc7dbm0dqzg36skaubr5gaokfujnjr8xctc2zdk1retimz129e9fh5cg017g31qe7f87t7ueywq83yam44nfpd2osqeuew74zig47j86s5ochvpdcn2di950fekdkkqayr0y7ns2x442vibxzw2cdh4gygr6xotozrg6gh0kb8cv070nv4vgqpcbjuw8uzpka7eb5nm5gor14293quj3fk352lf38vvj5di4szmtf31vtle',
                description: 'rz45of49tcrhtewvegnvccnpqe51b4xiqjaa59wspb6vqzuv2iph85xfu5goi2nr27obe7mxbgpj7bg75180zt67zghvxpg8uc98rx95efhfsljoks0t1ggcw36wbtvlrcteewooul23z3s36j3f592rivmm484po9j8fueptgujo92wm8iibvsbsc66fb30y4st7hg2w83v1c8m49fany34usdbycz1lb1pndkbzr1s7bwv6apwk7d1u8kyb33',
                application: 'l3xiqtpp2xsot9azww0ul02dcweb8imgvil0wxuij8hjpb654rn7ydf2b35c',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'it9v4kiklzpv5p9oihp0',
                scenario: '1k7g21mt2xv35drnuzgupgyr716i3pskc2m7oozum6kcmqxqznr15a1d23qe',
                party: 'c4r2ev1q311k5zfk4i3fu4zyx94eqcfq51qkvdfkd8lnbniv8vg3om8d9d3ur8nvbxrj0vqptz7pdb1y5gf43vyyngc204wo4r9pz03dumavk4bh2idq4q0osa0fumorxjq1xtgy31p1tgto50ofqcc6hviymmw4',
                component: 'hfmpft0bsydhsd4yjcuxkmo7iy35mybr8mn1srlpcvdzm9q191eljj2h50kcwrg2e3iokcljwmojao93bsjky8ixirhg36zn35jb6ifrtustwoc2rhtcl89xnhgm3abqikuumez9gvk229a8qegxafjss75i65s1',
                interfaceName: 'q605dilgj7shrr98p0tq76s29hjzy9m1aogxyyuf0lo79iu3zy0zxohbm23cpplq4zy1idy72aawwi0pglmu0h6wl8cuue9cwbs9a9lrrplez1wn8cxepg0c4sgn5okqkdwallxo50j4y1qef007t0cwoeug4fdj',
                
                iflowName: '3dbyl7fmp9io25ce58a9uhxpsm66t310me462o7xjyhdlkf1bq114u578i5yjck7g727yqpk0d6xuc8nx03xnz4kpj3oe1sen0gd1ku90zg4zysqg4z9h1jlzj1v3zvq0jsyzk4giu0zlkuc69jwcmvde61dkyjq',
                responsibleUserAccount: 'kdfkwkn8mrb0zk0az9ct',
                lastChangeUserAccount: 'u1f6lu351dry8fi31f19',
                lastChangedAt: '2020-07-21 08:15:53',
                folderPath: 'ojsm3tnk89zwqmjuxks6rruzs5rvizw1bc3pqw3kj21x29vydc3zx0ns37a1h6smgxr8wvdw5doznojc27nkstuzlutvuoeyvqhae50njtdql8qfftw5dx7u666w7bdw70rlf8timgxh0kuoyd66ebstbeod7inshj28n3rbpbs1ixpnhgxgzvsvqceia25a6dnm40go628xx4woqp4whb9dre56b8f5r5d7h2dufmwdgyoiaanukq1p1x88tov',
                description: 'tginqedaqzs7xuykxm51pxeawyr6s0uzfyzmi9qgs6wwxvrf3xosnn7ia1m4phdlsvcurznksxwchttwfjj8ywabbdp69sdcaew6i1ezgn4wyzcpowqnclrgzd5oxb7yrw4nhvo3tx7f36iawyluog60yxhnxz52c2nca2hofny1l45gnlho4gvswadc3q2kjofkp38uwvgqwk7ojmycm0hxrvaoz33pjm9ypbjrk91danhi72g47o17ai3v5nz',
                application: '9jrpf4sd5au8od43jitiwr76oi4uulu9w70yffujoeerpkkc6su2787vk9lo',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '28ay4b1b25m34kroewtw',
                scenario: 'v4sh8s31eqqxuoz221fa6zf67d8joo892vgvlz65qf1uh3t11n31ran5pe0i',
                party: '13tzjzgq3a8r0s5e8smzu0ml2jjhz8x4vn7s33b4xceyjjf2k4k06hw0qj16cmzbhqqpp44fm2k9dusp7kw0t2dxp4wln70pvxhfi0oxxrpotnowyysz4cewd2oc6ufw9yu08kokgnxw67uo1ylifqszzg0b838r',
                component: 'wn0eu53qu0qn4skmzxbayz07ei7o2dbg9zil6h4rcrx6oax53vbrx47u3hcsyqaft1u8ucvxztv10b0kh3os368a02b4bz4z5osegzl1k1g115qan8bwc980mg73ja0r20ejoxq06em6sg9xwbtaul58kdpwaw0n',
                interfaceName: 'dg19epnzfqrcoxvh1m22o7lcwt2cxqunsketgo0e5f5o8kbml5osjftvmoypgmj1l61ozb72sfwwin86k2qjlsab44sz0gl57yg4wy4ybglcwirbzmk0ysq7f37pau98p87z9o5z011xeveg0cx1tzrjo66yftpx',
                interfaceNamespace: 'nrwxqyvqedrbsyipqqj7rc1ak4wg9x2ud0bsr9747bu8g9ifgwjwr2c6pkfswjv8do1zr63or0c7pom58mjc34543vvcgf5xbga4e3fjogobr799ubi69g1ho7a5d2sitiiqr1xkp8q2nkhhs9j6qaohkx0vvel5',
                iflowName: 'ip28ds3dobsfwdgwdqhkieh0cpwbu25ydx7mdm1iqaflz7tef5nvtc2ndavpia8frayh79dyklka5ze524z2xa1zd4duews41fbgqmx06dx2qzoarnbov3fhtaon3olg7m9z0mt9b4byl0wcpje8i4tkd7u2eigb',
                responsibleUserAccount: '3k6m7n67x4ooks3qlfvp',
                lastChangeUserAccount: '19kgmwjrvxbryznv3chk',
                lastChangedAt: '2020-07-21 07:35:13',
                folderPath: '1mpoct5egjin5mhvlj6mj2no15gymeum3ej8hd4kfst4rzdvqlh3sptyt5w0ru0od9amxc4o6uwbshwi10efy7zxg7vpg2khke44cxyd7aixt5ue45n2w891saaim2swe0hpfku0m9ce6ikdfp551zer1aina223202lfhabt46gt1ldbn56poiy3ciymedon447ye8u3qmvenn4mccbkt27u148ga3nsqettj5b8rr7qsuxcf8jd3e5af7ffrx',
                description: 'qbfe1fa99ehu5p4hf9cf552xyx94w7qgus0wrrprcymek3nv5f4s8bdi2p5n6nft37l2xmssw2p7bomqul1qhmimoa419mm7knh7mgwk9mxrryhjaj1yjp9x1x2022sxt331116c0esdgxmytf3etygo9fzkq76ezrcyd8x4tzthv4c3ecxeg31x93n3pr6goui0w6y8knd0flwz69q2ehw9kp1efx9afo8m9d55lfvja1g84456a5hxpfkeqfk',
                application: 'tx50o5dn4sjyh7e4m04svvepn6svr3r2cpoj5m7h1ud4nx0wigcs9xqnw49i',
                isCritical: null,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'l208j6tf2kuowma7sw1r',
                scenario: 'l3ciix1fgloicumlrvg0qerou4f6j2bxg4bn4rh36fh0et2vod0y2o3aq7ci',
                party: 'dtvrf407ia0mgaepq039r6pomhvnr8xotskzszszvi3embr503clqhrim6d9mljljkv32qno7hqmwq9qmmtcfm9n1d2stkv50ae7nlqpbpavgyhrqfcdmszpu3bbenf7bi9xggi8z7300w6yo37y7t9n0yjnkxab',
                component: '02nx2mgfogv45mow67ytb3dvwmfk4ary4o4mwafz5wkse6ibdl6k9tpc3yedsl9qtknes5af9opy47jflrqsp13zrci4ebrs8ub94dt3b8yoccfqjbrhufu2ag2235unyn4h22qdnjv2moce290n7bg1qm42grcb',
                interfaceName: '6e346kxnrag5xnypvt9ynyrzqib6rd6x9a24xhtsgepx5c81fhn80trq8gruf1tmmhg12c719qck75zowv8b9fjk6oi9rli4s354m08khvrpsal92agepr5v03rciyor2731mj7scqg0vc2ztzezkd4hefa4j9qv',
                interfaceNamespace: 'dgwphnxfcokcrg1sk53f8azctmjdlp77vjpol7rwlqwi4rtquee24ujrs25g3dsxynsjlmc86xfozzp0om8rsb9fkxji340sfdip34ttuinbpy5knwlfjbo1aze6nt2e659dn10p2wi22kfkwvspz9fk9jybf0am',
                iflowName: 'wzryrxk4oguap1m2eh0gxxczj3w45z9obwgleellpl40u9wsldugihrplg2rage5jxsbj8c1wuuvwsjcws3u88ab2uv8fkfc1x7m3dg4id6dvnw45l039eet80enq9gvmkawkwrtt10wwa7qjeqs9l7udv4gzynm',
                responsibleUserAccount: 'xkzc3or0dmin3ayjhg0s',
                lastChangeUserAccount: 'wfwjd2nayr4x6l04rawa',
                lastChangedAt: '2020-07-21 12:25:58',
                folderPath: 'pqnancbtms9b85lrr92m7iuvfbwl3g8dse8mrx8f4lq3goofli95e5y6l85230w5jxt2er4az7sljo0iun9fyqhd97bfh8bz9brhmo27o7supe313d9i1u5eq7h406rvrliv3kqct5o5gnfhbh5jmksirwmov3n1i05lflj5hixjbmq4yez6hju7l3xw7cbm4a3qyc41g6g46zg0h4ezwyz8076tcm2pkq5pvji8ol1la3a0zj4mflvby39jc9n',
                description: 'w8t0lgn8z6v6lxhs6ema50mvlg47sltdb0xn7j5z760jsdbt2cu6m2drsgkibevmsmsfl2s4z6d2uh3qgi8ab83junnkz9q60sbn3kh4zg13wg2ppr5q8k5p1p6mqez7e8uzhadwjk6gj2m35iss4k01727kxmcuxjgxk3tfqx3ce7uww9k2yazf2gnlk5kzy1g0m9ifc3hc5oqi5wle3pqtix4kz1mqhdfxkfp1k9xywat2l9ppdo83fjrh127',
                application: 'bpbpxtm43zvwthez84ht0eea4xdj1a49n0g40qlenp2rwdf35c67k90zqvel',
                
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'f3pbfbmvg9ir9n6dzyqv',
                scenario: 'l613tsrs746aev859h1ehjermmxgvu4qxrpmmhu2l102ylka9bb53b5so1u4',
                party: 'k7dhy1s2oq99krj1txnonfk7cwxdo0yuuompkphz5uip9jdvyb8ftc0dwue9akoqt17z54t5coiuijqshgxo09nr80mz9v8i40hq09voe2sxtx8oa17ywy36tp666djyq0ebpjpfzlum5mv41hlv0e1hthinqqzk',
                component: 'b1fyu3pcbk6fpophna0sspwwzb7zu0c6hnf25pvsxascmt543ehf4arivt6021yqka6szak6isv5icoyahc5sanjyred5jb4emebes7nt255vg2kq9r7pbviihakgumqrf1j2e7u4n2bclbiavj0uhst99e4n2q6',
                interfaceName: 'rr2jr35o1knyffh7ewt4vkp3kfflmeqog5m9xoftus84d4oau6re00vb9lb4qs6639t2hkdx7r1c1zt3y4rqfifzb1qrfauim60r69ebll22dll8trw62qmpl32pnrdvepcuh9hfaqlvlu43d2cuuqy9yd8xijya',
                interfaceNamespace: 'hrvmgozt1hfqnnm5l30ya0ozfw87b3bb2bavat90ncrt3128mpgy4qjjhywo6lxzkd3jp8jpttzev1879wussnkdfyoz2vp2h4egz0v05r8cpbmx7xmkza0pct5yzfgbutnwilfksb98d9luecz5y9gr2y9d5x4s',
                iflowName: '4fb994wumvtys9165ncj2ms7tiwew2s0ha52eus9gfqvi9ocz969u6bj9ei0dosb0u7lnv63jp5hxgh1i3qjdvhfzhl08if8t4hivfq1zfikhtigh0tthqyjih9bo4lga828y4issa421xq5yxfgydzoyc2jr8cd',
                responsibleUserAccount: 'eu72osrof0mp6akuwcvs',
                lastChangeUserAccount: 'k9ri330t2zrq80kmbfk6',
                lastChangedAt: '2020-07-21 10:04:36',
                folderPath: 'bib58nmwe4fecdgn6yw2rm3o6m1op7fy6u62xs0vfii30u57l0r6r03sb90yg49unf0zhufljqtr4k3elsot5fixrzjbzj495b3nx1vnkiwyvd7jb6ezzojd2yqjo9ik251a4lf3sygpeojyx4hdy4hyysut4etryoj103aur0706plok1hnumui1d864pkunicg4gsyuw4a5319yv940422q0bbvtfc439ntmbb3ap51d9wchiesacwn6nkklq',
                description: '1d8a7p3fao5y1k888j3vr0utb94cqa7dfeb3hx1oavoc057ia3y1ikj1osmt5r5yb8qblfghbzr50qy4nl7jv2rcx33neqon60mual13v925htcaxk2ovrrxasj0v7ipdic4y8pxwdg0qbgawaqqa4wtenalagz0uj711zdej589njiulvtv2x2fdjyx16dtx7ablp3sicx6li3yjsmuadgzihb982s2d375ry8s0bl0658evvups2z84n80qfm',
                application: '1id6p81vem24o3281hi7oqi4p72dtd49ici5qvmcls4dxvx1eky0vj5vawha',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '7704fm0n4umzmrlommbx',
                scenario: 'tvd6rmbfqju2krsqvyp8tf2y7q0pqqc5fjqvrs4zttdcc0jhqkm66szxddxl',
                party: 'dfmx134inilfbdbq54zpvp3z3s4xvvlfn2g44syob2sjupz6ih3v8sg4m2p7nudd5l1pzau5prhmn0ede8a5ltj3wb2ks3oj75g6xz96no795ghd9x22i3cwx3q9arsl7sr2jjqbrzaj3bw5rkzthefij9wlngpa',
                component: 'uco434bt4ps6uuxlb93bjm1w7w3gmj2neepucb9n23n89va5pilf72v8r9f2aqt0qdgwibgcxgim3ckyibo3t2xro7ltukoocz4zdp42v9gxiz8h4lvq4yrae9iscnkynqhw6u8q9n1xy0r18uhcdfnircbj19o1',
                interfaceName: 'o5syowjob88hh8shkjn130j8ejvrsvvr06mdbrs5zge70hk3lu7e7ujg2g6ky81ewuzo44pquq6pgx25ju6ljmheuwlyi8p6bwqhtqqyyvdm0hek7xgm24azre6ajnxh99ah4jsk890pvwzx0e4czlm6tyxlwo5v',
                interfaceNamespace: 'p8fuc3e2iznx5clcor54vi657h1le8b0y1zar3aa68of2gelucdtrygweoogurmrmtqq34kig6j4ydwqsl7g6qf0acilqltc5jt1wiwzu9xiddrkho07sb9xszk6f2sqppax0zlzke2w2wmnvqrc393sk1rzxh0l',
                iflowName: '2l46gobm15ew6waoy4wbpt1o9cf951js5uqa513uei2gjnpuev56wj15k3lfxwny5mymtqn1lfibfr49hv10dulis97doqz34uivf1ejzloje5kbs7ncyshhia9tp4rcr60e7kbs9t4pgaaclg6wmcbd2oqj9055',
                responsibleUserAccount: 'hs3nu1cbew0cynof2hez',
                lastChangeUserAccount: 'p2ix8fiyjqwd19p0wr71',
                lastChangedAt: '2020-07-21 14:43:03',
                folderPath: 'znwh0kvbjx5payv002azud781gmki00rklgoll83sichb773bkzpww9fxfjmucw1up2v4et7zylgr49ku5lv1tr6oo62lh0om1asx0nxw7exn95ohes05flgl0bgfg6ybownmgg8u1nufpz3e92tefmjs9fgho5xs1ku0rjtrgg5khlnewrhuze83l8d9b3l0vsxb1t9rklyfda6lvgidpicr6c75grcjht6edfbg493elawf9719emepbqlf0r',
                description: 'abxbkgy4qj61if5giyt4i8vdlb8lpyekh9ti2a6zbnrdyu7p37h43ea03tloce58lvb2ynvcrjlqlnquoc85ab1lfm3gdv0aao6bzy51oodi89p8gw73c4b2ixxngz21in3xezdyuerjjr6a71r2bfwwo7vfp00kjruwhks8pcd7rn3m27xidburwfn91jp22m6g2v25exr14rpm5nrmaxzdy5o9f1ddmb6g6k477doxw3adta5nhcvokyui8po',
                application: '04q7wtr3goepo4a3hgnrnelzxcndnka33rtg15176d1gmwc2lxs4nf0ny5s3',
                isCritical: false,
                
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: 'cb0tuvdxf812remllan9puayhpb1ibx8s3ko1',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'rkui9fgqbfzo8xmywpwr',
                scenario: '693jtspyrq7z8afgvnm4g5f4w2rwtzaepxd7tk7egt2xabb0wxqeuxd4hvgj',
                party: '3bidzdoztrfh162rx3a42l9f9cndwk0oockq8i9aayc953mvqt4elgopuiqnmqwjkolwvs4g3a5x2r42ag0sggxs6mkw8ij4q0n1cg0ahi45ewisshvin5s7zo08agplcherj4kw6f9wuqjl02zbsiaon34xi7ih',
                component: 'g3881warcm53m5xsejxzpaein264nmnxio4287f8sl1prxncps38jc2u4x0hyuumgafejoaje2ry54ndrm1w1kt2kq65b996toe4zetl074jwqs5r2pd8xz1uelokpmlwsd0t8bjr25r8n87k8b6p0g35wrnrymu',
                interfaceName: '6tpmmvqnlm67k48ys609labi7e4bqgj2fs23d7zjpxy6keu7w5p6b7ra6p4zsdg88hczs7iutbknkxbpyo59nj6225mbo6m6os8q55djw4idn34kpeqp7olk5xiot5g5jd1espyez11pueh9t2k4rldh1zvrx48s',
                interfaceNamespace: 'nn0mad8x3k5edrf3qxe774e089xe7zbpm25yvjpld5z5x3ly8ydike9n2ydtzh2p31m0byygbexsqzslftdmdpwr2iz2k620xi44zu6ins7gkkaxbpw4972ue8a1bxgon9jmc8kf5dl6gl0ql9r2cvupfjylqebt',
                iflowName: '0y5wnd8r4i2qy0nox5v6zr35zy3ubin58whak9ul1ctcs67w42vhmsmh0vgvxy47o571p8cb8ixdqbd11dbtnondssw5rmep3fn55l5ct6qdsqpbb3aq72y9rdkhzcbfbsnacr6l4p20zlzquifyg2cr9s4nmg4x',
                responsibleUserAccount: '02dcvrih35v2nu9qombp',
                lastChangeUserAccount: 'tmvhm16ponxqot48s6xe',
                lastChangedAt: '2020-07-21 15:41:46',
                folderPath: 'lcr2qdh2b999rx7l1ft3mbhxn37owpws8ti9bv8p7vn5toqswax7z72qdwme6g2xrzrvh9gp1v0zj3qy1jw54qe397uch813mpxm0kfh0tdeacpe904geau4i0i7zsie4ia7rn1q8fks63oo1lmvrdlb4yfyro8sf6xbqbc89gamjroaz4u4eg668nb8ono8shsekaloor45bamdimbjw6bsaqzjeo0o7z6oq00bg4eszr4fudkpv8smal8lidd',
                description: 'fy0ep86gz5oxugn5crxnq7bndsjs9jdz3r6vb3xfti8y2t3btrg6hs867ngmxxkp4e5om352ye4g0lbx5gpzl7f4vcc86pb8c6qzcz7hfxz252bb29d7fylozcafuvwvgr77oilnzlsosopgspmmgd0k66b6rog8fhwynaas6s0yavi5e8w3tedyjimvawcz81hslwgl21g7xiv8ystcd0s8wsikk2gp0tp5xdupe88z7co3s8036vur3k55ulq',
                application: '6vp2dccjaapyc0zqlgf3bq381lzxkdlu00wiswq8mlsd1zyccchl53ajhxw6',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: 'pk6z03c6496vgsoq73zigzf0pygwkc9590n9j',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'j38p5jo0mqksgi2u8ldc',
                scenario: '39xfxp3ybbg6s7iaii8zqkd9dejbqlyagygmbtpc0urr8htc1t2popalbeqt',
                party: '6m898oy5ugqt1m6wicb4k60czy58wd9c71nkpb1awayzki22up2bsylyj0d9s3w3ig13tmq5zs23ji3hg751tre338xomukvxjoc72gjghsfsk2zngmfj3pst6qljdpmn2yjrfleyt7hyo09s8s0x4bd5w6l9af6',
                component: 'yep5ssvxvalfde16h2uiaooa7zeg3d3umh9ir2tpgrpu9g9oqvcnctva4pbjsrwinbcu32xpycyuntg36fkr4d2psgpsqf6p196ycb8pfl7rzaz8rce2wpiryk0daghdj7f6lhw24bnq6sgn5wc8f7ijq8yfnsxa',
                interfaceName: 'i6plehgxa28ul7t4ylizovghhk1o69qdcw6nv11ghgykcb2v6hu8d1y1a6l9zr356sskzuxdfzi8g38puxdxrx4b5h3q6ow3h5gmv9zs9hm8lb6fo2n0dza9wmilujbk3kato0txsddaqj07t35j7zakxxzwhj1k',
                interfaceNamespace: 'ne14q22r3p242h7wfzo8ivr28x8hatp7axfuvoeuzr3kvwqf3cvl80x2ec242v0mxhjjvihbtllrwtjfyl92eg2g43j2ky9i9w80x1fowy364ot0wgkks9w96zgwecjf1p4b58ntjo2khswarjghv1c3zlx3tzvn',
                iflowName: '37c9wu5yr8l7j392o2zl9bc36blfyggaze7us18ysol4qx317cy58aqsbuppus7kk5wnmomf4z0h43l9011sezmthuqlbte6m11sy8mqzdrv1r8r4g4j97otbm3ezx4uv06d7lvmx2zqfo6f7w8wkax9j3sp9iag',
                responsibleUserAccount: '0zyqcz0k4lccd14c3dig',
                lastChangeUserAccount: 'k9rg46qgk1ylqc87ktzl',
                lastChangedAt: '2020-07-21 04:02:59',
                folderPath: '1xjxc5dp4y6pz1jv53xgp4go3bkdoxnfvaqjot70xc6quxg3ox4d40dc3d899ocixxqk5w06y4yfucgy9gq23eas94rllt0li3qptlgjokqc1f79vzu2466qkdxuuygc2a400m8vcnzggutilso9ukk6b9g764givg3rj46k05p5qjg6qkmmg53xqioma1ju49idcda74c2ka7u4wer7ukce2npl4n4qrewo8fvdhvmsgngxppx3kht7s1ccrcu',
                description: '5ocqhp8rvazv4rwm2vq7c2uixg9th7ap3mwwvstktqc1xkqpugz9x8ue02c4810simqdvyu38n8tpt3g5q4y0se49n4awq8ypy94mvqljanzvus2xl6tw4xjdfm9bphzd6k0avfrriqehsg3nuikblhpvojcusev923knkx79eqrit7vp4chlls74b69iuaqbe3581l1zu6fdqyeqqu1sfybldgscszheqlk26mwvv9y02fft3xzq9waymxfyan',
                application: 'g6i646jrp2jvs9myxu80824asvrfjl3ax3o97n2viwgu2t2gfqh3m3g4qtai',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: 'e9hx2icdcoqrmtxr5c2x5quvn3zul1a3l8s45',
                systemName: 'umzyekv2fnkk1zjuef9p',
                scenario: 'd94tn6gq3fmdvt4xaupllak6dznaqcser3ibjqir9kufnuvdb7ydnny9nbn0',
                party: 'vt8plufe2riuwge94xwvgiszprsnsdyg7arcteltbu51vyhxih67lpglcsouf2x3kck58xoaxi1pi4b9j3wfiuht630zjl5yiulsdlgeh23auex7989cqgw8xpigf0m34vc62whfp5k6dmbggqqyfkl7k2u6u68m',
                component: 'a78kt7tkn93a20xlpj6iepuz1p69gppr60j3endcle2a9rfpwsnfqqgbynodxd1jsmtsec4qw04qbns7wjos9r897khpzg0bhi9alhd6f7eu0rwl41l5ksn8pbzhsa8ts8at0r4eiuuijmcbdzt13e172llmjims',
                interfaceName: 'c2jeeh18rbn8dxr758havie7i3zlbz1d8ylr9r4crh69fj00zx51207m7gq32ypryhv7ahyd1lrrdv3d09ex4vvyb6z93ngorbf8akmnj5il0ph25ihih9p86bxuk1xwwdoith10zgx9105g1h5rqytzfxrokxhx',
                interfaceNamespace: '0j0f9d84im2ek7g2qy0z1cci65tc0vclyrb51ftgxwfl6u5ujf74lxxxisb0basdsiquu7hzwtwvjvz3l1cjau4jhh3megave3nw115fwxoxqarhqsjhwi4237digltonjjd3b6zlz498asf49lwj8em2t6o1ym7',
                iflowName: 'yixifxpsm9p6vlxqhahj2imwwpds2cso2jfycdg9602hn2ldp5r7zbt17e5yp0r4z1m6lxggorqcq49yenyt6u11or0rok6jwkvfxotef0mjwuecanzlnrs68its5qb6ie174x30jzvo1f04zpse2vpewci69muc',
                responsibleUserAccount: 'tzue5ifwblt1m8cendqk',
                lastChangeUserAccount: '1ljrf7mtjhpgksj3nhq6',
                lastChangedAt: '2020-07-21 07:51:31',
                folderPath: 'ucnbgqo1ekioym7735gb3ojjz7ads7lzyrieyo3orbr1g33nf6l57bakcmpehzbjl7400x5l24jnz60714d9ifk4vqu9pfe94x0aax619clcox3xegqb9zqmg2pyn45t0z572docuh4b0lxdlgexafpf6lfx9qd8avi25emgq8mvx9wfdf5r1iav5jnjhpk1vau8jhadhhqjeq823pybubtbj46iyq6lo2uzkwfod87bmywv1ti91kgamnae05j',
                description: 'invova4tojebbcqv9pfu3jazaenm3pid90v0n9v0zr56ya7pdyjj6yh3to6laz5lxjf8vjiq8hv6w4rcj24ltgv8vqupun6gnfoslqu8rpirh3ly3u0egfql1gi7r0zyhd7gpjk8qkn543rez5cssahcjnzzai1v06mnedi7bebafmghxr7m4yq7udrmt4l8v6q3j07imevjjikq6jboc8pww2khwbre5xxvpnkc7ih46spdnu5qvpmjxv9a4vh',
                application: 'q99uh59na54zemjatrexwlexftgrpl1fjfdrpl4ze6u65ko51daci9rqu28y',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '3s4hvvhbpdsfsk9i2lja',
                scenario: '6hma1wopo517jqp850afskhotcl66s6x0ep75fal16bi7hp7gffksydcvufu',
                party: 'x34fjcl7dv6jkwr798btp953lrq9kc1yokljw1vpwlqaaukot3bw6qawkym8zdrll8xnbh5j87hg5no05rq2zrg6ylueji8zdcmf5uuda2jw4f27ugvl30a74n48otgs9i8j9ixjs86xipya4g3pqfu3dbgcfgdn',
                component: 'l0qz8y6xfe04av1vizidv1fovbkmfa0vmhqqlkpjasm66v3wqm8ypdkg3lhumq0c38vgd13jp70c9zh9v0if2et5plb079rmesuld3mjx513dxt0c68slj7291yizyp925th9fm267drnznnqse659o5ycu2z1ak',
                interfaceName: 'ouonxho2u7i1jwnp8tdlxi1w3pfi9jx39oxpdmmrt6ajw6tzkaxw0pe0oqkqcs3f1e4hze6spt86gcw4sdwllse3s2gbhdur6oo43051jsznpbh2y8ovbc0urqrerhzjcpzadgi8q706ihyg4qs0sx5o2q5mhdal',
                interfaceNamespace: 'lng0jtc1w6otpgvlg4f0f68hygondqcg5dhbhwoe8fq26preh39r4qsc6izepaa8dx4bwvm7r8s6cbtizd53m3l3law611hh1dnusnbkd08d3498z2xfx18h3sor8w93auzd7w0tl1y8qw7r5oiamqtylzplocgw',
                iflowName: 'w7h4i5g1c03qe6phcf0kud1bqtqt12quavnelt4p16kph69pa7uzqozkhpqcr4brpwqmqllonnh5f3wf0i2x3ebvh89hi7jkld6wrdikguosaltrnbla1skebzx7u3uaf0c0awuzwejv3cml4rvqrao2bav7kcqt',
                responsibleUserAccount: 'r6jg0kvatusx6zuy5onf',
                lastChangeUserAccount: 'ote5fi7svswhosgefa3w',
                lastChangedAt: '2020-07-21 04:07:05',
                folderPath: 'en67pzmqggaw7k8y4tx6k5v7bkkkpujkqwefds83kqkxfdu2cjgz7zz7lcau1qtzvresw6my0xfhwgkregcxn06n85d46yajm1a00ezb082709xe48wt2h11xcztv032l0zqhbywt2sqq18neh6csi5er93j89zsdkqetwct0pq88pb61y322876nbgyetiemzj8wrdpg0zc9xwglvn45i44m1mb1vnqkzgtilr8ifyvt5mpztsymv8294jb461',
                description: 'nc0i3ocpoqrg1nvddim8om2sa8i4gv03ix6lfg4mp739g1xswx7xbsbhnrwtafyk0zcpr4w99z4teesnly4b028vzb0t8hw1d9jbmtay12un9l8waoorezqvx49g739bnr4sb6hg5xmokytdc28wwdd8y0lv6et1x5hbavbxw4drd96b9ynl2sbkjzzsi58oomt7q5fkw464htglc0fv9riiltxnngb5edqbyyh92wqc3lequspnzy5nzjhm7lz',
                application: '19r42dh9hmkdjf3jgw6s853ds8och07mqu0rgxnjrptyq89e46vdrdeadm7i',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'i01nt7ct3ee8c6dnvgbml55pmi64nnjxvsa90',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'cucys6k7o1j3v7xupbua2',
                scenario: 'jpfwynbf42906v4n99efhhoxv91t03ch2bhsih5eia1hvny4dtx85fc67u4z',
                party: 'vhu2ghdqpxi1e06hsdrjm88l522b6dwyas25714qm5n7s2uuwn3ki7xgn4op9i40sp2rs65cwrpb7x78vul7t3r55ycsiue0mfvzqeg0ty79rwbti2fucz96hia5uh1y7lah3qwo8ibq2un225px95l6v7wmr6o2',
                component: 'yk6f8qmzp03s3nfhr3r3j35wzf2qgowy43yki56oprixnnydwctbiuun052w4llirve340wnmj1xz279kmnl9w4adykg7mhuimdg5oyk9kp3u7slkafnbngjpvysx8xazp9qyhfj1zmc1rumici32cr79cbgiyqi',
                interfaceName: 'eejbn4z8mvz5il5kh0oh6uk2kbglxh67llfocu19b07w9hf7lcsouj4o5d3ms8tash53atfb9imc4neioni1a167243i58fp1zohgrqvwmiyvjcylsxdjn4ksmluys2aci879eb1trudbmgdx7tah1h23qmyvre2',
                interfaceNamespace: 'ibez6rht5pqdd3wnm019v0wjxa0rlwdzcdfcvymo4xs7qneor8boczyqbcp7w4yrl8d9mrml7xfuoing8mq9qovdkbzoa1nn9htvdb1vxmvluwd6rsc5ginipf9ldnifhgyzdpejxx36r2xukrmekyknr2cmzje2',
                iflowName: 'p7n48q46cs685kvzuftulj81pntv0l0wn1axksc69slq18bbv9h39miuqhpftz67tme7mvovrkxfi00ofzxl8psg917ulibe7qemq1f6qq4ckrjy8fto02d30mxaozee8mbi3ga44sj9cdj2inn8li79wopimzva',
                responsibleUserAccount: 'sc86fl8lu4u0ihyc6251',
                lastChangeUserAccount: 'dkmosmopzplzmelbwj2p',
                lastChangedAt: '2020-07-21 04:14:31',
                folderPath: 'fktiworful11tlpkvyv968ulvhcaa8mflb2pwkog76as5tvyp1gtkz7olj4wrqxj4drkd1fqcb4r14nqpyl64vtox7rsa7i8l296nzi6eymzhrsfs95qv4hqta4fsop0nbvmt8m06evkgm3i70jew63exfspmzmbajgp6v0r3aetyb3ctaqlaojk9vqprnayatu8pvmgin34voysml7rlrzdfl6zz168x11e7u11jri79bo7hfqnti0umadmx8j',
                description: 'eqrasw0r4y7cmpw56s89hw0ppqh4815z5cook4tpgqplscv6herrtlutms0f288lyajrp5a4vv97qj4el7zjj96e0uzllwy0fyztx69n0pu7fbrxz462fzgkllmz5gwvkb2kj9yaf6jcmnaylre60t0p19oilmwdzizfnzlwwwc4stsi8qpqderrk2vdwu3sdo6e568ce8b3y0w7rk5tbuzxggo107cv3xh09r7psxz2vc8pudnuivxwbnm4aor',
                application: '5xg5q2gbxd0f1cx8esqxmsbr2vljh9z0ffvdan1mbs716ukepjybflwvkq8p',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '2dslqokc1vgz1y1eu513',
                scenario: 'r2v8mwh3fqr49loqf3omz6qxl4zyo6mykaliqwbcvct2colbfguytf7tgesuz',
                party: 'lzvtiim3j83lwku3rz27gcofy7k4lu17n8quncdo04xfzm0pzdgpmv2hma3pj4mvc2o26iku38330lgnx0hvkducvadu1esb3q6yd6beznzom7r3xv8kajrhlirp14wq14eyjac89g89zav3y9nek9faotuxytsl',
                component: '4r07tz12mdoxgtuf4zg00zxh5l636lrn2jxyurpa3k3s14cygqxt18faz8hv8lay4zx3jeptyzg8tfg3fxfvzwp0eagxqwnytnqixp2t8pdmn36ej66l8i1oqpncona0a9x5rgojgt22n1jty6tspcwuheumc7yd',
                interfaceName: 'pg5h74honx7tmu97lam1lcsqqr14ykjrmgxzdech8yqr0xv6t0raxe7z9xfd20v5c3ya9iseet1ovjm4hsmpidoh2whcf9ahjctpfuqma1sr93aot72a6204y23y0srholh8rw3b4e0y0che6v5izohyawpb0uln',
                interfaceNamespace: 'rikfjzmjlg8l7yrkyp4yqzq1534nih5wllk2w1rtyvb7z6fqmlgrhlvhi7fg4ehlb8dqyap7mkufiy47ggbj5zkp5xtgr32hkooj7wjhk7fsjktsoiqtqglu7r9eqfoj6s2p5gsmlctthg0nqd3dvxu7104hdae2',
                iflowName: 'btz8nefwoa3d8voko8bsffkwdssgwiuqh4wtl9lt5y4b7mnvs2nqid9yc55ut7joh67hgi8n8rwfwxltxuax987jxoy014tn4earbr1s1hc8efjzf54kaqa1g5nrg0uc1xsuhmqj61vwou0fxvva5q6g5mcmkkcq',
                responsibleUserAccount: 'v0a2e32u0x967bfi0kg2',
                lastChangeUserAccount: 'asuvu89liq88dxnxnfej',
                lastChangedAt: '2020-07-21 17:47:15',
                folderPath: 'vkmaiubmwcwbn81ya3go0jcpnykajs026ny7m8chusxzvjc23pupxe7ug2a8wthjipzhq502d17mjyy1qd30pwoyxnghy1g19j3v2ff9n2ilatp2b7k23eunkayj6z3xm9vgpiitpehpe2vcaft35s1h78qzof9kmjeeqd209airfslb7lliqrvqjky469l6vdfc29kgkuhpu8daw840vqixglq3aexci7xonk2hh7lvh2hxnawhblqq2zhjec7',
                description: '65pf15fc6c9jivlbggiqcfnhl6f6vha69k7zodv231mr2qdb5hxlci3wcudpzxm03vmmdehxpwgw91s3da1khx4i04se42v7se0zueanyt62y3it27ne1se6p2xi24hsmdo40yqgr3jf1yzw4yxmdtf340t90ssu0aozdzs7jccwawq9l115kxdwu39a27piwrzu6ape34d8xe17fa6tpr4sd5m3jnriynpflryttexcv4gta9d6jy85nsa40hz',
                application: 'etkkv6qzleu1jihft4fkf4qki3mzzdikdj0xzlsbjn889zgrkptaws0c802t',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '6wq8yzyu2sgmkw4n8yc5',
                scenario: 'qrqdgz5olcjw800znwefr6wiyd3v9t1td4azmmoyx8rlko0grzetb5qy06d2',
                party: '4ege7ocqx2nyglsqkoqadyqsmbgpeyc75i4ybk3sofb7uhv57heks6ljj0lcttg5wmexi3jax5ihbp88aicz5ncadcnkv3se2rmzcmw3877blv4mqfqwwd6a0zgcn9dhss7fbeck85vabe15h2hirp4ymc0eban0v',
                component: 'acpesav4s4gtrouvwrvfvum94mj8hq9emq9231ox2id2jw17zbz4969fzmdkxh06kofzh9jy687t3wobe2k2lshdxmj65ug5r51pr13g6v0zzv1ou3wkklajkrhuh7ll8imhhtoym4htxpzk1xvasd1sy37mpwx7',
                interfaceName: '332nq1kwk1nyrmslwq9u1om1ap10niwyaj6o253to9mo9rqt1j00xl5ueqfnaryel14acv2l5nuej83g8asow3hbd6asiuez0xvbmok38wd712afs7rgdjavdt7k9v68plx56l822dvsrizz6y0jzyxfyf9vr49k',
                interfaceNamespace: 'h60xcimw6gq4vycb15v0vr70usromoe20many0jtqjejs9wy1g6b3iy7m1zchc94xf3xy4fbo29gcn04djiyfgef1i601dye9pm6gnbd11qyl2fvbwlz9q10sjnx6cvu9z51xkdc7j0g7hkigkrmyrb13kjr48d0',
                iflowName: 'zbf6ppxq32a5nu3aea87btiuv0hbuem67r13ycfpeabfrpng91l2r3nebhwo0gdgsvxlezsqdv59f3x9u8hnntgsiz4k3b3904k2xlob70qqwv0kejuncgg8iz5uf3adj9g8z72tsjuyj7nvn11if6uu0bmbbjz3',
                responsibleUserAccount: 'fceny117mhfpi029mcec',
                lastChangeUserAccount: 'vq3tugbfadohsf4y98dn',
                lastChangedAt: '2020-07-21 22:00:18',
                folderPath: '3sy8amjvv5m7zkazf5u55kx9g1c7r8lfcmxgpz7o28mw5r3p8r0z30cm140jpikri764xfulnmkylbu2q69rjwbfqqvh2152d3mpp0mk3ionvw2yvl5wne85ggnjqek9gndwfsh527riesy0nqp21l25zhtaijaow1giwe6ghzn8pp3eh98rpaiivwn46w87eyuzlzceezqypd4qlyey6cdg19t5ue6pps9ahswl8b9pif5w1lr8o175ti5w6ne',
                description: 'a4dfpvq4sqchu1im8pbsv1nmd0q45l9pl57b5g8wo7g2m5xsenivb66qzqjic8ug255wsqn8qotpb1kaw4hrngzgx9y98jwno8b7joblciackpysisei2whsof2fpml21yf58sejnrooug53fmrxe6baawyndmuwcb4ig1fdov25fnsg2thyfwqy1paxqxv7d4vqzvuiioo4fna4ikunr6bcr1fnlu7wnvdmfhuhka59sigzw1yo9mwmc0q3300',
                application: 'uyupeumvt7zbh6ebjldm647jpjal6yubmaii3qgmi6gbrlxdte67bbscryms',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '97df55n0tuy6r1a4hd0i',
                scenario: '6vkvdgdsndfhzacplkctcr7q4vzwijmwc1j7qc77txe2t5e9mdlsdy295eb6',
                party: 'pezw17ylir9llqn1ikool2yz1o7xcs5kxl5eloze6r9axjeo8c2184x7eklvvl4awpwl5e64w7a48ie6hah0jndx5rmjjf02maoiwc7rubkutngxq57kuk1kghw6eopapn98jtj70abau8kf6tawiaj3pjcle8gg',
                component: '1wl3bcv20m4astsc6nzvbfbboirbo478gae6gcr5nzub0zv924ys29mh7apij1t8weyjkmpx9hhzwsbpf4hbitvvi5g924u0jghuc8xg11lml6wjyrztfi42rue96fai9idnu7ye1htbpjgmdaaz563apaa0rt6ky',
                interfaceName: 'zbmgfw70psw392cn907s4an2dkiq2ajmeodwr0mteess1gjkg37rtz7nf2dx4iy7hyvdybi705u3oqasmudm8nifn8mihji1fezlaaqtnnikwo19kmqolb0psubquc94uz5ajioapkspdzygm6rsnm61rzt0er66',
                interfaceNamespace: 'une34zzeape7asb4pok60d0ymu6ito5iy69g4ecxz56dqlqostvoip25lzhstayzn16m8449bd8euw93uatdqh5kx8y8g22p9hwnzlhb2qtm8nozefysiecj1m5n4itrhmhxcy46lxolhdtamlo9njuyal80hwau',
                iflowName: 'gbai2sgngwteuf3ge164yjli0fn0z54ndwdvfpz7016zo1twp0zryekusmt5l6y5wewaif1mfcoyfcvwlp6ewfbo6y7db6oplnivp3fdxypyto02ms3l9gmwx0sfhxak0esufsvlldd4ci3p2fnloxwyx0l2ybvd',
                responsibleUserAccount: '68kt8j3rai3wqvzzph2m',
                lastChangeUserAccount: 'ji714t26wf93hzx11i4x',
                lastChangedAt: '2020-07-21 18:23:38',
                folderPath: '48lo2aursqc3i7zvrk7tj8zvk34iop0vd2eqlfql0kzm24t4pobiwe0efz1dsxbz2a2wyxxluoo6kq1ok8ye5jkzlbq236q2mdrys56ot0n2rr0gt6tgm62j5t5fcm5jvj4iez28mxrs5w8ifqd4w7wsx104vq1rqp6knpsoesl6p4gjr2uszdc5h4ot8dcqueee7u2h26ds6wr61dtfozvuj5plqvrrkqrzybp8a7l4945n726tg5azxt5jeu8',
                description: 'sdvdl3qhu0tbqc7j46ecvmvoa4cyg18084c4l2ywopep56ne1w6jrj4stp80w0woc99sfzz187gqhik7qsc733f8s0oydktxq7rrwyh74ktrqnk37q4hjh5vub5fgoh2f2dwr2ktohvx71sujffhykpm2nl6brfa3etaqei2n0muvm657brzd5qc9hd17c4tkpj9ilrw3mvnydxsepkyp9750h9p4vdbvjmn2af24rfr7tq8fz0b8ckz5t9esf0',
                application: 'bmzxy9y0mkiqgjfrb77efe77hfdcrpjhcbbiilbzrvih1irm0f3pyh7u3mjo',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'dymom7432x44sxtlcyc3',
                scenario: 'v1pytlela28905pocfx1jo90tjba87uz6ldg0gmskfjbz4xynogv5ajsr23m',
                party: 'p44u2t3wqegdrjboagrrparydv3fu97lzquwhfxokzby5hynxwprnx5p9w51tobcwgedx0dqzerc50tyma9mwclgxkr5ggo3le1n2u1ul425js0lc9v6p3qx2m9ykupeezze1dibfe3m9i6py9xqq3lkgpuefnuz',
                component: 'cy79gk4rzzarj1y58q53oz29320oq9n7e1uk5l6rd527gzl21fs178osl9egncczukp1enha1e19xdkv0d1z5bowz0y4fovb9biycpb9or21u0j5vhahpop865p6clf8r39nx4m4xquuwxxk9pcmvrfweu777ouo',
                interfaceName: 'vvac50bulo2xiev7v6e0a53hgx3e53gqe5l44h347oq7oisv89j5pnhz9p2v91bg2pr1cz3ik9rch4xhx4hlyakxwgxizq45ta8wd1yjit7m7ok9ymlkjnilbjzaetwlrfngf2naz3j8r6q044w6neuxxw083i81h',
                interfaceNamespace: 'v8olbbz75y7o0ijrp3y0sedicjjdinvmq971dcsfy47e77qsvdos77c9mh9y40nkcdmv7v8eagkkf15v6ri2a5qt69fakgr4byq5ptwbbd475omc2fv6aynivboq3vhbg40iadzs6pdo4wu2koirpqnulbgeyxkh',
                iflowName: 'jk14a76btfeniqqhmgaurfkpvadlk7o5gzyuly655ok6c0daopwk0j9djysv2tfismuvk9bw8lqkakpzdbbge45437u1lorfl03qan6c4hk3xib5w9yfkz6grob4tl6lg02b61kojqwrxbkbidehu0n0k3kbfszy',
                responsibleUserAccount: 'ju0hu1yk35s8krwton80',
                lastChangeUserAccount: '9rusqo6wg7aduj0pyvlf',
                lastChangedAt: '2020-07-21 07:46:16',
                folderPath: 'oopnou42ha7y9h2g52xuiwav828w1rlgyqr4hyrjjc9nvx68trr7hwrq9twfdx38kubdowl9nmtn5t4gqjnjut27mhq3lhnmrgcpui54h2fl5w5rhh7kl7cd6awbpgzrd1i8xpv20zqqzsw72tan1mo3hlzsjxwmsqge32nsnax7lxugndw3qudv4uwhb8b6l597r2muozzcdz69a5b0zlskghel7p2yiwxdvh92l9ag4x05qehww9yyngjmleb',
                description: 'ftrzp1kmh6k0urgys057r9lag35zabach5x0y35uhc88hax9ghgpi3fz38wyn92m0a9zshwg7bhk1m1iadfnf0jptfla793h1mv0uk5s15ijlm24fl61d77xpy5sgvzxwkccfdog44o2yjxpynsg3psg95ttp7n50pa6ndb31d23n153yn1fu7mf2d0dtrpxpb0lnm7mksogh1miga3grg6ozd2itgk8n5y6fxwx4mdqzqgjbu5k20enf3c2q1m',
                application: 'xadnrb3ugrbu4v7s3x2o6lnr5cka24qvf8bvqee4k1jy8i0waxwqm4t4sjfs',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'ysrt648tbsyu6nopjnj4',
                scenario: '2u6nx9pm3iowy0a7dgzlb0sa6hxhdjrcr4vfaprdlutzuf9ctmef9pguoxep',
                party: 'qo2z5hddgq5vzkm3h67cjjmxqkkmggrtaxeylyx40hhlcsotr8nzfmbdh90o018jnlvxxcje9w25zfjd2tk8tee84vn9gsx1mybhd77wnizqevrh50eiud6y2uq3ehxa8gcek5syphhoz73e701cdc0fnmwbdfx9',
                component: '7xcf77wkxekc07pvq22i5y0zl8elcf92auf9qcofwukmfot4q3uk93pad992ynfx7w71qyrrf6ufneydycn97b8i2ii9oi4slzsc9ty8t8nc61rki3qre2ns89inz44le76rdttpdrdtf4v0tsjykuppspxqpt2d',
                interfaceName: '7kz1ub1agvu3exx5plun79i8ebte1qstmoq3epay6wd5oqrdktqmiy4m9sek6jgo4vxvd0a4mnu5sita6upf1mosd6dsghex0n6p5g8al7hspxof8tomravuursfr54vljvtmoy8ujtrf26pts7hbdpxylodtqdt',
                interfaceNamespace: 'xh85gp7u4mchm70nqlxj5hxj0tspanb73sr0kbfs6kxo48817qcq846rcmgqmhh45tmv9jzan1kh8fnnp5663d1g99acs1p3q0g44hpp58m2382keht6kaspx08aizzrlh68y7vzaozrpwvs4dgwi0g4ym100v0g8',
                iflowName: 'bbas5qjf7td02gentb4yhcrp4aigvpje2bomxb5hd2axqfca6g5zh89dq2njpg16gz8pfar316tnyko7ie0lbquiz4rc8q4ctb9kvrjlwieg795ut7qtbx8yw5q0qtpb80taypxg0m6c7ze4xwkuvy9axoxwokb5',
                responsibleUserAccount: '46peu01vt0e3b9hs7van',
                lastChangeUserAccount: 'r0e1m1wapltb8n6c07ui',
                lastChangedAt: '2020-07-21 10:07:55',
                folderPath: 'tq5fyw0jaar2qjvoy2iv49cu2730l04j4qtmv8ow4wei1j42t18q0poxk2fpxm1jv91jsxrf27f7xp45l6v15r4k1hdb744xw37anotjfjafnlkjk9hwp5rmd7j5tazk2z54uj9dy726fr2ppybnsdwfmr2fdiultgbj98q69w9vjj9ve6gd01ws4i6iek0kn21zd1vt6b1hk53j72vaa3ytxpbu8p144iwqsvg7zw90clp30si03991nq85y3h',
                description: 'mqbh40d3i39c9zp2q52z01av6u3fgg9sox8vwirp8hpu9a0i8bv5gzwaq2u7skfcixonk4cbfg8nqb3eqldxrapl0tgorfqmpa47ke3wcrleu8kf004op3hfq9mrev555r7ymnewtwszvzuiaw8bxu3bwcjxgt50urxwsx1ff8qbalqaczlsnt5yrf3hnl4ugh0b6kdrvzrjn59jc3dvmj5k6f7rykmpnj3xioypc8ps1f1igys0ysueruak59h',
                application: 'x745zffo01i2ldpy1dn7ecilvx0z8y2egtnleqs3erpsjfvk8dimqd6kfpdb',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'seckd4lt19qxfluaj4fc',
                scenario: 'j2054efd8wde95l3camcuigatxxih7wtxiwnsvwxwt8wxnoigptpp1xidstz',
                party: '0hv2nf9pud5emuwc25tha9av67f0b26mqq26slqj1oa0e1wzcmzl4aeh341henhb9sbav0cu9qvr8w4ig4nrurme4xaoiwqhle2zlx31xtn6fc4ugnxc8j13kq9vaza7xpk9i25dtcwavv8bl2ahyu1xxfwbfdot',
                component: 'agw4a7r2ak5t5waxsvwll7xh4y1fw67ssmxgi5a1vu0zqdrv2sc79n5phg2sdrxd0s06gb51k5msqvt1c313t6vv4bie3gh16zc61hdcpyha3vgy0k4829wnoyyxvmvzty2mkv5bdz3nm0tmorzkizrrech0mm6p',
                interfaceName: 'w59ro9lr2kpi53poocr896d5bzge2cvc26sxrs0416vmss5zhkn3ndi20qe5wft97ukc5uyir4lhjsw7o0qoda5h81l7jb3z0n5k6amb7pue3dej678hwp5icpj06qe5mg4w7oh2kw70yp4svs9ttsfa7gh3azxo',
                interfaceNamespace: '8vmwb52k0i659tkzipnty1zo5pkk3dvn9kx2l1dq79597o5d2sbcbrd30hfs914w5rcqbzkunyptrsi71a7sdlcogollx1s838ba5u4exhw46ydwv11n1jnzz5n58cd2f025il174ie4krkgkke91w4s3j1bv3j3',
                iflowName: 'kny1bv5awp0q3texupopzozwgp5afz0qrbimm9qgks1m6aouiewyz2i0jhdavzpqoje57y10onyd2pa8hi2q9p825pp3te9upp4ko0kcrruj1cdtqeb9j3rg73hqjuyat77xf4joawjke88yvkz6wpz8euz0fbkwh',
                responsibleUserAccount: 'svlout5q3ka9nk3opupk',
                lastChangeUserAccount: 'ydi2at2guybo6es4io36',
                lastChangedAt: '2020-07-21 19:01:40',
                folderPath: 'shir76b5nqeh8hbodtx4t2l14h9dnsqulqmw5lc58il5ol1cwz9k46pf0od9y3q1ylbmit5sx35r6vw97jojakczzn82vxyvx20zj10wtsry8nx98f8x16v5e6ja2yilfdmlf2a2xk0ffipqiewd42nwr8mcp74pm4zszkksjhvm2avjs0090t4xbaydpgib56boyat8i8v7kfznd06y7zafzkxiwqpczp5dl98r4gu0th5takutgp6zsunfsd2',
                description: '9uj85446y3jwt03w3syl84iuocw8948j6v0rxqldv4szyh7zu328ntlqvutnb9wrhpn8ebe07unjq2lkyp4uawdr0lwjr9y9qcb8fq189481hacoxa73hjyndyypgv1xj7yfq0b4d6c28gz8a6ywenfq5ue413f86hjbg3626ud4fnanergwwzo5dl0qyuhqqy01qm5blmuhghabfu3lkz4n3ldxxlum2isgdu0jmhuj8uobqup9jz9d8doznt5',
                application: 'shw4d991a72b1re6n5e4lnghnl9k8hkfdvvx44ax32dnkrppttgwan869zs9',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'u8koc5xrhiz9jcz194zr',
                scenario: 'f1z0nqkb0np8gc1c3vs0c64osskxvil6dpakxwnw759d39i1d215734s7qc0',
                party: 'pk0i7sv5cu6jq69x3vuske1qm0cifr9myeckuuao62uoxqoic4zq049jhspgvjqg83a15yzlmgud67dicg5ik8regz0oya4otstc94oie150qm860ply9ekd88lpmmhgxezze1qvm9b1uklcbq79uugvkl3k31ye',
                component: 'g7aqximqpipuzqkbc319f768zy7dt7c4cev3xiyvhx8pyp5ja6s8o0yv2tdtwuto6b0qzxiwkq3it19o6hlb27d7t9byle8mdm7x42c8hcd3bhlzpm5cyc5qau467a6r13wqr5sb36h4lld0q8411v2d35res3vm',
                interfaceName: '73mrn4odjzfhgtjqyhwm7t5y76kv9n9zhhya7bjkggqrt69w89usx26eavrosg9ujku9wwxo1yrdaweki1cms09ujs3bpo7y9ox9o88c68xl42ljgphyy1op9q7ebeczb802afbqfaznmdyeyfiixnm4vhcwh0ok',
                interfaceNamespace: '1nfoaiveval6vofx85j9kel9twqvt6xuh6cvfr87y7xtm1gs8i6syyrw12hobyv0q7d1wipfcfnldbtere3annj0sck6z2gqkez2cb37bs40lbpglgta31rn8ovjh5sorii4yl55cpmdh25r2ey0nynfcvzrpl45',
                iflowName: '5qdgayie4emt0yh8etzu1je7cft6g6lynoei1efaaf40lvmvtxdhe0pxyf01n3o1s8ymzxy29vo1637uojrcq7opzsq1jkjqkg15fi69ke646qcsg8ucjlixqjf3awdpk26dnhhzq8xcvf9do3azmcftbzz10kri',
                responsibleUserAccount: 'qa7gu8v1k7464sgf9oh4b',
                lastChangeUserAccount: 'ykec4tc0aq2dtsxj30lq',
                lastChangedAt: '2020-07-21 21:49:58',
                folderPath: 'dtoa5d97eqwmx1xzbd53f0r2g85had7g5hkuvuzumzinpbghse4h8t4y4ap5etkmo7nxxd9ksdty8jqxfk61fc38vkxmb7623tdrsdk0vf3caq5mdn787wqvw130n2ookyp6s11xvzz6ghemyjg6glhuhy1e890lrsg4om6u9hnvgtwiwgguq1j2qxq0klqrrbphgevi1w1w66ccnslr3b62cc0ladtarisi7ib8ymlobx53vtt1x1320wjarfa',
                description: 'pj74xildg2es2cuc89aywlumhh87yv0cqhhlmom38zjkfq33tohapm3rrzn9pxkrjixowcwz7sgbzzron7v3qgw8zhxyyd05qeio4sei0pogtdcsj228ip8r7cydkfdtfjquhu7cgnfy20cva17ha4if435x4me1577tchnycg4b44e82no2l6oqhnu43g5akywseaqecwck73z0plf6ven05cvsr055olqytley4bx1uptp5waomfc5x1oruyq',
                application: '9qiy2vk3ndnhrg0krubrbz487oebs5iivsfx1weym73ebr08njqcd5pxv1gh',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'faqqjtc96pm2z9ls8y5z',
                scenario: '87446qhaln46vxlx6hcm97ro707eju3teedinxf8bcvzbqaulh0r3lbo2hbn',
                party: 'pdv0njftep4ba2vwre7ue5d1oti3jd8rsgavyz0gedhcwbrug958nab37tsqxrjim2m5wfk8wq7smfynnrgq15g9wk77tb3m6g6w56rnoc4jo97eb8ud4ztyabzm0sr0p4l2s9c0pg6who4335iwbpjacjbi0omf',
                component: '16euwzzpp6c3eqwoprlanr1qf2z428zrz6scfyi206axc9wn8fr7lex2izgyyyyut7234tj5itlw1cihnv97wqwya94muv4f2nf7ftbfnx2c5vccty892n05oztdo7cqcrl3e9vcgwokdnesuws2ix1bqt9hly03',
                interfaceName: '7tqxxx31sonoq8itkd9l5viswe14cjp1kmhk0m1oulslfg9s6p7ivw619fleduz9dhngvcameojpaapteq3x2lewti426qpkf1ykblxv4fntnt6gqwl06py9ry05yqtm4r1lts3kexq971qxbvu4mb7sk2em2a13',
                interfaceNamespace: 'o66zoo642s1hty4tahg5hzloj8p3auylv7bel8w63s9wag29ifk3r72zg8b1415160c26vn7vsu1s7ftke2qqw8gp0tlu59nddd3nzammgc5dakj73u8qs3k1ituss5z5hesml9x9octsm968zyn23w3rgyo4azt',
                iflowName: 'plr2exdlowxpym8mh0i4gky84a4aeqpq5gbzvz4ii7h72ecfbvb7iuol4a0nakzt7qdd7jxa2euuxku7w6xxm3hriprgistxltbtru4a3i7iorho4wb6iqxr1z5v0zme0sxgjey3ww2zaui6pimj0yqi9agwpjbw',
                responsibleUserAccount: '31yxk95bzntz6uhfsrpc',
                lastChangeUserAccount: 'qxg3zo98asxdfcj88uvky',
                lastChangedAt: '2020-07-21 17:23:18',
                folderPath: 'uuabs8wezrsrn2gokbfi2a54a8p74z1zbjim32bjwgi3tr3fspz9bmafrz3z7d78lchf5f34yy2qr4qo5zpjonh1jia9og62vsykx8gk7gx4mj5tj0rn294l42shhhu1xhpnmnnjsgdx4epb6f562d298sjuj5f8hmfkdwgufqhp4jdic9hmkr0tbpj485xzfmy1ahxdysum0zkp0q6erdt4w9ebkahg923vc9kfduvn3ekmcz8x4oagwbeazd6',
                description: '1fzbch6lc14xxx6jssguj8wr07zxyj99x12303pnapvnjn03nfpxc2uagzelve0ojwx4nspadkrrpgbv68rplbd7hblz52b8v4w7ek323rnt20i2zz1wyr9d12s1y7cshywsj7zzvsyvdmdb0jgr1636r5z9vybp6hcvwtjdqicwepeseuxtd5w14tcvsbi0tmkzudd5ju48k0szijq4mzn7i0ur8n1cqvyhgk66pzpauu8n1y41109bwi4a5fu',
                application: '0wlsws1inm0ir97rpf0kxpn2gima55rawsvspdqogm1vgnt07iyvqh97qk0j',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'vz26oxzht10m6hza3a38',
                scenario: 'uqyqcc8mqm53fza5t58um9umfben2wb50gx3d5w4nfqi8vqq26rryu8hdgt0',
                party: 'vxx8hn0fb0jz6mqbsbw3jizdsn0j2a9qxgr12uvhgoek5fgbsbmuagnmqn7vfgoe9rnfbxsfy46lbedw3lov56qd8zoeiezdmk6jy1qvyn4bwd1fkjri2g24j0d8mkrcwuicmncjqc1as7vlrbyemzd6mwod7ilm',
                component: '79hnhpb73bh2j4zqketpoj0py4e76c7mmngia70kanyvutjffjw6jpsc4i90ncyjuf8sst3e6qpfs2oesgtuhokjtff3ajdm84vmyfoyykx8wp441nk1d121fvblwjnsqnpcbbg2cqglfhtbz7cksh3ia3lag0em',
                interfaceName: 'vpynhryf9ojxvyoeg1gru3sosomw1bi133du92fcxzuodjp3k5z0ctim8my0lcm4ex0c9wx84e8g9keg01dwf6ozjkv2jss8t7gx4496g52j6qddm97hx97hliyy8rwgt0ku9s2mqjrl90kr8np7piejyqq77x8w',
                interfaceNamespace: 'bnb5aa7um7o7thn3zu0dqa5quuswvnq932nss89p94xs92u3ir91s1hz1gkggnar09e9lgepu8hfwvvfyvvp93ct949blztgju7qv40y0bzhi672bvlmodlrc9qke6jhpp5nrbspmv34prtpjb6dh66gdhqatwq7',
                iflowName: 'pplegvu0ca9nr3ka716wsv3l5tggmirqjp8th1x7gj3oa5zkr61q9l3q6wh1ylfbjebpmoj8a0o5dok5zy5qziwnm7bvduze9bbbvdjz5v23zf52gu4fvdrn8cuoiq751ty2ice8eb2ymwafphvq2py7jzmfuj5i',
                responsibleUserAccount: '341bs91oye67juwclh5r',
                lastChangeUserAccount: 'xpfv6bl3uwe9zk9flpfr',
                lastChangedAt: '2020-07-21 10:18:59',
                folderPath: 'v8fic0n94fw5ai2dq230bd6f8jwyn28527nmgi9032gch372ugklziuf21l41ww6bg7zr9ezfpvm8nfope7kun4inwc2bhh3wi5yd3fvpkshd7bspxtpxdwrbc7corf0bxvrnclzut88wr8pi91lv6ndcwyltqtk5rud1fsvif2d9tjsxzxug37a2n4klsxgg5kcpnrg9pusori4xairkila2m33l62rh581stnwcvq9s1ikokmdgb9ylbaguxjm',
                description: 'u3e2vzwrat04h0jxsy3604i77ihvg4wv3ywz6ruy7z5q6pnool126d78zszl18e4styz2qcpqg0y09ztaca8jgu06771qm7mcc7hhgkx7w5noj61f28ror546fdfr5ndi1dos8niv380qh87qogap7rg1rw2vn3iqtnpstcfuyhub487dylz0tt5mdoe42p1ksqu3i5yzbp96i0ik8cqrldm5jrpn6i45w59o9tvj43ixr78fueqxj27whmqx9c',
                application: 'wcos8hk37ix2glgput1s01qsq85w7uky7d7nads617rnox7xlsq7fcmhfysd',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'v7065w4d2gk743ssim2d',
                scenario: 'k0k4gkf2g88jx11bxfk8lb9sjquf2yo5iaqrpkfw16exg21gdwe6ub4bworr',
                party: 'peprtjsb2tyb0qlyymwy3h0medbq2jklvypyytut4mq78rld57h07xsgwscr1d4wlmaudkyy1cs5tmjny3sqlwiqyspbbmtyq7pgl82r59mmkfgdzqbxukrefxtcdro44k9c1vhg4u13zbm84n98w9l5bypqfzjx',
                component: 'of1r1xrd1r1edk8xverpq7zqdxkg90jf7f9q0htv5sqcg371g2oqoz2syzx8ycny3gplufif7kgoc0pf4bdhk193pnbplv7wd9ptfy3sgl0bcsvayfrymjukprq3ahg09upa3a2vptcs9hkiis3f09ey7pgp2p1f',
                interfaceName: 'rfsj4mciqaklbxzwo1jpdi4uunb5lnc0bsdhfrbvt6zktlcxkskkchghtwzhaak6wzgvnlr8rxzmzhsx5gm4euioykn4huqac5rusyw731htm5fwn6uijjq8wabyz8g621n0fplbxdxr19ruoebvgv749ln4rpjo',
                interfaceNamespace: 'l04hrikrg2a17pnbw9tf8afypghxyy4uq5vrw64qtygr16a3xwwu67bddpv1ygb37f4gq5x1fvqu065nkdq13ppct8a0tkkbndfnw0fjodal0ucdisun5hwix3hb6s9azmw2voj74qwhzbt1l8g5jo9jsowa4dk2',
                iflowName: '3axxtag7jxa7bhypru4eivcxa5azt9p9mr2uextxstxsde3vsiiwptx74wwp25hy1taa7pdlc3yed7hyi2guh7bowwbjgmegbrb6j5wr9dnlznn0t5bdgq7h0xy5yydj1hwer2fv3esa3dft4nmpzqc825gaa1pi',
                responsibleUserAccount: 'hzpldn913ljng062mo3j',
                lastChangeUserAccount: 'gbpp3d4e449dh9ief9at',
                lastChangedAt: '2020-07-21 06:46:32',
                folderPath: 'awemp23tidlk04sr4nvx0fxmvxwmcxqic20uyv77wfgu9b3ung5kr8joxprd7mea397knsgp7g201aa1ovmu8jdrafucnlzd5pg1w2g1ztwxppj0xmpz5tld0xlt9mlpw9czwsntt9dcoj8vjgks9l9y3qi8md1lbs2qkyeeixhrb0zd8w8l3lvpln2rdz2g9nsfi2snbn0r58fqd53zoz81c9m5awi2mz8m3wrnhb3p5onv51ctu6w5mzpikaq',
                description: 'tde0eb9z4nmqlsf7v0q89z5yvet40hunsvehyfm57wbs41pl36fl7afp4cywh9gxz7mriztgqmsoejn5e16ql5oufnjwwxd1fc8w1vtm4fmkd2rm0odnrzbdwcxej6f40v4el20wyvmppgor4oxvzy33rdmml2kme7955kv4ao9ix10slf0fdly9ekp6bvvjsbeokisfahxkha9r6zx7hy4jhxbtpe625tm7sbgr1wheahq0e32ap4zpuq4a390v',
                application: '1cf3x9cctoud2d9erwcoke4860jw2ezlepuylnvj1iqp5po8nirafdkk8kvv',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'cigy6rw83qvqr968a8aw',
                scenario: 'ojf52kyi2pjd8127efd873dwvsi5y3j7slhen0qn2tyiy075mma98rbg2zw0',
                party: 'sdgzqeh1j4r1pwbjv69ha24sd2kcbcitvue285s7e6w6t1ltvre40gghenhpcfa610ic5i4r9of8x9iy9zuv5tcjsxlamper3296oz6a73pxlaxgj44qy4lkvnhscjfed421dt2xmszb731ihi0uo493ofnewoxa',
                component: '23bfmtvtu94nd0y2o47xyl9xd43j8fspskwbrd2hu128nxjnkmwwlwzd7wlmhtx8xxew790d16e4cmo2p7b5hp7yi4cs0g2n07wrxrqsireo18bloxdry4epdpjgebblhxvq2sm8la3k2n5o8ta8a5rdwa9yogto',
                interfaceName: 'q3j6dj2dnpo34kgvhxv6b03dr08z859rlq2u06tmtvtax0902t2byrhf5btjft465yss95zh2pwao911mb0mrt30ivpau2nj2er3l5adn601cr9bfsa6zbb4zoiskae7a4141l23tkmtk25l81id01t7cpk1vfgs',
                interfaceNamespace: '9muse8k1coaxn1qfrzdppfz2jlf6w4tc87tbjpmsdmmkyyrlb0p3orb444e631kebsplcqj9uuz1wkig6qz22wqni706z6sxv7swnh0bb8gq4cx7muon4fzhtdagxjbe6x1pkgrm50im1gcj1jbtlxqxtsw3llsm',
                iflowName: 'jm1zv9jk8hb3ksrzfusprw0x8uw6p3jm3fhlt6n4xmpmfwhdq65ttzp7nb4acfo7q9ahb38evkxs4cfqm01j9li80p2g8t58e91l7w1zku0mll99ig2ey2a5oalc8glsyid7z6hivthe2fl4xifaggt6brblar8z',
                responsibleUserAccount: 'cd5889i1e5yvacumxvmi',
                lastChangeUserAccount: 'fb1rspyeum7k6bkmvkgl',
                lastChangedAt: '2020-07-21 13:23:40',
                folderPath: 'ow6rbewfxc6scyr9n4mhbnfzc0fo9toagk64zk8icn5tl40q7vofh4vs3z7vg64cbzqd3p821i4aambvqk7fxh54q6p2earh5zg9vokqtak72buu1rl8bcdhmjjj0wyf8nav799kk3s9np6pbmi4ro9yc6uf1433k8khhsnncevt75iw9ymyrn85a3qcxndcv1b4816d4v54k7mu26y4nbnhp432uhgs4ogl41ix6qk0k64cubv9hboimgfmyg8',
                description: 'dmymklq9pche8etq6a23c1hwkmxsp2lojui8buhgctoyjgyxc5cte79u3zq69w6m533j5uygvbnjfqp22ojvs1g1e13f9o7w0rz4bkvmebmn6rkpbjssyy2gpzhcx5fg4w034ugxr0m1m71wv7rsid9nae7wpi9vl4gg1i0th8mrty14rvf7gcanuw5kj6gld5rq9eeb36ukf56t5rr5a5lhultcqxp464vw2zaumy96zserhe9yjutup9bnb60',
                application: 's6lptl4j39aaq1vpuh1d2uz4699ys72sengb9xijovwrdko7568plbcixhbmy',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'kluozpg9akix4bf5pqby',
                scenario: '8ekmb4n1cggr3edk9qx2p8jgp8o69tlnwnaizrv6mtst8a987lxav3fm41x9',
                party: 'enqzlul0ffnzrlouje02s9enzv1tsl5j7kqeobl0c3ecutksjyze5034tbiay1okyb0fxwgewxltci9g018464x0i1liyx387gtgt5jv21hduqdrgxa208ya621ewhop6aiwhm63rkpyu45cndxvyvwnwucv1vgt',
                component: 'qkk50dgjndehc12nf2xftht21eq1kp4x6mlcnv306m74eutk2w68n4weo68xxwc9w8n1qy7xw8o666fyk8qrdmzbzlfxrwgygcb14yz41igh1kn5qy59vv61h2t933tsh6qd7gry3yrseolbg17whb8ml7beap68',
                interfaceName: 'mr9fz9a9azy31idr4lbzja9ku0t72e8px3vn9qazood71yyqydnkcvkm9b9or09h2lhgb3rs018ww6dnkdm8cqnaroj227nwt1vv1v46hltac05nij0xkez1du44ad0allyjpjaudgbqy91muedtd1x0311dxpw5',
                interfaceNamespace: 'g3e3wb65gwje0hxyuw7y28nb0bghl5x3j7lhx1b7grk0cnr9cdhgh0dznzudim62aukmzypir05tce3se5wtyuri7azhfjlehj69uz606snh1gfwtgjrznshxa4yulqzyjy9t9ff6o38dwfpea5c766z1mb37kca',
                iflowName: 'je9fcguw65kp4ipw2rwj3zxvpnho0pc67xjm21bmfpmlqpyptt1bhbxm0d2czb48wyc0gku1djqc1j2dsspfbhecmdddw6zper660clcvj8ugepp0f36hsp1jd9enkndryae23jawl5fitjjia0m27ws8qqgxc0a',
                responsibleUserAccount: '66am8uvah09kwwm10c3m',
                lastChangeUserAccount: '5ympc56u5no06ocg68g2',
                lastChangedAt: '2020-07-21 14:56:03',
                folderPath: 'd9fy2dzqmnx37d82dxpofa19vw9dwxcyu4weygrwbmi34m9pnqu4uge0tlzhmmf9b7ne7ehhduunnf157yep48l9h8xdqphkbpz911xoqyqhmknx42isrtz5ihob55ho22u0eh3wpaz8vnk8yigb0rg050bfr56wxr3irmp426amfuw690unh86hnapjyhuze4t5ug28iewy44bi98dxc2fb65vemv2rknhu4znpz9te5toa88lslhxh1l32ysc',
                description: 'c7sd9uaszsipmc3elrwh3z7rtwa0moeishsq86cfx9e3kizmet7fpdje38g0ukso82fypbwjpigmo0x5zah6ulppa227dj0wyi9vrzfccby1lftjyzhqukjjj7iogzkiy2f46fhg7gygpejhoz03zpf1l4k7lullsh07jr9jr5nj1kpgdgpecla4ux5p7974v3qsq94vj2biy0h4x4f7td63cxvow9a8hdm0we3mxzdu6hyzuzhwanwwiouu7g1',
                application: 'c2z96kkjc44cayou5cfnu7doobgdz93058boo6jca2dako0cltkm6iuwe2ki',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '861j3dccvd9tc9e944in',
                scenario: 'zk7wzmggpmkm01pj9kijef7bb1qtjxkcg3j1qoveegpfhxinwcdworuwebjc',
                party: 'cyucopyn4ytb4g1wbnl0hox0fejk6axbvqh9thqctrg78my2iyopip1uu4y89bt43s1b7d49urs76lkbh6w15ww49tie9nqf10jexvdd8h8urgo7dgx7xvx5rdaic2qshniavspx51k4jk31kaxarpa0e0r4659d',
                component: 'l34e9odrb8tli5zxu9nhtvrdcuoyah9kcmxbfro0kwbcj16rcru2ravwh2jzh90m5w6obh5t5sqlev302jhohevvne9xpjflcicxnkfcps12i1czhfzi85422u60flwnm4r0468h6jhwr2f5xjerb091e07oerz9',
                interfaceName: 'b7m0m6hi16k617gvboafm6oekfn35m4l3tfh7h3o3ti2bojqhclu00ypj0bz12ivv7h8aj1dlvhckdkwow8rihsj3sf0rbm1h2b220q32qpe12b0sgq6yob67vao09vr6et1960nr6l5r6x5x5sfum4ad8wv8lpv',
                interfaceNamespace: 'jb87jwdlhbl7v7jzpdjxvlsqdnlgydkgpwuvq04mbv6787u3g5swpfa8akaw1ej9pbt8jyrb0oogp2l2d2n6p0jrceza5ymbreama5sxmr44b687eywhp84so8y97r6y3z1b7fgcw8x6kmm8g8ef183xukjsw7t7',
                iflowName: '62qs3s5wjzy28199l5volqm6633jtaenzrzjrtagjfcxlhlnr0crjenn3p4uzmlu4kkwcqls2fzrkuitghv4co14ak3ngbd1k59fitx4gvgm8uc3nueq136md78bx5awimvgge6sk9cm3o67jg3qde0xo9teoagb',
                responsibleUserAccount: '54j2os97yjwnekys979i',
                lastChangeUserAccount: 'rp0d4jth651wdp86i560',
                lastChangedAt: '2020-07-21 19:30:47',
                folderPath: '402zktpfevtursnefy83raddd1t0lolctxm75r0dzh20gsajabvdyb4ewey1c3vm9b5j4ptbe9zwdznho1hkvd3qkhtrarky4tn7td01ab5fyfht3j7ub0ni2ekv2lf9blyrxdu9l8ow2wez09tlnnuo1x7596qnxiawuqz0vrpn84etxmee97od18gcbbgu22yldce8m3vwl7alfm3ic7vxpyccyv98ozmr93q5objwci3pq4ooqf58swp038j',
                description: 'ytigb6lvllng0z5mqkzivna5r38k6fk0eyio4ddqbidxv8m9yyjdth14cler47ppddamjue0u27fbcom0g2xdhui9ityy6v8vmxwtpqph94ldcre82stwgyrpjkv5i3uqgkupcgx7gdmxqn5e2k7clrqd224qbojkmxt8ublu6li071a362u2tlr95pd66c1meog3o94puiywanv782qtv40eudfryohiivjafxafh7ntbz7xvnkxfqdnfwzkmh',
                application: 'eqclz6g4dl9ndm51s1yt9o1udkznsxj82n5gonvqvgmtiqa79zohgjcl1tk2',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'rzbd3i07yb1f406jmled',
                scenario: 'vo1unkf89bi5c6rsi21jqk6d21spsn7zrgiasr0464qkc3mwvfy12g27u7mq',
                party: 'v0g9tic0riyrk7xwwp26mdynxu9g0382x8en1sboyg2ak8nu0akf1s9c943hbj24ux8rys03rfchbblcc71x32oh7765xy7q1rzuo3re6amxmyiz71qm4bkf2aefx3c8jh5m3uiwi9pmnv419jzp58547nvqjrnz',
                component: 'mngclwqiao6mlj2nnm5umw2g13yb5nt6taf469zly4zbfmnwilpgaf8b6ytrr7r4o1iqrhhubjrdtufgefa0ggo25oadmp3xy7eb6ja5afd0sdhn30oyctsm31x7dz7uhuyg9792votrzr65gse7udjtf800t1oc',
                interfaceName: 's2dwv0qzjwexzdstt7m3ra0nkl7tsezp9o00qe4isk2qy87bjxv76buu6w3segxl3lbcid0j08o4xjldvo0jpn1q7t8v4ddla9qkesnevcbxr7fwbcsqpxs3r2476ag7au2zrpjdr1zxappf732dn7axq40hhygu',
                interfaceNamespace: 'jhws23peazlwsmtbmppemm3594ah50rvlprrwmdikg347fgfn7lk8p3tqb9tnr01s3wn54wzjbbx5df4byqdtpo8gxfv5074d2c6t0e6hu8uml6h944c3dy7vfghhv3cwry12zrmyut2sj0o6anqug6gxgpv3w8o',
                iflowName: 'mac7n54erbapuw3uk9old86n2i6f91gvifok16bjkhztqmda9s04civ7l81dc8s5oiwmilrnnz8r4marwz6gcnhcz368jpd1nctvroc5rydxznh8j1zgbhdmcix71as6cjkv6tgjlu1ntr44rtbiwqjlwalgdgzv',
                responsibleUserAccount: '2pm695ns3ph8tgt2s8mx',
                lastChangeUserAccount: 'ekvkpxsbpodzncauk905',
                lastChangedAt: 'XXXXXXXX',
                folderPath: '809e32wczci9dl67t3avd13xx7b2vp2iba40hjk2qqarrgwr1lz1bqu77jy8bxbpij16dm7peyv8887wp2ept7q9720cpznxu5l21hgigykhgipu2cbx5nf7x63l3xqrs1znwuc0vq1skgqwv5r8979c2x70c7w9onycdxeryvmegvy2n63xh3nvp2nr4js1ah0nqx1gnzk6rpzz29j9b4n32l902r14bolljbu8caqri2kw8whxivdelgdl3zh',
                description: '3j7xjh01330t3naog0tkhyswv3wny076bhnuwrvi7djb4w9lfz25qh9v6zw3rn8bsu5vnmoax98q8kilfz68kist7te0vnkxxt459fayr12kfojhgdpyr97oxhxjgbypmu4bob8xqxl38ppbi1b6yw0hdcgo8tec9uuzp575lecsqsmyi10vzfjnkjd81fbp2ebsacteitugmn09jzdtdawxua4133t9oca86zo1gzo2nr9se5tyn8gs3w4kprp',
                application: '2iesdvda15dxvatka7c8e425nzdflmyb54mg7oqm0rsjnhkajxihg44mhsvo',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: 'dlb1xtxdzdip5kttkor7',
                scenario: 'pxsawxfgjpqyphj9vdxmtak4u9yy3or51mkhcj8l7lopf67t6tgg3n268p4x',
                party: 'c6n8kuvwlyu6lk0xonye3qx2t5obk98uiwid4ktw8kqruxui0cg73tus1p5zte43xzvwi1gibf9fcz9a7hb5mzk1gsi42v7l1zv9hx0rz8lqtp15vhdvjb3ouh11bfyycen8kehl3pxr1u4ofplgbilffv4cdijr',
                component: '7og59cay8rmyqjeojrsossaqqnx1d4g1fvlft5ea0oskovyz1gmxnfaagtxdxl8xqrqmxp5lqfa28wc54rr8i7qwxkram7h1jus308vjhxm5hujaa1p61kr9cblhvaclg2nee9qoo9p7einluwwgd8r21ccdao4y',
                interfaceName: 'qbo4lakcivf88l4id4ch6i1gvimi8z3ybomo86n24fjh3avf76v22dq1va17qodvr5w9mt4eypquz4havrlp87pc32p6c5f7gl0ie397zvxd3qo28wtj9yqpjb86mx59cy2baovj894lr139kgnlwhtmt1bxphx2',
                interfaceNamespace: 'l92njuuv3tuvheb8gkh7uej65gj0nrt895dj2v7y6p0hb5c38vod08nwwzeoptnahwx2e2i0q6g2mz1ws5xndw61gta656tzoayfdy9ouukkrsgec5a1g58yqt9t53g0yd2qgmvw2rndm1b0rcyacgon7pssoj5g',
                iflowName: 'rsb7wrw02l4rpd0vo9oifz61cq1oc16grg2pok8gif46boou4r85kxqxrgcehf240i1s7e52dahwirajik8ibktk791fxe9sej78jpbkhq75xsdkhxuhjy44e5cjjbs3wh21z6j2kdk5ceihw85l390dnzavsmzp',
                responsibleUserAccount: 'dcw9ten1ezdshddxjvb7',
                lastChangeUserAccount: 'b85yx64ziitaae7uo96d',
                lastChangedAt: '2020-07-21 06:48:11',
                folderPath: 'adc5c9ztmers36o2hauri0n1ln7dtfvufhl0jtl3nsbbb0p3kqu1drk0pjphyf3s2hyk2puhdu2og76cui0ikz9m9o58tg68yj0yz3l0sqenkwqy86wigqpsn45ysrvn5caa2t86ivemeub384c863h3gqnvqm1udsww226mkhp1wulx1taktv20xqrgpkrpwnfj3vits4ji4adw8yjx7rye1bllzngue807hdpsxaerzoqjmcngl0rrixqsv7r',
                description: 'xvyb01hu0qryjbfc0p80qgmthc4i7728e6ab9b24ht4mz7w8cry4hhpeyp2uud8y680nuuqo9uhyshameth9o2arzshp9uo809vpper3yjfsmque76s85pi94b5i69p63timjnpaag5l0gl09ya3mpjoh3zv3wye7f2o49e3bc7drn9iv1cnze215sn23j3wqqdc2qu8bied6o6pcszjpepwlvmxprdsh9qxecothfawn5t5kyw8p78ioawi5ed',
                application: 'nkxb7sve0dqi34pvtyql231i9wffiwwbcvkdnydc7gx0t2nlr7r5ec8e26e2',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
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
                        value   : '3ffa9d65-7f08-401f-abf9-e69f80fc8282'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3ffa9d65-7f08-401f-abf9-e69f80fc8282'));
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
            .get('/bplus-it-sappi/flow/3ffa9d65-7f08-401f-abf9-e69f80fc8282')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3ffa9d65-7f08-401f-abf9-e69f80fc8282'));
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
                
                id: '8540c2a5-e72a-4968-b8c5-b5d72d1a7906',
                tenantId: '75870914-de38-4de1-97f1-f265f4ebc6cf',
                systemId: '285f6ae1-2007-434f-a019-55a151756311',
                systemName: '4lsfcijkzaf3emch2s1o',
                scenario: 'mi09p6u98k90ukp53ud5j1siiqls40aqphpw1n9fnxs57s286o9hyx1bu1je',
                party: 'egjgezkrwf440za2ytwk57u3evgjymc6ab3g4gwos74bnfr15q8b0vsxqwgdjqqkvv5hdl412ezrs8swdordmynak2hqer42t8vtqwjvj1k7dodasmdml1qmfv067p1kjfyvh6eafa7n5sh3rafbezao7c1qckxv',
                component: 'vywe9518ftvegzujgtadc23ei7g9sfy71e1ut2l6mps0n0r4egi1dijjxcn0k19gq1yj0r381vzz30q3mkibxyj2qc3k2nzqckzefh7r95o3in7388kr3ua6hu5i0ixmnmsqxo2emo3jxx97rtrdnsuszci4n3f9',
                interfaceName: 'zepps2pxcegkm3ymoarsdesm1e2c0pl22lvoeaqof3p033ut9wril5ipiey2adi2pyn7pqotblpimqu49zfcfxhinq90hwdzkyyf405njsvhwxo6o1rp6cvbiwoaw7u0dofav4dvlxzuppk8yqk6pwt6aw42wguo',
                interfaceNamespace: 'yyna2pg82g83k17odggnzdnjmm7xhg54y4j8i715k4hfrqhyfk0dni7ieqdqxaqqlxnn2rqgifpk8qw4v5x8r3z0sp96lau4i1b08cvdmdfoysfrcs5wij0fbiy85ajipgaslq6egick9ob3r4fqnbtehpvlir35',
                iflowName: 'jbdj7vn1owh4j0i6472226rncdc6wkl08q9a1mg57digzdgv5g0qrzmh7dvvdcuzxo1uq6ezmb0nimsom4xh7w7fx912dt0254irvax8sij3da11isdlmxuceyy7qqzefpl8mridmbly93kybucoxgv5mk2a39yt',
                responsibleUserAccount: '86sl7hywnt9n0vo4adzn',
                lastChangeUserAccount: 'rw4xapv4ul0lwj0kzz4k',
                lastChangedAt: '2020-07-21 19:28:24',
                folderPath: '9ix1r9q0otncxbw964g65v0jjf2paenz39prfnb5oyhbmg1o1w5jvtxvrvdyzsj71drrlw62o8cdnx6lsw0zdvkaqjydvzn3uv39g8urufq73i3h8ujxfjv51weq958r0btnhpenuula63v2xcqmty4kcrbzeb7diq9ycoabeo90gwcu13yfulg0i7oltgbw3gplmxu9m0s5qvqc4hnoom3bb6p7el0qfi8tf7kh0dgzr3jlyp7iwzai0ojot0r',
                description: 'azqytc5kk37dq03x0scgw75u73av1vl5ik4wki7nogp7ly276u351ayvds8woq1sv1cyrim84qum343q8txbebk49bxdw0oub5on6vgk9kgw71e3fu6vukjb45yj66q11ltdyumqha3jlt7rdgwfm2eh6abkumd47v4yz34f80uhxc27dr2kesmwtjcky1h9nmeg29e14dygu2bxk89tvzngifbkn3ihw61v1tv7ucy8vk7z9dnylzn7ixtpxtv',
                application: 'otvwn8lq65uvdxb4eca64qyvd6i5nvnfgkpoku6ay00we1l928yrxq81d09l',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'aa10e7e5-94ea-48e8-a6c0-7562e437634c',
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
                
                id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                systemName: '8ys39oa2m3e3zoun1vv6',
                scenario: '55fju2o55kvocegs9g1fa189s4z4zowme4ihs1w3zc457crb0k1gwle0489a',
                party: 'ce4hme90d6me8dkjazhvnz41k155py50x2odavjr57e15iab7ejkwhpqlwj0beo9aa6brlqqmdtzypwa8bchaqi2qggzn3r4usg60ti5551qu5uf4cjnf2spach94571mgs72pyg25qtwbzc4dzurztjb1mzk836',
                component: 'xvbfqn2037vqx9bxii2xast5wfv1rgagrggwp8322o734wcduzwhqs95wuwy3qnvipajgqpywcjrgpsm05dfl123me9rxx99o5hzworgpqk6pp1tiya9wxilmllglye9u626u7qor39aiqgf81m3b0ozd085k9st',
                interfaceName: 'n63ryz0sw03bnpffe730ipkw1o64yccbefzjgy4ff4crtxgdx6rh4qmhm7opmrh7i5qbo9csg7gjx6d1ho31thk72tyrl0an9mk91p4xid8ias2p4w7ku6b627qyrbn705lmbnzsztc3krp4wzjqmyi8tp03mxwm',
                interfaceNamespace: 'qvq1hm71bxzx9trgr9wkugozus611xyjp6fp8ssmv87lrzc8otloo8g9y39wqd2a9n2lrcse040sinezedaqgk4edqlzk742km11jcpauaa7xu6pgj96wworgfz0kqf5tis3bpxb1obu9yeigxhtn2vhiovsga7f',
                iflowName: '9upyro9a0lar0c415o1m9a4b8zxbqcuwkpgjwks4bo5km0pvqfuni0mi8spwx2y55rukuafbpmw8va4u54n0ocb3yo5nn3ziwbmsyncrcknuug2rxcnqed72iqxqlwypox25pwb2m22iy9pllp7u9hqo1ijyeesb',
                responsibleUserAccount: 'ti1aieg5cm9ey0ma851t',
                lastChangeUserAccount: 'ess5qff8sw5npr5bnvor',
                lastChangedAt: '2020-07-21 04:37:15',
                folderPath: 'w74umm1a5yc3u6bu0qaq35g6d6vo92cd1lne90z8t56ix1xmcmf0x6kp1kin58gnsrj9i6nnpgwfag346vme2u2z9537x856rbeuxtqedo1oqzst91gj7pc4xo0lc47kj69pt1cvkcvvxntekc997re2h84pi8thz8r4gv2qwh9m1p2qgaeg5d3jwngc6y4zho2zmw951yisjed1w2qyy4tcy9hcdgx7xah4i4o0ghh4ryecg16xc5r98wdwyv4',
                description: 'h5hyzoz36eulmhw7ve0ejwking602zbiihk44kx95x459b3014exndvcpcn5dbmonfc9ft0zv2w2o3a9jtqabliicj142u5xjiya5s5alh7cf0v8b3evqkplqnmou9xxx3udzwiqhj2hzaxxp2l7t9dexx8sus23jxf05r3i3vqkbi0fjweo4t9fs91inwj0tchony7km10hpa87070sttds0udj8u88p4pjva7492wcysfklg0etl2ukekf5a9',
                application: '6gp9x310xckyrykxnnho53ll7rpqtir4ejuu0c2y7t41bz0hkis1txw44a8e',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3ffa9d65-7f08-401f-abf9-e69f80fc8282'));
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
            .delete('/bplus-it-sappi/flow/3ffa9d65-7f08-401f-abf9-e69f80fc8282')
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
                            systemId
                            systemName
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
                            systemId
                            systemName
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
                        id: 'ef60ebf5-d923-4fda-a2c1-187d7f5277d8',
                        tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                        systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                        systemName: 'w8x86zcxyp30je3fxrao',
                        scenario: 'ox8f1a35ytlqkmv7nh96sne17ff7llz0qlfo7j8m3o2szi51jb82dp8rgwc4',
                        party: 'n0nzy8t7203f97zw1lcqbvgrvi28so8gx20kis9nfen580h4yiscktdou99rm4knm6k1lek4ry7zf81p8u70uwunxhqienep7ujvrcfdfvumq1xqy7ftb8mt5z4kzztwk5a5y213jceobvnr11oncnlaoufkaqfi',
                        component: 'i1yu0mquvabmjld2nbxz5g5m34tfho5tc9ew5p80yk18lgdl0dja3mmy3y8ewu5ps9b77362fl13o6jpj9zlttiiavr27qt6qehztqmjpnqn2gou6qyqrpicus3hohr7nqfhvrh25gfayns0nautkb5h099nz6pz',
                        interfaceName: 'hlcngrlrvpx0vcvjgjncp2epfibb14cogg2o9spglktlz7g8uu6gzwgs4pjj983hwfhxnjkass4iokqplxkrhb9lkwwfj3d1mn0dsjxjteq20k0qbyvcfcdz2lxx27ni5p16cl8vctk1630wmyu5vd3eimh7oz8q',
                        interfaceNamespace: 'wunn5mnzes2ogralura9j8opkzrk4qskyfvb1s9nw84chahgiwnfnwuy6cnlxdxz5fhq41gf50ymcc4cumzoicnvq4dfqzck56osd226jy4zn0re66lhs1r9hzb3wkayixosbglchih52mw7384i24un05l60byi',
                        iflowName: '8g282x5cy1ftpkej5fmpnkvur23v4qe1j4unn8obd4r9xste290uc9bpa7ziuc9sfojhedy0ekebg20dvpvdcrqwelop1txsu9eow5jsuke35e6hfwm71tmnhjyql5j55z7y5a6xazxlnh8tobotkpki481td7pc',
                        responsibleUserAccount: 'a70rem42qdj0fn5rs27s',
                        lastChangeUserAccount: 'lfdslmet8gxzuuv4to4j',
                        lastChangedAt: '2020-07-21 07:10:40',
                        folderPath: '5o3cytnurwswf4quu0e64j2ynxilw2b4c047n03ck1peo0gedwxf26ssgzj3kvsb7ad3y1gz5fb0kb0nfdfc1h946t2wjudrn4dvqldc5mlzo5qltfyeuxqd4s398ezcmwz9pd3ppgzyoq7443phma3hwepzk7m8f8cxq4rkyid1j3j59ewbwl60icdg7xuv3l7hxoit1tmsw5icoiktxfp0sofy0cdd28aoy94ygf49yvbt6z791ezafmy49nq',
                        description: 'oeikw6jpf6v93qbl4me3vb2tgr66pppwke65keg2w0ppgqy5jsg5v0r7gk88071nyjn19hoxc56kb6t8k1qmuudghu9pl6uotelg5f05zds4hi325jz257qdxy1jn9vnumxmsvtf6r97tqpegp1f82n4p11ohuktuksiomwbtzi8n4r2wz86pzvcnsxqjv35fnq4sx1a84f5hqrk2mciejhmlupt36yrgabrqvap5qz6bq7uw7z151nxnhfqodl',
                        application: '2vt3jewp2pnyu9myr6f3xmoq1tjszd4c8gfh4izvpov029c5tfmoz3gsvjvb',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'ef60ebf5-d923-4fda-a2c1-187d7f5277d8');
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
                            systemId
                            systemName
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
                            systemId
                            systemName
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
                            value   : '3ffa9d65-7f08-401f-abf9-e69f80fc8282'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('3ffa9d65-7f08-401f-abf9-e69f80fc8282');
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
                            systemId
                            systemName
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
                            systemId
                            systemName
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
                    id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('3ffa9d65-7f08-401f-abf9-e69f80fc8282');
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
                            systemId
                            systemName
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
                            systemId
                            systemName
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
                        
                        id: '50b4248e-8dae-40cc-a2d7-ff1ba0f6a64e',
                        tenantId: '0f17cb07-9d2d-450b-83f9-5a3edf246ade',
                        systemId: '720cd1fd-1dab-4f2f-b841-b6930c6bf3ad',
                        systemName: 'lmfq24cp8gxmk8owatwc',
                        scenario: 'w3zohkf0x9ctfhmyzfo79lpabnkosmsu0n5e4s7pzho3unofk96tdq7y8wfi',
                        party: 'szfce6elf7xgro3lh1p1jd6tqltc5fj9ott6lwvyez9c0i70y0wyjqmppf1uczzlf0zy2x2jjt73b56afj5hrzxfvulxvl86hc2p8jq9mmysxvfv7zhpca9qpy06j4ih7uq3cdpivkcbunq8ofmnkt4rqfykbztf',
                        component: '46ee6xa3ju66bpdzr8z70107jlwpj9d38e3f5w2xckh2hkzldj994l0vjsly48zxk836tk02hxyaqofznooj4dnzeft37c11n2d3c18c1ex7ooqa2pqzilmsjsm1vxvabnjj71sqnzvchhe2zuemdhd59stlg40i',
                        interfaceName: 'gofgqzne30oiso7l8s7ymsjjc7jnlgwlifl7ttcxf4z4gpj1ogbram8sc2gtn21gl8dwmgf7wy2f7wovsnwdfhbuejgl39nxe38kdd83zf4bam11j49t1varz4fob5msfrzmnpi368vtdrn3rme5s236a6u984z9',
                        interfaceNamespace: 'o1xu8ek4t0vqq6izf5psm4kkqc6rbx24enlj4ne2y1ylz3mgzgaac2cjcnqnzep2lsv5tcxe2al48c1aaw33rdiept5ab3jdowl3ub0dxxl4qbtye4mo4vcl08lmrw69b8oglwb3i32zknaqa77a8lfu2i6vzy2f',
                        iflowName: 'e1xgzm1xrtckbs40hrzu5klzpl0avzy790oeslypnlsu8upksob8jiy7zsg4wtizzztenar215lreq3xp2l8mrujbjqmjjrdq44dw0r5wg6cmp7bt1kbwq5ojpszv6zfiw6ouiyyfo40h08za6gu5icigm27ata9',
                        responsibleUserAccount: 'sh4nwkmzlw3e4dj3gm3a',
                        lastChangeUserAccount: 't1diazebr0wjsndr3w26',
                        lastChangedAt: '2020-07-21 11:59:47',
                        folderPath: 'hr4ady4wqjop8gsv7tnxn5r8o195wuggjw90puun8bqggkk5tptoztmoa1vmvd0h93l1miq9tuixs0ugapk8svlkbdnwsai5umcvucyhtyrqfpt5quxxkzpiwx3pzzp6mdg11d01ffd67hzyms0cyl6uk41w8u7u33eon6guk4n2l4mxezi1fsp6etybq9pj9co4ndbc3v15z33ap5yrdim85bzugv16pl64oxckewdzpv8pafjdq0vh6dgwmjc',
                        description: 'kvbswhdctcwz6vhv3q50vi8pnlhev2pm5o13okmbyetp2b1l6r3kqtmxaewlw6oz5qxmnstmqvh48p8g2btlgepobzd3778llvamyyzd2523naiuue98fn2mymjrr5hmpfc54l0c1q7dhyya2in7hbu3k34wvxtkqcsaqzew7p531qx4ejqlaca9y0vg2mtvw67nn7c5tlzrz7158zgtms22uix4dm17yuv9vn603i9rdug2x3ar5p213npw5z7',
                        application: '63xm9zzbaqhj6ob5mowepy4oz7ff08j8kigyrdybs226ww348zn77n0in5kr',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: 'a62c8b3d-1637-481f-a727-fe4f11565e11',
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
                            systemId
                            systemName
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
                        
                        id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282',
                        tenantId: '3a116be2-2f49-4115-af91-34ce2adf98e3',
                        systemId: '6da34e26-9c61-436a-931b-51706f8ebdd3',
                        systemName: 'kq4ko3s0z4yli63xvpdi',
                        scenario: 'i1s5vsozmpddb82334zgwa4n8ar57lvcxczyjaez9uvpxphevdfwbh6mjx5n',
                        party: '7m2nqq4po1q44v2o2k7l7bdoa2r52ecgaq6u0ozhwrgg49rjehz28hf9yuwtmpntjjf32i8tmtcvlw4nsquf9k5oq743jo9qszc9mz2bwgovwqjzm2ivdxw53k6eggpmt3m1kprsa8w877wgrqzq7jcq1xedizyh',
                        component: 'x6l0jm5xeld85iuen4a6zukz4wjfqpew0ehu6papcvx8a69py26xelcvy72suljudq0eumj8ohdin0wcvuxyptofz41new9cj33djmnpp8xztwjw5tprtdntap4ek0na90oei9d0veu8k0zdj2760tt8afphyfjy',
                        interfaceName: 'vrpp0ycjf518fzdxo9dclldsvxzjnihj4vzpilhsp75pxsdd075os485tqfn7k5ooiblqqooauaop0bvd5hkdm5pphmuuftakattk5g8re7jrpktcxb8oybylcbks5patkk84b34pk3p58v6qe74w9gwp6gjfulp',
                        interfaceNamespace: 'j2fupyl2a1vzecloz8dnpw94w75505x3dqmih0fbb1bxzxgremsopvtgugbeme60at4saj6wio5ewc3l5w6g9r1j1ey20jazkhmn6prrhi8xsrolbhv6evmwxcuobu15o7zvo3kbsa9n7csd03r02ah70wxw5ltt',
                        iflowName: 'uufwfthl5h33rtm6cb81qyq8h4v9na04pqm1tx56903i83hf8azfcwi51q89yglca25kt83d33ruy4mu9d9hwxral9hiwlq0trsi9ns0sp4qp1luv1omejwax8jt0mzq1tpmp8o2dit7v5fsrgphut8dxc22wf62',
                        responsibleUserAccount: 'e1grepjobmjvd3cydib6',
                        lastChangeUserAccount: 'w7n7yqytifhw5opue20v',
                        lastChangedAt: '2020-07-21 13:09:23',
                        folderPath: 'q96hhvx7hsgkq48yd3coynkjqojjafv2siez93xufas2qkzokzh6ktcfh391js2xby8qwf015eepilf4kziarxtzmdsmmq8tuncl4w7ql3a5wa81ty0k59i193d1f6qcce4oligrrmaq62f4eutokf0rim6bi0707x83mnwalcyqrqftddjnvm279vtbx1pvig0eovil4tprw665sk322i6bl6kcoj3bqb8lj8xo03fab6dvd4c67flgcd4i9bw',
                        description: 'e5pg2q8m4ks8jn404xo9ha7d0ej74b3alnlre2kwel1y3iqmo71iinqv9r7kimbxclafar3q1ohil7yb8k0b3x9fm3egs91nb5gf37ghdi0wf1dtw0lk3cx6omwo65f07xjritq60wmbox0670zxyjl0a14kn9n0erclzpnkstzchpwqne247gim90wokw9k9241o2js2ljw9krqlrb6xi4c62tukyxwj0mmkjroby4reiozdsw7i9xcpz8kr6g',
                        application: 'epo1oldwc9jtg2e0196jyy0zg04slwgfnrtlwm7u3netzpk0qjjtmkx0juxz',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '091fcd92-24d1-4939-8766-08f3d7da9f96',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('3ffa9d65-7f08-401f-abf9-e69f80fc8282');
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
                            systemId
                            systemName
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
                            systemId
                            systemName
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
                    id: '3ffa9d65-7f08-401f-abf9-e69f80fc8282'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('3ffa9d65-7f08-401f-abf9-e69f80fc8282');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});