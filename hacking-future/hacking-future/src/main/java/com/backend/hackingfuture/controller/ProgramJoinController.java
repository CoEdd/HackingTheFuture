package com.backend.hackingfuture.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.hackingfuture.model.ProgramJoin;
import com.backend.hackingfuture.service.ProgramJoinService;

@RestController
@RequestMapping("/api/v1")
public class ProgramJoinController {

    private final ProgramJoinService programJoinService;

    public ProgramJoinController(ProgramJoinService programJoinService) {
        this.programJoinService = programJoinService;
    }

    @PostMapping("/programJoins")
    public ResponseEntity<ProgramJoin> saveProgramJoin(@RequestBody ProgramJoin programJoin) {
        ProgramJoin savedProgramJoin = programJoinService.saveProgramJoin(programJoin);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProgramJoin);
    }

    @GetMapping("/programJoins")
    public ResponseEntity<List<ProgramJoin>> getAllProgramJoins() {
        List<ProgramJoin> programJoins = programJoinService.getAllProgramJoins();
        return ResponseEntity.ok(programJoins);
    }

    @GetMapping("/programJoins/{id}")
    public ResponseEntity<ProgramJoin> getProgramJoinById(@PathVariable("id") Long id) {
        ProgramJoin programJoin = programJoinService.getProgramJoinById(id);
        return ResponseEntity.ok(programJoin);
    }

    @DeleteMapping("/programJoins/{id}")
    public ResponseEntity<Boolean> deleteProgramJoin(@PathVariable("id") Long id) {
        boolean deleted = programJoinService.deleteProgramJoin(id);
        return ResponseEntity.ok(deleted);
    }

    @PutMapping("/programJoins/{id}")
    public ResponseEntity<ProgramJoin> updateProgramJoin(@PathVariable("id") Long id,
                                                         @RequestBody ProgramJoin programJoin) {
        ProgramJoin updatedProgramJoin = programJoinService.updateProgramJoin(id, programJoin);
        return ResponseEntity.ok(updatedProgramJoin);
    }

    @GetMapping("/program_join")
    public ResponseEntity<List<ProgramJoin>> checkRegistration(
            @RequestParam String emailRegister,
            @RequestParam String eventTitle) {
        List<ProgramJoin> existingRegistrations = programJoinService.findByEmailRegisterAndEventTitle(emailRegister, eventTitle);
        return ResponseEntity.ok(existingRegistrations);
    }

    @PostMapping("/program_join")
    public ResponseEntity<?> registerEvent(@RequestBody ProgramJoin programJoin) {
        boolean isClashing = programJoinService.isEventClashing(programJoin.getEventDate(), programJoin.getEventTime(), programJoin.getEmailRegister());
        if (isClashing) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("There is a clash with another event on the same date and time.");
        }
        ProgramJoin savedProgramJoin = programJoinService.saveProgramJoin(programJoin);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProgramJoin);
    }

    
}
