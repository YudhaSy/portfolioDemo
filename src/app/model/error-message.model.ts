import {Deserializable} from "./deserializable.model";

export class ErrorMessage implements Deserializable {
  public required?: string;
  public email?: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
