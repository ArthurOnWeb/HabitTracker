export class Habit {
    id: string;
    username: string;
    habitName: string;
    frequency: number[];
    description: string;
    history: string[];
  
    constructor(
      id: string, 
      username: string,
      habitName: string,
      frequency: number[],
      description: string,
    ) {
      this.id = id;
      this.username = username;
      this.habitName = habitName;
      this.frequency = frequency;
      this.description = description;
      this.history=[];
    }
  }
  