package com.tharishaperera.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tharishaperera.models.TreatmentType;
import com.tharishaperera.utils.utils;

@Service
public class TreatmentTypeService {
    private List<TreatmentType> treatmentTypesList = new ArrayList<TreatmentType>();

    // get all treatment types
    public List<TreatmentType> getAllTreatmentTypes() {
        return treatmentTypesList;
    }

    // get treatment type by id
    public TreatmentType getTreatmentTypeById(Long id) {
        for (TreatmentType treatmentType: treatmentTypesList) {
            if (treatmentType.getTreatmentTypeId().equals(id)) {
                return treatmentType;
            }
        }
        return null;
    }
    
    // get selected treatments by array of ids
    public List<TreatmentType> getSelectTreatmentTypes(Long[] ids) {
        List<TreatmentType> selectedList = new ArrayList<TreatmentType>();
        for(Long id: ids) {
            selectedList.add(getTreatmentTypeById(id));
        }
        return selectedList;
    }
    
    // create a treatment type
    public TreatmentType createTreatmentType(TreatmentType treatmentType) {
        treatmentType.setTreatmentTypeId(utils.generateId());
        treatmentTypesList.add(treatmentType);
        return treatmentType;
    }
    
    // update treatment type
    public TreatmentType updateTreatmentType(Long id, TreatmentType treatmentType) {
        TreatmentType existing = getTreatmentTypeById(id);
        if (existing != null) {
            existing.setTreatmentName(treatmentType.getTreatmentName());
            existing.setPrice(treatmentType.getPrice());
        }
        return existing;
    }

    // delete treatment type
    public boolean deleteTreatmentType(Long id) {
        boolean deleteStatus = treatmentTypesList.removeIf(treatment -> treatment.getTreatmentTypeId().equals(id));
        return deleteStatus; 
    }
}
