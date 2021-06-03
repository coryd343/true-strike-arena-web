import { Guid } from "guid-typescript";
import { FactionType, HeroLevel, OccupantType } from "./enum";
import { OccupantModel } from "./occupant.model";

export class HeroModel extends OccupantModel {
    private _faction: FactionType;
    private _level: HeroLevel;

    constructor(faction: FactionType, level: HeroLevel = HeroLevel.Level1) {
        super(OccupantType.Hero);
        this._faction = faction;
        this._level = level;
    }

    public setLevel(level: HeroLevel) {
        this._level = level;
    }

    public get level() {
        return this._level;
    }

    public get faction() {
        return this._faction;
    }

}