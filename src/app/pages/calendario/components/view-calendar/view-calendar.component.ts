import { Component, ChangeDetectorRef, Input } from "@angular/core";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import esLocale from "@fullcalendar/core/locales/es";
import { JornadaModel } from "@models/jornada.model";
import { UINotificationService } from "@services/uinotification.service";
import { JornadaService } from "@services/jornada.service";

@Component({
  selector: "view-calendar",
  templateUrl: "./view-calendar.component.html",
  styleUrls: ["./view-calendar.component.css"],
})
export class ViewCalendarComponent {

  //jornada
  @Input() jornadas: JornadaModel[] = [];

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "dayGridMonth",
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];


    constructor(
      private changeDetector: ChangeDetectorRef,
      private _uiNotificationService: UINotificationService,
      private _jornadaService: JornadaService
    ) { }

    ngOnInit(): void {
      this.getJornada();
    }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt("Introduce un nuevo título para tu evento");
    const calendarApi = selectInfo.view.calendar;
    0;
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `¿Estás seguro de que quieres eliminar el evento?'${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  getJornada() {
    this._jornadaService.traerJornada().subscribe(
      (jornadas) => {
        this.jornadas = jornadas;
        this.jornadas.forEach((jornada) => {
          console.log({dia: jornada.diaJornada, horaInicial: jornada.horaInicial, horaFinal: jornada.horaFinal});
        });
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }
}
