import { ISpecificationRepository } from "@/modules/cars/repositories";
import { BadRequestError } from "@/shared/helpers";

interface IRequest {
    name: string;
    description: string;
}

export class CreateSpecificationUseCase {
    constructor(
        private readonly specificationRepository: ISpecificationRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new BadRequestError(`Specification ${name} already exists`);
        }

        await this.specificationRepository.create({ name, description });
    }
}
