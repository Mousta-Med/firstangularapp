import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public students: Student[] = [];
  public id!: Student["id"];
  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getStudents();
  }
  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (Response: Student[]) => {
        this.students = Response;
      },
      (Response: HttpErrorResponse) => {
        alert(Error);
      }
    );
  }

  public addStudent(addform: NgForm): void {
    document.getElementById('close-form')?.click();
    this.studentService.addStudent(addform.value).subscribe(
      (Response: Student) => {
        console.log(Response);
        addform.resetForm();
        this.getStudents();
      },
      (Error: HttpErrorResponse) => {
        alert("All Fields Are Required");
      }
    );
  }
  public deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      (Response: void) => {
        console.log(Response);
        this.getStudents();
      },
      (Error: HttpErrorResponse) => {
        alert("All Fields Are Required");
      }
    );
  }
  public updateStudent(id: number, student: Student): void {
    document.getElementById('close-edit-form')?.click();
    this.studentService.updateStudent(id, student).subscribe(
      (Response: Student) => {
        this.getStudents();
      },
      (Error: HttpErrorResponse) => {
        alert("All Fields Are Required");
      }
    );
  }

  setFormValues(student: Student, editForm: NgForm): void {
    editForm.setValue({
      name: student.name,
      email: student.email,
      age: student.age
    });
    this.id = student.id;
  }
}
