import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * dialog component for genre info
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
      /**
   * @constructor sets dependencies
   * @param data - specific genre info, received from moviecard via MAT_DIALOG_DATA
   * @property {string} Name - name of genre
   * @property {string} Description - description of genre
   */

  movie: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GenreComponent>,
    public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getMovie(this.data.name).subscribe((resp: any) => {
      this.movie = resp;
      return this.movie;
    });
  }

  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
