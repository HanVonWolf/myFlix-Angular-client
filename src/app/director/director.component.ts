import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * dialog component for director info
 */
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
    /**
   * @constructor sets dependencies
   * @param data - specific director info, received from moviecard via MAT_DIALOG_DATA
   * @property {string} Name - name of director
   * @property {string} Bio - short biography of director
   * @property {string} Birthday - year of birth
   */

  movie: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DirectorComponent>,
    public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getMovie(this.data.name).subscribe((resp: any) => {
      this.movie = resp;
      if (this.movie.director.birthDate) {
        this.movie.director.birthDate = new Date(this.movie.director.birthDate).toISOString().split('T')[0];
      }
      return this.movie;
    });
  }

  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
