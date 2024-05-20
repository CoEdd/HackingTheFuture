package com.backend.hackingfuture.service;

import com.backend.hackingfuture.model.Event;
import java.util.List;

public interface EventService {

    Event saveEvent(Event event);

    List<Event> getAllEvents();

    Event getEventById(Long id);

    boolean deleteEvent(Long id);

    Event updateEvent(Long id, Event event);

    List<Event> getEventsByDate(String eventDate);


}
