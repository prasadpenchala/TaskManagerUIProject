import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { debuglog } from 'util';

@Injectable()
export class SharedService {
  baseUrl: 'http://localhost:8081/api/';
  constructor(private httpclient: HttpClient) {}
  IDs: string;
  selectedTask: Task;
  TaskList: Task[];
  GetParentListTask(): Observable<any> {
    return this.httpclient.get('http://localhost:8081/api/parentlist');
  }
  GetListTask(): Observable<any> {
    return this.httpclient.get('http://localhost:8081/api/list');
  }
  AddTask(task: Task): Observable<any> {
    return this.httpclient.post('http://localhost:8081/api/addtask', task);
  }
  GetTaskByID(IDs: string): Observable<any> {
    return this.httpclient.get('http://localhost:8081/api/findById/' + IDs);
  }
  DeleteTask(ID: string): Observable<any> {
    return this.httpclient.delete('http://localhost:8081/api/deleteById/' + ID);
  }

  UpdateTask(task: Task): Observable<boolean> {
    console.log('in the update method...');

    return this.httpclient.put<any>(
      'http://localhost:8081/api/updateById/' + task.taskid,
      task
    );
    // return this.httpclient.put<any>('http://localhost:8081/api/updateById/',+IDs,task.taskid);
  }

  EndTask( taskid, data: Task): Observable<any> {
    debugger;
    console.log('End task method in shared.service.ts');
    return this.httpclient.put(
      'http://localhost:8081/api/IsTaskEnded/' + taskid, data);
  }
  Edit(task: Task, IsTaskEnded): Observable<any> {
    console.log('in the edit method...');
    return this.httpclient.get<any>(
      'http://localhost:8081/api/updateById' + task.taskid , IsTaskEnded
    );
  }
}
