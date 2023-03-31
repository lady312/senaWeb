import { Routes } from "@angular/router";
import { NavegacionModel } from "@models/navegacion.model";
import { ResultadoComponent } from "../pages/resultado/page/resultado/resultado.component";
import { ResultadoModule } from "../pages/resultado/resultado.module";
import {
  GESTION_MEDIO_PAGO,
  GESTION_PROCESOS,
  GESTION_ROLES,
  GESTION_ROL_PERMISOS,
  GESTION_TIPO_DOCUMENTOS,
  GESTION_TIPO_PAGO,
  GESTION_TIPO_TRANSACCION,
  GESTION_COMPETENCIA,
  GESTION_RESULTADOS,
  GESTION_JORNADA
} from "./permissions";

export const navItems: NavegacionModel[] = [
  {
    name: "Roles",
    url: "add_roles",
    icon: "icon-drop",
    permiso: GESTION_ROLES,
  },
  {
    name: "Permisos",
    url: "add_permission",
    icon: "icon-drop",
    permiso: GESTION_ROL_PERMISOS,
  },
  {
    name: "Procesos",
    url: "add_proceso",
    icon: "icon-drop",
    permiso: GESTION_PROCESOS,
  },
  {
    name: "Tipo Documentos",
    url: "add_tipo_documento",
    icon: "icon-drop",
    permiso: GESTION_TIPO_DOCUMENTOS,
  },
  {
    name: "Medios de Pago",
    url: "add_medio_pago",
    icon: "icon-drop",
    permiso: GESTION_MEDIO_PAGO,
  },
  {
    name: "Tipos de Pago",
    url: "add_tipo_pago",
    icon: "icon-drop",
    permiso: GESTION_TIPO_PAGO,
  },
  {
    name: "Tipos de Transacción",
    url: "add_tipo_transaccion",
    icon: "icon-drop",
    permiso: GESTION_TIPO_TRANSACCION,
  },
  {
    name: "Usuarios",
    url: "add_usuarios",
    icon: "icon-drop",
    permiso: GESTION_TIPO_TRANSACCION,
  },
  {
    name: "Competencia",
    url: "add_competencia",
    icon: "icon-menu",
    permiso: GESTION_COMPETENCIA,
  },
  {
    name: "Gestion Resultados",
    url: "add_resultados",
    icon:"cil-history",
    permiso: GESTION_RESULTADOS,
  },
  {
    name: "Gestion Jornada",
    url: "add_jornada",
    icon:"cil-history",
    permiso: GESTION_JORNADA,
  }
];

export const routesNav: Routes = [
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
  // },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../pages/notificacion/notificacion.module").then(
        (m) => m.NotificacionModule
      ),
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("../pages/profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "add_roles",
    loadChildren: () =>
      import("../pages/roles/roles.module").then((m) => m.RolesModule),
  },
  {
    path: "add_permission",
    loadChildren: () =>
      import("../pages/permiso/permiso.module").then((m) => m.PermisoModule),
  },
  {
    path: "add_proceso",
    loadChildren: () =>
      import("../pages/proceso/proceso.module").then((m) => m.ProcesoModule),
  },
  {
    path: "add_tipo_documento",
    loadChildren: () =>
      import("../pages/tipo-documento/tipo-documento.module").then(
        (m) => m.TipoDocumentoModule
      ),
  },
  {
    path: "add_medio_pago",
    loadChildren: () =>
      import("../pages/medio-pago/medio-pago.module").then(
        (m) => m.MedioPagoModule
      ),
  },
  {
    path: "add_tipo_pago",
    loadChildren: () =>
      import("../pages/tipo-pago/tipo-pago.module").then(
        (m) => m.TipoPagoModule
      ),
  },
  {
    path: "add_tipo_transaccion",
    loadChildren: () =>
      import("../pages/tipo-transaccion/tipo-transaccion.module").then(
        (m) => m.TipoTransaccionModule
      ),
  },
  {
    path: "add_usuarios",
    loadChildren: () =>
      import("../pages/usuario/usuario.module").then((m) => m.UsuarioModule),
  },
  {
    path: "add_usuarios",
    loadChildren: () =>
      import("../pages/usuario/usuario.module").then((m) => m.UsuarioModule),
  },
  {
    path: "add_competencia",
    loadChildren: () =>
      import("../pages/competencia/competencia.module").then(
        (m) => m.CompetenciaModule
      ),
  },
  {
    path: "add_resultado",
    loadChildren: () =>
      import("../pages/resultado/resultado.module").then(
        (m) => m.ResultadoModule
      ),
  },
  {
    path: "add_jornada",
    loadChildren: () =>
      import("../pages/jornada/jornada.module").then(
        (m) => m.JornadaModule
      ),
  },
];
