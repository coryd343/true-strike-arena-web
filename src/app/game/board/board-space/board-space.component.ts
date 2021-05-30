import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Terrain, Occupant, Structure } from 'src/app/shared/model/enum';
import { Guid } from 'guid-typescript';

@Component({
    selector: 'board-space',
    templateUrl: './board-space.component.html',
    styleUrls: ['./board-space.component.scss']
})
export class BoardSpaceComponent implements OnInit, AfterViewInit {

    private isLoaded = false;
    public id: string;
    @ViewChild("terrain") terrainView: ElementRef;
    @ViewChild("structure") structureView: ElementRef;
    @ViewChild("occupant") occupantView: ElementRef;
    @Input() public terrain: Terrain;
    @Input() public structure: Structure;
    @Input() public occupant: Occupant;
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

    public setTerrain(terrain: Terrain) {
        this.terrain = terrain;
        this.terrainView.nativeElement.classList.add(terrain);
    }

    public setOccupant(occupant: Occupant) {
        this.occupant = occupant;
        this.occupantView.nativeElement.classList.add(occupant);
    }

    public removeOccupant() {
        this.occupantView.nativeElement.className = "";
    }

    public setStructure(structure: Structure) {
        this.structure = structure;
        this.structureView.nativeElement.classList.add(structure);
    }

    private genGuid(): Guid {
        return Guid.create();
    }

}
