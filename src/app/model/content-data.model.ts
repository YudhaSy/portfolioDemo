import {Deserializable} from "./deserializable.model";
import {Message} from "./message.model";
import {ErrorMessage} from "./error-message.model";
import {DataItemType} from "../service/content/content.service";

export class ContentData implements Deserializable {
  public type: DataItemType;
  public controlName?: string;
  public title?: string;
  public message?: Message;
  public dataMessages?: Message[];
  public errorMessage?: ErrorMessage;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.dataMessages = input.dataMessages?.map(data => new Message().deserialize(data));
    return this;
  }
}
