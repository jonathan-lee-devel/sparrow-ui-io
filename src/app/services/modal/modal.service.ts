import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * Service used to create/show modal dialogs.
 */
export class ModalService {
  /**
   * Default constructor.
   */
  constructor() {
    return;
  }

  /**
   * Function used to show modal dialog.
   * @param {string} title for the modal dialog
   * @param {string} text for the modal dialog
   */
  public showModal(title: string, text: string) {
    const modalTitle = document.getElementById('modalLabel');
    if (modalTitle) {
      modalTitle.innerText = title;
    }
    const modalText = document.getElementById('modalText');
    if (modalText) {
      modalText.innerText = text;
    }

    // @ts-ignore
    const modal = new bootstrap.Modal(document.getElementById('modal'), {});
    if (modal) {
      modal.show();
    }
  }
}
