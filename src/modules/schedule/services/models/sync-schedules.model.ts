export class SyncSchedulesModel {
  constructor(
    public emailProvider: string,
    public emailBenefit: string,
    public dateTime: string,
    public link: string,
    public status: string,
    public cod: string,
  ) {}
}
