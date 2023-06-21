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
import { InfraestructuraModel } from '@models/infraestructura.model';

@Component({
  selector: "view-calendar",
  templateUrl: "./view-calendar.component.html",
  styleUrls: ["./view-calendar.component.css"],
})
export class ViewCalendarComponent implements OnInit {
  //prueba con grupo y jornada
  @Input() jornadas: JornadaModel;
  @Input() grupos: GrupoModel[];
  @Input() grupo: GrupoModel;
  @Input() diaJornada: DiaJornadaModel[];
  //grupo y jornada
  @Input() gruposJornadas: AsignacionJornadaGrupoModel[];

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
    if (this.grupo) {
      this.Eventos = this.crearEventosGrupo(this.grupo);
    } else {
      this.Eventos= this.crearEventosGrupos(this.grupos);
    }
    this.calendarOptions.initialEvents = this.Eventos;
  }

  currentEvents: EventApi[] = [];
  constructor(
    private changeDetector: ChangeDetectorRef,
  ) { }

  crearEventosGrupo(grupo: GrupoModel): EventInput[] {
    const fInit: Date = new Date(grupo.fechaInicialGrupo);
    const fEnd: Date = new Date(grupo.fechaFinalGrupo);

    let Eventos: EventInput[] = [];

    for (let fecha = fInit; fecha < fEnd; fecha = addDays(fecha, 1)) {
      for (let jornada of grupo.jornadas) {
        let day: number = 0;
        day = fecha.getDay() === 0 ? 7 : fecha.getDay();
        let laboralDay: Boolean = jornada.diaJornada.some((dia) => dia.pivot.idDia == day);
        if (laboralDay) {
          let hInit: string = jornada.horaInicial;
          let fHInit:Date = new Date(`${fecha.toISOString().slice(0, 10)}T${hInit}`);
          let hEnd: string = jornada.horaFinal;
          let fHEnd: Date = new Date(`${fecha.toISOString().slice(0, 10)}T${hEnd}`);
          let infr: InfraestructuraModel = grupo.infraestructuras.find((infra) => new Date(infra.horario_infraestructura.fechaFinal) >= fecha);
          Eventos.push({
            id: createEventId(),
            title: grupo.nombre,
            start: addDays(fHInit,-1),
            end: addDays(fHEnd,-1),
            extendedProps: {
              descripcion: infr ? infr.nombreInfraestructura : 'Ambiente no asignado',
            }
          });
        }
      }
    }
    return Eventos;
  }
  crearEventosGrupos(grupos: GrupoModel[]) {

    let Eventos: EventInput[] = [];

    for (const grupo of grupos) {
      Eventos.concat(this.crearEventosGrupo(grupo));
    }

    return Eventos;
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
