import { map } from 'rxjs/operators';
import { Subscription } from "rxjs";
import multiMonthPlugin from "@fullcalendar/multimonth";
import {
  Component,
  ChangeDetectorRef,
  Input,
  Output,
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
import esLocale from "@fullcalendar/core/locales/es";
import { JornadaModel } from "@models/jornada.model";
import { GrupoModel } from "@models/grupo.model";
import { addDays } from "@fullcalendar/core/internal";
import { UsuarioModel } from "@models/usuario.model";
import { SedeModel } from "@models/sede.model";
import { AsignacionJornadaGrupoModel } from "@models/asignacion-jornada-grupo.model";
import { DiaJornadaModel } from "@models/dia_jornada.model";
import { DiaJornadaService } from '@services/dia-jornada.service';

@Component({
  selector: "view-calendar",
  templateUrl: "./view-calendar.component.html",
  styleUrls: ["./view-calendar.component.css"],
})
export class ViewCalendarComponent implements OnInit {
  //prueba con grupo y jornada
  @Input() jornadas: JornadaModel;
  @Input() grupos: GrupoModel[];
  @Input() diaJornada: DiaJornadaModel[];
  //grupo y jornada
  @Input() gruposJornadas: AsignacionJornadaGrupoModel[];
  @Input() listUsers: UsuarioModel[];

  @Input() sedes: SedeModel;
  @Output() Eventtos: EventInput[];

  Eventos: EventInput[] = [];
  calendarVisible = true;

  calendarOptions: CalendarOptions = {
    locale: esLocale,
    nowIndicator: true,
    plugins: [
      multiMonthPlugin,
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "multiMonthYear",
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

  ngOnInit(): void {
    this.crearEventosGrupoJornada();
  }

  currentEvents: EventApi[] = [];
  constructor(private changeDetector: ChangeDetectorRef,
    private _diajornadaService: DiaJornadaService) {}

  crearEventosGrupoJornada() {
    //const fechaConHora = new Date(`${fecha.toISOString().slice(0, 10)}T${hora}`);

    let Eventos: EventInput[] = [];


    this.gruposJornadas.forEach((gruposJornadas) => {
      const fInit: Date = new Date(gruposJornadas.grupo.fechaInicial);
      const fEnd: Date = new Date(gruposJornadas.grupo.fechaFinal);

      const hInit: string = gruposJornadas.jornada.horaInicial;
      const hEnd: string = gruposJornadas.jornada.horaFinal;

      for (let fecha = fInit; fecha <= fEnd; fecha = addDays(fecha, 1)) {
        const grupo = this.grupos.find(
        (grupo) => grupo.id == gruposJornadas.idGrupo
        );
        //const lider= this.listUsers.find(lider=>(lider.id==lider.id));
        Eventos.push({
          id: createEventId(),
          title: gruposJornadas.grupo.nombre,
          jornada: gruposJornadas.jornada.nombreJornada,
          start: new Date(`${fecha.toISOString().slice(0, 10)}T${hInit}`),
          end: new Date(`${fecha.toISOString().slice(0, 10)}T${hEnd}`),
          infra: grupo.infraestructura.nombreInfraestructura,
          //lider: lider.persona.nombre1+' '+lider.persona.nombre2
        });
      }
    });
    this.Eventos = Eventos;
    this.calendarOptions.initialEvents = this.Eventos;
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
    calendarApi.unselect(); 

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

let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}
