import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { GestiondocumentoService } from '@services/gestiondocumento.service';
import { Documento } from '@models/documento.model';
import { ProcesoModel } from '@models/proceso.model';
import { ResponsiveVisibility } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'app-list-gestion-documentos',
  templateUrl: './list-gestion-documentos.component.html',
  styleUrls: ['./list-gestion-documentos.component.scss']
})

export class ListGestionDocumentosComponent implements OnInit {

 
  page : number;
  public zoom: number | string = 'auto';
  @ViewChild('pdfViewer') pdfViewer: any;

  
  pdfurl: string;
  archivoSeleccionado: File;
  numReg = 5;
  pageActual = 0;
  documentos: Documento[] = [];
  procesos: ProcesoModel[] = [];
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


  constructor(private gestionDocumentoService: GestiondocumentoService, private elementRef: ElementRef) {

  }

  mostrarFormulario = true;

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
  }

  
  seleccionarDocumento(id: number): void {
    this.idDocumento = id;
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
  
  


}
