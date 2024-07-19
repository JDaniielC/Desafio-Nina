import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'VICTIM':
        return 'Vítima';
      case 'WITNESS':
        return 'Testemunha';
      case 'BLACK':
        return 'Preto';
      case 'BROWN':
        return 'Pardo';
      case 'WHITE':
        return 'Branco';
      case 'CIS_MALE':
        return 'Homem cis';
      case 'CIS_FEMALE':
        return 'Mulher cis';
      case 'TRANS_MALE':
        return 'Homem Trans'
      case 'TRANS_FEMLAE':
        return 'Mulher Trans'
      case 'GROPING':
        return 'Encoxada/apalpada';
      case 'STALKING':
        return 'Perseguição';
      case 'UNWANTED_PHOTOS':
        return 'Fotografia não autorizada';
      case 'UNWANTED_COMMENTS':
        return 'Outros';
      case 'THREATENING':
        return 'Intimidação';
      case 'FLASHING':
        return 'Pessoa se exibindo';
      default:
        return 'Outro';
    }
  }
}
