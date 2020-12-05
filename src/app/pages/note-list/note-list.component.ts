import { Component, OnInit, ɵQueryValueType } from "@angular/core";
import { Note } from "src/app/shared/notes.model";
import { NotesService } from "src/app/shared/notes.service";

@Component({
  selector: "app-note-list",
  templateUrl: "./note-list.component.html",
  styleUrls: ["./note-list.component.scss"],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  constructor(private noteService: NotesService) {}

  ngOnInit() {
    this.notes = this.noteService.getAll();
    this.filteredNotes = this.notes;
  }
  deleteNote(id: number) {
    this.noteService.delete(id);
  }
  filter(query: string){
    let allResults: Note[] = new Array<Note>();
    query = query.toLowerCase().trim();
    let words: string[] = query.split(' ');//splits into words when there is a space
    words = this.removeDuplicates(words);
    words.forEach(term=>{
      let results: Note[] = this.relevantNotes(term);
      allResults = [...allResults, ...results];
    })
    let uniqueResult = this.removeDuplicates(allResults);
     this.filteredNotes = uniqueResult;
  }
  removeDuplicates(arr: Array<any>): Array<any>{
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(item=>{
      uniqueResults.add(item);
    })
   return Array.from(uniqueResults);

  }
  relevantNotes(query: string): Array<any>{
     query = query.toLowerCase().trim();
     let relevantNotes = this.notes.filter(note =>{
       if(note.title && note.title.toLowerCase().includes(query)){
         return true;
       }
       if(note.body && note.body.toLowerCase().includes(query)){
        return true;
      }
      return false;
     })
     return relevantNotes;
  }
}

