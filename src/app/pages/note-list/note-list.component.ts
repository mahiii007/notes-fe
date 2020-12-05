import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/shared/notes.model";
import { NotesService } from "src/app/shared/notes.service";

@Component({
  selector: "app-note-list",
  templateUrl: "./note-list.component.html",
  styleUrls: ["./note-list.component.scss"],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  constructor(private noteService: NotesService) {}

  ngOnInit() {
    this.notes = this.noteService.getAll();
  }
  deleteNote(id: number) {
    this.noteService.delete(id);
  }
}
