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
                name: 'tsz3cnuctjc8gp4svub8ct70rejqczfvwv4botag5vw1gbaiybwcwjowasdh72slygnd5btcq1863j4oyxcp1bxqcqdaay1d1bgth7gfla98bu1feqgvc13bidam71q3krtn1ie87zbn569hte1cmkku59vgy00w8psag0qe56a4tc29uzbku5zqm1v420qya3uw2bn69o2ns0szzy6bpy4nceiu673u5ghutwki6kuo6yvesnckrw0vqy0mv6l',
                resourceIds: [],
                width: 261763,
                height: 802402,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 19,
                format: 'kjezxjik6r',
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
                
                name: 'ww4wn7dui9gt9q1vota8iq58gsysi1i2851ybpyhcab9hz1r1x0ikyiao342jjbq5xinrgu2gxidpmb5w2imu8vj2oit12ffst9qtj04y00zz7bnigosocizf60ld5atyxb90ybq00xkpc01bzjth7ycjiqamksjd2mzzvvhvyrxb8wemva0ioa1e0urrem5t24jw5u8lr98gio4mwqsl8bss0cytbwje9o98wmbnvfmv8usb7obvowk9hoebvy',
                resourceIds: [],
                width: 706328,
                height: 286522,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 73,
                format: 'epxgwings1',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: null,
                resourceIds: [],
                width: 746557,
                height: 561408,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 60,
                format: 'na0pkjc2nw',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                
                resourceIds: [],
                width: 149364,
                height: 175091,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 65,
                format: '8g8kfn369u',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: '172k0xvak7dlsmh9zu8r007ppcltw51o2ehlfcmzosurpa5ryql4m5aai5bwwfxwqk5vcr9723hp6e3beowar6planl3zm9qitw8wqihw5nxngxzy10yvjtgow1ygnhfshnvzkuuh9k18po5gejqen71exodphfzk0g5mh6fnbm0j1z7q9stqoiwt0r0mkyjxisod90nwujk62tyh3qc0gx4sch42zg2ss9w0ycip8u2xek0b6dehal2qfaod3z',
                resourceIds: [],
                width: 436521,
                height: 206903,
                fit: null,
                sizes: { "foo" : "bar" },
                quality: 48,
                format: 'khhb8uzpbu',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: '7ri7d01mcqfyq4hvdedn1b0bdrcqf10i5ukjytn1va2e5eixtfah2uo65kiyj661y91wovgxhdwudfc0ofjqsdzmrtjpdk7ev11p2fgtknewvbwutelbc9dao8e1j2gqqvfx2qsudh8362nby0leo9ubmhjvxvlbudzt6hc9k843wksd8vbpxrdkncyc8dw97qsla2hvjmqa4k4y84qdtwk0slutr3swy3povpdbectsvb1517ix8mvuu9ko9de',
                resourceIds: [],
                width: 126779,
                height: 930605,
                
                sizes: { "foo" : "bar" },
                quality: 24,
                format: '8xgxgww8lw',
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
                id: 'krtpch0a0panuumdepbt1ua4l5j4ow7g4vi6o',
                name: 'yuzoumlskamvftpu9mg4o8iuhbes5s2kztgtt9c5gk1dxg1jbhnvbdhfj9bm8i4euczmfx915bja4cag4w7uwzwd2nten2w3u3nzy0fiktdj1lk0d8w5i0l5hc6fkgavbcij5i3modyzcjhqaaczaphz4niz8qi2qvl44289vkbxhs7yi32dr57kr43hqbi906mamal5iwcujkcrpvv4us86iqil5bxwa1b5im23p4209f7pr68wnbbdkj12cbq',
                resourceIds: [],
                width: 629290,
                height: 630007,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 44,
                format: 'l8vmmuagp3',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: 'ydynjbjkyzsariqdaqse71vr9voepk7ltfxtppg7n7c74rc7jg8jxl61tjb10lqw4ve9inzudyuhxnhjzuuth7xd1qaunuh2cqqhhqjg02dh9uv91y7l3bfq9hv47t081dan5nefqp8gadxhc9k8ouwhyax7vxli2wicvg8wmq1qa4wtpqh2j00iwsgohnmgmvx5t9w5cao5y7rxiluev2dgu22gsh8g50858pwxuqxnavycpot3wv8peb8io9sy',
                resourceIds: [],
                width: 696491,
                height: 983248,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 25,
                format: 'zt6cl9zma9',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: '963cfy9yamv5h37tzyd390ijd1kz7dgmxcwc255l8x0zqfqppqs3z4a9gr3iovncazrwp8g7zuapojy0i58sds12h7xitte5o5xz2i81fts3cfjf53xe38krhresgugmko9rqvd8f4hkqt1auj3hesrugt1onuzuzynq6dzhqwkc9m8s20qkgb5ehsl1ooa1vgbaxgh0tfkntq7arz5jdm2inl8aamln0exs40ynndqcgsi6c3cf5we5f1cr8sh',
                resourceIds: [],
                width: 5960600,
                height: 503627,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 84,
                format: 'nb52p66nhu',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: 'fwqyjxk2wytcx8hr4225qcynh47ncl2n4b8q9rlzobjtnvpk9vqc5uzzmjp133ez78pqy8agjwmxf5ha0hf58uljo0d0xwdlwiqqmigmatyc3lkiqkfyt574ozs3cox0hxercyc5k737zfvc0eixtvijhes4tro3bx4jrfpfat4c5kaawg9oct8mk3c49vks6jkm2t7xr9y1mflyfz0k7aawr4p9z75j2k9q8x7vsnhyxfp2t4hoe430rw1cv1j',
                resourceIds: [],
                width: 362426,
                height: 2941659,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 11,
                format: 'ridpyn0tm9',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: 'smg63otxfxbrlo5003rjx3v6ab31qit0h2uvhn8hyozwhbpgm2wo2uv3ufs2mmzh2e68nwwikeur4nl2lzf61iatt8sien8s4x1ynie9v21hvombwnt1lcc002fuhk2cq143reyvh2jc8l0vdi7fzbw5ywwt988u3uo4ve2qq7l7sm3w9z16ym8bnzm4intj1j8gqye2yudyu104x7ikaq23p7pov3ofq19ykbc2sbdhni9shm6znv6w1ce5xrs',
                resourceIds: [],
                width: 996645,
                height: 633803,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 237,
                format: 'qsgz9ixm01',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: '2w010g3g8xjr84lmc49t20leptiu4wn3h5b4uqzipuh9a5xou11k9km6c58uiy139m3nkj8bevda4ff5ygz40u6y4hkjho7ped0w2gu2kpfjtz2l65pv4h3wksfgzbtwmbwrx5l58mrgftzpni64dsz2e98czmwe6npznedpp1mszsa9dy80dlhu483q0hvjo211a588j9cmdwwrh4qcnzp3ln5fm2q8nw9yyurrsf7ru5r2sr8yz47i14qcb6d',
                resourceIds: [],
                width: 752650,
                height: 868726,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 60,
                format: 'r6ops5wp3wq',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: '3ipdj08udg5r9x1cyoxrw6zkwywtz7lg3602njyqw8v9c0p3ghqqgq5puxz2q1ck2vi5vvsbnpev666h4b06u788syvcjt5pcc6c1r33xi146mfoycy8g3onbxasf038vz1me5iq9dzwlme5u0yi7evdlc0uvqpkox96lj7hfe1yclxo5c7unzxbay0nv4klvha7f4kyyok98szq82wujpxkprfv7embx35w7vyrg839ex95kr9i2hqvdy3gcva',
                resourceIds: [],
                width: 765506,
                height: 238988,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: -9,
                format: '2yr73wtq7y',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: 's559ie6r7ix8a2r4zu15hmuoh7qrky37egftvfbhics3l0vozp7fc6uy3whoe8h8bgc49rzk2vl6j4cfx619zm9slb8yuaog9kjo5kk1u7mrb6lia2gx6hyb13vgp0vleukfk87ivsdj42djo3etorjh43xzbmvmxb759k7pfazavv4op5ox9d0e59u7ckujg6t0dl2vjqiem02i7gwqrcqs65ga0etbhao97t1g98eq6l4wlwawwoxkw2ug5rb',
                resourceIds: [],
                width: 463248,
                height: 638591,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 72,
                format: 'cparesj4mi',
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
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: 'cian587x2jtyb0ct96p022uywd32kf47wg0gwjdtnscd4l57qjf6yvqyfdjn6ibwyr83ts7jufp44gvtbp89glenfj76eseazog94gj5l3howfg7ga7c9k0kx3qi443msn2s1cskwic8nxv4pzy4c30lgam8itou8zm4t3cg49c2k8s8h9izjgcnh1de3f5c0ow5tjc2isqtg7mqawx2qv1hkwsl52ocacgi7dz8fltshbbb58r0d3i52z3z74j',
                resourceIds: [],
                width: 282790,
                height: 203568,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 66,
                format: 'e6cn5ll841',
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
                        id: '5f778554-ddf4-4657-a2d3-eda0a30a0bc5'
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
                        id: '502e1b77-553c-48b9-a394-ab3a920ea5eb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '502e1b77-553c-48b9-a394-ab3a920ea5eb'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/44f18b7c-204c-4c60-be1c-ae161c339670')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/502e1b77-553c-48b9-a394-ab3a920ea5eb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '502e1b77-553c-48b9-a394-ab3a920ea5eb'));
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
                
                id: '6d3cb4f5-2f01-4d9a-90f0-d6e3462d39bd',
                name: 'yrfmjc69efxpuruv6hh5t1nycqynbpqdb8zonipu991bmt90l1yt3tcmgdsvk4sgg5whf1toeobo911jefavuqvwumtwpwen9hpuzox9neuqduydhsd1s9bd3asrjtozpk0m66rwr01z9x0gfqyeb594u5f03n7c63zvylpelu6sgn9x8m3wj7xii9fpoucw1w3ftg53rrwa9ylco05ur6q8nrm9coplvsxk57d53x3er2tnik0yats6vum4yk0',
                resourceIds: [],
                width: 230349,
                height: 847947,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 95,
                format: '7a7exmtmtd',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                name: '2fl99iq1y78ppsts95avgsn8620mc0g3flbhoixypgmhbmkkymond43w9wlkaeb20jzdebg62ec4vxo2i7vrhlx9xzx0fr4a7glzkull7p7g7afcw91wsyt6jiq5gfg4r203f1chslvdxl02ztj46mbappvuijz21gz3wgs4s8pito8y43t5vk2lkj398afxyt04jjas9wti9ny69j22m6w17kd0drmy7ie4wmafu1hcn4l9vylk74iy86gv2mn',
                resourceIds: [],
                width: 532564,
                height: 343803,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 26,
                format: 'xugecz2gc2',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '502e1b77-553c-48b9-a394-ab3a920ea5eb'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/1f118e63-ba7b-4620-9fe7-a925b1cdb28f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/502e1b77-553c-48b9-a394-ab3a920ea5eb')
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
                        id: 'c9e1e069-096b-42dc-91c5-7f28a7810618',
                        name: 'x2af6e218y6a10spezx82mxrphpwukcrslrds03x7pb8vsfit21qy2c1whjifqv2frkw9q4wei3cszqm61mur0e7iv0zikkw2wppydpmbjxyu4374i3fmwewblcxuccamvlspye61ohhfmtne52247qf5g47pt60v7iho3txxlxc1tnzig8fsw76101133rncdmtos89b6eakjxv4gp56566tyec3wuarlupfqpvmv0j9alwc64zc7zoe0y3j8i',
                        resourceIds: [],
                        width: 329758,
                        height: 766353,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 27,
                        format: 'ksdks9f1d4',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', 'c9e1e069-096b-42dc-91c5-7f28a7810618');
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
                            id: 'db7dbf60-4719-45cc-8309-0200379bd305'
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
                            id: '502e1b77-553c-48b9-a394-ab3a920ea5eb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('502e1b77-553c-48b9-a394-ab3a920ea5eb');
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
                    id: '8447a27f-2d7b-407b-9413-68b51886e821'
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
                    id: '502e1b77-553c-48b9-a394-ab3a920ea5eb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('502e1b77-553c-48b9-a394-ab3a920ea5eb');
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
                        
                        id: '09e66ccb-b5b1-4c07-8a15-bd0347732486',
                        name: '85w8w6dmp2hec4ih4gzhi83ncbi2ht082i7nm3b566yxdsmeoyzyw8rcf78h4wv32z777oww7vtcgl1joxyfoarayyk7o6hyosd55irijrad2uwo6j1gflco2gpvzme4fc0qvp6jl9zbcg3ajvzx1dtxkwgt2nwzdtiuzaw8ymdtoknlvxt18ufqap8lqae3n9uqui9zxptpyr63zebh01celzlyw22xodr8q94y004ozj30e625wsmellob5nw',
                        resourceIds: [],
                        width: 458403,
                        height: 403685,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 16,
                        format: 'wdfvl0t8kd',
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
                        
                        id: '502e1b77-553c-48b9-a394-ab3a920ea5eb',
                        name: '9yg93gmcq5hqjl0fvdjpokyrskgemobi8c10uucb9yhu66wwstpz3lms3s5qryuc4kpbyljyf13jcixtmqci37rz9hxe6kzd03ao4j7duwy5e7rkpiesicfsqovfx3mnz7rznxshnmyd8urkklbd8zys3chivlgbqu1pyivvp3d4khs7zeui5cod1721w6crro6dqsgugzm8tulminz7es6x5bk8skiijzt5fqaw1sbhkxmuvos96c41k7u7rvf',
                        resourceIds: [],
                        width: 491334,
                        height: 163225,
                        fit: 'HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 48,
                        format: '84zblttew8',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('502e1b77-553c-48b9-a394-ab3a920ea5eb');
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
                    id: '2bcf88b2-76e8-42ca-8ef7-c2b1c2d98e36'
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
                    id: '502e1b77-553c-48b9-a394-ab3a920ea5eb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('502e1b77-553c-48b9-a394-ab3a920ea5eb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});