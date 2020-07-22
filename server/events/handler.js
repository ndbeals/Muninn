/* eslint-disable no-proto */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-useless-constructor */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable max-classes-per-file */
// import { Sequelize, sequelize } from 'sequelize';
import { logger } from '../config';

import db from '../models';

export var registeredHandlers = {};

class Handler {
  constructor() {}

  setName(name) {
    this.name = name;
  }

  async runEventHandler(name, data) {
    this.setName(name);
    return await this[name](data);
  }

  static eventHandler(descriptor) {
    descriptor.descriptor.value.eventHandler = true;
    return descriptor;
  }

  static registerEventHandler(className) {
    const handler = new className();
    const methods = Object.getOwnPropertyNames(handler.__proto__);
    methods.shift();

    for (const handlerName of methods) {
      // if (handler[handlerName].eventHandler) {
      if (handlerName.slice(0, 1) === handlerName.slice(0, 1).toUpperCase()) {
        if (registeredHandlers[handlerName] === undefined) {
          registeredHandlers[handlerName] = handler;
        } else {
          logger.error(`Event handler with name '${handlerName}' is already registered, ignoring this one.`);
        }
      }
    }
  }

  static async TriggerEvent(eventType, data) {
    const handler = registeredHandlers[eventType];
    try {
      const results = await handler.runEventHandler(eventType, data);
    } catch (error) {
      console.error(`handler error: ${error}`);
    }
  }
}
export default Handler;

export class NotifierHandler extends Handler {
  constructor() {
    super();
  }

  async NotifierReceived({ notifier, data }) {
    const transaction = await db.sequelize.transaction();

    let event;
    try {
      event = await db.Event.newEvent(
        this.name,
        {
          data,
          sender: {
            ip: '0.0.0.0',
          },
        },
        { transaction }
      );

      console.log(event.id, notifier.id);
      await db.Notifier.jncEvents.add(notifier, event, { transaction });
      // await db.Notifier.add( notifier, event, {transaction})

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error(`Failed to insert notification data on notifier received: ${error}`);
    }

    // Inserted the data, now generate the notification.
    const { title, renderedData } = { a: 1, b: 1 };
    await notifier.renderNotification(event);

    console.log('done run notifhandle', title, renderedData);
  }
}
Handler.registerEventHandler(NotifierHandler);
