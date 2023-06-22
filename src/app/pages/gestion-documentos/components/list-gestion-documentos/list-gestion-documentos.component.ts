import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { GestiondocumentoService } from '@services/gestiondocumento.service';
import { Documento } from '@models/documento.model';
import { ProcesoModel } from '@models/proceso.model';
import { ResponsiveVisibility } from 'ngx-extended-pdf-viewer';
import { ProcesoService } from '@services/proceso.service';
import { PersonaModel } from '@models/persona.model';
import { PersonaService } from '@services/persona.service';
import { TipoDocumentoModel } from '@models/tipo-documento.model';
import { TipoDocumentoService } from '@services/tipo-documento.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsignacionEstadoDocumentoService } from '@services/asignacion-estado-documento';
import { AsignacionEstadoDocumentoModel } from '@models/AsignacionEstadoDocumento.model';
import { CoreService } from '@services/core.service';

@Component({
  selector: 'app-list-gestion-documentos',
  templateUrl: './list-gestion-documentos.component.html',
  styleUrls: ['./list-gestion-documentos.component.scss']
})

export class ListGestionDocumentosComponent implements OnInit {

  isViewerOpen: boolean = false;
  page : number;
  public zoom: number | string = 'auto';
  @ViewChild('pdfViewer') pdfViewer: any;

  
  pdfurl: string;
  archivoSeleccionado: File;
  numReg = 5;
  pageActual = 0;
  Documentos:TipoDocumentoModel [] =[];
  documentos: Documento[] = [];
  procesos: ProcesoModel[] = [];
  personas:PersonaModel []= [];
  asignacion: AsignacionEstadoDocumentoModel []= [];
  idDocumento: number | null = null;
  idSeleccionada: number;
  archivo: File; // Archivo a cargar
  modalVisible = false;
  openFileButtonEnabled: ResponsiveVisibility;
  documentoGuardado: boolean = false;
  documentoError: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  @ViewChild('archivoInput', { static: false })
  archivoInput!: ElementRef<HTMLInputElement>;
  documentoCargado: File | null = null;
  hayDocumento: boolean = false;


  ///// comentarios 
  nuevosComentarios: string = '';
  comentariosGuardados: string[] = [];
  nuevoComentario: string;
  documentoSeleccionadoIndex: number = -1; 
 
  comentariosIndividuales: string[] = [];
  comentariosPorDocumento: { [documentoId: string]: string[] } = {};




  ////////// chekcbox 


  camposSeleccionados: number[] = []; // Arreglo para almacenar los índices de los campos seleccionados
  checkboxValue: string | null = null;
  isLeft: boolean = false;
  isRight: boolean = false;
  isCenter: boolean = true;
  isRedBorder: boolean = false;
  isGreenBorder: boolean = false;


  constructor(private gestionDocumentoService: GestiondocumentoService,
     private elementRef: ElementRef,
     private procesoService: ProcesoService,
      private  persona: PersonaService 
      ,private tipodocumento:TipoDocumentoService,
    private modalService: NgbModal, 
     private asignacionEstadoDocumentoService: AsignacionEstadoDocumentoService,
     private coreService: CoreService ) {

  }
  modalOpen = false;
  mostrarFormulario = true;
  
  openSecondModal() {
    this.modalService.dismissAll(); // Cierra todos los modals abiertos
    this.modalService.open('#exampleModal');
  }


asignacionEstado(){
  this.asignacionEstadoDocumentoService.obtenerComentarios().subscribe(
    (response:AsignacionEstadoDocumentoModel[])=>{
      this. asignacion =response;
    }

  )

}



  tieneArchivoAdjunto(documento: Documento): boolean {
    // Verificar si la propiedad rutaDocumento tiene un valor válido para un archivo PDF
    return documento.rutaDocumento && documento.rutaDocumento.endsWith('.pdf');
  }

  
  ngOnInit(): void {
    this.obtenerDocumentos();
    const modal = document.getElementById('myModal');
    modal?.addEventListener('hidden.bs.modal', () => {
      // Restablecer el formulario

    });
this.obtenerEstadoDocumento();
    this.obtenerProcesos();
    this. traerPersonas();
    this.  traerDocumentos();
    this.asignacionEstado();
    ///comentarios 
    const comentariosGuardadosStr = localStorage.getItem('comentariosGuardados');
    if (comentariosGuardadosStr) {
      this.comentariosGuardados = JSON.parse(comentariosGuardadosStr);
    }
    
  }
  obtenerProcesos() {
    this.procesoService. traerProcesos().subscribe(
      (response: ProcesoModel[]) => {
        this.procesos = response;
      },
      (error) => {
        console.error('Error al obtener los procesos:', error);
      }
    );

   
  }
  traerPersonas(){
    this.persona.traerPersonas().subscribe(
      (response:PersonaModel[])=>{
        this. personas =response;
      }

    )

  }
  traerDocumentos(){
    this.tipodocumento.traerTipoDocumentos().subscribe(
      (response:TipoDocumentoModel[])=>{
        this. Documentos =response;
      }

    )

  }
  
  seleccionarDocumento(indice: number): void {
    this.idDocumento = this.Documentos[indice - 1].id;
    this.reiniciarModal(); 
  }
  
  
  onOpenFileButtonClicked(): void {
    const inputFile: HTMLInputElement | null = document.querySelector('#inputArchivo');
    const archivoSeleccionado: File | undefined = inputFile?.files?.[0];
  
    if (!archivoSeleccionado) {
      console.error('No se ha seleccionado un archivo.');
      return;
    }
  
    if (this.idDocumento) {
      // Realizar carga del documento con el ID seleccionado
      this.gestionDocumentoService.cargarDocumento(this.idDocumento, archivoSeleccionado).subscribe(
        respuesta => {
          // Manejar la respuesta del servidor
          console.log('Documento cargado:', respuesta);
          this.documentoGuardado = true;
          this.documentoError = false;
          this.mensajeExito = 'Documento guardado exitosamente.';
        },
        error => {
          console.error('Error al cargar el documento:', error);
          // Manejar el error según tus necesidades
          this.documentoGuardado = false;
          this.documentoError = true;
          this.mensajeError = 'Error al guardar el documento.';
        }
      );
    } else {
      console.error('No se ha seleccionado ningún ID de documento.');
    }
    this.mostrarFormulario = false;
    setTimeout(() => {
      this.mostrarFormulario = true;
    }, 1000); // Ajusta el tiempo de espera según tus necesidades
    setTimeout(() => {
      this.documentoGuardado = false;
      this.documentoError= false;
      this.mensajeExito = '';
      this.mensajeError='';
    }, 5000);
  
  }
  
  obtenerDocumentos(): void {
    this.gestionDocumentoService.obtenerDocumentos().subscribe(
      documentos => {
        this.documentos = documentos;
        // Obtener el ID del primer documento si hay documentos disponibles
        if (this.documentos.length > 0) {
          this.idDocumento = this.documentos[0].id;
          
        }
      },
      error => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }


  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
    this.pdfurl = URL.createObjectURL(this.archivoSeleccionado);
  }

  obtenerUrlPDF( documentoId: number): void {
    this.reiniciarModal(); 
    this.pdfurl = this.gestionDocumentoService.capturarurl(documentoId);
  }

  enviarNumeroRegistros(numRegistros: any) {
    const registros = parseInt(numRegistros, 10);
    if (!isNaN(registros)) {
      this.numReg = registros;
    }
  }


  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  reiniciarModal(): void {
    this.pdfurl = ''; // Reiniciar la URL del PDF
    this.mostrarFormulario = true; // Mostrar el formulario para cargar documentos
    this.documentoGuardado = false; // Reiniciar el estado de documento guardado
    this.documentoError = false; // Reiniciar el estado de error del documento
    this.mensajeExito = ''; // Reiniciar el mensaje de éxito
    this.mensajeError = ''; // Reiniciar el mensaje de error
    this.modalOpen = false;
  }
  seleccionarDocumentos(event: any) {
    const archivos = event.target.files;
    if (archivos.length > 0) {
      this.documentoCargado = archivos[0];
    }
  }

  subirDocumento() {
    if (this.gestionDocumentoService && this.documentoCargado && this.idDocumento) {
      // Obtener el documento existente utilizando su ID
      const documentoExistente = this.documentos.find(d => d.id === this.idDocumento);
      
      if (!documentoExistente) {
        console.error('No se encontró el documento con el ID especificado');
        return;
      }
      
      // Verificar si el documento existente tiene un tipo de archivo de texto o es nulo
      if (documentoExistente.rutaDocumento === null || documentoExistente.idTipoDocumento === 1) {
        // Actualizar el documento existente con el nuevo archivo seleccionado
        documentoExistente.rutaDocumento = this.documentoCargado.name;
        
        // Realizar carga del documento con el ID seleccionado
        this.gestionDocumentoService.cargarDocumento(this.idDocumento, this.documentoCargado).subscribe(
          respuesta => {
            // Manejar la respuesta del servidor
            console.log('Documento cargado:', respuesta);
            this.documentoGuardado = true;
            this.documentoError = false;
            this.mensajeExito = 'Documento guardado exitosamente.';
          },
          error => {
            console.error('Error al cargar el documento:', error);
            // Manejar el error según tus necesidades
            this.documentoGuardado = false;
            this.documentoError = true;
            this.mensajeError = 'Error al guardar el documento.';
          }
        );
      } else {
        console.error('El documento existente no puede ser reemplazado.');
      }
    } else {
      console.error('No se encontró el documento con el ID especificado');
    }
    setTimeout(() => {
      this.documentoGuardado = false;
      this.documentoError= false;
      this.mensajeExito = '';
      this.mensajeError='';
    }, 5000);
  
  }
  
  
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }




// estado documento 


obtenerEstadoDocumento(): void {
  this.asignacionEstadoDocumentoService.getEstadoDocumento().subscribe(
    (estado: any) => {
      console.log('Estado recibido:', estado);
      this.setCheckboxPosicion(estado.nombreEstado);
    },
    (error: any) => {
      console.error('Error al obtener el estado del documento:', error);
    }
  );
}

/*
===================================================================================================
Funcion para que el checkbox aparacezca en la posicion dependiendo de como este en la base de datos
===================================================================================================
*/

setCheckboxPosicion(estado: string): void {
  switch (estado) {
    case 'DENEGADO':
      this.checkboxValue = 'DENEGADO';
      this.isLeft = true;
      this.isRight = false;
      this.isCenter = false;
      this.isRedBorder = true;
      this.isGreenBorder = false;
      break;
    case 'APROBADO':
      this.checkboxValue = 'APROBADO';
      this.isLeft = false;
      this.isRight = true;
      this.isCenter = false;
      this.isRedBorder = false;
      this.isGreenBorder = true;
      break;
    default:
      this.checkboxValue = 'PENDIENTE';
      this.isLeft = false;
      this.isRight = false;
      this.isCenter = true;
      this.isRedBorder = false;
      this.isGreenBorder = false;
      break;
  }
}

//////////// seccion comentarios 


llenarComentarios(comentario: string) {
  this.nuevosComentarios = comentario;
}
agregarComentarios() {
  if (this.nuevosComentarios) {
    const comentario = { comentario: this.nuevosComentarios };

    // Utilizar el método post del coreService para enviar el comentario
    this.coreService.post('comentario', comentario).subscribe(
      response => {
        // El comentario se envió correctamente
        console.log('Comentario enviado:', response);
        this.nuevosComentarios = '';
      },
      error => {
        // Error al enviar el comentario
        console.error('Error al enviar el comentario:', error);
      }
    );
  }
  if (this.nuevosComentarios.trim() !== '') {
    this.comentariosGuardados.push(this.nuevosComentarios);
    this.nuevosComentarios = '';

    // Verificar si hay más de 10 comentarios
    if (this.comentariosGuardados.length > 10) {
      // Eliminar los 7 comentarios más antiguos
      this.comentariosGuardados.splice(0, this.comentariosGuardados.length - 3);
    }

    // Guardar comentarios en localStorage
    localStorage.setItem('comentariosGuardados', JSON.stringify(this.comentariosGuardados));
  }
   if (this.documentoSeleccionadoIndex !== -1) {
    const documentoId = this.Documentos[this.documentoSeleccionadoIndex].id;

    if (!this.comentariosPorDocumento[documentoId]) {
      this.comentariosPorDocumento[documentoId] = [];
    }

    this.comentariosPorDocumento[documentoId].push(this.nuevosComentarios);
    this.nuevosComentarios = '';
  }

}

openComentariosModal() {
  this.modalVisible = true;
}

closeComentariosModal() {
  this.modalVisible = false;
}

guardarComentario() {
  if (this.nuevosComentarios) {
    this.comentariosGuardados.push(this.nuevosComentarios);
    console.log('Comentario guardado:', this.nuevosComentarios);
    this.nuevosComentarios = '';
  }
}





}









