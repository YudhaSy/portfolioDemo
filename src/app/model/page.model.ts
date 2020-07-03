import {Deserializable} from "./deserializable.model";
import {Content} from "./content.model";

export class Page implements Deserializable {
  public title: string;
  public copyright: string;
  public gitHubMessage: string;
  public gitHubUrl: string;
  public contents: Content[];

  public deserialize(input: any): this {
    Object.assign(this, input);
    this.contents = input.contents.map(data => new Content().deserialize(data));
    return this;
  }
}
