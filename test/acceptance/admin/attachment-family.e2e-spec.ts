import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

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
                name: 'ruvibqro4341ovfuftpeqxag07w24sducmtio62lpee2lywil5mjm1hxnemfw76iyudvxcohg1ows4kwfixy8jctxr6gmsj0h76s6mdwcj9uf62vplvrz28vvf4e2bcrkbgui84wm7zqxhb5ct2bhwila4wfvnt3dk5qf07rn0mcm3w2avaj0dcxoe914l6esjo4rwv7hkkvj13ctpzb9zg71ctkk6g875kjk61m1uyxrl8527l441qhlr5vmdb',
                resourceIds: [],
                width: 533351,
                height: 560109,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 26,
                format: 'vvi9mce9m2',
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
                
                name: 'iv27ak3dqonpnk5sk5fpp94ldtrxjvdoe2e7riew3vi1y3svjynm8xlefqyfib2ejhta4vb9winakw02gsbj2pp46rvww301u9oc2mf0c3gk7pk12pg7k9ka42ofkwlnzb4f9mzd1dj0pn2amtfqhhw3d2cb3duq7osgr58zug6h8ap4ardhcabfrz54g8o2im4hhouujiif4x2oji3o502l7wlfvrs4lv715z6a2vz2xypz52394e3tx8ntoth',
                resourceIds: [],
                width: 650721,
                height: 998559,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 47,
                format: '48v6e0uwwm',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: null,
                resourceIds: [],
                width: 199389,
                height: 386391,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 89,
                format: 'czhb5duvqc',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                
                resourceIds: [],
                width: 593111,
                height: 542862,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 68,
                format: 'nc8qkcoy10',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: 'pqj7rj4psd673by8ck2fgdarhbxivlsr2q3oopw8msl4xpfxoryzh33yf7bnurssx7owly4pamxid6f816d316an43njyt3jdi9jd2iayoiqm2cmcixj5r1eehgwdxckq2a027r9nhnwl2vpi6cqyxqu4ipujqt418lk1oe9jrvhfeulxzve4k22szc6dhmqp6b00r2w7wjczsbialo4b6qnavtmebn4lrd9x2g59t9mx6v61y5g1433w1vfbbw',
                resourceIds: [],
                width: 829208,
                height: 755792,
                fit: null,
                sizes: { "foo" : "bar" },
                quality: 81,
                format: 'ta1y9oy5d0',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: 'r90c5wimex6re173a1kl467ifpssen9hu440e18b5xc0bsp662rntg4d6fye582jx7ynfgcg4wg3fbhzx1let8xbrkiyaa1ee50c1zjdwckwy280mop5expxkmdyga106vi1wc7l11o5z5j8qrv4q6tcmlg05nv62b0tftfsnqzuiepiqgrf3nayfy96kmsy4ywcuyqd9b2mesel6327x18fi3h8hstu7a8fxler55qfnggdupbwitgw1yr3gno',
                resourceIds: [],
                width: 722562,
                height: 396182,
                
                sizes: { "foo" : "bar" },
                quality: 53,
                format: 'o69ft6tyaa',
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
                id: 'pwwwelf83c02quhlgdm6up43c5poeemvvyv2k',
                name: 'xvz3p81uv6igkwyw72e47kl5gneje384tbenlk4zaxiiiwcmkyl1er6jbc52pc6s062djmz8142vvlji328fijr519khptzht5cjtvwxvnnbfb8t0t5y7cu4jnq8cmx5w6c2rmtpk1pd66p2vze06lwicyyfbunuhh6g1b82isznqdy6ijqxai16u3y2azxmdli2qui9uhc70qd43m1clx4guf59dvlm996yoggqico91unwlvx7jcsdeioj171',
                resourceIds: [],
                width: 732245,
                height: 634549,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 20,
                format: 'q3ifuf9p34',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: 'zh3fu27cnur5y3dypzaqp88np3jmeg8wr28bl351b1xa58z3fbf9vsyruw5nsctn9f2cuo7p264wdh6td729p770o8c5uzhkxh4r6wt44gcv25lp2z9q0xfx88454dwt0yuuuam1rxhonh4a3f4ocakl4pv4o207tf0wrbda6g43661ghabncim9lbusihzp7r7qjkxrf2hipvimq21v6e12j2ny3zii8kxmuk8unoy9nfvya9xezb1d3jxonhfi',
                resourceIds: [],
                width: 600026,
                height: 226137,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 45,
                format: 'j3dd7gma80',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: 'sou1054nhupzvy4iw94210ow3ltw3c1d9omqmspthbq1ie04qhjrzm6powmc9xxbw2ihj7qxrsprgoc8zwc7ikhmaamdjgrdsujfp0j9feu5eyaeea5pkivj6a52q3z6nztbz55zhpakg60zy62rznxrdol7xgx6fqclqslqdmz0gu5ju5g1d3b90ytiwgmvk5cpmk99tt6qreegvlavb7mcmx8walwwuyagyc21ad6jhihaif6j5m7gkiiufk0',
                resourceIds: [],
                width: 9104825,
                height: 341591,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 41,
                format: 'sg6lnptw0o',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: '7zode3u520bn00aalp4gw44hh7ft054vw9gcdt2zc9uom4a1u40rtf2e2he4txezcuevpjmxws2fqrbptnr5izorrmep2y7vgap4qw5vrdn4egvw89pjxaghar8jq55s9m9wrqdfph5bfk9q8g8ux38l8hq6zcfbek43ob4ojzzgn7sz3c5ucqnrb1u8y05adbejw44a8p2asd0wzzw3pmkucwopqet0xrd9d6491tbaqhw3myyblyk87msb6w6',
                resourceIds: [],
                width: 719848,
                height: 6553385,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 78,
                format: 'amspi3r1l5',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: '289sdykc2lwpxvrm5mbjtnlc3joexpt1xhlrigad1pyf9xo9edayg0q29yjh9jm55d7pk70m1nzhjhdelip02u74fp4yvmbviqtjn82g18u5etea3fs2kjd1vebmqlgk2mg5b0kggzule0phn84wnfo37ruf04sa269dx22yl40fv5ktwlme2gtxbw7nzi0hgcz46ltmt77kjhkmp7a2kz1o41wx888i8i75be4ny5ag4rn3590cmz0k4moysio',
                resourceIds: [],
                width: 619083,
                height: 568722,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 397,
                format: '7eb01ievww',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: '3ehnxp6323qpvmpqxyb9q3pakl61n2tgfdyx1wbo0uevlhj1i3rozi7er09cvg1e0ssexi9b3v7aq5mo8qvzu8t0ufa15e7upru1icx65pkjlsye6c6e7vm1rt9qvnrykcunksipnqyawexh918tpdbxfj5cruymdel9gl628ygnk47p02lqzdvbwxfz75ibrhvt556blaizvqc7pz3y18rt8ss5y92ksv3ygwogzkib87fg2tpulbd2k6qrdrr',
                resourceIds: [],
                width: 494221,
                height: 663224,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 17,
                format: 'sd57u7tm0om',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: 'kxoe0w8ndyins6p4m61aulnw8zs7hzuutxrtwjrzffs5gshnr5jkruypxx80ltpjjrxb5iv9wf3m010ldton32r79u4uf97n8evjywjtjgaz39lt5h9t5amtm7ei8fv1pbdbrak5yfihgn1tn0k3ykn9vy1a11t7ummdewwm9gcz00c626rqtudmzmpnkpvheghcej7rtmcaf2fpniiam2hgs3je30xdlx1jqlfmsh0cwgnsz4is5z8iyjqo04s',
                resourceIds: [],
                width: 277123,
                height: 555106,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: -9,
                format: 'c246z6p3u8',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: 'u91et5lavmlhdfomsm15gtzqstckaoucoze238vkadqohishd6dtqmrx2cxwepb1brvlj13u0wnv9l0ckwni446yhog3i6mqx7vik3b9qr6idy66orlrvdx27yikcz86d5kfgjrtx3smyrryr5xrpvmvwtrp1lnsduda1sb5kiwheyuvllkvjvi56b9jt3u6jz266xxd0xatd9d8h13m18ea1arxnwi9m8u8gimxkiz76poyh6f12dicjzo61eq',
                resourceIds: [],
                width: 422539,
                height: 515341,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 74,
                format: 'j1k96p36kx',
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
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: 'ieyvgb8ewrtwsrwnd2knfn00t7jozgzh8cwsixomwqgc9cjmkigo3x3iocg1to000gb8os5luie2z0lzxtyahhhziv6qnjvoxi2732vkjbjtpl0qh7hqtn4i2vum4grgorabvom8dbfu81unytwzrbmcschrp1nsaa7k5ohvrkjad83vcdb58af2vuzg71xp560lifyos484mkynylxg1sjzf3h2wpdb7301sc36df9gekinwuke11c8erl01tn',
                resourceIds: [],
                width: 712992,
                height: 507310,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 61,
                format: 'v97lxnowct',
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
                        id: '927a0eba-de36-41b5-ba0c-92a7e81514aa'
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
                        id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3b39d98e-79c0-4620-982f-e64b9bb0b32e'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/b6ae0dab-7584-45ee-ac23-5b3f7f82f831')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/3b39d98e-79c0-4620-982f-e64b9bb0b32e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3b39d98e-79c0-4620-982f-e64b9bb0b32e'));
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
                
                id: '442efa14-fd3e-4ae2-8253-1e2a1c35b126',
                name: '4wik1xwj8b7hkl7o32htpyp0dnpymvyfd826mi9wdw3kh0x4unhcqpx56qmdcv11n8cxctzirbaep9rbzxrnf254hhp51hvz4gujydtgy3nmv3x42at0iv9nupkurs61bn6piwzrmbjfwc5vfuk0ru7cp0xdmze0zpat4we3o7h2ca9f2o08hlejjuzm376xn4ekvkrqsd7j484wfasra6xjsjq4hwdmhhiq9c0ydi1jm27bwly6r0aenjbe8zt',
                resourceIds: [],
                width: 845875,
                height: 850276,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 99,
                format: 'f5vu6b0d77',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                name: '1yvw2gc1bppx847j6pxg3vvpt8z1egltp7xjlccrogt1r246xrjrmj0si4xck0l3uusgsvnw8pq985g78384r12jhav5vckm4ir0xkwc4dsznpex2w3662ufv5d2xko8y9bbjmjclaas5dgrrr598p274bd86hwmou1zv87yj7mo0bz9vm0k879o6nkm5y38f2d0dryg2bmshhb6xjvdpjnzm76hnxzby6by6zg5jypstbvevgimc5nlgzxd980',
                resourceIds: [],
                width: 651345,
                height: 844821,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 53,
                format: 'ffnqq87ehf',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3b39d98e-79c0-4620-982f-e64b9bb0b32e'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/dcd87562-52d2-4fa9-9f19-bc5d905225d0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/3b39d98e-79c0-4620-982f-e64b9bb0b32e')
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
                        id: '53051597-e17e-4584-856f-5a4036cd67f8',
                        name: 'l6feqg4wt1fch73l327vtbvh3wnum7fe9b2raa0bacg9u09loxuy9acu9hn1ylw7g4w37oil6keyvmhm6pztlap42xjo57ib1n2xfyl5krwgn1dh7sox7o4m3w942qhe3j8oyxp72hi20ds2163dykbz5yhafjag0ifzitptlpqdr9133lvkzy7g1b10st19bvz0v969r2ox0q5fqo59ano3db4aznnybh6bqo6u75n1ite7x8apj93v7xolltu',
                        resourceIds: [],
                        width: 962970,
                        height: 164679,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 24,
                        format: '4sq40kyaf3',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '53051597-e17e-4584-856f-5a4036cd67f8');
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
                            id: '1fbefd8d-cd0f-4bba-aa1d-173e7ff76c20'
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
                            id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('3b39d98e-79c0-4620-982f-e64b9bb0b32e');
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
                    id: '54eed7e8-7061-469d-8eb0-2565b6d9c1b7'
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
                    id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('3b39d98e-79c0-4620-982f-e64b9bb0b32e');
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
                        
                        id: '75b974c3-950b-4a0b-85ad-0984926f6afc',
                        name: 'bk3euwk9zb6sep0o8cr8lq5wgp8mf3jrk3a04kxpahb4dohhfgwxj217a5kdvoaqusw9pz6cqz1ghcghkk2clyd9rdl7zeyry4zbneh65h4r8oatmv39nxec30yorzqi6ecr6mz2jvealllu6xickbjg6a3izmujaqccqws11ejuifput9doqnxk8sqcl2mnvoh8yh6ppc89mrtgr7saqebutgr9ptf2he14yunw1lw6rtxt1bwakf40noayufu',
                        resourceIds: [],
                        width: 981908,
                        height: 106001,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 38,
                        format: 'pfgtvkjskx',
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
                        
                        id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e',
                        name: 'g7zn8k1knoiv3ee6uk98sj9v6ebgghoge7dfoh8zc5kv61tcqwwud1t3infgtnsrlyuc3c20r3bkj1zq188tbi9xdduoq41qzf6zcvssaioegoujzqs1n62p913nxwmjl45c93p5987twb0yndf6kldh3f8p2c5uv0qvtwo4jmcbtqkhqumfwhw1f2eq94sqpvefci3e7faytdf1og6e22hwuxe2w42eodairn4tvg0pdupca570uhjgne8b88z',
                        resourceIds: [],
                        width: 131266,
                        height: 549765,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 73,
                        format: '2wb83907yl',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('3b39d98e-79c0-4620-982f-e64b9bb0b32e');
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
                    id: '20303dca-3083-4f68-b391-bee32422d0f5'
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
                    id: '3b39d98e-79c0-4620-982f-e64b9bb0b32e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('3b39d98e-79c0-4620-982f-e64b9bb0b32e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});