export interface PomodoroProps {
  pomodoros: number;
  shortBreak: number;
  longBreak: number;
  auto: boolean;
}

export interface PostProps {
  style: string;
  sessions: number;
  time: string;
  title: string;
  description: string;
}
