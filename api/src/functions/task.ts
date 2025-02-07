import Task from "../models/Task";
import Step from "../models/Step";
import Colleague from "../models/Colleague";
import { publish } from "../lib/Event";

async function create({
  colleagueId,
  description,
}: {
  colleagueId: string;
  description: string;
}) {
  const task = await Task.create({
    colleagueId,
    description,
    status: "IN_PROGRESS",
  });

  publish("TASK", "CREATED", {
    taskId: task.id,
    colleagueId,
    description,
  });

  return task;
}

async function update({
  taskId,
  comment,
  status,
}: {
  taskId: string;
  comment?: string;
  status: "COMPLETED" | "FAILED";
}) {
  return await Task.update({ comment, status }, { where: { id: taskId } });
}

async function get({ taskId }: { taskId: string }) {
  return await Task.findOne({ where: { id: taskId } });
}

async function list({
  colleagueId,
  teamId,
}: {
  colleagueId: string;
  teamId: string;
}) {
  return await Task.findAll({
    include: [
      {
        model: Colleague,
        attributes: [],
        where: { teamId },
        required: true,
      },
    ],
    where: { colleagueId },
  });
}

async function addStep({
  taskId,
  action,
  parameters,
  comment,
}: {
  taskId: string;
  action: string;
  parameters: string;
  comment: string;
}) {
  const step = await Step.create({
    taskId,
    action,
    parameters,
    comment,
  });

  publish("STEP", "ADDED", {
    stepId: step.id,
    taskId,
    action,
    parameters,
    comment,
  });

  return step;
}

async function getStep({ stepId }: { stepId: string }) {
  const step = await Step.findOne({ where: { id: stepId } });
  return step.toJSON();
}

async function updateStep({
  stepId,
  result,
  status,
}: {
  stepId: string;
  result: string;
  status: "IN_PROGRESS" | "SUPERVISED_NEEDED" | "COMPLETED" | "FAILED";
}) {
  const { taskId, action, parameters } = await Step.findOne({
    where: { id: stepId },
  });
  const step = await Step.update(
    {
      result,
      status,
    },
    { where: { id: stepId } }
  );

  if (status === "COMPLETED") {
    publish("STEP", "COMPLETED", {
      taskId,
      stepId,
      action,
      parameters,
      result,
    });
  }

  return step;
}

async function listSteps({ taskId }: { taskId: string }) {
  const steps = await Step.findAll({
    where: { taskId },
  });

  return steps
    .map((step) => step.toJSON())
    .map((step) => ({
      ...step,
      result: step.result ? step.result.toString() : null,
    }));
}

export default {
  create,
  get,
  update,
  list,
  getStep,
  addStep,
  updateStep,
  listSteps,
};
