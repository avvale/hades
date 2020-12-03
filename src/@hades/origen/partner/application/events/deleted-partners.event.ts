import { DeletedPartnerEvent } from './deleted-partner.event';

export class DeletedPartnersEvent
{
    constructor(
        public readonly partners: DeletedPartnerEvent[],
    ) {}
}