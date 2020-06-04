import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';

describe('Permission', () => 
{
    let app: INestApplication;
    let repository: MockLangRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            })
            .overrideProvider(ILangRepository)
            .useClass(MockLangRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockLangRepository>module.get<ILangRepository>(ILangRepository);

        await app.init();
    });

    it(`/REST:POST admin/lang - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    it(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '7be2504d-1a4a-47ff-924a-2c81404f77f5',
                name: 'XXXXX',
                image: 'XX',
                iso6392: 'xx',
                iso6393: 'xxx',
                ietf: 'xx-XX',
                sort: 1,
                isActive: false,
            })
            .expect(201);
    });

    it(`/REST:GET admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.WHERE,
                        column: 'id',
                        operator: Operator.EQUALS,
                        value: '1c8f7dcc-e150-49c9-9fcb-1db310ca6d90'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.WHERE,
                        column: 'id',
                        operator: Operator.EQUALS,
                        value: '94c893c1-3eb7-4f22-a878-b405c6d42e09'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '94c893c1-3eb7-4f22-a878-b405c6d42e09'));
    });

    it(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/ffdd5ef0-d622-402d-9e54-11628d81c1c7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/4470b5ab-9d57-4c9d-a68f-5bf8e32f543a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a'));
    });

    it(`/REST:GET admin/langs`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    afterAll(async () => 
    {
        await app.close();
    });
});