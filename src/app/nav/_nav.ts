
import { Routes } from '@angular/router';
import { NavegacionModel } from '../models/navegacion.model';
import {  GESTION_MEDIO_PAGO,
          GESTION_PROCESOS,
          GESTION_ROLES,
          GESTION_ROL_PERMISOS,
          GESTION_TIPO_DOCUMENTOS,
          GESTION_TIPO_PAGO,
          GESTION_TIPO_TRANSACCION,
          GESTION_GRUPO,
          GESTION_TIPO_GRUPO, GESTION_JORNADA,
          GESTION_TIPO_PROGRAMAS,
          GESTION_PROGRAMAS,
          GESTION_FASES,
          GESTION_ACTIVIDAD_PROYECTO,
          GESTION_PROYECTO_FORMATIVO,
          GESTION_PRO,
          GESTION_SEDE,
          GESTION_AREA,
          GESTION_INFRAESTRUCTURA,
          CALENDARIO,
          GESTION_COMPETENCIA, //importaciones
          GESTION_ACTIVIDAD_APRENDIZAJE,//importaciones
          GESTION_RESULTADO_APRENDIZAJE,
          REGIONAL,
          CENTRO_FORMACION,
          GESTION_FICHAS,//i
} from './permissions';

export const navItems: NavegacionModel[] = [
  {
    name: 'Roles',
    url: 'add_roles',
    icon: 'icon-drop',
    permiso: GESTION_ROLES,
  },
  {
    name: 'Permisos',
    url: 'add_permission',
    icon: 'icon-drop',
    permiso: GESTION_ROL_PERMISOS,
  },
  {
    name: 'Procesos',
    url: 'add_proceso',
    icon: 'icon-drop',
    permiso: GESTION_PROCESOS,
  },
  {
    name: 'Tipo Documentos',
    url: 'add_tipo_documento',
    icon: 'icon-drop',
    permiso: GESTION_TIPO_DOCUMENTOS,
  },
  {
    name: 'Medios de Pago',
    url: 'add_medio_pago',
    icon: 'icon-drop',
    permiso: GESTION_MEDIO_PAGO,
  },
  {
    name: 'Tipos de Pago',
    url: 'add_tipo_pago',
    icon: 'icon-drop',
    permiso: GESTION_TIPO_PAGO,
  },
  {
    name: 'Tipos de Transacción',
    url: 'add_tipo_transaccion',
    icon: 'icon-drop',
    permiso: GESTION_TIPO_TRANSACCION,
  },
  {
    name: 'Usuarios',
    url: 'add_usuarios',
    icon: 'icon-drop',
    permiso: GESTION_TIPO_TRANSACCION,
  },

  {
    name: "Sedes",
    url: 'gestionar_sede', //URL que mostrará la vista
    icon: 'icon-home',
    permiso: GESTION_SEDE,
  },
  {
    name: "Area",
    url: 'gestionar_area', //URL que mostrará la vista
    icon: 'icon-home',
    permiso: GESTION_AREA,
  },
  {
    name: "Infraestructura",
    url: 'gestionar_infraestructura', //URL que mostrará la vista
    icon: 'icon-home',
    permiso: GESTION_INFRAESTRUCTURA,
  },
  {
    name: 'Grupo',
    url: 'grupos',
    icon: 'cil-group',
    permiso: GESTION_GRUPO
  },
  {
    name: 'Tipo grupos',
    url: 'tipogrupos',
    icon: 'cil-user',
    permiso: GESTION_TIPO_GRUPO
  },
  {
    name: 'Gestion Jornada',
    url: 'add_jornada',
    icon: 'cil-note-add',
    permiso: GESTION_JORNADA,
  },
  {
    name: "Tipos de Programa",
    url: 'add_tipo_programa',
    icon: 'icon-drop',
    permiso: GESTION_TIPO_PROGRAMAS
  },
  {
    name: "Programas",
    url: 'add_programa',
    icon: 'icon-drop',
    permiso: GESTION_PROGRAMAS
  },
  {
    name: "Fases",
    url: 'add_fases',
    icon: 'icon-drop',
    permiso: GESTION_FASES
  },
  {
    name: "Actividad Proyecto",
    url: 'add_actividad_proyecto',
    icon: 'icon-drop',
    permiso: GESTION_ACTIVIDAD_PROYECTO
  },
  {
    name: "Proyecto Formativo",
    url: 'add_proyecto_formativo',
    icon: 'icon-drop',
    permiso: GESTION_PROYECTO_FORMATIVO
  },
  {
    name: "Gestión Programas",
    url: 'add_gestion_programa',
    icon: 'cil-folder-open',
    permiso: GESTION_PRO
  },
  {
    name: "Calendario",
    url: "add_calendario",
    icon: "icon-drop",
    permiso: CALENDARIO,
  },
  {
    name: "Competencia",
    url: 'gestionar_competencia', //muestra la vista para competencia ''''''''''''''''''''
    icon: 'cil-institution',
    permiso: GESTION_COMPETENCIA,
  },

  {
    name: "Actividad aprendizaje",
    url: 'add_actividad_aprendizaje',//muestra la vista para actividad aprendizaje''''''''''''''''''''
    icon: 'cil-color-border',
    permiso: GESTION_ACTIVIDAD_APRENDIZAJE
  },
  {
    name: "Resultado aprendizaje",
    url: 'add_resultado_aprendizaje',//muestra la vista para resultado aprendizaje''''''''''''''''''''
    icon: 'cil-columns',
    permiso: GESTION_RESULTADO_APRENDIZAJE
  },
  {
    name: "Regional",
    url: 'add_regional',//muestra la vista para regional''''''''''''''''''''
    icon: 'cil-columns',
    permiso: REGIONAL
  },
  {
    name: "Centro Formacion",
    url: 'add_centro_formacion',//muestra la vista para resultado aprendizaje''''''''''''''''''''
    icon: 'cil-columns',
    permiso: CENTRO_FORMACION
  },


  // vanssssssssssssssssssssssssssss gestion fichas para la vista
  {
    name: "Gestion fichas",
    url: 'add_gestion_fichas',//muestra la vista para resultado aprendizaje''''''''''''''''''''
    icon: 'cil-columns',
    permiso: GESTION_FICHAS
  },


];

export const routesNav: Routes = [

  {
    path: 'dashboard',
    loadChildren: () =>
      import('../pages/notificacion/notificacion.module').then(
        (m) => m.NotificacionModule
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('../pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'add_roles',
    loadChildren: () =>
      import('../pages/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'add_permission',
    loadChildren: () =>
      import('../pages/permiso/permiso.module').then((m) => m.PermisoModule),
  },
  {
    path: 'add_proceso',
    loadChildren: () =>
      import('../pages/proceso/proceso.module').then((m) => m.ProcesoModule),
  },
  {
    path: 'add_tipo_documento',
    loadChildren: () =>
      import('../pages/tipo-documento/tipo-documento.module').then(
        (m) => m.TipoDocumentoModule
      ),
  },
  {
    path: 'add_medio_pago',
    loadChildren: () =>
      import('../pages/medio-pago/medio-pago.module').then(
        (m) => m.MedioPagoModule
      ),
  },
  {
    path: 'add_tipo_pago',
    loadChildren: () =>
      import('../pages/tipo-pago/tipo-pago.module').then(
        (m) => m.TipoPagoModule
      ),
  },
  {
    path: 'add_tipo_transaccion',
    loadChildren: () =>
      import('../pages/tipo-transaccion/tipo-transaccion.module').then(
        (m) => m.TipoTransaccionModule
      ),
  },
  {

    path: 'add_usuarios',
    loadChildren: () =>
      import('../pages/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'add_usuarios',
    loadChildren: () =>
      import('../pages/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'add_jornada',
    loadChildren: () =>
      import('../pages/jornada/jornada.module').then(
        (m) => m.JornadaModule
      ),
  },
  {
    path: 'add_usuarios',
    loadChildren: () => import('../pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'gestionar_nomina_supervisor',
    loadChildren: () => import('../pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'gestionar_sede',
    loadChildren: () => import('../pages/sede/sede.module').then(m => m.SedeModule)
  },
  {
    path: 'gestionar_area',
    loadChildren: () => import('../pages/area/area.module').then(m => m.AreaModule)
  },
  {
    path: 'gestionar_infraestructura',
    loadChildren: () => import('../pages/infraestructura/infraestructura.module').then(m => m.InfraestructuraModule)
  },
  {
      path: 'grupos',
    loadChildren: () => import('../pages/grupo/grupo.module').then(m => m.GrupoModule)
  },
  {
    path: 'tipogrupos',
    loadChildren: () => import('../pages/tipo-grupo/tipoGrupo.module').then(m => m.TipogrupoModule)
  },
  {
    path: 'add_tipo_programa',
    loadChildren: () => import('../pages/tipo-programa/tipo-programa.module').then(m => m.TipoProgramaModule)
  },
  {
    path: 'add_programa',
    loadChildren: () => import('../pages/programa/programa.module').then(m => m.ProgramaModule)
  },
  {
    path: 'add_fases',
    loadChildren: () => import('../pages/fase/fase.module').then(m => m.FaseModule)
  },
  {
    path: 'add_actividad_proyecto',
    loadChildren: () => import('../pages/actividad-proyecto/actividad-proyecto.module').then(m => m.ActividadProyectoModule)
  },
  {
    path: 'add_proyecto_formativo',
    loadChildren: () => import('../pages/proyecto-formativo/proyecto-formativo.module').then(m => m.ProyectoFormativoModule)
  },
  {
    path: 'add_gestion_programa',
    loadChildren: () => import('../pages/gestion-programa/gestion-programa.module').then(m => m.GestionProgramaModule)
  },
  {
    path: 'add_calendario',
    loadChildren: () => import('../pages/calendario/calendario.module').then((m) => m.CalendarioModule)
  },
  {
    path: 'gestionar_competencia',
    loadChildren: () => import('../pages/competencias/competencias.module').then(m => m.CompetenciasModule)//ruta como tal que se muestra en el nav (barra de navegacion)
  },
  {
    path: 'add_resultado_aprendizaje',
    loadChildren: () => import('../pages/resultado-aprendizaje/resultado-aprendizaje.module').then(m => m.ResultadoAprendizajeModule)
  },
  {
    path: 'add_actividad_aprendizaje',
    loadChildren: () => import('../pages/actividad-aprendizaje/actividad-aprendizaje.module').then(m => m.ActividadAprendizajeModule)
  },
  {
    path: 'add_regional',
    loadChildren: () => import('../pages/regional/regional.module').then(m => m.RegionalModule)
  },
  {
    path: 'add_centro_formacion',
    loadChildren: () => import('../pages/centro-formacion/centro-formacion.module').then(m => m.CentroFormacionModule)
  },


// vanssssssssssssssssssssssssssssssssssssssssss gestion fichas
  {
    path: 'add_gestion_fichas',
    loadChildren: () => import('../pages/gestion-fichas/page/gestion-fichas.module').then(m => m.GestionFichasModule)
  },
];
