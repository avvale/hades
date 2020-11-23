import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAdministrativeAreaLevel1Repository)
            .useClass(MockAdministrativeAreaLevel1Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: 'mx8s79p8',
                customCode: 'd4rsvp148j',
                name: 'il34eyyve6dep9ov1fq8v1fu53sl2be53uw6uxb50lpdufz0ynin0zf09h62t0qkj1rxxdsa4y3k5ka4ihi0rbqb4p2j2pzgwwzsux9vsm60zxntg37ag26gtpan1ltvy9byztj5fyjcpbw1gnnn53v06377t3z2jh629b7ehh8djnrc7hctdsdmbnsoh4q1vl041zefmpoxr5z8fzjziffjt2cyi22h5mvw72gpdzthuhxhxzk66z76j7y2jtq',
                slug: 'wa7hbmv69au266xk6subyl63ajeq4y6e5knsgyyd2wnvl50rfi5fa216f4ydlpmjo2z4mt2au9gbb2yvcw4ous35diid6qhxtfitdcr9fewwy93ionhgggqwceeqkp719f9yyks2obs1m339nl67xttz8r7ksugt02d23e9ni9gt28oqdrut7s6l1egrv1tosf4uwj4nfjjm6v6j9ct16ym1bb68q0odqvgdxgq4byfqwdgp0a4brukkiau6jbk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: 's070u692',
                customCode: 'kflnkneacp',
                name: '9ixeyn1cdmhfuaf1wga2in6x4z68wbbpn00zs2iwz6awtntz2vpvpm6pp0zrljyifyo6g1bef0frd49fd3rszetfgc6we6mib453ddkas9ci3mzg9oxw7cqiuhbldak27rjkg6atnh7jcuv5606dfe8ds3wynvy3vb9ya3par8issj6lvvg9p93uuwehx9rfpt7ge8m76tj0oxvtqqpsazukwocp9wjsfxnjgfe7yf3zl3ztz2rxn2cm6qjfut9',
                slug: 'vs96vpmcq9y3tztmkaf47kegtbm2dymn39gghq0dscqwgqrx06dxwqi0jclclpnkbktytlmins0gjang9tb8e9i7ounzg41f82lejkugfe3tntsir84z0a5hh107c82kbbi462velwek12kegrcecyijwwww8lc2cl843exij6i1diapg35tlag16pdfvke2zyggv9977b5rshw8n1e170sdppdol0afl1dciq287ehpesfjn3rj8ww8v5lb64i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: null,
                code: '8cklwyd0',
                customCode: '6eusd2vvg5',
                name: '3c94gmsrsmy5jgfxg88mxwa2ib6qnav11gpjfwcf4pw06f7tpicz732hb05o8fkn2eyvt5xagsazr3fpjrdslq0ll68bwire1kcv5cbam52jaq0uxogajqfwsk5xq8mqknu3ka8kg5meqmlz4bftwh1km7plkv6ro2vnc2a343v5mp2qvng4oxku3o26jfmxd6n1guoaeyxx0wfdpmbjv486x76ihwjj57be8p5qa1n61vpmct1ak1czq7zz4ge',
                slug: 'yuh2fw2l250insof9pbzk14c99hfwwyth95thx4bbqvl48gp1iw8nrtcpmw7m008yhxwmuzlzc1rq9qivkbs0g0orkejuwzdlru6de5mzyqhgkedll2r5dsx8ab98180qa2f4rxhnwvh6yuqzjl6354cwfbepfyca26c7p06ieijk81v102drk9m58xobfvpghvpegzhsn42fxx6hi5xgehvwmkcnd1eqvd02bb930ycbni7hv8oyqg4bd8v409',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                
                code: '1iwii25v',
                customCode: '024fxwl3lv',
                name: 'rpki78020fx55gt8mnujkkrdwoibnzhq3s6x7e5iqri3f9o9hv1u4mvr3wz91zprzojs4uzp9dxsd2j56igip3wk57rkdrf6tkk7n0gxjstc6hmwklm3phbphcbf7vkr92mp8c0jd55xg60n1w6s4gem0b2xzmx3ib62y0c6aucuitabw0oz2d2bvl95xloovyagdz7q1xqs8r92vjtqrtrdcij54u3ht87e395aahf6tqwv8wvuigkx4y8ztcw',
                slug: '2vpmyn04zamup2ack24uuj3vrqgw64ifibeisngobc99tfkihr8tqwqfunmo347m9zrcxyi9ul7q17rqvicrlq8th88ld4dtkf5r46wiveqqnjujmd4q4muvdu7ep92h1t0y1njdjawnqca365a54rc37elitquacg7m7qdj74v4x7xhnilqcebk1iw9hv7zkhbvhnxbpgzi8hwmk6jvlhv3ehspjm4qa66m3fgzwk1l8cyftdf1uj7x6uqikcn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: null,
                customCode: '475c3d94fg',
                name: 'xvc6bgagih4qnctyvccauirfhy0ushylwkzsxvg2gvdit7leertz8bytc9dym6llmqpwww6zovallamxs3syqu8fqnuiaw0ytu2m1e9wwvabgdg48adh3yvu5eqm1xqliyf1bl7b5dk0yfcxk90kr6ehwxcbq7b96ss860y0ctd0o6oy74xgz9v7xog7cs2jqe1v7801i8h31evuw6x6mujixyxb7lefszcc0m32zqe11rhy4svz0nmffmdvbax',
                slug: 'aziw80fxq67m0bvzodwgn4fa854ku12sq99zhvh1t4znifys0ip2srv6ghy4e1yv62sku1zgay870bidmgo4ptct8ym9sd5vh1s7vnf9hripsjo7p5afs0vto2s2wo5l0735q7blrk5cnmijlfe2tfnj32idgugwet4y5ct0on8l93t3gm5al718kx68w9fh660dxrbwrjf7w3q3ea4ph0bflzr4qevnqp81oj64rwom9pidvlebckxoahb2xvs',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                
                customCode: 'hjroq25v1e',
                name: 'lbdetpe70h6mvp2az9r14qhlhvxkr5nu919bqv4y0ldy156snrxz7x5z5pyoggd1n4kv8qcbf6kwueaosivyg6w7ib9945pv78ytz464h0d84tc52p4macqhwdar1azynulegiekajfmhd8vcprego6i4qoa5otrwgw5wue8bjtivb60k3vjbfhj989wri40mvousbh610efib6x2mx95xs7r8yihcjxu9lhpmzql0ui4xgq51khrdjxvfr19si',
                slug: '777zt8f1qixgjnif9w0j5an0pox4gvuoquxkshqi79lza9mp0opz0ffc7ldf7mblpzfw0bkap19ns1txci3u3ta406j7vu50ayoe1mkhj2lp67oy2r5j6p1ysot3p1ztb0ppod22augaf9zo5dnkckf0xaj9gyhn2cecma8gyovn1dekw4nhkcu9utmdkl4fhfh4t6ohhrmj9kd5bajw0rvstluhr8r5ykgd5idz659qq13ocjqsuw54dd5k5hz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: '6ul9c7n0',
                customCode: 'rxwwss5szx',
                name: null,
                slug: 'w31mbnicppadcf5x7b2ywmn2mmytvjbsnhxx1mhh2nvedidt60p8pnhc92a3f86zqijjiynyzcx0nab4njrsi50abw2xle1wpm7yq0afe0xnshrywcfoak4brrdtloeem0jle15de418wtofdax7ab9dfc4so1b1v709nlk9lzbwwr01zrio8j42c7xja5c4wpn9sgd6r0fgxo2ksc054bn2fdlxcu6eclqduts49yg6cchbuoq1zemve0hed9q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: 't2oag2fe',
                customCode: '9iem4eqhep',
                
                slug: 'y10y39dimx4ulo5zbkchv80kbv8rpqocn3293ilrb3ifjp1brjq3487zg10lb7yq4zxsil8bzmx7aj90setkf53f0vd0hgqbyfvdrj53fuxm15ckuspkrdtly8uh81zzoeuf7l7khj1q85ska7vucgb4yts0qaki36eu5fiksna743nu2wx5nm8tbo6fdbyvb6si3nfx8ignli4wrk9apvsrh2v409o9jldyt52635kske07nt7jnslmfglj9e7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: 'g7l94cnn',
                customCode: 'w8rqx2r8ri',
                name: 'myfzasdbrkd0i6yf0tf4zq9mf7hf9n3kl4tygqlu2th9mr09sm6excl3esb66udgw3twvalnm9tma767arbh91wvzzbeds4ig1bj01jp4i6bt5jujzkw1qrgityzxzy7fcaj3549nm5g5wrcrd5ri4k91aq5x75nj9tqhof8ocwd208evui2ahrlnbregmt22h4xmhn7vpqf937anwgdreyqyg8bspwbj00x65kjk5af8ig5u1u4nv58lrs8mti',
                slug: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: '9cx9lhzm',
                customCode: 'c39tumfutg',
                name: '0k0rhfst2heay1lshcov6ctlptz12ij3w4vvn1mguo8u2p1bhll32wdd0dwu2u8d2mycsf02lc1lmug2vsj8bsvm8y4oyocutu8j4bqp1z0jbfrre0mzwdax9zwvzb46iirj9qn178lyltpqbutnaifq06r0t69ia58bzsxreoy66jztoit7bcnng77orx06j75mj2axt6joaed7mnxeaa1o6vi44jlowulzfzk8klwig0j799ur3e4igombp8n',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'swy4003vrnlc58cfvibj8kq0ml6da1i20hryk',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: 'vg3bcwkd',
                customCode: 'aq2svb02n0',
                name: 'kmgq48m6j3ppgg4cg2803fp0162if17yl14xu25ffyvlyagemfi3v8lrva5uc2bu3ea8dsh66wd8n33mx0mfbviovy6ew0vqq2uw0njx0434qdh2pmq5upf0na9hw7xazsrtkhd0x5lnslpeg8f6piypy6e0xckrgtqs0dcoc5yc9j9kk2jb64l8iu1n509t9lpykm40lhmtwfz8hdu2zz9s4g4qgfi9rcr3tofb48muo2fe0drf9ecy7hls7oh',
                slug: '1w3w6tgeybywx4c917ek7zdbw4i4all88j2payktf3kvn8kh40pqks7yh7ucpnqwc9nswlzkypojvxgud2x6lx8dsz6mlduabh3sm4v8rxt9n38wqofikolesco8f6zc2vqohm9eh7h1ccuvq2su0zo5ud30ukqgtkpdggszlrz6iiw9lnlh0gndo2h5nrx7xh3bml4z9us4w77m8zoqheccsxxslkdxsap74z37mu2pdas1wh2uofnl9cfyt2i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: 'nhm3himbwo52jj7ij7m7bfmisqwy3w9qkja4r',
                code: 'ztfxmvhz',
                customCode: 'hdg9j6fm22',
                name: 'sj4bk054ucvzbpt9a2whnskb5wtu3rlbg8w4wkn7wy4w62qqm5n2lsuhi2d3myg54ebl8un6ktq0jjffk0d2a729ztxd1q54xistf7lwy8tely4qy2hgmm7vyqyk6l2ixtkmuz50ze9l296h0qjbzbquo248pbnq7xq6k9w3doyqy5l6jbpxlodajzo3t5k25vwht79j9vi9vnm7uyxm5cre4r8jxkkr2xczex65pnj41w8xe0qogfstlsdt0cr',
                slug: 'm377olltzi3621vcs5ys35117jkk3si66givv94772xwndcmoif0u0gulijb46ehs1sexaseguzawcp294gsmovmof3gkjudnpue4l6me3tkywjyrf5bokrrdzlgii2ngut8m2fk5ncr1mxhkau9uybreyi8p9p51vjvujsd9egqrrkdtfnf8j68zshvwodxtpow6ewyn7nrc5zakoo70byv53o70au79o0rqbwdfp3dnush9s0tbjn6hdqohs9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: 'ozvprd23g',
                customCode: 'a5zhcwkjgq',
                name: 'xgwxez5ujvlogu6vfg0z88quzhvvrj5qp4s3db4s6s5fhduv85bhswuo8vty465jbvhy7cmsx9lrlhe396rmib69eu1u104yzaiy7ngvv2bo3tb9w88g0zjoyby88321qbhuolqdbw1q99oehkpuqzrkxp94w6wxjqh2j7u0x9i4j2p66gygq1ktnqiosy7jp60kynr1pgw8vv5bwbd3fshhw41wczgwd32le79a0rqh3uvjnvq8qzzooce3qb1',
                slug: 'v2gd755l4esfeq9sabhsayt6akoa12e9jmy4xq9atz236isii431kx5bdhbi2x2573ekoy3ung076f8swryruddn2v96r9elwxheb544ummfuapfqgv11nw7bm75vosw26fivgjk9991lvg0e622w49ljww2fy6zhqzh2e4ygsrtldsiz3lol8qt4rqqh6nb47668h4v1dcel3j8ef3krjlw9ahwyuateievg8vf8jbsur5wlc5rb7rxmm9glc4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code is too large, has a maximum length of 8');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: 't37v7kgo',
                customCode: 'fztgudrwb74',
                name: 'vtf7h4k5rilx1mkly5o3aeg950yc1xof2kvmldww4kn467sd8etcz2nn4los3hrr57k3sbxr7sq54hms183z4vdiocg0fwzimc8k9uxu4zvr43xkcxawazyl093sx0qc0a5z4pi792inrgi8k62ufhtbt0uae13ss7awguyzhzapmaky0c28j3x5k8923nyhiytksz0uqt1jyf4t614p3v0oq2jdzfob9gahwo0lt7gsgxnk6ezmpqugc48hnxx',
                slug: 'pxnpmbjt7k0shnwzhwqzt6v76w03mtox7fzg0gzcx5segzsqmtd8ez4b9i7hqdkbpii98znw0w7fdjz9ac6lrhuulc00ii7vspojgd4b3jya994hpjcsnc8bcaqpjhod22hkywgpb98t6l67iq5arzjfws6fb2lyzrvqzdtmsrta4z4e7yoc01bq1tlz0chwd9o5rtjtnuk10ddbcqpfm7puqtomaylcw82k9polmku7msw2zlw49rdwohsjl4q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: '8wehn4a6',
                customCode: '4m4wmwpx03',
                name: 'sldp7vcfvswr56x4iw2469klt9rnf80rpm59fu7o1aaj7ckx03tcdre6i75kqfxvrwuf5ur7kc7k6u0wvd141sm6n2ntqz7y96is5pyqy4zhdnb027v6jekqhacznvcaq9f97sqtudl7vrnz6hbq2avmr0dp1wa7omz7i2u8wo8kdtszwcmifbko46f60c2qhogf5yjr429kljpkwl5j4419l81f4s3oa7gt5mt083mm3o3rqp0d1bd3aedkjbzf',
                slug: 'b0lb7h3kbzlf9358gms829x669z51sllj76xcly5032p9x0g1kagrqdb87493zvr05ij2ew73bdd51mpddlyqi8vwmt8iwbl2ik3infeg879e7avdvtf511vper78ki0gi0ct59po4okvs0jr4ib2aws5zxgk5ka5o7b7d3r07ah1p8i6vjspsbki4hdykx5gpzi5equoeor80r2li96aluzho7dpwqaedbkwos4q1pcu37cs8ytiho4mkk58wv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: 'bm9vibvy',
                customCode: '1c7yj8ej4m',
                name: 'fh3whm0yq4621a2v6j4u4jua3wpr4ijz24lz1fun47gphbbpd4mqit4nrvi566vlwrc79buws2c3qi3dzkas1rzljb7dn7icawilq6vst9esxis8911bc0l5c0ewdyywfz8dchgaqx91eu3k2nox9sm02ava8opgoozcf649e6iroufhbrtmsbxv3lln61pa4f2qe2dpc52vitss0mdyejgploa8douxrl9hh46axdmhknafwc5y50e41r9ptkh',
                slug: 'gl9o7pg0k27m0mkmrnlw25oun76pxs28abt9lp7yn45m7jih4dubkqby0tlbqu9gbeimturwjyqrjtkuvyv9any4jzxeh31yj4u2bllqehr7yo274ku4x8tilk70dnswtpl8skrqxzyegxgg5iw189hbsp6hf1sjjc401ze2lqjleqdupyqst9wwywyem8inbvl4l4vq4s5ae9t4d6ctbpr0zkff82wfmmrdxsc8uaxtp41m9m8c38gef3mn2aoa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: '3bheboqz',
                customCode: 'ha80wm8ljz',
                name: '5wkijm6ml9thyho17ycph9iiko9v64akksrdb0dwjjznj3n5iw2ef0n6ix1ya8e1f765ocisnubrl2d4w4i0kpicp2593u79t0wv0iyran8hhrk5kcca81b3crqth47n8w7rmdlp6mr7uwspphqkrf4st2a5e0ajiqhq5p2ioi1gyc9kho6l4no050u7wclpf4yil9ph3eo4qnntpfa0vuhamxscj3vquy8et24k74mavzhannytj8j8uwempza',
                slug: '9jvvjgbacgcaiz5m2wh940g4wi8rpv498rrx7kbrq43svud3l2kt5sw7u1slorv9r9w4pyrgmkdccedifg8wndi1spnkyebwt88pxd2rwm8s8jv2ym1i97l3kg2v4lbyyvur131h13nidls739mw5zesfsa4907wna52a3oim10rqsmpds9bypos0fl95mmhl4ul0917yn5rif7swpi3e8b2vgns9ueotg7hmyqa0bjnwa87zqfmnc92wyhclun',
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-1/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1/paginate')
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

    test(`/REST:GET admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7e9a4f4c-a0c5-416a-a50d-166313fb3a81'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '750c3e94-5c3b-4c77-beae-931dae19fb27'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '750c3e94-5c3b-4c77-beae-931dae19fb27'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/e4a975c6-f8da-4ac3-b256-72e1aa43a998')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/750c3e94-5c3b-4c77-beae-931dae19fb27')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '750c3e94-5c3b-4c77-beae-931dae19fb27'));
    });

    test(`/REST:GET admin/administrative-areas-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '2bfbfe9a-b833-4ab7-8cab-1ba8b87fbaf0',
                countryId: 'fa577ffe-f667-4573-99fe-6116dd0fc37b',
                code: 'f1a7a64b',
                customCode: '4ak2p3zlf3',
                name: 'sd6ygznt6mnxr38w4exqwa0xq8cluyzzdmt032wajc8z2w7xj9h8wttkadbngjaroe8tydgm8zfjtg8gj0doamq3wog8zlle4yjdnq29pmuza9slwofpfyzxxakggy3yw78fnq33podfz6tk6lzkxhcgj2hkl8dql6qmv6lo1xwyr8wgp3d6ulu3n2r9cdib33ezniqwap6rlk4vc3vcei6ve2t7pk3v4xukgb6712sbbwosr7r0fg1g0urxnvy',
                slug: 'n7l5fvthbti1qswpjo62u1i1g60ccpmtt49472vx5b4hcmr0lx42lem2d9yl3teu56ficjkmrdbt76qc1thcpzvhf80o7vd4k53jqvrpy5vveajhvh0obwl4z51q99t3uc7sm8me4dedh429js9z7kiebt0d3qoexipy8ok76y2xym44wihx7p7m4tgg4iqyh0f9r74l2b5n9oe6wdmmfnrz24jl3ej6738m6vuzwbid37uy68zj75yhkn1ebcb',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                code: '4tz1dkqn',
                customCode: 'dr4ot67w9p',
                name: 'sggcvwlgyu9hw84i1or8kt2rpz5k5b71yqw0anme3ot3nwa317pc3yatnw046vrbp0ve5qi3flzn92c9t6g8qvlgtj4m6kkqmg6iihnmu7mkhbtv92vaswxj6wtudk0ag1dinjfvutqk8ahg7ps93xyvmv1vs4wv54cu5ikgy6ohfbjzp7w3bypoxnlfxmj4p19r7hoq9spc4npc1f3pjyxdgmo3rquxjhlyp7kx0a2gbh0xutpiz4pcrf6m686',
                slug: 'foooxqcdu1znjpdc6t5gj6v9efcks3gmqv96e5zvj1y60adm6a0xx537v0r60qkk10phiedw6awzapiloxksefp8n0y9zjqxvcpt6t9bbcpg62l6vzm01gzzt42zh7r73cumjynhr2uz0dq2w696bgwsvqfq3d16iq4r6oq1qqj3o0jlmuaxfztpc7e6jnojs0conzmp894j9pajhlqxkl0brnkxfiqsjf0swtjz8ilizcxr6v3idypvb9du6z9',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '750c3e94-5c3b-4c77-beae-931dae19fb27'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/032f35b4-2130-4cc5-9403-73b055425ae4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/750c3e94-5c3b-4c77-beae-931dae19fb27')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b24f5734-fedf-445a-899f-90b7476e9ff1',
                        countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                        code: 'a643fwu0',
                        customCode: 'ad624d3hdg',
                        name: '73cugqi6r4xl4w2kg8j86o38evig37n6iduoxzpc0r1hq2ycu6l1aoqn6mwsmw07c0p9q2inj141mnuxpb2g6mw2ziddkrxyna0ydqtrt38fbrfsngedbt2fj7saz31rpqg8fih4ovqy22xqxl5tqb9hpuow3cjrhg897w6t0tt82gg0m98d4qids8sxprqqqsm2tc4zp2mj5tmu9bj1bbtclkfx2ra59gk8wlgqf4m76d15dhouzv2mtm7fyus',
                        slug: 'zn9iqzcqwlcezxkydyjpdn6rzokol4djqaspbda4jm3zi65zhabiumqa0y1v1dox4m9a3cdswl1vq7vye7hu71v0ne6dkp6ijj383i4kg2vmidq3xgk9xu90cnqcn219pzvc9ldb5krnbajw6x7q24ie27b39iap4coepr8p228mt2pv61yi167peo65ji6wr9m1ueb2kccajumzpfpyzuo7yroz4hot4xh5gbw6700oqxtfgozqi5srld7ym24',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', 'b24f5734-fedf-445a-899f-90b7476e9ff1');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel1 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
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
                            id: 'f23323b5-6df3-4f6a-a7d4-8658b83cd0d3'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
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
                            id: '750c3e94-5c3b-4c77-beae-931dae19fb27'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('750c3e94-5c3b-4c77-beae-931dae19fb27');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3a683ea2-3a07-4b18-a34f-9a226e3fa815'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '750c3e94-5c3b-4c77-beae-931dae19fb27'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('750c3e94-5c3b-4c77-beae-931dae19fb27');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel1.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8014e698-e4e2-45c2-a809-69c71bb2276f',
                        countryId: 'd1ad6fda-0ad8-43b0-8c1d-490c3f4ddd90',
                        code: 'j171ad2i',
                        customCode: 'iujt9mnw1u',
                        name: 'bkhdiu934sby8z1wdaojxs48xrsjlp65cngqpqsbqdra9n315vl9sghkbxe0weaiuu0haopz95ny9aosnziz7efu7qtq8cs62shvuz7k49kgghwsdxxtp7eurykwf5biq0la4bym6ba8zjzouo33y65q95pmf5rmhsg8gbypqao59h4tr7pl62sud85nd9v5x70tjqbj9n8izwkt1vrlpic4rwikmf8dffahoujswplqroeo67p2nix6e8gise0',
                        slug: '8n33ikrmkiij1nrhp3l3rx76gfakyvk256lq6duxumvmin8fomvh9hz081l464tedhndaay93v4s9lpbe52vmu43ce4uln2c2aamc4mu3mznvkngxihztiugy90fxl0c9ceowifrzejj7q99dq1d6193oxq1ugtb8xq9ycicnhgih09myhlopzn6l9p9bvln4hj21hfuqrkmsu17obefgkn04bk6xn1hj6as8yrvl6bh1nfoxmgxys9a57y2bwg',
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '750c3e94-5c3b-4c77-beae-931dae19fb27',
                        countryId: '1133b412-861e-4bfa-bd3b-caa5ebe7488c',
                        code: 'eimxkc68',
                        customCode: 'roqc2bm6xg',
                        name: 'iy1t8vqkvpkxo52ajuljjrbvqagk84ir2b2f801o3b22irj3x26aartnap1o51j52ixy9s5r47nzy4n6iqqgj4kvwkpjlttlubr6xb1lxe5rojvfrl2s97h7hw7vjbvoaxo7mvpq73wrvyeiocy10dyvnp7qiuetxim00tremt6hz1gejbp4f9gbz46o3moua0hv5fdjpiu9fh225ff93ivvl5zdjf705b0oaja3kll6wizeb1a86nyvzyit7u5',
                        slug: 'iks8c3xcx6f7xuflge87g39eubszrtkbisorfbhslpsxq6ktjzvuuf4ly3y3qx5k2g0fo8uswchropw97hvcmtszdg1cvrt1elir1fdf8w0az8peev8ggl4nmjajt6m7kqh2xqxvuscduw7nriw1wij01hye5f6exqhnc6dlt4u8gmqqqzesmzo045t9l821auqelwlczjiwxjvj282flp7uu2w5ct29kf6lxjcpg18uscarl2hxo4qfl2np3pl',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('750c3e94-5c3b-4c77-beae-931dae19fb27');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '40b83c3b-6a27-4ff8-a303-ca800a882355'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '750c3e94-5c3b-4c77-beae-931dae19fb27'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('750c3e94-5c3b-4c77-beae-931dae19fb27');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});