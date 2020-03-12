export interface SendParams {
  readonly emailOfTo: string;
  readonly title: string;
  readonly contents: string;
}

export interface EmailSender {
  send(params: SendParams): Promise<void>;
}

export const EmailSenderToken = Symbol();
