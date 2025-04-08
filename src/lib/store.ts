// src/lib/store.ts
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// --- Onboarding Atoms ---
export const spacesAtom = atomWithStorage<string[]>('spaces', ["Normal"]); // default space
export const labelsAtom = atomWithStorage<string[]>("labels", ["low", "medium", "high"]); // default priorities
export const timeBlocksAtom = atomWithStorage<string[]>("timeBlocksAtom", ["Morning", "Afternoon", "Night"]);
export const onboardingCompleteAtom = atomWithStorage<boolean>("onboardingComplete", false);
export const nameAtom = atomWithStorage<string>("name", ""); // default name
// --- Task Type & Atom ---
export type Task = {
    id: string;
    text: string;
    timeBlock: string; // now dynamic, not hardcoded
    space: string;
    priority: string;
    label: string;
    color: string;
    done: boolean;
    date: string; // YYYY-MM-DD
};

export const tasksAtom = atomWithStorage<Task[]>('tasks',[]);

// --- Actions ---

type CreateTaskPayload = {
    text: string;
    timeBlock: Task["timeBlock"];
    date: string;
    space?: string;
    label?: string;
    color?: string;
};
// Create a task
export const createTaskAtom = atom(null, (get, set, newTask: CreateTaskPayload) => {
    const tasks = get(tasksAtom);
    const task: Task = {
        id: crypto.randomUUID(),
        text: newTask.text,
        timeBlock: newTask.timeBlock,
        date: newTask.date,
        space: newTask.space||"default",
        label: newTask.label||"low",
        color: newTask.color||"#F87171",
        priority: "low",
        done: false
    };
    set(tasksAtom, [...tasks, task]);
});

// Toggle done
export const toggleDoneAtom = atom(
    null,
    (get, set, id: string) => {
        const updated = get(tasksAtom).map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        );
        set(tasksAtom, updated);
    }
);
export const setNameAtom = atom(
    null,
    (get, set, name: string) => {
        console.log(get(nameAtom));
        set(nameAtom, name);
    }
);
// Delete task
export const deleteTaskAtom = atom(
    null,
    (get, set, id: string) => {
        const filtered = get(tasksAtom).filter((task) => task.id !== id);
        set(tasksAtom, filtered);
    }
);
