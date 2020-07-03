import {Deserializable} from "./deserializable.model";
import {ContentData} from "./content-data.model";

export class Content implements Deserializable {
  public id: string;
  public isCollapsed: boolean;
  public isAnimated: boolean;
  public isFormContent: boolean;
  public menuItem: string;
  public dataItems: ContentData[];

  public deserialize(input: any): this {
    Object.assign(this, input);
    this.dataItems = input.dataItems.map(data => new ContentData().deserialize(data));
    return this;
  }
}
