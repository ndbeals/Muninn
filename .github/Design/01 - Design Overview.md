# Notification Hub

This document describes, at a high level, the design of this system.

## Data Schema

## Backend

* REST API

* Node js, express, etc


  * Postgres data store


### Models
---

#### Event

**Attributes**

* `type` - string event type

* `eventData` - Data associated with the event that's happening

---

#### Notifier
Notifiers receive data sent externally to tokens and turn it into `NotificationData` and then generate `notification` events, they can be attached to multiple groups.

**Attributes**

* `id` - Unique ID, generated once

* `token` - access token for authenticating sent requests, can be regenerated

* `extraArguments` - YAML list of extra static data to be attached to the data received

---

#### NotifierGroup
Logical groupings of `Notifiers`, they can be nested. These will have receiving hooks so users can write custom code to modify/filter received notification data.

**Attributes**
* `id` - Unique ID, generated once

* `displayName` - pretty name for use in UI, E.G: "My Laptop"

* `notifiers` - list of registered `notifiers`

  * `id` - ID of registered `notifier`

  * `handlers` - Optional - custom event handlers overload the default one and allow users to inject logic they program to filter/mutate the incoming `NotificationData`
---

#### NotificationData

The data received from outside the application.

**Attributes**

* `timeStamp` - sub-second accurate timestamp (with timezone probably)

* `data` - Received data, body of the request.

  * `extraArguments` - Extra data attached by the `notifier`

* `sender` - Who/what sent it, probably gonna be an IP

---

#### EventHandler

Event handlers implement the event handling logic for many (seemingly unrelated) areas, this allows for easy composability

---

#### Middleware

This drives the event based interaction behind most of this. most things are events (receiving notifs, archiving, searching, etc)

##### EventMiddleware

Middleware between events, this allows for easily inserting code when events are passed, allowing users to customize lots of behaviour. Consumes `Events` to call their related handler(s).

##### 

## Frontend







