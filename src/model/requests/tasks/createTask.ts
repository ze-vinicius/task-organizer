import { Result, ValueOf } from '../Utility.types';
import { Task, TasksRespository } from '../../models/Task';

const ERROR_CODES = {
  GENERIC_ERROR: 'auth/generic-error',
} as const;

type CreateTaskResponse = Task;
type CreateTaskErrorCode = ValueOf<typeof ERROR_CODES>;
type CreateTaskReturn = Result<CreateTaskErrorCode, CreateTaskResponse>;

type CreateTaskParams = {
  title: string;
  date: Date;
};

function getError(error: { code: string }) {
  const { code } = error;

  const mappedError = Object.values(ERROR_CODES).find((err) => err === code);

  return mappedError || ERROR_CODES.GENERIC_ERROR;
}

export async function createTask(
  data: CreateTaskParams
): Promise<CreateTaskReturn> {
  try {
    const response = await TasksRespository().createTask(data);

    return [undefined, response];
  } catch (error: any) {
    return [getError(error), undefined];
  }
}