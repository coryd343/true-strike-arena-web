import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { BoardSpaceComponent } from './board-space/board-space.component';
import { TerrainType, FactionType, StructureType } from 'src/app/shared/model/enum';
import { HeroModel } from 'src/app/shared/model/hero.model';

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
        spaces[2].setStructure(StructureType.Village);
        spaces[4].setStructure(StructureType.Village);
        spaces[6].setStructure(StructureType.Village);
        spaces[2].addHero(new HeroModel(FactionType.Crows));
        spaces[4].addHero(new HeroModel(FactionType.Crows));
        spaces[6].addHero(new HeroModel(FactionType.Crows));

        spaces[74].setStructure(StructureType.Village);
        spaces[76].setStructure(StructureType.Village);
        spaces[78].setStructure(StructureType.Village);
        spaces[74].addHero(new HeroModel(FactionType.Brutes));
        spaces[76].addHero(new HeroModel(FactionType.Brutes));
        spaces[78].addHero(new HeroModel(FactionType.Brutes));

        spaces[37].setStructure(StructureType.Shrine);
        spaces[39].setStructure(StructureType.Shrine);
        spaces[43].setStructure(StructureType.Shrine);
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
                    spaces[i].setTerrain(TerrainType.road);
                    break;
                case 2:
                    spaces[i].setTerrain(TerrainType.mountain);
                    break;
                case 3:
                    spaces[i].setTerrain(TerrainType.water);
                    break;
                default:
                    spaces[i].setTerrain(TerrainType.grass);
            }
        }
    }

    public selectSpace(row: number, col: number) {
        let cellId = ((9 * row) + (col - 1)) + 1;
        console.log(`Selected space id: ${cellId}, (${row}, ${col})`);
        this.board2.toArray()[cellId].selectSpace();
    }

}
