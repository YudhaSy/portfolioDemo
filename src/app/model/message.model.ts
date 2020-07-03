import {Deserializable} from "./deserializable.model";

export class Message implements Deserializable {
  public message: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
