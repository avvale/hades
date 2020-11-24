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
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: 'lrfbxmft',
                customCode: 'e53xsd0x4t',
                name: 'fgp4c8ihh1mvpi509zfb0dj6z23e1ijmf40qq89radqhnuhpatd3ohref484kxg53bhqiptbm9q5t32991m2m6a4un3zcf2du2gzlwhxa0o1htj6jpuqm0o3cyf7ulnhozog4dlucln17q8b4fgby2ez067ak89s5jj09wzaxi7odz8sc08xxim33htr1wifk9j14n24tf32cdxij10n93rfppu2dt9hx5vt9lxe94sg6csdfd4oooywa83qak9',
                slug: 'y8hee7pzgmu4mdr0pwdb4tvbsstcyunhqigy0n5xvqechhwlue51amlt16pt6lab77a0kg6blamyddwmk0c2sdgo58n1uyooi4d1iqt4c2ltggtdvfk6622e2vzha9hj32viqb2m3o6qwj2frybjpw8wer8o70cr26nnlla680tobw51dfddet5r61vyka27pcacz01vogn6mdr1pusyjsb5fmxj3xkqe2xdhgg8aq6jsc5rc3p0gqtk46vz085',
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
                
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: 'r37bf62i',
                customCode: 'o6rslxuxkg',
                name: 'xxls4he1umtj2mma43hrjff9on022q5xmbovrhvht3jp9j6fro0ddnbltth3w8wapl44gabe877jtm4sgt3c4qb17xqndnl7ctpxji5u0etyrbhbafj91zmqd8gk0ln5udhdnf08r3rj9wncd0jczoerjgur1trf92x0lrz9p6jrlenvfiz0zsqib56ofosduielt7fwb39evlgcnyq5u5md2s3ijh4a564164z2u0onh0s8ejs40lsn6mulw6m',
                slug: '5sra34shteo9dfuozqjdylkeor90hjzgryzd85i2j9kp3k6gh9xrzgcvp8laensuve0d6uayge6mnptoqkrfzr16vzaqyzeq3eiy64vgo4nuh03iu7p6nua2ifki5j5vci5hm1xw2yxewtjkrup6zmdm1vu3zx3jkrssn59lgjaoq3966ay4n45ycie07ucnjsmqiig1t4kgnrui6w89utydp6p8d4oajnd13hv19hir7acxpvck8a00b4hm0on',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: null,
                code: '0nm5rn4m',
                customCode: 'wizc0pfic7',
                name: 'wgwph3j0wymxr46qbl64zmp4h5b06i6wdgwdfqfoz1p6gjg32i9r9heyktq1jpt6rf1qso1ma7ph6628uhdmoxlk0cudat88lljrc7sttdh2ggdtr83jq0apceu4a08kquhga8p72fhxj2n989srfp1zyo2ageczslh21wh46nt75pgej4nlotrrrhxutj822k9q6mmrblvxzrrfqybf850rhhr1bvs277nmu6fuagnc3dzmwt704i07p78b2q0',
                slug: 'wvckjwsu2g03uf4tn8fphs8u0c91wujsr45m3mxs2fgjq0c2sl4iwk9261k294klwuz55y8rac92b9n9xtlghaxhi18vjv3llecqx7g9gbj3gffhvlgyhbsz2dgedsfwx6juxatm379l84zdeb4mb2lbxfvih7eeqdfnnpf23liqqimg9rcx96xc2s4h4zndaisil1uoon7rw9r2b95k04jflu1qmtmiws7p016m0l507lsgvaglfk7tyitmxf6',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                
                code: 'qnxkpew0',
                customCode: '61qdotcftx',
                name: '2aqntopm1vg8t2iu8s7z1yynd8l5z1w1evms3lg3aob4fhwg6lb1dfabvpae90iybmmg3euc8cfbzq09usx42y5v6o5wawga22prwprfj5imjd32phdg80uddclbzcqwwv453j7pp7ywtb0lmfrp1qtpjm13ryxoayzfafue0n6oz71yqcy5esy717xoxs6kejvjc10a6q7mc0ld4dmytej4ryhqmgwfgh7kusxuqn2l8ed4scskeye79ummvvb',
                slug: 'uzu9kxhxqpq1w1mkut3wvkiawl55zg0tden118lmskox2g0suwyre64ktz6jdhm6vnaps3l0k05pnccfukfr1s4nkkgcelmulj2daqy5zzmc9nk11m4ulhr1gm3hf5aqlf6a22g6atgl5i3psncmqgdru4ie9mjcsagfbl43mg23p6g1cs20n720h1y9qdajctkspd4eajtx4oj62clsecpj6xm9d7jeqm8np0y5jqs6kgys1nyvd7h3vsj5p06',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: null,
                customCode: 'ybgjqehi4j',
                name: 'hmblq20vosmu2qup023xzweiqbmd0lsg5b3n51j0y76ajw4lxfu7gsjn8luwjsov1ga4yadqnn6fsfpeqhc2ucyos0yrvhl5sguldhbrq0oame2099wfjpwkpaocv7aj2xav02uicgafkt7g7g6jki0ikrzmqtcz9z7n9jm1wxgasldn05nuzez853musjfv51nkw0qnkwnrjbmp7pf8wtqxmhi5cbkcinp19buv9qctsn0aof4qczfmlfi8hfj',
                slug: 'azq3gjdl3qm8yvhuoe5bzizhpw71bjkybag394lp8tptk6p7ytr7rm6fziukz3a9ctkpwp0xl3v5am11iredc5t39biu7m7uqjehmdoya7fv5l8ula9ykqod6g8qm5gdebmrequph4ompivflurn2uftg3xbt12g1rnobo5epsw4jgn3zhsb0etlf2yvhb1iqrer2txauv10pkgprbbf0002b1lyrs659z31cz49iyu72faptthvmq5xgnxmnug',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                
                customCode: 'c6y71dlonb',
                name: 'b7m8sf7mq53szi0g0c3dw2nem4xy9qkavmt79frnf6hdy7krekfikbpxt5lh2injc4jxi0wfd82hnna2a3urgpjxjbckv37efjvv00d1gn44zurkncjc3o5msldyfxjezrz63rfv0gcusgkevlzerrj02bmel1olungt3jrsbb6vhizh5bkzr0ivhq6ts4g6qv6vy8q9dwnsfrlvan0n5osyy0n8zih0vl5wsel6eygppqh7lr3l5xvtocmnaj0',
                slug: 'ljkb15wbp7ndco3kttlmyp9xrh008c1d9het89ey124zko88zifjlx27qbb8nxt798etsekyi6ratqurq4ul1105xxqc0j96nurpvs3cn0m8aji3u9d4120l2d0t45j07lnwijr7exgmicu2tebnyghmklkdhvwyp8h3pptr4bjxc6bkde4fxeiwdyyv6l8xlhqxdxl7w4izvnlm5fn501sg2xb2nw2oqzos8ewr1u49hcazpjx63qqfsy7v5rc',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: 'tn1sodqg',
                customCode: '3fc8deitsl',
                name: null,
                slug: '4l386cdebw1ow8hl3p1y8h0adcys77xmmbwkqb5ybh0y9ym9dsgeqaatlsvw84jkk2zmvxdk4pa5c6pypp2963xcagli49knr9egh3g10uajebd9pn4oanufk33pd1t8rp29bl5sc68pcbipz8o4zvjubjqkxd7ashy4q9t3u6iabjxmxq7ub1q8ly5jx3h5y4ol9ruo66kvgr4utxz68ufzdi4w3jn8tojahigg44aerey5dxscmnaciusjgcs',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: 'rly6qv1u',
                customCode: '0cc8s4ey6w',
                
                slug: 'herlfmsnw0aguftjiw60f7spj7udunyr7cbivtx9a9ejlv6wz9o1ebknh1zsuiefzf3xxqm8sv4n2zvyne8ud9ck8w9nuy1ufffn484glfxr8nn82o21e7vkgeuwhbmox1segqxk3io1pcj9pg3bi4yxa36e2pwetn73zzn1pgdszvt2qu5dnj7tmaf5832xnj30yhlki222r9zg05mo4eird9erpmc34fjdca5l4zqm3xmp7527sjlfpsjuhqf',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: 'dw1ra937',
                customCode: 'cb2eancx0u',
                name: 'n72rght102al1s8ioggldfv2dpmobmmaysdzwvycl4joc7jjqg9z6unbml561hjwx457af75a5wnatm5dynvp10d43m3w51gdhr9xf28wf8xq8pmxnsdvrxrwfopmjhix22pskwy5j40gptbvhmghmsa0iq4vmzdqj0qx64r7uosozb2c7oawu1hm76rh95z79m1a3ljfg6m8y1qmlhslfqw7oogylgg3p3cwpjyoj55jzwvsjc2tisy08ktak2',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: 'nuat8a25',
                customCode: '2orzfelxgf',
                name: 'tq6x01els57hqph98vpno55ibcthqm5ydo386d1joaclmu4a9i79vdrdre0qk79kzmezrm9hwdf508hefni2v9rll0icxvwb10tn2tvumis6rx7zo98vj52vn6wjwv0pq5w3rfnuqig0ygup5jchxh26i05radrzzvf9278122kwusfs33gpitncgrpdioupifu50wz8hmy6nuqijntpfxphk59lgz5s70m115p61c683xw515d7gtbr64sevjj',
                
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
                id: '4cni7ioo6s210nm16ilog95m7gv1a4riztmlz',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: '8rgfsjmm',
                customCode: 'g09smjdlee',
                name: 'y1v96t7ztg6oibm5atp1w2l7wi14jy9fgn6tbsuxc6zin3ys2w1ivqa4dq8gu61qgpgtlfjva8ht8rx9qwaw3ft9b78xp8xurainokc54uou1cqfvhonzxyegmu2iz7pgbfpl3onwqyrx0a2zwge6dgx6642sjujogdgleqyq5np3xwd9v800itq0dizk1i3eiel4u0u55ujw1aig81fh1oy7fq3fm8kadeoy8t3xoi4xt19wd0uoqcyz1bmy6x',
                slug: 'ufwgitnet0751xrhiq3bi0vnqspac2cai5to2kv9886e1257a8szz3y7ek45t5uupq069wzu4kboqeyzmm36m94c7hu2qn2xmlidxjaqz9v5e15sp5nrzkko51wxc5xax219sc3sdvbe0pm6fakvtjfeu7wezkharucfb3qxg4v2g8y5jxm6wv5d3345ftnv920dxq7feibsl65ne4tbn0oqrlckdhr5md9w0ioc93mzez1dxwi4dm7cjcde2u2',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'w3ro96s9yqj11i47hokyor550fr0xww6woh0c',
                code: '6gs3k5w1',
                customCode: 'newk5pg5l2',
                name: '9d16e2ve1kjditv2ds8um0zy413ukkjqmp272lyhim9nozve45e5tu6fdclhqjmzbsxp9d9afh1can7ns4w3lwgktg0lbo3xhfss4vscanf9wc5636va3ks92fz3nthmc6qabgukay6db848bdjwbp533equ7tu9c46kxfn2m1luldur8zo9s00v0rxoejo2mayork0bl9nz4cz7dp4pn2xys1dluh7rc7lhdv4ci2voefmt5l2hjvw3jjawf2q',
                slug: 'q26gehq8jbiazbgslcmcmoej0oa01c3rt63h00gnrw1584kgls0rpejpgtu3c42x2iwhicpkrn9i6na8urk90g4qooegzix3jb7ooe3rwougscp37nel4befzifg3skvmkpa03fc29ysnpnuqzz6sjrxt0v5qdgo4wwfx57prikh0mfb5avbf1y498ah2hutspb1pkayej8zjxeb8104pl4jjhd489m1v1ys0w5akudoby5ap22zgk2iwmss958',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: '3iwn1cw5l',
                customCode: 'qzojce1rnj',
                name: 'wlzbdlm7i952xzj0ynus2hraz28bqjp3r9lcchxo36bbk7rxd74yi2jj0tnx15fqn5ba8ny4hafd8y7e1tc34vsutsoiiypiwmd1obem2ijcbrk680yd1x6my7ga2vo9ivczrozjpaf8i6tyqdzwfz9mh5yucj1c8zk4dzg7pjhakkjgovpykf2r70ghnp89n4z0f8y8mu8pi3gjfu9ayeq2l92o76dpjrh5omc1dkumzlpf5x3aefqufjz96ig',
                slug: 'esnxmjkylpfy7a2sefxnn8kz6uttrv3xqulzmi3bn90rh8aksne0352gcfnb8auqrtwiqv7nzfyzof20jekgsrlza4x9vt6rp83cmxdhnlkrfjzt1bvv1txa1hvjcpebv6o4nyokrvw2kl8t6sz1xg9fk2572z2d803kfteoqpc18xatxuefvm5vb1j9r2u1rz7065em79icwb2gx8q7jjzznhrf3j72kwm52dfslnjal9f20sg1glt1q2zzbkr',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: '9g4wgg1f',
                customCode: 'ip9wcdiutb0',
                name: '2b1d3h8ltfsl693hfra8llzhlyul05a1wspqojn6oh1udmaozlwrqfy36abcdbt6rkr9dl2uxqrztyilggwqy0axpixzqqko6aqkwxnoynnavftuqh90638tgy425amc1utp9xsicne92yvnodqoe6wwayxqhubd935rsyq45sedyf67ybhr2vwq5rutpa3zdryaxbliftgy024rfqkiui1w80w38uy8sab6qr1oqv9g5a9i8az3mnf8q8vxy4q',
                slug: 'mbsy1a369rnmcyapc1zyv2azdfxyrr7f98ixte316yr20283b00b2xvhd8yiuo7h1b8iygq3j58gk6qgezn5abhw0zk8389e91bgdb5m79dujzxfggodv1u1stjjbbwh5b3lvxqs5uggn335j9n82xjo80ejuasni2uoxhrdw12z24n9lbyixxbh9ixq0etvepe22jxyroofcjy2atzdy40fgczl56ovfikfgs172cyde3xeww26bkzdgbhua9w',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: '1h9iiwat',
                customCode: 't288rc0dom',
                name: 'kn0qvln7s1ky696okux5n01juemzu5w5p9x4ede25lwmgvjegueg1gkt44utau6bnu23kxza01yd1kmw8rgyfsjjhk50t17kgaxu1daykf3n3npq6p8i9qtmsifqo6mclfkbj4bjeppdpt63b253lu4cy06ozusudmnyy70n5dzmqtrw0hshqlymq45ubsy6s3he37tgjphqs3tkmcfnvl21ejh64spqy16v5jk3l5wim3e78tepj9gph1nrir9z',
                slug: '8juyxoneuv4krlzirnn3zyiyvbcfiux06ijekjg3kvqnnea4s986a22u95s2zgjm1w6t8qfdg4t5ozufb8xe5qds8rpbak06j8hni9y7e7fqf3as9bdq7xipakw6d1ksvxtbe5cn8j8d5f7d358ljw7wap526tn9qt0ctfkb9it0c0wnr2frcbceee305lye0wb3bcu2tilomklug0i8qnnhbt0cjzaku2vnvow95m9e0jvvgmuvetj4f3jkqub',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: '5kh7scx8',
                customCode: 'qjnn9q66n7',
                name: 'xsxaxzufdkvvab279oq53rzlp572xuqlzrzqfiz8s4lhn5d6undisdbse6i7v2a7kk4tihwf38p4z8jqjae5pau5bxwcn3t1re5cayyhw6pydv4y3m65ylwrf6kuovctjk9udivlj882vgqp5nvz7nz821s8bz0k6tql9843wipng4bh0rp77gazr6s60l6v6bv5dniwm2b1yrlj843grup4wrmacjo5jt5jzfcj6ex5swed4pleixospca97u3',
                slug: 'vaffsqt5d4ryzyqkw6i8u7jd8ke64z03ppejyq194vagr4wqgjqh1o5e8ztlfdz736h3mnvmenzcgv5ueltt4sbmra8avycxm1g5bcdmtj6awhlh50nmyhh7undkce4mscocv4nt0869jxb1l8zu4iep5s3olr8zhsi4zubf9ye7l9clvs5i1qii2z4bj67ikr0e3lzx0s9fnk63q132j5sty6o9lsoumtw9mj0v1cfseh1haq8ubf0gato5bid1',
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
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: 'wzgtr8a8',
                customCode: '1r2lkwmfrh',
                name: '0dmaccehpk2sdmwg5a84wdgv48n39x8y2kfku2dxb7trvj3ko6lun11ootl49hnjqnxn5lixjyr1j1hkhg8mysmokmrztf83ffcmhbzno2y44oseox064tbi9vb9oc615ky7njmls579wbunr58hx8x47yvzdhxomoanwt9b0y87jbo9qtd2fdoqo57k2wn8499fv08iiz0htd4oowr0xp1mkgd326kz3k50s3fim4oxpjnu3bizftziylfn7yo',
                slug: 'ey2r48jabmen1lb69rimdt9tyafrdjbv13p0zvz5b4zbeues1qvieud4xdwbhg7cd1rhagl1k9oh5h8e6m6uplk8vqvkcdzvzev4gxf2r54w915ua2q5jdo5ef04sm8jeqfnav9ht0hepflq2bvfz1xan04tkt7sxvjtc78ckupm9vl95azx6n98buuabljowv9sx5bjx2mdkj932qy17k12wnq0fk71bjqu5p4j4tz2ix9hcju1bik5s9v6g6s',
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
                        id: '6529f546-b07e-4637-bb02-0abe43c17081'
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
                        id: 'db1a8b47-f740-48ea-9e25-5476364f428a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'db1a8b47-f740-48ea-9e25-5476364f428a'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/f847e889-8291-4e8a-8666-b81bb6d7b88e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/db1a8b47-f740-48ea-9e25-5476364f428a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db1a8b47-f740-48ea-9e25-5476364f428a'));
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
                
                id: '53d7a306-2aae-48fa-beb9-b9bd35f340b9',
                countryId: '41485ded-a885-4ba9-bdab-18049cd2fef9',
                code: 's31znjhb',
                customCode: 'gstsv30058',
                name: 's5ihjgt7pk5ha1ihlw127a478dvoqncn1biq0ymebdp7szte9odf655iga13oxhioq6j85a0ti01y2hyn0mn3p8tq93qjzp23fbe0m5m2abfomrmzxv7wprh9rs5ywpy5h1iq8lcpm0fl0mdiw5eewbevloelx939atl8j78gd1tkrjmepmu7jmqghzb7kjbnfpbh477xzs83fa33e359oul24gcnn6e464w9kh75h48sex7dm8s82i8srx6b0k',
                slug: 'w2yrq89mccfva8ozl55kxg1g5d0gpxbgyohbux44a8e3jthat83flzyx1b7lrmtej3eva1kgdpgdyds6uop6s5zkv3s5losx3tlwncg28ax05jnqu8te3v0fg917x4hoj9n5famcayzllxzndtg6msca661b7x2zxwp8wuwz96xcrhab55diodnpp06luwbe1glwklcym4fqzxkh7myfjtx6luh93bawcv4b8gvgp9j947timxw6swepvced5kh',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                code: '766ljrl0',
                customCode: 'wq9k0pnw41',
                name: '8oxz75jev6cw1wgr01xnn4bdiph1zbjuqy5t3c7qlz5rjtaqpqcwykqnv1xn58ye25hj7k8gugpc165sy49eg6kp9wp0jxxv8qh3pg75xttvhm2lecmo79sfenzp7rukubgd9ef67ewu9s02s9cvrblyv8c49yvgfv2vcbhxj9hl5b3i71f6yjb9e1phbj5iwol9cut8ic1c1re3xftkecdclj7320xa7b0m1v5tvfcfgxswijglqkoayoib2fk',
                slug: '4ulvlsy438ul0ljx6l8i2gg6lzydublwqplwonnvdk7e11k8mu9oms7z5dl4rht8ftooly7e60f1cy3j2xzv7wgvsr58bqgefouxwd45jovzl889p0wj3rr0my7785fy40awnmioyg3c08dq3gohp3nki82po8z9asc89d11phvcvc8d0fq3dqwgbewgrziwd8ge8qb43l9cpfd3gsywzsh0c7hhyk7bgqe8rezetysog0d4a66id3asmalgjp7',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db1a8b47-f740-48ea-9e25-5476364f428a'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/e3a3bb0f-b831-4d4f-814e-a5e3cd747477')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/db1a8b47-f740-48ea-9e25-5476364f428a')
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
                        id: 'da34de54-51af-429a-b19c-2e8718027d19',
                        countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                        code: 'k29lrzze',
                        customCode: 'j5ay4ojnew',
                        name: 'emqqhljsbh2vp8ds5j35049efe3yrmhmykep9lmv4jffq8qfdcb1iml1eycm2i2gzizchl9peg8a1vj1mvke6wzfovglh5pny21bl8wk1i8v4wzzl3xeo4s1tijcwrmyxghsds4u30yv3kagpjqy6v7sawkpg8nba51lio6tlnl5rjxys3033x6sy8c0l1w6m88g2kngy9wjpdo5axma9czmotfq7ptlkfarmsj42l8bj7xm6jkbtic74h28sci',
                        slug: 'vdhk1v26jwdndoon77iob69jkljuxpks3y9bpy2g30e51r2b5b4y8mwzai5wp4qch9uejtvyliicyzennbjexq24m7rrvfoolinuhxj8aeae8g9re06apwft35inouskbi6rz15zhq33i981g8hvco29tp0718helr0yg1fj70w0an98e35n79xpdrhzugwlnr3s8wjvnw84cnaaq9x4i0h0bycvhhl8pxvr920m026akyv3hpghmecfhn4g908',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', 'da34de54-51af-429a-b19c-2e8718027d19');
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
                            id: '71f5b59c-3070-4b4c-ad1b-c5411e0e841f'
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
                            id: 'db1a8b47-f740-48ea-9e25-5476364f428a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('db1a8b47-f740-48ea-9e25-5476364f428a');
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
                    id: '99e581b2-7421-4b6e-b8ba-1a019bd8fd39'
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
                    id: 'db1a8b47-f740-48ea-9e25-5476364f428a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('db1a8b47-f740-48ea-9e25-5476364f428a');
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
                        
                        id: 'df7b9186-aa25-48c6-854f-346981b712f9',
                        countryId: '7aa7ca5d-a647-440a-9045-9fe09ac394f7',
                        code: '0n07iasw',
                        customCode: 'tf89hbiyai',
                        name: 'wnfubl3v18vsxi06h3n5c8c4lr1dwr9nnm8spux3e4xvyv3gfpxjwcefs6vy5z3e6caj8dk2jy7tri19dpita3f0qjew0updjup7ltltz4isl659d03rgmvces0s56od8pri40hh4e87ivp2n72h9grcfpr72cs88bxaj70lxb82qxtitewycduflf5pnk9jbqrsw4ezr7pq1qpjc2dmdoj5bd9i02g8d10ybbu825emcbyoy0yfli3d7zzksqb',
                        slug: 'ubbz2fhlhswvuoogbq0ra7fdfh8b7rx7o84yhs1bfppq5bqdo70ckp5oodeswe2nvn4122if88hiqs3cpul9dgvfc7sip82bqy2qdxwdc3ngywpb8syx2tzl6w4k1mvkbju2lomr6zce8nsz1kxgv57rkmnidk26tvanutjkqi4ncyggmuzsfz4admfa15qkr99qdpmcutxx2y0vsl7jjk5jmllzwdz1qa8dlh72d4o897yalf61t8itcw0fmg3',
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
                        
                        id: 'db1a8b47-f740-48ea-9e25-5476364f428a',
                        countryId: 'd42cf868-8c58-4753-812b-ce80938fe412',
                        code: '9mott9qt',
                        customCode: '4lv9qdgvpx',
                        name: '6o12h6jj7bl6rbnsylcwv4vhn3eutd687a6xgbxezep8pnq0u2ixperu4soxu2e8raudex7h0aikupwc0ouh8hcm6msla0qaewwld0u1um2nm45boyr9bk02neijby0lxhrejkw6h6tu4wmahscsedy93fqbl6dtjlbkk6rqjuezyuyg5ozpse0q74s64ur0llij8cts31jeenra96w4qxr0birr7gd89f2s9d5korw55tq7uhiud1fyvt4cnwy',
                        slug: 'w5qg0x437reu26b59zrvvxwcxba1sql53v6xev2ivsmx33y6ag26z1oim9k05mw1e3m9u1atc5ra0darwuxorql9kvrlrutvslz1ioox32ouajn8m0kfsi83dt7xnqbo81zansgew4z9m6tp6rs4q6djk66xg7ioj58vetcy6sujz2v4w30k06fqnsg01l92ek63221azsbbn4a2deazbrz0a6g94ccwwa20j06tyc77foymdqakh05u2v1dpfm',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('db1a8b47-f740-48ea-9e25-5476364f428a');
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
                    id: 'a31d78e3-8d70-4edf-a44b-ce464a94ff63'
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
                    id: 'db1a8b47-f740-48ea-9e25-5476364f428a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('db1a8b47-f740-48ea-9e25-5476364f428a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});