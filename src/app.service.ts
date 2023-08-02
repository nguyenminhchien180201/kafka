
import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppService {
  private kafkaProducer;

  constructor() {
    this.kafkaProducer = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: ['kafka:9092'],
    }).producer();
  }

  async sendMessage(message: string): Promise<void> {
    console.log(4);

    try {
      await this.kafkaProducer.connect();
      console.log('connected kafka');

    } catch (error) {
      console.log(error);
    }
    const key = 'my-key';
    const value = 'Hello, Kafka!1';

    const result = await this.kafkaProducer.send({
      topic: process.env.KAFKA_TOPIC,
      messages: [
        {
          key: key,
          value: value,
        },
      ],
    });
    result.forEach((messageResult) => {
      console.error(messageResult);
      // if (messageResult.error) {
      //   console.error('Failed to send message:', messageResult.error);
      // } else {
      //   console.log('Message sent successfully:', messageResult[0]?.message.value.toString());
      // }
    });
    await this.kafkaProducer.disconnect();
  }
}
