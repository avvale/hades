export class CreateSessionCommand 
{   
    constructor(
        public readonly id: string,
        public readonly ip: string,
        public readonly tagId: string,
        public readonly uid: string,
        public readonly counter: number,
        public readonly expiredAt: string,
        
    ) {}
}