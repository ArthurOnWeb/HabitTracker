export class Habit {
    _id: string;
    username: string;
    habitName: string;
    frequency: string[];
    description: string;
    history: Date[];
  
    constructor(
      _id: string, 
      username: string,
      habitName: string,
      frequency: string[],
      description: string,
    ) {
      this._id = _id;
      this.username = username;
      this.habitName = habitName;
      this.frequency = frequency;
      this.description = description;
      this.history=[];
    }
  }
  