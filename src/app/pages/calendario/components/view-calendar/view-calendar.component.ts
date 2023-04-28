import { GruposService } from "./../../../../services/grupo.service";
import {
  Component,
  ChangeDetectorRef,
  Input,
  ViewChild,
  OnInit,
} from "@angular/core";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import esLocale from "@fullcalendar/core/locales/es";
import { JornadaModel } from "@models/jornada.model";
import { GrupoModel } from "@models/grupo.model";
import { addDays } from "@fullcalendar/core/internal";

@Component({
  selector: "view-calendar",
  templateUrl: "./view-calendar.component.html",
  styleUrls: ["./view-calendar.component.css"],
})
export class ViewCalendarComponent {
  @Input() jornadas: JornadaModel[];
  @Input() grupos: GrupoModel[];
  Eventos: EventInput[]=[];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    nowIndicator: true,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "dayGridMonth",
    initialEvents: this.Eventos,
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
  constructor(private changeDetector: ChangeDetectorRef) {}

  crearEventos() {
    let Eventos: EventInput[] = [];
    this.grupos.forEach((grupo) => {
      const fInit = new Date(grupo.fechaInicial);
      const fEnd = new Date(grupo.fechaFinal);
      for (let fecha = fInit; fecha <= fEnd; fecha = addDays(fecha, 1)) {
        Eventos.push({
          id: createEventId(),
          title: grupo.nombre,
          start: new Date(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDay(),
            0,
            0
          ),
          end: new Date(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDay(),
            23,
            59
          ),
        });
      }
    });
    console.log(Eventos);
    this.Eventos=Eventos;
    this.calendarOptions.initialEvents=this.Eventos;
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
}
