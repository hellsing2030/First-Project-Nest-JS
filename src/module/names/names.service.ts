import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class NamesService {
  private _names: string[];

  constructor() {
    this._names = [];
  }

  createName(name: string) {
    const namesFound = this._names.find(
      (n) => n.toLowerCase().trim() == name.toLowerCase().trim(),
    );

    if (!namesFound) {
      this._names.push(name);
      return true;
    } else {
      return false;
    }
  }

  getName(start: string) {
    if (start) {
      return this._names.filter((n) =>
        n.toLowerCase().trim().startsWith(start.toLowerCase().trim()),
      );
    } else {
      return this._names;
    }
  }

  updateName(name: string, newName: string) {
    const indexNamesFound = this._names.findIndex(
      (n) => n.toLowerCase().trim() == name.toLowerCase().trim(),
    );
    const indexNewNamesFound = this._names.findIndex(
      (n) => n.toLowerCase().trim() == newName.toLowerCase().trim(),
    );

    if (indexNamesFound != -1 && indexNewNamesFound == -1) {
      this._names[indexNamesFound] = newName;
      return true;
    } else {
      return false;
    }
  }
  deleteName(name: string) {
    const deleleteBefore = this._names.length;
    this._names = this._names.filter(
      (n) => n.toLowerCase().trim() != name.toLowerCase().trim(),
    );
    const deleteAfther = this._names.length;

    return deleleteBefore != deleteAfther;
  }
  clearAllNames() {
    this._names = [];

    return true;
  }
}
