import { ResolveFn } from '@angular/router';
import { DemandeListeResponse, DemandeRDVFilterModel } from '../../models/demande.model';
import { inject } from '@angular/core';
import { DEMANDE_SERVICE_TOKEN } from '../services/interfaces/demande.interface.service';
import { Observable } from 'rxjs';

export const demandeResolver: ResolveFn<DemandeListeResponse | undefined> = (route, state) => {
  const demandeService = inject(DEMANDE_SERVICE_TOKEN)
  const filter: DemandeRDVFilterModel = {
    specialite: '',
    statut: 'En attente'
  }
  let demandesResponse: DemandeListeResponse | undefined = undefined;
  return demandeService.getDemandesRDV(filter);
  let demandes$: Observable<DemandeListeResponse> = demandeService.getDemandesRDV(filter);
  demandes$.subscribe({
    next: (data: DemandeListeResponse) => {
      return data
    },
    error: (error) => {
      console.error('Erreur:', error)
    },
    complete: () => {
      console.log('Complete')
    }
  })
  return undefined;
};
