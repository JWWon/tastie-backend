import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mail from 'nodemailer/lib/mailer';
import * as SendinBlue from 'nodemailer-sendinblue-transport';
import { EmailSender, SendParams } from '@/domain/auth';

@Injectable()
export class NodeMailerEmailSender implements EmailSender {
  private readonly transport: Mail;

  private readonly senderEmail: string;

  constructor(configService: ConfigService) {
    this.transport = nodemailer.createTransport(
      SendinBlue({
        apiKey: configService.get('sendinblue.apiKey'),
      }),
    );
    this.senderEmail = configService.get('email.sender');
  }

  async send(params: SendParams): Promise<void> {
    const message = {
      from: this.senderEmail,
      to: params.emailOfTo,
      subject: params.title,
      text: params.contents,
    };

    await this.transport.sendMail(message);
  }
}
