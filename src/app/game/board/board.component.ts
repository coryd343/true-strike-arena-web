import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { BoardSpaceComponent } from './board-space/board-space.component';
import { Terrain, Occupant, Structure } from 'src/app/shared/model/enum';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {

    private rowChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    private terrainArray = [
        1, 1, 1, 2, 1, 2, 1, 1, 1,
        1, 2, 2, 2, 1, 2, 0, 2, 1,
        1, 0, 0, 0, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 2, 0, 1,
        1, 0, 3, 0, 2, 1, 2, 0, 1, //center
        1, 0, 0, 0, 1, 1, 2, 0, 1,
        1, 0, 0, 0, 1, 0, 0, 0, 1,
        1, 2, 2, 2, 1, 2, 0, 2, 1,
        1, 1, 1, 2, 1, 2, 1, 1, 1
    ];
    board: BoardSpaceComponent[][];
    @ViewChildren(BoardSpaceComponent) board2: QueryList<BoardSpaceComponent>

    constructor() { }

    ngOnInit() {
        this.board = [];
        this.createBoard();
    }

    ngAfterViewInit() {
        var spaces = this.board2.toArray();
        for (var i = 0; i < spaces.length; i++) {
            let idString = this.rowChar[Math.floor(i / 9)] + String(i % 9);
            spaces[i].id = idString;
        }
        this.buildMap(this.terrainArray);
        spaces[2].setStructure(Structure.Village);
        spaces[4].setStructure(Structure.Village);
        spaces[6].setStructure(Structure.Village);
        spaces[2].setOccupant(Occupant.Crows);
        spaces[4].setOccupant(Occupant.Crows);
        spaces[6].setOccupant(Occupant.Crows);

        spaces[74].setStructure(Structure.Village);
        spaces[76].setStructure(Structure.Village);
        spaces[78].setStructure(Structure.Village);
        spaces[74].setOccupant(Occupant.Brutes);
        spaces[76].setOccupant(Occupant.Brutes);
        spaces[78].setOccupant(Occupant.Brutes);

        spaces[37].setStructure(Structure.Shrine);
        spaces[39].setStructure(Structure.Shrine);
        spaces[43].setStructure(Structure.Shrine);
    }

    private createBoard() {
        for (var i = 0; i < 9; i++) {
            this.createRow(i);
        }
    }

    private createRow(row: number) {
        this.board[row] = [];
        for (var i = 0; i < 9; i++) {
            this.board[row][i] = new BoardSpaceComponent();
        }
    }

    private generateSpaceId(row: number, col: number): string {
        let id = this.rowChar[row] + String(col);
        return id;
    }

    private buildMap(mapArray: number[]) {
        var spaces = this.board2.toArray();
        for (var i = 0; i < mapArray.length; i++) {
            switch (mapArray[i]) {
                case 1:
                    spaces[i].setTerrain(Terrain.road);
                    break;
                case 2:
                    spaces[i].setTerrain(Terrain.mountain);
                    break;
                case 3:
                    spaces[i].setTerrain(Terrain.water);
                    break;
                default:
                    spaces[i].setTerrain(Terrain.grass);
            }
        }
    }

}
