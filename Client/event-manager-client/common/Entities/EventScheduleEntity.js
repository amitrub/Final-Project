class EventScheduleEntity {
  constructor(start_time, end_time, description, eventName = "", id = 0) {
    this.start_time = start_time;
    this.end_time = end_time;
    this.description = description;
    this.eventName = eventName;
    this.id = id;
  }
}

export default EventScheduleEntity;
