package com.backend.hackingfuture.service;

import java.util.List;

import com.backend.hackingfuture.model.ProgramJoin;

public interface ProgramJoinService {
    ProgramJoin saveProgramJoin(ProgramJoin programJoin);
    List<ProgramJoin> getAllProgramJoins();
    ProgramJoin getProgramJoinById(Long id);
    boolean deleteProgramJoin(Long id);
    ProgramJoin updateProgramJoin(Long id, ProgramJoin programJoin);
    List<ProgramJoin> findByEmailRegisterAndEventTitle(String emailRegister, String eventTitle);
    boolean isEventClashing(String eventDate, String eventTime, String emailRegister); // Add this method
    
}
