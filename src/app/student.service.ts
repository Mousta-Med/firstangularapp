import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }
  public getStudents(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/students`);
  }
  public addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${this.apiServerUrl}/save`, student);
  }
  public deleteStudent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
  public updateStudent(id: number, student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.apiServerUrl}/update/${id}`, student);
  }
}

