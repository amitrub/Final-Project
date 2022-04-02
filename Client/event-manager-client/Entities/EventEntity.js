class EventEntity {
  constructor(
    id,
    event_manager,
    type,
    event_owners,
    event_name,
    date,
    budget,
    location,
    event_schedules,
    suppliers
  ) {
    this.id = id;
    this.event_manager = event_manager;
    this.type = type;
    this.event_owners = event_owners;
    this.event_name = event_name;
    this.date = date;
    this.budget = budget;
    this.location = location;
    this.event_schedules = event_schedules;
    this.suppliers = suppliers;
  }
}

export default EventEntity;

// class EventEntity {
//   constructor(
//       id,
//       event_manager_id,
//       type,
//       owners, <list <owner>>
//       event_name,
//       date,
//       budget,
//       location,
//       event_schedule - just in client put empty,
//       suppliers- just in client put empty
// )
