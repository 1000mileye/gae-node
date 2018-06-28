import * as express from 'express';
import { HELLO, GOOD_BYE } from './message';
import { putTask, getTask, Task } from './datastore';
import { CommitResponse } from '@google-cloud/datastore/request';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(`${HELLO} from App Engine!`);
});

app.get('/bye', (req: express.Request, res: express.Response) => {
  res.send(`${GOOD_BYE} from App Engine!`);
});

app.put('/save', (req: express.Request, res: express.Response) => {
  putTask()
    .then(_ => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('ERROR:', err);
      res.send(err.code);
    });
});

app.get('/get', async (req: express.Request, res: express.Response) => {
  const task = (await getTask().catch(err => {
    console.log('ERROR:', err);
    res.sendStatus(err.code);
    return null;
  })) as Task[];
  if (!task[0]) {
    res.sendStatus(404);
    return;
  }
  task.forEach(t => {
    console.log(`Description of entity is ${t.description}`);
  });
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
