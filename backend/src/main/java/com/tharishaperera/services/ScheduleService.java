package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.Schedule;
import com.tharishaperera.utils.Utils;

@Service
public class ScheduleService {
    private List<Schedule> scheduleList = new ArrayList<Schedule>();

    // get all schedules
    public List<Schedule> getAllSchedules() {
        return scheduleList;
    }

    // get schedule by id
    public Schedule getScheduleById(Long id) {
        for (Schedule schedule: scheduleList) {
            if (schedule.getScheduleId().equals(id)) {
                return schedule;
            }
        }
        return null;
    }

    // get schedules by dentists
    public List<Schedule> getSchedulesByDentistId(Long id) {
        List<Schedule> dentistSchedules = new ArrayList<Schedule>();
        for (Schedule schedule: scheduleList) {
            if (schedule.getDentist().getUserId().equals(id)) {
                dentistSchedules.add(schedule);
            }
        }
        return dentistSchedules;
    }

    // create schedule
    public Schedule createSchedule(Schedule schedule) {
        schedule.setScheduleId(Utils.generateId());
        System.out.println(schedule);
        scheduleList.add(schedule);
        return schedule;
    }

    // update schedule
    public Schedule updateSchedule(Long id, Schedule schedule) {
        Schedule existing = getScheduleById(id);
        if (existing != null) {
            existing.setDentist(schedule.getDentist());
            existing.setDay(schedule.getDay());
            existing.setStartTime(schedule.getStartTime());
            existing.setEndTime(schedule.getEndTime());
        }
        return existing;
    }

    // delete schedule
    public boolean deleteSchedule(Long id) {
        boolean deleteStatus = scheduleList.removeIf(schedule -> schedule.getScheduleId().equals(id));
        return deleteStatus; 
    }
}
