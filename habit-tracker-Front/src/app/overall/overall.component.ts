import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-overall',
  standalone: true,
  imports: [CommonModule,NavbarComponent, NgFor],
  templateUrl: './overall.component.html',
  styleUrl: './overall.component.css'
})
export class OverallComponent implements OnInit{

  currentMonth!: number;
  currentYear!: number;
  currentMonthName!: string;
  daysOfWeek!: string[];
  calendarDays!: number[];

  ngOnInit() {
    this.initializeCalendar();
    this.renderCalendar();
  }

  initializeCalendar() {
    const date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.currentMonthName = this.getMonthName(this.currentMonth) || "";
    this.daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.calendarDays = [];
  }

  renderCalendar() {
    // Votre logique de rendu de calendrier ici...
    // Utilisez this.currentMonth et this.currentYear pour obtenir le mois et l'année actuels.
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar();
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.renderCalendar();
  }

  goToToday() {
    const date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.renderCalendar();
  }

  getMonthName(monthIndex: number): string {
    // Retourne le nom du mois en fonction de l'index du mois.
    // Vous pouvez utiliser un tableau comme dans votre code JS original.
    return ""
  }

  getDayClasses(day: number): string {
    // Retourne les classes CSS pour styliser les jours en fonction de la logique de votre choix.
    // Par exemple, appliquer la classe "today" pour le jour actuel.
    return ""
  }



}
