import * as Datastore from '@google-cloud/datastore';

const PROJECT_ID = 'rich-karma-207109';

const datastore = new Datastore({
  projectId: PROJECT_ID,
});

const kind = 'Task';

const name = 'sampletask1';

const taskKey = datastore.key([kind, name]);

export interface Task {
  description: string;
}

export function putTask() {
  const t = <Task>{
    description: 'Buy Milk',
  };
  const task = {
    key: taskKey,
    data: t,
  };
  return datastore.save(task);
}

export function getTask() {
  return datastore.get(taskKey);
}
