import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonModule} from 'primeng/button';

import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule],
  providers: [
    MessageService
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {

  protected readonly title = signal('ViewLog');
  private msg = inject(MessageService);



  ngOnInit(): void {
    setTimeout(() => this.showRenderColdStartMessage(), 200);
  }

  showRenderColdStartMessage() {
    this.msg.add({
      severity: 'info',
      summary: 'Backend Waking Up...',
      detail: `🟢 The backend is deployed on Render (free tier).

📌 If the dummy data is not visible, the backend may still be waking up.

⏸️ Render automatically puts the service to sleep after 15 minutes of inactivity.

⏱️ When waking up, the backend may take up to 1 minute to start.

🌐 To manually wake the backend, open this URL:
https://viewlog-backend-1-0-0.onrender.com/

🔄 After it becomes ready, reload the frontend.

❌ You may close this message.`,
      sticky: true,
      closable: true
    });
  }
  }
