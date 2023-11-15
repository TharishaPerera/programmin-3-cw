package com.tharishaperera.models;

import java.time.LocalTime;

public class Schedule {
    private Long scheduleId;
    private Dentist dentist;
    private String day;
    private LocalTime startTime;
    private LocalTime endTime;
    
    public Schedule(Long scheduleId, Dentist dentist, String day, LocalTime startTime, LocalTime endTime) {
        this.scheduleId = scheduleId;
        this.dentist = dentist;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public Long getScheduleId() {
        return scheduleId;
    }
    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }
    public Dentist getDentist() {
        return dentist;
    }
    public void setDentist(Dentist dentist) {
        this.dentist = dentist;
    }
    public String getDay() {
        return day;
    }
    public void setDay(String day) {
        this.day = day;
    }
    public LocalTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }
    public LocalTime getEndTime() {
        return endTime;
    }
    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
