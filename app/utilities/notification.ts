export class Notification{
  constructor(
    public message: string,
    public tags: Array<string>
  ){}

  static message(msg: string){
    return new Notification(msg,[]);
  }
}
