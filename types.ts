
export type Screen = 'welcome' | 'lesson' | 'results' | 'certificate';

export interface Question {
  id: string;
  type: 'single' | 'multiple';
  text: string;
  options: string[];
  correct: number | number[];
}

export interface FillInTheBlank {
  text: string;
  answers: string[];
  pointsPerBlank: number;
}

export interface Lesson {
  title: string;
  icon: string;
  desc: string;
  scoring: { [key: string]: number };
  questions: Question[];
  fillInTheBlank: FillInTheBlank;
}

export interface Lessons {
  [key: number]: Lesson;
}

export interface LessonAnswers {
  mcq: { [questionId: string]: number | number[] | null };
  fill: string[];
}

export interface AppState {
  userName: string;
  currentLesson: number | null;
  answers: { [lessonId: number]: LessonAnswers };
  scores: { [lessonId: number]: number };
  submitted: { [lessonId: number]: boolean };
}
