package com.backend.hackingfuture.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.backend.hackingfuture.entity.ProgramJoinEntity;
import com.backend.hackingfuture.model.ProgramJoin;
import com.backend.hackingfuture.repository.ProgramJoinRepository;

@Service
public class ProgramJoinServiceImpl implements ProgramJoinService {
    
    private final ProgramJoinRepository programJoinRepository;

    public ProgramJoinServiceImpl(ProgramJoinRepository programJoinRepository) {
        this.programJoinRepository = programJoinRepository;
    }

    @Override
    public ProgramJoin saveProgramJoin(ProgramJoin programJoin) {
        ProgramJoinEntity programJoinEntity = new ProgramJoinEntity();
        BeanUtils.copyProperties(programJoin, programJoinEntity);
        ProgramJoinEntity savedEntity = programJoinRepository.save(programJoinEntity);
        ProgramJoin savedProgramJoin = new ProgramJoin();
        BeanUtils.copyProperties(savedEntity, savedProgramJoin);
        return savedProgramJoin;
    }

    @Override
    public List<ProgramJoin> getAllProgramJoins() {
        List<ProgramJoinEntity> programJoinEntities = programJoinRepository.findAll();
        return programJoinEntities.stream()
                .map(entity -> {
                    ProgramJoin programJoin = new ProgramJoin();
                    BeanUtils.copyProperties(entity, programJoin);
                    return programJoin;
                })
                .collect(Collectors.toList());
    }

    @Override
    public ProgramJoin getProgramJoinById(Long id) {
        ProgramJoinEntity programJoinEntity = programJoinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program join not found"));
        ProgramJoin programJoin = new ProgramJoin();
        BeanUtils.copyProperties(programJoinEntity, programJoin);
        return programJoin;
    }

    @Override
    public boolean deleteProgramJoin(Long id) {
        ProgramJoinEntity programJoinEntity = programJoinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program join not found"));
        programJoinRepository.delete(programJoinEntity);
        return true;
    }

    @Override
    public ProgramJoin updateProgramJoin(Long id, ProgramJoin programJoin) {
        ProgramJoinEntity programJoinEntity = programJoinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program join not found"));
        BeanUtils.copyProperties(programJoin, programJoinEntity);
        ProgramJoinEntity updatedEntity = programJoinRepository.save(programJoinEntity);
        ProgramJoin updatedProgramJoin = new ProgramJoin();
        BeanUtils.copyProperties(updatedEntity, updatedProgramJoin);
        return updatedProgramJoin;
    }

    @Override
    public List<ProgramJoin> findByEmailRegisterAndEventTitle(String emailRegister, String eventTitle) {
        List<ProgramJoinEntity> entities = programJoinRepository.findByEmailRegisterAndEventTitle(emailRegister, eventTitle);
        return entities.stream()
                .map(entity -> {
                    ProgramJoin programJoin = new ProgramJoin();
                    BeanUtils.copyProperties(entity, programJoin);
                    return programJoin;
                })
                .collect(Collectors.toList());
    }

    @Override
    public boolean isEventClashing(String eventDate, String eventTime, String emailRegister) {
        List<ProgramJoinEntity> eventsOnSameDate = programJoinRepository.findByEventDate(eventDate);
        return eventsOnSameDate.stream()
                .anyMatch(event -> event.getEmailRegister().equals(emailRegister) && event.getEventTime().equals(eventTime));
    }

    
}
