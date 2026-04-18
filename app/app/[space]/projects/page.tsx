"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getProjectsBySpace, getPersonById, getTimeEntriesByProject, getSpaceSettings, getSpaceById, accentColors, type TaskStatus } from "@/lib/app/mockData";
import { formatSek } from "@/lib/utils/formatSek";
import { Plus, KanbanSquare, BarChart3 } from "lucide-react";

const columns: { id: TaskStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "in-progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
];

const priorityColors: Record<string, string> = {
  high: "bg-[#fee2e2] text-[#b91c1c]",
  medium: "bg-[#fffbeb] text-[#b45309]",
  low: "bg-[#f0fdf4] text-[#15803d]",
};

type View = "board" | "progress";

export default function ProjectsPage() {
  const params = useParams();
  const spaceId = params.space as string;
  const projectList = getProjectsBySpace(spaceId);
  const settings = getSpaceSettings(spaceId);
  const space = getSpaceById(spaceId);
  const colors = space ? accentColors[space.accent] : accentColors.blue;

  const [view, setView] = useState<View>("board");

  const allTasks = projectList.flatMap((p) =>
    p.tasks.map((t) => ({ ...t, projectTitle: p.title, projectId: p.id }))
  );
  const [tasks, setTasks] = useState(allTasks);

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[17px] font-medium text-[var(--app-text)]">Projects</h1>
          <div className="flex items-center gap-1 bg-[var(--app-bg)] rounded-md p-0.5 border border-[var(--app-border)]">
            <button
              onClick={() => setView("board")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[12px] transition-colors ${
                view === "board" ? "bg-white shadow-sm font-medium text-[var(--app-text)]" : "text-[var(--app-text-tertiary)]"
              }`}
            >
              <KanbanSquare size={12} strokeWidth={1.5} /> Board
            </button>
            <button
              onClick={() => setView("progress")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[12px] transition-colors ${
                view === "progress" ? "bg-white shadow-sm font-medium text-[var(--app-text)]" : "text-[var(--app-text-tertiary)]"
              }`}
            >
              <BarChart3 size={12} strokeWidth={1.5} /> Progress
            </button>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] bg-[var(--accent)] text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus size={14} strokeWidth={1.5} /> New task
        </button>
      </div>

      {view === "board" && (
        <div className="grid grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[13px] font-medium text-[var(--app-text)]">{col.label}</span>
                  <span className="text-[12px] text-[var(--app-text-muted)] font-mono tabular-nums">{colTasks.length}</span>
                </div>
                <div
                  className="space-y-2 min-h-[200px] bg-[var(--app-bg)] rounded-lg p-2"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const taskId = e.dataTransfer.getData("taskId");
                    if (taskId) moveTask(taskId, col.id);
                  }}
                >
                  {colTasks.map((task) => {
                    const assignee = getPersonById(task.assignee);
                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                        className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-lg p-3 cursor-grab active:cursor-grabbing hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-shadow"
                      >
                        <p className="text-[13px] text-[var(--app-text)] leading-tight mb-2">{task.title}</p>
                        <p className="text-[11px] text-[var(--app-text-muted)] mb-2">{task.projectTitle}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {task.priority && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                            )}
                            {task.deadline && (
                              <span className="text-[11px] text-[var(--app-text-muted)] font-mono">{task.deadline.slice(5)}</span>
                            )}
                          </div>
                          {assignee && (
                            <div className="w-5 h-5 rounded-full bg-[var(--app-hover)] flex items-center justify-center text-[9px] font-medium text-[var(--app-text-tertiary)]">
                              {assignee.avatar}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "progress" && (
        <div className="space-y-4">
          {projectList.map((project) => {
            const totalTasks = project.tasks.length;
            const doneTasks = project.tasks.filter((t) => t.status === "done").length;
            const inProgressTasks = project.tasks.filter((t) => t.status === "in-progress").length;
            const backlogTasks = project.tasks.filter((t) => t.status === "backlog").length;
            const reviewTasks = project.tasks.filter((t) => t.status === "review").length;
            const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

            const timeEntries = getTimeEntriesByProject(project.id);
            const totalMinutes = timeEntries.reduce((sum, te) => sum + te.minutes, 0);
            const totalHours = totalMinutes / 60;
            const hourlyRate = settings?.hourlyRate || 0;
            const cost = totalHours * hourlyRate;

            const nextTask = project.tasks.find((t) => t.status === "in-progress" || t.status === "backlog");
            const nextTaskAssignee = nextTask ? getPersonById(nextTask.assignee) : null;

            return (
              <div key={project.id} className="border border-[var(--app-border)] rounded-lg p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-medium text-[var(--app-text)]">{project.title}</h3>
                    <p className="text-[12px] text-[var(--app-text-tertiary)]">
                      Due {project.deadline} · {getPersonById(project.assignee)?.name}
                    </p>
                  </div>
                  <span className="font-mono text-[24px] font-medium tabular-nums" style={{ color: colors.fg }}>
                    {progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-[var(--app-bg)] rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, backgroundColor: colors.fg }}
                  />
                </div>

                {/* Task breakdown + team + time */}
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-3 text-[var(--app-text-tertiary)]">
                    <span className="text-[var(--accent-green)] font-medium">{doneTasks} done</span>
                    <span>{inProgressTasks} in progress</span>
                    <span>{reviewTasks} review</span>
                    <span>{backlogTasks} backlog</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Team avatars */}
                    <div className="flex -space-x-1.5">
                      {project.team.slice(0, 4).map((personId) => {
                        const person = getPersonById(personId);
                        return (
                          <div
                            key={personId}
                            className="w-6 h-6 rounded-full bg-[var(--app-hover)] border-2 border-white flex items-center justify-center text-[9px] font-medium text-[var(--app-text-secondary)]"
                            title={person?.name}
                          >
                            {person?.avatar}
                          </div>
                        );
                      })}
                      {project.team.length > 4 && (
                        <div className="w-6 h-6 rounded-full bg-[var(--app-hover)] border-2 border-white flex items-center justify-center text-[9px] text-[var(--app-text-muted)]">
                          +{project.team.length - 4}
                        </div>
                      )}
                    </div>

                    {/* Time */}
                    <div className="font-mono tabular-nums text-[var(--app-text-secondary)]">
                      {totalHours.toFixed(1)}h
                      {hourlyRate > 0 && (
                        <span className="text-[var(--app-text-muted)]"> = {formatSek(cost, { compact: true })}</span>
                      )}
                      <span className="text-[var(--app-text-muted)]"> / {project.budgetHours}h budget</span>
                    </div>
                  </div>
                </div>

                {/* Next task */}
                {nextTask && (
                  <div className="mt-3 pt-3 border-t border-[var(--app-border)] flex items-center gap-2 text-[12px]">
                    <span className="text-[var(--app-text-tertiary)]">Next up:</span>
                    <span className="text-[var(--app-text)]">{nextTask.title}</span>
                    {nextTaskAssignee && (
                      <span className="text-[var(--app-text-muted)]">({nextTaskAssignee.name})</span>
                    )}
                    {nextTask.deadline && (
                      <span className="font-mono text-[11px] text-[var(--app-text-muted)]">due {nextTask.deadline.slice(5)}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
