import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.repository';
import { MockJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/infrastructure/mock/mock-job-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('job-detail', () => 
{
    let app: INestApplication;
    let repository: MockJobDetailRepository;
    
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
            .overrideProvider(IJobDetailRepository)
            .useClass(MockJobDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'bget3khztnjod3ny0prc',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 15:33:26',
                executionMonitoringStartAt: '2020-07-21 19:48:06',
                executionMonitoringEndAt: '2020-07-21 23:03:38',
                status: 'COMPLETED',
                name: '42lc8x3novx9dc2rebs5tr0pl036xt0k5qnjmghe3p0mjlaw44fxlaetm86btavxkqtyz5av1m3s75t33edvsshf9i8zml81oi6kdv5s7fx38re1xe5sdwgpg20lx3o17b1e6npxm7q9vkfpft7miq3f1vwjdgwl0owp52va0wb0qad2qukmna7emhknd3ldda8np2fbqe3lx6ajomkldgctkrwv9urjwz758639smzqo59vg0urkfurcmblfqi',
                returnCode: 1354377964,
                node: '5i1t5vzxr7ywcorgx639u9f9wbl0gi11jlr73o4jgadadmm1prw9fchtmlrevyf4y9r8560qqj4omo1dnyy04l0v4ao92fiusgyqjcfh6xzbypvl52pqwrdm5viwdhojeplmp8928j4u5p90ee4aml86qz7pttv3',
                user: 'jjy3b27nqwwvol4j6gtn0aqoz662gw6jh327qy523dl7danj4byfgzjdfrav5yj5goerp4weeh7439s89aayrs4twyndxioujucxmyjea9ey5j7nc83t3a6y17dz5fne9s0zdrc0v5873ujoqjq0yadti18unq1eczjlpjyb0wnz10337uzuy7cy9dby6b7ukgr9rdtz8pdqbyd7fz44gt8wd1dwkk6pgzqcwflebh157mgdx89kuxc32830ozc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'grdifdk0fep7omiuhy20',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 07:01:33',
                executionMonitoringStartAt: '2020-07-21 11:13:57',
                executionMonitoringEndAt: '2020-07-21 20:59:50',
                status: 'CANCELLED',
                name: 'fr6a90s31avrjj4w1mqmrsmdl3smw6fysu1hcm1l2czpdt6qgllqf31h2apgkqu6ll268ozq8db1p2dhpycy16vppqsb3w3llelc4ddjrr8ifhe4m0ky6bgmomdyissieicuwyw4xuxoxcupouby0kzxh734ojqkhz8xbahhyilnb7m9pekjqal18b5u5ca90br8d8dnxh7gh3nlf5rdcnip4lt7s1ni11l003uietk54u0e5xuz1sa48cyrwoq',
                returnCode: 1440665948,
                node: 'l7vyjt73xp59ecu5on8egwoowbw58muw89uowctg377fg3jktxfrrmnvzepf2tnfkgt3i0zgwak8m73nc5lnonewr39cbjalgquutgbz2w3ftrciyah6yew8xh1gbxpygtvdutg5crpfq9lzehd4zrawb0jblcb1',
                user: 'yuhuldk4yfvybwf5ga94fbtuvfsf1cnh5i896dqt4brt9j78s27bcz7ij82x822im1qg3wx4xcx663i96ntrxra0ccwtol00xrazj2l0gzgr2wgxz9ex3amsnsl4fup7j9c12cwm6yr1q6s2ctxtz93op763wu3q20lnwp6j53w5b5tdvc1rd4i9mv1v5kmauii9rw7pfucsq3oq2x1prhgdm8f0ull9guuyxf88kvankulvn8q9n3i6o1bwicz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: null,
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'v7n9muuu6oghlp0irpei',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:09:51',
                executionMonitoringStartAt: '2020-07-21 21:31:37',
                executionMonitoringEndAt: '2020-07-21 07:16:41',
                status: 'ERROR',
                name: 'vdhiu9rdlcvxx2xfixl01akude5vu5sv721eu4su36lrn33i12h37i3fyg7petld5uu3zpbgwzy06my7f4u9iwmc63xikzp499lqhez9j61jkf77h64h7xlmr5e17n145iceuh48iie8qt44gx3i6nu70qrhcal9qq94yolv1o834nrlyno3fwnezvng94eiy38f3dgavcuqju6h2360og3s8i7cyf52smlwve3uldoooiozbvlcecgae4arxpr',
                returnCode: 4276180035,
                node: 'af5gp8zvjuwo9o7rutcr2hmhl230jarg92i0h8b8l1lmq61r7eukpjwiu7mnxk7cmsgvspu2e5pt7zawmfisgl5t3wbae7wap6j8hobymz5lpcc9ts4gv2yfwehf1galtwibdc2b6ygopr6thxm8vseemm4re92s',
                user: 'tzls6kn2mp99rs9uo8n178ygxt5ojmg6ul0djkls5bhb91d0kctn6b5yl0lq9nzdcxq4zkdy0eot9tbyklzuciwa2pw8a9btpz70evaq09mx15j6zchasu5j52ox5wblvsxhtmr021l5ep3rr5zwg99brkel653vvlgycz6jn9kt0rhzas3duximotu970zpbfa9ryki9crlb3tz92v5m87li26rzo9grpqazey5j2pzksz83n26wfgxk6g3idd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'obld5zu6cwml4b68j0xw',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:47:07',
                executionMonitoringStartAt: '2020-07-21 19:23:56',
                executionMonitoringEndAt: '2020-07-21 21:25:24',
                status: 'ERROR',
                name: 'ayid93hb1j8z7zot9taelom6k7dj2b4fk4kri7c6nuz5buhcpfknygl4wqbiftcoxc4zg0hgn2o795hd8h8j01qiu50eh93vbvbaasp1krnyv7iipsbze8f80gr662ectdnfni1oqwtv20rls587fdtvm6e66nswd8seik2elv0a1dwiyqn9cm44cmenwsa274z8n0t1fp3ouwghjaa1hwt6k0ue37ejkoes1l0z7uh25e75u2egu62womc43hl',
                returnCode: 3522237234,
                node: '4qud91vi4fvj25rvjtdwq28gfpmyikm0jtn7k0x7foabrrmuufsryc2iaugyyvkd7kg74dt2bixtekgvay9buu7f9nj48mi3cz9of1jfj7srxru8jrll2iabcd43j3na3nexmzrrtkz6kp3yb9cyixq9qg6tydc2',
                user: 'dsbr2cpo8s70rwcgnvp1mqt0hqemyoxtqow8rz8pfwrdybhg9e1ldtyd7qnfkv68sdt5hyqgcazzg4ru05s47n42slxvm1ghe2k48ddsadsje5nlyfl5xyz4nb30ljruejrwjmc0qt874xo0c2duaqsqdhyyb9rakt2aj41c47c6mso0g711w2rohcda73mghpx5kimn9in8uc2fl9mh2f2bo8a1ute4pjmcfcf6t5xpjyirfgtnwbofoti8dtn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: null,
                systemName: 'lk27cqu3o4n6gwfamqa3',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:17:19',
                executionMonitoringStartAt: '2020-07-21 22:45:04',
                executionMonitoringEndAt: '2020-07-21 08:56:50',
                status: 'ERROR',
                name: 'or9bsd5hdxennz6opuv6d1tdwp4vm0cz6odtod156poomrtvo9a1kuff9awpmjoaufeey4mbbtgivefnoeqb1fl3jsrl9c0iip97iaksmlqd2ofkyvpbh02491bdd3csk38vcgb9koqszu2ztvmghaqvc8nzn3ku3vxyrdcq9pqp2f8c2cmbm66i1hg2ja60acec3ws5g64ilpox62u2v0wcbmgjb7cexbzbbqbc28z3m82bpxzqpze499ahk46',
                returnCode: 2397255854,
                node: 'it4hujylz3rshnghfwnfue9bs0fu37nedo1y9kizofw8ttqyl4zl7aonaado8azz4zlfed0fsk6ayo04ncjmaafyo06e70bty9czqp0qge2qwpgcyqpkl3xzv4tpe31rvgpu9tev7w3kmdmbavhifw1x0m7daoub',
                user: 'liisfmds04il8exlfvjnvwrj3482mthvssprf10ehqq73jpij7tdcpag07gesezqmvk2101e9oheimoavm3sw4jtcx48qccypsasrh79uyivq71cy6wrrvqc75jxsydbr90p2m8wots4v2qbbzz4zcx7wh65dj9esm6t2m1k4ip0izi19t53i72i8zt3avwjpyxin0dzegccskpotim44u47btpxsyboqjvp5irsy8eq0ovy16kerge78oxm4cc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                
                systemName: 'jac2klzxjlkwi4jv7h9l',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:40:12',
                executionMonitoringStartAt: '2020-07-21 12:03:37',
                executionMonitoringEndAt: '2020-07-21 21:45:15',
                status: 'ERROR',
                name: '1azx7mspc88geehtpwejqlzuavcrm24nnttj79x82k5cauqk85om69r6ostbn21qc33bjtlj1m0wcpz9kg45u1zfvtbblx0sw9upvopol2j1bs4a21mspwgejgqtogo3f8ptt9pahghswo732ydfwlhqqkx6co0x4uv5zlz8vg2znzt0teqsaihy9w9p2fc0kl1ei8dq3yp4nwi7e6ycgbtq010sf9te6j1kk0044res3asajkell4xdpbjipp6',
                returnCode: 2036673955,
                node: 'e1l6rg92zhbevvdsdvpzotbon3o7bq5gykz0ehsifgx0g8o09z09w5bkyducyt4l5pv53n0c1ed5ivfrv47ytktufnkwiy6w77io7xcrp774nsj0cn9pryjzygz2k219chem3nc9ut2zf9yh89ltachm3l2a6byi',
                user: 't2u6e733ys25r9ijtfapr2l843zhaqsutjsnuwubzbldwuh899t2mk4c0hdwwtvi2sxc06yfmxqt9q1n9chj4as337fgbw8qxjswirekxhe12gnny4cuq4ri4ai0631yiky5lmim09x5olfmkvuwgc5xzmf67po5nypg20jz2tmd7sptbkzfpbs3ysycboigiiipme8acizl4wya2qgqwd3tzkawvurv3ellotyk2brv4gyaxokc5rho48jjelb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: null,
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 11:21:48',
                executionMonitoringStartAt: '2020-07-21 08:54:43',
                executionMonitoringEndAt: '2020-07-22 00:14:34',
                status: 'CANCELLED',
                name: 'u2c5ksp11xco3k82lvzpk0uqi2ct9d2ovmyufsm661gpwuff6wxn78rwap97pebxz1ol215r8kg0624lj79okgv5ftp8od43sni6g7akiryusjssxg82cz1h30no20z9qtym2wk27rkotxnkmw3l3r9zye4d0xmbaetp1vfyirojzlu8na2v8o6y4yr2papgrbtiux7rc2mhgbmu31qdvf6zk0a4i5hsuj95h80buos0su5vtuxllxa9331oub3',
                returnCode: 3478831760,
                node: 'o0ycjrx31aqhqluq4hv8g2atsnnhy3hriyrsvx1axq5srag09mna7nsbv7iwexz4cjxx65uw0pvcyyzkd61j9la7hor69m1hby19hujg3bgepenj0y2laq84pa6i0rfjf0988pci76a4p8wekmba8mlnve8zxp5w',
                user: 'pelzcqzt2w7rob7jrtzm02comtsw55804f811seintokpdt4kvfkcdlvm7oww6wvgyjx9vuz4sbhz7m1nag5owma4kbxaueoen167hzb8pqwlnanywesf1iwdmy8s92745l13tto98yuxnl72f25k9aq7l20z6i7hxn2kcrgfq102qowgvf3acpixm916wlexvgxav3t1oc6k8cd452y4112x5m181adbtgs3qxsa6wph443oyvhmdhh5fehap7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:11:41',
                executionMonitoringStartAt: '2020-07-21 16:49:10',
                executionMonitoringEndAt: '2020-07-21 04:54:17',
                status: 'ERROR',
                name: 'zq2w9hpo3vnc066n9ugy4egvjumiq6x9001s3m0f9ylmnqj963ud2bmvgndng15z4euzskv8fsm8y8yim5jdpwa730h5przqy888wezjnztx5f1pumvwxaqne4214a2b5bhc11rswcvybddtb2qsljo1ujn6zoorpr0mpq1z3tuet7fjdf1vbw96shvrdu5ywvuyx24vs3x9uktsmoc3dp0gs0jghv85vvoedrjko7nfbree6rjxs92acc6wn7u',
                returnCode: 6695218346,
                node: '4llbn1hxb7cblh594v77sdrtg0gqu99nxsbyva8ewqn79dti2cj13gkjz8vzehhsinxdtux6jav3jkn3x61wwksr60jb5zv2d6ejs4h7902zfb11thy81kaoiqvkm0jbb4v1b85u72rfr636i2ftga9k2uygq6uj',
                user: 'gomn189lkgbn9xe8r27pjaeghnhi9gk2h1tx0dl0v8u9ej8htqoh3l9ttp576dfiya40h9r4l8rnxrl1flcpswn5m9wsn24zr6hd7pr8xjr2sq5wfsitm945m3ai530j8vk9mbp2gdn8uqga27ebvwyt83s2cn8guoilrk6y2koot4t66q3a7fhhdb9eaa2qb38qr4lt2gx8t3uh1mm8mwki42sunfkgb60tvbysj9dowflpwmp1hfft16e50sr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '6upxlrz190hzm8lkk6h3',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 00:05:40',
                executionMonitoringStartAt: '2020-07-21 20:43:25',
                executionMonitoringEndAt: '2020-07-21 15:53:34',
                status: 'ERROR',
                name: '7sfkv8kxcig0cpf56jyem68nhxoz5yiyc9zoqu3wuqmnm6zf6d1s01sw59x6ptz4egn4vg9ufwuncsxk2lo3owl5ol9ob4804rzrz5f0owkaw16dhs529wf8je8g8rxe0iampbwov2mhv4rfwzxrso3m4dv0hc6u86anbu2kw0c5pwqce11ko0ktw7u7szsicdh2dmgctx9mrnu5s4btti4j9k4gfm7b6za4nrx2u7h90ego6h6n6vygjhwdpnc',
                returnCode: 6008338018,
                node: 'dy1bbk0k7usuq88ezt9q0qz7v7c95fl6ybm0u7vcirerspspeumwf7h659qtcs301gvif9lxcp8v4k0hj0m2jw8p3hp8nnmmasvs9ddycv7g1wwafinnm6s3nx75tntsczi84k0d899ieg0m1l4n13vtzdkc9efu',
                user: 'pwah26rvmdn8akij1awjs5veslan4dg9p09y02frf7yxnr25sdrfy2ab2mrhid6dhciuub3qh1o69vk77qeoufil6acg20yq0snjqu3uh96jifs8vofm328ojw9ed9j041iici2k8npdwp816axsh3mht4rv8qz8zjmabw1xgcxctt6yqv60ezff3y3uhonpvugo9rqmlfthnd2twdi8zixs2hw65xx94n88h4t4r3ats43eufgy0y3piouxrlr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'ychs0tb9lg3l7mmfs6e4',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:16:01',
                executionMonitoringStartAt: '2020-07-21 06:10:53',
                executionMonitoringEndAt: '2020-07-21 16:54:20',
                status: 'ERROR',
                name: 'j2wxmz6gzjt9tnn6fhji4p5i2x2fx0c28lbyc67jvmh0r23ceybx90p1lpsdzqjzd7rgt6kyk66o26xn49vpg3k66021b3bb51fowszypejg8utgbb3i38ya3tzod8l4x3mxxmk56qpk412qvyvie6ompyyau8ytmldtpvoopo2ek0km6cnuijulybibnz5m6exi97cy03ylwm5ctseg38f3kgt70dsvxo2gp1vy5nfhrq4010iwwjho7lccgb7',
                returnCode: 3866459380,
                node: 'q8qmts64fyvjaogfmhdjeq0eq1juaapof9q4lpujd6higbqhbc810m19ra84clekik23jjislftwmn7yntuda50jghy4zc3d87vskk71l6w5787lni9il4lya5kb4yje74gvmq7utls1n82vlc4opptv7sll33bv',
                user: 'v02w5ba6hee1583ng9booorfgkrqw33pe8gs9sztqa9u26be442klgge5t5r0nqhvnyyikju55db1cyku3jmm5db8zsfmgkr41lybmgalclgdg4hjzktvrqa9u4pm2p5nw94fonnvrwyul34115riblprwhomx3vhm249jo0bvvet09lmah1yrpqoyk5od0ol9l1pywhsw0hk9um3m45o2xaeb5oprp1yzdufpx2lfwhajf89ky3vdzhlhwymml',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '9a98d57got7e2mgtpkmv',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: null,
                executionExecutedAt: '2020-07-21 04:28:10',
                executionMonitoringStartAt: '2020-07-21 13:02:01',
                executionMonitoringEndAt: '2020-07-21 03:03:06',
                status: 'COMPLETED',
                name: 's27japdgv40ncccqh094798ok534s55v05nfpbeyo4gnvmycyu80pccgphvc8a7hew4fq1yd40gbantl4mvlswn8uhxf86h0h2xctkkie95hnp3j7g8iu9kdqnrvpsd8236z098fcqfhp5ypkfc8wqmtuin93pyzxxk33wgk4w5j0cmwq8xw11oowelu1u973x854ay1zl7kwq6djzvfxok7md9yp34yxx8fy37fmz0n3svr31d58m2gg2yec4q',
                returnCode: 3583269757,
                node: '553blyodr2qnophoanzivh3d3hco6dvkke74pekdiv4hrhlb471qlmp1c3hqoa0i7a5137xjp0w6jxn8voztrxcafgg7buttbcdscteggzq8zjdgm3dwrp2cmhlmlnsx50wonguxd7yjz7l7j93x6vy5et04ppvt',
                user: '4ut1na48nwrxecgx78z8snzwd6srgieddiubqpilvnlhq3n0562qgqz12x3zkj7j0op2ddpzqsxmbmzj4dr4c3336vmvphab0b01b121ymdwhefjqs7hwvundatxqtblzmpc12nv1mcsczyslgujru3p6rr09obw27t3gaglp531svw87vvm34c7wdlhopzg4mddpj4z086id8vf8s13fhoqr4alrvd1ea0unf6jwn0sg2r84wjiamerxx0wp01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'gtlv7bcte8k5e7pez3uj',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                
                executionExecutedAt: '2020-07-21 04:43:36',
                executionMonitoringStartAt: '2020-07-21 01:19:59',
                executionMonitoringEndAt: '2020-07-21 12:16:03',
                status: 'COMPLETED',
                name: 'okeqh4h9wat6i2il6vt31u97zd75bsg8l0nneky4p1p8dljh7zcwc66mcvoa306kugmzcb0mkrg5nfoisidfq2f9i97ml4h7rc64ksmkw65k0dgg0t392a27qm59d5xguc9f3ef8hnpbpb7w9ownihccf1qavgnh1mxaa3ly3co8x0zgbvymub660zgxue5gba6bfr0gv4b72w5suyvxq7ocrf4v38viol76jnqwn9ntf2d5bwebget495w5mho',
                returnCode: 8752342678,
                node: 'tds8whkp6a6o1p5pi4tp1qifeqkwps2oaxr34u57mn8okg88cf8eutflqkuuticrm2zklx6kimbz25pk8eycj5c1kj2dgb7i2mgg4056wz1gi0ppiodjy16zzbsurgq76wgwhinp6aznlhesfy4lu0mo0742kcmr',
                user: 'v9rocvn667w5gzkk1usxhtjctuez694u5mb2pw4jh4s07imc38r7w7xnow2n2wxiwh7o1u25kcq5fg42kb8bi6loedegpxxl3nqenukpv6p80hciix3xx0wcpb1keo7jpqoy8gsq9ifk32g3wstojn446emsd1ghcmbn3yz3j12v32h19c5m5azs7z5qp4e7odi3vbmss3ypn8b5k15upsgatnbxv9vdxyoqvs4uxddgztk58wj75clhkj2i1j3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '75xusqqhr49y85dczvd1',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 11:06:58',
                executionMonitoringEndAt: '2020-07-21 07:02:04',
                status: 'COMPLETED',
                name: 'fxhgcz2008e0zva6j49yn1lvptmyuo38s0657dfxs7w0ekezlhvmka1tlqill73w3mpedm4eols5hpgtse37yvg2l9n2qctqyp9506hv32sk35r0cx0whh8lv1ly5k67kfmrmd7gfumj3z0koe0xf2a2lunzir3lwcbfuf69etfoskfa9rjoee1dk62tsxbb4pxguk4hp24lhjzf811y2g2a7it4v3xavyfxydwzq95gjn4japn5ioepluojmql',
                returnCode: 9495639116,
                node: 'p80mk3tz6gtezcbaglw94ur19pyi0zusumyflzil9lqvbgzv2mqzmxr4utf9iohnh0e50lwg1kz2zwsvx6sp4m8vf80l2lsin41jd7ec3mp732je3ewzh6pa6w692rr4asb806znedc0g3qgr1flcs3jh12dzq9e',
                user: 'wcathqqkriw539kfqodvholfvul10ckntago0fv9wljkrhte0cr4jfw4kdi6k4rgw79zzvhiu09kbqrscs53f5ong78j140vfrjrbfy8rlx1tzvwwtm44jftf0w1jytoi7es6iy4xj4o4d1c00q986a5woh19gqfar534qe5admv7yimrqyhq03r00lafl1q891b9v51risdtsujbds14lmyi81rv2ytid5m1wqtnkovw5qu39uo104pl12no15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '5nukdea7i8nlsw1d6n3q',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-21 08:39:06',
                executionMonitoringEndAt: '2020-07-21 01:31:18',
                status: 'CANCELLED',
                name: '5mq8sojgt5lgms1gov2tcc99zry0nb853cig683jnf15bbwf981yrjt5lafbi1pb9j1gvxbeux16s653stde42w4039af6lyzufrkm5vdqme734s5wbodmjncrhagwj33ryf9z5scsiz8vatp2swr13b5jbu1bhk65kzhrdefgvgfv4yqfi85rdqjpsk1j8g0k0tgadw8vpz1nlmg5bdithkvy2eynyhqqfxzpzpf7p7enkoalxqwxdfd1ggh67',
                returnCode: 5071624111,
                node: 'sdy2bo9j0pso04j5votxlysdk3wri2znljxxfeej9jvpceu5vifyxddjnwqw5q9b5045jxmmntn0h96sxlz39nwiv0r1qef29h2txg2dqi1awbiiyepeqenmr1x3pl2u9mx8q1n1y1nd23qqntsl23spremkstfb',
                user: '3k5npn87y8lrg11etrcabkb09obhwmh5i03zekbtvehecuwosc2nn4y2ro36cbhlk8dybtk9yz2uhapddeuv7azfzlo5lje3hfl85ugw6qcaaksq7u1459je8zkbec7hsz8mhlh6nd4j3gf0u9w310ac6xyhuiefmwaiuh89ehyq40xo9vco2ynfokin3lwttaxox72i6c0fsv0z1exf5opb5qck10h3at7oo15efri2wpp7c21jfnebgdlq6qh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '5ampjoi7sncp725t0dzb',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 03:07:33',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 03:24:35',
                status: 'COMPLETED',
                name: 'rqiheewi0d7x8hcyasjbckl1z8gzrqlr17bf6ckntoqyy9nwkpekgrp6wraduc1hqbwxre0qr6fj4m2zdhnsoeaj56u0c3xi3whjbbx8hg3inc4bmz46i41df6ibp47innoqx3fbyazbjgm59v5uzumtrvmql2z78ngl2g7b761og2awdfb0kp1m9kvs35wj47k9q7wut00muw8m1qbnsxv6aaf5sjl4au29ydywtgl4bwa2r4rtr1ywqz8e55y',
                returnCode: 3405692160,
                node: 'sdsc2e62nmtx8q92kijgyfj3ayhqame37e8zn3pk7o9vhgm1zuei8rx4u6k9ellb1fo2pq4bife4am2967pupeyfs19rfh00x0dozkbgs4fw871fpgyu67af6nhastjfux8lm00lefl1mer2cubdm5o61fa8aoqi',
                user: 'rktxllhu61txeszfzfvwvnmh89s5jv89bmluklvae9strp93f58qy7ps40wwr4ftwe0m9zjbkzzwmpgknxe5mcuh41y5sgguj916w35gz8hszhk6bkaje6bsi6wx27oa4jcrc72zzajrkwgudpktmekuf38wksfbapr8c7rbpzq0i4icmwo761tk8trckov1h2fl691d38b69wxmgwgkdov0w9qqb0y243djh0cclatmrgpncl199jcfp9xh3ml',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '1finhbjpf27a07csodbi',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:28:04',
                
                executionMonitoringEndAt: '2020-07-21 21:00:50',
                status: 'CANCELLED',
                name: '6o135lqa1qxu4g7z9xk6wramqol15nu2a8o9bccocddg52r6b5xrhfm52u7vin9ut15si7j99zrn4l63k4r7r7s82xhgrjoa4k5jzjnaec42yi2azt4bxux1n3ornkpqimdqkj6ajuzrjfmmq086xjlqatzjc2nh9tade01iqzn82b3q2r8y19246e5k1w0p8dg2ad7szrwq3l2lez8txeql4wh7m1fmg6cy04aptf9fuaoo1gwkgdnbgs7yp8c',
                returnCode: 3152528070,
                node: 'o9fn9ogazsdx3pw8xak5wzkh8hpfzq2xvr16v7hjxw72fafiglw4davu4wb9azc8q8lxcu92y9ihifrtb4mgu9ee2an0zpkca1nkps0ejbbhlnrlxr3kxwjr6sg0rjjukzc1sufgpnqro8p9agog9eytiqdbbeh0',
                user: 'k4jne9mfwulpdcm6jx4sq4x8vbarmt5la5ynsr4puj89i3wpbzsswymazl979s5pr0a6wst53ha9qc351kmktyj6nqy8vcc9u1risfrzqcbpy1uo1orawopuhopia9y5that1tzfgrsfh52qximso7492mrvq66inwhupqgycd0dvfznwatajedpnphqhacmmtgo15joac46gk0rsd5hfo0mi6kc9c6ki6divdryj07yioa7dfs7ts6zk5otmnx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '080fcisflc83f9n4b1p2',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 19:37:40',
                executionMonitoringStartAt: '2020-07-21 02:38:45',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: '61snk3wok34gjc3i4ak9cssygpz7lqqal7bky7eoe5xie4is5ynfxvnhhq21b7iv43uiieumon3uci80znea70n5y8m79b7k30uk5ux7jwsu9ezmwglm4mdjxnjrnlydvo8pkgsuwjjpmia0j6xa3i441cd2wsnhvr95y2yywjj72jdsqu813xmhi67tzmg8urhmp63butrgq8m874fu0y7fdsan1ed0otbb9ahrvnjblzjvhum61ccydsxbixs',
                returnCode: 8477800162,
                node: 'b99x8vyv6o1nzqdm9n77md5zwwkjwem4ermf7y3xtyuyvpjgomvqmq63wwbfy5jj9bawglqjx8vwpx4gmlt0cog9ujq487qfdzbwysjf48sec32q17ejxf93qoy5n4b35oyuytwsn76ys1mf5kyzxioubg24sfd0',
                user: 'noqvts7f67qzbc5pmb4crxa49uceraihrpsb0bm3hm2fqu2q9wd7woetgebcwjteee9pzhcws1yav2hbj5udl2mfiiz0kbi30lmww52wmjjyce5fl12q55sium9v1al6am4dyf7ff4cf2q3b4kqt31u4rwyol48eqwlkpsg3vqux53lnjac2djsos9qzkbse0dju8u9o9kqede8kbjz0vwcj1pt9j4j4w2l4ookjsp1p9gsrsozb821npootnm3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '85v218lpytqmroqyx7si',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:15:36',
                executionMonitoringStartAt: '2020-07-21 21:10:07',
                
                status: 'COMPLETED',
                name: '2we18i5lu8dhgidkq6gv59orszvi4zuvnx207pj1nd0qvo79u7nhp0itylhj3qgogfzkwbhukxwxguy8ny4qsmnkpfd1iky6lk5mv6io6ct2xr45noofriwgwins7u3p2uzqwwibf37zd4q6gx4nltyga55s9yyf7hyrl8fc19hfcto8i2xx5z89ki99u78k5g6t5nmcsxydw17asmws990v2olpwxtbor0ipkeqc77msz87yqw7oru7vfoxdfb',
                returnCode: 7448266121,
                node: 'xfrgngncvi0mhhw0cmwfcj8xg7h88r85xbsc5d4olton64hrub5m0dc6x3zl3zu0pp2lynbniknxcjix9mk0sgoymbg1b7oviftoi11mq6cww75euiy7nytv039eo6zpb5hz87mgefvgprp2jtqkn0mhhy6pnawx',
                user: 'mcdqw2f34qcr3vqzn7l0h2jabaubzwekp0opr8t7mswe0025psvcrcx7oaeeny2m9s939h961xi8bcojh6jo80duam5pv6sd2w3uc450lyvcj5pzs2iu5e61tge3g07wfblz3idhecmrzi8rs9zjstszlge1fqmec46i7es6d7cbadewsunaxesoxwhy7zf2swhuedhzx83lvn6006p1hrg98eevu1ie5ytx0hkpauzvnifs9079hyk4fkgrvcu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'meawiwfuj32zsh2bzjpy',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 00:45:41',
                executionMonitoringStartAt: '2020-07-21 06:14:55',
                executionMonitoringEndAt: '2020-07-21 01:17:27',
                status: null,
                name: 'bxxcrzgfhgtlz6e2aodxfszhq0iq07k2bgkn41r6uoxhtggpzt7duip17q3wv0lirhtpuvu0iz3mtt65ielgaqgg5130ratdy9hp2muxds42mxtxb5g5pu733futsidenhs9p0bzgta6pr38hw3w1ce09w01p89sg72uoh9gm7m3pdrbzj0v6p5s5c46qaujds0n1nm9wdhjmlz9mp4b9sgs3l6fvn5kdyfiiwel0dtkbybwuk7alp85aul8acw',
                returnCode: 6243723952,
                node: 'ok8rjpc2y62btrumdc00hehnubh7x6fabctfc7ztitgrfl1l85n9cjpdp796ko3ht4h6vwtaztki0qfz2eoa2g8md1v2bsl2dbme9yet7dja7bcxlr2wfycf33kmp2uzuyboa889v0d2rl5gls9s1fyw24c3ns02',
                user: 'f05636v8ety8gvcorka3ivzr03ofm0aa4xvg65tlehzjcmuncg7tnkfgbjgtfhrglvhl326vi1ymcn3v3fpfktb3rrxrg7o3mbv5xhw7v1saylmg3wfv45p9gazv61dnytsbagxbykktuoatq6ev0tsun7kehwu97ztlm1zb64do4h77srftjsssp0xwz1mti67oh91qgqawm2wfxklj0tlmko05icrx74ept5m3v63kdhm1thvjarayiqjfx29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '3iaw59wgl9w5p1nwgvbq',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:43:35',
                executionMonitoringStartAt: '2020-07-21 16:55:17',
                executionMonitoringEndAt: '2020-07-21 05:00:36',
                
                name: 't8r18iznxgmfbmmx0qx3unhehhy23cpg3xl3euod9bbzk6nuadof9s89848f8ruotcvfz8ziuyv56n5zfpizq1m2li5sgoij070wwlvj9pghaa6dok7dprgq6yndv0hpgdreepvu2gw1gppuglzbbosiioj3fduhikej4ph3guounlp7n4xrt4oja3mggebytr2fdjm7w5rxfsgkp36njcbcfdcdn2u3gpkq87x8nfdcdfpubdhfaznn88qvpen',
                returnCode: 4522848942,
                node: 'msawg4eagg5qxfxhof89i1jftesi2kmp6r37fzaxgtlpp7ccvqrurhsryzoe4szgsasae46xar2lp5mg8344c7z1k4nr4v5fhrvj6o23ffu2day5o39bitbcxr86e2kpzdelc31qqj3uk32pkuvoh558wjo4d9vb',
                user: '74cn8ioapr6bipfootmsltguftr3ofldcb2j8lhda7hakprzv1er23jybnz9r53mn4e0fzhztmkxdml0de3zjr62k2ryypsf2xwg4a98ow06qoz6mbfcbfyr8vd8nelg9h0h8gwp2wvu3fhrq8dgi0392ego8v8wophr6w91779uvjra1gzf6qdiparulw9k09vebuynv2v9ftrsv2olx6oki4cc8oqzf1m8t7cw89tj38hl5m0cfacpzpynmgl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ibmc5qu7ypb3ldvl752ylq51cuvk883rh7g72',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'osai1b1iwwpst8f57uxt',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:17:21',
                executionMonitoringStartAt: '2020-07-21 20:42:08',
                executionMonitoringEndAt: '2020-07-22 00:26:38',
                status: 'COMPLETED',
                name: 'ea7ja8ymphnno7ne89te754noc3jpv429a4cwokxwybzo5igetfe9891zvtmw364h047vlkccagdvas5cj87omkpacull1rqh3mgcp5t92ftcya7e6d4rbhskcpapx92ye83tjpp5ghpy29zosldanswiliobwaqljbgzqwqjksn0ymxf9vlhixhohj04jiz8lgooz44bxh6mupb2tvbu23vhkftt4c5ktfv461onu5yzz1ybklsi0jmpia6kre',
                returnCode: 7085634610,
                node: '9axb2u6zzzkhccn5g1bqc1bjta6ykmycpbw8fvbxd9vi604iu3l0ccv1wk8jsz3dtpcy5gf62e0ixytgfdt64pvalc5wpkjcc6gn1whyrgfr1f7u5uv4noq4lkezb65myr3dnjvbg19j3ggypre9k3m0mjp11i7q',
                user: '7bwmynhuil2n508tmo6xsndlbo3ypdjl5phzynr2wvscz4jfw3d3l3bpqkzsfb1h0is0s7ej9zts9olmu19pabhxu1je2hjhhnced32fq1wzhx3ijdimw27pkkvaur5eg2ejpo0nflgsrccrajkerh9t7tl8ck6jx8alpkohxvo0fitf8afrpnx576suzcj2f4512chvn6lt86dxwtsb5tp1dmlt5xdqkyk7wjm2y8tuxb7w7rz3hp9esntlpn4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: 'qauovct19wnzd2713oxujhjxzm2v2au00dg22',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'cdtd58yk0xv9ebn5zcuh',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 13:47:47',
                executionMonitoringStartAt: '2020-07-21 23:50:08',
                executionMonitoringEndAt: '2020-07-21 17:06:16',
                status: 'ERROR',
                name: 'e3as02vsnwa48v1116j2be54m99k33qlulad4xlcx6mteqx0ecah8ngow71tw6t7skh10w9p5gvqradi4dlsow4eh007tl55wsoeitgcsitrir5x9qptmhfzp0wbzeyezhd2x0nyteghookukct3nar15abw6fl0eao3zu25q3e07gb1xvdejisg6myfrkq7dz1m43lu89hsza5ompgwdu4b2g8j8ekdimkwlu3mrp76eyir6w4cfds1hd3lo79',
                returnCode: 7460726013,
                node: '0y5s0enfki38og018z3odvhw5tpi5tv0d5smremxti375tlbthrj6oli0x9l9kqgd2vjkixac4zb0lwdhrivm1kmgqqau9nx8suuncq9ummu6hs5ghmxtbxzrv6190xfcny4q624ti9gtw9v5zhh61ki3ast8n3w',
                user: 'hrsjyifvcw1f4cd6meyy6yjqqox3s03hx1gckc2tbgztb5rl821pi02pyz1gyyo2w3opwccinofyvgctkp1md7ut0h6s1doh9ary6ofni9pl8yd6rlv7600adxa91x51kar7rbmj9a6fvkr2g21fh916c2dgpy727bpri3j8gnf9qeibf37vouve5ymaz6a472gwkvvz23qgqz8qqhrm5x8h6piruoeorf8fat7jamumd9ip7u5z1g1gzc7zfsu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 's66i1c6hvvafcu2gntgdmqttowpadce0zzy8a',
                systemName: 'arbhx80qodv9v9brfcvz',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:04:49',
                executionMonitoringStartAt: '2020-07-21 16:18:54',
                executionMonitoringEndAt: '2020-07-21 02:08:21',
                status: 'ERROR',
                name: 'ob6v9qc1cwi2fzn9rctde8tf37a21sm6m02l7m3g2zj0ynchx2jxghlg73e6o2naddgf4yb6ba4j2pzk70c6rbknn99rbjw6xxhuo3rdqti0mfvu0rf8z1y4h8ywf8ek3d9eoz8vol34nk8tvguadj0aenc6fnrk6jj4f28b9pvc7k8osflqxqk6u97tt8r3mknwguyzidq45k65lhb6f8v0641nzsv3ebqm4klk6mocx5pw3m7lwb59h9pcl0i',
                returnCode: 1172454811,
                node: 'h7hgaooajf1lisuhrf7pqe95s0tenozd3pv5iwq708dhatklipuaa0o88khr5yeq8no9l3j3tebd37kohz1nmezzyxryj45f7hexqupu0p7s86ivdqdo1stezynf7mzbr7tcyt14nllul8sdu7blq1i8m9h8kpvx',
                user: 'jck2cahzodcbfd4ai7nfo8c8rmca1wwjt0upfwpjfab2pvhgmfnji0jauwvuc9fhlav7n5knf96q3x8ryv8ih68pxxvjqjeatxux747whoy8bvy2xb3kuen6t7om7y1nq6j5o5uik9ezh8457tdsvk3cfbr1v9c9j5nfrfll6co0bymlp2lj85y822tk94a1izfrpoz610ew6bouplpgjm5w4nbqf67pcabczkeighgne7besf0li9ryo3u3sg4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'luq2g8kgkbbe8itkgjaq',
                executionId: 'ifb58kwau7boz5z9voaj43z2q3v95d578ov5u',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:16:22',
                executionMonitoringStartAt: '2020-07-21 13:38:58',
                executionMonitoringEndAt: '2020-07-21 05:45:41',
                status: 'CANCELLED',
                name: 'osg7f10wy8bhr8kqzy2ylbo3ywb1j6xx4y717f7nbqy8xko0kxi5z74exkh628gq5lp12mdr35ydba3x1zziqrhl1s8u40fwj38e865nv4p07b70a1qq8bt01f2w6tqoo411g6ek0iepl8u6h7uk5f8a3a8xm58d8e7w87kjhonlkc4egjrd10tugyu33pmppqzl9cma7z9wlf0si3kp0127123nx6evrs9udwa3xk4g1tf584bro4bxj35lkva',
                returnCode: 8053207873,
                node: 'b4gc5mipjxwzgdh5xnj9phfzi1rsfd815ewn16lgrylisoowfxji7uo57ci0bk1vni5x7qlpwnft9veuk6jx3ii3vnlrzc5gmx98sj8l7ss66orny8dbwf88p6qku88j28aywkmb1rozglarfe19p1pc3lhpm2pf',
                user: '79oezfs2ycttrtf15iz1kqyyvoh91ec7amxnah5kfeagt0iyiig4towskv660kbhl9zil35x2y87rxvld9jw48ofak0ovx235ub415amalgl7ld57r4ulhptv50tjt8rh0wk2c7mqnv245dwudoi1hhao1qkv6way9k9pg48ahrx24z5h1qwuo4kes3nzzeba2fvmruepd810xa46np1qe8d6vl9d7rtm9ok5ybeu6h7kstw8pn7ukzxmd9g7rj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '5bwpyy2m2bbrz5a5urivp',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 22:21:25',
                executionMonitoringStartAt: '2020-07-21 11:08:20',
                executionMonitoringEndAt: '2020-07-21 11:00:13',
                status: 'COMPLETED',
                name: 'acav99xy7oxxb3q11562fhlovtvywdomxfs0veyj5br6b1lldzv9xv3x44pyz9cufzxbb4oy7po4s2ylnau0xizx6e3rz7f2wn0c66v1umz332ffagzp2t0ghr7pf2y4djaxkpv43qobkaiviuvwxvw4xugqprdbf012nbih1zw5837g8h0qqquemhrawug8kxlr2kqf7hqvcv8o9x2a99p4nd34g1uv0qbuyw3q8yetskaqzcft4ho7nxh6xeu',
                returnCode: 2474136601,
                node: '3lbrp2tqo3adepnods955s8eig8d2ifkjs1o54a0c615nvb9t8mg8hm8xni0t1r6z4si8loariylblhl05qygr6cboue4bjhz8xgd27l9s6vs62rtdygb9ugtlgpgqbhr2eqxm0qtkkwexcburwjs2p6o2cck0is',
                user: 'aqme7021jdpjblafxuxzvldwpxig8imffjlkdunwgqzn0lhl9gekj21b20rpkkjiuhy160lss4t4b3tr8fb150ttn96b2n906j5ntilqhv1qsfuptefku3819v786vdahdaekitohumd5tp1kvqcfk6is9y8g52zigfvasslhaqv3bdi0hrg2tjenwqzbkfxla88dywexiocqasfayiyay3rgovhwlpcsmpurfleu6utq6eogthn5ucq3uqojum',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '0he44wk0t9a1azhufgn4',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:15:02',
                executionMonitoringStartAt: '2020-07-21 18:13:36',
                executionMonitoringEndAt: '2020-07-21 19:22:07',
                status: 'CANCELLED',
                name: 'tju38bfmfm1cztbouxjw74kwgtw71jxn96zysl39w4xj84nd90tw7pdn7br3dm4w4y295pjylptk8eft9bczy4m4kdk3hga73f9d3s37lef3nncvm17yecaugpk9x5568jh06d8ps58m4o8ijgot2wm90c9vz6jm00ic5ll9okpijr0zejh2f5v068bwyht8nvh68d2zgezsmvzg01ecrl6lz3vklv40a8pe2xxm25otsyujfpolz35uhadzdmwq',
                returnCode: 8904438861,
                node: 'un0wcy911lktsvhrr2hkzwm8vseiblypygroxvvi0xk8fmbpo95l5rbmltbv5m08gszwxaihpyxaqf9d7ihzei7d5l08cwqq6cjsfiz2q0am0w8vch2u9nbyk7ajv50ps13omg6gzj7jr56fgzxuweb6n9t6v325',
                user: 'c46oj3bbi60wj1hjmjf7p6yr2ov3b9znl95y7pm59qs4r0i6u7hxctivbjtjjqk33l6tvozrys4linh44810okeu639bqysvni5wz99eexnbb6j91d7y63qmr61mib3243nlewqgqqtz7ry3bjl3f3xrrmfwiy5814iiiksy89dqxon35pbx8s1no199par1jorxi4azkn0l7bpa879m6t9s8w29rn6ljz1rfgbzzzp8raaftzri8vb09pgzo47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'shuk0cu0pbaeeyq22eey',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:07:48',
                executionMonitoringStartAt: '2020-07-21 14:24:45',
                executionMonitoringEndAt: '2020-07-21 08:57:18',
                status: 'COMPLETED',
                name: 'lvryya3nlirdyeqt8lhgcmxcj68hvhjhgd6r66h8geu5gwlvtyckqg5wr1ait5xdj8ia8rlwah4p2sh1kgyw6x0ha06mvtrrn9ije8h66v04uahzud0vhhf7wrnvhy6yxo3ilce5ynwbwzqehrqxgs8iaax295yd9ycyamxakizi55l72roghzqqr52il4bwt2xxpnusc810msvqhqvlxnklamvqht84w4632fqjooy8j0mvtn9m9dpqajbj463',
                returnCode: 58117109559,
                node: 'bqetw5pvmlpmsw6y65acxnw78e9r1w0aavx0016we3lxam1v4j6lelsi9hjwys0hczx2th6nuk08v12hub83d8nci2lae7fzkyf9zg04jmk8wjy3ecdgar3260i1iqljfjbsunkobepznb6um8sykpxse01368dl',
                user: 'drfn13k91yizz8a8d5doayekby5li38io6enkpfb3smlnb78m2v0ka1c4zjd88523vrg7yqie6jh63frq0pudsgoxh6h8t1i5qlqyeu9aquqz6di1hh0yq8asjm5yryunmkvzs6atioculgeysiegoa004yjr67jpos32ozfru078hgkyu254emuqnwvra350fv7cxcuvu408rqjt8badngaoz3eb7uft76sqi3rl5u2rnue6zpsdnmysu57nsw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '5ttm3hhjbhzavs87s8mq',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:44:46',
                executionMonitoringStartAt: '2020-07-21 11:23:52',
                executionMonitoringEndAt: '2020-07-21 17:16:18',
                status: 'COMPLETED',
                name: '0j2y1tosed7rrts8oid4cm3r5q701gbkdnb292a6nzk3b3nbyu9pnkl67594thfeazasp51x32zhjyj6cqc8cj4rhpgdmzuskkquuky6i5ghiyvwb9itufqf586tpt7lhzm83xvneatamfsqj3gpbm9ugf9a5nbw27k2cp1lfkd581znq3rgi477undf494075z9td96ef550mf2gx3lzmst9bl25ih6bu5y38zr83uhwgvf7pjesmnvsh7u14p',
                returnCode: 3256373271,
                node: 'yzjrelbdyvng8ze143qsbkyxvtf2edurqplq6ri67cyb1q8us7c343tpsq06iyxataicftttz82o9fasnao0gxjgcqyecllhzv500w626yos42xjdfdfbd57xdl83hotedswoey5ibjmb7kirwc77l6stl6rz3g82',
                user: 'cn3n7bb2w3kzgu1oxegvjp4jtbcp4hgvb0cbkw6vnzucjkfc3f910bx0a8htizsufqh7d4i6qi4eldnhuw17bvqhn4ruhfgcf7rj2w0u72c38psr7es2d0o2unrnjfpz9spj55ictd41npbfxv4z6vg6fl1eq9j1xjulibqmo7e3idf62o77ymdba7bx82g4hsqhanoq5ho6ikh8oe4tunhc0yecroa2xt3r4gy3megu2nj3mb41i7qrxp77qvf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'w67kmuj26g1kgy0fl608',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:05:37',
                executionMonitoringStartAt: '2020-07-21 06:13:16',
                executionMonitoringEndAt: '2020-07-21 11:25:47',
                status: 'CANCELLED',
                name: '2v1zrs9m0rbdd6svrgoiwjwba0ts2904wcazbtuzy3inv4drpxrr4p5tvuw3lvf76o1kjq7j3xf9dsnd5gnub4eo7tad4uc6j6bp1mlgkzktegcwtbre4sza00rmd1wltccua073xz7ttksbknqzqa63i7tlqp59h3tvctbohose0j03mtw3kpj10507gk7yj82g0iyl6opavhqiivbrb1lbmqaw0yzozf2r6gph8uhlq6w2eskv491wpgmnjjd',
                returnCode: 6691537334,
                node: 'l7flpapq27kufauzd1t7mu0cbbfab5rigdas25m0deh2es8sdg7ceutyppkuydypt6xgjvcnnse9feb8txsxoi4n1k4d2aieeiqlpymjwx6m2hluwhh11h22fr6foabri7kkgll9vvjdos6yyjuuvf78jyxsopkm',
                user: '59h4k963gcekewy9oqynqmh8ul1ueviu6mzwjei9anksq0yu14biwxdjl90uv55xiq1hxcf64z5frk4j68n32u3t3zz77up5rduydvvhievms3h040tewi377ptizsu6g48um3kaq8qkddoe4i39lcui119hwdpsgptspol2arr0apsshkhez82h6942xplwnk7h6shqu8aoqm2ohmb39r96yqbuwjl6y0dk95hhmjdykaj1fojhk2waugvpp42o',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: '83wb5vtv9j2etr9a06br',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 07:36:33',
                executionMonitoringStartAt: '2020-07-21 04:29:23',
                executionMonitoringEndAt: '2020-07-21 20:38:35',
                status: 'CANCELLED',
                name: 'bd76cxg55p8zqtf4q5z01riof2o4sc87952tj95kdd13977fhgxh3ktk8o6uncowxe3g1layjw79sgsvj1f3e7if7bt8jaydmowix87tpo8m74j783sutc9neijo0l78e8givwao98tf0zifm4duz33z8de37qr9j63unyk8iiko2hfs03tqhc10cmnqxt48lj96tyjxfb5t9agha6awbqn1ns3swlioesk2bokoto75y2xx5xuphs273u6n1lm',
                returnCode: 100.10,
                node: 'akapsthwfptx9s1ip0tki67db5y82znwo1wphc3ge5nd5zzhvduul0d60bwp4af6n90bqoh179l8wmwv3zih9x9x858picysh0tzo2gciwl87efv3lnb0uyvl2gg9c232ycn3qxf7up95psled458uxu0fa0rlu0',
                user: 'cdwrjuv2xyi1nndy4egdeo3b8qvcix4iz9ccqf8tjozaf3gi4e1sz2q6zbwun6az3772dm0z12ahtl2hr9a4ljivsw4ncqsao3d0k30jyebmd8s8hsm9xxii8w6bcix1c112oyzfo10vo7ljsfe5uxn3nye4h4xsxdhgzx1h7u6sn71o6mnano51fr24kbsgwjyjyo5udja64cejhs1ii4n4iy39o8vxjokveohggobnen09x3f9dpi4v1tf7sw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'fsi6ljruoah25sz8mr55',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 10:27:07',
                executionMonitoringStartAt: '2020-07-21 14:12:55',
                executionMonitoringEndAt: '2020-07-21 23:20:48',
                status: 'COMPLETED',
                name: '2g33pxs3x7rm3uvmlk1xl10j6grlcrokmni6kx8iygd5391ee1ecrg8ub6m3tqr3819nnh5x15u0uj34vtd09827vld32edvn1mzpgkprzy60lvqcqfvfgmw6roosj1pab7zic8beoihjnwgadabotpgrqr0slc53htxuhyqw417tbwjazspwdz57n8nvr6g1oh6lusxz12gs4ku1vd0zwod62gp0yzubmg2z6cqs0e7nhdau7ttaoe5dap36iy',
                returnCode: 9524105774,
                node: 'j5x2txamq5trtf3nvgzjh6ffamwmncw8x32r0ydzd5ajlx44veklq0eb6tl58jdd16duite9zdmzm9d5nrjmyxsk7end7biilmjl7ammvp0g29qy99kpqdj0c6tcau00pt6ocjshejygzadd44lrsm26ly1u2tlv',
                user: 'k9xfciey8cjyqec8p4iuugqtnn0o9ml48481awe6l0ngd5dc0ccmaemeyj9w5otqrgwvl9vl8p5joz6miz0yy2heo5q7ymcfv4g937n9s8cp19rae43dko2ci4ezfj6m4un9glwr0q1cq8ugpin6zehai90ynz9qyeg25pmmsrssmk7zwebrq5iei04kz4k4wvka387bhn4vkab3890fob9bvp6gh44te30thf77n9pvyf04qr5ytzgbaxhxx6t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'i0kgt78f7y3z8f7bxntc',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:44:12',
                executionMonitoringStartAt: '2020-07-21 07:36:11',
                executionMonitoringEndAt: '2020-07-21 15:45:54',
                status: 'XXXX',
                name: '4r94webmlo7369u1hij36dsq37k92cpy7bo353bot9t5uh7srj5gq5vbness3qdxibhjxtfgzjwtqfwmmmv1koy5satlgvl97401dw6uglq1thz9ozmobfytem0wo4pttw0jzaje4l5e5zodl3x2lsvi8eg6ajjx6o6a4gtkrl2u9o69gf1ummgy6xuo1n1moqsney0rj08celptknfsxkozmr52boa8bsjzbkgdxx8jl6s1njs4lqt49aukgn3',
                returnCode: 8153410701,
                node: 'nhbjjc6voz6ckp99jrp7mu140aaj0eji4x8jdzzql1w4e41ppd0wkzhqkkdxn57eoeop4fkym7bmm41ggjx6ecc2z87ysyq905sbf0yjtyydnaow8z2ikijr8yzbh9cn7b14n6ev82upurqsskzfw4tljpdqbnmn',
                user: '5c3e6bq7xfu4853y1ottzz1tk1gqugmjm0drhj8scbq6q57jtbg9lg4d5gg8k282obzlimlbsbjj3nf6q7wurt5r36icj3qcuedagjyb0vy8du4j5jnha7bxcftqerbshnv9yp0qkm1qgykeqmj9l2xfy7ii627mt2r5ljk27fqlyov38l2dzsm5kkqrrqtzdc8fycnkd2690fzny7mlyoocpdv8848k8lgcx8vmoqe2ktdd4ctm0664n7i4tg1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'y0evrxjzhmb18ddx75kx',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 15:31:50',
                executionMonitoringEndAt: '2020-07-21 17:27:34',
                status: 'COMPLETED',
                name: '82dflmc0pwnmlqi5gy01xofflugjyl2ewlr3kbbugyuvn1l9uc03gjddik4u0pby6y9hhxyc1psqomqwk9equqa67voyy361ik6fkb5rndcpvd22xviysipl0hi8d3aj9he234seowdgld04v35yo2ww51m59q9c9yigxrhd7dptub5crvqcjxv0lszxdez2rw2f24mjkb50wf5af55iwiqrexc480sr6ux8v76szka459ot5ozjpws02xhy3mw',
                returnCode: 2960357437,
                node: 'b7zbeiljglttpt6wj2o4ipkxyn6d0n3ix5yba0apkrcad2494za6kn13m1qp4ooq7sfbilnroun6ftbb2hi3twie5uo2r9s7ctdsxt3gnjwsyyf4jbnoqdz9z8yey3hx7jop7mh70n1dnjdze4z1gr655r9uitzn',
                user: 'k2jl22imawtumexmpnpv4prmfj3qijiyfr0qfc27u6sdx1e8p7c6t7iyfcia27cdp5ssosvhfuddcgvmaf81smhvxosne3lujy1xeytxnyf4d3t44c7674kj9gp91qlb3ia6khtq2k3krph982q2x8oa7ctn6f246vdvnib1bycap194evfuexd5h8o26ffpydm8o8wqbyx7kpkhq46tu6arzd73f2g5ehmhyresn0sph0urvcka2lz6urk1222',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'aeavpq8ta0q5op2ncfu4',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:49:55',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 16:38:48',
                status: 'COMPLETED',
                name: 'ewn9tpd6pptlfo2zo0827vfe1yw9tcjk50ry4mj37t5xuh7xyic8jlexmd7xnvs0873uexfvghk1wfpnuspbixz8aa0jg9imi9o849trxohz2lgpak2d1bwia4u4pmvr5hczpda7v2dx4r041wr5v0vtkeulz4opmnngk2sfo80f5dddpxn37okv5zrsirmnb43ky9a3u7ap2rke83a73gd5qslb9tl0wz89fafyjnt3optcr2v7hl2ug9vju4t',
                returnCode: 8304051070,
                node: '8yhs1smqu63u0yptmxl5axesrz71k626vsp2q7cavjfaq38o6y0hmq7yfhmzbefpz0z68c1bsejvp4izxz0kk45301yrum2xiiah4yo1nxrb4yzst05kjw8osvcinndu5rlbdt91xc2trfwe2xcjlq1lfrt6r0o4',
                user: 'hbvtackdo4viuazvrawtptseon8o3anxoz4f2vui8y7fzxbgr6qtenifh2kfwi7bltden8ws8d9uuen9xec5vk35zqgy0ochs05qh1bqhwg3cxw601nw0a63w7oxeifnf82jp9lsycgnf5q7kcu3yxyqzw6kv9xs39wnjvxox4zhxi8ijsehnfteo7lte97j1hx6x6l0o24mnvcordp4sxqmcglrismbp7og9soa779cz1poa2w75d28jyi8m7e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'cdne9pewylylw1cg0knf',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:05:29',
                executionMonitoringStartAt: '2020-07-21 16:44:50',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: 'asax8h6a6osnkg3qm1ljbetq5zq2ct31fkh1e70vqiy006ii7nfr32hij04gw6mc4rtox27ge55gbyor7cq226f1h1j7iby0ntdww69svi1k5vn4r1dseuln41qt6dqd7kmvj8odu0h93cd158y0x0239xclkoq98shiun0pvr3uyf0c1ygvm8n6vz54xxkm2ada331ktey3euqsq7oi0ph0d43a3jf0pqz9u4jvhjgzuwm4syslhq7gl7oashb',
                returnCode: 5438447125,
                node: '5hy8f9vmyrl6vryviek6iq6vn2jh930wj3jphprdia7tewppp88i6obvl0sk78ysaq8e21mqyor58tq75a17u6bwagv8eu0u5vitfizswcue2bbcgvrxcxvckj4qs62731pk15w10edk3ti4xez8use7zsd56hzn',
                user: 'v8ovgo8cwrsv9qw4kenqsoohgk98850plr1qz1xgzwofhza3qq36fqdtf0atojpmnx3njl2cdpamfv69x7ko548ywvxovckvj3pw7xaot3qmegbevznocqynl4a8zjlk103kvzy5x69sj2m4nwedu6p22m9vft4ku0fru4oj4uk95ha6hi80njhwbkutj9mk02g488utiq482kidcjs4hjh1vm32ek86o8a07gjct14kmuqaolqsmuojb0psrwc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'hls1gndha3dova2osvv7',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 06:26:09',
                executionMonitoringStartAt: '2020-07-21 08:38:49',
                executionMonitoringEndAt: '2020-07-21 14:59:46',
                status: 'CANCELLED',
                name: 'zatjpwth3ret23o80b4aafymiierh67tnk1q5rdjs43c5vw8tf2ndixh8ctteeoocgywcd9tiwbhv7u27yowhk3xyi8xdkcb5dbjl54y920lc1rr1txrjj2i8hi02ulyrul3ozb4f9p3epoob311cxvb9tkntu5gxh6dsdr32yr5g43x04bu6hza09btr3603001y24ougubfzsosnbhz4b4nf8j1vsztdpweod8p6rxchntl2d6bm9i68rmob9',
                returnCode: 2477227616,
                node: '4sr70bx3rqp2lwcibk0zfmd5dfxhhfk1434kupzg10kbberi42o49qp3hmt4rv0r6vfbgdratr85z5fb2wtfwosz8qunux8dw3jqrdz871z7jsh1l4xvj2axts7qllcwm5a1fo67k7ol0ck708zdzcr77ksqvjqk',
                user: 'allz81ndd1ltddt9bz2zib9zuswxsc740arkuoj3cc2i2nn1ehn33iu493c08fq6s5zo8r8gvgw8rsrs8qb40smfvyx6nwq4s154g22gj19gqq0gadacd6q62cl6dransbjfrutdimaum6iyh0jyizfgpaiwmwsoqzlwjkdl3wdpc4ptnusstt4c8i55ode7trb0dqovujf7q2jis40nuuuzcdhmakk4ti1tgfxgk97h1ndkyt8kg1jbtdh31ej',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/jobs-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail')
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

    test(`/REST:GET bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '4c2cdda9-73fa-4cc4-9180-394fa67710f1'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4c2cdda9-73fa-4cc4-9180-394fa67710f1'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/4c2cdda9-73fa-4cc4-9180-394fa67710f1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4c2cdda9-73fa-4cc4-9180-394fa67710f1'));
    });

    test(`/REST:GET bplus-it-sappi/jobs-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '97756502-7968-4d2d-9529-a85cdace91a0',
                tenantId: '1fa98f08-fbf3-49ad-98e6-4fdb71bccdff',
                systemId: '2c3d4fa8-da73-4caa-9335-5d2b24129386',
                systemName: 'k1jt91ft3q0iw5fblv1a',
                executionId: '209249c5-9c52-4f76-b923-cebb4b7bd229',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:47:04',
                executionMonitoringStartAt: '2020-07-21 20:33:33',
                executionMonitoringEndAt: '2020-07-21 11:26:33',
                status: 'ERROR',
                name: 'ucbd3vejqy3f38msdchknoc9nbn28da8les0umtsmqc4h5pc4z195myjm3l1jrjp0mxz77k0ond0kv0ic9vpvjsvociasw62lnzng33d970i5iot4v9w2v6sm76zxcc0ssyygg7reqeast937x3jsawca3z851kletajf5n0fgg7cpgdv2tp7err9di4yfs2f6nz4r98jlydcbgd4veg5cogm1dj4tx4q4oistg7pe9v088tdzsh3xudd23zeti',
                returnCode: 7730885239,
                node: 'c894as2aqyyptdohw93qs8xg46eij8nmyzlkorx0iyc8bgxwpa0ty9asgla71jjj9x2hgsvdy3z2bmmttzlod5tyden2tbiju79b84n5fvboerple6b4poy2uwqyalxnwyrhyq8o6031uvpcl5wenuhty7ma7je6',
                user: 'fr5sj9vykp2uqsnoc1jc6kdu2qxzwopqmnbgr7mj512j2e3duu7qf8bg31txzqecasualwo20alg4eam8it6ax0jbembzfy9jeglg1fllew1kplg21frnqkr5cjr5xlgspuyw989fjnzpbrp1a3t0aoqtali4besydi3a8kl8h6cgypch3e60nppdhaeshnpo8u0vc575th98e5bf2xffld9xo7vakvyxuf599yggedh1ywqcici4wcbzua2r94',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                systemName: 'vvpr29ozarktflg14gg7',
                executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:37:52',
                executionMonitoringStartAt: '2020-07-21 02:05:46',
                executionMonitoringEndAt: '2020-07-21 08:55:18',
                status: 'ERROR',
                name: 'gcprnq8povcsh7c34bl9ayh3obx3vgp4986uinj8zwkfy2ciogit623erd8gqo8szm23qyn4pg6a8k4dipfmc2xtjlq2kpw46utf9q4k4sqt2k15tvlwaycv635q6zjus1njlmeaxmeo1mvdjih103a9gnewx0i62w1sdr97xvkguvo6b04miye41futsgwnm2a1q6k95hhhxjqctegg9w8axb9by8k6gml2mlrzirdbwr86qfcrmf6l9mxzuqi',
                returnCode: 8675969423,
                node: 'm7qy05n2t8flylp3bfefsa5aunlv2sg26ak2mt3pvcm678tvbp8nrj9fho4zp8icu2u012gj4ytvwd7htv3glc5j5gpj7tvwpg5v39d6fimfr944hxspfdtqz3b45warkmbr3gv2p2kincr09d0g5n6674t8355a',
                user: 'noe17z9ja599ftmkyrs7891lr4sesguo4uhewcks8y0tzlq8nhi47p6l7863vv0ny39o8846a9r07wcos2swjjau2i9ti8zjqwc0gdb94d2qt2klzrzg1tu7sl3083vakusfx290c84vwsryx33e7ip8vz3y59z0pwcrtidhr60zaa35zwvnna8vyl0qsyb9s033iy4mkxp664h4sd9ytyce032pfkqe0jr7k273ucwckn3ulaq78r4oyvbk0d0',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4c2cdda9-73fa-4cc4-9180-394fa67710f1'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/4c2cdda9-73fa-4cc4-9180-394fa67710f1')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateJobDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobDetailInput!)
                    {
                        bplusItSappiCreateJobDetail (payload:$payload)
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
                            name
                            returnCode
                            node
                            user
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

    test(`/GraphQL bplusItSappiCreateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobDetailInput!)
                    {
                        bplusItSappiCreateJobDetail (payload:$payload)
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
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '89f095e1-16c0-4a19-94f4-0ff57f9d1c11',
                        tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                        systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                        systemName: 'm87g9rx4tjhqi6ac3xov',
                        executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 11:32:22',
                        executionMonitoringStartAt: '2020-07-22 00:22:23',
                        executionMonitoringEndAt: '2020-07-21 22:15:55',
                        status: 'COMPLETED',
                        name: 'mu6bcj55tqzpez61hdlbuo1u8ifniigxjw8mjb2hitjpuznl1o2exgk7lqnhlzk3banf999frqgt8roqycwowc4x7e9t7oeziti8ugveed6s3bsja25jai35aphb74opu8pomztmck4l7wsdaewam2zpod4spju0cli7vrb43x1nz8x2891z70t7mv7lkp0otifkc6efvt6vwbd7jsv95d9vzyltcuexwuas7fgk5t09u5tsk7ssh677yxkb9vc',
                        returnCode: 6315193499,
                        node: 'x2gqk9fod5ew5q3bstia8p6j1i3k8djsffq8qas21qheopl5tbt63eaxpt6v9t6u5lfay4qt7s35mev37epjud101z73pa3fujsbmjyjkg5e1oxno6ytca05srhpzuz7l7t84dv3anqw0yphrywwkb9gkiud0dh6',
                        user: '9te9ugef79e8cgc9ns6lxg4im69fm5oatxj4t2dttar6zux8za1sxgb3ys4msf5i42hisfyps6dl8gzpmv5164p979b7owub7c9jgop3cgicfgx85wvwr9jwo5z9nggr1msrfuz60t6m7x6i2jzeth3z9sjs3xgjsxeurlw8ky94lhh0px0p12h7hh6ezdv5xu796p523t12mwvrl9bukerw5p37ulfkk2e4i870vo4fpd5wuqo7jp9hh4nfucy',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '89f095e1-16c0-4a19-94f4-0ff57f9d1c11');
            });
    });

    test(`/GraphQL bplusItSappiPaginateJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobDetail (query:$query)
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
                            name
                            returnCode
                            node
                            user
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

    test(`/GraphQL bplusItSappiFindJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobDetail (query:$query)
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
                            name
                            returnCode
                            node
                            user
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
                            value   : '4c2cdda9-73fa-4cc4-9180-394fa67710f1'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('4c2cdda9-73fa-4cc4-9180-394fa67710f1');
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobDetailById (id:$id)
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
                            name
                            returnCode
                            node
                            user
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

    test(`/GraphQL bplusItSappiFindJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobDetailById (id:$id)
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
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('4c2cdda9-73fa-4cc4-9180-394fa67710f1');
            });
    });

    test(`/GraphQL bplusItSappiGetJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobsDetail (query:$query)
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
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetJobsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobDetailInput!)
                    {
                        bplusItSappiUpdateJobDetail (payload:$payload)
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
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f89c22ce-d4cc-44a1-9fab-b01f5a4fffad',
                        tenantId: '8a09afe6-e4ad-4651-853b-5ae0a401b366',
                        systemId: '9c7d1549-3134-4045-904f-1127afcd9c58',
                        systemName: '735kpgwnw3o581nguznv',
                        executionId: 'ed6ea913-6326-4ac4-a205-7d022b5f3a88',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 14:43:18',
                        executionMonitoringStartAt: '2020-07-22 00:17:29',
                        executionMonitoringEndAt: '2020-07-21 21:45:02',
                        status: 'COMPLETED',
                        name: 'pyay3mi4yr642lx0xsh2sf39dslibo25u5wmr1xou1dupunvf5ccbcatcqnwholf8h1pbwt327q3arjskgt6mlnnkqwck8l0if80dkpeff4ymupgtmuutjornbu35ij721nc8cnvds17og4ugetq6pgfk1u1ztbx0u5ae7pz0lczf73a7yensl3gyihqnlsn5lvwem7d54w700hkcmgv2cevbt7lmmegsebiwdmefad2aw511vnvazq75k8fwt8',
                        returnCode: 1035438407,
                        node: 'koh8mokd9bhsnhdffbcy46a0cnxmfaqvij4uvjxt4bdb1on3hnf33vlij6cqnr03b56v5x3qu4zbsfgyh3vyr5rtgt8deet3d4eh6xfd4tpday7pgy9pu1jpizqtjd3yleq58ppvq0xxrvypbrxayymovm7n5ozk',
                        user: 'pcbfas5ftzlb70kjb4d4iok3kns450wz1cm93m688vom0q1b38btyfbkqzxsrnc6nn9q7p31pkfum6yhdbeg2fx72r66iyd7w6lm1zcnr21i4rmi0a7e9c308h8649d0zmuu4ozccbcjurfhe7c1knlrdon94ad14giurumhqry8txsf9esnukpm1xx0tmiptleddpzfc94xk67t0oft2mj8rd548o6kqukuc20kepbx89lzikwqytrrtk5vbkx',
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

    test(`/GraphQL bplusItSappiUpdateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobDetailInput!)
                    {
                        bplusItSappiUpdateJobDetail (payload:$payload)
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
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1',
                        tenantId: '5ebacb23-a452-47aa-afb4-045d24c31538',
                        systemId: 'd51cde54-0e5b-4ad7-bc61-33ab44931585',
                        systemName: 'mhx7rssgrdvh7c9rao2a',
                        executionId: '28324a33-9d00-48d1-aaa6-2758a7c1bbe7',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 22:25:51',
                        executionMonitoringStartAt: '2020-07-21 14:47:54',
                        executionMonitoringEndAt: '2020-07-21 04:57:33',
                        status: 'ERROR',
                        name: '39p64577ml8x9uxoa9a08c07o8m17f4vw66bc8szhwe7wel3fjx8e0q19fl9qjpps8aejgjjiwv53tbhbbwfqeyfkzj2yvrxww8u9q93zphgh0bq5jfcjgd7hpyuxhrw6jpbgneyek9ofnng3xkh6lyfachxxfs2lophcetwrd7utnkf4rvsh3ebp60ao08qxr9x60dcks35rh82vqcjwzs1f40g6cliueca5ck5knt32ov2sq4jvszi02b542y',
                        returnCode: 9594622060,
                        node: '0j8ycjswxh6qut3s6t77crjutdgep1h2yw83tlmwvo1ac82x4j6plmp55t7ot14hc5fafb3fw1udraqunt19ekn5ntfth57nx1a3971s3nfsem1iqrb7uy4prg73vdb95urds3cn08xmvbp6d85jqv6adrwjh56j',
                        user: '7rbtb2w2m2n4ri6c21p9z7wa9dssieuf719u8r6pz80jy25zvzhu68cjmceejkjb8jr9hpsluos8uqun0qn9a45kw3tlv1he1vuejmu6pcuaah836yl6pstm3lvjpcsz9y2vylpc73191iq74lvmap0rzf5c25mfb5844xmf82f7wyke600umxcocvlk62c25iwbhffdypd9s3szbbjccog12oigc6kyxw8argknvq7de2pwjkx8fopxlmk4k2k',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('4c2cdda9-73fa-4cc4-9180-394fa67710f1');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobDetailById (id:$id)
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
                            name
                            returnCode
                            node
                            user
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

    test(`/GraphQL bplusItSappiDeleteJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobDetailById (id:$id)
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
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4c2cdda9-73fa-4cc4-9180-394fa67710f1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('4c2cdda9-73fa-4cc4-9180-394fa67710f1');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});