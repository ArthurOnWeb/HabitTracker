export class Habit {
    _id: string;
    username: string;
    habitName: string;
    description: string;
    history: Date[];
  
    constructor(
      _id: string, 
      username: string,
      habitName: string,
      description: string,
    ) {
      this._id = _id;
      this.username = username;
      this.habitName = habitName;
      this.description = description;
      this.history=[];
    }
  }
  