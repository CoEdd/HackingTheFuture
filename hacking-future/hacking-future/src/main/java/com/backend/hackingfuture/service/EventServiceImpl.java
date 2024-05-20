package com.backend.hackingfuture.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.backend.hackingfuture.entity.EventPageEntity;
import com.backend.hackingfuture.model.Event;
// import com.backend.hackingfuture.model.User;
import com.backend.hackingfuture.repository.EventRepository;

// @SuppressWarnings("unused")
@Service
public class EventServiceImpl implements EventService {
    
    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Event saveEvent(Event event) {
        EventPageEntity eventPageEntity = new EventPageEntity();
        BeanUtils.copyProperties(event, eventPageEntity);
        eventRepository.save(eventPageEntity);
        return event;
    }

    @Override
    public List<Event> getAllEvents() {
        List<EventPageEntity> eventPageEntities = eventRepository.findAll();
       List<Event> event = eventPageEntities
                .stream()
                .map(eventEntity -> new Event(
                        eventEntity.getId(),
                        eventEntity.getEventTitle(),
                        eventEntity.getEventDescription(),
                        eventEntity.getEventVenue(),
                        eventEntity.getEventDate(),
                        eventEntity.getEventTime(),
                        eventEntity.getCreatorEmail()
                ))
                .collect(Collectors.toList());

        return event;
    }

    @Override
    public Event getEventById(Long id) {
        EventPageEntity eventPageEntity = eventRepository.findById(id).orElse(null);
        if (eventPageEntity == null) {
            return null;
        }
        Event event = new Event(id,null , null, null, null, null, null);
        BeanUtils.copyProperties(eventPageEntity, event);
        return event;
    }

    @Override
    public boolean deleteEvent(Long id) {
        eventRepository.deleteById(id);
        return true;
    }

    @Override
    public Event updateEvent(Long id, Event event) {
        EventPageEntity eventPageEntity = eventRepository.findById(id).orElse(null);
        if (eventPageEntity == null) {
            return null; // or throw an exception indicating event not found
        }
        BeanUtils.copyProperties(event, eventPageEntity, "id"); // Exclude copying id
        eventRepository.save(eventPageEntity);
        return event;
    }

    public List<Event> getEventsByDate(String eventDate) {
        return eventRepository.findByEventDate(eventDate);
    }
}