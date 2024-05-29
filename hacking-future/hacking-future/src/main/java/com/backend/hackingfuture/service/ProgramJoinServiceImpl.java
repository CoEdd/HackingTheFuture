package com.backend.hackingfuture.service;

import java.util.List;
import java.util.stream.Collectors;

import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.backend.hackingfuture.entity.ProgramJoinEntity;
import com.backend.hackingfuture.entity.UserEntity;
import com.backend.hackingfuture.model.ProgramJoin;
import com.backend.hackingfuture.model.User;
import com.backend.hackingfuture.repository.ProgramJoinRepository;

@Service
public class ProgramJoinServiceImpl implements ProgramJoinService {
    
    private final ProgramJoinRepository programJoinRepository;
    private final UserService userService;

    public ProgramJoinServiceImpl(ProgramJoinRepository programJoinRepository, UserService userService) {
        this.programJoinRepository = programJoinRepository;
        this.userService = userService;
    }

    @Override
    public ProgramJoin saveProgramJoin(ProgramJoin programJoin) {
        ProgramJoinEntity programJoinEntity = new ProgramJoinEntity();
        BeanUtils.copyProperties(programJoin, programJoinEntity);
        ProgramJoinEntity savedEntity = programJoinRepository.save(programJoinEntity);
        ProgramJoin savedProgramJoin = new ProgramJoin();
        BeanUtils.copyProperties(savedEntity, savedProgramJoin);

        // Update user points
        int points = programJoin.getQuizTitle() != null ? 2 : 5;
        updateUserPoints(programJoin.getEmailRegister(), points);

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

    // Update user points based on conditions
    int points = 0;
    if (programJoin.getQuizTitle() != null) {
        points += 2;
    }
    if (programJoin.getEventVenue() != null) {
        points += 5;
    }
    updateUserPoints(programJoin.getEmailRegister(), points);

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

    public boolean isEventClashing(String eventDate, String emailRegister) {
        List<ProgramJoinEntity> programJoins = programJoinRepository.findByEmailRegister(emailRegister);
        return programJoins.stream().anyMatch(join -> join.getEventDate().equals(eventDate));
    }

    @Override
    public void updateUserPoints(String emailRegister, int points) {
        Optional<UserEntity> userOptional = userService.getUserByEmail(emailRegister);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            user.setStudentpoint(user.getStudentpoint() + points);
            userService.saveUser(new User(user.getId(), user.getFirstName(), user.getLastName(), user.getEmailId(), user.getPassword(), user.getRole(), user.getStudentcoordinate(), user.getStudentpoint()));
        }
    }
    
}
