import { OccupantType } from './enum';
import { Guid } from 'guid-typescript';


export class OccupantModel {
    private _id: Guid;
    private _occupantType: OccupantType;
    private _isSelected: boolean;

    public constructor(type: OccupantType) {
        this._id = Guid.create();
        this._isSelected = false;
        this._occupantType = type;
    }

    public get id() {
        return this._id;
    }

    public set isSelected(isSelected: boolean) {
        this._isSelected = isSelected;
    }

    public get isSelected() {
        return this._isSelected;
    }

    public toggleSelected() {
        this.isSelected = !this.isSelected;
        console.log(`@@@Occupant ${this._id.toString()} is ${this._isSelected ? '' : 'not'} selected!`);
    }
}