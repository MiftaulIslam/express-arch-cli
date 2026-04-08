export class CreateSampleCommand {
  public constructor(
    public readonly name: string,
    public readonly description?: string
  ) {}
}

export class CreateSampleCommandHandler {
  public async execute(_command: CreateSampleCommand): Promise<void> {
    // CQRS write path placeholder
  }
}
