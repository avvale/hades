import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('resource', () =>
{
    let app: INestApplication;
    let repository: MockResourceRepository;

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
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: '3ghpaus8wbcgqfhw75apb8skj82ze2p5sh51ui6e7siu78470mro6ebqgfr5ro3kvs0dxoqriz4130znr2vpxaemc4eaf7akkle5i9kxndq6w02jym5pdiktit5sv5oi722wcrd4312y45ax6tv0qfhk734a162d4tpex55advavcvkd7wm5x4nfh55t8vqxawjeb6wc01x325zsbk9nr80kn15gew8bciimb2996feofelectv05jwd685tm9o',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: 'y86kwuyzraije5k3la38caqtmz1nvscyyjhtob7k3jwjswv52u920dfzj5gwvfxbdpbynb8gn87eb7jjtf4u5cbol499u7keaonxxxmoq9o4re5y3myptu6o2yej0rqtjwtytracxputp2cgw3xi62rlo1tbmqpct5wyodqub7m9xf8dpd18b3ulnmq3cuv4jpxjkf8ahxuhswh65dn7x2vb0jke5onxzu5l3r52tsr2w8kyuw67ovvo7336zab',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: 'ba5ke9436zlkfbkjllclxakq7nfpm4x2wtkbkjvpkuiu6ov77ispbbsx44clyt53gxa97xrpgfitlt3i32gu4i3k325tm8qbnfq2wcgoz2ups4raa6jt68u5xv8f4hvoypdmbnlwy3dyraazok3k3v0dfvhxvvm7od4ms3b3sv3n7m5nvev8bzc74fiegxz306fsp4nhvqkhbumdq6r6kdvf5aab3weovrparkyjwak7zti9kx8cxmhc9ja8zur',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                
                attachmentFamilyIds: [],
                name: '0kx0iwrtlvlc9qaomv0s10i3dys5nfmgqfybw0kdsky2t754w6wobs1yz8mrmjoqt924l7gtl2t6i2w8241js7ibn4r478haf9ujks0ibuohbax45d34vblj84nwgmslrg0iuriwbikz899jgmqbi4x6v1zf4cvqb607r9cn8xy4c3esraammboq23gi6pd5mx467djlr39fb4tw16g99hb4yv5p6kktv35n94l3er6o8b10pwx65dwncdrzzwx',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: null,
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: 'ferl53vhdukv0aqu0xnfyq2elr0u1c7wie64moqv8i6hcwb3toiil0bvvslpuq58i8qg9r6xdjo6k168y43zlgbtk1l6fganh50dqdwmqsrhy9s00smwj5vt6yd2w85zksf6582bqi5kpr1ywvnen0m83b91yiukoav7dsvqg43a4eduj4skoprj9m6k01sowd4aux5gmq5dj9uakvz2udagfhfuylv65yu407r42hlmzib8cke1brp7ec582bw',
                hasCustomFields: null,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: '4lk8dmvztwedlezffwdkvmvj1527smfvfritvxl1yhozhqkiw91ukmm6se03fkilwa48niv322jytyensi49yjwplk929udne5yj4d5r8408n7835ipiz9vvv81cu8ybudpp7jrpy9ycad5ujllj594xkw20x25z386c5qx6mf9spklzb7odhxlxvnki3oauryriinbhaa9vt7iyfc3nzezctuvngid81mbfaklfi0nusnph50anrxiz94x9r0l',
                
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: '57m5s720kei8p58cf7ix4kqrxgxekvoscv54veeshsxpzf3htbvumvg5dwibhbexxt70bwafn59ms98pe6rlsu91ear6wj2hg6v79r236azaoxfersl8hmx9e5tvqsn0x79lmjiz8jb0prz3lxppz8w7lz2764gbpt5d6tuggs3q3evtd4v6kzrogqdp9aggvsh7qxed4sart2kkts0315bap1f2je7upa5xs506mvvs04f4w1t9pqhhi6g6i5d',
                hasCustomFields: false,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: '6stlljv37qz0hg96u2b0sj42cz8963mwocfno3uno184fau61vrkm96jbuxx5mu829jk186y1onbbdcmfmz4gdp1dpzhgk3t43nk5bzhrvs211jffddc2lfce6gpi2mpzejjld24bztddtg9uop0wonk6iqfvc6de4rv4es7snkn9scix0nwp0v4hnfr7dcpz8t8gntxtjwhueribsm6eimaczgd1i4d5lszpg0a40ewph2mjba04p88m3tqe75',
                hasCustomFields: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '4tqaq1q121ljwkw3v47sxugf456utx855ojir',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: 'rtftvc6aaj5yse6flll9wqqpkbs8a5kmsbt87atju6mmhwxwrdtr3k05ec1uxspg0yx3ey2xj5avrqcsnvrzj4n7076gnee6tpkypbfb443rmlvta3g0lj1ihb9xyj3wievff68jhiviy569d8d7fxq4dth757zyqt2fypa5aog0vt8ybe6cvsc1hzgqhlj2uqfsw9g10o7gybfceh48ptidwatbs3ee4ub3tdidpdmwu3aay75mtnmey6zje2s',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: 'miektwh3trzgzaasokpgwxcd5hlozreqq6qau',
                attachmentFamilyIds: [],
                name: 'iq6zvq1caix5kvgvf4fl1aqit5i6h3d3c2079bx8c6j89pr12idw6dnbyy8s6sqyh2ex1hd50uaiqubx76gbvwrydjmxd52b0wmnnp6kv7t8brejuy7g7s0iw8mske0wwki7b66wox3gmh3a4fcg10q8vdfiw7iqlfst6hccnxliorx8m5cngq9b22ca5mh6no2ywj7jkuhudxwx9lhtfle56pboyrnm8dbpqkfeniw6k8d8r1vks3h8koi7dik',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: '3tdgk6xul6tpm5n0li0oj52lx18ixvlyommqx2lq41z1r9za4vmnrrfbcdmwgn5nw7j3t1l1uicmmhhg70smzovcaalk5j35evc8aq6nc3htcrf78ltffep1qkh9wol5ftl0lfxvjrwhmcni4ad1qql9ndahi9tvfr2upogvebil16f8kwy6nx7x4nw5v1yva136umepmbtdwt03bb8s8mgt1r16d3hu3uyfeqv5q2wnqyp2dy9ewp5bbnd7yeb1',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: '2cz3i6egwygxcs2baeq5p73zrxx7enzqtabsc9r5pya866wmkjdqnep5f5y8unftn9cijglp7dhf081r5198eh4j23q3vdqoi9gv0sf4qsme0gtx46s7f451alj4r3zi2msiaxixesjvcpjoumatw0c1g71gwel8goldinui5j51q846kdacaa8yv0cz1czotv6nuc7vktgalzb9atbjnjhlmvl78iukl1d3ym7m4cr864tfog8wm4loftulgpd',
                hasCustomFields: 'true',
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: 'ggieemes6xrw78bv3lwvx789igh42r1usm6139qlj9age3wg3wkxgf10j7y505w4grjokph532m456ao9sxejoh49os4jhb975c8szx20tv2mkkin7ucmxfmc8hi594105l4orsvf3bm93qincd0hf75rtr0bbdpp6o1qax1laz7i3jep58aj8anx93blya9e39wvznc0ybpdeay8jxgujmwauhvw3krk6omiuvnu3qypiooadfe1uy5r1d9ngh',
                hasCustomFields: true,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: 'ob50jt8xmv2ndufl68eqir8ovlad4w1i3ik73x3bicd7lzj0ph0r3ykwrnx5qhjwh6mxf0n1gk8hx7crd4124fsx3irv45y9owvl1yofg7s90u2xkyckapwqebxu2a9igbcclducjoxq569b5h8l111e2antzixlck9nyxrm4qwcrek5o8h0a0r88i0ufx6znix8meyw7pshedib7vloyfbveb0p68ahchitp5ziqqq9kbj6hf5erhijot43jcx',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a71b4b1a-c24a-4265-aff6-4385d19757fc'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '020def23-0414-45ca-bcc5-99f50e2082f3'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '020def23-0414-45ca-bcc5-99f50e2082f3'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/ea13582b-94d3-4265-b3c9-dbc8d0e29a85')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/020def23-0414-45ca-bcc5-99f50e2082f3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '020def23-0414-45ca-bcc5-99f50e2082f3'));
    });

    test(`/REST:GET admin/resources`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ae17a2af-4cf8-4b3c-a6dd-dd505a143552',
                boundedContextId: '7955216b-f29f-4d71-9645-00c3cdd3bdfc',
                attachmentFamilyIds: [],
                name: 'pbu1vua0nvz4jhiiz84xnizpqu8wk1xkim5a4s7bpq41d29xgmx8cdaqtuovds0rbwgqhsh70np3vdt0cce74gxsr7ismwvbkhyq79h74htqgkorh8btyhd34tf8pwoycswjbipv7f5cjbxltp3ijv9eqs3qrjv03527nwxpiiuw1qq6toj1ha1byvi6ynulbxj5zpac7azmytpvulswu3u54mr4bkny2zxukqhu9mkxqkmxbo68uouph17u81e',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                attachmentFamilyIds: [],
                name: 's7fcx4d5mnduefvj3s0llsiw3rk9omhu1unkp4sg4ublst95icra0v8pp7nrcgnidfdvzxzdndddv61wdyy81tehguwrs63lv4duactiadejhaje9012rkhw8p6c76ryac7x5dctv8eg5lkd7al49i2nho3nwdia7fsfu5qhhjzu1scux55wjvjd2d3zq0nogqskts5cdzxbt5dcbo2wxyqpppgdk7sg0ym4wmn0gq3yi338m2vhonzb1za81rx',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '020def23-0414-45ca-bcc5-99f50e2082f3'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/c33ab126-f108-449d-b953-620399bf2ebf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/020def23-0414-45ca-bcc5-99f50e2082f3')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminCreateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '99dfcc14-2bb9-4a7d-a5e9-8b96a2ff41c3',
                        boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                        attachmentFamilyIds: [],
                        name: 'ahtu3sx6wacyd31ex32nbzgfh481t8csoq772klec31duciwwxfqv6xpw6bgb2qx9ev7746ops2de961x8n3mc76662fje4e0az2z9luzrpy6uzlmo6zvq74u3hibpe8r40oumh7fhzi62w2fp8qmbaapykyw5r5q58azi2jojcc85080yp4j2gnlqvd20jssa67649x2hse99k6e1hukmd5qjgrcqnz78zogfbgf7db9ynpvwjcr4e74xsbay6',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '99dfcc14-2bb9-4a7d-a5e9-8b96a2ff41c3');
            });
    });

    test(`/GraphQL adminPaginateResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: '01ab60dc-adb1-4a6f-b2cc-e554b9100413'
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

    test(`/GraphQL adminFindResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: '020def23-0414-45ca-bcc5-99f50e2082f3'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('020def23-0414-45ca-bcc5-99f50e2082f3');
            });
    });

    test(`/GraphQL adminFindResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '43a6006b-dc94-45ed-b139-bc332e0988ab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '020def23-0414-45ca-bcc5-99f50e2082f3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('020def23-0414-45ca-bcc5-99f50e2082f3');
            });
    });

    test(`/GraphQL adminGetResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetResources (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetResources.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6d8f681b-3273-4091-80e3-323489c1b1a3',
                        boundedContextId: 'b8248399-a3f8-455e-addb-cb895dbe0106',
                        attachmentFamilyIds: [],
                        name: '3cskczrynvr0puvqcpgeg0jjfm92uly1ia1bqpugieswwibvu8um1so35qfhhsnzvpu2lqaipsspal51ms3d4lagpfjg2gxqxv12kdoxqr8tje7xcxyf3dj9szy2yf145psbwtxu08wwm8ciu8muxkwgp9beeujgawdiqesqxj8t56j9jy03ixquaw75eqkqimb6kqms6idadyisd1daxxthec6x205p62tro6xzgqetncj2g0w76ab4pqitm13',
                        hasCustomFields: false,
                        hasAttachments: true,
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

    test(`/GraphQL adminUpdateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '020def23-0414-45ca-bcc5-99f50e2082f3',
                        boundedContextId: '61ea28d3-626d-4129-8cfc-8b28da4e0126',
                        attachmentFamilyIds: [],
                        name: '4kir3hrgzu0lcklkcmpq48p2rrobk00wsr25s7si5dd0ht6bskpiz2dgfbbjdhprtdmr9kdvukvo0lwfrl8h1f46wv4pk34vyqovup26uqhvvi9v1w5vuevi1mkqyve8qmoebac2fv5wf2f2opoa8s50khrlx4mf33peevzlexo9pp7nyhfqbmc73i5ffmvxgaikxyg8kfwfg8dv52svfc8nl0uw5tqtkecb686ogsuvf66im5gpfiuwpmz8n81',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('020def23-0414-45ca-bcc5-99f50e2082f3');
            });
    });

    test(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '56d546c9-01c4-473d-a8bf-27ea254fa0f4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '020def23-0414-45ca-bcc5-99f50e2082f3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('020def23-0414-45ca-bcc5-99f50e2082f3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});