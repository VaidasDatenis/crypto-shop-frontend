import { Injectable, inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private toastr = inject(ToastrService);

  handleWalletError(error: any) {
    if (error.code === 4001) { // User rejected the request
      this.toastr.warning('You rejected the connection request. Please try again.', 'Connection Rejected');
    } else {
      this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
    }
  }
}
