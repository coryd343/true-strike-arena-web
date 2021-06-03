import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TerrainType, FactionType, StructureType, OccupantType } from 'src/app/shared/model/enum';
import { OccupantModel } from 'src/app/shared/model/occupant.model';
import { HeroModel } from 'src/app/shared/model/hero.model';
import { Guid } from 'guid-typescript';

@Component({
    selector: 'board-space',
    templateUrl: './board-space.component.html',
    styleUrls: ['./board-space.component.scss']
})
export class BoardSpaceComponent implements OnInit, AfterViewInit {

    private isLoaded = false;
    public id: string;
    public row: number;
    public col: number;
    public isSelected = false;
    @ViewChild("terrain") terrainView: ElementRef;
    @ViewChild("structure") structureView: ElementRef;
    @ViewChild("occupant") occupantView: ElementRef;
    @Input() public terrain: TerrainType;
    @Input() public structure: StructureType;
    @Input() public occupants: OccupantModel[] = [];
    terrainId: string;
    structureId: string;
    occupantId: string;

    constructor() {
    }

    ngOnInit() {
        this.terrainId = this.genGuid().toString();
        this.structureId = this.genGuid().toString();
        this.occupantId = this.genGuid().toString();
    }

    ngAfterViewInit() {
        this.isLoaded = true;
    }

    private genGuid(): Guid {
        return Guid.create();
    }

    public setTerrain(terrain: TerrainType) {
        this.terrain = terrain;
        this.terrainView.nativeElement.classList.add(terrain);
    }

    public addHero(hero: HeroModel) {
        this.occupants.push(hero);
        this.occupantView.nativeElement.classList.add(hero.faction);
    }

    public removeOccupant(id: Guid) {
        for (let i = 0; i < this.occupants.length; i++) {
            if (this.occupants[i].id.equals(id)) {
                this.occupants.splice(i, 1);
            }
        }
    }

    public clearOccupants() {
        this.occupants = [];
        this.occupantView.nativeElement.className = "";
    }

    public setStructure(structure: StructureType) {
        this.structure = structure;
        this.structureView.nativeElement.classList.add(structure);
    }

    public selectSpace() {
        this.isSelected = !this.isSelected;
        this.occupants.forEach(o => {
            o.toggleSelected();
        })
        this.isSelected ?
            this.occupantView.nativeElement.classList.add("selected")
            : this.occupantView.nativeElement.classList.remove("selected");
    }

}
