import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appListInput]'
})
export class ListInputDirective {
  @Input() appList: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const input = this.el.nativeElement;
    const datalist = input.getAttribute('list');

    if (datalist) {
      const options = document.getElementById(datalist).querySelectorAll('option');
      input.addEventListener('input', () => {
        const inputValue = input.value.toLowerCase();

        options.forEach(option => {
          if (option.value.toLowerCase().startsWith(inputValue)) {
            option.hidden = false;
          } else {
            option.hidden = true;
          }
        });
      });
    }
  }

  ngOnChanges() {
    const input = this.el.nativeElement;
    input.setAttribute('list', this.appList);
  }
}
