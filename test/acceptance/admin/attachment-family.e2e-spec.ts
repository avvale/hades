import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('attachment-family', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentFamilyRepository;

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
            .overrideProvider(IAttachmentFamilyRepository)
            .useClass(MockAttachmentFamilyRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment-family - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'ne0mhe2asbj41gzjmytejrdxxtycd4ffdbrxz1452cilrofhtq54os0f9o5j6exoku6xmhxv23jl4ks586ac5go2d8o7ev6bplw0yx011r9h2lk2tpwf2ikglbl39iae4r8x4y0blh2lkjpi1dy641p325hqp1nqaxyotdoowdowp7slllo11791myivol10dpmdobnj5xv4o5zyf2iehpcs70ppkh1m7zpaezdj5m728rmqx1gcpy51umd6yp0',
                resourceIds: [],
                width: 602184,
                height: 523647,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 26,
                format: 'z3k98dh8rf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                name: 'xyhyattjkrta9z4b3n7h2z52sam4r2o44ogt91ainmcup2wg6krktppowtgzhn7gaxnc6vwbltp6zqwmv3gnn8huek0efbxkms45qf8h0op5hcz4qtsv016kmvkrg80z43pu7csts55kbxauug9v5vaslq00g3yk1jndl61dxhl3qk0mkm8fdwvv860c9kvpsb4hf8uembog49ggdb46e2zkp7h5qk8u4vhmsnwfhau6zo0x86k09je175xk24i',
                resourceIds: [],
                width: 405969,
                height: 176030,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 95,
                format: 'cmuiyty7i4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: null,
                resourceIds: [],
                width: 949343,
                height: 924912,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 77,
                format: '3i308568o4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                
                resourceIds: [],
                width: 363385,
                height: 861666,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 65,
                format: 'd6yox44rkn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: '54szgs66u8kpo3b7up7jru55ga6qxjkrojnnqq1d8xxfwx2syq2ciy6fn9iovadvph6u2hg8n3jgegmg52cqz1c196yykvq3weielrj354if8qi2oatzc6kbhhtf4yi4u2s19di5aoj9p74cimurbnbg5l50507tmeu2ghtkmxhs04scp2lyo3zapiskn3zhyo3v9u26ei794m80e2cyu1ebvjbfo1dazv1a0hffigh9sopzjbcxl6egarnfg3q',
                resourceIds: [],
                width: 486314,
                height: 245473,
                fit: null,
                sizes: { "foo" : "bar" },
                quality: 45,
                format: 'rhhd7snsys',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: '8yxm9wmq6qwhiavdezeou625hxcj50phufqvidbu3hm9874fovzxx4wgdsjrs6pgdgrbdw6wx6beamaxbpm4aist9saqe1xw4o1npldnq3nrzn9cad3nxf7f7q4fi8t42b81c0tzf14ich9uv7wzutstrlo1uzh6u8f0y41qubkuc2chyh167qnuo7uz0jpjynhnxu8mpv9hkqshmkn7ynn119qr677au973vekdcoilsxf801w6h43oxmljvur',
                resourceIds: [],
                width: 369635,
                height: 205112,
                
                sizes: { "foo" : "bar" },
                quality: 22,
                format: '8kyceickhy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'tuyezbrzyi24wg80fdw39boygax3fyiub7mbt',
                name: 'subw3ren0nfa6kn5mdo95qzwx3ze2mr56snmakgm3yl7869gg7xv1i43t5kwbzvrwfamtb1rj0g7ermn4yyto8fq5kgxbtbi22x8zg06e4o1ae1jqhu4mrqp6yqj9tst2rfn696io76mrow9hev9zpkv7zpgivq7w39pmvsr6i3o26ntx19xxi1ps0l46xeofvwlnigv3ljk4xdxjp8ekz3772ljanceuo53g7ehxmkpbfd4tutl8ijgdv6a6bw',
                resourceIds: [],
                width: 688252,
                height: 714400,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 26,
                format: '62ljrrnvco',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: 'ewooch7l4dt9up6lxvox4cj0bfwm050y28ag8saumwpmtmwp7dydkzka0jjhx1vsw1ehn6k3xkz63vwk7spuc7taesu0g80ab12knnb99aj7w5hsdbr8h9qiiwo3oagxjpwfmrkcokucpofgqp52gofmjyidpy1y2szjz75rwtkcg1xs4q3lfvrv1xazebub56oqpz9b6pf5t17hy4td7kmztwyw9ki9zvhdwu0ibz4m0c9g4gxsqvk6fyyuzqlv',
                resourceIds: [],
                width: 372984,
                height: 802081,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 44,
                format: 'pzpukktxhj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: 'aqg2lsww42fcifgfakwwy133gj0iuep9tk0esdkhl2a3ag2f8ipxrtv1b07mkkc26t36b9bkmcnburxbdlgjot0ism0e0lh4td9veg52crks2ubd8v28nqi9irj2spif93itp4em9dsoo11sp4cgn6af7vi1qnmeftsfgwyvul2w19cmgpw4tc2xaft8r08zkyi1kvgyktw1yz5yqtz9afut7t9tsopckgppqzbo88r1urgsa3imr6h941y14u6',
                resourceIds: [],
                width: 5321568,
                height: 307202,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 90,
                format: 'dui7af60nd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: 'b0vrc9nh6b260tyj0ihmtdlrfrocx0eli3kl45jwldnb9mnv6o6j60omyhfony3bgebo8g1gty4ufepf3a8lagc6pog26g9b5fx45r7c3pi4xs91czu0uovqrdbz01zmibrmcbf15s5qyyyhv4d3mg5sce0u5uomz7l39hkn379rh0c44sueulkqgso0wk92cfemuiq8t2b9pokizefcgrfnh73haxto0x25bqiyhe4bmys1sxzyg5eg8utdguv',
                resourceIds: [],
                width: 704709,
                height: 7489012,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 18,
                format: 'qwv1kouwhq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: 'hllfrx7tdcyx2j521foz9ib186p8hetye7y9as44zz9w5sivv9hoo0jj75fuhvofctv7wx7bayifkpw3vwb2m0t60glg51vwlob6pn3uuoirtd9j1txif93h2z2o50u5za817himdsrgr8t7g8166azq2hf29ayu2st0jiogoz7tssop9mrim3au2ahrnk8yud8e5i6gp9xguuaqc40y7o9ojhz3btgjy57kde9pnfhyhtj72fiile0rtjdubsc',
                resourceIds: [],
                width: 405780,
                height: 534304,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 610,
                format: '1kzix5z0f6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 2');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: '09i2lg143a5plzf521pgx0ulr4u51dfwvutwbm67sw53sw4da48riopqqe22eqmslca7ghv0f0dvk7csh7k57gmizciwsjjmqx1f36r9pqkwouuoh34liu79jw5vsob81yomlx950to76xr6l0cr3e89vx788wyemj5kq5cvey0fwaxfk94ijz3eenoo4gft15551wd7e5r1jsozj6zufvpasquqtjxv7jv0t3q6imbso3eojnnkis6prl6ptg1',
                resourceIds: [],
                width: 904192,
                height: 290087,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 66,
                format: 'yp8h1hby13k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: 'xlqimv52ggrvwifrvbgbeokn2j4nmtg7cud7b0bgnvu027a86l93n2tkqg0rk8rkbxjovshd0wgfhq0nh3b0shefvktzfbx545tnd8o0y4jtnsacj69likiel91jtajm0q517q3ws1lin9pq6jic7zqpsb2liipif7zmxgm80otzx92sbk8wu8wetya5zvkxvp9zgoviwx3jos9nv5bnqw16qp3bg4nqbb0jm8b4bcrqkrwojtkima0qrax84s2',
                resourceIds: [],
                width: 119560,
                height: 214319,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: -9,
                format: 'jg1ycs5cpo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentFamilyQuality must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: 'je6w2awk38ijatn3t2w0sm0nie6b63ddw8k1l81aeu8s51n9ct095yxx2swdph0zpqrr9l3hohfkta5qx94nolonrigcivdec16kmg6f7jqtwb9sxu10dsinkpfbl59cc5eyxfx2kle3e15p75vfw17j6v6o5s0vz1a4wskazcc5elvddrk60yg363sm5qexbpz5ey8j0u8x1621oh7luqstn0883hvbzv1cfjfdtvfhwvb9o7txi6ypjet2rz1',
                resourceIds: [],
                width: 242590,
                height: 248249,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 98,
                format: 'c4y7w84rws',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: 'i0un5qg3kjaoxtkurmtyguhxpgckhplxqowh00345nk3kl7772wcvqspre1m0bnva666ywrj7b36giaq0kfbrsaslm4irg61be8wk5toe0aqbja4qltxkbpf5j7ldjxsmssr8kzswpspk88vptkplj5p045v7ee8j97cbsfwzsf4x5dcyp3jq7bow8oiyn0nhq1eol9x11r0zma08ckj45ko366k12vs3ezj08mxzpbnoxnwprvuxumvt1xzyng',
                resourceIds: [],
                width: 379530,
                height: 509114,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 56,
                format: 'alykfw3c3d',
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-families/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families/paginate')
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

    test(`/REST:GET admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b9f8d765-a546-407d-88c6-7ee3838e2717'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bb7848a5-85f0-41f0-867d-21ae74e821b2'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/b48cbbd1-20b7-4a1c-bc7c-28224fde8aee')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/bb7848a5-85f0-41f0-867d-21ae74e821b2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bb7848a5-85f0-41f0-867d-21ae74e821b2'));
    });

    test(`/REST:GET admin/attachment-families`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: '2293a5ee-42d3-42cf-b8e3-92b3ef74d203',
                name: 'x5e22wrdepowxei1y9f9owe8xx0ejsankikhwwe4h9xethxd4lu3b3uf88gaju8svw9kemq638t813q1y8n8y6b4gp7tak9w3skgrccv2if1d8rf0t55ba7fj89valw7ba4z2lu7xfhfnxkk1sykqu8p8c5jch4o56p1witunxvvvvtlc846ytnmo04anjumeexpquwiyl39d7sjc8cle6rr09vxbzfme5bvvp5j5ug1b19kx02xvae7p1evdx4',
                resourceIds: [],
                width: 662405,
                height: 856335,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 79,
                format: 'lbm1tumt7t',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                name: 'sfgwiym8zqwakaggv8cgbxudz92g4ecswe3x4ykc9wmfsndz0zx1zlwpawlz8v9dfcian08nxmnmn7jjvaun8mgbk4urvwc96zvhc6f5e8j7aniw56ndbzb8d1baxoeg0ew9rlugkpcgam18m5pbt2viyxtnt1uvsgllao3kbbqizp5b2ypiop4fowecl5qac6hcrw4j0nsubyv02q0ore8bqenv6spryrpo2wni12n03pl1fq4fa06itdnsplk',
                resourceIds: [],
                width: 908290,
                height: 319597,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 69,
                format: '7s74hkewp2',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bb7848a5-85f0-41f0-867d-21ae74e821b2'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/de023809-c533-4586-9761-e6a64d976a8e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/bb7848a5-85f0-41f0-867d-21ae74e821b2')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentFamily - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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

    test(`/GraphQL adminCreateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4ef60777-dbc6-486d-8967-b6e9cf47b263',
                        name: 't00wvxl2n1kloy1ggm025dgfpzv8krtcaadoldcdugrju0e8wlygzadcag5jgbrpu5a2miwo19sdmb04oiwscsapp5hrb770a0opfjgkx8bnjwgglowwfc3ndps0vadxmqum0lb7vg7uqacx3o51aecen83vjmlem259vz4a4e9unfmjg1tjx05s51u1ap3yufcfflxgi0szavr6xzbb10vdcwzixng5cuvemsx52e8ry2gp1oo6vucb79i60wx',
                        resourceIds: [],
                        width: 684707,
                        height: 550788,
                        fit: 'HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 77,
                        format: '5uo1bt8yvl',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '4ef60777-dbc6-486d-8967-b6e9cf47b263');
            });
    });

    test(`/GraphQL adminPaginateAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentFamilies (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentFamilies.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: '04eea51c-96e5-45a7-bcd7-6846596c8103'
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

    test(`/GraphQL adminFindAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('bb7848a5-85f0-41f0-867d-21ae74e821b2');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd2553f8a-ecd5-4c74-8a3e-8fa3d31d1b42'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('bb7848a5-85f0-41f0-867d-21ae74e821b2');
            });
    });

    test(`/GraphQL adminGetAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentFamilies (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachmentFamilies.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd75dbcd9-5bde-4ca7-af97-095a61005e60',
                        name: '2zfia1aa6o8a6vodqbmt3tk9f96y5b8e6g7i8tadqyzu5lt1pdmz3n9h9vmx9q5usffslvgwhb7dt8fcbsququdwscuqwyzjscbin3c4d0fc6edwx4kobqtq7apr98w67d1lb9mt31r6ny2m9soxddk0ledphpq2cmeq4v26hf4tyonggq4365phigxafq09dlgsi9fpdhxk312bwhvhsuvkit869fbcehe4apqtfuokyfbuuesaxz508fu1hp5',
                        resourceIds: [],
                        width: 871114,
                        height: 662363,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 44,
                        format: 'f1hlsduzro',
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

    test(`/GraphQL adminUpdateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2',
                        name: 'b9ttnpjvdwznzew1rqhe4tp38p7t158k3lgwtrrgj4n0rumiuspu23h048kll58ltv0p48omkqt0v2a77ez8usg2giwtiunmgevbkqeoudqk1u0i46ik8b5zxt6bwuh5um18ijdvilm679mh8wuo8ddvrbdfvv4es0zea10njnk5xhfc94dnondet8uhems580w4ywbcl6phcwugwz79vfjihgc0ixxg272r5afn8nmtdpeku7avj4iire4uhhf',
                        resourceIds: [],
                        width: 398411,
                        height: 759325,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 53,
                        format: 'rgfiftbxo5',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('bb7848a5-85f0-41f0-867d-21ae74e821b2');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '09c37ba4-da57-4c90-818a-c3a0853ee19d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bb7848a5-85f0-41f0-867d-21ae74e821b2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('bb7848a5-85f0-41f0-867d-21ae74e821b2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});